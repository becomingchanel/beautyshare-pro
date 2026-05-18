#!/bin/bash
set -euo pipefail

log() { printf '[session-start] %s\n' "$*" >&2; }

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  log "Not a remote session, skipping setup."
  exit 0
fi

# ---- Tunables -------------------------------------------------------------
# large-v3-turbo: near-large-v3 accuracy, ~1.6GB, fast CPU inference — a good
# default for an ephemeral web container. Override with CVV_WHISPER_MODEL.
WHISPER_MODEL="${CVV_WHISPER_MODEL:-large-v3-turbo}"
# Source referenced by the claude-video-vision installer itself.
WHISPER_CPP_URL="${CVV_WHISPER_CPP_URL:-https://github.com/ggerganov/whisper.cpp}"

CVV_HOME="${HOME}/.claude-video-vision"
MODELS_DIR="${CVV_HOME}/models"
CONFIG_FILE="${CVV_HOME}/config.json"
CACHE_DIR="${HOME}/.cache/claude-video-vision"
BUILD_ROOT="${CACHE_DIR}/whisper.cpp"
READY_MARKER="${CVV_HOME}/.local-ready"
# /usr/local/bin is on PATH by default, so installing there avoids any
# CLAUDE_ENV_FILE PATH-propagation timing issues from the background job.
if [ -w /usr/local/bin ] 2>/dev/null || [ "$(id -u)" -eq 0 ]; then
  BIN_DIR="/usr/local/bin"
else
  BIN_DIR="${HOME}/.local/bin"
fi

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  if command -v sudo >/dev/null 2>&1; then SUDO="sudo -n"; fi
fi

install_apt() {
  if command -v apt-get >/dev/null 2>&1; then
    DEBIAN_FRONTEND=noninteractive $SUDO apt-get update -y >/dev/null 2>&1 || true
    DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y --no-install-recommends "$@" >/dev/null 2>&1 || return 1
  else
    return 1
  fi
}

ensure_ffmpeg() {
  if command -v ffmpeg >/dev/null 2>&1; then
    log "ffmpeg already installed ($(ffmpeg -version | head -n1))"
    return 0
  fi
  log "Installing ffmpeg via apt..."
  if install_apt ffmpeg; then
    log "ffmpeg installed."
  else
    log "WARNING: failed to install ffmpeg via apt; the MCP server may fall back to its own bundled binary."
  fi
}

ensure_yt_dlp() {
  if command -v yt-dlp >/dev/null 2>&1; then
    log "yt-dlp already installed ($(yt-dlp --version 2>/dev/null || echo unknown))"
    return 0
  fi
  log "Installing yt-dlp via apt..."
  if install_apt yt-dlp; then
    log "yt-dlp installed via apt."
    return 0
  fi
  log "apt install failed; trying pipx..."
  if ! command -v pipx >/dev/null 2>&1; then
    install_apt pipx || true
  fi
  if command -v pipx >/dev/null 2>&1; then
    pipx install --force yt-dlp >/dev/null 2>&1 || true
    if command -v yt-dlp >/dev/null 2>&1; then
      log "yt-dlp installed via pipx."
      return 0
    fi
    local pipx_bin="${HOME}/.local/bin"
    if [ -x "${pipx_bin}/yt-dlp" ]; then
      echo "export PATH=\"${pipx_bin}:\$PATH\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"
      export PATH="${pipx_bin}:$PATH"
      log "yt-dlp installed via pipx (added ${pipx_bin} to PATH)."
      return 0
    fi
  fi
  log "WARNING: yt-dlp not installed; remote URL ingestion may be unavailable."
}

ensure_dirs() {
  mkdir -p "$CACHE_DIR" "$MODELS_DIR" "$BIN_DIR"
  log "Cache dir ready: $CACHE_DIR"
}

# Preconfigure the MCP server for the local whisper.cpp backend so the video
# tools work without an interactive video_setup/video_configure round-trip.
# Only written if absent — never clobber a user/video_configure-managed config.
write_local_config() {
  if [ -f "$CONFIG_FILE" ]; then
    log "Existing $CONFIG_FILE left untouched."
    return 0
  fi
  mkdir -p "$CVV_HOME"
  cat > "$CONFIG_FILE" <<JSON
{
  "backend": "local",
  "whisper_engine": "cpp",
  "whisper_model": "${WHISPER_MODEL}",
  "whisper_at": false,
  "frame_mode": "images",
  "frame_format": "jpeg",
  "frame_resolution": 512,
  "default_fps": "auto",
  "max_frames": 100,
  "frame_describer_model": "sonnet",
  "enable_index": false,
  "session_max_age_days": 7,
  "downloads_max_age_days": 7
}
JSON
  log "Wrote local-backend config: $CONFIG_FILE (model: ${WHISPER_MODEL})"
}

whisper_cli_ok() {
  command -v whisper-cli >/dev/null 2>&1 || [ -x "${BIN_DIR}/whisper-cli" ]
}

# Build whisper.cpp from source and place the whisper-cli binary on PATH.
# Cached under $BUILD_ROOT so warm restarts in the same container are instant.
build_whisper_cpp() {
  if whisper_cli_ok; then
    log "whisper-cli already available ($(command -v whisper-cli || echo "${BIN_DIR}/whisper-cli"))"
    return 0
  fi

  log "Installing build toolchain for whisper.cpp..."
  install_apt git cmake build-essential || install_apt git cmake g++ make || true
  if ! command -v cmake >/dev/null 2>&1 || ! command -v git >/dev/null 2>&1; then
    log "ERROR: build toolchain unavailable (need git + cmake); cannot build whisper.cpp."
    return 1
  fi

  if [ -d "${BUILD_ROOT}/.git" ]; then
    log "Updating cached whisper.cpp checkout..."
    git -C "$BUILD_ROOT" pull --ff-only >/dev/null 2>&1 || true
  else
    log "Cloning whisper.cpp from ${WHISPER_CPP_URL}..."
    rm -rf "$BUILD_ROOT"
    git clone --depth 1 "$WHISPER_CPP_URL" "$BUILD_ROOT" >/dev/null 2>&1 || {
      log "ERROR: git clone of whisper.cpp failed."
      return 1
    }
  fi

  log "Compiling whisper-cli (this can take a few minutes on a cold container)..."
  cmake -S "$BUILD_ROOT" -B "${BUILD_ROOT}/build" \
    -DCMAKE_BUILD_TYPE=Release \
    -DWHISPER_BUILD_TESTS=OFF \
    -DWHISPER_BUILD_SERVER=OFF >/dev/null 2>&1 || {
      log "ERROR: cmake configure failed."
      return 1
    }
  cmake --build "${BUILD_ROOT}/build" --target whisper-cli -j "$(nproc 2>/dev/null || echo 2)" >/dev/null 2>&1 || {
      log "ERROR: whisper-cli compile failed."
      return 1
    }

  local built
  built="$(find "${BUILD_ROOT}/build" -type f -name whisper-cli 2>/dev/null | head -n1)"
  if [ -z "$built" ] || [ ! -x "$built" ]; then
    log "ERROR: whisper-cli binary not produced by build."
    return 1
  fi
  install -m 0755 "$built" "${BIN_DIR}/whisper-cli"
  # whisper-cli dynamically links the freshly built libwhisper/libggml .so's;
  # ship them alongside and point the loader at them so the binary runs from
  # /usr/local/bin without the build tree on LD_LIBRARY_PATH.
  local libdest="${BIN_DIR}/../lib/claude-video-vision"
  mkdir -p "$libdest"
  find "${BUILD_ROOT}/build" -type f \( -name '*.so' -o -name '*.so.*' \) -exec cp -f {} "$libdest"/ \; 2>/dev/null || true
  if [ "$(ls -A "$libdest" 2>/dev/null)" ]; then
    cat > "${BIN_DIR}/whisper-cli.wrapper" <<WRAP
#!/bin/bash
export LD_LIBRARY_PATH="${libdest}:\${LD_LIBRARY_PATH:-}"
exec "${BIN_DIR}/whisper-cli.real" "\$@"
WRAP
    mv "${BIN_DIR}/whisper-cli" "${BIN_DIR}/whisper-cli.real"
    mv "${BIN_DIR}/whisper-cli.wrapper" "${BIN_DIR}/whisper-cli"
    chmod 0755 "${BIN_DIR}/whisper-cli"
  fi

  if [ "$BIN_DIR" != "/usr/local/bin" ]; then
    echo "export PATH=\"${BIN_DIR}:\$PATH\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"
    export PATH="${BIN_DIR}:$PATH"
  fi

  if "${BIN_DIR}/whisper-cli" --help >/dev/null 2>&1; then
    log "whisper-cli installed to ${BIN_DIR}/whisper-cli"
    return 0
  fi
  log "ERROR: built whisper-cli failed to execute."
  return 1
}

# Prefetch the whisper + Silero VAD models into the exact paths the package
# expects, so the first transcription doesn't stall on a multi-GB download.
# Atomic (.part -> rename) so a half-finished file is never treated as ready.
prefetch_models() {
  command -v curl >/dev/null 2>&1 || { log "curl missing; skipping model prefetch."; return 0; }
  local model_path="${MODELS_DIR}/ggml-${WHISPER_MODEL}.bin"
  local vad_path="${MODELS_DIR}/ggml-silero-v5.1.2.bin"
  if [ ! -f "$model_path" ]; then
    log "Prefetching whisper model ggml-${WHISPER_MODEL}.bin..."
    if curl -fsSL -o "${model_path}.part" \
        "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${WHISPER_MODEL}.bin"; then
      mv "${model_path}.part" "$model_path"
      log "Whisper model ready: $model_path"
    else
      rm -f "${model_path}.part"
      log "WARNING: model prefetch failed; the package will fetch it on first use."
    fi
  fi
  if [ ! -f "$vad_path" ]; then
    if curl -fsSL -o "${vad_path}.part" \
        "https://huggingface.co/ggml-org/whisper-vad/resolve/main/ggml-silero-v5.1.2.bin"; then
      mv "${vad_path}.part" "$vad_path"
      log "Silero VAD model ready: $vad_path"
    else
      rm -f "${vad_path}.part"
    fi
  fi
}

prewarm_mcp() {
  if command -v npx >/dev/null 2>&1; then
    log "Prewarming claude-video-vision package via npx..."
    (npx -y claude-video-vision@latest --version >/dev/null 2>&1 || true) &
    disown || true
  fi
}

# Heavy local-whisper provisioning runs in the background so session start is
# not blocked by a multi-minute compile + model download. A readiness marker
# is written on success for accurate status on subsequent (warm) starts.
provision_local_whisper() {
  (
    if build_whisper_cpp; then
      prefetch_models
      : > "$READY_MARKER"
      log "Local whisper backend fully provisioned."
    else
      log "Local whisper backend provisioning FAILED — audio transcription unavailable until resolved."
    fi
  ) &
  disown || true
}

ensure_ffmpeg
ensure_yt_dlp
ensure_dirs
write_local_config
prewarm_mcp
provision_local_whisper

FFMPEG_STATUS="missing"
if command -v ffmpeg >/dev/null 2>&1; then FFMPEG_STATUS="ok"; fi
YTDLP_STATUS="missing"
if command -v yt-dlp >/dev/null 2>&1; then YTDLP_STATUS="ok"; fi
if [ -f "$READY_MARKER" ] && whisper_cli_ok; then
  WHISPER_STATUS="ok (model: ${WHISPER_MODEL})"
else
  WHISPER_STATUS="provisioning in background (~2-4 min on a cold container; visual analysis is available immediately)"
fi

cat <<JSON
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "claude-video-vision MCP server is configured for this repo with the LOCAL whisper.cpp backend (no API keys; audio stays in the sandbox). Readiness — ffmpeg: ${FFMPEG_STATUS}, yt-dlp: ${YTDLP_STATUS}, whisper.cpp: ${WHISPER_STATUS}. Config preset at ~/.claude-video-vision/config.json (backend=local, model=${WHISPER_MODEL}), so no interactive video_setup is required. Available tools: mcp__claude-video-vision__video_setup, mcp__claude-video-vision__video_info, mcp__claude-video-vision__video_detail, mcp__claude-video-vision__video_analyze, mcp__claude-video-vision__video_watch, mcp__claude-video-vision__video_configure. Visual frame analysis (video_info/video_watch/video_analyze visuals) works immediately. If an audio/transcription call fails because whisper-cli is not yet on PATH, local whisper is still compiling — wait ~1-2 min and retry; do not switch backends."
  }
}
JSON

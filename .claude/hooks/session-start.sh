#!/bin/bash
set -euo pipefail

log() { printf '[session-start] %s\n' "$*" >&2; }

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  log "Not a remote session, skipping setup."
  exit 0
fi

CVV_HOME="${HOME}/.claude-video-vision"
CONFIG_FILE="${CVV_HOME}/config.json"
CACHE_DIR="${HOME}/.cache/claude-video-vision"

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
  mkdir -p "$CACHE_DIR" "$CVV_HOME"
  log "Cache dir ready: $CACHE_DIR"
}

# Preconfigure the MCP server for the Gemini backend so the video tools work
# without an interactive video_setup round-trip. Only written if absent — never
# clobber a user/video_configure-managed config. Keys not written here fall back
# to the package defaults (audio_model=gemini-3-flash-preview, etc).
write_gemini_config() {
  if [ -f "$CONFIG_FILE" ]; then
    log "Existing $CONFIG_FILE left untouched."
    return 0
  fi
  cat > "$CONFIG_FILE" <<'JSON'
{
  "backend": "gemini-api",
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
  log "Wrote Gemini-backend config: $CONFIG_FILE"
}

prewarm_mcp() {
  if command -v npx >/dev/null 2>&1; then
    log "Prewarming claude-video-vision package via npx..."
    (npx -y claude-video-vision@latest --version >/dev/null 2>&1 || true) &
    disown || true
  fi
}

ensure_ffmpeg
ensure_yt_dlp
ensure_dirs
write_gemini_config
prewarm_mcp

FFMPEG_STATUS="missing"
if command -v ffmpeg >/dev/null 2>&1; then FFMPEG_STATUS="ok"; fi
YTDLP_STATUS="missing"
if command -v yt-dlp >/dev/null 2>&1; then YTDLP_STATUS="ok"; fi
if [ -n "${GEMINI_API_KEY:-}" ]; then
  KEY_STATUS="set (transcription + native video understanding enabled)"
else
  KEY_STATUS="NOT set — add GEMINI_API_KEY as an environment secret in your Claude Code on the web settings; .mcp.json already forwards it. Until then video tools that touch audio/Gemini will return a clear 'GEMINI_API_KEY not set' error"
fi

cat <<JSON
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "claude-video-vision MCP server is configured for this repo with the GEMINI backend (backend=gemini-api, preset at ~/.claude-video-vision/config.json — no interactive video_setup required). Readiness — ffmpeg: ${FFMPEG_STATUS}, yt-dlp: ${YTDLP_STATUS}, GEMINI_API_KEY: ${KEY_STATUS}. Available tools: mcp__claude-video-vision__video_setup, mcp__claude-video-vision__video_info, mcp__claude-video-vision__video_detail, mcp__claude-video-vision__video_analyze, mcp__claude-video-vision__video_watch, mcp__claude-video-vision__video_configure. NETWORK NOTE: this environment enforces an egress allowlist. generativelanguage.googleapis.com (Gemini) is reachable; huggingface.co and api.openai.com are blocked (so the local-whisper and OpenAI backends are not viable here). youtube.com / *.googlevideo.com are also blocked, so YouTube URL ingestion will fail until those domains are added to the environment's egress allowlist — local/uploaded video files and direct files on allowed hosts work regardless."
  }
}
JSON

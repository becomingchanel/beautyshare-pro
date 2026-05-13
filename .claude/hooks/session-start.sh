#!/bin/bash
set -euo pipefail

log() { printf '[session-start] %s\n' "$*" >&2; }

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  log "Not a remote session, skipping setup."
  exit 0
fi

SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  if command -v sudo >/dev/null 2>&1; then SUDO="sudo -n"; fi
fi

install_apt() {
  local pkg="$1"
  if command -v apt-get >/dev/null 2>&1; then
    DEBIAN_FRONTEND=noninteractive $SUDO apt-get update -y >/dev/null 2>&1 || true
    DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y --no-install-recommends "$pkg" >/dev/null 2>&1 || return 1
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

ensure_cache_dir() {
  local dir="${HOME}/.cache/claude-video-vision"
  mkdir -p "$dir"
  log "Cache dir ready: $dir"
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
ensure_cache_dir
prewarm_mcp

FFMPEG_STATUS="missing"
if command -v ffmpeg >/dev/null 2>&1; then FFMPEG_STATUS="ok"; fi
YTDLP_STATUS="missing"
if command -v yt-dlp >/dev/null 2>&1; then YTDLP_STATUS="ok"; fi

cat <<JSON
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "claude-video-vision MCP server is configured for this repo. Readiness — ffmpeg: ${FFMPEG_STATUS}, yt-dlp: ${YTDLP_STATUS}, cache: ${HOME}/.cache/claude-video-vision. Available tools: mcp__claude-video-vision__video_setup, mcp__claude-video-vision__video_info, mcp__claude-video-vision__video_detail, mcp__claude-video-vision__video_analyze, mcp__claude-video-vision__video_watch, mcp__claude-video-vision__video_configure. Call video_setup once per session before other video tools."
  }
}
JSON

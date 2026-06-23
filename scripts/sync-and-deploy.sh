#!/usr/bin/env bash
set -euo pipefail

# Sync code to production and rebuild Docker (use when server cannot git pull).
# Usage: ./scripts/sync-and-deploy.sh

SSH_HOST="${SSH_HOST:-survey-salamruby}"
REMOTE_DIR="${REMOTE_DIR:-/home/ubuntu/rubytech}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

log() { echo "[sync-deploy] $*"; }

log "Syncing ${ROOT_DIR} -> ${SSH_HOST}:${REMOTE_DIR}"
rsync -avz --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude .next \
  "${ROOT_DIR}/" "${SSH_HOST}:${REMOTE_DIR}/"

log "Building and restarting on ${SSH_HOST}..."
ssh "${SSH_HOST}" bash -s <<EOF
set -euo pipefail
cd "${REMOTE_DIR}"
sudo docker compose build --no-cache
sudo docker compose up -d --force-recreate
sudo docker ps --filter name=techruby --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
EOF

log "Checking https://techruby.ir ..."
curl -sI https://techruby.ir | head -3

log "Done."

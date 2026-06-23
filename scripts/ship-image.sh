#!/usr/bin/env bash
set -euo pipefail

# Build linux/amd64 image locally and ship to production (Mac → amd64 server).
# Usage: ./scripts/ship-image.sh

SSH_HOST="${SSH_HOST:-survey-salamruby}"
REMOTE_DIR="${REMOTE_DIR:-/home/ubuntu/rubytech}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${IMAGE:-techruby-web:latest}"

log() { echo "[ship-image] $*"; }

log "Syncing app files to ${SSH_HOST}:${REMOTE_DIR}"
rsync -avz --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude .next \
  "${ROOT_DIR}/" "${SSH_HOST}:${REMOTE_DIR}/"

log "Building ${IMAGE} for linux/amd64..."
docker build --platform linux/amd64 -t "${IMAGE}" "${ROOT_DIR}"

log "Loading image on ${SSH_HOST}..."
docker save "${IMAGE}" | ssh "${SSH_HOST}" "sudo docker load"

log "Restarting container..."
ssh "${SSH_HOST}" bash -s <<EOF
set -euo pipefail
cd "${REMOTE_DIR}"
sudo docker compose up -d --no-build --force-recreate
sudo docker ps --filter name=techruby --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
EOF

log "Checking https://techruby.ir ..."
curl -sI https://techruby.ir | head -3

log "Done."

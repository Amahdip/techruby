#!/usr/bin/env bash
set -euo pipefail

# Deploy TechRuby to production.
# Usage: ./scripts/deploy.sh
# Requires: git push access, SSH alias `survey-salamruby` configured.

SSH_HOST="${SSH_HOST:-survey-salamruby}"
REMOTE_DIR="${REMOTE_DIR:-/home/ubuntu/rubytech}"
BRANCH="${BRANCH:-main}"

log() { echo "[deploy] $*"; }

log "Pushing ${BRANCH}..."
git push origin "${BRANCH}"

log "Deploying on ${SSH_HOST}:${REMOTE_DIR}..."
ssh "${SSH_HOST}" bash -s <<EOF
set -euo pipefail
cd "${REMOTE_DIR}"
git pull origin ${BRANCH}
sudo docker compose build
sudo docker compose up -d --force-recreate
sudo docker ps --filter name=techruby --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
EOF

log "Checking https://techruby.ir ..."
curl -sI https://techruby.ir | head -3

log "Done."

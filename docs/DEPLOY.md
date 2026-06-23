# TechRuby deployment guide

Production site: **https://techruby.ir**

## Infrastructure overview

| Item | Value |
|------|-------|
| Domain | `techruby.ir` |
| Server SSH alias | `survey-salamruby` |
| Server host | `37.32.10.71` |
| SSH user | `ubuntu` |
| SSH key | `~/.ssh/ar-salam-ruby-privatekey.pem` |
| App directory | `/home/ubuntu/rubytech` |
| Container name | `techruby-web` |
| Image name | `techruby-web:latest` |
| Internal port | `3000` |
| Reverse proxy | Traefik (shared with SalamRuby stack) |
| Docker network | `salamruby_default` (external) |
| Git remote | `https://github.com/Amahdip/rubytech` |

Traefik runs in the SalamRuby compose stack (`~/salamruby`). TechRuby joins the same Docker network and registers a router for `techruby.ir`.

## Docker build model

The `Dockerfile` is **multi-stage**:

1. **deps** — `npm ci`
2. **builder** — `npm run build` (Next.js `output: "standalone"`)
3. **runner** — minimal Node image serving `server.js`

The server does **not** need Node.js installed. Only Docker is required.

## First-time server setup

```bash
ssh survey-salamruby

# Clone (or re-init if the directory was rsync'd previously)
cd ~
git clone https://github.com/Amahdip/rubytech.git
cd rubytech

# Build and start
sudo docker compose build
sudo docker compose up -d
```

Verify:

```bash
sudo docker ps --filter name=techruby
sudo docker logs techruby-web --tail 30
curl -sI https://techruby.ir | head -5
```

## Standard deploy (after code is pushed to `main`)

From your **local machine**:

```bash
git push origin main
ssh survey-salamruby 'cd ~/rubytech && git pull origin main && sudo docker compose build && sudo docker compose up -d --force-recreate'
```

Or SSH in and run step by step:

```bash
ssh survey-salamruby
cd ~/rubytech
git pull origin main
sudo docker compose build
sudo docker compose up -d --force-recreate
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Local Docker smoke test

```bash
docker compose build
docker compose up
```

> Local smoke test requires the `salamruby_default` network or a temporary compose override. On the production server that network already exists.

## Troubleshooting

### Container won't start

```bash
sudo docker logs techruby-web --tail 50
```

### Site returns 404 / wrong host

Check Traefik labels and that the container is on `salamruby_default`:

```bash
sudo docker inspect techruby-web --format '{{json .NetworkSettings.Networks}}'
sudo docker ps --filter name=traefik
```

### Build fails on server

- Ensure `git pull` brought the latest `package-lock.json`
- Rebuild without cache: `sudo docker compose build --no-cache`
- Check disk space: `df -h`

### Old `rubytech-web-1` container still running

After the compose file rename, remove stale containers:

```bash
sudo docker rm -f rubytech-web-1 2>/dev/null || true
sudo docker compose up -d --force-recreate
```

## What not to do

- Do **not** rsync a local `.next` build to the server anymore — the image builds inside Docker.
- Do **not** change Traefik router names casually; `techruby` is wired to `techruby.ir`.
- Do **not** run `docker compose` without `sudo` on this server (ubuntu user is not in the `docker` group).

## Agent checklist

When deploying or changing infra, agents should:

1. Push code to `main` before deploying.
2. SSH via `survey-salamruby` (not `salamruby-survey`).
3. Run `git pull` + `sudo docker compose build` + `sudo docker compose up -d --force-recreate` on the server.
4. Verify `https://techruby.ir` returns HTTP 200.
5. Keep `next.config.ts` `output: "standalone"` — required by the Dockerfile runner stage.

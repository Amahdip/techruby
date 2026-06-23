<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TechRuby — agent guidelines

## Project

- **Brand:** TechRuby (English), تک‌روبی (Persian)
- **Domain:** https://techruby.ir
- **Repo:** https://github.com/Amahdip/rubytech

## Code conventions

- Minimize scope; match existing patterns in surrounding files.
- User-facing strings go in `locales/en.json` and `locales/fa.json` — use `useTranslation()` / `t("key")`.
- **Exception:** the hero terminal (`lib/terminal-scenarios.ts`) is always English and LTR — never translate or RTL-flip terminal commands/output.
- Use design tokens from `app/globals.css` (`bg-ruby`, `text-muted-foreground`, etc.) — not arbitrary colors.
- Kebab-case for folders and CSS class names.
- Optional chaining for objects: `data?.id`.
- Handler functions instead of inline lambdas where appropriate.
- No `__` in class names. No `rem()` for spacing — use tokens.
- Fix lint and TypeScript errors before finishing.

## i18n

- `TranslationProvider` in `app/layout.tsx`
- Locale persisted in `localStorage` key `techruby-locale` (legacy fallback: `rubytech-locale`)
- Persian sets `dir="rtl"` on `<html>`

## Deployment

**Read [docs/DEPLOY.md](docs/DEPLOY.md) before deploying.**

Summary:

| Item | Value |
|------|-------|
| SSH host | `survey-salamruby` |
| Server path | `~/rubytech` |
| Deploy command | `git pull && sudo docker compose build && sudo docker compose up -d --force-recreate` |

Rules for agents:

1. **Commit and push to `main`** before deploying (unless the user says otherwise).
2. SSH alias is **`survey-salamruby`** — not `salamruby-survey`.
3. The server has **Docker only** — no Node.js. Do not rsync local `.next` artifacts.
4. The **multi-stage Dockerfile** builds inside Docker (`npm ci` + `next build`); `next.config.ts` must keep `output: "standalone"`.
5. Use **`sudo docker compose`** on the server.
6. If `git pull` fails on the server (GitHub blocked), use **rsync + docker compose build** — see [docs/DEPLOY.md](docs/DEPLOY.md) Option B.
7. After deploy, verify `curl -sI https://techruby.ir` returns HTTP 200.

## Docker files

- `Dockerfile` — multi-stage: deps → builder → runner
- `docker-compose.yml` — service `web`, image `techruby-web:latest`, Traefik labels for `techruby.ir`
- `.dockerignore` — excludes `.next`, `node_modules`, docs (built fresh in image)

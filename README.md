# TechRuby

Marketing site for [TechRuby](https://techruby.ir) — premium software engineering services.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Framer Motion, next-themes
- Bilingual UI: English + Persian (`locales/en.json`, `locales/fa.json`)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Deployment

Production runs on the **survey-salamruby** server as a Docker container behind Traefik.

**Full guide:** [docs/DEPLOY.md](docs/DEPLOY.md)

Quick deploy after pushing to `main`:

```bash
ssh survey-salamruby 'cd ~/rubytech && git pull origin main && sudo docker compose build && sudo docker compose up -d --force-recreate'
```

The Docker image is built on the server via a multi-stage `Dockerfile` (no Node.js required on the host).

## Project layout

```
app/              # Next.js app router pages and global styles
components/       # UI sections and primitives
hooks/            # Client hooks (i18n, spotlight)
lib/              # Utilities and motion config
locales/          # en.json, fa.json translation files
public/fonts/     # IRANSansX font files (Persian)
docs/DEPLOY.md    # Production deployment reference
```

## Brand

- Product name: **TechRuby** (English), **تک‌روبی** (Persian)
- Domain: **techruby.ir**
- Storage keys: `techruby-theme`, `techruby-locale`

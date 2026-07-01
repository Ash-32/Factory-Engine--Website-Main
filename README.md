# Factory Engine

Marketing website for [Factory Engine](https://factory-engine.com) — built with TanStack Start and deployed to Cloudflare Workers.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

See [DEPLOY.md](./DEPLOY.md) for Cloudflare setup, custom domain, and GitHub Actions.

| Command | Purpose |
|---------|---------|
| `npm run deploy` | Build + deploy to `*.workers.dev` |
| `npm run deploy:domain` | Build + deploy with `factory-engine.com` routes |
| `.\scripts\go-live.ps1` | PowerShell helper for domain deploy |

## Environment

Copy `.env.example` to `.env` and fill in Cloudflare credentials (never commit `.env`):

```
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
```

# Deploy Factory Engine (GitHub Pages)

This site is a static TanStack Start build deployed to **GitHub Pages** for preview.

## Preview URL

After a successful deploy on `main`:

**https://ash-32.github.io/Factory-Engine--Website/**

## How it works

1. Push to `main` triggers the **Deploy GitHub Pages** workflow.
2. The build prerenders the landing page to `dist/client/`.
3. GitHub Pages serves that folder.

## Local commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server at http://localhost:3000 |
| `npm run build` | Production build (root path `/`) |
| `npm run build:pages` | Same build with GitHub Pages base path |
| `npm run preview` | Preview the production build locally |

## One-time GitHub setup

If Pages is not already enabled:

1. Repo **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Push to `main` (or run **Deploy GitHub Pages** manually)

No secrets or environment variables are required.

## Cloudflare Pages / Workers (static)

The site builds to static HTML in `dist/client` (`nitro: false`). Use **static assets** deploy — do not let Wrangler auto-configure TanStack Start SSR (it will fail on the Lovable Vite config).

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npm run deploy:cf` |
| **Build output directory** | `dist/client` (for reference; wrangler reads `wrangler.jsonc`) |
| **Node.js version** | 22 |

`wrangler.jsonc` in the repo points at `./dist/client` with SPA fallback. Requires `CLOUDFLARE_API_TOKEN` in Cloudflare project settings.

Use **npm** (not Bun). Do not add `bun.lock`.

For a custom domain (e.g. factory-engine.com), leave `GITHUB_PAGES` unset so assets use base path `/`. Only set `GITHUB_PAGES=true` for GitHub Pages builds.

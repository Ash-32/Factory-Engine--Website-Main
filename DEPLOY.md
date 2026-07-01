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

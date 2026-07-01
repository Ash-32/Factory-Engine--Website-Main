# Factory Engine — Website

Marketing site for **Factory Engine**. GitHub repo: **[Ash-32/Factory-Engine--Website](https://github.com/Ash-32/Factory-Engine--Website)**

## Live preview

**https://ash-32.github.io/Factory-Engine--Website/**

Use this link on GitHub. Do not click `localhost` links unless you are running the dev server from **this folder** (see below).

## Local development

This is a **Node.js website**. It does **not** live in `ntfs-catalog` (that folder is the EngineVault desktop app and has no `package.json`).

```powershell
cd C:\Users\ASHISH\Projects\factory-engine-web
npm install
npm run dev
```

Then open the URL shown in the terminal (usually **http://localhost:3000**).

## Deploy

Pushes to `main` deploy automatically via GitHub Actions. See [DEPLOY.md](./DEPLOY.md).

| Command | Purpose |
|---------|---------|
| `npm run build:pages` | Build with GitHub Pages base path |
| `npm run preview` | Preview the production build locally |

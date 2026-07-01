# Factory Engine — Website

Marketing site for **Factory Engine**. GitHub repo: **[Ash-32/Factory-Engine--Website](https://github.com/Ash-32/Factory-Engine--Website)**

> **This is NOT CodeForge.** CodeForge is a separate AI coding landing page at [codeforge-web](../codeforge-web) → [Ash-32/CodeForge-Website](https://github.com/Ash-32/CodeForge-Website).  
> **This is NOT EngineVault.** The desktop app lives in `ntfs-catalog` → [Ash-32/EngineVault](https://github.com/Ash-32/EngineVault).

## Local folder

```
C:\Users\ASHISH\Projects\factory-engine-web
```

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

## Beta signup (Google Forms)

The two-step beta form submits to Google Forms — no backend. To connect your form, see **[GOOGLE-FORM-SETUP.md](./GOOGLE-FORM-SETUP.md)**.

Quick start:

```powershell
copy .env.example .env
# Edit .env with your formResponse URL and entry.* IDs, then:
npm run dev
```

Or paste IDs into `src/config/google-form.defaults.ts` and commit (safe — entry IDs are public).

## Deploy

Pushes to `main` deploy automatically via GitHub Actions. See [DEPLOY.md](./DEPLOY.md).

| Command | Purpose |
|---------|---------|
| `npm run build:pages` | Build with GitHub Pages base path |
| `npm run preview` | Preview the production build locally |

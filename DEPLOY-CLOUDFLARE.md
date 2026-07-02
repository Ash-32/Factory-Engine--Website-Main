# Cloudflare deployment (Factory Engine)

This site is a **static** prerendered build in `dist/client`. Pick **one** hosting method below.

---

## Option A — Cloudflare Pages (recommended, no Wrangler deploy)

Simplest path. No deploy command, no `CLOUDFLARE_API_TOKEN` in the repo.

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select **`Ash-32/Factory-Engine--Website-Main`**, branch **`main`**
3. Build settings:

| Setting | Value |
|---------|--------|
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `dist/client` |
| **Root directory** | `/` |
| **Node.js version** | 22 |

4. **Leave deploy command empty** (Pages does not use a separate Wrangler deploy step)
5. Deploy → add custom domain `factory-engine.com` under **Custom domains**

Do **not** use Bun. Do not add `bun.lock`.

---

## Option C — GitHub Actions deploy (most reliable)

Bypasses Cloudflare’s Workers Builds UI. Deploy runs from GitHub when you push to `main`.

1. Create API token: [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Edit Cloudflare Workers** template
2. GitHub repo **Settings → Secrets and variables → Actions** → add:
   - `CLOUDFLARE_API_TOKEN` — your token
   - `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare dashboard URL or **Workers & Pages → Overview** (32-char hex)
3. Push to `main` — workflow **Deploy Cloudflare** runs automatically (`.github/workflows/deploy-cloudflare.yml`)
4. Optional: disable Cloudflare’s native Git build to avoid double deploys

Token must include **Account → Workers Scripts → Edit**. If deploy fails with `Authentication error [10000]`, recreate the token with that permission.

---

## Option B — Workers Builds (Wrangler static assets)

Use only if you already have a **Workers** CI project (separate build + deploy steps).

### Build settings

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npm run deploy:cf` |
| **Node.js version** | 22 |

**Do not use** `npx wrangler deploy` — it triggers TanStack Start auto-setup and fails on our Vite config.

### Required secret

Add in **Workers project → Settings → Variables and secrets**:

| Name | Value |
|------|--------|
| `CLOUDFLARE_API_TOKEN` | API token with **Account → Workers Scripts → Edit** |

Create token: [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Edit Cloudflare Workers** template.

### What success looks like in logs

```
[cf-deploy] wrangler.jsonc: true
[cf-deploy] dist/client/index.html: true
[cf-deploy] CLOUDFLARE_API_TOKEN: set
✨ Read 23 files from the assets directory .../dist/client
```

### Common failures

| Log message | Fix |
|-------------|-----|
| `lockfile had changes, but lockfile is frozen` | Remove `bun.lock`; use npm only |
| `Cannot modify Vite config` | Deploy command must be `npm run deploy:cf`, not `npx wrangler deploy` |
| `CLOUDFLARE_API_TOKEN ... MISSING` | Add token in project variables (Option B only) |
| `Read files from .output/public` | Clear build cache; ensure `wrangler.jsonc` is on `main` |

---

## Local commands

```powershell
cd C:\Users\ASHISH\Projects\factory-engine-web
npm install
npm run build
npm run deploy:cf   # needs CLOUDFLARE_API_TOKEN in env
```

For custom domain on Cloudflare, do **not** set `GITHUB_PAGES=true` (assets use base path `/`).

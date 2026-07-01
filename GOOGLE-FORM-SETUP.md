# Google Form setup — Factory Engine beta signup

The Factory Engine website submits beta signups to a **Google Form** (no backend required). Follow these steps to connect your form.

## 1. Create the Google Form

Create a form with these fields (short-answer unless noted):

| Field   | Required |
|---------|----------|
| Email   | Yes      |
| Name    | Yes      |
| Company | Yes      |
| Role    | Yes      |
| Comment | No       |

Use exactly those titles so entry IDs are easy to map.

## 2. Get entry IDs (pre-filled link)

1. Open your form in Google Forms.
2. Click **Send** → link icon → **Get pre-filled link**.
3. Fill sample values in each field → **Get link**.
4. Copy the URL. It looks like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?usp=pp_url&entry.111=...&entry.222=...
   ```
5. Note each `entry.XXXXXXXXX` parameter — one per field. Match them to Email, Name, Company, Role, Comment.

## 3. Get the formResponse URL

1. Open the live form in your browser.
2. **View page source** (Ctrl+U / Cmd+Option+U).
3. Search for `formResponse`. You will find:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLS.../formResponse
   ```
4. Copy that full URL — this is `VITE_GOOGLE_FORM_ACTION_URL`.

Entry IDs and the formResponse URL are **public** (they appear in the form HTML). They are not secrets.

## 4. Configure the site

Choose **one** of these options:

### Option A — `.env` (local dev)

```powershell
copy .env.example .env
```

Edit `.env`:

```env
VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
VITE_GOOGLE_FORM_EMAIL_ENTRY=entry.111111111
VITE_GOOGLE_FORM_NAME_ENTRY=entry.222222222
VITE_GOOGLE_FORM_COMPANY_ENTRY=entry.333333333
VITE_GOOGLE_FORM_ROLE_ENTRY=entry.444444444
VITE_GOOGLE_FORM_COMMENT_ENTRY=entry.555555555
```

Restart `npm run dev` after changing `.env`.

### Option B — committed defaults (GitHub Pages)

Edit `src/config/google-form.defaults.ts` and paste your values:

```typescript
export const googleFormDefaults = {
  actionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
  emailEntry: "entry.111111111",
  nameEntry: "entry.222222222",
  companyEntry: "entry.333333333",
  roleEntry: "entry.444444444",
  commentEntry: "entry.555555555",
};
```

Commit and push — GitHub Actions will bake these into the production build. No GitHub Secrets needed for Vite `VITE_*` vars if you use this file.

### Option C — GitHub Actions env (optional)

If you prefer env vars in CI instead of committing defaults, add them to `.github/workflows/deploy-pages.yml` under the build step:

```yaml
- name: Build static site
  env:
    VITE_GOOGLE_FORM_ACTION_URL: https://docs.google.com/forms/d/e/.../formResponse
    VITE_GOOGLE_FORM_EMAIL_ENTRY: entry.111111111
    # ... etc
  run: npm run build:pages
```

## 5. Test locally

```powershell
cd C:\Users\ASHISH\Projects\factory-engine-web
npm run dev
```

1. Open http://localhost:3000
2. Enter an email → **Join beta**
3. Fill name, company, role → **Submit signup**
4. Check your Google Form **Responses** tab for the new row

If config is missing, the form shows a setup message in dev mode and blocks submit in production.

## 6. Deploy

Push to `main`. GitHub Pages rebuilds automatically. Verify on the live site after deploy.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Submit succeeds but no response in Google Form | Double-check entry IDs match field order in pre-filled URL |
| "Not connected yet" on live site | Add values to `google-form.defaults.ts` or CI env vars, then redeploy |
| CORS / network errors | The site uses `no-cors` POST; if fetch fails, it opens a pre-filled form in a new tab as fallback |

## What to send if someone else is setting this up

Provide these six values:

1. `formResponse` URL
2. Email entry ID (`entry.…`)
3. Name entry ID
4. Company entry ID
5. Role entry ID
6. Comment entry ID (optional but recommended)

Or share the **pre-filled link** from step 2 plus the **formResponse URL** from step 3.

import { rmSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(projectRoot);

const wranglerJsonc = join(projectRoot, "wrangler.jsonc");
const indexHtml = join(projectRoot, "dist", "client", "index.html");
const wranglerBin =
  process.platform === "win32"
    ? join(projectRoot, "node_modules", ".bin", "wrangler.cmd")
    : join(projectRoot, "node_modules", ".bin", "wrangler");

// Visible in Cloudflare build logs for debugging.
console.log("[cf-deploy] project root:", projectRoot);
console.log("[cf-deploy] wrangler.jsonc:", existsSync(wranglerJsonc));
console.log("[cf-deploy] dist/client/index.html:", existsSync(indexHtml));
console.log("[cf-deploy] wrangler bin:", existsSync(wranglerBin));
console.log(
  "[cf-deploy] CLOUDFLARE_ACCOUNT_ID:",
  process.env.CLOUDFLARE_ACCOUNT_ID ? "set" : "MISSING",
);

const token =
  process.env.CLOUDFLARE_API_TOKEN ?? process.env.WRANGLER_API_TOKEN ?? "";
console.log("[cf-deploy] API token:", token ? "set" : "MISSING");

if (!existsSync(wranglerJsonc)) {
  console.error("[cf-deploy] FATAL: wrangler.jsonc not found in repo root.");
  process.exit(1);
}

if (!existsSync(indexHtml)) {
  console.error("[cf-deploy] FATAL: dist/client/index.html missing. Run npm run build first.");
  process.exit(1);
}

if (!existsSync(wranglerBin)) {
  console.error("[cf-deploy] FATAL: wrangler not installed. Run npm ci first.");
  process.exit(1);
}

if (!token) {
  console.error(
    "[cf-deploy] FATAL: CLOUDFLARE_API_TOKEN is not set.\n" +
      "  GitHub: repo Settings → Secrets → CLOUDFLARE_API_TOKEN\n" +
      "  Cloudflare Workers Builds: project → Settings → Variables → CLOUDFLARE_API_TOKEN\n" +
      "  Create token: https://dash.cloudflare.com/profile/api-tokens (Edit Cloudflare Workers template).",
  );
  process.exit(1);
}

try {
  rmSync(join(projectRoot, ".wrangler"), { recursive: true, force: true });
} catch {
  // ignore
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const accountFlag = accountId ? ` --account-id "${accountId}"` : "";

const cmd =
  process.platform === "win32"
    ? `"${wranglerBin}" deploy --config wrangler.jsonc${accountFlag}`
    : `"${wranglerBin}" deploy --config wrangler.jsonc${accountFlag}`;

execSync(cmd, { stdio: "inherit", shell: process.platform === "win32" });

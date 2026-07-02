import { rmSync } from "node:fs";
import { execSync } from "node:child_process";

// Avoid stale redirect to .output/server/wrangler.json from prior SSR attempts.
try {
  rmSync(".wrangler", { recursive: true, force: true });
} catch {
  // ignore
}

execSync("wrangler deploy --config wrangler.jsonc", { stdio: "inherit" });

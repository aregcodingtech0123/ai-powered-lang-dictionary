#!/usr/bin/env node
/**
 * Pure QA test run — HTTP requests only; never starts or stops services.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_API_URL } from "./lib/ports.mjs";
import { EXIT_FAIL, EXIT_OK } from "./lib/exit-codes.mjs";
import { TAG, log, logError } from "./lib/log.mjs";
import { waitForHttpOk } from "./lib/process-manager.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function main() {
  log(TAG.TEST_RUN, "Checking backend health before QA tests ...");
  const apiUrl = process.env.API_URL ?? DEFAULT_API_URL;
  const healthUrl = `${apiUrl}/health`;
  const healthy = await waitForHttpOk(healthUrl, { timeoutMs: 5_000 });

  if (!healthy) {
    logError(
      TAG.TEST_RUN,
      `Backend not reachable at ${healthUrl}. Start it with: npm run restart:backend-dev`
    );
    process.exit(EXIT_FAIL);
  }

  log(TAG.TEST_RUN, `All required services appear stable (backend OK at ${healthUrl}).`);
  log(TAG.TEST_RUN, "Beginning QA tests — this phase does not stop or restart any service.");

  const result = spawnSync(process.execPath, [path.join(ROOT, "scripts/qa-api-tests.mjs")], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });

  const code = result.status ?? EXIT_FAIL;
  if (code === EXIT_OK) {
    log(TAG.TEST_RUN, "QA tests finished successfully (exit 0).");
  } else {
    logError(TAG.TEST_RUN, `QA tests failed (exit ${code}).`);
  }
  process.exit(code);
}

main().catch((err) => {
  logError(TAG.TEST_RUN, err instanceof Error ? err.message : String(err));
  process.exit(EXIT_FAIL);
});

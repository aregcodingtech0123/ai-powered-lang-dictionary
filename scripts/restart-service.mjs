#!/usr/bin/env node
/**
 * Restart a single service without touching other groups.
 *
 * Usage: node scripts/restart-service.mjs frontend-dev
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getService } from "./lib/ports.mjs";
import { stopPort, waitForHttpOk } from "./lib/process-manager.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const serviceId = process.argv[2];
if (!serviceId) {
  console.error("Usage: node scripts/restart-service.mjs <service-id>");
  console.error("  e.g. frontend-dev | frontend-prod | backend-dev | backend-prod");
  process.exit(1);
}

const svc = getService(serviceId);

stopPort(svc.port, { reason: "single-service restart", label: svc.label });

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm" : "npm";

const startSpecs = {
  "frontend-dev": {
    cwd: path.join(ROOT, "frontend"),
    cmd: npmCmd,
    args: ["run", "dev"],
    healthUrl: `http://localhost:${svc.port}/`,
  },
  "frontend-prod": {
    cwd: path.join(ROOT, "frontend"),
    cmd: npmCmd,
    args: ["run", "start:prod-local"],
    healthUrl: `http://localhost:${svc.port}/`,
  },
  "backend-dev": {
    cwd: path.join(ROOT, "backend"),
    cmd: npmCmd,
    args: ["run", "dev"],
    healthUrl: `http://localhost:${svc.port}/health`,
  },
  "backend-prod": {
    cwd: path.join(ROOT, "backend"),
    cmd: npmCmd,
    args: ["run", "start:prod-local"],
    healthUrl: `http://localhost:${svc.port}/health`,
  },
};

const spec = startSpecs[serviceId];
if (!spec) {
  console.error(`No restart spec for ${serviceId}`);
  process.exit(1);
}

console.log(`[BUILD] Starting ${svc.label} on port ${svc.port}...`);

const child = spawn(spec.cmd, spec.args, {
  cwd: spec.cwd,
  detached: true,
  stdio: "ignore",
  env: { ...process.env, PORT: String(svc.port) },
  shell: isWin,
});

child.unref();

const ok = await waitForHttpOk(spec.healthUrl, { timeoutMs: 45_000 });
if (!ok) {
  console.error(`[BUILD] ${svc.label} did not become healthy at ${spec.healthUrl} within timeout.`);
  process.exit(1);
}

console.log(`[BUILD] ${svc.label} is up at ${spec.healthUrl}`);
process.exit(0);

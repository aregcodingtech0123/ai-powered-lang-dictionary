import { execSync } from "node:child_process";
import { platform } from "node:os";
import { TAG, log } from "./log.mjs";

const IS_WIN = platform() === "win32";

/**
 * Returns PIDs listening on `port`. Never returns the current process PID.
 */
export function getListeningPids(port) {
  const self = process.pid;
  let pids = [];

  if (IS_WIN) {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      for (const line of out.split(/\r?\n/)) {
        if (!/LISTENING/i.test(line)) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0 && pid !== self) {
          pids.push(pid);
        }
      }
    } catch {
      // findstr exits 1 when no matches
    }
  } else {
    try {
      const out = execSync(`lsof -ti :${port} -sTCP:LISTEN`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      pids = out
        .trim()
        .split(/\s+/)
        .map((v) => Number(v))
        .filter((pid) => Number.isInteger(pid) && pid > 0 && pid !== self);
    } catch {
      // no listener
    }
  }

  return [...new Set(pids)];
}

/**
 * Stop processes on a port. Returns metadata; does not exit the process.
 */
export function stopPort(port, { reason, label = "service", logTag = TAG.BUILD } = {}) {
  const pids = getListeningPids(port);

  if (pids.length === 0) {
    log(logTag, `Port ${port} (${label}): no listener — nothing to stop.`);
    return { port, label, stopped: 0, planned: true, pids: [] };
  }

  for (const pid of pids) {
    log(
      logTag,
      `Stopping ${label} (PID ${pid}) on port ${port} — intentional: ${reason ?? "planned restart"}`
    );
  }

  for (const pid of pids) {
    try {
      if (IS_WIN) {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      } else {
        process.kill(pid, "SIGTERM");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      log(logTag, `Warning: could not stop PID ${pid} on port ${port}: ${message}`);
    }
  }

  return { port, label, stopped: pids.length, planned: true, pids };
}

export function stopServices(serviceIds, { reason, getService }) {
  let totalStopped = 0;
  for (const id of serviceIds) {
    const svc = getService(id);
    const result = stopPort(svc.port, { reason, label: svc.label });
    totalStopped += result.stopped;
  }
  return totalStopped;
}

export async function waitForHttpOk(url, { timeoutMs = 30_000, intervalMs = 500 } = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3_000) });
      if (res.ok) return true;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

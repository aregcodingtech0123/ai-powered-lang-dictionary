# Testing & QA automation

Scripts live under `scripts/` and are invoked from the repo root via `npm run …`.

## Phases and log tags

| Tag | Phase | Stops services? |
|-----|--------|-----------------|
| `[CLEAN-REBUILD]` | Frontend clean + `next build` | Frontend only (3000, 3005) |
| `[TEST-PREP]` | Optional pre-test clean rebuild | Same as above (via `clean:rebuild`) |
| `[TEST-RUN]` | HTTP QA tests | **Never** |
| `[CLEANUP]` | Manual `stop:*` commands | Targeted port only |

Backend ports **3001** (dev) and **3002** (prod-local) are never stopped by clean rebuild or test runs.

## Commands

```bash
# Standalone prep (frontend clean rebuild)
npm run clean:rebuild

# Tests only — no service kills (requires backend on :3001)
npm run test:run

# Full pipeline: prep then tests (prep exit 10 is treated as success)
npm run test:full

# Tests without prep (same as old default test:full)
npm run test:full:skip-prep

# Low-level API checks only
npm run test:api
```

Optional flags (pass to the underlying script):

- `node scripts/clean-rebuild.mjs --restart` — bring frontend-dev back after build
- `node scripts/test-full.mjs --skip-prep` — skip clean rebuild

## Exit code convention

| Code | Meaning | Treat as failure? |
|------|---------|-------------------|
| **0** | Success | No |
| **1** | Real error (build failed, tests failed, service unhealthy) | **Yes** |
| **10** | Intentional service stop completed (planned, not a crash) | **No** |
| **130** | SIGINT / Ctrl+C (shell) | Context-dependent |

When frontend services are stopped for a clean rebuild, scripts exit **10** and log:

```text
[INFO] Service Frontend Next.js dev on port 3000 was intentionally stopped for clean rebuild (exit code 10).
```

`test:full` treats exit **10** from the prep phase as success and continues to `[TEST-RUN]`.

## CI integration

Some CI systems fail on any non-zero exit. Wrap prep or use explicit checks:

**Bash:**

```bash
npm run clean:rebuild
code=$?
if [ "$code" -eq 10 ] || [ "$code" -eq 0 ]; then
  echo "Prep OK (exit $code)"
else
  exit "$code"
fi
npm run test:run
```

**PowerShell:**

```powershell
npm run clean:rebuild
$code = $LASTEXITCODE
if ($code -eq 10 -or $code -eq 0) { Write-Host "Prep OK (exit $code)" } else { exit $code }
npm run test:run
```

Or run the orchestrator (handles exit 10 internally):

```bash
npm run test:full
```

## Prerequisites for API tests

1. Backend dev running: `npm run restart:backend-dev`
2. `GEMINI_API_KEY` in `backend/.env` (for full translate flows)
3. Allow ~4–5 minutes for rate-limit cooldown waits inside the suite

## What changed from early QA runs

Previously, manual `Stop-Process -Name node` killed **all** Node services and produced misleading shell errors. Automation now:

- Stops processes **by port** only
- Never touches backend during frontend rebuild
- Uses exit **10** for planned stops with clear `[INFO]` logs
- Keeps `[TEST-RUN]` free of any `kill` / `taskkill` calls

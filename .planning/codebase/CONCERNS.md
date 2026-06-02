# CONCERNS.md — Technical Debt & Issues
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Several high-priority concerns: `.env` with real credentials sits in the repo root alongside the git history, retired Excel trackers with business data are tracked in git, and critical orchestration code (`autonomous-build-loop.js`, `bob-orchestrator.js`) uses silent null fallbacks that can mask failures. Test coverage is near-zero across the entire codebase.

---

## 🔴 Security

| Issue | Location | Risk | Action |
|-------|---------|------|--------|
| `.env` present in repo | `AI_Workspace/.env` (2.7KB) | HIGH — credentials committed or tracked | Verify `.gitignore` covers it; rotate any exposed keys |
| Excel files with business data tracked | `Guarana_Flips_Tracker.xlsx`, `CheckSammy_Master_Tracker.xlsx`, etc. | MEDIUM — PII/financials in git history | Move to `.gitignore` or git-crypt |
| `.~lock.*` files tracked | Root directory (4 lock files) | LOW — exposes local file paths | Add to `.gitignore` |
| Hardcoded template strings in MCP config | `.mcp.json` | LOW | Review for embedded secrets |
| Docker MCP secrets injection failure | Global Docker MCP config | MEDIUM — forces hardcoding API tokens in YAML | Track as known issue; document workaround |

---

## 🔴 Tech Debt

| Issue | Location | Impact |
|-------|---------|--------|
| Deprecated `config-loader` still imported | Imported by ~11 files across `.aiox-core/core/` | MEDIUM — unclear if deprecated version differs from current |
| Duplicate `backup-manager.js` (3 copies) | `.aiox-core/core/` subdirectories | LOW — maintenance confusion, divergence risk |
| Orphaned `build_part2.py` (61.9KB) | Root or scripts directory | LOW — large unanalyzed Python script, purpose unclear |
| Retired XLSX trackers not removed | `Guarana_Flips_Tracker.xlsx`, `LG_Flip_Tracker.xlsx` | LOW — CLAUDE.md says "NEVER update" but files still present |
| `DONT-USE-OLD-FILES/` directory | Root | LOW — ad-hoc deprecation; should be formal archiving |
| Single monolithic YAML registry | `.aiox-core/core/registry/service-registry.json` (821 entities) | MEDIUM — single point of contention, slow load for large registries |

---

## 🟡 Known Bugs / Issues

| Bug | Location | Notes |
|-----|---------|-------|
| `npm test` exits 1 | Root `package.json` | Script set to error-exit — no test runner configured |
| BUG-6 patch comment left in code | `.aiox-core/core/pro/index.js` | Indicates a workaround was patched but never cleaned up |
| Docker MCP secrets not injected | Global Docker MCP | Credentials require manual hardcoding in `docker-mcp.yaml` |
| Stale `.~lock.*` Excel files | Root directory (4 files) | LibreOffice/Excel lock files committed — suggests workflow issues |
| No root `package-lock.json` | Root workspace | Husky configured but lockfile absent — inconsistent install |

---

## 🟡 Performance

| Issue | Location | Impact |
|-------|---------|--------|
| 5-minute stale config cache with no invalidation | `.aiox-core/core/config/` | MEDIUM — config changes don't reflect until cache expires |
| Terminal-spawner 500ms polling loop | `.aiox-core/core/execution/` (inferred from parallel-monitor.js) | MEDIUM — 600+ read operations per active agent; high I/O |
| 821-entity single YAML/JSON registry | `.aiox-core/core/registry/service-registry.json` | MEDIUM — full load on every query; no pagination |
| Large unanalyzed Python file (61.9KB) | `build_part2.py` | UNKNOWN — may contain heavy computation |
| Nested `node_modules` in `lg-distributions/` | `lg-distributions/node_modules/` | LOW — expected for sub-project; just increases disk usage |

---

## 🟡 Fragile Areas

| Area | File | Risk |
|------|------|------|
| Autonomous build loop — silent null fallbacks | `.aiox-core/core/execution/autonomous-build-loop.js` | MEDIUM — failures can be swallowed silently, masking broken builds |
| `bob-orchestrator.js` — 12+ imports, 36KB | `.aiox-core/core/orchestration/bob-orchestrator.js` | MEDIUM — God object, high coupling, hard to test in isolation |
| `semantic-merge-engine.js` uses `execSync` | `.aiox-core/core/execution/semantic-merge-engine.js` | MEDIUM — synchronous subprocess blocks event loop during merges |
| `agent-immortality` missing `mkdir` guard | `.aiox-core/core/resilience/` (inferred) | LOW — could fail if target directory doesn't exist |
| `brownfield-handler.js` (26KB) | `.aiox-core/core/orchestration/brownfield-handler.js` | MEDIUM — complex legacy handling, minimal tests |
| Session state management | `.aiox-core/core/session/` | MEDIUM — stateful operations; failure mid-session can corrupt state |

---

## 🟡 Test Gaps

| Layer | Coverage | Risk |
|-------|---------|------|
| Orchestration (`bob-orchestrator.js`) | None | HIGH — core workflow, no safety net |
| Execution engine (`build-orchestrator.js`, `autonomous-build-loop.js`) | None | HIGH — parallel execution, race conditions undetected |
| Config system | None | MEDIUM — config errors fail silently in prod |
| Infrastructure scripts (adapters, providers) | None | MEDIUM — integration failures go undetected |
| `lg-distributions/` Next.js app | None | MEDIUM — no UI tests, no API route tests |
| Root workspace | None | LOW — minimal code here |

**Total test count:** ~7 files covering <10% of codebase.

---

## 🟢 Low-Priority / Nice-to-Have

| Issue | Notes |
|-------|-------|
| Multiple `KFS_Cleaning_Website*.html` versions (v1–v5) | Should pick canonical version; others to `99_Archive/` |
| `__pycache__/` in root | Python cache directory — add to `.gitignore` |
| `morning-briefing-2026-04-16.md` in root (not in `05_Outputs/`) | Stray output file |
| `.codex/`, `.kimi/`, `.gemini/`, `.antigravity/`, `.cursor/` config dirs | Multiple AI runtime configs; low risk but clutters root |
| `DONT-USE-OLD-FILES/` naming | Non-standard; would be cleaner as `99_Archive/deprecated/` |

---

## Recommended Priority Order

1. **Verify `.env` is gitignored** — check `git status` and `.gitignore` immediately
2. **Fix `npm test`** — configure a test runner or point to `.aiox-core` tests
3. **Add tests for `bob-orchestrator.js` + `autonomous-build-loop.js`** — highest risk, zero coverage
4. **Remove Excel lock files from tracking** — add `*.~lock.*` to `.gitignore`
5. **Replace `execSync` in `semantic-merge-engine.js`** with async `execa`
6. **Clean up deprecated config-loader imports** — identify if behavior differs

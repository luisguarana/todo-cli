# TESTING.md — Test Structure & Practices
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Testing coverage is critically low. The root `package.json` has `npm test` returning exit code 1 ("no test specified"). AIOX framework core has approximately 7 test files for an entire codebase spanning 20+ subsystems. `lg-distributions/` has no test files detected. This is a major gap.

---

## Test Framework

| Sub-project | Framework | Status |
|-------------|-----------|--------|
| `.aiox-core/` | Likely Jest or Node.js built-in test runner | Minimal — ~7 files |
| `lg-distributions/` | None detected | No tests |
| Root workspace | None | `npm test` → exits 1 |

---

## Existing Test Coverage

### .aiox-core/ Tests

Approximately 7 test files exist across the framework. Coverage is present for:
- Some unit tests on core utilities
- Schema validation tests (via `ajv`)

**NOT covered (confirmed gaps):**
- Orchestration layer (`core/orchestration/`)
- Execution engine (`core/execution/`)
- Config loader system (`core/config/`)
- Infrastructure scripts (integrations, adapters)
- Quality gates pipeline
- Registry operations
- Health check system
- MCP management

### lg-distributions/

- **Zero test files detected**
- No testing configuration in `package.json`
- ESLint configured but no testing toolchain

---

## Test File Locations

```
.aiox-core/
└── (test files — ~7 scattered in core/ subdirectories)

lg-distributions/
└── (none)
```

No dedicated `tests/` or `__tests__/` directory structure observed at top level.

---

## Mocking Patterns

Based on framework architecture:
- `execa` is used for subprocess calls — would need mocking in unit tests
- `fs-extra` file operations — typically mocked with `memfs` or jest filesystem mocks
- No established mock directory or mock factory pattern detected

---

## CI / Automation

| Tool | Config | Status |
|------|--------|--------|
| Husky | `package.json` → `"prepare": "husky"` | Configured — runs git hooks |
| `.github/` | Present | GitHub Actions workflows may exist |
| CodeRabbit | `.aiox-core/core-config.yaml` | Code review automation (not test runner) |

Husky hooks are configured for pre-commit quality checks, but these appear to be lint/format focused rather than running test suites.

---

## Quality Gates (AIOX — Not Traditional Tests)

AIOX implements a 3-layer quality gate system that serves as a partial substitute for automated tests:

| Layer | File | When | Purpose |
|-------|------|------|---------|
| L1 Pre-commit | `core/quality-gates/layer1-precommit.js` | Before each commit | Code quality, format |
| L2 PR automation | `core/quality-gates/layer2-pr-automation.js` | On PR creation | Automated review |
| L3 Human review | `core/quality-gates/layer3-human-review.js` | Before merge | Human sign-off |

These gates use CodeRabbit (via WSL) for automated code review — but this is static analysis, not runtime test execution.

---

## Recommendations

1. **Add Jest** to `.aiox-core/` — already using Node 18+, straightforward setup
2. **Prioritize testing orchestration + execution layers** — highest risk, zero coverage
3. **Add Vitest** to `lg-distributions/` — matches Vite ecosystem in health dashboard
4. **Fix root `npm test`** — either add a test runner or point to workspace test scripts
5. **Add integration tests** for AI provider adapters using recorded fixtures

---

## Running Existing Tests

```bash
# .aiox-core/ (check for test script)
cd .aiox-core && npm test

# lg-distributions/ (no tests yet)
cd lg-distributions && npm run lint  # Only lint available

# Root workspace
npm test  # ⚠ Currently exits 1 — no test specified
```

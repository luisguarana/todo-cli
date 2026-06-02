---
phase: 02-hardening
fixed_at: 2026-06-02T00:00:00Z
review_path: .planning/phases/02-hardening/02-REVIEW.md
iteration: 1
findings_in_scope: 5
fixed: 5
skipped: 0
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-06-02
**Source review:** .planning/phases/02-hardening/02-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 5 (2 Critical + 3 Warning; IN-01 excluded per fix_scope=critical_warning)
- Fixed: 5
- Skipped: 0

## Fixed Issues

### CR-01: `todo add` with no argument silently corrupts the list

**Files modified:** `todo.js`
**Commit:** b061369
**Applied fix:** Added guard at top of `add` branch — if `process.argv[3]` is falsy or blank after trim, prints an error with usage hint and calls `process.exit(1)`. Also trims the text before storing and logging.

---

### CR-02: ID renumbering after `done` causes next deletion to silently target the wrong item

**Files modified:** `todo.js`
**Commit:** b061369
**Applied fix:** Removed the renumber loop (`for (let i = 0; i < todos.length; i++) { todos[i].id = i + 1; }`) entirely (Option A from review). IDs are now stable — assigned once at creation and never changed.

---

### WR-01: `todo done` with no argument prints confusing "ID NaN" message

**Files modified:** `todo.js`
**Commit:** b061369
**Applied fix:** Replaced direct `parseInt(process.argv[3], 10)` with a two-step validation: check rawId is truthy first (exit 1 with usage hint), then check `isNaN(id)` after parse (exit 1 with "ID must be a number" message).

---

### WR-02: `writeTodos` has no error handling — disk failures crash with raw stack trace

**Files modified:** `todo.js`
**Commit:** b061369
**Applied fix:** Wrapped `fs.writeFileSync` in a try/catch. On failure, prints `Error: could not save todos.json — <err.message>` and calls `process.exit(1)` instead of propagating the raw exception.

---

### WR-03: Unknown command exits with code 0 instead of 1

**Files modified:** `todo.js`
**Commit:** b061369
**Applied fix:** Changed `process.exit(0)` to `process.exit(1)` in the else branch so unknown commands signal failure to the shell.

---

_Fixed: 2026-06-02_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_

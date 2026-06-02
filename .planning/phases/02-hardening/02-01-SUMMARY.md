---
phase: 02-hardening
plan: "01"
subsystem: cli
tags: [nodejs, cli, error-handling, process-exit]

# Dependency graph
requires:
  - phase: 01-core-cli
    provides: todo.js with working add/list/done commands and ENOENT handling in readTodos()
provides:
  - printUsage() function printing four-line Usage: block to stdout
  - else/default branch in command dispatch calling printUsage() and exiting 0 on unknown/no command
  - index === -1 guard in done handler printing not-found message and exiting 1
affects: [any future phase extending todo.js command dispatch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "process.exit(0) for user-facing no-op paths (bad command, bare invocation)"
    - "process.exit(1) for recoverable user errors (not-found ID)"
    - "Reuse of existing ENOENT [] return from readTodos() — findIndex returns -1, same guard fires"

key-files:
  created: []
  modified:
    - todo.js

key-decisions:
  - "Usage block printed to stdout (not stderr) for CMD-04 compliance — exits 0 so shell pipes work"
  - "Not-found message includes the requested ID for immediate user clarity (ERR-01)"
  - "Missing todos.json + done <id> path reuses existing readTodos() [] return — no separate ENOENT branch needed"

patterns-established:
  - "printUsage() is a named function — easy to extend with new commands"
  - "else branch is the catch-all for both undefined command and unrecognized strings"

requirements-completed: [CMD-04, ERR-01, ERR-02]

# Metrics
duration: 8min
completed: 2026-06-02
---

# Phase 2 Plan 01: Hardening Summary

**Usage help via printUsage(), not-found exit-1 guard in done handler, and catch-all else branch covering undefined and unknown commands in todo.js**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-02T16:00:00Z
- **Completed:** 2026-06-02T16:08:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added `printUsage()` function printing a four-line Usage: block; called on bare invocation and unknown commands
- Added catch-all `else` branch at the end of the command dispatch chain — exits 0 cleanly
- Added `index === -1` guard immediately after `findIndex` in the done handler — prints "No todo with ID N." and exits 1; covers both nonexistent ID and missing todos.json (readTodos returns [], findIndex returns -1)

## Task Commits

1. **Task 1: Add usage help, ID guard, and missing-file graceful handling** - `7bcb6fc` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `todo.js` - Added printUsage(), else branch in command dispatch, index === -1 guard in done handler

## Decisions Made

- Usage block printed to stdout (not stderr) — CMD-04 intent is human-readable feedback; exits 0 so shell one-liners don't break
- Not-found message includes the requested ID so users know exactly what was rejected
- No separate ENOENT handling needed in done — existing readTodos() [] return causes findIndex to return -1, which the new guard catches cleanly

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All Phase 2 success criteria met: unknown/no command prints Usage: and exits 0, nonexistent ID exits 1 with message, missing todos.json produces no crash on any command path
- Phase 1 regression confirmed: add/list/done on valid data continue to work correctly
- No open items or blockers

## Self-Check: PASSED

- FOUND: todo.js
- FOUND: .planning/phases/02-hardening/02-01-SUMMARY.md
- FOUND: commit 7bcb6fc (feat(02-01): add usage help, ID guard, and missing-file graceful handling)

---
*Phase: 02-hardening*
*Completed: 2026-06-02*

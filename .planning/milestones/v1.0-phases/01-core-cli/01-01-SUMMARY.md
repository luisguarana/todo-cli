---
phase: 01-core-cli
plan: "01"
subsystem: cli
tags: [cli, node, commonjs, todo]
dependency_graph:
  requires: []
  provides: [todo.js, todos.json]
  affects: [package.json]
tech_stack:
  added: []
  patterns: [CommonJS, process.argv dispatch, fs.readFileSync/writeFileSync, ENOENT guard]
key_files:
  created:
    - todo.js
  modified:
    - package.json
decisions:
  - "CommonJS require() used per D-02 and package.json type:commonjs"
  - "Storage path via path.join(process.cwd(),'todos.json') per STR-01"
  - "ENOENT guard returns [] on missing file per STR-02"
  - "Renumbering loop sets todos[i].id = i+1 after splice per D-06"
  - "bin field already committed in prior session (4f33c84) — no duplicate added"
metrics:
  duration: "~8 minutes"
  completed: "2026-06-02T15:07:31Z"
  tasks_completed: 1
  tasks_total: 1
  files_changed: 1
---

# Phase 1 Plan 1: Implement todo.js add/list/done commands Summary

**One-liner:** CommonJS CLI with add/list/done commands persisting `{id,text}` items to `todos.json` via Node.js built-ins only.

## What Was Built

`todo.js` at workspace root — a single-file Node.js CLI that:

- Reads command from `process.argv[2]`
- `add`: appends `{id, text}` to `todos.json`, prints `Added: <text> (ID: <N>)`
- `list`: prints each item as `<id>. <text>` or `No todos yet.` when empty
- `done`: removes item by ID, renumbers remaining 1..N, prints `Done: removed "<text>"`
- Auto-creates `todos.json` on first `add` via ENOENT catch returning `[]`

## Verification Results

| Test | Expected | Actual | Pass |
|------|----------|--------|------|
| `add "buy milk"` (first run) | `Added: buy milk (ID: 1)` | `Added: buy milk (ID: 1)` | YES |
| `add "walk dog"` | `Added: walk dog (ID: 2)` | `Added: walk dog (ID: 2)` | YES |
| `list` (2 items) | `1. buy milk\n2. walk dog` | `1. buy milk\n2. walk dog` | YES |
| `done 1` | `Done: removed "buy milk"` | `Done: removed "buy milk"` | YES |
| `list` after done | `1. walk dog` | `1. walk dog` | YES |
| `list` (empty) | `No todos yet.` | `No todos yet.` | YES |
| todos.json content after done | `[{"id":1,"text":"walk dog"}]` | Match | YES |
| Built-in requires only | fs, path only | fs, path only | YES |

## Deviations from Plan

**1. [Rule 2 - Deviation noted] `bin` field already committed**
- Found during: Task 1 pre-check
- Issue: Commit `4f33c84` (feat(01-02): add bin field) already existed in git history with the exact `bin` field content
- Fix: My edit matched the already-tracked state exactly — `git diff package.json` showed no diff, so no duplicate was introduced
- Files modified: None (no-op)
- Commit: N/A

No other deviations — plan executed exactly as specified.

## Commits

| Hash | Message |
|------|---------|
| `18f2830` | feat(01-01): implement todo.js add/list/done commands |

## Requirements Satisfied

| Requirement | Status |
|-------------|--------|
| CMD-01: `todo add "<text>"` | DONE |
| CMD-02: `todo list` | DONE |
| CMD-03: `todo done <id>` | DONE |
| STR-01: todos.json in CWD | DONE |
| STR-02: auto-create on first add | DONE |
| STR-03: `{id, text}` JSON objects | DONE |
| CON-01: zero external npm deps | DONE |

## Known Stubs

None — all three commands are fully wired to `todos.json`.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced beyond what the plan's threat model documents.

## Self-Check: PASSED

- [x] `C:/Users/nextl/Desktop/AI_Workspace/todo.js` exists
- [x] Line 1 is `#!/usr/bin/env node`
- [x] Commit `18f2830` exists in git log
- [x] All 8 verification tests passed
- [x] Only built-in requires: `fs`, `path`

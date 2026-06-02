# Roadmap: todo-cli

## Overview

Two phases deliver the complete tool. Phase 1 ships a working CLI that adds, lists, and removes to-dos using local JSON storage with no external dependencies. Phase 2 hardens the experience with graceful error handling and a help command so the tool behaves correctly on every input, not just the happy path.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Core CLI** - Working add/list/done commands with todos.json persistence (completed 2026-06-02)
- [x] **Phase 2: Hardening** - Graceful error handling and usage help on bad input (completed 2026-06-02)

## Phase Details

### Phase 1: Core CLI

**Goal:** Users can add, list, and remove to-do items entirely from the terminal with zero setup
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** CMD-01, CMD-02, CMD-03, STR-01, STR-02, STR-03, CON-01
**Success Criteria** (what must be TRUE):

  1. User can run `todo add "buy milk"` and the item appears in todos.json in the CWD
  2. User can run `todo list` and see all pending items with their numeric IDs and text
  3. User can run `todo done 1` and that item is permanently removed from todos.json
  4. todos.json is created automatically on first `todo add` if the file does not exist
  5. The entire tool runs on Node.js built-ins only — no node_modules directory is needed

**Plans:** 2/2 plans complete

Plans:

- [x] 01-01-PLAN.md — Implement todo.js with add, list, and done commands (Wave 1)
- [x] 01-02-PLAN.md — Add bin field to package.json for global CLI registration (Wave 1)

### Phase 2: Hardening

**Goal:** Users receive clear feedback on every input — bad IDs, missing files, and unknown commands never crash the tool
**Mode:** mvp
**Depends on:** Phase 1
**Requirements:** CMD-04, ERR-01, ERR-02
**Success Criteria** (what must be TRUE):

  1. Running `todo` or `todo unknown-command` prints usage instructions and exits with code 0
  2. Running `todo done 99` when ID 99 does not exist prints a clear message and exits non-zero
  3. Running `todo list` or `todo done <id>` when todos.json does not yet exist produces no crash or stack trace

**Plans:** 1 plan
Plans:

- [x] 02-01-PLAN.md — Add usage help, ID guard, and missing-file graceful handling (Wave 1)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Core CLI | 2/2 | Complete   | 2026-06-02 |
| 2. Hardening | 1/1 | Complete     | 2026-06-02 |

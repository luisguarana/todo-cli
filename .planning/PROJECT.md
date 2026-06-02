# todo-cli

## What This Is

A minimal Node.js command-line tool for managing personal to-do items. Users run `todo add "buy milk"`, `todo list`, and `todo done 1` to manage tasks. Items persist to a `todos.json` file in the current working directory — no external dependencies, Node.js built-ins only.

## Core Value

A user can add, view, and mark tasks done entirely from the terminal with zero setup.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] `todo add "<text>"` creates a new item with an auto-incremented ID and saves to todos.json
- [ ] `todo list` displays all pending items with their IDs and text
- [ ] `todo done <id>` removes the item with that ID from todos.json permanently
- [ ] todos.json is stored in the current working directory where the command is run
- [ ] No external npm dependencies — Node.js built-ins only (fs, path, process)
- [ ] Graceful error handling for unknown IDs, missing todos.json, and invalid commands

### Out of Scope

- Global todos file (~/.todos.json) — per-directory storage chosen for project isolation
- `todo delete` / `todo clear` commands — keep it to three commands
- Marking done without removing — item removal keeps the list clean
- Due dates, priorities, tags — intentional scope limit; add/list/done only
- TUI or interactive mode — pure CLI, no prompts

## Context

- Pure CLI tool; invoked as `todo <command> [args]`
- Likely installed globally via `npm link` or `npm install -g`
- todos.json format: array of objects `{ id: number, text: string }`
- IDs are assigned sequentially; gap-free renumbering after done is a design choice to revisit
- Target environment: any machine with Node.js 18+

## Constraints

- **Dependencies**: No external npm packages — Node.js built-ins only (fs, path, process)
- **Interface**: Three commands only — add, list, done
- **Storage**: Local todos.json in CWD — no database, no cloud sync

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| todos.json in CWD, not home dir | Per-directory isolation — works naturally per project | — Pending |
| `done` removes item permanently | Simpler list; no completed-item clutter | — Pending |
| No external dependencies | Portability and simplicity — installs anywhere Node runs | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-02 after initialization*

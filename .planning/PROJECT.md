# todo-cli

## What This Is

A minimal Node.js command-line tool for managing personal to-do items. Users run `todo add "buy milk"`, `todo list`, and `todo done 1` to manage tasks. Items persist to a `todos.json` file in the current working directory — no external dependencies, Node.js built-ins only.

Shipped v1.0 on 2026-06-02. Tool is fully functional and published at github.com/luisguarana/todo-cli.

## Core Value

A user can add, view, and mark tasks done entirely from the terminal with zero setup.

## Requirements

### Validated

- ✓ `todo add "<text>"` creates a new item with an auto-incremented ID and saves to todos.json — v1.0
- ✓ `todo list` displays all pending items with their IDs and text — v1.0
- ✓ `todo done <id>` removes the item with that ID from todos.json permanently — v1.0
- ✓ todos.json is stored in the current working directory where the command is run — v1.0
- ✓ No external npm dependencies — Node.js built-ins only (fs, path, process) — v1.0
- ✓ Graceful error handling for unknown IDs, missing todos.json, and invalid commands — v1.0

### Active (v1.1 candidates)

- [ ] `todo delete <id>` — alias for `done` that makes the intent clearer (EXT-01)
- [ ] `todo clear` — wipe all items at once (EXT-02)
- [ ] `todo edit <id> "<new text>"` — update the text of an existing item (EXT-03)
- [ ] Due dates on items (`todo add "buy milk" --due 2026-06-10`) (FEAT-01)
- [ ] Priority levels (low / medium / high) (FEAT-02)
- [ ] Filter `todo list --done` to see a completed-items archive (FEAT-03)

### Out of Scope

- Global todos file (~/.todos.json) — per-directory storage chosen for project isolation; works naturally per project
- Marking done without removing — item removal keeps the list clean; no completed-item clutter
- Due dates, priorities, tags — intentional scope limit for v1; add/list/done only
- TUI or interactive mode — pure CLI, no prompts
- Sync / cloud backup — local file only
- External npm dependencies — hard constraint; installs anywhere Node runs

## Context

- Shipped: v1.0 (2026-06-02) — 2 phases, 3 plans, ~24 min execution
- Codebase: single file `todo.js` (~84 LOC) + `package.json`
- Tech stack: Node.js 18+ (CommonJS), `fs`, `path`, `process` built-ins only
- Install: `npm link` → `todo` available globally; or `node todo.js <command>`
- Storage: `todos.json` as array of `{ id: number, text: string }` objects in CWD
- Known debt: `Math.max(...ids)` returns NaN on corrupt todos.json — accepted for local single-user CLI
- Published: github.com/luisguarana/todo-cli

## Constraints

- **Dependencies**: No external npm packages — Node.js built-ins only (fs, path, process)
- **Interface**: Three commands only — add, list, done
- **Storage**: Local todos.json in CWD — no database, no cloud sync

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| todos.json in CWD, not home dir | Per-directory isolation — works naturally per project | ✓ Good — no conflicts between project todos |
| `done` removes item permanently | Simpler list; no completed-item clutter | ✓ Good — clean UX |
| No external dependencies | Portability and simplicity — installs anywhere Node runs | ✓ Good — zero setup friction |
| Usage block to stdout (not stderr) | CMD-04 intent is human-readable feedback; exits 0 so shell pipes work | ✓ Good |
| Not-found message includes requested ID | Immediate user clarity on rejection | ✓ Good |
| Reuse ENOENT [] return for missing-file + done | No separate branch needed; findIndex -1 covers both | ✓ Good — DRY |

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
*Last updated: 2026-06-02 after v1.0 milestone*

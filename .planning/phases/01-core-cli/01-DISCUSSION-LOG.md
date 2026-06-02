# Phase 1: Core CLI - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-02
**Phase:** 1-Core CLI
**Areas discussed:** Project location, ID renumbering after done, List display format

---

## Project Location

| Option | Description | Selected |
|--------|-------------|----------|
| Root package.json | Add bin field to existing workspace package.json. Single todo.js, no subdirectory. Works with npm link from root. | ✓ |
| Separate todo-cli/ subdirectory | Own package.json in todo-cli/. Cleaner isolation but more files. | |

**User's choice:** Root package.json

| Option | Description | Selected |
|--------|-------------|----------|
| todo.js | Clean match for the `todo` command. Shebang + bin field. | ✓ |
| bin/todo.js | Conventional bin/ directory pattern. | |

**User's choice:** todo.js

| Option | Description | Selected |
|--------|-------------|----------|
| CommonJS — require() | Matches existing 'type': 'commonjs'. No config changes needed. | ✓ |
| ES Modules — import/export | Would require todo.mjs or changing package.json type, affecting husky. | |

**User's choice:** CommonJS — require()

**Notes:** All three sub-decisions aligned on the simplest possible setup — single file at root, matching workspace config.

---

## ID Renumbering After Done

| Option | Description | Selected |
|--------|-------------|----------|
| Renumber to fill gaps | After removing #2: items become [1, 2]. Always sequential, no gaps. Easier to type. | ✓ |
| Keep existing IDs (leave gaps) | After removing #2: items stay [1, 3]. Stable identifiers. Simpler implementation. | |

**User's choice:** Renumber to fill gaps

| Option | Description | Selected |
|--------|-------------|----------|
| max(existing IDs) + 1 | Next ID = highest current ID + 1. Simple, gap-free with renumbering. | ✓ |
| Length + 1 | Equivalent when combined with renumbering. | |

**User's choice:** max(existing IDs) + 1

**Notes:** Gap-free renumbering chosen for UX — users shouldn't need to track which IDs exist. IDs will always be 1..N.

---

## List Display Format

| Option | Description | Selected |
|--------|-------------|----------|
| 1. buy milk | Simple numbered list with dot separator. Clean, minimal. | ✓ |
| [1] buy milk | Bracket-wrapped ID. More visual weight. | |
| You decide | Let planner pick. | |

**User's choice:** `1. buy milk`

| Option | Description | Selected |
|--------|-------------|----------|
| Print a message | Output: 'No todos yet.' — clear, no confusion about whether it worked. | ✓ |
| Print nothing (empty output) | Silence — scriptable, but could look like failure. | |

**User's choice:** Print a message ("No todos yet.")

| Option | Description | Selected |
|--------|-------------|----------|
| Confirmation message | add: 'Added: buy milk (ID: 3)' / done: 'Done: removed "buy milk"' | ✓ |
| Silent (no output) | Nothing on success — Unix philosophy. | |

**User's choice:** Confirmation messages for both add and done

**Notes:** User chose the more informative defaults throughout — messages over silence.

---

## Claude's Discretion

- JSON write strategy (sync vs. async fs calls) — Node built-ins only, either fine
- Whether to extract file I/O into helper function or keep inline

## Deferred Ideas

None — discussion stayed within phase scope.

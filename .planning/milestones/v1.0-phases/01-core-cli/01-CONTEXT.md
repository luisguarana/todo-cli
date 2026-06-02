# Phase 1: Core CLI - Context

**Gathered:** 2026-06-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers a working Node.js CLI with three commands — `todo add`, `todo list`, `todo done` — that persist items to `todos.json` in the current working directory. Zero external npm dependencies. No error handling edge cases (those are Phase 2).

</domain>

<decisions>
## Implementation Decisions

### Project Structure
- **D-01:** Entry point is `todo.js` at the workspace root — no subdirectory
- **D-02:** Module system: CommonJS (`require()`) — matches existing `"type": "commonjs"` in root `package.json`
- **D-03:** Add `"bin": { "todo": "./todo.js" }` to the root `package.json` so `npm link` / `npm install -g` makes `todo` available globally
- **D-04:** `todo.js` must start with `#!/usr/bin/env node` shebang

### ID Numbering
- **D-05:** IDs are always sequential and gap-free (1..N) — no gaps ever
- **D-06:** On `todo done <id>`: remove the item, then renumber remaining items 1..N in their current order
- **D-07:** On `todo add`: new ID = `max(existing IDs) + 1`; if list is empty, ID = 1

### Output Format
- **D-08:** `todo list` formats each item as `1. buy milk` (number + dot + space + text)
- **D-09:** `todo list` on an empty list prints: `No todos yet.`
- **D-10:** `todo add` on success prints: `Added: <text> (ID: <N>)`
- **D-11:** `todo done` on success prints: `Done: removed "<text>"`

### Claude's Discretion
- JSON write strategy (sync vs. async `fs` calls) — Node built-ins only, either approach is fine
- Whether to extract file I/O into a helper function or keep everything inline

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — CMD-01, CMD-02, CMD-03, STR-01, STR-02, STR-03, CON-01 are in scope for Phase 1
- `.planning/PROJECT.md` — Key Decisions table and Out of Scope list

### Roadmap
- `.planning/ROADMAP.md` — Phase 1 success criteria (5 items) define what must be TRUE to ship

No external ADRs or specs — all requirements captured above and in REQUIREMENTS.md.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — this is greenfield. The `todo.js` file does not exist yet.

### Established Patterns
- Root `package.json` uses `"type": "commonjs"` — all new JS files default to CJS; use `require()` not `import`
- Root `package.json` has husky devDependency — don't change `scripts.prepare`, only add `bin` field

### Integration Points
- `todo.js` is the only new file for Phase 1; it reads/writes `todos.json` in `process.cwd()`
- No integration with AIOX framework or other workspace modules

</code_context>

<specifics>
## Specific Ideas

No specific reference apps or "I want it like X" moments — open to standard Node.js CLI patterns.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Core CLI*
*Context gathered: 2026-06-02*

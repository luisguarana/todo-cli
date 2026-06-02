# Requirements: todo-cli

**Defined:** 2026-06-02
**Core Value:** A user can add, view, and mark tasks done entirely from the terminal with zero setup.

## v1 Requirements

### CLI Commands

- [ ] **CMD-01**: User can run `todo add "<text>"` to create a new to-do item
- [ ] **CMD-02**: User can run `todo list` to display all pending items with their IDs and text
- [ ] **CMD-03**: User can run `todo done <id>` to permanently remove an item by ID
- [ ] **CMD-04**: Running `todo` or an unknown subcommand prints usage help and exits cleanly

### Storage

- [ ] **STR-01**: Items are persisted to `todos.json` in the current working directory
- [ ] **STR-02**: `todos.json` is created automatically on the first `todo add` if it does not exist
- [ ] **STR-03**: Each item stored as `{ "id": <number>, "text": "<string>" }` in a JSON array

### Error Handling

- [ ] **ERR-01**: `todo done <id>` prints a clear message and exits non-zero if the ID does not exist
- [ ] **ERR-02**: `todo list` and `todo done` handle a missing `todos.json` gracefully (no crash)

### Constraints

- [ ] **CON-01**: Zero external npm dependencies — Node.js built-ins only (fs, path, process)

## v2 Requirements

### Extended Commands

- **EXT-01**: `todo delete <id>` — alias for `done` that makes the intent clearer
- **EXT-02**: `todo clear` — wipe all items at once
- **EXT-03**: `todo edit <id> "<new text>"` — update the text of an existing item

### Features

- **FEAT-01**: Due dates on items (`todo add "buy milk" --due 2026-06-10`)
- **FEAT-02**: Priority levels (low / medium / high)
- **FEAT-03**: Filter `todo list --done` to see a completed-items archive

## Out of Scope

| Feature | Reason |
|---------|--------|
| Global todos file (~/.todos.json) | Per-directory storage chosen for project isolation |
| Mark-done-without-remove | Simpler list; no completed-item clutter |
| Interactive TUI / prompts | Pure CLI only |
| Sync / cloud backup | Out of scope; local file only |
| External npm dependencies | Hard constraint — Node built-ins only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMD-01 | — | Pending |
| CMD-02 | — | Pending |
| CMD-03 | — | Pending |
| CMD-04 | — | Pending |
| STR-01 | — | Pending |
| STR-02 | — | Pending |
| STR-03 | — | Pending |
| ERR-01 | — | Pending |
| ERR-02 | — | Pending |
| CON-01 | — | Pending |

**Coverage:**
- v1 requirements: 10 total
- Mapped to phases: 0
- Unmapped: 10 ⚠️ (roadmap not yet created)

---
*Requirements defined: 2026-06-02*
*Last updated: 2026-06-02 after initial definition*

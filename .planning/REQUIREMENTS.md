# Requirements: todo-cli

**Defined:** 2026-06-02
**Core Value:** A user can add, view, and mark tasks done entirely from the terminal with zero setup.

## v1 Requirements

### CLI Commands

- [x] **CMD-01**: User can run `todo add "<text>"` to create a new to-do item
- [x] **CMD-02**: User can run `todo list` to display all pending items with their IDs and text
- [x] **CMD-03**: User can run `todo done <id>` to permanently remove an item by ID
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
| CMD-01 | Phase 1 | Complete |
| CMD-02 | Phase 1 | Complete |
| CMD-03 | Phase 1 | Complete |
| CMD-04 | Phase 2 | Pending |
| STR-01 | Phase 1 | Pending |
| STR-02 | Phase 1 | Pending |
| STR-03 | Phase 1 | Pending |
| ERR-01 | Phase 2 | Pending |
| ERR-02 | Phase 2 | Pending |
| CON-01 | Phase 1 | Pending |

**Coverage:**

- v1 requirements: 10 total
- Mapped to phases: 10
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-02*
*Last updated: 2026-06-02 after roadmap creation*

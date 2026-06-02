---
phase: 02-hardening
reviewed: 2026-06-02T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - todo.js
findings:
  critical: 2
  warning: 3
  info: 1
  total: 6
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-06-02
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed `todo.js` — a 67-line Node.js CLI for managing a local `todos.json` todo list. The file is compact and covers the three required commands (`add`, `list`, `done`). Two critical correctness issues were found: silent acceptance of a blank `add` argument (storing `null` and corrupting the list) and broken ID renumbering that makes stale IDs silently target the wrong item after any deletion. Three warnings cover missing input validation on `done`, unhandled write failures, and a wrong exit code on unknown commands.

---

## Critical Issues

### CR-01: `todo add` with no argument silently corrupts the list

**File:** `todo.js:34-39`
**Issue:** `process.argv[3]` is `undefined` when the user runs `todo add` without a task. `undefined` is silently pushed as the item text. `JSON.stringify` serializes `undefined` values inside objects as `null`, so `todos.json` ends up with `{ "id": 1, "text": null }`. Subsequent `list` output shows `"1. null"` and the corruption is permanent — there is no validation or error message.
**Fix:**
```js
if (command === 'add') {
  const text = process.argv[3];
  if (!text || text.trim() === '') {
    console.error('Error: please provide a task description.');
    console.error('  Usage: todo add <text>');
    process.exit(1);
  }
  const todos = readTodos();
  const newId = todos.length === 0 ? 1 : Math.max(...todos.map(i => i.id)) + 1;
  todos.push({ id: newId, text: text.trim() });
  writeTodos(todos);
  console.log('Added: ' + text.trim() + ' (ID: ' + newId + ')');
}
```

---

### CR-02: ID renumbering after `done` causes next deletion to silently target the wrong item

**File:** `todo.js:59-61`
**Issue:** After removing an item, the code rewrites all remaining IDs as `i + 1` (sequential from 1). This means any ID the user copied from a previous `list` output is stale: if item 3 is deleted, what was item 4 becomes item 3. A user who planned to mark item 4 done will now delete what was item 5. The renumbering is silent and there is no re-display of the updated list. This is incorrect behavior: displayed IDs do not remain stable across operations.

Two options — pick one based on intent:

**Option A — Stable IDs (no renumbering):** Remove the renumber loop entirely. IDs are assigned once at creation and never change.
```js
// DELETE lines 59-61:
// for (let i = 0; i < todos.length; i++) {
//   todos[i].id = i + 1;
// }
```

**Option B — Re-display after removal so user sees updated IDs:**
```js
todos.splice(index, 1);
// keep renumbering if desired, but always print the new list
writeTodos(todos);
console.log('Done: removed "' + removed.text + '"');
if (todos.length > 0) {
  console.log('\nRemaining todos:');
  todos.forEach(function(item) { console.log(item.id + '. ' + item.text); });
}
```

---

## Warnings

### WR-01: `todo done` with no argument prints confusing "ID NaN" message instead of usage error

**File:** `todo.js:50`
**Issue:** `parseInt(undefined, 10)` returns `NaN`. `todos.findIndex` comparing `item.id === NaN` is always `false` (NaN is not equal to anything, including itself), so the code prints `"No todo with ID NaN."` and exits 1. This is misleading — the real problem is a missing argument, not a missing item.
**Fix:**
```js
const rawId = process.argv[3];
if (!rawId) {
  console.error('Error: please provide a todo ID.');
  console.error('  Usage: todo done <id>');
  process.exit(1);
}
const id = parseInt(rawId, 10);
if (isNaN(id)) {
  console.error('Error: ID must be a number, got: ' + rawId);
  process.exit(1);
}
```

---

### WR-02: `writeTodos` has no error handling — disk-full or permission failures crash with a raw stack trace

**File:** `todo.js:27-29`
**Issue:** `fs.writeFileSync` throws on disk-full, permission-denied, or path-not-writable. The exception propagates unhandled to the top level, printing a raw Node.js stack trace to stderr with no actionable message to the user. Data may also be partially written.
**Fix:**
```js
function writeTodos(todos) {
  try {
    fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Error: could not save todos.json — ' + err.message);
    process.exit(1);
  }
}
```

---

### WR-03: Unknown command exits with code 0 instead of 1

**File:** `todo.js:65-66`
**Issue:** `process.exit(0)` on an unrecognized command signals success to the shell. Scripts that check `$?` after `todo typo` will incorrectly treat it as a successful run. The standard convention for CLI tools is to exit non-zero on an unrecognized command.
**Fix:**
```js
} else {
  printUsage();
  process.exit(1);   // changed from 0 to 1
}
```

---

## Info

### IN-01: `Math.max(...todos.map(i => i.id))` produces `NaN` if any item has a non-numeric ID

**File:** `todo.js:36`
**Issue:** If `todos.json` is manually edited and an ID is a string or missing, `Math.max(...)` returns `NaN`, making `newId = NaN`. The next item is saved with `{ id: NaN }`. This is a secondary consequence of the lack of input validation on the stored file. It can be avoided cheaply.
**Fix:**
```js
const ids = todos.map(i => i.id).filter(id => Number.isFinite(id));
const newId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
```

---

_Reviewed: 2026-06-02_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_

# CONVENTIONS.md — Code Style & Patterns
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Two distinct codebases with different conventions: AIOX framework core (Node.js ES Modules, verbose JSDoc, functional patterns) and lg-distributions (TypeScript, Next.js App Router conventions). Business workspace docs follow markdown + YAML conventions enforced by Claude Code rules.

---

## AIOX Framework (.aiox-core/) — Node.js

### Module System

- **ES Modules** — `"type": "module"` in `package.json`
- Imports use `.js` extensions explicitly: `import { foo } from './utils/foo.js'`
- No CommonJS `require()` in framework core
- Exception: root workspace `package.json` uses `"type": "commonjs"`

### File Naming

| Pattern | Where | Example |
|---------|-------|---------|
| `kebab-case.js` | All core files | `bob-orchestrator.js`, `semantic-merge-engine.js` |
| `kebab-case.yaml` | Config and workflow files | `bob-surface-criteria.yaml`, `core-config.yaml` |
| `SCREAMING_CASE.md` | Reference documents | `MEMORY.md`, `README.md` |
| `kebab-case.schema.json` | Schema definitions | `agent-v3-schema.json` |

### Code Patterns

**Class-based structure for major subsystems:**
```javascript
// Pattern from bob-orchestrator.js, context-manager.js
export class BobOrchestrator {
  constructor(config) { ... }
  async execute(story) { ... }
}
```

**Async/await throughout — no raw Promise chains:**
```javascript
async function runWorkflow(context) {
  const result = await executor.run(context);
  return result;
}
```

**Error handling — try/catch with descriptive messages:**
```javascript
try {
  await someOperation();
} catch (error) {
  console.error(`Error in ${operation}:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
}
```

**execa for child process execution** (not `exec` or `spawn` directly):
```javascript
import { execa } from 'execa';
const { stdout } = await execa('git', ['status']);
```

**js-yaml for all YAML operations:**
```javascript
import yaml from 'js-yaml';
const config = yaml.load(fs.readFileSync('core-config.yaml', 'utf8'));
```

**JSON Schema validation via ajv:**
```javascript
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(schema);
```

### Naming Conventions (AIOX)

| Type | Convention | Example |
|------|-----------|---------|
| Classes | PascalCase | `BobOrchestrator`, `BuildOrchestrator` |
| Functions | camelCase | `executeWorkflow()`, `loadConfig()` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITERATIONS`, `DEFAULT_TIMEOUT` |
| Files | kebab-case | `bob-orchestrator.js` |
| YAML keys | kebab-case | `max-iterations`, `quality-gates` |

---

## lg-distributions/ — TypeScript / Next.js

### TypeScript

- **Strict mode** enabled in `tsconfig.json`
- Explicit return types on exported functions
- No `any` types (enforced by `eslint-config-next`)

### Next.js App Router Conventions

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Route pages
├── components/         # Shared UI components (co-located or shared)
└── globals.css         # Global styles
```

- Pages use `export default function Page()` pattern
- Server Components by default; `'use client'` directive for client components
- Metadata via `export const metadata = { ... }`

### Tailwind CSS

- Utility classes inline in JSX
- Custom tokens in `tailwind.config.ts`
- No separate CSS modules (utility-first pattern)

---

## Markdown / Documentation Conventions

### Business Documents (00–06 folders)

- Newest entries at **top** of session logs
- Tables over paragraphs (CLAUDE.md formatting rule)
- Short bullets — max 2–3 sentences
- Section dividers: `────── SECTION ──────`
- Emojis as visual anchors: ✅ ⚠️ ❌ 🔧 💡 📊 📋

### AIOX Story Files

Format: `{epicNum}.{storyNum}.story.md`

Required sections:
- Story ID, Title, Status
- Acceptance Criteria (checkboxes)
- Tasks (checkboxes — checked as completed)
- File List (updated as files change)

Status lifecycle: `Draft → Ready → InProgress → InReview → Done`

### CLAUDE.md / Rules Files

- Rule files in `.claude/rules/` use frontmatter `paths:` for conditional loading
- Agent files in `.claude/agents/` define persona, scope, commands
- All rule files are Markdown with structured headers

---

## Git Conventions

| Type | Format | Example |
|------|--------|---------|
| Features | `feat: description [Story X.Y]` | `feat: implement IDE detection [Story 2.1]` |
| Fixes | `fix: description` | `fix: null check in config-loader` |
| Docs | `docs: description` | `docs: update agent authority rules` |
| Chores | `chore: description` | `chore: bump version to 5.2.9` |
| Refactors | `refactor: description` | `refactor: extract quality-gate base layer` |

Commit scope: atomic — one logical change per commit.

---

## Agent Persona Files (.claude/agents/)

Each agent file follows this pattern:
```markdown
---
name: agent-name
description: When to use this agent
---

# Agent Name — Role

## Capabilities
[What this agent does]

## Workflow
[How it works]
```

---

## Environment Variable Conventions

From `.env.example` (2.7KB — significant number of vars):
- AI provider keys: `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `OPENAI_API_KEY`
- Service keys for PM adapters, Supabase, etc.
- Never committed — `.env` in `.gitignore`

---

## CLI Commands (AIOX)

- Agent activation: `@agent-name` syntax
- Agent commands: `*command-name` prefix
- Framework commands: `aiox <subcommand>` via `bin/aiox.js`
- Interactive prompts: powered by `inquirer` v8

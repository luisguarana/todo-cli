# STRUCTURE.md — Directory Layout & Organization
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Mixed-purpose workspace: numbered business folders (00–99), framework directory (`.aiox-core/`), Claude Code config (`.claude/`), and a web app sub-project (`lg-distributions/`). Numbering convention on business folders enforces load order.

---

## Root Directory Layout

```
AI_Workspace/
├── 00_Start_Here/          # Session startup — load first
│   ├── Session_Log.md      # Dated session history (newest at top)
│   └── Sophia_Load_Context.md  # Orchestrator persona + routing instructions
│
├── 01_Core_Context/        # Business context — load second
│   └── Guarana_Master_Briefing.md  # Priority queue, open action items, strategy
│
├── 02_Tasks_and_Projects/  # Active tasks and project tracking
│
├── 03_Agents/              # Specialist agent instruction files
│   ├── Marcus_Small_Engine_Tech.md
│   ├── Nora_Pricing_Analyst.md
│   ├── Devon_Sourcing_Scout.md
│   ├── Jamie_Listings_Specialist.md
│   ├── Olivia_Operations_Manager.md
│   ├── Theo_Marketing_Content.md
│   ├── Priya_Personal_Admin.md
│   └── Riley_Research_Analyst.md
│
├── 04_Reference/           # Apps Script, audit reports, reference docs
│
├── 05_Outputs/             # Generated files, morning briefings
│   ├── morning-briefing-*.md
│   ├── Parts_Gap_Report_*.md
│   └── Open_Loops_Audit_*.md
│
├── 06_Schedules/           # Scheduling data
│
├── 99_Archive/             # Retired files (archive, never delete)
│
├── DONT-USE-OLD-FILES/     # Explicitly deprecated files
│
├── docs/                   # AIOX project documentation
│   └── superpowers/        # Superpowers skill docs
│
├── lg-distributions/       # Next.js web app sub-project
│   ├── app/                # Next.js App Router pages
│   ├── .eslintrc.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── .aiox-core/             # AIOX framework (v5.2.9)
│   ├── bin/                # CLI entry points (aiox.js, aiox-init.js)
│   ├── cli/                # CLI command implementations
│   ├── core/               # Framework engine (see Core Layout below)
│   ├── data/               # Registry YAML, tool examples, configs
│   ├── development/        # Templates, tasks, checklists, workflows
│   ├── docs/               # Framework documentation
│   ├── elicitation/        # Interactive requirement gathering
│   ├── infrastructure/     # Integrations (AI providers, PM adapters)
│   ├── manifests/          # Install/deploy manifests
│   ├── monitor/            # System monitoring
│   ├── presets/            # Pre-configured profiles
│   ├── product/            # PRD templates, schemas, story templates
│   ├── schemas/            # JSON Schema definitions
│   ├── scripts/            # Utility + diagnostic scripts
│   │   └── diagnostics/health-dashboard/  # Vite SPA dashboard
│   ├── user-guide.md       # Framework user documentation
│   ├── constitution.md     # Framework constitution (non-negotiable rules)
│   ├── core-config.yaml    # Master framework config
│   └── package.json        # Dependencies (v5.2.9)
│
├── .claude/                # Claude Code configuration
│   ├── agents/             # Agent definitions (30+ .md files)
│   ├── commands/           # Slash command definitions
│   ├── rules/              # Contextual rules (auto-loaded)
│   ├── settings.json       # Permissions, deny/allow rules
│   └── skills/             # Skill implementations
│
├── .planning/              # GSD planning workspace (this file's home)
│   └── codebase/           # Codebase map documents
│
├── .mcp.json               # MCP server config (ruflo/claude-flow)
├── .env / .env.example     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Root workspace (husky hooks)
├── CLAUDE.md               # Workspace-level Claude Code instructions
├── AGENTS.md               # Multi-runtime agent instructions
│
└── Business Data Files
    ├── Guarana_Master_Sheet.xlsx    # Primary tracker (303KB)
    ├── Guarana_Flips_Tracker.xlsx   # Flip inventory (87KB) — RETIRED
    ├── CheckSammy_Master_Tracker.xlsx
    ├── Auto_Insurance_Comparison_Tracker.xlsx
    ├── KFS_Cleaning_Website*.html   # KFS static site versions (v1–v5)
    └── KFS_Cleaning_Logo.{png,svg}
```

---

## .aiox-core/core/ Layout (Key Subsystems)

```
core/
├── code-intel/         # Code analysis enrichment (optional)
├── config/             # Schema-validated config loader
├── doctor/             # Diagnostics / health checks
├── elicitation/        # Interactive CLI prompts
├── errors/             # Error types and handling
├── events/             # Event system
├── execution/          # Build execution engine
│   ├── autonomous-build-loop.js
│   ├── build-orchestrator.js
│   ├── parallel-executor.js
│   └── semantic-merge-engine.js
├── external-executors/ # External tool runners
├── graph-dashboard/    # Dependency graph visualizer
├── health-check/       # System health monitoring
├── ideation/           # Idea/feature generation
├── ids/                # Incremental Development System
├── manifest/           # Framework manifest handling
├── mcp/                # MCP server management
├── memory/             # Agent memory persistence
├── migration/          # Data migration tools
├── orchestration/      # Workflow orchestration
│   ├── bob-orchestrator.js     # Main workflow runner
│   ├── brownfield-handler.js   # Legacy codebase support
│   └── context-manager.js      # Session context
├── permissions/        # Permission system
├── pro/                # Pro features
├── quality-gates/      # 3-layer review pipeline
├── registry/           # Entity registry (821 entries)
├── resilience/         # Fault tolerance
├── session/            # Session state
├── synapse/            # Workflow rule engine
├── ui/                 # CLI UI components
└── utils/              # Shared utilities
```

---

## Naming Conventions

| Convention | Pattern | Example |
|-----------|---------|---------|
| Business folders | `NN_Title_Case/` | `03_Agents/`, `99_Archive/` |
| Agent files | `Name_Role.md` | `Marcus_Small_Engine_Tech.md` |
| Output files | `report-type-YYYY-MM-DD.md` | `morning-briefing-2026-04-17.md` |
| AIOX core files | `kebab-case.js` | `bob-orchestrator.js` |
| AIOX templates | `kebab-case.md` or `.yaml` | `agent-handoff-tmpl.yaml` |
| Claude agents | `kebab-case.md` | `aiox-dev.md`, `copy-chief.md` |
| Stories | `{epicNum}.{storyNum}.story.md` | `1.1.story.md` |
| Schemas | `kebab-case.schema.json` | `agent-v3-schema.json` |

---

## Key File Locations (Quick Reference)

| What | Where |
|------|-------|
| Session history | `00_Start_Here/Session_Log.md` |
| Business priorities | `01_Core_Context/Guarana_Master_Briefing.md` |
| Agent instructions | `03_Agents/<Name>_*.md` |
| Framework config | `.aiox-core/core-config.yaml` |
| Framework constitution | `.aiox-core/constitution.md` |
| Framework CLI | `.aiox-core/bin/aiox.js` |
| Claude agent defs | `.claude/agents/*.md` |
| Claude rules | `.claude/rules/*.md` |
| Permissions | `.claude/settings.json` |
| Env vars | `.env` (do NOT commit) |
| Live Google Sheet | External URL in `CLAUDE.md` |

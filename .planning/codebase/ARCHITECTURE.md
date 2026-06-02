# ARCHITECTURE.md — System Architecture
<!-- last_mapped_date: 2026-06-02 -->

## Summary

This workspace is two things in one directory: (1) **Luis Guarana's business AI workspace** — a structured operations hub with agent personas, Google Sheets integration, and business context files; and (2) **AIOX (Synkra)** — a meta-framework for AI-orchestrated full-stack development that lives in `.aiox-core/`. Additionally, `lg-distributions/` is an in-progress Next.js web storefront.

These are loosely coupled: AIOX provides the framework tooling that Claude Code agents use, while the business workspace provides operating context (master briefings, session logs, specialist agent instructions).

---

## Top-Level Architecture

```
AI_Workspace/
├── Business Ops Layer          # 00–06 folders, agent MDs, Excel trackers
│   ├── Session/Context         # 00_Start_Here/, 01_Core_Context/
│   ├── Agent Personas          # 03_Agents/*.md (Marcus, Nora, Devon, etc.)
│   └── Outputs                 # 05_Outputs/, Excel files, HTML pages
│
├── AIOX Framework (.aiox-core/)  # Meta-framework for AI dev orchestration
│   ├── CLI                     # bin/aiox.js + cli/index.js + cli/commands/
│   ├── Core Engine             # core/ (orchestration, execution, quality-gates, etc.)
│   ├── Infrastructure          # infrastructure/ (integrations, schemas)
│   ├── Product Templates       # product/templates/ (stories, PRDs, schemas)
│   └── Health Dashboard        # scripts/diagnostics/health-dashboard/ (Vite SPA)
│
├── lg-distributions/           # Next.js 14 web app (LG Distributions storefront)
│   └── app/                    # Next.js App Router
│
└── .claude/                    # Claude Code configuration
    ├── agents/                 # Agent definitions (30+ agents)
    ├── skills/                 # Skill files (superpowers, synapse, etc.)
    └── rules/                  # Contextual rules loaded by Claude Code
```

---

## AIOX Framework Architecture (Core)

### Pattern: Command-Orchestration-Execution Pipeline

```
User/Claude → CLI (bin/aiox.js + cli/)
                ↓
            Orchestration Layer (core/orchestration/)
            bob-orchestrator.js — main workflow runner
            brownfield-handler.js — legacy codebase handling
            context-manager.js — session context
                ↓
            Execution Layer (core/execution/)
            build-orchestrator.js — parallel agent dispatch
            autonomous-build-loop.js — self-driving build cycles
            subagent-dispatcher.js — spawns sub-agents
            semantic-merge-engine.js — merges parallel outputs
                ↓
            Quality Gates (core/quality-gates/)
            layer1-precommit.js — pre-commit checks
            layer2-pr-automation.js — PR review automation
            layer3-human-review.js — human review orchestration
                ↓
            External Agents / GitHub / AI Providers
```

### Key Subsystems

| Subsystem | Location | Role |
|-----------|---------|------|
| Agent Orchestration | `core/orchestration/bob-orchestrator.js` | Coordinates multi-agent workflows |
| Build Execution | `core/execution/build-orchestrator.js` | Dispatches parallel builders |
| Quality Gates | `core/quality-gates/` | 3-layer review pipeline |
| Config System | `core/config/` | Schema-validated YAML config |
| Registry | `core/registry/` | 821-entity service registry |
| Code Intelligence | `core/code-intel/` | Code analysis enrichment (optional) |
| Graph Dashboard | `core/graph-dashboard/` | Dependency visualization |
| Health Check | `core/health-check/` | System health monitoring |
| Memory | `core/memory/` | Agent memory persistence |
| IDS | `core/ids/` | Incremental Development System |
| Session | `core/session/` | Session state management |
| Synapse | `core/synapse/` | Workflow rule engine |

### Framework Boundary Model (L1–L4)

| Layer | Paths | Mutability |
|-------|-------|-----------|
| L1 — Framework Core | `.aiox-core/core/`, `.aiox-core/constitution.md`, `bin/` | NEVER modify |
| L2 — Framework Templates | `.aiox-core/development/tasks/`, `templates/`, `checklists/` | Extend-only |
| L3 — Project Config | `.aiox-core/data/`, `agents/*/MEMORY.md`, `core-config.yaml` | Mutable with exceptions |
| L4 — Project Runtime | `docs/stories/`, `packages/`, `squads/`, `tests/` | Always modify |

---

## Business Workspace Architecture

### Agent Routing Pattern

```
User (Luis) → Sophia (orchestrator)
                ↓ routes by domain
    ┌─────────────────────────────────────────┐
    │  Marcus   — small engine / repair       │
    │  Nora     — pricing / sold comps        │
    │  Devon    — sourcing / deal triage      │
    │  Jamie    — listings / platform ops     │
    │  Olivia   — garage workflow / WIP board │
    │  Theo     — Amazon Influencer / KFS mktg│
    │  Priya    — bills / travel / back-office│
    │  Riley    — research / web lookups      │
    └─────────────────────────────────────────┘
                ↓
    Google Sheets (live master data)
    MCP Drive tools (read/write)
```

### Data Flow (Business Ops)

```
Luis mentions business event (sale, sourcing, repair)
    → Sophia detects trigger keyword
    → Routes to specialist agent
    → Agent executes task
    → Writes update to Google Sheet via Drive MCP
    → Updates Session_Log.md + Master_Briefing.md
```

---

## lg-distributions/ Architecture

- **Pattern:** Next.js App Router (file-based routing)
- **Entry:** `lg-distributions/app/` directory
- **Rendering:** SSR/SSG via Next.js 14
- **Styling:** Tailwind CSS utility classes
- **Status:** Early development — minimal files present

---

## Entry Points

| Entry Point | File | Purpose |
|-------------|------|---------|
| AIOX CLI | `.aiox-core/bin/aiox.js` | Main framework CLI |
| AIOX init | `.aiox-core/bin/aiox-init.js` | Project initialization |
| AIOX core index | `.aiox-core/core/index.js` | Framework module exports |
| Health dashboard | `.aiox-core/scripts/diagnostics/health-dashboard/index.html` | Dev monitoring UI |
| lg-distributions | `lg-distributions/app/` | Next.js app router root |
| Workspace context | `00_Start_Here/Sophia_Load_Context.md` | Business AI session startup |

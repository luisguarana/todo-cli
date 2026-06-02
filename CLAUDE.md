# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 👤 WHO THIS IS

**Luis Guarana** — Groveland, MA. Solo operator running:

- **LG Distributions** — small engine flips + multi-platform resale + Amazon Influencer
- **KFS Cleaning Services** — residential/commercial cleaning, North Shore MA
- **Vehicle:** Jeep Cherokee Limited (no trailer — 2-stage snowblowers DO NOT fit)

**ADHD brain.** Structured, scannable output is non-negotiable. See formatting rules below.

---

## 🚀 SESSION STARTUP — DO EVERY TIME

1. Read `00_Start_Here/Session_Log.md` — newest entries at top, recent history
2. Read `01_Core_Context/Guarana_Master_Briefing.md` — current priority queue + open action items
3. Restate the task in one line before acting

---

## 🗂️ WORKSPACE STRUCTURE

| Folder | Purpose |
|--------|---------|
| `00_Start_Here/` | Session log + Sophia orchestrator context |
| `01_Core_Context/` | Master briefing, Luis's profile, business strategy |
| `03_Agents/` | Specialist agent instruction files (Marcus, Devon, Nora, etc.) |
| `04_Reference/` | Apps Script, audit reports, reference docs |
| `05_Outputs/` | Generated files, morning briefings |
| `99_Archive/` | Retired files — archive here instead of deleting |

---

## 🤖 AGENT ROUTING

Route tasks to the right specialist. Never do specialist work as Sophia.

| Agent | Trigger |
|-------|---------|
| **Marcus** | Small engine diagnosis, repair steps, parts lists, go/no-go on a unit |
| **Nora** | Pricing research, sold comps, repricing, margin analysis |
| **Devon** | Sourcing leads, deal triage, negotiation scripts, alert setup |
| **Jamie** | Listing copy, platform ops, shipping, buyer messages |
| **Olivia** | Garage workflow, WIP board, inventory system |
| **Theo** | Amazon Influencer content, KFS marketing, social copy |
| **Priya** | Bills, travel (Brazil), KFS back-office, "stuck on small stuff" |
| **Riley** | Research, comparisons, lookups, anything requiring web research |

Full agent instruction files: `03_Agents/<Name>_*.md`

---

## 📊 SINGLE SOURCE OF TRUTH — GOOGLE SHEETS

> **LIVE MASTER:** `https://docs.google.com/spreadsheets/d/12DxFM-d2rQdUKo9kHwDUi1yjgqFvxoGLCpCAW9ie9C0/edit`

- ✅ **ONLY** update the Google Sheet — use Drive MCP to read/write
- ❌ **NEVER** update `Guarana_Flips_Tracker.xlsx` — RETIRED
- ❌ **NEVER** update `LG_Flip_Tracker.xlsx` — RETIRED
- ❌ **NEVER** delete data Luis entered — only add or update what's explicitly requested

**Auto-update triggers** — when Luis mentions any of these, update the relevant tab immediately, no prompting:

| Luis says... | Update this tab |
|---|---|
| New item sourced / picked up | 💡 Sourcing + 🔧 Flips |
| New order placed / arrived | 📦 Orders |
| Task done / completed | 📋 To-Do + 🔄 Open Loops |
| Item listed on FB/OfferUp | 🏪 Listings + 📱 FB Marketplace |
| Item sold | 💰 Sold + 🔧 Flips (mark SOLD) + 🏪 Listings (remove) |
| Part ordered or installed | 💸 Parts + 🔧 Flips (update parts cost) |
| Cleaning job done | 🧹 Cleaning |
| New open loop / issue | 🔄 Open Loops + 📋 To-Do |
| Revenue / expense info | 📊 Financials |

Confirm every update: `✅ Updated [tab] — [what changed]`

---

## 📋 ALWAYS UPDATE AFTER EVERY SESSION

1. `00_Start_Here/Session_Log.md` — new dated entry at top
2. `01_Core_Context/Guarana_Master_Briefing.md` — update any changed sections

---

## 📁 FILE PERMISSIONS

| Action | Permission |
|--------|-----------|
| Read any file | ✅ No approval needed |
| Create new files/folders | ✅ No approval needed |
| Edit existing files | ✅ No approval needed |
| Archive to `99_Archive/` | ✅ No approval needed |
| Permanently delete a file | ⚠️ Ask Luis first |
| Send / publish / share externally | ⚠️ Ask Luis first |
| Bulk edits across many files | ⚠️ Ask Luis first |

**Default:** archive, never delete.

---

## 🎨 FORMATTING RULES — ALWAYS APPLY

- Tables over paragraphs, always
- Short bullets — max 2–3 sentences each
- Section dividers: `────── SECTION ──────`
- Emojis as visual anchors: ✅ ⚠️ ❌ 🔧 💡 📊 📋
- Numbered steps for any process or procedure
- Lead with the answer — explain after if needed
- No sycophantic openers, no fluff

---

## 🔧 DOMAIN CONTEXT

**Small engine flips:** Source broken/free units (FBM, Craigslist, Nextdoor) → repair → flip on FBM/OfferUp/Nextdoor. Diagnosis framework: **Fuel / Air / Spark / Compression**. Engine families: Honda GCV/GX, B&S Quantum/Intek, Kohler Courage, Echo 2-stroke.

**Pricing rule:** Minimum 3x cost-in on small jobs; 2x on larger units. Check sold comps on eBay, FBM, Mercari.

**Seasons:** Mowers peak Apr–Jun. Snowblowers peak Oct–Dec.

**CheckSammy/KFS:** Invoice tracking in 💼 Checksammy_Invoices tab. "Wallet Paid In Full" ≠ payment — only Ramp ACH deposit counts.

<!-- GSD:project-start source:PROJECT.md -->

## Project

**todo-cli**

A minimal Node.js command-line tool for managing personal to-do items. Users run `todo add "buy milk"`, `todo list`, and `todo done 1` to manage tasks. Items persist to a `todos.json` file in the current working directory — no external dependencies, Node.js built-ins only.

**Core Value:** A user can add, view, and mark tasks done entirely from the terminal with zero setup.

### Constraints

- **Dependencies**: No external npm packages — Node.js built-ins only (fs, path, process)
- **Interface**: Three commands only — add, list, done
- **Storage**: Local todos.json in CWD — no database, no cloud sync

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Summary

## Languages

| Language | Where Used | Notes |
|----------|-----------|-------|
| JavaScript (ES Modules) | `.aiox-core/` framework core | Primary language — all CLI, orchestration, execution engine |
| TypeScript | `lg-distributions/` | Next.js frontend with strict TS config |
| Python | `__pycache__/`, scattered scripts | Appears in diagnostics/build scripts; not a primary language |
| HTML/CSS | `KFS_Cleaning_Website*.html`, `KFS_AutoReply_Email.html` | Static site files — no build toolchain |
| YAML | `.aiox-core/core/orchestration/bob-surface-criteria.yaml`, `core-config.yaml` | Config and workflow definitions |

## Runtimes

| Runtime | Version Requirement | Used In |
|---------|-------------------|---------|
| Node.js | `>=18.0.0` | `.aiox-core/` (enforced in `package.json` engines field) |
| npm | `>=9.0.0` | `.aiox-core/` |
| Browser | Modern (ES2020+) | `lg-distributions/` (Next.js SSR/CSR), health dashboard (Vite SPA) |

## Frameworks & Libraries

### lg-distributions/ (Next.js Web App)

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.35 | Full-stack React framework, SSR/SSG |
| `react` / `react-dom` | ^18 | UI rendering |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^3.4.1 | Utility-first CSS |
| `postcss` | ^8 | CSS processing |
| `eslint-config-next` | 14.2.35 | Linting config |

### .aiox-core/scripts/diagnostics/health-dashboard/ (Vite SPA)

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.3.1 | Build toolchain |
| `react` / `react-dom` | ^18.2.0 | UI rendering |
| `recharts` | ^2.10.0 | Data visualization / charts |
| `react-router-dom` | ^6.20.0 | Client-side routing |
| `@vitejs/plugin-react` | ^4.2.0 | React HMR in Vite |

### .aiox-core/ (AIOX Framework Core — v5.2.9)

| Package | Version | Purpose |
|---------|---------|---------|
| `ajv` | ^8.17.1 | JSON Schema validation |
| `chalk` | ^4.1.2 | Terminal color output |
| `commander` | ^12.1.0 | CLI argument parsing |
| `diff` | ^5.2.0 | Text diffing |
| `execa` | ^5.1.1 | Child process execution |
| `fast-glob` | ^3.3.3 | File globbing |
| `fs-extra` | ^11.3.0 | Extended fs operations |
| `glob` | ^10.4.4 | File pattern matching |
| `highlight.js` | ^11.9.0 | Syntax highlighting |
| `inquirer` | ^8.2.6 | Interactive CLI prompts |
| `js-yaml` | ^4.1.0 | YAML parsing |
| `proper-lockfile` | ^4.1.2 | File locking |
| `semver` | ^7.7.2 | Semantic version comparison |
| `tar` | ^7.5.7 | Archive handling |
| `validator` | ^13.15.15 | Input validation |

### Root Workspace (ai_workspace)

| Package | Version | Purpose |
|---------|---------|---------|
| `husky` | ^9.1.7 | Git hooks management |

## Configuration Files

| File | Purpose |
|------|---------|
| `.aiox-core/core-config.yaml` | Master AIOX framework config (boundary, workflow, agents) |
| `.aiox-core/core/config/schemas/framework-config.schema.json` | JSON Schema for framework config validation |
| `lg-distributions/tailwind.config.ts` | Tailwind CSS customization |
| `lg-distributions/next.config.mjs` | Next.js build config |
| `lg-distributions/tsconfig.json` | TypeScript compiler options |
| `package.json` (root) | Workspace root — husky git hooks |
| `.aiox-core/package.json` | AIOX internal dependency manifest |
| `.env` / `.env.example` | Environment variables (2.7KB each) |
| `.mcp.json` | MCP server definitions (ruflo/claude-flow) |
| `.aiox-core/install-manifest.yaml` | Framework install manifest |

## Build & Deploy

| Sub-project | Build Command | Deploy Target |
|-------------|-------------|--------------|
| `lg-distributions/` | `npm run build` (Next.js) | Vercel (inferred from Next.js + Vercel config patterns) |
| Health dashboard | `npm run build` (Vite) | Static hosting |
| AIOX core | CLI (`bin/aiox.js`) | Runtime package, not deployed |

## AI/LLM Providers

| Provider | File |
|----------|------|
| Anthropic (Claude) | `claude-provider.js` |
| Google (Gemini) | `gemini-provider.js` |
| OpenAI-compatible | `openai-compatible-provider.js` |
| Provider factory | `ai-provider-factory.js` |
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Summary

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

### Naming Conventions (AIOX)

| Type | Convention | Example |
|------|-----------|---------|
| Classes | PascalCase | `BobOrchestrator`, `BuildOrchestrator` |
| Functions | camelCase | `executeWorkflow()`, `loadConfig()` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITERATIONS`, `DEFAULT_TIMEOUT` |
| Files | kebab-case | `bob-orchestrator.js` |
| YAML keys | kebab-case | `max-iterations`, `quality-gates` |

## lg-distributions/ — TypeScript / Next.js

### TypeScript

- **Strict mode** enabled in `tsconfig.json`
- Explicit return types on exported functions
- No `any` types (enforced by `eslint-config-next`)

### Next.js App Router Conventions

- Pages use `export default function Page()` pattern
- Server Components by default; `'use client'` directive for client components
- Metadata via `export const metadata = { ... }`

### Tailwind CSS

- Utility classes inline in JSX
- Custom tokens in `tailwind.config.ts`
- No separate CSS modules (utility-first pattern)

## Markdown / Documentation Conventions

### Business Documents (00–06 folders)

- Newest entries at **top** of session logs
- Tables over paragraphs (CLAUDE.md formatting rule)
- Short bullets — max 2–3 sentences
- Section dividers: `────── SECTION ──────`
- Emojis as visual anchors: ✅ ⚠️ ❌ 🔧 💡 📊 📋

### AIOX Story Files

- Story ID, Title, Status
- Acceptance Criteria (checkboxes)
- Tasks (checkboxes — checked as completed)
- File List (updated as files change)

### CLAUDE.md / Rules Files

- Rule files in `.claude/rules/` use frontmatter `paths:` for conditional loading
- Agent files in `.claude/agents/` define persona, scope, commands
- All rule files are Markdown with structured headers

## Git Conventions

| Type | Format | Example |
|------|--------|---------|
| Features | `feat: description [Story X.Y]` | `feat: implement IDE detection [Story 2.1]` |
| Fixes | `fix: description` | `fix: null check in config-loader` |
| Docs | `docs: description` | `docs: update agent authority rules` |
| Chores | `chore: description` | `chore: bump version to 5.2.9` |
| Refactors | `refactor: description` | `refactor: extract quality-gate base layer` |

## Agent Persona Files (.claude/agents/)

## Capabilities

## Workflow

## Environment Variable Conventions

- AI provider keys: `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `OPENAI_API_KEY`
- Service keys for PM adapters, Supabase, etc.
- Never committed — `.env` in `.gitignore`

## CLI Commands (AIOX)

- Agent activation: `@agent-name` syntax
- Agent commands: `*command-name` prefix
- Framework commands: `aiox <subcommand>` via `bin/aiox.js`
- Interactive prompts: powered by `inquirer` v8

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## Summary

## Top-Level Architecture

```

```

## AIOX Framework Architecture (Core)

### Pattern: Command-Orchestration-Execution Pipeline

```

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

## Business Workspace Architecture

### Agent Routing Pattern

```

```

### Data Flow (Business Ops)

```

```

## lg-distributions/ Architecture

- **Pattern:** Next.js App Router (file-based routing)
- **Entry:** `lg-distributions/app/` directory
- **Rendering:** SSR/SSG via Next.js 14
- **Styling:** Tailwind CSS utility classes
- **Status:** Early development — minimal files present

## Entry Points

| Entry Point | File | Purpose |
|-------------|------|---------|
| AIOX CLI | `.aiox-core/bin/aiox.js` | Main framework CLI |
| AIOX init | `.aiox-core/bin/aiox-init.js` | Project initialization |
| AIOX core index | `.aiox-core/core/index.js` | Framework module exports |
| Health dashboard | `.aiox-core/scripts/diagnostics/health-dashboard/index.html` | Dev monitoring UI |
| lg-distributions | `lg-distributions/app/` | Next.js app router root |
| Workspace context | `00_Start_Here/Sophia_Load_Context.md` | Business AI session startup |
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| "AgentDB Advanced Features" | "Master advanced AgentDB features including QUIC synchronization, multi-database management, custom distance metrics, hybrid search, and distributed systems integration. Use when building distributed AI systems, multi-agent coordination, or advanced vector search applications." | `.claude/skills/agentdb-advanced/SKILL.md` |
| "AgentDB Learning Plugins" | "Create and train AI learning plugins with AgentDB's 9 reinforcement learning algorithms. Includes Decision Transformer, Q-Learning, SARSA, Actor-Critic, and more. Use when building self-learning agents, implementing RL, or optimizing agent behavior through experience." | `.claude/skills/agentdb-learning/SKILL.md` |
| "AgentDB Memory Patterns" | "Implement persistent memory patterns for AI agents using AgentDB. Includes session memory, long-term storage, pattern learning, and context management. Use when building stateful agents, chat systems, or intelligent assistants." | `.claude/skills/agentdb-memory-patterns/SKILL.md` |
| "AgentDB Performance Optimization" | "Optimize AgentDB performance with quantization (4-32x memory reduction), HNSW indexing (150x faster search), caching, and batch operations. Use when optimizing memory usage, improving search speed, or scaling to millions of vectors." | `.claude/skills/agentdb-optimization/SKILL.md` |
| "AgentDB Vector Search" | "Implement semantic vector search with AgentDB for intelligent document retrieval, similarity matching, and context-aware querying. Use when building RAG systems, semantic search engines, or intelligent knowledge bases." | `.claude/skills/agentdb-vector-search/SKILL.md` |
| architect-first | Guide for implementing the Architect-First development philosophy - perfect architecture, pragmatic execution, quality guaranteed by tests. Use this skill when starting new features, refactoring systems, or when architectural decisions are needed. Enforces non-negotiables like complete design/documentation before code, zero coupling, and validation by multiple perspectives before structural decisions. | `.claude/skills/architect-first/SKILL.md` |
| browser | Web browser automation with AI-optimized snapshots for claude-flow agents | `.claude/skills/browser/SKILL.md` |
| checklist-runner | \| Generic checklist execution engine for any .md checklist. Use this skill when an agent needs to validate work against a checklist. Supports YOLO (autonomous) and interactive modes with pass/fail/partial verdicts. | `.claude/skills/checklist-runner/SKILL.md` |
| coderabbit-review | \| Unified CodeRabbit CLI execution via WSL with self-healing loop. Use this skill when running automated code review before commits, PRs, or QA gates. Handles WSL wrapper, severity filtering, and auto-fix iterations. | `.claude/skills/coderabbit-review/SKILL.md` |
| fb-marketplace-optimizer | Facebook Marketplace listing optimizer for Luis (LG Distributions). Audits active listings, identifies dead ones (under 10 views AND older than 3 days), generates a kill list, builds a relist schedule at optimal posting times, and produces ready-to-paste listing copy. Use when Luis says listings are slow, wants to relist, wants to kill dead listings, or asks about FB Marketplace performance. | `.claude/skills/fb-marketplace-optimizer/SKILL.md` |
| github-code-review | Comprehensive GitHub code review with AI-powered swarm coordination | `.claude/skills/github-code-review/SKILL.md` |
| github-multi-repo | \| Multi-repository coordination, synchronization, and architecture management with AI swarm orchestration | `.claude/skills/github-multi-repo/SKILL.md` |
| github-project-management | \| Comprehensive GitHub project management with swarm-coordinated issue tracking, project board automation, and sprint planning | `.claude/skills/github-project-management/SKILL.md` |
| github-release-management | \| Comprehensive GitHub release orchestration with AI swarm coordination for automated versioning, testing, deployment, and rollback management | `.claude/skills/github-release-management/SKILL.md` |
| github-workflow-automation | \| Advanced GitHub Actions workflow automation with AI swarm coordination, intelligent CI/CD pipelines, and comprehensive repository management | `.claude/skills/github-workflow-automation/SKILL.md` |
| Hooks Automation | Automated coordination, formatting, and learning from Claude Code operations using intelligent hooks with MCP integration. Includes pre/post task hooks, session management, Git integration, memory coordination, and neural pattern training for enhanced development workflows. | `.claude/skills/hooks-automation/SKILL.md` |
| mcp-builder | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK). | `.claude/skills/mcp-builder/SKILL.md` |
| Pair Programming | AI-assisted pair programming with multiple modes (driver/navigator/switch), real-time verification, quality monitoring, and comprehensive testing. Supports TDD, debugging, refactoring, and learning sessions. Features automatic role switching, continuous code review, security scanning, and performance optimization with truth-score verification. | `.claude/skills/pair-programming/SKILL.md` |
| "ReasoningBank with AgentDB" | "Implement ReasoningBank adaptive learning with AgentDB's 150x faster vector database. Includes trajectory tracking, verdict judgment, memory distillation, and pattern recognition. Use when building self-learning agents, optimizing decision-making, or implementing experience replay systems." | `.claude/skills/reasoningbank-agentdb/SKILL.md` |
| "ReasoningBank Intelligence" | "Implement adaptive learning with ReasoningBank for pattern recognition, strategy optimization, and continuous improvement. Use when building self-learning agents, optimizing workflows, or implementing meta-cognitive systems." | `.claude/skills/reasoningbank-intelligence/SKILL.md` |
| "Skill Builder" | "Create new Claude Code Skills with proper YAML frontmatter, progressive disclosure structure, and complete directory organization. Use when you need to build custom skills for specific workflows, generate skill templates, or understand the Claude Skills specification." | `.claude/skills/skill-builder/SKILL.md` |
| skill-creator | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations. | `.claude/skills/skill-creator/SKILL.md` |
| sparc-methodology | \| SPARC (Specification, Pseudocode, Architecture, Refinement, Completion) comprehensive development methodology with multi-agent orchestration | `.claude/skills/sparc-methodology/SKILL.md` |
| stream-chain | Stream-JSON chaining for multi-agent pipelines, data transformation, and sequential workflows | `.claude/skills/stream-chain/SKILL.md` |
| swarm-advanced | \| Advanced swarm orchestration patterns for research, development, testing, and complex distributed workflows | `.claude/skills/swarm-advanced/SKILL.md` |
| "Swarm Orchestration" | "Orchestrate multi-agent swarms with agentic-flow for parallel task execution, dynamic topology, and intelligent coordination. Use when scaling beyond single agents, implementing complex workflows, or building distributed AI systems." | `.claude/skills/swarm-orchestration/SKILL.md` |
| synapse | "This skill should be used when users want to understand the SYNAPSE context engine, manage domains, configure context rules, or troubleshoot rule injection. Use when asked about SYNAPSE architecture, domain management, star-commands, context brackets, or the 8-layer processing pipeline." | `.claude/skills/synapse/SKILL.md` |
| tech-search | \| Self-contained deep tech research. WebSearch + WebFetch + Haiku workers. Pipeline: Query > Decompose > Parallel Search (Haiku) > Evaluate > Synthesize > Document. Zero external dependencies. MCPs optional. Salva em docs/research/{YYYY-MM-DD}-{slug}/. | `.claude/skills/tech-search/SKILL.md` |
| "V3 CLI Modernization" | "CLI modernization and hooks system enhancement for claude-flow v3. Implements interactive prompts, command decomposition, enhanced hooks integration, and intelligent workflow automation." | `.claude/skills/v3-cli-modernization/SKILL.md` |
| "V3 Core Implementation" | "Core module implementation for claude-flow v3. Implements DDD domains, clean architecture patterns, dependency injection, and modular TypeScript codebase with comprehensive testing." | `.claude/skills/v3-core-implementation/SKILL.md` |
| "V3 DDD Architecture" | "Domain-Driven Design architecture for claude-flow v3. Implements modular, bounded context architecture with clean separation of concerns and microkernel pattern." | `.claude/skills/v3-ddd-architecture/SKILL.md` |
| "V3 Deep Integration" | "Deep agentic-flow@alpha integration implementing ADR-001. Eliminates 10,000+ duplicate lines by building claude-flow as specialized extension rather than parallel implementation." | `.claude/skills/v3-integration-deep/SKILL.md` |
| "V3 MCP Optimization" | "MCP server optimization and transport layer enhancement for claude-flow v3. Implements connection pooling, load balancing, tool registry optimization, and performance monitoring for sub-100ms response times." | `.claude/skills/v3-mcp-optimization/SKILL.md` |
| "V3 Memory Unification" | "Unify 6+ memory systems into AgentDB with HNSW indexing for 150x-12,500x search improvements. Implements ADR-006 (Unified Memory Service) and ADR-009 (Hybrid Memory Backend)." | `.claude/skills/v3-memory-unification/SKILL.md` |
| "V3 Performance Optimization" | "Achieve aggressive v3 performance targets: 2.49x-7.47x Flash Attention speedup, 150x-12,500x search improvements, 50-75% memory reduction. Comprehensive benchmarking and optimization suite." | `.claude/skills/v3-performance-optimization/SKILL.md` |
| "V3 Security Overhaul" | "Complete security architecture overhaul for claude-flow v3. Addresses critical CVEs (CVE-1, CVE-2, CVE-3) and implements secure-by-default patterns. Use for security-first v3 implementation." | `.claude/skills/v3-security-overhaul/SKILL.md` |
| "V3 Swarm Coordination" | "15-agent hierarchical mesh coordination for v3 implementation. Orchestrates parallel execution across security, core, and integration domains following 10 ADRs with 14-week timeline." | `.claude/skills/v3-swarm-coordination/SKILL.md` |
| "Verification & Quality Assurance" | \| Comprehensive truth scoring, code quality verification, and automatic rollback system with 0.95 accuracy threshold for ensuring high-quality agent outputs and codebase reliability. | `.claude/skills/verification-quality/SKILL.md` |
| aiox-analyst | Business Analyst (Atlas). Use for market research, competitive analysis, user research, brainstorming session facilitation, structured ideation workshops, feasibility studies, i... | `.codex/skills/aiox-analyst/SKILL.md` |
| aiox-architect | Architect (Aria). Use for system architecture (fullstack, backend, frontend, infrastructure), technology stack selection (technical evaluation), API design (REST/GraphQL/tRPC/We... | `.codex/skills/aiox-architect/SKILL.md` |
| aiox-data-engineer | Database Architect & Operations Engineer (Dara). Use for database design, schema architecture, Supabase configuration, RLS policies, migrations, query optimization, data modelin... | `.codex/skills/aiox-data-engineer/SKILL.md` |
| aiox-dev | Full Stack Developer (Dex). Use for code implementation, debugging, refactoring, and development best practices | `.codex/skills/aiox-dev/SKILL.md` |
| aiox-devops | GitHub Repository Manager & DevOps Specialist (Gage). Use for repository operations, version management, CI/CD, quality gates, and GitHub push operations. ONLY agent authorized... | `.codex/skills/aiox-devops/SKILL.md` |
| aiox-master | AIOX Master Orchestrator & Framework Developer (Orion). Use when you need comprehensive expertise across all domains, framework component creation/modification, workflow orchest... | `.codex/skills/aiox-master/SKILL.md` |
| aiox-pm | Product Manager (Morgan). Use for PRD creation (greenfield and brownfield), epic creation and management, product strategy and vision, feature prioritization (MoSCoW, RICE), roa... | `.codex/skills/aiox-pm/SKILL.md` |
| aiox-po | Product Owner (Pax). Use for backlog management, story refinement, acceptance criteria, sprint planning, and prioritization decisions | `.codex/skills/aiox-po/SKILL.md` |
| aiox-qa | Test Architect & Quality Advisor (Quinn). Use for comprehensive test architecture review, quality gate decisions, and code improvement. Provides thorough analysis including requ... | `.codex/skills/aiox-qa/SKILL.md` |
| aiox-sm | Scrum Master (River). Use for user story creation from PRD, story validation and completeness checking, acceptance criteria definition, story refinement, sprint planning, backlo... | `.codex/skills/aiox-sm/SKILL.md` |
| aiox-squad-creator | Squad Creator (Craft). Use to create, validate, publish and manage squads | `.codex/skills/aiox-squad-creator/SKILL.md` |
| aiox-ux-design-expert | UX/UI Designer & Design System Architect (Uma). Complete design workflow - user research, wireframes, design systems, token extraction, component building, and quality assurance | `.codex/skills/aiox-ux-design-expert/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

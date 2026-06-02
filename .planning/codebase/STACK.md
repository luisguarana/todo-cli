# STACK.md — Technology Stack
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Multi-project workspace with three distinct tech stacks: a Next.js web app (`lg-distributions/`), a Vite/React health dashboard (`.aiox-core/scripts/diagnostics/health-dashboard/`), and the AIOX framework core (`.aiox-core/`) built on Node.js. The root workspace itself is a plain Node.js CommonJS package with minimal tooling.

---

## Languages

| Language | Where Used | Notes |
|----------|-----------|-------|
| JavaScript (ES Modules) | `.aiox-core/` framework core | Primary language — all CLI, orchestration, execution engine |
| TypeScript | `lg-distributions/` | Next.js frontend with strict TS config |
| Python | `__pycache__/`, scattered scripts | Appears in diagnostics/build scripts; not a primary language |
| HTML/CSS | `KFS_Cleaning_Website*.html`, `KFS_AutoReply_Email.html` | Static site files — no build toolchain |
| YAML | `.aiox-core/core/orchestration/bob-surface-criteria.yaml`, `core-config.yaml` | Config and workflow definitions |

---

## Runtimes

| Runtime | Version Requirement | Used In |
|---------|-------------------|---------|
| Node.js | `>=18.0.0` | `.aiox-core/` (enforced in `package.json` engines field) |
| npm | `>=9.0.0` | `.aiox-core/` |
| Browser | Modern (ES2020+) | `lg-distributions/` (Next.js SSR/CSR), health dashboard (Vite SPA) |

---

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

Entry: `lg-distributions/app/` (App Router pattern)

### .aiox-core/scripts/diagnostics/health-dashboard/ (Vite SPA)

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.3.1 | Build toolchain |
| `react` / `react-dom` | ^18.2.0 | UI rendering |
| `recharts` | ^2.10.0 | Data visualization / charts |
| `react-router-dom` | ^6.20.0 | Client-side routing |
| `@vitejs/plugin-react` | ^4.2.0 | React HMR in Vite |

Entry: `.aiox-core/scripts/diagnostics/health-dashboard/index.html`

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

---

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

---

## Build & Deploy

| Sub-project | Build Command | Deploy Target |
|-------------|-------------|--------------|
| `lg-distributions/` | `npm run build` (Next.js) | Vercel (inferred from Next.js + Vercel config patterns) |
| Health dashboard | `npm run build` (Vite) | Static hosting |
| AIOX core | CLI (`bin/aiox.js`) | Runtime package, not deployed |

---

## AI/LLM Providers

Configured via `.aiox-core/infrastructure/integrations/ai-providers/`:

| Provider | File |
|----------|------|
| Anthropic (Claude) | `claude-provider.js` |
| Google (Gemini) | `gemini-provider.js` |
| OpenAI-compatible | `openai-compatible-provider.js` |
| Provider factory | `ai-provider-factory.js` |

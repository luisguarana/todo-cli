# INTEGRATIONS.md — External Services & APIs
<!-- last_mapped_date: 2026-06-02 -->

## Summary

Heavy integration surface: Google Sheets as the business data source of truth, GitHub for source control, multiple AI providers (Claude, Gemini, OpenAI-compatible), and AIOX PM adapters for ClickUp/Jira/GitHub. MCP (Model Context Protocol) servers are the primary integration mechanism for Claude Code tooling.

---

## Google Sheets / Google Workspace

| Component | Location | Purpose |
|-----------|---------|---------|
| Drive MCP (read/write) | `.mcp.json` global Claude settings | Primary data access for Luis's business data |
| Apps Script automation | `04_Reference/Guarana_AutoUpdate_AppsScript.js` (inferred from agent instructions) | Auto-updates Google Sheet from Claude sessions |
| Master Sheet | External: `https://docs.google.com/spreadsheets/d/12DxFM-d2rQdUKo9kHwDUi1yjgqFvxoGLCpCAW9ie9C0/` | LG Distributions live data (Flips, Orders, Listings, Financials) |

**Usage pattern:** `mcp__claude_ai_Google_Drive__*` and `mcp__claude_ai_Airtable__*` tools available in Claude session.

---

## GitHub / GitHub CLI

| Component | Location | Purpose |
|-----------|---------|---------|
| GitHub adapter | `.aiox-core/infrastructure/integrations/pm-adapters/github-adapter.js` | PR creation, issue management via AIOX |
| GitHub CLI (`gh`) | Used in agent workflows | `@devops`-exclusive: `gh pr create`, `gh pr merge` |
| Repository | `https://github.com/SynkraAI/aiox-core` | AIOX core upstream repo |

---

## AI Providers (AIOX Multi-Provider)

All managed via `.aiox-core/infrastructure/integrations/ai-providers/`:

| Provider | File | Config |
|----------|------|--------|
| Anthropic Claude | `claude-provider.js` | Primary provider — Claude Sonnet 4.6 |
| Google Gemini | `gemini-provider.js` | Secondary provider |
| OpenAI-compatible | `openai-compatible-provider.js` | Generic adapter (DeepSeek proxy, etc.) |
| Provider factory | `ai-provider-factory.js` | Auto-selects provider based on config |

**Environment vars:** `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `OPENAI_API_KEY` (from `.env`)

---

## Supabase

| Component | Location | Purpose |
|-----------|---------|---------|
| Supabase adapter | `.aiox-core/infrastructure/integrations/gemini-extensions/supabase-adapter.js` | Database operations via Supabase SDK |
| Workspace adapter | `.aiox-core/infrastructure/integrations/gemini-extensions/workspace-adapter.js` | Google Workspace integration |
| Security adapter | `.aiox-core/infrastructure/integrations/gemini-extensions/security-adapter.js` | Auth/RLS policy enforcement |

**Status:** Configured as optional extension — active only when `SUPABASE_URL` / `SUPABASE_ANON_KEY` present in `.env`.

---

## PM Tool Adapters (AIOX)

Located in `.aiox-core/infrastructure/integrations/pm-adapters/`:

| Adapter | File | Notes |
|---------|------|-------|
| ClickUp | `clickup-adapter.js` | Task/epic sync |
| Jira | `jira-adapter.js` | Issue tracker integration |
| GitHub Projects | `github-adapter.js` | PR/issue as PM tool |
| Local | `local-adapter.js` | Fallback — local YAML-based tracking |

---

## MCP Servers (Model Context Protocol)

### Project-local (`.mcp.json`)

| Server | Command | Purpose |
|--------|---------|---------|
| `claude-flow` (ruflo) | `npx ruflo@latest mcp start` | Agent orchestration, swarm coordination |

### Global Claude Code MCP (from session context)

| Server | Purpose |
|--------|---------|
| `playwright` | Browser automation, screenshots |
| `apify` | Web scraping, Actors |
| `claude_ai_Google_Drive` | Google Drive read/write |
| `claude_ai_Google_Calendar` | Calendar management |
| `claude_ai_Gmail` | Email operations |
| `claude_ai_Notion` | Notion workspace |
| `claude_ai_Airtable` | Airtable bases |
| `claude_ai_Make` | Make.com automation |
| `claude_ai_Spotify` | Spotify (media) |
| `plugin_discord_discord` | Discord messaging |
| `claude-code-docs` | Claude Code documentation query |
| `magic` | UI component generation (21st.dev) |
| `ide` | IDE diagnostics + code execution |
| `tldraw` | Canvas/diagram tool |

---

## CodeRabbit (Automated Code Review)

| Component | Config Location | Notes |
|-----------|----------------|-------|
| CodeRabbit CLI | WSL: `~/.local/bin/coderabbit` | Runs inside WSL on Windows |
| Config | `.aiox-core/core-config.yaml` → `coderabbit_integration` | Severity filters, auto-fix mode |
| Reports | `docs/qa/coderabbit-reports/` | Output destination |

**Trigger:** Pre-commit (dev phase), pre-PR (QA phase). `@devops`-owned integration.

---

## Cloud / Infrastructure

| Service | File | Purpose |
|---------|------|---------|
| Cloud Run adapter | `.aiox-core/infrastructure/integrations/gemini-extensions/cloudrun-adapter.js` | GCP Cloud Run deployments |
| Policy sync | `.aiox-core/infrastructure/integrations/gemini-extensions/policy-sync.js` | Security policy synchronization |
| Docker MCP Toolkit | Global Claude config | EXA, Context7, Apify MCPs run in Docker containers |

---

## Context7 / EXA / Apify (via Docker MCP)

| Service | Tool Prefix | Purpose |
|---------|------------|---------|
| Context7 | `mcp__docker-gateway__*` | Library documentation lookup |
| EXA | `mcp__docker-gateway__web_search_exa` | Web search / research |
| Apify | `mcp__docker-gateway__*` | Web scraping, social media data |

**Known issue:** Docker MCP secrets injection bug — credentials must be hardcoded in `~/.docker/mcp/catalogs/docker-mcp.yaml`.

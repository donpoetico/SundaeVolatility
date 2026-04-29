---
date: 2026-04-28
project: tracer-bullet
phase: plan
---

# Session Handoff

## What Was Done

Created a new ubiquitous-language resource tree under `.wai/resources/ubiquitous-language/` with root guidance plus bounded contexts for core simulation/pricing, gameplay/progression, and player-facing diegetic UI. Updated `README.md`, `llm.txt`, `CLAUDE.md`, and `AGENTS.md` to align repository and agent-facing documentation with the shared glossary.

## Key Decisions

- Player-facing language standardizes on **promise**, **tool**, **weather**, and **flavor**.
- Mixed-audience docs introduce diegetic terminology first, then technical terminology in parentheses on first mention.
- Canonical documentation/spec naming prefers **Mint-Chip**; player UI may still render **Mint Chip** if typography benefits.
- Internal code, tests, and OpenSpec capability specs may continue using technical finance vocabulary.

## Gotchas & Surprises

- `README.md` contained stale references to `specs/` documents and a removed SolidJS framing, so glossary alignment also required structural doc cleanup.
- The repo already had unrelated local changes in `.wai/config.toml`, `.wai/PLUGINS.md`, `.claude/settings.local.json`, `src/`, and `tests/`; these were intentionally left out of the terminology commit.

## What Took Longer Than Expected

Reconciling the new glossary with existing repo wording required a follow-up audit so mixed-audience docs could keep necessary technical terms while still following diegetic-first rules.

## Open Questions

- Whether OpenSpec capability prose should gain more explicit diegetic translations in mixed-audience sections.
- Whether `Mint Chip` should remain available anywhere beyond UI typography-specific rendering.

## Next Steps

1. Audit OpenSpec specs for places where mixed-audience explanatory prose should add diegetic translations.
2. Apply the glossary to future UI copy and tutorial text as implementation begins.
3. Keep the ubiquitous-language tree updated when new mechanics or counterparties are introduced.

## Context

### git_status

```
 M .wai/PLUGINS.md
 M .wai/config.toml
 M AGENTS.md
 M CLAUDE.md
 M README.md
 M llm.txt
?? .claude/settings.local.json
?? .wai/projects/tracer-bullet/designs/2026-04-29-created-ubiquitous-language-resource-tree-under-w.md
?? .wai/projects/tracer-bullet/designs/2026-04-29-normalized-agent-facing-docs-by-adding-a-ubiquitou.md
?? .wai/projects/tracer-bullet/designs/2026-04-29-updated-readme-md-and-llm-txt-to-align-with-the-ub.md
?? .wai/resources/ubiquitous-language/
?? src/
?? tests/
```

### open_issues

```
No issues found.
```

### commit_scope

```
Documentation-only: glossary, README/LLM context, agent-facing instructions, and wai design/handoff artifacts.
Excluded unrelated local changes in .wai config/plugin files, .claude local settings, src/, and tests/.
```


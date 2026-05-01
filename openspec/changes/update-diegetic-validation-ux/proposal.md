# Change: update diegetic validation UX principles

## Why
The product direction has been clarified: the game must validate the financial core through player behavior while preserving a fully diegetic, learn-by-doing experience. Current repository docs describe the metaphor and components well, but they do not consistently state the hierarchy of principles: no player-facing jargon, behavioral fidelity first, optional inspectability second, and the corkboard/journal as the primary learning memory.

## What Changes
- Clarify repo-level docs so the game is described as a diegetic validation front for the pricing and risk core.
- Strengthen UI specs around learn-by-doing, layered memory, and artifact-first proof.
- Add archive-band and resolution-feedback requirements for the corkboard.
- Add journal-note requirements that react to play history without replacing discovery.
- Add an optional late-game/advanced audit layer framed as Grandfather's method.

## Impact
- Affected specs: gameplay-loop, ui-components, ui-diegetic
- Affected docs: README.md, openspec/project.md, llm.txt, .wai/resources/ubiquitous-language/README.md
- Affected code: none yet; this is a documentation and specification alignment change

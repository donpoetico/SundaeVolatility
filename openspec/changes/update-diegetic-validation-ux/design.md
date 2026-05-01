## Context
Sundae Volatility needs to teach through interaction while also serving as a credible behavioral validation surface for the financial core. The repository already establishes diegetic language and zero-HUD principles, but it needs a clearer statement of how players learn, how the game proves coherence, and how technical inspection fits without overwhelming normal play.

## Goals / Non-Goals
- Goals:
  - Preserve player-facing diegetic language and avoid jargon in normal play
  - Make behavioral fidelity the primary validation path
  - Define a layered proof model: artifacts first, explicit audit second
  - Define the corkboard and journal as the memory system for learning by doing
- Non-Goals:
  - Implement the audit layer UI or any gameplay code
  - Finalize Day 1 step-by-step onboarding interactions
  - Expose technical finance terms in player UI

## Decisions
- Decision: Player-facing experience remains diegetic by default.
  - Alternatives considered: always-visible hybrid UI; rejected because it weakens discovery and overwhelms first contact.
- Decision: The financial core is validated primarily through coherent consequences in play.
  - Alternatives considered: technical ledger as the main proof layer; rejected because it makes validation depend on explicit inspection rather than behavior.
- Decision: Optional inspectability is framed in-world as Grandfather's method.
  - Alternatives considered: developer-only debug framing; rejected because it breaks tone and creates a separate truth surface.
- Decision: The corkboard is both an action board and a memory board, using an archive band for resolved promises.
  - Alternatives considered: active-only board; rejected because it weakens hypothesis formation and comparison.
- Decision: Journal feedback is hybrid-authored and reactive to player history.
  - Alternatives considered: only pre-written notes or only generated notes; rejected because each loses either narrative voice or responsiveness.

## Risks / Trade-offs
- Risk: The optional audit layer could drift toward a debug console.
  - Mitigation: Require artifact-first access and in-world framing in the spec.
- Risk: Archive/memory cues could clutter the board.
  - Mitigation: Keep resolved items compact and preserve only type, context, and outcome at default zoom.
- Risk: Reactive notes could feel tutorial-like.
  - Mitigation: Use graduated hints, with small marginal nudges before fuller reflections.

## Migration Plan
1. Align high-level docs with the clarified principles.
2. Add OpenSpec deltas for gameplay-loop, ui-diegetic, and ui-components.
3. Validate the change strictly before asking for approval.

## Open Questions
- Exact Day 1 click sequence and initial interactables
- Exact player-facing wording for every archive outcome label
- Exact fields and access path for the audit layer

# Project Context

## Purpose
Sundae Volatility is an educational derivatives pricing game with incremental mechanics. It teaches financial concepts through a diegetic ice cream shop metaphor where player-facing concepts are expressed as weather, promises, tools, and flavors.

The game also serves as a validation front for the financial core: the pricing and risk libraries remain the source of truth, while the player learns by acting inside the shop rather than by reading a technical dashboard.

## Tech Stack
- **Language**: TypeScript (Strict Mode)
- **State Management**: Zustand (with persistence)
- **Build Tool**: Vite
- **Testing**: Vitest
- **UI**: Vanilla DOM + CSS (minimal, framework-free)

## Project Conventions

### Code Style
- **Formatting**: Prettier with 2-space indentation, single quotes, and semicolons.
- **Linting**: ESLint with TypeScript recommended rules and no-explicit-any.
- **Naming**: CamelCase for variables/functions, PascalCase for types/interfaces/classes.

### Architecture Patterns
- **Three-Layer Architecture**: Core engine (pricing/simulation), Game logic (trading/progression), and UI (rendering/animations).
- **Agent Contract Pattern**: All domain logic is organized into "agents" (Math, Game Logic, UI, Testing) with explicit interface contracts.
- **Store-Driven**: Central Zustand store manages all game state and persists to storage.

### Testing Strategy
- **TDD Mandatory**: All logic must be verified by tests using Vitest.
- **Coverage**: Target >85% coverage for core engine and game logic.
- **Performance**: Latency requirements are enforced (Math <1ms, Greeks <2ms, Trades <5ms).

### Git Workflow
- **Commit Style**: Atomic, meaningful commits following a deliberate workflow.
- **Handoffs**: Session progress is tracked using `wai handoff`.

## Domain Context
- **Ice Cream Metaphor**: Flavors map to underlyings (Vanilla, Chocolate, Strawberry, Mint-Chip).
- **Diegetic Terms**: Player-facing language uses "promises," "tools," "weather," and "flavors."
- **Learn By Doing**: Core understanding comes from repeated play, visible consequences, and comparison against prior cases.
- **Behavioral Validation**: The game should prove model coherence through outcomes in play before asking the player to inspect deeper details.
- **Layered Proof**: Artifacts, slips, tickets, and journal notes come first; deeper explicit inspection is optional and framed as Grandfather's method.
- **Progressive Disclosure**: Mechanics are unlocked as the player gains capital and experience.

## Important Constraints
- **No UI Framework**: No React, Vue, or Angular. Direct DOM manipulation only.
- **Performance Budgets**: Strict latency limits for financial calculations.
- **No Mandatory Player Jargon**: Normal play should not require technical finance vocabulary.
- **Artifact-First UX**: Default understanding should come through shop objects and outcomes, not always-visible numerical panels.
- **Zustand Persistence**: Must handle `Set` serialization for `ProgressionState`.

## External Dependencies
- **Zustand**: State management.
- **Vite**: Development and build pipeline.
- **Vitest**: Testing framework.

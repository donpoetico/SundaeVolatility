# Project Context

## Purpose
Sundae Volatility is an educational derivatives pricing game with incremental mechanics. It teaches financial concepts (Black-Scholes, Greeks) through a diegetic ice cream shop metaphor where volatility is "weather" and options are "promises."

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
- **Diegetic Terms**: Options = "promises," Greeks = "tools," Volatility = "weather."
- **Progressive Disclosure**: Mechanics are unlocked as the player gains capital (e.g., Delta at $800, Gamma at $3000).

## Important Constraints
- **No UI Framework**: No React, Vue, or Angular. Direct DOM manipulation only.
- **Performance Budgets**: Strict latency limits for financial calculations.
- **Zustand Persistence**: Must handle `Set` serialization for `ProgressionState`.

## External Dependencies
- **Zustand**: State management.
- **Vite**: Development and build pipeline.
- **Vitest**: Testing framework.

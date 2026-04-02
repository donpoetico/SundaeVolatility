---
date: "2026-04-02"
project: "tracer-bullet"
sessions_analyzed: 0
type: reflection
---

## Project-Specific AI Context
_Last reflected: 2026-04-02 · 1 session analyzed_

### Conventions
- **No UI framework**: Vanilla TypeScript with Zustand for state — do not introduce React, Vue, or other frameworks. DOM manipulation is direct.
- **Agent contract pattern**: All domain logic is organized into "agents" (Math, Game Logic, UI, Testing) with explicit interface contracts in `src/contracts/agentContracts.ts`. New functionality must implement against these contracts.
- **Diegetic metaphor**: The game hides financial terminology from the player. Options are "promises," Greeks are "tools," volatility is "weather." Code may use financial terms internally, but UI-facing strings must use the ice cream shop metaphor.
- **TDD is mandatory per CLAUDE.md**: Red→green→refactor cycle. Refactoring commits must be separate from feature commits. Each ticket should map to a test cycle.
- **Performance budgets are specified**: Math agent pricing <1ms, Greeks <2ms, trade execution <5ms, UI 60fps. These are defined in `src/contracts/agentContracts.ts` as `PERFORMANCE_REQUIREMENTS`.

### Common Gotchas
- **`Set` in Zustand state**: `ProgressionState` uses `Set<GreekType>` and `Set<string>` for unlocked items and achievements. Zustand's `persist` middleware does not serialize/deserialize `Set` by default — this will silently break save/load. A custom `storage` or `serialize`/`deserialize` option will be needed.
- **`package.json` already exists** at repo root (shown in git status as untracked `package-lock.json`), but the architecture research artifact contains a different `package.json`. Check what's actually on disk before blindly overwriting.
- **ESLint config uses `.js` extension** (`.eslintrc.js` with `module.exports`) but `package.json` sets `"type": "module"` — this will fail. Need `.cjs` extension or convert to ESM syntax. Same issue with `.prettierrc.js`.
- **Store `emit` calls inside `set`**: The `advanceDay`, `addPosition`, and `unlockGreek` methods call `get().emit()` or `get().incrementTrades()` inside `set()` callbacks, which triggers nested state updates. This can cause subtle ordering bugs with Zustand middleware.

### Architecture Notes
- **Three-layer architecture**: (1) Core engine (pricing, simulation), (2) Game logic (trading, progression, unlocks), (3) UI (rendering, animations). Layers communicate through the Zustand store and typed events.
- **Four ice cream flavors = four underlyings**: Vanilla (low vol, baseline), Chocolate (medium-high vol, jump-prone), Strawberry (low vol, highly seasonal), Mint-Chip (highest vol, most jumps). Each has distinct simulation parameters (`meanReversionSpeed`, `seasonalAmplitude`, `jumpProbability`).
- **Progressive disclosure model**: Players start with basic spot trading, then unlock Greeks one at a time (Delta $800, Gamma $3000, etc.). The `ProgressionState.unlockedGreeks` set gates what's visible in the UI.
- **Weather system drives demand/prices**: `WeatherState` with temperature forecasts and uncertainty maps to the seasonal/volatility dynamics. This is the diegetic wrapper around the stochastic model.
- **MVP target**: Trade vanilla options + unlock Delta. The Math Agent (Black-Scholes in `src/core/pricing/`) is the first implementation priority.
- **Spec document**: The full game spec is `SUNDAE_VOLATILITY_UNIFIED_SPEC_v3_4.md` at repo root (version 3.4, dated 2026-03-26). Consult it for detailed game mechanics, progression curves, and educational design rationale.
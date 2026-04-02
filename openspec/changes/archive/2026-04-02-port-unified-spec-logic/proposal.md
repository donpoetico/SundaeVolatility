# Change: Port Unified Specification Behavioral and Economic Logic

## Why
The initial OpenSpec migration captured high-level architecture but omitted the specific behavioral rules, economic thresholds, and simulation parameters defined in the Unified Specification (v3.5). These details are required for accurate implementation of the game's core mechanics.

## What Changes
- **ADDED Game Logic:** Full settlement rules (Forward, Call, Put, Compound), FIFO Inventory tracking with 3-tier freshness degradation, and Standing Order matching logic.
- **ADDED Progression Triggers:** 11 specific milestones (Newspaper, Chocolate, Dmitri, etc.) with their [PROVISIONAL] thresholds.
- **ADDED Core Engine:** Monte Carlo scenario generation (p5/p95 statistics) and detailed Agent behavioral models (Risk, Info Quality, etc.).
- **ADDED State Management:** Revenue targets ($8k, $30k, $70k), Outcome tiers (Success, Partial, Failure), and the `Multiplier^0.8` scaling heuristic.
- **ADDED UI Diegetic:** Audio-Visual redundancy mapping (Door bell, Register pitch, Barometer hiss).

## Impact
- Affected specs: `game-logic`, `core-engine`, `state-management`, `ui-diegetic`, `agent-contracts`.
- Affected code: None (spec-only change).

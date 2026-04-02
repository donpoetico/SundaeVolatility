# Change: Refine Specification Precision and Scaling Heuristics

## Why
The specification evaluation identified minor gaps in telemetry scope, economic scaling consistency, and requirement singularity. These refinements ensure that V1 implementation is well-bounded and that the core engine is testable.

## What Changes
- **MODIFIED §15b/c Telemetry Scope:** Explicitly states V1 telemetry is strictly for playtest analysis/balancing.
- **MODIFIED §11 Scaling Heuristic:** Adds a non-linear scaling formula for the `campaignLengthMultiplier` (`Threshold_Base * Multiplier^0.8`).
- **MODIFIED core-engine/spec.md Requirement:** Splits the compound "Stochastic Market Simulation" requirement into four independent, testable requirements (GBM, O-U, Seasonal, Merton).

## Impact
- Affected specs: `SUNDAE_VOLATILITY_UNIFIED_SPEC_v3_4.md`, `specs/core-engine/spec.md`.
- Affected code: None (spec-only change).

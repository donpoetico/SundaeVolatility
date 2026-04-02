## ADDED Requirements
### Requirement: Agent Interface Parameters
The `MathAgent` interface SHALL expose methods for per-contract Greeks, Portfolio Greeks, and Monte Carlo statistics.

#### Scenario: Greeks Query
- **WHEN** a tool is attached to a slip
- **THEN** the UI queries the MathAgent for the contract's specific Greeks (Delta, Gamma, Vega).

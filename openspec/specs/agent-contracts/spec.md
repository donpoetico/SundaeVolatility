# agent-contracts Specification

## Purpose
Defines the explicit interface contracts and performance requirements for all domain-specific agents (Math, Game Logic, UI, Testing) to ensure modularity and high-performance execution.
## Requirements
### Requirement: Explicit Agent Interfaces
All domain logic SHALL be organized into agents with explicit interface contracts defined in `src/contracts/agentContracts.ts`.

#### Scenario: Math Agent Implementation
- **WHEN** implementing a new pricing model
- **THEN** it must strictly follow the `MathAgent` interface.

### Requirement: Performance Requirements
The system SHALL enforce strict performance budgets for core operations.

#### Scenario: Pricing Latency
- **WHEN** calculating an option price
- **THEN** the operation must complete in less than 1ms.

### Requirement: Agent Interface Parameters
The `MathAgent` interface SHALL expose methods for per-contract Greeks, Portfolio Greeks, and Monte Carlo statistics.

#### Scenario: Greeks Query
- **WHEN** a tool is attached to a slip
- **THEN** the UI queries the MathAgent for the contract's specific Greeks (Delta, Gamma, Vega).


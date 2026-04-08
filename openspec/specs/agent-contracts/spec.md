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
The system SHALL enforce strict performance budgets for core operations. Option pricing calculations SHALL complete in less than 1ms. Greeks calculations (per-contract and portfolio aggregate) SHALL complete in less than 2ms. Trade execution (validation, state update, and confirmation) SHALL complete in less than 5ms.

#### Scenario: Pricing Latency
- **WHEN** calculating an option price
- **THEN** the operation must complete in less than 1ms.

#### Scenario: Greeks Latency
- **WHEN** calculating per-contract or portfolio Greeks
- **THEN** the operation must complete in less than 2ms.

#### Scenario: Trade Execution Latency
- **WHEN** executing a trade (validation through state update)
- **THEN** the operation must complete in less than 5ms.

### Requirement: Agent Interface Parameters
The `MathAgent` interface SHALL expose methods for per-contract Greeks, Portfolio Greeks, and Monte Carlo statistics.

#### Scenario: Greeks Query
- **WHEN** a tool is attached to a slip
- **THEN** the UI queries the MathAgent for the contract's specific Greeks (Delta, Gamma, Vega).

### Requirement: Game Logic Agent Interface
The `GameLogicAgent` interface SHALL expose methods for trade validation, trade execution, progression evaluation, settlement processing, and inventory management. All methods SHALL accept and return typed DTOs defined in the contracts module.

#### Scenario: Trade Validation
- **WHEN** the UI requests a trade
- **THEN** the GameLogicAgent validates capital sufficiency, contract limits, and phase restrictions before execution.

#### Scenario: Settlement Processing
- **WHEN** the Evening phase triggers settlement
- **THEN** the GameLogicAgent processes all expiring contracts through the settlement interface and returns a typed settlement report.

### Requirement: UI Agent Interface
The `UIAgent` interface SHALL expose methods for scene rendering, animation scheduling, input event routing, and accessibility mode queries. The UI agent SHALL consume state from the store via subscriptions and SHALL NOT modify game state directly — all mutations flow through the GameLogicAgent.

#### Scenario: State Subscription
- **WHEN** the store state changes
- **THEN** the UIAgent receives the update via subscription and re-renders affected scene elements without directly mutating the store.

#### Scenario: Input Routing
- **WHEN** the player performs a gesture (click, drag, tear)
- **THEN** the UIAgent translates the input event into a typed command and dispatches it to the appropriate agent.

### Requirement: Testing Agent Interface
The `TestingAgent` interface SHALL expose methods for state injection, time manipulation, deterministic random seeding, and scenario assertion. Test harnesses SHALL use this interface to set up reproducible game states without bypassing agent contracts.

#### Scenario: Deterministic Scenario
- **WHEN** a test seeds the random generator via the TestingAgent
- **THEN** all subsequent price paths, customer arrivals, and jump events produce identical results across runs.

#### Scenario: State Injection
- **WHEN** a test injects a specific portfolio state via the TestingAgent
- **THEN** the injected state passes through the same validation as runtime state updates, ensuring tests cannot create invalid states.

### Requirement: Agent Error Contract
All agent methods SHALL return typed result objects that distinguish success from failure. Errors SHALL include an error code, a human-readable message, and the originating agent identifier. Agents SHALL NOT throw uncaught exceptions — all failures are communicated through the result type. Callers SHALL handle error results explicitly.

#### Scenario: Insufficient Funds Error
- **WHEN** the GameLogicAgent rejects a trade due to insufficient capital
- **THEN** it returns an error result with code `INSUFFICIENT_FUNDS`, a descriptive message, and agent identifier `GameLogicAgent`.

#### Scenario: Pricing Engine Error
- **WHEN** the MathAgent encounters invalid inputs (e.g., negative volatility)
- **THEN** it returns an error result with code `INVALID_INPUT` rather than throwing an exception or returning NaN.


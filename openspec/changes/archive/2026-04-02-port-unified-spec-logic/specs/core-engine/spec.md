## MODIFIED Requirements
### Requirement: Greeks Calculation
The core engine SHALL calculate Delta, Gamma, Theta, Vega, and Rho for active positions and the aggregate portfolio.

#### Scenario: Portfolio Vega
- **WHEN** multiple options are held for different flavors
- **THEN** an aggregate Vega is calculated to show portfolio sensitivity to market-wide volatility shifts.

## ADDED Requirements
### Requirement: Monte Carlo Scenario Generation
The core engine SHALL generate N configurable paths (default 1000) for forward-looking analysis of contract outcomes.

#### Scenario: Profit/Loss Distribution
- **WHEN** the player runs a scenario on a deal slip
- **THEN** the engine returns p5, p95, mean, and max loss/gain statistics.

### Requirement: Detailed Agent Parameters
The engine SHALL model market counterparties using behavioral parameters: Risk Tolerance, Price Sensitivity, Information Quality, and Max Counter-Offer Delta.

#### Scenario: Zosia's Information Edge
- **WHEN** Zosia proposes a deal
- **THEN** her Information Quality (0.65) informs the strike price relative to the internal GBM drift.

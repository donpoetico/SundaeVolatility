# core-engine Specification

## Purpose
Implements the core financial and simulation logic of the game, including Black-Scholes pricing, Greek calculations, and stochastic market dynamics.
## Requirements
### Requirement: Black-Scholes Pricing
The core engine SHALL implement the Black-Scholes model for European option pricing.

#### Scenario: Call Option Pricing
- **WHEN** spot price is $2.50, strike is $2.50, expiry is 30 days, volatility is 35%, and risk-free rate is 5%
- **THEN** the call option price should be calculated using the Black-Scholes formula.

#### Scenario: Option Near Expiration
- **WHEN** time to expiry is zero (0)
- **THEN** the pricing engine returns the intrinsic value (max(0, spot - strike) for calls).

### Requirement: Greeks Calculation
The core engine SHALL calculate Delta, Gamma, Theta, Vega, and Rho for active positions and the aggregate portfolio.

#### Scenario: Portfolio Vega
- **WHEN** multiple options are held for different flavors
- **THEN** an aggregate Vega is calculated to show portfolio sensitivity to market-wide volatility shifts.

### Requirement: GBM Price Path
The core engine SHALL implement a Geometric Brownian Motion (GBM) model for base random price walks with configurable drift and volatility.

#### Scenario: Random Walk
- **WHEN** the simulation ticks
- **THEN** the asset price is updated using the GBM formula with current mu and sigma.

### Requirement: Mean-Reverting Drift (O-U)
The core engine SHALL implement an Ornstein-Uhlenbeck (O-U) process to pull prices toward a seasonal baseline.

#### Scenario: Reversion to Baseline
- **WHEN** the asset price is far from the seasonal baseline
- **THEN** the price is adjusted toward the baseline with configurable reversion speed and strength.

### Requirement: Seasonal Price Modification
The core engine SHALL implement a sinusoidal seasonal drift modifier.

#### Scenario: Seasonal Peak
- **WHEN** the current day matches the asset's seasonal phase
- **THEN** the price receives its maximum seasonal amplitude adjustment.

### Requirement: Merton Jump Diffusion
The core engine SHALL implement Poisson-distributed price jumps for extreme market events.

#### Scenario: Price Jump
- **WHEN** the Poisson arrival rate triggers a jump
- **THEN** the price is adjusted by a log-normal jump size.

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


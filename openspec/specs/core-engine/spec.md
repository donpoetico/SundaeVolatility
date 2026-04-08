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

### Requirement: Price Model Composition
The core engine SHALL compose the price model in the following order: GBM provides the base random walk, the O-U process modifies the GBM drift toward the seasonal baseline, the sinusoidal seasonal modifier adjusts the baseline target, and Merton jump diffusion applies independently as a multiplicative shock after the drift-adjusted step.

#### Scenario: Composition order
- **WHEN** a simulation tick executes
- **THEN** the engine applies seasonal baseline calculation, O-U drift adjustment toward that baseline, GBM step with adjusted drift, and then Merton jump sampling — in that order.

### Requirement: Numerical Stability
The core engine SHALL handle edge cases in Black-Scholes inputs without producing NaN, Infinity, or negative prices. At zero volatility, option price SHALL equal the discounted intrinsic value. At zero time-to-expiry, Greeks SHALL return their limit values (Delta approaches 0 or 1, Gamma/Vega/Theta approach 0). At extreme spot/strike ratios (>10x or <0.1x), the engine SHALL clamp intermediate calculations to prevent overflow.

#### Scenario: Zero volatility pricing
- **WHEN** volatility is 0 and spot is $3.00 with strike $2.50 for a call
- **THEN** the engine returns the discounted intrinsic value ($0.50 × discount factor) without NaN or errors.

#### Scenario: Greeks at expiry
- **WHEN** time-to-expiry is 0 for an at-the-money option
- **THEN** Delta returns 0.5, and Gamma, Vega, and Theta return 0.

### Requirement: Simulation Time Step
The core engine SHALL define a configurable simulation time step that maps game-time to financial-time. One game day SHALL correspond to one calendar day (1/365 of a year) for Black-Scholes time parameters. Intra-day phases (morning, midday, evening) SHALL each represent one-third of a trading day for price evolution.

#### Scenario: Daily price evolution
- **WHEN** the simulation advances one full game day
- **THEN** the GBM step uses dt = 1/365 for drift and diffusion calculations.


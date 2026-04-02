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
The core engine SHALL calculate Delta, Gamma, Theta, Vega, and Rho for active positions.

#### Scenario: Delta Calculation
- **WHEN** spot price is $2.50 and other parameters are fixed
- **THEN** Delta is calculated to show price sensitivity.

### Requirement: Stochastic Market Simulation
The core engine SHALL update flavor prices using a mean-reverting stochastic process with seasonal components.

#### Scenario: Daily Price Update
- **WHEN** the market day is advanced
- **THEN** prices for all flavors are updated according to their volatility, mean reversion speed, and seasonal amplitude.


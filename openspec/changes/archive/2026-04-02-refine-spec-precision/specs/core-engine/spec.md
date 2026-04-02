## ADDED Requirements
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

## REMOVED Requirements
### Requirement: Stochastic Market Simulation
**Reason**: Singularity violation (ISO 29148). Requirement was compound and has been split into four independent sub-requirements (GBM, O-U, Seasonal, Merton) to ensure testability.
**Migration**: Replace with GBM, O-U, Seasonal, and Merton sub-requirements.

# Capability: Game Logic

## ADDED Requirements

### Requirement: Trade Execution
The system SHALL support opening and closing positions in European options for four distinct ice cream flavors.

#### Scenario: Buy a Call Option
- **WHEN** a player executes a buy order for a "Vanilla" call option
- **THEN** the capital is deducted and the position is added to the portfolio.

### Requirement: Progressive Disclosure
The system SHALL gate financial tools (Greeks) behind capital milestones.

#### Scenario: Unlock Delta
- **WHEN** player capital reaches $800
- **THEN** the Delta tool becomes available for purchase.

### Requirement: Market Hours and Seasonal Effects
The market SHALL simulate seasonal effects on demand and price dynamics based on a weather model.

#### Scenario: High Temperature Forecast
- **WHEN** the weather forecast predicts higher temperatures
- **THEN** demand for ice cream flavors increases, impacting price dynamics.

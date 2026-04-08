# game-logic Specification

## Purpose
Manages game-specific rules, progression, and trade validation, ensuring player actions adhere to the economic model and unlocking systems.
## Requirements
### Requirement: Trade Execution
The system SHALL support opening and closing derivative contracts — including forward contracts, call options, and put options — for four distinct ice cream flavors.

#### Scenario: Buy a Call Option
- **WHEN** a player executes a buy order for a "Vanilla" call option
- **THEN** the capital is deducted and the position is added to the portfolio.

#### Scenario: Insufficient Funds
- **WHEN** player capital is less than the trade cost
- **THEN** an InsufficientFundsError is thrown and the trade is blocked.

### Requirement: Progressive Disclosure
The system SHALL gate financial tools (Greeks) behind capital milestones.

#### Scenario: Unlock Delta
- **WHEN** player capital reaches $800
- **THEN** the Delta tool becomes available for purchase.

### Requirement: Market Hours and Seasonal Effects
The market SHALL simulate seasonal effects on demand and price dynamics for all four primary flavors (Vanilla, Chocolate, Strawberry, Mint-Chip) based on a weather model.

#### Scenario: High Temperature Forecast
- **WHEN** the weather forecast predicts higher temperatures
- **THEN** demand for ice cream flavors increases, impacting price dynamics across the available assets.

### Requirement: Forward Settlement Rules (Mrs. Chen)
The system SHALL settle forward contracts during the evening phase on the expiry day.
- **Full fulfillment:** Deduct required quantity, add agreed price to register.
- **Shortfall Penalty:** Shortfalls incur a penalty of 1.5× the current market price per missing tub.

#### Scenario: Partial Forward Fulfillment
- **GIVEN** a forward contract for 20 tubs of vanilla at $2.50
- **AND** the player has only 15 tubs, and market price is $3.00
- **WHEN** evening settlement runs
- **THEN** 15 tubs are deducted, player receives $37.50, and pays shortfall penalty of $22.50.

### Requirement: Call Option Settlement (Dmitri)
The system SHALL allow counterparty exercise of call options if the market price exceeds the strike.
- **ITM:** Dmitri exercises, ingredient is deducted at the strike price.
- **OTM:** Dmitri walks away, no inventory changes, player keeps the premium.

#### Scenario: Call Option Exercise
- **GIVEN** a call option for 10 tubs of chocolate at $2.00 strike
- **AND** the current market price is $2.80
- **WHEN** evening settlement runs
- **THEN** Dmitri exercises, 10 tubs are deducted, and player receives $20.00.

### Requirement: Put Option Settlement (Agnes)
The system SHALL allow the player to sell unsold stock to Agnes at a guaranteed floor price if market price is below the strike.
- **ITM:** Agnes buys back unsold stock at strike. No shortfall penalty for puts.
- **OTM:** Guarantee expires, player loses the premium.

#### Scenario: Put Option Floor
- **GIVEN** a put option for 8 tubs of strawberry at $1.50 strike
- **AND** market price is $1.20 and player has 8 tubs
- **WHEN** evening settlement runs
- **THEN** Agnes buys 8 tubs at $1.50.

### Requirement: FIFO Inventory & Freshness
The system SHALL track inventory tubs using a First-In-First-Out (FIFO) model with freshness degradation.
- **Fresh (Day 0):** 100% value.
- **Day-Old (Day 1):** 75% value, visual tag applied.
- **Two-Day-Old (Day 2):** 50% value, visible melt.
- **Discard (Day 3):** Automatic morning discard with a sigh sound.

#### Scenario: Inventory Aging
- **WHEN** the day advances
- **THEN** all existing stock moves to the next freshness tier and its market value multiplier is updated.

### Requirement: Standing Order Matching
The system SHALL allow up to 3 active standing orders (punch cards) to automatically accept deals matching player criteria.

#### Scenario: Auto-Accept Matching Deal
- **GIVEN** a standing order for "Vanilla Call" with strike < $2.20
- **WHEN** Mrs. Chen proposes a $2.15 Vanilla call
- **THEN** the deal is automatically accepted and pinned to the corkboard (if capacity allows).

### Requirement: Milestone Thresholds
The system SHALL evaluate progression milestones using specific provisional revenue and customer thresholds.
- **Chocolate:** Revenue ≥ $500 AND ≥ 15 customers.
- **First Deal:** Customers ≥ 30 AND balance ≥ $1,500.
- **Dmitri:** ≥ 2 completed Mrs. Chen deals.
- **Workshop:** Balance ≥ $15,000 AND ≥ 8 deals.

#### Scenario: Unlock Chocolate
- **WHEN** player revenue reaches $500 and customer count reaches 15
- **THEN** the Chocolate flavor is unlocked for purchase.

### Requirement: Counterparty Behavioral Parameters
The game logic SHALL model market counterparties using behavioral parameters: Risk Tolerance, Price Sensitivity, Information Quality, and Max Counter-Offer Delta. Each named character SHALL have fixed parameter values that determine their deal proposals and negotiation behavior.

#### Scenario: Zosia's Information Edge
- **WHEN** Zosia proposes a deal
- **THEN** her Information Quality (0.65) informs the strike price relative to the internal GBM drift.

### Requirement: Economic Pacing Goals
The system SHALL track progress against three act-based revenue goals (register balance inclusive of starting capital).
- **Act 1 (Survival):** Reach $8,000 to renovate the back room.
- **Act 2 (Growth):** Reach $30,000 to unlock the workshop.
- **Act 3 (Mastery):** Reach $70,000 register balance to save the shop.

#### Scenario: Saving the Shop
- **WHEN** Day 90 ends and register balance is $75,000
- **THEN** the system triggers the "Full Success" outcome tier.

### Requirement: Outcome Tiers
The system SHALL evaluate campaign success into three tiers (Full Success, Partial Success, Failure).
- **Full ($70k+):** Shop saved, credits roll.
- **Partial ($50k–$69k):** Debt not cleared, New Game+ unlocked.
- **Failure (<$50k):** Shop sold, knowledge remains, New Game+ unlocked.

#### Scenario: Bitter-Sweet Failure
- **WHEN** Day 90 ends and register balance is $45,000
- **THEN** the "Failure" cutscene triggers and New Game+ options are unlocked.

### Requirement: Non-Linear Campaign Scaling
The system SHALL scale revenue thresholds and day-based triggers using the campaign length multiplier heuristic.
- **Formula:** `Threshold_New = Threshold_Base * Multiplier^0.8`

#### Scenario: Shortened Campaign
- **GIVEN** a 60-day campaign (Multiplier = 0.67)
- **THEN** the Act 1 goal ($8,000) is scaled down to approximately $5,700.


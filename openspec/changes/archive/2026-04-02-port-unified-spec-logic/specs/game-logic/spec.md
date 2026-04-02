## ADDED Requirements
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
- **WHEN** player has $600 and served 20 customers
- **THEN** the Chocolate flavor is unlocked for purchase.

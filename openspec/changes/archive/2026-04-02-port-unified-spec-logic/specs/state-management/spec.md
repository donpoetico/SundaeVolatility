## ADDED Requirements
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

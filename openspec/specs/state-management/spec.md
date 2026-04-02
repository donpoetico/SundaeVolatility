# state-management Specification

## Purpose
Centralizes all game state in a single Zustand store with persistence, ensuring state consistency and supporting session re-hydration across various storage backends.
## Requirements
### Requirement: Centralized State Management
The system SHALL use a centralized store for all game state, including market, portfolio, progression, and settings.

#### Scenario: State Update Propagation
- **WHEN** the store state is modified (e.g., cash update)
- **THEN** all UI components reflecting that state are updated.

### Requirement: State Persistence
The system SHALL persist game state to local storage and support loading on session start.

#### Scenario: Resume Session
- **WHEN** the player returns to the game
- **THEN** the previous session's state is loaded correctly.

### Requirement: Hybrid Storage Strategy
The system SHALL prioritize IndexedDB for state storage, with a transparent fallback to localStorage if IndexedDB is unavailable.

#### Scenario: Storage Fallback
- **WHEN** IndexedDB is blocked or unsupported by the browser
- **THEN** the state is saved to and loaded from localStorage automatically.

### Requirement: Custom Set Serialization
The state management system SHALL handle the serialization and deserialization of `Set` objects used in `ProgressionState`.

#### Scenario: Persist Unlocks
- **WHEN** the game is saved
- **THEN** all unlocked Greeks (stored in a `Set`) are preserved and successfully re-hydrated.

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


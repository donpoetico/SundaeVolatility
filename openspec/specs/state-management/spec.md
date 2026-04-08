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

### Requirement: State Schema Migration
The state management system SHALL detect schema version mismatches on load and apply forward migrations to upgrade saved state to the current schema. If migration fails, the system SHALL fall back to a clean initial state and log the migration error.

#### Scenario: Schema version upgrade
- **WHEN** a saved game with schema version 1 is loaded by an application expecting schema version 2
- **THEN** the migration pipeline transforms the state to version 2 format and the game resumes with all prior progress intact.

#### Scenario: Migration failure fallback
- **WHEN** a migration step fails due to corrupt or incompatible data
- **THEN** the system starts a fresh game with default initial state and logs the error for debugging.

### Requirement: New Game Plus State
The state management system SHALL support a New Game+ mode that resets progression state while preserving specified player knowledge. Unlocked tools, discovered recipes, and journal entries SHALL carry over. Capital, inventory, and active contracts SHALL reset to initial values.

#### Scenario: Start New Game Plus
- **WHEN** the player starts New Game+ after a Partial Success or Failure outcome
- **THEN** the store resets capital to the starting amount, clears all inventory and contracts, but retains the set of unlocked tools and journal entries from the previous run.


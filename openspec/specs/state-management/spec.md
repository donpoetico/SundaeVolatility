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


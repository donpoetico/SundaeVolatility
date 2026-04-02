# ui-interactions Specification

## Purpose
Codifies the tactile input model, physical animation principles, and sound-visual coupling used to make interactions in the shop feel satisfying and material.
## Requirements
### Requirement: Tactile Interaction Vocabulary
The input model SHALL be based on physical gestures (Pick up, Pin, Slide back, Tear) that correlate to actions in the shop.

#### Scenario: Accept a deal
- **WHEN** the player picks up a slip and drags it to the corkboard
- **THEN** the slip is pinned with a satisfying "thunk" sound and visual bounce.

### Requirement: Physically Plausible Animation
Every interface animation SHALL obey simplified physics, using easing and duration discipline to ensure a responsive yet material feel.

#### Scenario: Slip settlement
- **WHEN** a deal expires
- **THEN** the slip is removed from the corkboard with a gentle fluttering or tearing animation.

### Requirement: Sound-Visual Coupling
Every significant visual interaction SHALL have a synchronized audio event (e.g., register ring, gear tick, paper thunk).

#### Scenario: Monitor volatility
- **WHEN** the barometer needle enters the red zone
- **THEN** a persistent mechanical hiss is heard alongside the needle's tremble.


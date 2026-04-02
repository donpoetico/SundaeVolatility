# ui-diegetic Specification

## Purpose
Defines the diegetic user interface philosophy, scene architecture, and spatial navigation flow, ensuring all game information is embedded within the physical shop environment.
## Requirements
### Requirement: Zero-HUD Principle
The interface SHALL be entirely diegetic, with all information presented through physical objects within the game world (register, slips, instruments).

#### Scenario: Check balance
- **WHEN** the player wants to see their current cash
- **THEN** they look at the mechanical display on the brass cash register.

### Requirement: Scene Architecture
The game world SHALL consist of two spatially continuous scenes: the Shop and the Back Room, accessible through a smooth camera pan.

#### Scenario: Enter the back room
- **WHEN** the player clicks the doorway to the back room
- **THEN** the camera pans to reveal the desk, barometer, and tool storage.

### Requirement: Fixed Elevated Perspective
The game SHALL use a fixed, slightly elevated front-facing perspective that represents the shopkeeper's view from behind the counter.

#### Scenario: View the counter
- **WHEN** in the shop scene
- **THEN** the counter occupies the lower third, the window the upper half, and interactive zones the sides.


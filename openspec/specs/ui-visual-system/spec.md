# ui-visual-system Specification

## Purpose
Sets the visual style guide, including typography families, material language, color palette, and lighting models to create a cohesive autumnal shop atmosphere.
## Requirements
### Requirement: Three-Font System
The project SHALL strictly use three specific typography families tied to the game's fiction: Grandfather's Hand, Gazette Serif, and Label Maker.

#### Scenario: Read a journal entry
- **WHEN** opening the leather-bound journal
- **THEN** the text is rendered in Stanisław's warm, handwritten font.

### Requirement: Material-Based Rendering
All surfaces (wood, brass, paper, glass, cork) SHALL be rendered with visible textures and wear patterns to reinforce the tactile standard.

#### Scenario: Inspect the corkboard
- **WHEN** the player looks at the board behind the counter
- **THEN** they see visible cork pores, old pin holes, and a walnut wooden frame.

### Requirement: Time-of-Day Lighting
The ambient lighting SHALL transition between cool neutral (morning), warm bright (midday), and deep amber (evening) phases.

#### Scenario: End of day transition
- **WHEN** the game shifts to the evening phase
- **THEN** long shadows appear and a warm amber overlay is applied to the interior.


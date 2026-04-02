# ui-components Specification

## Purpose
Specifies the visual design, interactive states, and mechanical behaviors of individual shop objects (register, price tags, deal slips, tools) to maintain a tactile, material aesthetic.
## Requirements
### Requirement: Mechanical Register Display
The cash register SHALL use flip-digit card animations for balance updates, providing visual feedback on sale quality (green/amber tints).

#### Scenario: Ring a high-margin sale
- **WHEN** a profitable trade is executed
- **THEN** the register lever presses down and digits flash with a subtle green tint.

### Requirement: Dymo-style Price Tags
Each ingredient container SHALL have a physical price tag using embossed label-maker typography and a vertical rotating wheel for adjustment.

#### Scenario: Adjust ingredient price
- **WHEN** the player drags the price tag in the morning phase
- **THEN** a rotating wheel appears to increment the price in $0.25 steps.

### Requirement: Distinct Deal Slips
Deal slips SHALL have unique visual styles (paper weight, color, handwriting) corresponding to the character tier and contract type.

#### Scenario: Examine Mrs. Chen's forward
- **WHEN** Mrs. Chen places an order on the counter
- **THEN** the player sees a cream cardstock document with a pre-printed letterhead and a red "ORDER" stamp.

### Requirement: Instrumental Tools
Financial analysis tools (Caliper, Spring, Magnifier) SHALL be represented as physical objects that clip onto or rest upon deal slips.

#### Scenario: Attach Caliper
- **WHEN** the player drops the brass caliper onto a deal slip
- **THEN** the gears spin at a rate proportional to the delta value.


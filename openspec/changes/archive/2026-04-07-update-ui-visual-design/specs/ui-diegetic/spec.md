## ADDED Requirements

### Requirement: Progressive Disclosure Visual States
The shop's visual composition SHALL change at each progressive disclosure milestone. New objects (newspaper, corkboard, back room doorway, Nadia's shop) SHALL only become visible when their trigger condition is met. Unlocked ingredient containers SHALL transition from a dimmed state (heavily desaturated, thinner outlines, no interaction affordance) to a lit state (saturated, thick outlines, interactive) via a reveal animation. Each reveal MUST be a visual discovery moment — the player notices something new in a space they thought they knew.

#### Scenario: Day 1 bare shop
- **WHEN** the player starts a new game
- **THEN** only the counter with register, the window, and the ingredient shelf are visible. Three of four ingredient slots are dimmed. There is no newspaper, no corkboard, no back room doorway, and no clock visible.

#### Scenario: Corkboard materializes
- **WHEN** the player pins their first deal slip (Mrs. Chen's forward order, Days 8-12)
- **THEN** the corkboard materializes on the right side of the midground wall — it was not visible before this moment. A warm light pulses from it as the slip is pinned.

#### Scenario: Back room opens
- **WHEN** the player purchases the back room renovation (Days 18-25)
- **THEN** a short animation plays: boards removed from the midground doorway, dust settling, warm amber light spilling through. The doorway becomes a visible, interactive passage.

#### Scenario: Nadia appears across the street
- **WHEN** the competitor trigger fires (Days 40+)
- **THEN** a new A-frame sign becomes visible through the window on the far side of the street. No fanfare — the player notices it organically over subsequent days.

### Requirement: Counter Space Management
The counter SHALL be divided into three zones with priority rules. The register zone (far left) SHALL be permanent and never occluded. The interaction zone (center) SHALL be used for active customer negotiations and serving; when a customer approaches, any open newspaper SHALL auto-fold with a paper-rustle animation and slide to the utility zone. The utility zone (right) SHALL hold the newspaper when no customer is present and serve as overflow space. Only one deal slip MAY be on the counter at a time (the active negotiation). A compound deal, even when unfolded into sub-slips, counts as a single counter item.

#### Scenario: Customer arrives while newspaper is open
- **WHEN** a customer approaches the counter and the newspaper is unfolded in the interaction zone
- **THEN** the newspaper auto-folds with a soft paper-rustle sound and slides to the utility zone (right), clearing the center for the customer interaction.

#### Scenario: Serving area always accessible
- **WHEN** a customer requests a spot sale while a deal slip is also on the counter
- **THEN** the serving area (center-left of interaction zone) remains accessible for scooping, with the deal slip positioned to the right of the serving area without overlapping.

### Requirement: Multi-Customer Positioning
Characters SHALL appear in front of the counter, framed against the window, in up to three positions. The primary position (center) SHALL be used for the active customer. The secondary position (offset left) SHALL show a waiting customer with idle animations. The tertiary position (offset right, partially visible) SHALL show a third customer's shoulder and head. Walk-in customers who cannot fit visually SHALL remain off-screen, with their presence communicated by door bell jingle frequency and visible pedestrians pausing at the window. Named characters SHALL always take the primary position when it is their turn; walk-ins yield.

#### Scenario: Busy midday with multiple customers
- **WHEN** three customers are present during a busy midday phase
- **THEN** the active customer is centered in the primary position, a second waits at the left with an idle animation (checking watch), and a third is partially visible on the right (shoulder and hat only).

#### Scenario: Named character takes priority
- **WHEN** Mrs. Chen arrives while two walk-in customers are visible
- **THEN** Mrs. Chen takes the primary center position and the walk-ins shift to secondary and tertiary positions.

### Requirement: Corkboard Lean-In View
The corkboard SHALL support a diegetic "lean-in" camera movement for detailed inspection. When the player clicks any deal slip or the corkboard background, the camera SHALL smoothly push toward the corkboard while other scene elements blur and dim but remain partially visible. In the lean-in view, deal slips SHALL expand to approximately 200x280px (desktop) or 240x320px (tablet) showing full text details. Attached tools SHALL be visible and animated. The player SHALL exit the lean-in view by clicking empty space or pressing Escape, returning the camera to the full shop view. The lean-in view also activates automatically during the cross-room tool flow (see ui-interactions: Cross-Room Tool Flow).

#### Scenario: Inspect a deal slip
- **WHEN** the player clicks a deal slip on the corkboard
- **THEN** the camera smoothly pushes toward the corkboard (0.5s), the rest of the scene blurs, and the clicked slip expands to show full details (customer, flavor, quantity, date, price, status). Other slips remain visible but dimmed.

#### Scenario: Lean-in with carried tool
- **WHEN** the player enters the shop while carrying the caliper from the back room
- **THEN** the corkboard lean-in view activates automatically and deal slips that accept the caliper pulse with a warm highlight, inviting attachment.

#### Scenario: Customer arrives during lean-in
- **WHEN** a customer enters the shop while the player is in the corkboard lean-in view
- **THEN** the door bell jingles audibly but the lean-in view persists. The arriving customer is visible as a silhouette through the background blur. The player exits lean-in at their discretion; the customer waits.

### Requirement: Back Room Scene Layout
The back room SHALL be a separate scene accessed through a doorway in the shop's midground wall, connected via a smooth horizontal camera pan (approximately 1.5 seconds). The back room SHALL feel warmer and dimmer than the shop, lit by a desk lamp and ambient light, with darker wood tones and a study/workshop atmosphere. The room SHALL contain: Grandfather's desk (center-right, dominant piece), the barometer (wall-mounted, back wall left), the aging rack (left wall), and the supplier board (wall-mounted, back wall right). The desk SHALL hold the journal, mechanical calculator, tool tray, and Rho Dial once each is revealed.

#### Scenario: Enter the back room
- **WHEN** the player clicks the doorway
- **THEN** the camera pans horizontally (1.5s) from the shop to the back room, revealing the desk under a warm banker's lamp glow with dust motes visible in the light.

#### Scenario: Back room initial state
- **WHEN** the back room is first unlocked (Days 18-25)
- **THEN** the room contains only the desk, the journal open to its first page, and the desk lamp. The barometer area, aging rack, and supplier board are empty spaces that fill as the game progresses.

## MODIFIED Requirements

### Requirement: Scene Architecture
The game world SHALL consist of two spatially continuous scenes: the Shop and the Back Room, connected via a smooth horizontal camera pan through a visible doorway in the shop's midground wall. The Shop scene SHALL be organized into three depth layers: foreground counter (~33% of screen height), midground wall/shelf/corkboard (~17%), and background window/street (~50%). The Back Room scene SHALL be organized around the central desk with wall-mounted instruments and storage. Both scenes exist in a single continuous horizontal space; the camera slides between them.

#### Scenario: Enter the back room
- **WHEN** the player clicks the doorway to the back room
- **THEN** the camera pans horizontally (1.5s) to reveal the back room. The shop slides left off-screen as the back room slides in.

#### Scenario: Return to the shop
- **WHEN** the player clicks the doorway or left edge in the back room
- **THEN** the camera pans back to the shop in 1.5 seconds. Any tool being carried remains attached to the cursor during the transition.

### Requirement: Fixed Elevated Perspective
The game SHALL use a fixed, slightly elevated front-facing perspective that represents the shopkeeper's view from behind the counter. Characters appear in front of the counter, framed against the window. The counter occupies the lower third of the screen, the midground wall occupies approximately 17% above the counter, and the window occupies the upper half. The three depth layers SHALL use decreasing saturation, contrast, and outline weight to create visual hierarchy without parallax or camera movement.

#### Scenario: View the counter
- **WHEN** in the shop scene
- **THEN** the counter (foreground, ~33%) has the highest saturation and 3-4px outlines, the wall area (midground, ~17%) is slightly desaturated with 2-3px outlines, and the window (background, ~50%) has broad soft shapes with 1-2px outlines.

#### Scenario: Customer framing
- **WHEN** a customer stands at the counter
- **THEN** their upper body is visible in front of the counter, framed against the window light behind them, positioned between the midground and background layers.

### Requirement: Audio-Visual Redundancy Mapping
The interface SHALL provide redundant visual indicators for all information-bearing sound events. Door bell frequency SHALL map to a foot-traffic indicator (more pedestrian silhouettes visible in the window). Register pitch SHALL map to a tinted color flash on the mechanical display (green for high-margin, amber for break-even, white for normal). Barometer hiss SHALL map to red zone color, needle trembling, and visible steam wisps. Caliper ticking speed SHALL map to gear spin speed (already visual). Spring creak intensity SHALL map to vibration amplitude (already visual). All redundancy indicators SHALL be slightly more prominent when the "Visual Cues Enhanced" accessibility toggle is active.

#### Scenario: Silent mode play
- **WHEN** audio is muted
- **THEN** a player can still identify a high-margin sale by observing the green tint on the cash register, a busy day by counting pedestrian silhouettes in the window, and high volatility by the barometer needle's position in the red zone with steam wisps.

#### Scenario: Enhanced visual cues
- **WHEN** the "Visual Cues Enhanced" toggle is active
- **THEN** status border pulses on deal slips are larger and brighter, register tints are more saturated, foot-traffic indicators in the window use larger pedestrian silhouettes, and tools gain subtle text labels in Grandfather's Hand font (e.g., "fast" near caliper, "tense" near spring).

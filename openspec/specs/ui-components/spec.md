# ui-components Specification

## Purpose
Specifies the visual design, interactive states, and mechanical behaviors of individual shop objects (register, price tags, deal slips, tools, documents, containers, corkboard, back room objects) to maintain a tactile, material aesthetic.

## Requirements

### Requirement: Mechanical Register Display
The cash register SHALL use flip-digit card animations for balance updates, providing visual feedback on sale quality. High-margin sales SHALL flash digits with a green tint; break-even sales SHALL flash with an amber tint; normal sales SHALL remain white/cream. When the player attempts a restock order they cannot afford, the register SHALL flash amber and the order card SHALL refuse to tear. The register SHALL be positioned in the far-left counter zone and SHALL never be occluded by other objects.

#### Scenario: Ring a high-margin sale
- **WHEN** a profitable trade is executed
- **THEN** the register lever presses down, digits flip with a Y-scale tween animation, and the new balance flashes with a subtle green tint.

#### Scenario: Insufficient funds for restock
- **WHEN** the player tries to tear a restock order card that exceeds their balance
- **THEN** the register flashes amber and the order card visually resists tearing (the perforated edge holds), preventing the order.

### Requirement: Dymo-style Price Tags
Each ingredient container SHALL have a physical price tag using embossed label-maker typography and a vertical rotating wheel for adjustment.

#### Scenario: Adjust ingredient price
- **WHEN** the player drags the price tag in the morning phase
- **THEN** a rotating wheel appears to increment the price in $0.25 steps.

### Requirement: Distinct Deal Slips
Deal slips SHALL have unique visual styles corresponding to the character tier and contract type, as defined by the Document Design System requirement. Each slip type SHALL be distinguished by paper color, stamp design, pin color, handwriting style, and physical size. Counter-offers SHALL appear as handwritten corrections in Grandfather's Hand font, with the original price crossed out. Each named character's handwriting SHALL have a distinct style: Mrs. Chen's neat organized print, Dmitri's slightly shaky cautious script, Agnes's hurried messy script, and Kazik's bold flourished calligraphy.

#### Scenario: Examine Mrs. Chen's forward
- **WHEN** Mrs. Chen places an order on the counter
- **THEN** the player sees a cream cardstock document with a pre-printed Community Center letterhead in Gazette Serif, a red "ORDER" stamp slightly askew in the upper right, and Mrs. Chen's neat handwriting showing flavor, quantity, delivery date, and agreed price.

#### Scenario: Counter-offer on a deal
- **WHEN** the player adjusts the price on a deal slip
- **THEN** the original price is crossed out with a line and a new price appears beside it in Grandfather's Hand font, styled as a handwritten correction.

### Requirement: Attachable Analysis Tools
Financial analysis tools (Caliper, Spring, Magnifier, Rho Dial) SHALL be represented as physical objects that clip onto deal slips via drag-and-drop from the tool tray. When attached to slips, they SHALL display continuous animated readings: the Caliper's gears spin at a rate proportional to delta, the Spring vibrates with amplitude proportional to gamma, the Magnifier reveals paper degradation with a drip counter showing daily value loss, and the Rho Dial's needle indicates the deal's rate sensitivity.

#### Scenario: Attach Caliper
- **WHEN** the player drops the brass caliper onto a deal slip
- **THEN** the caliper snaps into position on the slip's edge with a satisfying click, and its gears spin at a rate proportional to the delta value.

#### Scenario: Incompatible tool conflict
- **WHEN** the player drops a tool onto a slip that already has an incompatible tool attached
- **THEN** the existing tool auto-detaches and returns to the desk tool tray with a soft clink sound, and the new tool attaches in its place.

### Requirement: Wall-Mounted Instruments
The Barometer SHALL be wall-mounted in the back room and cannot be attached to individual slips — it shows a global market volatility reading. The Rho Dial SHALL reside on Grandfather's desk and show global interest rate changes via its needle position. Wall-mounted instruments provide ambient, always-visible information rather than per-contract analysis.

#### Scenario: Check the Barometer
- **WHEN** the player walks to the back room and views the barometer
- **THEN** the wall-mounted pressure gauge shows a needle in the green, amber, or red zone with continuous trembling proportional to overall market volatility. The barometer cannot be picked up or attached to slips.

### Requirement: Document Design System
All in-game documents SHALL follow a tiered design system where contract type is communicated through paper color, stamp design, pin color, handwriting style, and physical size. The player MUST be able to distinguish document types at a glance on the corkboard by visual properties alone, without reading text. The tiers are: Tier 2 forwards (cream cardstock, red "ORDER" stamp, red pin), Tier 3a reservations (light blue card, purple "RESERVATION" stamp, blue pin), Tier 3b guarantees (earthy textured paper, green "GUARANTEE" stamp with leaf motif, green pin), and Tier 4 compound deals (thick manila, wax "K" seal, brass pin, folded multi-part with paper clip).

#### Scenario: Distinguish deal types on corkboard
- **WHEN** the corkboard has deals from Mrs. Chen, Dmitri, Agnes, and Uncle Kazik pinned simultaneously
- **THEN** the player can identify each deal type by paper color (cream, blue, earthy, manila), stamp color (red, purple, green, wax), and pin color (red, blue, green, brass) without reading any text.

#### Scenario: Examine a reservation slip
- **WHEN** Dmitri places a reservation on the counter
- **THEN** the player sees a light blue card with a purple "RESERVATION" stamp, Dmitri's slightly shaky script, a circled fee amount with a small coin icon, and flavor/quantity/date/price fields.

#### Scenario: Unfold a compound deal
- **WHEN** Uncle Kazik places a compound deal on the counter
- **THEN** the player sees a thick manila document with a wax "K" seal. Clicking unfolds it to reveal 2-3 linked sub-slips connected by a brass paper clip. Each sub-slip can be individually accepted or declined.

#### Scenario: Paper clip updates on partial acceptance
- **WHEN** the player tears one sub-slip from a compound deal
- **THEN** the brass paper clip visual updates to reflect the remaining group of sub-slips.

### Requirement: Utility Documents
The game SHALL include non-contract document types that serve gameplay functions. Carbon-copy order forms SHALL slide out from behind ingredient containers for restocking (gray carbon-copy paper, pre-printed fields, rotating quantity wheel, torn along perforated edge to submit). Standing order punch cards SHALL be stiff cream card stock with three rotating combination-lock wheels (ingredient, deal type, price threshold), torn from a stack on Grandfather's desk and pinned to a dedicated strip below the main corkboard grid. Calculator output tickets SHALL be narrow receipt-style paper tape with three weather-icon bars (red loss / green profit) and a handwritten "expected haul" annotation, attachable as a tab to the parent deal slip.

#### Scenario: Place a restock order
- **WHEN** the player clicks an ingredient container during the morning phase
- **THEN** a carbon-copy order form slides out showing the ingredient name, current supplier price, and a rotating quantity wheel. The player sets quantity and tears the card along the perforated edge to submit.

#### Scenario: Create a standing order
- **WHEN** the player tears a configured punch card from the desk stack (Act 3)
- **THEN** the card, with three wheels set (ingredient, deal type, price threshold), can be carried to the shop and pinned to the standing orders strip below the main corkboard grid.

#### Scenario: Attach calculator output
- **WHEN** the player tears off a calculator ticket after analysis
- **THEN** the ticket can be carried to the corkboard and attached as a small tab on the top-right corner of the parent deal slip, visible in lean-in view without occupying its own grid slot.

### Requirement: Journal Visual Design
The journal SHALL be a leather-bound, coffee-stained book displayed open on Grandfather's desk, rendered in Grandfather's Hand font. Pages SHALL show visible wear: bent corners, water damage on specific pages, pressed flowers between seasonal pages, and coffee ring stains that partially obscure some text. Cipher pages SHALL use a mix of Polish words, mathematical notation, and ice cream recipe shorthand. Margin sketches (ice cream cones, weather patterns, mathematical doodles) SHALL appear on relevant pages. Page edges visible on the right side SHALL communicate how much content has been revealed.

#### Scenario: Read a standard journal page
- **WHEN** the player opens the journal to a revealed page
- **THEN** they see warm handwritten text in Grandfather's Hand on aged cream paper with visible fiber texture, a coffee ring stain overlapping part of the text, and small margin sketches related to the page's topic.

#### Scenario: Encounter a cipher page
- **WHEN** the player reaches a cipher puzzle page
- **THEN** the text uses a visually distinct mix of Polish words, mathematical symbols, and ice cream recipe diagrams that look different from standard journal entries, inviting the player to decode.

### Requirement: Ingredient Container Visual States
Ingredient containers SHALL communicate their state through six visual treatments. Full: bright saturated color, filled to top, crisp outline. Partially full: slightly less vibrant, visible fill line drop. Low: desaturated ~20%, fill line near bottom, faint amber glow as warning. Empty: dark slot, container outline only, no color fill. Dimmed (not yet unlocked): heavily desaturated, thinner outline, no interaction affordance. Delivery incoming: small tag on slot edge reading "Arrives: Day N" in Label Maker font.

#### Scenario: Low ingredient warning
- **WHEN** an ingredient container drops below 20% capacity
- **THEN** the container desaturates ~20%, the fill line is near the bottom, and a faint amber glow pulses as a visual warning.

#### Scenario: Ingredient unlock reveal
- **WHEN** an ingredient is unlocked for the first time (e.g., chocolate on Days 5-8)
- **THEN** the container transitions from dimmed (desaturated, thin outline) to fully lit (saturated color, thick outline) with a warm gleam animation passing over it.

### Requirement: Corkboard Grid Design
The corkboard SHALL use a fixed grid layout that grows with game progression: 2x2 in Act 1 (4 slips), 2x4 in Act 2 (8 slips), and 3x4 in Act 3 (12 slips). The corkboard SHALL physically grow when capacity increases, with a carpentry animation (hammering sound, new cork section slides into place) where new positions show fresh, lighter cork against the older, more worn surface. A dedicated "Standing Orders" strip SHALL appear below the main grid in Act 3 when the first standing order is created, holding a maximum of 3 punch cards. At default zoom, each slip SHALL show an icon-only summary: colored pin, customer silhouette dot, flavor icon, day number, and status border (none for healthy, warm amber pulse for approaching expiry, red pulse for expiring today).

#### Scenario: Corkboard grows at Act 2
- **WHEN** the player enters Act 2
- **THEN** a short carpentry animation (2-3 seconds) plays: hammering sound, new cork section slides into place alongside the existing 2x2 board, expanding it to 2x4. New pin positions show fresh cork against the older, worn surface.

#### Scenario: Icon summary at default zoom
- **WHEN** viewing the corkboard from the full shop view
- **THEN** each pinned slip shows only a colored pin (red/blue/green/brass by type), a small customer color dot, a flavor icon, a bold day number, and a status border glow if approaching expiry — no text is readable at this zoom level.

#### Scenario: Standing orders strip appears
- **WHEN** the player creates their first standing order in Act 3
- **THEN** a narrow strip appears below the main corkboard grid, distinct from the deal area, where punch cards are pinned.

### Requirement: Back Room Objects
The back room SHALL contain the following objects, each revealed progressively. Grandfather's desk: large, dark wood, scarred, 2.5x scale, holding journal (center), mechanical calculator (right), tool tray (left), and Rho Dial (near-right). The mechanical calculator: brass and steel with visible gears, a pull lever, and paper tape output; when activated, gears grind for 3-5 seconds before a ticket emerges. The barometer: ornate wall-mounted pressure gauge with green/amber/red zones, continuously trembling needle, and steam wisps from the valve in the red zone. The tool tray: worn leather roll on the desk holding purchased tools with a subtle gleam. The aging rack: wooden shelf where premium ingredients visually improve over time (color deepening, labels aging gracefully). The supplier board: wall-mounted board with pinned business cards and price lists, visual warmth varying by supplier reliability.

#### Scenario: Use the mechanical calculator
- **WHEN** the player feeds a deal slip into the calculator and pulls the lever
- **THEN** gears grind audibly for 3-5 seconds, the lever animates downward, and a paper tape ticket emerges showing three weather-icon bars and an expected haul number.

#### Scenario: Check the barometer
- **WHEN** the player enters the back room to check market volatility
- **THEN** the wall-mounted barometer shows a continuously trembling needle positioned in a green, amber, or red zone. In the red zone, visible steam wisps rise from the valve.

#### Scenario: Discover the caliper
- **WHEN** the caliper trigger fires (Days 25-30) and the player is in the back room
- **THEN** the desk drawer glows subtly. Clicking opens it to reveal the brass caliper, which the player picks up and adds to the tool tray.

### Requirement: Customer Expression Feedback
Characters SHALL communicate their reaction to pricing through four distinct facial expression states, serving as the diegetic replacement for numerical price analysis. Smiling: price feels fair or cheap (upturned mouth, bright eyes). Neutral: price is acceptable (flat expression). Frowning with hesitation: price is too high (downturned mouth, glance toward door; the customer may leave). Heart-eyes (rare): player is significantly underpricing (exaggerated hearts, excitement). Named characters SHALL display these expressions during deal negotiation in response to counter-offers. Crowd characters SHALL display them upon seeing the listed price. In color-blind mode, expressions SHALL be supplemented by a small icon above the character's head (thumbs-up, dash, thumbs-down, heart).

#### Scenario: Customer reacts to overpricing
- **WHEN** a walk-in customer sees a listed price above their willingness-to-pay
- **THEN** they display the frowning expression with a hesitation animation (glancing toward the door) before potentially leaving without purchasing.

#### Scenario: Player underpricing feedback
- **WHEN** a walk-in customer sees a listed price well below their willingness-to-pay
- **THEN** they display the rare heart-eyes expression, signaling to the player that they are leaving money on the table.

#### Scenario: Counter-offer reaction
- **WHEN** the player adjusts the price on a deal slip during negotiation
- **THEN** the named character's expression shifts in real-time: smiling if the new price is within their tolerance, frowning if it pushes beyond, returning to neutral if adjusted back.

### Requirement: Ice Cream Freshness Visual States
Ice cream and ingredient stock SHALL visually communicate freshness degradation, serving as the diegetic representation of time decay (theta). Fresh stock: vivid color, defined scoops, slight sparkle on serve. End-of-day degradation: colors dull ~15%, edges soften with visible slight melting, surface loses gloss. Spoiled (unsold overnight): visible melting, color becomes muddy, customer frowns if served. The visual progression SHALL be gradual across the day — not a sudden switch — so the player perceives time eroding value.

#### Scenario: Evening freshness loss
- **WHEN** the evening phase begins and unsold ice cream remains on the counter
- **THEN** the ice cream visuals shift: colors dull ~15%, edges soften with slight melting, and the surface loses its earlier gloss.

#### Scenario: Serve fresh vs degraded
- **WHEN** the player serves a scoop of fresh ingredient
- **THEN** the cone sparkles briefly. When the player serves from degraded stock, there is no sparkle and the customer's expression shifts toward neutral or frowning.

### Requirement: Window Weather Display
The window SHALL serve as the game's primary macro-information display, communicating weather state, demand level, seasonal context, and town events through visual treatment. Sunny: bright golden light through window, clear sky, many pedestrian silhouettes. Cloudy: diffused gray light, overcast sky, moderate pedestrians. Rainy: rain particles on glass overlay, puddles on street, fewer pedestrians, darker atmosphere. Storm: heavy rain, fast-moving dark clouds, almost no pedestrians, dramatic lighting. Snowy: soft white particles, frosted window edges, muted street, cozy interior contrast. Festival: bunting and banners on the street, warm lamplight glow, crowds of pedestrian silhouettes. Cloud movement speed SHALL indicate volatility (fast clouds = prices about to swing). Seasonal elements (autumn leaves, spring blossoms, winter frost, summer sun) SHALL shift the window's visual character across the 90-day campaign.

#### Scenario: Read the weather through the window
- **WHEN** the player glances at the window during the morning phase
- **THEN** they can assess the day's likely demand by the weather state (sunny = busy, rainy = slow, storm = volatile) and pedestrian density, without any numerical overlay or tooltip.

#### Scenario: Storm indicates volatility
- **WHEN** a storm is approaching
- **THEN** clouds move rapidly across the window, the street darkens, pedestrians thin out, and the overall visual communicates "unpredictable day ahead" — matching the barometer's red zone if checked.

#### Scenario: Festival atmosphere
- **WHEN** a town festival is active
- **THEN** bunting and banners appear on the street, warm lamplight dots the window view, and pedestrian density increases dramatically, signaling high demand.

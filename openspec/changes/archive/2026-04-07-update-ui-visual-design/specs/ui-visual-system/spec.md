## ADDED Requirements

### Requirement: Gravity Falls Environment Art Style
The game's environment art SHALL follow a Gravity Falls / Steven Universe inspired style: bold outlines, flat-ish coloring with subtle gradients, warm saturated palette, and hand-painted feel with clean readable shapes. Interactive objects SHALL be rendered at 1.5-2.5x realistic proportions to ensure readability while remaining stylistically native to the art direction.

#### Scenario: Recognize the shop interior style
- **WHEN** the player first sees the shop
- **THEN** the interior reads as warm, cluttered, and hand-crafted with visible wood grain, bold outlines on objects, and a cozy illustrated aesthetic consistent with Gravity Falls' Mystery Shack interior.

#### Scenario: Interactive objects feel tangible
- **WHEN** viewing any interactive object (register, slip, container, tool)
- **THEN** the object is slightly oversized relative to its surroundings and has thicker outlines (3-4px) than non-interactive background elements.

### Requirement: Professor Layton Character Art Style
All characters SHALL follow a Professor Layton inspired design: highly stylized with distinctive silhouettes, elongated features, expressive eyes and gestures, and warm watercolor-ish shading. Characters SHALL use approximately 3-4 head proportions with exaggerated hands and expressive faces. Each named character MUST be identifiable from their silhouette alone.

#### Scenario: Identify a character at a glance
- **WHEN** any named character appears at the counter
- **THEN** the player can identify them by silhouette, distinctive prop (Marta's glasses, Dmitri's apron, Agnes's basket, Kazik's hat), and color palette before reading any text.

### Requirement: Interior Color Palette
The shop interior SHALL maintain a consistent warm palette: wood browns (#8B6914 to #D4A855), cream walls (#FFF8E7), brass/copper accents (#B8860B, #CD853F), paper tones (cream #FFFDD0, newsprint gray #E8E4D8, cork tan #DEB887), and deep brown ink (#3E2723). The interior palette SHALL NOT change with weather or seasons; only renovation events or major story beats may alter the base values. Time-of-day lighting overlays (see Time-of-Day Lighting requirement) affect the perceived color temperature but do not alter these base palette values.

#### Scenario: Interior consistency across weather
- **WHEN** a storm rages outside the window
- **THEN** the shop interior retains its warm brown/cream/brass palette, with only the window view and ambient lighting overlay reflecting the weather change.

### Requirement: Three-Layer Depth System
The scene SHALL be organized into three depth layers with distinct visual treatments to create hierarchy in a fixed-perspective view. The foreground (counter, ~33% of screen) SHALL have the highest saturation, sharpest textures, and thickest outlines (3-4px). The midground (wall/shelf/corkboard, ~17%) SHALL be 10-15% desaturated with 2-3px outlines. The background (window/street, ~50%) SHALL be 20-30% desaturated with broad shapes and 1-2px or no outlines.

#### Scenario: Depth reads naturally
- **WHEN** viewing the full shop scene
- **THEN** the player's eye is drawn first to the bright, sharp counter foreground, then to the muted midground wall objects, and last to the soft background window — without any explicit depth cues beyond color, saturation, and outline weight.

#### Scenario: Interactive midground objects pop
- **WHEN** an ingredient container or deal slip in the midground is interactable
- **THEN** it is rendered at foreground-level saturation and outline weight, visually popping forward from its muted surroundings.

### Requirement: Text Size Tiers
All in-game text SHALL follow three size tiers at 1920x1080 base resolution. Primary gameplay text (register display, newspaper headlines, expanded deal slip details) SHALL use 28-32px body height. Secondary text (newspaper article body, order form details) SHALL use 22-26px body height. Decorative ambient text (container brand names, background signage) SHALL use 14-18px body height. Text MUST be resizable up to 200% of minimum without content loss.

#### Scenario: Register digits are readable
- **WHEN** the cash register displays a balance
- **THEN** the flip-digit numerals are rendered at 28-32px body height in the Label Maker font, readable without zooming or squinting.

#### Scenario: Text scaling for accessibility
- **WHEN** text size is increased to 200% via accessibility settings
- **THEN** all primary and secondary text remains fully visible without overlapping other elements or being clipped.

## MODIFIED Requirements

### Requirement: Three-Font System
The project SHALL strictly use three specific typography families tied to the game's fiction: Grandfather's Hand (warm handwritten script for journal entries, counter-offers, and calculator annotations), Gazette Serif (formal serif for newspaper content and Mrs. Chen's letterhead), and Label Maker (embossed monospace for price tags, register digits, and order forms). All three fonts SHALL be pre-generated as BitmapText assets and tested at primary (28-32px), secondary (22-26px), and decorative (14-18px) size tiers. The Label Maker font SHALL use extra-thick strokes to remain legible on rotating price wheel digits.

#### Scenario: Read a journal entry
- **WHEN** opening the leather-bound journal
- **THEN** the text is rendered in Grandfather's Hand — a warm, handwritten script with Polish-accented character forms.

#### Scenario: Read the newspaper
- **WHEN** unfolding the daily newspaper
- **THEN** the headline and body text are rendered in Gazette Serif with slightly smudged ink texture.

#### Scenario: Check a price tag
- **WHEN** viewing any ingredient price tag
- **THEN** the price is displayed in Label Maker font with thick embossed strokes, readable even at the smallest wheel-digit size.

### Requirement: Material-Based Rendering
All surfaces (wood, brass, paper, glass, cork) SHALL be rendered with visible textures and wear patterns to reinforce the tactile standard, using a Gravity Falls-inspired bold-outline illustration style. Foreground surfaces SHALL show the most texture detail (visible wood grain, brass patina, paper fiber). Midground surfaces SHALL show moderate detail (cork pores, pin holes). Background surfaces SHALL use broad color fields with minimal texture. Interactive objects SHALL have crisper, more detailed rendering than non-interactive surfaces at the same depth layer.

#### Scenario: Inspect the corkboard
- **WHEN** the player looks at the board behind the counter
- **THEN** they see visible cork pores, old pin holes, and a walnut wooden frame, rendered at midground detail level with 2-3px outlines.

#### Scenario: Examine the counter surface
- **WHEN** the player looks at the counter
- **THEN** they see warm wood grain, scratches, and patina rendered at foreground detail level with 3-4px outlines — the sharpest, most textured surface in the scene.

### Requirement: Time-of-Day Lighting
The ambient lighting SHALL transition between three phases using a three-tier system: a LUT color grading shader on the root container for primary color temperature, a multiply-blend overlay sprite for scene-wide tint (morning: cool wash RGBA ~180,200,230,0.08; midday: warm neutral RGBA ~255,245,220,0.05; evening: deep amber RGBA ~255,180,100,0.12), and per-layer tint adjustments where the window backdrop receives a stronger shift and interior layers a subtler shift. Transitions between phases SHALL be smooth crossfades lasting approximately 2 seconds.

#### Scenario: End of day transition
- **WHEN** the game shifts to the evening phase
- **THEN** a 2-second crossfade applies a deep amber LUT, the overlay shifts to RGBA ~255,180,100,0.12, and the window backdrop takes on the strongest amber tint while the counter retains a subtler warm shift.

#### Scenario: Morning light feels distinct
- **WHEN** the game starts a new day in the morning phase
- **THEN** the scene has a subtle cool wash — the window shows cool blue-gray light and the interior has a crisp, fresh quality distinct from the previous evening's amber warmth.

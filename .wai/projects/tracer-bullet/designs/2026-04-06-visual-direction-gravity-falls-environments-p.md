# Visual Direction: Gravity Falls Environments + Professor Layton Characters

*Revised after Ro5 review — all 18 issues addressed (DRAFT-001 through EXCL-004).*

## Art Style Decision

**"Gravitov Falls"** — Gravity Falls environment art + Professor Layton character design, rendered in PixiJS v8.

### Environment Style (Gravity Falls / Steven Universe)
- Bold outlines (3-4px foreground, 2-3px midground, 1-2px background)
- Flat-ish coloring with subtle gradients and visible brushwork in textures
- Warm saturated palette — amber, brown, cream, rust, deep green
- Slightly exaggerated proportions (interactive objects 1.5-2.5x realistic scale)
- Hand-painted feel with clean readable shapes
- The Mystery Shack interior is the direct analog: cluttered, warm, wooden, full of objects

### Character Style (Professor Layton)
- Highly stylized, distinctive silhouettes per character
- Elongated features, expressive eyes and gestures
- Warm watercolor-ish shading
- Each character reads instantly from their silhouette alone
- Half-body visible in front of the counter (torso, arms, head — seen from the shopkeeper's perspective behind the counter, framed against the window)
- Facial expression system: slot-based eye/mouth swaps
- Characters use ~3-4 head proportions (similar to Gravity Falls' Dipper/Mabel ratio), with exaggerated hands and expressive faces

### Why This Blend Works
- Gravity Falls IS a Pacific Northwest small-town aesthetic — direct match for "Gravitov Falls"
- Both styles use bold outlines and warm palettes — no visual clash
- Layton's character expressiveness serves the "characters as market forces" design
- The 3-4 head proportions naturally accommodate oversized interactive objects without looking forced
- Both styles are hand-crafted feeling, matching the "cozy shop" pillar

## Color Palette Direction

*Note: All hex values below are directional. A color swatch proof sheet must be created and tested under all three lighting phases before these values are locked.*

### Interior (consistent — changes only for renovations/big events)
- **Primary surfaces**: Warm wood browns (#8B6914 → #D4A855 range), cream walls (#FFF8E7)
- **Accent metals**: Brass/copper (#B8860B, #CD853F) for register, tools, fixtures
- **Paper tones**: Cream (#FFFDD0), newsprint gray (#E8E4D8), cork tan (#DEB887)
- **Text surfaces**: Deep brown ink (#3E2723), red stamps (#C62828), blue pen (#1565C0)

### Window/Exterior (shifts with weather and season)
- Morning: cool blues and grays (#B0BEC5, #78909C)
- Midday: warm golden light (#FFE082, #FFF9C4)
- Evening: deep amber (#FF8F00, #E65100)
- Storm: dark slate (#455A64, #37474F)
- Festival: bunting and warm lamplight added to base weather

### Lighting Phases (overlay on interior)
- **Morning**: Subtle cool wash (RGBA ~180,200,230,0.08)
- **Midday**: Warm neutral (RGBA ~255,245,220,0.05)
- **Evening**: Deep amber (RGBA ~255,180,100,0.12)
- Implementation: LUT color grading shader (3 pre-authored LUTs, interpolated)

---

## Shop Scene — Composition & Layout (1920x1080)

### Three-Layer Depth System

**Foreground (counter/workspace)** — lower ~33% of screen
- Highest saturation and contrast, sharpest textures
- Thickest outlines (3-4px), warmest colors
- Contains: register (left), serving area (center-left), newspaper (center), pause bell (right of register)
- Interactive objects here are 2-2.5x realistic scale
- Shadows cast toward the viewer from counter objects

**Midground (wall/shelf/corkboard)** — ~17% band between counter and window
- 10-15% desaturation vs foreground, 2-3px outlines
- Subtle cool shift relative to foreground
- Contains: ingredient shelf (left), cuckoo clock (center-left), doorway to back room (center), corkboard (right)
- Interactive elements (slips, containers) get boosted saturation to pop forward
- Pinned slips cast tiny shadows on cork surface

**Background (window/street)** — upper ~50% of screen
- 20-30% desaturation, broad shapes, 1-2px or no outlines
- Coolest colors (atmospheric perspective tint)
- Contains: window (large pane, possibly with mullions), street view, weather, pedestrians, Nadia's shop (when revealed)
- Characters appear here — standing in front of the counter, between counter edge and window, framed by the window light behind them
- Pedestrians and weather rendered as soft shapes, not detailed

### Spatial Zones
```
┌─────────────────────────────────────────────────────┐
│                  WINDOW / SKY                       │ ← Background
│     [street] [pedestrians] [Nadia's A-frame sign]   │  (~50%)
│                                                     │
│        [CUSTOMERS APPEAR HERE — framed by window]   │
│─────────────────────────────────────────────────────│
│ SHELF     │  [clock] [doorway→]  │  CORKBOARD       │ ← Midground
│ [4 ingr   │                      │  [deal slips]    │  (~17%)
│  slots]   │                      │  [2x2→3x4 grid] │
│─────────────────────────────────────────────────────│
│ COUNTER                                             │ ← Foreground
│ [register+bell]  [serving]  [newspaper]             │  (~33%)
└─────────────────────────────────────────────────────┘
```

### Counter Space Management

The counter has three zones with priority rules for when objects compete:

| Zone | Location | Contents | Priority |
|------|----------|----------|----------|
| **Register zone** | Far left | Cash register + pause bell | Permanent — never occluded |
| **Interaction zone** | Center | Customer slips, serving area | Active customer takes priority; newspaper auto-folds when customer approaches |
| **Utility zone** | Right | Newspaper (when no customer), overflow | Lowest priority; objects slide aside |

**Conflict rules:**
- When a customer places a slip on the counter, the newspaper (if open) folds itself with a soft paper-rustle animation, sliding to the utility zone.
- The serving area (scoop handoff point) is always accessible — it's slightly elevated on the counter and never occluded.
- Only one deal slip can be on the counter at a time (the active negotiation). Previous slips are already on the corkboard or declined.

### Multi-Customer Positions

Characters appear in front of the counter, framed against the window:

| Position | Location | Use |
|----------|----------|-----|
| **Primary** | Center, directly across counter | Active customer (negotiating, ordering) |
| **Secondary** | Offset left, partially overlapping window | Waiting customer (idle animation — checking watch, looking around) |
| **Tertiary** | Offset right, partially visible | Third customer (mostly obscured, shoulder/hat visible) |

Walk-ins who can't fit visually remain off-screen — their presence is communicated by door bell jingle frequency and visible pedestrians pausing at the window. Named characters always take the primary position when it's their turn; walk-ins yield.

---

## Back Room Scene — Composition & Layout

Accessed through the doorway in the midground (center of shop wall). The transition is a smooth camera pan right through the doorway — the shop slides left off-screen as the back room slides in. The reverse pan returns to the shop. Both rooms exist in a continuous horizontal space.

### Layout
```
┌─────────────────────────────────────────────────────┐
│                BACK WALL                            │
│  [BAROMETER]        [SUPPLIER BOARD]                │
│  (wall-mounted)     (wall-mounted, Act 2+)          │
│─────────────────────────────────────────────────────│
│                                                     │
│  [AGING RACK]       [GRANDFATHER'S DESK]            │
│  (left wall,        (center-right, dominant piece)  │
│   midgame+)         [journal] [calculator] [tools]  │
│                     [Rho Dial]                      │
│─────────────────────────────────────────────────────│
│  [←doorway to shop]                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Visual Character
- **Warmer and dimmer** than the shop — lit by a desk lamp and ambient window light from an unseen side window
- Darker wood tones, green banker's lamp glow, brass instrument gleam
- Feels like a study or workshop — intimate, contemplative
- Dust motes visible in the lamp light (particle effect)
- The desk is the focal point — large, scarred, covered in papers and instruments

### Key Objects

**Grandfather's Desk**
- Large, dark wood, scarred and stained from decades of use
- Dominant piece in the room — 2.5x scale for readability
- Surface holds: journal (center), mechanical calculator (right), tool tray (left), Rho Dial (near-right)
- Desk drawer (below) — where the caliper is discovered (glows when trigger fires)

**The Journal**
- Leather-bound, coffee-stained, thick — sits open on the desk
- Pages rendered in Grandfather's Hand font (warm, handwritten script)
- Visible wear: bent corners, water damage on some pages, pressed flowers between pages
- Some pages have cipher text (mix of Polish, mathematical notation, ice cream recipes)
- Coffee ring stains overlap text on certain pages — partially obscuring content
- Page edges visible on the right side — thickness communicates how much has been revealed

**The Mechanical Calculator**
- Brass and steel contraption with visible gears, a pull lever, and a paper tape output
- When activated: gears grind (2-3 seconds of satisfying machine noise), lever pulls down, paper tape emerges
- Output ticket: three weather icons (sun/clouds/storm) with horizontal bars (red-left for loss, green-right for profit), plus a handwritten "expected haul" number at the bottom
- Tickets can be torn off and carried to the shop corkboard

**The Barometer**
- Ornate wall-mounted pressure gauge with green/amber/red zones
- Needle trembles continuously — amplitude reflects volatility level
- Steam wisps emerge from valve when needle is in red zone
- Cannot be detached — player walks to back room to check it, like checking a real barometer

**Tool Tray on Desk**
- A worn leather tool roll on the desk's left side
- Holds purchased tools when not attached to slips
- When a tool is bought, it appears here with a subtle gleam
- Player clicks tool to pick up → cursor changes to carry the tool with slight physics lag

**The Aging Rack**
- Wooden shelf structure along the left wall
- Premium ingredients sit on shelves, visually improving over time (color deepening, labels aging gracefully)
- Visual progression: fresh (bright, plain label) → aged (richer color, patina on container)

**The Supplier Board**
- Wall-mounted cork/wood board (different from the deal corkboard)
- Cards representing supplier relationships — pinned business cards, notes, price lists
- Visual warmth varies by supplier reliability: warm/friendly cards for reliable suppliers, cold/stark cards for unreliable ones

### Cross-Room Tool Flow

Tools purchased in the back room live on the desk tool tray. To use a tool on a deal slip:

1. **Pick up** tool from desk tray (click → tool follows cursor with physics lag)
2. **Walk to shop** — click the doorway or the left edge; camera pans to shop scene. The tool remains attached to the cursor during the transition.
3. **Approach corkboard** — when carrying a tool, the corkboard auto-enters "lean-in" view (see Corkboard section below), showing deal slips at readable size with valid attachment targets highlighted.
4. **Attach** — drop the tool on a slip. It snaps into position with a satisfying click.
5. **Detach** — click attached tool to pick up, or right-click to send it back to the desk (it floats off-screen toward the doorway).

---

## Document Design System

The game's UI is paper. Every contract tier, every interaction type, has a distinct physical document. The player learns to read contract types by the paper before reading the words.

### Document Types by Tier

**Tier 1 — Spot Sales (no document)**
No paper involved. Customer asks, player scoops. The register rings.

**Tier 2 — Forward Orders (Mrs. Chen)**
- **Paper**: Cream cardstock, heavier weight than other slips — feels formal
- **Header**: Pre-printed Community Center letterhead (small logo, clean type in Gazette Serif)
- **Stamp**: Red "ORDER" stamp in the upper right, slightly askew (hand-stamped feel)
- **Handwriting**: Mrs. Chen's neat, organized print — Gazette Serif at small size
- **Fields visible**: Flavor, quantity, delivery date, agreed price
- **Counter-offer indicator**: When player adjusts price, the original is crossed out with a handwritten correction (Grandfather's Hand font)
- **Pin**: Red pushpin on corkboard

**Tier 3a — Reservations (Dmitri)**
- **Paper**: Light blue card stock — immediately visually distinct from Mrs. Chen's cream
- **Stamp**: Purple "RESERVATION" stamp, bolder than Chen's ORDER
- **Handwriting**: Dmitri's slightly shaky, cautious script — thinner strokes
- **Fields visible**: Flavor, quantity, date, price, fee amount (circled)
- **Visual cue**: A small coin icon near the fee — "this money is yours now"
- **Pin**: Blue pushpin on corkboard

**Tier 3b — Freshness Guarantees (Agnes)**
- **Paper**: Rough, earthy, slightly textured — like recycled farm paper
- **Stamp**: Green "GUARANTEE" stamp with a small leaf motif
- **Handwriting**: Agnes's hurried, slightly messy script
- **Fields visible**: Flavor, quantity, buyback price, fee, expiration
- **Visual cue**: A small shield icon near the buyback price — "you're protected"
- **Pin**: Green pushpin on corkboard

**Tier 4 — Compound Deals (Uncle Kazik)**
- **Paper**: Thick manila, folded in half or thirds — physically larger than other slips
- **No stamp**: Instead, Kazik's personal wax seal (a stylized "K") on the fold
- **Handwriting**: Kazik's bold, flourished script — confident, almost calligraphic
- **Structure**: Unfolds to reveal 2-3 linked sub-slips, each a smaller card inside
- **Paper clip**: Brass paper clip connects sub-slips; removing one sub-slip updates the clip visual
- **Pin**: Brass pushpin on corkboard (matches Kazik's wax seal color)

### Other Document Types

**Carbon-Copy Order Forms (Restocking)**
- Small pad behind each ingredient container
- Gray carbon-copy paper with pre-printed fields (ingredient name, supplier price)
- Quantity set by rotating number wheel on the form
- Torn along perforated edge to submit — the torn card slides toward the door
- Duplicate remains faintly visible in the pad (carbon copy visual)

**Standing Order Punch Cards (Act 3)**
- Stiff card stock, cream with embossed grid pattern
- Three rotating wheels punched through the card (like a combination lock):
  1. Ingredient wheel (flavor icons)
  2. Deal type wheel (ORDER / RESERVATION / GUARANTEE)
  3. Price threshold wheel (dollar amounts in $0.50 increments)
- Torn from a stack on Grandfather's desk
- Pinned to dedicated "Standing Orders" strip below the main corkboard grid

**Newspaper**
- Folded broadsheet, newsprint gray (#E8E4D8)
- Gazette Serif font throughout
- Headline visible when folded (bold, large)
- Unfolds to show a short article with one secondary detail
- Physically takes up counter space when open
- Edges slightly yellowed, ink slightly smudged — tactile newspaper feel

**Calculator Output Tickets**
- Narrow paper tape (receipt-style), light cream
- Printed by the mechanical calculator — typewriter-style monospaced font
- Three weather icons arranged vertically (sun / clouds / storm) with horizontal bars
- Bars extend left (red-tinted loss) or right (green-tinted profit) from center line
- Bottom: handwritten "expected haul" number (Grandfather's Hand font — as if he annotated the machine's output)
- Can be pinned to corkboard alongside parent deal slip (attaches as a tab, not a separate grid slot)

**Journal Pages**
- Rendered in Grandfather's Hand font (warm, handwritten Polish-accented script)
- Cream aged paper with visible fiber texture
- Coffee ring stains (some overlapping text — partial obscuration is intentional)
- Margins contain small sketches: ice cream cones, weather patterns, mathematical doodles
- Some pages use cipher text: a mix of Polish words, mathematical notation, and ice cream recipe shorthand
- Water-damaged pages have blurred/faded sections
- Pressed flowers between certain pages (seasonal — spring blossoms, autumn leaves)

### Document Visual Hierarchy

At a glance on the corkboard, the player should be able to distinguish document types by:
1. **Paper color**: Cream (forwards), blue (reservations), earthy (guarantees), manila (compound)
2. **Stamp color**: Red (ORDER), purple (RESERVATION), green (GUARANTEE), wax seal (compound)
3. **Pin color**: Red, blue, green, brass — matches stamp/character
4. **Size**: Standard (tiers 2-3), larger (tier 4 compound)

---

## Corkboard Design

### Default View (in shop scene)
Each slip shows an **icon-only summary** at default zoom:
- Colored pin (identifies document type)
- Customer silhouette dot (who — using character's signature color)
- Flavor icon (what — small ice cream icon in flavor color)
- Day number (when — bold numeral)
- Status border glow: healthy (none), approaching expiry (warm amber pulse), expiring today (red pulse)

### "Lean-In" View (diegetic zoom)
Clicking any slip OR the corkboard background triggers a **lean-in camera movement** — the camera smoothly pushes toward the corkboard, other scene elements blur and dim but remain partially visible (the window, counter edges). This is a diegetic zoom, not a modal: the player is "leaning forward to look at the board more closely."

- Individual slips expand to ~200x280px (desktop) / ~240x320px (tablet) — full text readable
- Attached tools visible and animated (caliper gears spinning, spring vibrating)
- Calculator tickets visible as tabs on their parent slips
- Click a slip to select it (brightens, others dim slightly)
- Click empty space or press Escape to "lean back" (camera returns to full shop view)
- When carrying a tool (from back room), lean-in activates automatically; valid attachment targets pulse

### Grid Layout
Fixed grid for spatial memory — the player always knows where their deals are:

| Act | Grid | Capacity | Physical Board Size |
|-----|------|----------|---------------------|
| Act 1 | 2×2 | 4 slips | Small cork rectangle |
| Act 2 | 2×4 | 8 slips | Board grows wider (carpentry animation, fresh cork visible against older surface) |
| Act 3 | 3×4 | 12 slips | Board grows taller (same reveal pattern) |

**Standing orders strip**: A separate narrow row below the main grid. Max 3 punch cards. Only appears in Act 3 when the first standing order is created.

**Calculator tickets**: Attach as small tabs to their parent deal slip (top-right corner), not as separate grid entries.

### Grid Transition Animation
When corkboard capacity increases:
- Short carpentry sequence (2-3 seconds): sound of hammering, new cork section slides into place alongside existing board
- New pin positions appear with fresh, lighter cork — visible against the older, more worn surface
- Existing pinned slips remain in place; new slots fill from the expansion edge

---

## Progressive Disclosure — Visual States

The shop looks completely different at each stage. Each reveal is a visual discovery moment.

### Day 1 — The Bare Minimum
```
┌──────────────────────────────────────────────┐
│               WINDOW (gray morning)          │
│          [empty street, one pedestrian]       │
│                                              │
│            [MARTA appears here]              │
│──────────────────────────────────────────────│
│ SHELF        │          │     (blank wall)   │
│ [VANILLA]    │          │     no corkboard   │
│ [dim] [dim]  │          │                    │
│ [dim]        │          │                    │
│──────────────────────────────────────────────│
│ COUNTER                                      │
│ [register: $2,000]   [serving area]          │
└──────────────────────────────────────────────┘
```
- Only vanilla container is lit; chocolate, strawberry, mint chip are **dimmed** (desaturated, slightly darker, outlines thinner — visually "not yet relevant")
- No newspaper, no corkboard, no back room doorway, no clock
- Window shows a quiet gray morning — minimal pedestrians
- The shop feels empty and waiting

### Days 2-5 — Newspaper Appears
- **Reveal moment**: A folded newspaper slides under the door with a soft thud (audio + visual). It lands on the counter.
- First morning information. The counter now has two objects: register + newspaper.
- Window begins showing weather variation (some sunny days, some clouds)

### Days 5-8 — Chocolate Unlocks
- **Reveal moment**: A delivery crate appears at the shop door in the morning. It opens to reveal chocolate ingredients.
- Chocolate container on shelf transitions from dimmed → lit (color saturates, outline thickens, a warm gleam passes over it)
- A small delivery tag appears on the slot ("Arrives: Day N") for future orders
- Two flavors now active — the shelf starts feeling populated

### Days 8-12 — First Deal / Corkboard Materializes
- **Reveal moment**: Mrs. Chen places her first slip on the counter. When the player drags it toward the wall, the corkboard materializes — it was always there behind a layer of wallpaper/shelf items, but now it's revealed. Warm light pulses from it, inviting the pin.
- Corkboard starts as 2×2 (small, modest — just cork and a walnut frame)
- First pinned slip: cream cardstock, red ORDER stamp — the player's first commitment
- The wall now has a focal point on the right side

### Days 12-18 — Strawberry & Mint Chip Unlock
- Two more containers light up on the shelf, one at a time (each with its own delivery reveal)
- The shelf is now fully populated — four lit containers with price tags
- Agnes appears for the first time (strawberry connection)
- Zosia begins visiting (mint chip buzz)

### Days 18-25 — Back Room Opens
- **Reveal moment**: After paying $800, a renovation sequence plays — boards being removed from the doorway (center of midground wall), dust settling, warm amber light spilling through.
- The doorway is now a visible, dark rectangle with warm light glowing from within
- Clicking it triggers the camera pan to the back room
- Back room initially contains: desk, journal (open to first page), and the desk lamp
- Caliper is NOT yet visible (still in the drawer)

### Days 25-30 — Caliper Discovery
- **Reveal moment**: Journal auto-opens to the caliper page. The desk drawer glows subtly. Player opens it to find Dziadek's Caliper.
- Caliper appears on the tool tray — brass gleam, intricate gears
- First tool experience: pick up → carry to shop → attach to slip → gears spin

### Days 30-40 — Spring, Magnifier, Agnes's Guarantees
- Spring and Magnifier become available for purchase (appearing in a catalog on the supplier board, or as items in a visiting merchant's case)
- When purchased, each appears on the desk tool tray alongside the caliper
- Agnes begins offering guarantee slips — new document type appears (earthy paper, green stamp)
- Corkboard starts showing document variety: cream + earthy papers together

### Days 40-60 — Full Workshop
- **Barometer**: Large wall-mounted gauge appears in back room (installation animation). Needle begins its continuous tremble.
- **Nadia's shop**: A new A-frame sign becomes visible through the window across the street. First subtle — player notices over a few days.
- **Rho Dial**: Small brass dial appears on desk after purchase.
- **Uncle Kazik**: First visit — manila compound deal slips appear on counter. Corkboard now shows all paper types.
- **Corkboard grows**: 2×2 → 2×4 transition (carpentry animation, new cork section).
- **Supplier board**: Appears on back room wall with supplier cards.

### Days 60-90 — Mastery
- **Standing orders**: Punch card stack appears on desk. Standing orders strip appears below corkboard.
- **Mechanical calculator**: Becomes fully operational (was present as inert desk furniture since Day 25 — now responds to interaction).
- **Corkboard grows**: 2×4 → 3×4 transition.
- The shop is now fully alive: every surface has objects, every tool is available, the corkboard is dense with diverse documents.

---

## Visual States Matrix

### Ingredient Containers
| State | Visual |
|-------|--------|
| Full | Bright, saturated color, filled to top, crisp outline |
| Partially full | Color slightly less vibrant, visible fill line drops |
| Low | Desaturated ~20%, fill line near bottom, faint amber glow as warning |
| Empty | Dark slot, container outline only, no color fill |
| Dimmed (not yet unlocked) | Heavily desaturated, thinner outline, no interaction affordance |
| Delivery incoming | Small tag on slot edge: "Arrives: Day N" in Label Maker font |

### Ice Cream / Freshness
| State | Visual |
|-------|--------|
| Fresh | Vivid color, defined scoops, slight sparkle on serve |
| End-of-day degradation | Colors dull ~15%, edges soften (slight melting), surface loses gloss |
| Spoiled (unsold overnight) | Visible melting, color muddy, customer frowns if served |

### Deal Slips (on corkboard)
| State | Visual |
|-------|--------|
| Healthy | Clean paper, crisp text, neutral pin |
| Approaching expiry (3 days) | Paper edges slightly yellowed, warm amber pulse on border |
| Expiring today | Paper noticeably aged, red pulse on border, urgency |
| Under magnifier | Paper degradation dramatically visible — yellowing, ink fading, drip counter showing daily value loss |
| With caliper attached | Small brass caliper on slip edge, gears spinning at rate ∝ delta |
| With spring attached | Coiled spring alongside caliper, vibration amplitude ∝ gamma |
| Settled (being removed) | Slip un-pins, gentle flutter animation as it falls from board |
| Torn up (player cancelled) | Ripping animation, torn pieces fall, freed slot |

### Cash Register
| State | Visual |
|-------|--------|
| Normal sale | Lever press, flip-digit animation, ka-ching sound |
| High-margin sale | Digits flash with subtle green tint |
| Break-even sale | Digits flash with amber tint |
| Normal display | White/cream digits on dark register face |
| Insufficient funds (restock attempt) | Register flashes amber, order card won't tear |

### Window / Weather
| State | Visual |
|-------|--------|
| Sunny | Bright golden light, clear sky, many pedestrians, active street |
| Cloudy | Diffused gray light, overcast sky, moderate pedestrians |
| Rainy | Rain particles on glass, puddles on street, fewer pedestrians, darker |
| Storm | Heavy rain, dark clouds moving fast, almost no pedestrians, dramatic lighting |
| Snowy | Soft white particles, frosted window edges, muted street, cozy contrast |
| Festival | Bunting/banners on street, warm lamplight, crowds of pedestrians |
| Nadia's sign | A-frame sign across street; price visible if player looks (readable at lean-in scale) |

### Barometer (back room)
| State | Visual |
|-------|--------|
| Green zone (calm) | Needle steady in green section, no steam, gentle hiss |
| Amber zone (moderate) | Needle in amber, slight tremble, faint steam wisps |
| Red zone (volatile) | Needle in red, strong tremble, visible steam from valve, persistent hiss |

### Customer Expressions
| State | Visual |
|-------|--------|
| Smiling | Price feels fair or cheap — upturned mouth, bright eyes |
| Neutral | Price acceptable — flat expression |
| Frowning + hesitation | Price too high — downturned mouth, glance toward door |
| Heart-eyes (rare) | Player underpricing — exaggerated hearts, excitement |
| Waiting (named characters) | Idle animations: tapping counter, checking pocket watch, looking around |
| Leaving (walk-in timeout) | Glances at door, shrugs, walks out — no penalty visual |

---

## Animation Inventory

### Must-Have (MVP)
| Animation | Trigger | Duration | Notes |
|-----------|---------|----------|-------|
| Scoop and serve | Player clicks ingredient container | ~1s | Scoop arcs onto cone, hand-off to customer |
| Register ring | Sale completes | ~0.5s | Lever press + flip-digit cascade |
| Slip placed on counter | Customer presents deal | ~0.5s | Slides in from right side |
| Slip pinned to corkboard | Player drags to board | ~0.3s | Thunk sound, slight bounce, pin appears |
| Slip declined | Player slides back | ~0.5s | Slides back toward customer |
| Newspaper slides under door | Morning trigger | ~1s | Slides in from bottom of door, lands on counter |
| Day phase transition | Phase change | ~2s | Lighting crossfade (LUT interpolation) |
| Customer enter/exit | Arrival/departure | ~1s | Walk in from left, bell jingle; exit left |
| Price tag adjustment | Player drags tag | Continuous | Rotating wheel, click at each $0.25 increment |
| Camera pan (shop ↔ back room) | Click doorway | ~1.5s | Smooth horizontal pan |
| Tool pick up / put down | Click tool | ~0.3s | Tool lifts with slight physics lag / snaps into place |
| Tool attach to slip | Drop on slip | ~0.3s | Snap + satisfying click sound |
| Corkboard lean-in / lean-back | Click board / escape | ~0.5s | Camera push toward board, scene blurs |

### Important (Post-MVP Polish)
| Animation | Trigger | Duration | Notes |
|-----------|---------|----------|-------|
| Corkboard expansion | Act transition | ~3s | Hammering sound, new cork slides in |
| Back room reveal | Purchase renovation | ~4s | Boards removed, dust, warm light |
| Container unlock | Ingredient revealed | ~1.5s | Desaturated → saturated, outline thickens, gleam |
| Caliper discovery | Journal trigger | ~2s | Drawer glows, opens, caliper gleams |
| Slip settlement (removed) | Deal expires | ~1s | Gentle flutter, un-pins, falls |
| Slip torn up | Player cancels deal | ~0.5s | Ripping sound, torn pieces fall |
| Calculator processing | Feed slip + pull lever | ~3-5s | Gears grind, lever clunks, tape emerges |
| Newspaper unfold | Player clicks | ~0.5s | Paper unfolds, counter space expands |
| Idle character animations | Always (named chars) | Loop | Tapping, looking around, pocket watch |
| Compound deal unfold | Kazik's documents | ~1s | Manila folds open, sub-slips revealed |

### Polish (Nice-to-Have)
| Animation | Notes |
|-----------|-------|
| Dust motes in back room lamp light | Particle effect, ambient |
| Counter-offer handwritten correction | Strikethrough + new number appears in script |
| Emergency vanilla crate refill | Small crate beneath vanilla slot, morning refill |
| Wax seal break on Kazik's deals | Satisfying crack when unfolding |
| Page turn in journal | Physical page flip with paper sound |
| Barometer steam wisps | Particles rising from valve in red zone |
| Aging rack ingredient progression | Slow color/label change over game days |

---

## Accessibility Integration

The Gravity Falls art style's bold outlines and high contrast are inherently accessibility-friendly. Additional design:

### Brass Focus Ring (Keyboard Navigation)
- A subtle brass highlight ring follows the focused element via tab order
- Styled as shop light catching a surface — diegetic, not a UI overlay
- Warm gold glow (#FFD54F) with 2px soft edge, matching the brass accent palette
- Tab order follows day phase: morning (price tags, restock) → midday (customer, slips) → evening (register, corkboard)

### "Visual Cues Enhanced" Toggle
- When active: status border pulses on deal slips become slightly larger and brighter
- Register tint (green/amber) becomes more saturated
- Foot-traffic indicator in window becomes more explicit (larger pedestrian silhouettes)
- All existing visual redundancy signals (gear speed, spring vibration, needle position) gain subtle text labels in Grandfather's Hand font (e.g., "fast" near caliper, "tense" near spring)

### Reduced Motion Mode
- Animated weather → static weather states (fixed cloud positions indicating severity)
- Tool animations → static state indicators (caliper shows a speed numeral instead of spinning gears)
- Day phase transitions → instant cut (no crossfade)
- Paper flutter / idle wobble → disabled
- Camera pan between rooms → instant cut

### Color-Blind Considerations
- Document types distinguished by both color AND shape/stamp (redundant coding)
- Corkboard pins use both color and shape (round, square, diamond, star)
- Register tint (green/amber) supplemented by icon (checkmark / dash)
- Barometer zones labeled with text in addition to color (CALM / UNCERTAIN / VOLATILE)

---

## Character Design Direction (Layton-inspired)

### Named Characters — Design Principles
- Half-body visible in front of counter (torso, arms, head — seen from behind the counter)
- ~15 bones per Spine skeleton (torso, arms, hands, head, jaw, eyes, eyebrows, hair)
- Distinctive silhouettes — identifiable even as thumbnails
- Facial expressions via Spine slot attachments (eye/mouth image swaps)
- Animation blending: talk on upper body + idle on lower body
- ~3-4 head proportions (Gravity Falls range), exaggerated hands, expressive faces

### Character Visual Concepts

**Marta** — *The Constant*
- Small, slightly hunched with age, perpetual gentle smile
- Reading glasses perched on nose (gold wire frames — brass accent)
- Same coat every day (muted olive green, wool texture)
- Carries a small purse — always has exact change ready
- Silhouette: compact, rounded, warm
- Idle: adjusts glasses, pats purse contentedly

**Mrs. Chen** — *The Organizer*
- Tall, upright posture, crisp and organized
- Clipboard or day planner always visible in hand
- Neat blazer (navy blue), structured hair
- Reading glasses on a chain (uses them to review her own slips)
- Silhouette: vertical, angular, precise
- Idle: checks clipboard, straightens papers

**Dmitri** — *The Cautious Baker*
- Broad shouldered, slightly stooped from years at the oven
- Baker's apron perpetually dusted with flour (white smudges on dark fabric)
- Worried eyebrows permanently raised — endearing anxiety
- Large hands, careful movements
- Silhouette: wide, solid, guarded
- Idle: wrings hands, glances at the door, dusts flour off apron

**Agnes** — *The Anxious Farmer*
- Weathered skin, outdoor clothing (earth tones, practical fabrics)
- Wicker basket of strawberries (visual signature — always carrying them)
- Nervous hands — fidgets with basket handle
- Sun hat pushed back, wisps of hair escaping
- Silhouette: angular, fidgety, windswept
- Idle: adjusts basket, looks over shoulder, tucks hair

**Uncle Kazik** — *The Showman*
- Big personality encoded in every design choice
- Wide-brimmed hat (slightly rakish angle), oversized coat with many pockets
- Expressive hands — gestures broadly, points, snaps fingers
- Mischievous grin, one eyebrow perpetually raised
- Gold pocket watch chain visible — a man who makes time for deals
- Silhouette: expansive, theatrical, unmistakable
- Idle: pulls items from pockets, checks watch, adjusts hat

**Tomek** — *The Old Friend*
- Elderly, comfortable, unhurried
- Worn cardigan, flat cap, reading glasses hanging from neck
- Chess piece in breast pocket (visible white knight tip — his trademark)
- Warm, talkative expression — mouth often slightly open mid-story
- Silhouette: soft, familiar, steady
- Idle: gestures while telling stories, adjusts cap, pats counter

**Zosia** — *The Insider*
- Young energy (teenager), quick movements
- Press badge pinned to jacket (slightly crooked — informal)
- Notebook and pencil always in hand — jotting things down
- Bright eyes, alert expression, slight lean forward
- Silhouette: slim, energetic, forward-leaning
- Idle: scribbles in notebook, glances around conspiratorially, bounces on heels

**Nadia** — *The Rival*
- Sleek, modern aesthetic — visual contrast to the warm shop
- Clean lines: fitted jacket, geometric earrings, sharp bob haircut
- Cool color palette (grays, whites, ice blue) against the shop's warm tones
- Confident posture, slight smirk
- Primarily visible through the window (across the street) — never enters the shop
- Her A-frame sign is readable with clean modern typography (contrasts Label Maker style)
- Silhouette: sharp, angular, cool

### Crowd Characters
- Reuse one Spine skeleton with 10-15 skin variations
- Simplified features vs named characters (fewer bones: ~8, simpler expressions)
- Seasonal clothing shifts (coats in winter, light clothes in summer)
- Express via 3 facial states: smiling, neutral, frowning (+ rare heart-eyes)
- Visual diversity: varied body types, heights, clothing styles, hair
- Distinguished from named characters by simpler outlines (2px vs 3-4px) and less saturated colors

---

## Rendering Architecture (PixiJS v8)

### Background: Layered Pre-Rendered (5 layers per scene)

**Shop Scene:**
1. Sky/window backdrop (weather, street, pedestrians)
2. Shop walls (midground — shelf area, wall, corkboard area)
3. Furniture/fixtures (register, shelf containers, clock, doorway frame)
4. Window glass overlay (rain on glass, frost effects, reflections)
5. Foreground counter (counter surface, newspaper, serving area)

**Back Room Scene:**
1. Back wall (barometer area, supplier board area)
2. Side walls and floor
3. Furniture (desk, aging rack, lamp)
4. Foreground (doorway frame, desk surface objects)

Source art at 3840×2160, export at 1920×1080. Mark static layers as Render Groups (`isRenderGroup: true`). ~40MB VRAM per scene; only one scene's textures loaded at a time (unload shop backgrounds when in back room and vice versa).

### Characters: Spine Skeletal Animation
- spine-pixi-v8 runtime (jointly maintained by Esoteric + PixiJS)
- Binary `.skel` format for fast loading
- Skins system for crowd character variations (10-15 skins on shared skeleton)
- 1-2 draw calls per character from shared atlas
- Cap at 3-4 visible skeletons simultaneously
- Named characters: ~15 bones, full expression system
- Crowd characters: ~8 bones, simplified expressions

### Interactive Objects: Sprites + GSAP Physics
- Individual Sprites from shared spritesheet atlas (one atlas per scene)
- PixiJS v8 pointer events (`eventMode = 'static'`) for drag interaction
- GSAP + PixiPlugin for spring/tween "physics":
  - Snap-to-target with elastic overshoot (pinning slips)
  - Idle wobble on hanging objects (sinusoidal rotation — price tags, bell)
  - Paper flutter (Y-sine + rotation — slip settlement)
  - Register flip-digits (Y-scale tween 1→0→1 with texture swap at midpoint)
  - Tool carry (cursor follow with slight physics lag — lerp toward cursor position)
- Explicit `hitArea` on irregular shapes (slips, tools, newspaper)
- `eventMode = 'none'` on all non-interactive objects
- `interactiveChildren = false` on background containers

### Weather: Hybrid
- Rain/snow: ParticleContainer (200-500 / 50-100 particles)
- Clouds: Individual sprites at different sizes/speeds/alphas (3-5)
- Rain on glass: Pre-rendered AnimatedSprite overlay on window glass layer
- Frost: Static sprite fade at window edges
- Optional: DisplacementFilter on window area for glass shimmer/refraction
- Pedestrians: Simplified Spine skeletons or animated sprites, walking across window backdrop

### Lighting: Three-Tier
1. **LUT shader** on root container (primary color temperature transformation — 3 pre-authored LUTs interpolated by `timeOfDay` uniform)
2. **Multiply-blend overlay** sprite (scene-wide tint, transitioned via GSAP tween over ~2 seconds)
3. **Per-layer PixiJS `tint`** property (free multiply op — window backdrop gets stronger shift, interior layers subtler)

### Text: BitmapText with Custom Fonts
- Pre-generate bitmap fonts from the three custom typefaces:
  - **Grandfather's Hand**: Warm script — journal, counter-offers, calculator annotations
  - **Gazette Serif**: Formal — newspaper, Mrs. Chen's letterhead
  - **Label Maker**: Embossed — price tags, register digits, order forms
- Use BitmapText for all dynamic values (prices, register display, day numbers)
- Static text baked into background layers where possible

### Performance Budget
| Element | Draw Calls | VRAM |
|---------|-----------|------|
| Background layers (5) | 5 | ~40MB |
| Interactive objects (10-15) | 1-2 (batched) | ~5MB |
| Characters (Spine, max 3-4) | 3-8 | ~10MB |
| Weather particles | 1 | ~1MB |
| Overlay/lighting | 1-2 | ~1MB |
| Text (BitmapText) | 1-2 | ~5MB |
| **Total** | **~12-20** | **~62MB** |

Comfortable 60fps on any modern browser. WebGPU path available for progressive enhancement.

### Resolution Strategy
- 1920×1080 base, fixed-ratio with letterbox
- Scale: `min(screenWidth / 1920, screenHeight / 1080)`
- Device pixel ratio capped at 2x (`Math.min(window.devicePixelRatio, 2)`)
- `@2x` atlas variants for characters and UI elements (not backgrounds)
- Spritesheet atlases max 2048×2048 (4096×4096 desktop-only)
- Minimum touch target 44px logical
- `autoDensity: true` for CSS-consistent logical coordinates

---

## Touch/Click Targets

| Object | Desktop Min | Tablet Min | Notes |
|--------|------------|------------|-------|
| Deal slip (summary on board) | 48×64px | 80×100px | Icon-only at this size |
| Deal slip (lean-in view) | 200×280px | 240×320px | Full text readable |
| Price tag wheel digit | 24×32px | 44×56px | Single digit, thick strokes |
| Register digit | 28×40px | 48×64px | Flip-digit style |
| Ingredient container | 80×100px | 120×150px | Clickable for ordering/scooping |
| Newspaper (folded) | 120×80px | 180×120px | Shows headline |
| Tool (caliper/spring/magnifier) | 48×80px | 80×120px | Grabbable/draggable — 1.25x for drag precision |
| Pause bell | 44×44px | 64×64px | Small but always accessible |
| Doorway | 60×100px | 100×150px | Scene transition trigger |
| Corkboard background | 280×220px | 320×260px | Lean-in trigger |

---

## Reference Touchstones

| Reference | Specific Borrowing |
|-----------|-------------------|
| **Gravity Falls** — Mystery Shack living room | Interior warmth: warm wood panels, cluttered shelves, visible wear on every surface. Thick outlines with slightly wobbly hand-drawn feel. The "cozy clutter" aesthetic. |
| **Gravity Falls** — town of Gravity Falls | Small-town PNW vibe: main street, A-frame signs, misty forests in background. Pedestrians as character types. |
| **Steven Universe** — Beach House interior | Warm color palette with pink/amber bias. Cozy domestic space that feels lived-in. Soft gradients on walls and surfaces. |
| **Professor Layton** — character design | Distinctive silhouettes per character. Elongated proportions with personality in every line. Watercolor-warm shading. Each character has a prop/accessory that defines them (top hat, magnifier, etc.). |
| **Professor Layton** — puzzle presentation | Physical objects centered on screen for inspection. Clean, readable presentation of interactive elements against illustrated backgrounds. |
| **Unpacking** — object interaction | Material textures on every object. The satisfaction of placing things. 1.5-2x scale exaggeration that feels natural, not cartoony. |
| **Coffee Talk** — counter composition | Counter-as-workspace with customer framed above it. Warm lighting. The "bartender's view" perspective. No menus — physical interaction only. |
| **Papers Please** — desk interface | Document handling as core gameplay. Physical stamping, sliding, comparing. Information density through paper objects. The way the desk fills up and creates spatial pressure. |
| **Obra Dinn** — diegetic commitment | Everything exists in the world. The ship's log IS the interface. No concessions to traditional UI. Proves diegetic-only works for complex information. |
| **Recettear / Moonlighter** — customer expressions | Emoji-level emotional signals on customer faces (happy, neutral, unhappy, thrilled). Immediate visual feedback on pricing decisions. |

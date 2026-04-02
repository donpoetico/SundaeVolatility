---
change-id: SV-SPEC-2026-03-26-b
version: "3.4"
status: REVIEW
author: "[Author Name]"
last-reviewed: 2026-03-26
---

# Sundae Volatility — Unified Game Specification

**Version 3.4 | March 2026**
*Revised after design-practice review — all patches from v3.3 review applied (see changelog at end of document)*

---

## 0. Problem Statement

### Observed Symptoms

Derivatives literacy is one of the most consequential gaps in financial education. Existing curricula rely on abstract notation, spreadsheet exercises, and textbook payoff diagrams — tools that teach the math of options pricing without building any intuition for the forces they describe. Students can compute Black-Scholes and still have no visceral sense of what theta decay *feels like*, why volatility makes guarantees expensive, or how a portfolio of commitments interacts under stress.

Specific signals:

- **Assessment gap:** Students routinely pass procedural exams (compute a premium, draw a payoff curve) but fail transfer tasks that require applying those concepts to novel scenarios. (Widely reported across university finance departments; documented in CFA Institute education surveys.)
- **Instructor feedback:** Finance faculty consistently describe a "notation wall" — a point in the course where students can follow the algebra but stop building mental models of the underlying forces.
- **Practitioner complaints:** Junior analysts entering derivatives desks require 6–12 months of on-desk mentoring to develop the intuitive risk sense that formal education was supposed to provide.
- **Engagement data:** Completion rates for introductory derivatives MOOCs average below 15%, with the steepest drop-off occurring at the Greeks module — the point where the notation-to-intuition gap is largest.

### Root Cause

The root cause is an **abstraction gap**: existing teaching tools separate the mathematics of derivatives from any embodied, consequential experience of the forces they describe. Students learn that theta is "the rate of change of option value with respect to time" but never experience the feeling of watching a commitment degrade as its deadline approaches. The notation is correct. The intuition is missing.

This diagnosis was tested against four alternative hypotheses:

1. **Motivation gap** (students don't see personal relevance): Partially true — but motivated students with access to traditional tools still exhibit the same transfer failures. Motivation is necessary but insufficient; the tool itself is the bottleneck.
2. **Sequencing gap** (concepts taught in the wrong order): Possible contributor, but rearranging the same abstract materials has not produced measurable improvement in transfer tasks. The problem is the medium, not the order.
3. **Practice gap** (not enough repetitions): Spreadsheet-based problem sets already provide hundreds of repetitions. The issue is not quantity of practice but *quality of feedback* — the feedback is numerical, not experiential.
4. **Feedback gap** (no real-time consequences): This is a co-factor, not an alternative. It is a *consequence* of the abstraction gap: abstract tools produce abstract feedback. Closing the abstraction gap necessarily closes the feedback gap.

The chosen approach — embedding a derivatives engine inside an experiential game — directly addresses the primary root cause (abstraction gap) and co-factor (feedback gap), while also providing motivation through narrative engagement and implicit sequencing through progressive disclosure.

### Design Hypothesis

Sundae Volatility exists to close the abstraction gap. By embedding a complete derivatives pricing engine inside a cozy shop-management game — where every option is a promise, every Greek is a physical tool, and every market force is a weather pattern — the game teaches intuitive understanding first and formal vocabulary second. The hypothesis is that players who spend four hours running an ice cream shop will develop stronger conceptual comprehension of derivatives than students who complete a traditional twelve-week introductory course.

---

## 0a. Direction — Why This Approach

The following decision matrix evaluates the chosen approach against alternatives. The status quo is included as a baseline.

### Approaches Considered

| Approach | Description |
|----------|-------------|
| **Status Quo** | Traditional curricula: lectures, spreadsheets, textbook payoff diagrams |
| **Interactive Simulator** | A visual derivatives trading simulator with simplified UI — a "friendly Bloomberg terminal" for beginners |
| **Narrative Game, Visible Finance** | A game that uses financial terms explicitly, teaching through story-driven gameplay (financial RPG) |
| **Sundae Volatility (chosen)** | Hidden derivatives engine, diegetic metaphor, cozy shop management; financial vocabulary exists only in the source code and an optional companion manual |
| **Micro-Simulations** | A series of 10-minute standalone interactive scenarios, each teaching one concept (e.g., "The Theta Clock," "The Vega Storm") |

### Decision Matrix

| Criterion | Status Quo | Interactive Simulator | Narrative RPG (visible finance) | Sundae Volatility | Micro-Simulations |
|-----------|------------|----------------------|--------------------------------|-------------------|-------------------|
| **Addresses abstraction gap** | Does not: students manipulate notation, never experience forces | Partially: visual feedback on trades, but still uses financial framing | Partially: narrative context, but financial terms remain abstract | Fully: every force is a physical experience; notation is absent | Partially: isolated concepts feel real, but no portfolio-level intuition |
| **Engagement / completion rate** | Below 15% MOOC completion | Moderate: tool-like, appeals to already-motivated students | High for RPG players; intimidating for finance-averse learners | High: cozy genre, no financial prerequisites, narrative pull | Moderate: low commitment per unit, but no sustained motivation arc |
| **Transfer to formal concepts** | Students pass exams, fail transfer tasks | Direct transfer (same vocabulary), but intuition may not form | Moderate: financial terms are present but embedded in fiction | Requires companion manual for explicit mapping; transfer is a deliberate second step | Good per-concept, but no integrated portfolio understanding |
| **Development cost** | Zero (exists) | Medium: UI/UX work, data feeds, scenario design | High: narrative + game design + financial accuracy | High: three-layer architecture, content pipeline, game design, pricing engine | Low–Medium: modular, can ship incrementally |
| **Institutional adoptability** | Already adopted | Easy: fits existing course structure as a lab tool | Moderate: requires course redesign | Moderate: requires buy-in on "invisible education" premise; telemetry helps | Easy: drop-in supplements to existing courses |
| **Builds portfolio intuition** | Only through problem sets | Yes, if multi-position tracking is implemented | Possible, depends on game design | Yes: the corkboard *is* a portfolio; multi-deal management is the core loop | No: each scenario is isolated by design |

### Criteria Definitions

- **Addresses abstraction gap:** Does the approach close the core diagnosed problem — the separation between mathematical notation and embodied experience?
- **Engagement / completion rate:** Will learners voluntarily complete enough of the experience to achieve learning outcomes?
- **Transfer to formal concepts:** After using the tool, can the learner connect their experience to standard financial vocabulary and frameworks?
- **Development cost:** Relative effort to produce a shippable V1.
- **Institutional adoptability:** How easily can a university or training program integrate this into existing curricula?
- **Builds portfolio intuition:** Does the learner develop a sense for how multiple positions interact under stress?

### Decision

**Selected approach:** Sundae Volatility — hidden engine, diegetic metaphor, cozy shop management.

**Rationale:** It is the only approach that fully closes the abstraction gap (the diagnosed root cause) while also building portfolio-level intuition through sustained gameplay. The interactive simulator and micro-simulations address the gap partially but retain financial framing, which is precisely the barrier the diagnosis identified. The narrative RPG with visible finance is the closest competitor but risks recreating the notation wall inside a game context — students who are intimidated by financial terms will be intimidated by a game that uses them.

**Trade-offs accepted:**
- **High development cost.** The three-layer architecture and content pipeline are expensive. This is accepted because a simpler approach would not fully close the abstraction gap.
- **Transfer requires a second step.** Players must read the companion manual or take a bridging course to connect their intuitions to formal vocabulary. This is a real cost, mitigated by the manual's design (§8) and institutional deployment features (§15c).
- **Institutional buy-in is harder.** "The game never uses a financial term" is a difficult pitch to a curriculum committee. This is mitigated by telemetry (§15b), which provides measurable learning proxies, and by the companion manual, which provides the explicit bridge.

---

## 1. Vision

Sundae Volatility is an ice cream shop management game set in the fictional Pacific Northwest town of Gravitov Falls. The player inherits their late grandfather Stanisław's struggling shop and has 90 days to save it from foreclosure. To do this, they must learn to read the weather, understand their customers, manage perishable inventory, negotiate supply deals, and master the art of promising the right flavors to the right people at the right time.

Underneath the counter, invisible to the player, the game runs a complete financial derivatives pricing engine. Every customer interaction maps to an options trade. Every weather pattern drives a volatility model. Every supply agreement is a forward contract. The player never sees any of this. They see ice cream, rain, and people.

The game's financial education happens in two places: organically through gameplay intuition (players *feel* theta decay when their ice cream melts and loses value overnight), and explicitly through an optional external companion manual that maps every game mechanic to its real-world financial equivalent. The game itself never uses a single financial term.

### Design Pillars

**It's a shop, not a desk.** The player runs an ice cream shop. They serve customers, watch the weather, and manage ingredients. The experience should feel closer to Stardew Valley or Recettear than to Papers Please or a Bloomberg terminal.

**Complexity is earned, not imposed.** Day one has a counter, a window, and a customer. Every new mechanic, tool, and character appears because the player's actions triggered it. Nothing is explained before the player needs it.

**The simulation is invisible.** Black-Scholes runs under the hood. The player sees flavor prices changing with the seasons. The Greeks are calculated every tick. The player sees their ice cream melting, their supplies getting unpredictable, and their regulars reacting to prices. Financial vocabulary exists only in the source code, the external manual, and Grandfather's journal (written in his cryptic personal notation).

**Cozy floor, mastery ceiling.** The worst day in the shop still ends with a warm light, a loyal customer, and a scoop of vanilla. The best day is a perfectly hedged portfolio — which the player experiences as "I promised the right things to the right people and the weather cooperated." You cannot go bankrupt. You can fail to save the shop, but you always have ice cream to serve.

**Decoupled and flexible.** The simulation engine, the translation layer, and the presentation layer are fully separated. Swapping the pricing model requires no changes outside `src/engine/`. Adding a new asset requires changes only in `src/translation/` and `src/game/` (new ingredient mapping, new shelf slot). The engine is unchanged. Changing the setting from ice cream to coffee requires changes only in translation and presentation layers.

---

## 2. The Core Loop

This is the heartbeat of the game — a cycle the player repeats hundreds of times. In Act 1, a single day takes 15–30 seconds: glance at the weather, serve a few scoops, close up. By Act 3, a day can stretch to 2–3 minutes as the player reads the newspaper, evaluates complex deals, checks tools in the back room, and manages a full corkboard. The interface stays the same; the decision density grows. Everything else hangs on this.

**Day progression model:** Day phases advance when the player completes all available actions in that phase (event-driven, not timed). The stated durations are expected averages, not enforced limits. A player who wants to spend five minutes studying their corkboard during a midday phase is free to do so.

### The Daily Rhythm

Each in-game day has three phases:

**Morning — Read & Plan (5–10 seconds)**
The player arrives at the shop. They glance through the window: what's the weather? They check who's waiting outside. They flip open the morning newspaper (one headline, one sentence). They look at their ingredient shelf. With all of this, they decide: what to stock on the counter today, and at what prices.

**Price-setting interaction:** Each ingredient container on the shelf has a small hanging price tag (a label-maker sticker on a string). During the morning phase, the player can click any price tag to grab it — a small vertical slider appears on the tag itself, styled as a rotating label-maker wheel. Dragging up increases the price; dragging down decreases it. The current price is always visible on the tag in vintage label-maker font. Prices snap to $0.25 increments. If the player doesn't touch a price tag, yesterday's price carries forward. The slider has a soft mechanical *click* at each increment. The range is $0.50 to $10.00 per scoop — the floor and ceiling are never communicated; the slider simply stops at each end.

**Midday — Serve & Deal (10–20 seconds)**
Customers enter one at a time (early game) or in small groups (later). Each customer wants something. Most want to buy ice cream right now. Some want to make an arrangement: "Can you save me three tubs of chocolate for the festival next Saturday?" or "If mint chip goes above $3, I won't want it anymore." The player accepts, negotiates, or declines. Accepted deals produce a physical slip that goes onto the corkboard.

**Evening — Settle & Reflect (5–10 seconds)**
The shop closes. Ice cream that wasn't sold loses freshness (visually: slight melting, color dulling). Deals that came due are settled — see §12a for full settlement rules. The cash register rings up the day's result. The grandfather's journal might reveal a new page if a milestone was reached. The day counter advances.

### The Atomic Interaction

The single most-repeated action in the game is: **a customer approaches → they say what they want → the player chooses a response.**

Early game, this is simple: "One scoop of vanilla, please." → Serve it.

By midgame, this becomes: "I want to lock in strawberry at today's price for the harvest festival in two weeks." → The player must decide: is this a good deal? What if strawberry prices drop? What if they rise? They don't think in these terms — they think "will I have enough strawberries, and will this price still be fair by then?"

By late game, multi-layered: "I'll pay you a small fee now for the *option* to buy 50 tubs of mint chip at today's price if — and only if — the Gravitov Gazette writes about us." → The player evaluates: how likely is the article? How much is the fee worth? What's my exposure if mint chip goes wild?

The genius of the incremental design is that the *interface* stays the same (customer talks → player responds), but the *decisions* deepen enormously.

### The Response Interface

The player's response options are presented as physical gestures and counter objects, not dialogue trees or menus.

**Tier 1 — Spot Sales (Act 1+):** The customer names a flavor. The player clicks the corresponding ingredient container to scoop and serve, or shakes their head (click the customer) to decline. One action, immediate result. No text selection.

**Spot sale economics:** When a spot sale is completed, the register increases by the player's listed price for that flavor (set via the morning price tag). The ingredient cost — what the player paid to stock that tub — is already sunk (deducted at delivery; see §3 Restocking). The register shows cash on hand, so the full listed price rings up as revenue. The player's margin is the implicit difference between their listed price and the ingredient cost they paid, but this is never displayed — they feel it through whether their register grows fast or slow. Walk-in customers have a **willingness-to-pay** (WTP) drawn from a normal distribution centered on the engine's current market price for the underlying asset (μ = current price, σ = 0.15 × current price). If the player's listed price exceeds the customer's WTP, the customer frowns and leaves (no sale). If the player's listed price is below 70% of the customer's WTP, the customer shows heart-eyes (the player is underpricing). Between these bounds, the customer buys at the listed price.

**Tier 2 — Forward Orders (Act 1+, Mrs. Chen):** The customer places a written slip on the counter. The slip shows: what they want, how much, when, and at what price. The player picks up the slip and either pins it to the corkboard (accept) or slides it back across the counter (decline). If the player wants to counter-offer, they pick up the price tag on the slip and drag it to a new number (a small vertical slider appears on the slip itself, styled as a handwritten correction). The customer reacts based on a tolerance range: each named character has a configurable `maxCounterOfferDelta` (percentage deviation from their initial ask). Within the range, the customer nods and accepts. Beyond the range but within 2× the range, the customer frowns but stays — the player may adjust once more (maximum 2 counter-offers per interaction). Beyond 2× the range, the customer walks away.

**Tier 3 — Reservations / Guarantees (Act 2+, Dmitri, Agnes):** Same slip mechanic, but the slip has two fields: the fee (what they pay now) and the terms (what happens later). The player can adjust the fee via the same slider mechanic. Accepting pins the slip; declining slides it back. The visual difference from Tier 2 slips (color, stamp) teaches the player that this is a different kind of commitment.

**Tier 4 — Compound Deals (Act 3, Uncle Kazik):** Kazik places a folded, multi-part document on the counter. The player unfolds it to see 2-3 linked slips. Each sub-slip can be individually accepted or declined. The player must pin all accepted sub-slips together (they're connected by a paper clip). Partial acceptance is allowed — Kazik reacts to which parts the player kept. Sub-slips within a compound deal are independent: any combination of sub-slips is valid. The engine does not enforce dependency constraints between sub-slips. A player who accepts a hedge without the position it hedges simply holds that position standalone.

**Design constraint:** The response interface never uses text input, typed numbers, or modal dialogue boxes. Every interaction is a physical gesture on a physical object: pick up, pin, slide, drag, unfold.

**Patience and timeout behavior:** Named characters (Marta, Mrs. Chen, Dmitri, Agnes, Kazik, Tomek, Zosia, Nadia) wait indefinitely for the player to respond. They idle with ambient animations (tapping the counter, looking around, checking a pocket watch) but never leave until the player acts. Walk-in crowd characters wait 15 seconds; if the player hasn't served them, they glance at the door, shrug, and leave. No penalty is applied — it simply represents a missed sale.

---

## 3. The Shop — The Diegetic Interface

The game's entire UI is the shop itself. There is no HUD, no overlay, no menu screen (except a pause screen with save/load/settings accessed via a physical bell on the counter). Everything the player needs to know is visible in the physical space.

### The Window

The back wall of the shop is a large window looking out onto the main street of Gravitov Falls. This is the player's primary macro-information display.

What the window communicates:
- **Demand forecast:** Sunny = lots of foot traffic (people walking by). Rainy = fewer people, but those who come are committed. Snow = almost nobody, but hot cocoa-adjacent flavors spike.
- **Volatility indicator:** Calm weather = stable prices. Storm rolling in = prices about to swing. The *speed* of cloud movement hints at how fast conditions are changing.
- **Seasonal context:** Autumn leaves, summer sun, spring blossoms, winter frost. Each season shifts which ingredients are cheap, which are scarce, and what customers crave.
- **Time of day:** Morning light, midday brightness, amber evening. The day's phases are visible.
- **Town events:** Festival banners appearing, a "CLOSED" sign on the competing shop across the street, a delivery truck pulling up.

The window is never labeled. There are no tooltips. The player learns to read it the way a real shopkeeper reads their street.

### The Counter

The player's primary workspace. A worn wooden counter with:

- **The register:** Shows current cash. Rings satisfyingly on each sale. The only persistent number on screen.
- **The serving area:** Where scoops are assembled and handed to customers. Visual feedback: a well-made cone sparkles briefly; a sloppy one (wrong flavor, wrong price) gets a subtle frown from the customer.
- **The daily newspaper:** A folded paper that arrives each morning. One headline visible when folded ("HEATWAVE EXPECTED THIS WEEKEND"). Can be unfolded for a short article with a secondary detail. Takes up counter space when open.
- **The corkboard:** Behind the counter on the wall. This is where pending deals are pinned — physical slips of paper for every promise the player has made. Arranged by date. The corkboard fills up as commitments accumulate. **Capacity limits:** Act 1 = 4 slips, Act 2 = 8 slips, Act 3 = 12 slips. *[PROVISIONAL — capacities subject to playtesting adjustment.]* When full, no new deals can be pinned until some resolve. However, story-critical characters (Mrs. Chen, Dmitri, Agnes, Uncle Kazik) will wait outside and return the next day if the board is full, ensuring the player never misses a progression-gating deal. The player can also tear up a pinned deal (right-click / long-press the slip) to free a slot — the affected customer arrives the next day looking disappointed, and the player forfeits any fee received. **Tear-up rules:** Tearing a deal is instant. The freed slot is available immediately (same-day pinning is allowed). Story-critical deals *can* be torn up (they are not protected). Tearing one sub-slip of a Kazik compound deal tears only that sub-slip; remaining sub-slips stay pinned. The paper-clip visual updates to reflect the remaining group.

### The Ingredient Shelf

Visible behind the player. Four slots (one per flavor), each showing physical containers at varying fullness levels. When a container is low, its color desaturates slightly. When it's empty, the slot is dark. Restocking requires ordering from suppliers, with lead times varying by ingredient:

| Ingredient | Restock Lead Time | Notes |
|------------|------------------|-------|
| Vanilla | 1 day | Reliable, always available |
| Chocolate | 1 day | Reliable, always available |
| Strawberry | 2 days (3 days in winter) | Seasonal scarcity increases lead time |
| Mint chip | 2–3 days (uniform random) | Erratic supply chain |

**Restocking interaction:** During the morning phase, the player can click any ingredient container to open a small order card that slides out from behind the container (styled as a carbon-copy order form on a pad). The card shows: the ingredient name, the current supplier price per tub (set by the engine's current asset price, translated through the flavor map), and a quantity dial (a rotating number wheel, 1–50 tubs, default 10). The player turns the dial to set quantity, then tears the card off the pad (click a perforated edge) to place the order. The torn card slides off-screen toward the shop door — the delivery is now in transit. A small delivery tag appears on the ingredient slot showing the expected arrival day ("Arrives: Day N"). The ingredient cost (price × quantity) is deducted from the register immediately upon ordering (prepayment). Multiple orders for the same ingredient can be in transit simultaneously. If the player cannot afford the order, the register flashes amber and the card won't tear. Restocking is only available during the morning phase — once midday begins, the order pad retracts.

**The Emergency Vanilla Crate:** A small, ever-present crate beneath the vanilla slot. If all four ingredient containers are empty, this crate provides exactly 5 tubs of basic vanilla per day — enough to serve Marta and up to 4 walk-in customers at low margins, but not enough to fulfill deals or stock the counter fully. The crate refills each morning automatically. This preserves the "you always have ice cream to serve" pillar. The crate is visually humble (dented, taped-up) and serves as a safety net, not a strategy. It cannot be sold in bulk or used for deal fulfillment.

### The Back Room (unlocked midgame)

A doorway behind the shelf leads to an expanded workspace, revealed when the player earns enough to renovate. This room contains:

- **Grandfather's desk:** Where the journal lives, along with the mechanical calculator and the Greek tools (the caliper is found here; others are purchased as unlocked). The player walks to this room to do "deep thinking" — analyzing deals, reading the journal, using tools.
- **The aging rack:** Where premium ingredients improve over time (vanilla extract, specialty bases). Introduces time-value-of-money mechanics naturally.
- **The supplier board:** A wall-mounted board showing relationships with local suppliers, their reliability, and current offers. Replaces the pneumatic tube system with something warmer and more character-driven.

### The Shop Door & Bell

A bell jingles when customers enter. The frequency of jingles is ambient information: lots of jingles = busy day = high demand. Silence = slow day. The player never needs a "customers today" counter.

---

## 4. Characters — Market Forces Wearing Faces

Every financial concept in the simulation is embodied by a character. The player never interacts with "the market." They interact with people. Each character archetype encodes a specific economic behavior, but the player experiences them as personalities.

### Regulars (Always Available)

**Marta** — The retired schoolteacher. Comes every day, orders one scoop of vanilla, pays exactly the listed price, never negotiates. She's the player's baseline revenue — small but perfectly reliable. *Simulation role: risk-free rate anchor.*

**Tomek** — Stanisław's old chess partner. Comes three times a week. Offers unsolicited commentary on the weather and what other shops are doing. Occasionally mentions things Stanisław used to do. In the early game (before chocolate unlocks), Tomek doesn't buy — he visits for conversation, lingering at the counter and sharing stories. Once multiple flavors are available, he orders whichever flavor he's in the mood for, always with commentary ("Chocolate today — your grandfather always said chocolate sells best before a storm"). *Simulation role: narrative exposition, qualitative market intelligence.*

**Zosia** — A teenager who works at the local newspaper. Tips the player off about upcoming events ("Hey, I think the editor's running a story about mint chip next week"). Each tip is resolved independently via a Bernoulli trial with p = 0.65. Over a full campaign (~12 tips), the expected hit rate is 65% ± 14% (one standard deviation). When she's wrong, the event either doesn't materialize or the timing is off by 2–4 days. The player learns to weight her tips rather than trust them blindly. *Simulation role: imperfect information / rumor channel.*

### Deal-Makers (Introduce Derivative Mechanics)

**Mrs. Chen** — Runs the Gravitov Falls Community Center. Books large orders weeks in advance for events: "I need 80 scoops of assorted flavors for the Spring Gala on Day 45." She locks in a price today. The player must deliver on that date at that price regardless of what ingredients cost by then. *Simulation role: forward contracts.*

**Dmitri** — A cautious Russian immigrant who runs the bakery next door. Frequently asks to "reserve" specific flavors: "I'll pay you $5 now for the right to buy 10 tubs of chocolate at today's price next Friday. If I don't want them, keep the $5." If chocolate prices rise, he exercises the reservation. If they fall, he walks away. *Simulation role: call options.*

**Agnes** — A nervous farmer who supplies strawberries. Offers "freshness guarantees": "I'll buy back any unsold strawberries at $2 a tub if you can't move them, but it'll cost you a small freshness fee." This protects the player from spoilage loss. *Simulation role: put options.*

**Uncle Kazik** — Stanisław's brother, a wheeler-dealer who visits once every 7–10 days (uniform random, seeded deterministically per campaign), starting from Day 45. His deals are bigger, riskier, and more complex. He's the gateway to multi-part arrangements. He speaks in folksy metaphors that, unbeknownst to the player, perfectly describe option strategies. *Simulation role: complex strategies introduction.*

### Crowd Characters (Ambient Demand)

Unnamed townsfolk who enter, buy what's on the counter, and leave. Their behavior communicates market state: on a hot day, they pour in fast. On a rainy day, they trickle. During a festival, they swarm. Their visual diversity shifts with seasons. They react to prices with facial expressions:
- **Smiling:** Price feels fair or cheap.
- **Neutral:** Price is acceptable but not exciting.
- **Frowning + hesitation:** Price is too high; they might leave.
- **Heart-eyes (rare):** Player is underpricing; leaving money on the table.

This is the Moonlighter/Recettear feedback system — emoji-level emotional signals replacing numerical price analysis.

### The Competitor (Introduced Act 2)

**Nadia** — Runs a sleek modern frozen yogurt shop across the street, visible through the window. Her prices are shown on her shop's A-frame sign (the player can see them through the window). She undercuts aggressively during festivals and raises prices when supply is tight. She introduces competitive dynamics and forces the player to think about pricing strategy. *Simulation role: market maker / competing agent.*

**Nadia's competitive model:** Nadia is implemented as a market agent in the simulation engine (see §10a `AgentConfig`). Her pricing algorithm is: `nadiaPrice = playerPrice × (1 - undercutFactor)` where `undercutFactor` ranges from 0.05 (calm days) to 0.25 (festival days). Customer diversion rate: when Nadia's price is lower, a percentage of walk-in customers equal to `min(40%, priceDifference / playerPrice × 200%)` choose her shop instead. Named characters are never diverted.

---

## 5. Progressive Disclosure — The Revelation Sequence

Nothing in the game exists until it's triggered. The player's first session shows almost nothing. Complexity grows organically. Each reveal is designed as a discovery moment.

**Trigger evaluation:** All triggers are evaluated at the start of each morning phase. If multiple triggers are satisfied simultaneously, they are processed in section order (Day 1 first, then Days 2–5, etc.). A trigger that fires on Day N produces its effect on the morning of Day N+1 (the player never sees two reveals in the same morning).

### Day 1 — The Bare Minimum

What the player sees:
- The shop. Window showing a gray morning.
- The counter with the register ($2,000).
- The ingredient shelf with four containers (vanilla, chocolate, strawberry, mint chip) all full.
- One customer (Marta) enters, orders vanilla.
- The player scoops and serves. The register rings.

What's hidden:
- No newspaper yet.
- No corkboard.
- No back room.
- No deals.
- No tools.
- Three of the four ingredient slots are slightly dimmed (visually suggesting "not yet relevant" — the player starts with only vanilla active).

### Days 2–5 — The Newspaper Appears

**Trigger:** The player has served ≥ 10 customers AND completed ≥ 3 in-game days. *[PROVISIONAL]*

The next morning, a newspaper slides under the door with a soft thud (audio cue). The headline mentions weather. This is the first time the player has any forward-looking information. The newspaper takes up counter space, teaching the player that information has a spatial cost.

### Days 5–8 — Chocolate Unlocks

**Trigger:** Cumulative revenue ≥ $500 AND ≥ 15 customers served. *[PROVISIONAL]*

A delivery arrives: a crate of chocolate ingredients with a note from a supplier. The chocolate slot on the ingredient shelf lights up. A second flavor is now available, with a different price point and different customer preferences. The player notices chocolate sells better on cold days.

### Days 8–12 — The First Deal

**Trigger:** ≥ 30 customers served AND register balance ≥ $1,500 AND ≥ 2 different flavors stocked on the counter at least once. *[PROVISIONAL]*

Mrs. Chen enters for the first time. She doesn't buy a scoop — she asks for a conversation. "I'm organizing the Community Center potluck in ten days. Can I reserve 20 tubs of vanilla at today's price?" The player can accept or decline.

If they accept, a slip of paper appears on the counter. A **corkboard materializes on the wall** (reveal moment — it wasn't there before). The player pins the slip. They now have their first commitment. They must have 20 tubs of vanilla in 10 days. If vanilla ingredient costs rise, they eat the difference. If costs fall, they profit. They don't know any of this in financial terms. They just know they made a promise.

### Days 12–18 — Strawberry & Mint Chip Unlock

**Trigger (Strawberry):** Day ≥ 14 AND cumulative revenue ≥ $2,500. *[PROVISIONAL]*

Strawberry unlocks with the arrival of Agnes the farmer. Each comes with its own supply dynamics: strawberry is seasonal and cheap in summer, expensive in winter.

**Trigger (Mint Chip):** Strawberry unlocked AND cumulative revenue ≥ $3,000 AND ≥ 25 total customers served. *[PROVISIONAL]*

Mint chip unlocks when Zosia mentions it's trending on social media. Mint chip is erratic and hype-driven.

### Days 15–20 — Dmitri's First Reservation

**Trigger:** Player has completed ≥ 2 deals with Mrs. Chen successfully. *[PROVISIONAL]*

Dmitri enters. His "reservation" mechanic is new — he's paying a fee *for the right but not the obligation* to buy. This is the first asymmetric deal. The slip he produces looks different from Mrs. Chen's (different paper color, a "RESERVATION" stamp instead of "ORDER"). The player pins it alongside Mrs. Chen's slips and starts seeing their corkboard as a landscape of commitments.

### Days 18–25 — The Back Room

**Trigger:** Register balance ≥ $5,000 AND ≥ 2 completed deals (forward orders with Mrs. Chen). *[PROVISIONAL]*

The player can pay $800 to renovate the back room. When purchased, the wall behind the ingredient shelf opens up (short animation: boards being removed, dust settling, warm light spilling in). Inside: Grandfather's desk, his journal, and a heavy brass mechanical device nobody has explained.

The journal is open to a page with a handwritten note: "The caliper measures how fast things move. Attach it to any promise and watch the gears." This is the Delta tool, but it's never called Delta. It's called **"Dziadek's Caliper"** (Dziadek = Grandfather in Polish).

### Days 25–30 — The Caliper (Found)

**Trigger:** Back room unlocked AND ≥ 3 active deals pinned to the corkboard. *[PROVISIONAL]*

The journal opens to a new page: "The caliper measures how fast things move. Attach it to any promise and watch the gears." The player finds Dziadek's Caliper in the desk drawer — it was Stanisław's, waiting for someone who needed it. No purchase necessary. When attached to any deal slip, it shows a small spinning gear. Fast spin = this deal's value is moving quickly with ingredient prices. Slow spin = stable, not much sensitivity. The player starts intuitively checking deals before accepting them.

### Days 30–40 — The Spring, Magnifier, and Agnes's Guarantees

**Trigger:** Register balance ≥ $8,000 (end of Act 1). *[PROVISIONAL]*

Three things become available in close succession:

- **The Gamma Spring** ($3,000): Attaches alongside the caliper. Shows tension — how quickly the caliper's speed itself is changing. Tight and vibrating = dangerous acceleration. Loose = stable.
- **The Theta Magnifier** ($7,000): A brass magnifying lens. When held over a deal slip, shows the paper's condition — how much it's degraded since being pinned. Older slips are yellowed, ink faded. The magnifier adds a small dripping number showing daily value loss. The player understands: "Deals that are far from their date are worth more; deals close to their date have lost most of their cushion."
- **Agnes's freshness guarantees:** Agnes begins offering to buy back unsold stock at a guaranteed floor price, for a fee. This is the first protective mechanism.

### Days 40–60 — The Full Workshop

**Trigger:** Register balance ≥ $15,000 AND ≥ 8 deals completed AND all four flavors stocked at least once. *[PROVISIONAL — thresholds subject to playtesting adjustment.]*

- **The Vega Barometer** ($15,000): A beautiful antique pressure gauge mounted on the back room wall. Its needle responds to overall market chaos — how erratic prices are across all flavors. When the barometer is in the red, everything is unpredictable. In the green, things are calm. The player learns: when the barometer is high, deal fees should be higher (because uncertainty is higher), and when it's low, fees can be smaller.
- **Nadia's shop** appears across the street (visible through the window).
- **Uncle Kazik** starts visiting with compound deals.
- **The supplier board** appears in the back room, showing multiple sourcing options per ingredient.

### Days 40–60 — The Rho Dial

**Trigger:** Register balance ≥ $20,000 AND the player owns the Barometer. *[PROVISIONAL]*

- **The Rho Dial** ($10,000): A small brass dial on Grandfather's desk. Its needle rotates when the game's background interest rate shifts (seasonal and event-driven). When attached to a deal slip, it shows how much the deal's value changes with the cost of borrowing. The journal page reads: "When money itself becomes expensive, every promise costs more to keep." *Simulation role: Rho sensitivity.*

### Days 60–90 — Mastery Systems

**Trigger:** Register balance ≥ $30,000 AND ≥ 15 deals completed AND the player owns the Barometer. Act 3 begins. *[PROVISIONAL]*

- **Standing orders:** The player can write instructions on cards and pin them to the corkboard — "Automatically accept any vanilla reservation under $2.60." This is the automation layer, earned through manual mastery.

  **Standing order interaction:** In the back room, Grandfather's desk has a small stack of blank punch cards (introduced with a journal page: "I got tired of saying the same thing to every customer. So I wrote it down and let the shop do the talking."). The player clicks the stack to pull a blank card. The card has three pre-printed fields, each filled by selecting from a physical rotating wheel (like a combination lock):

  1. **Ingredient wheel:** Vanilla / Chocolate / Strawberry / Mint Chip
  2. **Deal type wheel:** Reservation (call) / Guarantee (put) / Forward order
  3. **Price threshold wheel:** A number dial, $0.50 increments, setting the maximum strike price (for reservations/forwards) or minimum strike (for guarantees) the player will auto-accept

  Once all three wheels are set, the player tears the card from the stack and pins it to the corkboard in a dedicated "Standing Orders" row at the bottom. When a matching deal is proposed by any character, the shop auto-accepts without player intervention — the slip auto-pins with a soft *ka-chunk* and a brief highlight. Standing orders remain active until the player removes them (right-click / long-press to tear up, same as deal slips). Maximum 3 standing orders active simultaneously. Standing orders do not count toward corkboard capacity.

- **The mechanical calculator:** Fully functional now. The player can feed in a deal slip and pull the lever. The machine groans, gears turn, and a printed ticket emerges showing projected outcomes under different weather scenarios. This is Monte Carlo simulation presented as a brass contraption.

  **Calculator output:** The printed ticket shows three weather icons arranged vertically (sun, clouds, storm) with a horizontal bar next to each, representing the deal's projected outcome under that scenario. Each bar extends left (loss — red-tinted) or right (profit — green-tinted) from a center line. The length is proportional to the magnitude. Below the three bars, a single number is printed: the "expected haul" (weighted average outcome across scenarios), styled as a handwritten annotation by the machine. No axis labels, no percentages, no financial notation — just three bars and a number. The ticket can be pinned alongside the deal slip on the corkboard for reference.
- **Town-wide events:** Larger-scale scenarios that affect all flavors simultaneously (supply chain disruption, tourist season, the annual Gravitov Festival).

### First-Encounter Design — How New Mechanics Are Taught

Each new mechanic is introduced through a scripted first encounter that teaches by doing, not by explaining. No tutorial popups, no instruction text, no "click here" prompts.

**First Scoop (Day 1, Marta):** Marta walks up and says "One scoop of vanilla, please." The vanilla container glows subtly (the only interactive element). The player clicks it. The scoop animates onto a cone. Marta takes it. The register rings. This teaches the entire spot-sale loop in one action. If the player doesn't click within 10 seconds, Marta taps the counter gently — the only hint. Marta waits indefinitely.

**First Deal (Days 8–12, Mrs. Chen):** Mrs. Chen enters and places her written slip on the counter (it slides in from the right, physically landing on the counter surface). The slip glows faintly. The player can pick it up (click). Once held, the corkboard behind them pulses with a warm light — inviting the pin. If the player drags the slip to the corkboard, it pins. If they drag it back toward Mrs. Chen, she takes it back. The corkboard's appearance itself is the teaching moment: it materializes for the first time as the slip is pinned.

**First Tool (Days 25–30, Caliper):** The journal opens to the caliper page automatically after the trigger. The caliper glows on the desk. The player picks it up. The nearest deal slip on the corkboard pulses. The player drops the caliper on the slip. The gears begin spinning. No text explains what the speed means — the player discovers this over subsequent deals by correlating gear speed with outcomes.

**First Competitor (Days 40+, Nadia):** Nadia's shop appears across the street (the player notices a new A-frame sign through the window). No fanfare. Tomek mentions it in his next visit: "Did you see the frozen yogurt place? Fancy." Over the next few days, the player notices customers occasionally glancing across the street before entering — or not entering. The competitive dynamic is felt before it's understood.

**Design rule:** The first encounter with any mechanic must be completable in a single action (click, drag, or pin). Understanding comes later. The first time is about "this exists and this is how I interact with it." The second and third times are about "oh, this is what it means."

---

## 6. The Tools — Buying Your Own Interface

The core economic tension: knowledge costs money. Every tool the player buys is money they can't spend on inventory or shop upgrades. This creates a genuine capital allocation dilemma.

### Tool Summary

| Tool | Cost | What It Shows | Physical Form |
|------|------|---------------|---------------|
| Dziadek's Caliper | Free (found) | How fast a deal's value moves with price changes | Brass caliper with spinning gears, attaches to deal slips |
| The Spring | $3,000 | How quickly the caliper's speed is changing (acceleration) | Coiled metal spring alongside the caliper; vibrates under tension |
| The Magnifier | $7,000 | Daily value loss on aging deal slips | Brass magnifying lens; reveals paper degradation and a drip counter |
| The Barometer | $15,000 | Overall market unpredictability across all flavors | Wall-mounted pressure gauge; needle in green/amber/red zones |
| The Rho Dial | $10,000 | Impact of loan costs on deal profitability | Small brass dial on the desk; rotates when interest rates shift |

*[PROVISIONAL — all tool prices are subject to playtesting adjustment. The total capital outlay for all purchasable tools ($35,000) must remain high enough to create a genuine capital allocation dilemma but low enough that a skilled player can afford 2–3 tools and still save the shop.]*

### Tool Interaction Model

All tools use a unified drag-and-attach interaction:

1. **Pick up:** The player clicks a tool on Grandfather's desk. The cursor changes to carry the tool (the tool follows the cursor with slight physics lag).
2. **Attach:** The player drops the tool onto a deal slip on the corkboard. The tool snaps into position on the slip's edge with a satisfying click.
3. **Read:** While attached, the tool displays its reading continuously (spinning gears, vibrating spring, drip counter). The player can glance at it anytime.
4. **Detach:** The player clicks the tool again to pick it up and move it to another slip, or right-clicks to send it back to the desk.

**Stacking rules:** The caliper and spring can be attached to the same slip simultaneously (the spring mounts alongside the caliper). The magnifier occupies the slip independently. Only one tool (or one caliper+spring pair) can be on a slip at a time. **Conflict resolution:** If the player drops a tool onto a slip that already has an incompatible tool attached, the existing tool auto-detaches and returns to the desk with a soft clink sound. The new tool attaches in its place. The player is never blocked from attaching.

**The barometer exception:** The barometer is wall-mounted and cannot be attached to individual slips. It shows a global reading. The player walks to the back room to check it, like checking a real barometer before going outside.

### Design Principle: Tools Reveal, Not Inform

The tools don't *tell* the player what to do. They *show* something that was already happening but invisible. The caliper doesn't say "Delta is 0.7." It shows a gear spinning at a certain speed, and the player learns through experience that fast-spinning gears on a deal they accepted last time correlated with a big profit (or loss). The learning is embodied and experiential, never didactic.

---

## 7. The Journal — Grandfather's Scottish Book

A heavy, leather-bound, coffee-stained journal that sits on Grandfather's desk in the back room. It is the game's progression tracker, lore vehicle, hint system, and emotional core.

### Structure

The journal has 90 pages. Each in-game day maps to exactly one page. Pages are locked until their trigger condition is met; untriggered pages remain blank. A player who meets all milestones sees all 90 pages. Some pages are fully legible. Some are partially obscured (coffee stains, water damage, torn edges). Some are written in Stanisław's personal cipher — a mix of Polish, mathematical notation, and ice cream recipes that the player must decode.

### What the Journal Contains

- **Recipes and shop wisdom:** "Strawberry sells best when the first flowers appear on the hill behind the shop. Buy early."
- **Grandfather's philosophy:** "Always know how fast your promises are moving. That's what the caliper is for."
- **Oblique strategy hints:** "When the weather is uncertain, the fee for a reservation should be higher. Think about why."
- **Emotional narrative:** Letters to the player ("I hope you can save what I built"), memories of Kraków, references to mathematical friends who gathered at a café and wrote problems on the tables.
- **Cipher puzzles:** Some pages contain encoded hints that unlock hidden mechanics (the scripting console, secret recipes, Stanisław's personal trading strategies). These are strictly optional for players who love puzzles.

### Discovery, Not Instruction

The journal never explains a concept directly. It demonstrates through Stanisław's personal experience. A page about the caliper doesn't say "this measures price sensitivity." It says: "I once promised old Kowalski 40 tubs of vanilla at summer prices. Then the frost came early. I watched the caliper spin so fast I thought the gears would fly off. I lost everything that month. After that, I learned to check the caliper before every promise."

The player pieces together what the tools mean through Stanisław's stories, their own experience, and pattern recognition.

---

## 8. The External Manual — The Bridge to Finance

A separate document (digital PDF, or a beautifully designed booklet for a premium edition) that exists entirely outside the game. The player never needs to read it to play. But for those who want to understand the real-world finance behind the mechanics, it maps every concept:

| In the Game | In the Manual |
|-------------|---------------|
| Reservation voucher | Call option |
| Freshness guarantee | Put option |
| Advance order (Mrs. Chen) | Forward contract |
| The caliper's gear speed | Delta |
| The spring's tension | Gamma |
| Paper degradation over time | Theta (time decay) |
| The barometer's needle | Vega (volatility sensitivity) |
| Standing orders on punch cards | Algorithmic trading |
| The mechanical calculator | Monte Carlo simulation |
| Ingredient price changes | Underlying asset price movement |
| The "agreed price" on a deal | Strike price |
| The "pickup day" on a deal | Expiration date |
| The fee Dmitri pays upfront | Option premium |
| Dmitri walking away from a deal | Option expiring out of the money |
| Ice cream melting overnight | Time decay on long positions |
| Selling a reservation you wrote | Writing (selling) an option |

The manual is written in the voice of a fictional finance professor who "discovered" Stanisław's system and recognized it as a complete derivatives framework built from first principles. It treats Stanisław's methods with respect and wonder, gradually introducing formal terminology alongside the game's folk equivalents.

### Discoverability

The player can encounter the manual's existence in three ways, none of which are mandatory:

1. **The pause screen** includes a small "Companion Manual" link in the bottom corner, styled as a brass bookmark. Always present, never highlighted.
2. **Tomek (Act 2+):** "A professor from the university came by once, spent three days watching your grandfather work. Said he'd never seen anything like it. Wrote a whole paper about it, I think." This dialogue triggers once, after the player has used the caliper at least 5 times.
3. **Post-credits:** If the player finishes the campaign without having opened the manual, the credits sequence ends with the journal's final page including a handwritten URL: "For Professor Kowalczyk's analysis of my methods, see..." This is the most explicit prompt.

The manual can also include:
- Exercises: "Replay Day 23. This time, try selling a reservation on mint chip instead of buying one. What changes?"
- Diagrams: Payoff curves labeled with *both* game terms and financial terms.
- Historical context: How Black-Scholes was developed, the story of the actual Scottish Book, the connection between Lwów mathematicians and modern quantitative finance.

---

## 9. Sound Design — The Invisible Dashboard

In a game where the player stares at a shop interior, sound carries more information than any visual element. The audio architecture is a core information system, not polish.

### Ambient Layer (Always Present)

- **Rain intensity:** Light patter = mild weather, stable market. Heavy downpour = volatile day, prices swinging. The player learns to listen before looking.
- **Wind:** Calm = low volatility. Gusting = prices about to move. Howling = major event incoming.
- **Street sounds:** Birdsong and footsteps on a good day. Silence on a bad day. Festival music when events are active. The ambulance/fire siren for extreme market events (ingredient supply disruption).
- **The clock:** A cuckoo clock in the shop marks the transition between morning, midday, and evening with distinct chimes. No digital timer needed.

### Interactive Audio

- **The door bell:** Jingle on customer entry. Frequency = demand level. A cascade of jingles = rush hour.
- **The register:** Satisfying "ka-ching" on sale. The pitch subtly varies: higher pitch = more profitable transaction. The player doesn't consciously parse this, but over hundreds of sales, they *feel* which deals sound good.
- **The caliper:** A soft ticking when attached. Faster ticking = higher sensitivity. This is information the player processes peripherally.
- **The spring:** A subtle metallic creak. Louder = more tension = more risk. At extreme levels, an unsettling harmonic hum.
- **The barometer:** A gentle hissing when pressure is high. Steam whistle when it hits the red zone.
- **The corkboard:** A satisfying *thunk* when pinning a deal. A papery *flutter* when a deal expires and falls off the board.
- **The mechanical calculator:** Gear grinding, lever clunk, the slow chatter of the printing mechanism. 3-5 seconds of satisfying machine noise before results appear.

### Music

Minimal. Tempo: 60–80 BPM. Key: minor. Instrumentation: solo fingerstyle acoustic guitar or solo piano. Dynamic range: ≤ -20 LUFS (mixed beneath ambient layer). The tempo subtly responds to market state: +5 BPM on volatile days, -5 BPM on calm ones. Never intrusive. Optional — the game should feel complete with just ambient sound. Reference tracks to be specified in art direction deliverables (see §13 item 4).

### Accessibility — Visual Redundancy

Every sound-based information channel has a visual equivalent so that deaf or hard-of-hearing players receive the same signals:

- **Door bell frequency** → A small foot-traffic indicator on the window (more pedestrians visible = busier day).
- **Register pitch** → The cash amount that flashes on the register is tinted green for high-margin sales, amber for break-even, and stays white for normal.
- **Caliper ticking speed** → Already visual (gear spin speed).
- **Spring creak intensity** → Already visual (vibration amplitude).
- **Barometer hissing** → Already visual (needle position and zone color).
- **Rain/wind intensity** → Already visual (window weather effects).
- **Music tempo** → No gameplay information; purely atmospheric.

Accessibility settings (on the pause screen) include: a master volume slider, individual sliders for ambient/interactive/music layers, and a "Visual Cues Enhanced" toggle that makes the visual redundancy indicators slightly more prominent.

### Accessibility Extension Plan (Post-V1)

V1 ships with visual redundancy as the accessibility baseline (see §17 Non-Goals). If institutional partners require WCAG 2.1 AA compliance, the following extension path is designed to layer onto the diegetic UI without breaking the core experience:

- **Keyboard navigation:** All interactive elements (ingredient containers, deal slips, tools, corkboard pins, newspaper, journal pages) are assigned a tab order within each day phase. Arrow keys navigate between elements; Enter/Space activates. The diegetic aesthetic is preserved — a subtle brass highlight ring follows the focused element, styled as a shop light catching a surface.
- **Screen reader support:** Each interactive element and information display carries an ARIA label that describes its state in game terms (never financial terms). Example: the caliper attached to a deal slip reads "Grandfather's caliper on Mrs. Chen's vanilla order — gears spinning quickly" rather than "Delta: 0.72." The barometer reads "Barometer needle in the red zone — market is unpredictable." This preserves the educational design while providing equivalent access.
- **Reduced motion mode:** A toggle that replaces animated weather, tool animations, and transitions with static visual states. Clouds are shown in fixed positions indicating weather severity; the caliper displays a numeric speed indicator instead of spinning gears; day-phase transitions are instant cuts rather than ambient fades.

This plan does not commit V1 resources. It documents the intended extension path so that architectural decisions made during V1 development (e.g., PixiJS scene graph structure, event naming conventions) do not accidentally foreclose these options.

---

## 10. The Simulation Engine — Architecture

The simulation is a black box that the presentation layer never looks inside. It produces *events* and *state*, and the translation layer converts these into game-world phenomena.

### Three-Layer Architecture

```
┌─────────────────────────────────────────────┐
│         PRESENTATION LAYER                  │
│   The shop, customers, weather, tools,      │
│   sounds — everything the player sees       │
│   and touches. Knows NOTHING about          │
│   finance. Only knows about ice cream,      │
│   people, and weather.                      │
├─────────────────────────────────────────────┤
│         TRANSLATION LAYER                   │
│   Converts simulation outputs to game       │
│   events. "Price spike on asset #3" →       │
│   "Strawberry supplier raises prices        │
│   because of early frost." "IV increase"    │
│   → "Weather forecast becomes uncertain."   │
│   "Option expiring ITM" → "Dmitri shows     │
│   up to collect his reserved chocolate."    │
├─────────────────────────────────────────────┤
│         SIMULATION ENGINE                   │
│   Black-Scholes pricing. Greeks calc.       │
│   GBM price paths. Mean-reversion.          │
│   Jump diffusion. Agent-based market.       │
│   ALL financial logic lives here.           │
│   No knowledge of ice cream.               │
│   Only assets, contracts, parameters.       │
└─────────────────────────────────────────────┘
```

The following descriptions walk through each layer from the bottom up — starting with the engine that drives everything, then the translation that bridges domains, then the presentation the player sees.

### Simulation Engine (Bottom Layer)

Operates on abstract types (see §10a for full TypeScript definitions):

- **Assets:** Four underlying assets with configurable parameters (base price, volatility, mean-reversion speed, seasonality amplitude, jump probability).
- **Contracts:** Forward, European call, European put, American call, American put. Each has: underlying asset, strike, expiry, direction, quantity.
- **Greeks:** Delta, Gamma, Theta, Vega, Rho — calculated per contract and aggregated across the portfolio.
- **Market agents:** Configurable NPC agents with behavioral parameters (risk tolerance, price sensitivity, information quality, deal frequency).

**Price engine** — four independent, composable sub-models:

1. **GBM (Geometric Brownian Motion):** Base random walk with configurable drift μ and volatility σ per asset.
2. **Mean reversion (Ornstein-Uhlenbeck):** Pulls price toward a seasonal baseline with configurable reversion speed θ and strength κ.
3. **Seasonal drift:** Sinusoidal price modifier with configurable amplitude A and phase φ per asset (e.g., strawberry peaks in summer).
4. **Jump diffusion (Merton):** Poisson-distributed price jumps with configurable arrival rate λ and log-normal jump size distribution (mean μ_J, std σ_J).

All four sub-models combine additively on the log-price each tick.

**Scenario generator:** Monte Carlo paths for forward-looking analysis. Parameterized by current state. Generates N configurable paths (default: 1000).

Performance targets: option pricing < 1ms, Greeks < 2ms, full portfolio update < 5ms. All targets are P99 measured on a 2020-era mid-range laptop (Intel i5-1035G1, 8GB RAM) in Chrome, after initial page load.

The engine exposes a clean event bus (see §10a for typed payloads):

```
engine.on('priceUpdate', ({ asset, newPrice, oldPrice }) => ...)
engine.on('contractExpiry', ({ contract, outcome }) => ...)
engine.on('agentAction', ({ agent, action, params }) => ...)
engine.on('volatilityShift', ({ asset, newVol, trigger }) => ...)
engine.on('scenarioResult', ({ contractId, paths }) => ...)
```

### Translation Layer (Middle Layer)

A mapping system that subscribes to engine events and emits game events (see §10a for the complete `GameEvent` union type):

```
// Engine event → Game event examples

priceUpdate(vanilla, 2.80, 2.50)
  → gameEvent('supplierPriceChange', {
      ingredient: 'vanilla',
      newCost: 2.80,
      reason: 'Seasonal demand increase',
      supplierDialogue: "Sorry, vanilla beans are scarce this month."
    })

contractExpiry(contract_047, { itm: true, payoff: 12.50 })
  → gameEvent('dealSettlement', {
      character: 'dmitri',
      dealSlip: 'reservation_047',
      outcome: 'collected',
      dialogue: "I'll take those 10 tubs of chocolate now, as agreed!",
      cashFlow: -12.50
    })

volatilityShift(mintChip, 0.85, 'sentiment_spike')
  → gameEvent('weatherChange', {
      type: 'storm_approaching',
      severity: 'high',
      newsHeadline: "UNPREDICTABLE WEEK AHEAD FOR GRAVITOV FALLS"
    })
  → gameEvent('barometerUpdate', { needle: 0.85, zone: 'red' })
```

The translation layer also maintains a **narrative template library** — a collection of pre-written content selected semi-randomly to prevent repetition:

| Category | Minimum Count | Fields |
|----------|--------------|--------|
| Weather descriptions | 80 | season, severity, text |
| Dialogue lines (per named character) | 20 each (140 total) | character, context, mood, text |
| Newspaper headlines | 60 | season, topic, urgency, headline, body |
| Settlement dialogues | 40 | character, outcome (favorable/unfavorable), text |

**Total minimum:** 320 templates. *[PROVISIONAL — minimum counts subject to adjustment based on playtest repetition feedback.]* Each template has a `cooldown` field (minimum days before reuse, default 5) and `weight` field (selection probability, default 1.0). Templates are tagged by context (season, character, severity, asset) and selected via weighted random sampling from the eligible (non-cooled-down) set.

**Content exit criterion:** The template library is considered complete when a Monte Carlo simulation of 100 full campaigns (90 days each, randomized weather seeds) produces a per-player repetition rate below 8% — meaning fewer than 8% of the narrative events a player encounters in a single campaign are exact repeats of earlier events in that same campaign. This is tested by running the translation layer's template selection algorithm in isolation with realistic event frequencies. If the repetition rate exceeds 8% for any category (weather, dialogue, headlines, settlement), that category's minimum count must increase until the threshold is met.

**Template exhaustion fallback:** If all eligible templates for a given context are on cooldown (e.g., all 20 dialogue lines for Dmitri in context "settlement/favorable" have been used within their cooldown window), the system selects the template with the *oldest* last-use timestamp — the one whose cooldown expired least recently. This guarantees the translation layer never fails to produce an event. A console warning is logged (`TEMPLATE_POOL_EXHAUSTED: {category, context, cooldown_override_count}`) to flag categories that need more content. In integration tests, exhaustion warnings are treated as test failures.

### Presentation Layer (Top Layer)

Receives only game events (the `GameEvent` union from §10a). Knows about:
- Ingredients, flavors, recipes
- Characters and their personalities
- Weather, seasons, time of day
- The shop's physical space
- Tools and their visual behaviors
- Sound design triggers

Does NOT know about:
- Options, forwards, futures
- Greeks (by name or concept)
- Strike prices, premiums, expiration dates
- Volatility models, pricing formulas
- Any financial terminology whatsoever

### Extensibility

Because the layers are decoupled:

- **New pricing model:** Replace Black-Scholes with Heston, SABR, or a custom model. Translation and presentation layers unchanged.
- **New asset:** Add "Coffee" as asset #5. Translation layer needs new ingredient mappings and supplier character. Presentation layer needs a new shelf slot and flavor art. Engine unchanged.
- **New scenario type:** Add "supply chain disruption" events. Engine generates them based on configurable probability. Translation layer converts to "the shipping route is blocked" narrative. Presentation shows a news headline and delayed deliveries.
- **Different setting:** Replace ice cream with coffee, flowers, or bread. Only the translation and presentation layers change. The engine remains identical.

---

## 10a. Core Types & Interfaces

All types below are defined in `src/engine/types.ts` and imported by the engine, translation layer, and game layer as needed. The engine layer imports only the engine-specific types. The game layer imports only `GameEvent` and `GameState`. The translation layer imports both.

```typescript
// ─── ASSET ────────────────────────────────────────────────

type AssetId = 'asset_0' | 'asset_1' | 'asset_2' | 'asset_3';

interface AssetConfig {
  id: AssetId;
  basePrice: number;           // starting price at Day 1
  volatility: number;          // σ for GBM
  drift: number;               // μ for GBM
  meanReversionSpeed: number;  // θ for O-U process
  meanReversionStrength: number; // κ for O-U process
  seasonalAmplitude: number;   // A for seasonal drift
  seasonalPhase: number;       // φ for seasonal drift (radians, 0 = peak at Day 1)
  jumpRate: number;            // λ for Merton jump diffusion (jumps per day)
  jumpMean: number;            // μ_J for log-normal jump size
  jumpStd: number;             // σ_J for log-normal jump size
}

// ─── CONTRACT ─────────────────────────────────────────────

type ContractId = string;      // e.g., 'contract_047'

enum ContractType {
  Forward = 'forward',
  EuropeanCall = 'european_call',
  EuropeanPut = 'european_put',
  AmericanCall = 'american_call',
  AmericanPut = 'american_put',
}

interface Contract {
  id: ContractId;
  type: ContractType;
  underlying: AssetId;
  strike: number;              // agreed price
  expiry: number;              // day number
  direction: 'long' | 'short';
  quantity: number;            // in tubs
  premium: number;             // upfront fee paid (0 for forwards)
  counterparty: AgentId;
  compoundGroup?: string;      // links sub-slips in Kazik deals
}

// ─── GREEKS ───────────────────────────────────────────────

interface Greeks {
  delta: number;
  gamma: number;
  theta: number;    // daily decay
  vega: number;
  rho: number;
}

// ─── AGENTS ───────────────────────────────────────────────

type AgentId = 'marta' | 'tomek' | 'zosia' | 'chen' | 'dmitri'
             | 'agnes' | 'kazik' | 'nadia' | 'crowd';

interface AgentConfig {
  id: AgentId;
  riskTolerance: number;       // 0–1 scale
  priceSensitivity: number;    // how much price affects behavior
  informationQuality: number;  // 0–1, Zosia = 0.65
  dealFrequency: number;       // avg days between deals
  maxCounterOfferDelta: number; // % tolerance for counter-offers
  undercutFactor?: number;     // Nadia only: base undercut %
}

// ─── ENGINE EVENTS ────────────────────────────────────────

interface PriceUpdateEvent {
  type: 'priceUpdate';
  asset: AssetId;
  newPrice: number;
  oldPrice: number;
}

interface ContractExpiryEvent {
  type: 'contractExpiry';
  contract: Contract;
  outcome: {
    itm: boolean;
    payoff: number;
    exercised: boolean;
  };
}

interface AgentActionEvent {
  type: 'agentAction';
  agent: AgentId;
  action: 'proposeDeal' | 'exercise' | 'abandon' | 'adjustPrice';
  params: Record<string, unknown>;
}

interface VolatilityShiftEvent {
  type: 'volatilityShift';
  asset: AssetId;
  newVol: number;
  oldVol: number;
  trigger: 'seasonal' | 'event' | 'mean_reversion' | 'jump';
}

interface ScenarioResultEvent {
  type: 'scenarioResult';
  contractId: ContractId;
  paths: number[][];          // N paths × T steps
  statistics: {
    mean: number;
    p5: number;
    p95: number;
    maxLoss: number;
    maxGain: number;
  };
}

type EngineEvent =
  | PriceUpdateEvent
  | ContractExpiryEvent
  | AgentActionEvent
  | VolatilityShiftEvent
  | ScenarioResultEvent;

// ─── ENGINE API ───────────────────────────────────────────

interface EngineAPI {
  init(config: {
    assets: AssetConfig[];
    agents: AgentConfig[];
    seed: number;
    startDay: number;
    campaignLengthMultiplier?: number; // default 1.0; scales total days and day-based triggers (see §11)
  }): void;

  tick(): EngineEvent[];           // advance one day, return events

  submitAction(action: {
    type: 'acceptDeal' | 'declineDeal' | 'counterOffer' | 'tearUpDeal' | 'setPlayerPrice';
    contractId?: ContractId;
    newStrike?: number;            // for counter-offers
    asset?: AssetId;               // for setPlayerPrice
    price?: number;                // for setPlayerPrice — used by agent models (Nadia undercut)
  }): void;

  getState(): {
    day: number;
    prices: Record<AssetId, number>;
    portfolio: Contract[];
    pendingDeals: Contract[];      // proposed but not yet accepted
  };

  getGreeks(contractId?: ContractId): Greeks; // per-contract or portfolio aggregate

  runScenario(contractId: ContractId, numPaths?: number): ScenarioResultEvent;
}

// ─── GAME EVENTS (emitted by Translation Layer) ──────────

type GameEvent =
  | { type: 'supplierPriceChange'; ingredient: IngredientId; newCost: number; reason: string; supplierDialogue: string }
  | { type: 'dealProposed'; character: CharacterId; slip: DealSlip }
  | { type: 'dealSettlement'; character: CharacterId; dealSlip: string; outcome: 'collected' | 'expired' | 'walkaway'; dialogue: string; cashFlow: number }
  | { type: 'spotSale'; character: CharacterId | 'crowd'; ingredient: IngredientId; listedPrice: number; outcome: 'sold' | 'declined_by_customer' | 'declined_by_player'; revenue: number }
  | { type: 'restockOrder'; ingredient: IngredientId; quantity: number; costPaid: number; arrivalDay: number }
  | { type: 'freshnessDiscard'; ingredient: IngredientId; quantity: number; reason: 'expired' }
  | { type: 'standingOrderTriggered'; orderId: string; contractId: ContractId; character: CharacterId }
  | { type: 'weatherChange'; weatherType: string; severity: 'low' | 'medium' | 'high'; newsHeadline: string }
  | { type: 'barometerUpdate'; needle: number; zone: 'green' | 'amber' | 'red' }
  | { type: 'customerEnter'; character: CharacterId; mood: string }
  | { type: 'customerLeave'; character: CharacterId; satisfied: boolean }
  | { type: 'deliveryArrival'; ingredient: IngredientId; quantity: number }
  | { type: 'competitorPriceChange'; flavor: IngredientId; newPrice: number }
  | { type: 'eventAnnouncement'; eventName: string; daysUntil: number; headline: string }
  | { type: 'journalUnlock'; pageNumber: number }
  | { type: 'toolUnlock'; tool: ToolId }
  | { type: 'actTransition'; newAct: 1 | 2 | 3 }
  | { type: 'milestoneReached'; milestone: string; registerBalance: number };

// ─── GAME STATE ───────────────────────────────────────────

type IngredientId = 'vanilla' | 'chocolate' | 'strawberry' | 'mint_chip';
type CharacterId = 'marta' | 'tomek' | 'zosia' | 'chen' | 'dmitri' | 'agnes' | 'kazik' | 'nadia';
type ToolId = 'caliper' | 'spring' | 'magnifier' | 'barometer' | 'rho_dial';

enum DayPhase { Morning = 'morning', Midday = 'midday', Evening = 'evening' }

interface DealSlip {
  id: string;
  character: CharacterId;
  contractId: ContractId;
  displayText: string;
  tier: 1 | 2 | 3 | 4;
  paperStyle: 'cream' | 'notebook' | 'farm' | 'wax_sealed';
  pinnedDay: number;
  expiryDay: number;
  agreedPrice: number;
  quantity: number;
  fee: number;
  attachedTool?: ToolId;
  compoundGroup?: string;
}

interface GameState {
  day: number;
  phase: DayPhase;
  act: 1 | 2 | 3;
  register: number;                        // cash on hand
  inventory: Record<IngredientId, InventorySlot>;
  playerPrices: Record<IngredientId, number>; // player-set scoop prices (persist day to day)
  pendingDeliveries: PendingDelivery[];
  corkboard: DealSlip[];
  corkboardCapacity: number;               // 4, 8, or 12
  toolsOwned: ToolId[];
  toolsAvailable: ToolId[];                // unlocked for purchase
  journalPagesUnlocked: number[];
  backRoomUnlocked: boolean;
  mechanicsUnlocked: string[];             // e.g., 'newspaper', 'chocolate', 'deals'
  customersServedTotal: number;
  dealsCompletedTotal: number;
  competitorVisible: boolean;
  standingOrders: StandingOrder[];
}

// ─── INVENTORY & RESTOCKING ──────────────────────────────

interface InventorySlot {
  ingredient: IngredientId;
  tubs: TubStack[];                        // ordered freshest-first for FIFO
  totalQuantity: number;                   // sum of tubs[].quantity (convenience)
}

interface TubStack {
  quantity: number;
  stockedDay: number;                      // day the tubs were delivered
  freshness: 'fresh' | 'day_old' | 'two_day_old'; // computed from (currentDay - stockedDay)
  priceMultiplier: number;                 // 1.0 = fresh, 0.75 = day-old, 0.50 = two-day-old
}

interface PendingDelivery {
  id: string;
  ingredient: IngredientId;
  quantity: number;
  costPaid: number;                        // total cost, already deducted from register
  orderedDay: number;
  arrivalDay: number;                      // orderedDay + lead time
}

// ─── SPOT SALE ───────────────────────────────────────────

interface SpotSaleEvent {
  type: 'spotSale';
  character: CharacterId | 'crowd';
  ingredient: IngredientId;
  listedPrice: number;                     // player's set price
  customerWTP: number;                     // drawn from N(marketPrice, 0.15 × marketPrice)
  outcome: 'sold' | 'declined_by_customer' | 'declined_by_player';
  freshness: 'fresh' | 'day_old' | 'two_day_old';
  revenue: number;                         // listedPrice × priceMultiplier (0 if declined)
}

// ─── STANDING ORDER ──────────────────────────────────────

interface StandingOrder {
  id: string;
  condition: string;                       // display text for the player
  contractType: ContractType;
  ingredient: IngredientId;
  maxStrike: number;                       // max agreed price for forwards/calls
  minStrike?: number;                      // min floor price for puts
  autoAccept: boolean;
  createdDay: number;
}

// ─── SAVE FILE ────────────────────────────────────────────

interface SaveFile {
  version: string;                         // spec version, e.g., "3.4"
  checksum: string;                        // SHA-256 of JSON payload
  campaignLengthMultiplier: number;        // see §11; default 1.0
  engineState: ReturnType<EngineAPI['getState']>;
  translationMappings: {
    assetToIngredient: Record<AssetId, IngredientId>;
    agentToCharacter: Record<AgentId, CharacterId>;
    templateCooldowns: Record<string, number>;
  };
  gameState: GameState;
  replaySeed: number;
}

// ─── ZUSTAND STORE SHAPE ──────────────────────────────────

interface StoreState {
  engine: ReturnType<EngineAPI['getState']>;
  game: GameState;
  ui: {
    currentScene: 'shop' | 'backRoom';
    heldTool: ToolId | null;
    heldSlip: DealSlip | null;
    newspaperOpen: boolean;
    journalOpen: boolean;
    pauseMenuOpen: boolean;
    calculatorRunning: boolean;
  };
}
```

---

## 11. The 90-Day Campaign

**Revenue targets throughout this section refer to current cash register balance** (inclusive of starting capital, minus all expenditures on ingredients, tools, and renovations). The player's register is their score. A player who earns $50,000 gross but spent $40,000 on tools and stock has a register balance of $10,000 + starting capital. **Register balance = cash on hand only. Unrealized value of pending deals on the corkboard is not counted toward victory thresholds.**

**Campaign length multiplier (internal config):** The engine accepts an internal `campaignLengthMultiplier` parameter (default: 1.0) that scales the total campaign length and all day-based triggers proportionally. A value of 0.67 produces a 60-day campaign; a value of 1.33 produces a 120-day campaign. Revenue thresholds, act boundaries, character visit frequencies, restock lead times, and narrative template cooldowns all scale by this multiplier. This parameter is not player-facing — it exists to support rapid pacing adjustments during playtesting without restructuring acts or rewriting triggers. Revenue thresholds do not scale linearly with campaign length and must be re-tuned manually for any non-1.0 multiplier.

### Act 1: Survival (Days 1–30)

**Goal:** Reach $8,000 from starting capital of $2,000. *[PROVISIONAL — threshold subject to playtesting adjustment.]*

**Available mechanics:** Vanilla and chocolate only (Days 1–8), then all four flavors. Spot sales to walk-in customers. Mrs. Chen's advance orders (forward contracts). The newspaper. Weather reading through the window.

**Emotional tone:** Scrappy, intimate, small. Every sale feels meaningful. The shop is cozy but cramped. Warm light, rain outside, one customer at a time. The grandfather's journal opens with tender, encouraging entries.

**Learning goals:** Ingredient management, basic price reading, the concept of locking in a future price (forwards), the tension between "sell now" and "promise for later."

**Milestone reward:** Enough money to renovate the back room, unlocking Grandfather's desk and discovering the caliper.

### Act 2: Growth (Days 31–60)

**Goal:** Reach $30,000. *[PROVISIONAL]*

**Available mechanics:** All four flavors. Dmitri's reservations (call options). Agnes's freshness guarantees (put options). The caliper, spring, and magnifier. The corkboard fills up with multi-week commitments. Nadia's competing shop appears. The supplier board.

**Emotional tone:** Confident but challenged. The shop has expanded. More customers, more deals, more decisions. The player starts feeling the rhythm of the market — certain patterns in weather, customer behavior, and pricing become recognizable. The journal entries grow more complex, hinting at deeper strategies.

**Learning goals:** Asymmetric deals (options vs. forwards), time decay (watching deal slips age), price sensitivity (using the caliper), acceleration risk (the spring), protective strategies (Agnes's guarantees).

**Milestone reward:** Access to the full workshop, the barometer, and Uncle Kazik's compound deals.

### Act 3: Mastery (Days 61–90)

**Goal:** Reach $70,000 register balance to save the shop. *[PROVISIONAL]*

**Outcome tiers:** *[PROVISIONAL — all dollar thresholds below subject to playtesting adjustment.]*
- **$70,000+** = **Full success.** The bank examiner arrives, reviews the books, and declares the shop saved. The final journal page is a letter from Stanisław: "You understood." Credits roll over a montage of the shop through seasons. Post-credits: the companion manual is unlocked / linked if the player hasn't seen it.
- **$50,000–$69,999** = **Partial success.** The bank examiner arrives, pauses, and says: "It's not enough to clear the debt... but it's enough to buy time. You have another season." The journal's final page reads: "Almost. You're closer than I ever got. Try again." The player unlocks New Game+ with: the caliper available from Day 1 (still free), one additional journal page hinting at advanced strategies, and the same starting capital ($2,000). The ending cutscene shows the shop in winter, lights on, Marta visible through the window. Bittersweet, not punishing.
- **Below $50,000** = **Failure.** The bank examiner shakes their head. The journal's final page reads: "The shop was never the point. What you learned is yours to keep." The player unlocks New Game+ with the same benefits as partial success. The ending cutscene shows the shop with a "FOR SALE" sign, but through the window, the player's corkboard tools are visible on a desk — they took the knowledge with them.

**Capital allocation note:** The combined cost of all purchasable tools (Spring + Magnifier + Barometer + Rho Dial) is $35,000. A player who buys everything must generate over $105,000 in gross revenue to still save the shop. This is intentional: not all tools are required, and choosing which knowledge to invest in is itself a core strategic decision. A skilled player can save the shop with only the caliper (free) and one or two purchased tools. A player who buys everything needs to extract maximum value from that knowledge to compensate for the capital outlay.

**Available mechanics:** Everything. Standing orders (automation). The mechanical calculator (scenario analysis). Uncle Kazik's compound deals (multi-leg strategies). Town-wide events. The full Scottish Book with cipher puzzles. The Rho dial.

**Emotional tone:** Intense but empowered. The player has tools, knowledge, and a full corkboard. Days move faster. More customers, bigger deals, wilder weather. The journal entries become urgent — Stanisław's final pages reveal the full story of why the shop is in trouble and what he was really doing with his "system."

**Learning goals:** Portfolio management (balancing multiple deals across flavors), compound strategies, automation, scenario planning, systemic risk (when everything moves at once).

---

## 12. Cozy Failure — How Losses Feel

Every negative outcome in the game is a transformation, not a destruction.

| What Goes Wrong | What the Player Experiences | What Actually Happened |
|---|---|---|
| Ice cream not sold today | It melts slightly overnight — visual: softer colors, condensation. Can be sold tomorrow at a reduced price (75% of listed price, shown as a small "day-old" tag on the container). | Theta decay on a long position. |
| A deal goes against the player | The customer shows up and the player either loses some margin or the customer walks away disappointed. Tomek says "Eh, it happens. Stanisław lost money on chocolate every winter." | Option expired ITM against the player, or forward contract loss. |
| Ingredient prices spike | Agnes shows up looking apologetic: "The frost hit early, strawberries are double this week." The player can buy at the higher price, or skip strawberry for a few days. | Underlying asset price shock. |
| Too many commitments at once | The corkboard is physically full. No more deals can be pinned until some resolve. Story-critical characters wait outside and return the next day. The player can tear up a deal to free a slot (forfeiting any fee received). A natural cooling-off period. | Portfolio concentration limit. |
| Slow day, few customers | Rain on the window, quiet shop. Marta still comes. The player can use the quiet to study the journal, experiment with recipes, or reorganize the back room. | Low-liquidity trading session. |
| Complete collapse (worst case) | The player can always serve basic vanilla to Marta and a few regulars. Revenue slows to a trickle but never hits zero. The journal offers hints. Tomek offers encouragement. | The floor is the risk-free rate. |

The game must never trigger: game-over screens, penalty debt that blocks progress, alarm sirens, red flashing overlays, or explicit failure text (e.g., "You failed"). The worst outcome is *falling short* of the $70,000 goal — and even that unlocks New Game+ with new journal entries and a higher starting knowledge level.

**Overnight freshness degradation:** Unsold inventory loses freshness at the end of each day. Day-old stock is visually marked (softer colors, slight condensation on the container, a small handwritten "day-old" tag). Day-old stock can be sold at 75% of the player's listed price — the tag is visible to customers, and they accept the discount without complaint. Two-day-old stock degrades further to 50% and the container shows visible melt. Stock older than two days is discarded automatically during the morning phase (container empties with a quiet *sigh* sound). This degradation applies only to stocked inventory, not to incoming deliveries. Deal fulfillment uses freshest available stock first (FIFO).

---

## 12a. Settlement Rules

Settlement occurs during the evening phase on a deal's expiry day. Each contract type settles differently:

### Forward Contracts (Mrs. Chen)

**Full fulfillment:** Player has ≥ required quantity of the ingredient → ingredient is deducted, player receives the agreed price × quantity. Cash register updates.

**Partial fulfillment:** Player has some but not all required tubs → the player delivers what they have at the agreed price. The shortfall incurs a penalty of 1.5× the current market price per missing tub (representing Mrs. Chen sourcing the remainder elsewhere and billing the player). Cash register deducts the penalty. Mrs. Chen's dialogue reflects disappointment: "I had to buy the rest from Nadia. That wasn't cheap."

**Zero inventory:** The full quantity is penalized at 1.5× market price per tub. Mrs. Chen's dialogue: "I trusted you. I won't forget this." (Her next deal's `maxCounterOfferDelta` decreases by 5%, making her harder to negotiate with.)

### Call Options (Dmitri's Reservations)

**ITM (current price > strike):** Dmitri exercises. Ingredient is deducted at the strike price. Player keeps the premium. Net cash flow = (strike × quantity) + premium − (current cost × quantity if restocking).

**OTM (current price ≤ strike):** Dmitri walks away. "Eh, not worth it today. Keep the five dollars." Player keeps the premium. No inventory change.

**Insufficient inventory when exercised:** Same partial-fulfillment rule as forwards — deliver what's available, pay 1.5× market for the shortfall.

### Put Options (Agnes's Guarantees)

**ITM (current price < strike):** Agnes buys back the unsold stock at the guaranteed floor price. Player sells the specified quantity to Agnes at the strike. If the player doesn't have the quantity, the contract settles on whatever the player has (no shortfall penalty on puts — Agnes is offering a floor, not demanding delivery).

**OTM (current price ≥ strike):** The guarantee expires unused. Agnes: "Good — your strawberries sold just fine without me." Player loses only the freshness fee (premium) paid upfront.

### Compound Deals (Uncle Kazik)

Each sub-slip settles independently according to its contract type. If one sub-slip in a compound deal has been torn up, the remaining sub-slips still settle normally.

### Gherkin Scenarios

```
GIVEN a forward contract for 20 tubs of vanilla due today
  AND the player has 15 tubs of vanilla
  AND current vanilla market price is $3.00
  AND the agreed forward price is $2.50
WHEN evening settlement runs
THEN 15 tubs are deducted from inventory
  AND player receives 15 × $2.50 = $37.50
  AND player pays shortfall penalty of 5 × ($3.00 × 1.5) = $22.50
  AND net cash flow = $37.50 − $22.50 = $15.00

GIVEN a call option (Dmitri) for 10 tubs of chocolate at strike $2.00
  AND current chocolate market price is $2.80
  AND the player has 10 tubs
WHEN evening settlement runs
THEN Dmitri exercises
  AND 10 tubs are deducted from inventory
  AND player receives 10 × $2.00 = $20.00

GIVEN a put option (Agnes) for 8 tubs of strawberry at strike $1.50
  AND current strawberry market price is $1.80
WHEN evening settlement runs
THEN option expires OTM
  AND no inventory changes
  AND Agnes dialogue: "Your strawberries sold fine without me."
```

---

## 13. Visual Identity

### Color Palette

- **Shop interior:** Warm amber, dark walnut wood, cream walls, brass hardware. Tungsten-warm lighting. Cozy and slightly aged.
- **Window/exterior:** Pacific Northwest palette — deep greens, slate grays, misty whites, occasional golden sunbeams. Seasonal variation: autumn golds, winter blue-grays, spring pastels, summer greens.
- **Ice cream:** The most saturated colors in the game. Vanilla is warm cream-gold. Chocolate is deep mahogany. Strawberry is vivid pink. Mint chip is electric green. These pop against the muted shop interior.
- **Deal slips:** Off-white, kraft paper, slight yellowing with age. Mrs. Chen's are formal (cream cardstock). Dmitri's are casual (torn notebook paper). Agnes's are stamped with a farm logo. Uncle Kazik's are elaborate (folded, sealed with wax).
- **Tools:** Brass, steel, glass. They catch the light. They feel heavy and real.

### Art Style

Illustrated, not photorealistic. Textured and tactile — the player should feel like they could touch the wood grain, feel the brass warmth, smell the ice cream. Characters are simple but expressive — readable emotions without excessive detail.

**Art direction is defined by the mood board deliverable (item 4 below), which is normative.** Reference touchpoints: Potion Craft's textured surfaces, Unpacking's warm object detail, Spiritfarer's character warmth, Night in the Woods' expressive simplicity.

### Reference Art & Wireframes

The following reference materials should be produced before development begins *(not included in this spec — deliverable for the art direction phase):*

1. **Shop layout wireframe:** Top-down and player-perspective views showing the spatial relationship between the counter, window, ingredient shelf, corkboard, and back room doorway. Annotate interactive zones and click targets.
2. **Deal slip mockups:** One example slip for each tier (Mrs. Chen's forward order, Dmitri's reservation, Agnes's guarantee, Uncle Kazik's compound deal) showing paper style, typography, and the slider/counter-offer interaction area.
3. **Tool reference sheet:** Each tool shown at rest on Grandfather's desk, attached to a deal slip, and in its active reading state (spinning gears, vibrating spring, dripping magnifier, barometer needle positions).
4. **Mood board:** 8–10 reference images capturing the target aesthetic — annotated with which visual elements to draw from each. Must include 2–3 music reference tracks for the ambient soundtrack.

### Typography

All in-game text uses a single handwritten-style font (the grandfather's handwriting) for the journal, and a clean serif for the newspaper. Price tags use a vintage label-maker font. No sans-serif, no digital fonts, no monospace. Everything looks like it belongs in a shop from 1985.

---

## 14. Technical Stack

| Component | Choice | Reasoning |
|-----------|--------|-----------|
| Language | TypeScript | Single-language simplicity |
| Rendering | HTML Canvas or PixiJS | 2D, textured, high-performance sprite rendering |
| State | Zustand | Lightweight, works with vanilla TS. Store shape defined in §10a. |
| Build | Vite | Fast dev iteration |
| Audio | Howler.js | Cross-platform audio with spatial positioning |
| Platform | Web-first PWA | Accessible everywhere, mobile-responsive later |
| Simulation | Pure TypeScript module | No framework dependency, fully testable in isolation |
| Translation | Event bus (mitt or custom) | Decouples engine from presentation cleanly. See §10a for event types. |

### Project Structure

```
sundae-volatility/
├── src/
│   ├── engine/              # THE SIMULATION (knows nothing about ice cream)
│   │   ├── types.ts         #   Core types from §10a (shared across layers)
│   │   ├── assets.ts        #   Asset definitions & price models
│   │   ├── contracts.ts     #   Contract types & lifecycle
│   │   ├── greeks.ts        #   Greeks calculations
│   │   ├── pricing.ts       #   Black-Scholes & pricing functions
│   │   ├── agents.ts        #   Market agent behaviors
│   │   ├── scenarios.ts     #   Monte Carlo & scenario generation
│   │   └── engine.ts        #   Main engine loop & event bus (implements EngineAPI)
│   │
│   ├── translation/         # THE BRIDGE (maps finance to ice cream)
│   │   ├── flavorMap.ts     #   Asset → ingredient/flavor mapping
│   │   ├── characterMap.ts  #   Agent → NPC character mapping
│   │   ├── eventMap.ts      #   Engine event → game event mapping
│   │   ├── narrativeBank.ts #   Dialogue, headlines, weather descriptions (320+ templates)
│   │   └── translator.ts    #   Main translation orchestrator
│   │
│   ├── game/                # THE SHOP (knows nothing about finance)
│   │   ├── shop.ts          #   Shop state, inventory, register
│   │   ├── customers.ts     #   Character behaviors & dialogue
│   │   ├── deals.ts         #   Deal slips, corkboard, commitments
│   │   ├── settlement.ts    #   Settlement rules from §12a
│   │   ├── tools.ts         #   Caliper, spring, magnifier, barometer
│   │   ├── journal.ts       #   Scottish Book progression & ciphers
│   │   ├── weather.ts       #   Weather state & visual mapping
│   │   ├── progression.ts   #   Unlock triggers & act transitions
│   │   └── save.ts          #   Save/load with checksum
│   │
│   ├── ui/                  # THE PIXELS (rendering & interaction)
│   │   ├── renderer.ts      #   Canvas/Pixi rendering pipeline
│   │   ├── shopView.ts      #   Main shop scene
│   │   ├── backRoom.ts      #   Grandfather's desk scene
│   │   ├── animations.ts    #   Tool animations, weather, transitions
│   │   ├── audio.ts         #   Sound design system
│   │   └── input.ts         #   Click, drag, interact handlers
│   │
│   ├── store/               # GLOBAL STATE
│   │   └── gameStore.ts     #   Zustand store (implements StoreState from §10a)
│   │
│   └── main.ts              #   Entry point
│
├── manual/                  # THE COMPANION (external finance education)
│   ├── chapters/
│   └── diagrams/
│
├── tests/
│   ├── engine/              #   Pure math tests (no game knowledge)
│   ├── translation/         #   Mapping correctness tests
│   ├── game/                #   Game logic tests (no finance knowledge)
│   └── integration/         #   Full pipeline tests (engine → translation → game)
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

### Testing Philosophy

The decoupled architecture enables a critical testing property: **the engine tests use only financial terms, and the game tests use only ice cream terms.** If a game test ever references "delta" or "option," the architecture has leaked. If an engine test ever references "vanilla" or "customer," the abstraction is broken.

### Integration Testing

In addition to layer-isolated unit tests, the test suite must include **pipeline integration tests** that verify the full event flow: engine event → translation → game event → correct presentation behavior. These tests are the primary defense against mapping errors (e.g., a price spike on asset_2 producing a dialogue about vanilla instead of strawberry). Integration tests should cover at minimum:

- One complete day cycle (morning → midday → evening) with at least one price update, one deal proposal, and one settlement, verifying that the correct characters, ingredients, and dialogues appear.
- Each contract type (forward, European call, European put) settling ITM and OTM, verifying the correct settlement dialogue and cash flow.
- A volatility shift producing the correct weather change and barometer update.
- A compound deal (Kazik) with partial acceptance, verifying that accepted and declined sub-slips route correctly through settlement.

Integration tests use game-world assertions ("Mrs. Chen arrives and says something about vanilla") rather than engine-world assertions ("contract_047 settles ITM"), but they seed the engine with known parameters to produce deterministic outcomes.

---

## 14a. Build Sequencing

Implementation proceeds in phases. Each phase produces independently verifiable output before the next begins. Phases within a tier can be parallelized.

### Tier 1 — Engine (no game knowledge required)

1. **Price engine:** GBM, O-U, seasonal drift, Merton jump diffusion. Tested with deterministic seeds producing known price paths.
2. **Contract lifecycle:** Create, price (Black-Scholes), calculate Greeks, expire. Tested with known option parameters producing known values.
3. **Agent system:** Behavioral models for all agent types. Tested in isolation: given a price state and agent config, verify proposed deals match expected parameters.
4. **Scenario generator:** Monte Carlo path generation. Tested by verifying statistical properties (mean, variance, percentiles) of generated paths against analytic expectations.

**Verification gate:** All engine tests pass using only financial terminology. No game-world concepts appear in any test file.

### Tier 2 — Translation (requires Tier 1)

5. **Flavor/character/event mapping:** Asset → ingredient, agent → character, engine event → game event. Tested by feeding known engine events and asserting correct game events emerge.
6. **Narrative template system:** Template selection, cooldown management, exhaustion fallback. Tested by simulating 100 campaigns and verifying the 8% repetition ceiling.

**Verification gate:** All translation tests reference both financial and game terms (they are the bridge). Template exhaustion tests produce zero warnings for the 320-template minimum.

### Tier 3 — Game Logic (requires Tier 2, parallelizable with Tier 4)

7. **Shop state:** Inventory with freshness tracking (FIFO), register, restocking, price-setting. Tested by simulating multi-day sequences and verifying correct degradation, delivery arrival, and cash flow.
8. **Deal mechanics:** Corkboard, pinning, tear-up, capacity limits. Settlement rules (§12a) for all contract types. Tested with the Gherkin scenarios from §12a.
9. **Progression system:** Trigger evaluation, unlock ordering, same-day multi-trigger resolution. Tested by simulating edge-case day sequences (e.g., three triggers satisfied simultaneously).
10. **Spot sale system:** WTP generation, customer reaction thresholds, revenue calculation. Tested with known prices and seeds.
11. **Standing orders:** Creation, matching, auto-acceptance, capacity limit (3). Tested by proposing deals that should and should not match.

**Verification gate:** All game tests use only ice cream terminology. No financial terms appear in any test file.

### Tier 4 — Presentation (requires Tier 2, parallelizable with Tier 3)

12. **Shop scene:** Counter, window, ingredient shelf, corkboard, price tags. Interaction handlers for scoop, pin, drag, slide, tear.
13. **Back room scene:** Desk, journal, tools, barometer, calculator, standing order cards.
14. **Weather and animation:** Window weather effects, day-phase transitions, tool animations (caliper gears, spring vibration, magnifier drip).
15. **Audio system:** Ambient layers, interactive sounds, register pitch variation, tool audio.

**Verification gate:** A player can complete Day 1 (serve Marta vanilla) end-to-end in a browser.

### Tier 5 — Integration (requires Tiers 3 and 4)

16. **Full pipeline integration tests:** Engine → translation → game → presentation for the minimum scenarios defined in §14 Integration Testing.
17. **Save/load system:** IndexedDB with localStorage fallback, checksum validation, export/import.
18. **Content production:** 320+ narrative templates, journal pages, newspaper content. Verified against the 8% repetition ceiling.
19. **Performance verification:** All §15 targets met on reference hardware.

### Provisional Items — Dependency Map

The following [PROVISIONAL] items are grouped by dependency. Items in the same group are coupled: changing one likely requires re-evaluating the others. Items in different groups are independent and can be playtested separately.

**Group A — Pacing & Economy (tightly coupled):**
- Act 1/2/3 revenue thresholds (§11): $8K / $30K / $70K
- Outcome tier thresholds (§11): $50K partial, $70K full
- Starting capital ($2,000)
- Tool prices (§6): $3K / $7K / $15K / $10K
- Campaign length multiplier (§11)

*Dependency:* Changing any revenue threshold cascades to tool affordability. Changing tool prices cascades to the capital allocation dilemma and outcome feasibility. These must be playtested as a system, not individually.

**Group B — Progression Triggers (loosely coupled to Group A):**
- Newspaper trigger: ≥ 10 customers AND ≥ 3 days (§5)
- Chocolate trigger: revenue ≥ $500 AND ≥ 15 customers (§5)
- First deal trigger: ≥ 30 customers AND balance ≥ $1,500 AND ≥ 2 flavors (§5)
- Strawberry trigger: Day ≥ 14 AND revenue ≥ $2,500 (§5)
- Mint chip trigger: strawberry unlocked AND revenue ≥ $3,000 AND ≥ 25 customers (§5)
- Dmitri trigger: ≥ 2 completed Mrs. Chen deals (§5)
- Back room trigger: balance ≥ $5,000 AND ≥ 2 deals (§5)
- Caliper trigger: back room AND ≥ 3 active deals (§5)
- Workshop trigger: balance ≥ $15,000 AND ≥ 8 deals AND all flavors (§5)
- Rho Dial trigger: balance ≥ $20,000 AND barometer owned (§5)
- Act 3 trigger: balance ≥ $30,000 AND ≥ 15 deals AND barometer owned (§5)

*Dependency:* Revenue-based triggers depend on Group A thresholds. Customer-count triggers are independent. Prerequisite chains (e.g., strawberry → mint chip → Kazik) create a fixed ordering that constrains how far triggers can be moved. Playtest these in sequence — skipping a mid-chain trigger invalidates all downstream triggers.

**Group C — Corkboard Capacity (independent):**
- Act 1 = 4 slips, Act 2 = 8 slips, Act 3 = 12 slips (§3)

*Dependency:* Capacity interacts with deal frequency and standing orders, but not with revenue thresholds. Can be playtested independently.

**Group D — Narrative Content (independent):**
- Template minimum counts: weather 80, dialogue 140, headlines 60, settlement 40 (§10)

*Dependency:* Only constrained by the 8% repetition ceiling. Independent of all other groups.

---

## 15. Performance & Polish Targets

All performance targets are P99, measured on a 2020-era mid-range laptop (Intel i5-1035G1, 8GB RAM) running Chrome, after initial page load.

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Option pricing | < 1ms | Keeps simulation tick invisible |
| Greeks (full portfolio) | < 5ms | Tools update in real-time when attached |
| Frame rate | 60fps | Smooth animations, weather, tool behaviors |
| Interaction response | < 50ms | Every click, pin, and scoop feels instant |
| Calculator delay | 3–5 seconds | *Intentional* artificial latency for dramatic effect |
| Audio latency | < 20ms | Register ring, door bell, and tool sounds must feel coupled to actions |
| Save/load | < 200ms | Transparent to the player |
| Initial load | < 3 seconds | Player sees the shop window before anything else loads |

---

## 15a. Save System

The save system must be invisible during normal play and robust across sessions that may span weeks of real time.

**Autosave:** The game autosaves at the end of every in-game day (during the evening-to-morning transition). The save happens during the visual transition and completes within the < 200ms target. A small brass clock icon spins briefly in the corner of the window during saves.

**Manual save:** Accessed via the bell on the counter (pause screen). Three save slots, labeled by in-game day number and register balance (e.g., "Day 34 — $12,400"). The player can save to any slot, overwriting previous data with a confirmation prompt.

**Save format:** JSON serialized to IndexedDB (preferred) with localStorage as fallback if IndexedDB is unavailable. Storage selection is automatic: the game attempts IndexedDB first; if the open request fails, it falls back to localStorage and logs a console warning. The save format follows the `SaveFile` interface defined in §10a. Includes a SHA-256 checksum to detect tampering.

**Checksum validation behavior:** On load, the game computes the checksum of the loaded JSON payload and compares it to the stored checksum. If they do not match, the game displays a modal: "This save file appears to have been modified. Load anyway?" with two options: "Load (unverified)" and "Cancel." In institutional deployments (see §15c), the tampered flag is recorded in telemetry and the "Load anyway" option can be disabled via configuration.

**Cloud sync:** Post-launch consideration. V1 is local-only. The save format is designed to be portable (JSON, < 100KB) so cloud sync can be added without migration.

**Save export to file:** The pause screen includes an "Export Save" button that downloads the current save as a `.json` file to the player's local filesystem. An "Import Save" button accepts a previously exported `.json` file, validates its checksum, and loads it. This protects against the most common data loss scenarios on shared machines (browser storage cleared between sessions, private/incognito browsing, device switches). The export file follows the `SaveFile` interface defined in §10a. On import, the same checksum validation behavior described above applies.

---

## 15b. Instrumentation & Analytics

For a game with educational aspirations, measuring what players learn is as important as measuring what they do.

**Gameplay telemetry (opt-in):** Every deal accepted/declined, tool attachment, price change observed, and deal outcome is logged with timestamps. This produces a complete decision history that can be analyzed for learning patterns. No personally identifiable information is collected. Telemetry is opt-in via a clear toggle on the pause screen.

**Educational metrics:** The following are computed from telemetry and available for institutional deployments:

- **Deal quality over time:** Are the player's accepted deals becoming more profitable? (Proxy for developing intuition about option value.)
- **Tool usage correlation:** Does caliper usage before deal acceptance correlate with better outcomes? (Proxy for understanding price sensitivity.)
- **Barometer response:** Does the player adjust deal fees when the barometer is high? (Proxy for understanding volatility.)
- **Time-to-decision:** How long does the player spend evaluating deals over the course of the campaign? (Proxy for developing analytical habits.)

**Export:** Institutional deployments can export anonymized session data as CSV for research purposes.

---

## 15c. Institutional Deployment

For classroom and institutional use, the game supports the following modes *(post-launch roadmap — not required for V1, see §17 Non-Goals):*

**Instructor dashboard:** A separate web interface where an instructor can view aggregate class statistics: average deal quality, tool adoption rates, campaign progress distribution, and common failure patterns. No individual student data is visible by default; students opt in to share their anonymized session.

**Cohort mode:** Students in the same class can be grouped into a cohort. The instructor can set shared parameters (e.g., identical weather seeds) so that all students face the same market conditions, enabling meaningful comparison and discussion.

**Session export:** Each student's decision history can be exported as a structured report mapping their in-game actions to financial concepts (using the manual's terminology). This serves as a portfolio of demonstrated understanding.

**LMS integration:** Not in V1 scope. If pursued post-launch, the game would report a completion score and a set of competency flags (e.g., "demonstrated understanding of time decay," "used protective strategies effectively") to standard LMS systems via LTI. Requirements will be determined by institutional partner needs.

---

## 16. What Success Looks Like

**For the casual player:** "I had fun running an ice cream shop. The weather was pretty, the customers were charming, and I figured out how to make deals work in my favor. I saved the shop."

**For the curious player:** "I noticed that when I looked at deals with the caliper, I could predict which ones would be profitable. The magnifier taught me that waiting too long to act costs money. I started reading the barometer before making big promises. I felt like I discovered something."

**For the manual reader:** "Oh my god. The caliper is delta. The melting ice cream is theta. Mrs. Chen's advance orders are forward contracts. Dmitri's reservations are call options. Agnes's guarantees are puts. I just played through an entire derivatives trading course and I didn't even notice."

**For the institution:** "This is the most effective tool for teaching intuitive derivatives understanding we've ever seen. Students who play it for 4 hours score higher on conceptual comprehension than students who take our 12-week course."

---

## 17. Non-Goals (V1)

The following are explicitly **out of scope** for V1. They may be pursued post-launch but must not influence V1 architecture decisions except where the spec notes "designed to accommodate."

1. **Multiplayer / co-op mode.** The game is single-player only.
2. **Cloud save sync.** V1 is local-only. The save format is designed to be portable for future sync.
3. **Mobile-native builds (iOS/Android).** V1 is web-first PWA. Mobile-responsive layout is a stretch goal, not a requirement.
4. **LMS integration (LTI).** See §15c. Depends on institutional partner requirements.
5. **Instructor dashboard.** See §15c. Post-launch roadmap.
6. **Cohort mode.** See §15c. Post-launch roadmap.
7. **Localization / internationalization.** V1 is English-only. The narrative template system (§10) is designed to accommodate future i18n by replacing template banks.
8. **Mod support / custom scenarios.** Not supported. The engine's configurability (§10) is for internal development, not player-facing.
9. **Accessibility beyond visual redundancy.** Screen reader support, full keyboard navigation, and colorblind modes are desirable but not V1 requirements. The §9 visual redundancy system is the V1 accessibility baseline. See §9 "Accessibility Extension Plan (Post-V1)" for the documented extension path if institutional partners require WCAG 2.1 AA compliance.
10. **Premium edition / physical manual.** The companion manual (§8) is digital-only for V1.

---

*Sundae Volatility v3.4 | March 2026*
*A game about ice cream. And also about everything else.*

---

## Changelog — v3.3 → v3.4

All changes below address findings from a design-practice review (6-phase framework) conducted against v3.3.

| # | ID | Severity | Section | Change |
|---|-----|----------|---------|--------|
| 1 | DPR-001 | CRITICAL | §0 (rewrite) | Expanded Problem Statement with observed symptoms, signal sources, formalized root cause (abstraction gap), and four tested-and-ruled-out alternative hypotheses |
| 2 | DPR-002 | CRITICAL | §0a (new) | Added Direction section with decision matrix comparing five approaches (status quo, interactive simulator, narrative RPG, Sundae Volatility, micro-simulations) across six criteria, with rationale and accepted trade-offs |
| 3 | DPR-003 | CRITICAL | §2 | Added price-setting interaction design: morning-phase price tags with label-maker slider, $0.25 increments, $0.50–$10.00 range, carry-forward default |
| 4 | DPR-004 | CRITICAL | §2 | Added spot sale economics: WTP distribution (N(marketPrice, 0.15 × marketPrice)), customer reaction thresholds (frown > WTP, heart-eyes < 70% WTP), revenue = listed price × freshness multiplier |
| 5 | DPR-005 | CRITICAL | §3 | Added restocking interaction design: morning-phase order card, quantity dial, delivery tag with arrival day, prepayment model, morning-only constraint |
| 6 | DPR-006 | HIGH | §5 | Added standing order interaction design: punch cards with three rotating wheels (ingredient, deal type, price threshold), max 3 active, do not count toward corkboard capacity |
| 7 | DPR-007 | HIGH | §5 | Added mechanical calculator output specification: three weather-scenario bars (sun/clouds/storm) with left/right profit/loss extension, plus "expected haul" number; printout pinnable to corkboard |
| 8 | DPR-008 | HIGH | §10 | Added content exit criterion: 8% per-campaign repetition ceiling, verified by Monte Carlo simulation of 100 campaigns |
| 9 | DPR-009 | HIGH | §10 | Added template exhaustion fallback: oldest-last-used selection when all eligible templates are on cooldown, with console warning logged and treated as integration test failure |
| 10 | DPR-010 | HIGH | §10a | Added `InventorySlot`, `TubStack`, `PendingDelivery`, `SpotSaleEvent` types; expanded `GameState` with freshness-tracked inventory, `playerPrices`, `pendingDeliveries`; expanded `StandingOrder` with `minStrike` and `createdDay` |
| 11 | DPR-011 | HIGH | §10a | Added `spotSale`, `restockOrder`, `freshnessDiscard`, `standingOrderTriggered` to `GameEvent` union type |
| 12 | DPR-012 | HIGH | §10a | Added `setPlayerPrice` action to `EngineAPI.submitAction` for Nadia competitive model integration |
| 13 | DPR-013 | HIGH | §12 | Replaced ambiguous "milkshakes" mention with specified freshness degradation: 75% day-old, 50% two-day-old, discarded after two days; FIFO settlement; overnight visual progression |
| 14 | DPR-014 | HIGH | §14a (new) | Added build sequencing plan: 5 tiers (Engine → Translation → Game Logic ∥ Presentation → Integration) with 19 numbered phases and verification gates |
| 15 | DPR-015 | HIGH | §14a (new) | Added provisional items dependency map: 4 groups (Pacing & Economy, Progression Triggers, Corkboard Capacity, Narrative Content) with coupling analysis |
| 16 | DPR-016 | LOW | Frontmatter | Version bump to 3.4; updated change-id and last-reviewed date |

---

## Changelog — v3.2 → v3.3

All changes below address findings from an optionality review conducted against v3.2.

| # | ID | Severity | Section | Change |
|---|-----|----------|---------|--------|
| 1 | OPT-001 | HIGH | §9 (new subsection) | Added Accessibility Extension Plan (Post-V1) with keyboard navigation, screen reader, and reduced motion paths |
| 2 | OPT-002 | HIGH | §14 (new subsection) | Added Integration Testing section requiring full pipeline tests (engine → translation → game) with minimum coverage scenarios |
| 3 | OPT-003 | HIGH | §14 | Added `tests/integration/` directory to project structure |
| 4 | OPT-004 | HIGH | §15a | Added save export/import to file (JSON download/upload) for data loss protection on shared machines |
| 5 | OPT-005 | HIGH | §11 | Added campaign length multiplier internal config parameter (default 1.0) for playtesting pacing adjustments |
| 6 | OPT-006 | MEDIUM | §10a | Added `campaignLengthMultiplier` to EngineAPI init config and SaveFile interface |
| 7 | OPT-007 | MEDIUM | §3 | Marked corkboard capacity limits (4/8/12) as [PROVISIONAL] |
| 8 | OPT-008 | MEDIUM | §5 | Marked all progressive disclosure triggers as [PROVISIONAL]: newspaper, chocolate, first deal, strawberry, mint chip, Dmitri, back room, caliper, workshop entry, Rho Dial, Act 3 |
| 9 | OPT-009 | MEDIUM | §6 | Marked tool prices as [PROVISIONAL] with capital allocation constraint note |
| 10 | OPT-010 | MEDIUM | §10 | Marked narrative template minimum counts as [PROVISIONAL] |
| 11 | OPT-011 | MEDIUM | §11 | Marked Act 1, Act 2, and Act 3 revenue goals and all outcome tier thresholds as [PROVISIONAL] |
| 12 | OPT-012 | LOW | §17 | Updated accessibility non-goal (item 9) to cross-reference §9 Accessibility Extension Plan |
| 13 | OPT-013 | LOW | Frontmatter | Version bump to 3.3; updated change-id and last-reviewed date |

---

## Changelog — v3.1 → v3.2

All changes below address findings from a Rule of 5 review conducted against v3.1.

| # | ID | Severity | Section | Change |
|---|-----|----------|---------|--------|
| 1 | INT-001 | CRITICAL | §10a (new) | Added Core Types & Interfaces section with full TypeScript definitions for Asset, Contract, Greeks, GameState, SaveFile, EngineAPI, and all event payloads |
| 2 | INT-002 | CRITICAL | §10a (new) | Defined complete GameEvent union type and NarrativeTemplate schema with minimum counts per category |
| 3 | INT-003 | HIGH | §5, §15c | Replaced TBDs: §5 Days 40–60 thresholds marked [PROVISIONAL]; §15c LMS marked "Not in V1 scope" |
| 4 | INT-004 | HIGH | §14 | Added cross-references to §10a in project structure annotations and tech stack table |
| 5 | INT-005 | MEDIUM | Frontmatter | Added YAML frontmatter with change-id, version, status, author, last-reviewed |
| 6 | INT-006 | MEDIUM | §0 (new) | Added Problem Statement section with strategic rationale |
| 7 | SPEC-001 | CRITICAL | §10 | Split price engine into four explicit sub-models (GBM, O-U, seasonal, Merton) with named parameters |
| 8 | SPEC-002 | CRITICAL | §4 | Replaced "roughly 65%" with Bernoulli p=0.65 per-tip with expected variance |
| 9 | SPEC-003 | HIGH | §11 | Defined partial success ending (cutscene, journal page, New Game+ details) |
| 10 | SPEC-004 | HIGH | §3 | Added Act 1 corkboard capacity (4 slips) |
| 11 | SPEC-005 | HIGH | §5 | Added explicit compound trigger for mint chip unlock |
| 12 | SPEC-006 | MEDIUM | §5 (new) | Added Rho Dial progressive disclosure trigger |
| 13 | SPEC-007 | MEDIUM | §3 | Added per-ingredient restock lead time table |
| 14 | SPEC-008 | MEDIUM | §2 | Clarified day progression is event-driven, not timed |
| 15 | SPEC-009 | LOW | §15 | Added P99 measurement methodology for performance targets |
| 16 | PREC-001 | HIGH | §1 | Rewrote "Decoupled and flexible" pillar with specific layer-change boundaries |
| 17 | PREC-002 | HIGH | §10 | Replaced "hundreds of templates" with minimum counts per category (320 total) |
| 18 | PREC-003 | MEDIUM | §7 | Changed "~90 pages" to "90 pages" with explicit mapping rule |
| 19 | PREC-004 | MEDIUM | §4 | Specified Kazik visit frequency (7–10 days uniform random, seeded) |
| 20 | PREC-005 | MEDIUM | §13 | Added "mood board is normative" statement for art direction |
| 21 | PREC-006 | MEDIUM | §9 | Added music spec: tempo range, key, dynamic range, reference track deliverable |
| 22 | PREC-008 | LOW | §12 | Removed subjective "punishing" — kept exhaustive list of prohibited feedback |
| 23 | BEHV-001 | CRITICAL | §3 | Defined tear-up rules: instant, same-day reuse, compound sub-slip independence |
| 24 | BEHV-002 | CRITICAL | §12a (new) | Added Settlement Rules section with full, partial, zero fulfillment logic and Gherkin scenarios |
| 25 | BEHV-003 | HIGH | §5 | Added trigger evaluation order and same-day multi-trigger resolution |
| 26 | BEHV-004 | HIGH | §4 | Added Nadia's competitive model: pricing algorithm and customer diversion rate |
| 27 | BEHV-005 | HIGH | §6 | Defined tool stacking conflict resolution (auto-detach existing, attach new) |
| 28 | BEHV-006 | MEDIUM | §3 | Specified emergency crate: 5 tubs/day, daily refill, no deal fulfillment |
| 29 | BEHV-007 | MEDIUM | §2 | Added counter-offer mechanics: tolerance range, max 2 counter-offers, walk-away threshold |
| 30 | BEHV-008 | MEDIUM | §15a | Defined checksum validation behavior: modal prompt, institutional override |
| 31 | BEHV-009 | LOW | §2 | Named characters wait indefinitely; walk-ins leave after 15 seconds |
| 32 | EXEC-004 | HIGH | §10a | Defined Zustand StoreState interface |
| 33 | EXEC-005 | HIGH | §17 (new) | Added Non-Goals (V1) section |
| 34 | EXEC-006 | MEDIUM | §11 | Clarified register balance = cash only, excludes unrealized deal value |
| 35 | EXEC-007 | MEDIUM | §2 | Specified compound deal sub-slips are independent (no dependency constraints) |
| 36 | EXEC-008 | LOW | §15a | Specified IndexedDB-first with localStorage fallback |


# ui-interactions Specification

## Purpose
Codifies the tactile input model, physical animation principles, sound-visual coupling, cross-room navigation, and accessibility interaction modes used to make interactions in the shop feel satisfying and material.

## Requirements

### Requirement: Tactile Interaction Vocabulary
The input model SHALL be based on physical gestures that correlate to actions in the shop. The core gestures are: Pick up (click to grab — slips, tools, cards), Pin (drag to corkboard — slips, standing orders), Slide back (drag toward customer — decline deal), Tear (click perforated edge — order forms, punch cards, calculator tickets), Unfold (click folded document — Kazik's compound deals, newspaper), Carry (hold while navigating — tools between rooms), and Fold (auto-triggered — newspaper when customer approaches). Each gesture SHALL produce immediate visual feedback (object follows cursor, snap to target, bounce on pin, resistance on tear edge) and a corresponding audio event.

#### Scenario: Accept a deal
- **WHEN** the player picks up a slip and drags it to the corkboard
- **THEN** the slip is pinned with a satisfying "thunk" sound, a visual bounce, and the pin appears.

#### Scenario: Unfold Kazik's compound deal
- **WHEN** the player clicks Kazik's folded manila document on the counter
- **THEN** the document unfolds to reveal 2-3 linked sub-slips connected by a brass paper clip, each individually interactive.

#### Scenario: Tear a restock order
- **WHEN** the player clicks the perforated edge of a restock order form
- **THEN** the card tears with a satisfying rip sound and slides off-screen toward the shop door, with the carbon copy remaining faintly visible in the pad.

### Requirement: Physically Plausible Animation
Every interface animation SHALL obey simplified physics using GSAP spring/tween behaviors, with easing and duration discipline to ensure a responsive yet material feel. Specific behaviors: snap-to-target with elastic overshoot for pinning, idle sinusoidal wobble on hanging objects (price tags, bell), Y-sine plus rotation oscillation for paper flutter (slip settlement), Y-scale tween 1-0-1 with texture swap at midpoint for register flip-digits, and lerp-toward-cursor for tool carry physics lag. All animations SHALL use consistent easing curves and duration ranges (0.3-0.5s for immediate interactions, 1-2s for transitions, 3-5s for complex mechanical sequences).

#### Scenario: Slip settlement
- **WHEN** a deal expires
- **THEN** the slip is removed from the corkboard with a gentle fluttering animation (Y-sine plus rotation) as it falls, lasting approximately 1 second.

#### Scenario: Tool carry feels physical
- **WHEN** the player carries a tool across the shop
- **THEN** the tool follows the cursor with a slight lag (lerp interpolation), giving it the feeling of physical weight rather than snapping instantly to cursor position.

#### Scenario: Register flip-digit animation
- **WHEN** the cash register balance updates
- **THEN** each digit flips with a Y-scale tween (scale 1 to 0 to 1), swapping the texture at the midpoint when the digit is edge-on, creating a mechanical flip-card effect.

### Requirement: Sound-Visual Coupling
Every significant visual interaction SHALL have a synchronized audio event. Core pairings: register ring (ka-ching, pitch varies with profit margin), caliper tick (soft ticking, speed proportional to delta), spring creak (metallic creak, volume proportional to gamma), barometer hiss (gentle hissing in amber zone, steam whistle in red zone), corkboard pin (thunk), corkboard remove (papery flutter), door bell (jingle on customer entry, frequency indicates demand level), price tag adjustment (soft mechanical click at each $0.25 increment), calculator (gear grinding, lever clunk, paper chatter for 3-5 seconds), and tool attach/detach (satisfying snap/soft clink). The ambient layer (rain, wind, street sounds, cuckoo clock) SHALL run continuously, with intensity reflecting weather and time-of-day state.

#### Scenario: Monitor volatility
- **WHEN** the barometer needle enters the red zone
- **THEN** a persistent mechanical hiss is heard alongside the needle's tremble, escalating to a steam whistle at extreme volatility.

#### Scenario: Peripheral caliper awareness
- **WHEN** the caliper is attached to a deal slip while the player works elsewhere in the shop
- **THEN** a soft ticking sound is audible in the background, with faster ticking indicating higher price sensitivity — providing peripheral information the player processes subconsciously over hundreds of interactions.

### Requirement: Cross-Room Tool Flow
The tool carry interaction SHALL span both scenes seamlessly. The player SHALL pick up a tool from the desk tool tray in the back room (click to grab, tool follows cursor with slight physics lag). When the player clicks the doorway or left edge, the camera SHALL pan to the shop while the tool remains attached to the cursor. Upon entering the shop while carrying a tool, the corkboard lean-in view SHALL activate automatically with valid attachment targets pulsing. The player SHALL drop the tool on a slip to attach (snap with click sound) or right-click (desktop) / long-press (tablet) to send it back to the desk (the tool floats off-screen toward the doorway). A tool detached from a slip MAY be moved directly to another slip without returning to the back room.

#### Scenario: Carry caliper from back room to shop
- **WHEN** the player picks up the caliper from the desk and clicks the doorway
- **THEN** the camera pans to the shop while the caliper remains attached to the cursor. The corkboard lean-in view activates, showing deal slips at readable size with valid targets pulsing.

#### Scenario: Move tool between slips
- **WHEN** the player clicks an attached tool on the corkboard to pick it up
- **THEN** the tool detaches from its current slip and follows the cursor. The player can drop it on another slip immediately without returning to the back room.

#### Scenario: Return tool to desk remotely (desktop)
- **WHEN** the player right-clicks while carrying a tool in the shop
- **THEN** the tool floats off-screen toward the back room doorway and reappears on the desk tool tray.

#### Scenario: Return tool to desk remotely (tablet)
- **WHEN** the player long-presses while carrying a tool in the shop on a touch device
- **THEN** the tool floats off-screen toward the back room doorway and reappears on the desk tool tray.

### Requirement: Keyboard Navigation
All interactive elements SHALL be assigned a tab order within each day phase, with arrow keys navigating between elements and Enter/Space activating them. A brass highlight ring (warm gold glow #FFD54F, 2px soft edge) styled as shop light catching a surface SHALL follow the focused element. Tab order SHALL follow day-phase logic: morning (price tags, ingredient containers for restocking, newspaper), midday (customer interaction, deal slips, corkboard), evening (register, corkboard review). In the back room, tab order SHALL cover desk objects (journal, calculator, tool tray) and wall instruments (barometer, supplier board). The brass ring is diegetic — it looks like shop light catching a surface, not a UI overlay.

#### Scenario: Keyboard navigation through morning phase
- **WHEN** the player uses Tab during the morning phase
- **THEN** focus moves sequentially through price tags, ingredient containers (for restocking), and the newspaper, with a brass highlight ring following each focused element.

#### Scenario: Keyboard tool attachment
- **WHEN** the player navigates to a tool via Tab in the back room and presses Enter
- **THEN** the tool is picked up. Pressing Tab cycles through corkboard slips as potential attachment targets; Enter attaches.

### Requirement: Reduced Motion Mode
When reduced motion mode is active, all animated weather SHALL be replaced with static visual states (fixed cloud positions indicating weather severity), all tool animations SHALL be replaced with static numeric indicators (caliper shows a speed numeral instead of spinning gears, spring shows a tension numeral instead of vibrating), day-phase transitions SHALL be instant cuts rather than crossfades, and all idle wobbles, paper flutter, and ambient particle effects (dust motes, steam wisps) SHALL be disabled. The same gameplay information MUST remain available — reduced motion removes animation, not information.

#### Scenario: Reduced motion caliper
- **WHEN** reduced motion mode is active and the caliper is attached to a slip
- **THEN** instead of spinning gears, the caliper displays a numeric speed indicator at the gear position, providing the same information without animation.

#### Scenario: Reduced motion weather
- **WHEN** reduced motion mode is active
- **THEN** the window shows static cloud positions and fixed weather indicators instead of animated rain particles, moving clouds, or falling snow.

### Requirement: Color-Blind Redundancy
All color-coded visual information SHALL have a redundant non-color indicator. Document types on the corkboard SHALL be distinguished by both pin color AND pin shape: round (forwards), square (reservations), diamond (guarantees), star (compound deals). Register sale-quality tint SHALL be supplemented by a small icon (checkmark for high-margin, dash for break-even). Barometer zones SHALL be labeled with text in addition to color (CALM / UNCERTAIN / VOLATILE). Customer expression states SHALL include a small icon above the character's head in addition to the facial expression. The document stamp design (ORDER, RESERVATION, GUARANTEE, wax seal) already provides non-color differentiation and SHALL be maintained.

#### Scenario: Color-blind corkboard
- **WHEN** color-blind mode is active and the corkboard has multiple deal types
- **THEN** pins use distinct shapes in addition to colors: round (forwards), square (reservations), diamond (guarantees), star (compound deals) — allowing type identification without relying on color alone.

#### Scenario: Color-blind register feedback
- **WHEN** color-blind mode is active and a high-margin sale is completed
- **THEN** the register displays a small checkmark icon alongside the green tint, ensuring the profit signal is communicated without relying on color perception.

### Requirement: Animation Priority Tiers
All animations SHALL be categorized into three priority tiers. Must-have animations (required for MVP) SHALL include: scoop-and-serve (~1s), register ring with flip-digits (~0.5s), slip placement on counter (~0.5s), slip pin to corkboard with bounce (~0.3s), slip decline/slide back (~0.5s), newspaper slide under door (~1s), day phase lighting crossfade (~2s), customer enter/exit with bell (~1s), price tag wheel rotation (continuous), camera pan between scenes (~1.5s), tool pick-up/put-down (~0.3s), tool attach to slip (~0.3s), and corkboard lean-in/lean-back (~0.5s). Important animations (post-MVP) SHALL include corkboard expansion, back room reveal, container unlock transition, caliper discovery, slip settlement flutter, slip tear-up, calculator processing, newspaper unfold, idle character loops, and compound deal unfold. Polish animations (nice-to-have) SHALL include dust motes, counter-offer handwriting, wax seal break, page turn, and barometer steam.

#### Scenario: MVP interaction feels complete
- **WHEN** playing the game with only must-have animations implemented
- **THEN** every core interaction (serving, dealing, tool use, navigation) has visual feedback — no action produces a static, unanimated result.

#### Scenario: Post-MVP polish adds delight
- **WHEN** important and polish animations are added incrementally
- **THEN** each addition enhances feel and immersion without changing gameplay behavior — they are layered on top of functioning must-have animations.

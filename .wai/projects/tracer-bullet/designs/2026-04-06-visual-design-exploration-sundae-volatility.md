# Visual Design Exploration — Sundae Volatility

> **SUPERSEDED** — This exploration artifact has been replaced by the comprehensive
> visual direction artifact: `2026-04-06-visual-direction-gravity-falls-environments-p.md`.
> Kept for historical context on the decision process. The constraints section below
> remains valid; the open questions have been answered.

## Constraints from Spec (non-negotiable)

These are baked into the unified spec and constrain the visual design:

- **Zero-HUD diegetic UI** — all information lives on physical objects in the shop
- **Fixed elevated perspective** — shopkeeper's POV from behind the counter
- **Two scenes** — Shop (counter, window, corkboard, shelf) and Back Room (desk, barometer, tools)
- **Three-font system** — Grandfather's Hand (warm script), Gazette Serif (newspaper), Label Maker (prices)
- **Material surfaces** — wood, brass, paper, glass, cork — all with visible texture and wear
- **Three lighting phases** — cool morning, warm midday, deep amber evening
- **Physical interaction model** — objects feel tangible; gestures are pick-up, pin, slide, drag, tear
- **Cozy floor** — worst day still feels warm; Stardew Valley not Bloomberg Terminal

## Open Questions (need decisions)

### Q1: Art Style Family
The spec describes rich physical detail (cork pores, pin holes, paper weight, brass patina) but doesn't commit to a rendering style. Options:

**A. Painterly illustration** — Watercolor/gouache feel. Soft edges, visible brushwork. Think: children's book illustration meets antique shop catalog. Warm, inviting, hand-crafted. Risk: harder to animate, may clash with mechanical precision of tools.

**B. Detailed 2D with flat shading** — Clean vector-ish shapes with rich texture overlays. Think: Unpacking, A Short Hike, or Coffee Talk. Readable, scalable, animation-friendly. Risk: may feel too "clean" for the worn-shop aesthetic.

**C. Pixel art (high-res)** — 320×180 to 480×270 base resolution scaled up. Think: Stardew Valley, Moonlighter. Strong precedent in cozy games. Natural fit for item-based interaction. Risk: may limit the material detail the spec demands (cork pores, paper grain).

**D. Mixed media / collage** — Paper-craft textures, scanned materials, hand-drawn elements composited digitally. Think: Tearaway, Baba Is You's handmade feel. Unique, tactile, aligns with "physical objects" theme. Risk: complex pipeline, harder to maintain consistency.

### Q2: Color Temperature & Palette Direction
The spec says "autumnal" and describes amber, warm light, worn wood. But the game spans 90 days (potentially across seasons). Key question:

- Is the palette primarily warm (brown/amber/cream/rust) with cool accents for weather/stress?
- Or does the palette shift substantially across seasons (spring pastels → summer brights → autumn warm → winter cool)?
- How much does weather affect the interior palette vs. just the window view?

### Q3: Window Composition
The window is the game's primary information display (weather, demand, seasons, events, competitors). It occupies the "upper half" of the shop view. Design tension:

- How much of the town is visible? Just the street? Buildings across? Sky to horizon?
- Is it a single large pane or divided (mullions, frames)?
- How detailed are the outdoor elements (people, Nadia's shop, weather) vs. the interior?

### Q4: Scale & Proportion
The counter occupies the "lower third." But what scale are objects?

- Realistic proportions (register is register-sized relative to counter)?
- Slightly exaggerated/chunky for readability (register and slips are larger than life)?
- How big are deal slips relative to the corkboard? Need to fit 4-12 slips.

### Q5: Character Representation
Named characters (Marta, Mrs. Chen, Dmitri, Agnes, Kazik, Tomek, Zosia, Nadia) and crowd characters need visual treatment. The spec describes personality but not appearance.

- Full character portraits? Half-body? Just heads peering over the counter?
- Stylized (big heads, simplified features) or proportional?
- How much animation? Idle loops, facial expressions, gesture animations?
- Crowd characters: silhouettes? Simplified versions? Palette swaps?

### Q6: Technical Rendering Approach
The spec names PixiJS. This constrains us to 2D WebGL rendering.

- Sprite-based with pre-rendered frames?
- Skeletal animation (Spine/DragonBones) for characters?
- Shader-driven effects for lighting transitions, weather?
- Tiled textures vs. hand-painted backgrounds?

## Initial Direction Proposal (starting point for discussion)

**"Warm Illustrated Realism"** — A painterly-adjacent style using hand-painted backgrounds with clean, readable interactive elements layered on top. Think: the warmth of a Miyazaki interior with the readability of a point-and-click adventure.

- **Backgrounds**: Hand-painted or digitally painted with visible texture (wood grain, brass patina, cork)
- **Interactive objects**: Slightly cleaner/crisper than backgrounds so they read as "touchable"
- **Characters**: Illustrated with personality, half-body visible above counter, expressive faces
- **Weather/window**: Atmospheric, painterly, softer than interior to create depth
- **UI objects** (slips, tags, newspaper): Paper-craft texture, feel like real paper items
- **Lighting**: Overlay-based color grading that shifts the entire palette across day phases
- **Animation**: Subtle — idle wobbles, gentle physics on hanging objects, smooth tool attachment

This balances the spec's demand for material detail with readability and the cozy vibe.

## Reference Touchstones

| Reference | What to borrow |
|-----------|---------------|
| Unpacking | Object interaction feel, material textures, warm palette |
| Coffee Talk | Counter-based composition, character framing, cozy atmosphere |
| Recettear | Shop management visual language, customer interaction flow |
| Spirited Away (bathhouse) | Warm interior lighting, detailed surfaces, magical-mundane blend |
| VA-11 Hall-A | Fixed perspective bartending, character presentation, ambient mood |
| Papers Please | Desk-as-interface, physical document handling, information density |
| Obra Dinn | Diegetic UI commitment (everything in the world, nothing overlaid) |

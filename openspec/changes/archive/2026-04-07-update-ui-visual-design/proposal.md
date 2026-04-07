# Change: Update UI specs with concrete visual design direction

## Why
The four UI specs (ui-visual-system, ui-components, ui-diegetic, ui-interactions) currently define high-level requirements but lack the concrete design decisions needed for implementation: art style, color palette, scene layouts, document design system, progressive disclosure states, animation priorities, and accessibility integration. The visual direction has been explored and refined (Gravity Falls environments + Professor Layton characters), and these decisions need to be hardened into specs before implementation begins.

## What Changes
- **ui-visual-system**: Add art style direction (Gravity Falls + Layton blend), concrete color palette, three-layer depth system, text size tiers. Modify existing font, material, and lighting requirements with specifics.
- **ui-diegetic**: Add progressive disclosure visual states, counter space management, multi-customer positioning, corkboard lean-in view, back room scene layout. Modify scene architecture and perspective requirements with spatial details.
- **ui-components**: Add full document design system (all contract tiers + utility documents), corkboard grid design, ingredient container states, back room objects. Modify existing slip, tool, and register requirements with visual state details.
- **ui-interactions**: Add cross-room tool flow, accessibility interaction modes, animation priority inventory. Modify existing gesture and animation requirements with specifics.

## Impact
- Affected specs: ui-visual-system, ui-components, ui-diegetic, ui-interactions
- Affected code: No code exists yet — these specs will guide initial implementation
- Source: Visual direction artifact in `.wai/projects/tracer-bullet/designs/2026-04-06-visual-direction-gravity-falls-environments-p.md`

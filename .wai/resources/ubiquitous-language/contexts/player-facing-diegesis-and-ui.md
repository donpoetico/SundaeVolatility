# Player-Facing Diegesis and UI

This context governs what the player sees, hears, and reads.

## Canonical UI Terms

| Canonical term | Avoid | Why |
|---|---|---|
| promise | option, derivative | Keeps the fiction intact |
| tool | Greek | Makes advanced finance discoverable, not intimidating |
| weather | volatility | Communicates uncertainty through a familiar metaphor |
| flavor | asset, underlying | Keeps the shop metaphor primary |
| shop | market | Grounds activity in place |
| back room | analytics panel, dashboard | Preserves zero-HUD principle |
| deal slip | position card, contract widget | Physical object language |
| register | balance panel | Diegetic cash display |
| newspaper | forecast widget | Physical information source |
| corkboard | portfolio board | In-world portfolio management |

## UI Object Semantics

| Object | Meaning |
|---|---|
| brass register | cash, deal feedback, and economic state |
| newspaper | imperfect forecast and market gossip |
| corkboard | active and pending commitments |
| barometer | visible weather risk / volatility cue |
| caliper | precise comparison / Delta-like inspection tool |
| spring scale | tension / risk cue |
| journal | narrative memory and teaching scaffold |
| doorway | transition from operating to analyzing |

## Copy Rules

1. Never surface unexplained finance jargon in early-game copy.
2. Prefer concrete verbs: **pin**, **inspect**, **accept**, **counter**, **settle**, **unfold**, **reveal**.
3. Preserve physicality: UI elements are objects, not panels or tabs.
4. If the player must learn a technical idea, teach it through a discovered object first and formal naming second.

## Educational Translation Pattern

When introducing a concept:

1. start with diegetic observation
2. let the player act on it
3. reveal the technical label if needed

### Teaching Copy Ladder

- **Early game:** diegetic only
  - "The weather looks jumpy today."
- **Mid game:** diegetic term plus guided function
  - "This tool helps you compare how a promise reacts when flavor prices move."
- **Late game / explicit lesson:** diegetic term plus technical label
  - "This tool measures how sensitive your promise is to weather changes (Vega)."

Use the late-game pattern for journal lessons, hover help, and advanced tutorials where both understanding and transfer matter.

## Tone

- warm, grounded, slightly mysterious
- confident but not academic
- tactile, local, and character-driven
- never sarcastic about the player not knowing finance

## Forbidden UI Language

Avoid these in diegetic UI unless the explicit lesson requires them:

- derivatives
- stochastic
- implied volatility
- option premium
- underlying asset
- dashboard
- widget
- modal

## Related Specs

- `openspec/specs/ui-diegetic/spec.md`
- `openspec/specs/ui-components/spec.md`
- `openspec/specs/ui-interactions/spec.md`
- `openspec/specs/ui-visual-system/spec.md`

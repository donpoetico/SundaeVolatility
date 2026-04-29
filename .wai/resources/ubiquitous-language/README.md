# Sundae Volatility Ubiquitous Language

This directory defines the shared language for product, design, code, tests, and AI agents.

## Purpose

Use one term for one concept.
When two terms exist, prefer the diegetic term for player-facing content and the technical term for code, tests, and specs.

## Language Rules

1. **Player-facing copy uses diegetic language.**
   - Say **promise**, not option.
   - Say **weather**, not volatility.
   - Say **tool**, not Greek.
2. **Code and math may use technical finance terms internally.**
   - `volatility`, `delta`, `callOption`, and `blackScholes` are acceptable in code.
3. **Docs should translate across both worlds using explicit rules.**
   - Mixed-audience docs MUST use diegetic term first, then technical term on first mention, e.g. **promise (call option)**.
   - Purely internal code, tests, and math docs MAY use technical terms only.
4. **Avoid synonyms for core concepts.**
   - Pick the canonical term from the tables below.

## How to Use This Tree

1. Start with this root document for global rules and translations.
2. Choose the bounded context that matches the artifact you are writing.
3. If a term appears in multiple contexts, use the cross-context translation table here as the tie-breaker.
4. If an artifact mixes audiences, follow the usage policy below before inventing new wording.

## Usage Policy

| Artifact type | Preferred language rule |
|---|---|
| Player-facing UI copy | Diegetic terms only unless the lesson explicitly introduces a technical term |
| Internal code, tests, and math notes | Technical terms only |
| Specs and implementation docs | Technical terms by default; use diegetic translation when discussing player experience |
| Mixed-audience docs, tutorials, journal lessons, hover help | First mention MUST use diegetic term first, then technical label in parentheses |

### Mixed-Audience Pattern

Use this sequence when a player must learn a technical concept:

1. diegetic observation
2. player action
3. technical label in parentheses

Example:
- "The weather looks restless today."
- "Try the caliper on this promise."
- "This tool shows Delta (how much the promise moves when the flavor price moves)."

## Bounded Contexts

- [Core Simulation and Pricing](./contexts/core-simulation-and-pricing.md)
- [Gameplay and Progression](./contexts/gameplay-and-progression.md)
- [Player-Facing Diegesis and UI](./contexts/player-facing-diegesis-and-ui.md)

## Cross-Context Translation Table

| Player-facing term | Technical term | Meaning |
|---|---|---|
| Promise | Option / contract | A deal with terms that resolve later |
| Weather | Volatility regime / market state | Conditions that change demand and price behavior |
| Tool | Greek / analytical instrument | A sensitivity measure the player unlocks |
| Flavor | Underlying asset | The tradable ice cream line |
| Deal slip | Contract record / slip UI | The physical representation of a proposed or active deal |
| Position | Active contract / exposure | The active commitment created after a deal is accepted |
| Register | Cash balance / treasury | Current money available to spend |
| Shop | Spot market / retail layer | Immediate sales business |
| Back room | Analysis workspace | The area for inspection, planning, and tools |
| Forecast | Signal / imperfect information | A probabilistic hint, not a guarantee |
| Counter-offer | Repriced proposal | A modified deal quote |
| Settlement | Expiry resolution | How a contract pays out or completes |

## Canonical Flavor Names

Use these names consistently:

- **Vanilla**
- **Chocolate**
- **Strawberry**
- **Mint-Chip**

### Migration Note

Current repository documents include legacy **Mint Chip** usage. Normalize toward **Mint-Chip** in specs, code comments, and new docs. UI copy MAY render **Mint Chip** only when typography or layout benefits from the space.

### Identifier Policy

| Context | Format | Example |
|---|---|---|
| Display label | Title Case | `Mint-Chip` |
| Spec/document slug | kebab-case | `mint-chip` |
| TypeScript enum/type member | PascalCase | `MintChip` |
| Variable/property | camelCase | `mintChipPrice` |

## Ambiguity Rules

- **Price** must be qualified when unclear:
  - **spot price** for immediate ingredient value
  - **listed price** for current retail menu price
  - **strike price** for contract exercise terms
  - **premium** for option upfront cost
- **Day** means a campaign day unless otherwise qualified.
- **Phase** means one of **Morning**, **Midday**, or **Evening**.
- **Balance** means current register cash unless the text explicitly says revenue, profit, or net worth.

## Anti-Glossary

Avoid these terms unless quoting an external finance source:

- **asset** in player UI → prefer **flavor**
- **underlying** in player UI → prefer **flavor**
- **derivative** in player UI → prefer **promise** or **deal**
- **volatility smile / skew / convexity** in early-game copy → hide behind later educational text if needed

## Update Policy

Update this tree when any of the following changes:

- a new mechanic adds a new concept
- a UI label conflicts with code/spec language
- a named character introduces a new contract pattern
- a concept gets renamed in OpenSpec or implementation

## Example Rewrites

| Avoid | Prefer |
|---|---|
| "Buy this option premium" in player UI | "Accept this promise" or hide the premium behind the deal terms |
| "Underlying asset moved" in player UI | "This flavor's price moved" |
| "Open the analytics dashboard" | "Step into the back room" |

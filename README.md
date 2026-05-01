# Sundae Volatility
> Learn derivatives pricing by saving your grandfather's ice cream shop

**An educational incremental game where knowledge costs money**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![tracked with wai](https://img.shields.io/badge/tracked%20with-wai-blue)](https://github.com/charly-vibes/wai)

---

## 🎮 What is Sundae Volatility?

An incremental game that teaches derivatives pricing through engaging gameplay. Players inherit their Polish grandfather's ice cream shop and his mysterious trading system. To save the shop from foreclosure within 90 days, they must learn to price promises and manage risk—all while experiencing the satisfying "numbers go up" loop.

The game is also a **diegetic validation front** for the financial core. Player-facing play stays grounded in shop language and physical artifacts, while the underlying pricing and risk libraries remain the source of truth for every important consequence.

**Core Innovation:** Knowledge costs money. Every dollar spent understanding a new tool is a dollar unavailable for trading, creating authentic capital-allocation decisions that teach both finance and business strategy.

### UX Principles

- **Learn by doing first** — players form hypotheses from weather, customer reactions, slips, stock condition, and outcomes before any deeper explanation.
- **Behavioral fidelity over exposition** — the game proves the core by producing coherent consequences in play, not by leading with a technical dashboard.
- **Diegetic surface, authentic engine** — the shop, corkboard, tools, tickets, and journal are the default interface to the math.
- **Optional inspectability** — advanced players can inspect Grandfather's method more deeply, but that proof layer is never required for normal play.
- **Memory matters** — the corkboard and journal preserve past judgments so players can compare today's promises against prior cases.

### Key Features

- 🍦 **Four Ice Cream Flavors** - Each with unique market personalities
  - Vanilla (baseline, moderate weather)
  - Chocolate (imported, stormier swings)
  - Strawberry (seasonal, predictable patterns)
  - Mint-Chip (chaotic, sentiment-driven)

- 📊 **Tools as Upgrades** - Unlock new ways to inspect promises progressively
  - New tools expand what the player can notice and compare
  - The player learns the system through physical instruments, not mandatory jargon

- 📖 **Rich Narrative** - Discover your grandfather's story through journal entries
  - Polish immigrant mathematician
  - Historical references (Solidarity movement)
  - Hidden cipher puzzles
  - Gravity Falls-inspired mysterious town

- ⚡ **Incremental Game Feel** - But with meaningful decisions
  - Quick trades, low cognitive load
  - Numbers go up satisfaction
  - Strategic purchasing prevents mindlessness
  - Repeated patterns become intuition; contrasting cases create deeper insight

---

## 🎨 Try the UX Prototype

**Want to see the game interface right now?**

```bash
# Open the interactive prototype
open ux-prototype/index.html

# Or view with a local server
cd ux-prototype
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

**Features:**
- ✅ Fully interactive trading interface
- ✅ Live market prices with random walk simulation
- ✅ Complete game layout (3-column design)
- ✅ Responsive mobile/tablet/desktop views
- ✅ Perfect for UX testing with Chrome DevTools

📖 **[Read the UX Prototype Guide](ux-prototype/QUICKSTART.md)** - Learn how to use Chrome DevTools for live design editing!

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/donp/SundaeVolatility.git
cd SundaeVolatility

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📚 Documentation Structure

### Entry Points

- **[README.md](./README.md)** ← You are here - Project overview and getting started
- **[openspec/project.md](./openspec/project.md)** - Project conventions and architecture context
- **[openspec/specs/](./openspec/specs/)** - Current capability specifications
- **[.wai/resources/ubiquitous-language/README.md](./.wai/resources/ubiquitous-language/README.md)** - Shared terminology for docs, code, specs, and UI copy

### Core Specifications (in `openspec/specs/`)

1. **[`core-engine`](./openspec/specs/core-engine/spec.md)** - Pricing and simulation engine
   - Black-Scholes pricing
   - Greeks calculations
   - GBM, mean reversion, seasonal drift, jump diffusion
   - Numerical stability and time-step rules

2. **[`game-logic`](./openspec/specs/game-logic/spec.md)** - Trading rules and progression
   - Forward, call, and put settlement
   - Tool unlock milestones
   - Campaign outcomes and pacing goals

3. **[`gameplay-loop`](./openspec/specs/gameplay-loop/spec.md)** - Day phases, deal flow, and pattern learning
   - Morning / Midday / Evening structure
   - Walk-in customer behavior
   - Counter-offers, newspaper, weather mapping, and selective comparison cues

4. **[`ui-diegetic`](./openspec/specs/ui-diegetic/spec.md)** - Zero-HUD shop and back-room presentation
   - Spatial scene architecture
   - Progressive reveal of objects and spaces
   - Diegetic information delivery and layered proof

5. **[`ui-components`](./openspec/specs/ui-components/spec.md)** and related UI specs
   - Physical objects and interactions
   - Corkboard, tools, register, archive band, and documents
   - Visual-system and interaction rules

---

## 🏗️ Project Structure

```
sundae-volatility/
├── README.md                    # ← You are here
├── LICENSE                      # MIT License
│
├── openspec/                    # Executable specifications and proposals
│   ├── project.md              # Project conventions
│   └── specs/                  # Current capability specs
│
├── src/                         # Source code
│   ├── contracts/              # Agent interfaces and shared contracts
│   ├── core/                   # Pricing and simulation engine
│   │   ├── pricing/            # Black-Scholes and Greeks
│   │   └── simulation/         # GBM, jump diffusion, Monte Carlo, seasonality
│   ├── game/                   # Game rules and progression
│   ├── store/                  # Global state
│   ├── types/                  # Domain types
│   └── ui/                     # UI implementation
│
├── tests/                       # Test suite
│   └── core-engine.test.ts     # Pricing and simulation coverage
│
├── .wai/resources/
│   └── ubiquitous-language/    # Shared language for product/code/specs
│
├── package.json
└── tsconfig.json
```

---

## 🧪 Development Philosophy

### Test-Driven Development (TDD)

All development follows strict TDD practices:

1. **Red** - Write failing test first
2. **Green** - Implement minimal code to pass
3. **Refactor** - Clean up while keeping tests green

**Coverage Requirements:**
- Math functions: 100% coverage (critical path)
- Game logic: 90%+ coverage
- UI components: 85%+ coverage

### Functional & Immutable Patterns

**Principles:**
- Pure functions with no side effects
- Immutable data structures (Immer for Zustand)
- Composable, small functions
- Type safety throughout (TypeScript strict mode)

**Example:**
```typescript
// ✅ Pure function - predictable, testable
export function calculateDelta(params: OptionParams): number {
  const { spot, strike, timeToExpiry, volatility, isCall } = params;
  const d1 = computeD1(spot, strike, timeToExpiry, volatility);
  return isCall ? normalCDF(d1) : normalCDF(d1) - 1;
}

// ✅ Immutable state updates via Immer
updateFlavorPrice: (flavor, price) =>
  set(draft => {
    draft.market.flavors[flavor].spotPrice = price;
    // Immer handles immutability
  }),
```

### Keep It Simple

- **YAGNI** (You Aren't Gonna Need It) - Don't build what you don't need yet
- **Minimal abstractions** - Prefer explicit over clever
- **Less code is better** - Solve problems with simplest approach first
- **Progressive disclosure** - Complexity emerges from simple building blocks

See **[openspec/project.md](./openspec/project.md)** and **[.wai/resources/ubiquitous-language/README.md](./.wai/resources/ubiquitous-language/README.md)** for project conventions and shared terminology.

---

## 🎯 Current Status

**Phase:** Pre-MVP Development
**Architecture:** ✅ Complete
**Next Milestone:** Week 1 - Playable prototype (vanilla promise trading + Delta unlock)

### Week 1 Goals
- [ ] Implement Black-Scholes pricing (<1ms per calculation)
- [ ] Create simple market simulation (single vanilla flavor)
- [ ] Build minimal trading interface
- [ ] Implement Delta unlock at $500

---

## 💼 Business Model

### Free Tier (Educational)
- Complete 90-day campaign
- All features and unlocks
- Local save only
- Community access

### Premium ($4.99/month or $39/year)
- Cloud save sync
- Advanced back-room analysis
- Custom scenarios
- Scripting console (hidden feature)
- Daily challenges

### Year 1 Target
- 10,000-20,000 users
- $5,000-$10,000 revenue
- Validated learning outcomes

### Long-term Vision
- Institutional library licensing
- Enterprise training platform
- API service for quant researchers

See **[openspec/specs/](./openspec/specs/)** for the current capability definitions and implementation targets.

---

## 🤝 Contributing

This is currently a solo developer project with AI assistance. Contributions welcome after MVP launch.

**Development Setup:**
```bash
# Install dependencies
npm install

# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

**Quality Gates:**
- TypeScript strict mode (zero errors)
- ESLint (<10 warnings)
- Test coverage (>85% critical paths)
- Performance benchmarks (<1ms pricing, 60fps UI)

---

## 📖 Learning Resources

If you're new to the concepts, check out:

- **Options Basics** - [Options Playbook](https://www.optionsplaybook.com/)
- **The Greeks / Tools** - [Khan Academy Finance](https://www.khanacademy.org/economics-finance-domain)
- **Black-Scholes** - [Wikipedia](https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model)
- **Incremental Games** - [Universal Paperclips](https://www.decisionproblem.com/paperclips/)

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Universal Paperclips** - Incremental game inspiration
- **Gravity Falls** - Aesthetic and narrative inspiration
- **Polish Heritage** - Grandfather Stanisław's story
- **Finance Education** - Making pricing and risk concepts accessible

---

## 📬 Contact

- **Author:** Don Pomodoro
- **GitHub:** [@donp](https://github.com/donp)
- **Issues:** [GitHub Issues](https://github.com/donp/SundaeVolatility/issues)

---

**Built with ❤️ and a passion for making finance education fun**

*Save the ice cream shop. Master the tools. Honor your grandfather's legacy.*

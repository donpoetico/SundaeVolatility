# Sundae Volatility
> Learn derivatives pricing by saving your grandfather's ice cream shop

**An educational incremental game where knowledge costs money**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.8+-blue.svg)](https://www.solidjs.com/)

---

## 🎮 What is Sundae Volatility?

An incremental game that teaches financial derivatives pricing through engaging gameplay. Players inherit their Polish grandfather's ice cream shop and his mysterious derivatives trading system. To save the shop from foreclosure within 90 days, they must learn to price options and manage risk—all while experiencing the satisfying "numbers go up" dopamine loop.

**Core Innovation:** Knowledge costs money. Delta costs $500, Gamma costs $1,500, Vega costs $8,000. Every dollar spent understanding derivatives is a dollar unavailable for trading, creating authentic capital allocation decisions that teach both finance and business strategy.

### Key Features

- 🍦 **Four Ice Cream Flavors** - Each with unique market personalities
  - Vanilla (baseline, moderate volatility)
  - Chocolate (imported, high volatility)
  - Strawberry (seasonal, predictable patterns)
  - Mint Chip (chaotic, sentiment-driven)

- 📊 **The Greeks as Upgrades** - Unlock financial insights progressively
  - Delta → Gamma → Theta → Vega → Rho
  - Each unlock changes how you see and trade the market

- 📖 **Rich Narrative** - Discover your grandfather's story through journal entries
  - Polish immigrant mathematician
  - Historical references (Solidarity movement)
  - Hidden cipher puzzles
  - Gravity Falls-inspired mysterious town

- ⚡ **Incremental Game Feel** - But with meaningful decisions
  - Quick trades, low cognitive load
  - Numbers go up satisfaction
  - Strategic purchasing prevents mindlessness

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
- **[specs/README.md](./specs/README.md)** - Complete specification index
- **[specs/agents.md](./specs/agents.md)** - TDD practices and development guide

### Core Specifications (in `specs/`)

1. **[game-design.md](./specs/game-design.md)** - Complete game design document
   - The four flavors and their behaviors
   - Derivative instruments (calls, puts, forwards, futures)
   - The Greeks as purchasable upgrades
   - Weather system and market dynamics
   - 90-day campaign structure

2. **[architecture.md](./specs/architecture.md)** - Technical architecture
   - TypeScript + SolidJS reactive wrapper
   - Zustand state management
   - Agent-based development structure
   - Performance requirements (<1ms pricing, 60fps UI)

3. **[development-plan.md](./specs/development-plan.md)** - 24-week roadmap
   - Phase 1: MVP Validation (Weeks 1-4)
   - Phase 2: Core Game (Weeks 5-10)
   - Phase 3: Beta & Polish (Weeks 11-16)
   - Phase 4: Launch (Weeks 17-24)

4. **[agents.md](./specs/agents.md)** - TDD practices and agent responsibilities
   - Test-Driven Development workflows
   - Functional and immutable patterns
   - Agent role definitions (Math, Game Logic, UI, Testing)
   - Performance contracts and quality gates

5. **[frontend-approach.md](./specs/frontend-approach.md)** - Frontend technology decision
   - SolidJS wrapper architecture for migration insurance
   - Performance analysis (vanilla TS vs frameworks)
   - AI assistance quality comparison

---

## 🏗️ Project Structure

```
sundae-volatility/
├── README.md                    # ← You are here
├── LICENSE                      # MIT License
│
├── specs/                       # Complete specification docs
│   ├── README.md               # Specification index
│   ├── agents.md               # TDD practices & development guide
│   ├── game-design.md          # Complete game design
│   ├── architecture.md         # Technical architecture
│   ├── development-plan.md     # 24-week roadmap
│   └── frontend-approach.md    # Frontend technology decision
│
├── src/                         # Source code (to be created)
│   ├── lib/                    # Framework abstraction layer
│   │   ├── reactive.ts         # SolidJS wrapper
│   │   ├── component.ts        # Component utilities
│   │   └── store.ts            # Store integration
│   │
│   ├── store/                  # Global state (Zustand)
│   │   └── gameStore.ts
│   │
│   ├── core/                   # Math Agent deliverables
│   │   ├── pricing/            # Black-Scholes, Greeks
│   │   └── simulation/         # Market simulation
│   │
│   ├── game/                   # Game Logic Agent
│   │   ├── trading/            # Trade execution
│   │   └── progression/        # Unlocks, achievements
│   │
│   ├── components/             # UI Agent deliverables
│   │   ├── MarketView.tsx
│   │   ├── TradingInterface.tsx
│   │   └── PortfolioView.tsx
│   │
│   └── main.tsx                # Entry point
│
├── tests/                       # Testing Agent deliverables
│   ├── unit/                   # Math accuracy, game logic
│   ├── integration/            # Complete trade flows
│   └── e2e/                    # Full playthrough
│
├── package.json
├── tsconfig.json
└── vite.config.ts
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

See **[specs/agents.md](./specs/agents.md)** for complete development practices.

---

## 🎯 Current Status

**Phase:** Pre-MVP Development
**Architecture:** ✅ Complete
**Next Milestone:** Week 1 - Playable prototype (vanilla option trading + Delta unlock)

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
- Advanced analytics
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

See **[specs/development-plan.md](./specs/development-plan.md)** for detailed roadmap.

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
- **The Greeks** - [Khan Academy Finance](https://www.khanacademy.org/economics-finance-domain)
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
- **Finance Education** - Making derivatives accessible

---

## 📬 Contact

- **Author:** Don Pomodoro
- **GitHub:** [@donp](https://github.com/donp)
- **Issues:** [GitHub Issues](https://github.com/donp/SundaeVolatility/issues)

---

**Built with ❤️ and a passion for making finance education fun**

*Save the ice cream shop. Master the Greeks. Honor your grandfather's legacy.*

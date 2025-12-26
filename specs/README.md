# Sundae Volatility - Specification Index
> Complete documentation for building the educational derivatives game

**Purpose:** Central index for all specification documents. Start here to understand the project architecture, design decisions, and development approach.

---

## 📖 Documentation Map

### 🎯 Start Here

1. **[../README.md](../README.md)** - Project overview, quick start, getting started
2. **[agents.md](./agents.md)** - TDD practices and development guide (read this first for development)
3. **[game-design.md](./game-design.md)** - Complete game design specification

### 🏗️ Technical Architecture

4. **[architecture.md](./architecture.md)** - System architecture and technology stack
5. **[frontend-approach.md](./frontend-approach.md)** - Frontend technology evaluation and decision
6. **[solidjs-wrapper.md](./solidjs-wrapper.md)** - SolidJS abstraction layer for framework portability

### 📅 Planning & Roadmap

7. **[development-plan.md](./development-plan.md)** - 24-week development roadmap with phases
8. **[legacy-development-guide.md](./legacy-development-guide.md)** - Original development guide (archived)

---

## 🚀 Reading Order by Role

### For New Developers

1. Read [../README.md](../README.md) - Understand what we're building
2. Read [agents.md](./agents.md) - Learn TDD practices and development workflow
3. Skim [game-design.md](./game-design.md) - Understand the game mechanics
4. Review [development-plan.md](./development-plan.md) - See where we are in the timeline

### For Contributors

1. [../README.md](../README.md) - Project overview
2. [agents.md](./agents.md) - **CRITICAL** - Development practices and quality standards
3. [architecture.md](./architecture.md) - Technical structure
4. Pick your agent role and start building!

### For Product/Design Review

1. [game-design.md](./game-design.md) - Complete game specification
2. [development-plan.md](./development-plan.md) - Timeline and milestones
3. [../README.md](../README.md) - Business model and success metrics

### For Technical Architecture Review

1. [architecture.md](./architecture.md) - System design
2. [frontend-approach.md](./frontend-approach.md) - Frontend technology decision rationale
3. [solidjs-wrapper.md](./solidjs-wrapper.md) - Framework abstraction strategy

---

## 📄 Document Summaries

### [agents.md](./agents.md) - Development Practices Guide
**Essential reading for all developers**

- Test-Driven Development (TDD) workflows
- Functional programming patterns
- Immutable data structures
- KISS principle and simplicity
- Agent roles and responsibilities
- Complete TDD example (calculateGamma)
- Quality gates and checklist

**When to read:** Before writing any code

---

### [game-design.md](./game-design.md) - Complete Game Specification
**v2.0 - Updated with validated technical architecture**

**Contents:**
- Executive summary and core innovation
- Four ice cream flavors with distinct market behaviors
- Derivative instruments (calls, puts, forwards, futures)
- The Greeks as purchasable upgrades (unlock progression)
- Weather system driving volatility
- 90-day campaign structure (Acts 1-3)
- Achievement system
- Narrative framework (Grandfather Stanisław's story)
- Economic balance and resource management
- Technical architecture overview
- MVP development plan
- Business model and revenue projections

**Length:** ~1,160 lines
**When to read:** To understand what we're building and why

---

### [architecture.md](./architecture.md) - Technical Architecture Package
**Ready-to-use foundation files**

**Contents:**
- Quick setup instructions
- Complete package.json
- TypeScript configuration
- Vite configuration
- ESLint and Prettier setup
- Core type definitions (`src/types/core.ts`)
- Zustand game store (`src/store/gameStore.ts`)
- Agent interface contracts
- Performance requirements
- Project structure

**Length:** ~960 lines
**When to read:** When setting up the project or understanding the architecture
**Key files to copy:** All configuration and foundation code

---

### [development-plan.md](./development-plan.md) - 24-Week Roadmap
**Revised v3.0 - Feasibility-adjusted timeline**

**Contents:**

**Phase 1: MVP Validation (Weeks 1-4)**
- Minimal viable product with vanilla trading only
- Delta unlock at $500
- Go/no-go decision gate
- Critical bug fixes (Set serialization, Immer middleware)

**Phase 2: Core Game (Weeks 5-10)**
- All four flavors
- Complete Greek progression
- Full 90-day campaign
- Economic balance tuning

**Phase 3: Beta & Polish (Weeks 11-16)**
- 50-100 beta testers
- Content completion (90 journal entries)
- Performance optimization
- Accessibility improvements

**Phase 4: Launch (Weeks 17-24)**
- Website and marketing
- Public release
- Individual monetization ($4.99/month premium)
- Institutional outreach foundation

**Length:** ~1,100 lines
**When to read:** To understand the timeline and current phase
**Key sections:** Immediate next steps, critical bug fixes, economic rebalancing

---

### [frontend-approach.md](./frontend-approach.md) - Technology Evaluation
**Frontend Council evaluation and decision**

**Contents:**
- Performance analysis (vanilla TS vs ClojureScript vs SolidJS)
- AI assistance quality comparison
- State management complexity analysis
- Ecosystem size and hiring considerations
- Risk assessment matrix
- Proposed vanilla TypeScript architecture with custom reactive system
- SolidJS as recommended middle ground

**Decision:** Use SolidJS with thin wrapper for migration insurance

**Length:** ~800 lines
**When to read:** To understand why we chose SolidJS over vanilla TS or ClojureScript

---

### [solidjs-wrapper.md](./solidjs-wrapper.md) - Framework Abstraction
**Wrapper architecture for framework portability**

**Contents:**
- Design philosophy and goals
- Core API design (`src/lib/reactive.ts`)
- Component wrapper (`src/lib/component.ts`)
- Store integration (`src/lib/store.ts`)
- Migration path to vanilla TS (if needed)
- Week 1 implementation tasks
- Testing strategy
- Bundle size analysis

**Key benefit:** Use SolidJS now, migrate to vanilla TS later if needed (2-3 day effort)

**Length:** ~640 lines
**When to read:** When implementing the UI layer
**Key files to create:** `src/lib/reactive.ts`, `src/lib/component.ts`, `src/lib/store.ts`

---

### [legacy-development-guide.md](./legacy-development-guide.md) - Archived
**Original consolidated design document**

**Status:** Archived for reference, superseded by more focused documents

**Contents:** Earlier version combining game design, development approach, and technical specifications

**When to read:** For historical context only, prefer newer focused documents

---

## 🎯 Current Project Status

**Phase:** Pre-MVP Development
**Week:** 0 (Setup)
**Next Milestone:** Week 1 - Playable prototype

### Week 1 Goals
- [ ] Implement Black-Scholes pricing (<1ms per calculation)
- [ ] Create simple market simulation (vanilla flavor only)
- [ ] Build minimal trading interface
- [ ] Implement Delta unlock at $500
- [ ] Complete TDD cycle for all math functions

### Completed
- [x] Architecture specification
- [x] Game design documentation
- [x] Development roadmap (24 weeks)
- [x] Agent development guide (TDD practices)
- [x] Frontend technology decision
- [x] Framework wrapper architecture

---

## 🔑 Key Principles

### Development
- **TDD Always** - Red, Green, Refactor
- **Functional & Immutable** - Pure functions, no mutations
- **Keep It Simple** - YAGNI, prefer clarity over cleverness
- **Quality Gates** - Tests pass, coverage >85%, performance met

### Game Design
- **Knowledge Costs Money** - Core innovation
- **Discovery Over Instruction** - Learn by doing
- **Incremental Feel** - Quick decisions, satisfying progression
- **Meaningful Decisions** - Prevent mindless grinding

### Business
- **Validate Before Building** - Phase gates with go/no-go decisions
- **Individual Users First** - B2B in Year 2-3
- **Realistic Expectations** - $5-10K Year 1, not $1M+
- **Sustainable Pace** - 40-50 hour weeks, not burnout

---

## 🤝 Contributing

See [../README.md](../README.md) for contribution guidelines.

**Before starting work:**
1. Read [agents.md](./agents.md) completely
2. Understand TDD workflow and quality gates
3. Review architecture for your agent role
4. Write tests before code
5. Keep functions pure and immutable

---

## 📬 Questions?

- **Game Design:** See [game-design.md](./game-design.md) or open an issue
- **Technical Architecture:** See [architecture.md](./architecture.md) or [frontend-approach.md](./frontend-approach.md)
- **Development Process:** See [agents.md](./agents.md)
- **Timeline:** See [development-plan.md](./development-plan.md)

---

## 📊 Document Stats

| Document | Lines | Purpose | Priority |
|----------|-------|---------|----------|
| agents.md | ~830 | TDD & development practices | ⭐⭐⭐⭐⭐ |
| game-design.md | ~1,160 | Complete game spec | ⭐⭐⭐⭐ |
| architecture.md | ~960 | Technical foundation | ⭐⭐⭐⭐ |
| development-plan.md | ~1,100 | 24-week roadmap | ⭐⭐⭐⭐ |
| frontend-approach.md | ~800 | Tech decision rationale | ⭐⭐⭐ |
| solidjs-wrapper.md | ~640 | Framework abstraction | ⭐⭐⭐ |
| legacy-development-guide.md | ~700 | Archived reference | ⭐ |

**Total specification:** ~6,190 lines of comprehensive documentation

---

*Well-documented code is easier to maintain. Well-specified projects are easier to build.*

*Start with [agents.md](./agents.md), build with TDD, ship with confidence.*

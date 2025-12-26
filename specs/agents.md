# Agent Development Guide
> Test-Driven Development with Functional & Immutable Patterns

**Purpose:** Define development practices, TDD workflows, and agent responsibilities for building Sundae Volatility with AI assistance

**Philosophy:** Keep it simple. Functional, immutable, and testable. Every agent follows these core principles.

---

## 📋 Task Tracking with Beads

**Use `bd` for all task tracking and project management.**

This project uses **bd** (beads) for issue tracking and task management. Before starting any work session, run:

```bash
bd onboard  # First time setup
bd ready    # Find available work
bd show <id>  # View issue details
```

### Core Beads Workflow

```bash
# Start work
bd ready                              # Find tasks ready to work
bd show <id>                          # Review issue details
bd update <id> --status=in_progress   # Claim the task

# During development (following TDD)
# Write tests, implement features, run tests

# Complete work
bd close <id>                         # Mark task complete
bd sync                               # Sync with git remote
```

### Creating Tasks

Use beads for **strategic work** (multi-session, dependencies, discovered work):

```bash
# Create new issues
bd create --title="Implement Black-Scholes pricing" --type=feature --priority=2
bd create --title="Add gamma calculation tests" --type=task --priority=2
bd create --title="Fix delta edge case bug" --type=bug --priority=0

# Add dependencies
bd dep add beads-yyy beads-xxx  # Task yyy depends on xxx
```

**Priority Levels:**
- `P0` (0) - Critical/blocking
- `P1` (1) - High priority
- `P2` (2) - Medium priority (default)
- `P3` (3) - Low priority
- `P4` (4) - Backlog

### Session Close Protocol 🚨

**CRITICAL:** Before ending any work session:

1. ✅ Check status: `git status`
2. ✅ Stage changes: `git add <files>`
3. ✅ Sync beads: `bd sync`
4. ✅ Commit code: `git commit -m "..."`
5. ✅ Sync again: `bd sync`
6. ✅ Push: `git push`

**Work is NOT complete until pushed to remote!**

### Useful Commands

```bash
bd list --status=open         # All open issues
bd list --status=in_progress  # Your active work
bd blocked                    # Show blocked issues
bd stats                      # Project statistics
bd doctor                     # Check for issues
```

---

## 🎯 Core Principles

### 1. Test-Driven Development (TDD)

**Every feature follows the Red-Green-Refactor cycle:**

```
┌─────────────────────────────────────────────┐
│ RED: Write failing test                     │
│   ↓                                         │
│ GREEN: Write minimal code to pass           │
│   ↓                                         │
│ REFACTOR: Clean up while keeping tests green│
│   ↓                                         │
│ (repeat)                                    │
└─────────────────────────────────────────────┘
```

**Why TDD?**
- **Confidence:** Changes don't break existing functionality
- **Design:** Writing tests first creates better APIs
- **Documentation:** Tests show how code is meant to be used
- **Regression prevention:** Bugs can't resurface silently

**Example TDD Workflow:**

```typescript
// STEP 1: RED - Write failing test
import { describe, it, expect } from 'vitest';
import { calculateDelta } from './greeks';

describe('calculateDelta', () => {
  it('calculates delta for at-the-money call option', () => {
    const result = calculateDelta({
      spot: 100,
      strike: 100,
      timeToExpiry: 1,
      volatility: 0.3,
      riskFreeRate: 0.05,
      isCall: true
    });

    // Delta for ATM call should be around 0.5
    expect(result).toBeCloseTo(0.5, 2);
  });
});

// Test fails ❌ (function doesn't exist yet)

// STEP 2: GREEN - Minimal implementation
export function calculateDelta(params: OptionParams): number {
  const { spot, strike, timeToExpiry, volatility, isCall } = params;
  const d1 = computeD1(spot, strike, timeToExpiry, volatility, params.riskFreeRate);
  return isCall ? normalCDF(d1) : normalCDF(d1) - 1;
}

// Test passes ✅

// STEP 3: REFACTOR - Improve while keeping tests green
export function calculateDelta(params: OptionParams): number {
  const d1 = computeD1(params);
  return params.isCall ? normalCDF(d1) : normalCDF(d1) - 1;
}

// Test still passes ✅
// Now add more edge case tests and repeat
```

---

### 2. Functional Programming Patterns

**Pure Functions - The Foundation**

```typescript
// ✅ GOOD: Pure function
// - No side effects
// - Same input always gives same output
// - Easily testable
export function blackScholes(params: OptionParams): number {
  const { spot, strike, timeToExpiry, volatility, riskFreeRate, isCall } = params;

  if (timeToExpiry <= 0) {
    return Math.max(0, isCall ? spot - strike : strike - spot);
  }

  const d1 = (Math.log(spot / strike) +
    (riskFreeRate + volatility ** 2 / 2) * timeToExpiry) /
    (volatility * Math.sqrt(timeToExpiry));

  const d2 = d1 - volatility * Math.sqrt(timeToExpiry);

  if (isCall) {
    return spot * normalCDF(d1) -
           strike * Math.exp(-riskFreeRate * timeToExpiry) * normalCDF(d2);
  } else {
    return strike * Math.exp(-riskFreeRate * timeToExpiry) * normalCDF(-d2) -
           spot * normalCDF(-d1);
  }
}

// ❌ BAD: Impure function
let lastPrice = 0; // Global state!

export function blackScholesImpure(params: OptionParams): number {
  lastPrice = computePrice(params); // Side effect!
  console.log('Calculated:', lastPrice); // Side effect!
  return lastPrice;
}
```

**Function Composition**

```typescript
// Build complex behavior from simple functions

// Small, focused functions
const computeD1 = (spot: number, strike: number, t: number, vol: number, r: number): number =>
  (Math.log(spot / strike) + (r + vol ** 2 / 2) * t) / (vol * Math.sqrt(t));

const computeD2 = (d1: number, vol: number, t: number): number =>
  d1 - vol * Math.sqrt(t);

// Compose them
export function priceCallOption(params: OptionParams): number {
  const { spot, strike, timeToExpiry: t, volatility: vol, riskFreeRate: r } = params;
  const d1 = computeD1(spot, strike, t, vol, r);
  const d2 = computeD2(d1, vol, t);
  return spot * normalCDF(d1) - strike * Math.exp(-r * t) * normalCDF(d2);
}
```

**Higher-Order Functions**

```typescript
// Functions that take or return functions

// Create option pricer for specific parameters
const createPricer = (vol: number, r: number) =>
  (spot: number, strike: number, t: number, isCall: boolean): number =>
    blackScholes({ spot, strike, timeToExpiry: t, volatility: vol, riskFreeRate: r, isCall });

// Use it
const vanillaPricer = createPricer(0.35, 0.05);
const price1 = vanillaPricer(100, 110, 0.5, true);
const price2 = vanillaPricer(100, 90, 0.5, false);

// Map/filter/reduce for data transformation
const positions = [/* ... */];

// Pure transformations
const callPositions = positions.filter(p => p.instrument.type === 'call');
const totalDelta = positions
  .map(p => p.greeks?.delta ?? 0)
  .reduce((sum, delta) => sum + delta, 0);
```

---

### 3. Immutable Data Structures

**Why Immutability?**
- **Predictable:** Data can't change unexpectedly
- **Thread-safe:** No race conditions
- **Time-travel debugging:** Can replay state changes
- **Performance:** Structural sharing (Immer optimizes this)

**Using Immer for Zustand**

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// ✅ GOOD: Immutable updates with Immer
export const useGameStore = create<GameStore>()(
  immer((set) => ({
    market: initialMarket,

    // Immer lets you write "mutations" that produce new immutable state
    updateFlavorPrice: (flavor, price) =>
      set(draft => {
        // Looks like mutation, but Immer creates new object
        draft.market.flavors[flavor].spotPrice = price;
        draft.market.flavors[flavor].lastUpdate = new Date();
      }),

    addPosition: (position) =>
      set(draft => {
        draft.portfolio.positions.push(position); // Immutable push
        draft.portfolio.totalValue = calculateTotalValue(draft.portfolio);
      }),
  }))
);

// ❌ BAD: Direct mutation (breaks reactivity)
export const useGameStore = create<GameStore>()((set, get) => ({
  market: initialMarket,

  updateFlavorPrice: (flavor, price) => {
    const state = get();
    state.market.flavors[flavor].spotPrice = price; // BREAKS THINGS!
    // Zustand won't detect change
  },
}));
```

**Immutable Array Operations**

```typescript
// ✅ GOOD: Immutable operations
const positions = [pos1, pos2, pos3];

// Add
const newPositions = [...positions, newPosition];

// Remove
const filtered = positions.filter(p => p.id !== removeId);

// Update
const updated = positions.map(p =>
  p.id === targetId
    ? { ...p, unrealizedPnL: newPnL }
    : p
);

// ❌ BAD: Mutating operations
positions.push(newPosition); // Mutation!
positions.splice(index, 1); // Mutation!
positions[0].unrealizedPnL = newPnL; // Mutation!
```

**Immutable Object Updates**

```typescript
// ✅ GOOD: Spread operator for immutable updates
const market: Market = { /* ... */ };

const updated = {
  ...market,
  flavors: {
    ...market.flavors,
    vanilla: {
      ...market.flavors.vanilla,
      spotPrice: 2.75,
      lastUpdate: new Date(),
    },
  },
};

// ✅ BETTER: Use Immer for deep updates
import produce from 'immer';

const updated = produce(market, draft => {
  draft.flavors.vanilla.spotPrice = 2.75;
  draft.flavors.vanilla.lastUpdate = new Date();
});
```

---

### 4. Keep It Simple (KISS Principle)

**Prefer Simple Over Clever**

```typescript
// ❌ CLEVER: Hard to understand, hard to test
const calcDelta = (p: OptionParams) =>
  normalCDF((Math.log(p.spot / p.strike) + (p.riskFreeRate + p.volatility ** 2 / 2) * p.timeToExpiry) / (p.volatility * Math.sqrt(p.timeToExpiry))) - (p.isCall ? 0 : 1);

// ✅ SIMPLE: Clear steps, easy to test
export function calculateDelta(params: OptionParams): number {
  const { spot, strike, timeToExpiry, volatility, riskFreeRate, isCall } = params;

  // Step 1: Calculate d1
  const d1 = (Math.log(spot / strike) +
              (riskFreeRate + volatility ** 2 / 2) * timeToExpiry) /
             (volatility * Math.sqrt(timeToExpiry));

  // Step 2: Apply CDF
  const callDelta = normalCDF(d1);

  // Step 3: Adjust for put
  return isCall ? callDelta : callDelta - 1;
}
```

**Small Functions**

```typescript
// ✅ GOOD: Each function does ONE thing
const validateTrade = (cash: number, cost: number): boolean =>
  cash >= cost;

const hasCapacity = (positions: Position[], limit: number): boolean =>
  positions.length < limit;

const canExecuteTrade = (cash: number, cost: number, positions: Position[]): boolean =>
  validateTrade(cash, cost) && hasCapacity(positions, 100);

// ❌ BAD: God function doing everything
function executeTrade(state: GameState, trade: Trade): GameState {
  // 300 lines of mixed validation, calculation, state update, logging...
  // Hard to test, hard to debug, hard to maintain
}
```

**YAGNI (You Aren't Gonna Need It)**

```typescript
// ❌ BAD: Building for future that might not come
interface AdvancedTradingParams {
  strategy?: 'momentum' | 'mean-reversion' | 'arbitrage';
  leverage?: number;
  hedgeRatio?: number;
  riskLimit?: number;
  autoRebalance?: boolean;
  notifications?: NotificationConfig;
  // ... 20 more optional parameters we don't use yet
}

// ✅ GOOD: Build what you need NOW, extend later
interface TradingParams {
  instrument: Instrument;
  quantity: number;
  price: number;
}

// Add features when actually needed, not speculatively
```

---

## 🤖 Agent Roles & Responsibilities

### Math Agent 🧮

**Focus:** Financial mathematics, market simulation, statistical analysis

**Deliverables:**
- Black-Scholes pricing engine
- Greeks calculations (Delta, Gamma, Theta, Vega, Rho)
- Market simulation (Ornstein-Uhlenbeck processes)
- Binomial tree for American options
- Monte Carlo for exotic instruments
- Risk metrics (VaR, portfolio Greeks)

**TDD Requirements:**
```typescript
// MUST have 100% test coverage for all math functions

describe('Black-Scholes pricing', () => {
  // Test against academic benchmarks
  it('prices at-the-money call option correctly', () => {
    const price = blackScholes({
      spot: 100,
      strike: 100,
      timeToExpiry: 1,
      volatility: 0.2,
      riskFreeRate: 0.05,
      isCall: true
    });

    // From Hull's textbook example
    expect(price).toBeCloseTo(10.45, 2);
  });

  // Test put-call parity
  it('satisfies put-call parity', () => {
    const params = { /* ... */ };
    const callPrice = blackScholes({ ...params, isCall: true });
    const putPrice = blackScholes({ ...params, isCall: false });

    const parity = callPrice - putPrice;
    const expected = params.spot - params.strike * Math.exp(-params.riskFreeRate * params.timeToExpiry);

    expect(parity).toBeCloseTo(expected, 10);
  });

  // Test edge cases
  it('handles zero time to expiry', () => {
    const price = blackScholes({ /* ... */, timeToExpiry: 0 });
    const intrinsic = Math.max(0, spot - strike);
    expect(price).toBe(intrinsic);
  });

  // Test numerical stability
  it('handles extreme volatility', () => {
    const price = blackScholes({ /* ... */, volatility: 5.0 });
    expect(price).toBeGreaterThan(0);
    expect(price).toBeLessThan(spot);
  });
});
```

**Performance Contracts:**
- Black-Scholes pricing: <1ms per calculation
- Greeks calculation: <2ms per calculation
- Market update (4 flavors): <10ms total
- Memory usage: <20MB

**Output Contract:**
- Pure functions only (no side effects)
- Deterministic output for given input
- Error handling for invalid parameters
- Performance guarantees met
- Complete test coverage with documented edge cases

---

### Game Logic Agent 🎮

**Focus:** Game progression, unlocks, economic balance, save/load

**Deliverables:**
- Progression system (Greek unlocks, achievements)
- Economic balance calibration
- Save/load system with integrity validation
- Journal entry delivery system
- Achievement tracking
- Game state validation

**TDD Requirements:**
```typescript
describe('Greek unlock system', () => {
  it('unlocks Delta when requirements met', () => {
    const state = {
      cash: 600,
      tradesCompleted: 15,
      daysPlayed: 10,
      unlockedGreeks: new Set<GreekType>(),
    };

    const canUnlock = checkUnlockConditions(state, 'delta');
    expect(canUnlock).toBe(true);
  });

  it('prevents Delta unlock without sufficient trades', () => {
    const state = {
      cash: 600,
      tradesCompleted: 10, // Need 15
      daysPlayed: 10,
      unlockedGreeks: new Set<GreekType>(),
    };

    const canUnlock = checkUnlockConditions(state, 'delta');
    expect(canUnlock).toBe(false);
  });

  it('deducts cost when unlocking', () => {
    const initialCash = 1000;
    const state = executeUnlock('delta', { cash: initialCash, /* ... */ });

    expect(state.cash).toBe(initialCash - 500);
    expect(state.unlockedGreeks.has('delta')).toBe(true);
  });
});

describe('Save/load integrity', () => {
  it('saves and loads game state without corruption', () => {
    const original = createGameState();
    const saved = saveGame(original);
    const loaded = loadGame(saved);

    expect(loaded).toEqual(original);
  });

  it('detects tampered save data', () => {
    const saved = saveGame(createGameState());
    const tampered = saved.replace(/"cash":2000/, '"cash":999999');

    expect(() => loadGame(tampered)).toThrow('Checksum mismatch');
  });
});
```

**Economic Balance Testing:**
```typescript
// Monte Carlo simulation to validate progression
describe('Economic balance', () => {
  it('allows 40% of competent players to complete campaign', () => {
    const simulations = 1000;
    const completions = runMonteCarloPlaythroughs(simulations, 'competent');

    const completionRate = completions / simulations;
    expect(completionRate).toBeGreaterThan(0.35);
    expect(completionRate).toBeLessThan(0.50);
  });

  it('prevents exploits from breaking economy', () => {
    // Test known exploit: buying far OTM options
    const finalCapital = runExploitStrategy('far-otm-spam');
    expect(finalCapital).toBeLessThan(100000); // Shouldn't break game
  });
});
```

**Output Contract:**
- Deterministic progression based on player actions
- Robust save/load with corruption prevention
- Clear achievement feedback
- Economic balance creates tension without frustration
- Validated through playtesting data

---

### UI Agent 🎨

**Focus:** User interface, user experience, visual feedback, accessibility

**Deliverables:**
- Responsive HTML/CSS layout
- Interactive trading interface
- Portfolio management dashboard
- Progression visualization
- Animation system
- Accessibility features (WCAG 2.1 AA)

**TDD Requirements:**
```typescript
// Component behavior tests (using SolidJS testing library)
import { render, fireEvent } from '@solidjs/testing-library';

describe('TradingInterface', () => {
  it('displays current market price', () => {
    const { getByText } = render(() => <TradingInterface />);

    expect(getByText(/Vanilla Spot:/)).toBeInTheDocument();
    expect(getByText(/\$2\.50/)).toBeInTheDocument();
  });

  it('executes trade when Accept clicked', async () => {
    const onTrade = vi.fn();
    const { getByRole } = render(() =>
      <TradingInterface onTrade={onTrade} />
    );

    const acceptButton = getByRole('button', { name: /Accept/ });
    fireEvent.click(acceptButton);

    expect(onTrade).toHaveBeenCalledWith(expect.objectContaining({
      type: 'call',
      flavor: 'vanilla',
    }));
  });

  it('prevents trade when cash insufficient', () => {
    const { getByRole } = render(() =>
      <TradingInterface cash={100} tradeCost={500} />
    );

    const acceptButton = getByRole('button', { name: /Accept/ });
    expect(acceptButton).toBeDisabled();
  });
});
```

**Accessibility Tests:**
```typescript
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(() => <App />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    const { getByRole } = render(() => <TradingInterface />);

    const firstButton = getByRole('button', { name: /Accept/ });
    firstButton.focus();

    expect(document.activeElement).toBe(firstButton);

    // Test tab navigation
    fireEvent.keyDown(firstButton, { key: 'Tab' });
    expect(document.activeElement).not.toBe(firstButton);
  });
});
```

**Performance Tests:**
```typescript
describe('UI Performance', () => {
  it('maintains 60fps when rendering 100 positions', () => {
    const positions = Array.from({ length: 100 }, createMockPosition);

    const { rerender } = render(() => <PortfolioView positions={positions} />);

    const startTime = performance.now();
    for (let i = 0; i < 60; i++) {
      rerender(() => <PortfolioView positions={positions} />);
    }
    const endTime = performance.now();

    const frameBudget = (1000 / 60) * 60; // 60 frames at 16.67ms each
    expect(endTime - startTime).toBeLessThan(frameBudget);
  });
});
```

**Output Contract:**
- Responsive interface working across devices
- Smooth animations (>55fps sustained)
- Clear information hierarchy
- WCAG 2.1 AA compliance
- Performance-optimized rendering

---

### Testing Agent 🧪

**Focus:** Quality assurance, test infrastructure, performance monitoring

**Deliverables:**
- Comprehensive test suite (unit, integration, E2E)
- Automated testing pipeline (CI/CD)
- Performance monitoring and regression detection
- Quality gates for deployment
- Test utilities and mocks

**Test Infrastructure:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85,
      },
    },
  },
});
```

**Integration Test Example:**
```typescript
describe('Complete trade flow', () => {
  it('executes end-to-end vanilla call option trade', () => {
    // Setup
    const store = useGameStore.getState();
    const initialCash = store.portfolio.cash;

    // Step 1: Get market price
    const vanillaSpot = store.market.flavors.vanilla.spotPrice;
    expect(vanillaSpot).toBe(2.50);

    // Step 2: Calculate option price
    const optionPrice = blackScholes({
      spot: vanillaSpot,
      strike: 2.75,
      timeToExpiry: 30 / 365,
      volatility: 0.35,
      riskFreeRate: 0.05,
      isCall: true,
    });

    // Step 3: Execute trade
    const position = executeTrade({
      instrument: {
        flavor: 'vanilla',
        type: 'call',
        strike: 2.75,
        expiration: 30,
      },
      quantity: 100,
      price: optionPrice,
    });

    // Step 4: Verify state updates
    expect(store.portfolio.cash).toBe(initialCash - optionPrice * 100);
    expect(store.portfolio.positions).toContainEqual(position);
    expect(store.progression.tradesCompleted).toBe(1);

    // Step 5: Verify Greeks calculated (if unlocked)
    if (store.progression.unlockedGreeks.has('delta')) {
      expect(position.greeks?.delta).toBeDefined();
    }
  });
});
```

**Performance Regression Tests:**
```typescript
import { describe, it, expect, bench } from 'vitest';

describe('Performance benchmarks', () => {
  bench('Black-Scholes pricing', () => {
    blackScholes({
      spot: 100,
      strike: 100,
      timeToExpiry: 1,
      volatility: 0.2,
      riskFreeRate: 0.05,
      isCall: true,
    });
  }, {
    time: 1000, // Run for 1 second
    iterations: 1000,
  });

  it('prices 1000 options in <10ms', () => {
    const start = performance.now();

    for (let i = 0; i < 1000; i++) {
      blackScholes({
        spot: 100 + Math.random() * 20,
        strike: 110,
        timeToExpiry: Math.random(),
        volatility: 0.2 + Math.random() * 0.3,
        riskFreeRate: 0.05,
        isCall: Math.random() > 0.5,
      });
    }

    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(10);
  });
});
```

**Output Contract:**
- Reliable test infrastructure usable by all agents
- Clear pass/fail criteria for deliverables
- Performance monitoring with regression alerts
- Quality reports showing coverage and success rates
- Automated deployment pipeline with gates

---

## 📋 TDD Workflow Checklist

For every feature, follow this checklist:

### Before Writing Code

- [ ] **Check beads for work** - `bd ready` to find available tasks
- [ ] **Claim the task** - `bd update <id> --status=in_progress`
- [ ] **Understand the requirement** - What are we building and why?
- [ ] **Define the interface** - What should the function signature look like?
- [ ] **Write test cases** - What scenarios need to be tested?
  - [ ] Happy path (normal usage)
  - [ ] Edge cases (boundary conditions)
  - [ ] Error cases (invalid input)
  - [ ] Performance requirements

### During Development

- [ ] **Write failing test first** (RED)
- [ ] **Write minimal code to pass** (GREEN)
- [ ] **Refactor for clarity** (REFACTOR)
- [ ] **Ensure test still passes**
- [ ] **Add more test cases**
- [ ] **Repeat until feature complete**

### Before Committing

- [ ] **All tests pass** (`npm test`)
- [ ] **Coverage meets threshold** (>85% for critical paths)
- [ ] **Performance benchmarks pass** (<1ms pricing, 60fps UI)
- [ ] **TypeScript compiles** (`npm run type-check`)
- [ ] **Linter passes** (`npm run lint`)
- [ ] **Code formatted** (`npm run format`)

### Code Review (Self-Review)

- [ ] **Is it functional?** - Pure functions, no side effects
- [ ] **Is it immutable?** - No direct mutations
- [ ] **Is it simple?** - Easy to understand and maintain
- [ ] **Is it tested?** - Comprehensive test coverage
- [ ] **Is it documented?** - Clear comments and JSDoc

### After Completion (Session Close)

- [ ] **Close completed tasks** - `bd close <id>`
- [ ] **Stage changes** - `git add <files>`
- [ ] **Sync beads** - `bd sync`
- [ ] **Commit code** - `git commit -m "..."`
- [ ] **Sync beads again** - `bd sync`
- [ ] **Push to remote** - `git push` (CRITICAL - work not done until pushed!)
- [ ] **Verify sync** - `git status` should show "up to date with origin"

---

## 🔍 Example: Complete TDD Session

Let's implement `calculateGamma` from scratch using TDD:

### Step 1: Write Test First (RED)

```typescript
// src/core/pricing/__tests__/greeks.test.ts
import { describe, it, expect } from 'vitest';
import { calculateGamma } from '../greeks';

describe('calculateGamma', () => {
  it('calculates gamma for ATM option', () => {
    const gamma = calculateGamma({
      spot: 100,
      strike: 100,
      timeToExpiry: 1,
      volatility: 0.2,
      riskFreeRate: 0.05,
    });

    // Gamma peaks at ATM, typical value ~0.01-0.02
    expect(gamma).toBeGreaterThan(0);
    expect(gamma).toBeLessThan(0.05);
  });
});
```

Run test: `npm test` → **FAILS** ❌ (function doesn't exist)

### Step 2: Minimal Implementation (GREEN)

```typescript
// src/core/pricing/greeks.ts
import { normalPDF } from './normalDistribution';

export function calculateGamma(params: OptionParams): number {
  const { spot, strike, timeToExpiry, volatility, riskFreeRate } = params;

  const d1 = (Math.log(spot / strike) +
              (riskFreeRate + volatility ** 2 / 2) * timeToExpiry) /
             (volatility * Math.sqrt(timeToExpiry));

  return normalPDF(d1) / (spot * volatility * Math.sqrt(timeToExpiry));
}
```

Run test: `npm test` → **PASSES** ✅

### Step 3: Add More Tests

```typescript
describe('calculateGamma', () => {
  it('calculates gamma for ATM option', () => {
    // ... previous test
  });

  it('gamma is higher for short-dated options', () => {
    const gammaShort = calculateGamma({
      spot: 100,
      strike: 100,
      timeToExpiry: 0.1, // 36 days
      volatility: 0.2,
      riskFreeRate: 0.05,
    });

    const gammaLong = calculateGamma({
      spot: 100,
      strike: 100,
      timeToExpiry: 1, // 365 days
      volatility: 0.2,
      riskFreeRate: 0.05,
    });

    expect(gammaShort).toBeGreaterThan(gammaLong);
  });

  it('gamma approaches zero far OTM', () => {
    const gamma = calculateGamma({
      spot: 100,
      strike: 150, // Far out of the money
      timeToExpiry: 1,
      volatility: 0.2,
      riskFreeRate: 0.05,
    });

    expect(gamma).toBeCloseTo(0, 4);
  });

  it('gamma is same for calls and puts', () => {
    const params = {
      spot: 100,
      strike: 100,
      timeToExpiry: 1,
      volatility: 0.2,
      riskFreeRate: 0.05,
    };

    const gammaCall = calculateGamma({ ...params, isCall: true });
    const gammaPut = calculateGamma({ ...params, isCall: false });

    expect(gammaCall).toBeCloseTo(gammaPut, 10);
  });
});
```

All tests pass ✅

### Step 4: Refactor for Clarity

```typescript
// Extract d1 calculation to helper
const computeD1 = (params: OptionParams): number => {
  const { spot, strike, timeToExpiry, volatility, riskFreeRate } = params;
  return (Math.log(spot / strike) +
          (riskFreeRate + volatility ** 2 / 2) * timeToExpiry) /
         (volatility * Math.sqrt(timeToExpiry));
};

export function calculateGamma(params: OptionParams): number {
  const { spot, volatility, timeToExpiry } = params;
  const d1 = computeD1(params);

  // Gamma = N'(d1) / (S * σ * √T)
  return normalPDF(d1) / (spot * volatility * Math.sqrt(timeToExpiry));
}
```

Run tests: `npm test` → **STILL PASSES** ✅

### Step 5: Add Performance Test

```typescript
import { bench } from 'vitest';

bench('calculateGamma performance', () => {
  calculateGamma({
    spot: 100,
    strike: 100,
    timeToExpiry: 1,
    volatility: 0.2,
    riskFreeRate: 0.05,
  });
}, {
  time: 1000,
  iterations: 10000,
});

// Should report: ~10,000 ops/ms → <0.0001ms per call ✅
```

### Done! ✅

- Function implemented
- 4 test cases covering different scenarios
- Performance validated
- Code is functional, pure, and simple
- Ready to commit

---

## 🎓 Learning Resources

**Test-Driven Development:**
- [TDD by Example - Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Vitest Documentation](https://vitest.dev/)

**Functional Programming:**
- [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)
- [Professor Frisby's Mostly Adequate Guide](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)

**Immutability:**
- [Immer Documentation](https://immerjs.github.io/immer/)
- [Immutability in React/SolidJS](https://www.solidjs.com/guides/reactivity)

---

## ✅ Summary

**Every agent follows these principles:**

1. **Use `bd` for Task Tracking** - Track all work in beads
2. **TDD Always** - Red, Green, Refactor
3. **Pure Functions** - No side effects
4. **Immutable Data** - Never mutate
5. **Keep It Simple** - Clarity over cleverness
6. **Compose Small Functions** - Build complexity from simplicity

**Quality Gates:**
- ✅ All tests pass
- ✅ Coverage >85% (critical paths 100%)
- ✅ Performance benchmarks met
- ✅ TypeScript strict mode
- ✅ ESLint clean (<10 warnings)

**Task Tracking:**
- ✅ Use `bd` for all issue tracking
- ✅ Claim tasks before starting work
- ✅ Close tasks when complete
- ✅ Always `bd sync` and `git push` at session end

**Result:** Clean, maintainable, testable code that teaches both players AND developers good patterns.

---

*Use 'bd' for task tracking.*

*Build simple. Build testable. Build functional. Build immutable.*

*Save the ice cream shop. Master the codebase. Honor the craft.*

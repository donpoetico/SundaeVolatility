# Sundae Volatility - Complete Architecture Package

**Architecture Agent Deliverables - Ready for Development**

This document contains all foundational files needed to start development. Copy each file to the specified location in your project.

---

## 🚀 Quick Setup Instructions

```bash
# 1. Create project directory
mkdir sundae-volatility
cd sundae-volatility

# 2. Create all subdirectories
mkdir -p src/types src/store src/contracts

# 3. Copy all files below into their respective paths

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
```

---

## 📦 File: `package.json`

```json
{
  "name": "sundae-volatility",
  "version": "1.0.0",
  "description": "Educational derivatives pricing game",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext ts --max-warnings 0",
    "lint:fix": "eslint src --ext ts --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  },
  "dependencies": {
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.1.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vitest": "^1.0.4"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 📦 File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 📦 File: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
```

---

## 📦 File: `.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn',
  },
};
```

---

## 📦 File: `.prettierrc.js`

```javascript
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
};
```

---

## 📦 File: `src/types/core.ts`

```typescript
// Core type definitions for Sundae Volatility

export type FlavorId = 'vanilla' | 'chocolate' | 'strawberry' | 'mint-chip';
export type InstrumentType = 'call' | 'put' | 'forward' | 'future';
export type GreekType = 'delta' | 'gamma' | 'theta' | 'vega' | 'rho';

export interface FlavorState {
  spotPrice: number;
  impliedVolatility: number;
  dailyVolatility: number;
  lastPriceChange: number;
  lastUpdate: Date;
  futuresPrices: Record<number, number>;
  meanReversionSpeed: number;
  seasonalAmplitude: number;
  jumpProbability: number;
}

export interface WeatherState {
  currentTemp: number;
  seasonalExpected: number;
  forecast: Array<{
    day: number;
    expectedTemp: number;
    uncertainty: number;
    confidence: number;
  }>;
  lastUpdate: Date;
}

export interface Market {
  currentDay: number;
  flavors: Record<FlavorId, FlavorState>;
  weather: WeatherState;
  isMarketOpen: boolean;
  riskFreeRate: number;
}

export interface Instrument {
  id: string;
  flavor: FlavorId;
  type: InstrumentType;
  strike?: number;
  expiration: number;
  isAmerican: boolean;
}

export interface PositionGreeks {
  delta: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
}

export interface Position {
  id: string;
  instrument: Instrument;
  quantity: number;
  entryPrice: number;
  entryDate: number;
  currentValue: number;
  unrealizedPnL: number;
  greeks?: PositionGreeks;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  totalValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
}

export interface ProgressionState {
  unlockedGreeks: Set<GreekType>;
  unlockedFeatures: Set<string>;
  achievements: Set<string>;
  totalSpent: number;
  totalEarned: number;
  maxCapital: number;
  tradesCompleted: number;
  daysPlayed: number;
}

export interface UserSettings {
  showTooltips: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  confirmTrades: boolean;
  autoSaveEnabled: boolean;
}

export interface GameState {
  market: Market;
  portfolio: Portfolio;
  progression: ProgressionState;
  settings: UserSettings;
  currentDay: number;
}

export type GameEventType = 
  | 'market.updated'
  | 'trade.executed'
  | 'position.opened'
  | 'position.closed'
  | 'unlock.purchased'
  | 'day.advanced';

export interface GameEvent {
  type: GameEventType;
  timestamp: Date;
  data: Record<string, unknown>;
}

export class GameError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'GameError';
  }
}

export class InsufficientFundsError extends GameError {
  constructor(required: number, available: number) {
    super(
      `Insufficient funds: need $${required}, have $${available}`,
      'INSUFFICIENT_FUNDS',
      { required, available }
    );
  }
}
```

---

## 📦 File: `src/store/gameStore.ts`

```typescript
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type {
  Market,
  Portfolio,
  ProgressionState,
  UserSettings,
  Position,
  FlavorId,
  GreekType,
  GameEvent,
} from '../types/core';

interface GameStore {
  // Market State
  market: Market;
  updateMarket: (updates: Partial<Market>) => void;
  updateFlavorPrice: (flavor: FlavorId, price: number, vol: number) => void;
  advanceDay: () => void;

  // Portfolio State
  portfolio: Portfolio;
  addPosition: (position: Position) => void;
  removePosition: (positionId: string) => void;
  updateCash: (amount: number) => void;

  // Progression State
  progression: ProgressionState;
  settings: UserSettings;
  unlockGreek: (greek: GreekType, cost: number) => boolean;
  addAchievement: (id: string) => void;
  incrementTrades: () => void;

  // Events
  events: GameEvent[];
  emit: (event: GameEvent) => void;

  // UI State
  currentView: string;
  setCurrentView: (view: string) => void;
}

const createInitialMarket = (): Market => ({
  currentDay: 1,
  flavors: {
    vanilla: {
      spotPrice: 2.5,
      impliedVolatility: 0.35,
      dailyVolatility: 0.35 / Math.sqrt(365),
      lastPriceChange: 0,
      lastUpdate: new Date(),
      futuresPrices: {},
      meanReversionSpeed: 0.3,
      seasonalAmplitude: 0.15,
      jumpProbability: 0.02,
    },
    chocolate: {
      spotPrice: 2.8,
      impliedVolatility: 0.5,
      dailyVolatility: 0.5 / Math.sqrt(365),
      lastPriceChange: 0,
      lastUpdate: new Date(),
      futuresPrices: {},
      meanReversionSpeed: 0.25,
      seasonalAmplitude: 0.1,
      jumpProbability: 0.05,
    },
    strawberry: {
      spotPrice: 2.2,
      impliedVolatility: 0.25,
      dailyVolatility: 0.25 / Math.sqrt(365),
      lastPriceChange: 0,
      lastUpdate: new Date(),
      futuresPrices: {},
      meanReversionSpeed: 0.4,
      seasonalAmplitude: 0.4,
      jumpProbability: 0.01,
    },
    'mint-chip': {
      spotPrice: 2.6,
      impliedVolatility: 0.65,
      dailyVolatility: 0.65 / Math.sqrt(365),
      lastPriceChange: 0,
      lastUpdate: new Date(),
      futuresPrices: {},
      meanReversionSpeed: 0.2,
      seasonalAmplitude: 0.05,
      jumpProbability: 0.08,
    },
  },
  weather: {
    currentTemp: 70,
    seasonalExpected: 70,
    forecast: [],
    lastUpdate: new Date(),
  },
  isMarketOpen: true,
  riskFreeRate: 0.05,
});

const createInitialPortfolio = (): Portfolio => ({
  cash: 2000,
  positions: [],
  totalValue: 2000,
  unrealizedPnL: 0,
  realizedPnL: 0,
});

const createInitialProgression = (): ProgressionState => ({
  unlockedGreeks: new Set(),
  unlockedFeatures: new Set(),
  achievements: new Set(),
  totalSpent: 0,
  totalEarned: 0,
  maxCapital: 2000,
  tradesCompleted: 0,
  daysPlayed: 1,
});

const createInitialSettings = (): UserSettings => ({
  showTooltips: true,
  soundEnabled: true,
  animationsEnabled: true,
  confirmTrades: true,
  autoSaveEnabled: true,
});

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Market
        market: createInitialMarket(),

        updateMarket: updates =>
          set(state => ({ market: { ...state.market, ...updates } })),

        updateFlavorPrice: (flavor, price, vol) =>
          set(state => ({
            market: {
              ...state.market,
              flavors: {
                ...state.market.flavors,
                [flavor]: {
                  ...state.market.flavors[flavor],
                  spotPrice: price,
                  impliedVolatility: vol,
                  lastPriceChange: price - state.market.flavors[flavor].spotPrice,
                  lastUpdate: new Date(),
                },
              },
            },
          })),

        advanceDay: () =>
          set(state => {
            const newDay = state.market.currentDay + 1;
            get().emit({
              type: 'day.advanced',
              timestamp: new Date(),
              data: { day: newDay },
            });
            return {
              market: { ...state.market, currentDay: newDay },
              progression: { ...state.progression, daysPlayed: newDay },
            };
          }),

        // Portfolio
        portfolio: createInitialPortfolio(),

        addPosition: position =>
          set(state => {
            get().emit({
              type: 'position.opened',
              timestamp: new Date(),
              data: { position },
            });
            get().incrementTrades();
            return {
              portfolio: {
                ...state.portfolio,
                positions: [...state.portfolio.positions, position],
              },
            };
          }),

        removePosition: positionId =>
          set(state => ({
            portfolio: {
              ...state.portfolio,
              positions: state.portfolio.positions.filter(p => p.id !== positionId),
            },
          })),

        updateCash: amount =>
          set(state => ({
            portfolio: {
              ...state.portfolio,
              cash: Math.max(0, state.portfolio.cash + amount),
            },
          })),

        // Progression
        progression: createInitialProgression(),
        settings: createInitialSettings(),

        unlockGreek: (greek, cost) => {
          const state = get();
          if (state.portfolio.cash < cost) {
            return false;
          }

          set(state => {
            const newUnlocked = new Set(state.progression.unlockedGreeks);
            newUnlocked.add(greek);

            get().emit({
              type: 'unlock.purchased',
              timestamp: new Date(),
              data: { greek, cost },
            });

            return {
              portfolio: {
                ...state.portfolio,
                cash: state.portfolio.cash - cost,
              },
              progression: {
                ...state.progression,
                unlockedGreeks: newUnlocked,
                totalSpent: state.progression.totalSpent + cost,
              },
            };
          });

          return true;
        },

        addAchievement: id =>
          set(state => {
            const newAchievements = new Set(state.progression.achievements);
            newAchievements.add(id);
            return {
              progression: {
                ...state.progression,
                achievements: newAchievements,
              },
            };
          }),

        incrementTrades: () =>
          set(state => ({
            progression: {
              ...state.progression,
              tradesCompleted: state.progression.tradesCompleted + 1,
            },
          })),

        // Events
        events: [],

        emit: event =>
          set(state => ({
            events: [...state.events.slice(-99), event],
          })),

        // UI
        currentView: 'market',
        setCurrentView: view => set({ currentView: view }),
      }),
      {
        name: 'sundae-volatility-game',
        partialize: state => ({
          market: state.market,
          portfolio: state.portfolio,
          progression: state.progression,
          settings: state.settings,
        }),
      }
    ),
    { name: 'Sundae Volatility Store' }
  )
);

// Convenience selectors
export const useMarket = () => useGameStore(state => state.market);
export const usePortfolio = () => useGameStore(state => state.portfolio);
export const useProgression = () => useGameStore(state => state.progression);
export const useCash = () => useGameStore(state => state.portfolio.cash);
export const useCurrentDay = () => useGameStore(state => state.market.currentDay);
```

---

## 📦 File: `src/contracts/agentContracts.ts`

```typescript
// Agent interface contracts - what each agent must implement

import type { Market, Instrument, Position, PositionGreeks } from '../types/core';

// MATH AGENT - Financial calculations
export interface MathAgent {
  // Option pricing
  priceEuropeanOption(params: {
    spot: number;
    strike: number;
    timeToExpiry: number;
    riskFreeRate: number;
    volatility: number;
    isCall: boolean;
  }): number;

  // Greeks calculation
  calculateGreeks(params: {
    spot: number;
    strike: number;
    timeToExpiry: number;
    volatility: number;
    isCall: boolean;
  }): PositionGreeks;

  // Market simulation
  updateFlavorPrice(
    currentPrice: number,
    volatility: number,
    meanReversionSpeed: number,
    dt: number
  ): number;
}

// GAME LOGIC AGENT - Game mechanics
export interface GameLogicAgent {
  // Trading
  executeTrading(params: {
    instrument: Instrument;
    quantity: number;
    price: number;
  }): { success: boolean; position?: Position; error?: string };

  // Unlocks
  checkUnlockConditions(state: {
    cash: number;
    tradesCompleted: number;
    daysPlayed: number;
  }): Array<{ id: string; name: string; cost: number; canAfford: boolean }>;

  // Validation
  validateTrade(params: {
    cash: number;
    cost: number;
    instrument: Instrument;
  }): { valid: boolean; errors: string[] };
}

// UI AGENT - User interface
export interface UIAgent {
  // Rendering
  renderMarketView(market: Market): void;
  renderPortfolioView(portfolio: { cash: number; positions: Position[] }): void;

  // Interactions
  showNotification(params: {
    type: 'success' | 'error' | 'info';
    message: string;
  }): void;

  // Animations
  animateCashChange(oldValue: number, newValue: number): void;
}

// Performance requirements
export const PERFORMANCE_REQUIREMENTS = {
  mathAgent: {
    maxPricingLatency: 1, // ms
    maxGreeksLatency: 2, // ms
  },
  gameLogicAgent: {
    maxTradeLatency: 5, // ms
  },
  uiAgent: {
    targetFrameRate: 60, // fps
  },
} as const;
```

---

## 📦 File: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sundae Volatility</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #1a1a2e;
        color: #eee;
        line-height: 1.6;
      }
      #app {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h1>Sundae Volatility</h1>
      <p>Loading game...</p>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## 📦 File: `src/main.ts`

```typescript
// Main entry point for the application

import { useGameStore } from './store/gameStore';

console.log('🍦 Sundae Volatility - Architecture Setup Complete!');

// Test the store
const store = useGameStore.getState();

console.log('Initial State:', {
  cash: store.portfolio.cash,
  currentDay: store.market.currentDay,
  vanillaPrice: store.market.flavors.vanilla.spotPrice,
});

// Test unlocking Delta
console.log('\nAttempting to unlock Delta ($800)...');
const success = store.unlockGreek('delta', 800);

if (success) {
  console.log('✓ Delta unlocked!');
  console.log('Remaining cash:', store.portfolio.cash);
  console.log('Unlocked Greeks:', Array.from(store.progression.unlockedGreeks));
} else {
  console.log('✗ Failed to unlock Delta (insufficient funds)');
}

// Display app info
const appDiv = document.getElementById('app');
if (appDiv) {
  appDiv.innerHTML = `
    <h1>🍦 Sundae Volatility</h1>
    <h2>Architecture Foundation Ready</h2>
    
    <div style="background: #16213e; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>✅ Core Systems Initialized</h3>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li>TypeScript configuration with strict mode</li>
        <li>Zustand store with persistence</li>
        <li>Type-safe interfaces for all agents</li>
        <li>Market simulation foundation (4 flavors)</li>
        <li>Portfolio and progression tracking</li>
      </ul>
    </div>

    <div style="background: #16213e; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>📊 Current Game State</h3>
      <ul style="margin-left: 20px; margin-top: 10px;">
        <li><strong>Cash:</strong> $${store.portfolio.cash.toFixed(2)}</li>
        <li><strong>Day:</strong> ${store.market.currentDay}</li>
        <li><strong>Vanilla Price:</strong> $${store.market.flavors.vanilla.spotPrice.toFixed(2)}</li>
        <li><strong>Unlocked Greeks:</strong> ${Array.from(store.progression.unlockedGreeks).join(', ') || 'None'}</li>
        <li><strong>Trades Completed:</strong> ${store.progression.tradesCompleted}</li>
      </ul>
    </div>

    <div style="background: #16213e; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>🎯 Next Steps for Agent Development</h3>
      <ol style="margin-left: 20px; margin-top: 10px;">
        <li><strong>Math Agent:</strong> Implement Black-Scholes pricing in <code>src/core/pricing/</code></li>
        <li><strong>Game Logic Agent:</strong> Implement trade execution in <code>src/game/trading/</code></li>
        <li><strong>UI Agent:</strong> Build trading interface in <code>src/ui/components/</code></li>
        <li><strong>Testing Agent:</strong> Create test suite in <code>tests/</code></li>
      </ol>
    </div>

    <p style="margin-top: 20px; color: #888;">
      Check console for detailed system status.
    </p>
  `;
}
```

---

## 📦 File: `.gitignore`

```
# Dependencies
node_modules/

# Build outputs
dist/
*.tsbuildinfo

# Environment files
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Test coverage
coverage/

# Logs
*.log
npm-debug.log*
```

---

## 📦 File: `README.md`

```markdown
# Sundae Volatility

Educational derivatives pricing game with incremental mechanics.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Architecture

- **TypeScript** - Type-safe development
- **Zustand** - State management
- **Vite** - Fast build tool
- **Vanilla TS** - No framework overhead

## Agent Responsibilities

### 🧮 Math Agent
- Black-Scholes pricing
- Market simulation
- Greeks calculation
- Performance: <1ms per option price

### 🎮 Game Logic Agent
- Trade execution
- Unlock system (Delta $800, Gamma $3000, etc.)
- Save/load with checksums
- Economic balance

### 🎨 UI Agent
- Trading interface
- Animations and feedback
- Responsive design
- 60fps target

### 🧪 Testing Agent
- Unit tests (>85% coverage)
- Integration tests
- Performance benchmarks
- Quality gates

## Development Workflow

1. Create feature branch
2. Implement with TDD
3. Pass quality gates:
   - TypeScript compilation
   - ESLint (<10 warnings)
   - Test coverage (>85%)
   - Performance benchmarks
4. Submit for integration

## Project Status

✅ **Architecture Foundation Complete**
- Type system defined
- Store architecture implemented
- Agent contracts specified
- Build configuration ready

🚧 **Next: MVP Development (Week 1-2)**
- Math Agent: Basic Black-Scholes
- Game Logic: Simple trading
- UI: Minimal interface
- Goal: Trade vanilla options + unlock Delta

## License

MIT
```

---

## 📋 Setup Checklist

After copying all files:

- [ ] Run `npm install`
- [ ] Run `npm run type-check` (should pass)
- [ ] Run `npm run dev` (should open http://localhost:3000)
- [ ] Verify Zustand store works in browser console
- [ ] Check that Delta unlock works (see console logs)
- [ ] Review architecture in PROJECT_STRUCTURE.md

## 🎯 What's Next?

The **Math Agent** should begin implementing:
1. `src/core/pricing/blackScholes.ts` - Basic option pricing
2. `src/core/pricing/greeks.ts` - Delta calculation  
3. `src/core/simulation/marketSimulation.ts` - Simple price updates

All agents should implement against the contracts in `src/contracts/agentContracts.ts`.

---

**Architecture Agent Status: ✅ COMPLETE**

All foundational interfaces, types, and configurations are ready for specialized agent development.

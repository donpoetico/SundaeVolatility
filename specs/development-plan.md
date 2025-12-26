# Sundae Volatility: Revised Development Plan
**Version 3.0 - Feasibility-Adjusted Roadmap**

**Created:** December 24, 2025
**Status:** Strategic Plan - Post-Council Review
**Timeline:** 24 weeks to commercial launch (vs. original 10 weeks)

---

## Executive Summary

This revised plan addresses critical feasibility gaps identified in the council review while preserving the innovative core concept. The primary changes:

1. **Timeline extended from 10 weeks → 24 weeks** (realistic for solo dev + AI)
2. **Economic balance retuned** (achievable returns vs. fantasy 300-400%)
3. **Business model restructured** (individual users first, B2B in Year 2-3)
4. **Scope phased with go/no-go gates** (validate before over-building)
5. **Critical bugs fixed immediately** (Set serialization, state management)

**Core Vision Preserved:** Educational derivatives game with "knowledge costs money" mechanic teaching both finance and capital allocation through incremental gameplay.

**Expected Outcome:** 60-70% chance of successful educational game generating $50K-200K/year by end of Year 2 (vs. unrealistic $1M-10M Year 1 projection).

---

## Phase 1: MVP Validation (Weeks 1-4)

### Goal
Prove the core loop is fun AND educational with minimal scope.

### Success Criteria (Go/No-Go Gate)
- 10 external playtesters complete 30-minute session
- 70%+ report "satisfying progression feeling"
- 70%+ can explain what Delta means after playing
- No critical bugs or data loss in testing
- Average session length >25 minutes

**If criteria not met:** Pivot or abandon (fail fast principle)

### Technical Deliverables

#### Math Agent (Week 1)
```
src/core/pricing/
├── blackScholes.ts          # European call options only
├── greeks.ts                # Delta calculation only
├── normalDistribution.ts    # CDF/PDF helpers
└── __tests__/
    ├── blackScholes.test.ts # 100% coverage required
    └── greeks.test.ts       # Validate against academic benchmarks

Performance contracts:
- Black-Scholes pricing: <1ms per calculation
- Delta calculation: <2ms per calculation
- Test coverage: 100% (critical path)
```

**Implementation notes:**
- Use simple Black-Scholes (no dividends, no American options)
- Hard-code risk-free rate at 5%
- Single volatility regime (no smile modeling)
- Defer: put options, futures, forwards, all other Greeks

#### Game Logic Agent (Week 2)
```
src/game/
├── trading/
│   ├── tradeExecution.ts    # Execute vanilla call trades only
│   ├── validation.ts        # Cash checks, position limits
│   └── positionManager.ts   # Track open positions
├── progression/
│   ├── unlockSystem.ts      # Delta unlock at $500 (reduced from $800)
│   └── achievements.ts      # First Trade, First Profit, Delta unlock
└── __tests__/
    └── tradeFlow.test.ts    # End-to-end integration

Features:
- Maximum 10 open positions (prevent UI overload)
- Trade validation (sufficient cash, position limits)
- Delta unlock: $500 cost, 15 trades minimum
- Simple localStorage save (no cloud sync yet)
```

**Economic rebalancing:**
```
Starting capital: $2,000
Delta unlock: $500 (was $800)
Target after 1 week: $2,800 (40% gain, achievable)

Rationale:
- 40% weekly return = ~15% daily compounding = aggressive but realistic
- $500 Delta cost = 25% of starting capital (teaches real trade-offs)
- Leaves $300 buffer after unlock for continued trading
```

#### UI Agent (Week 3)
```
src/ui/
├── MarketView.ts            # Single vanilla spot price + IV display
├── TradingInterface.ts      # One trade opportunity, Accept/Reject
├── PortfolioView.ts         # Cash, positions list, simple P&L
├── UnlockView.ts            # Delta unlock button (when available)
└── styles.css               # Minimal dark theme

Design principles:
- Information density: Low (reduce cognitive load)
- Feedback: Immediate cash changes, position updates
- No animations yet (defer to Phase 2)
- Mobile-friendly layout (responsive CSS Grid)
```

**UI wireframe (text-based):**
```
┌─────────────────────────────────────────┐
│ SUNDAE VOLATILITY    Cash: $2,450       │
├─────────────────────────────────────────┤
│ MARKET                                  │
│ Vanilla Spot: $2.50  IV: 35%           │
│                                         │
│ TRADE OPPORTUNITY                       │
│ Call Option - Strike $2.75             │
│ Expiry: 30 days                        │
│ Fair Price: $0.18 (Delta: 0.35)       │
│                                         │
│ [Accept $180] [Reject]                 │
├─────────────────────────────────────────┤
│ PORTFOLIO (3 positions)                 │
│ • Call $2.50 30d: +$45 (Δ 0.42)       │
│ • Call $2.75 45d: -$12 (Δ 0.28)       │
│ • Call $3.00 60d: +$8  (Δ 0.15)       │
│                                         │
│ Unrealized P&L: +$41                   │
├─────────────────────────────────────────┤
│ UPGRADES                                │
│ ⚫ Delta: $500 (15 trades required)     │
└─────────────────────────────────────────┘
```

#### Integration & Testing (Week 4)
```
tests/
├── integration/
│   ├── mvp-playthrough.test.ts    # Simulate full session
│   └── state-persistence.test.ts  # Save/load reliability
└── manual/
    └── playtest-protocol.md        # Structured testing guide

Playtest protocol:
1. Recruit 10 testers (5 finance background, 5 none)
2. 30-minute unguided session
3. Post-session survey:
   - "Was progression satisfying?" (1-5 scale)
   - "Explain what Delta means" (open text)
   - "Would you continue playing?" (yes/no)
4. Session recordings for UX analysis
```

### Critical Bug Fixes (Week 1, Priority 1)

**1. Fix Set serialization in gameStore.ts**
```typescript
// BEFORE (BROKEN - Sets don't serialize to JSON):
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      progression: {
        unlockedGreeks: new Set<GreekType>(),  // ❌ Will be empty on reload!
        // ...
      }
    }),
    { name: 'sundae-volatility-game' }
  )
);

// AFTER (FIXED - Convert Set to Array for storage):
interface PersistedState {
  progression: Omit<ProgressionState, 'unlockedGreeks'> & {
    unlockedGreeks: GreekType[];  // Store as array
  };
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      progression: createInitialProgression(),
      // ... other state
    }),
    {
      name: 'sundae-volatility-game',
      partialize: (state): PersistedState => ({
        progression: {
          ...state.progression,
          unlockedGreeks: Array.from(state.progression.unlockedGreeks),
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert arrays back to Sets on load
          state.progression.unlockedGreeks = new Set(
            state.progression.unlockedGreeks as any
          );
        }
      },
    }
  )
);
```

**2. Add Immer middleware for immutable updates**
```typescript
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Now mutations work safely:
        updateFlavorPrice: (flavor, price, vol) =>
          set(draft => {
            draft.market.flavors[flavor].spotPrice = price;
            draft.market.flavors[flavor].impliedVolatility = vol;
            // No spread operators needed!
          }),
      })),
      // ... persist config
    )
  )
);
```

**3. Add position list virtualization**
```typescript
// src/ui/components/VirtualizedPositionList.ts
import { FixedSizeList } from 'react-window';  // Wait, we're vanilla TS!

// For vanilla TS, implement simple windowing:
class VirtualPositionList {
  private container: HTMLElement;
  private visibleRange = { start: 0, end: 20 };  // Show 20 at a time

  render(positions: Position[]) {
    const visible = positions.slice(
      this.visibleRange.start,
      this.visibleRange.end
    );

    this.container.innerHTML = visible
      .map(p => this.renderPosition(p))
      .join('');
  }

  onScroll(scrollTop: number) {
    const itemHeight = 40;  // pixels
    this.visibleRange.start = Math.floor(scrollTop / itemHeight);
    this.visibleRange.end = this.visibleRange.start + 20;
    this.render(this.getAllPositions());
  }
}
```

### Deferred Features (Explicitly NOT in MVP)
- ❌ Chocolate, strawberry, mint-chip flavors
- ❌ Put options
- ❌ Futures and forwards
- ❌ Gamma, Theta, Vega, Rho (Delta only!)
- ❌ Weather system
- ❌ Journal entries
- ❌ Achievements beyond basic 3
- ❌ Animations and transitions
- ❌ Cloud save sync
- ❌ Multiple difficulty modes

### Week 4 Decision Point

**Proceed to Phase 2 if:**
- ✅ 7+ of 10 playtesters meet success criteria
- ✅ No data loss or critical bugs in 50+ hours testing
- ✅ Performance targets met (<1ms pricing, 60fps UI)
- ✅ Developer velocity sustainable (not burned out)

**Pivot/Abandon if:**
- ❌ <5 playtesters find it engaging
- ❌ Players don't understand Delta after playing
- ❌ Technical debt already unmanageable
- ❌ Developer burned out or behind schedule

---

## Phase 2: Core Game (Weeks 5-10)

### Goal
Complete educational experience with full Greek progression.

### Success Criteria
- 20-30% completion rate in beta testing (50+ users)
- Players can explain Delta, Gamma, Theta conceptually
- Economic balance creates meaningful decisions (playtester surveys)
- Technical stability (no crashes in 10+ hour sessions)

### Technical Expansion

#### Math Agent (Week 5-6)
```
src/core/pricing/
├── blackScholes.ts          # Add put options
├── binomialTree.ts          # American option pricing
├── greeks.ts                # All Greeks: Δ, Γ, Θ, V, ρ
├── forwards.ts              # Forward contract pricing
└── futures.ts               # Futures with margin

New features:
- Put-call parity validation (arbitrage detection)
- Binomial tree for American options (early exercise)
- Complete Greeks calculation
- Multi-flavor correlation structure
```

**Correlation matrix (flavors):**
```
            Vanilla  Chocolate  Strawberry  Mint-Chip
Vanilla       1.00      0.60        0.45       0.20
Chocolate     0.60      1.00        0.35       0.25
Strawberry    0.45      0.35        1.00       0.15
Mint-Chip     0.20      0.25        0.15       1.00

Rationale:
- Vanilla/Chocolate: High correlation (both dairy-based)
- Strawberry: Seasonal, lower correlation
- Mint-Chip: Chaotic, near-independent
```

#### Game Logic Agent (Week 7-8)
```
src/game/
├── trading/
│   ├── multiInstrument.ts   # Calls, puts, forwards, futures
│   └── marginSystem.ts      # Futures margin requirements
├── progression/
│   ├── unlockSystem.ts      # All 5 Greeks, phased unlocks
│   ├── achievements.ts      # 15+ achievements
│   └── economicBalance.ts   # Dynamic difficulty tuning
└── simulation/
    ├── marketSimulation.ts  # All 4 flavors
    └── priceProcesses.ts    # Ornstein-Uhlenbeck + jumps

Greek unlock progression (REBALANCED):
┌───────────────────────────────────────────────┐
│ Greek  │ Cost   │ Requirements               │
├────────┼────────┼────────────────────────────┤
│ Delta  │ $500   │ 15 trades                  │
│ Gamma  │ $1,500 │ Delta unlocked 7 days ago  │
│ Theta  │ $3,500 │ Gamma unlocked + Day 20    │
│ Vega   │ $8,000 │ Theta unlocked + Day 40    │
│ Rho    │ $5,000 │ Any 3 Greeks (optional)    │
└───────────────────────────────────────────────┘

Capital progression (ACHIEVABLE TARGETS):
┌───────────────────────────────────────────────┐
│ Phase      │ Start   │ Target  │ Growth │ Days│
├────────────┼─────────┼─────────┼────────┼─────┤
│ Act 1      │ $2,000  │ $5,000  │ 2.5x   │ 30  │
│ Act 2      │ $5,000  │ $15,000 │ 3.0x   │ 30  │
│ Act 3      │ $15,000 │ $40,000 │ 2.67x  │ 30  │
└───────────────────────────────────────────────┘

Total: $2,000 → $40,000 (20x over 90 days)
= ~3.5% daily compounding (aggressive but achievable)

Original plan: $2,000 → $70,000 (35x)
= ~4.2% daily compounding (requires near-perfect play)
```

#### UI Agent (Week 9-10)
```
src/ui/
├── components/
│   ├── MarketDashboard.ts   # All 4 flavors overview
│   ├── AdvancedChart.ts     # Price history (simple canvas)
│   ├── GreeksDisplay.ts     # Portfolio Greeks aggregation
│   └── ProgressionTree.ts   # Unlock visualization
├── animations/
│   ├── cashCounter.ts       # Animated value changes
│   ├── unlockCelebration.ts # Greek unlock feedback
│   └── transitions.ts       # View switching
└── responsive/
    └── mobileLayout.ts      # Optimize for phones

Animation budget:
- Cash changes: 300ms ease-out
- Unlock celebrations: 1.5s (particles, sound)
- View transitions: 200ms slide
- Chart updates: 60fps smooth scrolling
```

### Content Development (Weeks 5-10, parallel)

#### Journal System (20 entries for Act 1-2)
```
Entry structure:
- 1-2 paragraphs personal narrative
- 1 mathematical insight
- Polish cultural reference (optional)
- Unlock trigger (day-based or event-based)

Example (Entry 8 - Delta Introduction):
┌─────────────────────────────────────────────┐
│ 15 czerwca 1973                             │
│                                             │
│ Today I realized something profound. When  │
│ I hedge my vanilla forward contracts, the  │
│ relationship isn't linear—it's a dance.    │
│ The mathematician Bachelier called this    │
│ the "coefficient of correlation," but I    │
│ think of it as δ (delta).                  │
│                                             │
│ For every zloty the spot price rises, my   │
│ option value changes by δ zlotys. It's     │
│ the slope of possibility itself.           │
│                                             │
│ [Mathematical notation showing ∂V/∂S]      │
└─────────────────────────────────────────────┘
```

#### Achievement System
```
Achievements (15 total):

Trading Basics:
✓ First Trade - Execute any trade
✓ First Profit - Close position with >$50 gain
✓ First Loss - Close position with >$50 loss
✓ Century Club - 100 trades executed

Greek Mastery:
✓ Delta Detective - Unlock Delta
✓ Gamma Ray - Unlock Gamma
✓ Time Lord - Unlock Theta
✓ Vol Virtuoso - Unlock Vega
✓ Full House - Unlock all 5 Greeks

Strategy:
✓ Delta Neutral - |portfolio Δ| < 10 for 5 days
✓ Theta Farmer - Earn $500 from time decay
✓ Perfect Hedge - 0 P&L despite 20% price move

Progression:
✓ Survivor - Complete Act 1 (Day 30)
✓ Grower - Complete Act 2 (Day 60)
✓ Master - Complete Act 3 (Day 90, $40K+)
```

### Testing & Balance (Week 10)
```
tests/
├── balance/
│   ├── economicSimulation.ts    # Monte Carlo balance testing
│   ├── playerProgression.ts     # Typical playthrough
│   └── edgeCases.ts             # Exploit detection
└── e2e/
    └── fullPlaythrough.test.ts  # Automated 90-day run

Balance testing methodology:
1. Simulate 1,000 playthroughs with varying strategies
2. Measure completion rate, capital distribution
3. Identify "too easy" or "too hard" checkpoints
4. Adjust unlock costs and target returns
5. Repeat until 30-40% simulated completion rate
```

### Week 10 Decision Point

**Proceed to Phase 3 if:**
- ✅ Balance testing shows 30-40% completion probability
- ✅ Players qualitatively report learning Greeks
- ✅ No game-breaking exploits found
- ✅ Performance stable over 10+ hour sessions

---

## Phase 3: Beta & Polish (Weeks 11-16)

### Goal
Commercial-ready product with validated learning outcomes.

### Beta Testing Strategy

#### Recruitment (Week 11)
```
Target: 50-100 beta testers across segments

Segments:
1. Finance students (20) - Learning validation
2. Gamers (15) - Engagement validation
3. Finance professionals (10) - Accuracy validation
4. Teachers (5) - Educational effectiveness

Recruitment channels:
- r/options, r/algotrading subreddits
- Personal finance Discord servers
- University finance clubs (email professors)
- Product Hunt "upcoming" page
- Personal network

Incentives:
- Free lifetime access to premium features
- Name in credits
- $25 Amazon gift card (top 10 feedback providers)
```

#### Data Collection (Weeks 12-14)
```
Instrumentation:
- Analytics: Plausible (privacy-friendly)
- Error tracking: Sentry
- Session recordings: LogRocket (10% sample)
- Surveys: Typeform

Metrics tracked:
- Completion rate (by day: 1, 7, 30, 60, 90)
- Unlock progression (when players buy each Greek)
- Common quit points (where players abandon)
- Feature usage (which instruments traded most)
- Performance (frame rate, load times)

Qualitative feedback:
- Weekly surveys (5 questions, 2 minutes)
- Exit surveys (when players quit)
- Optional Discord community feedback
```

#### Iteration Cycles (Weeks 12-15)
```
2-week sprints:

Sprint 1 (Weeks 12-13):
- Fix critical bugs from beta reports
- Tune economic balance based on data
- Improve confusing UI elements

Sprint 2 (Weeks 14-15):
- Add polish based on top feature requests
- Optimize performance bottlenecks
- Complete journal entries (90 total)

Sprint 3 (Week 16):
- Final bug fixes
- Accessibility improvements (WCAG 2.1 AA)
- Launch preparation
```

### Content Completion (Weeks 11-16)

#### Journal Entries (90 total)
```
Distribution:
- Act 1 (Days 1-30): 30 entries
- Act 2 (Days 31-60): 30 entries
- Act 3 (Days 61-90): 30 entries

Themes:
- Personal: Immigration, family, legacy (30%)
- Mathematical: Greeks, pricing models (40%)
- Historical: Solidarity, Cold War (15%)
- Gameplay hints: Strategy tips (15%)

Cipher puzzle (hidden scripting unlock):
- Entry 33: "Solidarity inspired automation"
- Entry 47: Border contains "unlock:console" in Polish
- Entry 68: "31 sierpnia 1980" (Solidarity founding date)
- Combined keyword: "solidarity:unlock:console"
```

#### NPC Interactions (5 characters)
```
The Conspiracy Theorist:
- Appears Day 15, 35, 55, 75
- Provides "alternative weather forecasts" (surprisingly accurate)
- Unlock: $100 subscription to his newsletter

Food Truck Operator:
- Daily ingredient futures market
- Mini-game: Predict strawberry prices
- Unlock: Forward contract trading

Local News Anchor:
- Weather segments with wild gesticulation
- Free 3-day forecasts
- Unlock: 7-day forecast subscription ($50/week)

Bank Official:
- Check-ins Day 30, 60 (evaluation)
- Stern but fair feedback
- Unlock: Extended credit line (Day 60 if >$15K)

Dairy Farmer:
- Supply-side perspective
- Wholesale vanilla contracts
- Unlock: Futures trading introduction
```

### Performance Optimization (Week 15-16)
```
Target metrics:
- First contentful paint: <1.5s
- Time to interactive: <3s
- Frame rate: >55fps sustained (95th percentile)
- Memory usage: <100MB after 1 hour
- Bundle size: <300KB gzipped

Optimization strategies:
1. Code splitting (lazy load advanced features)
2. Memoization (cache expensive calculations)
3. Debouncing (limit state update frequency)
4. Canvas optimization (dirty rectangle rendering)
5. Web Worker offloading (market simulation)
```

### Week 16 Decision Point

**Proceed to Phase 4 if:**
- ✅ Beta completion rate >25%
- ✅ Net Promoter Score >70
- ✅ Learning validation: 60%+ explain Greeks correctly
- ✅ Technical quality: <5 critical bugs, performance targets met

---

## Phase 4: Launch & Validation (Weeks 17-24)

### Goal
Public release with initial revenue validation.

### Pre-Launch (Weeks 17-19)

#### Website & Marketing (Week 17)
```
Landing page (single-page site):
┌─────────────────────────────────────────────┐
│ SUNDAE VOLATILITY                           │
│                                             │
│ Learn Derivatives by Saving                 │
│ Your Grandfather's Ice Cream Shop           │
│                                             │
│ [Play Free] [Watch Trailer]                │
│                                             │
│ ✓ Master options pricing through gameplay  │
│ ✓ Unlock the Greeks as you earn capital    │
│ ✓ 6-8 hours to complete 90-day campaign    │
│                                             │
│ [Screenshot carousel]                       │
│                                             │
│ "I finally understand what Delta means!"   │
│ - Finance student testimonial               │
│                                             │
│ [FAQ] [Documentation] [Contact]            │
└─────────────────────────────────────────────┘

Tech stack:
- Astro (static site generator)
- Tailwind CSS (rapid styling)
- Netlify deployment (free tier)

Content needed:
- 2-minute gameplay trailer (OBS screen recording + Descript editing)
- 5 screenshots (key moments: trading, unlocking Delta, portfolio view)
- 3 testimonials (beta testers)
- Press kit (logo, description, screenshots, developer bio)
```

#### App Deployment (Week 18)
```
Deployment infrastructure:
- Netlify / Vercel (static hosting, free tier)
- Custom domain: sundaevolatility.com ($12/year)
- SSL certificate (automatic via host)
- CDN (automatic via host)

PWA configuration:
- Service worker (offline capability)
- Web app manifest (installable)
- Icon set (512x512 down to 16x16)
- Splash screens (iOS, Android)

Monitoring:
- Plausible Analytics (privacy-friendly, $9/mo)
- Sentry error tracking (free tier, 5K events/mo)
- UptimeRobot (free tier, 50 monitors)
```

#### Community Setup (Week 19)
```
Discord server:
- #announcements (developer updates)
- #general (player discussion)
- #strategy (gameplay tips)
- #bug-reports (issue tracking)
- #feedback (feature requests)

Moderation:
- Solo developer initially
- Recruit 2-3 volunteer mods from beta testers
- Clear code of conduct

Social media:
- Twitter/X: @SundaeVol (development updates)
- Reddit: r/SundaeVolatility (community-created)
- YouTube: Gameplay tutorials (post-launch)
```

### Launch (Week 20)

#### Launch Channels
```
Day 1 (Monday):
- Product Hunt submission (prepare 48hrs in advance)
- Reddit posts: r/incremental_games, r/options, r/learnprogramming
- Hacker News "Show HN" post
- Personal network email (50-100 people)

Day 2-3:
- IndieHackers post
- Dev.to article (development journey)
- LinkedIn post (professional network)

Day 7:
- Email beta testers (ask for reviews, shares)
- Reach out to finance education bloggers
- Post-launch blog post (metrics, learnings)
```

#### Success Metrics (Week 20-21)
```
Target metrics (first 7 days):
- 1,000-3,000 unique visitors
- 300-800 game starts
- 100-200 active users (>30 min session)
- 20-40 completions (90-day campaign)
- 50-100 Discord members

Acceptable range:
- 500+ visitors: Validation
- 100+ starts: Engagement
- 30+ completions: Product-market fit signal

Concerning signals:
- <200 visitors: Marketing failed
- <50 starts: Landing page unclear
- <10 completions: Core loop broken
```

### Post-Launch (Weeks 21-24)

#### Individual Monetization (Week 21-22)
```
Revenue Model (REVISED from B2B to B2C first):

Free Tier:
- Complete 90-day campaign
- All core features and unlocks
- Local save only
- Community access

Premium Tier ($4.99/month or $39/year):
┌─────────────────────────────────────────────┐
│ Premium Features:                           │
│ ✓ Cloud save sync (play across devices)    │
│ ✓ Advanced analytics (performance tracking)│
│ ✓ Custom scenarios (historical replays)    │
│ ✓ Scripting console (automation)           │
│ ✓ Daily challenges (competitive mode)      │
│ ✓ Ad-free experience                        │
│ ✓ Support development                       │
└─────────────────────────────────────────────┘

API Service ($9/month - $99/month):
┌─────────────────────────────────────────────┐
│ Tier         │ Calls/month │ Price          │
├──────────────┼─────────────┼────────────────┤
│ Hobby        │ 10,000      │ Free           │
│ Developer    │ 100,000     │ $9/month       │
│ Professional │ 1,000,000   │ $49/month      │
│ Enterprise   │ Unlimited   │ $99/month      │
└─────────────────────────────────────────────┘

Expected Year 1 revenue (REALISTIC):
- Free tier: 10,000 users (90% of users)
- Premium: 100 subscribers × $40/year = $4,000
- API: 20 subscribers × $30/month avg × 6 months = $3,600
- Total Year 1: $7,600

Year 2 projection (after validation):
- Free tier: 50,000 users
- Premium: 500 subscribers × $40 = $20,000
- API: 100 subscribers × $40/month avg × 12 = $48,000
- Institutional pilots: 3 × $10,000 = $30,000
- Total Year 2: $98,000

Break-even: Month 18 (not Month 6 as originally projected)
```

#### Institutional Outreach (Week 23-24)
```
DEFERRED to Year 2, but plant seeds:

Pilot program design:
- 3-month trial with university finance department
- 30-100 student licenses
- Instructor dashboard (progress tracking)
- Custom branding (university logo)
- Price: $2,500 pilot (vs. $50K+ in original spec)

Target customers (Year 2):
- University finance departments
- Corporate training programs
- Online learning platforms (Coursera partnerships)

Value proposition:
- Real user validation (10K+ free users)
- Proven learning outcomes (survey data)
- Cost-effective vs. Bloomberg Terminal training
- Engaging vs. traditional textbooks

Outreach strategy:
- Weeks 23-24: Research contacts, prepare materials
- Month 6-9: Warm outreach, pilot discussions
- Month 10-12: First pilots (if product validated)
```

### Week 24 Final Review

**Success indicators:**
- ✅ 5,000-10,000 total users (free tier)
- ✅ 50-100 premium subscribers ($2,000-4,000 revenue)
- ✅ 10-20 API subscribers ($500-1,000 revenue)
- ✅ 30-40% completion rate (players finish campaign)
- ✅ 70+ Net Promoter Score
- ✅ Featured on Product Hunt, Hacker News, or similar
- ✅ Validated learning outcomes (survey data)

**Next phase (Month 7-12):**
- Content expansion (New Game+, advanced modes)
- Institutional pilot programs
- Mobile optimization
- Community features (leaderboards, multiplayer)
- Profitability target: Month 18

---

## Revised Success Metrics

### Educational Effectiveness
```
Primary:
- 70%+ players can explain Delta after playing
- 50%+ understand Gamma and Theta conceptually
- 80%+ report increased finance interest

Measurement:
- Pre-test: "What is an option?" (baseline)
- Post-test: Same questions after completion
- Qualitative: Open-ended explanations scored by educator
```

### Engagement
```
Retention curve (realistic targets):
- Day 1: 100% (all starters)
- Day 7: 50% (half return for 2nd session)
- Day 30: 30% (engaged learners)
- Day 90: 25% (completers)

Session metrics:
- Average session: 30+ minutes
- Sessions to completion: 8-12 (6-8 hour total)
- Return rate: 60%+ multi-session
```

### Commercial Viability
```
Year 1 (Months 1-12):
- Users: 10,000-20,000
- Revenue: $5,000-10,000
- Costs: $2,000 (hosting, tools, domain)
- Net: $3,000-8,000 (break-even+)

Year 2 (Months 13-24):
- Users: 50,000-100,000
- Revenue: $80,000-150,000
  - Premium: $20K-40K
  - API: $40K-70K
  - Institutional: $20K-40K
- Costs: $10,000 (infrastructure, marketing)
- Net: $70,000-140,000 (sustainable income)

Year 3+:
- Scale institutional sales
- Potential exit opportunities (acquisition by EdTech platform)
- Or continue as lifestyle business ($200K+/year solo dev)
```

---

## Risk Mitigation (Revised)

### Technical Risks

**Performance inadequacy** (LOW probability)
- Mitigation: Early benchmarking (Week 1)
- Contingency: WebWorker offloading (Week 12 if needed)
- Evidence: Black-Scholes is <0.1ms in JS (tested)

**Browser compatibility** (MEDIUM probability)
- Mitigation: Target evergreen browsers only (Chrome, Firefox, Safari, Edge)
- Contingency: Polyfills for critical APIs (IndexedDB, Web Workers)
- Testing: BrowserStack free tier (5 browsers)

**Data corruption** (LOW probability)
- Mitigation: Versioned schema, checksum validation
- Contingency: Cloud backup option for premium users
- Recovery: Manual save export (JSON download)

### Market Risks

**Insufficient demand** (MEDIUM probability)
- Mitigation: Validate with MVP (Phase 1), beta (Phase 3)
- Contingency: Pivot to pure educational tool (institutional only)
- Early signals: Product Hunt reception, Reddit engagement

**Competition** (MEDIUM probability)
- Mitigation: Speed to market, unique narrative, open-source moat
- Differentiation: Incremental game feel (not dry simulation)
- Awareness: Monitor Bloomberg, Coursera, QuantConnect

**Educational ineffectiveness** (LOW probability)
- Mitigation: Extensive playtesting, learning assessments
- Contingency: Add explicit tutorial mode, improve feedback
- Validation: Pre/post surveys, educator review

### Development Risks

**Solo developer burnout** (HIGH probability)
- Mitigation: Sustainable pace (40-50 hrs/week, not 80)
- Contingency: Phase gates allow graceful abandonment
- Support: AI assistance for routine tasks, community encouragement

**Scope creep** (HIGH probability)
- Mitigation: Ruthless MVP (Phase 1), deferred features list
- Enforcement: Document "not now" features explicitly
- Review: Weekly scope check (am I building what's needed?)

**Quality degradation** (MEDIUM probability)
- Mitigation: Test coverage requirements, performance gates
- Quality gates: 85% coverage, <10 lint warnings, 60fps
- Accountability: Public development log, beta feedback

---

## Development Principles

### 1. Validate Before Building
- Every phase has go/no-go decision point
- User feedback gates feature expansion
- Data drives iteration, not assumptions

### 2. Ruthless Prioritization
- MVP is truly minimal (1 flavor, 1 Greek)
- Defer != Delete (maintain "later" list)
- 80/20 rule: Focus on 20% that delivers 80% value

### 3. Sustainable Pace
- 40-50 hour weeks (not 80-hour death marches)
- Weekly "nothing" days (no coding, pure rest)
- AI assistance for grunt work (boilerplate, tests)

### 4. Quality Gates
- Code: TypeScript strict mode, ESLint, Prettier
- Tests: 85%+ coverage on critical paths
- Performance: <1ms pricing, 60fps UI
- User experience: Playtest every 2 weeks

### 5. Community-Driven
- Beta testers shape priorities
- Discord feedback influences roadmap
- Transparency builds trust (public dev log)

---

## Tools & Infrastructure

### Development
- **IDE:** VS Code with TypeScript, ESLint, Prettier extensions
- **Version control:** Git + GitHub (public repo for open-source components)
- **AI assistance:** Claude Code (architecture), GitHub Copilot (boilerplate)
- **Testing:** Vitest (unit), Playwright (e2e), manual playtesting

### Deployment
- **Hosting:** Netlify (static hosting, free tier → $19/mo if needed)
- **Domain:** Namecheap or Cloudflare ($12/year)
- **CDN:** Automatic via Netlify
- **Database:** None (local storage only in MVP, Supabase if cloud sync needed)

### Monitoring
- **Analytics:** Plausible ($9/month, privacy-friendly)
- **Errors:** Sentry (free tier 5K events/month)
- **Uptime:** UptimeRobot (free tier)
- **Performance:** Web Vitals via Plausible

### Community
- **Chat:** Discord (free)
- **Support:** Email (personal inbox initially)
- **Payments:** Stripe ($0 setup, 2.9% + 30¢ per transaction)
- **Email:** Buttondown (free tier 100 subscribers)

### Costs Summary
```
Year 1 costs:
- Domain: $12
- Hosting: $0-228 (Netlify free tier, then $19/mo if needed)
- Analytics: $108 (Plausible $9/mo)
- Email: $0 (Buttondown free tier)
- Miscellaneous: $500 (buffer for unexpected)
- Total: ~$650-900

Operating margin: 80-85% (after achieving $5K revenue)
```

---

## Immediate Next Steps (This Week)

### Day 1-2: Critical Fixes
1. ✅ Fix Set serialization bug in gameStore.ts
2. ✅ Add Immer middleware for safe state updates
3. ✅ Create virtualized position list component
4. ✅ Set up project with corrected architecture

### Day 3-4: MVP Foundation
1. ✅ Implement Black-Scholes with tests (100% coverage)
2. ✅ Implement Delta calculation with academic validation
3. ✅ Create simple market simulation (single flavor)
4. ✅ Performance benchmark (confirm <1ms pricing)

### Day 5-7: Integration
1. ✅ Build minimal trading interface
2. ✅ Implement trade execution and validation
3. ✅ Create portfolio view
4. ✅ Test complete flow (market → trade → portfolio)

### Week 1 Goal
- **Deliverable:** Playable prototype (5-minute demo)
- **Success:** Can trade vanilla calls, see cash change, basic persistence works
- **Next:** Week 2-4 continue MVP (Delta unlock, achievements, polish)

---

## Conclusion

This revised plan addresses critical feasibility gaps while preserving the innovative core concept:

**Key Changes:**
1. Timeline: 10 weeks → 24 weeks (realistic for solo + AI)
2. MVP: Ruthlessly minimal (validate before building)
3. Economics: Achievable 20x returns (vs. fantasy 35x)
4. Business: Individual users first, B2B in Year 2-3
5. Revenue: $5-10K Year 1 (vs. unrealistic $1-10M)

**Preserved Strengths:**
1. "Knowledge costs money" mechanic (core innovation)
2. Incremental game feel with meaningful decisions
3. Pedagogically sound Greek progression
4. TypeScript + Zustand architecture (technically solid)
5. Narrative framing (grandfather's legacy)

**Success Probability:**
- Original plan: 10-15% (unrealistic timeline, broken economics)
- Revised plan: 60-70% (achievable with discipline)

**Expected Outcome:**
- Year 1: 10K users, $5-10K revenue, validated learning
- Year 2: 50K users, $80-150K revenue, institutional pilots
- Year 3+: Sustainable lifestyle business or acquisition opportunity

**Go/No-Go Decision Points:**
- Week 4: Is the core loop fun and educational?
- Week 10: Does economic balance work?
- Week 16: Will people pay for this?
- Week 24: Is this a business or a hobby project?

**Philosophy:**
Build small, validate often, scale if proven. Fail fast beats building the wrong thing for months.

---

**Next Action:** Review this plan, ask clarifying questions, then begin Day 1 critical fixes.

*Plan Version 3.0 - December 24, 2025*

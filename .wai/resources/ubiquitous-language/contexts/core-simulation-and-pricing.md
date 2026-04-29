# Core Simulation and Pricing

This context covers math, simulation, pricing, and internal financial vocabulary.

## Canonical Terms

| Canonical term | Use for | Notes |
|---|---|---|
| Black-Scholes pricing | Option valuation | European-style pricing model used by the core engine |
| Greeks | Sensitivity measures | Internal/math term; player copy says **tools** |
| Delta | First-order spot sensitivity | First analytical tool unlocked |
| Gamma | Rate of change of Delta | Second-order sensitivity |
| Theta | Time decay | Sensitivity to time passing |
| Vega | Volatility sensitivity | Player-facing: weather sensitivity |
| Rho | Interest-rate sensitivity | Late-game/advanced concept |
| GBM | Base random walk | Geometric Brownian Motion |
| mean reversion | Pull toward baseline | O-U process in the engine |
| seasonal baseline | Expected seasonal anchor | Used before drift and jump adjustments |
| jump diffusion | Extreme move model | Merton jump process |
| Monte Carlo stats | Scenario outputs | p5, p95, mean, max loss, max gain |
| time to expiry | Contract horizon | Measured in years internally |
| simulation tick | Smallest model update step | One day or one-third day depending on phase |

## Translation Rules

- In code, use technical terms directly.
- In mixed-audience educational text, use diegetic term first and technical term second.
- In tests, prefer technical correctness over diegetic flair.
- When a concept is taught to the player, the implementation docs may mention both forms, e.g. `weather sensitivity (Vega)`.

## Price Vocabulary

| Term | Definition |
|---|---|
| spot price | Current market value of a flavor |
| strike price | Contract price written into a promise |
| premium | Upfront price paid or received for an option-like promise |
| intrinsic value | Immediate exercise value at expiry |
| discounted intrinsic value | Intrinsic value adjusted by the risk-free rate |

## Numerical Semantics

- **expiry** is measured in years in math interfaces unless a function explicitly says otherwise.
- **volatility** is an annualized decimal, e.g. `0.35`, not `35`.
- **riskFreeRate** is an annualized decimal, e.g. `0.05`, not `5`.
- **dt** is a year fraction for simulation math.

## Words to Avoid in This Context

- **prediction** when the model is stochastic; prefer **simulation**, **estimate**, or **scenario**.
- **random price** when the move is regime-driven; prefer **stochastic price path** or **simulated price path**.
- **AI estimate** for pricing outputs; pricing comes from the model, not an assistant.

## Related Specs

- `openspec/specs/core-engine/spec.md`
- `openspec/specs/agent-contracts/spec.md`

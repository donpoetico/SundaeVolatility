# gameplay-loop Specification

## Purpose
Defines the core gameplay loop: day phase progression, walk-in customer spot sales, counter-offer negotiation mechanics, newspaper information delivery, and the mapping between weather states and price model parameters.

## Requirements

### Requirement: Day Phase System
Each game day SHALL progress through three sequential phases: Morning, Midday, and Evening. Morning is the preparation phase where the player sets prices, restocks ingredients, and reads the newspaper. Midday is the active sales phase where walk-in customers arrive and named characters propose deals. Evening is the settlement phase where expiring contracts are resolved, unsold stock degrades, and end-of-day accounting runs. Phase transitions SHALL be triggered by explicit player action (a "next phase" interaction on the shop clock) rather than real-time timers.

#### Scenario: Morning preparation
- **WHEN** a new day begins
- **THEN** the Morning phase activates, allowing the player to adjust price tags, place restock orders, and read the newspaper before customers arrive.

#### Scenario: Advance to Midday
- **WHEN** the player triggers the phase advance during Morning
- **THEN** the Midday phase begins, walk-in customers start arriving, and named characters may appear with deal proposals.

#### Scenario: Evening settlement
- **WHEN** the player triggers the phase advance during Midday
- **THEN** the Evening phase begins, expiring contracts are settled, unsold stock freshness degrades, and the day's profit/loss is tallied on the register.

### Requirement: Walk-In Customer Spot Sales
Walk-in customers SHALL arrive during the Midday phase at a rate determined by weather and seasonal demand. Each walk-in has a randomly generated willingness-to-pay (WTP) drawn from a normal distribution centered on the ingredient's base market price with standard deviation proportional to current volatility. The customer compares WTP to the player's listed price: if listed price ≤ WTP, the customer buys one serving; if listed price > WTP, the customer's expression changes to frowning and they may leave without purchasing.

#### Scenario: Successful spot sale
- **GIVEN** the player has set Vanilla price to $3.00
- **AND** a walk-in customer arrives with WTP of $3.20
- **WHEN** the customer sees the listed price
- **THEN** the customer purchases one serving and the register adds $3.00.

#### Scenario: Customer walks away
- **GIVEN** the player has set Vanilla price to $4.50
- **AND** a walk-in customer arrives with WTP of $3.00
- **WHEN** the customer sees the listed price
- **THEN** the customer frowns, hesitates, and leaves without purchasing.

#### Scenario: Demand varies with weather
- **WHEN** the weather is sunny
- **THEN** walk-in arrival rate increases. When the weather is stormy, arrival rate decreases sharply.

### Requirement: Counter-Offer Negotiation
Named characters SHALL accept counter-offers from the player during deal negotiation. The player MAY adjust the price on a deal slip within a bounded range determined by the character's Max Counter-Offer Delta parameter. If the adjusted price falls within the character's acceptance threshold (based on their Price Sensitivity and Risk Tolerance), the character accepts. If the price exceeds the threshold, the character's expression shifts to frowning and they may withdraw the deal after a configurable patience window.

#### Scenario: Successful counter-offer
- **GIVEN** Mrs. Chen proposes a forward at $2.50 per tub
- **AND** her Max Counter-Offer Delta is $0.30
- **WHEN** the player adjusts the price to $2.70
- **THEN** Mrs. Chen's expression shifts to neutral or slight frown, but she accepts the deal within her tolerance range.

#### Scenario: Counter-offer rejected
- **GIVEN** Dmitri proposes a reservation at $2.00
- **AND** his Max Counter-Offer Delta is $0.20
- **WHEN** the player adjusts the price to $2.50 (exceeding the delta)
- **THEN** Dmitri frowns, shakes his head, and withdraws the deal after a brief hesitation.

### Requirement: Newspaper Information System
A newspaper SHALL slide under the shop door at the start of each Morning phase, providing diegetic market intelligence. The newspaper SHALL contain: a weather forecast for the current and next day, seasonal trend commentary, a flavor-specific demand hint (e.g., "Strawberry Festival This Weekend"), and occasionally a story foreshadowing a named character's visit. The information SHALL be imperfect — forecasts have a configurable accuracy rate (default 80%) to reward but not guarantee planning.

#### Scenario: Read the morning forecast
- **WHEN** the player unfolds the newspaper during Morning
- **THEN** they see a weather forecast, a seasonal commentary, and a demand hint, all presented in Gazette Serif as diegetic newspaper content.

#### Scenario: Inaccurate forecast
- **GIVEN** the newspaper predicts sunny weather
- **AND** the forecast accuracy roll fails (20% chance)
- **WHEN** Midday begins
- **THEN** the actual weather differs from the forecast, and customer arrival rate reflects the actual weather, not the prediction.

### Requirement: Weather-to-Price Mapping
The visual weather state SHALL correspond to specific price model parameters. Sunny maps to low volatility (σ = 0.15–0.25) and positive drift. Cloudy maps to moderate volatility (σ = 0.25–0.35) and neutral drift. Rainy maps to elevated volatility (σ = 0.35–0.50) and slight negative drift. Storm maps to high volatility (σ = 0.50–0.70) with Merton jump probability increased 3x. Snowy maps to low volatility but with seasonal demand suppression. Festival maps to low volatility with a demand multiplier of 2x.

#### Scenario: Storm drives volatility
- **WHEN** the weather state is Storm
- **THEN** the core engine uses σ in the 0.50–0.70 range and Merton jump arrival probability is tripled relative to the base rate.

#### Scenario: Festival boosts demand
- **WHEN** the weather state is Festival
- **THEN** volatility remains low (σ = 0.15–0.25) but walk-in customer arrival rate is doubled and named character deal volume increases.

/**
 * SUNDAE VOLATILITY - UX PROTOTYPE
 * Interactive JavaScript for testing UX concepts
 */

// ===================================
// MOCK DATA & STATE
// ===================================

const state = {
    capital: 10000,
    daysRemaining: 90,
    gameSpeed: 2,

    flavors: [
        {
            id: 'vanilla',
            name: 'Vanilla',
            icon: '🍦',
            spotPrice: 2.50,
            volatility: 0.35,
            change: 0.05,
            trend: 'up'
        },
        {
            id: 'chocolate',
            name: 'Chocolate',
            icon: '🍫',
            spotPrice: 2.80,
            volatility: 0.50,
            change: -0.12,
            trend: 'down'
        },
        {
            id: 'strawberry',
            name: 'Strawberry',
            icon: '🍓',
            spotPrice: 2.20,
            volatility: 0.25,
            change: 0.00,
            trend: 'flat'
        }
    ],

    selectedInstrument: 'forwards',
    selectedUnderlying: 'vanilla',

    activePositions: [],
    recentTrades: [],

    knowledgeUnlocked: {
        delta: false,
        gamma: false,
        theta: false,
        vega: false,
        rho: false
    }
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🍦 Sundae Volatility UX Prototype Loaded');

    initializeEventListeners();
    updateUI();
    startGameLoop();
});

// ===================================
// EVENT LISTENERS
// ===================================

function initializeEventListeners() {
    // Instrument tabs
    document.querySelectorAll('.instrument-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (!tab.classList.contains('locked')) {
                handleInstrumentChange(tab.dataset.instrument);
            }
        });
    });

    // Position toggle
    document.querySelectorAll('.position-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            handlePositionToggle(btn.dataset.position);
        });
    });

    // Execute trade button
    document.getElementById('executeTrade')?.addEventListener('click', () => {
        handleExecuteTrade();
    });

    // Game speed controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleSpeedChange(parseInt(btn.dataset.speed));
        });
    });

    // Underlying selector
    document.getElementById('underlying')?.addEventListener('change', (e) => {
        state.selectedUnderlying = e.target.value;
        updatePricing();
    });

    // Strike/Maturity inputs
    document.getElementById('strike')?.addEventListener('input', updatePricing);
    document.getElementById('maturity')?.addEventListener('input', updatePricing);
    document.getElementById('quantity')?.addEventListener('input', updatePricing);

    // Knowledge purchases
    document.querySelectorAll('.btn-purchase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const knowledgeItem = e.target.closest('.knowledge-item');
            handleKnowledgePurchase(knowledgeItem);
        });
    });

    // Close position buttons
    document.querySelectorAll('.btn-close-position').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const positionItem = e.target.closest('.position-item');
            handleClosePosition(positionItem);
        });
    });

    // Flavor card clicks
    document.querySelectorAll('.flavor-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!card.classList.contains('locked')) {
                highlightFlavorCard(card);
            }
        });
    });
}

// ===================================
// EVENT HANDLERS
// ===================================

function handleInstrumentChange(instrument) {
    state.selectedInstrument = instrument;

    // Update active tab
    document.querySelectorAll('.instrument-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-instrument="${instrument}"]`)?.classList.add('active');

    updatePricing();
    console.log(`Switched to ${instrument}`);
}

function handlePositionToggle(position) {
    // Update active button
    document.querySelectorAll('.position-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-position="${position}"]`)?.classList.add('active');

    updatePricing();
    console.log(`Position: ${position}`);
}

function handleExecuteTrade() {
    const underlying = document.getElementById('underlying')?.value;
    const strike = parseFloat(document.getElementById('strike')?.value || 0);
    const maturity = parseInt(document.getElementById('maturity')?.value || 0);
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);
    const premium = parseFloat(document.getElementById('premium')?.textContent.replace('$', '') || 0);
    const totalCost = parseFloat(document.getElementById('totalCost')?.textContent.replace('$', '') || 0);

    // Validation
    if (totalCost > state.capital) {
        showNotification('Insufficient capital!', 'error');
        return;
    }

    // Execute trade
    state.capital -= totalCost;

    // Add to positions
    const newPosition = {
        id: Date.now(),
        instrument: state.selectedInstrument,
        underlying,
        strike,
        maturity,
        quantity,
        premium,
        cost: totalCost,
        openDate: new Date()
    };

    state.activePositions.push(newPosition);

    showNotification(`Trade executed! Cost: $${totalCost.toFixed(2)}`, 'success');
    updateUI();

    console.log('Trade executed:', newPosition);
}

function handleSpeedChange(speed) {
    state.gameSpeed = speed;

    // Update active button
    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-speed="${speed}"]`)?.classList.add('active');

    console.log(`Game speed: ${speed}x`);
}

function handleKnowledgePurchase(knowledgeItem) {
    const greekName = knowledgeItem.querySelector('.knowledge-name')?.textContent.toLowerCase();
    const price = parseFloat(knowledgeItem.querySelector('.knowledge-price')?.textContent.replace('$', '').replace(',', '') || 0);

    if (state.capital >= price) {
        state.capital -= price;
        state.knowledgeUnlocked[greekName] = true;

        knowledgeItem.classList.add('locked');
        knowledgeItem.querySelector('.btn-purchase').disabled = true;
        knowledgeItem.querySelector('.btn-purchase').textContent = 'Purchased ✓';

        showNotification(`${greekName.charAt(0).toUpperCase() + greekName.slice(1)} unlocked!`, 'success');
        updateUI();

        // Unlock Greeks display if Delta purchased
        if (greekName === 'delta') {
            document.querySelector('.greeks-display')?.classList.remove('locked');
        }
    } else {
        showNotification('Insufficient capital!', 'error');
    }
}

function handleClosePosition(positionItem) {
    // Mock: randomly profit or loss
    const pnl = (Math.random() - 0.4) * 100;
    state.capital += pnl;

    showNotification(`Position closed. P&L: $${pnl.toFixed(2)}`, pnl >= 0 ? 'success' : 'error');
    positionItem.remove();
    updateUI();
}

function highlightFlavorCard(card) {
    document.querySelectorAll('.flavor-card').forEach(c => {
        c.style.transform = '';
        c.style.boxShadow = '';
    });

    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 8px 24px rgba(233, 69, 96, 0.4)';

    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 2000);
}

// ===================================
// UI UPDATES
// ===================================

function updateUI() {
    // Update capital display
    const capitalEl = document.getElementById('capital');
    if (capitalEl) {
        capitalEl.textContent = formatCurrency(state.capital);

        // Color based on capital level
        if (state.capital < 5000) {
            capitalEl.style.color = 'var(--color-danger)';
        } else if (state.capital < 10000) {
            capitalEl.style.color = 'var(--color-warning)';
        } else {
            capitalEl.style.color = 'var(--color-success)';
        }
    }

    // Update days remaining
    const daysEl = document.getElementById('daysRemaining');
    if (daysEl) {
        daysEl.textContent = state.daysRemaining;

        // Color based on urgency
        if (state.daysRemaining < 30) {
            daysEl.style.color = 'var(--color-danger)';
        } else if (state.daysRemaining < 60) {
            daysEl.style.color = 'var(--color-warning)';
        }
    }
}

function updatePricing() {
    // Mock pricing calculation
    const strike = parseFloat(document.getElementById('strike')?.value || 2.50);
    const maturity = parseInt(document.getElementById('maturity')?.value || 30);
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);

    const flavor = state.flavors.find(f => f.id === state.selectedUnderlying);
    if (!flavor) return;

    // Simple mock pricing
    let premium = 0;

    if (state.selectedInstrument === 'forwards') {
        premium = 0; // Forwards have no premium
    } else if (state.selectedInstrument === 'calls') {
        const moneyness = flavor.spotPrice - strike;
        const timeValue = Math.sqrt(maturity / 365) * flavor.volatility * flavor.spotPrice;
        premium = Math.max(0.05, moneyness + timeValue);
    }

    const totalCost = premium * quantity;

    // Update UI
    const premiumEl = document.getElementById('premium');
    const totalCostEl = document.getElementById('totalCost');

    if (premiumEl) premiumEl.textContent = formatCurrency(premium);
    if (totalCostEl) totalCostEl.textContent = formatCurrency(totalCost);
}

// ===================================
// GAME LOOP
// ===================================

let lastTick = Date.now();

function startGameLoop() {
    setInterval(() => {
        const now = Date.now();
        const deltaTime = (now - lastTick) * state.gameSpeed;
        lastTick = now;

        // Update prices (random walk)
        updatePrices(deltaTime);

        // Update positions
        updatePositions(deltaTime);

        // Advance time (very slowly for demo)
        if (Math.random() < 0.01 * state.gameSpeed) {
            state.daysRemaining = Math.max(0, state.daysRemaining - 1);
            updateUI();
        }
    }, 1000);
}

function updatePrices(deltaTime) {
    state.flavors.forEach(flavor => {
        // Random walk
        const volatility = flavor.volatility;
        const dt = deltaTime / (1000 * 60 * 60 * 24); // Convert to days
        const randomShock = (Math.random() - 0.5) * 2;
        const priceChange = flavor.spotPrice * volatility * randomShock * Math.sqrt(dt);

        flavor.spotPrice = Math.max(0.1, flavor.spotPrice + priceChange);
        flavor.change = priceChange;

        // Update trend
        if (priceChange > 0.01) flavor.trend = 'up';
        else if (priceChange < -0.01) flavor.trend = 'down';
        else flavor.trend = 'flat';

        // Update DOM
        updateFlavorCard(flavor);
    });
}

function updateFlavorCard(flavor) {
    const card = document.querySelector(`.flavor-card.${flavor.id}`);
    if (!card) return;

    const priceEl = card.querySelector('.flavor-price');
    const changeEl = card.querySelector('.flavor-change');
    const trendEl = card.querySelector('.flavor-trend');

    if (priceEl) priceEl.textContent = formatCurrency(flavor.spotPrice);

    if (changeEl) {
        const changePercent = (flavor.change / flavor.spotPrice) * 100;
        const sign = flavor.change >= 0 ? '+' : '';
        changeEl.textContent = `${sign}${formatCurrency(flavor.change)} (${changePercent.toFixed(1)}%)`;

        changeEl.classList.remove('positive', 'negative', 'neutral');
        if (flavor.change > 0.01) changeEl.classList.add('positive');
        else if (flavor.change < -0.01) changeEl.classList.add('negative');
        else changeEl.classList.add('neutral');
    }

    if (trendEl) {
        trendEl.textContent = flavor.trend === 'up' ? '📈' : flavor.trend === 'down' ? '📉' : '→';
    }
}

function updatePositions(deltaTime) {
    // Mock position value updates
    // In real game, would recalculate option values
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-accent)'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// DEVELOPER TOOLS
// ===================================

// Expose state for Chrome DevTools debugging
window.sundaeState = state;

console.log(`
🍦 SUNDAE VOLATILITY - UX PROTOTYPE
================================
Open Chrome DevTools and try:
- window.sundaeState (view game state)
- Press F12 to inspect elements
- Use Elements panel to modify CSS in real-time
- Use Console to test interactions
`);

/**
 * Sundae Volatility - Minimal Prototype
 * Simplified interaction logic for single-view focus
 */

// ============================================
// STATE MANAGEMENT (Simplified)
// ============================================

const state = {
    capital: 10000,
    day: 1,
    currentView: 'market',

    prices: {
        vanilla: 2.52,
        chocolate: 2.79,
        strawberry: 2.19,
        mint: null // Locked
    },

    positions: [],
    knowledge: {
        delta: false,
        gamma: false,
        vega: false
    }
};

// ============================================
// VIEW MANAGEMENT
// ============================================

function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });

    // Show requested view
    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
        targetView.classList.remove('hidden');
    }

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
    });
    const activeNav = document.querySelector(`[data-view="${viewName}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    state.currentView = viewName;
}

function showMarketView() {
    showView('market');
}

function showTradeView() {
    showView('trade');
    updateCostPreview();
}

function showPortfolioView() {
    showView('portfolio');
    renderPositions();
}

function showKnowledgeView() {
    showView('knowledge');
}

// ============================================
// MARKET SIMULATION (Simplified)
// ============================================

function updatePrices() {
    const flavors = ['vanilla', 'chocolate', 'strawberry'];

    flavors.forEach(flavor => {
        const card = document.querySelector(`.price-card[data-flavor="${flavor}"]`);
        if (!card) return;

        // Random walk with smaller movements
        const change = (Math.random() - 0.5) * 0.3;
        const oldPrice = state.prices[flavor];
        const newPrice = Math.max(0.5, oldPrice + change);
        state.prices[flavor] = parseFloat(newPrice.toFixed(2));

        // Update UI
        const priceMain = card.querySelector('.price-main');
        const priceChange = card.querySelector('.price-change');

        priceMain.textContent = `$${newPrice.toFixed(2)}`;

        const diff = newPrice - oldPrice;
        priceChange.textContent = `$${Math.abs(diff).toFixed(2)}`;

        // Update class
        priceChange.classList.remove('positive', 'negative', 'neutral');
        if (diff > 0.01) {
            priceChange.classList.add('positive');
        } else if (diff < -0.01) {
            priceChange.classList.add('negative');
        } else {
            priceChange.classList.add('neutral');
        }
    });
}

// ============================================
// TRADING LOGIC (Simplified)
// ============================================

function updateCostPreview() {
    const flavor = document.getElementById('flavorSelect').value;
    const strike = parseFloat(document.getElementById('strikePrice').value) || 0;
    const maturity = parseInt(document.getElementById('maturity').value) || 30;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    const instrument = document.querySelector('.btn-group-item[data-instrument].active')?.dataset.instrument || 'forward';
    const position = document.querySelector('.btn-group-item[data-position].active')?.dataset.position || 'buy';

    // Simplified pricing (not real Black-Scholes)
    let unitCost = 0;

    if (instrument === 'forward') {
        unitCost = state.prices[flavor] || 0;
    } else if (instrument === 'call') {
        // Simplified call option pricing
        const spot = state.prices[flavor] || 0;
        const intrinsic = Math.max(0, spot - strike);
        const timeValue = Math.sqrt(maturity / 365) * spot * 0.3;
        unitCost = intrinsic + timeValue;
    }

    const totalCost = unitCost * quantity;

    const costElement = document.getElementById('costAmount');
    costElement.textContent = `$${totalCost.toFixed(2)}`;

    // Color based on affordability
    if (totalCost > state.capital) {
        costElement.style.color = 'var(--color-negative)';
    } else {
        costElement.style.color = 'var(--color-primary)';
    }
}

function executeTrade(event) {
    event.preventDefault();

    const flavor = document.getElementById('flavorSelect').value;
    const strike = parseFloat(document.getElementById('strikePrice').value);
    const maturity = parseInt(document.getElementById('maturity').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    const instrument = document.querySelector('.btn-group-item[data-instrument].active')?.dataset.instrument || 'forward';
    const position = document.querySelector('.btn-group-item[data-position].active')?.dataset.position || 'buy';

    // Calculate cost
    let unitCost = 0;
    if (instrument === 'forward') {
        unitCost = state.prices[flavor];
    } else if (instrument === 'call') {
        const spot = state.prices[flavor];
        const intrinsic = Math.max(0, spot - strike);
        const timeValue = Math.sqrt(maturity / 365) * spot * 0.3;
        unitCost = intrinsic + timeValue;
    }

    const totalCost = unitCost * quantity;

    // Check if affordable
    if (totalCost > state.capital) {
        showToast('❌ Insufficient capital', 'error');
        return;
    }

    // Execute trade
    state.capital -= totalCost;

    // Add position
    state.positions.push({
        id: Date.now(),
        instrument,
        flavor,
        strike,
        maturity,
        quantity,
        position,
        cost: totalCost,
        entryDay: state.day
    });

    // Update UI
    updateCapitalDisplay();
    showToast(`✅ Trade executed: ${position.toUpperCase()} ${quantity} ${flavor} ${instrument}`, 'success');

    // Go to portfolio
    setTimeout(() => showPortfolioView(), 1000);
}

// ============================================
// PORTFOLIO RENDERING
// ============================================

function renderPositions() {
    const container = document.getElementById('positionsList');
    const emptyState = document.getElementById('emptyPositions');

    if (state.positions.length === 0) {
        emptyState.classList.remove('hidden');
        // Hide any existing position cards
        container.querySelectorAll('.position-card').forEach(card => {
            if (!card.classList.contains('empty-state')) {
                card.remove();
            }
        });
        return;
    }

    emptyState.classList.add('hidden');

    // Clear existing positions (except empty state)
    container.querySelectorAll('.position-card').forEach(card => {
        if (!card.classList.contains('empty-state')) {
            card.remove();
        }
    });

    // Render each position
    state.positions.forEach(pos => {
        const card = createPositionCard(pos);
        container.insertBefore(card, emptyState);
    });
}

function createPositionCard(position) {
    const card = document.createElement('div');
    card.className = 'position-card';

    const currentValue = calculatePositionValue(position);
    const pnl = currentValue - position.cost;
    const pnlClass = pnl >= 0 ? 'positive' : 'negative';

    const flavorEmoji = {
        vanilla: '🍦',
        chocolate: '🍫',
        strawberry: '🍓',
        mint: '🌿'
    }[position.flavor];

    const daysLeft = position.maturity - (state.day - position.entryDay);

    card.innerHTML = `
        <div class="position-header">
            <span class="position-type ${position.instrument}">${position.instrument.toUpperCase()}</span>
            <span class="position-flavor">${flavorEmoji} ${capitalize(position.flavor)}</span>
        </div>
        <div class="position-details">
            <div class="detail-row">
                <span class="detail-label">Strike:</span>
                <span class="detail-value">$${position.strike.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Expiry:</span>
                <span class="detail-value">${daysLeft} days</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Cost:</span>
                <span class="detail-value">$${position.cost.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Current:</span>
                <span class="detail-value">$${currentValue.toFixed(2)}</span>
            </div>
        </div>
        <div class="position-pnl ${pnlClass}">
            <span class="pnl-label">P&L:</span>
            <span class="pnl-value">${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}</span>
        </div>
        <button class="close-button" onclick="closePosition(${position.id})">Close Position</button>
    `;

    return card;
}

function calculatePositionValue(position) {
    const spot = state.prices[position.flavor];

    if (position.instrument === 'forward') {
        return spot * position.quantity;
    } else if (position.instrument === 'call') {
        const intrinsic = Math.max(0, spot - position.strike);
        const daysLeft = position.maturity - (state.day - position.entryDay);
        const timeValue = Math.sqrt(Math.max(0, daysLeft) / 365) * spot * 0.3;
        return (intrinsic + timeValue) * position.quantity;
    }

    return position.cost;
}

function closePosition(positionId) {
    const posIndex = state.positions.findIndex(p => p.id === positionId);
    if (posIndex === -1) return;

    const position = state.positions[posIndex];
    const value = calculatePositionValue(position);
    const pnl = value - position.cost;

    // Add value back to capital
    state.capital += value;

    // Remove position
    state.positions.splice(posIndex, 1);

    // Update UI
    updateCapitalDisplay();
    renderPositions();

    const message = pnl >= 0
        ? `✅ Position closed: +$${pnl.toFixed(2)} profit`
        : `❌ Position closed: $${Math.abs(pnl).toFixed(2)} loss`;

    showToast(message, pnl >= 0 ? 'success' : 'error');
}

// ============================================
// UI UPDATES
// ============================================

function updateCapitalDisplay() {
    const capitalEl = document.getElementById('capital');
    capitalEl.textContent = `$${state.capital.toFixed(2)}`;

    // Color based on amount
    if (state.capital < 5000) {
        capitalEl.style.color = 'var(--color-negative)';
    } else if (state.capital > 15000) {
        capitalEl.style.color = 'var(--color-positive)';
    } else {
        capitalEl.style.color = 'var(--color-primary)';
    }
}

function updateDayDisplay() {
    document.getElementById('dayNumber').textContent = state.day;
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Button group toggles
    document.querySelectorAll('.btn-group-item').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from siblings
            const siblings = this.parentElement.querySelectorAll('.btn-group-item');
            siblings.forEach(sib => sib.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');

            // Update cost if in trade view
            if (state.currentView === 'trade') {
                updateCostPreview();
            }
        });
    });

    // Form inputs update cost preview
    const tradeInputs = ['flavorSelect', 'strikePrice', 'maturity', 'quantity'];
    tradeInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateCostPreview);
            input.addEventListener('change', updateCostPreview);
        }
    });

    // Trade form submission
    const tradeForm = document.getElementById('tradeForm');
    if (tradeForm) {
        tradeForm.addEventListener('submit', executeTrade);
    }

    // Start price updates
    setInterval(updatePrices, 2000); // Every 2 seconds (slower for readability)

    // Initial render
    updateCapitalDisplay();
    updateDayDisplay();
    showMarketView();
});

// Make functions globally available
window.showMarketView = showMarketView;
window.showTradeView = showTradeView;
window.showPortfolioView = showPortfolioView;
window.showKnowledgeView = showKnowledgeView;
window.closePosition = closePosition;
window.sundaeState = state; // For debugging

# Sundae Volatility - UX Prototype

This directory contains an **interactive HTML/CSS/JS prototype** for testing and refining the user experience of Sundae Volatility before full implementation.

## 🎯 Purpose

- **Design Exploration**: Test layout, colors, spacing, and visual hierarchy
- **User Flow Testing**: Experience the trading interface and navigation
- **Mobile Responsiveness**: Validate responsive design across devices
- **Chrome DevTools Workflow**: Live editing and rapid iteration

---

## 📁 Structure

```
ux-prototype/
├── index.html          # Main game interface
├── css/
│   └── styles.css      # Complete styling system
├── js/
│   └── prototype.js    # Interactive behavior & mock data
└── README.md           # This file
```

---

## 🚀 Quick Start

### Option 1: Open Directly in Browser

```bash
# From SundaeVolatility root
open ux-prototype/index.html
# or
google-chrome ux-prototype/index.html
# or
firefox ux-prototype/index.html
```

### Option 2: Use Local Server (Recommended)

```bash
# Using Python
cd ux-prototype
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then open: http://localhost:8000
```

---

## 🎨 Design System

### Color Palette

- **Background Primary**: `#1a1a2e` - Deep navy
- **Background Secondary**: `#16213e` - Rich blue-gray
- **Accent**: `#e94560` - Vibrant pink/red
- **Success**: `#2ecc71` - Green
- **Danger**: `#e74c3c` - Red
- **Warning**: `#f39c12` - Orange

### Ice Cream Flavors

- 🍦 **Vanilla**: `#f9e4b7` - Cream
- 🍫 **Chocolate**: `#8b4513` - Brown
- 🍓 **Strawberry**: `#ff6b9d` - Pink
- 🌿 **Mint Chip**: `#98ff98` - Light green

### Spacing Scale

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px

---

## 🛠️ Using Chrome DevTools

### Live CSS Editing

1. **Open DevTools**: `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. **Select Element**: Click the inspect icon (top-left) or right-click → Inspect
3. **Edit Styles**: Modify CSS in the Styles panel on the right
4. **See Changes Live**: Updates appear instantly

### Common DevTools Tasks

#### Change Colors

```
1. Inspect any element
2. Click the color swatch in Styles panel
3. Use the color picker to try new colors
4. Copy the hex value when you find one you like
```

#### Adjust Spacing

```
1. Inspect an element
2. Find padding/margin in Styles panel
3. Click the value and type new numbers
4. See spacing change in real-time
```

#### Test Responsive Design

```
1. Click the device toolbar icon (Cmd+Shift+M)
2. Select devices from dropdown:
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)
3. Or drag to custom size
```

#### Modify Layout

```
1. Inspect the .game-main container
2. Edit grid-template-columns:
   - Current: 1fr 1.5fr 1fr
   - Try: 1fr 2fr 1fr (wider center)
   - Try: repeat(3, 1fr) (equal width)
```

### JavaScript Console

```javascript
// View current game state
window.sundaeState

// Change capital
window.sundaeState.capital = 50000

// Unlock a Greek
window.sundaeState.knowledgeUnlocked.delta = true

// Change game speed
window.sundaeState.gameSpeed = 5

// Add a flavor
window.sundaeState.flavors.push({
    id: 'mint-chip',
    name: 'Mint Chip',
    icon: '🌿',
    spotPrice: 2.60,
    volatility: 0.65,
    change: 0,
    trend: 'flat'
})
```

---

## 🎮 Interactive Features

### Working Features

✅ **Market Prices**: Live updating prices with random walk simulation
✅ **Trading Interface**: Full form with all controls
✅ **Position Toggle**: Switch between Buy/Sell
✅ **Instrument Tabs**: Switch between Forwards/Calls (Puts/Futures locked)
✅ **Live Pricing**: Updates based on strike, maturity, quantity
✅ **Trade Execution**: Deducts capital and shows notifications
✅ **Knowledge Store**: Purchase Greeks (Delta, Gamma, Vega)
✅ **Game Speed Control**: 1x, 2x, 5x speed
✅ **Responsive Layout**: Mobile, tablet, desktop
✅ **Notifications**: Toast-style success/error messages

### Mock Data

- Prices update randomly every second
- Position values are randomized
- Recent trades are static examples
- Greeks display is locked until Delta purchased

---

## 🎨 Design Experiments to Try

### Layout Changes

1. **Column Widths**: Adjust `.game-main` grid-template-columns
2. **Card Spacing**: Modify `.flavors-grid` gap
3. **Header Height**: Change `.game-header` padding

### Color Schemes

```css
/* Try a brighter theme */
--color-bg-primary: #2c3e50;
--color-bg-secondary: #34495e;
--color-accent: #3498db;

/* Or a warm theme */
--color-bg-primary: #2d1b00;
--color-bg-secondary: #3d2700;
--color-accent: #ff8c42;
```

### Typography

```css
/* Larger text for accessibility */
font-size: 1.1rem; /* was 1rem */

/* Different font stack */
font-family: 'Georgia', serif;

/* Increase spacing */
line-height: 1.8; /* was 1.6 */
```

### Component Variations

```css
/* Rounded corners everywhere */
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;

/* Flat design (no shadows) */
--shadow-sm: none;
--shadow-md: none;
--shadow-lg: none;
```

---

## 📱 Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1200px) {
    /* 2-column layout */
}

/* Mobile */
@media (max-width: 768px) {
    /* 1-column layout */
    /* Stacked navigation */
}

/* Small Mobile */
@media (max-width: 480px) {
    /* Compact text sizes */
}
```

---

## 🎯 UX Testing Checklist

### Visual Hierarchy

- [ ] Capital display is most prominent number
- [ ] Flavor prices are easy to scan
- [ ] Trade button stands out clearly
- [ ] Greeks are discoverable but not distracting

### Information Architecture

- [ ] Market data on left (inputs)
- [ ] Trading controls in center (actions)
- [ ] Portfolio on right (outputs)
- [ ] Clear flow: See prices → Make trade → View positions

### Interaction Design

- [ ] Buttons have hover states
- [ ] Forms have focus states
- [ ] Locked items are clearly disabled
- [ ] Success/error feedback is immediate

### Mobile Usability

- [ ] All text is readable on small screens
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Forms work with mobile keyboards
- [ ] No horizontal scrolling

### Performance

- [ ] Smooth animations (60fps)
- [ ] No layout shifts
- [ ] Fast initial load
- [ ] Responsive interactions

---

## 🔍 Common UX Questions to Answer

### First-Time User Experience

1. **What do I do first?** → Is it obvious to look at market prices and then trade?
2. **How do I make money?** → Is the trading flow intuitive?
3. **What's the goal?** → Is the foreclosure timer prominent?

### Learning Curve

1. **When should I buy Greeks?** → Is cost vs benefit clear?
2. **Which flavor should I trade?** → Are differences visible?
3. **Long vs Short?** → Is position toggle understandable?

### Visual Clarity

1. **Capital at a glance** → Can I see my money instantly?
2. **Position status** → Are profits/losses obvious?
3. **Time pressure** → Is urgency communicated?

---

## 📊 Testing Scenarios

### Scenario 1: New Player

```
1. Open prototype
2. Read header (days remaining, capital)
3. Look at market prices
4. Click a flavor card
5. Fill out trade form
6. Execute trade
7. See notification
8. Check portfolio
```

### Scenario 2: Experienced Player

```
1. Quick scan of all prices
2. Identify opportunity
3. Switch instrument type
4. Configure complex trade
5. Check Greeks (if unlocked)
6. Execute multiple trades
7. Monitor positions
8. Adjust speed
```

### Scenario 3: Mobile Player

```
1. One-handed operation
2. Scroll through panels
3. Tap to interact
4. Read small text
5. Navigate forms
6. Execute trades
```

---

## 🚀 Next Steps

After experimenting with this prototype:

1. **Document Decisions**: Note what works/doesn't in `specs/ux-decisions.md`
2. **Screenshot Variations**: Save good designs for reference
3. **Export CSS**: Copy final styles to production codebase
4. **User Testing**: Show to 3-5 people and observe
5. **Iterate**: Refine based on feedback

---

## 🎨 Tools & Resources

### Chrome DevTools Resources

- [DevTools Overview](https://developer.chrome.com/docs/devtools/)
- [CSS Editing Guide](https://developer.chrome.com/docs/devtools/css/)
- [Responsive Design Mode](https://developer.chrome.com/docs/devtools/device-mode/)

### Design Inspiration

- Universal Paperclips (incremental game feel)
- Trading view interfaces (financial data clarity)
- Mobile game UIs (touch-friendly controls)

### Accessibility Testing

- [WAVE](https://wave.webaim.org/) - Accessibility checker
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Lighthouse in Chrome DevTools

---

## 💡 Pro Tips

1. **Take Screenshots**: Before/after when you find good changes
2. **Copy Changes**: Use DevTools "Copy styles" to extract CSS
3. **Test on Real Devices**: Emulation ≠ actual phones/tablets
4. **Get Fresh Eyes**: Show to someone unfamiliar with the game
5. **Focus on One Thing**: Test one aspect at a time (colors, spacing, layout)

---

## 🤝 Collaboration

Share this prototype with:
- Designers for visual feedback
- Developers for feasibility check
- Target users for usability testing
- Investors for pitch demonstrations

---

**Ready to design!** Open `index.html` in Chrome, press F12, and start experimenting! 🎨


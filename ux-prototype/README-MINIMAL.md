# Sundae Volatility - Minimal UX Design

**A focused, single-task mobile-first interface**

## 🎯 Design Philosophy

This minimal version follows a **"one task at a time"** philosophy:

- **Single column layout** - No overwhelming multi-panel views
- **Bottom tab navigation** - Mobile-first design pattern
- **Progressive disclosure** - Hide complexity until needed
- **Generous whitespace** - Let the UI breathe
- **Clear focus** - Always know what you're doing

## 📱 How to Use

### Quick Start

```bash
# From ux-prototype directory
python3 -m http.server 8080

# Open browser to:
# http://localhost:8080/index-minimal.html
```

## 🎨 Key Differences from Full Version

### What Was Removed

❌ **Three-column layout** - Too crowded
❌ **News feed** - Information overload
❌ **Real-time Greeks display** - Premature complexity
❌ **Recent trades history** - Not essential for MVP
❌ **Achievements ticker** - Distracting

### What Was Kept

✅ **Core trading loop** - Buy/sell forwards and options
✅ **Portfolio management** - Track positions and P&L
✅ **Knowledge unlocks** - Delta → Gamma → Vega progression
✅ **Market prices** - Live price simulation
✅ **Capital tracking** - Primary game objective

### What Was Improved

🎯 **Single-view focus** - Only see what matters NOW
🎯 **Mobile-first layout** - Perfect for phones
🎯 **Bigger touch targets** - Easy to tap
🎯 **Reduced cognitive load** - 60% less information on screen
🎯 **Clearer hierarchy** - Know what's important

## 📊 Information Architecture

```
Market View (Default)
└── Today's Prices
    └── [Make a Trade] → Trade View

Trade View
├── Flavor Selection
├── Order Type (Forward / Call)
├── Strike Price
├── Days to Expiry
├── Position (Buy / Sell)
├── Quantity
├── Cost Preview
└── [Execute Trade] → Portfolio View

Portfolio View
├── Active Positions
│   ├── Position details
│   ├── P&L calculation
│   └── [Close Position]
└── [Back to Market]

Knowledge View
├── Delta ($500)
├── Gamma ($1,000) - Locked until Delta
├── Vega ($2,000) - Locked until Gamma
└── [Back to Market]
```

## 🧭 Navigation Pattern

**Bottom Tab Bar** (Always visible)
- 📈 Market - View current prices
- 💰 Trade - Place orders
- 📊 Portfolio - Manage positions
- 🎓 Learn - Buy knowledge

**Linear Flow** (Recommended for first-time users)
1. Start at **Market** - See prices
2. Tap "Make a Trade" → **Trade**
3. Fill form, execute → **Portfolio**
4. Review position, close or hold
5. Return to **Market** to repeat

## 🎨 Visual Design

### Color Palette (Simplified)

```css
Background:    #0a0e27 (Dark blue-black)
Surface:       #1a1f3a (Navy)
Surface Light: #252b47 (Lighter navy)

Primary:       #e94560 (Pink/Red accent)
Text:          #e8eaf0 (Light gray)
Text Dim:      #9ca3af (Muted gray)

Positive:      #10b981 (Green)
Negative:      #ef4444 (Red)
Neutral:       #6b7280 (Gray)
```

### Typography Scale

```css
Display:  40px (Capital amount)
Heading:  28px (View titles)
Large:    20px (Price amounts)
Base:     16px (Body text)
Small:    14px (Labels)
Tiny:     12px (Helper text)
```

### Spacing System

```css
XS:   8px  - Tight spacing within components
SM:  16px  - Component padding
MD:  24px  - Section spacing
LG:  32px  - View spacing
XL:  48px  - Major sections
XXL: 64px  - Hero spacing
```

## 📐 Layout Specs

### Desktop (600px max-width)
- Single centered column
- Generous padding
- Easy to scan vertically

### Mobile (< 600px)
- Full width usage
- Comfortable margins
- Touch-friendly buttons (48px min)

### Bottom Navigation
- Height: ~80px
- 4 equal-width tabs
- Icon + label format
- Active state: primary color

## 🧪 Testing Checklist

### First-Time User Flow

- [ ] Can they understand what to do within 5 seconds?
- [ ] Is "Make a Trade" button obvious?
- [ ] Can they complete a trade without help?
- [ ] Is capital change noticeable?
- [ ] Can they find their position afterward?

### Mobile Usability

- [ ] All buttons ≥ 48px tall?
- [ ] Text readable at arm's length?
- [ ] No horizontal scrolling?
- [ ] Bottom nav doesn't cover content?
- [ ] Forms easy to fill one-handed?

### Visual Hierarchy

- [ ] Capital amount most prominent?
- [ ] Day counter visible but secondary?
- [ ] Current view title clear?
- [ ] Action buttons stand out?
- [ ] Disabled states obvious?

### Information Density

- [ ] Can scan each view in < 3 seconds?
- [ ] No feeling of overwhelm?
- [ ] Focus clear on each screen?
- [ ] Only essential info visible?

## 🔄 User Flows

### Complete Trading Cycle

```
1. View Prices (Market View)
   ↓ tap "Make a Trade"
2. Select flavor, type, strike, expiry (Trade View)
   ↓ tap "Execute Trade"
3. See position appear (Portfolio View)
   ↓ watch P&L change
4. Decide: Close or Hold
   ↓ if close, tap "Close Position"
5. Capital updated
   ↓ tap "Market" tab
6. Repeat
```

### Learning Progression

```
1. Start with no knowledge
   ↓ save up capital
2. Visit Learn tab
   ↓ purchase Delta ($500)
3. Now see Delta values in positions
   ↓ save more capital
4. Purchase Gamma ($1,000)
5. Now see Gamma values
   ↓ continue
6. Purchase Vega ($2,000)
7. Master all Greeks!
```

## 🎯 Design Goals Achieved

✅ **Reduced cognitive load** - One view at a time
✅ **Clear progression** - Obvious next steps
✅ **Mobile-first** - Perfect for phones
✅ **Focused attention** - No distractions
✅ **Easy to learn** - Intuitive navigation
✅ **Scannable** - Quick visual hierarchy

## 📝 Next Steps

### Immediate Testing

1. **Open on phone** - Does it feel right?
2. **5-second test** - Can new users understand it?
3. **User feedback** - Show to 3-5 people
4. **Task completion** - Can they make a trade?

### Future Enhancements

- [ ] Tutorial overlay for first-time users
- [ ] Swipe gestures between views
- [ ] Pull-to-refresh for prices
- [ ] Haptic feedback on trades
- [ ] Dark/light theme toggle
- [ ] Price chart visualization
- [ ] Trade confirmation modal
- [ ] Settings panel

### Production Development

Once design is validated:

1. Export CSS design tokens
2. Screenshot approved layouts
3. Create component library in SolidJS
4. Implement with real Black-Scholes pricing
5. Add save/load functionality
6. Build tutorial system

---

**This minimal design prioritizes clarity and focus over feature completeness. Perfect for MVPs and user testing!** 🎯

# 🚀 Quick Start - Sundae Volatility UX Prototype

## Open in Browser (30 seconds)

### Step 1: Open the File

**Mac:**
```bash
open ux-prototype/index.html
```

**Linux:**
```bash
xdg-open ux-prototype/index.html
```

**Windows:**
```bash
start ux-prototype/index.html
```

Or just **drag `index.html` into Chrome**.

---

### Step 2: Open Chrome DevTools

**Keyboard Shortcut:**
- **Mac**: `Cmd + Option + I`
- **Windows/Linux**: `F12` or `Ctrl + Shift + I`

Or **right-click anywhere → "Inspect"**

---

### Step 3: Start Designing!

#### 🎨 Edit Colors

1. Click the **Elements** tab
2. Click the **inspect icon** (top-left corner) or press `Cmd+Shift+C`
3. Click any element on the page
4. Look at the **Styles** panel on the right
5. Click any color swatch to open color picker
6. **Change colors instantly!**

#### 📏 Adjust Spacing

1. Select any element
2. In Styles panel, find `padding` or `margin`
3. Click the value (e.g., `16px`)
4. Type a new number
5. See changes instantly

#### 📱 Test Mobile View

1. Click the **device icon** (top-left of DevTools) or press `Cmd+Shift+M`
2. Select a device from dropdown:
   - iPhone 12 Pro
   - iPad
   - Responsive (drag to resize)

---

## 🎮 Try These Features

### Interactive Game

- ✅ **Click flavor cards** - Prices update in real-time
- ✅ **Fill out trade form** - See pricing change
- ✅ **Execute trades** - Watch capital change
- ✅ **Purchase knowledge** - Unlock Greeks (costs money!)
- ✅ **Change game speed** - 1x, 2x, 5x buttons in footer

### Developer Console

1. Click **Console** tab in DevTools
2. Type these commands:

```javascript
// View game state
window.sundaeState

// Give yourself money
window.sundaeState.capital = 100000

// Unlock all Greeks
window.sundaeState.knowledgeUnlocked.delta = true
window.sundaeState.knowledgeUnlocked.gamma = true
window.sundaeState.knowledgeUnlocked.vega = true

// Speed up time
window.sundaeState.gameSpeed = 10
```

---

## 🎨 Quick Design Experiments

### Change Theme Colors

1. **Find the `:root` section** in Elements → Styles
2. Edit these variables:

```css
--color-accent: #ff6b9d;  /* Try pink */
--color-accent: #00d9ff;  /* Try cyan */
--color-accent: #ffd700;  /* Try gold */
```

### Make Everything Bigger

```css
/* In .game-main */
padding: 32px;  /* was 16px */

/* In .flavor-price */
font-size: 2.4rem;  /* was 1.8rem */
```

### Test Dark Mode

All styles are already dark! Try a light mode:

```css
--color-bg-primary: #f5f5f5;
--color-bg-secondary: #ffffff;
--color-text-primary: #2c3e50;
```

---

## 💾 Save Your Changes

### Method 1: Copy CSS

1. **Right-click** the `<style>` element in Elements panel
2. **Copy** → **Copy element**
3. **Paste** into `styles.css`
4. **Save** the file

### Method 2: Use DevTools Workspace

1. **Sources** tab → **Filesystem**
2. **Add folder** → Select `ux-prototype/`
3. Allow access
4. Edit CSS in Sources tab
5. **Saves automatically to disk!**

---

## ❓ Troubleshooting

**Prices not updating?**
- Check Console for errors
- Refresh the page (`Cmd+R`)

**Styles not applying?**
- Make sure you're editing the right element
- Check if styles are crossed out (overridden)
- Try adding `!important` for testing

**Mobile view looks weird?**
- Make sure you're in device mode (`Cmd+Shift+M`)
- Try rotating device (landscape/portrait)
- Check responsive breakpoints in CSS

---

## 🎯 Focus Areas for UX Design

### High Priority

1. **Capital Display** - Most important number, highly visible?
2. **Trade Button** - Clear, prominent, can't miss it?
3. **Flavor Prices** - Easy to scan and compare?
4. **Forms** - Clear labels, good spacing?

### Medium Priority

5. **Greeks Display** - Discoverable but not overwhelming?
6. **Position Cards** - Profit/loss obvious at a glance?
7. **News Feed** - Readable but not distracting?

### Polish

8. **Animations** - Smooth, not jarring?
9. **Colors** - Accessible contrast ratios?
10. **Mobile** - Everything works well on small screens?

---

## 📸 Document Your Work

Take screenshots of good designs:

**Mac:** `Cmd + Shift + 4` → Select area
**Windows:** `Win + Shift + S`

Save in `ux-prototype/screenshots/` folder for reference.

---

## 🚀 Next Steps

After exploring the prototype:

1. **Note what works** - Colors, spacing, layout decisions
2. **Note what doesn't** - Confusing elements, bad UX
3. **Create issues in beads** - Track improvements to make
4. **Share with others** - Get feedback from users
5. **Start building the real app** - Following the architecture in `specs/`

---

**Happy designing! 🎨**

Open `README.md` in this folder for comprehensive documentation.

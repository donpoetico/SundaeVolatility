# PixiJS Rendering Approach Research — Sundae Volatility

## 1. Background Rendering

### Recommendation: Layered Pre-Rendered Backgrounds with Render Groups

**Approach**: Split the background into 3-5 functional layers rather than a single monolithic image or a tile-based system.

**Layers**:
- **Sky/window backdrop** — the furthest layer, visible through the window; changes with weather and time of day
- **Shop walls/structure** — the main architectural frame; mostly static
- **Furniture/fixtures** — counter, shelves, register housing; static but may need per-phase lighting variants
- **Window glass overlay** — semi-transparent; receives weather effects (rain droplets, frost, condensation)
- **Foreground elements** — counter edge, any objects closest to "camera"

**Why layers, not a single image**:
- Allows independent animation of layers (parallax depth even in a fixed-perspective scene gives subtle life)
- Weather effects render between the window backdrop and the glass overlay
- Interactive objects can be inserted into the correct z-order naturally
- Lighting transitions can apply different intensity per layer (exterior changes more dramatically than interior)

**Why not tiles**:
- The illustrated art style (Gravity Falls / Steven Universe) has organic shapes, gradients, and hand-painted texture that would look wrong on a tile grid
- The scene is a fixed composition, not a scrolling world — tiling gives no advantage
- Single large pre-rendered backgrounds would work but sacrifice the layering benefits above

**Resolution**: Paint backgrounds at 3840x2160 (4K) as source, export at 1920x1080 for standard displays. PixiJS supports @2x asset loading natively — name files `background@2x.png` and PixiJS auto-scales. For tablets, the 1920x1080 assets are sufficient; on retina displays, the @2x variants get loaded automatically via the resolution detection system.

**PixiJS v8 Render Groups**: Mark the static background container as a Render Group (`isRenderGroup: true`). This offloads transform calculations to the GPU and — critically — skips rebuilding render instructions when nothing changes. Since the shop background is largely static, this is a significant win.

**Texture budget**: A 1920x1080 RGBA texture is ~8MB of VRAM. Five layers at that resolution = ~40MB. Well within budget for desktop/tablet WebGL. Use compressed texture formats (basis/ktx2) if targeting lower-end devices.

### Lighting Phase Transitions

**Recommendation: LUT-based color grading with crossfade interpolation**

Three approaches were evaluated:

| Approach | Quality | Performance | Effort |
|----------|---------|-------------|--------|
| Pre-rendered variants (3 versions of every bg) | Highest | Best (no runtime cost) | Extremely high art cost; 3x asset weight |
| ColorMatrixFilter on stage | Medium | Good | Low effort but limited expressiveness |
| **LUT color grading shader** | **High** | **Good** | **Moderate — best tradeoff** |

**LUT approach**: Create three 256x16 lookup table textures (morning/midday/evening) in Photoshop by color grading a screenshot of the scene. At runtime, a custom fragment shader samples two LUTs and interpolates between them based on a `timeOfDay` uniform (0.0 to 1.0). This gives art-directed control over the exact color transformation per phase.

The shader cost is one extra texture sample per pixel per LUT (two LUTs during transitions), which is negligible. The LUT textures themselves are tiny (256x16 px each).

**Fallback/simpler option**: Apply a `ColorMatrixFilter` to the root container with animated brightness/contrast/saturate/hue uniforms. Less art-directed but zero custom shader work. Could serve as v1 implementation before upgrading to LUT.

**Overlay approach** (complementary): A full-screen semi-transparent sprite with multiply blend mode, tinted amber/cool/deep-amber for each phase. This adds atmospheric "wash" on top of LUT grading. Cost: one extra draw call.

---

## 2. Character Animation

### Recommendation: Spine Skeletal Animation (hybrid with attachment swaps for expressions)

**Why Spine over pure spritesheets**:
- Characters need idle animations, gesture animations, and facial expression changes — Spine handles all three from a single skeleton
- Spine animations interpolate between keyframes, giving buttery-smooth motion at any framerate without needing more frames
- The skins system allows crowd characters to reuse the same skeleton with different visual appearances (outfit/color swaps)
- Animation blending: a character can play a "talk" animation on the upper body while "idle" plays on the lower body simultaneously
- spine-pixi-v8 is officially supported by both Esoteric Software and the PixiJS team; it's 50%+ faster than v7 and optimized for WebGPU

**Facial expressions via slot attachments**:
Spine slots can hold multiple attachments (different eye states, mouth shapes). Animations keyframe which attachment is visible per slot, enabling:
- Blink cycles (open eyes → closed eyes → open eyes)
- Expression changes (neutral → surprised → happy)
- Lip sync approximation (mouth shapes keyed to dialogue)

This is the standard Spine technique for expressions — no need for separate spritesheet frames per expression.

**Character structure** (Professor Layton style):
- Half-body visible above counter (waist up)
- ~15 bones: torso, upper arms, forearms, hands, head, jaw/mouth, each eye, each eyebrow, hair
- 3-4 skins per named character (normal, formal, weather-appropriate, special event)
- Crowd characters: 1 skeleton with 10-15 skin variations

**Effort trade-off**: Spine requires purchasing a license ($70-$350) and learning the Spine editor. But for 8+ named characters with multiple animation states, it saves enormous artist time vs frame-by-frame spritesheets. A single idle animation in Spine is ~10 keyframes; the same quality in spritesheets would require 30-60 hand-drawn frames.

**Performance**: spine-pixi-v8 uses binary .skel format for fast loading and small file sizes. Each character on screen is one draw call if all parts share a single atlas texture. With 2-3 characters visible at most, the cost is trivial.

**Alternative considered — pure spritesheets**: Would work for simple idle + 2-3 expression swaps but becomes unwieldy at scale. For the scope of animation described (idle wobbles, facial expressions, gestures, talk animations), Spine is strictly better on quality-to-effort ratio.

---

## 3. Interactive Objects (Deal Slips, Tags, Tools, Newspaper)

### Recommendation: Individual Sprites with PixiJS Event System + Lightweight Spring Physics

**Rendering**: Each interactive object is a `Sprite` or `Container` with its own texture from a shared spritesheet atlas. Objects that have multiple states (e.g., a deal slip face-up vs face-down, a price tag blank vs filled) use texture swapping or frame-based AnimatedSprite.

**Interaction**: PixiJS v8's event system supports pointer events natively:
```
sprite.eventMode = 'static';  // or 'dynamic' for moving objects
sprite.on('pointerdown', onDragStart);
sprite.on('pointermove', onDragMove);
sprite.on('pointerup', onDragEnd);
```
Set `hitArea` explicitly on irregularly-shaped objects (paper slips, tools) using `Polygon` or `Rectangle` to avoid expensive bounds calculations.

**Physics-like behavior**: For the tactile, physical feel described in the spec:

**Option A — Custom spring/tween physics (recommended for this game)**:
- Use GSAP's PixiPlugin or pixi-ease for:
  - Drag-and-release with momentum (track velocity during drag, apply deceleration)
  - Snap-to-target with overshoot (spring easing: elastic/back easing functions)
  - Idle wobble on hanging objects (sinusoidal oscillation on rotation)
  - Paper flutter (combine Y-axis sinusoidal with slight rotation oscillation)
  - Flip-digit animation on register (tween Y-scale from 1 to 0 to 1 with texture swap at midpoint)
- This avoids the overhead of a full physics engine while giving organic-feeling motion

**Option B — Matter.js integration (overkill for this game)**:
- Full rigid-body physics would handle pendulum swings and collisions automatically
- But the overhead of a physics world, body synchronization, and collision detection is not justified when the game only needs ~10-20 interactive objects with simple behaviors
- Reserve for if the game later needs true physics puzzles

**Recommended library**: GSAP + PixiPlugin. Industry standard for web animation, excellent easing functions including elastic/spring curves, direct PixiJS property animation, minimal overhead.

**Z-ordering**: Use PixiJS's natural display list ordering. When an object is picked up, `parent.setChildIndex(sprite, parent.children.length - 1)` brings it to front. Use Render Layers if objects need to render above UI elements from different scene graph branches.

---

## 4. Weather/Window Effects

### Recommendation: Hybrid Approach — Particles for Rain/Snow, Animated Sprites for Clouds, Shader for Window Glass

**Rain**:
- Use PixiJS v8 ParticleContainer for raindrops visible through the window
- ParticleContainer can render 100K+ particles at 60fps; rain needs only 200-500 particles
- Configure: position as dynamic, rotation/scale/color as static
- Rain particles spawn at window top, fall with slight random horizontal drift
- On hitting the "windowsill" y-coordinate, spawn a tiny splash sprite (pooled AnimatedSprite)
- Rain streaks on the glass: pre-rendered animated spritesheet overlaid on the window glass layer with alpha modulation

**Snow**:
- Same ParticleContainer approach but with slower fall speed and more horizontal drift (sinusoidal wobble via custom update function on ticker)
- Fewer particles (50-100), larger size, slower movement
- Accumulation: a simple pre-rendered sprite that fades in at the bottom of the window frame

**Clouds**:
- 3-5 cloud sprites at different sizes/alphas moving across the window backdrop layer at different speeds
- Simple `position.x` tween on each cloud with wrap-around
- NOT particles — clouds need distinct shapes and smooth scaling. Individual sprites give better artistic control
- For overcast: increase cloud count and reduce alpha on the sky backdrop

**Sun/lighting through window**:
- A large soft radial gradient sprite (or a simple shader) positioned at the window, alpha animated based on cloud coverage
- Casts a "light patch" on the counter using a multiply-blend sprite that follows the sun position subtly

**Window glass shader** (optional polish):
- A displacement filter on the window area that simulates glass refraction/imperfection
- Animated noise uniform creates subtle glass shimmer
- Cost: one filter pass on the window rectangle — negligible

**Seasonal variations**:
- Spring: occasional leaf/petal particles, bright sky color
- Summer: harsh light, minimal particles, heat shimmer (displacement filter)
- Autumn: falling leaf particles (use AnimatedSprite for rotation, not ParticleContainer — fewer particles but need complex motion)
- Winter: snow + frost overlay sprite on window edges

---

## 5. Lighting Transitions

### Recommendation: Multi-Layer Approach

**Primary**: LUT color grading shader on the root container (described in section 1). This handles the broad color temperature shift.

**Secondary**: Multiply-blend overlay sprite covering the entire scene.
- Morning: RGBA(180, 200, 230, 0.08) — cool blue tint
- Midday: RGBA(255, 245, 220, 0.05) — warm neutral
- Evening: RGBA(255, 180, 100, 0.12) — deep amber

Transition between values using GSAP tween over 2-3 seconds (game time, not real time).

**Tertiary**: Per-layer adjustments:
- Window backdrop gets stronger color shift (exterior light changes more dramatically)
- Interior layers get subtler shift (indoor lighting buffers exterior changes)
- Interactive objects can have their `tint` property shifted slightly (PixiJS tint is a single multiply operation, free performance)

**Performance**:
- LUT shader: 1 filter pass on root container (~2 texture reads per pixel)
- Overlay sprite: 1 extra draw call with blend mode
- Tint changes: zero additional draw calls (applied in existing batch)
- Total overhead: negligible for a fixed-scene game

**Why NOT pixi-lights (deferred lighting)**:
- Designed for dynamic point/spot lights, not ambient color temperature shifts
- Requires normal maps for all sprites — enormous art pipeline addition
- Overkill when the game's lighting is ambient scene-wide shifts, not dynamic shadow-casting lights
- Could be reconsidered for a "desk lamp" effect in the back room, but even then an overlay sprite would suffice

---

## 6. Resolution and Scaling

### Recommendation: 1920x1080 Base with Fixed-Ratio Letterbox Scaling

**Base resolution**: 1920x1080 (16:9)
- This is the sweet spot for illustrated art targeting desktop + tablet
- Large enough for detail; small enough that textures don't blow VRAM budgets
- Matches the most common desktop display resolution

**Scaling strategy**: Fixed-ratio scaling with letterboxing
- Calculate scale factor: `Math.min(screenWidth / 1920, screenHeight / 1080)`
- Center the game canvas; letterbox bars are styled with CSS (dark/themed color)
- This preserves the illustrated composition exactly as designed — critical for a fixed-perspective game where object placement is carefully art-directed

**Retina/HiDPI handling**:
- Set renderer resolution to `Math.min(window.devicePixelRatio, 2)` — cap at 2x to avoid 3x devices blowing VRAM
- Use `autoDensity: true` so CSS dimensions match logical coordinates
- Provide @2x texture variants for key art (backgrounds, character sprites). PixiJS auto-selects based on resolution suffix
- For UI text and small details, @2x makes the biggest visible difference
- For large background layers, the difference between 1x and 2x is less noticeable at normal viewing distance — can skip @2x for backgrounds to save memory

**Tablet considerations**:
- Most tablets are 1024x768 (4:3) to 2048x1536
- The 16:9 game will letterbox slightly on 4:3 tablets (horizontal bars top/bottom)
- At 1024px wide, the game renders at ~0.53x scale — still readable for the art style
- Touch targets need to be at least 44px logical (Apple HIG) — design interactive objects accordingly

**Asset pipeline**:
```
Source art: 3840x2160 (4K, archival)
  → Export @2x: 3840x2160 (retina desktop)
  → Export @1x: 1920x1080 (standard desktop/tablet)
Spritesheet atlases: max 2048x2048 per sheet (safe for all devices)
                     4096x4096 for desktop-only sheets
```

---

## 7. Performance Considerations

### Known Bottlenecks and Mitigations

**Filter accumulation**: Each filter on a container causes a render-to-texture pass. The LUT shader + any per-object filters (blur, displacement) stack up. Mitigation:
- Keep scene-wide filters to 1-2 maximum (LUT + optional overlay)
- Use `filterArea` on filters to limit the processed region
- Avoid filters on individual small objects where tint/alpha suffice

**Blend mode batching breaks**: Alternating blend modes between sprites breaks the batch, creating extra draw calls. Mitigation:
- Group objects by blend mode in the display list
- Use normal blend for most objects; reserve multiply/screen for overlay layers that render as a group
- PixiJS v8 can batch up to 16 textures per draw call — use spritesheets to stay within one atlas per layer

**Texture memory**: Illustrated art with many unique elements can consume significant VRAM. Mitigation:
- Cap total texture memory at ~200MB for comfortable headroom on most devices
- Use PixiJS texture garbage collector (default: 3600 frame idle threshold)
- Unload textures for off-screen scenes (back room textures when in shop, vice versa)
- Monitor with PixiJS DevTools asset panel

**Spine animation CPU cost**: Each Spine skeleton requires CPU time for bone transforms. Mitigation:
- Maximum 3-4 Spine characters visible at once
- Use binary .skel format (smaller, faster parsing than JSON)
- Set static bounds providers instead of dynamic bounds calculation

**Text rendering**: Dynamic text (prices, names, dialogue) is expensive to re-render. Mitigation:
- Use BitmapText for frequently-changing text (register display, prices)
- Pre-generate bitmap fonts from the three custom fonts at needed sizes
- Cache static text as textures

**Event system**: With many interactive objects, event hit-testing can be expensive. Mitigation:
- Set `eventMode = 'none'` on non-interactive objects (backgrounds, decorations)
- Use explicit `hitArea` rectangles instead of bounds-based detection
- Set `interactiveChildren = false` on containers whose children are not interactive

**WebGPU advantage**: PixiJS v8 supports WebGPU as a first-class renderer. For scenes with many filter/blend-mode batch breaks, WebGPU outperforms WebGL. Worth enabling as a progressive enhancement where supported.

### Performance Budget for This Game

| Element | Estimated draw calls | VRAM |
|---------|---------------------|------|
| Background layers (5) | 5 | ~40MB |
| Interactive objects (10-15) | 1-2 (batched) | ~5MB |
| Character (Spine) | 1-2 | ~10MB |
| Weather particles | 1 | ~1MB |
| Overlay/lighting | 1-2 | ~1MB |
| UI text (BitmapText) | 1-2 | ~5MB |
| **Total** | **~12-14** | **~62MB** |

This is well within comfortable performance bounds. The game should run at a solid 60fps on any modern browser.

---

## Key PixiJS v8 APIs Referenced

| Feature | API/Class |
|---------|-----------|
| Sprite rendering | `Sprite`, `AnimatedSprite` |
| Spritesheet atlas | `Spritesheet`, `Assets.load()` |
| Skeletal animation | `@esotericsoftware/spine-pixi-v8` |
| Particle effects | `ParticleContainer` + `Particle` |
| Color grading | Custom `Filter.from()` with LUT shader |
| Color matrix | `ColorMatrixFilter` |
| Blend modes | `container.blendMode = 'multiply'` |
| Render optimization | `Container.isRenderGroup = true` |
| Drag interaction | `sprite.eventMode`, pointer events |
| Tween animation | GSAP PixiPlugin / pixi-ease |
| Bitmap text | `BitmapText`, `BitmapFont` |
| Resolution | `renderer.resolution`, `autoDensity` |
| Render layers | `RenderLayer` for z-order control |

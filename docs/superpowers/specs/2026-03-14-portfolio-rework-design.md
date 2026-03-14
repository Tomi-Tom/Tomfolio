# Portfolio Rework — Design Spec
**Date:** 2026-03-14
**Project:** Tomfolio (Tom Bariteau-Peter personal portfolio)
**Status:** Approved by user — ready for implementation planning

---

## 1. Vision

A complete visual and architectural rework of the portfolio. The new design is an **immersive horizontal journey** through a **sober cyberpunk void** — pure black with gold mechanical precision. The visitor enters a universe of clockwork gears floating in darkness and travels forward through it, each horizontal chapter taking the camera deeper into space.

**Design keywords:** Void & Gold · Sober Cyberpunk · Premium · Mechanical · Immersive · Forward motion

---

## 2. Design System

### 2.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#000000` | Primary background — pure black |
| `--color-void-deep` | `#030303` | Page background |
| `--color-void-surface` | `#080808` | Card / panel surfaces |
| `--color-void-elevated` | `#0d0d0d` | Active / hover states |
| `--color-gold` | `#d4af37` | Primary accent — all highlights, CTAs, gear strokes |
| `--color-gold-dim` | `rgba(212,175,55,0.4)` | Secondary gold — tags, labels |
| `--color-gold-ghost` | `rgba(212,175,55,0.06)` | Background glows, fills |
| `--color-text-primary` | `#ffffff` | Headings |
| `--color-text-secondary` | `rgba(232,228,217,0.5)` | Body copy |
| `--color-text-dim` | `rgba(232,228,217,0.2)` | Captions, labels |
| `--color-border` | `rgba(212,175,55,0.08)` | Subtle borders |
| `--color-border-active` | `rgba(212,175,55,0.25)` | Hover borders |

**Remove entirely:** orange (#FF6B35), emerald, purple palette, canvas (#0B0B12), all existing gradient utilities.

### 2.2 Typography

**Fonts to load:** Space Grotesk (300, 400, 500, 600, 700) + DM Sans (200, 300, 400, 500) via Google Fonts. Remove: Syne, Montserrat.

| Element | Font | Weight | Size | Letter-spacing |
|---------|------|--------|------|----------------|
| Display / Hero name | Space Grotesk | 700 | clamp(3.5rem, 8vw, 7rem) | -0.04em |
| H1 | Space Grotesk | 700 | clamp(2.8rem, 5vw, 5rem) | -0.03em |
| H2 | Space Grotesk | 700 | clamp(2rem, 3.5vw, 3.5rem) | -0.03em |
| H3 | Space Grotesk | 600 | clamp(1.3rem, 2vw, 1.8rem) | -0.02em |
| Section labels | Space Grotesk | 600 | 0.65rem | 0.2em (uppercase) |
| Chapter numbers | Space Grotesk | 700 | varies | -0.02em |
| Body | DM Sans | 300 | 0.9rem–1rem | 0.02em |
| Body bold | DM Sans | 500 | 0.9rem–1rem | 0.01em |
| Captions / HUD data | Space Grotesk | 500 | 0.58–0.65rem | 0.12em (uppercase) |

**Weight contrast principle:** Headings alternate between 700 (bold) and 300 (light) within the same text block. Example: "Tom" (300) + "Bariteau." (700) + "Peter" (300).

### 2.3 Removed Utilities

Remove all existing custom utility classes from `index.css`:
- All `gradient-*` utilities
- All `surface-*` classes
- `section-dark`, `card-interactive`, `card-glow`
- `brand-tt`, `divider-glow`, `cursor-glow`
- `GeometricShape` component and related shape utilities
- `pulse-cta`, `grain` animations

### 2.4 New Utility Classes

```css
/* HUD frame corners — all four share the same size and color */
.hud-corner-tl,
.hud-corner-tr,
.hud-corner-bl,
.hud-corner-br {
  position: fixed;
  width: 22px;
  height: 22px;
  z-index: 50;
  pointer-events: none;
}
.hud-corner-tl { top: 48px; left: 16px; }  /* below status bar */
.hud-corner-tr { top: 48px; right: 16px; }
.hud-corner-bl { bottom: 52px; left: 16px; } /* above chapter bar */
.hud-corner-br { bottom: 52px; right: 16px; }

/* Each corner uses ::before (horizontal arm) and ::after (vertical arm) */
.hud-corner-tl::before, .hud-corner-tr::before,
.hud-corner-bl::before, .hud-corner-br::before,
.hud-corner-tl::after, .hud-corner-tr::after,
.hud-corner-bl::after, .hud-corner-br::after {
  content: '';
  position: absolute;
  background: var(--color-gold);
}
/* Horizontal arm */
.hud-corner-tl::before { top: 0; left: 0; width: 100%; height: 1px; }
.hud-corner-tr::before { top: 0; right: 0; width: 100%; height: 1px; }
.hud-corner-bl::before { bottom: 0; left: 0; width: 100%; height: 1px; }
.hud-corner-br::before { bottom: 0; right: 0; width: 100%; height: 1px; }
/* Vertical arm */
.hud-corner-tl::after { top: 0; left: 0; width: 1px; height: 100%; }
.hud-corner-tr::after { top: 0; right: 0; width: 1px; height: 100%; }
.hud-corner-bl::after { bottom: 0; left: 0; width: 1px; height: 100%; }
.hud-corner-br::after { bottom: 0; right: 0; width: 1px; height: 100%; }

/* Scan line — single 1px horizontal element */
.scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 175, 55, 0.12) 20%,
    rgba(212, 175, 55, 0.12) 80%,
    transparent 100%
  );
  pointer-events: none;
}

/* Gold text */
.text-gold { color: var(--color-gold); }
.text-gold-dim { color: var(--color-gold-dim); }

/* Void panels */
.void-panel {
  background: var(--color-void-surface);
  border: 1px solid var(--color-border);
}
.void-panel:hover,
.void-panel-active {
  border-color: var(--color-border-active);
}

/* Buttons */
.btn-gold {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  background: var(--color-gold);
  color: #000;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  position: relative;
  outline: 1px solid transparent;       /* default: invisible outer ring */
  outline-offset: 3px;
  transition: outline-color 0.2s, transform 0.15s;
}
.btn-gold:hover {
  outline-color: rgba(212, 175, 55, 0.45); /* outer ring brightens on hover */
  transform: scale(1.02);
}

.btn-ghost-gold {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  background: none;
  color: var(--color-gold-dim);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.btn-ghost-gold:hover { color: #fff; }
```

---

## 3. Three.js Architecture — One Universe

### 3.1 Concept

A **single persistent Three.js scene** that spans the entire page. The camera lives at a Z position that maps to the current chapter. Scrolling horizontally advances the camera **forward** along the negative Z axis — deeper into the gear universe.

### 3.2 Scene Contents

**Gear objects (THREE.Group per gear):**
- Each gear = `THREE.TorusGeometry` outer ring + custom `THREE.BufferGeometry` for teeth (extruded rects around the circumference) + inner rings + spokes + center hub
- Gear sizes: large (r=8–12), medium (r=4–6), small (r=1.5–3)
- All use `THREE.LineSegments` with `LineBasicMaterial({ color: 0xd4af37, opacity: <per-gear>, transparent: true })` — gold, line-drawn, no fill
- 12–16 gear objects total, distributed across Z: from Z=0 (far, near vanishing point) to Z=-800 (close to camera start)
- Gears slowly rotate on their own axes (different speeds, directions)
- Gears at different Z depths have different opacity (far = 0.08–0.15, mid = 0.3–0.5, near = 0.6–0.8)

**Circuit traces:**
- `THREE.Line` paths (L-shaped routes between gear positions)
- Gold, opacity 0.15–0.25, thickness via `LineDashedMaterial`
- Small node dots at endpoints (tiny `SphereGeometry`)

**Particle field:**
- 800 particles (400 mobile) scattered in the void (X: ±300, Y: ±200, Z: 0 to -900)
- Each particle = 1–2px point, gold, opacity 0.1–0.4
- Very slow drift (no physics, just gentle float)
- `PointsMaterial` with glow canvas texture, additive blending

**Depth rings (vanishing point):**
- 5 concentric circles at Z=-50 (the "horizon"), X=0, Y=0
- Radii 20, 40, 80, 160, 320
- Gold, opacity 0.03–0.08 — barely visible, purely atmospheric

### 3.3 Camera Path

Z positions per chapter (camera animates between these on chapter transition):

| Chapter | Z position | Feel |
|---------|------------|------|
| 01 Hero | -50 | Near start — gears large around you |
| 02 About | -200 | Diving in — mid gears fill view |
| 03 Skills | -350 | Deep — dense gear cluster |
| 04 Projects | -500 | Very deep — geometry becomes abstract |
| 05 Contact | -650 | Innermost void — sparse, focused |

Camera animation: **No GSAP** — use a `targetZ` ref + lerp inside the existing `requestAnimationFrame` loop. On chapter change: set `targetZ = chapterZPositions[index]`. Each frame: `camera.position.z += (targetZ - camera.position.z) * 0.05` (lerp factor 0.05 gives ~1.4s convergence). Camera also has subtle Y drift (+/- 2 units) based on mouse Y (`targetY` lerp 0.03), and gentle X drift based on mouse X (`targetX` lerp 0.03).

### 3.4 Renderer Setup

```
- WebGLRenderer: antialias, alpha: true, powerPreference: 'high-performance'
- Pixel ratio: Math.min(devicePixelRatio, 1.5)
- Background: transparent (CSS handles the black void)
- Canvas: position: fixed, inset: 0, z-index: 0, pointer-events: none
- FOV: 60, near: 0.1, far: 2000
- AdditiveBlending on all particle systems
```

---

## 4. Navigation & Scroll System

### 4.1 Layout

The page uses **CSS scroll-snap on the X axis** for horizontal chapter scrolling:

```
.chapters-container:
  display: flex
  width: 500vw (5 chapters × 100vw)
  height: 100vh
  overflow-x: scroll
  scroll-snap-type: x mandatory
  -webkit-overflow-scrolling: touch

.chapter:
  width: 100vw
  height: 100vh
  scroll-snap-align: start
  flex-shrink: 0
```

Mouse wheel vertical scroll translates to horizontal scroll via a JS wheel event listener (`scrollLeft += e.deltaY`).

### 4.2 Chapter Bar (Bottom)

Persistent across all chapters. Fixed position, bottom 0. Contains:
- 5 chapter slots, each with chapter number (01–05) and name
- Active chapter: gold top border accent line + bright label
- Click to jump to chapter
- Active chapter slot has a top-border gold line (static, 1px, full width) — no animated progress line (incompatible with snap scroll discreteness)

### 4.3 Status Bar (Top)

Persistent across all chapters. Fixed position, top 0. Contains:
- Left: `TBP.DEV` logo in gold
- Center: pulsing availability dot + "Available" label
- Right: portfolio version + year

### 4.4 Inter-Component Wiring

`chapterIndex` (0–4) is stored in a React context `ChapterContext` (a simple `useState` at the `Home.tsx` level, passed via context). All three of `ChaptersContainer`, `ChapterBar`, and `GearUniverse` consume this context:

- `ChaptersContainer` holds a `ref` to the scroll container div. When `chapterIndex` changes, it calls `scrollContainerRef.current.scrollTo({ left: chapterIndex * window.innerWidth, behavior: 'smooth' })`.
- `ChapterBar` calls `setChapterIndex(i)` on click.
- `GearUniverse` reads `chapterIndex` and updates its `targetZ` ref.
- The scroll container also fires an `onScroll` handler that updates `chapterIndex` when `scrollLeft` crosses a chapter boundary (for keyboard/touch-native scrolling).

### 4.5 HUD Corners

Four corner brackets (22×22px, 1px gold lines). Rendered as fixed-position CSS elements. Apply to every chapter.

### 4.6 Keyboard Navigation

- `ArrowRight` / `ArrowLeft` → advance/retreat chapter
- `Escape` → return to Chapter 01

### 4.7 Mobile

On screens < 768px: revert to **vertical scroll** with `scroll-snap-type: y mandatory`. Chapters stack vertically (`flex-direction: column`, each `100dvh`). `ChaptersContainer` detects `window.innerWidth < 768` and sets a `isMobile` flag in `ChapterContext`.

**Mobile `GearUniverse` behavior:** Camera Z animation still applies — triggered by `IntersectionObserver` on each chapter div. When a chapter enters the viewport (>50% visible), `chapterIndex` updates and `targetZ` lerps to that chapter's Z position. No horizontal scroll → no wheel-to-horizontal translation. Three.js particle count: 400. Gear teeth geometry replaced with outline circles only (no `BufferGeometry` teeth). Circuit traces hidden.

---

## 5. Chapter Designs

### Chapter 01 — Intro / Hero

**Layout:** Left 55% content, right 45% Three.js gear cluster focal point (CSS overlay, not separate canvas)

**Content:**
- Gold tag: `UX Designer & Developer` (with left line accent)
- Hero name: `Tom` (300 light, white 50%) / `Bariteau.` (700 bold, white 100%, period in gold) / `Peter` (300 light, white 50%)
- Body: one-sentence positioning statement
- CTAs: `btn-gold` "View Work" + `btn-ghost-gold` "Download CV"
- Right data readout: 50+ Projects / 5yr Experience / FR·EN Languages (Space Grotesk 700 values, 500 labels)

**Three.js focal:** Camera at Z=-50. The large background gear (r=10) is visible top-right, mid gear and small gear in lower-right quadrant. Particle field fills peripheral void.

### Chapter 02 — About

**Layout:** Left 45% photo + stats, right 55% text

**Content:**
- Section label: `02 — About`
- Photo: grayscale `PhotoPresentation.png` with 1px gold border + subtle gold bottom glow
- H2: `Who` (300 light) + `I Am` (700 bold)
- 2-paragraph bio
- 4-stat grid: Education / Experience / Languages / Location (each with gold dot bullet)
- Download CV links (EN / FR)

**Three.js:** Camera advances to Z=-200. Gears in mid-depth are now surrounding the viewport. A medium gear appears partially behind the photo.

### Chapter 03 — Skills

**Layout:** Left 40% section title + intro + currently-exploring ticker, right 60% skills grid

**Content:**
- Section label: `03 — Skills`
- H2: `Craft &` (300 light) / `Expertise` (700 bold)
- 3-column grid (Frontend / Design / Backend & Tools), each skill with `LevelDots` (4-dot scale, gold filled dots)
- "Currently Exploring" horizontal ticker: Three.js · Next.js · Rust · WebGL · AI Integration

**Three.js:** Camera at Z=-350. Dense gear cluster visible — the scene feels most mechanical here. Circuit traces glow faintly connecting skill-area positions.

### Chapter 04 — Projects

**Layout:** Left 35% title + filter, right 65% project cards in a vertical-scrollable column (`overflow-y: auto`, `touch-action: pan-y` on the card column; outer `ChaptersContainer` has `touch-action: pan-x` to prevent scroll conflict on touch devices). On mobile (vertical layout), the card column is full-height with no inner scroll — all cards shown in full.

**Content:**
- Section label: `04 — Projects`
- H2: `Selected` (300 light) / `Work` (700 bold)
- 3–4 project cards, each containing:
  - Year tag (gold, Space Grotesk 600, small)
  - Project title (H3)
  - Short description (DM Sans 300)
  - Tech stack pills (void-surface bg, gold border)
  - Role
  - `→ View` link (gold)
- Mini-apps referenced as a group: "Interactive Experiments →"

**Three.js:** Camera at Z=-500. Geometry becoming more abstract, gears appear as partial arcs at the edges.

### Chapter 05 — Contact

**Layout:** Full-width centered, two columns: left info, right form

**Content:**
- Section label: `05 — Contact`
- H2: `Let's Build` (300 light) / `Something` (700 bold)
- Contact info: email, location, social links (GitHub, LinkedIn)
- Availability badge: pulsing gold dot + "Open to new projects"
- Contact form: Name / Email / Message — inputs with gold bottom-border-only style, `btn-gold` submit
- Social stats: 50+ Projects / 5yr / 100% Satisfaction

**Three.js:** Camera at Z=-650. Minimal geometry — the deepest void. A single large faint gear visible far ahead, giving the sense of infinite depth.

---

## 6. Other Pages (Non-Home)

These pages retain the Void & Gold system but use **vertical scroll** (not horizontal chapters).

| Page | Three.js Scene | Notes |
|------|---------------|-------|
| Projects | `SceneProjectsHero.tsx` (reworked) — gold particle starfield + 3 gear-framed wireframe cards in void/gold palette | Full project details |
| Resume | SceneResume — single large gear + particle field | Downloadable CV section |
| Contact | SceneContact — circuit trace web | Mirrors Chapter 05 |
| MiniApp | SceneMiniApps — small gear cluster | App grid |
| Login / Signup | SceneAuth — minimal gear, clean focus | Form-focused |

All page-specific scenes inherit the same gold/void palette and gear language.

---

## 7. Reusable Components

### New / Rewritten
| Component | Description |
|-----------|-------------|
| `GearUniverse.tsx` | Single persistent Three.js canvas, camera controlled by chapter index |
| `ChapterBar.tsx` | Bottom navigation bar, 5 chapters, active state |
| `StatusBar.tsx` | Top HUD bar, logo + availability + version |
| `HUDFrame.tsx` | Four corner brackets, applied per chapter |
| `ChaptersContainer.tsx` | Horizontal snap-scroll wrapper, wheel→horizontal translation |
| `Button.tsx` | Rewritten: `gold` and `ghost-gold` variants only |
| `LevelDots.tsx` | Keep as-is (4-dot scale) |
| `ProjectCard.tsx` | Void panel + year tag + stack pills |

### Removed
| Component | Reason |
|-----------|--------|
| `ThreeBackground.tsx` | Replaced by `GearUniverse.tsx` |
| `SceneAbout.tsx`, `SceneSkills.tsx`, `SceneServices.tsx`, `SceneProjects.tsx`, `SceneFinalCTA.tsx`, `SceneProjectsHero.tsx` | Replaced by one unified scene |
| `GeometricShape.tsx` | Design system removed |
| `FloatingParticles.tsx` | Handled inside GearUniverse |
| `AnimatedCard.tsx` | Replaced by ProjectCard / void-panel system |
| `MiniAppPresentation.tsx` | Replaced by simpler void-panel card |
| `SceneCarousel.tsx` | Not used in new design — delete |
| `FinalCTA.tsx`, `ServicesSection.tsx`, `SkillsShowcase.tsx`, `PresentationSection.tsx`, `DynamicHero.tsx`, `ProjectsCTA.tsx` | Replaced by chapter components |
| `ModernFooter.tsx` | Replaced by ChapterBar + Contact chapter |

### Kept / Adapted
| Component | Changes |
|-----------|---------|
| `Navbar.tsx` | Replaced by StatusBar (no traditional nav on home — ChapterBar handles it). On sub-pages: minimal top bar with TBP.DEV logo + back arrow |
| `Layout.tsx` | Split into two components: `HomeLayout.tsx` (no navbar, renders `StatusBar` + `ChapterBar` + `HUDFrame` + `GearUniverse`) and `PageLayout.tsx` (minimal top bar with `TBP.DEV` logo + back arrow, standard vertical scroll). `App.jsx` uses `HomeLayout` for `/` and `PageLayout` for all other routes. |
| `ProtectedRoute.tsx` | No changes |
| `AuthContext.tsx` | No changes |
| `api.ts` | No changes |
| `cn.ts` | No changes |

---

## 8. File Structure Changes

```
src/
├── components/
│   ├── Three/
│   │   ├── GearUniverse.tsx        ← NEW: unified home scene
│   │   ├── SceneProjectsHero.tsx   ← REWORK (gold/void gear-framed cards)
│   │   ├── SceneResume.tsx         ← REWORK (gold/void)
│   │   ├── SceneContact.tsx        ← REWORK
│   │   ├── SceneAuth.tsx           ← REWORK
│   │   └── SceneMiniApps.tsx       ← REWORK
│   ├── Layout/
│   │   ├── StatusBar.tsx           ← NEW: top HUD bar
│   │   ├── ChapterBar.tsx          ← NEW: bottom chapter nav
│   │   └── HUDFrame.tsx            ← NEW: corner brackets
│   ├── Custom/
│   │   ├── Button.tsx              ← REWRITE
│   │   ├── ProjectCard.tsx         ← NEW
│   │   └── LevelDots.tsx           ← KEEP
│   └── chapters/                  ← NEW directory
│       ├── ChapterHero.tsx
│       ├── ChapterAbout.tsx
│       ├── ChapterSkills.tsx
│       ├── ChapterProjects.tsx
│       └── ChapterContact.tsx
├── pages/
│   ├── Home.tsx                    ← REWRITE: ChaptersContainer wrapper
│   ├── Projects.tsx                ← REWORK
│   ├── Resume.tsx                  ← REWORK
│   ├── Contact.tsx                 ← REWORK
│   └── [mini-app pages]            ← KEEP (internal styling unchanged)
└── index.css                       ← MAJOR REWORK: new design system
```

---

## 9. Animation & Interaction Details

- **Chapter transition:** Camera Z lerps to `targetZ` via rAF (factor 0.05, ~1.4s convergence) + Framer Motion chapter content fade (opacity 0→1, y 20→0, 0.6s, delay 0.3s)
- **Gear rotation:** `requestAnimationFrame` per gear, speeds: large 0.001 rad/frame, medium 0.003, small 0.006 (alternating directions)
- **Mouse parallax:** Camera X/Y drifts ±2 units based on mouse position (lerp, 0.03 speed)
- **Particle drift:** Each particle has a random drift vector, very slow (0.01–0.05 units/frame), wraps at bounds
- **Gold glow pulse:** `@keyframes` on status dot and availability badge (opacity 1→0.3, 2s infinite)
- **Active chapter slot:** Static 1px gold top border (full width, no animation — snap scroll is discrete)
- **Hover states:** Project cards lift Y -4px + border-color to `--color-border-active`, 200ms ease
- **Button hover:** `btn-gold` scale 1.02 + outer border brightens; `btn-ghost-gold` text brightens to white

---

## 10. Performance Constraints

- Single WebGL context (one canvas) — critical for staying under browser WebGL context limit
- Gear geometry: use `BufferGeometry` with manual vertex arrays, not `ExtrudeGeometry` (too heavy)
- Total draw calls target: < 40 per frame
- IntersectionObserver: pause rAF when page is backgrounded
- Mobile: reduce particles to 400, hide circuit traces, simplify gears to outline-only circles (no teeth geometry)
- Pixel ratio cap: 1.5

---

## 11. Content Inventory (What Carries Over)

| Content | Source | Status |
|---------|--------|--------|
| Name, role, bio | Existing components | Carry over, may need copy refresh |
| Photo | `src/assets/PhotoPresentation.png` | Keep, apply grayscale filter |
| CV PDFs | `src/assets/CV_TOM BARITEAU-PETER_EN.pdf` + `_FR.pdf` | Keep |
| Skills data | `SkillsShowcase.tsx` | Extract and reuse |
| Projects data | `Projects.tsx` | Extract and reuse |
| Mini-apps data | `MiniApp.tsx` | Extract and reuse |
| Social/contact info | `Contact.tsx` | Extract and reuse |
| Icons | `src/assets/Icons/*.svg` | May retire in favor of inline SVG/gold tint |

---

## 12. Out of Scope

- Backend / API changes
- Auth system changes
- Mini-app internal pages (LifeGame, LoveTimer, Memory, etc.) — internal styling unchanged
- Blog section
- i18n / dark-light toggle
- Logo (user is designing separately — placeholder `TBP.DEV` wordmark used until ready)

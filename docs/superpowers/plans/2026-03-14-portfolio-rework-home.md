# Portfolio Rework — Home Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely rework the Tomfolio home page into an immersive horizontal chapter experience with a sober cyberpunk Void & Gold aesthetic, a single persistent Three.js GearUniverse, and Space Grotesk geometric typography.

**Architecture:** A `ChapterContext` holds the active chapter index (0–4). A fixed `GearUniverse` Three.js canvas sits at z-index 0; its camera lerps forward (negative Z) as chapters advance. Five `Chapter*` components live inside a horizontal snap-scroll `ChaptersContainer`. `StatusBar` and `ChapterBar` are fixed overlays. `HomeLayout` wraps everything; `PageLayout` wraps all other routes.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Three.js 0.183 + Framer Motion 12 + React Router v7

**Spec:** `docs/superpowers/specs/2026-03-14-portfolio-rework-design.md`

**Scope note:** Sub-pages (Projects, Resume, Contact, MiniApp, auth pages) are a separate follow-up plan. This plan delivers a fully working home page with the new design system.

**Verification:** No test framework installed. Use `npm run build` (type + Vite build check), `npm run lint`, and `npm run dev` (visual browser check) after each task.

---

## Chunk 1: Design System Foundation

Files changed:
- Modify: `index.html` — replace Google Fonts link
- Rewrite: `src/index.css` — Void & Gold design system
- Rewrite: `src/components/Custom/Button.tsx` — gold/ghost-gold variants
- Create: `src/context/ChapterContext.tsx`

---

### Task 1: Update fonts in index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the Google Fonts import**

Open `index.html`. Replace the entire `<head>` block with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tom Bariteau-Peter — UX Designer & Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -5
```
Expected: build succeeds (exit 0).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: switch fonts to Space Grotesk + DM Sans"
```

---

### Task 2: Rewrite src/index.css with Void & Gold design system

**Files:**
- Rewrite: `src/index.css`

- [ ] **Step 1: Replace the entire file**

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════
   VOID & GOLD DESIGN SYSTEM — Tomfolio v4
   Sober Cyberpunk · Premium · Geometric Modern
═══════════════════════════════════════════════ */

@theme {
  /* ── Core Void palette (solid — Tailwind generates utilities) ── */
  --color-void:          #000000;
  --color-void-deep:     #030303;
  --color-void-surface:  #080808;
  --color-void-elevated: #0d0d0d;
  --color-gold:          #d4af37;

  /* ── Font families ── */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* ── Easing ── */
  --ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
}

/* ── Alpha variants (not in @theme — rgba doesn't work there) ── */
:root {
  --color-gold-dim:         rgba(212, 175, 55, 0.4);
  --color-gold-ghost:       rgba(212, 175, 55, 0.06);
  --color-text-primary:     #ffffff;
  --color-text-secondary:   rgba(232, 228, 217, 0.5);
  --color-text-dim:         rgba(232, 228, 217, 0.2);
  --color-border:           rgba(212, 175, 55, 0.08);
  --color-border-active:    rgba(212, 175, 55, 0.25);
}

/* ═══════════════════════════════════════════════
   BASE
═══════════════════════════════════════════════ */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-void-deep);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 0.95rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ═══════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════ */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  color: var(--color-text-primary);
  line-height: 1;
}

h1 {
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

h2 {
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

h3 {
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

p {
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-weight: 300;
}

a {
  color: var(--color-gold);
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.75;
}

/* ═══════════════════════════════════════════════
   UTILITY CLASSES
═══════════════════════════════════════════════ */

/* Display text — hero name */
.display-text {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 7rem);
  letter-spacing: -0.04em;
  line-height: 0.92;
}

/* Weight helpers */
.font-300 { font-weight: 300; }
.font-700 { font-weight: 700; }

/* Colour helpers */
.text-gold          { color: var(--color-gold); }
.text-gold-dim      { color: var(--color-gold-dim); }
.text-secondary     { color: var(--color-text-secondary); }
.text-dim           { color: var(--color-text-dim); }
.text-half          { color: rgba(255, 255, 255, 0.5); }

/* Section label */
.section-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold-dim);
}

/* HUD caption */
.hud-caption {
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}

/* ── Void panels ── */
.void-panel {
  background: var(--color-void-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.2s;
}
.void-panel:hover,
.void-panel-active {
  border-color: var(--color-border-active);
}

/* ── Buttons ── */
.btn-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  background: var(--color-gold);
  color: #000;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  position: relative;
  outline: 1px solid transparent;
  outline-offset: 3px;
  transition: outline-color 0.2s, transform 0.15s;
  text-decoration: none;
}
.btn-gold:hover {
  color: #000;
  outline-color: rgba(212, 175, 55, 0.45);
  transform: scale(1.02);
  opacity: 1;
}

.btn-ghost-gold {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  background: none;
  color: var(--color-gold-dim);
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
}
.btn-ghost-gold:hover {
  color: #fff;
  opacity: 1;
}

/* ── HUD corner brackets ── */
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
.hud-corner-tl { top: 48px;   left: 16px;  }
.hud-corner-tr { top: 48px;   right: 16px; }
.hud-corner-bl { bottom: 52px; left: 16px;  }
.hud-corner-br { bottom: 52px; right: 16px; }

.hud-corner-tl::before, .hud-corner-tr::before,
.hud-corner-bl::before, .hud-corner-br::before,
.hud-corner-tl::after,  .hud-corner-tr::after,
.hud-corner-bl::after,  .hud-corner-br::after {
  content: '';
  position: absolute;
  background: var(--color-gold);
}
/* Horizontal arm */
.hud-corner-tl::before { top: 0;    left: 0;  width: 100%; height: 1px; }
.hud-corner-tr::before { top: 0;    right: 0; width: 100%; height: 1px; }
.hud-corner-bl::before { bottom: 0; left: 0;  width: 100%; height: 1px; }
.hud-corner-br::before { bottom: 0; right: 0; width: 100%; height: 1px; }
/* Vertical arm */
.hud-corner-tl::after { top: 0;    left: 0;  width: 1px; height: 100%; }
.hud-corner-tr::after { top: 0;    right: 0; width: 1px; height: 100%; }
.hud-corner-bl::after { bottom: 0; left: 0;  width: 1px; height: 100%; }
.hud-corner-br::after { bottom: 0; right: 0; width: 1px; height: 100%; }

/* ── Scan line ── */
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

/* ── Gold glow pulse animation ── */
@keyframes gold-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
.gold-pulse {
  animation: gold-pulse 2s ease-in-out infinite;
}

/* ── Scrollbar hiding utility ── */
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* ── Chapter content entrance ── (used by Framer Motion as base) */
.chapter-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}

/* ── Form inputs — gold bottom border only ── */
.input-void {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 0.9rem;
  padding: 10px 0;
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
}
.input-void::placeholder {
  color: var(--color-text-dim);
  font-family: var(--font-body);
}
.input-void:focus {
  border-bottom-color: var(--color-gold);
}

/* ── LevelDots (keep existing) ── */
.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--color-gold-dim);
  transition: background 0.2s;
}
.level-dot.filled {
  background: var(--color-gold);
  border-color: var(--color-gold);
}
```

- [ ] **Step 2: Verify build**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -10
```
Expected: build succeeds. Any existing component references to removed CSS classes (like `gradient-primary`, `surface-elevated`, etc.) will cause visual breakage but not build failure — that's expected and will be fixed in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: replace design system with Void & Gold"
```

---

### Task 3: Rewrite Button.tsx

**Files:**
- Rewrite: `src/components/Custom/Button.tsx`

- [ ] **Step 1: Replace the file**

```typescript
// src/components/Custom/Button.tsx
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps {
  variant?: 'gold' | 'ghost-gold'
  children: ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  variant = 'gold',
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  const cls = cn(
    variant === 'gold' ? 'btn-gold' : 'btn-ghost-gold',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Verify**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run lint src/components/Custom/Button.tsx 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Custom/Button.tsx
git commit -m "feat: rewrite Button with gold/ghost-gold variants"
```

---

### Task 4: Create ChapterContext.tsx

**Files:**
- Create: `src/context/ChapterContext.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/context/ChapterContext.tsx
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export const CHAPTER_COUNT = 5

export const CHAPTER_LABELS = [
  { num: '01', name: 'Intro' },
  { num: '02', name: 'About' },
  { num: '03', name: 'Skills' },
  { num: '04', name: 'Projects' },
  { num: '05', name: 'Contact' },
] as const

// Camera Z positions per chapter (camera flies FORWARD = more negative Z)
export const CHAPTER_Z_POSITIONS = [-50, -200, -350, -500, -650] as const

interface ChapterContextValue {
  chapterIndex: number
  setChapterIndex: (i: number) => void
  isMobile: boolean
}

const ChapterContext = createContext<ChapterContextValue | null>(null)

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [chapterIndex, setChapterIndexState] = useState(0)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  )

  // Keep isMobile updated on resize
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setChapterIndex = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(CHAPTER_COUNT - 1, i))
    setChapterIndexState(clamped)
  }, [])

  return (
    <ChapterContext.Provider value={{ chapterIndex, setChapterIndex, isMobile }}>
      {children}
    </ChapterContext.Provider>
  )
}

export function useChapter() {
  const ctx = useContext(ChapterContext)
  if (!ctx) throw new Error('useChapter must be used inside ChapterProvider')
  return ctx
}
```

- [ ] **Step 2: Verify**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/context/ChapterContext.tsx
git commit -m "feat: add ChapterContext with chapter index and Z positions"
```

---

## Chunk 2: GearUniverse Three.js Scene

Files changed:
- Create: `src/components/Three/GearUniverse.tsx`

---

### Task 5: Create GearUniverse.tsx — gear geometry helpers

**Files:**
- Create: `src/components/Three/GearUniverse.tsx`

This is the single Three.js canvas. It mounts once, lives behind all content, and the camera lerps between Z positions as `chapterIndex` changes.

- [ ] **Step 1: Create the file**

```typescript
// src/components/Three/GearUniverse.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useChapter, CHAPTER_Z_POSITIONS } from '../../context/ChapterContext'

// ─── Gear geometry ────────────────────────────────────────────────────────────

function createGear(
  outerRadius: number,
  innerRadius: number,
  hubRadius: number,
  teethCount: number,
  teethHeight: number,
  opacity: number,
  mobile: boolean
): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: 0xd4af37, opacity, transparent: true })

  function addCircle(r: number, segs = 64) {
    const pts: number[] = []
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2
      pts.push(Math.cos(a) * r, Math.sin(a) * r, 0)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    group.add(new THREE.Line(geo, mat))
  }

  addCircle(outerRadius)
  addCircle(innerRadius)
  addCircle(hubRadius, 32)

  // Teeth — desktop only
  if (!mobile) {
    const toothHalfAngle = (Math.PI * 2 / teethCount) * 0.3
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2
      const a1 = angle - toothHalfAngle
      const a2 = angle + toothHalfAngle
      const r1 = outerRadius
      const r2 = outerRadius + teethHeight
      const pts = new Float32Array([
        Math.cos(a1) * r1, Math.sin(a1) * r1, 0,
        Math.cos(a1) * r2, Math.sin(a1) * r2, 0,
        Math.cos(a2) * r2, Math.sin(a2) * r2, 0,
        Math.cos(a2) * r1, Math.sin(a2) * r1, 0,
        Math.cos(a1) * r1, Math.sin(a1) * r1, 0,
      ])
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
      group.add(new THREE.Line(geo, mat))
    }
  }

  // Spokes
  const spokeCount = teethCount > 10 ? 8 : 6
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2
    const pts = new Float32Array([
      Math.cos(angle) * hubRadius, Math.sin(angle) * hubRadius, 0,
      Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius, 0,
    ])
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    group.add(new THREE.Line(geo, mat))
  }

  return group
}

// ─── Gear placement data ──────────────────────────────────────────────────────
// [x, y, z, outerR, innerR, hubR, teeth, teethH, opacity, rotDir]
type GearConfig = [number, number, number, number, number, number, number, number, number, 1 | -1]

const GEAR_CONFIGS: GearConfig[] = [
  // Far (vanishing point area, Z near 0)
  [30,  15,  -80,  10, 7,   2,   16, 1.2, 0.10,  1],
  [-25, -10, -120,  7, 5,   1.5, 12, 0.9, 0.12, -1],
  [10,  -25, -150,  4, 2.8, 1.0, 10, 0.6, 0.10,  1],
  // Mid (chapters 1–2 depth)
  [20,  -20, -250,  8, 6,   1.8, 14, 1.0, 0.30,  1],
  [-30,  18, -300,  5, 3.5, 1.2, 10, 0.7, 0.35, -1],
  [15,   10, -280,  3, 2,   0.8,  8, 0.5, 0.38,  1],
  [40,   -5, -320,  6, 4.5, 1.5, 12, 0.8, 0.28, -1],
  [-15,  -8, -360,  4, 2.8, 0.9,  8, 0.6, 0.32,  1],
  // Near-mid (chapters 2–3 depth)
  [-15,  25, -380,  9, 6.5, 2.0, 14, 1.1, 0.45,  1],
  [35,  -15, -420,  4, 2.8, 1.0,  8, 0.6, 0.50, -1],
  [-40, -20, -460,  7, 5,   1.5, 12, 0.9, 0.48,  1],
  [10,   30, -490,  3.5, 2.4, 0.9, 8, 0.5, 0.45, -1],
  // Near (chapters 3–5 depth)
  [-20,  10, -550,  8, 6,   2.0, 14, 1.0, 0.60,  1],
  [30,  -25, -600,  5, 3.5, 1.2, 10, 0.7, 0.65, -1],
  [-10, -30, -650, 12, 9,   3.0, 16, 1.5, 0.70,  1],
  [50,   20, -700,  3, 2,   0.7,  8, 0.5, 0.55, -1],
]

interface GearEntry {
  gear: THREE.Group
  rotSpeed: number
}

function buildGears(mobile: boolean): GearEntry[] {
  return GEAR_CONFIGS.map(([x, y, z, outerR, innerR, hubR, teeth, teethH, opacity, dir]) => {
    const speed = outerR > 8 ? 0.001 : outerR > 4 ? 0.003 : 0.006
    const gear = createGear(outerR, innerR, hubR, teeth, teethH, opacity, mobile)
    gear.position.set(x, y, z)
    return { gear, rotSpeed: speed * dir }
  })
}

// ─── Depth rings at vanishing point ──────────────────────────────────────────

function buildDepthRings(): THREE.Group {
  const group = new THREE.Group()
  const configs: [number, number][] = [
    [20, 0.08], [40, 0.07], [80, 0.05], [160, 0.04], [320, 0.03],
  ]
  configs.forEach(([r, opacity]) => {
    const mat = new THREE.LineBasicMaterial({ color: 0xd4af37, opacity, transparent: true })
    const pts: number[] = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(Math.cos(a) * r, Math.sin(a) * r, 0)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    group.add(new THREE.Line(geo, mat))
  })
  group.position.z = -50
  return group
}

// ─── Particle field ───────────────────────────────────────────────────────────

function buildParticles(count: number): { points: THREE.Points; drifts: Float32Array } {
  const positions = new Float32Array(count * 3)
  const drifts = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 600
    positions[i * 3 + 1] = (Math.random() - 0.5) * 400
    positions[i * 3 + 2] = -Math.random() * 900
    drifts[i * 3]        = (Math.random() - 0.5) * 0.04
    drifts[i * 3 + 1]    = (Math.random() - 0.5) * 0.04
    drifts[i * 3 + 2]    = 0
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  // Glow sprite texture
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0,   'rgba(212,175,55,1)')
  gradient.addColorStop(0.4, 'rgba(212,175,55,0.5)')
  gradient.addColorStop(1,   'rgba(212,175,55,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)

  const mat = new THREE.PointsMaterial({
    size: 2.5,
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  return { points: new THREE.Points(geo, mat), drifts }
}

// ─── Circuit traces ───────────────────────────────────────────────────────────

function buildCircuitTrace(from: THREE.Vector3, to: THREE.Vector3, opacity: number): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.LineDashedMaterial({
    color: 0xd4af37,
    opacity,
    transparent: true,
    dashSize: 0.4,
    gapSize: 0.5,
  })
  // L-shape: from → (to.x, from.y, from.z) → to
  const mid = new THREE.Vector3(to.x, from.y, from.z)
  const lineGeo = new THREE.BufferGeometry().setFromPoints([from, mid, to])
  const line = new THREE.Line(lineGeo, mat)
  line.computeLineDistances()
  group.add(line)

  // Node dots at endpoints
  const dotGeo = new THREE.SphereGeometry(0.3, 6, 6)
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, opacity: Math.min(opacity * 1.5, 1), transparent: true })
  const d1 = new THREE.Mesh(dotGeo, dotMat); d1.position.copy(from)
  const d2 = new THREE.Mesh(dotGeo, dotMat); d2.position.copy(to)
  group.add(d1, d2)
  return group
}

// Pairs of gear indices to connect
const TRACE_PAIRS = [[0, 3], [1, 4], [3, 8], [4, 9], [8, 12], [9, 13]]

function buildCircuitTraces(gearEntries: GearEntry[]): THREE.Group[] {
  return TRACE_PAIRS
    .filter(([a, b]) => a < gearEntries.length && b < gearEntries.length)
    .map(([a, b]) => {
      const posA = gearEntries[a].gear.position.clone()
      const posB = gearEntries[b].gear.position.clone()
      return buildCircuitTrace(posA, posB, 0.15 + Math.random() * 0.08)
    })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GearUniverse() {
  const { chapterIndex, isMobile } = useChapter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetZRef = useRef(CHAPTER_Z_POSITIONS[0])

  // Update targetZ whenever chapter changes
  useEffect(() => {
    targetZRef.current = CHAPTER_Z_POSITIONS[chapterIndex]
  }, [chapterIndex])

  // One-time scene setup
  useEffect(() => {
    const canvas = canvasRef.current!

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = CHAPTER_Z_POSITIONS[0]

    // Mouse target (lerped)
    let targetX = 0
    let targetY = 0
    let isVisible = true
    let frameId = 0

    // Build scene objects
    const gearEntries = buildGears(isMobile)
    const depthRings = buildDepthRings()
    const particleCount = isMobile ? 400 : 800
    const { points: particlePoints, drifts } = buildParticles(particleCount)

    scene.add(depthRings)
    scene.add(particlePoints)
    gearEntries.forEach(({ gear }) => scene.add(gear))

    if (!isMobile) {
      buildCircuitTraces(gearEntries).forEach(t => scene.add(t))
    }

    // Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 4
      targetY = -((e.clientY / window.innerHeight) - 0.5) * 4
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvas)

    // Animation loop
    const posAttr = particlePoints.geometry.attributes.position as THREE.BufferAttribute

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!isVisible) return

      // Camera lerp
      camera.position.z += (targetZRef.current - camera.position.z) * 0.05
      camera.position.x += (targetX - camera.position.x) * 0.03
      camera.position.y += (targetY - camera.position.y) * 0.03

      // Rotate gears
      gearEntries.forEach(({ gear, rotSpeed }) => {
        gear.rotation.z += rotSpeed
      })

      // Drift particles with wrap-around
      const pos = posAttr.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3]     += drifts[i * 3]
        pos[i * 3 + 1] += drifts[i * 3 + 1]
        if (Math.abs(pos[i * 3])     > 300) drifts[i * 3]     *= -1
        if (Math.abs(pos[i * 3 + 1]) > 200) drifts[i * 3 + 1] *= -1
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
    }
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -10
```
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Three/GearUniverse.tsx
git commit -m "feat: add GearUniverse Three.js scene with gear fly-through"
```

---

## Chunk 3: Layout Shell Components

Files changed:
- Create: `src/components/Layout/StatusBar.tsx`
- Create: `src/components/Layout/ChapterBar.tsx`
- Create: `src/components/Layout/HUDFrame.tsx`
- Create: `src/layouts/HomeLayout.tsx`
- Create: `src/layouts/PageLayout.tsx`

---

### Task 6: Create StatusBar.tsx

**Files:**
- Create: `src/components/Layout/StatusBar.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/Layout/StatusBar.tsx
export function StatusBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '36px',
        zIndex: 40,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        gap: '16px',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--color-gold)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginRight: 'auto',
        }}
      >
        TBP.DEV
      </span>

      {/* Availability dot */}
      <span
        className="gold-pulse"
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'var(--color-gold)',
          boxShadow: '0 0 6px var(--color-gold)',
          flexShrink: 0,
        }}
      />
      <span className="hud-caption">Available</span>

      <span className="hud-caption" style={{ opacity: 0.4 }}>Portfolio v4</span>
      <span className="hud-caption" style={{ opacity: 0.4 }}>2026</span>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout/StatusBar.tsx
git commit -m "feat: add StatusBar HUD component"
```

---

### Task 7: Create ChapterBar.tsx

**Files:**
- Create: `src/components/Layout/ChapterBar.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/Layout/ChapterBar.tsx
import { useChapter, CHAPTER_LABELS } from '../../context/ChapterContext'

export function ChapterBar() {
  const { chapterIndex, setChapterIndex } = useChapter()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        zIndex: 40,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {CHAPTER_LABELS.map((ch, i) => {
        const isActive = i === chapterIndex
        return (
          <button
            key={ch.num}
            onClick={() => setChapterIndex(i)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderRight: i < CHAPTER_LABELS.length - 1 ? '1px solid var(--color-border)' : 'none',
              borderTop: isActive ? '1px solid var(--color-gold)' : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0 12px',
              transition: 'background 0.2s',
            }}
          >
            <span
              className="hud-caption"
              style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-text-dim)' }}
            >
              {ch.num}
            </span>
            <span
              className="hud-caption"
              style={{
                color: isActive ? 'rgba(212,175,55,0.8)' : 'var(--color-text-dim)',
                letterSpacing: '0.1em',
              }}
            >
              {ch.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout/ChapterBar.tsx
git commit -m "feat: add ChapterBar bottom navigation"
```

---

### Task 8: Create HUDFrame.tsx

**Files:**
- Create: `src/components/Layout/HUDFrame.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/Layout/HUDFrame.tsx
// Renders the four gold corner brackets defined in index.css
export function HUDFrame() {
  return (
    <>
      <div className="hud-corner-tl" aria-hidden />
      <div className="hud-corner-tr" aria-hidden />
      <div className="hud-corner-bl" aria-hidden />
      <div className="hud-corner-br" aria-hidden />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout/HUDFrame.tsx
git commit -m "feat: add HUDFrame corner bracket component"
```

---

### Task 9: Create src/layouts/HomeLayout.tsx

**Files:**
- Create: `src/layouts/HomeLayout.tsx`

- [ ] **Step 1: Create the layouts directory and file**

```bash
mkdir -p /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/src/layouts
```

```typescript
// src/layouts/HomeLayout.tsx
import { type ReactNode } from 'react'
import { ChapterProvider } from '../context/ChapterContext'
import { GearUniverse } from '../components/Three/GearUniverse'
import { StatusBar } from '../components/Layout/StatusBar'
import { ChapterBar } from '../components/Layout/ChapterBar'
import { HUDFrame } from '../components/Layout/HUDFrame'

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <ChapterProvider>
      {/* Three.js canvas — fixed, behind everything */}
      <GearUniverse />

      {/* Fixed UI overlays */}
      <StatusBar />
      <ChapterBar />
      <HUDFrame />

      {/* Page content */}
      {children}
    </ChapterProvider>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/HomeLayout.tsx
git commit -m "feat: add HomeLayout with GearUniverse and HUD overlays"
```

---

### Task 10: Create src/layouts/PageLayout.tsx

**Files:**
- Create: `src/layouts/PageLayout.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/layouts/PageLayout.tsx
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-void-deep)' }}>
      {/* Minimal top bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '48px',
          zIndex: 40,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '16px',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              color: 'var(--color-gold-dim)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ← Back
          </span>
        </Link>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--color-gold)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginLeft: 'auto',
          }}
        >
          TBP.DEV
        </span>
      </header>

      {/* Content with top padding to clear fixed header */}
      <main style={{ paddingTop: '48px' }}>
        {children}
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -8
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/PageLayout.tsx
git commit -m "feat: add PageLayout for sub-pages with back nav"
```

---

## Chunk 4: Chapter Content Components

Files changed:
- Create: `src/components/Custom/ProjectCard.tsx`
- Create: `src/components/chapters/ChapterHero.tsx`
- Create: `src/components/chapters/ChapterAbout.tsx`
- Create: `src/components/chapters/ChapterSkills.tsx`
- Create: `src/components/chapters/ChapterProjects.tsx`
- Create: `src/components/chapters/ChapterContact.tsx`

---

### Task 11: Create ProjectCard.tsx

**Files:**
- Create: `src/components/Custom/ProjectCard.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/Custom/ProjectCard.tsx
import { motion } from 'framer-motion'

interface ProjectCardProps {
  year: string
  title: string
  description: string
  role: string
  stack: string[]
  href?: string
}

export function ProjectCard({ year, title, description, role, stack, href }: ProjectCardProps) {
  return (
    <motion.div
      className="void-panel"
      style={{ padding: '20px 24px', borderRadius: '2px', marginBottom: '12px' }}
      whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.25)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Year + role */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
          }}
        >
          {year}
        </span>
        <span className="hud-caption" style={{ color: 'var(--color-text-dim)' }}>
          {role}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ marginBottom: '8px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>{title}</h3>

      {/* Description */}
      <p style={{ fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>{description}</p>

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        {stack.map((s) => (
          <span
            key={s}
            style={{
              background: 'var(--color-void-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-dim)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Link */}
      {href && (
        <a
          href={href}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          View Project →
        </a>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Custom/ProjectCard.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 12: Create ChapterHero.tsx

**Files:**
- Create: `src/components/chapters/ChapterHero.tsx`

- [ ] **Step 1: Create the chapters directory and file**

```bash
mkdir -p /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/src/components/chapters
```

```typescript
// src/components/chapters/ChapterHero.tsx
import { motion } from 'framer-motion'
import { useChapter } from '../../context/ChapterContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

export function ChapterHero() {
  const { setChapterIndex } = useChapter()

  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
      }}
    >
      {/* Left content — 55% */}
      <div style={{ flex: '0 0 55%', maxWidth: '55%' }}>
        {/* Tag */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{ width: '28px', height: '1px', background: 'var(--color-gold-dim)', flexShrink: 0 }}
          />
          <span className="section-label">UX Designer &amp; Developer</span>
        </motion.div>

        {/* Name — weight contrast */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <div className="display-text">
            <span className="font-300 text-half" style={{ display: 'block' }}>Tom</span>
            <span className="font-700" style={{ display: 'block', color: '#fff' }}>
              Bariteau<span className="text-gold">.</span>
            </span>
            <span className="font-300 text-half" style={{ display: 'block' }}>Peter</span>
          </div>
        </motion.div>

        {/* Body */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '380px', marginTop: '20px', fontSize: '0.9rem' }}
        >
          Crafting immersive digital experiences at the intersection of design precision and technical craft.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '32px' }}
        >
          <button className="btn-gold" onClick={() => setChapterIndex(3)}>
            View Work
          </button>
          <a
            href="/assets/CV_TOM BARITEAU-PETER_EN.pdf"
            className="btn-ghost-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV →
          </a>
        </motion.div>
      </div>

      {/* Right data readout — 45% */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          flex: '0 0 45%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            alignItems: 'flex-end',
          }}
        >
          {[
            { val: '50+', label: 'Projects' },
            { val: '5yr', label: 'Experience' },
            { val: 'FR·EN', label: 'Languages' },
          ].map((item, i) => (
            <div key={item.label}>
              {i > 0 && (
                <div
                  style={{
                    height: '1px',
                    background: 'var(--color-border)',
                    margin: '10px 0',
                  }}
                />
              )}
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'rgba(212,175,55,0.7)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {item.val}
                </div>
                <div className="hud-caption" style={{ marginTop: '3px' }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chapters/ChapterHero.tsx
git commit -m "feat: add ChapterHero with name, CTA, and data readout"
# NOTE: The CV href="/assets/CV_TOM BARITEAU-PETER_EN.pdf" will 404 until Task 19 Step 3
# copies the PDFs from src/assets/ to public/assets/. This is expected at this point.
```

---

### Task 13: Create ChapterAbout.tsx

**Files:**
- Create: `src/components/chapters/ChapterAbout.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/chapters/ChapterAbout.tsx
import { motion } from 'framer-motion'
import photo from '../../assets/PhotoPresentation.png'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const stats = [
  { label: 'Education',   value: 'Epitech Seoul' },
  { label: 'Experience',  value: '5+ Years' },
  { label: 'Languages',   value: 'FR · EN' },
  { label: 'Location',    value: 'Seoul, KR' },
]

export function ChapterAbout() {
  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
        gap: '60px',
      }}
    >
      {/* Left — photo + stats (45%) */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ flex: '0 0 42%', maxWidth: '42%' }}
      >
        {/* Photo */}
        <div
          style={{
            position: 'relative',
            marginBottom: '24px',
            maxWidth: '280px',
          }}
        >
          <img
            src={photo}
            alt="Tom Bariteau-Peter"
            style={{
              width: '100%',
              display: 'block',
              filter: 'grayscale(100%)',
              border: '1px solid var(--color-gold)',
            }}
          />
          {/* Gold bottom glow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '40px',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 4-stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  flexShrink: 0,
                  marginTop: '5px',
                }}
              />
              <div>
                <div className="hud-caption" style={{ marginBottom: '2px' }}>{s.label}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — text (55%) */}
      <div style={{ flex: 1 }}>
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>
            02 — About
          </span>
          <h2 style={{ marginBottom: '20px' }}>
            <span className="font-300 text-half">Who </span>
            <span className="font-700">I Am</span>
          </h2>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <p style={{ marginBottom: '16px' }}>
            I'm a UX/UI designer and web developer based in Seoul, combining design precision with
            technical craft. I build digital experiences that feel alive — from interactive web apps
            to immersive 3D interfaces.
          </p>
          <p style={{ marginBottom: '28px' }}>
            With a background at Epitech and 5+ years of experience across design systems, front-end
            development, and user research, I bridge the gap between what looks right and what works right.
          </p>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: '16px' }}
        >
          <a
            href="/assets/CV_TOM BARITEAU-PETER_EN.pdf"
            className="btn-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV (English)
          </a>
          <a
            href="/assets/CV_TOM BARITEAU-PETER_FR.pdf"
            className="btn-ghost-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV (Français) →
          </a>
        </motion.div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chapters/ChapterAbout.tsx
git commit -m "feat: add ChapterAbout with photo, bio, and stats"
# NOTE: The CV hrefs use /assets/ paths which require Task 19 Step 3 to copy PDFs to public/assets/.
```

---

### Task 14: Create ChapterSkills.tsx

**Files:**
- Create: `src/components/chapters/ChapterSkills.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/chapters/ChapterSkills.tsx
import { motion } from 'framer-motion'
import { LevelDots } from '../Custom/LevelDots'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Three.js', level: 3 },
      { name: 'Framer Motion', level: 4 },
      { name: 'HTML / CSS', level: 4 },
    ],
  },
  {
    category: 'Design',
    skills: [
      { name: 'UI / UX', level: 4 },
      { name: 'Figma', level: 4 },
      { name: 'Design Systems', level: 4 },
      { name: 'Adobe XD', level: 3 },
      { name: 'Photoshop', level: 3 },
      { name: 'Prototyping', level: 4 },
    ],
  },
  {
    category: 'Backend & Tools',
    skills: [
      { name: 'Node.js', level: 3 },
      { name: 'Express', level: 3 },
      { name: 'MongoDB', level: 3 },
      { name: 'Git', level: 4 },
      { name: 'REST APIs', level: 4 },
      { name: 'CI / CD', level: 2 },
    ],
  },
]

const exploring = ['Three.js', 'Next.js', 'Rust', 'WebGL', 'AI Integration']

export function ChapterSkills() {
  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
        gap: '48px',
        alignItems: 'flex-start',
        overflowY: 'auto',
      }}
    >
      {/* Left — title (40%) */}
      <div style={{ flex: '0 0 36%', maxWidth: '36%', paddingTop: '4px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>
            03 — Skills
          </span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Craft &amp;</span>
            <span className="font-700" style={{ display: 'block' }}>Expertise</span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            5 years of hands-on experience across the full design-to-production pipeline.
          </p>
        </motion.div>

        {/* Currently Exploring ticker */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hud-caption" style={{ display: 'block', marginBottom: '8px', color: 'var(--color-gold-dim)' }}>
            Currently Exploring
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {exploring.map((item) => (
              <span
                key={item}
                style={{
                  background: 'var(--color-void-surface)',
                  border: '1px solid var(--color-gold-dim)',
                  color: 'var(--color-gold-dim)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — skills grid (60%) */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          alignContent: 'start',
        }}
      >
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            custom={catIdx + 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="void-panel"
            style={{ padding: '18px 20px', borderRadius: '2px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                display: 'block',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {cat.category}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 300,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {skill.name}
                  </span>
                  <LevelDots level={skill.level} max={4} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create (or overwrite) `src/components/Custom/LevelDots.tsx`**

The file may already exist. Write it unconditionally to ensure the correct implementation is in place.

```typescript
// src/components/Custom/LevelDots.tsx
interface LevelDotsProps {
  level: number
  max?: number
}

export function LevelDots({ level, max = 4 }: LevelDotsProps) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`level-dot ${i < level ? 'filled' : ''}`}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/chapters/ChapterSkills.tsx src/components/Custom/LevelDots.tsx
git commit -m "feat: add ChapterSkills with 3-column grid and LevelDots"
```

---

### Task 15: Create ChapterProjects.tsx

**Files:**
- Create: `src/components/chapters/ChapterProjects.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/chapters/ChapterProjects.tsx
import { motion } from 'framer-motion'
import { ProjectCard } from '../Custom/ProjectCard'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const projects = [
  {
    year: '2025',
    title: 'Task Breaker',
    description: 'ADHD-friendly task management app with focus timers, sub-task decomposition, and dopamine-driven progress tracking.',
    role: 'Design + Dev',
    stack: ['React', 'TypeScript', 'Tailwind'],
    href: '/task-breaker',
  },
  {
    year: '2025',
    title: 'Weather App',
    description: 'Real-time weather forecast with 5-day outlook, location search, and animated condition icons.',
    role: 'Full Stack',
    stack: ['React', 'OpenWeather API', 'Framer Motion'],
    href: '/weather',
  },
  {
    year: '2024',
    title: 'Memory Game',
    description: 'Interactive card-matching game with smooth flip animations, score tracking, and responsive grid.',
    role: 'Design + Dev',
    stack: ['React', 'TypeScript', 'CSS'],
    href: '/memory',
  },
  {
    year: '2024',
    title: 'Pomodoro Timer',
    description: 'Focus timer with work/break cycles, session logging, and minimal distraction-free interface.',
    role: 'Design + Dev',
    stack: ['React', 'TypeScript'],
    href: '/pomodoro',
  },
]

export function ChapterProjects() {
  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
        gap: '48px',
        alignItems: 'flex-start',
      }}
    >
      {/* Left — title (35%) */}
      <div style={{ flex: '0 0 30%', maxWidth: '30%', paddingTop: '4px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>
            04 — Projects
          </span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Selected</span>
            <span className="font-700" style={{ display: 'block' }}>Work</span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            Interactive applications spanning design, development, and user experience.
          </p>
          <a
            href="/miniapps"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--color-gold-dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Interactive Experiments →
          </a>
        </motion.div>
      </div>

      {/* Right — project cards (65%), scrollable */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          touchAction: 'pan-y',
          paddingRight: '4px',
        }}
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chapters/ChapterProjects.tsx
git commit -m "feat: add ChapterProjects with scrollable project cards"
```

---

### Task 16: Create ChapterContact.tsx

**Files:**
- Create: `src/components/chapters/ChapterContact.tsx`

- [ ] **Step 1: Create the file**

```typescript
// src/components/chapters/ChapterContact.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { messageAPI } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

export function ChapterContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Portfolio contact', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await messageAPI.create(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: 'Portfolio contact', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
        gap: '60px',
      }}
    >
      {/* Left — info */}
      <div style={{ flex: '0 0 38%', maxWidth: '38%' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>
            05 — Contact
          </span>
          <h2 style={{ marginBottom: '20px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Let&apos;s Build</span>
            <span className="font-700" style={{ display: 'block' }}>Something</span>
          </h2>
          <p style={{ marginBottom: '24px', fontSize: '0.88rem' }}>
            Open to new projects, collaborations, and interesting conversations.
          </p>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
        >
          <span
            className="gold-pulse"
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: 'var(--color-gold)',
              boxShadow: '0 0 8px var(--color-gold)',
              flexShrink: 0,
            }}
          />
          <span className="hud-caption" style={{ color: 'var(--color-gold-dim)' }}>
            Open to new projects
          </span>
        </motion.div>

        {/* Contact info */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          {[
            { label: 'Email', value: 'contact@tomi-tom.dev' },
            { label: 'Location', value: 'Seoul, South Korea' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: '12px' }}>
              <span className="hud-caption" style={{ display: 'block', marginBottom: '2px' }}>
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/Tomi-Tom' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/tom-bariteau-peter' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-dim)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: '24px', marginTop: '28px' }}
        >
          {[
            { val: '50+', label: 'Projects' },
            { val: '5yr', label: 'Experience' },
            { val: '100%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'rgba(212,175,55,0.7)',
                }}
              >
                {s.val}
              </div>
              <div className="hud-caption" style={{ marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — contact form */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ flex: 1 }}
      >
        {status === 'success' ? (
          <div
            style={{
              padding: '32px',
              border: '1px solid var(--color-gold)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                marginBottom: '8px',
              }}
            >
              Message Sent
            </div>
            <p style={{ fontSize: '0.85rem' }}>I&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: '20px' }}>
                <label>
                  <span className="hud-caption" style={{ display: 'block', marginBottom: '6px' }}>
                    {field.label}
                  </span>
                  <input
                    className="input-void"
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    required
                  />
                </label>
              </div>
            ))}

            <div style={{ marginBottom: '28px' }}>
              <label>
                <span className="hud-caption" style={{ display: 'block', marginBottom: '6px' }}>
                  Message
                </span>
                <textarea
                  className="input-void"
                  placeholder="Tell me about your project..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  style={{ resize: 'vertical' }}
                />
              </label>
            </div>

            {status === 'error' && (
              <p style={{ fontSize: '0.8rem', color: '#ff4444', marginBottom: '12px' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn-gold"
              disabled={status === 'loading'}
              style={{ opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chapters/ChapterContact.tsx
git commit -m "feat: add ChapterContact with form and info panel"
```

---

## Chunk 5: Home Page Assembly & App Wiring

Files changed:
- Rewrite: `src/pages/Home.tsx`
- Modify: `src/App.jsx`

---

### Task 17: Rewrite Home.tsx

**Files:**
- Rewrite: `src/pages/Home.tsx`

- [ ] **Step 1: Replace the file**

```typescript
// src/pages/Home.tsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HomeLayout } from '../layouts/HomeLayout'
import { useChapter, CHAPTER_COUNT } from '../context/ChapterContext'
import { ChapterHero } from '../components/chapters/ChapterHero'
import { ChapterAbout } from '../components/chapters/ChapterAbout'
import { ChapterSkills } from '../components/chapters/ChapterSkills'
import { ChapterProjects } from '../components/chapters/ChapterProjects'
import { ChapterContact } from '../components/chapters/ChapterContact'

const CHAPTER_COMPONENTS = [
  ChapterHero,
  ChapterAbout,
  ChapterSkills,
  ChapterProjects,
  ChapterContact,
]

function ChaptersContainer() {
  const { chapterIndex, setChapterIndex, isMobile } = useChapter()
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingProgrammatically = useRef(false)

  // Scroll container when chapterIndex changes (programmatic navigation)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    isScrollingProgrammatically.current = true
    if (isMobile) {
      el.scrollTo({ top: chapterIndex * window.innerHeight, behavior: 'smooth' })
    } else {
      el.scrollTo({ left: chapterIndex * window.innerWidth, behavior: 'smooth' })
    }
    // Reset flag after animation
    const t = setTimeout(() => { isScrollingProgrammatically.current = false }, 1000)
    return () => clearTimeout(t)
  }, [chapterIndex, isMobile])

  // Update chapterIndex when user scrolls natively
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      if (isScrollingProgrammatically.current) return
      const idx = isMobile
        ? Math.round(el.scrollTop / window.innerHeight)
        : Math.round(el.scrollLeft / window.innerWidth)
      if (idx !== chapterIndex) setChapterIndex(idx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [chapterIndex, setChapterIndex, isMobile])

  // Translate mouse wheel to horizontal scroll (desktop only)
  useEffect(() => {
    if (isMobile) return
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isMobile])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setChapterIndex(chapterIndex + 1)
      if (e.key === 'ArrowLeft')  setChapterIndex(chapterIndex - 1)
      if (e.key === 'Escape')     setChapterIndex(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chapterIndex, setChapterIndex])

  return (
    <div
      ref={containerRef}
      className="no-scrollbar"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: isMobile ? '100vw' : `${CHAPTER_COUNT * 100}vw`,
        height: isMobile ? `${CHAPTER_COUNT * 100}dvh` : '100vh',
        overflowX: isMobile ? 'hidden' : 'scroll',
        overflowY: isMobile ? 'scroll' : 'hidden',
        scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
        touchAction: isMobile ? 'pan-y' : 'pan-x',
      }}
    >
      {CHAPTER_COMPONENTS.map((ChapterComp, i) => (
        <div
          key={i}
          style={{
            width: '100vw',
            height: isMobile ? '100dvh' : '100vh',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            // Offset for fixed status bar (36px) and chapter bar (40px)
            paddingTop: '36px',
            paddingBottom: '40px',
          }}
        >
          <motion.div
            // No key remount — stable keys mean Framer Motion drives transitions smoothly.
            // i === 0 gets a fade-in on page load; others start dimmed and brighten on activation.
            initial={i === 0 ? { opacity: 0, y: 20 } : { opacity: 0.3, y: 0 }}
            animate={chapterIndex === i ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            <ChapterComp />
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <HomeLayout>
      <ChaptersContainer />
    </HomeLayout>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -15
```
Expected: build succeeds. If there are TypeScript errors, fix them before continuing.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: rewrite Home page with horizontal chapter scroll"
```

---

### Task 18: Update App.jsx — use HomeLayout/PageLayout, remove CursorGlow

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx**

The `CursorGlow` component (orange cursor) is removed. Sub-pages still use their existing `Layout` wrapper for now (sub-page rework is a separate plan). The home page now uses `HomeLayout` internally via `Home.tsx`.

```jsx
// src/App.jsx
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LifeGame from './pages/LifeGame'
import MiniAppPage from './pages/MiniApp'
import LoveTimerPage from './pages/LoveTimer'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import MemoryGame from './pages/MemoryGame'
import WeatherApp from './pages/WeatherApp'
import PomodoroTimer from './pages/PomodoroTimer'
import TaskBreaker from './pages/TaskBreaker'
import MoodTracker from './pages/MoodTracker'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/miniapps" element={<MiniAppPage />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/love" element={<LoveTimerPage />} />
      <Route path="/lifegame" element={<LifeGame />} />
      <Route path="/memory" element={<MemoryGame />} />
      <Route path="/weather" element={<WeatherApp />} />
      <Route path="/pomodoro" element={<PomodoroTimer />} />
      <Route path="/task-breaker" element={<TaskBreaker />} />
      <Route path="/mood-tracker" element={<MoodTracker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Full build and lint verification**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 && npm run lint 2>&1 | tail -10
```
Expected: build succeeds, lint passes (or only shows pre-existing warnings in untouched files).

- [ ] **Step 3: Visual check**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run dev
```
Open `http://localhost:5173`. Verify:
- Pure black background
- Gold `TBP.DEV` status bar at top
- Chapter bar at bottom (01 Intro active)
- Gold corner brackets visible
- Hero chapter shows Tom Bariteau Peter name with weight contrast
- Gold gears visible in background (Three.js canvas)
- Scroll right or press `→` to advance chapters
- Camera flies forward through gear universe between chapters

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: update App routing, remove orange CursorGlow"
```

---

## Chunk 6: Cleanup

Files changed:
- Delete: old components no longer imported anywhere

---

### Task 19: Remove dead code — old home components and unused Three.js scenes

**Files:**
- Delete: `src/components/Home/DynamicHero.tsx`
- Delete: `src/components/Home/PresentationSection.tsx`
- Delete: `src/components/Home/SkillsShowcase.tsx`
- Delete: `src/components/Home/ServicesSection.tsx`
- Delete: `src/components/Home/ProjectsCTA.tsx`
- Delete: `src/components/Home/FinalCTA.tsx`
- Delete: `src/components/Home/heroBannerSection.tsx`
- Delete: `src/components/Custom/ThreeBackground.tsx`
- Delete: `src/components/Custom/AnimatedCard.tsx`
- Delete: `src/components/Custom/GeometricShape.tsx`
- Delete: `src/components/Custom/FloatingParticles.tsx`
- Delete: `src/components/Custom/MiniAppPresentation.tsx`
- Delete: `src/components/Three/SceneAbout.tsx`
- Delete: `src/components/Three/SceneSkills.tsx`
- Delete: `src/components/Three/SceneServices.tsx`
- Delete: `src/components/Three/SceneProjects.tsx`
- Delete: `src/components/Three/SceneFinalCTA.tsx`
- **Do NOT delete** `src/components/Three/SceneCarousel.tsx` — still imported by `MiniApp.tsx` (sub-pages rework is a separate plan)
- **Do NOT delete** `src/components/Layout/ModernFooter.tsx` — still used by `src/components/Layout.tsx` which all sub-pages import
- **Do NOT delete** `src/components/Layout/Footer.tsx` — same reason
- **Do NOT delete** `src/components/Layout/Navbar.tsx` — same reason
- **Do NOT delete** `src/components/Layout.tsx` — same reason
All Layout/* files are deferred to the sub-pages rework plan.

- [ ] **Step 1: Verify none of the above are imported by any page other than Home (which has been rewritten)**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && grep -r "DynamicHero\|PresentationSection\|SkillsShowcase\|ServicesSection\|ProjectsCTA\|FinalCTA\|heroBannerSection\|ThreeBackground\|AnimatedCard\|GeometricShape\|FloatingParticles\|MiniAppPresentation\|SceneAbout\|SceneSkills\|SceneServices\|SceneProjects\|SceneFinalCTA\|ModernFooter\|from.*Layout/Footer\|from.*Layout/Navbar\|from.*components/Layout'" src/ --include="*.tsx" --include="*.jsx" --include="*.ts" -l 2>&1
```
Only proceed with deletion for files that appear in zero results (other than their own definition file).

- [ ] **Step 2: Delete the confirmed-unused files**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend
rm -f src/components/Home/DynamicHero.tsx
rm -f src/components/Home/PresentationSection.tsx
rm -f src/components/Home/SkillsShowcase.tsx
rm -f src/components/Home/ServicesSection.tsx
rm -f src/components/Home/ProjectsCTA.tsx
rm -f src/components/Home/FinalCTA.tsx
rm -f src/components/Home/heroBannerSection.tsx
rm -f src/components/Custom/ThreeBackground.tsx
rm -f src/components/Custom/AnimatedCard.tsx
rm -f src/components/Custom/GeometricShape.tsx
rm -f src/components/Custom/FloatingParticles.tsx
rm -f src/components/Custom/MiniAppPresentation.tsx
rm -f src/components/Three/SceneAbout.tsx
rm -f src/components/Three/SceneSkills.tsx
rm -f src/components/Three/SceneServices.tsx
rm -f src/components/Three/SceneProjects.tsx
rm -f src/components/Three/SceneFinalCTA.tsx
```

**Note:** Do NOT delete `Navbar.tsx` or `Layout.tsx` until sub-pages have been reworked — they are still imported by `Resume.tsx`, `Contact.tsx`, `Projects.tsx`, `MiniApp.tsx` etc.

- [ ] **Step 3: Copy CV PDFs to public/assets/ so they are served at /assets/ in production**

```bash
mkdir -p /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/public/assets
cp "/home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/src/assets/CV_TOM BARITEAU-PETER_EN.pdf" \
   "/home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/public/assets/CV_TOM BARITEAU-PETER_EN.pdf"
cp "/home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/src/assets/CV_TOM BARITEAU-PETER_FR.pdf" \
   "/home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/public/assets/CV_TOM BARITEAU-PETER_FR.pdf"
ls /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend/public/assets/
```
Expected: both PDF files listed.

- [ ] **Step 4: Verify build still passes after deletions**

```bash
cd /home/tomi-tom/Desktop/Tomfolio/tomfolio-frontend && npm run build 2>&1 | tail -10
```
Expected: build succeeds.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove old home components, copy CVs to public/assets"
```

---

## Done

The home page rework is complete. What you should see at `http://localhost:5173`:

1. Pure black void background
2. Gold `TBP.DEV` status bar (top, fixed)
3. Chapter navigation bar (bottom, 5 chapters, gold active indicator)
4. Gold corner HUD brackets
5. Three.js GearUniverse canvas — gold clockwork gears at varying depths, particle field, depth rings
6. **Chapter 01:** Tom Bariteau. Peter hero name with weight contrast, CTA buttons, data readout
7. **Chapter 02:** Grayscale photo, bio paragraphs, 4-stat grid
8. **Chapter 03:** 3-column skill grid with LevelDots, "Currently Exploring" tags
9. **Chapter 04:** Scrollable project cards
10. **Chapter 05:** Contact form + info + availability badge
11. Scrolling right (or pressing `→`) advances chapters AND flies the camera forward through the gear universe

**Sub-pages** (Projects, Resume, Contact, MiniApp, Login, Signup) are a separate follow-up plan: `docs/superpowers/plans/2026-03-14-portfolio-rework-subpages.md`

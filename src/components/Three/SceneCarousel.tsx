import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── App definitions (exported so MiniApp.tsx can read them) ──
export const CAROUSEL_APPS = [
  { title: 'Game of Life',   desc: "Conway's cellular automaton",  badge: 'Game',      color: '#34D399', image: '/mini-apps/GameOfLife.png',           link: '/lifegame'     },
  { title: 'Memory Game',    desc: 'Card-matching challenge',       badge: 'Game',      color: '#34D399', image: '/mini-apps/MemoryGame.png',           link: '/memory'       },
  { title: 'Weather App',    desc: 'Live weather worldwide',        badge: 'Utility',   color: '#FFB84D', image: '/mini-apps/WeatherApp.png',           link: '/weather'      },
  { title: 'Pomodoro Timer', desc: 'Focus time management',         badge: 'Utility',   color: '#FFB84D', image: '/mini-apps/PomodoroTimer.png',        link: '/pomodoro'     },
  { title: 'Task Breaker',   desc: 'Break tasks into steps',        badge: 'ADHD Tool', color: '#FF6B35', image: '/mini-apps/TaskBreaker.png',          link: '/task-breaker' },
  { title: 'Mood Tracker',   desc: 'Energy & mood insights',        badge: 'ADHD Tool', color: '#FF6B35', image: '/mini-apps/MoodAndEnergyTracker.png', link: '/mood-tracker' },
]

interface Props {
  onFocusChange: (index: number) => void
  onSelect:      (link: string)  => void
  goToRef:       React.MutableRefObject<((i: number) => void) | null>
}

// ── Scene constants ──
const N       = CAROUSEL_APPS.length
const RADIUS  = 9.0
const CARD_W  = 5.5
const CARD_H  = 3.5
const STEP    = (Math.PI * 2) / N   // radians between cards
const CW = 1100, CH = 700           // card canvas resolution

// ── Canvas helper: hex #rrggbb → 'rgba(r,g,b,a)' ──
function hexRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

// ── Draw a card canvas texture ──
function drawCardCanvas(
  app: typeof CAROUSEL_APPS[0],
  screenImg: HTMLImageElement | null,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = CW; canvas.height = CH
  const ctx = canvas.getContext('2d')!
  const imgH = 432

  // Clip to rounded rect
  const CR = 24
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(CR, 0)
  ctx.arcTo(CW, 0,  CW, CH, CR)
  ctx.arcTo(CW, CH, 0,  CH, CR)
  ctx.arcTo(0,  CH, 0,  0,  CR)
  ctx.arcTo(0,  0,  CW, 0,  CR)
  ctx.closePath()
  ctx.clip()

  // ── Background ──
  ctx.fillStyle = '#0A0A1A'
  ctx.fillRect(0, 0, CW, CH)

  // ── Image area (top portion) ──
  if (screenImg && screenImg.naturalWidth > 0) {
    // cover-fit crop
    const iAR = screenImg.naturalWidth / screenImg.naturalHeight
    const bAR = CW / imgH
    let sw, sh, sx, sy
    if (iAR > bAR) {
      sh = screenImg.naturalHeight; sw = sh * bAR
      sx = (screenImg.naturalWidth - sw) / 2; sy = 0
    } else {
      sw = screenImg.naturalWidth; sh = sw / bAR
      sx = 0; sy = (screenImg.naturalHeight - sh) / 2
    }
    ctx.drawImage(screenImg, sx, sy, sw, sh, 0, 0, CW, imgH)
  } else {
    // Stylised placeholder
    const pg = ctx.createLinearGradient(0, 0, CW, imgH)
    pg.addColorStop(0,   hexRgba(app.color, 0.28))
    pg.addColorStop(0.6, hexRgba(app.color, 0.08))
    pg.addColorStop(1,   '#07070F')
    ctx.fillStyle = pg
    ctx.fillRect(0, 0, CW, imgH)

    // Subtle grid
    ctx.strokeStyle = hexRgba(app.color, 0.10)
    ctx.lineWidth = 1
    for (let x = 0; x <= CW; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, imgH); ctx.stroke() }
    for (let y = 0; y <= imgH; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CW, y); ctx.stroke() }

    // Center initial glyph
    ctx.fillStyle = hexRgba(app.color, 0.12)
    ctx.beginPath(); ctx.arc(CW / 2, imgH / 2, 96, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = hexRgba(app.color, 0.85)
    ctx.font = 'bold 80px monospace'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(app.title[0].toUpperCase(), CW / 2, imgH / 2)
  }

  // Gradient fade from image into info area
  const imgFade = ctx.createLinearGradient(0, imgH - 130, 0, imgH)
  imgFade.addColorStop(0, 'rgba(10,10,26,0)')
  imgFade.addColorStop(1, 'rgba(10,10,26,1)')
  ctx.fillStyle = imgFade; ctx.fillRect(0, imgH - 130, CW, 130)

  // ── Category badge (top-left) ──
  ctx.font = 'bold 16px sans-serif'
  const badgeTxt = app.badge.toUpperCase()
  const bW = ctx.measureText(badgeTxt).width + 32
  const bH = 36, bX = 22, bY = 20, bR = 18
  ctx.fillStyle = hexRgba(app.color, 0.22)
  ctx.strokeStyle = hexRgba(app.color, 0.60)
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(bX + bR, bY)
  ctx.arcTo(bX + bW, bY,  bX + bW, bY + bH, bR)
  ctx.arcTo(bX + bW, bY + bH, bX, bY + bH, bR)
  ctx.arcTo(bX, bY + bH, bX, bY, bR)
  ctx.arcTo(bX, bY, bX + bW, bY, bR)
  ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = app.color
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText(badgeTxt, bX + 16, bY + bH / 2)

  // ── Info area ──
  ctx.fillStyle = '#0A0A1A'
  ctx.fillRect(0, imgH, CW, CH - imgH)

  // Separator line (gradient, color-coded)
  const lineGrad = ctx.createLinearGradient(0, 0, CW, 0)
  lineGrad.addColorStop(0,   'rgba(0,0,0,0)')
  lineGrad.addColorStop(0.15, hexRgba(app.color, 0.7))
  lineGrad.addColorStop(0.85, hexRgba(app.color, 0.7))
  lineGrad.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = lineGrad; ctx.fillRect(0, imgH, CW, 2)

  // Title
  ctx.fillStyle = '#EAE6FF'
  ctx.font = 'bold 54px sans-serif'
  ctx.textAlign = 'left'; ctx.textBaseline = 'top'
  ctx.fillText(app.title, 32, imgH + 22)

  // Description
  ctx.fillStyle = '#5B5780'
  ctx.font = '27px sans-serif'
  ctx.fillText(app.desc, 32, imgH + 96)

  // "Try it →" (top-right of info)
  ctx.fillStyle = app.color
  ctx.font = 'bold 26px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Try it  →', CW - 32, imgH + 22)

  // Outer border + glass sheen
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, CW - 2, CH - 2)
  const sheen = ctx.createLinearGradient(0, 0, CW * 0.5, CH * 0.3)
  sheen.addColorStop(0, 'rgba(255,255,255,0.055)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = sheen; ctx.fillRect(0, 0, CW, CH)

  ctx.restore()
  return new THREE.CanvasTexture(canvas)
}

// ── Radial glow texture for card halos ──
function makeHaloTex(color: string): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 512
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  g.addColorStop(0,    hexRgba(color, 0.50))
  g.addColorStop(0.30, hexRgba(color, 0.22))
  g.addColorStop(0.65, hexRgba(color, 0.06))
  g.addColorStop(1,    'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512)
  return new THREE.CanvasTexture(c)
}

export default function SceneCarousel({ onFocusChange, onSelect, goToRef }: Props) {
  const mountRef    = useRef<HTMLDivElement>(null)
  // Keep callbacks current without re-triggering the main effect
  const focusCbRef  = useRef(onFocusChange)
  const selectCbRef = useRef(onSelect)
  useEffect(() => { focusCbRef.current  = onFocusChange }, [onFocusChange])
  useEffect(() => { selectCbRef.current = onSelect      }, [onSelect])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth  || window.innerWidth
    const H = mount.clientHeight || window.innerHeight

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x07070F, 1)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ──
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
    camera.position.set(0, 1.5, 13)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    // ── Carousel state ──
    let currentAngle  = 0
    let targetAngle   = 0
    let focusedIndex  = 0
    let isDragging    = false
    let dragStartX    = 0
    let dragStartAngle= 0
    let mouseNX       = 0
    let mouseNY       = 0

    // ── GoTo (snap to index, shortest-path wrap) ──
    const goTo = (rawIndex: number) => {
      const idx = ((rawIndex % N) + N) % N
      // Find equivalent target angle closest to currentAngle
      let raw = -idx * STEP
      while (raw - currentAngle >  Math.PI) raw -= Math.PI * 2
      while (raw - currentAngle < -Math.PI) raw += Math.PI * 2
      targetAngle  = raw
      focusedIndex = idx
      focusCbRef.current(idx)
    }
    goToRef.current = goTo
    focusCbRef.current(0)   // announce initial

    // ── Card groups ──
    interface CardObj {
      outer:        THREE.Group
      inner:        THREE.Group
      cardMesh:     THREE.Mesh
      cardMat:      THREE.MeshBasicMaterial
      haloMesh:     THREE.Mesh
      haloMat:      THREE.MeshBasicMaterial
      curScale:     number
      tiltX:        number
      tiltY:        number
    }
    const cardTextures: THREE.CanvasTexture[] = []

    const cards: CardObj[] = CAROUSEL_APPS.map((app) => {
      // Card mesh
      const tex = drawCardCanvas(app, null)
      cardTextures.push(tex)
      const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H)
      const cardMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 1.0, depthWrite: true })
      toDispose.push(cardGeo, cardMat)
      const cardMesh = new THREE.Mesh(cardGeo, cardMat)

      // Halo (glow behind card)
      const hTex = makeHaloTex(app.color)
      toDispose.push(hTex)
      const hGeo = new THREE.PlaneGeometry(CARD_W * 2.2, CARD_H * 2.2)
      const hMat = new THREE.MeshBasicMaterial({ map: hTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(hGeo, hMat)
      const haloMesh = new THREE.Mesh(hGeo, hMat)
      haloMesh.position.z = -0.06

      const inner = new THREE.Group()
      inner.add(haloMesh, cardMesh)

      const outer = new THREE.Group()
      outer.add(inner)
      scene.add(outer)

      return { outer, inner, cardMesh, cardMat, haloMesh, haloMat: hMat, curScale: 1, tiltX: 0, tiltY: 0 }
    })

    // ── Load real images asynchronously ──
    CAROUSEL_APPS.forEach((app, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const newTex = drawCardCanvas(app, img)
        cardTextures[i].dispose()
        cardTextures[i]   = newTex
        cards[i].cardMat.map = newTex
        cards[i].cardMat.needsUpdate = true
      }
      img.src = app.image
    })

    // ── Orbit ring (shows circular path) ──
    const makeRing = (r: number, color: number, opacity: number) => {
      const pts: number[] = []
      for (let i = 0; i <= 128; i++) {
        const θ = (i / 128) * Math.PI * 2
        pts.push(Math.sin(θ) * r, -1.8, Math.cos(θ) * r)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(geo, mat)
      scene.add(new THREE.Line(geo, mat))
    }
    makeRing(RADIUS,        0xFF6B35, 0.09)
    makeRing(RADIUS * 0.91, 0xFFB84D, 0.04)

    // ── Ambient particles ──
    const glowTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,107,53,0.8)'); g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(glowTex)

    const PCOUNT = 55
    const pPos = new Float32Array(PCOUNT * 3)
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 30
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.06, map: glowTex, color: 0x8A85AA, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false })
    toDispose.push(pGeo, pMat)
    scene.add(new THREE.Points(pGeo, pMat))

    // ── Spotlight cone for front slot ──
    const spotPts: number[] = []
    const SPOT_SEGS = 32
    for (let i = 0; i <= SPOT_SEGS; i++) {
      const θ = (i / SPOT_SEGS) * Math.PI * 2
      const rx = Math.sin(θ) * CARD_W * 0.55
      const ry = Math.cos(θ) * CARD_H * 0.55
      spotPts.push(rx, ry, 0)
    }
    const spotGeo = new THREE.BufferGeometry()
    spotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spotPts), 3))
    const spotMat = new THREE.LineBasicMaterial({ color: 0xFF6B35, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false })
    toDispose.push(spotGeo, spotMat)
    const spotLine = new THREE.Line(spotGeo, spotMat)
    spotLine.position.set(0, 0, RADIUS + 0.1)   // always at front of circle
    scene.add(spotLine)

    // ── Raycaster ──
    const raycaster = new THREE.Raycaster()
    const pointer   = new THREE.Vector2()

    // ── Input ──
    const cvs = renderer.domElement

    const getAngle = (clientX: number) =>
      dragStartAngle + ((clientX - dragStartX) / W) * Math.PI * 2.2

    const snapNearest = () => {
      const nearestIdx = Math.round(-currentAngle / STEP)
      goTo(nearestIdx)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      dragStartX = e.clientX
      dragStartAngle = currentAngle
      mount.style.cursor = 'grabbing'
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect()
      mouseNX = (e.clientX - rect.left)  / rect.width  - 0.5
      mouseNY = (e.clientY - rect.top)   / rect.height - 0.5
      if (isDragging) targetAngle = getAngle(e.clientX)
    }

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return
      isDragging = false
      mount.style.cursor = 'grab'
      const dx = Math.abs(e.clientX - dragStartX)
      if (dx < 6) {
        // Treat as click — raycast
        const rect = cvs.getBoundingClientRect()
        pointer.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1
        pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObjects(cards.map(c => c.cardMesh))
        if (hits.length > 0) {
          const hi = cards.findIndex(c => c.cardMesh === hits[0].object)
          if (hi === focusedIndex) selectCbRef.current(CAROUSEL_APPS[hi].link)
          else goTo(hi)
        }
      } else {
        snapNearest()
      }
    }

    const onMouseLeave = () => {
      if (isDragging) { isDragging = false; mount.style.cursor = 'grab'; snapNearest() }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) goTo(focusedIndex + 1)
      else              goTo(focusedIndex - 1)
    }

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true
      dragStartX = e.touches[0].clientX
      dragStartAngle = currentAngle
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      targetAngle = getAngle(e.touches[0].clientX)
    }
    const onTouchEnd = () => { isDragging = false; snapNearest() }

    // Keyboard
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(focusedIndex + 1)
      else if (e.key === 'ArrowLeft') goTo(focusedIndex - 1)
    }

    cvs.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    cvs.addEventListener('mouseleave', onMouseLeave)
    cvs.addEventListener('wheel',      onWheel,      { passive: false })
    cvs.addEventListener('touchstart', onTouchStart, { passive: true  })
    cvs.addEventListener('touchmove',  onTouchMove,  { passive: false })
    cvs.addEventListener('touchend',   onTouchEnd)
    window.addEventListener('keydown', onKeyDown)

    // ── Animation ──
    let frameId = 0
    let time    = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.003

      // Lerp carousel angle (snap disabled while dragging)
      if (!isDragging) currentAngle += (targetAngle - currentAngle) * 0.07

      // Update each card
      cards.forEach((card, i) => {
        const angle   = i * STEP + currentAngle
        const x       = Math.sin(angle) * RADIUS
        const z       = Math.cos(angle) * RADIUS
        const cosA    = Math.cos(angle)           // -1 (back) → +1 (front)
        const t       = (cosA + 1) * 0.5          //  0       →  1

        // Position + face outward (cards look away from circle center, toward camera)
        card.outer.position.set(x, Math.sin(time * 0.7 + i * 1.0) * 0.07, z)
        card.outer.rotation.y = angle

        // Depth-driven scale
        const isFront   = i === focusedIndex
        const depthSc   = 0.42 + t * 0.58
        const focusBost = isFront ? 1.10 : 1.0
        const tgtSc     = depthSc * focusBost
        card.curScale  += (tgtSc - card.curScale) * 0.08
        card.outer.scale.setScalar(card.curScale)

        // Depth-driven opacity
        const tgtOp = isFront ? 1.0 : Math.max(0.10, 0.10 + t * 0.82)
        card.cardMat.opacity += (tgtOp - card.cardMat.opacity) * 0.08

        // Render order so front cards draw on top
        card.cardMesh.renderOrder = Math.round(cosA * 100)
        card.haloMesh.renderOrder = Math.round(cosA * 100) - 1

        // Halo glow on focused card only
        const tgtHalo = isFront ? 0.80 : 0
        card.haloMat.opacity += (tgtHalo - card.haloMat.opacity) * 0.08

        // Mouse tilt (focused card only)
        const tgtTiltX = isFront ? -mouseNY * 0.15 : 0
        const tgtTiltY = isFront ?  mouseNX * 0.22 : 0
        card.tiltX += (tgtTiltX - card.tiltX) * 0.08
        card.tiltY += (tgtTiltY - card.tiltY) * 0.08
        card.inner.rotation.x = card.tiltX
        card.inner.rotation.y = card.tiltY
      })

      // Spotlight ring orbits at front
      spotLine.rotation.y  += (0 - spotLine.rotation.y) * 0.03
      spotMat.opacity = 0.12 + Math.sin(time * 2.5) * 0.06

      // Camera gentle bob
      camera.position.y = 1.5 + Math.sin(time * 0.35) * 0.10
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!running) { running = true; tick() } }
      else { running = false; cancelAnimationFrame(frameId) }
    }, { threshold: 0.01 })
    observer.observe(mount)
    tick()

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      observer.disconnect()
      cvs.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      cvs.removeEventListener('mouseleave', onMouseLeave)
      cvs.removeEventListener('wheel',      onWheel)
      cvs.removeEventListener('touchstart', onTouchStart)
      cvs.removeEventListener('touchmove',  onTouchMove)
      cvs.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize',  onResize)
      toDispose.forEach(d => d.dispose())
      cardTextures.forEach(t => t.dispose())
      renderer.dispose()
      if (mount.contains(cvs)) mount.removeChild(cvs)
    }
  }, [goToRef])   // goToRef is a stable ref — effect runs once

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ zIndex: 0, cursor: 'grab' }}
    />
  )
}

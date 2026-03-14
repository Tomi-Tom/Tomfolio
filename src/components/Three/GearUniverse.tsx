// src/components/Three/GearUniverse.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useChapter, CHAPTER_Z_POSITIONS } from '../../context/ChapterContext'

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

type GearConfig = [number, number, number, number, number, number, number, number, number, 1 | -1]

const GEAR_CONFIGS: GearConfig[] = [
  [30,  15,  -80,  10, 7,   2,   16, 1.2, 0.10,  1],
  [-25, -10, -120,  7, 5,   1.5, 12, 0.9, 0.12, -1],
  [10,  -25, -150,  4, 2.8, 1.0, 10, 0.6, 0.10,  1],
  [20,  -20, -250,  8, 6,   1.8, 14, 1.0, 0.30,  1],
  [-30,  18, -300,  5, 3.5, 1.2, 10, 0.7, 0.35, -1],
  [15,   10, -280,  3, 2,   0.8,  8, 0.5, 0.38,  1],
  [40,   -5, -320,  6, 4.5, 1.5, 12, 0.8, 0.28, -1],
  [-15,  -8, -360,  4, 2.8, 0.9,  8, 0.6, 0.32,  1],
  [-15,  25, -380,  9, 6.5, 2.0, 14, 1.1, 0.45,  1],
  [35,  -15, -420,  4, 2.8, 1.0,  8, 0.6, 0.50, -1],
  [-40, -20, -460,  7, 5,   1.5, 12, 0.9, 0.48,  1],
  [10,   30, -490,  3.5, 2.4, 0.9, 8, 0.5, 0.45, -1],
  [-20,  10, -550,  8, 6,   2.0, 14, 1.0, 0.60,  1],
  [30,  -25, -600,  5, 3.5, 1.2, 10, 0.7, 0.65, -1],
  [-10, -30, -650, 12, 9,   3.0, 16, 1.5, 0.70,  1],
  [50,   20, -700,  3, 2,   0.7,  8, 0.5, 0.55, -1],
  [-35,  15, -780,  6, 4.2, 1.4, 12, 0.8, 0.50,  1],
  [25,  -18, -840,  4, 2.8, 1.0, 10, 0.6, 0.45, -1],
  [-20, -25, -900,  9, 6.5, 2.0, 14, 1.1, 0.55,  1],
  [40,   10, -960,  5, 3.5, 1.2, 10, 0.7, 0.48, -1],
  [-30,  20, -1020, 7, 5,   1.5, 12, 0.9, 0.42,  1],
  [15,  -30, -1080, 4, 2.8, 0.9,  8, 0.6, 0.38, -1],
  [-45,  -5, -1140, 10, 7,  2.0, 16, 1.2, 0.35,  1],
  [35,   25, -1200, 3, 2,   0.7,  8, 0.5, 0.30, -1],
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

function buildParticles(count: number): { points: THREE.Points; drifts: Float32Array } {
  const positions = new Float32Array(count * 3)
  const drifts = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 600
    positions[i * 3 + 1] = (Math.random() - 0.5) * 400
    positions[i * 3 + 2] = -Math.random() * 1300
    drifts[i * 3]        = (Math.random() - 0.5) * 0.04
    drifts[i * 3 + 1]    = (Math.random() - 0.5) * 0.04
    drifts[i * 3 + 2]    = 0
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

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

function buildCircuitTrace(from: THREE.Vector3, to: THREE.Vector3, opacity: number): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.LineDashedMaterial({
    color: 0xd4af37,
    opacity,
    transparent: true,
    dashSize: 0.4,
    gapSize: 0.5,
  })
  const mid = new THREE.Vector3(to.x, from.y, from.z)
  const lineGeo = new THREE.BufferGeometry().setFromPoints([from, mid, to])
  const line = new THREE.Line(lineGeo, mat)
  line.computeLineDistances()
  group.add(line)

  const dotGeo = new THREE.SphereGeometry(0.3, 6, 6)
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, opacity: Math.min(opacity * 1.5, 1), transparent: true })
  const d1 = new THREE.Mesh(dotGeo, dotMat); d1.position.copy(from)
  const d2 = new THREE.Mesh(dotGeo, dotMat); d2.position.copy(to)
  group.add(d1, d2)
  return group
}

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

export function GearUniverse() {
  const { chapterIndex, isMobile } = useChapter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetZRef = useRef(CHAPTER_Z_POSITIONS[0])

  useEffect(() => {
    targetZRef.current = CHAPTER_Z_POSITIONS[chapterIndex]
  }, [chapterIndex])

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

    let targetX = 0
    let targetY = 0
    let isVisible = true
    let frameId = 0

    const gearEntries = buildGears(isMobile)
    const depthRings = buildDepthRings()
    const particleCount = isMobile ? 500 : 1000
    const { points: particlePoints, drifts } = buildParticles(particleCount)

    scene.add(depthRings)
    scene.add(particlePoints)
    gearEntries.forEach(({ gear }) => scene.add(gear))

    if (!isMobile) {
      buildCircuitTraces(gearEntries).forEach(t => scene.add(t))
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 4
      targetY = -((e.clientY / window.innerHeight) - 0.5) * 4
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvas)

    const posAttr = particlePoints.geometry.attributes.position as THREE.BufferAttribute

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!isVisible) return

      camera.position.z += (targetZRef.current - camera.position.z) * 0.05
      camera.position.x += (targetX - camera.position.x) * 0.03
      camera.position.y += (targetY - camera.position.y) * 0.03

      gearEntries.forEach(({ gear, rotSpeed }) => {
        gear.rotation.z += rotSpeed
      })

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

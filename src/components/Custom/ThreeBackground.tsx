import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createGlowTexture(color: string): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2
  const g = ctx.createRadialGradient(half, half, 0, half, half, half)
  g.addColorStop(0, color.replace(')', ', 1)').replace('rgb', 'rgba'))
  g.addColorStop(0.25, color.replace(')', ', 0.7)').replace('rgb', 'rgba'))
  g.addColorStop(0.6, color.replace(')', ', 0.2)').replace('rgb', 'rgba'))
  g.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

interface Particle {
  x: number; y: number; z: number
  vx: number; vy: number
  homeX: number; homeY: number; homeZ: number
  r: number; g: number; b: number
  size: number
  phase: number
  isHub: boolean
}

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 1, 6000)
    camera.position.z = 1500  // far back — warp dive starts here

    const isMobile = window.innerWidth < 768

    // ── Particle config: wider z-spread for warp tunnel ──
    const COUNT     = isMobile ? 120 : 260
    const SPREAD_X  = isMobile ? 500 : 800
    const SPREAD_Y  = isMobile ? 350 : 550
    const SPREAD_Z  = isMobile ? 800 : 1400   // deep tunnel
    const HUB_COUNT = isMobile ? 6 : 14

    const PALETTE = [
      { r: 0.90, g: 0.87, b: 1.00 },   // lavender-white ×3
      { r: 0.90, g: 0.87, b: 1.00 },
      { r: 0.90, g: 0.87, b: 1.00 },
      { r: 1.00, g: 0.42, b: 0.21 },   // orange
      { r: 1.00, g: 0.72, b: 0.30 },   // amber
    ]

    const particles: Particle[] = []
    for (let i = 0; i < COUNT; i++) {
      const isHub = i < HUB_COUNT
      const col   = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      const x = (Math.random() - 0.5) * SPREAD_X
      const y = (Math.random() - 0.5) * SPREAD_Y
      const z = (Math.random() - 0.5) * SPREAD_Z
      particles.push({
        x, y, z,
        vx: 0, vy: 0,
        homeX: x, homeY: y, homeZ: z,
        r: col.r, g: col.g, b: col.b,
        size: isHub ? (Math.random() * 5 + 8) : (Math.random() * 2.5 + 2),
        phase: Math.random() * Math.PI * 2,
        isHub,
      })
    }

    const texWhite  = createGlowTexture('rgb(220, 214, 255)')
    const texOrange = createGlowTexture('rgb(255, 107, 53)')
    const texAmber  = createGlowTexture('rgb(255, 184, 77)')

    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)

    particles.forEach((p, i) => {
      positions[i * 3]     = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
      colors[i * 3]     = p.r
      colors[i * 3 + 1] = p.g
      colors[i * 3 + 2] = p.b
      sizes[i] = p.size
    })

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    pointsGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

    // ── Custom shader: per-particle size + warp intensity glow ──
    const pointsMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texWhite },
        uWarp:    { value: 0.0 },   // 0–1 scroll-velocity-driven warp
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        uniform float uWarp;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          float depth = max(-mvPos.z, 10.0);
          // Warp: boost particles that are close to camera
          float warpBoost = 1.0 + uWarp * (1500.0 / depth) * 0.4;
          gl_PointSize = size * (900.0 / depth) * warpBoost;
          vBright = 0.7 + uWarp * (1500.0 / depth) * 0.3;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor * min(vBright, 2.0), 1.0) * tex;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat)
    scene.add(pointsMesh)

    // ── Connection lines ──
    const maxPairs  = COUNT * (COUNT - 1) / 2
    const linePosArr = new Float32Array(maxPairs * 6)
    const lineColArr = new Float32Array(maxPairs * 6)

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3))
    linesGeo.setAttribute('color',    new THREE.BufferAttribute(lineColArr, 3))

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    scene.add(new THREE.LineSegments(linesGeo, linesMat))

    const MAX_DIST = isMobile ? 120 : 150

    // ── Mouse & scroll state ──
    let mouseX = 0, mouseY = 0
    let targetMouseX = 0, targetMouseY = 0
    let prevScrollY    = window.scrollY
    let scrollVelocity = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      targetMouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * SPREAD_X
      targetMouseY = -((e.clientY - rect.top)  / rect.height - 0.5) * SPREAD_Y
    }
    window.addEventListener('mousemove', onMouseMove)

    let camTargetX = 0, camTargetY = 0
    let frameId = 0
    let time = 0
    let running = true

    const SPRING  = 0.018
    const DAMPING = 0.88
    const DRIFT   = 0.025
    const MOUSE_R = 200
    const MOUSE_F = 2.5

    const animate = () => {
      if (!running) return
      frameId = requestAnimationFrame(animate)
      time += 0.008

      // ── Scroll-driven warp dive ──
      const heroHeight  = window.innerHeight * 0.9
      const scrollFrac  = Math.min(window.scrollY / heroHeight, 1.0)
      const eased       = scrollFrac * scrollFrac * (3 - 2 * scrollFrac) // smoothstep

      // Measure scroll velocity for warp glow
      scrollVelocity = Math.abs(window.scrollY - prevScrollY) * 0.012
      prevScrollY    = window.scrollY
      pointsMat.uniforms.uWarp.value = Math.min(scrollVelocity, 1.0) * 0.8

      // Camera dives 2100 units through the particle tunnel
      camera.position.z = 1500 - eased * 2100   // 1500 → -600
      camera.fov = 65 + eased * 55               // 65° → 120° — fisheye at depth
      camera.updateProjectionMatrix()

      // Mouse camera sway
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06
      camTargetX = mouseX * 0.025
      camTargetY = mouseY * 0.025
      camera.position.x += (camTargetX - camera.position.x) * 0.025
      camera.position.y += (camTargetY - camera.position.y) * 0.025
      camera.lookAt(scene.position)

      // ── Particle physics ──
      particles.forEach((p, i) => {
        p.vx += Math.sin(time * 0.7 + p.phase)       * DRIFT
        p.vy += Math.cos(time * 0.5 + p.phase * 1.3) * DRIFT
        p.vx += (p.homeX - p.x) * SPRING
        p.vy += (p.homeY - p.y) * SPRING

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < MOUSE_R && d > 0) {
          const strength = ((MOUSE_R - d) / MOUSE_R) * MOUSE_F
          p.vx += (dx / d) * strength * 0.4
          p.vy += (dy / d) * strength * 0.4
        }

        p.vx *= DAMPING
        p.vy *= DAMPING
        p.x  += p.vx
        p.y  += p.vy

        const baseSize = p.size
        sizes[i] = p.isHub
          ? baseSize + Math.sin(time * 2 + p.phase) * 2.5
          : baseSize

        positions[i * 3]     = p.x
        positions[i * 3 + 1] = p.y
        positions[i * 3 + 2] = p.z
      })

      pointsGeo.attributes.position.needsUpdate = true
      pointsGeo.attributes.size.needsUpdate     = true

      // ── Connection lines ──
      let idx = 0
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dz = particles[i].z - particles[j].z
          const d  = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (d < MAX_DIST) {
            const a  = 1 - d / MAX_DIST
            const cr = (particles[i].r + particles[j].r) * 0.5
            const cg = (particles[i].g + particles[j].g) * 0.5
            const cb = (particles[i].b + particles[j].b) * 0.5
            linePosArr[idx * 6]     = particles[i].x
            linePosArr[idx * 6 + 1] = particles[i].y
            linePosArr[idx * 6 + 2] = particles[i].z
            linePosArr[idx * 6 + 3] = particles[j].x
            linePosArr[idx * 6 + 4] = particles[j].y
            linePosArr[idx * 6 + 5] = particles[j].z
            lineColArr[idx * 6]     = cr * a
            lineColArr[idx * 6 + 1] = cg * a
            lineColArr[idx * 6 + 2] = cb * a
            lineColArr[idx * 6 + 3] = cr * a
            lineColArr[idx * 6 + 4] = cg * a
            lineColArr[idx * 6 + 5] = cb * a
            idx++
          }
        }
      }
      linesGeo.setDrawRange(0, idx * 2)
      linesGeo.attributes.position.needsUpdate = true
      linesGeo.attributes.color.needsUpdate    = true

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running) { running = true; animate() }
      } else {
        running = false
        cancelAnimationFrame(frameId)
      }
    }, { threshold: 0.01 })
    observer.observe(mount)
    animate()

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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      pointsGeo.dispose(); pointsMat.dispose()
      linesGeo.dispose();  linesMat.dispose()
      texWhite.dispose();  texOrange.dispose(); texAmber.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
  )
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Black hole / accretion disk — infalling particles, event horizon ring, singularity glow ──
export default function SceneFinalCTA() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 600

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500)
    camera.position.set(0, 6, 14)
    camera.lookAt(0, 0, 0)

    // ── Accretion disk particles ──
    const COUNT = isMobile ? 160 : 380
    const EVENT_HORIZON = 2.0      // radius where particles glow brightest
    const OUTER_EDGE    = 9.0      // particles spawn at this radius
    const DISK_THICKNESS = 0.6     // z spread

    interface DiskParticle {
      angle: number
      radius: number
      baseAngle: number
      z: number
      speed: number      // angular speed (Keplerian: faster at small r)
      infall: number     // drift inward per frame
      r: number; g: number; b: number  // color
    }

    const diskParticles: DiskParticle[] = []
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const radius     = EVENT_HORIZON + Math.random() * (OUTER_EDGE - EVENT_HORIZON)
      const angle      = Math.random() * Math.PI * 2
      const t          = (radius - EVENT_HORIZON) / (OUTER_EDGE - EVENT_HORIZON) // 0=inner, 1=outer

      // Color: white-hot near event horizon → orange → dim red at edge
      const r = 1.0
      const g = t < 0.3 ? 1.0 : (1.0 - (t - 0.3) * 1.2)
      const b = t < 0.15 ? 0.8 : 0.0
      colors[i * 3]     = r
      colors[i * 3 + 1] = Math.max(0, g)
      colors[i * 3 + 2] = Math.max(0, b)

      diskParticles.push({
        angle,
        radius,
        baseAngle: angle,
        z: (Math.random() - 0.5) * DISK_THICKNESS,
        speed: 0.008 + 0.04 / (radius * 0.5),  // Keplerian orbit
        infall: 0.0005 + Math.random() * 0.0008,
        r, g: Math.max(0, g), b: Math.max(0, b),
      })
    }

    // Glow texture — white core → orange halo
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0,   'rgba(255,255,255,1)')
      g.addColorStop(0.2, 'rgba(255,140,60,0.9)')
      g.addColorStop(0.6, 'rgba(255,80,20,0.3)')
      g.addColorStop(1,   'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    })()

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    const pointsMat = new THREE.PointsMaterial({
      size: isMobile ? 0.11 : 0.14,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    scene.add(new THREE.Points(pointsGeo, pointsMat))

    // ── Event horizon ring — ultra-bright edge ──
    const RING_SEGS = 160
    const horizonPoints: number[] = []
    for (let i = 0; i <= RING_SEGS; i++) {
      const θ = (i / RING_SEGS) * Math.PI * 2
      horizonPoints.push(EVENT_HORIZON * Math.cos(θ), 0, EVENT_HORIZON * Math.sin(θ))
    }
    const horizonGeo = new THREE.BufferGeometry()
    horizonGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(horizonPoints), 3))
    const horizonMat = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const horizonRing = new THREE.Line(horizonGeo, horizonMat)
    scene.add(horizonRing)

    // Second slightly larger ring — orange glow
    const ring2Points: number[] = []
    for (let i = 0; i <= RING_SEGS; i++) {
      const θ = (i / RING_SEGS) * Math.PI * 2
      ring2Points.push((EVENT_HORIZON + 0.35) * Math.cos(θ), 0, (EVENT_HORIZON + 0.35) * Math.sin(θ))
    }
    const ring2Geo = new THREE.BufferGeometry()
    ring2Geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ring2Points), 3))
    const ring2Mat = new THREE.LineBasicMaterial({ color: 0xFF6B35, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
    scene.add(new THREE.Line(ring2Geo, ring2Mat))

    // ── Singularity core glow ──
    const coreGeo  = new THREE.SphereGeometry(0.25, 16, 16)
    const coreMat  = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.9 })
    const core     = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    const halo1Geo = new THREE.SphereGeometry(0.7, 16, 16)
    const halo1Mat = new THREE.MeshBasicMaterial({ color: 0xFF6B35, transparent: true, opacity: 0.25, side: THREE.BackSide })
    scene.add(new THREE.Mesh(halo1Geo, halo1Mat))

    const halo2Geo = new THREE.SphereGeometry(1.5, 16, 16)
    const halo2Mat = new THREE.MeshBasicMaterial({ color: 0xFF8C35, transparent: true, opacity: 0.07, side: THREE.BackSide })
    scene.add(new THREE.Mesh(halo2Geo, halo2Mat))

    // ── Relativistic jets (vertical beams) ──
    const jetPoints = (dir: 1 | -1) => {
      const pts: number[] = []
      for (let i = 0; i <= 20; i++) {
        const y = dir * i * 0.35
        const r = Math.max(0, 0.08 - i * 0.003)
        pts.push(r * Math.cos(i * 0.5), y, r * Math.sin(i * 0.5))
      }
      return pts
    }
    const jetGeo1 = new THREE.BufferGeometry()
    jetGeo1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(jetPoints(1)), 3))
    const jetGeo2 = new THREE.BufferGeometry()
    jetGeo2.setAttribute('position', new THREE.BufferAttribute(new Float32Array(jetPoints(-1)), 3))
    const jetMat = new THREE.LineBasicMaterial({ color: 0xFFFFAA, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    scene.add(new THREE.Line(jetGeo1, jetMat))
    scene.add(new THREE.Line(jetGeo2, jetMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.004

      // Update accretion disk
      diskParticles.forEach((p, i) => {
        p.angle += p.speed
        // Infall: particle drifts inward
        p.radius -= p.infall
        // When particle crosses event horizon, reset to outer edge
        if (p.radius < EVENT_HORIZON * 0.4) {
          p.radius    = OUTER_EDGE * (0.7 + Math.random() * 0.3)
          p.angle     = Math.random() * Math.PI * 2
          p.infall    = 0.0005 + Math.random() * 0.0008
        }

        // Slight vertical oscillation decreases near center (disk flattening)
        const zScale = p.radius / OUTER_EDGE
        positions[i * 3]     = p.radius * Math.cos(p.angle)
        positions[i * 3 + 1] = p.z * zScale * 2
        positions[i * 3 + 2] = p.radius * Math.sin(p.angle)

        // Color brightens as particle nears event horizon
        const heat = Math.max(0, 1 - (p.radius - EVENT_HORIZON) / (OUTER_EDGE - EVENT_HORIZON))
        colors[i * 3 + 1] = p.g + heat * 0.3
      })
      pointsGeo.attributes.position.needsUpdate = true
      pointsGeo.attributes.color.needsUpdate    = true

      // Pulse event horizon ring
      horizonMat.opacity = 0.35 + Math.sin(time * 2.8) * 0.12
      ring2Mat.opacity   = 0.20 + Math.sin(time * 2.2 + 0.5) * 0.08

      // Pulse singularity
      coreMat.opacity = 0.75 + Math.sin(time * 5) * 0.2
      halo1Mat.opacity = 0.20 + Math.sin(time * 3) * 0.07

      // Slow disk rotation + camera bob
      scene.rotation.y = time * 0.04
      camera.position.x = Math.sin(time * 0.07) * 2
      camera.position.y = 6 + Math.sin(time * 0.05) * 1
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!running) { running = true; tick() }
      } else {
        running = false
        cancelAnimationFrame(frameId)
      }
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
      window.removeEventListener('resize', onResize)
      pointsGeo.dispose(); pointsMat.dispose()
      horizonGeo.dispose(); horizonMat.dispose()
      ring2Geo.dispose(); ring2Mat.dispose()
      coreGeo.dispose(); coreMat.dispose()
      halo1Geo.dispose(); halo1Mat.dispose()
      halo2Geo.dispose(); halo2Mat.dispose()
      jetGeo1.dispose(); jetGeo2.dispose(); jetMat.dispose()
      glowTex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

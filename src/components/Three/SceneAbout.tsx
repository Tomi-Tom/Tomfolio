import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── DNA double helix with mouse-driven rotation & glowing data pulses ──
export default function SceneAbout() {
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
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.set(isMobile ? 5 : 7, 0, 10)
    camera.lookAt(0, 0, 0)

    const group = new THREE.Group()
    scene.add(group)

    // ── Build helix geometry ──
    const N      = isMobile ? 70 : 120
    const R      = 1.5
    const TURNS  = 3.5
    const HEIGHT = 9

    const pos1: number[] = [], pos2: number[] = []
    const col1: number[] = [], col2: number[] = []
    const rungPos: number[] = []

    for (let i = 0; i < N; i++) {
      const t = (i / (N - 1)) * Math.PI * 2 * TURNS
      const y = (i / (N - 1)) * HEIGHT - HEIGHT / 2
      pos1.push(R * Math.cos(t), y, R * Math.sin(t))
      col1.push(1.0, 0.42, 0.21)
      pos2.push(R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI))
      col2.push(1.0, 0.72, 0.30)
      if (i % 7 === 0) {
        rungPos.push(
          R * Math.cos(t), y, R * Math.sin(t),
          R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI),
        )
      }
    }

    const makeStrand = (pos: number[], col: number[]) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3))
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(col), 3))
      const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
      return { mesh: new THREE.Line(geo, mat), geo, mat }
    }

    const s1 = makeStrand(pos1, col1)
    const s2 = makeStrand(pos2, col2)
    group.add(s1.mesh, s2.mesh)

    const rungGeo = new THREE.BufferGeometry()
    rungGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rungPos), 3))
    const rungMat = new THREE.LineBasicMaterial({ color: 0xFFCC70, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false })
    const rungMesh = new THREE.LineSegments(rungGeo, rungMat)
    group.add(rungMesh)

    // Node sprite texture
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,107,53,1)')
      g.addColorStop(0.5, 'rgba(255,107,53,0.3)')
      g.addColorStop(1, 'rgba(255,107,53,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()

    // Static helix nodes
    const makeNodes = (pos: number[], color: number) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3))
      const mat = new THREE.PointsMaterial({ size: 0.15, map: glowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      return { mesh: new THREE.Points(geo, mat), geo, mat }
    }
    const n1 = makeNodes(pos1, 0xFF6B35)
    const n2 = makeNodes(pos2, 0xFFB84D)
    group.add(n1.mesh, n2.mesh)

    // ── Data pulse system ──
    // Each pulse is a bright point traveling from one end to the other
    interface Pulse {
      t: number     // 0..1 along helix
      speed: number
      strand: 0 | 1 // which strand
      direction: 1 | -1
    }
    const pulseTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.2, 'rgba(255,107,53,0.9)')
      g.addColorStop(0.5, 'rgba(255,107,53,0.4)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    })()

    const PULSE_COUNT = isMobile ? 2 : 4
    const pulses: Pulse[] = Array.from({ length: PULSE_COUNT }, (_, i) => ({
      t: i / PULSE_COUNT,
      speed: 0.0055 + Math.random() * 0.003,
      strand: (i % 2) as 0 | 1,
      direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
    }))

    // One Points object per pulse (single point = bright dot on helix)
    const pulseMeshes = pulses.map(() => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3))
      const mat = new THREE.PointsMaterial({
        size: isMobile ? 0.5 : 0.65,
        map: pulseTex,
        color: 0xFFFFFF,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const mesh = new THREE.Points(geo, mat)
      group.add(mesh)
      return { mesh, geo, mat }
    })

    // ── Mouse-driven rotation ──
    let targetRotY = 0
    let targetRotX = 0
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top)  / rect.height - 0.5
      targetRotY = nx * 1.4
      targetRotX = -ny * 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId = 0
    let time = 0
    let running = true
    let baseRotY = 0

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.004
      baseRotY += 0.0018

      // Smooth mouse-driven rotation
      const finalRotY = baseRotY + targetRotY
      group.rotation.y += (finalRotY - group.rotation.y) * 0.04
      group.rotation.x += (targetRotX * 0.25 - group.rotation.x) * 0.04
      group.rotation.z = Math.sin(time * 0.12) * 0.04

      // Camera gentle float
      camera.position.x = (isMobile ? 5 : 7) + Math.sin(time * 0.09) * 0.6
      camera.position.y = Math.sin(time * 0.07) * 0.7
      camera.lookAt(0, 0, 0)

      // ── Update data pulses ──
      pulses.forEach((pulse, pi) => {
        pulse.t += pulse.speed * pulse.direction
        if (pulse.t > 1.02) pulse.t = -0.02
        if (pulse.t < -0.02) pulse.t = 1.02

        const t01    = Math.max(0, Math.min(1, pulse.t))
        const i      = Math.floor(t01 * (N - 1))
        const srcPos = pulse.strand === 0 ? pos1 : pos2
        const px     = srcPos[i * 3]
        const py     = srcPos[i * 3 + 1]
        const pz     = srcPos[i * 3 + 2]
        const posArr = pulseMeshes[pi].geo.attributes.position.array as Float32Array
        posArr[0] = px; posArr[1] = py; posArr[2] = pz
        pulseMeshes[pi].geo.attributes.position.needsUpdate = true

        // Fade out at edges
        const distFromEdge = Math.min(pulse.t, 1 - pulse.t) * 2
        pulseMeshes[pi].mat.opacity = Math.max(0, Math.min(1, distFromEdge))
      })

      // Rung flash near pulse positions
      rungMat.opacity = 0.10 + Math.sin(time * 3.5) * 0.04

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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      s1.geo.dispose(); s1.mat.dispose()
      s2.geo.dispose(); s2.mat.dispose()
      rungGeo.dispose(); rungMat.dispose()
      n1.geo.dispose(); n1.mat.dispose()
      n2.geo.dispose(); n2.mat.dispose()
      pulseMeshes.forEach(({ geo, mat }) => { geo.dispose(); mat.dispose() })
      glowTex.dispose(); pulseTex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

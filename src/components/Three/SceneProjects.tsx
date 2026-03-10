import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Three holographic floating frames — mouse-driven tilt + scanline sweep ──
export default function SceneProjects() {
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
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 300)
    camera.position.set(0, 0, 15)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    const makeFrame = (w: number, h: number) => {
      const plane = new THREE.PlaneGeometry(w, h)
      const edges = new THREE.EdgesGeometry(plane)
      plane.dispose()
      toDispose.push(edges)
      return edges
    }

    // ── Frame configuration ──
    const frameDefs = [
      { w: 4.8, h: 3.0, pos: [-5.8, 0.3, 0.5],  baseRotY:  0.30, color: 0xFF6B35, opacity: 0.55, floatPhase: 0 },
      { w: 5.2, h: 3.2, pos: [0,    0,   -1.5],  baseRotY:  0.0,  color: 0xFFB84D, opacity: 0.65, floatPhase: 2.1 },
      { w: 4.8, h: 3.0, pos: [5.8,  0.3, 0.5],   baseRotY: -0.30, color: 0xFF6B35, opacity: 0.55, floatPhase: 4.2 },
    ]

    interface Frame {
      outer: THREE.LineSegments
      inner: THREE.LineSegments
      scanGroup: THREE.Group
      scanLine: THREE.Line
      basePos: THREE.Vector3
      baseRotY: number
      currentRotY: number
      currentRotX: number
      floatPhase: number
      outerMat: THREE.LineBasicMaterial
    }

    const frames: Frame[] = frameDefs.map(cfg => {
      const outerGeo = makeFrame(cfg.w, cfg.h)
      const outerMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(outerMat)
      const outer = new THREE.LineSegments(outerGeo, outerMat)

      const innerGeo = makeFrame(cfg.w * 0.9, cfg.h * 0.9)
      const innerMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity * 0.4, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(innerGeo, innerMat)
      const inner = new THREE.LineSegments(innerGeo, innerMat)

      // Scanline (thin horizontal bar moving vertically)
      const scanGeo = new THREE.BufferGeometry()
      const scanY   = cfg.h / 2
      scanGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        -cfg.w * 0.45, -scanY, 0,
         cfg.w * 0.45, -scanY, 0,
      ]), 3))
      const scanMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(scanGeo, scanMat)
      const scanLine = new THREE.Line(scanGeo, scanMat)

      const scanGroup = new THREE.Group()
      scanGroup.add(outer, inner, scanLine)
      scanGroup.position.set(...(cfg.pos as [number, number, number]))
      scanGroup.rotation.y = cfg.baseRotY
      scene.add(scanGroup)

      return {
        outer, inner, scanLine, scanGroup,
        basePos: new THREE.Vector3(...(cfg.pos as [number, number, number])),
        baseRotY: cfg.baseRotY,
        currentRotY: cfg.baseRotY,
        currentRotX: 0,
        floatPhase: cfg.floatPhase,
        outerMat,
      }
    })

    // Corner glow dots
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,107,53,1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(glowTex)

    frameDefs.forEach(cfg => {
      const corners = new Float32Array([
        -cfg.w / 2,  cfg.h / 2, 0,
         cfg.w / 2,  cfg.h / 2, 0,
        -cfg.w / 2, -cfg.h / 2, 0,
         cfg.w / 2, -cfg.h / 2, 0,
      ])
      const cGeo = new THREE.BufferGeometry()
      cGeo.setAttribute('position', new THREE.BufferAttribute(corners, 3))
      const cMat = new THREE.PointsMaterial({ size: 0.22, map: glowTex, color: cfg.color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(cGeo, cMat)
      const pts = new THREE.Points(cGeo, cMat)
      pts.position.set(...(cfg.pos as [number, number, number]))
      pts.rotation.y = cfg.baseRotY
      scene.add(pts)
    })

    // Background particles
    if (!isMobile) {
      const DRIFT = 50
      const dPos = new Float32Array(DRIFT * 3)
      for (let i = 0; i < DRIFT; i++) {
        dPos[i * 3]     = (Math.random() - 0.5) * 24
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 14
        dPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3
      }
      const dGeo = new THREE.BufferGeometry()
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3))
      const dMat = new THREE.PointsMaterial({ size: 0.05, map: glowTex, color: 0x4A4668, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(dGeo, dMat)
      scene.add(new THREE.Points(dGeo, dMat))
    }

    // ── Mouse tracking ──
    let mouseNX = 0, mouseNY = 0
    let targetNX = 0, targetNY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      targetNX = (e.clientX - rect.left) / rect.width  - 0.5
      targetNY = (e.clientY - rect.top)  / rect.height - 0.5
    }
    // Listen on window so it works even when section content catches events
    window.addEventListener('mousemove', onMouseMove)

    let frameId = 0
    let time = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.005

      // Smooth mouse
      mouseNX += (targetNX - mouseNX) * 0.06
      mouseNY += (targetNY - mouseNY) * 0.06

      frames.forEach(({ scanGroup, scanLine, outerMat, basePos, baseRotY, floatPhase }, fi) => {
        // Float
        const floatY = basePos.y + Math.sin(time * 0.4 + floatPhase) * 0.2
        scanGroup.position.y = floatY

        // Mouse-driven tilt (each frame gets slightly different parallax)
        const parallaxFactor = 1 + fi * 0.15
        const targetRotY = baseRotY + mouseNX * 0.4 * parallaxFactor
        const targetRotX = -mouseNY * 0.25 * parallaxFactor
        scanGroup.rotation.y += (targetRotY - scanGroup.rotation.y) * 0.06
        scanGroup.rotation.x += (targetRotX - scanGroup.rotation.x) * 0.06

        // Scanline sweep — moves from bottom to top
        const scanProgress = ((time * 0.3 + floatPhase * 0.2) % 1)
        const frameDef = frameDefs[fi]
        const scanY = -frameDef.h / 2 + scanProgress * frameDef.h
        const posArr = scanLine.geometry.attributes.position.array as Float32Array
        posArr[1] = scanY; posArr[4] = scanY
        scanLine.geometry.attributes.position.needsUpdate = true
        // Fade at edges
        const distFromEdge = Math.min(scanProgress, 1 - scanProgress) * 3
        ;(scanLine.material as THREE.LineBasicMaterial).opacity = Math.min(0.8, distFromEdge)

        // Pulse outer frame opacity
        outerMat.opacity = frameDef.opacity * (0.85 + Math.sin(time * 1.5 + floatPhase) * 0.12)
      })

      camera.position.x = mouseNX * 1.5
      camera.position.y = -mouseNY * 0.8
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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      toDispose.forEach(d => d.dispose())
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

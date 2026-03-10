import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Cosmic starfield + floating project screen frames — Projects page backdrop ──
export default function SceneProjectsHero() {
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
    const camera = new THREE.PerspectiveCamera(65, W / H, 1, 3000)
    camera.position.z = 800

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    // ── Starfield (deep background) ──
    const STARS = isMobile ? 150 : 350
    const starPos = new Float32Array(STARS * 3)
    const starCol = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 2400
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1600
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 200
      // Mostly white/lavender, some orange
      if (Math.random() < 0.15) {
        starCol[i * 3]     = 1.0; starCol[i * 3 + 1] = 0.55; starCol[i * 3 + 2] = 0.2
      } else {
        const v = 0.6 + Math.random() * 0.4
        starCol[i * 3]     = v * 0.9; starCol[i * 3 + 1] = v * 0.88; starCol[i * 3 + 2] = v
      }
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3))

    const starTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.4, 'rgba(200,196,255,0.4)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(starTex)

    const starMat = new THREE.PointsMaterial({
      size: 2.8,
      map: starTex,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    toDispose.push(starGeo, starMat)
    scene.add(new THREE.Points(starGeo, starMat))

    // ── Floating project screen frames (3) ──
    const screenDefs = [
      { w: 180, h: 110, pos: [-280, 60,  -300], rotY:  0.25, color: 0xFF6B35 },
      { w: 200, h: 120, pos: [0,    20,  -500], rotY:  0.00, color: 0xFFB84D },
      { w: 180, h: 110, pos: [280,  60,  -300], rotY: -0.25, color: 0xFF6B35 },
    ]

    const frameTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,107,53,1)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(frameTex)

    const screenMeshes: { group: THREE.Group; scanLine: THREE.Line; baseY: number; floatPhase: number }[] = []

    screenDefs.forEach((sd, si) => {
      const group = new THREE.Group()
      group.position.set(...(sd.pos as [number, number, number]))
      group.rotation.y = sd.rotY

      // Outer frame
      const plane = new THREE.PlaneGeometry(sd.w, sd.h)
      const edges = new THREE.EdgesGeometry(plane)
      plane.dispose()
      const edgeMat = new THREE.LineBasicMaterial({ color: sd.color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(edges, edgeMat)
      group.add(new THREE.LineSegments(edges, edgeMat))

      // Inner frame
      const innerPlane = new THREE.PlaneGeometry(sd.w * 0.88, sd.h * 0.88)
      const innerEdges = new THREE.EdgesGeometry(innerPlane)
      innerPlane.dispose()
      const innerMat = new THREE.LineBasicMaterial({ color: sd.color, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(innerEdges, innerMat)
      group.add(new THREE.LineSegments(innerEdges, innerMat))

      // Scanline
      const scanGeo = new THREE.BufferGeometry()
      scanGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        -sd.w * 0.44, -sd.h / 2, 0,
         sd.w * 0.44, -sd.h / 2, 0,
      ]), 3))
      const scanMat = new THREE.LineBasicMaterial({ color: sd.color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(scanGeo, scanMat)
      const scanLine = new THREE.Line(scanGeo, scanMat)
      group.add(scanLine)

      // Corner dots
      const corners = new Float32Array([
        -sd.w / 2,  sd.h / 2, 0,
         sd.w / 2,  sd.h / 2, 0,
        -sd.w / 2, -sd.h / 2, 0,
         sd.w / 2, -sd.h / 2, 0,
      ])
      const cGeo = new THREE.BufferGeometry()
      cGeo.setAttribute('position', new THREE.BufferAttribute(corners, 3))
      const cMat = new THREE.PointsMaterial({ size: 8, map: frameTex, color: sd.color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      toDispose.push(cGeo, cMat)
      group.add(new THREE.Points(cGeo, cMat))

      scene.add(group)
      screenMeshes.push({ group, scanLine, baseY: sd.pos[1], floatPhase: si * 2.1 })
    })

    // ── Nebula glow (large blurred sphere) ──
    const nebulaGeo = new THREE.SphereGeometry(400, 8, 8)
    const nebulaMat = new THREE.MeshBasicMaterial({ color: 0xFF6B35, transparent: true, opacity: 0.018, side: THREE.BackSide })
    toDispose.push(nebulaGeo, nebulaMat)
    scene.add(new THREE.Mesh(nebulaGeo, nebulaMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true
    let mouseNX = 0, mouseNY = 0, targetNX = 0, targetNY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetNX = (e.clientX / window.innerWidth - 0.5)
      targetNY = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMouseMove)

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.003

      mouseNX += (targetNX - mouseNX) * 0.05
      mouseNY += (targetNY - mouseNY) * 0.05

      // Gentle camera drift + mouse parallax
      camera.position.x = mouseNX * 40
      camera.position.y = -mouseNY * 25 + 10
      camera.lookAt(0, 0, -200)

      // Float + scan screens
      screenMeshes.forEach(({ group, scanLine, baseY, floatPhase }, si) => {
        group.position.y = baseY + Math.sin(time * 0.35 + floatPhase) * 15
        group.rotation.y = screenDefs[si].rotY + mouseNX * 0.12

        const scanProgress = ((time * 0.25 + floatPhase * 0.15) % 1)
        const h = screenDefs[si].h
        const scanY = -h / 2 + scanProgress * h
        const posArr = scanLine.geometry.attributes.position.array as Float32Array
        posArr[1] = scanY; posArr[4] = scanY
        scanLine.geometry.attributes.position.needsUpdate = true
        const distFromEdge = Math.min(scanProgress, 1 - scanProgress) * 3
        ;(scanLine.material as THREE.LineBasicMaterial).opacity = Math.min(0.7, distFromEdge)
      })

      // Twinkle stars (slightly modulate opacity)
      starMat.opacity = 0.85 + Math.sin(time * 0.8) * 0.1

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

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Wireframe polyhedra constellation — Services section background
export default function SceneServices() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 600
    const isMobile = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500)
    camera.position.set(0, 0, 18)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material)[] = []

    const wireframeMat = (color: number, opacity: number) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(mat)
      return mat
    }

    // ── Six floating polyhedra (one per service card) ──
    const polyConfigs = [
      { geo: new THREE.IcosahedronGeometry(1.8, 1), pos: [-7, 3, -2],   rotSpeed: [0.005, 0.008, 0.003], color: 0xFF6B35, opacity: 0.12 },
      { geo: new THREE.OctahedronGeometry(1.5),      pos: [0,  4, -4],   rotSpeed: [0.007, 0.004, 0.006], color: 0xFFB84D, opacity: 0.10 },
      { geo: new THREE.IcosahedronGeometry(1.6, 0),  pos: [7,  3, -2],   rotSpeed: [0.004, 0.009, 0.005], color: 0xFF6B35, opacity: 0.11 },
      { geo: new THREE.TetrahedronGeometry(1.4),     pos: [-6, -3, -3],  rotSpeed: [0.009, 0.003, 0.007], color: 0xFFB84D, opacity: 0.09 },
      { geo: new THREE.OctahedronGeometry(1.3),      pos: [0,  -4, -5],  rotSpeed: [0.006, 0.007, 0.004], color: 0xFF6B35, opacity: 0.10 },
      { geo: new THREE.IcosahedronGeometry(1.4, 0),  pos: [6,  -3, -3],  rotSpeed: [0.005, 0.006, 0.008], color: 0xFFB84D, opacity: 0.11 },
    ]

    const polys = polyConfigs.map(cfg => {
      toDispose.push(cfg.geo)
      const mat = wireframeMat(cfg.color, cfg.opacity)
      const mesh = new THREE.Mesh(cfg.geo, mat)
      mesh.position.set(...(cfg.pos as [number, number, number]))
      scene.add(mesh)
      return { mesh, rotSpeed: cfg.rotSpeed }
    })

    // ── Large central icosahedron (very faint, big scale) ──
    const bigGeo = new THREE.IcosahedronGeometry(6, 1)
    const bigMat = wireframeMat(0xFF6B35, 0.03)
    toDispose.push(bigGeo)
    const bigMesh = new THREE.Mesh(bigGeo, bigMat)
    scene.add(bigMesh)

    // ── Glow sprite particles scattered around ──
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,107,53,0.8)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g
      cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()

    const SPARKLE = isMobile ? 25 : 50
    const sparklePos = new Float32Array(SPARKLE * 3)
    for (let i = 0; i < SPARKLE; i++) {
      sparklePos[i * 3]     = (Math.random() - 0.5) * 22
      sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 14
      sparklePos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    const sparkleGeo = new THREE.BufferGeometry()
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3))
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: glowTex,
      color: 0xFFB84D,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(sparkleGeo, sparkleMat)
    scene.add(new THREE.Points(sparkleGeo, sparkleMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.005

      polys.forEach(({ mesh, rotSpeed }, i) => {
        mesh.rotation.x += rotSpeed[0]
        mesh.rotation.y += rotSpeed[1]
        mesh.rotation.z += rotSpeed[2]
        // Gentle float
        mesh.position.y += Math.sin(time * 0.4 + i) * 0.003
      })

      bigMesh.rotation.y += 0.001
      bigMesh.rotation.x += 0.0005

      camera.position.x = Math.sin(time * 0.07) * 2
      camera.position.y = Math.cos(time * 0.05) * 1.5
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
      toDispose.forEach(d => d.dispose())
      glowTex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

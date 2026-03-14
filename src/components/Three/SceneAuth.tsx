import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Minimal encrypted-stream backdrop — Login / Signup pages ──
export default function SceneAuth() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 600

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.set(0, 0, 12)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    // Glow texture
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 32
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(212,175,55,1)')
      g.addColorStop(0.4, 'rgba(212,175,55,0.4)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(glowTex)

    // ── Vertical data streams: columns of falling particles ──
    const COLS = 9
    const ROWS = 18
    const spacing = 2.0
    const startX = -(COLS - 1) * spacing * 0.5

    interface StreamParticle {
      posArr: Float32Array
      geo: THREE.BufferGeometry
      mat: THREE.PointsMaterial
      y: number
      speed: number
      col: number
    }
    const streams: StreamParticle[] = []

    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const posArr = new Float32Array(3)
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
        const isAccent = col % 3 === 0
        const mat = new THREE.PointsMaterial({
          size: isAccent ? 0.07 : 0.04,
          map: glowTex,
          color: isAccent ? 0xd4af37 : 0x332c1a,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        toDispose.push(geo, mat)
        scene.add(new THREE.Points(geo, mat))

        const x = startX + col * spacing + (Math.random() - 0.5) * 0.3
        const y = (Math.random() - 0.5) * 14
        posArr[0] = x; posArr[1] = y; posArr[2] = (Math.random() - 0.5) * 3 - 1
        geo.attributes.position.needsUpdate = true

        streams.push({
          posArr, geo, mat,
          y,
          speed: 0.012 + Math.random() * 0.018,
          col,
        })
      }
    }

    // ── Thin vertical grid lines ──
    for (let col = 0; col < COLS; col++) {
      const pts = [startX + col * spacing, 8, -1, startX + col * spacing, -8, -1]
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
      const mat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(geo, mat)
      scene.add(new THREE.Line(geo, mat))
    }

    // ── Central lock/key glow orb ──
    const orbGeo = new THREE.SphereGeometry(0.28, 12, 12)
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.12 })
    toDispose.push(orbGeo, orbMat)
    scene.add(new THREE.Mesh(orbGeo, orbMat))

    const haloGeo = new THREE.SphereGeometry(0.7, 10, 10)
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.04, side: THREE.BackSide })
    toDispose.push(haloGeo, haloMat)
    scene.add(new THREE.Mesh(haloGeo, haloMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.004

      streams.forEach((s) => {
        s.y -= s.speed
        if (s.y < -7.5) s.y = 7.5
        s.posArr[1] = s.y
        s.geo.attributes.position.needsUpdate = true

        // Opacity fade in/out based on y position (bright near center, dim at edges)
        const distFromCenter = Math.abs(s.y) / 7.5
        const baseOpacity = s.col % 3 === 0 ? 0.45 : 0.18
        s.mat.opacity = baseOpacity * (1 - distFromCenter * 0.6) * (0.5 + Math.sin(time * 1.5 + s.col) * 0.5)
      })

      orbMat.opacity = 0.08 + Math.sin(time * 2.2) * 0.04
      haloMat.opacity = 0.03 + Math.sin(time * 1.8) * 0.015

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
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

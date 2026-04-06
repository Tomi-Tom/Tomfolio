import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Hub-and-spoke connection network — Contact page backdrop ──
export default function SceneContact() {
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
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300)
    camera.position.set(0, 0, 14)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] =
      []

    // Glow sprite texture
    const makeGlow = (rgb: string) => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, `rgba(${rgb},1)`)
      g.addColorStop(0.35, `rgba(${rgb},0.5)`)
      g.addColorStop(1, `rgba(${rgb},0)`)
      cx.fillStyle = g
      cx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    }
    const glowGold = makeGlow('212,175,55')
    const glowMuted = makeGlow('102,88,51')
    toDispose.push(glowGold, glowMuted)

    // ── Central hub (represents Tom / the portfolio) ──
    const hubGeo = new THREE.SphereGeometry(0.55, 20, 20)
    const hubMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85,
    })
    const hub = new THREE.Mesh(hubGeo, hubMat)
    scene.add(hub)
    toDispose.push(hubGeo, hubMat)

    // Hub halo
    const halo1Geo = new THREE.SphereGeometry(1.1, 16, 16)
    const halo1Mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(halo1Geo, halo1Mat))
    toDispose.push(halo1Geo, halo1Mat)

    const halo2Geo = new THREE.SphereGeometry(2.0, 16, 16)
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(halo2Geo, halo2Mat))
    toDispose.push(halo2Geo, halo2Mat)

    // ── Satellite nodes ──
    // Each satellite: angle, radius, z-depth, color, size
    const satellites = [
      {
        angle: 0,
        r: isMobile ? 4.5 : 5.5,
        z: 0.5,
        color: 0xd4af37,
        size: 0.22,
        label: 'Email',
        glowTex: glowGold,
      },
      {
        angle: Math.PI * 0.5,
        r: isMobile ? 4.0 : 5.0,
        z: -0.5,
        color: 0xd4af37,
        size: 0.2,
        label: 'GitHub',
        glowTex: glowGold,
      },
      {
        angle: Math.PI,
        r: isMobile ? 4.5 : 5.5,
        z: 0.5,
        color: 0xd4af37,
        size: 0.22,
        label: 'LinkedIn',
        glowTex: glowGold,
      },
      {
        angle: Math.PI * 1.5,
        r: isMobile ? 3.8 : 4.5,
        z: -0.5,
        color: 0x665833,
        size: 0.18,
        label: 'Location',
        glowTex: glowMuted,
      },
    ]

    // Plus two smaller decorative satellites
    const extraSatellites = [
      {
        angle: Math.PI * 0.3,
        r: isMobile ? 3.0 : 3.5,
        z: -1,
        color: 0xd4af37,
        size: 0.12,
      },
      {
        angle: Math.PI * 1.2,
        r: isMobile ? 3.2 : 3.8,
        z: 1,
        color: 0xd4af37,
        size: 0.1,
      },
      {
        angle: Math.PI * 0.75,
        r: isMobile ? 2.8 : 3.2,
        z: 0,
        color: 0x665833,
        size: 0.09,
      },
    ]

    interface SatMesh {
      mesh: THREE.Mesh
      mat: THREE.MeshBasicMaterial
      baseAngle: number
      r: number
      z: number
      orbitSpeed: number
      phase: number
    }
    const satMeshes: SatMesh[] = []

    const allSats = [
      ...satellites.map((s) => ({
        ...s,
        orbitSpeed: 0.08 + Math.random() * 0.04,
      })),
      ...extraSatellites.map((s) => ({
        ...s,
        orbitSpeed: 0.12 + Math.random() * 0.06,
        glowTex: glowMuted,
      })),
    ]

    allSats.forEach((sat, si) => {
      const x = sat.r * Math.cos(sat.angle)
      const y = sat.r * Math.sin(sat.angle)
      const geo = new THREE.SphereGeometry(sat.size, 12, 12)
      const mat = new THREE.MeshBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.85,
      })
      toDispose.push(geo, mat)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, sat.z)
      scene.add(mesh)
      satMeshes.push({
        mesh,
        mat,
        baseAngle: sat.angle,
        r: sat.r,
        z: sat.z,
        orbitSpeed: sat.orbitSpeed,
        phase: si * 1.2,
      })

      // Sat halo
      const sHaloGeo = new THREE.SphereGeometry(sat.size * 2.2, 8, 8)
      const sHaloMat = new THREE.MeshBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      })
      toDispose.push(sHaloGeo, sHaloMat)
      const sHalo = new THREE.Mesh(sHaloGeo, sHaloMat)
      sHalo.position.copy(mesh.position)
      scene.add(sHalo)
    })

    // ── Connection lines from hub to main satellites ──
    interface Connection {
      geo: THREE.BufferGeometry
      mat: THREE.LineBasicMaterial
      satIndex: number
    }
    const connections: Connection[] = satellites.map((_, si) => {
      const posArr = new Float32Array(6)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      const mat = new THREE.LineBasicMaterial({
        color: satellites[si].color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(geo, mat)
      scene.add(new THREE.Line(geo, mat))
      return { geo, mat, satIndex: si }
    })

    // ── Data pulse traveling along each connection ──
    interface Pulse {
      t: number
      speed: number
      satIndex: number
      posArr: Float32Array
      geo: THREE.BufferGeometry
      mat: THREE.PointsMaterial
    }
    const pulses: Pulse[] = satellites.map((_, si) => {
      const posArr = new Float32Array(3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      const mat = new THREE.PointsMaterial({
        size: 0.28,
        map: glowGold,
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(geo, mat)
      scene.add(new THREE.Points(geo, mat))
      return {
        t: si / satellites.length,
        speed: 0.012 + Math.random() * 0.008,
        satIndex: si,
        posArr,
        geo,
        mat,
      }
    })

    // ── Orbital ring (subtle) ──
    const RING_SEGS = 80
    const ringPoints: number[] = []
    for (let i = 0; i <= RING_SEGS; i++) {
      const θ = (i / RING_SEGS) * Math.PI * 2
      ringPoints.push(5.0 * Math.cos(θ), 5.0 * Math.sin(θ), 0)
    }
    const ringGeo = new THREE.BufferGeometry()
    ringGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(ringPoints), 3)
    )
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(ringGeo, ringMat)
    scene.add(new THREE.Line(ringGeo, ringMat))

    // ── Background particles ──
    const BGCOUNT = isMobile ? 25 : 55
    const bgPos = new Float32Array(BGCOUNT * 3)
    for (let i = 0; i < BGCOUNT; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 22
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 16
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3
    }
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3))
    const bgMat = new THREE.PointsMaterial({
      size: 0.06,
      map: glowMuted,
      color: 0x332c1a,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(bgGeo, bgMat)
    scene.add(new THREE.Points(bgGeo, bgMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true
    let mouseNX = 0,
      mouseNY = 0,
      targetNX = 0,
      targetNY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetNX = e.clientX / window.innerWidth - 0.5
      targetNY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.004

      mouseNX += (targetNX - mouseNX) * 0.05
      mouseNY += (targetNY - mouseNY) * 0.05

      // Slowly rotate satellite orbit system
      const globalAngle = time * 0.06

      satMeshes.forEach((sat, si) => {
        const angle =
          sat.baseAngle + globalAngle + Math.sin(time * 0.3 + sat.phase) * 0.05
        const x = sat.r * Math.cos(angle)
        const y = sat.r * Math.sin(angle)
        sat.mesh.position.set(x, y, sat.z)
        // Pulse opacity
        sat.mat.opacity = 0.7 + Math.sin(time * 2 + sat.phase) * 0.2
        void si
      })

      // Update connection lines
      connections.forEach(({ geo, satIndex }) => {
        const posArr = geo.attributes.position.array as Float32Array
        posArr[0] = 0
        posArr[1] = 0
        posArr[2] = 0
        posArr[3] = satMeshes[satIndex].mesh.position.x
        posArr[4] = satMeshes[satIndex].mesh.position.y
        posArr[5] = satMeshes[satIndex].mesh.position.z
        geo.attributes.position.needsUpdate = true
      })

      // Update data pulses
      pulses.forEach((pulse) => {
        pulse.t += pulse.speed
        if (pulse.t > 1) pulse.t -= 1
        const t = pulse.t < 0.5 ? pulse.t * 2 : (1 - pulse.t) * 2 // bounce
        const satPos = satMeshes[pulse.satIndex].mesh.position
        pulse.posArr[0] = satPos.x * t
        pulse.posArr[1] = satPos.y * t
        pulse.posArr[2] = satPos.z * t
        pulse.geo.attributes.position.needsUpdate = true
        pulse.mat.opacity = Math.sin(pulse.t * Math.PI) * 0.9
      })

      // Pulse hub
      hubMat.opacity = 0.7 + Math.sin(time * 2.5) * 0.2
      halo1Mat.opacity = 0.08 + Math.sin(time * 2) * 0.04
      halo2Mat.opacity = 0.02 + Math.sin(time * 1.5) * 0.01

      // Camera gentle mouse parallax
      camera.position.x = mouseNX * 2
      camera.position.y = -mouseNY * 1.5
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!running) {
            running = true
            tick()
          }
        } else {
          running = false
          cancelAnimationFrame(frameId)
        }
      },
      { threshold: 0.01 }
    )
    observer.observe(mount)
    tick()

    const onResize = () => {
      const w = mount.clientWidth,
        h = mount.clientHeight
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
      toDispose.forEach((d) => d.dispose())
      renderer.dispose()
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    />
  )
}

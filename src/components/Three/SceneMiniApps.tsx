import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── App-constellation network — MiniApps page backdrop ──
export default function SceneMiniApps() {
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
    camera.position.set(0, 0, 16)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] =
      []

    // Glow canvas texture
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
    const glowTeal = makeGlow('52,211,153')
    const glowMuted = makeGlow('102,88,51')
    toDispose.push(glowGold, glowTeal, glowMuted)

    // ── App nodes — 6 apps in a loose constellation ──
    const nodeConfigs = [
      {
        pos: [-5.0, 2.5, 0.5],
        color: 0x34d399,
        glow: glowTeal,
        size: 0.24,
        label: 'Game of Life',
      },
      {
        pos: [4.5, 3.0, -0.5],
        color: 0x34d399,
        glow: glowTeal,
        size: 0.22,
        label: 'Memory Game',
      },
      {
        pos: [-3.5, -2.8, 0.3],
        color: 0xd4af37,
        glow: glowGold,
        size: 0.22,
        label: 'Weather',
      },
      {
        pos: [5.0, -2.0, -0.8],
        color: 0xd4af37,
        glow: glowGold,
        size: 0.2,
        label: 'Pomodoro',
      },
      {
        pos: [-1.0, 0.5, 1.0],
        color: 0xd4af37,
        glow: glowGold,
        size: 0.26,
        label: 'Task Breaker',
      },
      {
        pos: [1.5, -3.5, -0.5],
        color: 0xd4af37,
        glow: glowGold,
        size: 0.24,
        label: 'Mood Tracker',
      },
    ]

    interface AppNode {
      mesh: THREE.Mesh
      mat: THREE.MeshBasicMaterial
      basePos: THREE.Vector3
      phase: number
      floatAmp: number
    }
    const appNodes: AppNode[] = []

    nodeConfigs.forEach((cfg, ni) => {
      const geo = new THREE.SphereGeometry(cfg.size, 14, 14)
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.85,
      })
      toDispose.push(geo, mat)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...(cfg.pos as [number, number, number]))
      scene.add(mesh)

      // Halo
      const haloGeo = new THREE.SphereGeometry(cfg.size * 2.8, 10, 10)
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      })
      toDispose.push(haloGeo, haloMat)
      const halo = new THREE.Mesh(haloGeo, haloMat)
      halo.position.copy(mesh.position)
      scene.add(halo)

      appNodes.push({
        mesh,
        mat,
        basePos: new THREE.Vector3(...(cfg.pos as [number, number, number])),
        phase: ni * 1.05,
        floatAmp: 0.18 + Math.random() * 0.12,
      })
    })

    // ── Connection lines between neighboring nodes ──
    const connectionPairs = [
      [0, 2],
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 5],
      [3, 5],
      [4, 5],
      [0, 1],
    ]

    interface Connection {
      geo: THREE.BufferGeometry
      posArr: Float32Array
      a: number
      b: number
    }
    const connections: Connection[] = connectionPairs.map(([a, b]) => {
      const posArr = new Float32Array(6)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      const mat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(geo, mat)
      scene.add(new THREE.Line(geo, mat))
      return { geo, posArr, a, b }
    })

    // ── Traveling pulses along connections ──
    interface Pulse {
      t: number
      speed: number
      connIndex: number
      posArr: Float32Array
      geo: THREE.BufferGeometry
      mat: THREE.PointsMaterial
    }
    const pulses: Pulse[] = connectionPairs.map((_, ci) => {
      const posArr = new Float32Array(3)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      const glows = [glowGold, glowGold, glowTeal]
      const mat = new THREE.PointsMaterial({
        size: 0.22,
        map: glows[ci % glows.length],
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(geo, mat)
      scene.add(new THREE.Points(geo, mat))
      return {
        t: ci / connectionPairs.length,
        speed: 0.009 + Math.random() * 0.007,
        connIndex: ci,
        posArr,
        geo,
        mat,
      }
    })

    // ── Small orbiting mini-particles around each node ──
    interface Orbiter {
      angle: number
      speed: number
      r: number
      nodeIdx: number
      posArr: Float32Array
      geo: THREE.BufferGeometry
    }
    const orbiters: Orbiter[] = []
    if (!isMobile) {
      nodeConfigs.forEach((_, ni) => {
        for (let j = 0; j < 3; j++) {
          const posArr = new Float32Array(3)
          const geo = new THREE.BufferGeometry()
          geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
          const mat = new THREE.PointsMaterial({
            size: 0.09,
            map: glowMuted,
            color: 0x665833,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
          toDispose.push(geo, mat)
          scene.add(new THREE.Points(geo, mat))
          orbiters.push({
            angle: (j / 3) * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.3,
            r: 0.45 + j * 0.15,
            nodeIdx: ni,
            posArr,
            geo,
          })
        }
      })
    }

    // ── Background particle field ──
    const BGCOUNT = isMobile ? 30 : 65
    const bgPos = new Float32Array(BGCOUNT * 3)
    for (let i = 0; i < BGCOUNT; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 24
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 18
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3
    }
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3))
    const bgMat = new THREE.PointsMaterial({
      size: 0.06,
      map: glowMuted,
      color: 0x332c1a,
      transparent: true,
      opacity: 0.35,
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

      // Float nodes
      appNodes.forEach((node) => {
        node.mesh.position.x =
          node.basePos.x + Math.sin(time * 0.35 + node.phase) * node.floatAmp
        node.mesh.position.y =
          node.basePos.y +
          Math.cos(time * 0.28 + node.phase * 1.3) * node.floatAmp
        node.mat.opacity = 0.7 + Math.sin(time * 2.2 + node.phase) * 0.2
      })

      // Update connections
      connections.forEach(({ geo, posArr, a, b }) => {
        const pa = appNodes[a].mesh.position
        const pb = appNodes[b].mesh.position
        posArr[0] = pa.x
        posArr[1] = pa.y
        posArr[2] = pa.z
        posArr[3] = pb.x
        posArr[4] = pb.y
        posArr[5] = pb.z
        geo.attributes.position.needsUpdate = true
      })

      // Update pulses
      pulses.forEach((pulse) => {
        pulse.t += pulse.speed
        if (pulse.t > 1) pulse.t -= 1
        const t = pulse.t < 0.5 ? pulse.t * 2 : (1 - pulse.t) * 2
        const conn = connections[pulse.connIndex]
        const pa = appNodes[conn.a].mesh.position
        const pb = appNodes[conn.b].mesh.position
        pulse.posArr[0] = pa.x + (pb.x - pa.x) * t
        pulse.posArr[1] = pa.y + (pb.y - pa.y) * t
        pulse.posArr[2] = pa.z + (pb.z - pa.z) * t
        pulse.geo.attributes.position.needsUpdate = true
        pulse.mat.opacity = Math.sin(pulse.t * Math.PI) * 0.85
      })

      // Update orbiters
      orbiters.forEach((orb) => {
        orb.angle += orb.speed * 0.005
        const np = appNodes[orb.nodeIdx].mesh.position
        orb.posArr[0] = np.x + orb.r * Math.cos(orb.angle)
        orb.posArr[1] = np.y + orb.r * Math.sin(orb.angle)
        orb.posArr[2] = np.z
        orb.geo.attributes.position.needsUpdate = true
      })

      // Camera gentle mouse parallax
      camera.position.x = mouseNX * 1.5
      camera.position.y = -mouseNY * 1.2
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

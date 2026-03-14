import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── 3D career timeline helix — Resume page backdrop ──
export default function SceneResume() {
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
    camera.position.set(8, 2, 10)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    // ── Timeline helix path ──
    // 8 milestones arranged along a helix (y = time axis)
    const MILESTONES = isMobile ? 6 : 8
    const HELIX_R = 2.2
    const HELIX_HEIGHT = 10
    const milestonePositions: THREE.Vector3[] = []

    for (let i = 0; i < MILESTONES; i++) {
      const t = i / (MILESTONES - 1)
      const angle = t * Math.PI * 3 // 1.5 full turns
      const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2
      milestonePositions.push(new THREE.Vector3(
        HELIX_R * Math.cos(angle),
        y,
        HELIX_R * Math.sin(angle),
      ))
    }

    // Glow textures
    const makeGlow = (colorStr: string) => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, colorStr.replace(')', ', 1)').replace('rgb', 'rgba'))
      g.addColorStop(0.4, colorStr.replace(')', ', 0.5)').replace('rgb', 'rgba'))
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    }
    const glowGold   = makeGlow('rgb(212,175,55)')
    const glowGoldBright = makeGlow('rgb(212,175,55)')
    const glowWhite  = makeGlow('rgb(212,175,55)')
    toDispose.push(glowGold, glowGoldBright, glowWhite)

    // ── Smooth helix spine (curved line through milestones) ──
    const SPINE_SEGS = 80
    const spinePoints: number[] = []
    for (let i = 0; i <= SPINE_SEGS; i++) {
      const t = i / SPINE_SEGS
      const angle = t * Math.PI * 3
      const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2
      spinePoints.push(HELIX_R * Math.cos(angle), y, HELIX_R * Math.sin(angle))
    }
    const spineGeo = new THREE.BufferGeometry()
    spineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spinePoints), 3))
    const spineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(spineGeo, spineMat)
    scene.add(new THREE.Line(spineGeo, spineMat))

    // ── Secondary thinner spine ──
    const spine2Geo = new THREE.BufferGeometry()
    spine2Geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spinePoints), 3))
    const spine2Mat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(spine2Geo, spine2Mat)
    scene.add(new THREE.Line(spine2Geo, spine2Mat))

    // ── Milestone node spheres ──
    const nodeColors = [0xd4af37, 0xd4af37, 0xd4af37, 0xd4af37, 0xd4af37, 0xd4af37, 0xd4af37, 0xd4af37]
    const nodeMeshes: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[] = []

    milestonePositions.forEach((pos, i) => {
      const isMain = i % 2 === 0
      const geo = new THREE.SphereGeometry(isMain ? 0.22 : 0.16, 12, 12)
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: isMain ? 0.9 : 0.6,
      })
      toDispose.push(geo, mat)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      scene.add(mesh)
      nodeMeshes.push({ mesh, mat, phase: i * 0.8 })

      // Glow sphere around each node
      const haloGeo = new THREE.SphereGeometry(isMain ? 0.55 : 0.38, 12, 12)
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      })
      toDispose.push(haloGeo, haloMat)
      const halo = new THREE.Mesh(haloGeo, haloMat)
      halo.position.copy(pos)
      scene.add(halo)

      // Spoke line from helix center to each node
      const spokePoints = [0, pos.y, 0, pos.x, pos.y, pos.z]
      const spokeGeo = new THREE.BufferGeometry()
      spokeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spokePoints), 3))
      const spokeMat = new THREE.LineBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(spokeGeo, spokeMat)
      scene.add(new THREE.Line(spokeGeo, spokeMat))
    })

    // ── Traveling pulse along spine ──
    const pulsePosArr = new Float32Array(3)
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePosArr, 3))
    const pulseMat = new THREE.PointsMaterial({
      size: 0.55,
      map: glowWhite,
      color: 0xFFFFFF,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(pulseGeo, pulseMat)
    scene.add(new THREE.Points(pulseGeo, pulseMat))

    // ── Background particle field ──
    const PARTS = isMobile ? 30 : 70
    const partPos = new Float32Array(PARTS * 3)
    for (let i = 0; i < PARTS; i++) {
      partPos[i * 3]     = (Math.random() - 0.5) * 20
      partPos[i * 3 + 1] = (Math.random() - 0.5) * 15
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3))
    const partMat = new THREE.PointsMaterial({
      size: 0.07,
      map: glowGold,
      color: 0x332c1a,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    toDispose.push(partGeo, partMat)
    scene.add(new THREE.Points(partGeo, partMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true
    let pulseT = 0

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.004

      // Camera slow orbit
      const orbitAngle = time * 0.1
      camera.position.x = 10 * Math.cos(orbitAngle)
      camera.position.z = 10 * Math.sin(orbitAngle)
      camera.position.y = 2 + Math.sin(time * 0.07) * 1.5
      camera.lookAt(0, 0, 0)

      // Pulse milestones
      nodeMeshes.forEach(({ mat, phase }) => {
        mat.opacity = 0.7 + Math.sin(time * 2 + phase) * 0.25
      })

      // Traveling pulse
      pulseT = (pulseT + 0.006) % 1
      const pAngle = pulseT * Math.PI * 3
      const pY = pulseT * HELIX_HEIGHT - HELIX_HEIGHT / 2
      pulsePosArr[0] = HELIX_R * Math.cos(pAngle)
      pulsePosArr[1] = pY
      pulsePosArr[2] = HELIX_R * Math.sin(pAngle)
      pulseGeo.attributes.position.needsUpdate = true

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

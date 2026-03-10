import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Three orbital rings + floating skill-label sprites ──
export default function SceneSkills() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 600
    const isMobile = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500)
    camera.position.set(0, 4, 16)
    camera.lookAt(0, 0, 0)

    const toDispose: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = []

    // ── Glow sprite texture ──
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const cx = c.getContext('2d')!
      const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, 'rgba(255,107,53,1)')
      g.addColorStop(0.4, 'rgba(255,184,77,0.5)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      cx.fillStyle = g; cx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    })()
    toDispose.push(glowTex)

    // ── Skill data for label sprites ──
    const ringSkills = [
      ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML / CSS', 'JavaScript'],
      ['UI/UX Design', 'Figma', 'Design Systems', 'Adobe XD', 'Photoshop', 'Prototyping'],
      ['Node.js', 'Express', 'MongoDB', 'Git / GitHub', 'REST APIs', 'CI/CD'],
    ]
    const ringColors = ['#FF6B35', '#FFB84D', '#B8A0CC']

    // Build a canvas text sprite
    const makeTextSprite = (text: string, hexColor: string) => {
      const CW = 176, CH = 38
      const c = document.createElement('canvas')
      c.width = CW; c.height = CH
      const cx = c.getContext('2d')!
      cx.clearRect(0, 0, CW, CH)
      cx.font = '700 13px sans-serif'
      cx.fillStyle = hexColor
      cx.textAlign = 'center'
      cx.textBaseline = 'middle'
      cx.fillText(text, CW / 2, CH / 2)
      const tex = new THREE.CanvasTexture(c)
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.82,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.set(3.0, 0.65, 1)
      toDispose.push(tex, mat)
      return sprite
    }

    // ── Ring config ──
    const rings = [
      { r: 3.5,  tiltX: 0.3,   speed:  0.22,  color: 0xFF6B35, nodeCount: isMobile ? 7  : 12, nodeSize: 0.18 },
      { r: 5.5,  tiltX: 0.85,  speed: -0.14,  color: 0xFFB84D, nodeCount: isMobile ? 9  : 16, nodeSize: 0.14 },
      { r: 7.5,  tiltX: -0.45, speed:  0.09,  color: 0xB8A0CC, nodeCount: isMobile ? 11 : 20, nodeSize: 0.10 },
    ]

    const orbitGroups: THREE.Group[] = []
    const orbits: {
      posArr: Float32Array
      points: THREE.Points
      nodeCount: number
      r: number
      speed: number
    }[] = []

    // Label sprite arrays: one per ring, 6 sprites per ring
    const LABEL_COUNT = 6
    const labelData: Array<{
      sprites: THREE.Sprite[]
      r: number
      speed: number
    }> = []

    rings.forEach((ring, ri) => {
      const group = new THREE.Group()
      group.rotation.x = ring.tiltX
      scene.add(group)
      orbitGroups.push(group)

      // Ring circle
      const ringPts: number[] = []
      for (let i = 0; i <= 80; i++) {
        const θ = (i / 80) * Math.PI * 2
        ringPts.push(ring.r * Math.cos(θ), 0, ring.r * Math.sin(θ))
      }
      const ringGeo = new THREE.BufferGeometry()
      ringGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ringPts), 3))
      const ringMat = new THREE.LineBasicMaterial({
        color: ring.color,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(ringGeo, ringMat)
      group.add(new THREE.Line(ringGeo, ringMat))

      // Orbiting node points
      const posArr = new Float32Array(ring.nodeCount * 3)
      const nodeGeo = new THREE.BufferGeometry()
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      const nodeMat = new THREE.PointsMaterial({
        size: ring.nodeSize,
        map: glowTex,
        color: ring.color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      toDispose.push(nodeGeo, nodeMat)
      const points = new THREE.Points(nodeGeo, nodeMat)
      group.add(points)
      orbits.push({ posArr, points, nodeCount: ring.nodeCount, r: ring.r, speed: ring.speed })

      // ── Label sprites for this ring (desktop only) ──
      const sprites: THREE.Sprite[] = []
      if (!isMobile) {
        ringSkills[ri].forEach((name) => {
          const sprite = makeTextSprite(name, ringColors[ri])
          group.add(sprite)
          sprites.push(sprite)
        })
      }
      labelData.push({ sprites, r: ring.r + 0.7, speed: ring.speed })
    })

    // ── Background drift particles ──
    const DRIFT = isMobile ? 25 : 55
    const driftPos = new Float32Array(DRIFT * 3)
    for (let i = 0; i < DRIFT; i++) {
      driftPos[i * 3]     = (Math.random() - 0.5) * 26
      driftPos[i * 3 + 1] = (Math.random() - 0.5) * 20
      driftPos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const driftGeo = new THREE.BufferGeometry()
    driftGeo.setAttribute('position', new THREE.BufferAttribute(driftPos, 3))
    const driftMat = new THREE.PointsMaterial({
      size: 0.06, map: glowTex, color: 0x8A85AA,
      transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    toDispose.push(driftGeo, driftMat)
    scene.add(new THREE.Points(driftGeo, driftMat))

    // ── Central orb ──
    const orbGeo = new THREE.SphereGeometry(0.35, 16, 16)
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xFF6B35, transparent: true, opacity: 0.12 })
    toDispose.push(orbGeo, orbMat)
    scene.add(new THREE.Mesh(orbGeo, orbMat))

    // ── Animation ──
    let frameId = 0
    let time = 0
    let running = true

    const tick = () => {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      time += 0.005

      orbits.forEach((orbit, ri) => {
        const baseAngle = time * orbit.speed
        for (let i = 0; i < orbit.nodeCount; i++) {
          const θ = baseAngle + (i / orbit.nodeCount) * Math.PI * 2
          orbit.posArr[i * 3]     = orbit.r * Math.cos(θ)
          orbit.posArr[i * 3 + 1] = 0
          orbit.posArr[i * 3 + 2] = orbit.r * Math.sin(θ)
        }
        orbit.points.geometry.attributes.position.needsUpdate = true

        // Update label positions (each label is between two node positions)
        const ld = labelData[ri]
        ld.sprites.forEach((sprite, si) => {
          const angle = time * ld.speed + (si / LABEL_COUNT) * Math.PI * 2
          sprite.position.set(
            ld.r * Math.cos(angle),
            0.35,
            ld.r * Math.sin(angle),
          )
        })
      })

      orbMat.opacity = 0.09 + Math.sin(time * 1.5) * 0.04
      scene.rotation.y = Math.sin(time * 0.08) * 0.12
      scene.rotation.x = Math.sin(time * 0.06) * 0.07
      camera.position.y = 4 + Math.sin(time * 0.07) * 1
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
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}

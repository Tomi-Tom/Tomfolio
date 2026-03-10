import { ReactElement, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import SceneCarousel, { CAROUSEL_APPS } from '../components/Three/SceneCarousel'

export default function MiniAppPage(): ReactElement {
  const navigate      = useNavigate()
  const [focused, setFocused] = useState(0)
  const goToRef = useRef<((i: number) => void) | null>(null)

  const handleFocusChange = useCallback((i: number) => setFocused(i), [])
  const handleSelect      = useCallback((link: string) => navigate(link), [navigate])

  const prev = () => goToRef.current?.(focused - 1)
  const next = () => goToRef.current?.(focused + 1)

  const app = CAROUSEL_APPS[focused]

  return (
    <Layout>
      {/* ── Full-viewport carousel stage ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'calc(100vh - 64px)', minHeight: 600, background: '#07070F' }}
      >
        {/* Three.js canvas fills everything */}
        <SceneCarousel
          onFocusChange={handleFocusChange}
          onSelect={handleSelect}
          goToRef={goToRef}
        />

        {/* ── Top vignette + header ── */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #07070F 30%, transparent)', zIndex: 10 }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 z-20 pt-6 text-center pointer-events-none"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-1"
            style={{ color: '#4A4668' }}
          >
            Interactive Showcase
          </p>
          <h1
            className="font-bold syne-display leading-none"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#EAE6FF' }}
          >
            Mini <span className="brand-tt">Applications</span>
          </h1>
          <p className="text-xs mt-2" style={{ color: '#4A4668' }}>
            Drag · Scroll · ← → to explore &nbsp;·&nbsp; Click to open
          </p>
        </motion.div>

        {/* ── Left / Right navigation arrows ── */}
        {(['prev', 'next'] as const).map((dir) => (
          <motion.button
            key={dir}
            onClick={dir === 'prev' ? prev : next}
            className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full border transition-colors"
            style={{
              [dir === 'prev' ? 'left' : 'right']: '1.5rem',
              width: 48, height: 48,
              background: 'rgba(10,10,26,0.7)',
              borderColor: 'rgba(255,107,53,0.25)',
              backdropFilter: 'blur(8px)',
              color: '#FF6B35',
            }}
            whileHover={{ scale: 1.12, borderColor: 'rgba(255,107,53,0.6)', backgroundColor: 'rgba(255,107,53,0.12)' }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-lg font-bold select-none">
              {dir === 'prev' ? '←' : '→'}
            </span>
          </motion.button>
        ))}

        {/* ── Bottom vignette + info panel ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #07070F 55%, transparent)', zIndex: 10 }}
        />

        <div className="absolute inset-x-0 bottom-0 z-20 pb-6 px-4">
          {/* Animated app info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={focused}
              className="text-center mb-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {/* Category badge */}
              <motion.span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                style={{
                  background: `${app.color}22`,
                  border: `1px solid ${app.color}55`,
                  color: app.color,
                }}
              >
                {app.badge}
              </motion.span>

              {/* Title */}
              <h2
                className="font-bold syne-display leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#EAE6FF' }}
              >
                {app.title}
              </h2>

              {/* Description */}
              <p className="text-sm mt-1" style={{ color: '#6B6890' }}>
                {app.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {CAROUSEL_APPS.map((a, i) => (
              <motion.button
                key={i}
                onClick={() => goToRef.current?.(i)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width:   i === focused ? 28 : 8,
                  height:  8,
                  background: i === focused ? a.color : 'rgba(255,255,255,0.15)',
                  boxShadow: i === focused ? `0 0 8px ${a.color}88` : 'none',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
                aria-label={`Go to ${a.title}`}
              />
            ))}
          </div>

          {/* Open App button */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.button
                key={`cta-${focused}`}
                onClick={() => navigate(app.link)}
                className="relative px-8 py-3 rounded-xl font-bold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
                  boxShadow: '0 6px 28px -4px rgba(255,107,53,0.45)',
                  fontSize: '0.95rem',
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22 }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 10px 36px -4px rgba(255,107,53,0.65)',
                }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Animated glow sweep */}
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)' }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                />
                <span className="relative flex items-center gap-2">
                  Open {app.title}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        {/* ── App count indicator (top-right) ── */}
        <div
          className="absolute top-6 right-6 z-20 text-right pointer-events-none"
        >
          <motion.div
            key={focused}
            className="font-bold syne-display"
            style={{ fontSize: '2.2rem', color: 'rgba(255,107,53,0.18)', lineHeight: 1 }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(focused + 1).padStart(2, '0')}
          </motion.div>
          <div className="text-xs" style={{ color: '#2A2840' }}>
            / {String(CAROUSEL_APPS.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { ReactElement, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../layouts/PageLayout'
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
    <PageLayout>
      {/* ── Full-viewport carousel stage ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'calc(100vh - 64px)', minHeight: 600, background: 'var(--color-void)' }}
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
          style={{ background: 'linear-gradient(to bottom, var(--color-void) 30%, transparent)', zIndex: 10 }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 z-20 pt-6 text-center pointer-events-none"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="section-label mb-1">
            Interactive Showcase
          </p>
          <h1
            className="font-bold leading-none"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            Mini <span className="text-gold">Applications</span>
          </h1>
          <p className="hud-caption mt-2">
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
              background: 'rgba(0,0,0,0.7)',
              borderColor: 'var(--color-border-active)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-gold)',
            }}
            whileHover={{ scale: 1.12, borderColor: 'rgba(212,175,55,0.6)', backgroundColor: 'rgba(212,175,55,0.12)' }}
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
          style={{ background: 'linear-gradient(to top, var(--color-void) 55%, transparent)', zIndex: 10 }}
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
                  background: 'var(--color-gold-ghost)',
                  border: '1px solid var(--color-border-active)',
                  color: 'var(--color-gold)',
                }}
              >
                {app.badge}
              </motion.span>

              {/* Title */}
              <h2
                className="font-bold leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}
              >
                {app.title}
              </h2>

              {/* Description */}
              <p className="text-sm mt-1 text-secondary">
                {app.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {CAROUSEL_APPS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToRef.current?.(i)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width:   i === focused ? 28 : 8,
                  height:  8,
                  background: i === focused ? 'var(--color-gold)' : 'var(--color-text-dim)',
                  boxShadow: i === focused ? '0 0 8px var(--color-gold-dim)' : 'none',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
                aria-label={`Go to ${CAROUSEL_APPS[i].title}`}
              />
            ))}
          </div>

          {/* Open App button */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.button
                key={`cta-${focused}`}
                onClick={() => navigate(app.link)}
                className="btn-gold relative px-8 py-3 overflow-hidden"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22 }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 10px 36px -4px rgba(212,175,55,0.35)',
                }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Animated glow sweep */}
                <motion.span
                  className="absolute inset-0"
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
            className="font-bold"
            style={{ fontSize: '2.2rem', color: 'var(--color-text-dim)', lineHeight: 1, fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(focused + 1).padStart(2, '0')}
          </motion.div>
          <div className="hud-caption">
            / {String(CAROUSEL_APPS.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

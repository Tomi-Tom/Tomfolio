import { ReactElement, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../Custom/Button'
import ThreeBackground from '../Custom/ThreeBackground'

export default function DynamicHero(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })

  const { scrollY } = useScroll()
  const contentY  = useTransform(scrollY, [0, 600], [0, 80])
  const opacity   = useTransform(scrollY, [0, 350], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden:   { opacity: 0, y: 30 },
    visible:  { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
  }

  const stats = [
    { value: '50+', label: 'Projects', icon: '🚀' },
    { value: '5+',  label: 'Years',    icon: '⏱️' },
    { value: '20+', label: 'Tools',    icon: '⚡' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#07070F' }}
    >
      {/* ── Three.js neural network ── */}
      <ThreeBackground />

      {/* ── Radial vignette for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(7,7,15,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #07070F)',
          zIndex: 2,
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity, zIndex: 3 }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Brand monogram */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-accent"
              animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              TT
            </motion.div>
            <div className="text-left">
              <div className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">Portfolio of</div>
              <div className="text-base font-bold brand-tt">Tomi-Tom</div>
            </div>
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div variants={itemVariants} className="mb-10 flex justify-center">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/25"
            style={{ background: 'rgba(255,107,53,0.07)' }}
            animate={{
              borderColor: [
                'rgba(255,107,53,0.25)',
                'rgba(255,107,53,0.55)',
                'rgba(255,107,53,0.25)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-accent">Available for projects</span>
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-bold leading-none mb-6 syne-display"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 9rem)', color: '#EAE6FF' }}
        >
          <motion.span
            className="brand-tt inline-block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            Creative
          </motion.span>
          <br />
          <span className="relative inline-block">
            <motion.span
              className="brand-tt inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
            >
              Developer
            </motion.span>
            {/* Glow behind the word */}
            <motion.div
              className="absolute -inset-6 gradient-primary blur-3xl"
              style={{ opacity: 0 }}
              animate={{ opacity: [0.12, 0.32, 0.12] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          style={{ color: '#8A85AA' }}
        >
          Crafting{' '}
          <motion.span
            className="text-accent font-bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            dynamic interfaces
          </motion.span>
          {' '}and{' '}
          <motion.span
            className="text-accent font-bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            meaningful interactions
          </motion.span>
          {' '}that bring ideas to life
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-5 justify-center mb-20"
        >
          <Link to="/contact">
            <motion.div className="relative" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <motion.div
                className="absolute inset-0 gradient-primary blur-xl rounded-lg"
                animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <Button onClick={() => {}} variant="primary" className="relative px-8 py-4 text-base font-bold">
                Let's collaborate →
              </Button>
            </motion.div>
          </Link>

          <Link to="/projects">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button onClick={() => {}} variant="outline" className="px-8 py-4 text-base font-semibold">
                View my work
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl px-4 py-5 relative overflow-hidden group cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{
                scale: 1.06,
                borderColor: 'rgba(255,107,53,0.35)',
                backgroundColor: 'rgba(255,107,53,0.07)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="text-2xl mb-1"
                animate={{ y: [0, -4, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl font-bold brand-tt">{stat.value}</div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4A4668' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 4 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

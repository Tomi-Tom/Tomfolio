import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.1,
      ease: [0.65, 0, 0.35, 1],
    },
  }),
}

const miniApps = [
  {
    title: 'Game of Life',
    desc: "Conway's cellular automaton",
    badge: 'Game',
    href: '/lifegame',
  },
  {
    title: 'Memory Game',
    desc: 'Card-matching challenge',
    badge: 'Game',
    href: '/memory',
  },
  {
    title: 'Weather App',
    desc: 'Live weather worldwide',
    badge: 'Utility',
    href: '/weather',
  },
  {
    title: 'Pomodoro Timer',
    desc: 'Focus time management',
    badge: 'Utility',
    href: '/pomodoro',
  },
  {
    title: 'Task Breaker',
    desc: 'Break tasks into steps',
    badge: 'ADHD Tool',
    href: '/task-breaker',
  },
  {
    title: 'Mood Tracker',
    desc: 'Energy & mood insights',
    badge: 'ADHD Tool',
    href: '/mood-tracker',
  },
]

export function ChapterMiniApps() {
  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
        gap: '48px',
        alignItems: 'flex-start',
      }}
    >
      {/* Left: label + heading */}
      <div style={{ flex: '0 0 28%', maxWidth: '28%', paddingTop: '4px' }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span
            className="section-label"
            style={{ display: 'block', marginBottom: '14px' }}
          >
            06 — Playground
          </span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>
              Interactive
            </span>
            <span className="font-700" style={{ display: 'block' }}>
              Experiments
            </span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            Mini-applications exploring UI patterns, game logic, and
            productivity tools.
          </p>
          <a
            href="/miniapps"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--color-gold-dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            3D Carousel View →
          </a>
        </motion.div>
      </div>

      {/* Right: grid of mini-app cards */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          alignContent: 'start',
        }}
      >
        {miniApps.map((app, i) => (
          <motion.a
            key={app.title}
            href={app.href}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="void-panel"
            style={{
              padding: '20px 22px',
              borderRadius: '2px',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.4)' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  background: 'var(--color-gold-ghost)',
                  color: 'var(--color-gold-dim)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {app.badge}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  color: 'var(--color-gold-dim)',
                  letterSpacing: '0.1em',
                }}
              >
                →
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '4px',
              }}
            >
              {app.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              {app.desc}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

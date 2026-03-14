import { motion } from 'framer-motion'
import { ProjectCard } from '../Custom/ProjectCard'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const projects = [
  { year: '2025', title: 'Task Breaker', description: 'ADHD-friendly task management app with focus timers, sub-task decomposition, and dopamine-driven progress tracking.', role: 'Design + Dev', stack: ['React', 'TypeScript', 'Tailwind'], href: '/task-breaker' },
  { year: '2025', title: 'Weather App', description: 'Real-time weather forecast with 5-day outlook, location search, and animated condition icons.', role: 'Full Stack', stack: ['React', 'OpenWeather API', 'Framer Motion'], href: '/weather' },
  { year: '2024', title: 'Memory Game', description: 'Interactive card-matching game with smooth flip animations, score tracking, and responsive grid.', role: 'Design + Dev', stack: ['React', 'TypeScript', 'CSS'], href: '/memory' },
  { year: '2024', title: 'Pomodoro Timer', description: 'Focus timer with work/break cycles, session logging, and minimal distraction-free interface.', role: 'Design + Dev', stack: ['React', 'TypeScript'], href: '/pomodoro' },
]

export function ChapterProjects() {
  return (
    <div className="chapter-content" style={{ display: 'flex', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px', gap: '48px', alignItems: 'flex-start' }}>
      <div style={{ flex: '0 0 30%', maxWidth: '30%', paddingTop: '4px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>04 — Projects</span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Selected</span>
            <span className="font-700" style={{ display: 'block' }}>Work</span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            Interactive applications spanning design, development, and user experience.
          </p>
          <a href="/miniapps" style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-gold-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Interactive Experiments →
          </a>
        </motion.div>
      </div>
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', touchAction: 'pan-y', paddingRight: '4px' }}>
        {projects.map((p, i) => (
          <motion.div key={p.title} custom={i + 2} variants={fadeUp} initial="hidden" animate="visible">
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

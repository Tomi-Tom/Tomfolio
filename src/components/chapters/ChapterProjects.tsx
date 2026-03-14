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
  { year: '2024', title: 'Personal Portfolio', description: 'Modern portfolio with horizontal scroll, Three.js wireframe gears, and Void & Gold aesthetic.', role: 'Full-Stack Developer & Designer', stack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'], href: 'https://www.tombp.fr/' },
  { year: '2024', title: 'IsoMaker', description: 'Interactive isometric pixel art creator with real-time preview, color picker, and export.', role: 'Lead Developer & UX Designer', stack: ['JavaScript', 'Canvas', 'Pixel Art'], href: 'https://www.isomaker.fr/' },
  { year: '2023', title: 'LibertAI', description: 'Corporate website redesign for an AI company — modern brand presence, responsive, accessible.', role: 'Freelance Frontend Dev & Designer', stack: ['React', 'UI/UX', 'Accessibility'], href: 'https://libertai.io/' },
]

export function ChapterProjects() {
  return (
    <div className="chapter-content" style={{ display: 'flex', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px', gap: '48px', alignItems: 'flex-start' }}>
      <div style={{ flex: '0 0 30%', maxWidth: '30%', paddingTop: '4px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>05 — Projects</span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Selected</span>
            <span className="font-700" style={{ display: 'block' }}>Work</span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            Interactive applications spanning design, development, and user experience.
          </p>
          <a href="/projects" style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-gold-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            View All Projects →
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

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const experiences = [
  { role: 'Frontend Developer & Designer', company: 'LibertAI', period: '2024', type: 'Freelance' },
  { role: 'Fullstack Developer', company: 'SUNVER', period: '2024', type: 'Freelance' },
  { role: 'Mentor & Evaluator', company: 'Ionis STM (ASTEK)', period: '2023–2024', type: 'Part-time' },
  { role: 'Fullstack Developer', company: 'Diabolocom', period: '2022', type: 'Internship' },
]

const education = [
  { degree: "Master's Software Engineering", school: 'Epitech Paris', year: '2021–2026', status: 'In Progress' },
  { degree: 'Peer-to-peer Programming', school: '42 Paris', year: '2019–2021', status: 'Completed' },
  { degree: 'Preparatory Year in Sciences', school: 'UPMC', year: '2017–2018', status: 'Completed' },
]

export function ChapterExperience() {
  return (
    <div className="chapter-content" style={{ display: 'flex', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px', gap: '48px', alignItems: 'flex-start' }}>
      {/* Left: label + heading */}
      <div style={{ flex: '0 0 28%', maxWidth: '28%', paddingTop: '4px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>04 — Experience</span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Career</span>
            <span className="font-700" style={{ display: 'block' }}>Timeline</span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            5+ years across frontend, fullstack, and design — from startups to education.
          </p>
          <a href="/resume" style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-gold-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Full Resume →
          </a>
        </motion.div>
      </div>

      {/* Right: experience + education lists */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', paddingRight: '4px' }}>
        {/* Experience */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: '32px' }}>
          <span className="hud-caption" style={{ display: 'block', marginBottom: '14px', color: 'var(--color-gold-dim)' }}>Work</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experiences.map((exp, i) => (
              <motion.div key={i} custom={i + 2} variants={fadeUp} initial="hidden" animate="visible" className="void-panel" style={{ padding: '14px 18px', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>{exp.role}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-gold)' }}>{exp.company}</span>
                    <span className="text-dim" style={{ fontSize: '0.7rem' }}>·</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>{exp.type}</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hud-caption" style={{ display: 'block', marginBottom: '14px', color: 'var(--color-gold-dim)' }}>Education</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {education.map((edu, i) => (
              <motion.div key={i} custom={i + 7} variants={fadeUp} initial="hidden" animate="visible" className="void-panel" style={{ padding: '14px 18px', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>{edu.degree}</div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-gold)' }}>{edu.school}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {edu.status === 'In Progress' && (
                    <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', background: 'var(--color-gold-ghost)', color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>Active</span>
                  )}
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{edu.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

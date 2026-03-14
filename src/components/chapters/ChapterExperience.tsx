import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const experiences = [
  {
    role: 'Frontend Developer & Designer', company: 'LibertAI', period: '2024', type: 'Freelance',
    description: 'Participated in the redesign of the company\'s website with focus on frontend development and UI/UX design.',
    achievements: ['Landing page redesign', 'UI/UX design system implementation', 'Frontend development with modern frameworks'],
  },
  {
    role: 'Fullstack Developer', company: 'SUNVER', period: '2024', type: 'Freelance',
    description: 'Developed core features of the SUNVER application and represented the product at Food Hotel Tech 2024.',
    achievements: ['Core application development', 'Product representation at industry events', 'Cross-functional collaboration'],
  },
  {
    role: 'Mentor & Evaluator', company: 'Ionis STM (ASTEK)', period: '2023–2024', type: 'Part-time',
    description: 'Mentored and evaluated 1st and 2nd year students, providing guidance on software engineering projects.',
    achievements: ['Student mentoring and guidance', 'Project evaluation and feedback', 'Technical skill development'],
  },
  {
    role: 'Fullstack Developer', company: 'Diabolocom', period: '2022', type: 'Internship',
    description: 'Worked on development and improvement of internal tools using React JS/TS, built custom Webcallback plugin.',
    achievements: ['React JS/TS development', 'Custom plugin creation', 'Cross-team collaboration'],
  },
]

const education = [
  { degree: "Master's Software Engineering", school: 'Epitech Paris', year: '2021–2026', status: 'In Progress', description: 'Advanced software engineering program with project-based learning approach.' },
  { degree: 'Peer-to-peer Programming', school: '42 Paris', year: '2019–2021', status: 'Completed', description: 'Self-directed learning with focus on software development and peer collaboration.' },
  { degree: 'Preparatory Year in Sciences', school: 'UPMC', year: '2017–2018', status: 'Completed', description: 'Foundation in physics, chemistry, and engineering sciences.' },
]

export function ChapterExperience() {
  const [expandedExp, setExpandedExp] = useState<number | null>(null)
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null)

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
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', marginBottom: '24px', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
            Click an entry to expand details
          </p>
          <a href="/resume" style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-gold-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Full Resume →
          </a>
        </motion.div>
      </div>

      {/* Right: experience + education lists */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', paddingRight: '4px' }}>
        {/* Experience */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: '32px' }}>
          <span className="hud-caption" style={{ display: 'block', marginBottom: '14px', color: 'var(--color-gold-dim)' }}>Work</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {experiences.map((exp, i) => {
              const isOpen = expandedExp === i
              return (
                <motion.div
                  key={i}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={isOpen ? 'void-panel void-panel-active' : 'void-panel'}
                  style={{ padding: '14px 18px', borderRadius: '2px', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setExpandedExp(isOpen ? null : i)}
                  whileHover={{ borderColor: 'rgba(212,175,55,0.35)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>{exp.role}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-gold)' }}>{exp.company}</span>
                        <span className="text-dim" style={{ fontSize: '0.7rem' }}>·</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-dim)' }}>{exp.type}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{exp.period}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: 'var(--color-gold-dim)', fontSize: '0.7rem' }}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '14px', borderTop: '1px solid var(--color-border)', marginTop: '12px' }}>
                          <p style={{ fontSize: '0.82rem', marginBottom: '10px', lineHeight: 1.6 }}>{exp.description}</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {exp.achievements.map((a, j) => (
                              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hud-caption" style={{ display: 'block', marginBottom: '14px', color: 'var(--color-gold-dim)' }}>Education</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {education.map((edu, i) => {
              const isOpen = expandedEdu === i
              return (
                <motion.div
                  key={i}
                  custom={i + 7}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className={isOpen ? 'void-panel void-panel-active' : 'void-panel'}
                  style={{ padding: '14px 18px', borderRadius: '2px', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setExpandedEdu(isOpen ? null : i)}
                  whileHover={{ borderColor: 'rgba(212,175,55,0.35)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '2px' }}>{edu.degree}</div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-gold)' }}>{edu.school}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {edu.status === 'In Progress' && (
                        <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', background: 'var(--color-gold-ghost)', color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>Active</span>
                      )}
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{edu.year}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: 'var(--color-gold-dim)', fontSize: '0.7rem' }}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--color-border)', marginTop: '10px' }}>
                          <p style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>{edu.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

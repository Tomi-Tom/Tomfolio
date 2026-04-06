import { motion } from 'framer-motion'
import { LevelDots } from '../Custom/LevelDots'

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

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Three.js', level: 3 },
      { name: 'Framer Motion', level: 4 },
      { name: 'HTML / CSS', level: 4 },
    ],
  },
  {
    category: 'Design',
    skills: [
      { name: 'UI / UX', level: 4 },
      { name: 'Figma', level: 4 },
      { name: 'Design Systems', level: 4 },
      { name: 'Adobe XD', level: 3 },
      { name: 'Photoshop', level: 3 },
      { name: 'Prototyping', level: 4 },
    ],
  },
  {
    category: 'Backend & Tools',
    skills: [
      { name: 'Node.js', level: 3 },
      { name: 'Express', level: 3 },
      { name: 'MongoDB', level: 3 },
      { name: 'Git', level: 4 },
      { name: 'REST APIs', level: 4 },
      { name: 'CI / CD', level: 2 },
    ],
  },
]

const exploring = ['Three.js', 'Next.js', 'Rust', 'WebGL', 'AI Integration']

export function ChapterSkills() {
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
        overflowY: 'auto',
      }}
    >
      <div style={{ flex: '0 0 36%', maxWidth: '36%', paddingTop: '4px' }}>
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
            03 — Skills
          </span>
          <h2 style={{ marginBottom: '16px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>
              Craft &amp;
            </span>
            <span className="font-700" style={{ display: 'block' }}>
              Expertise
            </span>
          </h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '24px' }}>
            5 years of hands-on experience across the full design-to-production
            pipeline.
          </p>
        </motion.div>
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span
            className="hud-caption"
            style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--color-gold-dim)',
            }}
          >
            Currently Exploring
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {exploring.map((item) => (
              <span
                key={item}
                style={{
                  background: 'var(--color-void-surface)',
                  border: '1px solid var(--color-gold-dim)',
                  color: 'var(--color-gold-dim)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          alignContent: 'start',
        }}
      >
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            custom={catIdx + 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="void-panel"
            style={{ padding: '18px 20px', borderRadius: '2px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                display: 'block',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {cat.category}
            </span>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 300,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {skill.name}
                  </span>
                  <LevelDots level={skill.level} max={4} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

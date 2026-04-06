import { motion } from 'framer-motion'

interface ProjectCardProps {
  year: string
  title: string
  description: string
  role: string
  stack: string[]
  href?: string
}

export function ProjectCard({
  year,
  title,
  description,
  role,
  stack,
  href,
}: ProjectCardProps) {
  return (
    <motion.div
      className="void-panel"
      style={{
        padding: '20px 24px',
        borderRadius: '2px',
        marginBottom: '12px',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.25)' }}
      transition={{ duration: 0.2 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
          }}
        >
          {year}
        </span>
        <span
          className="hud-caption"
          style={{ color: 'var(--color-text-dim)' }}
        >
          {role}
        </span>
      </div>
      <h3
        style={{ marginBottom: '8px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>
        {description}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '14px',
        }}
      >
        {stack.map((s) => (
          <span
            key={s}
            style={{
              background: 'var(--color-void-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-dim)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            {s}
          </span>
        ))}
      </div>
      {href && (
        <a
          href={href}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          View Project →
        </a>
      )}
    </motion.div>
  )
}

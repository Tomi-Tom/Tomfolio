import { motion } from 'framer-motion'
import photo from '../../assets/PhotoPresentation.png'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

const stats = [
  { label: 'Education', value: 'Epitech Seoul' },
  { label: 'Experience', value: '5+ Years' },
  { label: 'Languages', value: 'FR · EN' },
  { label: 'Location', value: 'Seoul, KR' },
]

export function ChapterAbout() {
  return (
    <div className="chapter-content" style={{ display: 'flex', alignItems: 'center', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px', gap: '60px' }}>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ flex: '0 0 42%', maxWidth: '42%' }}>
        <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '280px' }}>
          <img src={photo} alt="Tom Bariteau-Peter" style={{ width: '100%', display: 'block', filter: 'grayscale(100%)', border: '1px solid var(--color-gold)' }} />
          <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '40px', background: 'radial-gradient(ellipse, rgba(212,175,55,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0, marginTop: '5px' }} />
              <div>
                <div className="hud-caption" style={{ marginBottom: '2px' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ flex: 1 }}>
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>02 — About</span>
          <h2 style={{ marginBottom: '20px' }}>
            <span className="font-300 text-half">Who </span>
            <span className="font-700">I Am</span>
          </h2>
        </motion.div>
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <p style={{ marginBottom: '16px' }}>
            I'm a UX/UI designer and web developer based in Seoul, combining design precision with
            technical craft. I build digital experiences that feel alive — from interactive web apps
            to immersive 3D interfaces.
          </p>
          <p style={{ marginBottom: '28px' }}>
            With a background at Epitech and 5+ years of experience across design systems, front-end
            development, and user research, I bridge the gap between what looks right and what works right.
          </p>
        </motion.div>
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: '16px' }}>
          <a href="/assets/CV_TOM BARITEAU-PETER_EN.pdf" className="btn-gold" target="_blank" rel="noopener noreferrer">CV (English)</a>
          <a href="/assets/CV_TOM BARITEAU-PETER_FR.pdf" className="btn-ghost-gold" target="_blank" rel="noopener noreferrer">CV (Fran&#231;ais) →</a>
        </motion.div>
      </div>
    </div>
  )
}

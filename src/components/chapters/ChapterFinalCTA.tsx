import { motion } from 'framer-motion'
import { useChapter } from '../../context/ChapterContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

export function ChapterFinalCTA() {
  const { setChapterIndex } = useChapter()

  return (
    <div className="chapter-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '20px' }}>08 — End</span>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <div className="display-text" style={{ marginBottom: '24px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Let&apos;s</span>
            <span className="font-700" style={{ display: 'block' }}>
              Create<span className="text-gold">.</span>
            </span>
          </div>
        </motion.div>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" style={{ fontSize: '0.95rem', marginBottom: '36px', maxWidth: '460px', margin: '0 auto 36px' }}>
          Available for freelance projects, collaborations, and full-time opportunities. Let&apos;s build something remarkable together.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          <button className="btn-gold" onClick={() => setChapterIndex(6)}>Get in Touch</button>
          <a href="https://github.com/Tomi-Tom" target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
            GitHub ↗
          </a>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '48px' }}>
          {[
            { val: '50+', label: 'Projects' },
            { val: '5yr', label: 'Experience' },
            { val: 'FR·EN', label: 'Languages' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'rgba(212,175,55,0.7)', lineHeight: 1 }}>{s.val}</div>
              <div className="hud-caption" style={{ marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

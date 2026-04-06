import { motion } from 'framer-motion'
import { useChapter } from '../../context/ChapterContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

export function ChapterHero() {
  const { setChapterIndex } = useChapter()

  return (
    <div
      className="chapter-content"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        paddingTop: '36px',
        paddingBottom: '40px',
      }}
    >
      <div style={{ flex: '0 0 55%', maxWidth: '55%' }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              width: '28px',
              height: '1px',
              background: 'var(--color-gold-dim)',
              flexShrink: 0,
            }}
          />
          <span className="section-label">UX Designer &amp; Developer</span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="display-text">
            <span className="font-300 text-half" style={{ display: 'block' }}>
              Tom
            </span>
            <span
              className="font-700"
              style={{ display: 'block', color: '#fff' }}
            >
              Bariteau<span className="text-gold">.</span>
            </span>
            <span className="font-300 text-half" style={{ display: 'block' }}>
              Peter
            </span>
          </div>
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '380px', marginTop: '20px', fontSize: '0.9rem' }}
        >
          Crafting immersive digital experiences at the intersection of design
          precision and technical craft.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            marginTop: '32px',
          }}
        >
          <button className="btn-gold" onClick={() => setChapterIndex(3)}>
            View Work
          </button>
          <a
            href="/assets/CV_TOM BARITEAU-PETER_EN.pdf"
            className="btn-ghost-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV →
          </a>
        </motion.div>
      </div>

      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          flex: '0 0 45%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            alignItems: 'flex-end',
          }}
        >
          {[
            { val: '50+', label: 'Projects' },
            { val: '5yr', label: 'Experience' },
            { val: 'FR·EN', label: 'Languages' },
          ].map((item, i) => (
            <div key={item.label}>
              {i > 0 && (
                <div
                  style={{
                    height: '1px',
                    background: 'var(--color-border)',
                    margin: '10px 0',
                  }}
                />
              )}
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'rgba(212,175,55,0.7)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {item.val}
                </div>
                <div className="hud-caption" style={{ marginTop: '3px' }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

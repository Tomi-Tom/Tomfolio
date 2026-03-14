import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { messageAPI } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] },
  }),
}

export function ChapterContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Portfolio contact', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await messageAPI.create(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: 'Portfolio contact', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="chapter-content" style={{ display: 'flex', alignItems: 'center', padding: '0 60px', paddingTop: '36px', paddingBottom: '40px', gap: '60px' }}>
      <div style={{ flex: '0 0 38%', maxWidth: '38%' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="section-label" style={{ display: 'block', marginBottom: '14px' }}>07 — Contact</span>
          <h2 style={{ marginBottom: '20px' }}>
            <span className="font-300 text-half" style={{ display: 'block' }}>Let&apos;s Build</span>
            <span className="font-700" style={{ display: 'block' }}>Something</span>
          </h2>
          <p style={{ marginBottom: '24px', fontSize: '0.88rem' }}>Open to new projects, collaborations, and interesting conversations.</p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <span className="gold-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)', boxShadow: '0 0 8px var(--color-gold)', flexShrink: 0 }} />
          <span className="hud-caption" style={{ color: 'var(--color-gold-dim)' }}>Open to new projects</span>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          {[
            { label: 'Email', value: 'contact@tomi-tom.dev' },
            { label: 'Location', value: 'Seoul, South Korea' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: '12px' }}>
              <span className="hud-caption" style={{ display: 'block', marginBottom: '2px' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{item.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/Tomi-Tom' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/tom-bariteau-peter' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-gold-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
          {[
            { val: '50+', label: 'Projects' },
            { val: '5yr', label: 'Experience' },
            { val: '100%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'rgba(212,175,55,0.7)' }}>{s.val}</div>
              <div className="hud-caption" style={{ marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" style={{ flex: 1 }}>
        {status === 'success' ? (
          <div style={{ padding: '32px', border: '1px solid var(--color-gold)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '8px' }}>Message Sent</div>
            <p style={{ fontSize: '0.85rem' }}>I&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: '20px' }}>
                <label>
                  <span className="hud-caption" style={{ display: 'block', marginBottom: '6px' }}>{field.label}</span>
                  <input className="input-void" type={field.type} placeholder={field.placeholder} value={form[field.name as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} required />
                </label>
              </div>
            ))}
            <div style={{ marginBottom: '28px' }}>
              <label>
                <span className="hud-caption" style={{ display: 'block', marginBottom: '6px' }}>Message</span>
                <textarea className="input-void" placeholder="Tell me about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} />
              </label>
            </div>
            {status === 'error' && (
              <p style={{ fontSize: '0.8rem', color: '#ff4444', marginBottom: '12px' }}>Something went wrong. Please try again.</p>
            )}
            <button type="submit" className="btn-gold" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

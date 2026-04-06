import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '../layouts/PageLayout'
import SceneContact from '../components/Three/SceneContact'

export default function Contact(): ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill in all required fields.',
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )
      if (!res.ok) throw new Error('Failed to send')
      setFormStatus({
        success: true,
        message:
          "Thank you for your message! I'll get back to you as soon as possible.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFormStatus({
        success: false,
        message: 'Something went wrong. Please try again or email me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  }

  return (
    <PageLayout>
      <div
        className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden py-24"
        style={{ background: 'var(--color-void)' }}
      >
        {/* Three.js hub-and-spoke network */}
        <SceneContact />

        <motion.div
          className="relative z-10 container mx-auto max-w-6xl px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page header */}
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 px-4 py-2"
              style={{ border: '1px solid var(--color-border-active)' }}
              animate={{
                borderColor: [
                  'rgba(212, 175, 55, 0.25)',
                  'rgba(212, 175, 55, 0.5)',
                  'rgba(212, 175, 55, 0.25)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ background: 'var(--color-gold)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="section-label" style={{ fontSize: '0.7rem' }}>
                Available for new projects
              </span>
            </motion.div>

            <h1 className="mb-4">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <p className="text-secondary mx-auto max-w-2xl text-lg">
              Have a project in mind or just want to say hello? I'd love to hear
              from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div className="void-panel p-8" variants={itemVariants}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <div
                  className="h-7 w-1 rounded-full"
                  style={{ background: 'var(--color-gold)' }}
                />
                Contact Information
              </h2>

              <div className="mb-8 space-y-5">
                {[
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gold h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '(+33) 6 67 57 06 24',
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gold h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'bariteaupeter.tom@gmail.com',
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gold h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ),
                    label: 'Location',
                    value: 'Issy Les Moulineaux, France',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center"
                      style={{
                        background: 'var(--color-gold-ghost)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="hud-caption mb-0.5">{item.label}</p>
                      <p
                        className="font-medium text-white"
                        style={{ fontSize: '0.9rem' }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className="pt-6"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <h3 className="section-label mb-4">Connect with me</h3>
                <div className="flex space-x-3">
                  {[
                    {
                      href: 'https://github.com/Tomi-Tom',
                      label: 'GitHub',
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      href: 'https://www.linkedin.com/in/tom-bp/',
                      label: 'LinkedIn',
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dim flex h-11 w-11 items-center justify-center transition-all"
                      style={{
                        background: 'var(--color-void-elevated)',
                        border: '1px solid var(--color-border)',
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.08,
                        borderColor: 'var(--color-border-active)',
                      }}
                      whileTap={{ scale: 0.92 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Response time note */}
              <div
                className="text-dim mt-6 flex items-center gap-2"
                style={{ fontSize: '0.75rem' }}
              >
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--color-gold)' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Usually responds within 24 hours
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="void-panel overflow-hidden p-8"
              variants={itemVariants}
            >
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <div
                  className="h-7 w-1 rounded-full"
                  style={{ background: 'var(--color-gold-dim)' }}
                />
                Send Me a Message
              </h2>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start gap-2 p-4 text-sm font-medium"
                  style={{
                    background: formStatus.success
                      ? 'rgba(212, 175, 55, 0.06)'
                      : 'rgba(255, 60, 60, 0.06)',
                    color: formStatus.success ? 'var(--color-gold)' : '#ff6b6b',
                    border: formStatus.success
                      ? '1px solid rgba(212, 175, 55, 0.15)'
                      : '1px solid rgba(255, 60, 60, 0.15)',
                  }}
                >
                  <span className="mt-0.5 text-base">
                    {formStatus.success ? '\u2713' : '!'}
                  </span>
                  {formStatus.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="hud-caption mb-1.5 block">
                      Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tom Bariteau"
                      className="input-void w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="hud-caption mb-1.5 block">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      className="input-void w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="hud-caption mb-1.5 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Let's work together"
                    className="input-void w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="hud-caption mb-1.5 block">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="input-void w-full resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={
                    !isSubmitting
                      ? {
                          y: -3,
                          boxShadow:
                            '0 16px 40px -8px rgba(212, 175, 55, 0.35)',
                        }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="h-4 w-4 rounded-full border-2"
                        style={{
                          borderColor: 'rgba(0,0,0,0.3)',
                          borderTopColor: '#000',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        &rarr;
                      </motion.span>
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}

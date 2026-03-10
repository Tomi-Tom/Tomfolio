import { ReactElement, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SceneFinalCTA from '../Three/SceneFinalCTA'
import Button from '../Custom/Button'

export default function FinalCTA(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  void y; void scale

  return (
    <section ref={sectionRef} className="relative bg-canvas py-32 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #07070F, transparent)' }} />

      {/* Three.js particle vortex background */}
      <SceneFinalCTA />

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Central card */}
          <motion.div
            className="surface-elevated rounded-3xl p-12 md:p-16 text-center card-interactive relative overflow-hidden"
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 gradient-primary opacity-5"
              animate={{
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* TT Monogram */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-6 relative z-10"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <span className="text-3xl font-bold text-white">TT</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              Let's Build Something
              <br />
              <span className="brand-tt">Amazing Together</span>
            </motion.h2>

            <motion.p
              className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              Have a project in mind? Let's turn your ideas into reality with clean code,
              beautiful design, and seamless user experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/contact">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 gradient-primary blur-xl opacity-60 rounded-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <Button
                    onClick={() => {}}
                    variant="primary"
                    className="relative px-10 py-5 text-lg font-bold"
                  >
                    <span className="flex items-center gap-3">
                      Start a Project
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>

              <Link to="/resume">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="px-10 py-5 text-lg font-semibold"
                  >
                    View My Resume
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Social proof indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-text-tertiary/20 relative z-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '5+', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="text-3xl font-bold brand-tt mb-1"
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-text-secondary uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative corner accents */}
            <div className="absolute top-6 right-6 w-2 h-2 rounded-full gradient-primary" />
            <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full gradient-secondary" />
          </motion.div>

          {/* Availability indicator */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full gradient-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-accent font-semibold">Available for new projects</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { ReactElement, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import SceneProjects from '../Three/SceneProjects'
import Button from '../Custom/Button'

export default function ProjectsCTA(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })


  const projects = [
    {
      title: 'Task Breaker',
      description: 'ADHD-friendly task management',
      gradient: 'primary',
      icon: '✅'
    },
    {
      title: 'Memory Game',
      description: 'Interactive card matching',
      gradient: 'secondary',
      icon: '🎮'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather data',
      gradient: 'tertiary',
      icon: '🌤️'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section ref={sectionRef} className="relative section-dark py-32 overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #0B0B12, transparent)' }} />

      {/* Three.js holographic frames background */}
      <SceneProjects />

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-on-dark mb-6">
              Explore My <span className="brand-tt">Projects</span>
            </h2>
            <p className="text-xl text-on-dark-secondary leading-relaxed">
              Interactive applications built with modern technologies, showcasing creativity and technical expertise
            </p>
          </motion.div>

          {/* Featured projects cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="surface-dark-floating rounded-2xl p-8 card-interactive relative overflow-hidden group"
                whileHover={{
                  y: -12,
                  scale: 1.03
                }}
              >
                {/* Background glow effect */}
                <motion.div
                  className={`absolute inset-0 gradient-${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className="text-6xl mb-4 relative z-10"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {project.icon}
                </motion.div>

                <h3 className="text-2xl font-bold text-on-dark mb-2 relative z-10">
                  {project.title}
                </h3>
                <p className="text-on-dark-secondary relative z-10">
                  {project.description}
                </p>

                {/* Floating accent shape */}
                <motion.div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full gradient-${project.gradient} opacity-20 blur-2xl`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Link to="/projects">
              <motion.div
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Pulsing background glow */}
                <motion.div
                  className="absolute inset-0 gradient-primary blur-2xl opacity-60 rounded-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <Button
                  onClick={() => {}}
                  variant="primary"
                  className="relative px-10 py-5 text-lg font-bold shadow-accent-strong"
                >
                  <span className="flex items-center gap-3">
                    View All Projects
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

            <motion.p
              className="text-on-dark-secondary mt-6"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Featured work and case studies
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

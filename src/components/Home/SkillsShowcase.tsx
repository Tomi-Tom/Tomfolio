import { ReactElement, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SceneSkills from '../Three/SceneSkills'

const skillCategories = [
  {
    category: 'Frontend',
    icon: '⚛️',
    gradient: 'primary' as const,
    skills: [
      { name: 'React', icon: '⚛️', level: 4 },
      { name: 'TypeScript', icon: '📘', level: 4 },
      { name: 'Tailwind CSS', icon: '🎨', level: 4 },
      { name: 'Framer Motion', icon: '✨', level: 4 },
      { name: 'HTML / CSS', icon: '🌐', level: 4 },
      { name: 'JavaScript', icon: '🔥', level: 4 },
    ],
  },
  {
    category: 'Design',
    icon: '🖌️',
    gradient: 'secondary' as const,
    skills: [
      { name: 'UI/UX Design', icon: '🎯', level: 4 },
      { name: 'Figma', icon: '🎭', level: 4 },
      { name: 'Design Systems', icon: '📐', level: 4 },
      { name: 'Adobe XD', icon: '🖼️', level: 3 },
      { name: 'Photoshop', icon: '🎞️', level: 3 },
      { name: 'Prototyping', icon: '📱', level: 4 },
    ],
  },
  {
    category: 'Backend & Tools',
    icon: '🔧',
    gradient: 'tertiary' as const,
    skills: [
      { name: 'Node.js', icon: '🟢', level: 3 },
      { name: 'Express', icon: '🚀', level: 3 },
      { name: 'MongoDB', icon: '🍃', level: 2 },
      { name: 'Git / GitHub', icon: '📦', level: 4 },
      { name: 'REST APIs', icon: '🔌', level: 3 },
      { name: 'CI/CD', icon: '⚙️', level: 3 },
    ],
  },
]

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4].map((dot) => (
        <div
          key={dot}
          className={`w-1.5 h-1.5 rounded-full transition-all ${dot <= level ? 'bg-accent' : 'bg-text-tertiary/25'}`}
        />
      ))}
    </div>
  )
}

export default function SkillsShowcase(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-canvas overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #07070F, transparent)' }} />

      {/* Three.js orbital constellation background */}
      <SceneSkills />

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface-elevated border border-accent/20 mb-6"
              animate={{
                borderColor: ['rgba(255, 107, 53, 0.2)', 'rgba(255, 107, 53, 0.4)', 'rgba(255, 107, 53, 0.2)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full gradient-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-accent">Technical Expertise</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Skills & <span className="brand-tt">Technologies</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, performant, and beautiful web applications
            </p>
          </motion.div>

          {/* Skills categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                custom={catIndex}
                className="surface-elevated rounded-2xl p-6 card-interactive relative overflow-hidden group"
                whileHover={{ y: -6, scale: 1.01 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl gradient-${category.gradient} flex items-center justify-center text-lg`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{category.category}</h3>
                </div>

                {/* Skills list */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center justify-between py-0.5"
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.06 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                      </div>
                      <LevelDots level={skill.level} />
                    </motion.div>
                  ))}
                </div>

                {/* Background glow on hover */}
                <motion.div
                  className={`absolute inset-0 gradient-${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            ))}
          </div>

          {/* Currently Exploring */}
          <motion.div
            variants={itemVariants}
            className="surface-elevated rounded-2xl p-6 border border-accent/10 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-shrink-0 flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  📚
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider">Currently Exploring</p>
                  <p className="text-sm text-text-secondary">Always learning something new</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:ml-4">
                {['Three.js', 'Next.js', 'Rust', 'WebGL', 'AI Integration'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="text-sm text-text-secondary bg-accent/5 border border-accent/15 px-3 py-1 rounded-full cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

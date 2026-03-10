import { ReactElement, useEffect, useRef } from 'react'
import WebDevelopmentIcon from '../../assets/Icons/WebDevelopment.svg'
import WebDesignIcon from '../../assets/Icons/WebDesign.svg'
import DesignTrendIcon from '../../assets/Icons/DesignTrend.svg'
import CustomerSupportIcon from '../../assets/Icons/CustomerSupport.svg'
import BrandingIcon from '../../assets/Icons/Branding.svg'
import SeoConsultantIcon from '../../assets/Icons/SEOConstultant.svg'
import SceneServices from '../Three/SceneServices'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    name: 'Frontend Development',
    description:
      'Building responsive, performant websites and applications with React, TypeScript, and modern frameworks.',
    icon: WebDevelopmentIcon,
    gradient: 'primary' as const,
  },
  {
    name: 'UI/UX Design',
    description:
      'Creating intuitive interfaces and engaging user experiences that focus on both aesthetics and functionality.',
    icon: WebDesignIcon,
    gradient: 'secondary' as const,
  },
  {
    name: 'Modern Web Apps',
    description:
      'Developing progressive web applications with cutting-edge technologies that work across all devices.',
    icon: DesignTrendIcon,
    gradient: 'primary' as const,
  },
  {
    name: 'Animation & Interaction',
    description:
      'Implementing smooth animations and micro-interactions that enhance user experience and engagement.',
    icon: CustomerSupportIcon,
    gradient: 'secondary' as const,
  },
  {
    name: 'User-Centered Design',
    description:
      'Applying design thinking and user research to create solutions that address real user needs and pain points.',
    icon: BrandingIcon,
    gradient: 'tertiary' as const,
  },
  {
    name: 'Code Quality & Performance',
    description:
      'Writing clean, maintainable code with best practices for optimal performance and future scalability.',
    icon: SeoConsultantIcon,
    gradient: 'primary' as const,
  },
]

export default function ServicesSection(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-24 bg-canvas relative overflow-hidden" ref={sectionRef}>
      {/* Three.js wireframe polyhedra background */}
      <SceneServices />

      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
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
            <span className="text-sm font-semibold text-accent">What I Offer</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Services & <span className="brand-tt">Expertise</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Combining technical skills with design thinking to deliver high-quality digital solutions that exceed
            expectations and create meaningful impact.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group surface-elevated rounded-2xl p-6 sm:p-8 relative overflow-hidden card-interactive border border-text-tertiary/10 hover:border-accent/25 transition-colors duration-300 flex flex-col"
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              {/* Icon */}
              <div className="mb-5">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl gradient-${service.gradient} p-2.5 mb-4`}
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-full h-full brightness-0 invert"
                  />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {service.name}
                </h4>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed flex-grow mb-6">
                {service.description}
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover transition-all duration-200 gap-1.5 mt-auto"
              >
                <span>Learn more</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.25, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>

              {/* Hover glow */}
              <div
                className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full gradient-${service.gradient} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={titleVariants}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-accent hover:shadow-accent-strong transition-all"
          >
            <span>View my projects</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

import { ReactElement, useEffect } from 'react'
import Services from '../../assets/SERVICES.png'
import WebDevelopmentIcon from '../../assets/Icons/WebDevelopment.svg'
import WebDesignIcon from '../../assets/Icons/WebDesign.svg'
import DesignTrendIcon from '../../assets/Icons/DesignTrend.svg'
import CustomerSupportIcon from '../../assets/Icons/CustomerSupport.svg'
import BrandingIcon from '../../assets/Icons/Branding.svg'
import SeoConsultantIcon from '../../assets/Icons/SEOConstultant.svg'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function ServicesSection(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const services = [
    {
      name: 'Frontend Development',
      description:
        'Building responsive, performant websites and applications with React, TypeScript, and modern frameworks.',
      icon: WebDevelopmentIcon,
      color: 'primary',
    },
    {
      name: 'UI/UX Design',
      description:
        'Creating intuitive interfaces and engaging user experiences that focus on both aesthetics and functionality.',
      icon: WebDesignIcon,
      color: 'accent',
    },
    {
      name: 'Modern Web Apps',
      description:
        'Developing progressive web applications with cutting-edge technologies that work across all devices.',
      icon: DesignTrendIcon,
      color: 'secondary',
    },
    {
      name: 'Animation & Interaction',
      description:
        'Implementing smooth animations and micro-interactions that enhance user experience and engagement.',
      icon: CustomerSupportIcon,
      color: 'warning',
    },
    {
      name: 'User-Centered Design',
      description:
        'Applying design thinking and user research to create solutions that address real user needs and pain points.',
      icon: BrandingIcon,
      color: 'accent',
    },
    {
      name: 'Code Quality & Performance',
      description:
        'Writing clean, maintainable code with best practices for optimal performance and future scalability.',
      icon: SeoConsultantIcon,
      color: 'primary',
    },
  ]
  
  const containerVariants = {
    hidden: { opacity: 50 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }
  
  const getCardColor = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-500/5',
        border: 'border-primary-500/20',
        text: 'text-primary-500',
        hover: 'group-hover:bg-primary-500',
        glow: 'bg-primary-500/10',
      },
      accent: {
        bg: 'bg-accent-500/5',
        border: 'border-accent-500/20',
        text: 'text-accent-500',
        hover: 'group-hover:bg-accent-500',
        glow: 'bg-accent-500/10',
      },
      secondary: {
        bg: 'bg-secondary-500/5',
        border: 'border-secondary-500/20',
        text: 'text-secondary-500',
        hover: 'group-hover:bg-secondary-500',
        glow: 'bg-secondary-500/10',
      },
      warning: {
        bg: 'bg-warning-500/5',
        border: 'border-warning-500/20',
        text: 'text-warning-500',
        hover: 'group-hover:bg-warning-500',
        glow: 'bg-warning-500/10',
      },
    };
    
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-24 bg-background-tertiary relative overflow-hidden" ref={sectionRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-100 mix-blend-soft-light" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <h2 className="text-accent-500 font-medium text-sm uppercase tracking-wider mb-2">What I Offer</h2>
          <h3 className="text-heading-2 text-neutral-white font-bold mb-6">Services & Expertise</h3>
          <p className="text-neutral-grey_1 text-body">
            Combining technical skills with design thinking to deliver high-quality digital solutions that
            exceed expectations and create meaningful impact.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const colorScheme = getCardColor(service.color);
            
            return (
              <motion.div
                key={index}
                className={`group rounded-xl p-1 transition-all duration-300 hover:shadow-lg ${colorScheme.border} hover:shadow-${service.color}-500/10 relative overflow-hidden`}
                variants={cardVariants}
              >
                <div className={`rounded-lg h-full ${colorScheme.bg} p-6 sm:p-8 relative z-10 transition-colors duration-300 bg-background-secondary group-hover:bg-background-primary/90`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-md ${colorScheme.bg} mb-4`}>
                        <motion.img 
                          src={service.icon} 
                          alt={service.name}
                          className="w-6 h-6"
                          whileHover={{ 
                            rotate: [0, -10, 10, -5, 0],
                            scale: [1, 1.1, 0.9, 1.05, 1],
                            transition: { duration: 0.5 }
                          }}
                        />
                      </div>
                      <h4 className={`text-xl font-bold mb-2 ${colorScheme.text} transition-colors duration-300 group-hover:text-neutral-white`}>
                        {service.name}
                      </h4>
                    </div>
                    
                    <p className="text-neutral-grey_1 text-body flex-grow mb-6 transition-colors duration-300 group-hover:text-neutral-grey_1">
                      {service.description}
                    </p>
                    
                    <Link 
                      to="/contact" 
                      className={`inline-flex items-center text-sm font-medium ${colorScheme.text} transition-all duration-300 group-hover:text-neutral-white`}
                    >
                      <span>Learn more</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Decorative background shapes */}
                <div className={`absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full ${colorScheme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 rounded-full ${colorScheme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`}></div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link to="/miniapps" className="inline-flex items-center py-3 px-6 rounded-lg bg-accent-500 text-white font-medium transition-transform hover:-translate-y-1">
            <span>View my projects</span>
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

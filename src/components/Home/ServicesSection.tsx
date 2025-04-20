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
      name: 'Web Development',
      description:
        'I will build your website from scratch using the latest technologies.',
      icon: WebDevelopmentIcon,
    },
    {
      name: 'Web Design',
      description:
        'I will design your website with the best user experience in mind.',
      icon: WebDesignIcon,
    },
    {
      name: 'Design Trend',
      description:
        'I will keep your website up to date with the latest design trends.',
      icon: DesignTrendIcon,
    },
    {
      name: 'Customer Support',
      description:
        'I will provide you with the best customer support after the project is done.',
      icon: CustomerSupportIcon,
    },
    {
      name: 'Branding',
      description:
        'I will help you build your brand identity and make it stand out.',
      icon: BrandingIcon,
    },
    {
      name: 'SEO Consultant',
      description:
        'I will help you optimize your website for search engines and get more traffic.',
      icon: SeoConsultantIcon,
    },
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <section className={'flex select-none justify-center'} ref={sectionRef}>
      <div
        className="relative flex flex-col justify-between overflow-hidden px-32 py-24 text-neutral-white max-lg:items-center max-lg:justify-center max-lg:px-0 max-lg:pb-24 max-sm:pb-8"
        style={{ width: '1440px' }}
      >
        <motion.img
          src={Services}
          alt="services"
          className={'left-54 absolute top-14'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 0.15,
              scale: 1,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        />
        <motion.h3 
          className={'text-4xl font-bold relative z-10'}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          My Services
        </motion.h3>
        <div className={'flex w-full items-center justify-center'}>
          <motion.div
            className={
              'grid grid-cols-3 gap-8 py-32 max-xl:grid-cols-2 max-lg:pb-0 max-sm:grid-cols-1'
            }
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={
                  'flex h-64 w-96 rounded-lg bg-background-secondary shadow-lg hover:shadow-orange-900/20 max-lg:w-80 overflow-hidden'
                }
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: '#FF8F00',
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
              >
                <div
                  className={
                    'flex flex-col items-start justify-center p-12 w-full relative'
                  }
                >
                  <motion.img 
                    src={service.icon} 
                    alt="icon" 
                    width={78} 
                    height={78}
                    whileHover={{ 
                      rotate: [0, -10, 10, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.h4 
                    className={'body-bold-large mt-2'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {service.name}
                  </motion.h4>
                  <motion.p 
                    className={'body-small pt-4'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.div 
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-orange-800/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

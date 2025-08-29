import { ReactElement, useRef } from 'react'
import Photo from '../../assets/PhotoPresentation.png'
import CV from '../../assets/CV.png'
import CV_file from '../../assets/CV.pdf'
import Button from '../Custom/Button'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export default function PresentationSection(): ReactElement {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
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
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  }
  
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV_file;
    link.download = 'Tom_Bariteau_Peter_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 bg-background-primary" ref={sectionRef}>
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent-600 to-accent-800 shadow-xl order-2 lg:order-1"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <motion.img 
              src={Photo} 
              alt="Tom Bariteau-Peter" 
              className="w-full h-full object-cover opacity-100"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            
            
            <motion.div
              className="absolute top-10 left-10 flex flex-col items-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
            </motion.div>
          </motion.div>
          
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-accent-500 font-medium text-sm uppercase tracking-wider mb-2">About Me</h2>
              <h3 className="text-heading-2 text-neutral-white font-bold">A passion for creating meaningful digital experiences</h3>
            </motion.div>
            
            <motion.p 
              className="text-body text-neutral-grey_1 leading-relaxed"
              variants={itemVariants}
            >
              I'm Tom Bariteau-Peter, a UX/UI Designer and Frontend Developer based in France. With a strong 
              foundation in both design and development, I bridge the gap between aesthetics and functionality
              to create intuitive digital experiences.
            </motion.p>
            
            <motion.p 
              className="text-body text-neutral-grey_1 leading-relaxed"
              variants={itemVariants}
            >
              Currently studying at Epitech Paris, I combine academic learning with real-world projects 
              to continuously refine my skills. My approach is user-centric and detail-oriented, 
              focusing on creating solutions that not only look great but also solve real problems.
            </motion.p>
            
            <motion.div 
              className="h-px w-full bg-neutral-grey_3/20"
              variants={itemVariants}
              initial={{ width: 0 }}
              animate={controls}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {[
                { 
                  label: 'Education', 
                  value: 'Epitech Paris - PGE 2026: Software Engineering',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  )
                },
                { 
                  label: 'Experience', 
                  value: '3+ years of UI/UX and development', 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  )
                },
                { 
                  label: 'Languages', 
                  value: 'French (native), English (C1)',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                    </svg>
                  )
                },
                { 
                  label: 'Location', 
                  value: 'Issy Les Moulineaux, France', 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  )
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3" 
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {item.icon}
                  <div>
                    <p className="text-sm text-neutral-grey_1">{item.label}</p>
                    <p className="text-neutral-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-4">
              <Button 
                onClick={handleDownloadCV} 
                variant="primary"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
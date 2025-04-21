import { ReactElement, useState, useEffect } from 'react'
import Button from '../Custom/Button'
import BlurPhoto from '../../assets/PhotoBlur.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HeroBannerSection(): ReactElement {
  const [typedText, setTypedText] = useState("")
  const fullText = "I am Developer | Designer | Creator"
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Typing animation effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100
    const delayBetweenWords = 2000

    const typeWriter = () => {
      if (!isDeleting && textIndex < fullText.length) {
        setTypedText(fullText.substring(0, textIndex + 1))
        setTextIndex(textIndex + 1)
      } else if (isDeleting && textIndex > 0) {
        setTypedText(fullText.substring(0, textIndex - 1))
        setTextIndex(textIndex - 1)
      } else if (textIndex === fullText.length) {
        // Start deleting after a delay
        setTimeout(() => setIsDeleting(true), delayBetweenWords)
      } else if (textIndex === 0) {
        setIsDeleting(false)
      }
    }

    const typingTimer = setTimeout(typeWriter, typingSpeed)
    return () => clearTimeout(typingTimer)
  }, [textIndex, isDeleting])

  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
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
        damping: 15
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="w-full bg-gradient-to-b from-background-primary to-background-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 mix-blend-soft-light pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="inline-block px-4 py-1 rounded-full bg-accent-500/10 border border-accent-500/20" variants={itemVariants}>
              <p className="text-accent-400 text-sm font-medium">Frontend Developer & UI Designer</p>
            </motion.div>
            
            <motion.h1  
              className="text-heading-1 sm:text-display-2 font-bold text-neutral-white leading-tight"
              variants={itemVariants}
            >
              <span className="text-accent-400">Crafting</span> digital experiences with purpose
            </motion.h1>
            
            <motion.div variants={itemVariants}>
              <h2 className="text-neutral-white font-medium mb-1 text-3xl">
                {typedText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-accent-400`}>|</span>
              </h2>
              <p className="text-body-large text-neutral-grey_1 max-w-lg">
                Turning complex ideas into elegant, user-friendly interfaces and applications. Making technology more human, one pixel at a time.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <Link to="/contact">
                <Button onClick={() => {}} variant="primary">
                  Get in touch
                </Button>
              </Link>
              <Link to="/miniapps">
                <Button onClick={() => {}} variant="outline">
                  View my work
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center gap-2 pt-6 text-neutral-grey_1"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background-primary bg-accent-${i * 100 + 200}`}>
                    {/* Avatar placeholder circles */}
                  </div>
                ))}
              </div>
              <p className="text-sm">Trusted by teams at <span className="text-neutral-white font-medium">Epitech</span> and <span className="text-neutral-white font-medium">various clients</span></p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative h-[400px] lg:h-[600px] flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative elements */}
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-accent-500/10 rounded-full -top-10 -right-10 blur-2xl"></div>
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-primary-500/15 rounded-full -bottom-20 -left-20 blur-3xl"></div>
            
            <motion.div 
              className="relative z-10 w-full max-w-md mx-auto"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img
                src={BlurPhoto}
                alt="Tom Bariteau-Peter"
                className="w-full h-auto rounded-2xl object-cover shadow-xl"
              />
              
              {/* Tech stack badges */}
              <motion.div 
                className="absolute -left-6 top-1/4 bg-background-secondary px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              >
                <span className="w-3 h-3 bg-accent-500 rounded-full"></span>
                <span className="text-neutral-white font-medium">React</span>
              </motion.div>
              
              <motion.div 
                className="absolute -right-4 top-1/2 bg-background-secondary px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              >
                <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                <span className="text-neutral-white font-medium">TypeScript</span>
              </motion.div>
              
              <motion.div 
                className="absolute left-1/3 -bottom-4 bg-background-secondary px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1.5
                }}
              >
                <span className="w-3 h-3 bg-secondary-500 rounded-full"></span>
                <span className="text-neutral-white font-medium">TailwindCSS</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Contact details */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-20 py-6 border-t border-neutral-grey_3/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ x: 5, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-grey_1">Email</p>
              <p className="text-neutral-white font-medium">bariteaupeter.tom@gmail.com</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ x: 5, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-grey_1">Phone</p>
              <p className="text-neutral-white font-medium">(+33) 6 67 57 06 24</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ x: 5, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-neutral-grey_1">Location</p>
              <p className="text-neutral-white font-medium">Issy Les Moulineaux, France</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

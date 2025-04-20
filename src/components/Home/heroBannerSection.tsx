import { ReactElement, useState, useEffect } from 'react'
import Button from '../Custom/Button'
import BlurPhoto from '../../assets/PhotoBlur.png'
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
    <section
      className={'flex w-full select-none justify-center bg-background-primary'}
    >
      <div
        className="relative flex h-164 items-center justify-between overflow-hidden pl-36 max-lg:px-8"
        style={{ width: '1440px' }}
      >
        <motion.div 
          className={'flex h-full flex-col'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={'flex h-full items-center'}>
            <div className={'h-2/3 space-y-4'}>
              <motion.p 
                className="body-large text-orange-500"
                variants={itemVariants}
              >
                Hi There
              </motion.p>
              <motion.h3 
                className="font-bold whitespace-nowrap"
                variants={itemVariants}
              >
                {typedText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-orange-500`}>|</span>
              </motion.h3>
              <motion.p 
                className="body-large pb-6"
                variants={itemVariants}
              >
                I make the complex simple.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Button onClick={() => {}} small>
                  <p className={'body-bold-default'}>Contact Me</p>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className={'relative h-full w-1/2 max-lg:hidden'}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={BlurPhoto}
            alt="blurry background"
            className="absolute bottom-0 h-160 w-112 max-xl:right-0"
            style={{ filter: 'blur(1px)' }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
        <motion.img
          src={BlurPhoto}
          alt="blurry background"
          className="absolute bottom-0 h-full opacity-65 lg:hidden"
          style={{ filter: 'blur(5px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className={
            'absolute bottom-8 left-12 flex items-center px-24 max-lg:left-8 max-lg:flex-col max-lg:items-start max-lg:space-y-4 max-lg:px-0'
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div 
            className={'space-y-1'}
            whileHover={{ scale: 1.05, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className={'body-bold-default'}>Email</p>
            <p className={'body-small'}>bariteaupeter.tom@gmail.com</p>
          </motion.div>
          <div
            className={
              'ml-8 mr-4 h-16 w-0.5 bg-neutral-white max-lg:m-0 max-lg:hidden'
            }
          />
          <motion.div 
            className={'space-y-1'}
            whileHover={{ scale: 1.05, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className={'body-bold-default'}>Phone</p>
            <p className={'body-small'}>(+33)6 67 57 06 24</p>
          </motion.div>
          <div
            className={
              'ml-8 mr-4 h-16 w-0.5 bg-neutral-white max-lg:m-0 max-lg:hidden'
            }
          />
          <motion.div 
            className={'space-y-1'}
            whileHover={{ scale: 1.05, color: "#FF8F00" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className={'body-bold-default'}>Location</p>
            <p className={'body-small'}>Issy Les Moulineaux, France</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

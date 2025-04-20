import { ReactElement, useRef } from 'react'
import Photo from '../../assets/PhotoPresentation.png'
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

  return (
    <section className={'flex select-none justify-center'} ref={sectionRef}>
      <div
        className="relative flex overflow-hidden px-32 py-24 max-lg:px-8"
        style={{ width: '1440px' }}
      >
        <motion.div
          className={
            'flex h-full w-156 overflow-hidden bg-orange-800 max-lg:hidden'
          }
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        >
          <motion.img 
            src={Photo} 
            alt="presentation" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <motion.div
          className={
            'flex h-full w-full flex-col space-y-6 pl-20 text-neutral-white max-lg:pl-0'
          }
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.p 
            className={'body-bold-default text-orange-800'}
            variants={itemVariants}
          >
            Who am I?
          </motion.p>
          <motion.p 
            className={'body-bold-large pb-1'}
            variants={itemVariants}
          >
            I'm Tom Bariteau-Peter a visual UX/UI Designer and Web Developer
          </motion.p>
          <motion.p 
            className={'body-small pb-6'}
            variants={itemVariants}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            dapibus tortor faucibus, finibus ligula ut, commodo ligula. Cras a
            semper purus, ut vestibulum lectus. Quisque a sodales ex. Ut tempus,
            massa in commodo tincidunt, nisi ligula placerat eros, a malesuada
            lacus nibh ac arcu. Nulla efficitur, felis non gravida sodales,
            magna urna tincidunt sapien, non lacinia urna lacus sed mi.
            Pellentesque tempor risus ut scelerisque maximus.
          </motion.p>
          <motion.div 
            className={'h-0.5 w-full bg-neutral-grey_1'}
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={controls}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div 
            className={'grid grid-cols-2 gap-4 py-5 max-lg:grid-cols-1'}
            variants={containerVariants}
          >
            {[
              { label: 'Name:', value: 'Tom Bariteau-Peter', spacing: 'ml-5' },
              { label: 'Email:', value: 'bariteaupeter.tom@gmail.com', spacing: 'ml-8' },
              { label: 'Phone:', value: '(+33)6 67 57 06 24', spacing: 'ml-4' },
              { label: 'Location:', value: 'Issy Les Moulineaux, France', spacing: 'ml-4' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={'flex'} 
                variants={itemVariants}
                custom={index}
                whileHover={{
                  x: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <p className={'body-bold-small'}>{item.label}</p>
                <p className={`body-small ${item.spacing}`}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button 
              onClick={() => {}} 
              small
              variant="primary"
            >
              <p className={'body-bold-default'}>Download CV</p>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
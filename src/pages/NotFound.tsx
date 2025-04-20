import { ReactElement, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Meteor {
  x: number
  y: number
  size: number
  speed: number
  color: string
  angle: number
}

export default function NotFound(): ReactElement {
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const createMeteor = () => {
    const size = 5 + Math.random() * 15
    const speed = 2 + Math.random() * 8
    const x = Math.random() * window.innerWidth - size
    const y = Math.random() * window.innerHeight - size
    const color = `hsl(${Math.random() * 360}, 100%, ${50 + Math.random() * 50}%)`
    const angle = (Math.random() * Math.PI * 2)
    setMeteors([...meteors, { x, y, size, speed, color, angle }])
  }

  // Auto-create a few meteors at start
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      createMeteor()
    }
  }, [])

  useEffect(() => {
    if (meteors.length === 42) {
      setShowEasterEgg(true)
    }
  }, [meteors.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setMeteors((currentMeteors) =>
        currentMeteors.map((meteor) => {
          const dx = Math.cos(meteor.angle) * meteor.speed
          const dy = Math.sin(meteor.angle) * meteor.speed
          let newX = meteor.x + dx
          let newY = meteor.y + dy
          if (newX < 0) {
            newX = window.innerWidth - meteor.size
          } else if (newX > window.innerWidth - meteor.size) {
            newX = 0
          }
          if (newY < 0) {
            newY = window.innerHeight - meteor.size
          } else if (newY > window.innerHeight - meteor.size) {
            newY = 0
          }
          return { ...meteor, x: newX, y: newY }
        })
      )
    }, 1000 / 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-text-2 relative flex min-h-screen w-full select-none flex-col items-center justify-center bg-background-tertiary text-neutral-white">
      <AnimatePresence>
        {meteors.map((meteor, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              left: meteor.x,
              top: meteor.y,
              width: meteor.size,
              height: meteor.size,
              backgroundColor: meteor.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${meteor.size * 2}px ${meteor.color}`,
            }}
          />
        ))}
      </AnimatePresence>
      
      <motion.div 
        className="mx-auto mb-12 flex max-w-screen-xl flex-row justify-between space-x-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.h1 
          className="text-9xl font-extrabold"
          whileHover={{ scale: 1.1, rotateZ: -5, color: '#FF8F00' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          4
        </motion.h1>
        <motion.h1
          className={`text-9xl font-extrabold transition-all duration-500 ${showEasterEgg ? 'animate-pulse cursor-pointer text-orange-500' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={showEasterEgg ? () => {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          } : createMeteor}
        >
          0
        </motion.h1>
        <motion.h1 
          className="text-9xl font-extrabold"
          whileHover={{ scale: 1.1, rotateZ: 5, color: '#FF8F00' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          4
        </motion.h1>
      </motion.div>
      
      <motion.h2 
        className="text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Page Not Found
      </motion.h2>
      
      <motion.div 
        className="mt-12 flex flex-row items-center justify-center space-x-4 rounded-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <motion.button
          className="transform cursor-pointer rounded-md bg-gradient-to-r from-orange-800 to-orange-600 px-6 py-3 font-medium text-white shadow-lg transition"
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 143, 0, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.replace('/')}
        >
          Go Home
        </motion.button>
        
        <h1 className="text-2xl">Or</h1>
        
        <motion.button
          className="transform cursor-pointer rounded-md bg-gradient-to-r from-orange-800 to-orange-600 px-6 py-3 font-medium text-white shadow-lg transition"
          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 143, 0, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={
            showEasterEgg
              ? () => {
                  window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                }
              : createMeteor
          }
        >
          Launch {meteors.length > 0 ? `: ${meteors.length}` : ''}
          {showEasterEgg && '🚀'}
        </motion.button>
      </motion.div>
    </div>
  )
}

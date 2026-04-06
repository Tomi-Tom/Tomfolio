'use client'

import { ReactElement, useEffect, useState } from 'react'
import { PageLayout } from '../layouts/PageLayout'
import heartImg from '../assets/heart.png'
import { motion, AnimatePresence } from 'framer-motion'

type Particle = {
  id: string
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  img: string
  color: string
}

export default function LoveTimerPage(): ReactElement {
  const departure = new Date('2025-07-04T11:10:00')
  const [timeLeft, setTimeLeft] = useState(
    departure.getTime() - new Date().getTime()
  )
  const [particles, setParticles] = useState<Particle[]>([])
  const [isPressed, setIsPressed] = useState(false)
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(departure.getTime() - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(
        (prevParticles) =>
          prevParticles
            .map((particle) => ({
              ...particle,
              x:
                particle.x +
                Math.sin(Date.now() * 0.001 + parseInt(particle.id, 36)) *
                  particle.speed,
              y: particle.y - particle.speed * 0.5,
              rotation: particle.rotation + particle.speed / 2,
            }))
            .filter((p) => p.y + p.size > 0) // Remove particles that go off the top
      )
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [particles])

  // Show special message after 10 clicks
  useEffect(() => {
    if (clickCount >= 10 && !showMessage) {
      setShowMessage(true)
      // Hide message after 5 seconds
      const timeout = setTimeout(() => {
        setShowMessage(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [clickCount, showMessage])

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((time / (1000 * 60)) % 60)
    const seconds = Math.floor((time / 1000) % 60)

    const formattedHours = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return {
      days,
      timeString: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
    }
  }

  const addParticle = () => {
    // Add a random heart with gold color
    const newParticle = {
      id: Math.random().toString(36).substring(2, 10),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
      size: 20 + Math.random() * 30,
      speed: 1 + Math.random() * 2,
      rotation: Math.random() * 360,
      img: heartImg,
      color: '#d4af37',
    }

    setParticles((prevParticles) => [...prevParticles, newParticle])
  }

  const startCreatingParticles = () => {
    setIsPressed(true)
    setClickCount((prev) => prev + 1)

    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId)
    }

    // Create particles rapidly
    const id = setInterval(() => {
      addParticle()
    }, 100) as unknown as number

    setIntervalId(id)
  }

  const stopCreatingParticles = () => {
    setIsPressed(false)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const timer = formatTime(timeLeft)

  // Cute phrases to cycle through
  const loveQuotes = [
    'Counting down to our cuddles!',
    "Soon we'll be together again!",
    'Distance is temporary, love is forever!',
    'Every second brings us closer!',
    "Can't wait to hug you tight!",
  ]

  // Get a random quote or cycle based on day
  const currentQuote = loveQuotes[Math.floor(timer.days % loveQuotes.length)]

  return (
    <PageLayout>
      {/* Pure black background */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--color-void)' }}
      />

      {/* Subtle gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 6C20 6 15 17 15 17S10 6 0 6s4 14 15 26S30 52 30 52s4-8 15-20S60 6 50 6s-10 11-10 11S40 6 30 6z' fill='%23d4af37' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '100px',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <motion.h1
          className="section-label mb-6 text-center text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold">Love</span>{' '}
          <span className="text-secondary">Countdown</span>
        </motion.h1>

        <motion.p
          className="text-secondary mb-6 max-w-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {currentQuote}
        </motion.p>

        <motion.div
          className="void-panel relative mb-16 w-full max-w-2xl cursor-pointer overflow-hidden rounded-2xl select-none"
          style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.08)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={{
            y: -5,
            boxShadow:
              '0 20px 25px -5px rgba(212, 175, 55, 0.15), 0 10px 10px -5px rgba(212, 175, 55, 0.1)',
          }}
          onMouseDown={startCreatingParticles}
          onMouseUp={stopCreatingParticles}
          onMouseLeave={stopCreatingParticles}
          onTouchStart={startCreatingParticles}
          onTouchEnd={stopCreatingParticles}
        >
          {/* Cute decorative elements - gold pulsing circles */}
          <div className="absolute -top-4 -left-4 h-8 w-8">
            <motion.div
              className="h-full w-full rounded-full"
              style={{ background: 'var(--color-gold)' }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>
          <div className="absolute -right-4 -bottom-4 h-8 w-8">
            <motion.div
              className="h-full w-full rounded-full"
              style={{ background: 'var(--color-gold)' }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          {/* Gold top border */}
          <div className="h-1" style={{ background: 'var(--color-gold)' }} />

          <motion.div
            className="p-4 sm:p-8"
            animate={isPressed ? { scale: 0.98 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <motion.img
                  src={heartImg}
                  alt="Heart"
                  className="h-24 w-24"
                  style={{
                    filter:
                      'sepia(1) hue-rotate(-10deg) saturate(3) brightness(0.85)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />

                {/* Decorative smaller hearts - gold tinted */}
                <motion.div
                  className="absolute -top-2 -right-2 h-6 w-6"
                  style={{
                    background: 'var(--color-gold)',
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    rotate: [0, 20, 0, -20, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <motion.div
                  className="absolute bottom-0 -left-3 h-5 w-5"
                  style={{
                    background: 'var(--color-gold-dim)',
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    rotate: [0, -15, 0, 15, 0],
                    x: [0, -3, 0, 3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
              </div>

              <h2 className="text-gold text-center text-xl font-semibold sm:text-2xl">
                Avant le retour en France dans les bras de ma cherie
              </h2>

              <div className="grid w-full grid-cols-1 gap-8 py-8 md:grid-cols-2">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="text-gold mb-2 text-6xl font-bold sm:text-7xl md:text-8xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {timer.days}
                  </motion.div>
                  <div className="text-secondary text-xs tracking-widest uppercase">
                    DAYS
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <motion.div
                    className="text-gold mb-2 text-5xl font-bold sm:text-6xl md:text-7xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {timer.timeString}
                  </motion.div>
                  <div className="text-secondary text-xs tracking-widest uppercase">
                    HOURS : MINS : SECS
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ color: 'var(--color-gold)' }}
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-secondary">Reunion: July 4, 2025</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Click count easter egg */}
        {showMessage && (
          <motion.p
            className="text-gold mb-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            You really love clicking! {clickCount} clicks!
          </motion.p>
        )}

        <motion.p
          className="text-secondary mt-4 max-w-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Press and hold the card to show your love!
        </motion.p>
      </div>

      {/* Floating heart particles - gold tinted */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none absolute"
            style={{
              top: particle.y,
              left: particle.x,
              width: particle.size,
              height: particle.size,
              backgroundImage: `url(${particle.img})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter:
                'sepia(1) hue-rotate(-10deg) saturate(3) brightness(0.85)',
            }}
            initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: particle.rotation,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>
    </PageLayout>
  )
}

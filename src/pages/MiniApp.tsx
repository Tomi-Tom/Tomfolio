import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function MiniAppPage(): ReactElement {
  const miniApps = [
    {
      title: 'Seoul Timer',
      description: 'A countdown timer for Léa, Reza, and Tom\'s trip to Seoul.',
      link: '/seoul',
      images: ['/seoul-timer.png']
    },
    {
      title: 'Love Timer',
      description: 'A special countdown timer for when my love comes to Korea.',
      link: '/love',
      images: ['/love-timer.png']
    },
    {
      title: 'Game of Life',
      description: 'An implementation of Conway\'s Game of Life with interactive controls.',
      link: '/lifegame',
      images: ['/life-game.png']
    },
    {
      title: 'Memory Game',
      description: 'A card matching memory game with multiple difficulty levels.',
      link: '/memory',
      images: ['/logo.png'],
      category: 'ADHD Tools'
    },
    {
      title: 'Weather App',
      description: 'Check current weather conditions around the world with this interactive demo.',
      link: '/weather',
      images: ['/logo.png']
    },
    {
      title: 'Pomodoro Timer',
      description: 'Boost your productivity with the Pomodoro Technique time management method.',
      link: '/pomodoro',
      images: ['/logo.png']
    },
    {
      title: 'ADHD Pomodoro Timer',
      description: 'Focus timer with distraction logging and reflection for ADHD users.',
      link: '/adhd-pomodoro',
      images: ['/adhd-pomodoro.png'],
      category: 'ADHD Tools'
    },
    {
      title: 'Task Breaker',
      description: 'Break complex tasks into manageable steps with visual progress tracking.',
      link: '/task-breaker',
      images: ['/task-breaker.png'],
      category: 'ADHD Tools'
    },
    {
      title: 'Mood & Energy Tracker',
      description: 'Track emotional states and energy levels with visual patterns and insights.',
      link: '/mood-tracker',
      images: ['/mood-tracker.png'],
      category: 'ADHD Tools'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-start py-24">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-16 text-center"
            variants={itemVariants}
          >
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Mini Applications</h1>
            <p className="mx-auto max-w-2xl text-lg">
              A collection of small web applications I've built to showcase different skills and technologies.
              Feel free to explore and interact with them!
            </p>
          </motion.div>

          {/* ADHD Tools Section */}
          <motion.div
            className="mb-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="mb-8 text-3xl font-bold text-orange-600 text-center">ADHD-Friendly Tools</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {miniApps
                .filter(app => app.category === 'ADHD Tools')
                .map((app, index) => (
                  <motion.div 
                    key={index}
                    className="overflow-hidden rounded-xl bg-gradient-to-br from-background-secondary to-background-primary shadow-xl transition-all duration-300 hover:shadow-orange-800/30 border border-orange-800/20"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      transition: { type: 'spring', stiffness: 300 }
                    }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <motion.img 
                        src={app.images[0]} 
                        alt={app.title} 
                        className="h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{app.title}</h2>
                      <motion.div 
                        className="absolute top-4 right-4 bg-orange-800 text-white text-xs px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 500 }}
                      >
                        ADHD-Friendly
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <p className="mb-4 text-neutral-white">{app.description}</p>
                      <motion.a
                        href={app.link}
                        className="inline-block rounded-lg bg-gradient-to-r from-orange-800 to-orange-500 px-6 py-2 text-white shadow transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View App
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Other Apps Section */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="mb-8 text-3xl font-bold text-neutral-white text-center">Other Applications</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {miniApps
                .filter(app => !app.category)
                .map((app, index) => (
                  <motion.div 
                    key={index}
                    className="overflow-hidden rounded-xl bg-background-secondary shadow-xl transition-all duration-300 hover:shadow-orange-800/30"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      transition: { type: 'spring', stiffness: 300 }
                    }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <motion.img 
                        src={app.images[0]} 
                        alt={app.title} 
                        className="h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{app.title}</h2>
                    </div>
                    <div className="p-6">
                      <p className="mb-4 text-neutral-white">{app.description}</p>
                      <motion.a
                        href={app.link}
                        className="inline-block rounded-lg bg-gradient-to-r from-orange-800 to-orange-500 px-6 py-2 text-white shadow transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View App
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}
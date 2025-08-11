import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function MiniAppPage(): ReactElement {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  
  const categories = [
    { id: 'all', name: 'All Apps' },
    { id: 'adhd', name: 'ADHD Tools' },
    { id: 'games', name: 'Games' },
    { id: 'utility', name: 'Utility Apps' },
    { id: 'personal', name: 'Personal' }
  ]
  
  const miniApps = [
    {
      title: 'Game of Life',
      description: 'An interactive implementation of Conway\'s Game of Life with adjustable speed, patterns, and visualization.',
      link: '/lifegame',
      images: ['/mini-apps/GameOfLife.png'],
      category: 'games'
    },
    {
      title: 'Memory Game',
      description: 'A card matching memory game with multiple difficulty levels and timed challenges.',
      link: '/memory',
      images: ['/mini-apps/MemoryGame.png'],
      category: 'games'
    },
    {
      title: 'Weather App',
      description: 'Check current weather conditions around the world with this interactive demo application.',
      link: '/weather',
      images: ['/mini-apps/WeatherApp.png'],
      category: 'utility'
    },
    {
      title: 'Pomodoro Timer',
      description: 'Boost your productivity with the Pomodoro Technique time management method.',
      link: '/pomodoro',
      images: ['/mini-apps/PomodoroTimer.png'],
      category: 'utility'
    },
    {
      title: 'Task Breaker (Prototype)',
      description: 'Break complex tasks into manageable steps with visual progress tracking for ADHD and executive function support.',
      link: '/task-breaker',
      images: ['/mini-apps/TaskBreaker.png'],
      category: 'adhd'
    },
    {
      title: 'Mood & Energy Tracker (Prototype)',
      description: 'Track emotional states and energy levels throughout the day with visual patterns and insights.',
      link: '/mood-tracker',
      images: ['/mini-apps/MoodAndEnergyTracker.png'],
      category: 'adhd'
    }
  ]

  const filteredApps = activeCategory === 'all' || activeCategory === null
    ? miniApps
    : miniApps.filter(app => app.category === activeCategory)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const getCategoryColor = (category: string | undefined) => {
    switch(category) {
      case 'adhd':
        return 'border-accent-500/20 bg-accent-500/5 text-accent-500';
      case 'personal':
        return 'border-primary-500/20 bg-primary-500/5 text-primary-500';
      case 'games':
        return 'border-secondary-500/20 bg-secondary-500/5 text-secondary-500';
      case 'utility':
        return 'border-warning-500/20 bg-warning-500/5 text-warning-500';
      default:
        return 'border-neutral-grey_3/20 bg-neutral-grey_3/5 text-neutral-grey_2';
    }
  }

  return (
    <Layout>
      <div className="relative bg-background-tertiary min-h-screen">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 mix-blend-soft-light" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="container-wide relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Header */}
            <motion.div className="text-center space-y-4" variants={itemVariants}>
              <h1 className="text-display-2 text-neutral-white">
                Mini <span className="text-primary-500">Applications</span>
              </h1>
              <p className="text-body-large text-neutral-grey_1 max-w-2xl mx-auto">
                Explore this collection of interactive web applications showcasing various skills and technologies.
                Each mini-app demonstrates different aspects of design and development.
              </p>
            </motion.div>

            {/* Category filters */}
            <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3" variants={itemVariants}>
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border focus-ring transition-all ${
                    activeCategory === category.id || (category.id === 'all' && activeCategory === null)
                      ? 'bg-primary-500 border-primary-600 text-neutral-white'
                      : 'bg-background-secondary border-background-secondary/50 text-neutral-grey_1 hover:border-primary-500/30'
                  }`}
                  onClick={() => setActiveCategory(category.id === 'all' ? null : category.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Apps grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredApps.map((app, index) => (
                <motion.div
                  key={index}
                  className="card card-hover overflow-hidden border border-background-secondary/40 shadow-lg rounded-2xl bg-background-secondary/90"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <motion.img
                      src={app.images[0]}
                      alt={app.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-caption text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full border bg-background-primary hover:border-orange-800 hover:text-orange-800 transition-all ${getCategoryColor(app.category)}`}>
                        {app.category === 'adhd' ? 'ADHD Tools' : 
                          app.category === 'personal' ? 'Personal' : 
                          app.category === 'games' ? 'Game' : 'Utility'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-heading-4 sm:text-heading-3 text-neutral-white">{app.title}</h2>
                    <p className="text-sm sm:text-base text-neutral-grey_1 line-clamp-3">{app.description}</p>
                    
                    <motion.a
                      href={app.link}
                      className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg space-x-2 text-sm sm:text-base font-medium ${
                        app.category === 'adhd' ? 'bg-gradient-accent' : 
                        app.category === 'timers' ? 'bg-gradient-primary' :
                        app.category === 'games' ? 'bg-gradient-secondary' :
                        'bg-gradient-primary'
                      } text-neutral-white`}
                      whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Try it out</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Empty state */}
            {filteredApps.length === 0 && (
              <motion.div 
                className="text-center py-16 sm:py-20 px-4 mx-auto max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg 
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-neutral-grey_3/40" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-heading-3 sm:text-heading-2 text-neutral-grey_2 mb-2 sm:mb-4">No applications found</h3>
                <p className="text-body text-neutral-grey_1">Try selecting a different category or check back later for more apps!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

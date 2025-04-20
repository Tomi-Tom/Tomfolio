import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import KRFlag from '../assets/kr-flag.jpg'
import HeartImage from '../assets/heart.png'

export default function MiniAppPage(): ReactElement {
  const miniApps = [
    {
      title: 'Seoul Timer',
      description: 'A countdown timer for Léa, Reza, and Tom\'s trip to Seoul.',
      link: '/seoul',
      images: [KRFlag]
    },
    {
      title: 'Love Timer',
      description: 'A special countdown timer for when my love comes to Korea.',
      link: '/love',
      images: [HeartImage]
    },
    {
      title: 'Game of Life',
      description: 'An implementation of Conway\'s Game of Life with interactive controls.',
      link: '/lifegame',
      images: ['/logo.png']
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

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {miniApps.map((app, index) => (
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
      </div>
    </Layout>
  )
}

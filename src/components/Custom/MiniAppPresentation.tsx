import { ReactElement } from 'react'
import { motion } from 'framer-motion'

interface MiniAppPresentationProps {
  title: string
  description: string
  link: string
  images: string[]
  category?: 'adhd' | 'timers' | 'games' | 'utility'
}

const MiniAppPresentation = ({
  title,
  description,
  link,
  images,
  category = 'utility'
}: MiniAppPresentationProps): ReactElement => {
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'adhd':
        return 'text-accent-500 border-accent-500/30';
      case 'timers':
        return 'text-primary-500 border-primary-500/30';
      case 'games':
        return 'text-secondary-500 border-secondary-500/30';
      case 'utility':
      default:
        return 'text-warning-500 border-warning-500/30';
    }
  }
  
  const getButtonGradient = (category: string) => {
    switch(category) {
      case 'adhd':
        return 'bg-gradient-accent';
      case 'timers':
        return 'bg-gradient-primary';
      case 'games':
        return 'bg-gradient-secondary';
      case 'utility':
      default:
        return 'bg-gradient-primary';
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-8 md:py-12">
      <motion.div 
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-heading-3 sm:text-heading-2 text-neutral-white mb-3 sm:mb-4">{title}</h1>
          <p className="text-body text-neutral-grey_1 max-w-2xl mx-auto mb-4 sm:mb-6">{description}</p>
          <span className={`inline-block px-3 py-1 text-sm rounded-full border ${getCategoryColor(category)}`}>
            {category === 'adhd' ? 'ADHD Tools' : 
              category === 'timers' ? 'Timer' : 
              category === 'games' ? 'Game' : 'Utility'}
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden border border-background-secondary shadow-lg"
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={image}
                alt={title}
                className="h-48 sm:h-56 md:h-64 w-full sm:w-64 md:w-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
        
        <motion.div className="mt-8 text-center">
          <motion.a
            href={link}
            className={`inline-flex items-center px-4 py-2 rounded-lg space-x-2 font-medium ${getButtonGradient(category)} text-neutral-white`}
            whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Try it out</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MiniAppPresentation

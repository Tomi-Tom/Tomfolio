import { ReactElement, useState, useEffect } from 'react'
import Logo from '../../assets/Logo-Icon-White-RemoveBG.png'
import MenuIcon from '../../assets/Icons/Menu.svg'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Resume',
      route: '/resume',
    },
    {
      name: 'Projects',
      route: '/projects',
    },
    {
      name: 'Mini-Apps',
      route: '/miniapps',
    },
    {
      name: 'Contact',
      route: '/contact',
    },
  ]

  return (
    <motion.header 
      className={`sticky top-0 z-50 flex h-20 w-full select-none justify-center bg-background-primary px-4 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div
        className={'z-40 flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8'}
      >
        <motion.a 
          href="/" 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img src={Logo} alt="Logo" className="h-14 w-14" />
        </motion.a>
        <div className={'body-default flex space-x-12 max-lg:hidden'}>
          {links.map((link, index) => (
            <motion.a
              key={link.route}
              href={link.route}
              className="text-text-2 text-lg hover:text-orange-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 24 
              }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400 } }}
            >
              <p>{link.name}</p>
            </motion.a>
          ))}
        </div>
        <div className={'relative lg:hidden'}>
          <motion.button
            className={'rounded-xl p-2'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <img src={MenuIcon} alt="Menu" className="h-10 w-10" />
          </motion.button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className={'absolute right-0 top-full mt-2 flex flex-col rounded-xl bg-background-secondary shadow-lg border border-background-primary/20 overflow-hidden'}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {links.map((link, index) => (
                  <motion.a
                    key={link.route}
                    href={link.route}
                    className="px-6 py-3 w-full text-lg text-neutral-white hover:bg-primary-500/20 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 } 
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <p>{link.name}</p>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

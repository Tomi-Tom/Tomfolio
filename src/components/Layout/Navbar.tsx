import { ReactElement, useState, useEffect } from 'react'
import MenuIcon from '../../assets/Icons/Menu.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

export default function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const publicLinks = [
    { name: 'Home', route: '/' },
    { name: 'Resume', route: '/resume' },
    { name: 'Projects', route: '/projects' },
    { name: 'Mini-Apps', route: '/miniapps' },
    { name: 'Contact', route: '/contact' },
  ]

  const authLinks = isAuthenticated
    ? [
        ...publicLinks,
        { name: 'Dashboard', route: '/dashboard' },
        ...(user?.role === 'admin' ? [{ name: 'Admin', route: '/admin' }] : [])
      ]
    : publicLinks

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <motion.header
      className={`sticky top-4 z-50 flex h-16 w-full select-none justify-center px-4 transition-all duration-300`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <motion.div
        className={`surface-floating rounded-full w-full max-w-[1200px] transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-surface-elevated/80' : 'bg-surface'}`}
      >
        <div className={'flex w-full items-center justify-between px-6 h-16'}>
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-accent"
              animate={{
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              TT
            </motion.div>
            <span className="font-bold text-lg brand-tt hidden sm:inline">Tomi-Tom</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className={'flex items-center space-x-8 max-lg:hidden'}>
            {authLinks.map((link, index) => (
              <motion.a
                key={link.route}
                href={link.route}
                className="text-text-primary text-base font-medium hover:text-accent transition-colors"
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
                {link.name}
              </motion.a>
            ))}

            {/* Auth Buttons (Desktop) */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm font-medium text-text-primary">
                    {user?.firstName}
                  </span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.a
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-bold gradient-primary text-white shadow-accent"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className={'relative lg:hidden'}>
            <motion.button
              className={'rounded-xl p-2'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <img src={MenuIcon} alt="Menu" className="h-10 w-10" />
            </motion.button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className={'absolute right-0 top-full mt-2 flex flex-col rounded-xl bg-surface-elevated shadow-lg border border-text-tertiary/10 overflow-hidden min-w-[200px]'}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* User Info (Mobile) */}
                  {isAuthenticated && (
                    <div className="px-6 py-3 border-b border-text-tertiary/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm font-medium text-text-primary">
                          {user?.firstName} {user?.lastName}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{user?.email}</p>
                    </div>
                  )}

                  {/* Nav Links */}
                  {authLinks.map((link, index) => (
                    <motion.a
                      key={link.route}
                      href={link.route}
                      className="px-6 py-3 w-full text-base text-text-primary font-medium hover:bg-accent-soft hover:text-accent transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                      whileHover={{ x: 5 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  ))}

                  {/* Auth Actions (Mobile) */}
                  <div className="border-t border-text-tertiary/10 p-3">
                    {isAuthenticated ? (
                      <motion.button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-accent/10 hover:text-accent transition-colors text-left"
                        whileTap={{ scale: 0.95 }}
                      >
                        Logout
                      </motion.button>
                    ) : (
                      <div className="space-y-2">
                        <motion.a
                          href="/login"
                          className="block w-full px-4 py-2 rounded-lg text-sm font-medium text-center text-text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </motion.a>
                        <motion.a
                          href="/signup"
                          className="block w-full px-4 py-2 rounded-lg text-sm font-bold text-center gradient-primary text-white shadow-accent"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}

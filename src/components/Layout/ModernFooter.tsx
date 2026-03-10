import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GeometricShape from '../Custom/GeometricShape'

export default function ModernFooter(): ReactElement {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tomi-Tom', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tom-bp/', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/', icon: 'twitter' }
  ]

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Resume', url: '/resume' },
    { name: 'Mini-Apps', url: '/miniapps' },
    { name: 'Contact', url: '/contact' }
  ]

  return (
    <footer className="relative section-dark overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-[10%] opacity-20">
        <GeometricShape shape="circle" size={100} gradient="tertiary" float />
      </div>
      <div className="absolute bottom-32 left-[15%] opacity-20">
        <GeometricShape shape="hexagon" size={80} gradient="secondary" rotate />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-on-dark"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative container max-w-[1440px] mx-auto px-6 py-12">
        {/* Compact Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                TT
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-on-dark">Tomi-Tom</h3>
                <p className="text-xs text-on-dark-secondary/80">Creative Developer</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-on-dark mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className="text-sm text-on-dark-secondary/90 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-on-dark mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:bariteaupeter.tom@gmail.com"
                  className="text-sm text-on-dark-secondary/90 hover:text-accent transition-colors"
                >
                  Email
                </a>
              </li>
              <li className="text-sm text-on-dark-secondary/90">
                Issy Les Moulineaux, France
              </li>
            </ul>
          </motion.div>

          {/* Social - Fixed logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-on-dark mb-3">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-dark-elevated flex items-center justify-center text-on-dark-secondary hover:bg-accent transition-all group"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon === 'github' && (
                    <svg className="w-4 h-4 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg className="w-4 h-4 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                    <svg className="w-4 h-4 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Copyright */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-on-dark-secondary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-on-dark-secondary/80 mb-3 md:mb-0">
            © {currentYear} <span className="brand-tt">Tomi-Tom</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full gradient-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-accent font-semibold">Available for projects</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

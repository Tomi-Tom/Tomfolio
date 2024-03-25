import React, { ReactElement, useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

export default function Navbar(): ReactElement {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible])

  const links = [
    { href: '/', name: 'Home' },
    { href: '/about', name: 'About' },
    { href: '/projects', name: 'Projects' },
    { href: '/CV', name: 'CV' },
    { href: '/contact', name: 'Contact' },
  ]

  return (
    <nav
      className={`bg-background-2 border-gray-200 text-text-2 fixed top-0 left-0 w-full z-50 ${
        visible ? '' : 'transform -translate-y-full'
      } transition-transform duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="https://www.linkedin.com/in/tom-bp/"
          className="flex items-center space-x-3"
        >
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 hover:scale-150 transition-transform duration-300 hover:-translate-x-3"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Tomfolio
          </span>
        </a>
        <div
          className="hidden w-full md:block md:w-auto flex-row"
          id="navbar-default"
        >
          <ul className="font-medium flex p-4 md:p-0 border-gray-100 rounded-lg flex-row space-x-8 mt-0 border-0">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block rounded hover:text-interactive-3 p-0 hover:translate-y-1 transition-transform duration-300 hover:animate-pulse"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

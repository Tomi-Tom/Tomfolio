import React, { ReactElement, useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

export default function Navbar(): ReactElement {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible])

  const links = [
    {
      href: '/',
      name: 'Home',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      href: '/about',
      name: 'About',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>
      ),
    },

    {
      href: '/projects',
      name: 'Projects',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
          />
        </svg>
      ),
    },
    {
      href: '/CV',
      name: 'CV',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
    },
    {
      href: '/contact',
      name: 'Contact',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>
      ),
    },
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
            className="w-16 h-16 hover:scale-105 transition-transform duration-300"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap hidden sm:block">
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
        <div className="block md:hidden relative">
          <button
            className="flex items-center px-3 py-2 rounded text-text-2"
            id="navbar-toggle"
            onClick={(): void => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-12 h-12 fill-text-2 hover:fill-interactive-3 transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            } absolute top-16 right-0 w-auto bg-background-1 rounded-lg transition-all duration-300`}
          >
            {isMenuOpen && (
              <ul className="flex flex-col p-4 space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <div className="text-lg flex flex-row items-center hover:text-interactive-3">
                      <a
                        href={link.href}
                        className="flex flex-row rounded hover:text-interactive- hover:translate-y-1 transition-transform duration-300 hover:animate-pulse p-1"
                      >
                        <div className="fill-interactive-3 mr-2">
                          {link.icon}
                        </div>
                        {link.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

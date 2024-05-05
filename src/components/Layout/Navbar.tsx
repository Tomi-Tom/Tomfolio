import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import logo from '../../assets/logo.png'
import krFlag from '../../assets/kr-flag.jpg'

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
          className="h-6 w-6"
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
          className="h-6 w-6"
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
          className="h-6 w-6"
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
          className="h-6 w-6"
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
          className="h-6 w-6"
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
      className={`fixed left-0 top-0 z-50 w-full border-b border-border-1 bg-background-2 text-text-2 ${
        visible ? '' : '-translate-y-full transform'
      } transition-transform duration-300`}
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2">
        <div className="flex items-center space-x-3">
          <div className="group relative h-16 w-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="absolute left-0 top-0 z-0 h-16 w-16 rounded-xl bg-background-2 transition-transform duration-300 group-hover:translate-x-3">
                <img
                  src={logo}
                  alt="logo"
                  className=" h-16 w-16 hover:scale-105"
                />
              </div>
            </a>
            <a href={'/seoul'}>
              <div className=" z-0 h-auto w-12 rounded-xl bg-background-2 pt-4 transition-transform duration-300 group-hover:-translate-x-10 group-hover:-rotate-6">
                <img src={krFlag} alt="Korea Flag" className="h-auto w-12" />
              </div>
            </a>
          </div>
          <a href="/" className="pl-4">
            <span className="hidden self-center whitespace-nowrap text-2xl font-semibold sm:block">
              Tomfolio
            </span>
          </a>
        </div>

        <div
          className="hidden w-full flex-row md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="mt-0 flex flex-row space-x-8 rounded-lg border-0 border-gray-100 p-4 font-medium md:p-0">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block rounded p-0 transition-transform duration-300 hover:translate-y-1 hover:animate-pulse hover:text-interactive-3"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative block md:hidden">
          <button
            className="flex items-center rounded px-3 py-2 text-text-2"
            id="navbar-toggle"
            onClick={(): void => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-12 w-12 fill-text-2 transition-colors duration-300 hover:fill-interactive-3"
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
            } absolute right-0 top-16 w-auto rounded-lg bg-background-1 transition-all duration-300`}
          >
            {isMenuOpen && (
              <ul className="flex flex-col space-y-4 p-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <div className="flex flex-row items-center text-lg hover:text-interactive-3">
                      <a
                        href={link.href}
                        className="hover:text-interactive- flex flex-row rounded p-1 transition-transform duration-300 hover:translate-y-1 hover:animate-pulse"
                      >
                        <div className="mr-2 fill-interactive-3">
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

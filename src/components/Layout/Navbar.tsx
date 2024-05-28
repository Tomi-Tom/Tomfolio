import { ReactElement, useState } from 'react'
import Logo from '../../assets/Logo-Icon-White-RemoveBG.png'
import MenuIcon from '../../assets/Icons/Menu.svg'

export default function Navbar(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <header className="sticky top-0 z-50 flex h-20 w-full select-none justify-center bg-background-primary px-4">
      <div
        className={'z-40 flex items-center justify-between'}
        style={{ width: '1440px' }}
      >
        <img src={Logo} alt="Logo" className="h-14 w-14" />
        <div className={'body-default flex space-x-12 max-lg:hidden'}>
          {links.map((link) => (
            <a
              key={link.route}
              href={link.route}
              className="text-text-2 hover:text-text-1 text-lg transition-all hover:translate-y-1 hover:text-orange-800"
            >
              <p>{link.name}</p>
            </a>
          ))}
        </div>
        <div className={'relative lg:hidden'}>
          <button
            className={'rounded-xl  p-2'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={MenuIcon} alt="Menu" className="h-10 w-10" />
          </button>
          {isMenuOpen && (
            <div
              className={
                'absolute right-0 top-full flex flex-col rounded-xl bg-background-secondary'
              }
            >
              {links.map((link) => (
                <a
                  key={link.route}
                  href={link.route}
                  className="text-text-2 hover:text-text-1 my-2 ml-8 mr-16 w-full text-lg transition-all hover:translate-y-1 hover:text-orange-800"
                >
                  <p>{link.name}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

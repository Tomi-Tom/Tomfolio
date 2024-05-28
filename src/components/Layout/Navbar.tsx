import type { ReactElement } from 'react'
import Logo from '../../assets/Logo-Icon-White-RemoveBG.png'

export default function Navbar(): ReactElement {
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
    <header className="sticky top-0 z-30 flex h-20 w-full select-none justify-center bg-background-primary px-4">
      <div
        className={'z-40 flex items-center justify-between'}
        style={{ width: '1440px' }}
      >
        <img src={Logo} alt="Logo" className="h-14 w-14" />
        <div className={'body-default flex space-x-12'}>
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
      </div>
    </header>
  )
}

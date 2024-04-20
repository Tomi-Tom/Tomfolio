import type { ReactElement } from 'react'
import logo from '../../assets/logo.png'
export default function Footer(): ReactElement {
  const links = [
    {
      href: 'https://www.instagram.com/tombp_dev/',
      icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
      alt: 'Instagram',
    },
    {
      href: 'https://www.linkedin.com/in/tom-bp/',
      icon: 'https://cdn-icons-png.flaticon.com/256/174/174857.png',
      alt: 'LinkedIn',
    },
    {
      href: 'https://github.com/Tomi-Tom',
      icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      alt: 'GitHub',
    },
  ]
  return (
    <div className="bottom-0 left-0 h-16 bg-background-2 text-white flex items-center justify-center border-t border-border-1">
      <div className="flex flex-row  justify-between items-center px-20 space-x-96">
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo" className=" w-16 h-16 hover:scale-105" />
        </a>
        <p className={'px-60'}>© 2021 Tomi Tom</p>
        <div className="flex flex-row space-x-4">
          {links.map((link) => (
            <a
              href={link.href}
              className="hover:text-interactive-3"
              key={link.alt}
            >
              <img src={link.icon} alt={link.alt} className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

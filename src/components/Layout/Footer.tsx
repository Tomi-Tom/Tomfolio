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
    <div className="bottom-0 left-0 flex h-16 flex-row items-center justify-between border-t border-border-1 bg-background-2 text-white">
      <img src={logo} alt="Tomfolio" className="ml-4 h-10 w-10" />
      <div className="mr-4 flex flex-row items-center justify-between space-x-4">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            <img src={link.icon} alt={link.alt} className="h-6 w-6" />
          </a>
        ))}
      </div>
    </div>
  )
}

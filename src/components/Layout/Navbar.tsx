import React, { ReactElement, useState, useEffect } from 'react';
import logo from '../../assets/logo.png';

export default function Navbar(): ReactElement {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const links = [
    { href: '#', name: 'Home' },
    { href: '#', name: 'About' },
    { href: '#', name: 'Services' },
    { href: '#', name: 'Pricing' },
    { href: '#', name: 'Contact' },
  ];

  return (
    <nav
      className={`bg-background-2 border-gray-200 text-text-2 fixed top-0 left-0 w-full z-10 ${
        visible ? '' : 'transform -translate-y-full'
      } transition-transform duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="https://www.linkedin.com/in/tom-bp/" className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="w-16 h-16 hover:scale-150 transition-transform duration-300 hover:-translate-x-3" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Tom BARITEAU-PETER
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
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
  );
}

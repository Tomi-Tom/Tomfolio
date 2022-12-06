export default Navbar;
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-grid">
        <Link href="/">
          <div>Accueil</div>
        </Link>
        <Link href="/about">
          <div>À propos</div>
        </Link>
        <Link href="/contact">
          <div>Contact</div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

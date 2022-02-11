import React, { useState } from 'react';
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import Theme from './Theme/Theme';
import '../../assets/styles/header.scss';
import MobileNav from './Nav/MobileNav';

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const handleNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  return (
    <header>
      <div className="container row">
        <div className="logo-and-theme">
          <MobileNav onClick={handleNavToggle} />
          <Logo />
          <Theme />
        </div>
        <Nav isMobileNavOpen={isMobileNavOpen} />
      </div>
    </header>
  );
}

export default Header;

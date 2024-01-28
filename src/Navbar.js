// Navbar.js

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo">Groupthink</a>
        <div className="nav-icon" onClick={handleToggle}>
          <FaBars />
        </div>
        <ul className={`nav-menu ${isMobile ? 'mobile' : ''}`}>
          <li className="nav-item"><a href="/">Home</a></li>
          <li className="nav-item"><a href="/courses">Courses</a></li>
          <li className="nav-item"><a href="/profile">Profile</a></li>
          <li className="nav-item"><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

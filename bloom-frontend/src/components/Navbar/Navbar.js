import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import from react-scroll
import logo from "../../assets/images/Bloom_logo.png"; 
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to="/"> {/* Wrap the logo with a Link to Home */}
          <img src={logo} alt="BLOOM Logo" className="logo" />
        </Link>
      </div>

      {/* Middle Section (Search Bar or Empty Space) */}
      <div className="navbar-middle">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <ScrollLink to="about" smooth={true} duration={500}>About Us</ScrollLink>
        <ScrollLink to="features" smooth={true} duration={500}>Features</ScrollLink>

        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

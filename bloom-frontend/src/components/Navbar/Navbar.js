import React from "react";
import { HashLink as HashLinkScroll } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/Bloom_logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth(); // Get global auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="BLOOM Logo" className="logo" />
        </Link>
      </div>

      {/* Middle Section (Search Bar or Empty Space) */}
      <div className="navbar-middle">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>

        {auth.isLoggedIn ? (
          <>
            <Link to="/mental-health-education">Educate Me</Link>
            <Link to="/mindful-exercises">Mindful Exercises</Link>
            <Link to="/community-support">Community Support</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/about">About Us</Link>
            <HashLinkScroll 
            smooth 
            to="/#features" 
            className="nav-link"
          >
            Key Features
          </HashLinkScroll>


            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import React from "react";
import { HashLink as HashLinkScroll } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/Bloom_logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="BLOOM Logo" className="logo" />
        </Link>
      </div>

      {/* Search Bar */}
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

            {/* Admin Dropdown */}
            {auth.user.role === "admin" && (
              <div className="dropdown">
                <button className="dropbtn">Admin Panel ▾</button>
                <div className="dropdown-content">
                  <Link to="/admin/dashboard">Dashboard</Link>
                  <Link to="/admin/users">Manage Users</Link>
                  <Link to="/admin/articles">Manage Articles</Link>
                  <Link to="/admin/videos">Manage Videos</Link>
                  <Link to="/admin/exercises">Manage Exercises</Link>
                  <Link to="/admin/community-stories">Manage Stories</Link>
                </div>
              </div>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/about">About Us</Link>
            <HashLinkScroll smooth to="/#features" className="nav-link">
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

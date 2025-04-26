import React from "react";
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
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="BLOOM Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-middle">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <nav className="nav-links">
        {/* Show Home only if user is NOT admin */}
        {!(auth.isLoggedIn && auth.user.role === "admin") && <Link to="/">Home</Link>}

        {auth.isLoggedIn ? (
          <>
            {/* For non-admin users */}
            {auth.user.role !== "admin" && (
              <>
                <Link to="/mental-health-education">Educate Me</Link>
                <Link to="/mindful-exercises">Mindful Exercises</Link>
                <Link to="/community-support">Community Support</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/about">About Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

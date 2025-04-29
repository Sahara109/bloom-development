import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/Bloom_logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleFeatureClick = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("features");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#features");
    }
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
        {!(auth.isLoggedIn && auth.user.role === "admin") && <Link to="/">Home</Link>}

        {auth.isLoggedIn ? (
          <>
            {auth.user.role !== "admin" && (
              <>
                <Link to="/mental-health-education">Educate Me</Link>
                <Link to="/mindful-exercises">Mindful Exercises</Link>
                <Link to="/community-support">Community Support</Link>

                {/* Mood Dropdown */}
                <div className="dropdown">
                  <button className="dropbtn">Mood</button>
                  <div className="dropdown-content">
                    <Link to="/mood-check-in">Mood Check-In</Link>
                    <Link to="/dashboard">Mood Dashboard</Link>
                  </div>
                </div>

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
            <button className="nav-btn-link" onClick={handleFeatureClick}>Key Features</button>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

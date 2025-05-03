import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/Bloom_logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // --- Search state ---
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ exercises: [], articles: [] });
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);
  const searchRef = useRef();

  // --- Search handler ---
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
  
    if (value.trim().length === 0) {
      setResults({ exercises: [], articles: [] });
      setShowResults(false);
      return;
    }
  
    searchTimeout.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(value)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults({
            exercises: data.exercises || [],
            articles: data.articles || [],
          });
          setShowResults(true);
        })
        .catch(() => {
          setResults({ exercises: [], articles: [] });
          setShowResults(false);
        });
    }, 300);
  };

  // --- Handle clicking a search result ---
  const handleResultClick = (type, id) => {
    setSearch("");
    setShowResults(false);
    if (type === "exercise") {
      navigate(`/mindful-exercises/${id}`);
    } else if (type === "article") {
      navigate(`/mental-health-education/${id}`);
    }
  };

  // --- Hide results when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="navbar-middle" ref={searchRef} style={{ position: "relative" }}>
  <input
    type="text"
    placeholder="Search exercises or articles..."
    className="search-bar"
    value={search}
    onChange={handleSearchChange}
    onFocus={() => search && setShowResults(true)}
    autoComplete="off"
  />
  {showResults && (results.exercises.length > 0 || results.articles.length > 0) && (
    <div className="search-results-dropdown">
      {results.exercises.length > 0 && (
        <>
          <div className="search-category">Exercises</div>
          {results.exercises.map((ex) => (
            <div
              key={ex._id}
              className="search-result"
              onClick={() => handleResultClick("exercise", ex._id)}
            >
              <span className="search-result-title">{ex.name}</span>
            </div>
          ))}
        </>
      )}
      {results.articles.length > 0 && (
        <>
          <div className="search-category">Articles</div>
          {results.articles.map((ar) => (
            <div
              key={ar._id}
              className="search-result"
              onClick={() => handleResultClick("article", ar._id)}
            >
              <span className="search-result-title">{ar.title}</span>
            </div>
          ))}
        </>
      )}
      {results.exercises.length === 0 && results.articles.length === 0 && (
        <div className="search-no-result">No results found.</div>
      )}
    </div>
  )}
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

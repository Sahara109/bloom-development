import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import heroImage from "../../assets/images/image.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BLOOM</h1>
          <p>Your mental health and wellbeing companion</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage} // Image path from assets
            alt="Mental health and wellbeing"
          />
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about">
        <h2>About Us</h2>
        <p>
          At BLOOM, we are dedicated to promoting mental health awareness and
          providing tools for a healthier mind. With resources, exercises, and
          an AI chatbot, we aim to support individuals on their journey toward
          mental wellbeing.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Key Features</h2>
        <ul>
          <li>AI-powered Chatbot for mental health support</li>
          <li>Stress-relief exercises like meditation and breathing</li>
          <li>Educational resources on mental health</li>
          <li>Community stories for inspiration and encouragement</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 BLOOM. All rights reserved.</p>
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/image.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Let's BLOOM Together!</h1>
          <p>Your mental health and wellbeing companion.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage} // Image path from assets
            alt="Mental health and wellbeing"
            className="hero-img" 
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
        <Link to="/about" className="btn btn-primary">Learn More</Link> {/* CTA */}
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI-powered Chatbot</h3>
            <p>Get mental health support from our AI chatbot anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <h3>Stress-relief Exercises</h3>
            <p>Practice relaxation with meditation, deep breathing, and more.</p>
          </div>
          <div className="feature-card">
            <h3>Educational Resources</h3>
            <p>Access articles, videos and journals to understand mental health better.</p>
          </div>
          <div className="feature-card">
            <h3>Community Stories</h3>
            <p>Be inspired by stories from others who’ve navigated mental health challenges.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

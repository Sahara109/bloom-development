import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/image.png";
import panicImage from "../../assets/images/panic_attack.png"; 
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Let's BLOOM Together !!</h1>
          <p>Your mental health and wellbeing companion.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Mental health and wellbeing" className="hero-img" />
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
        <Link to="/about" className="btn btn-primary">Learn More</Link>
      </section>




       {/* Panic Attack Description Section */}
       <section className="panic-section">
        <div className="panic-image">
          <img src={panicImage} alt="Panic Attack Experience" className="panic-img" />
        </div>
        <div className="panic-content">
          <h2>A Glimpse into Panic Attacks</h2>
          <p>
            "Tears welled in my eyes. My heart raced... I thought I was having a medical emergency. 
            I thought I was dying.
          </p>
          <p>
            The great irony was that to anyone just walking past, all they would have seen 
            was a girl standing in a foyer."
          </p>
          <p><em>- Milli describes what a panic attack feels like</em></p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Key Features</h2>
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
            <p>Access articles and videos to understand mental health better.</p>
          </div>
          <div className="feature-card">
            <h3>Community Stories</h3>
            <p>Be inspired by stories from others who’ve navigated mental health challenges.</p>
          </div>
        </div>
      </section>

     {/* Important Message Section */}
<section className="important-message-section">
  <h2>Important Message</h2>
  <p>
    This website has been established to provide information about anxiety, depression, 
    and suicide to the community where the information about mental health is scarce. 
    The website is not intended to be a substitute for professional medical advice, 
    diagnosis, or treatment. You should seek the advice of an appropriately qualified 
    healthcare professional before making decisions about your own circumstances. You 
    should not disregard professional medical advice, or delay seeking it, because of 
    any information contained on this website.
  </p>
</section>


    </div>
  );
};

export default Home;

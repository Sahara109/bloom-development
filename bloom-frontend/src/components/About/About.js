import React from "react";
import { FaRegSmile, FaBook, FaMusic, FaHandshake, FaRobot } from 'react-icons/fa'; // Import icons
import 'font-awesome/css/font-awesome.min.css';
import "./About.css";  // Create a separate CSS file for About Page styling
import aboutImage from "../../assets/images/about-image.png";
import storyImage from "../../assets/images/stories.png";
import teamMember1 from "../../assets/images/team-member1.jpg";
import teamMember2 from "../../assets/images/team-member2.png";

const About = () => {
  return (
      <div className="about-container">
      {/* About Us Section */}
      <section className="about-section">
        <h1>Welcome To BLOOM !!</h1>
        <p>
          BLOOM is dedicated to supporting individuals on their journey toward mental wellbeing. 
          With resources, personalized exercises, and an AI-powered chatbot, we aim to make mental health care accessible for everyone. 
          Whether you're looking for stress-relief exercises, educational resources, or community support, BLOOM has got you covered.
        </p>
      </section>

      {/* Image Section */}
      <div className="about-image">
      <img src={aboutImage} alt="Mental Health and Wellbeing" className="about-img" />
      </div>

      {/* Our Vision Section */}
      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where mental health is much prioritized, where individuals feel empowered to take charge of their well-being, and where the stigma surrounding mental health is eradicated. 
          At BLOOM, we unitedly strive to create a space where users can find solace, support, and inspiration.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission at BLOOM is simple: to provide mental health support and resources for everyone. 
          We do believe that mental wellbeing should be as prioritized as physical health, and we’re committed to helping people understand and manage their mental health better.
        </p>
      </section>
      
      {/* Key Features Section */}
      <section className="features-container">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaRegSmile className="feature-icon" />
            <h3>Meditate</h3>
            <p>Learn the life-changing skill of meditation.</p>
          </div>
          <div className="feature-card">
            <FaBook className="feature-icon" />
            <h3>Mental Health Resouces</h3>
            <p>Get to learn more about your mental health.</p>
          </div>
          <div className="feature-card">
            <FaMusic className="feature-icon" />
            <h3>Music</h3>
            <p>Exclusive music to help you focus, relax, and sleep.</p>
          </div>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h3>Community Support</h3>
            <p>Share your stories to inspire other people.</p>
          </div>
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>AI Chatbot</h3>
            <p>Its available 24/7 at your service.</p>
          </div>
        </div>
      </section>
    
      <section className="inspire-section">
        <div className="inspire-text">
          <h2>Stories to Inspire You</h2>
          <p>
            When it comes to mental health, we all have our own unique stories to tell. But no matter what we are going through, there are other people experiencing it too.
          </p>
          <p>
            Read, watch, and listen to stories from people about the signs and symptoms they experienced, how they got support, and what they do to stay well now.
          </p>
          <p>
            Hearing their stories of recovery can help you imagine your own journey.
          </p>
        </div>
        <div className="inspire-image">
          <img src={storyImage} alt="Inspiring Stories" />
        </div>
      </section>

     {/* Meet the Team Section */}
     <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={teamMember1} alt="Team member 1" className="team-img" />
            <h3>Sahara Khan</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={teamMember2} alt="Team member 2" className="team-img" />
            <h3>Selena Gomez</h3>
            <p>Lead Developer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="cta-section">
        <p>Whether you are seeking information,looking for support or just need a moment of calm, BLOOM is right here for you. Join us on this journey towards your better mental health and well-being. Become a part of BLOOM today!</p>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
};

export default About;

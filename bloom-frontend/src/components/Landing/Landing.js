import React from "react";
import "./Landing.css"; // Optional CSS file for styling

const Landing = () => {
  return (
    <div className="landing-container">
      <h1>Welcome Back to BLOOM!</h1>
      <p>Your personalized mental health dashboard.</p>
      <div className="landing-actions">
        <button className="btn">Explore Mindful Exercises</button>
        <button className="btn">View Community Stories</button>
        <button className="btn">Chat with AI Bot</button>
      </div>
    </div>
  );
};

export default Landing;

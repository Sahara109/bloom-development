import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to install axios
import { Link } from "react-router-dom"; // Import Link for routing
import "./Landing.css"; // Optional CSS file for styling

const Landing = () => {
  const [articles, setArticles] = useState([]); // Store articles in state

  // Fetch articles from the backend when the component mounts
  useEffect(() => {
    // Change the URL if your backend is hosted somewhere else
    axios
      .get("http://localhost:5001/api/articles")
      .then((response) => {
        setArticles(response.data); // Set articles to state
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="landing-container">
      <h1>Glad to have you on BLOOM!</h1>
      <p>Your personalized mental health dashboard.</p>

      <div className="landing-actions">
        <button className="btn">Explore Mindful Exercises</button>
        <button className="btn">View Community Stories</button>
        <button className="btn">Chat with AI Bot</button>
        
        {/* New Button for Mental Health Education */}
        <Link to="/mental-health-education">
          <button className="btn">Explore Mental Health Education</button>
        </Link>
      </div>

      {/* Display Articles */}
      <div className="articles-container">
        <h2>Latest Articles</h2>
        {articles.length === 0 ? (
          <p>No articles available at the moment.</p>
        ) : (
          articles.map((article) => (
            <div className="article" key={article._id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <small>Published on: {new Date(article.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Landing;

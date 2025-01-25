import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to install axios
import "./MentalHealthEducation.css"; // Optional CSS file for styling

const MentalHealthEducation = () => {
  const [articles, setArticles] = useState([]); // Store articles in state

  // Fetch articles for mental health education from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/articles")
      .then((response) => {
        setArticles(response.data); // Set articles to state
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  }, []);

  return (
    <div className="mental-health-education-container">
      <h1>Mental Health Education</h1>
      <p>Explore articles to help you understand mental health better.</p>

      <div className="articles-container">
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

export default MentalHealthEducation;

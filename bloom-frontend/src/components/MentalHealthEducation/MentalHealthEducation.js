import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MentalHealthEducation.css"; // Optional CSS file for styling

const MentalHealthEducation = () => {
  const [articles, setArticles] = useState([]); // State for articles
  const [videos, setVideos] = useState([]); // State for videos

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("Fetching articles...");

      axios
        .get("http://localhost:5001/api/articles", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Articles fetched:", response.data);
          setArticles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching articles", error);
        });
    } else {
      console.log("No token found in localStorage");
    }

    // Fetch videos
    console.log("Fetching videos...");

    axios
      .get("http://localhost:5001/api/videos")
      .then((response) => {
        console.log("Videos fetched:", response.data);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos", error);
      });
  }, []);

  console.log("Current videos state:", videos); // Debugging state

  return (
    <div className="mental-health-education-container">
      <h1>Mental Health Education</h1>

      {/* Articles Section */}
      <h2>Articles</h2>
      <div className="articles-container">
        {articles.length === 0 ? (
          <p>No articles available at the moment.</p>
        ) : (
          articles.map((article) => (
            <div className="article" key={article._id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <small>
                Published on: {new Date(article.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Videos Section */}
      <h2>Videos</h2>
      <div className="videos-container">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="video" key={video._id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <iframe
                width="560"
                height="315"
                src={video.url.replace("watch?v=", "embed/")} // Convert to embed format
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default MentalHealthEducation;

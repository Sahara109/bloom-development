import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MentalHealthEducation.css"; // Optional CSS file for styling
import bannerImage from "../../assets/images/mental-health-banner.png";

const MentalHealthEducation = () => {
  const [articles, setArticles] = useState([]); // State for articles
  const [videos, setVideos] = useState([]); // State for videos
  const [visibleArticles, setVisibleArticles] = useState(3); // Show 3 articles by default
  const [visibleVideos, setVisibleVideos] = useState(3); // Show 3 videos by default

  useEffect(() => {
    const token = localStorage.getItem("authToken");
  
    if (token) {
      console.log("Fetching articles...");
  
      // Fetch articles
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
  
      // Fetch videos with Authorization Header
      console.log("Fetching videos...");
      axios
        .get("http://localhost:5001/api/videos", {
          headers: { Authorization: `Bearer ${token}` }, // Added Authorization Header
        })
        .then((response) => {
          console.log("Videos fetched:", response.data);
          setVideos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
        });
    } else {
      console.log("No token found in localStorage");
    }
  }, []);
  
  const handleSeeMoreArticles = () => {
    setVisibleArticles(prevCount => prevCount + 3); // Show 3 more articles
  };

  const handleSeeLessArticles = () => {
    setVisibleArticles(3); // Collapse back to the initial number of articles
  };

  const handleSeeMoreVideos = () => {
    setVisibleVideos(prevCount => prevCount + 3); // Show 3 more videos
  };

  const handleSeeLessVideos = () => {
    setVisibleVideos(3); // Collapse back to the initial number of videos
  };

  return (
    <div className="mental-health-education-container">
      <h1>Mental Health Education</h1>

      <div className="banner-container">
        <img src={bannerImage} alt="Mental Health Banner" className="banner-image" />
      </div>

      {/* Articles Section */}
      <h2>Articles</h2>
      <div className="articles-container">
        {articles.length === 0 ? (
          <p>No articles available at the moment.</p>
        ) : (
          articles.slice(0, visibleArticles).map((article) => (
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

      {visibleArticles < articles.length ? (
        <button onClick={handleSeeMoreArticles} className="see-more-btn">
          See More →
        </button>
      ) : (
        <button onClick={handleSeeLessArticles} className="see-more-btn">
          See Less ←
        </button>
      )}

      {/* Videos Section */}
      <h2>Videos</h2>
      <div className="videos-container">
        {videos.length > 0 ? (
          videos.slice(0, visibleVideos).map((video) => (
            <div className="video" key={video._id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <iframe
                width="560"
                height="315"
                src={video.url.replace("watch?v=", "embed/")}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos available at the moment.</p>
        )}
      </div>

      {visibleVideos < videos.length ? (
        <button onClick={handleSeeMoreVideos} className="see-more-btn">
          See More →
        </button>
      ) : (
        <button onClick={handleSeeLessVideos} className="see-more-btn">
          See Less ←
        </button>
      )}
    </div>
  );
};

export default MentalHealthEducation;

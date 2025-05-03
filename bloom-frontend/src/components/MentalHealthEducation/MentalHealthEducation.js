import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MentalHealthEducation.css"; // Optional CSS file for styling
import bannerImage from "../../assets/images/mental-health-banner.png";

const MentalHealthEducation = () => {
  const [articles, setArticles] = useState([]); // State for articles
  const [videos, setVideos] = useState([]); // State for videos
  const [visibleArticles, setVisibleArticles] = useState(3); // Show 3 articles by default
  const [visibleVideos, setVisibleVideos] = useState(3); // Show 3 videos by default
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true); // Add this line


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
          const articlesWithState = response.data.map((article) => ({
            ...article,
            expanded: false,
          }));
          setArticles(articlesWithState);
          setLoadingArticles(false);
        })
        .catch((error) => {
          console.error("Error fetching articles", error);
          setLoadingArticles(false);
        });

      // Fetch videos
      console.log("Fetching videos...");
      axios
        .get("http://localhost:5001/api/videos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Videos fetched:", response.data);
          setVideos(response.data);
          setLoadingVideos(false);
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
          setLoadingVideos(false);
        });
    } else {
      console.log("No token found in localStorage");
      setLoadingArticles(false);
      setLoadingVideos(false);
    }
  }, []);

  const handleSeeMoreArticles = () => {
    setVisibleArticles((prevCount) => prevCount + 3);
  };

  const handleSeeLessArticles = () => {
    setVisibleArticles(3);
  };

  const handleSeeMoreVideos = () => {
    setVisibleVideos((prevCount) => prevCount + 3);
  };

  const handleSeeLessVideos = () => {
    setVisibleVideos(3);
  };

  return (
    <div className="mental-health-education-container">
      <h1>Mental Health Education</h1>

      <div className="banner-container">
        <img src={bannerImage} alt="Mental Health Banner" className="banner-image" />
      </div>

      {/* Articles Section */}
      <div className="section-header">
        <h2 style={{ color: "#4CAF50" }}>Articles for Mental Health</h2>
        <p>
          Explore our collection of articles to learn about mental health and
          well-being. These articles offer valuable insights and guidance on
          maintaining good mental health.
        </p>
      </div>

      <div className="articles-container">
        {loadingArticles ? (
          <p>Loading articles...</p>
        ) : articles.length === 0 ? (
          <p>No articles available at the moment.</p>
        ) : (
          articles.slice(0, visibleArticles).map((article) => {
            const preview = article.content.slice(0, 200);
            return (
              <div className="article" key={article._id}>
                <h3>{article.title}</h3>
                <p>{article.expanded ? article.content : `${preview}...`}</p>
                <Link to={`/article/${article._id}`} className="read-more-btn">
                  <span>📚 Read More →</span>
                </Link>
                <small>
                  Published on: {new Date(article.createdAt).toLocaleString()}
                </small>
              </div>
            );
          })
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
      <div className="section-header">
        <h2 style={{ color: "#4CAF50" }}>Videos for Mental Health</h2>
        <p>
          Watch these informative and inspiring videos to help you understand
          mental health better. These videos provide expert advice and personal
          stories on mental health and well-being.
        </p>
      </div>

      <div className="videos-container">
      {videos.length > 0 ? (
        videos.slice(0, visibleVideos).map((video, index) => (
          <div className="video" key={index}>
            <h3>{video}</h3>
            <p>Description of the video</p>
            <video width="560" height="315" controls>
              <source src={`http://localhost:5001/videos/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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

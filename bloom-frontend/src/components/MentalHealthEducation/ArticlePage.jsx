import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articleImage from "../../assets/images/article-banner.png"; 
import { useNavigate } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams(); // Get article ID from the URL
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("Fetching article...");

      // Fetch article details by ID
      axios
        .get(`http://localhost:5001/api/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Article fetched:", response.data);
          setArticle(response.data);
        })
        .catch((error) => {
          console.error("Error fetching article", error);
        });
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-page-container">
      {/* Article Image */}
      <div className="article-banner">
        <img src={articleImage} alt="Article Banner" className="article-banner-image" />
      </div>

      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <small>
        Published on: {new Date(article.createdAt).toLocaleString()}
      </small>

      <button onClick={() => navigate("/articles")} className="back-button">
      ← Back to Articles
    </button>



      <style jsx>{`
        .article-page-container {
          max-width: 900px;
          margin: auto;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .article-banner {
          width: 30%;
          height: 30%;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }

        .article-banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-page-container h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .article-page-container p {
          font-size: 1.2rem;
          color: #555;
          line-height: 1.6;
          text-align: justify;
        }

        .article-page-container small {
          display: block;
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #777;
        }

      .back-button {
      margin-top: 2rem;
      padding: 0.6rem 1.2rem;
      background-color: #6c63ff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .back-button:hover {
      background-color: #574fd6;
    }

      `}</style>
    </div>
  );
};

export default ArticlePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import articleImage from "../../assets/images/book.png"; 

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Fetch articles from backend
      axios
        .get("http://localhost:5001/api/articles", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setArticles(response.data); // Set articles
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          setError("Failed to fetch articles. Please try again later.");
          setLoading(false); // Stop loading even on error
        });
    } else {
      setError("No authentication token found.");
      setLoading(false); // Stop loading if no token
    }
  }, []);

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue
  }

  return (
    <div className="articles-list-container">
      <h1 className="articles-list-title">Explore Our Articles</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div className="article-card" key={article._id}>
            <Link to={`/article/${article._id}`} className="article-link">
              <div className="article-image">
                <img
                  src={article.image || articleImage} // Fallback to a default image if none is provided
                  alt={article.title}
                  className="article-card-image"
                />
              </div>
              <h3 className="article-card-title">{article.title}</h3>
              <p className="article-card-excerpt">
                {article.content.substring(0, 100)}...
              </p>
              <small className="article-card-date">
                Published on: {new Date(article.createdAt).toLocaleDateString()}
              </small>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .articles-list-container {
            padding: 2rem;
            max-width: 1100px;
            margin: auto;
            background-color: #f8f9fa;
        }

        .articles-list-title {
            font-size: 2.5rem;
            color: #333;
            text-align: center;
            margin-bottom: 2rem;
        }

        .search-bar-container {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .search-input {
            padding: 0.5rem;
            font-size: 1rem;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .article-card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .article-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .article-link {
            text-decoration: none;
            color: inherit;
        }

        .article-image {
            width: 50%;
            height: 200px;
            overflow: hidden;
        }

        .article-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-bottom: 2px solid #ddd;
        }

        .article-card-title {
            font-size: 1.5rem;
            color: #333;
            padding: 1rem;
            font-weight: 600;
        }

        .article-card-excerpt {
            padding: 0 1rem;
            color: #555;
            font-size: 1rem;
            line-height: 1.5;
        }

        .article-card-date {
            display: block;
            text-align: right;
            padding: 0 1rem 1rem;
            font-size: 0.9rem;
            color: #777;
        }
      `}</style>
    </div>
  );
};

export default ArticlesList;

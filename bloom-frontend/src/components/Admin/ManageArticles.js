import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddArticle from './AddArticle';
import UpdateArticle from './UpdateArticle';
import DeleteArticle from './DeleteArticle';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5001';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles');
        console.log('Fetched articles:', response.data); // Debug: Log fetched articles
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error); // Debug: Log error
        setMessage('Error fetching articles.');
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteArticle = (articleId) => {
    setArticles(articles.filter(article => article._id !== articleId));
  };

  return (
    <div>
      <h3>Manage Articles</h3>
      <AddArticle />
      {selectedArticle && <UpdateArticle articleId={selectedArticle._id} />}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.content}</td>
                <td>
                  <button onClick={() => setSelectedArticle(article)}>Update</button>
                  <DeleteArticle articleId={article._id} onDelete={handleDeleteArticle} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No articles found</td>
            </tr>
          )}
        </tbody>
      </table>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ManageArticles;
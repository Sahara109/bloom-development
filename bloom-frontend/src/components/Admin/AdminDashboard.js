import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddArticle from './AddArticle';
import UpdateArticle from './UpdateArticle';


const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [showUpdateArticle, setShowUpdateArticle] = useState(false);
  const [articleToUpdate, setArticleToUpdate] = useState(null);

  useEffect(() => {
    // Fetch the articles from the backend
    const fetchArticles = async () => {
      const response = await axios.get('/api/articles');
      setArticles(response.data);
    };
    
    fetchArticles();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      // Delete the article using API call
      await axios.delete(`/api/articles/${articleId}`);
      
      // Update the UI after deletion (removing the article from the state)
      setArticles(articles.filter(article => article._id !== articleId));
    } catch (error) {
      console.error('Error deleting article', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Button to add a new article */}
      <button onClick={() => setShowAddArticle(true)}>Add Article</button>
      
      {/* List of Articles */}
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            
            {/* Update and Delete Buttons */}
            <button onClick={() => { setShowUpdateArticle(true); setArticleToUpdate(article); }}>
              Update
            </button>
            <button onClick={() => handleDeleteArticle(article._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add Article Form */}
      {showAddArticle && <AddArticle setShowAddArticle={setShowAddArticle} />}

      {/* Update Article Form */}
      {showUpdateArticle && (
        <UpdateArticle
          setShowUpdateArticle={setShowUpdateArticle}
          article={articleToUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

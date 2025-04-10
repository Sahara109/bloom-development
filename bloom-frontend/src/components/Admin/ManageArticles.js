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
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setMessage('Error fetching articles.');
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteArticle = (articleId) => {
    setArticles(articles.filter((article) => article._id !== articleId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Manage Articles</h2>

      {/* Add Article Form */}
      <div style={styles.card}>
        <AddArticle />
      </div>

      {/* Update Form (only when article selected) */}
      {selectedArticle && (
        <div style={styles.card}>
          <h3 style={styles.subHeading}>Editing: {selectedArticle.title}</h3>
          <UpdateArticle articleId={selectedArticle._id} />
        </div>
      )}

      {/* Article Table */}
      <div style={styles.card}>
        <h3 style={styles.subHeading}>All Articles</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Content</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article._id} style={styles.tbodyRow}>
                  <td style={styles.td}>{article.title}</td>
                  <td style={styles.td}>{article.content}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.updateButton }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      ✏️ Update
                    </button>
                    <DeleteArticle
                      articleId={article._id}
                      onDelete={handleDeleteArticle}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.emptyMsg}>No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  subHeading: {
    marginBottom: '1rem',
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  theadRow: {
    backgroundColor: '#6c63ff',
    color: 'white',
    textAlign: 'left',
  },
  th: {
    padding: '12px',
    fontWeight: '600',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tbodyRow: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '12px',
    verticalAlign: 'top',
  },
  button: {
    padding: '8px 12px',
    fontSize: '0.85rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '8px',
    transition: 'box-shadow 0.2s',
  },
  updateButton: {
    backgroundColor: 'rgb(15, 167, 76)',
    color: '#fff',
  },
  emptyMsg: {
    textAlign: 'center',
    padding: '1rem',
    color: '#999',
  },
  message: {
    marginTop: '1rem',
    color: '#d33',
    textAlign: 'center',
  },
};

export default ManageArticles;


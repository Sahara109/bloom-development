import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddArticle from './AddArticle';
import UpdateArticle from './UpdateArticle';
import DeleteArticle from './DeleteArticle';
import ArticleActions from './ArticleActions';
import AdminLayout from "./AdminLayout";
import axiosInstance from '../../utils/axiosInstance';

axios.defaults.baseURL = 'http://localhost:5001';

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setMessage('Error fetching articles.');
      }
    };

    fetchArticles();
  }, []);

  // Debug logs to track state
  console.log('Current articles:', articles);
  console.log('Selected article:', selectedArticle);

  const handleOpenUpdate = (article) => {
    setSelectedArticle(article);
    setShowUpdateModal(true);
  };

  const handleOpenDelete = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = (updatedArticle) => {
    if (!updatedArticle || !updatedArticle._id) {
      console.error('handleUpdateSuccess called with invalid article:', updatedArticle);
      return;
    }

    setArticles((prev) =>
      prev.map((article) =>
        article && article._id === updatedArticle._id ? updatedArticle : article
      )
    );
    setShowUpdateModal(false);
    setSelectedArticle(null);
  };

  const handleDeleteSuccess = (deletedId) => {
    if (!deletedId) {
      console.error('handleDeleteSuccess called with invalid id:', deletedId);
      return;
    }

    setArticles((prev) => prev.filter((article) => article && article._id !== deletedId));
    setShowDeleteModal(false);
    setSelectedArticle(null);
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>📝 Manage Articles</h2>

        {/* Add Article Form */}
        <div style={styles.card}>
          <AddArticle />
        </div>

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
                articles.map((article) => 
                  article && article._id ? (
                    <tr key={article._id} style={styles.tbodyRow}>
                      <td style={styles.td}>{article.title}</td>
                      <td style={styles.td}>{article.content}</td>
                      <td style={styles.td}>
                        <ArticleActions
                          article={article}
                          onUpdate={() => handleOpenUpdate(article)}
                          onDelete={() => handleOpenDelete(article)}
                        />
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan="3" style={styles.emptyMsg}>No articles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {showUpdateModal && selectedArticle && selectedArticle._id && (
          <UpdateArticle
            articleId={selectedArticle._id}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={() => setShowUpdateModal(false)}
          />
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedArticle && selectedArticle._id && (
          <DeleteArticle
            articleId={selectedArticle._id}
            onDeleteSuccess={handleDeleteSuccess}
            onClose={() => setShowDeleteModal(false)}
          />
        )}

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </AdminLayout>
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

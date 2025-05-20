import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArticle = ({ articleId, onClose, onUpdateSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setMessage('You must be logged in to view this article.');
        return;
      }

      try {
        const response = await axios.get(`/api/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setMessage('');
      } catch (error) {
        console.error('Fetch article error:', error);
        setMessage('Error fetching article.');
      }
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      setMessage('You must be logged in to update an article.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.put(
        `/api/articles/${articleId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Article updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess(response.data); // Pass updated article
      if (onClose) onClose();
    } catch (error) {
      console.error('Update article error:', error);
      setMessage('Error updating article.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Update Article</h3>
        <form onSubmit={handleUpdateArticle}>
          <input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <textarea
            placeholder="Article Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            style={styles.textarea}
            disabled={loading}
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" style={styles.saveButton} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button type="button" onClick={onClose} style={styles.cancelButton} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    marginRight: '0.5rem',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ccc',
    color: '#000',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default UpdateArticle;

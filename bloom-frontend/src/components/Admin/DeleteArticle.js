import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const DeleteArticle = ({ articleId, onDeleteSuccess, onClose }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this article? This action cannot be undone.');

    if (!confirmed) return;

    setLoading(true);
    setMessage('');
    try {
      await axios.delete(`/api/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (onDeleteSuccess) onDeleteSuccess(articleId);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error deleting article:', error);
      setMessage('❌ Error deleting article. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3>Delete Article</h3>
        <p>Are you sure you want to delete this article?</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleDelete} style={styles.deleteButton} disabled={loading}>
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button onClick={onClose} style={styles.cancelButton} disabled={loading}>
            Cancel
          </button>
        </div>
        {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
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
    textAlign: 'center',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e31802',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    marginRight: '0.5rem',
    fontWeight: 'bold',
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

export default DeleteArticle;

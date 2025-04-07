import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const DeleteArticle = ({ articleId, onDelete }) => {
  const { auth } = useAuth();

  const handleDeleteArticle = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await axios.delete(`/api/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      onDelete(articleId);
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('❌ Error deleting article.');
    }
  };

  return (
    <button
      onClick={handleDeleteArticle}
      style={{
        padding: '8px 12px',
        fontSize: '0.85rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor:'rgb(227, 24, 2)',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease',
      }}
    >
      🗑️ Delete
    </button>
  );
};

export default DeleteArticle;

// src/components/Admin/DeleteArticle.js
import React from 'react';
import axios from 'axios';

const DeleteArticle = ({ articleId, onDelete }) => {
  const handleDeleteArticle = async () => {
    try {
      await axios.delete(`/api/articles/${articleId}`);
      onDelete(articleId);  // callback to remove article from the UI after deletion
    } catch (error) {
      alert('Error deleting article.');
    }
  };

  return (
    <button onClick={handleDeleteArticle}>Delete Article</button>
  );
};

export default DeleteArticle;

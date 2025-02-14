// src/components/Admin/UpdateArticle.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArticle = ({ articleId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${articleId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setMessage('Error fetching article.');
      }
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/articles/${articleId}`, {
        title,
        content,
      });
      setMessage('Article updated successfully!');
    } catch (error) {
      setMessage('Error updating article.');
    }
  };
  

  return (
    <div>
      <h3>Update Article</h3>
      <form onSubmit={handleUpdateArticle}>
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Article Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Update Article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateArticle;

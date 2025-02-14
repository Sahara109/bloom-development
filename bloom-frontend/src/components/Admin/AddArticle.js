// src/components/Admin/AddArticle.js
import React, { useState } from 'react';
import axios from 'axios';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/articles', {
        title,
        content,
      });
      setMessage('Article added successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Error adding article.');
    }
  };
  

  return (
    <div>
      <h3>Add Article</h3>
      <form onSubmit={handleAddArticle}>
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
        <button type="submit">Add Article</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddArticle;

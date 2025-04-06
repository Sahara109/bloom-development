import React, { useState } from 'react';
import axios from 'axios';

const AddVideo = ({ onVideoAdded }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/videos', { title, url });
      setMessage('Video added successfully!');
      setTitle('');
      setUrl('');
      onVideoAdded(response.data); // Notify parent component
    } catch (error) {
      setMessage('Error adding video.');
    }
  };

  return (
    <div>
      <h3>Add Video</h3>
      <form onSubmit={handleAddVideo}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Add Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddVideo;
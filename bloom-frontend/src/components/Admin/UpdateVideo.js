import React, { useState } from 'react';
import axios from 'axios';

const UpdateVideo = ({ video, onVideoUpdated }) => {
  const [title, setTitle] = useState(video.title);
  const [url, setUrl] = useState(video.url);
  const [message, setMessage] = useState('');

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/videos/${video._id}`, { title, url });
      setMessage('Video updated successfully!');
      onVideoUpdated({ ...video, title, url }); // Notify parent component
    } catch (error) {
      setMessage('Error updating video.');
    }
  };

  return (
    <div>
      <h3>Update Video</h3>
      <form onSubmit={handleUpdateVideo}>
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
        <button type="submit">Update Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateVideo;
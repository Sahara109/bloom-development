import React, { useState } from 'react';
import axios from 'axios';

const UpdateVideo = ({ video, onVideoUpdated }) => {
  const [title, setTitle] = useState(video.title);
  const [url, setUrl] = useState(video.url);
  const [description, setDescription] = useState(video.description || ''); // Add description field
  const [message, setMessage] = useState('');

  const handleUpdateVideo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
      if (!token) {
        setMessage('You must be logged in to update the video.');
        return;
      }

      // Send the update request with the token in the headers
      const updatedVideo = { title, url, description }; // Include description in the update
      await axios.put(
        `/api/videos/${video._id}`,
        updatedVideo,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the auth token in the header
          },
        }
      );

      setMessage('Video updated successfully!');
      onVideoUpdated({ ...video, title, url, description }); // Notify parent component of the update
    } catch (error) {
      console.error('Error updating video:', error);
      setMessage('Error updating video. Please try again later.');
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
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Add a textarea for the description
          required
        />
        <button type="submit">Update Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateVideo;

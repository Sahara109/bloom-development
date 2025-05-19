import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateVideo = ({ video, onVideoUpdated }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || '');
  const [videoFile, setVideoFile] = useState(null);  // New file state
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTitle(video.title);
    setDescription(video.description || '');
    setVideoFile(null); // reset file input on video change
    setMessage('');
  }, [video]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('You must be logged in to update the video.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      if (videoFile) {
        formData.append('video', videoFile);  // the key depends on your backend multer config
      }

      await axios.put(
        `/api/videos/${video._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  // important for file uploads
          },
        }
      );

      setMessage('Video updated successfully!');
      // Optionally update parent with new info - you may want to fetch updated video from server here
      onVideoUpdated({ ...video, title, description }); 
      setVideoFile(null);  // reset file after upload
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
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
        />
        <button type="submit">Update Video</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateVideo;

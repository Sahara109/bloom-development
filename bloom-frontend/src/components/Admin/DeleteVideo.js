import React from 'react';
import axios from 'axios';

const DeleteVideo = ({ videoId, onDelete }) => {
  const handleDeleteVideo = async () => {
    try {
      await axios.delete(`/api/videos/${videoId}`);
      onDelete(videoId); // Notify parent component
    } catch (error) {
      alert('Error deleting video.');
    }
  };

  return (
    <button onClick={handleDeleteVideo}>Delete Video</button>
  );
};

export default DeleteVideo;
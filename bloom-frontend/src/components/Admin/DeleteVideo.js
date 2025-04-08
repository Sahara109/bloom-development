import React from 'react';
import axios from 'axios';

const DeleteVideo = ({ videoId, onDelete }) => {
  const handleDeleteVideo = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
      if (!token) {
        alert('You must be logged in to delete a video.');
        return;
      }

      // Send the delete request with the token in the headers
      await axios.delete(`/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the auth token in the header
        },
      });

      onDelete(videoId); // Notify parent component to remove the deleted video
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video. Please try again later.');
    }
  };

  return (
    <button 
      onClick={handleDeleteVideo} 
      style={styles.deleteButton}
      className="delete-button"
    >
      <span style={styles.deleteIcon}>🗑️</span> Delete 
    </button>
  );
};

const styles = {
  deleteButton: {
    backgroundColor: '#e74c3c',  
    color: '#fff',               
    border: 'none',             
    borderRadius: '5px',        
    padding: '10px 20px',        
    fontSize: '12px',            
    cursor: 'pointer',          
    transition: 'background-color 0.3s ease', 
    display: 'flex',             
    alignItems: 'center',        
    justifyContent: 'center',   
  },
  deleteIcon: {
    marginRight: '8px',  // Add some space between the icon and text
  },
};

export default DeleteVideo;

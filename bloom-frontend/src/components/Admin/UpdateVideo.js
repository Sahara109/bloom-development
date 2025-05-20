import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateVideo = ({ video, onVideoUpdated }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description || '');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTitle(video.title);
    setDescription(video.description || '');
    setVideoFile(null);
    setMessage('');
  }, [video]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('❌ You must be logged in to update the video.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (videoFile) formData.append('video', videoFile);

      await axios.put(`/api/videos/${video._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Video updated successfully!');
      onVideoUpdated({ ...video, title, description });
      setVideoFile(null);
    } catch (error) {
      console.error('Error updating video:', error);
      setMessage('❌ Error updating video. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Update Video</h3>
      <form onSubmit={handleUpdateVideo} style={styles.form}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Update Video
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
    background: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
};

export default UpdateVideo;

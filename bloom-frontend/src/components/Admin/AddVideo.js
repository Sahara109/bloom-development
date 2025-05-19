import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 

const AddVideo = ({ onVideoAdded }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const { auth } = useAuth();

  const handleAddVideo = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      setMessage('❌ You must be logged in to add a video.');
      return;
    }

    if (!file) {
      setMessage('❌ Please select a video file to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', file); // The key 'video' must match your backend's expected field name

      const response = await axios.post('/api/videos', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Video added successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
      onVideoAdded(response.data);
    } catch (error) {
      console.error('Upload error:', error.response || error.message);
      setMessage('❌ Error adding video.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Video</h2>
        <form onSubmit={handleAddVideo} style={styles.form}>
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
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
          <button type="submit" style={styles.button}>
            ➕ Publish Video
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    transition: 'border 0.3s ease',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
  },
};

export default AddVideo;

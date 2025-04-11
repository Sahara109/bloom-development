import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AddExercise = ({ onExerciseAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [message, setMessage] = useState('');

  const convertToEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/exercises', {
        name,
        description,
        image,
        video: convertToEmbedUrl(video),
      });
      setMessage('✅ Exercise added successfully!');
      setName('');
      setDescription('');
      setImage('');
      setVideo('');
      onExerciseAdded(response.data);
    } catch (error) {
      console.error('Add exercise error:', error.response?.data);
      setMessage(error.response?.data?.message || '❌ Error adding exercise.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Exercise</h2>
        <form onSubmit={handleAddExercise} style={styles.form}>
          <input
            type="text"
            placeholder="Exercise Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Exercise Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={styles.textarea}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />
          <input
            type="url"
            placeholder="YouTube Video URL"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            ➕ Add Exercise
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    padding: '2rem',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f7fa',
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

export default AddExercise;

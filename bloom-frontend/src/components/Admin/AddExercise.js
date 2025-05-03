import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AddExercise = ({ onExerciseAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState(null); // File instead of URL
  const [steps, setSteps] = useState('');
  const [benefits, setBenefits] = useState('');
  const [message, setMessage] = useState('');

  const handleAddExercise = async (e) => {
    e.preventDefault();

    if (video && !video.type.startsWith("video")) {
      setMessage("❌ Please upload a valid video file.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image); // image is a URL or file path
    formData.append('video', video); // file upload
    formData.append('steps', steps);
    formData.append('benefits', benefits);

    try {
      const response = await axiosInstance.post('/exercises', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('✅ Exercise added successfully!');
      setName('');
      setDescription('');
      setImage('');
      setVideo(null);
      setSteps('');
      setBenefits('');
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
        <form onSubmit={handleAddExercise} style={styles.form} encType="multipart/form-data">
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
            rows={3}
            style={styles.textarea}
          />
          <input
            type="text"
            placeholder="Image URL or path"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Steps (e.g., 1. Do this.\n2. Do that.)"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={5}
            style={styles.textarea}
          />
          <textarea
            placeholder="Benefits (e.g., 1. Helps you relax.\n2. Improves focus.)"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            rows={4}
            style={styles.textarea}
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

export default AddExercise;

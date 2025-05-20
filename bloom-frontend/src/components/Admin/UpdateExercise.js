import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const UpdateExercise = ({ exercise, onExerciseUpdated }) => {
  const [name, setName] = useState(exercise?.name || '');
  const [description, setDescription] = useState(exercise?.description || '');
  const [image, setImage] = useState(exercise?.image || '');
  const [video, setVideo] = useState(null);
  const [steps, setSteps] = useState(exercise?.steps?.join('\n') || '');
  const [benefits, setBenefits] = useState(exercise?.benefits?.join('\n') || '');
  const [message, setMessage] = useState('');

  const handleUpdateExercise = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('steps', JSON.stringify(steps.split('\n')));
    formData.append('benefits', JSON.stringify(benefits.split('\n')));

    if (video) {
      formData.append('video', video);
    }

    try {
      await axiosInstance.put(`/exercises/${exercise._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Exercise updated successfully!');
      onExerciseUpdated({
        ...exercise,
        name,
        description,
        image,
        steps: steps.split('\n'),
        benefits: benefits.split('\n'),
        video: video ? video.name : exercise.video,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating exercise.');
      console.error('Update error:', error.response?.data);
    }
  };

  if (!exercise) return <p>Please select an exercise to update.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Exercise</h2>
      <form onSubmit={handleUpdateExercise} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Steps <span style={styles.hint}>(One step per line)</span></label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Benefits <span style={styles.hint}>(One benefit per line)</span></label>
          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            style={styles.input}
          />
        </div>

        {!video && exercise.video && (
          <div style={styles.field}>
            <label style={styles.label}>Current Video Preview</label>
            <video
              src={`http://localhost:3000/videos/${exercise.video}`}
              controls
              width="100%"
              style={styles.video}
            />
          </div>
        )}

        <button type="submit" style={styles.button}>Update Exercise</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
  },
  hint: {
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#888',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
    minHeight: '80px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  video: {
    borderRadius: '8px',
    marginTop: '10px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: 'green',
  },
};

export default UpdateExercise;

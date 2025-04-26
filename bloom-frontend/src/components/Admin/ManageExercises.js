import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import AddExercise from './AddExercise';
import UpdateExercise from './UpdateExercise';
import DeleteExercise from './DeleteExercise';
import AdminLayout from "./AdminLayout";

const ManageExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axiosInstance.get('/exercises');
        setExercises(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching exercises.');
        console.error('Fetch error:', error.response?.data);
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseAdded = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  const handleExerciseUpdated = (updatedExercise) => {
    setExercises(
      exercises.map((exercise) =>
        exercise._id === updatedExercise._id ? updatedExercise : exercise
      )
    );
    setSelectedExercise(null);
  };

  const handleDeleteExercise = (exerciseId) => {
    setExercises(exercises.filter((exercise) => exercise._id !== exerciseId));
  };

  return (
    <AdminLayout>
    <div style={styles.container}>
      <h2 style={styles.heading}>💪 Manage Exercises</h2>

      <div style={styles.card}>
        <AddExercise onExerciseAdded={handleExerciseAdded} />
      </div>

      {selectedExercise && (
        <div style={styles.card}>
          <h3 style={styles.subHeading}>Editing: {selectedExercise.name}</h3>
          <UpdateExercise
            exercise={selectedExercise}
            onExerciseUpdated={handleExerciseUpdated}
          />
        </div>
      )}

      <div style={styles.card}>
        <h3 style={styles.subHeading}>All Exercises</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Video</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.length > 0 ? (
              exercises.map((exercise) => (
                <tr key={exercise._id} style={styles.tbodyRow}>
                  <td style={styles.td}>{exercise.name}</td>
                  <td style={styles.td}>{exercise.description}</td>
                  <td style={styles.td}>
                    {exercise.video ? (
                      <a href={exercise.video} target="_blank" rel="noopener noreferrer">
                        ▶️ Watch
                      </a>
                    ) : (
                      'No video'
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.updateButton }}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      ✏️ Update
                    </button>
                    <DeleteExercise
                      exerciseId={exercise._id}
                      onDelete={handleDeleteExercise}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.emptyMsg}>No exercises found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
    </AdminLayout>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#eef2f7',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2d2d2d',
    textAlign: 'center',
  },
  subHeading: {
    marginBottom: '1rem',
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  theadRow: {
    backgroundColor: '#6c63ff',
    color: 'white',
    textAlign: 'left',
  },
  th: {
    padding: '12px',
    fontWeight: '600',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tbodyRow: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '12px',
    verticalAlign: 'top',
  },
  button: {
    padding: '8px 12px',
    fontSize: '0.85rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '8px',
    transition: 'box-shadow 0.2s',
  },
  updateButton: {
    backgroundColor: '#0fa74c',
    color: '#fff',
  },
  emptyMsg: {
    textAlign: 'center',
    padding: '1rem',
    color: '#999',
  },
  message: {
    marginTop: '1rem',
    color: '#d33',
    textAlign: 'center',
  },
};

export default ManageExercises;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExercise from './AddExercise';
import UpdateExercise from './UpdateExercise';
import AdminLayout from './AdminLayout';
import axiosInstance from '../../utils/axiosInstance';
import { toKebabCase } from '../../utils/utils';  // kebab-case utility
import KebabMenu from './KebabMenu';  // KebabMenu for actions

axios.defaults.baseURL = 'http://localhost:5001';

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
        console.error('Error fetching exercises:', error);
        setMessage('Error fetching exercises.');
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseAdded = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  const handleExerciseUpdated = (updatedExercise) => {
    setExercises(exercises.map(ex => ex._id === updatedExercise._id ? updatedExercise : ex));
    setSelectedExercise(null);
  };

  const handleDeleteExercise = (exerciseId) => {
    setExercises(exercises.filter(ex => ex._id !== exerciseId));
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>🏋️ Manage Exercises</h2>

        {/* Add Exercise Form */}
        <div style={styles.card}>
          <AddExercise onExerciseAdded={handleExerciseAdded} />
        </div>

        {/* Update Exercise Form */}
        {selectedExercise && (
          <div style={styles.card}>
            <h3 style={styles.subHeading}>Editing: {selectedExercise.name}</h3>
            <UpdateExercise exercise={selectedExercise} onExerciseUpdated={handleExerciseUpdated} />
          </div>
        )}

        {/* Exercise Table */}
        <div style={styles.card}>
          <h3 style={styles.subHeading}>All Exercises</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>URL Slug</th>
                <th style={styles.th}>Video URL</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <tr key={exercise._id} style={styles.tbodyRow}>
                    <td style={styles.td}>{exercise.name}</td>
                    <td style={styles.td}>{toKebabCase(exercise.name)}</td>
                    <td style={styles.td}>{exercise.video || 'No video URL'}</td>
                    <td style={styles.td}>{exercise.description || 'No description provided'}</td>
                    <td style={styles.td}>
                      <KebabMenu
                        onEdit={() => setSelectedExercise(exercise)}
                        onDelete={() => handleDeleteExercise(exercise._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.emptyMsg}>No exercises found.</td>
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
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
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

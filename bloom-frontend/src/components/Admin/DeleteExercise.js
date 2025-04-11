import React from 'react';
import axiosInstance from '../../utils/axiosInstance';

const DeleteExercise = ({ exerciseId, onDelete }) => {
  const handleDeleteExercise = async () => {
    try {
      await axiosInstance.delete(`/exercises/${exerciseId}`);
      onDelete(exerciseId);
    } catch (error) {
      alert(error.response?.data?.message || '❌ Error deleting exercise.');
    }
  };

  return (
    <button onClick={handleDeleteExercise} style={styles.button}>
      🗑️ Delete Exercise
    </button>
  );
};

const styles = {
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.95rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    marginTop: '0.5rem',
  },
};

export default DeleteExercise;

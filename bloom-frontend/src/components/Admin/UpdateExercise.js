import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const UpdateExercise = ({ exercise, onExerciseUpdated }) => {
  const [name, setName] = useState(exercise?.name || '');
  const [description, setDescription] = useState(exercise?.description || '');
  const [image, setImage] = useState(exercise?.image || ''); // New image state
  const [video, setVideo] = useState(exercise?.video || '');
  const [message, setMessage] = useState('');

  const convertToEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleUpdateExercise = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/exercises/${exercise._id}`, {
        name,
        description,
        image, // Include image
        video: convertToEmbedUrl(video),
      });
      setMessage('Exercise updated successfully!');
      onExerciseUpdated({ ...exercise, name, description, image, video });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating exercise.');
      console.error('Update error:', error.response?.data);
    }
  };

  if (!exercise) {
    return <p>Please select an exercise to update.</p>;
  }

  return (
    <div>
      <h3>Update Exercise</h3>
      <form onSubmit={handleUpdateExercise}>
        <input
          type="text"
          placeholder="Exercise Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Exercise Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* New image input */}
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="url"
          placeholder="YouTube Video URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          required
        />
        <button type="submit">Update Exercise</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateExercise;

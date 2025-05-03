import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const UpdateExercise = ({ exercise, onExerciseUpdated }) => {
  const [name, setName] = useState(exercise?.name || '');
  const [description, setDescription] = useState(exercise?.description || '');
  const [image, setImage] = useState(exercise?.image || ''); // New image state
  const [video, setVideo] = useState(null); // For file upload
  const [videoUrl, setVideoUrl] = useState(exercise?.video || ''); // For video URL
  const [steps, setSteps] = useState(exercise?.steps || ''); // New steps state
  const [benefits, setBenefits] = useState(exercise?.benefits || ''); // New benefits state
  const [message, setMessage] = useState('');

  const convertToEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleUpdateExercise = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('steps', steps);
    formData.append('benefits', benefits);
    
    // Handle video input
    if (video) {
      formData.append('video', video); // If video file is uploaded
    } else if (videoUrl) {
      formData.append('video', convertToEmbedUrl(videoUrl)); // If video URL is provided
    }

    try {
      await axiosInstance.put(`/exercises/${exercise._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Exercise updated successfully!');
      onExerciseUpdated({
        ...exercise,
        name,
        description,
        image,
        steps,
        benefits,
        video: videoUrl || video,
      });
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
        {/* Image input */}
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {/* Steps input */}
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
        {/* Benefits input */}
        <textarea
          placeholder="Benefits"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          required
        />
        {/* Video file upload */}
              <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
/>

{/* Preview existing video if it's already uploaded */}
{exercise.video && !videoUrl && (
  <video
    src={`http://localhost:3000/videos/${exercise.video}`}
    controls
    width="400"
  />
)}

        {/* Video URL input (optional) */}
        {!video && (
          <input
            type="url"
            placeholder="YouTube Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        )}
        <button type="submit">Update Exercise</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateExercise;

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './MoodCheckIn.css';


const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😞', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Sleepy' },
];

const MoodCheckIn = () => {
  const { auth } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!selectedMood) {
      setMessage('Please select a mood.');
      return;
    }

    if (!auth.user?.id) {
      setMessage('Please log in to check in your mood.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post(
        '/api/mood/checkin',
        {
          userId: auth.user.id,
          mood: selectedMood.emoji,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMessage(`Mood "${selectedMood.label}" logged successfully!`);
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg ||
        err.message ||
        'An error occurred while logging your mood.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-checkin-container">
      <h2 style={{ color: 'black' }}>Track Your Mood</h2>

      <div className="mood-card">
        <h3>How are you feeling today?</h3>

        <div className="mood-buttons">
          {moodOptions.map((moodObj, index) => (
            <button
              key={index}
              aria-label={`Mood ${moodObj.label}`}
              className={`mood-button ${selectedMood?.emoji === moodObj.emoji ? 'selected' : ''}`}
              onClick={() => setSelectedMood(moodObj)}
            >
              <div>{moodObj.emoji}</div>
              <span className="mood-label">{moodObj.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCheckIn}
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Logging your mood...' : 'Submit'}
        </button>

        {loading && <div className="loading-text">Loading...</div>}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default MoodCheckIn;

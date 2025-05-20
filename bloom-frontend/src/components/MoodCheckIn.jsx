import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

      {/* Inline styling */}
      <style jsx>{`
        .mood-checkin-container {
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: 500px;
          margin: 20px auto;
          text-align: center;
        }

        .mood-card h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .mood-buttons {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .mood-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 2rem;
          padding: 10px;
          width: 70px;
          height: 90px;
          border: 2px solid transparent;
          background-color: #f0f0f0;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s ease;
          color: #333;
        }

        .mood-label {
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .mood-button.selected {
          background-color: #6c74f7;
          color: white;
          border-color: #6c74f7;
          transform: scale(1.05);
        }

        .mood-button:hover {
          background-color: #ddd;
        }

        .submit-button {
          padding: 12px 20px;
          background-color: #6c74f7;
          color: white;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }

        .submit-button:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }

        .loading-text {
          margin-top: 10px;
          font-size: 1rem;
          color: #777;
        }

        .message {
          margin-top: 10px;
          font-size: 1rem;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default MoodCheckIn;

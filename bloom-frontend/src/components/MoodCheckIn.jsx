import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ✅ import your context

const moods = ['😊', '😌', '😐', '😞', '😡', '😴'];

const MoodCheckIn = () => {
  const { auth } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(auth);

  const handleCheckIn = async () => {
    console.log(auth.user);

    if (!selectedMood) {
      setMessage("Please select a mood.");
      return;
    }

    if (!auth.user?.id) {
      setMessage("Please log in and select a mood.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        '/api/mood/checkin',
        {
          userId: auth.user.id,
          mood: selectedMood,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMessage('Mood logged successfully!');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error logging mood.');
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
          {moods.map((mood, i) => (
            <button
              key={i}
              className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
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

      {/* Style block inside the main return */}
      <style jsx>{`
        .mood-checkin-container {
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: 400px;
          margin: 20px auto;
          text-align: center;
        }

        .mood-checkin-container h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .mood-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .mood-button {
          font-size: 2rem;
          padding: 10px 20px;
          border: 2px solid transparent;
          background-color: #f0f0f0;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 0.3s ease, transform 0.2s ease;
          color: #333;
        }

        .mood-button.selected {
          background-color: #6c74f7;
          color: white;
          border-color: #6c74f7;
          transform: scale(1.1);
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

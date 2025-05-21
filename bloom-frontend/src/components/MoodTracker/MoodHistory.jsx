import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const moodDetails = {
  '😊': 'Happy',
  '😌': 'Calm',
  '😐': 'Neutral',
  '😞': 'Sad',
  '😡': 'Angry',
  '😴': 'Tired',
};

const MoodHistory = () => {
  const { auth } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const res = await axios.get(`/api/mood/${auth.user.id}/history`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching mood history:', err);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.id) fetchMoodHistory();
  }, [auth]);

  if (loading) return <p>Loading mood history...</p>;

  if (history.length === 0)
    return (
      <div className="p-4 bg-white shadow rounded mt-4 text-center text-gray-600">
        <h2 className="text-xl mb-3" style={{ color: 'black' }}>
          Mood History 🫶🏻
        </h2>
        <p>No mood entries recorded yet. Start tracking your mood today!</p>
      </div>
    );

  return (
    <div className="p-4 bg-white shadow rounded mt-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4 text-center" style={{ color: 'black' }}>
        Mood History 🫶🏻
      </h2>
      <div>
        {history.map((entry, idx) => {
          const dateStr = new Date(entry.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          const moodEmoji = entry.mood;
          const moodLabel = moodDetails[moodEmoji] || 'Unknown';

          return (
            <div
              key={entry._id}
              className={`flex justify-between items-center py-3 ${
                idx < history.length - 1 ? 'border-b border-gray-200' : ''
              } hover:bg-gray-50 transition-colors`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <div style={{ color: '#555', fontWeight: '500' }}>{dateStr}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{moodEmoji}</span>
                <span style={{ color: '#777', fontStyle: 'italic' }}>{moodLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodHistory;

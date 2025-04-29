import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl mb-3" style={{ color: 'black' }}>Mood History 🫶🏻</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry._id}>
            {new Date(entry.date).toLocaleDateString()} — <span className="text-xl">{entry.mood}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodHistory;

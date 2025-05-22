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
    <div className="p-6 bg-white shadow-md rounded-lg mt-6 max-w-3xl mx-auto">
  {/* Big, bold, cute title */}
  <div className="w-full text-center my-4">
   <h2 style={{ color: "rgb(8, 11, 8)" }}>Mood History 🫶🏻</h2>
</div>


  {/* Table container */}
  <div className="overflow-x-auto">
    <table className="min-w-full border-separate border-spacing-y-2">
      <thead>
        <tr className="bg-pink-100 text-pink-800 text-left">
          <th className="py-3 px-5 rounded-l-lg">📅 Date</th>
          <th className="py-3 px-5">Mood</th>
          <th className="py-3 px-5 rounded-r-lg">Label</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry) => {
          const dateStr = new Date(entry.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          const moodEmoji = entry.mood;
          const moodLabel = moodDetails[moodEmoji] || 'Unknown';

          return (
            <tr
              key={entry._id}
              className="bg-white shadow hover:shadow-lg transition duration-300 rounded-lg"
            >
              <td className="py-3 px-5 rounded-l-lg text-gray-700 font-medium">
                {dateStr}
              </td>
              <td className="py-3 px-5 text-2xl">{moodEmoji}</td>
              <td className="py-3 px-5 rounded-r-lg text-gray-500 italic">
                {moodLabel}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>



  );
};

export default MoodHistory;

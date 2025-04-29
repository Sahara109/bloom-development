import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const moodMap = {
    '😊': 5, // Happy
    '😌': 4, // Content / Calm
    '😐': 3, // Neutral
    '😞': 2, // Sad
    '😡': 1, // Angry
    '😴': 0, // Tired
  };
  

const MoodGraph = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const res = await axios.get(`/api/mood/${auth.user.id}/history`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const formatted = res.data.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString(),
          mood: moodMap[entry.mood] || 0,
        }));

        setData(formatted);
      } catch (err) {
        console.error('Error loading graph data:', err);
      }
    };

    if (auth?.user?.id) fetchMoodHistory();
  }, [auth]);

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
    <h2 className="text-xl mb-3" style={{ color: 'black' }}>Mood Trend 📈</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            label={{
              value: 'Date',
              position: 'insideBottom',
              fontSize: 14,
              dy: 10,
            }}
          />
          <YAxis
            domain={[0, 5]}
            tickCount={6}
            tickFormatter={(value) => ['😴', '😡', '😞', '😐', '😌', '😊'][value]} 
            label={{
                value: 'Mood',
                angle: -90,
                position: 'insideLeft',
                fontSize: 14,
                dx: -10,
            }}
            />

          
          <Tooltip
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value) => `Mood Score: ${value}`}
            wrapperStyle={{ fontSize: '14px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodGraph;

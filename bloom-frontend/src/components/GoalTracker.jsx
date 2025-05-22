import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GoalTracker = () => {
  const { auth } = useAuth();
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalFreq, setNewGoalFreq] = useState(7);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      if (!auth.user?.id) return;
      try {
        const res = await axios.get(`/api/goals/${auth.user.id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setGoals(res.data);
      } catch (err) {
        setMessage('Failed to fetch goals');
      }
    };

    fetchGoals();
  }, [auth.user?.id, auth.token]);

  const handleCreateGoal = async () => {
    if (!newGoalTitle) {
      setMessage('Please enter a goal title');
      return;
    }
    try {
      const res = await axios.post(
        '/api/goals/create',
        {
          userId: auth.user.id,
          title: newGoalTitle,
          targetFrequency: newGoalFreq,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setGoals([...goals, res.data.goal]);
      setNewGoalTitle('');
      setNewGoalFreq(7);
      setMessage('Goal created!');
    } catch {
      setMessage('Error creating goal');
    }
  };

  const handleMarkProgress = async (goalId) => {
    try {
      const res = await axios.post(
        '/api/goals/progress',
        {
          userId: auth.user.id,
          goalId,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setGoals(goals.map((g) => (g._id === goalId ? res.data.goal : g)));
    } catch {
      setMessage('Error updating progress');
    }
  };

  const responsiveStyles = `
    @media (max-width: 1024px) {
      .goal-container {
        padding: 1.5rem;
      }
    }
    @media (max-width: 768px) {
      .goal-inputs {
        flex-direction: column;
        align-items: stretch;
      }
      .goal-inputs input,
      .goal-inputs button {
        width: 100% !important;
      }
    }
    @media (max-width: 428px) {
      .goal-title {
        font-size: 1rem !important;
      }
      .progress-text {
        font-size: 0.85rem !important;
      }
      .complete-text {
        font-size: 1.1rem !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
          <div
          className="goal-container"
          style={{
            width: '90%',
            maxWidth: '600px',
            margin: '2rem auto',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '2rem',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #ebc3f5, #a2daf2)',
            borderRadius: 12,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >


        <h2 style={{ textAlign: 'center', color: '#4a2ca9', marginBottom: '1.5rem' }}>
          Set a New Goal
        </h2>

        <div className="goal-inputs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Goal description"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            style={{
              flex: '2 1 300px',
              padding: '0.6rem',
              borderRadius: 8,
              border: 'none',
              fontSize: '1rem',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
            }}
          />
          <input
            type="number"
            min="1"
            placeholder="Times per week"
            value={newGoalFreq}
            onChange={(e) => setNewGoalFreq(Number(e.target.value))}
            style={{
              width: 100,
              padding: '0.6rem',
              borderRadius: 8,
              border: 'none',
              fontSize: '1rem',
              textAlign: 'center',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
            }}
          />
          <button
            onClick={handleCreateGoal}
            style={{
              backgroundColor: '#4a2ca9',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.8rem',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(74, 44, 169, 0.7)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#381f70')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a2ca9')}
          >
            Create Goal
          </button>
        </div>

        {message && (
          <p style={{ textAlign: 'center', color: '#4a148c', fontWeight: 500 }}>{message}</p>
        )}

        <h2 style={{ textAlign: 'center', color: '#4a2ca9', marginBottom: '1rem' }}>Your Goals</h2>

        {goals.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#3e2a6e', fontWeight: '600' }}>No goals yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {goals.map((goal) => {
              const progressPercent = (goal.progressCount / goal.targetFrequency) * 100;

              return (
                <div
                  key={goal._id}
                  style={{
                    backgroundColor: '#ede7f6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    padding: '1rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  <div className="goal-title" style={{ fontSize: '1.15rem', fontWeight: '700', color: '#311b92' }}>
                    {goal.title}
                  </div>

                  <div style={{ height: 18, backgroundColor: '#b39ddb', borderRadius: 12, overflow: 'hidden', width: '100%' }}>
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        backgroundColor: '#673ab7',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>

                  <div className="progress-text" style={{ fontSize: '0.95rem', color: '#512da8' }}>
                    Progress: {goal.progressCount} / {goal.targetFrequency}
                  </div>

                  <button
                    onClick={() => handleMarkProgress(goal._id)}
                    style={{
                      backgroundColor: '#512da8',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                    }}
                  >
                    Mark Progress
                  </button>

                  {goal.progressCount >= goal.targetFrequency && (
                    <div className="complete-text" style={{ fontSize: '1rem', color: '#1b5e20', fontWeight: 'bold' }}>
                      🎉 Goal completed for this week!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default GoalTracker;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get('/stories');
        setStories(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching stories.');
        console.error('Fetch stories error:', error.response?.data);
      }
    };

    fetchStories();
  }, []);

  const handleApprove = async (storyId, approved) => {
    try {
      await axiosInstance.put(`/stories/${storyId}/approve`, { approved });
      setStories(stories.map(story => story._id === storyId ? { ...story, approved } : story));
      setMessage(`Story ${approved ? 'approved' : 'rejected'} successfully!`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating story approval.');
      console.error('Approval error:', error.response?.data);
    }
  };

  const handleDelete = async (storyId) => {
    try {
      await axiosInstance.delete(`/stories/${storyId}`);
      setStories(stories.filter(story => story._id !== storyId));
      setMessage('Story deleted successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error deleting story.');
      console.error('Delete error:', error.response?.data);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Manage Stories</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Content</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Approved</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.length > 0 ? (
              stories.map((story) => (
                <tr key={story._id} style={styles.tbodyRow}>
                  <td style={styles.td}>{story.title}</td>
                  <td style={styles.td}>{story.content.substring(0, 100)}...</td>
                  <td style={styles.td}>{story.user}</td>
                  <td style={styles.td}>{story.approved ? 'Yes' : 'No'}</td>
                  <td style={styles.td}>
                    {story.approved ? (
                      <button
                        style={{ ...styles.button, ...styles.rejectButton }}
                        onClick={() => handleApprove(story._id, false)}
                      >
                        ❌ Reject
                      </button>
                    ) : (
                      <button
                        style={{ ...styles.button, ...styles.approveButton }}
                        onClick={() => handleApprove(story._id, true)}
                      >
                        ✅ Approve
                      </button>
                    )}
                    <button
                      style={{ ...styles.button, ...styles.deleteButton }}
                      onClick={() => handleDelete(story._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.emptyMsg}>No stories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#eef2f7',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2d2d2d',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  theadRow: {
    backgroundColor: '#6c63ff',
    color: 'white',
    textAlign: 'left',
  },
  th: {
    padding: '12px',
    fontWeight: '600',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tbodyRow: {
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '12px',
    verticalAlign: 'top',
  },
  button: {
    padding: '8px 12px',
    fontSize: '0.85rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '8px',
    transition: 'box-shadow 0.2s',
  },
  approveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  rejectButton: {
    backgroundColor: '#ffc107',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  emptyMsg: {
    textAlign: 'center',
    padding: '1rem',
    color: '#999',
  },
  message: {
    marginTop: '1rem',
    color: '#d33',
    textAlign: 'center',
  },
};

export default ManageStories;


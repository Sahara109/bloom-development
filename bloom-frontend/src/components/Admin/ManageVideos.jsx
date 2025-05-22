import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddVideo from './AddVideo';
import UpdateVideo from './UpdateVideo';
import AdminLayout from "./AdminLayout";
import axiosInstance from '../../utils/axiosInstance';
import { toKebabCase } from '../../utils/utils';
import KebabMenu from './KebabMenu';

axios.defaults.baseURL = 'http://localhost:5001';

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get('/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setMessage('Error fetching videos.');
      }
    };

    fetchVideos();
  }, []);

  const handleVideoAdded = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleVideoUpdated = (updatedVideo) => {
    setVideos(videos.map(video => video._id === updatedVideo._id ? updatedVideo : video));
    setSelectedVideo(null);
  };

  // UPDATED delete handler that calls backend API
  const handleDeleteVideo = async (videoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('❌ You must be logged in to delete a video.');
      return;
    }

    try {
      await axiosInstance.delete(`/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Only update UI after successful delete
      setVideos(videos.filter(video => video._id !== videoId));
      alert('✅ Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('❌ Error deleting video. Please try again later.');
    }
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>📹 Manage Videos</h2>

        <div style={styles.card}>
          <AddVideo onVideoAdded={handleVideoAdded} />
        </div>

        {selectedVideo && (
          <div style={styles.card}>
            <h3 style={styles.subHeading}>Editing: {selectedVideo.title}</h3>
            <UpdateVideo video={selectedVideo} onVideoUpdated={handleVideoUpdated} />
          </div>
        )}

        <div style={styles.card}>
          <h3 style={styles.subHeading}>All Videos</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>URL Slug</th>
                <th style={styles.th}>URL</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video._id} style={styles.tbodyRow}>
                    <td style={styles.td}>{video.title}</td>
                    <td style={styles.td}>{toKebabCase(video.title)}</td>
                    <td style={styles.td}>{video.url}</td>
                    <td style={styles.td}>{video.description || 'No description provided'}</td>
                    <td style={styles.td}>
                      <KebabMenu
                        onEdit={() => setSelectedVideo(video)}
                        onDelete={() => handleDeleteVideo(video._id)}  
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.emptyMsg}>No videos found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </AdminLayout>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  subHeading: {
    marginBottom: '1rem',
    color: '#444',
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
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '12px',
    verticalAlign: 'top',
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

export default ManageVideos;

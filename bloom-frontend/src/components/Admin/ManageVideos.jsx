import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddVideo from './AddVideo';
import UpdateVideo from './UpdateVideo';
import DeleteVideo from './DeleteVideo';

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (error) {
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
    setSelectedVideo(null); // Deselect video after update
  };

  const handleDeleteVideo = (videoId) => {
    setVideos(videos.filter(video => video._id !== videoId));
  };

  return (
    <div className="manage-videos-container">
      <h3 className="manage-videos-title"> 📹 Manage Your Videos</h3>

      <AddVideo onVideoAdded={handleVideoAdded} />

      {selectedVideo && (
        <UpdateVideo video={selectedVideo} onVideoUpdated={handleVideoUpdated} />
      )}

      <div className="videos-table-container">
        <table className="videos-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td>{video.title}</td>
                <td>{video.url}</td>
                <td>{video.description || 'No description provided'}</td>
                <td>
                  <button className="update-button" onClick={() => setSelectedVideo(video)}>Update</button>
                  <DeleteVideo videoId={video._id} onDelete={handleDeleteVideo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="error-message">{message}</p>}

      <style jsx>{`
      .manage-videos-container {
        padding: 2rem;
        max-width: 1200px;
        margin: auto;
        background-color:rgb(246, 244, 250);
        border-radius: 8px;
      }

      .manage-videos-title {
        font-size: 2rem;
        color: #333; 
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .description-section {
        font-size: 1.1rem;
        color: #555;
        margin-bottom: 2rem;
        text-align: center;
      }

      .videos-table-container {
        margin-top: 2rem;
        overflow-x: auto;
      }

      .videos-table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .videos-table th, .videos-table td {
        padding: 12px 20px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .videos-table th {
        color:rgb(124, 103, 242);
        background-color: #f4f4f4;
      }

      .videos-table tr:hover {
        background-color:rgb(249, 249, 249);
      }

      .update-button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 8px 15px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
      }

      .update-button:hover {
        background-color: #45a049;
      }

      .error-message {
        color: red;
        font-size: 1.2rem;
        text-align: center;
      }

    `}</style>

    </div>
  );
};

export default ManageVideos;


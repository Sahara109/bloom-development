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
    <div>
      <h3>Manage Videos</h3>
      <AddVideo onVideoAdded={handleVideoAdded} />
      {selectedVideo && (
        <UpdateVideo video={selectedVideo} onVideoUpdated={handleVideoUpdated} />
      )}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th>Title</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id}>
              <td>{video.title}</td>
              <td>{video.url}</td>
              <td>
                <button onClick={() => setSelectedVideo(video)}>Update</button>
                <DeleteVideo videoId={video._id} onDelete={handleDeleteVideo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ManageVideos;
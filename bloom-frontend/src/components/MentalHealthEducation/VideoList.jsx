import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/videos')
      .then((response) => {
        console.log('Fetched videos:', response.data);
        setVideos(response.data); // Set the fetched data
      })
      .catch((error) => {
        console.error('Error fetching video files:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Video List</h1>
      <div style={styles.videoList}>
        {videos.map((video, index) => (
          <div key={index} style={styles.videoCard}>
            <h2 style={styles.title}>{video.title}</h2> {/* Ensure `video.title` is a string */}
            <p style={styles.description}>{video.description}</p> {/* Ensure `video.description` is a string */}
            <video width="320" height="240" controls style={styles.videoPlayer}>
              <source src={`http://localhost:5001${video.url}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '1rem',
    width: '100%',
  },
  videoCard: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  videoPlayer: {
    marginTop: '1rem',
    borderRadius: '8px',
  },
  description: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#555',
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
  },
};

export default VideoList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for React Router navigation
import api from "../../api"; // Importing the Axios instance from api.js
import './StoryFeed.css';

const StoryFeed = () => {
  const [stories, setStories] = useState([]);

  // Fetching stories from the backend API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get("http://localhost:5001/api/stories");  // Ensure this URL is correct
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="story-feed">
      {stories.map(story => (
        <div key={story._id} className="story-card">
          <img src={story.image} alt={story.title} className="story-image" />
          <div className="story-content">
            <h3 className="story-title">{story.title}</h3>
            <p className="story-description">{story.content.substring(0, 100)}...</p>
            {/* Change 'a' to 'Link' for proper React Router handling */}
            <Link to={`/story/${story._id}`} className="read-more">Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryFeed;

import React, { useState, useEffect } from "react";
import api from "../../api"; // Importing the Axios instance from api.js
import './StoryFeed.css';

const StoryFeed = () => {
    const [stories, setStories] = useState([]);

    // Fetching stories from the backend API
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get("http://localhost:5001/api/stories");  // This will hit: http://localhost:5001/api/stories
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
                <a href={`/story/${story._id}`} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
      );
    };

export default StoryFeed;

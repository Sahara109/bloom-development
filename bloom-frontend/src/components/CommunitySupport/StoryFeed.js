import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./StoryFeed.css";

const StoryFeed = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get("http://localhost:5001/api/stories");
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
          <div className="story-content">
            <h3 className="story-title">📖 {story.title}</h3>
            <p className="story-description">{story.content.substring(0, 100)}...</p>
            <Link to={`/story/${story._id}`} className="read-more">Read More →</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryFeed;

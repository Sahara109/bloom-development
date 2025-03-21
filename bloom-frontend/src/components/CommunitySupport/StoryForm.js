import React, { useState } from "react";
import api from "../../api";
import './StoryForm.css';

const StoryForm = ({ onStoryAdded }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storyData = { title, content, image };
            await api.post("stories", storyData); // Send POST request to /api/stories
            onStoryAdded(); // Refresh the feed
        } catch (error) {
            console.error("Error posting story", error);
        }
    };

    return (
        <div className="story-form">
          <h2>Share Your Story</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
    
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
    
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
    
            <button type="submit">Submit Story</button>
          </form>
        </div>
      );
    };

export default StoryForm;

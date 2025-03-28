import React, { useState } from "react";
import api from "../../api";
import "./StoryForm.css";

const StoryForm = ({ onStoryAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }
  
    try {
      const storyData = { title, content, image };
      await api.post("/stories", storyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      setMessage("Story has been submitted successfully! 🎉");
      setTitle(""); // Clear form after submission
      setContent("");
      setImage(null);
      
      onStoryAdded(); // **Trigger a re-fetch of stories**
    } catch (error) {
      setMessage("Failed to submit the story.");
    }
  };
  
  
  
  

  return (
    <div className="story-form">
      <h2>Share Your Story</h2>
      {message && <p className="message">{message}</p>}
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
        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Submit Story</button>
      </form>
    </div>
  );
};

export default StoryForm;

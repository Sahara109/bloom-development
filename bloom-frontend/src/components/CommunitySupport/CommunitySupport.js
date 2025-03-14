import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CommunitySupport.css';
import axios from 'axios';

const CommunitySupport = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stories, setStories] = useState([]); // Ensure stories is always an array
  const [newStory, setNewStory] = useState({ name: '', story: '', image: null });
  const [profileImage, setProfileImage] = useState('');

  // Fetch stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        const response = await fetch(`/api/stories?userEmail=${userEmail}`);
        const data = await response.json();

        console.log("My Stories:", data.myStories);
        console.log("Other Stories:", data.otherStories);

        // Combine myStories and otherStories into one array and set it
        setStories([...data.myStories, ...data.otherStories]); 
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();

    // Fetch user data (including profile image) when the component mounts
    axios.get('http://localhost:5001/api/users/getUserData')
      .then((response) => {
        setProfileImage(response.data.profileImage); // Set the profile image URL
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    setNewStory({ ...newStory, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newStory.name && newStory.story) {
      const formData = new FormData();
      formData.append('name', newStory.name);
      formData.append('story', newStory.story);
      if (newStory.image) {
        formData.append('profileImage', newStory.image);
      }

      try {
        const response = await axios.post('http://localhost:5001/api/stories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setStories([...stories, response.data]); // Add the new story to the list
        setNewStory({ name: '', story: '', image: null });
        setModalIsOpen(false);
      } catch (error) {
        console.error('Error submitting story:', error);
      }
    }
  };

  return (
    <div className="community-container">
      <h2>Community Support</h2>
      <p>Read and share inspiring mental health journeys.</p>

      {/* Display user profile image */}
      <div className="user-profile">
        <img src={profileImage || '/default-avatar.png'} alt="Profile" className="profile-image" />
        {/* Add any other user information here */}
      </div>

      <button className="share-button" onClick={() => setModalIsOpen(true)}>
        Share Your Story
      </button>

      <div className="stories-list">
        {stories.map((story) => (
          <div key={story._id} className="story-card">
            <img
              src={story.image || '/images/default_avatar.png'}
              alt={story.name}
              className="story-image"
            />
            <h3>{story.name}</h3>
            <p>{story.story}</p>
          </div>
        ))}
      </div>

      {/* Modal for Adding Story */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="story-modal">
        <h2>Share Your Story</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={newStory.name}
            onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Write your story..."
            value={newStory.story}
            onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
            required
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setModalIsOpen(false)} className="close-button">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CommunitySupport;
clearImmediate
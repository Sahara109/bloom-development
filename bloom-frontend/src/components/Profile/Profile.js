import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login at first');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            'x-auth-token': token
          }
        });
        setUser(response.data);
      } catch (error) {
        alert('Error: ' + error.response.data.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Profile Picture: <img src={user.profilePicture} alt="Profile" /></p>
    </div>
  );
};

export default Profile;

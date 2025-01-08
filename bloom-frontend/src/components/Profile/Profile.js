import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { auth, setAuth, logout } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth.isLoggedIn) {
        return;
      }

      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request header
          },
        });
        setAuth((prev) => ({
          ...prev,
          user: response.data,
        }));
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        logout();
      }
    };

    fetchUserProfile();
  }, [auth.isLoggedIn, auth.token, logout, setAuth]);

  if (!auth.isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  if (!auth.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {auth.user.name}</p>
      <p>Email: {auth.user.email}</p>
      <p>
        Profile Picture:{' '}
        {auth.user.profilePicture ? (
          <img src={auth.user.profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} />
        ) : (
          'No profile picture available'
        )}
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;

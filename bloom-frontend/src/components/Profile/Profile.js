import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';

const Profile = () => {
  const { auth, setAuth, logout } = useAuth();
  const [profilePicture, setProfilePicture] = useState(auth.user?.profilePicture || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth.isLoggedIn) {
        return;
      }

      try {
        const token = localStorage.getItem('authToken');
        console.log('Token retrieved:', token);
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth((prev) => ({
          ...prev,
          user: response.data,
        }));
        setProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        logout();
      }
    };

    fetchUserProfile();
  }, [auth.isLoggedIn, setAuth, logout]);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5001/uploadProfileImage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfilePicture(response.data.profileImage);
      setAuth((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          profilePicture: response.data.profileImage,
        },
      }));
    } catch (error) {
      console.error('Error uploading profile picture:', error.response?.data?.message || error.message);
    }
  };

  if (!auth.isLoggedIn) {
    return <Typography variant="h6" align="center" style={{ color: 'white' }}>Please log in to view your profile.</Typography>;
  }

  if (!auth.user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress style={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/5d3be400566fab00019cc8c4/1705866888881-D8G79BU7M3D0XMQ4BLTG/childrens-mental-health.jpeg?format=1500w)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        },
      }}
    >
      <Container component="main" maxWidth="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Paper elevation={3} style={{ padding: '20px', opacity: 0.95 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profilePicture}
              alt="Profile"
              style={{ width: '100px', height: '100px', marginBottom: '10px' }}
            />
            <Typography variant="h5" component="h1">
              {auth.user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {auth.user.email}
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleProfilePictureChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" style={{ marginTop: '10px' }}>
                Upload Profile Picture
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
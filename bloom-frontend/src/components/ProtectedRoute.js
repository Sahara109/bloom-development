import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ Component }) => {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the specified component
  return <Component />;
};

export default ProtectedRoute;

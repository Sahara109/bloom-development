import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ Component, isAdminRoute }) => {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !auth.user?.isAdmin) {
    // If the user is not an admin, redirect to the home page or another appropriate route
    return <Navigate to="/" />;
  }

  // If the user is logged in (and an admin if it's an admin route), render the specified component
  return <Component />;
};

export default ProtectedRoute;

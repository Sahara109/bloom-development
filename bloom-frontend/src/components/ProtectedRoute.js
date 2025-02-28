import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ Component, isAdminRoute }) => {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && auth.user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
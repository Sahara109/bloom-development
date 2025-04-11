import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ Component, isAdminRoute, ...rest }) => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or custom loader
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdminRoute && auth.user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

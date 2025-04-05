import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ Component, isAdminRoute, ...rest }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdminRoute && auth.user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

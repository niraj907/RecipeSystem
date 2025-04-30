// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  const user = JSON.parse(localStorage.getItem('auth-store')); // Adjust the key if it's different

  if (!user) {
    // If user is not found in localStorage, redirect to login
    return <Navigate to={isAdmin ? "/admin-login": "/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;

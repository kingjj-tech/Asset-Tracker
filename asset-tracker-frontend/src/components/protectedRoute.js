import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const userRole = localStorage.getItem('role');

  if (userRole !== requiredRole && userRole !== 'superuser') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

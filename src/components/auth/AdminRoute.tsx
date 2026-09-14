import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { getStoredUser } from '../../utils/auth';

interface AdminRouteProps {
  children?: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = getStoredUser();
  const location = useLocation();

  // 1. If unauthenticated, redirect to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 2. If authenticated as a normal user, deny access and redirect to /dashboard
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Authenticated as admin: allow access
  return children ? <>{children}</> : <Outlet />;
};

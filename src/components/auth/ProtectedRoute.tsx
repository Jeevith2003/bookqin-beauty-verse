
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserType } from '@/lib/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  allowedTypes: UserType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedTypes }) => {
  const { user, loading, userType } = useAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // If user type is not allowed for this route, redirect to appropriate dashboard
  if (!allowedTypes.includes(userType as UserType)) {
    return <Navigate to={userType === 'customer' ? '/dashboard' : '/salon/dashboard'} replace />;
  }
  
  // If user is authenticated and allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

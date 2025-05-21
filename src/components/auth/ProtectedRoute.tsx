
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
  
  console.log('ProtectedRoute check:', { user, userType, allowedTypes, loading });
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/" replace />;
  }
  
  // If userType is null but we have a user, use a fallback from user metadata
  const effectiveUserType = userType || (user.user_metadata?.user_type as UserType) || 'customer';
  
  // If user type is not allowed for this route, redirect to appropriate dashboard
  if (!allowedTypes.includes(effectiveUserType)) {
    console.log('User type not allowed:', effectiveUserType, 'Allowed:', allowedTypes);
    return <Navigate to={effectiveUserType === 'customer' ? '/dashboard' : '/salon/dashboard'} replace />;
  }
  
  console.log('Access granted to route for user type:', effectiveUserType);
  
  // If user is authenticated and allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

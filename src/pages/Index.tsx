
import React, { useState } from 'react';
import { UserType } from '@/lib/types';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from './Dashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const { toast } = useToast();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    toast({
      title: "Welcome to Bookqin!",
      description: `You are logged in as a ${userType === 'customer' ? 'Customer' : 'Salon Owner'}.`,
    });
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  if (isAuthenticated && userType) {
    return <Dashboard userType={userType} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* App Header */}
      <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-secondary py-6">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Bookqin</h1>
          <p className="text-white/90 text-center mt-2">Your beauty services, simplified</p>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex-1 container max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <AuthForm 
            onUserTypeSelect={handleUserTypeSelect} 
            onAuthSuccess={handleAuthSuccess} 
          />
        </div>

        {/* Features Highlight */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-center">Why Choose Bookqin?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-1">Easy Booking</h4>
              <p className="text-sm text-gray-500">Book appointments with your favorite salon in seconds</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <Star className="h-5 w-5 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-1">Verified Experts</h4>
              <p className="text-sm text-gray-500">Connect with top-rated beauty professionals</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <User className="h-5 w-5 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-1">AI Style Match</h4>
              <p className="text-sm text-gray-500">Get personalized style recommendations</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <Home className="h-5 w-5 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-1">In-Home Services</h4>
              <p className="text-sm text-gray-500">Book beauty services at your doorstep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

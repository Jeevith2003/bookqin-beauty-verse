
import React, { useState } from 'react';
import { UserType } from '@/lib/types';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from './Dashboard';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Star, User, Home } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-bookqin-light">
      {/* App Header */}
      <div className="premium-gradient py-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-bookqin-gold/10"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-bookqin-gold/5"></div>
        
        <div className="container max-w-md mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-bookqin-light text-center mb-1">Bookqin</h1>
          <p className="text-bookqin-light/90 text-center text-lg">Your beauty services, simplified</p>
          
          <div className="flex justify-center mt-4">
            <div className="bg-bookqin-light/10 backdrop-blur-sm rounded-full px-4 py-1 flex gap-2">
              <span className="text-bookqin-light/90 text-sm">Beauty</span>
              <span className="text-bookqin-light/50">•</span>
              <span className="text-bookqin-light/90 text-sm">Style</span>
              <span className="text-bookqin-light/50">•</span>
              <span className="text-bookqin-light/90 text-sm">Wellness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex-1 container max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in">
          <AuthForm 
            onUserTypeSelect={handleUserTypeSelect} 
            onAuthSuccess={handleAuthSuccess} 
          />
        </div>

        {/* Features Highlight */}
        <div className="mt-10 space-y-4">
          <h3 className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-bookqin-dark to-bookqin-secondary">Why Choose Bookqin?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <CalendarIcon className="h-6 w-6 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-2 text-lg">Easy Booking</h4>
              <p className="text-sm text-gray-500">Book appointments with your favorite salon in seconds</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-bookqin-secondary" />
              </div>
              <h4 className="font-medium mb-2 text-lg">Verified Experts</h4>
              <p className="text-sm text-gray-500">Connect with top-rated beauty professionals</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <User className="h-6 w-6 text-bookqin-primary" />
              </div>
              <h4 className="font-medium mb-2 text-lg">AI Style Match</h4>
              <p className="text-sm text-gray-500">Get personalized style recommendations</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mb-3">
                <Home className="h-6 w-6 text-bookqin-secondary" />
              </div>
              <h4 className="font-medium mb-2 text-lg">In-Home Services</h4>
              <p className="text-sm text-gray-500">Book beauty services at your doorstep</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-6 bg-white border-t border-gray-200">
        <div className="container max-w-md mx-auto px-4 text-center">
          <h3 className="font-medium text-bookqin-secondary mb-2">Bookqin</h3>
          <p className="text-sm text-gray-500">Your ultimate beauty booking platform</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

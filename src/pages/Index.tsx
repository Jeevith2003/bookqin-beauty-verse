
import React, { useState } from 'react';
import { UserType } from '@/lib/types';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from './Dashboard';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Star, User, Home, Sparkles, Clock, MapPin, Crown, Shield, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-bookqin-light via-white to-bookqin-peach">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-l from-bookqin-secondary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-bookqin-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-bookqin-gold/5 to-bookqin-secondary/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container max-w-md mx-auto px-6 pt-12 pb-8">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg mb-4 p-3">
              <img 
                src="/lovable-uploads/163ed8f5-fda4-4334-a74d-e05bc09b2015.png" 
                alt="Bookqin Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-bookqin-primary mb-2">
              Welcome to Bookqin
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your beauty journey starts here
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Salons</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8+ Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-bookqin-secondary" />
                <span>Premium Service</span>
              </div>
            </div>
          </div>

          {/* Auth Form Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20 animate-fade-in">
            <AuthForm 
              onUserTypeSelect={handleUserTypeSelect} 
              onAuthSuccess={handleAuthSuccess} 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container max-w-md mx-auto px-6 py-12">
        {/* AI Features Highlight */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Beauty</span>
            </div>
            <h2 className="text-2xl font-bold text-bookqin-primary mb-2">
              Experience the Future of Beauty
            </h2>
            <p className="text-gray-600">
              Smart recommendations, instant booking, personalized experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-bookqin-primary mb-1">AI Style Matcher</h3>
                  <p className="text-sm text-gray-600">Upload your photo for personalized recommendations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-bookqin-primary mb-1">Smart Scheduling</h3>
                  <p className="text-sm text-gray-600">AI finds the perfect time slots for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center text-bookqin-primary mb-8">
            Why 50,000+ Users Choose Bookqin
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-bookqin-light rounded-2xl flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-bookqin-primary" />
              </div>
              <h4 className="font-bold text-bookqin-primary mb-2">Instant Booking</h4>
              <p className="text-sm text-gray-600">Book in under 30 seconds</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold text-bookqin-primary mb-2">Top Rated</h4>
              <p className="text-sm text-gray-600">Only verified professionals</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold text-bookqin-primary mb-2">Home Service</h4>
              <p className="text-sm text-gray-600">Beauty at your doorstep</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-bookqin-primary mb-2">Best Prices</h4>
              <p className="text-sm text-gray-600">Exclusive deals & offers</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-secondary p-6 rounded-2xl text-white text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h3 className="font-bold text-lg mb-2">4.8/5 on App Stores</h3>
          <p className="text-white/90 text-sm">Join thousands of satisfied customers</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <span>50,000+ Bookings</span>
            <span>•</span>
            <span>500+ Salons</span>
            <span>•</span>
            <span>20+ Cities</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="container max-w-md mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm mb-3">
            <img 
              src="/lovable-uploads/163ed8f5-fda4-4334-a74d-e05bc09b2015.png" 
              alt="Bookqin Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">Bookqin - Beauty Made Simple</p>
          <p className="text-xs text-gray-500">© 2024 Bookqin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

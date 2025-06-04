
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
    <div className="min-h-screen bg-gradient-to-br from-bookqin-cream via-white to-purple-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-bookqin-secondary/20 to-pink-300/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-8 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-bookqin-gold/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 left-6 w-40 h-40 bg-gradient-to-br from-blue-200/25 to-bookqin-secondary/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-12 w-28 h-28 bg-gradient-to-br from-pink-200/30 to-yellow-200/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container max-w-md mx-auto px-4">
        
        {/* Hero Section */}
        <div className="pt-8 pb-6">
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-bookqin-secondary via-bookqin-gold to-bookqin-bronze rounded-[2rem] p-1 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/163ed8f5-fda4-4334-a74d-e05bc09b2015.png" 
                    alt="Bookqin Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-bookqin-primary via-bookqin-secondary to-bookqin-bronze bg-clip-text text-transparent leading-tight">
                Book Your Glow-Up
              </h1>
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                Premium beauty services at your fingertips
              </p>
              
              {/* Stats Bar */}
              <div className="flex items-center justify-center gap-6 py-4 px-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-bookqin-primary">500+</div>
                  <div className="text-xs text-gray-600">Salons</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-bookqin-primary">50K+</div>
                  <div className="text-xs text-gray-600">Bookings</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="text-lg font-bold text-bookqin-primary">4.9</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Form */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 mb-8">
            <AuthForm 
              onUserTypeSelect={handleUserTypeSelect} 
              onAuthSuccess={handleAuthSuccess} 
            />
          </div>
        </div>

        {/* Featured Services */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">
              <Crown className="w-5 h-5" />
              <span>Premium Services</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { name: 'Hair Styling', icon: '💇‍♀️', color: 'from-pink-400 to-rose-500' },
              { name: 'Nail Art', icon: '💅', color: 'from-purple-400 to-pink-500' },
              { name: 'Makeup', icon: '💄', color: 'from-orange-400 to-red-500' },
              { name: 'Spa & Massage', icon: '🧖‍♀️', color: 'from-green-400 to-teal-500' }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className={`bg-gradient-to-br ${service.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}>
                  <div className="text-center text-white">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-sm">{service.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">AI Beauty Assistant</h2>
              <p className="text-gray-600">Personalized recommendations just for you</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Style Matcher</h3>
                    <p className="text-sm text-gray-600">Upload your photo for custom looks</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Smart Booking</h3>
                    <p className="text-sm text-gray-600">AI finds your perfect time slots</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-center text-gray-800 mb-8">
            Why Bookqin is #1 Choice
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Shield, title: 'Verified Professionals', desc: 'All salons are background checked', color: 'from-green-400 to-emerald-500' },
              { icon: Star, title: 'Premium Quality', desc: '4.9★ average rating guaranteed', color: 'from-yellow-400 to-orange-500' },
              { icon: MapPin, title: 'Home & Salon Service', desc: 'Beauty wherever you are', color: 'from-blue-400 to-indigo-500' },
              { icon: Award, title: 'Best Price Promise', desc: 'Competitive rates, no hidden fees', color: 'from-purple-400 to-pink-500' }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-bookqin-primary via-bookqin-secondary to-bookqin-bronze rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <h3 className="text-2xl font-black mb-2">Loved by Thousands</h3>
              <p className="text-white/90 mb-6 text-lg">Join our beauty community today</p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black">50K+</div>
                    <div className="text-sm text-white/80">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">500+</div>
                    <div className="text-sm text-white/80">Partner Salons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">20+</div>
                    <div className="text-sm text-white/80">Cities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-r from-bookqin-secondary to-bookqin-bronze rounded-xl flex items-center justify-center mx-auto mb-3">
              <img 
                src="/lovable-uploads/163ed8f5-fda4-4334-a74d-e05bc09b2015.png" 
                alt="Bookqin Logo" 
                className="w-7 h-7 object-contain"
              />
            </div>
            <p className="font-bold text-gray-800 mb-1">Bookqin</p>
            <p className="text-sm text-gray-600">Beauty Made Simple & Elegant</p>
            <p className="text-xs text-gray-500 mt-2">© 2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

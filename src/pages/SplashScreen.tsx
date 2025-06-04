import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Star } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookqin-primary via-bookqin-dark to-bookqin-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-bookqin-gold/20 to-bookqin-secondary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-l from-bookqin-accent/20 to-bookqin-gold/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-bookqin-secondary/10 to-bookqin-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8">
        {/* Logo Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 animate-scale-in">
            <img 
              src="/lovable-uploads/163ed8f5-fda4-4334-a74d-e05bc09b2015.png" 
              alt="Bookqin Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          
          {/* Floating Icons */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-bookqin-gold rounded-full flex items-center justify-center animate-bounce delay-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-bookqin-secondary rounded-full flex items-center justify-center animate-bounce delay-700">
            <Heart className="w-3 h-3 text-white" />
          </div>
          <div className="absolute top-8 -left-8 w-7 h-7 bg-bookqin-accent rounded-full flex items-center justify-center animate-bounce delay-1000">
            <Star className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
          Bookqin
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-bookqin-accent font-medium mb-8 animate-fade-in delay-300">
          Your Beauty Journey Starts Here
        </p>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-2 text-white/80 animate-fade-in delay-500">
          <Sparkles className="w-5 h-5 text-bookqin-gold" />
          <span className="text-lg">Style • Beauty • Elegance</span>
          <Sparkles className="w-5 h-5 text-bookqin-gold" />
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex justify-center animate-fade-in delay-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-bookqin-gold rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-bookqin-secondary rounded-full animate-pulse delay-200"></div>
            <div className="w-3 h-3 bg-bookqin-accent rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bookqin-primary/50 to-transparent"></div>
    </div>
  );
};

export default SplashScreen;
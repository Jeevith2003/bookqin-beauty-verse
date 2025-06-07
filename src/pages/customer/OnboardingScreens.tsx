import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Sparkles, MapPin, Clock, Star, Heart } from 'lucide-react';

const OnboardingScreens: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Welcome to Bookqin",
      description: "Your beauty journey starts here. Discover premium salons and services near you.",
      icon: <Sparkles className="w-16 h-16 text-bookqin-secondary" />,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop"
    },
    {
      title: "Find Nearby Salons",
      description: "Locate top-rated beauty parlors and salons in your area with smart location-based search.",
      icon: <MapPin className="w-16 h-16 text-bookqin-secondary" />,
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop"
    },
    {
      title: "Easy Booking",
      description: "Book appointments instantly with real-time availability and flexible time slots.",
      icon: <Clock className="w-16 h-16 text-bookqin-secondary" />,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "Quality Guaranteed",
      description: "Experience verified professionals with ratings, reviews, and certified services.",
      icon: <Star className="w-16 h-16 text-bookqin-secondary" />,
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop"
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookqin-cream via-white to-purple-50 flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <Button variant="ghost" onClick={handleSkip} className="text-bookqin-muted">
          Skip
        </Button>
      </div>

      <div className="flex-1 container max-w-md mx-auto px-6 py-12 flex flex-col justify-center">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-bookqin-secondary scale-125' 
                  : index < currentStep 
                    ? 'bg-bookqin-primary' 
                    : 'bg-bookqin-muted/30'
              }`}
            />
          ))}
        </div>

        {/* Main Content */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={currentStepData.image} 
                alt={currentStepData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                {currentStepData.icon}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h1 className="text-2xl font-black text-bookqin-primary mb-4">
                {currentStepData.title}
              </h1>
              <p className="text-bookqin-muted text-lg leading-relaxed mb-8">
                {currentStepData.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="text-bookqin-muted"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-bookqin-secondary to-bookqin-gold hover:from-bookqin-secondary/90 hover:to-bookqin-gold/90 px-8 py-3 rounded-full text-white font-semibold shadow-lg"
          >
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-bookqin-secondary/20 to-pink-300/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-8 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-bookqin-gold/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default OnboardingScreens;
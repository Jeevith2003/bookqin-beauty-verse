import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Camera, MessageCircle, Wand2, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIFeatures: React.FC = () => {
  const aiFeatures = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "AI Style Matcher",
      description: "Upload your photo to get personalized style recommendations",
      link: "/customer/ai-style",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Beauty Assistant",
      description: "Chat with our AI for beauty tips and booking help",
      link: "/customer/chat",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Smart Booking",
      description: "AI-powered booking suggestions based on your preferences",
      link: "/customer/search",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Trend Predictor",
      description: "Discover upcoming beauty trends before everyone else",
      link: "/customer/offers",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-bookqin-secondary" />
        <h2 className="text-lg font-bold text-bookqin-primary">AI-Powered Features</h2>
        <Zap className="w-4 h-4 text-yellow-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {aiFeatures.map((feature, index) => (
          <Link key={index} to={feature.link}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-bookqin-primary text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <Card className="premium-gradient text-white">
        <CardContent className="p-4 text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-medium">New AI features coming soon!</p>
          <p className="text-xs text-white/80 mt-1">Virtual try-on and color matching</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeatures;
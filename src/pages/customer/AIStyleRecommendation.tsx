
import React, { useState, useRef } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Camera, Upload, Wand2, Heart, Share2, Download, Scissors, Palette } from 'lucide-react';

interface StyleRecommendation {
  id: string;
  name: string;
  description: string;
  confidence: number;
  category: 'haircut' | 'color' | 'style';
  image: string;
}

const AIStyleRecommendation: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockRecommendations: StyleRecommendation[] = [
        {
          id: '1',
          name: 'Layered Bob Cut',
          description: 'Perfect for your face shape with soft layers that add volume',
          confidence: 95,
          category: 'haircut',
          image: '/api/placeholder/200/200'
        },
        {
          id: '2',
          name: 'Honey Blonde Highlights',
          description: 'Warm tones that complement your skin undertone',
          confidence: 88,
          category: 'color',
          image: '/api/placeholder/200/200'
        },
        {
          id: '3',
          name: 'Beachy Waves',
          description: 'Effortless waves that enhance your natural texture',
          confidence: 92,
          category: 'style',
          image: '/api/placeholder/200/200'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'haircut': return <Scissors className="w-4 h-4" />;
      case 'color': return <Palette className="w-4 h-4" />;
      case 'style': return <Wand2 className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'haircut': return 'bg-blue-100 text-blue-800';
      case 'color': return 'bg-purple-100 text-purple-800';
      case 'style': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="premium-gradient p-6 rounded-2xl text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
          <div className="relative z-10">
            <Sparkles className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold mb-2">AI Style Matcher</h1>
            <p className="text-white/90">Discover your perfect look with AI-powered recommendations</p>
          </div>
        </div>

        {/* Image Upload Section */}
        {!selectedImage ? (
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-bookqin-secondary" />
                Upload Your Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-bookqin-secondary/30 rounded-xl p-8 text-center cursor-pointer hover:border-bookqin-secondary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-bookqin-secondary mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag your photo here</p>
                <p className="text-sm text-gray-400">Supports JPG, PNG files up to 10MB</p>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-bookqin-secondary hover:bg-bookqin-secondary/90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                </Button>
                <Button variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              
              <div className="bg-bookqin-light p-4 rounded-xl">
                <h3 className="font-semibold text-bookqin-primary mb-2">✨ What our AI analyzes:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Face shape and features</li>
                  <li>• Skin tone and undertones</li>
                  <li>• Hair texture and length</li>
                  <li>• Personal style preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Analysis Results */}
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded" 
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-bookqin-primary mb-2">Your Photo</h3>
                    <p className="text-sm text-gray-600 mb-3">AI analysis complete!</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedImage(null);
                          setRecommendations([]);
                        }}
                      >
                        Upload New
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {isAnalyzing && (
              <Card className="card-shadow">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-bookqin-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-bookqin-primary mb-2">Analyzing Your Photo...</h3>
                  <p className="text-gray-600">Our AI is creating personalized recommendations</p>
                  <div className="mt-4 space-y-2">
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-bookqin-secondary h-full w-3/4 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-500">Processing facial features...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-bookqin-primary">Your Style Recommendations</h2>
                  <Badge variant="secondary" className="bg-bookqin-light text-bookqin-secondary">
                    {recommendations.length} matches found
                  </Badge>
                </div>

                {recommendations.map((rec) => (
                  <Card key={rec.id} className="card-shadow hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-bookqin-secondary/20 to-bookqin-primary/20 rounded-xl flex items-center justify-center">
                            {getCategoryIcon(rec.category)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-bookqin-primary">{rec.name}</h3>
                              <Badge 
                                variant="secondary" 
                                className={`${getCategoryColor(rec.category)} text-xs mt-1`}
                              >
                                {rec.category.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-bookqin-secondary">
                                {rec.confidence}% match
                              </div>
                              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-bookqin-secondary h-2 rounded-full"
                                  style={{ width: `${rec.confidence}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-bookqin-secondary hover:bg-bookqin-secondary/90">
                              Book This Style
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Try AR
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Book Appointment CTA */}
                <Card className="premium-gradient text-white card-shadow">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Love Your Recommendations?</h3>
                    <p className="text-white/90 mb-4">Book an appointment with our certified stylists</p>
                    <Button className="bg-white text-bookqin-primary hover:bg-white/90 font-semibold">
                      Find Nearby Salons
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </CustomerLayout>
  );
};

export default AIStyleRecommendation;


import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Camera, Upload } from 'lucide-react';

const AIStyleRecommendation: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="premium-gradient p-6 rounded-2xl text-white text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">AI Style Matcher</h1>
          <p className="text-white/90">Get personalized style recommendations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Your Photo</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Upload a photo to get started</p>
            </div>
            <button className="w-full bg-bookqin-secondary text-white py-3 rounded-xl font-semibold">
              Take Photo
            </button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default AIStyleRecommendation;

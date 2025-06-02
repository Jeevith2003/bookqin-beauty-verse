
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Clock, Phone } from 'lucide-react';

const SalonProfile: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <img
                src="/placeholder.svg"
                alt="Salon"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">Glam Studio</h1>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(124 reviews)</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>0.5 km away</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Services will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default SalonProfile;

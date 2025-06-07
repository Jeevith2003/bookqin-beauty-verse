import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Filter, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchAndFilter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const salons = [
    {
      id: 1,
      name: 'Luxe Studio',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
      rating: 4.8,
      reviews: 120,
      distance: '0.8 km',
      services: ['Hair Cut', 'Color', 'Facial'],
      price: '₹800 - ₹2500',
      isOpen: true
    }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">Find Your Perfect Salon</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search salons, services, or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-900 border-0"
            />
          </div>
        </div>

        <div className="space-y-4">
          {salons.map((salon) => (
            <Card key={salon.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img src={salon.image} alt={salon.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-bookqin-primary">{salon.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-bookqin-muted">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{salon.rating} ({salon.reviews})</span>
                    </div>
                    <p className="text-bookqin-secondary font-semibold">{salon.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default SearchAndFilter;
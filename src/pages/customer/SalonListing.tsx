import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MapPin, Clock, Heart, Search, Filter, Shield } from 'lucide-react';

const SalonListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const salons = [
    {
      id: 1,
      name: 'Glow Beauty Studio',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 234,
      distance: '0.5 km',
      location: 'Bandra West, Mumbai',
      services: ['Hair', 'Skincare', 'Makeup'],
      price: '₹800 onwards',
      verified: true,
      featured: true,
      openNow: true,
      offers: 'FLAT 20% OFF'
    },
    {
      id: 2,
      name: 'Elegance Salon & Spa',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 189,
      distance: '1.2 km',
      location: 'Linking Road, Mumbai',
      services: ['Spa', 'Hair', 'Nails'],
      price: '₹1200 onwards',
      verified: true,
      featured: false,
      openNow: true,
      offers: null
    },
    {
      id: 3,
      name: 'Style Station',
      image: 'https://images.unsplash.com/photo-1583001931096-959e03cbc04e?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 156,
      distance: '2.1 km',
      location: 'Andheri East, Mumbai',
      services: ['Hair', 'Eyebrows', 'Skincare'],
      price: '₹600 onwards',
      verified: false,
      featured: false,
      openNow: false,
      offers: 'Book 2 Get 1 Free'
    },
    {
      id: 4,
      name: 'Royal Beauty Lounge',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 298,
      distance: '1.8 km',
      location: 'Juhu, Mumbai',
      services: ['Bridal', 'Makeup', 'Hair'],
      price: '₹1500 onwards',
      verified: true,
      featured: true,
      openNow: true,
      offers: null
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'verified', label: 'Verified' },
    { id: 'open', label: 'Open Now' },
    { id: 'offers', label: 'Has Offers' },
    { id: 'nearby', label: 'Nearby' }
  ];

  const filteredSalons = salons.filter(salon => {
    if (selectedFilter === 'verified') return salon.verified;
    if (selectedFilter === 'open') return salon.openNow;
    if (selectedFilter === 'offers') return salon.offers;
    if (selectedFilter === 'nearby') return parseFloat(salon.distance) < 2;
    return true;
  });

  return (
    <CustomerLayout>
      <div className="space-y-4">
        {/* Search Header */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-bookqin-softGray">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookqin-muted w-5 h-5" />
            <Input
              placeholder="Search salons, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-bookqin-softGray focus:border-bookqin-secondary"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={`whitespace-nowrap ${
                  selectedFilter === filter.id 
                    ? 'bg-bookqin-secondary hover:bg-bookqin-bronze text-white' 
                    : 'border-bookqin-softGray text-bookqin-muted hover:text-bookqin-primary'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between px-2">
          <p className="text-bookqin-muted text-sm">
            {filteredSalons.length} salons found
          </p>
          <Button variant="ghost" size="sm" className="text-bookqin-secondary">
            <Filter className="w-4 h-4 mr-1" />
            Sort by
          </Button>
        </div>

        {/* Salon Cards */}
        <div className="space-y-4">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-bookqin-softGray">
              <div className="relative">
                {salon.featured && (
                  <Badge className="absolute top-3 left-3 z-10 bg-bookqin-gold text-white">
                    Featured
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-bookqin-muted hover:text-bookqin-secondary"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                
                <div className="h-48 overflow-hidden">
                  <img 
                    src={salon.image} 
                    alt={salon.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {salon.offers && (
                  <div className="absolute bottom-3 left-3 bg-bookqin-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
                    {salon.offers}
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-bookqin-primary">{salon.name}</h3>
                      {salon.verified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-bookqin-muted">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{salon.rating}</span>
                        <span>({salon.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{salon.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-bookqin-secondary">{salon.price}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" />
                      <span className={salon.openNow ? 'text-green-600' : 'text-red-600'}>
                        {salon.openNow ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-bookqin-muted mb-3">{salon.location}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {salon.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-bookqin-accent text-bookqin-accent">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white">
                      View
                    </Button>
                    <Link to={`/customer/booking/${salon.id}`}>
                      <Button size="sm" className="bg-bookqin-secondary hover:bg-bookqin-bronze">
                        Book
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-4">
          <Button variant="outline" className="border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white">
            Load More Salons
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default SalonListing;
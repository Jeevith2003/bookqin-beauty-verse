
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { Search, MapPin, Clock, Calendar, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SalonCard from '../salon/SalonCard';
import { Salon } from '@/lib/types';

// Mock data
const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Glamour Studio',
    ownerId: 'owner1',
    address: 'MG Road',
    city: 'Bangalore',
    rating: 4.9,
    reviewCount: 426,
    images: ['https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=2074'],
    description: 'A premium salon experience with expert stylists',
    services: [
      { id: 's1', name: 'Haircut', description: 'Expert haircut for all hair types', price: 499, duration: 45, category: 'Hair' },
      { id: 's2', name: 'Hair Color', description: 'Premium hair coloring', price: 1499, duration: 120, category: 'Hair' },
      { id: 's3', name: 'Facial', description: 'Rejuvenating facial treatment', price: 999, duration: 60, category: 'Skin' }
    ],
    stylists: [
      { id: 'st1', name: 'Priya', specialties: ['Hair', 'Makeup'], rating: 4.8, reviewCount: 218 }
    ],
    verified: true,
    genderInclusive: true,
    inHomeService: true
  },
  {
    id: '2',
    name: 'The Beauty Lounge',
    ownerId: 'owner2',
    address: 'Indiranagar',
    city: 'Bangalore',
    rating: 4.7,
    reviewCount: 319,
    images: ['https://images.unsplash.com/photo-1633681926035-ec1ac984418a?q=80&w=2070'],
    description: 'Luxury beauty treatments in a relaxing environment',
    services: [
      { id: 's4', name: 'Manicure', description: 'Nail care and polish', price: 399, duration: 30, category: 'Nails' },
      { id: 's5', name: 'Pedicure', description: 'Foot and nail care', price: 499, duration: 45, category: 'Nails' },
      { id: 's6', name: 'Makeup', description: 'Professional makeup application', price: 1299, duration: 60, category: 'Makeup' }
    ],
    stylists: [
      { id: 'st2', name: 'Raj', specialties: ['Nails', 'Skin'], rating: 4.7, reviewCount: 145 }
    ],
    verified: true,
    genderInclusive: false,
    inHomeService: false
  },
  {
    id: '3',
    name: 'Urban Styles',
    ownerId: 'owner3',
    address: 'Koramangala',
    city: 'Bangalore',
    rating: 4.5,
    reviewCount: 287,
    images: ['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070'],
    description: 'Modern styles for the urban professional',
    services: [
      { id: 's7', name: 'Mens Haircut', description: 'Stylish cuts for men', price: 399, duration: 30, category: 'Hair' },
      { id: 's8', name: 'Beard Trim', description: 'Expert beard shaping and trimming', price: 199, duration: 20, category: 'Hair' },
      { id: 's9', name: 'Head Massage', description: 'Relaxing scalp massage', price: 299, duration: 20, category: 'Massage' }
    ],
    stylists: [
      { id: 'st3', name: 'Alex', specialties: ['Hair', 'Beard'], rating: 4.6, reviewCount: 189 }
    ],
    verified: false,
    genderInclusive: true,
    inHomeService: false
  }
];

const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hello, Guest</h2>
          <p className="text-gray-600">Find and book your next beauty appointment</p>
        </div>
        <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-bookqin-primary" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search for salons, services, stylists..."
          className="pl-10 py-6 rounded-xl shadow-sm border-gray-200"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <div className="flex flex-col items-center p-3 bg-bookqin-light/50 rounded-xl">
          <div className="bg-white p-2 rounded-full mb-2">
            <Star className="h-5 w-5 text-bookqin-primary" />
          </div>
          <span className="text-xs text-center">Top Rated</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-bookqin-light/50 rounded-xl">
          <div className="bg-white p-2 rounded-full mb-2">
            <MapPin className="h-5 w-5 text-bookqin-primary" />
          </div>
          <span className="text-xs text-center">Nearby</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-bookqin-light/50 rounded-xl">
          <div className="bg-white p-2 rounded-full mb-2">
            <Calendar className="h-5 w-5 text-bookqin-primary" />
          </div>
          <span className="text-xs text-center">Today</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-bookqin-light/50 rounded-xl">
          <div className="bg-white p-2 rounded-full mb-2">
            <Clock className="h-5 w-5 text-bookqin-primary" />
          </div>
          <span className="text-xs text-center">Offers</span>
        </div>
      </div>

      {/* Recommended Salons */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recommended Salons</h2>
          <CustomButton variant="ghost" size="sm">See All</CustomButton>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mockSalons.map(salon => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Popular Services</h2>
          <CustomButton variant="ghost" size="sm">See All</CustomButton>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 scrollbar-hide">
          {[
            { name: 'Haircut & Style', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069' },
            { name: 'Manicure', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070' },
            { name: 'Facial', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070' },
            { name: 'Hair Color', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069' }
          ].map((service, index) => (
            <div key={index} className="flex-shrink-0 w-32">
              <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-medium text-center line-clamp-2">{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

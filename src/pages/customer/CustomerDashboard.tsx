
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Star, MapPin, Clock, Sparkles, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    { id: 1, name: 'Hair Care', icon: '💇‍♀️', color: 'bg-pink-100 text-pink-600' },
    { id: 2, name: 'Skin Care', icon: '✨', color: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Nail Art', icon: '💅', color: 'bg-blue-100 text-blue-600' },
    { id: 4, name: 'Makeup', icon: '💄', color: 'bg-rose-100 text-rose-600' },
    { id: 5, name: 'Massage', icon: '🤲', color: 'bg-green-100 text-green-600' },
    { id: 6, name: 'Eyebrows', icon: '👁️', color: 'bg-amber-100 text-amber-600' },
  ];

  const nearbySlons = [
    { id: 1, name: 'Glam Studio', rating: 4.8, distance: '0.5 km', services: 12, image: '/placeholder.svg' },
    { id: 2, name: 'Beauty Haven', rating: 4.6, distance: '1.2 km', services: 18, image: '/placeholder.svg' },
    { id: 3, name: 'Style Central', rating: 4.9, distance: '0.8 km', services: 15, image: '/placeholder.svg' },
  ];

  const trendingOffers = [
    { id: 1, title: '30% Off Hair Spa', salon: 'Glam Studio', validUntil: '2 days left' },
    { id: 2, title: 'Free Manicure with Facial', salon: 'Beauty Haven', validUntil: '5 days left' },
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="premium-gradient p-6 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-white/5"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-white/90 mb-4">Discover amazing beauty services near you</p>
            
            {/* Search Bar */}
            <div 
              className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/30 transition-all"
              onClick={() => navigate('/customer/search')}
            >
              <Search className="h-5 w-5 text-white/80" />
              <span className="text-white/80">Search services, salons...</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => navigate('/customer/ai-style')}
          >
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-bookqin-secondary" />
              </div>
              <h3 className="font-semibold mb-1">AI Style Match</h3>
              <p className="text-sm text-gray-500">Find your perfect look</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => navigate('/customer/offers')}
          >
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-bookqin-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Offers & Rewards</h3>
              <p className="text-sm text-gray-500">Save on your bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Service Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  className="text-center cursor-pointer group"
                  onClick={() => navigate(`/customer/search?category=${category.name.toLowerCase()}`)}
                >
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Salons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-bookqin-secondary" />
              <span>Nearby Salons</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbySlons.map((salon) => (
              <div
                key={salon.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/customer/salon/${salon.id}`)}
              >
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{salon.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{salon.rating}</span>
                    </div>
                    <span>{salon.distance}</span>
                    <span>{salon.services} services</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-bookqin-secondary" />
              <span>Trending Offers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 bg-gradient-to-r from-bookqin-light to-bookqin-light/50 rounded-xl border border-bookqin-secondary/20"
              >
                <h4 className="font-semibold text-bookqin-primary">{offer.title}</h4>
                <p className="text-sm text-gray-600 mt-1">at {offer.salon}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-4 w-4 text-bookqin-secondary" />
                  <span className="text-sm text-bookqin-secondary font-medium">{offer.validUntil}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;

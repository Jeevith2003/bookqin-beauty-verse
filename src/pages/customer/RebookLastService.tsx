import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Clock, Star, MapPin, Calendar, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RebookLastService: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);

  const recentServices = [
    {
      id: '1',
      salonName: 'Luxe Studio',
      service: 'Hair Cut & Styling',
      stylist: 'Sarah Johnson',
      date: '15 Dec 2023',
      rating: 4.8,
      price: 800,
      duration: '1.5 hours',
      salonImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
      location: 'Downtown',
      nextAvailable: 'Today 3:30 PM'
    },
    {
      id: '2',
      salonName: 'Beauty Palace',
      service: 'Facial Treatment',
      stylist: 'Priya Sharma',
      date: '10 Dec 2023',
      rating: 4.9,
      price: 1200,
      duration: '1 hour',
      salonImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=100&h=100&fit=crop',
      location: 'Central Mall',
      nextAvailable: 'Tomorrow 11:00 AM'
    },
    {
      id: '3',
      salonName: 'Glow Spa',
      service: 'Manicure & Pedicure',
      stylist: 'Anita Singh',
      date: '8 Dec 2023',
      rating: 4.7,
      price: 600,
      duration: '45 minutes',
      salonImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&h=100&fit=crop',
      location: 'Fashion District',
      nextAvailable: 'Today 5:00 PM'
    }
  ];

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRebook = (service: any) => {
    // Navigate to booking flow with pre-filled data
    navigate('/customer/booking', { 
      state: { 
        salonId: service.id,
        salonName: service.salonName,
        service: service.service,
        stylist: service.stylist
      }
    });
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Rebook Last Service</h1>
              <p className="text-white/80">One-tap rebooking for your favorite services</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer hover:shadow-xl transition-all">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-600">Quick Rebook</p>
              <p className="text-sm text-green-600/80">Same time, same stylist</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 cursor-pointer hover:shadow-xl transition-all">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-600">Custom Booking</p>
              <p className="text-sm text-blue-600/80">Choose new date & time</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Services */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-bookqin-primary">Your Recent Services</h2>
          
          {recentServices.map((service) => (
            <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={service.salonImage} 
                    alt={service.salonName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-bookqin-primary text-lg">{service.salonName}</h3>
                        <p className="text-bookqin-muted font-medium">{service.service}</p>
                        <p className="text-sm text-bookqin-muted">with {service.stylist}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(service.id)}
                        className="p-2"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            favorites.includes(service.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-bookqin-light rounded-xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{service.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-bookqin-secondary" />
                      <span className="text-sm">{service.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-bookqin-secondary" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">₹{service.price}</span>
                    </div>
                  </div>
                </div>

                {/* Last Booking Info */}
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm text-bookqin-muted">Last booked on</p>
                    <p className="font-medium text-bookqin-primary">{service.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-bookqin-muted">Next available</p>
                    <p className="font-medium text-green-600">{service.nextAvailable}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleRebook(service)}
                    className="bg-bookqin-secondary hover:bg-bookqin-secondary/90"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Quick Rebook
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light"
                    onClick={() => navigate(`/customer/salon/${service.id}`)}
                  >
                    View Salon
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-bookqin-primary">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                Your Favorites ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-bookqin-muted mb-4">
                Your favorite services are prioritized for quick rebooking and special offers.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                View All Favorites
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Tips */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <h4 className="font-semibold text-bookqin-primary mb-2">💡 Quick Tips</h4>
            <ul className="text-sm text-bookqin-muted space-y-1">
              <li>• Add services to favorites for even faster rebooking</li>
              <li>• Book recurring appointments to secure your preferred slots</li>
              <li>• Enable notifications to get alerts about your stylist's availability</li>
              <li>• Rate your experiences to help us recommend better services</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default RebookLastService;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Clock, Calendar, RotateCcw, MessageCircle, Phone } from 'lucide-react';

const BookingHistory: React.FC = () => {
  const navigate = useNavigate();
  
  const upcomingBookings = [
    {
      id: 'BK123456789',
      salon: {
        name: 'Glow Beauty Studio',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop',
        rating: 4.8,
        address: 'Bandra West, Mumbai',
        phone: '+91 98765 43210'
      },
      service: 'Hair Cut + Hair Wash',
      date: 'Today, Dec 15',
      time: '3:00 PM',
      status: 'confirmed',
      price: '₹800',
      stylist: 'Priya Sharma'
    },
    {
      id: 'BK123456788',
      salon: {
        name: 'Radiance Spa',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=150&fit=crop',
        rating: 4.9,
        address: 'Juhu, Mumbai',
        phone: '+91 98765 43211'
      },
      service: 'Full Body Massage',
      date: 'Tomorrow, Dec 16',
      time: '11:00 AM',
      status: 'confirmed',
      price: '₹2500',
      stylist: 'Anjali Patel'
    }
  ];

  const pastBookings = [
    {
      id: 'BK123456787',
      salon: {
        name: 'Style Central',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=150&fit=crop',
        rating: 4.7,
        address: 'Andheri East, Mumbai'
      },
      service: 'Party Makeup',
      date: 'Dec 10, 2024',
      time: '6:00 PM',
      status: 'completed',
      price: '₹3500',
      stylist: 'Rahul Kumar',
      reviewed: false
    },
    {
      id: 'BK123456786',
      salon: {
        name: 'Nail Paradise',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=150&fit=crop',
        rating: 4.6,
        address: 'Powai, Mumbai'
      },
      service: 'Manicure + Pedicure',
      date: 'Dec 5, 2024',
      time: '2:30 PM',
      status: 'completed',
      price: '₹1300',
      stylist: 'Neha Singh',
      reviewed: true,
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const UpcomingBookingCard = ({ booking }: { booking: any }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img 
            src={booking.salon.image} 
            alt={booking.salon.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-bookqin-primary">{booking.salon.name}</h3>
                <div className="flex items-center gap-1 text-sm text-bookqin-muted">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{booking.salon.rating}</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{booking.salon.address}</span>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-bookqin-secondary">{booking.service}</p>
              <div className="flex items-center gap-4 text-sm text-bookqin-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{booking.time}</span>
                </div>
              </div>
              <p className="text-sm text-bookqin-muted">Stylist: {booking.stylist}</p>
              <p className="font-bold text-bookqin-secondary">{booking.price}</p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white"
                onClick={() => window.open(`tel:${booking.salon.phone}`, '_self')}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Salon
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PastBookingCard = ({ booking }: { booking: any }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img 
            src={booking.salon.image} 
            alt={booking.salon.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-bookqin-primary">{booking.salon.name}</h3>
                <div className="flex items-center gap-1 text-sm text-bookqin-muted">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{booking.salon.rating}</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{booking.salon.address}</span>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-bookqin-secondary">{booking.service}</p>
              <div className="flex items-center gap-4 text-sm text-bookqin-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{booking.time}</span>
                </div>
              </div>
              <p className="text-sm text-bookqin-muted">Stylist: {booking.stylist}</p>
              <p className="font-bold text-bookqin-secondary">{booking.price}</p>
              
              {booking.reviewed && booking.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-bookqin-muted">Your Rating:</span>
                  <div className="flex">
                    {[...Array(booking.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                className="flex-1 bg-bookqin-secondary hover:bg-bookqin-bronze"
                onClick={() => navigate('/customer/booking')}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Rebook
              </Button>
              {!booking.reviewed && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white"
                  onClick={() => navigate('/customer/feedback')}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">My Appointments</h1>
          <p className="text-bookqin-accent">Track and manage your bookings</p>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-bookqin-cream">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-bookqin-secondary data-[state=active]:text-white">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-bookqin-secondary data-[state=active]:text-white">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <UpcomingBookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-bookqin-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-bookqin-primary mb-2">No Upcoming Appointments</h3>
                  <p className="text-bookqin-muted mb-4">Book your next beauty session today!</p>
                  <Button 
                    className="bg-bookqin-secondary hover:bg-bookqin-bronze"
                    onClick={() => navigate('/customer/dashboard')}
                  >
                    Explore Salons
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4 mt-6">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <PastBookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-bookqin-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-bookqin-primary mb-2">No Past Appointments</h3>
                  <p className="text-bookqin-muted">Your booking history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default BookingHistory;

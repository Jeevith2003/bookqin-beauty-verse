import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Users, Calendar, Star, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WaitlistFeature: React.FC = () => {
  const { toast } = useToast();
  const [joinedWaitlists, setJoinedWaitlists] = useState<string[]>(['1', '3']);

  const availableWaitlists = [
    {
      id: '1',
      salonName: 'Luxe Studio',
      service: 'Hair Cut & Styling',
      stylist: 'Sarah Johnson',
      preferredDate: 'Tomorrow',
      preferredTime: '2:00 PM',
      currentPosition: 3,
      estimatedWait: '2-3 hours',
      salonImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
      price: 800,
      rating: 4.8,
      location: 'Downtown',
      status: 'active'
    },
    {
      id: '2',
      salonName: 'Beauty Palace',
      service: 'Facial Treatment',
      stylist: 'Priya Sharma',
      preferredDate: 'Today',
      preferredTime: '5:00 PM',
      currentPosition: null,
      estimatedWait: null,
      salonImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=100&h=100&fit=crop',
      price: 1200,
      rating: 4.9,
      location: 'Central Mall',
      status: 'available'
    },
    {
      id: '3',
      salonName: 'Glow Spa',
      service: 'Manicure & Pedicure',
      stylist: 'Anita Singh',
      preferredDate: 'Today',
      preferredTime: '3:30 PM',
      currentPosition: 1,
      estimatedWait: '30-45 minutes',
      salonImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&h=100&fit=crop',
      price: 600,
      rating: 4.7,
      location: 'Fashion District',
      status: 'active'
    }
  ];

  const notifications = [
    {
      id: '1',
      message: 'Slot available at Luxe Studio for 3:00 PM today!',
      time: '2 minutes ago',
      type: 'available'
    },
    {
      id: '2',
      message: 'You moved up to position #1 at Glow Spa',
      time: '15 minutes ago',
      type: 'update'
    }
  ];

  const handleJoinWaitlist = (waitlistId: string) => {
    setJoinedWaitlists(prev => [...prev, waitlistId]);
    toast({
      title: "Joined Waitlist!",
      description: "You'll be notified when a slot opens up",
    });
  };

  const handleLeaveWaitlist = (waitlistId: string) => {
    setJoinedWaitlists(prev => prev.filter(id => id !== waitlistId));
    toast({
      title: "Left Waitlist",
      description: "You've been removed from the waitlist",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'available': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Waitlist Feature</h1>
              <p className="text-white/80">Never miss your preferred time slot</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Bell className="w-5 h-5" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    notification.type === 'available' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  {notification.type === 'available' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Book Now
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* How Waitlist Works */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">How Waitlist Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">Join the Queue</h4>
                <p className="text-bookqin-muted text-sm">Add yourself to waitlist for fully booked slots</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">Get Notified</h4>
                <p className="text-bookqin-muted text-sm">Receive instant alerts when slots become available</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">Quick Booking</h4>
                <p className="text-bookqin-muted text-sm">Book within 10 minutes to secure your spot</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Waitlists */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-bookqin-primary">Available Waitlists</h2>
          
          {availableWaitlists.map((waitlist) => (
            <Card key={waitlist.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={waitlist.salonImage} 
                    alt={waitlist.salonName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-bookqin-primary text-lg">{waitlist.salonName}</h3>
                        <p className="text-bookqin-muted font-medium">{waitlist.service}</p>
                        <p className="text-sm text-bookqin-muted">with {waitlist.stylist}</p>
                      </div>
                      <Badge className={`${getStatusColor(waitlist.status)} text-white`}>
                        {waitlist.status === 'active' ? 'In Queue' : 'Available'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Waitlist Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-bookqin-light rounded-xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-bookqin-secondary" />
                      <span className="text-sm font-medium">{waitlist.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-bookqin-secondary" />
                      <span className="text-sm">{waitlist.preferredTime}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{waitlist.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-bookqin-secondary" />
                      <span className="text-sm">{waitlist.location}</span>
                    </div>
                  </div>
                </div>

                {/* Queue Position */}
                {waitlist.status === 'active' && waitlist.currentPosition && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-700">Position #{waitlist.currentPosition}</p>
                        <p className="text-sm text-blue-600">Estimated wait: {waitlist.estimatedWait}</p>
                      </div>
                    </div>
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-bookqin-primary">₹{waitlist.price}</span>
                  <span className="text-sm text-bookqin-muted">No extra charges for waitlist</span>
                </div>

                {/* Action Button */}
                {joinedWaitlists.includes(waitlist.id) ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-medium">You're in the waitlist!</span>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => handleLeaveWaitlist(waitlist.id)}
                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Leave Waitlist
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleJoinWaitlist(waitlist.id)}
                    className="w-full bg-bookqin-secondary hover:bg-bookqin-secondary/90"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Join Waitlist
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Waitlist Benefits */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">Waitlist Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">Get priority access to cancelled appointments</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">Instant notifications when slots open up</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">No additional charges for waitlist service</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">Secure your preferred stylist and time</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default WaitlistFeature;
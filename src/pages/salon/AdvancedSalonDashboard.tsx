import React, { useState } from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  MapPin,
  Phone
} from 'lucide-react';

const AdvancedSalonDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const dashboardStats = {
    today: {
      bookings: 12,
      revenue: 8500,
      customers: 10,
      rating: 4.8,
      completionRate: 92
    },
    week: {
      bookings: 78,
      revenue: 45000,
      customers: 65,
      rating: 4.7,
      completionRate: 89
    },
    month: {
      bookings: 324,
      revenue: 185000,
      customers: 280,
      rating: 4.8,
      completionRate: 91
    }
  };

  const currentStats = dashboardStats[selectedTimeframe as keyof typeof dashboardStats];

  const todayBookings = [
    {
      id: 1,
      customer: 'Priya Sharma',
      service: 'Hair Cut & Styling',
      time: '10:00 AM',
      status: 'completed',
      amount: 800,
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      customer: 'Anjali Patel',
      service: 'Facial & Cleanup',
      time: '11:30 AM',
      status: 'in-progress',
      amount: 1200,
      phone: '+91 87654 32109'
    },
    {
      id: 3,
      customer: 'Meera Singh',
      service: 'Manicure & Pedicure',
      time: '2:00 PM',
      status: 'confirmed',
      amount: 600,
      phone: '+91 76543 21098'
    },
    {
      id: 4,
      customer: 'Ritu Gupta',
      service: 'Bridal Package',
      time: '3:30 PM',
      status: 'confirmed',
      amount: 3500,
      phone: '+91 65432 10987'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'booking',
      message: 'New booking from Kavya Reddy for Hair Spa',
      time: '5 mins ago',
      urgent: false
    },
    {
      id: 2,
      type: 'cancellation',
      message: 'Booking cancelled by Sneha Jain',
      time: '15 mins ago',
      urgent: true
    },
    {
      id: 3,
      type: 'review',
      message: 'New 5-star review from Preeti Agarwal',
      time: '1 hour ago',
      urgent: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-bookqin-secondary';
      case 'confirmed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <SalonLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-white/80">Welcome back! Here's your business overview</p>
          
          {/* Timeframe Selector */}
          <div className="flex gap-2 mt-4">
            {['today', 'week', 'month'].map((period) => (
              <Button
                key={period}
                variant={selectedTimeframe === period ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTimeframe(period)}
                className={selectedTimeframe === period ? 'bg-bookqin-secondary' : 'text-white hover:bg-white/20'}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Bookings</p>
                  <p className="text-2xl font-bold text-bookqin-primary">{currentStats.bookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">+12% from last {selectedTimeframe}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Revenue</p>
                  <p className="text-2xl font-bold text-bookqin-primary">₹{currentStats.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">+8% from last {selectedTimeframe}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Customers</p>
                  <p className="text-2xl font-bold text-bookqin-primary">{currentStats.customers}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">+15% new customers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-bookqin-muted">Rating</p>
                  <p className="text-2xl font-bold text-bookqin-primary">{currentStats.rating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-bookqin-muted">Based on 156 reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Clock className="w-5 h-5 text-bookqin-secondary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-bookqin-light rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-bookqin-primary">{booking.time}</span>
                      <Badge className={`${getStatusColor(booking.status)} text-white text-xs`}>
                        {getStatusIcon(booking.status)}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-bookqin-primary">{booking.customer}</h4>
                      <p className="text-sm text-bookqin-muted">{booking.service}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-bookqin-secondary">₹{booking.amount}</span>
                        <span className="text-xs text-bookqin-muted">•</span>
                        <span className="text-xs text-bookqin-muted">{booking.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-bookqin-secondary text-bookqin-secondary">
                      <Phone className="w-4 h-4" />
                    </Button>
                    {booking.status === 'confirmed' && (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-bookqin-primary">
                <BarChart3 className="w-5 h-5 text-bookqin-secondary" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-bookqin-muted">Booking Completion Rate</span>
                  <span className="font-medium text-bookqin-primary">{currentStats.completionRate}%</span>
                </div>
                <Progress value={currentStats.completionRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-bookqin-muted">Customer Satisfaction</span>
                  <span className="font-medium text-bookqin-primary">96%</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-bookqin-muted">On-time Performance</span>
                  <span className="font-medium text-bookqin-primary">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-bookqin-primary">
                <Bell className="w-5 h-5 text-bookqin-secondary" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${notification.urgent ? 'bg-red-50 border border-red-200' : 'bg-bookqin-light'}`}>
                    <p className="text-sm text-bookqin-primary">{notification.message}</p>
                    <p className="text-xs text-bookqin-muted mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="p-4 h-auto flex-col gap-2 border-bookqin-secondary text-bookqin-secondary">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Manage Schedule</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex-col gap-2 border-bookqin-secondary text-bookqin-secondary">
                <Users className="w-6 h-6" />
                <span className="text-sm">Add Service</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex-col gap-2 border-bookqin-secondary text-bookqin-secondary">
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex-col gap-2 border-bookqin-secondary text-bookqin-secondary">
                <Star className="w-6 h-6" />
                <span className="text-sm">Customer Reviews</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default AdvancedSalonDashboard;
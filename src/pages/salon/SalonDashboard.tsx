
import React from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Users, Clock, TrendingUp, Star } from 'lucide-react';

const SalonDashboard: React.FC = () => {
  const todayStats = {
    bookings: 12,
    revenue: 2450,
    customers: 8,
    avgRating: 4.8
  };

  const recentBookings = [
    { id: 1, customer: 'Sarah Johnson', service: 'Hair Cut & Style', time: '10:00 AM', status: 'confirmed' },
    { id: 2, customer: 'Emma Wilson', service: 'Facial Treatment', time: '11:30 AM', status: 'pending' },
    { id: 3, customer: 'Lisa Brown', service: 'Manicure', time: '2:00 PM', status: 'confirmed' },
  ];

  const weeklyData = [
    { day: 'Mon', bookings: 8, revenue: 1200 },
    { day: 'Tue', bookings: 12, revenue: 1800 },
    { day: 'Wed', bookings: 15, revenue: 2200 },
    { day: 'Thu', bookings: 10, revenue: 1500 },
    { day: 'Fri', bookings: 18, revenue: 2800 },
    { day: 'Sat', bookings: 22, revenue: 3200 },
    { day: 'Sun', bookings: 16, revenue: 2400 },
  ];

  return (
    <SalonLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="premium-gradient p-6 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">Good morning!</h1>
            <p className="text-white/90">Here's what's happening at your salon today</p>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayStats.bookings}</p>
                  <p className="text-sm text-gray-500">Today's Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{todayStats.revenue}</p>
                  <p className="text-sm text-gray-500">Today's Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayStats.customers}</p>
                  <p className="text-sm text-gray-500">Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayStats.avgRating}</p>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-bookqin-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {booking.customer.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{booking.customer}</p>
                    <p className="text-sm text-gray-500">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{booking.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-bookqin-secondary" />
              <span>Weekly Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="font-medium w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-bookqin-secondary rounded-full h-2 transition-all"
                        style={{ width: `${(day.bookings / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{day.bookings} bookings</span>
                    <p className="text-sm text-gray-500">₹{day.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default SalonDashboard;

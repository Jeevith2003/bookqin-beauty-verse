
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { Calendar, Clock, Users, ArrowUp, ArrowDown, Star, Edit } from 'lucide-react';

// Mock appointment data
const upcomingAppointments = [
  {
    id: 'apt1',
    customerName: 'Aarav Kumar',
    service: 'Haircut & Styling',
    time: '10:00 AM',
    date: 'Today',
    status: 'confirmed'
  },
  {
    id: 'apt2',
    customerName: 'Meera Shah',
    service: 'Facial & Cleanup',
    time: '12:30 PM',
    date: 'Today',
    status: 'confirmed'
  },
  {
    id: 'apt3',
    customerName: 'Vikram Patel',
    service: 'Hair Color',
    time: '3:00 PM',
    date: 'Today',
    status: 'pending'
  }
];

const SalonDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hello, Salon Owner</h2>
          <p className="text-gray-600">Manage your salon business</p>
        </div>
        <CustomButton 
          variant="outline" 
          icon={<Edit className="h-4 w-4" />}
          onClick={() => console.log('Edit salon profile')}
        >
          Edit Profile
        </CustomButton>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-bookqin-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Bookings</p>
              <h3 className="text-xl font-bold">8</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-bookqin-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-xl font-bold">127</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mr-3">
              <Star className="h-5 w-5 text-bookqin-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <h3 className="text-xl font-bold">4.8</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-bookqin-light rounded-full flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-bookqin-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Service Time</p>
              <h3 className="text-xl font-bold">52 min</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">Today's Revenue</h3>
            <p className="text-2xl font-bold mt-1">₹8,450</p>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-600">12% higher</span>
              <span className="text-gray-500 ml-1">than yesterday</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">This Week</h3>
            <p className="text-2xl font-bold mt-1">₹42,870</p>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-600">8% higher</span>
              <span className="text-gray-500 ml-1">than last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Appointments</h2>
          <CustomButton variant="outline" size="sm">View Calendar</CustomButton>
        </div>
        <div className="space-y-3">
          {upcomingAppointments.map(apt => (
            <div 
              key={apt.id} 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-bookqin-pink rounded-full flex items-center justify-center mr-3">
                  <span className="font-medium text-bookqin-secondary">
                    {apt.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{apt.customerName}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{apt.service}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{apt.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  apt.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
        {upcomingAppointments.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No appointments scheduled for today</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <CustomButton fullWidth>Add New Service</CustomButton>
        <CustomButton fullWidth variant="secondary">View Services</CustomButton>
      </div>
    </div>
  );
};

export default SalonDashboard;

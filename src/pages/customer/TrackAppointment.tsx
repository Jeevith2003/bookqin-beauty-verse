import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, User, Phone, CheckCircle, Circle, AlertCircle, Star } from 'lucide-react';

const TrackAppointment: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>('1');

  const appointments = [
    {
      id: '1',
      salonName: 'Luxe Studio',
      service: 'Hair Cut & Styling',
      date: 'Today',
      time: '2:30 PM',
      status: 'in-progress',
      stylist: 'Sarah Johnson',
      salonImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
      address: '123 Fashion Street, Downtown',
      phone: '+91 98765 43210',
      steps: [
        { title: 'Booking Confirmed', time: '10:00 AM', completed: true },
        { title: 'Arrived at Salon', time: '2:25 PM', completed: true },
        { title: 'Service Started', time: '2:30 PM', completed: true, current: true },
        { title: 'Service Completed', time: '3:30 PM (Est.)', completed: false },
        { title: 'Payment & Feedback', time: '3:35 PM (Est.)', completed: false }
      ]
    }
  ];

  const currentAppointment = appointments.find(apt => apt.id === selectedAppointment);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'in-progress': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Track Your Appointment</h1>
          <p className="text-white/80">Live status updates for your beauty session</p>
        </div>

        {currentAppointment && (
          <>
            {/* Appointment Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={currentAppointment.salonImage} 
                    alt={currentAppointment.salonName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-bookqin-primary text-lg">{currentAppointment.salonName}</h3>
                    <p className="text-bookqin-muted font-medium">{currentAppointment.service}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-bookqin-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {currentAppointment.date} at {currentAppointment.time}
                      </span>
                      <Badge className={`${getStatusColor(currentAppointment.status)} text-white`}>
                        {getStatusText(currentAppointment.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Salon Details */}
                <div className="grid grid-cols-1 gap-4 p-4 bg-bookqin-light rounded-xl">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-bookqin-secondary" />
                    <div>
                      <p className="font-medium text-bookqin-primary">Stylist</p>
                      <p className="text-sm text-bookqin-muted">{currentAppointment.stylist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-bookqin-secondary" />
                    <div>
                      <p className="font-medium text-bookqin-primary">Address</p>
                      <p className="text-sm text-bookqin-muted">{currentAppointment.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-bookqin-secondary" />
                    <div>
                      <p className="font-medium text-bookqin-primary">Contact</p>
                      <p className="text-sm text-bookqin-muted">{currentAppointment.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Tracking */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-bookqin-primary">
                  <AlertCircle className="w-5 h-5 text-bookqin-secondary" />
                  Live Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {currentAppointment.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : step.current 
                              ? 'bg-bookqin-secondary text-white animate-pulse' 
                              : 'bg-gray-200 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </div>
                        {index < currentAppointment.steps.length - 1 && (
                          <div className={`w-0.5 h-8 mt-2 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          step.current ? 'text-bookqin-secondary' : 'text-bookqin-primary'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-bookqin-muted">{step.time}</p>
                        {step.current && (
                          <p className="text-sm text-bookqin-secondary font-medium mt-1">
                            Currently in progress...
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="py-3 border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Salon
              </Button>
              <Button className="py-3 bg-bookqin-secondary hover:bg-bookqin-secondary/90">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>

            {/* Rate Experience (if completed) */}
            {currentAppointment.status === 'completed' && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-bookqin-light to-white">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-bookqin-gold mx-auto mb-4" />
                  <h3 className="font-bold text-bookqin-primary mb-2">How was your experience?</h3>
                  <p className="text-bookqin-muted mb-4">Your feedback helps us improve</p>
                  <Button className="w-full bg-bookqin-secondary hover:bg-bookqin-secondary/90">
                    Rate & Review
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </CustomerLayout>
  );
};

export default TrackAppointment;
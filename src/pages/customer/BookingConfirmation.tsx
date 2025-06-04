import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Star, Share, Download } from 'lucide-react';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    id: 'BK123456789',
    salon: {
      name: 'Glow Beauty Studio',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop',
      rating: 4.8,
      address: 'Shop 12, Bandra West, Mumbai - 400050',
      phone: '+91 98765 43210'
    },
    service: {
      name: 'Hair Cut + Hair Wash',
      duration: '45 mins',
      price: '₹800',
      stylist: 'Priya Sharma'
    },
    appointment: {
      date: 'Today, Dec 15',
      time: '3:00 PM',
      type: 'At Salon'
    },
    payment: {
      method: 'Online Payment',
      status: 'Paid',
      amount: '₹800'
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Success Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-bookqin-primary mb-2">Booking Confirmed!</h1>
          <p className="text-bookqin-muted">Your appointment has been successfully booked</p>
          <Badge className="mt-3 bg-green-600 text-white">
            Booking ID: {bookingDetails.id}
          </Badge>
        </div>

        {/* Booking Summary */}
        <Card className="border-bookqin-softGray">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={bookingDetails.salon.image} 
                alt={bookingDetails.salon.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-bookqin-primary text-lg">{bookingDetails.salon.name}</h3>
                <div className="flex items-center gap-1 text-sm text-bookqin-muted">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{bookingDetails.salon.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-bookqin-secondary">
                  <Share className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-bookqin-secondary">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Service Details */}
              <div className="bg-bookqin-cream p-4 rounded-xl">
                <h4 className="font-semibold text-bookqin-primary mb-2">Service Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-bookqin-muted">Service:</span>
                    <span className="font-medium">{bookingDetails.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bookqin-muted">Duration:</span>
                    <span className="font-medium">{bookingDetails.service.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bookqin-muted">Stylist:</span>
                    <span className="font-medium">{bookingDetails.service.stylist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bookqin-muted">Amount:</span>
                    <span className="font-bold text-bookqin-secondary">{bookingDetails.service.price}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-xs text-bookqin-muted">Date</p>
                    <p className="font-semibold text-bookqin-primary">{bookingDetails.appointment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Clock className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-xs text-bookqin-muted">Time</p>
                    <p className="font-semibold text-bookqin-primary">{bookingDetails.appointment.time}</p>
                  </div>
                </div>
              </div>

              {/* Location & Contact */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-bookqin-secondary mt-1" />
                  <div>
                    <p className="text-xs text-bookqin-muted">Location</p>
                    <p className="font-medium text-bookqin-primary">{bookingDetails.salon.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-bookqin-secondary" />
                  <div>
                    <p className="text-xs text-bookqin-muted">Contact</p>
                    <p className="font-medium text-bookqin-primary">{bookingDetails.salon.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-bookqin-primary">Payment Confirmed</p>
                  <p className="text-sm text-bookqin-muted">{bookingDetails.payment.method}</p>
                </div>
              </div>
              <p className="font-bold text-bookqin-secondary">{bookingDetails.payment.amount}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-bookqin-secondary hover:bg-bookqin-bronze"
            onClick={() => navigate('/customer/appointments')}
          >
            View All Appointments
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white"
            onClick={() => navigate('/customer/dashboard')}
          >
            Back to Home
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-bookqin-primary">Add to Calendar</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-bookqin-primary">Rebook Service</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default BookingConfirmation;
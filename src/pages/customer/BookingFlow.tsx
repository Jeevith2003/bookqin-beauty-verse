
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Clock, User, Calendar as CalendarIcon, CreditCard, Home, Building } from 'lucide-react';

const BookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['haircut']);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [serviceType, setServiceType] = useState('salon'); // salon or home
  const [step, setStep] = useState(1);

  const salon = {
    id: 1,
    name: 'Glow Beauty Studio',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop',
    rating: 4.8,
    address: 'Shop 12, Bandra West, Mumbai - 400050',
    verified: true
  };

  const services = [
    { id: 'haircut', name: 'Hair Cut', price: 500, duration: '30 mins' },
    { id: 'hairwash', name: 'Hair Wash', price: 200, duration: '15 mins' },
    { id: 'hairstyling', name: 'Hair Styling', price: 800, duration: '45 mins' },
    { id: 'facial', name: 'Facial Treatment', price: 1200, duration: '60 mins' },
    { id: 'manicure', name: 'Manicure', price: 600, duration: '45 mins' },
    { id: 'pedicure', name: 'Pedicure', price: 700, duration: '45 mins' }
  ];

  const stylists = [
    { id: 'priya', name: 'Priya Sharma', speciality: 'Hair Specialist', rating: 4.9 },
    { id: 'anjali', name: 'Anjali Patel', speciality: 'Skin Care Expert', rating: 4.8 },
    { id: 'rahul', name: 'Rahul Kumar', speciality: 'Hair & Beard', rating: 4.7 }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
  ];

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const getTotalDuration = () => {
    const totalMins = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      const duration = parseInt(service?.duration || '0');
      return total + duration;
    }, 0);
    
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate('/customer/booking-confirmation');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Select Services</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedServices.includes(service.id)
                        ? 'border-bookqin-secondary bg-bookqin-cream'
                        : 'border-gray-200 hover:border-bookqin-secondary/50'
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-bookqin-primary">{service.name}</h4>
                        <p className="text-sm text-bookqin-muted">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-bookqin-secondary">₹{service.price}</p>
                        {selectedServices.includes(service.id) && (
                          <Badge className="mt-1 bg-bookqin-secondary">Selected</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Service Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${serviceType === 'salon' ? 'ring-2 ring-bookqin-secondary' : ''}`}
                  onClick={() => setServiceType('salon')}
                >
                  <CardContent className="p-4 text-center">
                    <Building className="w-8 h-8 text-bookqin-secondary mx-auto mb-2" />
                    <h4 className="font-semibold">At Salon</h4>
                    <p className="text-sm text-bookqin-muted">Visit the salon</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all ${serviceType === 'home' ? 'ring-2 ring-bookqin-secondary' : ''}`}
                  onClick={() => setServiceType('home')}
                >
                  <CardContent className="p-4 text-center">
                    <Home className="w-8 h-8 text-bookqin-secondary mx-auto mb-2" />
                    <h4 className="font-semibold">At Home</h4>
                    <p className="text-sm text-bookqin-muted">Home service (+₹100)</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-xl border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Select Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`${selectedTime === time ? 'bg-bookqin-secondary hover:bg-bookqin-bronze' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Select Stylist (Optional)</h3>
              <div className="space-y-3">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedStylist === stylist.id
                        ? 'border-bookqin-secondary bg-bookqin-cream'
                        : 'border-gray-200 hover:border-bookqin-secondary/50'
                    }`}
                    onClick={() => setSelectedStylist(stylist.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-bookqin-primary">{stylist.name}</h4>
                        <p className="text-sm text-bookqin-muted">{stylist.speciality}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{stylist.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {serviceType === 'home' && (
              <div>
                <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Address Details</h3>
                <div className="space-y-4">
                  <Input placeholder="Enter your address" />
                  <Textarea placeholder="Additional instructions (optional)" />
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Booking Summary</h3>
              
              <div className="bg-bookqin-cream p-4 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={salon.image} 
                    alt={salon.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-bookqin-primary">{salon.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-bookqin-muted">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{salon.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h5 className="font-medium text-bookqin-primary">Services:</h5>
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return (
                      <div key={serviceId} className="flex justify-between text-sm">
                        <span>{service?.name}</span>
                        <span>₹{service?.price}</span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{getTotalDuration()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Type:</span>
                    <span className="font-medium">{serviceType === 'salon' ? 'At Salon' : 'At Home'}</span>
                  </div>
                  {selectedStylist && (
                    <div className="flex justify-between">
                      <span>Stylist:</span>
                      <span className="font-medium">{stylists.find(s => s.id === selectedStylist)?.name}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-bookqin-primary">Total Amount:</span>
                  <span className="font-bold text-lg text-bookqin-secondary">
                    ₹{getTotalPrice() + (serviceType === 'home' ? 100 : 0)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-bookqin-primary mb-4">Payment Method</h3>
              <Select defaultValue="cash">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Payment</SelectItem>
                  <SelectItem value="wallet">Wallet Payment</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-primary to-bookqin-dark rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Book Appointment</h1>
          <div className="flex items-center justify-between">
            <p className="text-bookqin-accent">Step {step} of 4</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-bookqin-gold' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Salon Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img 
                src={salon.image} 
                alt={salon.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-bookqin-primary">{salon.name}</h3>
                  {salon.verified && (
                    <Badge className="bg-green-100 text-green-700 text-xs">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-bookqin-muted">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{salon.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>2.5 km away</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <Button 
              variant="outline" 
              className="flex-1 border-bookqin-secondary text-bookqin-secondary hover:bg-bookqin-secondary hover:text-white"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button 
            className="flex-1 bg-bookqin-secondary hover:bg-bookqin-bronze"
            onClick={handleContinue}
            disabled={
              (step === 1 && selectedServices.length === 0) ||
              (step === 2 && (!selectedDate || !selectedTime))
            }
          >
            {step === 4 ? 'Confirm Booking' : 'Continue'}
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default BookingFlow;

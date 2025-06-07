import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Banknote, 
  Gift, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Tag,
  Percent
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock booking data - in real app, this would come from booking context/state
  const bookingDetails = {
    salonName: searchParams.get('salon') || 'Luxe Beauty Studio',
    service: searchParams.get('service') || 'Hair Cut & Styling',
    date: searchParams.get('date') || 'Today',
    time: searchParams.get('time') || '2:30 PM',
    stylist: 'Sarah Johnson',
    originalPrice: 1200,
    discount: 0,
    platformFee: 25,
    taxes: 48
  };

  const promoOffers = [
    { code: 'FIRST20', discount: 20, description: 'First booking - 20% off' },
    { code: 'SAVE10', discount: 10, description: '10% off on any service' },
    { code: 'WEEKEND15', discount: 15, description: 'Weekend special - 15% off' }
  ];

  const walletBalance = 2500;

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    const promo = promoOffers.find(p => p.code === appliedPromo);
    return promo ? Math.round((bookingDetails.originalPrice * promo.discount) / 100) : 0;
  };

  const getFinalAmount = () => {
    const discount = getDiscountAmount();
    return bookingDetails.originalPrice - discount + bookingDetails.platformFee + bookingDetails.taxes;
  };

  const applyPromoCode = () => {
    const validPromo = promoOffers.find(p => p.code.toLowerCase() === promoCode.toLowerCase());
    if (validPromo) {
      setAppliedPromo(validPromo.code);
      toast({
        title: "Promo code applied!",
        description: `You saved ₹${Math.round((bookingDetails.originalPrice * validPromo.discount) / 100)}`
      });
    } else {
      toast({
        title: "Invalid promo code",
        variant: "destructive"
      });
    }
    setPromoCode('');
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast({
      title: "Promo code removed"
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment successful!",
      description: "Your booking has been confirmed"
    });
    
    navigate('/customer/booking-confirmation', {
      state: { 
        bookingDetails: {
          ...bookingDetails,
          amount: getFinalAmount(),
          paymentMethod,
          appliedPromo
        }
      }
    });
  };

  const paymentMethods = [
    {
      id: 'wallet',
      icon: <Wallet className="w-5 h-5" />,
      title: 'Bookqin Wallet',
      subtitle: `Balance: ₹${walletBalance}`,
      available: walletBalance >= getFinalAmount()
    },
    {
      id: 'upi',
      icon: <Smartphone className="w-5 h-5" />,
      title: 'UPI',
      subtitle: 'Pay using any UPI app',
      available: true
    },
    {
      id: 'card',
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, Rupay',
      available: true
    },
    {
      id: 'cash',
      icon: <Banknote className="w-5 h-5" />,
      title: 'Cash on Service',
      subtitle: 'Pay directly at salon',
      available: true
    }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-bookqin-primary">Payment</h1>
            <p className="text-bookqin-muted">Complete your booking</p>
          </div>
        </div>

        {/* Booking Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-bookqin-primary">{bookingDetails.salonName}</h3>
                <p className="text-bookqin-muted">{bookingDetails.service}</p>
                <p className="text-sm text-bookqin-muted">
                  {bookingDetails.date} at {bookingDetails.time}
                </p>
                <p className="text-sm text-bookqin-muted">Stylist: {bookingDetails.stylist}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-bookqin-muted">Service Amount</span>
                <span className="text-bookqin-primary">₹{bookingDetails.originalPrice}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromo})</span>
                  <span>-₹{getDiscountAmount()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-bookqin-muted">Platform Fee</span>
                <span className="text-bookqin-primary">₹{bookingDetails.platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bookqin-muted">Taxes</span>
                <span className="text-bookqin-primary">₹{bookingDetails.taxes}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span className="text-bookqin-primary">Total Amount</span>
                <span className="text-bookqin-secondary">₹{getFinalAmount()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo Code */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <Tag className="w-5 h-5 text-bookqin-secondary" />
              Promo Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">{appliedPromo} applied</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removePromoCode}>
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button 
                  onClick={applyPromoCode}
                  disabled={!promoCode}
                  variant="outline"
                  className="border-bookqin-secondary text-bookqin-secondary"
                >
                  Apply
                </Button>
              </div>
            )}
            
            {/* Available Offers */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-bookqin-primary">Available Offers:</p>
              {promoOffers.map((offer) => (
                <div 
                  key={offer.code}
                  className="flex items-center justify-between p-2 bg-bookqin-light rounded-lg cursor-pointer hover:bg-bookqin-cream"
                  onClick={() => setPromoCode(offer.code)}
                >
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-bookqin-secondary" />
                    <div>
                      <p className="text-sm font-medium text-bookqin-primary">{offer.code}</p>
                      <p className="text-xs text-bookqin-muted">{offer.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-bookqin-secondary">
                    {offer.discount}% OFF
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-bookqin-primary">
              <CreditCard className="w-5 h-5 text-bookqin-secondary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      disabled={!method.available}
                      className="text-bookqin-secondary"
                    />
                    <Label 
                      htmlFor={method.id} 
                      className={`flex items-center gap-3 flex-1 p-3 rounded-lg border cursor-pointer ${
                        method.available 
                          ? 'border-bookqin-muted/30 hover:border-bookqin-secondary/50' 
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      } ${paymentMethod === method.id ? 'border-bookqin-secondary bg-bookqin-light' : ''}`}
                    >
                      <div className="text-bookqin-secondary">{method.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-bookqin-primary">{method.title}</p>
                        <p className="text-sm text-bookqin-muted">{method.subtitle}</p>
                      </div>
                      {!method.available && (
                        <Badge variant="destructive">Insufficient Balance</Badge>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-bookqin-light to-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-bookqin-primary">Secure Payment</p>
                <p className="text-xs text-bookqin-muted">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button 
          onClick={handlePayment}
          disabled={loading || (paymentMethod === 'wallet' && walletBalance < getFinalAmount())}
          className="w-full py-4 bg-bookqin-secondary hover:bg-bookqin-secondary/90 text-lg font-semibold"
        >
          {loading ? 'Processing...' : `Pay ₹${getFinalAmount()}`}
        </Button>
      </div>
    </CustomerLayout>
  );
};

export default PaymentPage;
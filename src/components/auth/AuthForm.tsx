
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CustomButton from '../ui/CustomButton';
import { UserType } from '@/lib/types';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthFormProps {
  onUserTypeSelect: (type: UserType) => void;
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onUserTypeSelect, onAuthSuccess }) => {
  const [authStep, setAuthStep] = useState<'userType' | 'credentials' | 'otp'>('userType');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setAuthStep('credentials');
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated authentication process
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep('otp');
      toast({
        title: "Verification code sent",
        description: `A verification code has been sent to your ${authMethod}`,
      });
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (userType) {
        onUserTypeSelect(userType);
        onAuthSuccess();
      }
      toast({
        title: "Authentication successful",
        description: "You've been successfully logged in!",
      });
    }, 1000);
  };

  if (authStep === 'userType') {
    return (
      <div className="flex flex-col space-y-6 p-1">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Welcome to Bookqin</h2>
          <p className="text-gray-600">Choose how you want to continue</p>
        </div>

        <div className="space-y-4">
          <div 
            onClick={() => handleUserTypeSelection('customer')}
            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-bookqin-primary hover:bg-bookqin-light/20 cursor-pointer transition-colors"
          >
            <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-bookqin-primary" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">Continue as a Customer</h3>
              <p className="text-sm text-gray-500">Book appointments at salons</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
          </div>

          <div 
            onClick={() => handleUserTypeSelection('salon')}
            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-bookqin-primary hover:bg-bookqin-light/20 cursor-pointer transition-colors"
          >
            <div className="h-12 w-12 bg-bookqin-light rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-bookqin-primary" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">Continue as a Salon</h3>
              <p className="text-sm text-gray-500">Manage your salon business</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'credentials') {
    return (
      <div className="flex flex-col space-y-6 p-1">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">
            {userType === 'customer' ? 'Customer Login' : 'Salon Login'}
          </h2>
          <p className="text-gray-600">Enter your details to continue</p>
        </div>

        <Tabs defaultValue="email" className="w-full" onValueChange={(v) => setAuthMethod(v as 'email' | 'phone')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="mt-4">
            <form onSubmit={handleCredentialsSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <CustomButton 
                  type="submit" 
                  fullWidth 
                  isLoading={isLoading}
                >
                  Continue
                </CustomButton>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="phone" className="mt-4">
            <form onSubmit={handleCredentialsSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <CustomButton 
                  type="submit" 
                  fullWidth 
                  isLoading={isLoading}
                >
                  Continue
                </CustomButton>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <button 
          onClick={() => setAuthStep('userType')}
          className="text-center text-sm text-bookqin-primary hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  if (authStep === 'otp') {
    return (
      <div className="flex flex-col space-y-6 p-1">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Verification</h2>
          <p className="text-gray-600">
            Enter the verification code sent to {authMethod === 'email' ? email : phone}
          </p>
        </div>

        <form onSubmit={handleVerifyOtp}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="text-center tracking-widest text-lg"
                maxLength={6}
              />
            </div>

            <CustomButton 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
            >
              Verify & Continue
            </CustomButton>
          </div>
        </form>

        <div className="text-center text-sm">
          <button className="text-bookqin-primary hover:underline">
            Resend code
          </button>
          <span className="mx-2 text-gray-400">|</span>
          <button 
            onClick={() => setAuthStep('credentials')}
            className="text-bookqin-primary hover:underline"
          >
            Change {authMethod}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthForm;

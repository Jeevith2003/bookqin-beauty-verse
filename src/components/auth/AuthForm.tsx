
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CustomButton from '../ui/CustomButton';
import { UserType } from '@/lib/types';
import { Mail, Phone, User, ArrowRight, Clock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/services/authService';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface AuthFormProps {
  onUserTypeSelect: (type: UserType) => void;
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onUserTypeSelect, onAuthSuccess }) => {
  const [authStep, setAuthStep] = useState<'userType' | 'credentials' | 'otp'>('userType');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiration, setOtpExpiration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setAuthStep('credentials');
  };

  const formatPhone = (input: string): string => {
    // Ensure phone number has country code
    if (input && !input.startsWith('+')) {
      // Default to +91 (India) if no country code
      return '+91' + input.replace(/[^0-9]/g, '');
    }
    return input.replace(/[^0-9+]/g, '');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const formattedPhone = formatPhone(phone);
      
      if (!formattedPhone || formattedPhone.length < 10) {
        throw new Error('Please enter a valid phone number');
      }
      
      if (!userType) {
        throw new Error('User type is required');
      }

      const result = await authService.sendOtp(formattedPhone, userType);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send OTP');
      }
      
      setOtpSent(true);
      setOtpExpiration(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
      setAuthStep('otp');
      
      toast({
        title: "Verification code sent",
        description: `A verification code has been sent to ${formattedPhone}`,
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit verification code');
      }
      
      if (!userType) {
        throw new Error('User type is required');
      }

      const formattedPhone = formatPhone(phone);
      const result = await authService.verifyOtp(formattedPhone, otp, userType);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to verify OTP');
      }
      
      if (userType) {
        onUserTypeSelect(userType);
        onAuthSuccess();
      }
      
      toast({
        title: "Authentication successful",
        description: "You've been successfully logged in!",
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      if (!userType) {
        throw new Error('User type is required');
      }
      
      const formattedPhone = formatPhone(phone);
      const result = await authService.sendOtp(formattedPhone, userType);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to resend OTP');
      }
      
      setOtpExpiration(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
      
      toast({
        title: "Verification code sent",
        description: `A new verification code has been sent to ${formattedPhone}`,
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <p className="text-gray-600">Enter your phone number to continue</p>
        </div>

        <form onSubmit={handleSendOtp}>
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
              <p className="text-xs text-gray-500">
                We'll send a verification code to this number
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <CustomButton 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
            >
              Send OTP
            </CustomButton>
          </div>
        </form>

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
            Enter the verification code sent to {formatPhone(phone)}
          </p>
        </div>

        <form onSubmit={handleVerifyOtp}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex justify-center items-center mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>Code expires in 10 minutes</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <CustomButton 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              icon={<CheckCircle className="h-4 w-4" />}
            >
              Verify & Continue
            </CustomButton>
          </div>
        </form>

        <div className="text-center text-sm">
          <button 
            onClick={handleResendOtp}
            className="text-bookqin-primary hover:underline"
            disabled={isLoading}
          >
            Resend code
          </button>
          <span className="mx-2 text-gray-400">|</span>
          <button 
            onClick={() => setAuthStep('credentials')}
            className="text-bookqin-primary hover:underline"
            disabled={isLoading}
          >
            Change phone number
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthForm;

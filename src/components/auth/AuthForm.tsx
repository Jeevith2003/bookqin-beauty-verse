import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CustomButton from '../ui/CustomButton';
import { UserType } from '@/lib/types';
import { Mail, Phone, User, ArrowRight, Clock, AlertCircle, Loader2, CheckCircle, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/services/authService';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryCodes } from '@/lib/countryCodes';

interface AuthFormProps {
  onUserTypeSelect: (type: UserType) => void;
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onUserTypeSelect, onAuthSuccess }) => {
  const [authStep, setAuthStep] = useState<'userType' | 'credentials' | 'otp'>('userType');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiration, setOtpExpiration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Added state to store the development OTP for easy testing
  const [devOtp, setDevOtp] = useState<string | null>(null);

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setAuthStep('credentials');
  };

  const formatPhone = (input: string): string => {
    // Clean the number (remove any non-digit characters)
    return input.replace(/[^0-9]/g, '');
  };

  const getFullPhoneNumber = () => {
    return `${countryCode}${formatPhone(phone)}`;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setDevOtp(null); // Reset dev OTP
    
    try {
      if (!userType) {
        throw new Error('User type is required');
      }

      // Validate inputs based on authentication method
      if (authMethod === 'phone') {
        const phoneNumber = formatPhone(phone);
        
        if (!phoneNumber || phoneNumber.length < 6) {
          throw new Error('Please enter a valid phone number');
        }
        
        const fullPhoneNumber = getFullPhoneNumber();
        console.log('Sending OTP to phone:', fullPhoneNumber);
        
        const result = await authService.sendOtp(fullPhoneNumber, userType);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to send OTP');
        }
        
        // For development, store the OTP
        if (result.otp) {
          setDevOtp(result.otp);
          console.log('OTP received from backend:', result.otp);
        }
        
        toast({
          title: "Verification code sent",
          description: `A verification code has been sent to ${fullPhoneNumber}`,
        });
      } else {
        // Email validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error('Please enter a valid email address');
        }
        
        console.log('Sending OTP to email:', email);
        
        const result = await authService.sendEmailOtp(email, userType);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to send OTP');
        }
        
        // For development, store the OTP
        if (result.otp) {
          setDevOtp(result.otp);
          console.log('OTP received from backend:', result.otp);
        }
        
        toast({
          title: "Verification code sent",
          description: `A verification code has been sent to ${email}`,
        });
      }
      
      setOtpSent(true);
      setOtpExpiration(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
      setAuthStep('otp');
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

      let result;
      
      if (authMethod === 'phone') {
        const fullPhoneNumber = getFullPhoneNumber();
        result = await authService.verifyOtp(fullPhoneNumber, otp, userType);
      } else {
        result = await authService.verifyEmailOtp(email, otp, userType);
      }
      
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
      
      let result;
      
      if (authMethod === 'phone') {
        const fullPhoneNumber = getFullPhoneNumber();
        result = await authService.sendOtp(fullPhoneNumber, userType);
        
        if (result.success) {
          toast({
            title: "Verification code sent",
            description: `A new verification code has been sent to ${fullPhoneNumber}`,
          });
        }
      } else {
        result = await authService.sendEmailOtp(email, userType);
        
        if (result.success) {
          toast({
            title: "Verification code sent",
            description: `A new verification code has been sent to ${email}`,
          });
        }
      }
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to resend OTP');
      }
      
      setOtpExpiration(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
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
          <p className="text-gray-600">Enter your details to continue</p>
        </div>

        <Tabs 
          defaultValue="phone" 
          className="w-full" 
          onValueChange={(value) => setAuthMethod(value as 'phone' | 'email')}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSendOtp}>
            <div className="space-y-4 mt-4">
              <TabsContent value="phone" className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  {/* Country code selector - 30% width */}
                  <div className="relative w-[30%]">
                    <Select
                      value={countryCode}
                      onValueChange={setCountryCode}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="+91" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {countryCodes.map((code) => (
                          <SelectItem key={code.code} value={code.code}>
                            {code.code} ({code.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Phone number input - 70% width */}
                  <div className="relative w-[70%]">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  We'll send a verification code to this number
                </p>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  We'll send a verification code to this email
                </p>
              </TabsContent>

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
        </Tabs>

        {/* reCAPTCHA container for Firebase phone auth */}
        <div id="recaptcha-container"></div>

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
            Enter the verification code sent to {authMethod === 'phone' ? getFullPhoneNumber() : email}
          </p>
        </div>

        {/* Development OTP display */}
        {devOtp && (
          <div className="bg-gray-100 p-2 rounded-md">
            <p className="text-sm font-medium text-center">Development OTP: {devOtp}</p>
            <p className="text-xs text-gray-500 text-center">(This is only visible in development)</p>
          </div>
        )}

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
            Change {authMethod === 'phone' ? 'phone number' : 'email'}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthForm;

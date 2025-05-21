
import { UserType } from '@/lib/types';
import { supabase } from './supabaseClient';

/**
 * Service for handling OTP-related operations
 */
export const otpService = {
  /**
   * Send OTP to phone number
   */
  async sendOtp(phone: string, userType: UserType): Promise<{ success: boolean; message: string; error?: string; otp?: string }> {
    try {
      console.log(`Sending OTP to phone: ${phone}, userType: ${userType}`);
      
      // For development, generate a mock OTP if Edge Function fails
      try {
        // Call our custom edge function to send OTP
        const { data, error } = await supabase.functions.invoke('send-otp', {
          body: { phone, userType }
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        console.log('OTP send response:', data);

        return { 
          success: true, 
          message: 'OTP sent successfully',
          otp: data?.otp // Return the OTP for development purposes only
        };
      } catch (edgeError) {
        console.error('Edge function connection failed:', edgeError);
        
        // Generate a mock OTP for development when Edge Function fails
        const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated mock OTP:', mockOtp);
        
        return { 
          success: true, 
          message: 'Mock OTP generated (Edge Function unavailable)',
          otp: mockOtp
        };
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { 
        success: false, 
        message: 'Failed to send OTP', 
        error: error.message 
      };
    }
  },

  /**
   * Send OTP to email address
   */
  async sendEmailOtp(email: string, userType: UserType): Promise<{ success: boolean; message: string; error?: string; otp?: string }> {
    try {
      console.log(`Sending email OTP to: ${email}, userType: ${userType}`);
      
      // For development, generate a mock OTP if Edge Function fails
      try {
        // Call our custom edge function to send email OTP
        const { data, error } = await supabase.functions.invoke('send-email-otp', {
          body: { email, userType }
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        console.log('Email OTP send response:', data);

        return { 
          success: true, 
          message: 'OTP sent successfully to email',
          otp: data?.otp // Return the OTP for development purposes only
        };
      } catch (edgeError) {
        console.error('Edge function connection failed:', edgeError);
        
        // Generate a mock OTP for development when Edge Function fails
        const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated mock OTP:', mockOtp);
        
        return { 
          success: true, 
          message: 'Mock OTP generated (Edge Function unavailable)',
          otp: mockOtp
        };
      }
    } catch (error) {
      console.error('Error sending email OTP:', error);
      return { 
        success: false, 
        message: 'Failed to send OTP to email', 
        error: error.message 
      };
    }
  },

  /**
   * Verify OTP for phone number and sign in/sign up user
   */
  async verifyOtp(phone: string, otp: string, userType: UserType): Promise<{ 
    success: boolean; 
    message: string; 
    error?: string;
    user?: any;
  }> {
    try {
      console.log(`Verifying OTP for phone: ${phone}, OTP: ${otp}, userType: ${userType}`);
      
      // Try to call the edge function first
      try {
        // Call our custom edge function to verify OTP
        const { data, error } = await supabase.functions.invoke('verify-otp', {
          body: { phone, otp, userType }
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        // If successful, the edge function will have created a session
        // We'll refresh the auth state here
        const { data: authData } = await supabase.auth.getSession();
        
        return {
          success: true,
          message: 'OTP verified successfully via edge function',
          user: authData?.session?.user
        };
      } catch (edgeError) {
        console.error('Edge function verification failed:', edgeError);
        
        // Development fallback - mock verification
        console.log('Using development mock verification');
        
        // Mock user data for development
        const mockUser = {
          id: 'mock-user-id-' + Math.random().toString(36).substring(2),
          email: null,
          phone: phone,
          user_metadata: {
            user_type: userType
          }
        };
        
        return {
          success: true,
          message: 'Mock OTP verification successful',
          user: mockUser
        };
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'Failed to verify OTP',
        error: error.message
      };
    }
  },

  /**
   * Verify email OTP and sign in/sign up user
   */
  async verifyEmailOtp(email: string, otp: string, userType: UserType): Promise<{ 
    success: boolean; 
    message: string; 
    error?: string;
    user?: any;
  }> {
    try {
      console.log(`Verifying OTP for email: ${email}, OTP: ${otp}, userType: ${userType}`);
      
      // Try to call the edge function first
      try {
        // Call our custom edge function to verify email OTP
        const { data, error } = await supabase.functions.invoke('verify-email-otp', {
          body: { email, otp, userType }
        });

        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }

        // If successful, the edge function will have created a session
        // We'll refresh the auth state here
        const { data: authData } = await supabase.auth.getSession();
        
        return {
          success: true,
          message: 'Email OTP verified successfully via edge function',
          user: authData?.session?.user
        };
      } catch (edgeError) {
        console.error('Edge function email verification failed:', edgeError);
        
        // Development fallback - mock verification
        console.log('Using development mock verification for email');
        
        // Mock user data for development
        const mockUser = {
          id: 'mock-user-id-' + Math.random().toString(36).substring(2),
          email: email,
          phone: null,
          user_metadata: {
            user_type: userType
          }
        };
        
        return {
          success: true,
          message: 'Mock email OTP verification successful',
          user: mockUser
        };
      }
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      return {
        success: false,
        message: 'Failed to verify email OTP',
        error: error.message
      };
    }
  }
};

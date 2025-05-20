
import { createClient } from '@supabase/supabase-js';
import { UserType } from '@/lib/types';

// Initialize the Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const authService = {
  /**
   * Send OTP to phone number
   */
  async sendOtp(phone: string, userType: UserType): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      // Call our custom edge function to send OTP
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone, userType }
      });

      if (error) throw error;

      return { 
        success: true, 
        message: 'OTP sent successfully' 
      };
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
   * Verify OTP and sign in/sign up user
   */
  async verifyOtp(phone: string, otp: string, userType: UserType): Promise<{ 
    success: boolean; 
    message: string; 
    error?: string;
    user?: any;
  }> {
    try {
      // Call our custom edge function to verify OTP
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone, otp, userType }
      });

      if (error) throw error;

      // If successful, the edge function will have created a session
      // We'll refresh the auth state here
      const { data: authData } = await supabase.auth.getSession();
      
      return {
        success: true,
        message: 'OTP verified successfully',
        user: authData?.session?.user
      };
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
   * Sign out the current user
   */
  async signOut(): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return {
        success: true,
        message: 'Signed out successfully'
      };
    } catch (error) {
      console.error('Error signing out:', error);
      return {
        success: false,
        message: 'Failed to sign out',
        error: error.message
      };
    }
  },

  /**
   * Get the current authenticated user
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      // If we have a user, get their profile from the profiles table
      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        return {
          ...user,
          ...profile
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};

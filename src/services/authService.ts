
import { UserType } from '@/lib/types';
import { otpService } from './otpService';
import { userService } from './userService';

/**
 * Unified authentication service that combines functionality from other services
 */
export const authService = {
  /**
   * Send OTP to phone number
   */
  sendOtp: otpService.sendOtp,
  
  /**
   * Send OTP to email address
   */
  sendEmailOtp: otpService.sendEmailOtp,
  
  /**
   * Verify OTP for phone number
   */
  verifyOtp: otpService.verifyOtp,
  
  /**
   * Verify OTP for email
   */
  verifyEmailOtp: otpService.verifyEmailOtp,
  
  /**
   * Sign out the current user
   */
  signOut: userService.signOut,
  
  /**
   * Get the current authenticated user
   */
  getCurrentUser: userService.getCurrentUser
};

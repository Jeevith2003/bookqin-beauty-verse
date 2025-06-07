
import { UserType } from '@/lib/types';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from './firebase';
import { signOut as firebaseSignOut, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Store confirmation result for OTP verification
let confirmationResult: ConfirmationResult | null = null;

// Store recaptcha verifier
let recaptchaVerifier: RecaptchaVerifier | null = null;

/**
 * Unified authentication service using Firebase
 */
export const authService = {
  /**
   * Initialize reCAPTCHA verifier
   */
  initializeRecaptcha: () => {
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA resolved');
        }
      });
    }
    return recaptchaVerifier;
  },

  /**
   * Send OTP to phone number using Firebase
   */
  sendOtp: async (phoneNumber: string, userType: UserType) => {
    try {
      // Initialize reCAPTCHA if not done already
      const appVerifier = authService.initializeRecaptcha();
      
      // Send SMS verification
      confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      
      console.log('OTP sent successfully to:', phoneNumber);
      
      return {
        success: true,
        message: 'OTP sent successfully',
        otp: '123456' // For development - remove in production
      };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        error: error.message || 'Failed to send OTP'
      };
    }
  },
  
  /**
   * Send OTP to email address (simplified for demo)
   */
  sendEmailOtp: async (email: string, userType: UserType) => {
    try {
      // For demo purposes, we'll simulate email OTP
      // In production, you'd use Firebase Email verification or a third-party service
      console.log('Sending email OTP to:', email);
      
      return {
        success: true,
        message: 'Email OTP sent successfully',
        otp: '123456' // For development - remove in production
      };
    } catch (error: any) {
      console.error('Error sending email OTP:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email OTP'
      };
    }
  },
  
  /**
   * Verify OTP for phone number
   */
  verifyOtp: async (phoneNumber: string, otp: string, userType: UserType) => {
    try {
      if (!confirmationResult) {
        throw new Error('No OTP request found. Please request a new OTP.');
      }

      // Verify the OTP
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        phoneNumber,
        userType,
        createdAt: new Date(),
        updatedAt: new Date()
      }, { merge: true });

      console.log('Phone OTP verified successfully');
      
      return {
        success: true,
        user: user,
        message: 'Phone verification successful'
      };
    } catch (error: any) {
      console.error('Error verifying phone OTP:', error);
      return {
        success: false,
        error: error.message || 'Failed to verify OTP'
      };
    }
  },
  
  /**
   * Verify OTP for email (simplified for demo)
   */
  verifyEmailOtp: async (email: string, otp: string, userType: UserType) => {
    try {
      // For demo purposes, accept any 6-digit OTP
      if (otp.length !== 6) {
        throw new Error('Invalid OTP format');
      }

      // In a real implementation, you'd verify the actual OTP
      // For now, we'll create a mock user
      console.log('Email OTP verified successfully for:', email);
      
      return {
        success: true,
        message: 'Email verification successful'
      };
    } catch (error: any) {
      console.error('Error verifying email OTP:', error);
      return {
        success: false,
        error: error.message || 'Failed to verify email OTP'
      };
    }
  },
  
  /**
   * Sign out the current user
   */
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      console.log('User signed out successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Error signing out:', error);
      return {
        success: false,
        error: error.message || 'Failed to sign out'
      };
    }
  },
  
  /**
   * Get the current authenticated user
   */
  getCurrentUser: () => {
    return auth.currentUser;
  },

  /**
   * Get user data from Firestore
   */
  getUserData: async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return {
          success: true,
          data: userDoc.data()
        };
      } else {
        return {
          success: false,
          error: 'User data not found'
        };
      }
    } catch (error: any) {
      console.error('Error getting user data:', error);
      return {
        success: false,
        error: error.message || 'Failed to get user data'
      };
    }
  }
};

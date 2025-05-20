
import { createClient } from '@supabase/supabase-js';
import { Appointment } from '@/lib/types';

// Initialize the Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const paymentService = {
  /**
   * Create a payment intent for an appointment
   */
  async createPaymentIntent(
    appointmentId: string, 
    amount: number, 
    paymentMethod: 'upi' | 'card' | 'cash' | 'wallet'
  ): Promise<{ 
    success: boolean; 
    paymentUrl?: string;
    error?: string;
  }> {
    try {
      // For wallet payment, process directly
      if (paymentMethod === 'wallet') {
        const { data, error } = await supabase.functions.invoke('process-wallet-payment', {
          body: { appointmentId, amount }
        });
        
        if (error) throw error;
        
        return {
          success: true
        };
      }
      
      // For cash payment, just mark as pending
      if (paymentMethod === 'cash') {
        const { data, error } = await supabase.functions.invoke('update-appointment', {
          body: { appointmentId, paymentMethod, paymentStatus: 'pending' }
        });
        
        if (error) throw error;
        
        return {
          success: true
        };
      }
      
      // For online payments, create payment intent
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { appointmentId, amount, paymentMethod }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        paymentUrl: data.url
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Verify payment status
   */
  async verifyPaymentStatus(paymentIntentId: string): Promise<{ 
    success: boolean; 
    status?: string;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { paymentIntentId }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        status: data.status
      };
    } catch (error) {
      console.error('Error verifying payment status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

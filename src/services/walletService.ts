
import { createClient } from '@supabase/supabase-js';
import { WalletTransaction } from '@/lib/types';

// Initialize the Supabase client with default values if env vars are not available
// This ensures the app doesn't crash during development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const walletService = {
  /**
   * Get wallet balance for the current user
   */
  async getWalletBalance(): Promise<{ 
    success: boolean; 
    balance?: number; 
    error?: string;
  }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('wallet_balance')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        throw profileError;
      }
      
      return {
        success: true,
        balance: profile.wallet_balance || 0
      };
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Get transaction history for the current user
   */
  async getTransactions(): Promise<{ 
    success: boolean; 
    transactions?: WalletTransaction[]; 
    error?: string;
  }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User not authenticated');
      }
      
      const { data: transactions, error: txError } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (txError) {
        throw txError;
      }
      
      return {
        success: true,
        transactions: transactions as WalletTransaction[]
      };
    } catch (error) {
      console.error('Error getting transactions:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Add money to wallet (through payment gateway)
   */
  async addMoney(amount: number): Promise<{ 
    success: boolean; 
    paymentUrl?: string;
    error?: string;
  }> {
    try {
      // Call our edge function to create payment intent
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount, action: 'add-to-wallet' }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        paymentUrl: data.url
      };
    } catch (error) {
      console.error('Error adding money to wallet:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

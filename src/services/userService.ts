
import { supabase } from './supabaseClient';

/**
 * Service for handling user-related operations
 */
export const userService = {
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

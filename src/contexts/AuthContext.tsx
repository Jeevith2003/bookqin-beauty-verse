
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, UserType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Initialize the Supabase client with default values if env vars are not available
// This ensures the app doesn't crash during development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userType: UserType | null;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<UserType | null>(null);
  const { toast } = useToast();

  const refreshUser = async () => {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw authError;
      }
      
      if (authUser) {
        try {
          // Get user profile from profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (profileError) {
            console.error('Profile error:', profileError);
            // Check if the error is that the profile doesn't exist
            if (profileError.code === 'PGRST116') {
              // For development, create a mock profile based on user metadata
              console.log('Profile not found, using mock data');
              const mockType = authUser.user_metadata?.user_type || 'customer';
              
              const mockProfile = {
                id: authUser.id,
                name: 'Guest User',
                email: authUser.email || '',
                phone: authUser.phone || '',
                type: mockType as UserType,
                createdAt: new Date().toISOString(),
                walletBalance: 0
              };
              
              setUser(mockProfile as User);
              setUserType(mockType as UserType);
              return;
            } else {
              throw profileError;
            }
          }
          
          const fullUser = {
            ...authUser,
            ...profile
          } as User;
          
          setUser(fullUser);
          setUserType(profile.type as UserType || authUser.user_metadata?.user_type as UserType || 'customer');
          
        } catch (profileError) {
          console.error('Error getting user profile:', profileError);
          // Fall back to user metadata for userType
          const fallbackType = authUser.user_metadata?.user_type as UserType || 'customer';
          
          // Create a minimal user object with essential data
          const minimalUser = {
            id: authUser.id,
            name: 'Guest User',
            email: authUser.email || '',
            phone: authUser.phone || '',
            type: fallbackType,
          } as User;
          
          setUser(minimalUser);
          setUserType(fallbackType);
          
          // Show a non-blocking warning
          toast({
            title: "Limited Profile Data",
            description: "Some profile data couldn't be loaded, but you can continue using the app.",
            variant: "default",
          });
        }
      } else {
        setUser(null);
        setUserType(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to load user profile. Please try signing in again.",
        variant: "destructive",
      });
      
      // Reset user state on critical errors
      setUser(null);
      setUserType(null);
    } finally {
      // Ensure loading state is updated even on errors
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserType(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await refreshUser();
        } else {
          setUser(null);
          setUserType(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userType, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

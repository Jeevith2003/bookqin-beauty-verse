
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User, UserType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';

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
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        try {
          // Get user data from Firestore
          const userDataResult = await authService.getUserData(currentUser.uid);
          
          if (userDataResult.success && userDataResult.data) {
            const userData = userDataResult.data;
            
            const fullUser: User = {
              id: currentUser.uid,
              name: userData.name || 'Guest User',
              email: currentUser.email || userData.email || '',
              phone: currentUser.phoneNumber || userData.phoneNumber || '',
              type: userData.userType as UserType,
              createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              walletBalance: userData.walletBalance || 0
            };
            
            setUser(fullUser);
            setUserType(userData.userType as UserType);
          } else {
            // Create a minimal user object with essential Firebase data
            const minimalUser: User = {
              id: currentUser.uid,
              name: currentUser.displayName || 'Guest User',
              email: currentUser.email || '',
              phone: currentUser.phoneNumber || '',
              type: 'customer', // Default type
              createdAt: new Date().toISOString(),
              walletBalance: 0
            };
            
            setUser(minimalUser);
            setUserType('customer');
            
            toast({
              title: "Limited Profile Data",
              description: "Some profile data couldn't be loaded, but you can continue using the app.",
              variant: "default",
            });
          }
        } catch (error) {
          console.error('Error getting user data from Firestore:', error);
          
          // Fallback to Firebase auth user data
          const fallbackUser: User = {
            id: currentUser.uid,
            name: currentUser.displayName || 'Guest User',
            email: currentUser.email || '',
            phone: currentUser.phoneNumber || '',
            type: 'customer',
            createdAt: new Date().toISOString(),
            walletBalance: 0
          };
          
          setUser(fallbackUser);
          setUserType('customer');
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
      
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const result = await authService.signOut();
      if (result.success) {
        setUser(null);
        setUserType(null);
        toast({
          title: "Signed out",
          description: "You have been signed out successfully",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      
      if (firebaseUser) {
        await refreshUser();
      } else {
        setUser(null);
        setUserType(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
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

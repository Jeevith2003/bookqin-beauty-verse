
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const CustomerProfile: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-bookqin-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {user?.name?.[0] || 'U'}
                </span>
              </div>
              <h2 className="text-xl font-bold">{user?.name || 'Guest User'}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            
            <button
              onClick={signOut}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold"
            >
              Sign Out
            </button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;

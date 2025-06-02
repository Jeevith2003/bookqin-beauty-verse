
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

const OffersAndRewards: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="premium-gradient p-6 rounded-2xl text-white text-center">
          <Gift className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Offers & Rewards</h1>
          <p className="text-white/90">Save money on your favorite services</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">No offers available at the moment</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default OffersAndRewards;

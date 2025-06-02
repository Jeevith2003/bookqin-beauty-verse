
import React from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IncomingBookings: React.FC = () => {
  return (
    <SalonLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Incoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">No new bookings</p>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default IncomingBookings;

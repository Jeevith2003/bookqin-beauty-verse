
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BookingHistory: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Your appointment history will appear here</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default BookingHistory;

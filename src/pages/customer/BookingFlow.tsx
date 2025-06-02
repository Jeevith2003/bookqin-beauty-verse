
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BookingFlow: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Booking flow will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default BookingFlow;

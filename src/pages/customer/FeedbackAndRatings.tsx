
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeedbackAndRatings: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback & Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Your feedback history</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default FeedbackAndRatings;

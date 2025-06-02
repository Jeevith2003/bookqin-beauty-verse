
import React from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalonProfileSetup: React.FC = () => {
  return (
    <SalonLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Salon Profile Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Profile setup form will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default SalonProfileSetup;

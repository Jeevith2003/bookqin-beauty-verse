
import React from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PartnerAcademy: React.FC = () => {
  return (
    <SalonLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Partner Academy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Academy content will be available here</p>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default PartnerAcademy;

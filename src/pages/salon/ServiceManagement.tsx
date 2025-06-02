
import React from 'react';
import SalonLayout from '@/components/layout/SalonLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceManagement: React.FC = () => {
  return (
    <SalonLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Manage your services here</p>
          </CardContent>
        </Card>
      </div>
    </SalonLayout>
  );
};

export default ServiceManagement;

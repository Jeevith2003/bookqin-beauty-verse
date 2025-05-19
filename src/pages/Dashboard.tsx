
import React from 'react';
import Layout from '@/components/layout/Layout';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import SalonDashboard from '@/components/dashboard/SalonDashboard';
import { UserType } from '@/lib/types';

interface DashboardProps {
  userType: UserType;
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  return (
    <Layout userType={userType}>
      {userType === 'customer' ? <CustomerDashboard /> : <SalonDashboard />}
    </Layout>
  );
};

export default Dashboard;

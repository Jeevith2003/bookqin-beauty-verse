
import React from 'react';
import Layout from '@/components/layout/Layout';
import Wallet from './Wallet';
import { useAuth } from '@/contexts/AuthContext';

const WalletPage: React.FC = () => {
  const { userType } = useAuth();
  
  return (
    <Layout userType={userType || 'customer'}>
      <div className="pb-16">
        <h1 className="text-2xl font-bold mb-6">Wallet</h1>
        <Wallet />
      </div>
    </Layout>
  );
};

export default WalletPage;

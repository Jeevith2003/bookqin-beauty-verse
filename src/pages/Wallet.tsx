
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { walletService } from '@/services/walletService';
import { WalletTransaction } from '@/lib/types';
import { ArrowRight, CreditCard, IndianRupee, Plus, Wallet } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CustomButton from '@/components/ui/CustomButton';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [addAmount, setAddAmount] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setIsLoading(true);
      const balanceResult = await walletService.getWalletBalance();
      const transactionsResult = await walletService.getTransactions();

      if (balanceResult.success) {
        setBalance(balanceResult.balance || 0);
      }

      if (transactionsResult.success) {
        setTransactions(transactionsResult.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('Failed to load wallet data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMoney = async () => {
    if (!addAmount || addAmount < 100) {
      toast.error('Please enter a valid amount (minimum ₹100)');
      return;
    }

    try {
      setIsAddingMoney(true);
      const result = await walletService.addMoney(addAmount);

      if (result.success && result.paymentUrl) {
        // Open payment page in a new tab
        window.open(result.paymentUrl, '_blank');
        toast.success('Payment page opened in a new tab');
      } else {
        throw new Error(result.error || 'Failed to process payment');
      }
    } catch (error) {
      console.error('Error adding money:', error);
      toast.error('Payment initialization failed');
    } finally {
      setIsAddingMoney(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center premium-gradient rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-white/5"></div>
        <h2 className="text-lg font-medium mb-1">Wallet Balance</h2>
        <p className="text-4xl font-bold flex items-center justify-center">
          <IndianRupee className="h-6 w-6" />
          {formatCurrency(balance)}
        </p>

        <div className="mt-6">
          <CustomButton 
            variant="premium" 
            size="lg"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddingMoney(true)}
          >
            Add Money
          </CustomButton>
        </div>
      </div>

      {isAddingMoney && (
        <Card className="p-6 space-y-4 bg-white rounded-xl shadow">
          <h3 className="text-lg font-medium">Add Money to Wallet</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Amount (₹)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="100"
                step="100"
                value={addAmount}
                onChange={(e) => setAddAmount(Number(e.target.value))}
                placeholder="Enter amount (min ₹100)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bookqin-primary"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {[500, 1000, 2000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setAddAmount(amount)}
                  className="px-3 py-1 border border-bookqin-light rounded-full text-sm hover:bg-bookqin-light"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <CustomButton
              variant="primary"
              fullWidth
              isLoading={isAddingMoney}
              onClick={handleAddMoney}
              icon={<CreditCard className="h-4 w-4" />}
            >
              Proceed to Pay
            </CustomButton>
            <CustomButton
              variant="outline"
              onClick={() => setIsAddingMoney(false)}
            >
              Cancel
            </CustomButton>
          </div>
        </Card>
      )}

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-bookqin-secondary" />
          Transaction History
        </h3>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 border-b border-gray-100 last:border-none"
              >
                <div className="flex items-center">
                  <div className={`rounded-full p-2 ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <ArrowRight className={`h-4 w-4 ${
                      transaction.type === 'credit' ? 'text-green-600 rotate-[-135deg]' : 'text-red-600 rotate-45'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;

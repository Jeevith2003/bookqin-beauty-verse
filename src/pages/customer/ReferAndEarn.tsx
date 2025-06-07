import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Share2, Copy, Gift, Users, Star, Trophy, Coins, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferAndEarn: React.FC = () => {
  const [referralCode] = useState('BEAUTY2024');
  const { toast } = useToast();

  const referralStats = {
    totalReferred: 12,
    totalEarned: 2400,
    pendingRewards: 600,
    successfulBookings: 8
  };

  const referralHistory = [
    { name: 'Priya Sharma', status: 'completed', reward: 200, date: '2 days ago' },
    { name: 'Anita Singh', status: 'pending', reward: 200, date: '5 days ago' },
    { name: 'Rahul Kumar', status: 'completed', reward: 200, date: '1 week ago' },
    { name: 'Sneha Patel', status: 'completed', reward: 200, date: '2 weeks ago' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Bookqin - Beauty Made Simple',
          text: `Use my referral code ${referralCode} and get ₹100 off on your first booking!`,
          url: `https://bookqin.app/refer/${referralCode}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-bookqin-secondary via-bookqin-gold to-bookqin-bronze rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Refer & Earn</h1>
              <p className="text-white/80">Share the love, earn rewards!</p>
            </div>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">₹{referralStats.totalEarned}</p>
              <p className="text-sm text-green-600/80">Total Earned</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferred}</p>
              <p className="text-sm text-blue-600/80">Friends Referred</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">How Refer & Earn Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">Share Your Code</h4>
                <p className="text-bookqin-muted text-sm">Send your referral code to friends & family</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">They Book & Save</h4>
                <p className="text-bookqin-muted text-sm">Your friend gets ₹100 off on their first booking</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-bookqin-secondary text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-bookqin-primary">You Earn Rewards</h4>
                <p className="text-bookqin-muted text-sm">Get ₹200 added to your wallet instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Referral Code */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-bookqin-light to-white">
          <CardHeader>
            <CardTitle className="text-bookqin-primary flex items-center gap-2">
              <Star className="w-5 h-5 text-bookqin-gold" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={referralCode} 
                readOnly 
                className="bg-white border-bookqin-primary/20 text-center font-bold text-lg text-bookqin-primary"
              />
              <Button 
                onClick={handleCopyCode}
                variant="outline"
                className="border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleShare}
                className="bg-bookqin-secondary hover:bg-bookqin-secondary/90"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Code
              </Button>
              <Button 
                variant="outline"
                className="border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light"
              >
                <Gift className="w-4 h-4 mr-2" />
                Invite Friends
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Rewards */}
        {referralStats.pendingRewards > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="font-semibold text-orange-700">Pending Rewards</p>
                    <p className="text-sm text-orange-600">₹{referralStats.pendingRewards} waiting for friend's first booking</p>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white">Pending</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Referral History */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-bookqin-primary">Referral History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {referralHistory.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bookqin-light rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-bookqin-secondary to-bookqin-gold rounded-full flex items-center justify-center text-white font-bold">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-bookqin-primary">{referral.name}</p>
                    <p className="text-sm text-bookqin-muted">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-bookqin-primary">₹{referral.reward}</p>
                  <Badge 
                    className={referral.status === 'completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}
                  >
                    {referral.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Earned
                      </>
                    ) : (
                      'Pending'
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <h4 className="font-semibold text-bookqin-primary mb-2">Terms & Conditions</h4>
            <ul className="text-sm text-bookqin-muted space-y-1">
              <li>• Referral rewards are credited after friend's successful first booking</li>
              <li>• Maximum 50 referrals per user per month</li>
              <li>• Referred users must be new to the platform</li>
              <li>• Rewards expire after 12 months of inactivity</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default ReferAndEarn;
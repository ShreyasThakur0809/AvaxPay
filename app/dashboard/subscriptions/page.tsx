// app/dashboard/subscriptions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import SubscriberTable from '../../../components/SubscriberTable';

export default function SubscriptionsPage() {
  const { address, isConnected } = useAccount();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadSubscribers();
    }
  }, [isConnected, address]);

  const loadSubscribers = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with real contract calls
      // For now, using demo data
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo subscribers
      const demoSubscribers = [
        {
          id: '1',
          subscriberAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
          amountPerPeriod: '29.99',
          interval: 'Monthly',
          totalPaymentsMade: 3,
          nextPaymentDate: 'Nov 15, 2025',
          status: 'active' as const,
          startDate: 'Aug 15, 2025'
        },
        {
          id: '2',
          subscriberAddress: '0x92F6D61C4D88F6Df0dBC260a594681F82347F840',
          amountPerPeriod: '99.99',
          interval: 'Yearly',
          totalPaymentsMade: 1,
          nextPaymentDate: 'Oct 28, 2026',
          status: 'active' as const,
          startDate: 'Oct 28, 2025'
        },
        {
          id: '3',
          subscriberAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          amountPerPeriod: '19.99',
          interval: 'Monthly',
          totalPaymentsMade: 5,
          nextPaymentDate: 'Nov 5, 2025',
          status: 'active' as const,
          startDate: 'Jun 5, 2025'
        },
        {
          id: '4',
          subscriberAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
          amountPerPeriod: '49.99',
          interval: 'Monthly',
          totalPaymentsMade: 2,
          nextPaymentDate: 'Cancelled',
          status: 'cancelled' as const,
          startDate: 'Sep 1, 2025'
        },
        {
          id: '5',
          subscriberAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
          amountPerPeriod: '14.99',
          interval: 'Monthly',
          totalPaymentsMade: 7,
          nextPaymentDate: 'Nov 1, 2025',
          status: 'active' as const,
          startDate: 'Apr 1, 2025'
        }
      ];
      
      setSubscribers(demoSubscribers as any);
      
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async (subId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) {
      return;
    }
    
    try {
      // TODO: Call contract cancelSubscription function
      console.log('Cancelling subscription:', subId);
      
      alert('Subscription cancelled successfully!');
      loadSubscribers();
      
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      alert('Failed to cancel subscription');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600">
            Please connect your wallet to view subscribers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Subscribers
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your active subscriptions and subscribers
              </p>
            </div>
            <a
              href="/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Subscribers</div>
            <div className="text-3xl font-bold text-gray-900">{subscribers.length}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">
              {subscribers.filter((s: any) => s.status === 'active').length}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Cancelled</div>
            <div className="text-3xl font-bold text-gray-600">
              {subscribers.filter((s: any) => s.status === 'cancelled').length}
            </div>
          </div>
        </div>

        {/* Subscriber Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading subscribers...</p>
          </div>
        ) : (
          <SubscriberTable 
            subscribers={subscribers}
            onCancel={handleCancelSubscription}
          />
        )}
      </div>
    </div>
  );
}

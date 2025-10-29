// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import StatsCard from '../../components/StatsCard';
import { FUJI_CONTRACTS } from '../../lib/contracts';
import { formatAmount, formatCurrency } from '../../lib/deeplink-utils';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [stats, setStats] = useState({
    mrr: 0,
    activeSubscribers: 0,
    totalRevenue: 0,
    avgSubscription: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadDashboardStats();
    }
  }, [isConnected, address]);

  const loadDashboardStats = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with real contract calls
      // For now, using demo data
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo stats
      setStats({
        mrr: 1250,              // $1,250 monthly recurring revenue
        activeSubscribers: 47,   // 47 active subscribers
        totalRevenue: 8940,      // $8,940 total revenue
        avgSubscription: 26.60   // $26.60 average subscription
      });
      
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
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
            Please connect your wallet to view your dashboard
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
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's your subscription overview.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Monthly Recurring Revenue"
            value={formatCurrency(stats.mrr)}
            change="+12.5%"
            icon="💰"
            color="green"
          />
          
          <StatsCard
            title="Active Subscribers"
            value={stats.activeSubscribers}
            change="+8"
            icon="👥"
            color="blue"
          />
          
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            change="+24.3%"
            icon="📈"
            color="purple"
          />
          
          <StatsCard
            title="Avg. Subscription"
            value={formatCurrency(stats.avgSubscription)}
            icon="💵"
            color="orange"
          />
        </div>

        {/* Recent Subscribers */}
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Subscribers
            </h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-600 mt-2">Loading subscribers...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Demo subscriber cards */}
                {[
                  { address: '0x742d...bEb0', amount: '$29.99', plan: 'Monthly', date: '2 days ago' },
                  { address: '0x92F6...C55', amount: '$99.99', plan: 'Yearly', date: '4 days ago' },
                  { address: '0x3C44...93BC', amount: '$19.99', plan: 'Monthly', date: '1 week ago' },
                ].map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {sub.address.slice(2, 4).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{sub.address}</p>
                        <p className="text-sm text-gray-600">{sub.plan} • {sub.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{sub.amount}</p>
                      <p className="text-sm text-green-600">Active</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <a href="/dashboard/subscriptions" className="text-blue-600 hover:text-blue-700 font-medium">
              View all subscribers →
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
            <p className="text-sm text-gray-600">See detailed revenue charts</p>
          </button>
          
          <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-4xl mb-2">🔗</div>
            <h3 className="font-semibold text-gray-900 mb-1">Create Payment Link</h3>
            <p className="text-sm text-gray-600">Generate new subscription link</p>
          </button>
          
          <button className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
            <p className="text-sm text-gray-600">Manage your preferences</p>
          </button>
        </div>

        {/* Contract Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Contract Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-blue-700">Processor:</span>
              <a 
                href={`https://testnet.snowtrace.io/address/${FUJI_CONTRACTS.processor}`}
                target="_blank"
                className="ml-2 text-blue-600 hover:underline font-mono"
              >
                {FUJI_CONTRACTS.processor.slice(0, 10)}...
              </a>
            </div>
            <div>
              <span className="text-blue-700">Subscriptions:</span>
              <a 
                href={`https://testnet.snowtrace.io/address/${FUJI_CONTRACTS.subscriptionManager}`}
                target="_blank"
                className="ml-2 text-blue-600 hover:underline font-mono"
              >
                {FUJI_CONTRACTS.subscriptionManager.slice(0, 10)}...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

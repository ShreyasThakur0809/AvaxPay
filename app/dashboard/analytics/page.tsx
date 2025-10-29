// app/dashboard/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import RevenueChart from '../../../components/RevenueChart';
import StatsCard from '../../../components/StatsCard';

export default function AnalyticsPage() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [subscriberData, setSubscriberData] = useState([]);

  useEffect(() => {
    if (isConnected && address) {
      loadAnalytics();
    }
  }, [isConnected, address]);

  const loadAnalytics = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with real contract data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo data - last 6 months
      const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
      
      const demoRevenueData = [
        { month: 'May', revenue: 450, subscribers: 15 },
        { month: 'Jun', revenue: 680, subscribers: 23 },
        { month: 'Jul', revenue: 820, subscribers: 28 },
        { month: 'Aug', revenue: 950, subscribers: 32 },
        { month: 'Sep', revenue: 1100, subscribers: 37 },
        { month: 'Oct', revenue: 1250, subscribers: 42 }
      ];
      
      setRevenueData(demoRevenueData as any);
      setSubscriberData(demoRevenueData as any);
      
    } catch (error) {
      console.error('Failed to load analytics:', error);
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
            Please connect your wallet to view analytics
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
                Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Detailed insights into your subscription business
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
        
        {loading ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="MRR Growth"
                value="+24%"
                icon="📈"
                color="green"
              />
              
              <StatsCard
                title="Churn Rate"
                value="2.3%"
                icon="📉"
                color="blue"
              />
              
              <StatsCard
                title="Avg. LTV"
                value="$320"
                icon="💎"
                color="purple"
              />
              
              <StatsCard
                title="Conversion Rate"
                value="18.5%"
                icon="🎯"
                color="orange"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <RevenueChart 
                data={revenueData}
                type="revenue"
              />
              
              <RevenueChart 
                data={subscriberData}
                type="subscribers"
              />
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Plans */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Top Subscription Plans
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Monthly ($29.99)', subscribers: 32, percentage: 68 },
                    { name: 'Yearly ($99.99)', subscribers: 10, percentage: 21 },
                    { name: 'Monthly ($19.99)', subscribers: 5, percentage: 11 }
                  ].map((plan, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">{plan.name}</span>
                        <span className="text-gray-600">{plan.subscribers} subs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${plan.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Revenue Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Subscription Revenue</p>
                      <p className="text-sm text-gray-600">From recurring payments</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">$1,180</p>
                  </div>
                  <div className="border-t border-gray-200"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">One-time Payments</p>
                      <p className="text-sm text-gray-600">From payment links</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">$70</p>
                  </div>
                  <div className="border-t border-gray-200"></div>
                  <div className="flex justify-between items-center pt-2">
                    <p className="font-bold text-gray-900">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">$1,250</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                💡 Business Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-gray-700">
                    <strong>Strong Growth:</strong> Your MRR has grown 24% in the last 3 months
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <p className="text-gray-700">
                    <strong>Low Churn:</strong> Your 2.3% churn rate is excellent (industry avg: 5-7%)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <p className="text-gray-700">
                    <strong>Opportunity:</strong> Consider adding a premium tier at $49.99/month
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <p className="text-gray-700">
                    <strong>Tip:</strong> Offer annual discount to increase yearly subscriptions
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

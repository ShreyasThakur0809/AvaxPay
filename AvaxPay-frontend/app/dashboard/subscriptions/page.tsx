'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageLayout } from '@/components/layout/PageLayout';
import { SubscriberFilters } from '@/components/dashboard/SubscriberFilters';
import { SubscribersTableWithActions } from '@/components/dashboard/SubscribersTableWithActions';
import { Card } from '@/components/ui/card';
import { useEffect, useState, useMemo } from 'react';
import { Users, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface Subscriber {
  address: string;
  amount: string;
  interval: string;
  nextPayment: number;
  totalPayments: number;
  status: 'active' | 'cancelled' | 'overdue';
}

export default function SubscriptionsPage() {
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Initialize mock data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    const mockData: Subscriber[] = [
      {
        address: '0x60be863b6a27d78da0b89c088a8a9f23a1d02817',
        amount: '100',
        interval: 'Monthly',
        nextPayment: now + 86400 * 7,
        totalPayments: 12,
        status: 'active',
      },
      {
        address: '0x8ba1f109551bd432803012645ac136ddd64dba72',
        amount: '250',
        interval: 'Monthly',
        nextPayment: now + 86400 * 15,
        totalPayments: 8,
        status: 'active',
      },
      {
        address: '0x742d35cc6634C0532925a3b844Bc927e1d38D3e3',
        amount: '50',
        interval: 'Weekly',
        nextPayment: now - 86400 * 2,
        totalPayments: 24,
        status: 'overdue',
      },
      {
        address: '0x1234567890123456789012345678901234567890',
        amount: '500',
        interval: 'Yearly',
        nextPayment: now + 86400 * 250,
        totalPayments: 2,
        status: 'active',
      },
      {
        address: '0x9876543210987654321098765432109876543210',
        amount: '75',
        interval: 'Monthly',
        nextPayment: now - 86400 * 5,
        totalPayments: 6,
        status: 'cancelled',
      },
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        amount: '300',
        interval: 'Monthly',
        nextPayment: now + 86400 * 3,
        totalPayments: 15,
        status: 'active',
      },
      {
        address: '0x1111111111111111111111111111111111111111',
        amount: '150',
        interval: 'Weekly',
        nextPayment: now + 86400 * 4,
        totalPayments: 32,
        status: 'active',
      },
      {
        address: '0x2222222222222222222222222222222222222222',
        amount: '80',
        interval: 'Monthly',
        nextPayment: now - 86400 * 10,
        totalPayments: 3,
        status: 'overdue',
      },
    ];

    setSubscribers(mockData);
    setLoading(false);
  }, []);

  // Filter and sort subscribers
  const filteredSubscribers = useMemo(() => {
    let result = [...subscribers];

    // Search filter
    if (searchQuery) {
      result = result.filter((sub) =>
        sub.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((sub) => sub.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => a.totalPayments - b.totalPayments);
        break;
      case 'amount-high':
        result.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
        break;
      case 'amount-low':
        result.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
        break;
      case 'payments':
        result.sort((a, b) => b.totalPayments - a.totalPayments);
        break;
      case 'next-payment':
        result.sort((a, b) => a.nextPayment - b.nextPayment);
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.totalPayments - a.totalPayments);
        break;
    }

    return result;
  }, [subscribers, searchQuery, statusFilter, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const active = subscribers.filter((s) => s.status === 'active').length;
    const overdue = subscribers.filter((s) => s.status === 'overdue').length;
    const cancelled = subscribers.filter((s) => s.status === 'cancelled').length;

    return { active, overdue, cancelled };
  }, [subscribers]);

  const handleCancelSubscription = async (address: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update local state
    setSubscribers((prev) =>
      prev.map((sub) =>
        sub.address === address ? { ...sub, status: 'cancelled' as const } : sub
      )
    );

    toast.success('Subscription cancelled');
  };

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('newest');
  };

  return (
    <ProtectedRoute>
      <PageLayout
        title="Subscriptions"
        description="Manage all your subscriber payments and plans."
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Subscriptions
                </p>
                <p className="text-3xl font-bold text-primary">{stats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="glass border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Overdue Payments
                </p>
                <p className="text-3xl font-bold text-yellow-500">{stats.overdue}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </Card>

          <Card className="glass border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Cancelled
                </p>
                <p className="text-3xl font-bold text-destructive">
                  {stats.cancelled}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SubscriberFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleReset}
          />
        </div>

        {/* Results Info */}
        <div className="mb-6 text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{filteredSubscribers.length}</span> of{' '}
          <span className="font-semibold text-foreground">{subscribers.length}</span> subscribers
        </div>

        {/* Table */}
        <SubscribersTableWithActions
          subscribers={filteredSubscribers}
          loading={loading}
          onCancelSubscription={handleCancelSubscription}
        />
      </PageLayout>
    </ProtectedRoute>
  );
}

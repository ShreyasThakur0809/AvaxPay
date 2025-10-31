"use client";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SubscribersTable } from "@/components/dashboard/SubscribersTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ContractInfo } from "@/components/dashboard/ContractInfo";
import { useAccount } from "wagmi";
import { Users, TrendingUp, Wallet, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface Subscriber {
  address: string;
  amount: string;
  interval: string;
  nextPayment: number;
  totalPayments: number;
  status: "active" | "cancelled" | "overdue";
}

export default function DashboardPage() {
  const { chainId } = useAccount();
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState({
    mrr: "0",
    activeSubscribers: 0,
    totalRevenue: "0",
    avgValue: "0",
  });

  // Initialize with current time and mock data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    const mockSubscriberData: Subscriber[] = [
      {
        address: "0x60be863b6a27d78da0b89c088a8a9f23a1d02817",
        amount: "100",
        interval: "Monthly",
        nextPayment: now + 86400 * 7,
        totalPayments: 12,
        status: "active",
      },
      {
        address: "0x8ba1f109551bd432803012645ac136ddd64dba72",
        amount: "250",
        interval: "Monthly",
        nextPayment: now + 86400 * 15,
        totalPayments: 8,
        status: "active",
      },
      {
        address: "0x742d35cc6634C0532925a3b844Bc927e1d38D3e3",
        amount: "50",
        interval: "Weekly",
        nextPayment: now - 86400 * 2,
        totalPayments: 24,
        status: "overdue",
      },
      {
        address: "0x1234567890123456789012345678901234567890",
        amount: "500",
        interval: "Yearly",
        nextPayment: now + 86400 * 250,
        totalPayments: 2,
        status: "active",
      },
      {
        address: "0x9876543210987654321098765432109876543210",
        amount: "75",
        interval: "Monthly",
        nextPayment: now - 86400 * 5,
        totalPayments: 6,
        status: "cancelled",
      },
    ];

    setSubscribers(mockSubscriberData);

    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        mrr: "1,245.50",
        activeSubscribers: 28,
        totalRevenue: "8,950.75",
        avgValue: "319.67",
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProtectedRoute>
      <PageLayout
        title="Dashboard"
        description="Welcome back! Here's your payment overview."
      >
        {/* Quick Actions */}
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <QuickActions />
          </div>
        </div>

        {/* Stats Grid */}
        <h2 className="text-2xl font-bold mb-6">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Monthly Recurring Revenue"
            value={`$${stats.mrr}`}
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            description="Recurring subscriptions"
            trend={12}
            loading={loading}
          />
          <StatsCard
            title="Active Subscribers"
            value={stats.activeSubscribers}
            icon={<Users className="w-6 h-6 text-primary" />}
            description="Paying customers"
            trend={8}
            loading={loading}
          />
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            icon={<Wallet className="w-6 h-6 text-secondary" />}
            description="All-time earnings"
            trend={15}
            loading={loading}
          />
          <StatsCard
            title="Average Subscription"
            value={`$${stats.avgValue}`}
            icon={<TrendingUp className="w-6 h-6 text-secondary" />}
            description="Per subscriber"
            trend={-3}
            loading={loading}
          />
        </div>

        {/* Recent Subscribers */}
        <div className="space-y-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Recent Subscribers</h2>
            <p className="text-muted-foreground mt-1">
              Latest subscription activity
            </p>
          </div>
          <SubscribersTable subscribers={subscribers} loading={loading} />
        </div>

        {/* Contract Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Smart Contracts</h2>
          </div>
          <ContractInfo
            processorAddress={process.env.NEXT_PUBLIC_AVAXPAY_PROCESSOR || ""}
            subscriptionManagerAddress={
              process.env.NEXT_PUBLIC_SUBSCRIPTION_MANAGER || ""
            }
            network={chainId === 43113 ? "testnet" : "mainnet"}
          />
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}

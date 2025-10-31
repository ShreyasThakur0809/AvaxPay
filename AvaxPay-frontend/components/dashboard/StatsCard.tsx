'use client';

import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: number; // percentage
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  loading = false,
}: StatsCardProps) {
  const isPositive = trend && trend >= 0;

  return (
    <Card className="glass border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <p className="text-ms text-muted-foreground font-medium">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground/70 mt-1">{description}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold text-gradient mb-2">
            {value}
          </div>

          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? 'text-secondary' : 'text-destructive'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

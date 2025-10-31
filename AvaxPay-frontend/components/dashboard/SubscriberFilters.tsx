'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface SubscriberFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export function SubscriberFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  onReset,
}: SubscriberFiltersProps) {
  const hasFilters = searchQuery || statusFilter !== 'all' || sortBy !== 'newest';

  return (
    <div className="glass rounded-2xl border border-white/10 p-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by address, email, or name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 glass border-white/10"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="glass border-white/10">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="glass border-white/10">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="glass border-white/10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass border-white/10">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="amount-high">Highest Amount</SelectItem>
            <SelectItem value="amount-low">Lowest Amount</SelectItem>
            <SelectItem value="payments">Most Payments</SelectItem>
            <SelectItem value="next-payment">Next Payment Soon</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className={`glass border-white/20 ${hasFilters ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!hasFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {searchQuery && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary">
              Search: {searchQuery.slice(0, 10)}...
              <button
                onClick={() => onSearchChange('')}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
          {statusFilter !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-sm text-secondary capitalize">
              {statusFilter}
              <button
                onClick={() => onStatusChange('all')}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
          {sortBy !== 'newest' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-sm text-blue-500">
              Sort: {sortBy}
              <button
                onClick={() => onSortChange('newest')}
                className="hover:opacity-70"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

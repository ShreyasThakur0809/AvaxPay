// components/RevenueChart.tsx
'use client';

import { useMemo } from 'react';

interface ChartData {
  month: string;
  revenue: number;
  subscribers: number;
}

interface RevenueChartProps {
  data: ChartData[];
  type?: 'revenue' | 'subscribers';
}

export default function RevenueChart({ data, type = 'revenue' }: RevenueChartProps) {
  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    const values = data.map(d => type === 'revenue' ? d.revenue : d.subscribers);
    return Math.max(...values);
  }, [data, type]);

  // Calculate bar heights (percentage)
  const getBarHeight = (value: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  // Format value for display
  const formatValue = (value: number) => {
    if (type === 'revenue') {
      return value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : `$${value}`;
    }
    return value.toString();
  };

  const barColor = type === 'revenue' ? 'bg-blue-500' : 'bg-purple-500';
  const barHoverColor = type === 'revenue' ? 'hover:bg-blue-600' : 'hover:bg-purple-600';

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {type === 'revenue' ? 'Revenue Trend' : 'Subscriber Growth'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {type === 'revenue' ? 'Monthly revenue over time' : 'New subscribers per month'}
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>{formatValue(maxValue)}</span>
          <span>{formatValue(maxValue * 0.75)}</span>
          <span>{formatValue(maxValue * 0.5)}</span>
          <span>{formatValue(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-gray-200 w-full"></div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-around gap-2">
          {data.map((item, index) => {
            const value = type === 'revenue' ? item.revenue : item.subscribers;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group cursor-pointer"
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {item.month}: {formatValue(value)}
                </div>

                {/* Bar */}
                <div
                  className={`w-full ${barColor} ${barHoverColor} rounded-t transition-all duration-300`}
                  style={{ height: getBarHeight(value) }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* X-axis */}
        <div className="absolute left-12 right-0 bottom-0 flex justify-around">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center text-xs text-gray-600">
              {item.month}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-lg font-bold text-gray-900">
              {formatValue(data.reduce((sum, d) => sum + (type === 'revenue' ? d.revenue : d.subscribers), 0))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-lg font-bold text-gray-900">
              {formatValue(Math.round(data.reduce((sum, d) => sum + (type === 'revenue' ? d.revenue : d.subscribers), 0) / data.length))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Growth</div>
            <div className="text-lg font-bold text-green-600">
              {data.length >= 2 
                ? `+${Math.round(((type === 'revenue' ? data[data.length - 1].revenue : data[data.length - 1].subscribers) / 
                    (type === 'revenue' ? data[0].revenue : data[0].subscribers) - 1) * 100)}%`
                : 'N/A'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

const metrics: Metric[] = [
  {
    label: 'Pipeline Value',
    value: '$4.2M',
    change: 12.5,
    trend: 'up',
  },
  {
    label: 'Lead Conversion',
    value: '18.2%',
    change: 2.1,
    trend: 'up',
  },
  {
    label: 'Active Clients',
    value: '42',
    change: -3.5,
    trend: 'down',
  },
  {
    label: 'Avg. Close Time',
    value: '45 days',
    change: -5.2,
    trend: 'up',
  },
];

export function PerformanceMetrics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">{metric.label}</span>
              {metric.trend === 'up' ? (
                <TrendingUp className={`h-5 w-5 ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`} />
              ) : (
                <TrendingDown className={`h-5 w-5 ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`} />
              )}
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <span className={`ml-2 text-sm font-medium ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
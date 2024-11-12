import React from 'react';
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';

interface Metrics {
  loanAmount: number;
  downPayment: number;
  rate: number;
  term: number;
  monthlyPayment: number;
}

interface FinancialMetricsProps {
  metrics: Metrics;
}

export function FinancialMetrics({ metrics }: FinancialMetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Loan Amount</p>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(metrics.loanAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Percent className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Interest Rate</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.rate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Term</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.term} Years
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Payment</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(metrics.monthlyPayment)}
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-500">Down Payment</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(metrics.downPayment)}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {((metrics.downPayment / (metrics.loanAmount + metrics.downPayment)) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cost</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(metrics.monthlyPayment * metrics.term * 12)}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Over {metrics.term} years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';

export default function ForecastingPage() {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  // Revenue data for chart
  const chartData = [
    { month: 'Oct', actual: 8200, projected: null },
    { month: 'Nov', actual: 9100, projected: null },
    { month: 'Dec', actual: 11300, projected: null },
    { month: 'Jan', actual: null, projected: 12450 },
    { month: 'Feb', actual: null, projected: 14200 },
    { month: 'Mar', actual: null, projected: 16100 },
  ];

  // 12-month projections
  const monthlyProjections = [
    { month: 'January', revenue: 12450, orders: 156, aov: 79.75, growth: 23 },
    { month: 'February', revenue: 14200, orders: 178, aov: 79.78, growth: 14 },
    { month: 'March', revenue: 16100, orders: 202, aov: 79.70, growth: 13.4 },
    { month: 'April', revenue: 18570, orders: 233, aov: 79.70, growth: 15.3 },
    { month: 'May', revenue: 21380, orders: 268, aov: 79.78, growth: 15.1 },
    { month: 'June', revenue: 24638, orders: 309, aov: 79.74, growth: 15.2 },
    { month: 'July', revenue: 28394, orders: 357, aov: 79.54, growth: 15.3 },
    { month: 'August', revenue: 32714, orders: 411, aov: 79.59, growth: 15.2 },
    { month: 'September', revenue: 37702, orders: 474, aov: 79.58, growth: 15.2 },
    { month: 'October', revenue: 43448, orders: 546, aov: 79.54, growth: 15.2 },
    { month: 'November', revenue: 50086, orders: 629, aov: 79.61, growth: 15.2 },
    { month: 'December', revenue: 57700, orders: 724, aov: 79.67, growth: 15.2 },
  ];

  // Growth scenarios
  const scenarios = {
    conservative: {
      monthlyRevenue: 12450,
      annualRevenue: 149400,
      growthRate: 10,
      breakEvenDate: '3 months',
    },
    moderate: {
      monthlyRevenue: 12450,
      annualRevenue: 149400,
      growthRate: 23,
      breakEvenDate: '2 months',
    },
    aggressive: {
      monthlyRevenue: 12450,
      annualRevenue: 149400,
      growthRate: 40,
      breakEvenDate: '1 month',
    },
  };

  // Revenue breakdown
  const revenueBreakdown = [
    { source: 'Direct Sales', amount: 6848, percentage: 55, color: 'bg-pink-600' },
    { source: 'BeautyShare Marketplace', amount: 3113, percentage: 25, color: 'bg-pink-400' },
    { source: 'Wholesale', amount: 1868, percentage: 15, color: 'bg-pink-200' },
    { source: 'Subscriptions/Bundles', amount: 623, percentage: 5, color: 'bg-pink-100' },
  ];

  // Quick action tips
  const actionTips = [
    {
      icon: '📈',
      title: 'Increase Wholesale Partnerships',
      description: 'Expand wholesale channels to boost Q2 revenue by 20-30%',
    },
    {
      icon: '🎯',
      title: 'Optimize Product Mix',
      description: 'Focus on high-margin items to improve profitability',
    },
    {
      icon: '🚀',
      title: 'Marketplace Growth',
      description: 'Leverage BeautyShare Marketplace for 15% additional revenue',
    },
    {
      icon: '💳',
      title: 'Subscription Model',
      description: 'Launch product bundles to increase recurring revenue',
    },
  ];

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map(d => (d.actual || d.projected || 0))) * 1.1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Revenue Forecasting</h1>
          <p className="text-gray-600">Track your projected revenue and growth trends</p>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            label="Projected Monthly Revenue"
            value="$12,450"
            subtext="Up 23%"
          />
          <MetricCard
            label="Growth Rate (MoM)"
            value="23%"
            subtext="Up 5.2%"
          />
          <MetricCard
            label="Projected Annual Revenue"
            value="$149,400"
            subtext="Up 28%"
          />
          <MetricCard
            label="Revenue Goal Progress"
            value="78%"
            subtext="Up 12%"
          />
        </div>

        {/* Revenue Forecast Chart Section */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6-Month Revenue Forecast</h2>

            {/* Chart Container */}
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-end justify-between h-80 gap-4 mb-4">
                {chartData.map((data, idx) => {
                  const value = data.actual || data.projected || 0;
                  const barHeight = (value / maxValue) * 100;
                  const isProjected = !data.actual;

                  return (
                    <div key={idx} className="flex flex-col items-center flex-1">
                      {/* Amount Label */}
                      <span className="text-sm font-semibold text-gray-700 mb-2">
                        ${(value / 1000).toFixed(1)}k
                      </span>

                      {/* Bar */}
                      <div className="w-full flex items-end justify-center h-60">
                        <div
                          className={`w-full rounded-t-lg transition-all ${
                            isProjected
                              ? 'bg-gradient-to-b from-purple-400 to-purple-300 border-2 border-dashed border-purple-500 opacity-75'
                              : 'bg-gradient-to-b from-pink-500 to-pink-400 shadow-lg'
                          }`}
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>

                      {/* Month Label */}
                      <span className="text-sm font-semibold text-gray-900 mt-4">
                        {data.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-8 justify-center mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-pink-500 to-pink-400" />
                  <span className="text-sm text-gray-700">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-purple-400 to-purple-300 border border-dashed border-purple-500" />
                  <span className="text-sm text-gray-700">Projected</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Growth Scenarios Card */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Growth Scenarios</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Conservative */}
              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScenario === 'conservative'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedScenario('conservative')}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Conservative</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$12,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Revenue</p>
                    <p className="text-xl font-bold text-gray-900">$149,400</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-xl font-bold text-blue-600">10%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Break-even Date</p>
                    <p className="text-sm font-semibold text-gray-900">3 months</p>
                  </div>
                </div>
              </div>

              {/* Moderate - Highlighted */}
              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ring-2 ring-pink-200 ${
                  selectedScenario === 'moderate'
                    ? 'border-pink-600 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedScenario('moderate')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Moderate</h3>
                  <Badge variant="success">Recommended</Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$12,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Revenue</p>
                    <p className="text-xl font-bold text-gray-900">$149,400</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-xl font-bold text-pink-600">23%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Break-even Date</p>
                    <p className="text-sm font-semibold text-gray-900">2 months</p>
                  </div>
                </div>
              </div>

              {/* Aggressive */}
              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScenario === 'aggressive'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedScenario('aggressive')}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Aggressive</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$12,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Revenue</p>
                    <p className="text-xl font-bold text-gray-900">$149,400</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-xl font-bold text-green-600">40%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Break-even Date</p>
                    <p className="text-sm font-semibold text-gray-900">1 month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Revenue Breakdown Card */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Breakdown by Source</h2>

            <div className="space-y-6">
              {revenueBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{item.source}</span>
                    <span className="text-sm font-bold text-gray-700">
                      ${item.amount.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Total Monthly</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Top Source</p>
                <p className="text-lg font-bold text-pink-600">Direct Sales</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Marketplace %</p>
                <p className="text-2xl font-bold text-gray-900">25%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wider">Growth Potential</p>
                <p className="text-lg font-bold text-green-600">+$4,200</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Monthly Projections Table */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">12-Month Projections</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Month</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">Revenue</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">Orders</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">Avg Order Value</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">Growth %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyProjections.map((proj, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 hover:bg-pink-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-gray-900">{proj.month}</td>
                      <td className="text-right py-4 px-4 font-bold text-pink-600">
                        ${proj.revenue.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4 text-gray-700">{proj.orders}</td>
                      <td className="text-right py-4 px-4 text-gray-700">${proj.aov.toFixed(2)}</td>
                      <td className="text-right py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                          ↑ {proj.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Note */}
            <p className="text-sm text-gray-600 mt-4">
              Based on 23% month-over-month growth rate with Moderate scenario assumptions
            </p>
          </div>
        </Card>

        {/* Quick Actions/Tips Card */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Growth Recommendations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {actionTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

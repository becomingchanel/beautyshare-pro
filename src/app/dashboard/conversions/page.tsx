'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';

interface Product {
  id: string;
  name: string;
  views: number;
  conversions: number;
  rate: number;
  revenue: number;
}

interface Conversion {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  timestamp: string;
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

const topProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Body Wave Extensions',
    views: 3420,
    conversions: 156,
    rate: 4.56,
    revenue: 7020,
  },
  {
    id: '2',
    name: 'Straight Lace Front Wig',
    views: 2890,
    conversions: 142,
    rate: 4.91,
    revenue: 8524,
  },
  {
    id: '3',
    name: 'Deep Wave Closure 4x4',
    views: 2450,
    conversions: 98,
    rate: 4.0,
    revenue: 4410,
  },
  {
    id: '4',
    name: 'Curly Texture Bundle Pack',
    views: 2100,
    conversions: 76,
    rate: 3.62,
    revenue: 3420,
  },
  {
    id: '5',
    name: 'Silk Top Closure 5x5',
    views: 1890,
    conversions: 68,
    rate: 3.60,
    revenue: 3060,
  },
  {
    id: '6',
    name: 'Clip-In Hair Extension Set',
    views: 1650,
    conversions: 55,
    rate: 3.33,
    revenue: 2750,
  },
  {
    id: '7',
    name: 'Ombre Synthetic Hair',
    views: 1420,
    conversions: 45,
    rate: 3.17,
    revenue: 2025,
  },
  {
    id: '8',
    name: 'Pre-Plucked Hairline Wig',
    views: 1200,
    conversions: 38,
    rate: 3.17,
    revenue: 1710,
  },
];

const recentConversions: Conversion[] = [
  {
    id: '1',
    customerName: 'Jessica M.',
    product: 'Premium Body Wave Extensions',
    amount: 89.99,
    timestamp: '5 minutes ago',
  },
  {
    id: '2',
    customerName: 'Sarah K.',
    product: 'Straight Lace Front Wig',
    amount: 129.99,
    timestamp: '12 minutes ago',
  },
  {
    id: '3',
    customerName: 'Maria R.',
    product: 'Deep Wave Closure 4x4',
    amount: 64.99,
    timestamp: '18 minutes ago',
  },
  {
    id: '4',
    customerName: 'Amanda T.',
    product: 'Curly Texture Bundle Pack',
    amount: 119.99,
    timestamp: '31 minutes ago',
  },
  {
    id: '5',
    customerName: 'Nicole L.',
    product: 'Silk Top Closure 5x5',
    amount: 74.99,
    timestamp: '45 minutes ago',
  },
  {
    id: '6',
    customerName: 'Diamond S.',
    product: 'Premium Body Wave Extensions',
    amount: 89.99,
    timestamp: '1 hour ago',
  },
  {
    id: '7',
    customerName: 'Keisha J.',
    product: 'Clip-In Hair Extension Set',
    amount: 54.99,
    timestamp: '1 hour ago',
  },
  {
    id: '8',
    customerName: 'Tasha W.',
    product: 'Straight Lace Front Wig',
    amount: 129.99,
    timestamp: '2 hours ago',
  },
  {
    id: '9',
    customerName: 'Alicia M.',
    product: 'Ombre Synthetic Hair',
    amount: 49.99,
    timestamp: '2 hours ago',
  },
  {
    id: '10',
    customerName: 'Brittany C.',
    product: 'Pre-Plucked Hairline Wig',
    amount: 59.99,
    timestamp: '3 hours ago',
  },
];

const suggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    title: 'Reduce Cart Abandonment',
    description:
      'Your 68% abandonment rate is above industry average. Implement exit-intent offers and email recovery sequences.',
    impact: 'high',
    action: 'Set up abandoned cart emails',
  },
  {
    id: '2',
    title: 'Improve Product Pages',
    description:
      'Add more product images and customer reviews to increase conversion from viewers to cart adds.',
    impact: 'high',
    action: 'Update top 3 product pages',
  },
  {
    id: '3',
    title: 'Bundle Products',
    description:
      'Bundle your top 2 products together to increase average order value and reduce decision paralysis.',
    impact: 'medium',
    action: 'Create product bundle',
  },
  {
    id: '4',
    title: 'Speed Up Checkout',
    description:
      'Average time to purchase is 2.4 days. Implement 1-click checkout to reduce friction.',
    impact: 'medium',
    action: 'Enable express checkout',
  },
  {
    id: '5',
    title: 'Upsell at Checkout',
    description:
      'Add complementary product recommendations during checkout to increase revenue per visitor.',
    impact: 'medium',
    action: 'Configure checkout upsells',
  },
];

// Funnel data
const funnelSteps = [
  { label: 'Visitors', count: 2450, color: '#3B82F6' },
  { label: 'Product Views', count: 1820, color: '#06B6D4' },
  { label: 'Add to Cart', count: 540, color: '#10B981' },
  { label: 'Checkout', count: 180, color: '#F59E0B' },
  { label: 'Purchase', count: 78, color: '#EF4444' },
];

export default function ConversionDetector() {
  const calculateDropOff = (current: number, next: number) => {
    return Math.round(((current - next) / current) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Conversion Detector</h1>
          <p className="text-slate-600">Track and optimize your conversion funnel</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            label="Conversion Rate"
            value="3.2%"
            subtext="0.4% vs last week"
          />
          <MetricCard
            label="Cart Abandonment"
            value="68%"
            subtext="4% worse than target"
          />
          <MetricCard
            label="Avg Time to Purchase"
            value="2.4 days"
            subtext="12 hours faster"
          />
          <MetricCard
            label="Revenue per Visitor"
            value="$4.85"
            subtext="$0.35 increase"
          />
        </div>

        {/* Conversion Funnel */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Conversion Funnel</h2>
          <div className="space-y-6">
            {funnelSteps.map((step, index) => {
              const nextStep = funnelSteps[index + 1];
              const dropOff = nextStep ? calculateDropOff(step.count, nextStep.count) : null;
              const maxWidth = 100;
              const width = (step.count / funnelSteps[0].count) * maxWidth;

              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900 w-32">{step.label}</span>
                      <span className="text-lg font-bold text-slate-700">{step.count.toLocaleString()}</span>
                    </div>
                    {dropOff !== null && (
                      <span className="text-sm font-semibold text-red-600">
                        {dropOff}% drop-off
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-slate-200 rounded-lg h-12 overflow-hidden">
                    <div
                      className="h-full flex items-center px-4 text-white font-bold text-sm transition-all duration-500"
                      style={{
                        width: `${width}%`,
                        backgroundColor: step.color,
                      }}
                    >
                      {width > 15 && `${((step.count / funnelSteps[0].count) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Optimization Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {suggestions.map((suggestion) => {
            const impactColors = {
              high: 'border-red-200 bg-red-50',
              medium: 'border-orange-200 bg-orange-50',
              low: 'border-blue-200 bg-blue-50',
            };

            const impactBadgeVariants = {
              high: 'danger' as const,
              medium: 'warning' as const,
              low: 'neutral' as const,
            };

            return (
              <Card
                key={suggestion.id}
                className={`p-6 border-l-4 ${impactColors[suggestion.impact]}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-slate-900">{suggestion.title}</h3>
                  <Badge variant={impactBadgeVariants[suggestion.impact]}>
                    {suggestion.impact} impact
                  </Badge>
                </div>
                <p className="text-slate-600 text-sm mb-4">{suggestion.description}</p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                  {suggestion.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Converting Products */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Top Converting Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-semibold text-slate-700">Product</th>
                    <th className="text-center py-3 px-2 font-semibold text-slate-700">Views</th>
                    <th className="text-center py-3 px-2 font-semibold text-slate-700">Conv</th>
                    <th className="text-center py-3 px-2 font-semibold text-slate-700">Rate</th>
                    <th className="text-right py-3 px-2 font-semibold text-slate-700">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => {
                    const rateColor = product.rate > 4 ? 'text-green-600' : product.rate > 3.5 ? 'text-blue-600' : 'text-orange-600';

                    return (
                      <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-2 font-medium text-slate-900 truncate max-w-xs">
                          {product.name}
                        </td>
                        <td className="text-center py-3 px-2 text-slate-700">
                          {product.views.toLocaleString()}
                        </td>
                        <td className="text-center py-3 px-2 text-slate-700">{product.conversions}</td>
                        <td className={`text-center py-3 px-2 font-bold ${rateColor}`}>
                          {product.rate.toFixed(2)}%
                        </td>
                        <td className="text-right py-3 px-2 font-semibold text-slate-900">
                          ${product.revenue.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Conversions Feed */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Conversions</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentConversions.map((conversion) => (
                <div
                  key={conversion.id}
                  className="p-4 bg-gradient-to-r from-green-50 to-slate-50 border border-green-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{conversion.customerName}</p>
                      <p className="text-sm text-slate-600">{conversion.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">
                        ${conversion.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">{conversion.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-green-700 font-semibold">Conversion Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

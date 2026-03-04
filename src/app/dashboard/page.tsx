'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingCart,
  TrendingUp,
  Users,
  ExternalLink,
} from 'lucide-react';

// Demo data — replaced with real Shopify data via API
const metrics = {
  totalRevenue: 1245000,
  monthRevenue: 328000,
  revenueChange: 18.5,
  totalOrders: 47,
  monthOrders: 12,
  totalCustomers: 31,
  repeatRate: 42,
  avgOrderValue: 26500,
};

const recentOrders = [
  { id: '#1047', customer: 'Sarah M.', total: 28500, status: 'shipped' as const, date: 'Mar 4' },
  { id: '#1046', customer: 'Tiffany L.', total: 45000, status: 'processing' as const, date: 'Mar 3' },
  { id: '#1045', customer: 'Jasmine R.', total: 18900, status: 'delivered' as const, date: 'Mar 2' },
  { id: '#1044', customer: 'Michelle K.', total: 32000, status: 'delivered' as const, date: 'Mar 1' },
];

const topProducts = [
  { name: 'Brazilian Body Wave 18"', sold: 24, revenue: 720000 },
  { name: 'Peruvian Straight 20"', sold: 18, revenue: 612000 },
  { name: '5x5 HD Lace Closure', sold: 15, revenue: 337500 },
];

const statusColors: Record<string, 'warning' | 'brand' | 'success' | 'default'> = {
  pending: 'warning',
  processing: 'brand',
  shipped: 'success',
  delivered: 'default',
};

export default function SubscriberDashboard() {
  return (
    <DashboardLayout
      userName="Tasha"
      tierLabel="Launch"
      pageTitle="Dashboard"
      pageDescription="Welcome back! Here's how your store is doing."
    >
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          change={metrics.revenueChange}
          changeLabel="vs last month"
          icon="dollar"
        />
        <MetricCard
          label="This Month"
          value={formatCurrency(metrics.monthRevenue)}
          icon="dollar"
        />
        <MetricCard
          label="Total Customers"
          value={metrics.totalCustomers.toString()}
          icon="users"
        />
        <MetricCard
          label="Avg Order Value"
          value={formatCurrency(metrics.avgOrderValue)}
          icon="cart"
        />
      </div>

      {/* Two-column layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2" padding="none">
          <div className="flex items-center justify-between p-6 pb-0">
            <CardTitle>Recent Orders</CardTitle>
            <a href="/dashboard/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </a>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-brand-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-brand-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-brand-900">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={statusColors[order.status]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          {/* Top Products */}
          <Card>
            <CardTitle>Top Products</CardTitle>
            <div className="mt-4 space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-800 truncate">{product.name}</p>
                    <p className="text-xs text-brand-400">{product.sold} sold</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-900">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardTitle>Quick Actions</CardTitle>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <ShoppingCart className="h-4 w-4" />
                View all orders
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Users className="h-4 w-4" />
                View customers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <TrendingUp className="h-4 w-4" />
                Pricing calculators
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <ExternalLink className="h-4 w-4" />
                Open Shopify store
              </Button>
            </div>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardTitle>Performance</CardTitle>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Repeat Rate</span>
                <span className="text-sm font-semibold text-brand-900">{metrics.repeatRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Orders This Month</span>
                <span className="text-sm font-semibold text-brand-900">{metrics.monthOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Total Orders</span>
                <span className="text-sm font-semibold text-brand-900">{metrics.totalOrders}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  Clock,
} from 'lucide-react';

// Demo data — will be replaced with real Supabase queries
const metrics = {
  totalRevenue: 45300000,
  monthlyRevenue: 3820000,
  revenueChange: 12.4,
  totalOrders: 847,
  pendingOrders: 23,
  activeSubscribers: 42,
  subscriberChange: 8.3,
  churnRate: 4.2,
  lowStockItems: 5,
};

const recentOrders = [
  { id: 'BSP-10234', store: 'Luxe Hair Co.', total: 28500, status: 'pending' as const, date: '2026-03-04' },
  { id: 'BSP-10233', store: 'Crown & Glory', total: 45000, status: 'processing' as const, date: '2026-03-04' },
  { id: 'BSP-10232', store: 'Hair by Tasha', total: 18900, status: 'shipped' as const, date: '2026-03-03' },
  { id: 'BSP-10231', store: 'Bella Extensions', total: 62500, status: 'shipped' as const, date: '2026-03-03' },
  { id: 'BSP-10230', store: 'Mane Collective', total: 31200, status: 'delivered' as const, date: '2026-03-02' },
];

const statusColors: Record<string, 'warning' | 'brand' | 'success' | 'default'> = {
  pending: 'warning',
  processing: 'brand',
  shipped: 'success',
  delivered: 'default',
};

const atRiskSubscribers = [
  { name: 'Quick Styles LLC', lastOrder: '34 days ago', riskScore: 0.82 },
  { name: 'TressBoss', lastOrder: '28 days ago', riskScore: 0.65 },
  { name: 'DivaCurl Supply', lastOrder: '25 days ago', riskScore: 0.58 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout
      isAdmin
      userName="Chanel"
      pageTitle="Command Center"
      pageDescription="Overview of all stores, orders, and subscribers"
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
          value={formatCurrency(metrics.monthlyRevenue)}
          icon="dollar"
        />
        <MetricCard
          label="Active Subscribers"
          value={metrics.activeSubscribers.toString()}
          change={metrics.subscriberChange}
          changeLabel="growth"
          icon="users"
        />
        <MetricCard
          label="Pending Orders"
          value={metrics.pendingOrders.toString()}
          icon="cart"
        />
      </div>

      {/* Two-column layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Orders — 2 cols */}
        <Card className="lg:col-span-2" padding="none">
          <div className="flex items-center justify-between p-6 pb-0">
            <CardTitle>Recent Orders</CardTitle>
            <a href="/admin/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </a>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-brand-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-brand-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-600">
                      {order.store}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-brand-900">
                      {formatCurrency(order.total)}
                    </td>
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

        {/* Right column: Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle>Low Stock Alert</CardTitle>
            </div>
            <p className="text-sm text-brand-600">
              <span className="font-semibold text-warning">{metrics.lowStockItems} products</span>{' '}
              are below the restock threshold.
            </p>
            <a
              href="/admin/inventory"
              className="mt-3 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View inventory
              <TrendingUp className="ml-1 h-3.5 w-3.5" />
            </a>
          </Card>

          {/* Churn Risk */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-danger" />
              <CardTitle>Churn Risk</CardTitle>
            </div>
            <p className="mb-3 text-xs text-brand-500">
              Subscribers with no orders in 25+ days
            </p>
            <div className="space-y-3">
              {atRiskSubscribers.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center justify-between rounded-lg bg-cream-50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-brand-800">
                      {sub.name}
                    </p>
                    <p className="text-xs text-brand-400">
                      Last order: {sub.lastOrder}
                    </p>
                  </div>
                  <Badge variant={sub.riskScore > 0.7 ? 'danger' : 'warning'}>
                    {Math.round(sub.riskScore * 100)}% risk
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardTitle>Monthly Snapshot</CardTitle>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Churn Rate</span>
                <span className="text-sm font-semibold text-brand-900">
                  {metrics.churnRate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Total Orders</span>
                <span className="text-sm font-semibold text-brand-900">
                  {metrics.totalOrders}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-500">Avg Order Value</span>
                <span className="text-sm font-semibold text-brand-900">
                  {formatCurrency(metrics.totalRevenue / metrics.totalOrders)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

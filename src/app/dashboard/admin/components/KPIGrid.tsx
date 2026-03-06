'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { formatCents, percentChange } from '@/lib/utils';
import { DollarSign, Users, ShoppingCart, AlertTriangle } from 'lucide-react';
import type { AdminMetricsDaily } from '@/lib/types';

interface KPIGridProps {
  current: AdminMetricsDaily | null;
  previous: AdminMetricsDaily | null;
}

export function KPIGrid({ current, previous }: KPIGridProps) {
  const c = current;
  const p = previous;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Revenue"
        value={formatCents(c?.total_revenue_cents ?? 0)}
        icon={<DollarSign className="h-5 w-5" />}
        trend={p ? percentChange(c?.total_revenue_cents ?? 0, p.total_revenue_cents) : undefined}
        trendLabel="vs last period"
      />
      <MetricCard
        label="Active Subscribers"
        value={String(c?.total_subscribers ?? 0)}
        icon={<Users className="h-5 w-5" />}
        trend={p ? percentChange(c?.total_subscribers ?? 0, p.total_subscribers) : undefined}
        trendLabel="vs last period"
      />
      <MetricCard
        label="Total Orders"
        value={String(c?.total_orders ?? 0)}
        icon={<ShoppingCart className="h-5 w-5" />}
        trend={p ? percentChange(c?.total_orders ?? 0, p.total_orders) : undefined}
        trendLabel="vs last period"
      />
      <MetricCard
        label="Churn Rate"
        value={
          c && c.total_subscribers > 0
            ? `${((c.churned_subscribers / c.total_subscribers) * 100).toFixed(1)}%`
            : '0%'
        }
        icon={<AlertTriangle className="h-5 w-5" />}
        trend={
          p && p.total_subscribers > 0
            ? -percentChange(
                c?.churned_subscribers ?? 0,
                p.churned_subscribers,
              )
            : undefined
        }
        trendLabel="lower is better"
      />
    </div>
  );
}

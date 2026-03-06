'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { AdminMetricsDaily } from '@/lib/types';
import { format } from 'date-fns';

interface RevenueChartProps {
  data: AdminMetricsDaily[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((d) => ({
    date: format(new Date(d.date), 'MMM d'),
    saas: d.saas_revenue_cents / 100,
    wholesale: d.wholesale_revenue_cents / 100,
    total: d.total_revenue_cents / 100,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorSaas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FA6A27" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FA6A27" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWholesale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DCBDEF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#DCBDEF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip
                formatter={(value: number | undefined) =>
                  value !== undefined
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                    : '$0'
                }
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="saas"
                name="SaaS Revenue"
                stroke="#FA6A27"
                fillOpacity={1}
                fill="url(#colorSaas)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="wholesale"
                name="Wholesale Revenue"
                stroke="#DCBDEF"
                fillOpacity={1}
                fill="url(#colorWholesale)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

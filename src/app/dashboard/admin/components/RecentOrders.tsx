'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { BadgeVariant } from '@/components/ui/Badge';
import type { Order } from '@/lib/types';
import { formatCents, formatRelative, formatStatus } from '@/lib/utils';

interface RecentOrdersProps {
  orders: Order[];
}

const statusVariant: Record<string, BadgeVariant> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'purple',
  delivered: 'success',
  cancelled: 'danger',
  refunded: 'danger',
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-orange hover:text-orange-dark"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {order.order_number}
                    </span>
                    <Badge variant={statusVariant[order.order_status] || 'neutral'}>
                      {formatStatus(order.order_status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.customer_name} · {order.store?.store_name || 'Unknown store'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCents(order.subtotal_cents)}
                  </p>
                  <p className="text-xs text-gray-400">{formatRelative(order.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

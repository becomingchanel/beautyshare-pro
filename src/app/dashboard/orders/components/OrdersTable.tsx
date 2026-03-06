'use client';

import { Order, OrderItem, Product } from '@/lib/types';
import { formatCents, formatDate, formatStatus, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface OrdersTableProps {
  orders: (Order & {
    order_items: (OrderItem & { products: Product })[];
  })[];
}

const statusBadgeVariant: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'purple',
  delivered: 'success',
  cancelled: 'danger',
  refunded: 'danger',
};

const paymentBadgeVariant: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'> = {
  pending: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'danger',
};

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Total</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Payment</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fulfillment</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                #{order.id.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{order.customer_name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'items'}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                {formatCents(order.subtotal_cents)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusBadgeVariant[order.order_status] || 'neutral'}>
                  {formatStatus(order.order_status)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={paymentBadgeVariant[order.payment_status] || 'neutral'}>
                  {formatStatus(order.payment_status)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant="neutral">
                  {formatStatus(order.fulfillment_status)}
                </Badge>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {formatDate(order.created_at)}
              </td>
              <td className="px-4 py-3 text-center">
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

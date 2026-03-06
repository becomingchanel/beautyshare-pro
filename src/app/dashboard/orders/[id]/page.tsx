import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCents, formatDate, formatStatus } from '@/lib/utils';
import { TrackingForm } from '../components/TrackingForm';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';

interface OrderDetailPageProps {
  params: { id: string };
}

async function OrderDetailContent({ params }: OrderDetailPageProps) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/auth/login');
  }

  // Get user profile to check role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, store_id')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    redirect('/auth/login');
  }

  // Fetch order
  const { data: order, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        quantity,
        price,
        products (
          id,
          name,
          image_url
        )
      ),
      stores (
        id,
        name
      )
      `
    )
    .eq('id', params.id)
    .single();

  if (error || !order) {
    notFound();
  }

  // Check access: admin can see all, subscriber only their store
  if (profile.role === 'subscriber' && order.store_id !== profile.store_id) {
    notFound();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/orders">
            <Button variant="outline" size="sm">
              ← Back to Orders
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {formatCents(order.total_amount)}
          </p>
          <p className="text-gray-600 text-sm">
            {formatDate(order.created_at)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Cards */}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Order Status</h3>
          <Badge variant={statusBadgeVariant[order.order_status] || 'neutral'} className="text-lg">
            {formatStatus(order.order_status)}
          </Badge>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Payment Status</h3>
          <Badge variant={paymentBadgeVariant[order.payment_status] || 'neutral'} className="text-lg">
            {formatStatus(order.payment_status)}
          </Badge>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Fulfillment Status</h3>
          <Badge variant="neutral" className="text-lg">
            {formatStatus(order.fulfillment_status)}
          </Badge>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Items */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.order_items && order.order_items.length > 0 ? (
              order.order_items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-3 border-b border-gray-200 last:border-b-0"
                >
                  {item.products?.image_url && (
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="h-12 w-12 object-cover rounded bg-gray-100"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.products?.name || 'Unknown Product'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × {formatCents(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatCents(item.price * item.quantity)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No items in this order</p>
            )}
          </div>
        </Card>

        {/* Customer & Shipping Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-medium text-gray-900">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{order.customer_email}</p>
            </div>
            {order.shipping_address && (
              <div>
                <p className="text-sm text-gray-600">Shipping Address</p>
                <p className="font-medium text-gray-900">{order.shipping_address}</p>
              </div>
            )}
            {order.billing_address && (
              <div>
                <p className="text-sm text-gray-600">Billing Address</p>
                <p className="font-medium text-gray-900">{order.billing_address}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Tracking Info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Tracking</h2>
        {order.tracking_number ? (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-medium text-gray-900">{order.tracking_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Shipping Carrier</p>
                <p className="font-medium text-gray-900 capitalize">
                  {order.tracking_carrier || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">No tracking information yet</p>
        )}

        {profile.role === 'admin' && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Update Tracking</h3>
            <TrackingForm
              orderId={order.id}
              initialTracking={{
                tracking_number: order.tracking_number || '',
                tracking_carrier: order.tracking_carrier || '',
              }}
            />
          </div>
        )}
      </Card>

      {/* Store Info (if admin) */}
      {profile.role === 'admin' && order.stores && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Store</h2>
          <p className="font-medium text-gray-900">{order.stores.name}</p>
        </Card>
      )}
    </div>
  );
}

export default function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading order details...</div>}>
        <OrderDetailContent params={params} />
      </Suspense>
    </DashboardLayout>
  );
}

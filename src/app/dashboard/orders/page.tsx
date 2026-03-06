import { Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase/server';
import { OrdersTable } from './components/OrdersTable';
import { OrderFilters } from './components/OrderFilters';
import { redirect } from 'next/navigation';

async function OrdersListContent() {
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

  // Fetch orders based on role
  let query = supabase
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
    .order('created_at', { ascending: false });

  // Filter by store if subscriber
  if (profile.role === 'subscriber') {
    query = query.eq('store_id', profile.store_id);
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error('Error fetching orders:', error);
    return <div className="text-red-600">Error loading orders</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
      </div>

      <OrderFilters
        onFilterChange={(filters) => {
          // Filters are applied client-side for now
        }}
      />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <OrdersTable orders={orders || []} />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrdersListContent />
      </Suspense>
    </DashboardLayout>
  );
}

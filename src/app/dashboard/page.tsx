import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SubscriberKPIs } from './components/SubscriberKPIs';
import { RecentActivity } from './components/RecentActivity';

export default async function SubscriberDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Check role — admins go to /dashboard/admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') redirect('/dashboard/admin');

  // Fetch subscriber data
  const [storeResult, subResult, ordersResult] = await Promise.all([
    supabase
      .from('stores')
      .select('*')
      .eq('profile_id', user.id)
      .single(),

    supabase
      .from('subscriptions')
      .select('*')
      .eq('profile_id', user.id)
      .single(),

    // Get recent orders for this subscriber's store
    supabase
      .from('stores')
      .select('id')
      .eq('profile_id', user.id)
      .single()
      .then(async ({ data: store }) => {
        if (!store) return { data: [], count: 0 };
        const { data, count } = await supabase
          .from('orders')
          .select('*', { count: 'exact' })
          .eq('store_id', store.id)
          .order('created_at', { ascending: false })
          .limit(5);
        return { data: data ?? [], count: count ?? 0 };
      }),
  ]);

  const store = storeResult.data;
  const subscription = subResult.data;
  const orders = ordersResult.data ?? [];

  // Calculate 30d revenue
  const revenue30d = orders.reduce((sum, o) => sum + (o.subtotal_cents ?? 0), 0);

  return (
    <DashboardLayout
      title={`Welcome back${profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}`}
      description={profile?.business_name ?? 'Your hair business at a glance'}
    >
      <div className="space-y-6">
        <SubscriberKPIs
          revenue30d={revenue30d}
          orders30d={orders.length}
          subscription={subscription}
          store={store}
        />
        <RecentActivity orders={orders} />
      </div>
    </DashboardLayout>
  );
}

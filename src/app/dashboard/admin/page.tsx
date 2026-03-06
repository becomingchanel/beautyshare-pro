import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { KPIGrid } from './components/KPIGrid';
import { RevenueChart } from './components/RevenueChart';
import { ChurnAlerts } from './components/ChurnAlerts';
import { RecentOrders } from './components/RecentOrders';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Verify admin role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/not-authorized');

  // Fetch dashboard data in parallel
  const today = new Date().toISOString().split('T')[0];

  const [metricsResult, chartResult, churnResult, ordersResult] = await Promise.all([
    // Latest daily metrics
    supabase
      .from('admin_metrics_daily')
      .select('*')
      .order('date', { ascending: false })
      .limit(2),

    // 30-day chart data
    supabase
      .from('admin_metrics_daily')
      .select('*')
      .order('date', { ascending: true })
      .limit(30),

    // Churn alerts (high + critical)
    supabase
      .from('subscriber_health')
      .select('*, profile:profiles(*), store:stores(*)')
      .in('churn_risk', ['high', 'critical', 'medium'])
      .order('churn_risk_score', { ascending: false })
      .limit(10),

    // Recent orders
    supabase
      .from('orders')
      .select('*, store:stores(store_name)')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  const metrics = metricsResult.data ?? [];
  const currentMetrics = metrics[0] ?? null;
  const previousMetrics = metrics[1] ?? null;

  return (
    <DashboardLayout title="Command Center" description="Platform overview and key metrics">
      <div className="space-y-6">
        <KPIGrid current={currentMetrics} previous={previousMetrics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart data={chartResult.data ?? []} />
          </div>
          <div>
            <ChurnAlerts subscribers={churnResult.data ?? []} />
          </div>
        </div>

        <RecentOrders orders={ordersResult.data ?? []} />
      </div>
    </DashboardLayout>
  );
}

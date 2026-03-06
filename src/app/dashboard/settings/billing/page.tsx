import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCents, formatDate } from '@/lib/utils';
import { CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function BillingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch subscription data
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-2">Manage your BeautyShare Pro subscription</p>
        </div>

        {subscription ? (
          <>
            {/* Current Plan Card */}
            <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 rounded-lg p-3">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">BeautyShare Pro</h2>
                      <p className="text-gray-600">Professional plan</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(subscription.status || 'active')}>
                    {formatStatus(subscription.status || 'active')}
                  </Badge>
                </div>

                {/* Plan Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {/* Monthly Price */}
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm font-medium mb-2">Monthly Price</p>
                    <p className="text-3xl font-bold text-gray-900">$149</p>
                    <p className="text-gray-500 text-xs mt-1">Recurring monthly</p>
                  </div>

                  {/* Setup Fee */}
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm font-medium mb-2">Setup Fee</p>
                    <p className="text-3xl font-bold text-gray-900">$99</p>
                    <p className="text-gray-500 text-xs mt-1">One-time charge</p>
                  </div>

                  {/* Next Billing Date */}
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600 text-sm font-medium mb-2">Next Billing Date</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {subscription.current_period_end
                        ? new Date(subscription.current_period_end).getDate()
                        : '-'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {subscription.current_period_end
                        ? formatDate(subscription.current_period_end)
                        : 'Date not available'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subscription Details */}
            <Card>
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Subscription Details</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Subscription ID</span>
                    <span className="font-mono text-sm text-gray-900 break-all">
                      {subscription.stripe_subscription_id || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Customer ID</span>
                    <span className="font-mono text-sm text-gray-900">
                      {subscription.stripe_customer_id?.slice(0, 20) || 'N/A'}...
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Current Period Start</span>
                    <span className="text-gray-900">
                      {subscription.current_period_start
                        ? formatDate(subscription.current_period_start)
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Current Period End</span>
                    <span className="text-gray-900">
                      {subscription.current_period_end
                        ? formatDate(subscription.current_period_end)
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Manage Subscription</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-900 font-medium">Update Payment Method</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-900 font-medium">View Invoices</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    <span className="text-red-600 font-medium">Cancel Subscription</span>
                    <ChevronRight className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                  Note: These features are coming soon. Your subscription is managed through Stripe.
                </p>
              </div>
            </Card>
          </>
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
            <p className="text-gray-600 mb-6">
              You don't have an active subscription yet. Upgrade to BeautyShare Pro to get access to all features.
            </p>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                Upgrade to Pro
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

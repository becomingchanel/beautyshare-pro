'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { formatCents } from '@/lib/utils';
import { DollarSign, ShoppingCart, CreditCard, Store } from 'lucide-react';
import type { Subscription, Store as StoreType } from '@/lib/types';

interface SubscriberKPIsProps {
  revenue30d: number;
  orders30d: number;
  subscription: Subscription | null;
  store: StoreType | null;
}

export function SubscriberKPIs({ revenue30d, orders30d, subscription, store }: SubscriberKPIsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="My Revenue (30d)"
        value={formatCents(revenue30d)}
        icon={<DollarSign className="h-5 w-5" />}
      />
      <MetricCard
        label="My Orders (30d)"
        value={String(orders30d)}
        icon={<ShoppingCart className="h-5 w-5" />}
      />
      <MetricCard
        label="Subscription"
        value={subscription?.status === 'active' ? 'Active' : subscription?.status ?? 'None'}
        icon={<CreditCard className="h-5 w-5" />}
      />
      <MetricCard
        label="Store Status"
        value={store?.status === 'connected' ? 'Connected' : store?.status ?? 'Not Set Up'}
        icon={<Store className="h-5 w-5" />}
      />
    </div>
  );
}

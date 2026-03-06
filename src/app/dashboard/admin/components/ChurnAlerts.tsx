'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { SubscriberHealth } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface ChurnAlertsProps {
  subscribers: SubscriberHealth[];
}

const riskVariant = {
  critical: 'danger' as const,
  high: 'warning' as const,
  medium: 'info' as const,
  low: 'success' as const,
};

export function ChurnAlerts({ subscribers }: ChurnAlertsProps) {
  const atRisk = subscribers.filter((s) => s.churn_risk === 'high' || s.churn_risk === 'critical');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle>Churn Alerts</CardTitle>
          {atRisk.length > 0 && (
            <Badge variant="danger">{atRisk.length} at risk</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {subscribers.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">No churn data available yet.</p>
        ) : (
          <div className="space-y-3">
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {sub.profile?.business_name || sub.profile?.full_name || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {sub.days_since_last_order !== null
                      ? `${sub.days_since_last_order} days since last order`
                      : 'No orders yet'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    Score: {(sub.churn_risk_score * 100).toFixed(0)}%
                  </span>
                  <Badge variant={riskVariant[sub.churn_risk]}>
                    {sub.churn_risk}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

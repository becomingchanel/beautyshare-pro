'use client';

import { cn } from '@/lib/utils';
import { Card } from './Card';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  dollar: DollarSign,
  cart: ShoppingCart,
  users: Users,
  package: Package,
};

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  icon = 'dollar',
  className,
}: MetricCardProps) {
  const Icon = iconMap[icon] || DollarSign;
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-brand-500">{label}</p>
          <p className="text-2xl font-bold text-brand-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="h-3.5 w-3.5 text-success" />}
              {isNegative && <TrendingDown className="h-3.5 w-3.5 text-danger" />}
              {isNeutral && <Minus className="h-3.5 w-3.5 text-brand-400" />}
              <span
                className={cn(
                  'text-xs font-medium',
                  isPositive && 'text-success',
                  isNegative && 'text-danger',
                  isNeutral && 'text-brand-400'
                )}
              >
                {isPositive && '+'}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-brand-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="rounded-lg bg-brand-50 p-2.5">
          <Icon className="h-5 w-5 text-brand-600" />
        </div>
      </div>
    </Card>
  );
}

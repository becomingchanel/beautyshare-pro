import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  trend?: number; // percentage change, e.g. 12 or -5
  trendLabel?: string;
  subtext?: string;
  bgColor?: string;
  borderColor?: string;
  className?: string;
}

function MetricCard({ label, value, icon, trend, trendLabel, subtext, bgColor, borderColor, className }: MetricCardProps) {
  const trendColor =
    trend === undefined || trend === 0
      ? 'text-gray-500'
      : trend > 0
        ? 'text-green-600'
        : 'text-red-600';

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
        ? TrendingUp
        : TrendingDown;

  return (
    <div
      className={cn(
        'rounded-xl border p-6 shadow-sm',
        bgColor || 'bg-white',
        borderColor || 'border-gray-200',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && <div className="text-orange">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      {subtext && (
        <p className="mt-1 text-xs text-gray-500">{subtext}</p>
      )}
      {trend !== undefined && (
        <div className={cn('mt-2 flex items-center gap-1 text-xs font-medium', trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span>{Math.abs(trend)}%</span>
          {trendLabel && <span className="text-gray-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export { MetricCard };
export type { MetricCardProps };

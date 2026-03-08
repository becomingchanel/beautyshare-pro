import { type ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  accent?: boolean;
}

export default function StatCard({
  label,
  value,
  change,
  changeType = 'positive',
  icon,
  accent = false,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-all hover:shadow-md ${
        accent
          ? 'border-orange/20 bg-gradient-to-br from-orange-50 to-white'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {icon && (
          <div className={`${accent ? 'text-orange' : 'text-gray-400'}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">{value}</p>
      {change && (
        <p
          className={`mt-1 text-xs font-medium ${
            changeType === 'positive'
              ? 'text-green-600'
              : changeType === 'negative'
                ? 'text-red-500'
                : 'text-gray-500'
          }`}
        >
          {changeType === 'positive' && '↑ '}
          {changeType === 'negative' && '↓ '}
          {change}
        </p>
      )}
    </div>
  );
}

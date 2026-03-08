interface StatusBadgeProps {
  status: 'active' | 'paused' | 'draft' | 'completed';
}

const config = {
  active: { label: 'Active', dot: 'bg-green-500', colors: 'bg-green-50 text-green-700' },
  paused: { label: 'Paused', dot: 'bg-yellow-500', colors: 'bg-yellow-50 text-yellow-700' },
  draft: { label: 'Draft', dot: 'bg-gray-400', colors: 'bg-gray-100 text-gray-600' },
  completed: { label: 'Completed', dot: 'bg-blue-500', colors: 'bg-blue-50 text-blue-700' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dot, colors } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

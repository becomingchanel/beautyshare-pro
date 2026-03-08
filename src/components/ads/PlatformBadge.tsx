interface PlatformBadgeProps {
  platform: 'meta' | 'google' | 'tiktok';
}

const config = {
  meta: { label: 'Meta', colors: 'bg-blue-100 text-blue-700' },
  google: { label: 'Google', colors: 'bg-green-100 text-green-700' },
  tiktok: { label: 'TikTok', colors: 'bg-purple-100 text-purple-700' },
};

export default function PlatformBadge({ platform }: PlatformBadgeProps) {
  const { label, colors } = config[platform];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors}`}
    >
      {label}
    </span>
  );
}

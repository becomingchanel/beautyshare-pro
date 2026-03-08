'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Pause,
  Play,
  Copy,
  MoreHorizontal,
  TrendingUp,
  MousePointerClick,
  Eye,
  ShoppingCart,
  DollarSign,
  Target,
} from 'lucide-react';
import StatCard from '@/components/ads/StatCard';
import PlatformBadge from '@/components/ads/PlatformBadge';
import StatusBadge from '@/components/ads/StatusBadge';

/* ── Mock Data ───────────────────────────────────────────────── */
const campaign = {
  id: '1',
  name: 'Body Wave Bundle — Spring Sale',
  status: 'active' as const,
  platform: 'meta' as const,
  goal: 'Drive Sales',
  budget: '$50/day',
  startDate: 'Mar 1, 2026',
  products: ['Body Wave Bundle 18"', 'Body Wave Bundle 20"'],
  audience: 'Hair Extension Buyers',
  adCopy: {
    headline: 'Your Dream Hair Is One Click Away',
    body: 'Stop settling for hair that tangles after one wash. Our 100% virgin body wave bundles are made from single-donor hair that stays silky smooth for 2+ years.',
    cta: 'Shop Now',
  },
};

const stats = [
  { label: 'Total Spend', value: '$892.00', change: 'On pace for $1,500/mo', icon: <DollarSign className="h-5 w-5" />, accent: true },
  { label: 'Revenue', value: '$4,280.00', change: '+23% vs last week', changeType: 'positive' as const, icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'ROAS', value: '4.80x', change: 'Above 3x target', changeType: 'positive' as const, icon: <Target className="h-5 w-5" /> },
  { label: 'Conversions', value: '17', change: '+5 this week', changeType: 'positive' as const, icon: <ShoppingCart className="h-5 w-5" /> },
];

const dailyStats = [
  { date: 'Mar 1', spend: 48, revenue: 245, clicks: 36, impressions: 2400, conversions: 1 },
  { date: 'Mar 2', spend: 52, revenue: 490, clicks: 42, impressions: 2800, conversions: 2 },
  { date: 'Mar 3', spend: 47, revenue: 185, clicks: 31, impressions: 2100, conversions: 1 },
  { date: 'Mar 4', spend: 50, revenue: 735, clicks: 45, impressions: 3100, conversions: 3 },
  { date: 'Mar 5', spend: 49, revenue: 490, clicks: 38, impressions: 2600, conversions: 2 },
  { date: 'Mar 6', spend: 53, revenue: 980, clicks: 51, impressions: 3400, conversions: 4 },
  { date: 'Mar 7', spend: 50, revenue: 1155, clicks: 48, impressions: 3200, conversions: 4 },
];

const detailedMetrics = [
  { label: 'Impressions', value: '19,600', icon: <Eye className="h-4 w-4" /> },
  { label: 'Clicks', value: '291', icon: <MousePointerClick className="h-4 w-4" /> },
  { label: 'CTR', value: '2.4%', icon: <TrendingUp className="h-4 w-4" /> },
  { label: 'CPC', value: '$1.12', icon: <DollarSign className="h-4 w-4" /> },
  { label: 'CPM', value: '$12.40', icon: <DollarSign className="h-4 w-4" /> },
  { label: 'CPA', value: '$52.47', icon: <ShoppingCart className="h-4 w-4" /> },
];

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/ads/campaigns"
            className="flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 hover:border-orange/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-extrabold text-gray-900">{campaign.name}</h1>
              <StatusBadge status={campaign.status} />
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <PlatformBadge platform={campaign.platform} />
              <span>{campaign.goal}</span>
              <span>·</span>
              <span>{campaign.budget}</span>
              <span>·</span>
              <span>Started {campaign.startDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-orange/30 transition-colors">
            <Pause className="h-4 w-4" />
            Pause
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-orange/30 transition-colors">
            <Copy className="h-4 w-4" />
            Duplicate
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Performance Chart + Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Daily Performance</h2>
          <div className="h-56 flex items-end gap-3">
            {dailyStats.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center h-44">
                  <div
                    className="w-4 rounded-t-md bg-orange/20"
                    style={{ height: `${(d.spend / 55) * 100}%` }}
                    title={`Spend: $${d.spend}`}
                  />
                  <div
                    className="w-4 rounded-t-md brand-gradient-pink"
                    style={{ height: `${(d.revenue / 1200) * 100}%` }}
                    title={`Revenue: $${d.revenue}`}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{d.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-orange/20" /> Spend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm brand-gradient-pink" /> Revenue
            </span>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Detailed Metrics</h2>
          <div className="space-y-4">
            {detailedMetrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  {m.icon}
                  <span className="text-sm">{m.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ad Copy */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ad Copy</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Headline
              </p>
              <p className="text-sm font-bold text-gray-900">{campaign.adCopy.headline}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Body
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{campaign.adCopy.body}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                CTA
              </p>
              <span className="inline-flex rounded-lg brand-gradient-pink px-4 py-1.5 text-xs font-semibold text-white">
                {campaign.adCopy.cta}
              </span>
            </div>
          </div>
        </div>

        {/* Targeting & Products */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Campaign Setup</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Target Audience
              </p>
              <p className="text-sm font-medium text-gray-900">{campaign.audience}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Featured Products
              </p>
              <div className="space-y-2">
                {campaign.products.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cream-200 to-cream-300 shrink-0" />
                    <span className="text-sm text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Budget
              </p>
              <p className="text-sm text-gray-700">{campaign.budget} · Started {campaign.startDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Target,
  Megaphone,
  Sparkles,
  Calculator,
  AlertTriangle,
  ShoppingCart,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import StatCard from '@/components/ads/StatCard';
import PlatformBadge from '@/components/ads/PlatformBadge';

/* ── Mock Data ───────────────────────────────────────────────── */
const kpiData = [
  { label: 'Total Ad Spend', value: '$2,847.50', change: '+12.3% vs last month', changeType: 'neutral' as const, accent: true, icon: <DollarSign className="h-5 w-5" /> },
  { label: 'Revenue from Ads', value: '$11,294.00', change: '+23.8% vs last month', changeType: 'positive' as const, icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'ROAS', value: '3.96x', change: '+0.4x vs last month', changeType: 'positive' as const, icon: <Target className="h-5 w-5" /> },
  { label: 'Active Campaigns', value: '5', change: '2 new this week', changeType: 'neutral' as const, accent: true, icon: <Megaphone className="h-5 w-5" /> },
];

const topCampaigns = [
  { name: 'Body Wave Bundle Sale', platform: 'meta' as const, spend: '$892', revenue: '$4,280', roas: '4.8x' },
  { name: 'New Arrivals — Deep Wave', platform: 'meta' as const, spend: '$645', revenue: '$2,890', roas: '4.5x' },
  { name: 'Retarget Cart Abandoners', platform: 'meta' as const, spend: '$410', revenue: '$1,640', roas: '4.0x' },
  { name: 'HD Lace Frontal — Google', platform: 'google' as const, spend: '$520', revenue: '$1,560', roas: '3.0x' },
  { name: 'Summer Collection TikTok', platform: 'tiktok' as const, spend: '$380', revenue: '$924', roas: '2.4x' },
];

const aiRecommendations = [
  {
    icon: <TrendingUp className="h-4 w-4 text-green-600" />,
    text: 'Your Body Wave Bundle ad has 4.8x ROAS — consider increasing budget by 20%.',
    type: 'success',
  },
  {
    icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
    text: 'Audience "Natural Hair Enthusiasts" is underperforming — try narrowing age range to 25-40.',
    type: 'warning',
  },
  {
    icon: <ShoppingCart className="h-4 w-4 text-orange" />,
    text: 'You haven\'t run a retarget campaign in 14 days — 23 customers abandoned cart this week.',
    type: 'action',
  },
];

const alerts = [
  { message: 'Campaign "HD Lace Frontal" has spent 80% of daily budget', type: 'budget' },
  { message: 'Summer Collection TikTok CTR dropped below 1.2%', type: 'performance' },
  { message: '6 customers abandoned cart today — launch retarget?', type: 'opportunity' },
];

const chartData = [
  { date: 'Mar 1', spend: 85, revenue: 320 },
  { date: 'Mar 2', spend: 92, revenue: 380 },
  { date: 'Mar 3', spend: 78, revenue: 290 },
  { date: 'Mar 4', spend: 110, revenue: 450 },
  { date: 'Mar 5', spend: 95, revenue: 410 },
  { date: 'Mar 6', spend: 102, revenue: 520 },
  { date: 'Mar 7', spend: 118, revenue: 580 },
];

/* ── Ads Dashboard Page ──────────────────────────────────────── */
export default function AdsDashboard() {
  const [chartRange, setChartRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Ad Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of all your advertising campaigns and performance.
          </p>
        </div>
        <Link
          href="/ads/campaigns/new"
          className="inline-flex items-center gap-2 rounded-xl brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </Link>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            accent={kpi.accent}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Campaign Performance Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Campaign Performance</h2>
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setChartRange(range)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    chartRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end gap-3">
            {chartData.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center h-48">
                  {/* Spend bar */}
                  <div
                    className="w-5 rounded-t-md bg-orange/20"
                    style={{ height: `${(d.spend / 120) * 100}%` }}
                  />
                  {/* Revenue bar */}
                  <div
                    className="w-5 rounded-t-md brand-gradient-pink"
                    style={{ height: `${(d.revenue / 600) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{d.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-orange/20" /> Ad Spend
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm brand-gradient-pink" /> Revenue
            </span>
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Campaigns</h2>
          <div className="space-y-3">
            {topCampaigns.map((c, i) => (
              <div
                key={c.name}
                className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <PlatformBadge platform={c.platform} />
                    <span className="text-xs text-gray-400">
                      {c.spend} → {c.revenue}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">{c.roas}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-2 rounded-2xl border border-lavender-200 bg-gradient-to-br from-lavender-50 to-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-lavender-500" />
            <h2 className="text-lg font-bold text-gray-900">AI Recommendations</h2>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white/60 border border-white p-4"
              >
                <div className="mt-0.5">{rec.icon}</div>
                <p className="text-sm text-gray-700 leading-relaxed">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/ads/campaigns/new"
              className="flex items-center justify-between rounded-xl brand-gradient-pink p-4 text-white hover:shadow-lg hover:shadow-orange/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5" />
                <span className="text-sm font-semibold">Create New Campaign</span>
              </div>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ads/copy-generator"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-orange/30 hover:bg-orange-50/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-lavender-500" />
                <span className="text-sm font-semibold text-gray-900">Generate Ad Copy</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link
              href="/ads/budget-calculator"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-orange/30 hover:bg-orange-50/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-gold" />
                <span className="text-sm font-semibold text-gray-900">Budget Calculator</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Alerts & Notifications</h2>
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl p-3 text-sm ${
                alert.type === 'budget'
                  ? 'bg-yellow-50 text-yellow-800'
                  : alert.type === 'performance'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-orange-50 text-orange-700'
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{alert.message}</span>
              {alert.type === 'opportunity' && (
                <Link
                  href="/ads/campaigns/new"
                  className="ml-auto text-xs font-semibold underline hover:no-underline"
                >
                  Launch Now →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

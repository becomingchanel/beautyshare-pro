'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pause,
  Play,
  Copy,
  Trash2,
  Pencil,
  Filter,
  Megaphone,
} from 'lucide-react';
import PlatformBadge from '@/components/ads/PlatformBadge';
import StatusBadge from '@/components/ads/StatusBadge';

/* ── Mock Campaign Data ──────────────────────────────────────── */
const campaigns = [
  {
    id: '1',
    name: 'Body Wave Bundle — Spring Sale',
    status: 'active' as const,
    platform: 'meta' as const,
    budget: '$50/day',
    spend: '$892.00',
    revenue: '$4,280.00',
    roas: '4.80x',
    ctr: '2.4%',
    cpc: '$1.12',
    conversions: 17,
  },
  {
    id: '2',
    name: 'New Arrivals — Deep Wave Collection',
    status: 'active' as const,
    platform: 'meta' as const,
    budget: '$40/day',
    spend: '$645.00',
    revenue: '$2,890.00',
    roas: '4.48x',
    ctr: '1.9%',
    cpc: '$1.35',
    conversions: 12,
  },
  {
    id: '3',
    name: 'Retarget Cart Abandoners',
    status: 'active' as const,
    platform: 'meta' as const,
    budget: '$25/day',
    spend: '$410.00',
    revenue: '$1,640.00',
    roas: '4.00x',
    ctr: '3.1%',
    cpc: '$0.85',
    conversions: 8,
  },
  {
    id: '4',
    name: 'HD Lace Frontal — Search Ads',
    status: 'active' as const,
    platform: 'google' as const,
    budget: '$35/day',
    spend: '$520.00',
    revenue: '$1,560.00',
    roas: '3.00x',
    ctr: '4.2%',
    cpc: '$2.10',
    conversions: 6,
  },
  {
    id: '5',
    name: 'Summer Collection — TikTok',
    status: 'paused' as const,
    platform: 'tiktok' as const,
    budget: '$30/day',
    spend: '$380.50',
    revenue: '$924.00',
    roas: '2.43x',
    ctr: '0.8%',
    cpc: '$1.90',
    conversions: 4,
  },
  {
    id: '6',
    name: 'Valentine\'s Day — Gift Sets',
    status: 'completed' as const,
    platform: 'meta' as const,
    budget: '$2,000 lifetime',
    spend: '$2,000.00',
    revenue: '$8,400.00',
    roas: '4.20x',
    ctr: '2.6%',
    cpc: '$1.05',
    conversions: 34,
  },
  {
    id: '7',
    name: 'Curly Texture Launch',
    status: 'draft' as const,
    platform: 'meta' as const,
    budget: '$40/day',
    spend: '$0.00',
    revenue: '$0.00',
    roas: '—',
    ctr: '—',
    cpc: '—',
    conversions: 0,
  },
];

export default function CampaignManager() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = campaigns.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Your Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your advertising campaigns.
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-orange outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-orange outline-none"
          >
            <option value="all">All Platforms</option>
            <option value="meta">Meta</option>
            <option value="google">Google</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Campaign</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">Status</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">Platform</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">Budget</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">Spend</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">Revenue</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">ROAS</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">CTR</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500">Conv.</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/ads/campaigns/${c.id}`}
                      className="font-medium text-gray-900 hover:text-orange transition-colors"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-3 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-3 py-4">
                    <PlatformBadge platform={c.platform} />
                  </td>
                  <td className="px-3 py-4 text-right text-gray-600">{c.budget}</td>
                  <td className="px-3 py-4 text-right font-medium text-gray-900">{c.spend}</td>
                  <td className="px-3 py-4 text-right font-medium text-green-600">{c.revenue}</td>
                  <td className="px-3 py-4 text-right">
                    <span
                      className={`font-bold ${
                        c.roas !== '—' && parseFloat(c.roas) >= 3
                          ? 'text-green-600'
                          : c.roas !== '—' && parseFloat(c.roas) >= 2
                            ? 'text-yellow-600'
                            : c.roas !== '—'
                              ? 'text-red-500'
                              : 'text-gray-400'
                      }`}
                    >
                      {c.roas}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-right text-gray-600">{c.ctr}</td>
                  <td className="px-3 py-4 text-right text-gray-600">{c.conversions}</td>
                  <td className="px-3 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                      {openMenu === c.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-gray-200 bg-white shadow-lg py-1 z-10">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            {c.status === 'active' ? (
                              <><Pause className="h-3.5 w-3.5" /> Pause</>
                            ) : (
                              <><Play className="h-3.5 w-3.5" /> Resume</>
                            )}
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Copy className="h-3.5 w-3.5" /> Duplicate
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-16 text-center">
            <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchQuery || statusFilter !== 'all' || platformFilter !== 'all'
                ? 'Try adjusting your filters to find campaigns.'
                : 'Create your first campaign and start driving sales to your store.'}
            </p>
            <Link
              href="/ads/campaigns/new"
              className="inline-flex items-center gap-2 rounded-xl brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20"
            >
              <Plus className="h-4 w-4" />
              Create Your First Campaign
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

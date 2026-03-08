'use client';

import { useState } from 'react';
import {
  Bookmark,
  Plus,
  Search,
  Star,
  ExternalLink,
  Sparkles,
  Filter,
  X,
  Upload,
  Link2,
} from 'lucide-react';
import PlatformBadge from '@/components/ads/PlatformBadge';

/* ── Mock Swipe Data ─────────────────────────────────────────── */
const swipes = [
  {
    id: '1',
    brand: 'GlamHair Co',
    platform: 'meta' as const,
    adType: 'Feed Post',
    tags: ['Social Proof', 'Before/After', 'Testimonial'],
    hookType: 'Transformation',
    aiAnalysis: 'Strong social proof hook + visual transformation creates desire. CTA uses urgency with limited-time offer.',
    rating: 5,
    category: 'competitor',
    gradient: 'from-pink-200 to-orange-100',
  },
  {
    id: '2',
    brand: 'Your Brand — Body Wave',
    platform: 'meta' as const,
    adType: 'Carousel',
    tags: ['Product Focus', 'Clean', 'Multi-product'],
    hookType: 'Product Showcase',
    aiAnalysis: 'Clean product photography with price anchoring. Carousel format drives higher engagement through swiping behavior.',
    rating: 4,
    category: 'mine',
    gradient: 'from-lavender-200 to-pink-100',
  },
  {
    id: '3',
    brand: 'LuxeWigs',
    platform: 'tiktok' as const,
    adType: 'Story/Reel',
    tags: ['UGC-style', 'POV', 'Relatable'],
    hookType: 'POV Hook',
    aiAnalysis: 'UGC-style content builds trust and relatability. POV hook stops scroll. Natural lighting adds authenticity.',
    rating: 5,
    category: 'competitor',
    gradient: 'from-purple-200 to-lavender-100',
  },
  {
    id: '4',
    brand: 'Your Brand — Spring Sale',
    platform: 'meta' as const,
    adType: 'Feed Post',
    tags: ['Sale', 'Urgency', 'Bold Text'],
    hookType: 'Urgency/FOMO',
    aiAnalysis: 'Bold discount percentage grabs attention. Countdown element creates FOMO. Clean brand colors maintain recognition.',
    rating: 3,
    category: 'mine',
    gradient: 'from-orange-200 to-gold-100',
  },
  {
    id: '5',
    brand: 'HairDreams',
    platform: 'meta' as const,
    adType: 'Feed Post',
    tags: ['Lifestyle', 'Aspirational', 'Luxury'],
    hookType: 'Lifestyle',
    aiAnalysis: 'Aspirational lifestyle imagery creates emotional connection. Minimal text lets the visual do the selling.',
    rating: 4,
    category: 'competitor',
    gradient: 'from-gold-200 to-cream-200',
  },
  {
    id: '6',
    brand: 'BundleQueen',
    platform: 'google' as const,
    adType: 'Search Ad',
    tags: ['Search', 'Price Focus', 'Reviews'],
    hookType: 'Price + Social Proof',
    aiAnalysis: 'Leading with reviews count (2,400+) builds instant credibility. Price anchoring with "Starting at" reduces friction.',
    rating: 4,
    category: 'competitor',
    gradient: 'from-green-200 to-blue-100',
  },
];

const tabs = ['All', 'My Ads', 'Competitor Ads', 'Top Rated'];
const hookTypes = ['All', 'Transformation', 'Product Showcase', 'POV Hook', 'Urgency/FOMO', 'Lifestyle', 'Price + Social Proof'];

export default function SwipeLibrary() {
  const [activeTab, setActiveTab] = useState('All');
  const [hookFilter, setHookFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = swipes.filter((s) => {
    if (activeTab === 'My Ads' && s.category !== 'mine') return false;
    if (activeTab === 'Competitor Ads' && s.category !== 'competitor') return false;
    if (activeTab === 'Top Rated' && s.rating < 4) return false;
    if (hookFilter !== 'All' && s.hookType !== hookFilter) return false;
    if (searchQuery && !s.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-extrabold text-gray-900">Ad Swipe Library</h1>
            <Bookmark className="h-5 w-5 text-orange" />
          </div>
          <p className="text-sm text-gray-500">
            Save, organize, and analyze winning ads for inspiration.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add to Library
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand..."
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-orange outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={hookFilter}
            onChange={(e) => setHookFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange outline-none"
          >
            {hookTypes.map((h) => (
              <option key={h} value={h}>
                {h === 'All' ? 'All Hook Types' : h}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swipe Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all"
          >
            {/* Thumbnail */}
            <div className={`h-44 bg-gradient-to-br ${s.gradient} flex items-center justify-center relative`}>
              <div className="h-20 w-20 rounded-xl bg-white/30 flex items-center justify-center">
                <Bookmark className="h-8 w-8 text-white/60" />
              </div>
              {/* Platform badge */}
              <div className="absolute top-3 left-3">
                <PlatformBadge platform={s.platform} />
              </div>
              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < s.rating ? 'text-gold fill-gold' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Brand + type */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">{s.brand}</h3>
                <span className="text-[10px] text-gray-400">{s.adType}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-lavender-50 px-2 py-0.5 text-[10px] font-medium text-lavender-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Analysis */}
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="h-3 w-3 text-lavender-500" />
                  <span className="text-[10px] font-semibold text-gray-500">AI Analysis</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{s.aiAnalysis}</p>
              </div>

              {/* Action */}
              <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-orange/30 py-2 text-xs font-semibold text-orange hover:bg-orange-50 transition-colors">
                <Sparkles className="h-3 w-3" />
                Use as Inspiration
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Add to Swipe Library</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ad URL (Instagram / Facebook / TikTok)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Paste ad URL..."
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400">or</div>

              <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-8 hover:border-orange/30 hover:bg-orange-50/20 transition-colors">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Upload screenshot</span>
              </button>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name</label>
                <input
                  type="text"
                  placeholder="Enter brand name..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button className="flex-1 rounded-xl brand-gradient-pink py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20">
                  Save to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

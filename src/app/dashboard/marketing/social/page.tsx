'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ArrowLeft, Download, Eye, Instagram, Facebook, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Platform = 'all' | 'instagram' | 'facebook' | 'tiktok';
type ContentType = 'all' | 'post' | 'story' | 'reel';

interface Template {
  id: string;
  name: string;
  platform: 'instagram' | 'facebook' | 'tiktok';
  type: 'post' | 'story' | 'reel';
  description: string;
  downloads: number;
  isNew: boolean;
  gradient: string;
}

const templates: Template[] = [
  { id: '1', name: 'New Drop Announcement', platform: 'instagram', type: 'post', description: 'Clean, bold layout for announcing new hair arrivals', downloads: 342, isNew: false, gradient: 'from-pink-400 to-rose-500' },
  { id: '2', name: 'Bundle Deal Promo', platform: 'instagram', type: 'story', description: 'Eye-catching story template for bundle promotions', downloads: 287, isNew: true, gradient: 'from-orange-400 to-pink-500' },
  { id: '3', name: 'Client Transformation', platform: 'instagram', type: 'reel', description: 'Before/after reel cover for client install results', downloads: 256, isNew: false, gradient: 'from-purple-400 to-pink-500' },
  { id: '4', name: 'Flash Sale Alert', platform: 'instagram', type: 'story', description: 'Urgent sale countdown story with timer placeholder', downloads: 198, isNew: true, gradient: 'from-red-400 to-orange-500' },
  { id: '5', name: 'Hair Care Tips', platform: 'facebook', type: 'post', description: 'Educational carousel template for hair maintenance tips', downloads: 167, isNew: false, gradient: 'from-blue-400 to-indigo-500' },
  { id: '6', name: 'Customer Review', platform: 'facebook', type: 'post', description: 'Testimonial highlight with star rating and photo', downloads: 145, isNew: false, gradient: 'from-emerald-400 to-teal-500' },
  { id: '7', name: 'Product Showcase', platform: 'tiktok', type: 'reel', description: 'TikTok-ready product showcase video template', downloads: 234, isNew: true, gradient: 'from-gray-800 to-gray-900' },
  { id: '8', name: 'Giveaway Post', platform: 'instagram', type: 'post', description: 'Engagement-boosting giveaway announcement template', downloads: 189, isNew: false, gradient: 'from-amber-400 to-yellow-500' },
  { id: '9', name: 'Launch Day Countdown', platform: 'instagram', type: 'story', description: '3-day countdown story series for store launches', downloads: 156, isNew: true, gradient: 'from-violet-400 to-purple-500' },
  { id: '10', name: 'Weekly Specials', platform: 'facebook', type: 'post', description: 'Weekly deals post with price tags and product grid', downloads: 134, isNew: false, gradient: 'from-sky-400 to-blue-500' },
  { id: '11', name: 'Unboxing Experience', platform: 'tiktok', type: 'reel', description: 'Customer unboxing reaction video template', downloads: 210, isNew: true, gradient: 'from-pink-500 to-fuchsia-500' },
  { id: '12', name: 'Hair Length Guide', platform: 'instagram', type: 'post', description: 'Visual guide showing different hair lengths (14"-28")', downloads: 298, isNew: false, gradient: 'from-rose-400 to-pink-500' },
];

const platformIcons = {
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  tiktok: <Video className="h-4 w-4" />,
};

export default function SocialTemplates() {
  const [platform, setPlatform] = useState<Platform>('all');
  const [contentType, setContentType] = useState<ContentType>('all');

  const filtered = templates.filter((t) => {
    if (platform !== 'all' && t.platform !== platform) return false;
    if (contentType !== 'all' && t.type !== contentType) return false;
    return true;
  });

  return (
    <DashboardLayout title="Social Media Templates" description="Ready-to-post graphics for every platform">
      <Link href="/dashboard/marketing" className="mb-6 inline-flex items-center gap-1 text-sm text-orange-500 font-medium hover:gap-2 transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Marketing
      </Link>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
          {(['all', 'instagram', 'facebook', 'tiktok'] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                platform === p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p === 'all' ? 'All Platforms' : p}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
          {(['all', 'post', 'story', 'reel'] as ContentType[]).map((ct) => (
            <button
              key={ct}
              onClick={() => setContentType(ct)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                contentType === ct ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {ct === 'all' ? 'All Types' : ct + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <p className="mb-4 text-sm text-gray-500">{filtered.length} templates found</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <div key={t.id} className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
            {/* Placeholder Preview */}
            <div className={`relative h-48 bg-gradient-to-br ${t.gradient} flex items-center justify-center`}>
              <div className="text-center text-white">
                <div className="mb-2 opacity-80">{platformIcons[t.platform]}</div>
                <p className="text-xs font-medium uppercase tracking-wider opacity-70">{t.platform} {t.type}</p>
              </div>
              {t.isNew && (
                <span className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-orange-500">
                  NEW
                </span>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </button>
                <button className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600 flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  {platformIcons[t.platform]} {t.platform}
                </span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs capitalize text-gray-400">{t.type}</span>
              </div>
              <h4 className="font-semibold text-gray-900">{t.name}</h4>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{t.description}</p>
              <p className="mt-2 text-xs text-gray-400">{t.downloads} downloads</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

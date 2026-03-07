'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Instagram,
  Mail,
  Camera,
  Palette,
  ArrowRight,
  Download,
  Star,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Social Media Templates',
    description: 'Ready-to-post Instagram, Facebook, and TikTok graphics for promoting your hair business.',
    icon: <Instagram className="h-7 w-7" />,
    href: '/dashboard/marketing/social',
    count: 24,
    gradient: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-50',
  },
  {
    title: 'Email Templates',
    description: 'Professional email sequences for welcome series, promotions, re-engagement, and abandoned carts.',
    icon: <Mail className="h-7 w-7" />,
    href: '/dashboard/marketing/emails',
    count: 12,
    gradient: 'from-orange-400 to-amber-500',
    bgGlow: 'bg-orange-50',
  },
  {
    title: 'Product Photography',
    description: 'High-quality product photos, lifestyle shots, and flat lays ready to download and use.',
    icon: <Camera className="h-7 w-7" />,
    href: '/dashboard/marketing/photos',
    count: 48,
    gradient: 'from-purple-500 to-violet-500',
    bgGlow: 'bg-purple-50',
  },
  {
    title: 'Brand Asset Kit',
    description: 'Logos, banners, color palettes, and brand guidelines to keep your store looking professional.',
    icon: <Palette className="h-7 w-7" />,
    href: '/dashboard/marketing/brand-kit',
    count: 16,
    gradient: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-50',
  },
];

const featuredTemplates = [
  { name: 'New Drop Announcement', category: 'Instagram Post', downloads: 342 },
  { name: 'Bundle Deal Promo', category: 'Instagram Story', downloads: 287 },
  { name: 'Welcome Email Series', category: 'Email', downloads: 198 },
  { name: 'Client Testimonial', category: 'Facebook Post', downloads: 156 },
];

export default function MarketingHub() {
  return (
    <DashboardLayout title="Marketing Materials" description="Everything you need to market your hair business">
      {/* Stats Bar */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
            <Download className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">100+</p>
            <p className="text-sm text-gray-500">Total Assets</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
            <Star className="h-6 w-6 text-pink-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">New</p>
            <p className="text-sm text-gray-500">Updated Weekly</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">Free</p>
            <p className="text-sm text-gray-500">Included with membership</p>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-orange-200"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}>
                {cat.icon}
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {cat.count} assets
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">{cat.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{cat.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-orange-500 group-hover:gap-2 transition-all">
              Browse Collection <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Popular Downloads */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Popular Downloads</h3>
        <div className="divide-y divide-gray-50">
          {featuredTemplates.map((t) => (
            <div key={t.name} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{t.downloads} downloads</span>
                <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

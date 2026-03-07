'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Truck,
  DollarSign,
  Rocket,
  Megaphone,
  ArrowRight,
  BookOpen,
  Gift,
  Star,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    title: 'Vendor Insights',
    description: 'Find quality hair vendors, evaluate suppliers, negotiate better deals, and build lasting vendor relationships.',
    icon: <Truck className="h-7 w-7" />,
    href: '/dashboard/resources/vendor-insights',
    articles: 8,
    gradient: 'linear-gradient(135deg, #D4713B, #E2AD37)',
    tag: 'Most Popular',
  },
  {
    title: 'Pricing Guidance',
    description: 'Master profitable pricing strategies, understand markups, and learn how to price for wholesale vs retail.',
    icon: <DollarSign className="h-7 w-7" />,
    href: '/dashboard/resources/pricing-guidance',
    articles: 6,
    gradient: 'linear-gradient(135deg, #D61465, #E91E8C)',
    tag: 'Essential',
  },
  {
    title: 'Launch Tips',
    description: 'Step-by-step guidance for launching your hair business — from business plans to your first 100 customers.',
    icon: <Rocket className="h-7 w-7" />,
    href: '/dashboard/resources/launch-tips',
    articles: 10,
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    tag: 'New',
  },
  {
    title: 'Content Strategies',
    description: 'Social media playbooks, content calendars, UGC tips, and viral strategies for hair entrepreneurs.',
    icon: <Megaphone className="h-7 w-7" />,
    href: '/dashboard/resources/content-strategies',
    articles: 7,
    gradient: 'linear-gradient(135deg, #059669, #10B981)',
    tag: 'Trending',
  },
];

export default function ResourcesHub() {
  return (
    <DashboardLayout title="Free Resources" description="Knowledge center for hair entrepreneurs">
      {/* Hero Banner */}
      <div
        className="mb-8 rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A0F08 0%, #2D1B0E 50%, #3D2A1A 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D4713B, transparent)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #E2AD37, #D4713B)' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: 'rgba(212,113,59,0.3)', color: '#E2AD37' }}>
              100% FREE
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#E8D5B5' }}>
            Your Hair Business Knowledge Base
          </h2>
          <p className="text-sm max-w-lg" style={{ color: '#B8A594' }}>
            Expert guides, insider tips, and proven strategies — all included with your BeautyShare Pro membership. No upsells, no paywalls.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid #EDE5DB' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#FFF5EC' }}>
            <Gift className="h-6 w-6" style={{ color: '#D4713B' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">31+</p>
            <p className="text-sm text-gray-500">Free Articles</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid #EDE5DB' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#FFF5EC' }}>
            <Star className="h-6 w-6" style={{ color: '#D4713B' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">4.9/5</p>
            <p className="text-sm text-gray-500">Member Rating</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid #EDE5DB' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#FFF5EC' }}>
            <Sparkles className="h-6 w-6" style={{ color: '#D4713B' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">Weekly</p>
            <p className="text-sm text-gray-500">New Content Added</p>
          </div>
        </div>
      </div>

      {/* Resource Category Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((res) => (
          <Link
            key={res.title}
            href={res.href}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
            style={{ border: '1px solid #EDE5DB' }}
          >
            <div className="flex items-start justify-between">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl text-white"
                style={{ background: res.gradient }}
              >
                {res.icon}
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: '#FFF5EC', color: '#D4713B' }}
              >
                {res.tag}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">{res.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{res.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-gray-400">{res.articles} articles</span>
              <div
                className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: '#D4713B' }}
              >
                Read Now <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}

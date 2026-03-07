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
    gradient: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--highlight)))',
    tag: 'Most Popular',
  },
  {
    title: 'Pricing Guidance',
    description: 'Master profitable pricing strategies, understand markups, and learn how to price for wholesale vs retail.',
    icon: <DollarSign className="h-7 w-7" />,
    href: '/dashboard/resources/pricing-guidance',
    articles: 6,
    gradient: 'linear-gradient(135deg, #D61465, hsl(var(--accent)))',
    tag: 'Essential',
  },
  {
    title: 'Launch Tips',
    description: 'Step-by-step guidance for launching your hair business — from business plans to your first 100 customers.',
    icon: <Rocket className="h-7 w-7" />,
    href: '/dashboard/resources/launch-tips',
    articles: 10,
    gradient: 'linear-gradient(135deg, #9B6FCF, #DCBDEF)',
    tag: 'New',
  },
  {
    title: 'Content Strategies',
    description: 'Social media playbooks, content calendars, UGC tips, and viral strategies for hair entrepreneurs.',
    icon: <Megaphone className="h-7 w-7" />,
    href: '/dashboard/resources/content-strategies',
    articles: 7,
    gradient: 'linear-gradient(135deg, hsl(var(--highlight)), hsl(var(--accent)))',
    tag: 'Trending',
  },
];

export default function ResourcesHub() {
  return (
    <DashboardLayout title="Free Resources" description="Knowledge center for hair entrepreneurs">
      {/* Hero Banner */}
      <div
        className="mb-8 rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #222222 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(var(--highlight)), hsl(var(--accent)))' }}>
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: 'rgba(250,106,39,0.3)', color: 'hsl(var(--highlight))' }}>
              100% FREE
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Your Hair Business Knowledge Base
          </h2>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Expert guides, insider tips, and proven strategies — all included with your BeautyShare Pro membership. No upsells, no paywalls.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))' }}>
            <Gift className="h-6 w-6" style={{ color: 'hsl(var(--accent))' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">31+</p>
            <p className="text-sm text-muted-foreground">Free Articles</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))' }}>
            <Star className="h-6 w-6" style={{ color: 'hsl(var(--accent))' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">4.9/5</p>
            <p className="text-sm text-muted-foreground">Member Rating</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))' }}>
            <Sparkles className="h-6 w-6" style={{ color: 'hsl(var(--accent))' }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Weekly</p>
            <p className="text-sm text-muted-foreground">New Content Added</p>
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
            style={{ border: '1px solid hsl(var(--border))' }}
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
                style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--accent))' }}
              >
                {res.tag}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">{res.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{res.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground/70">{res.articles} articles</span>
              <div
                className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: 'hsl(var(--accent))' }}
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

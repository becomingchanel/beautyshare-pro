'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ArrowLeft, Mail, Copy, Eye, Star, Zap, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  category: 'welcome' | 'promo' | 'reengagement' | 'abandoned';
  subject: string;
  preview: string;
  sequence?: number;
  icon: React.ReactNode;
  color: string;
}

const emailTemplates: EmailTemplate[] = [
  { id: '1', name: 'Welcome Email #1', category: 'welcome', subject: 'Welcome to [Your Store]! Here\'s what to expect', preview: 'Start building your relationship with new subscribers from day one.', sequence: 1, icon: <Star className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '2', name: 'Welcome Email #2', category: 'welcome', subject: 'Your hair journey starts here — meet our bestsellers', preview: 'Showcase your top products and help new subscribers discover their perfect hair.', sequence: 2, icon: <Star className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '3', name: 'Welcome Email #3', category: 'welcome', subject: 'Real customers, real results — see the transformations', preview: 'Social proof email with customer testimonials and before/after photos.', sequence: 3, icon: <Star className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '4', name: 'Flash Sale', category: 'promo', subject: '24-HOUR FLASH SALE: Up to 40% off bundles', preview: 'Create urgency with time-limited deals on bundles and closures.', icon: <Zap className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '5', name: 'New Arrival Drop', category: 'promo', subject: 'Just Dropped: New [Texture] [Length] bundles are here!', preview: 'Build hype for new product launches with exclusive early access.', icon: <Zap className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '6', name: 'Bundle Deal', category: 'promo', subject: 'Save $50 on our bestselling 3-bundle deal', preview: 'Promote bundle packages with clear savings and product details.', icon: <Zap className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '7', name: 'Holiday Special', category: 'promo', subject: 'Holiday Glam: Gift yourself gorgeous hair this season', preview: 'Seasonal promotion template adaptable for any holiday.', icon: <Zap className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '8', name: 'We Miss You', category: 'reengagement', subject: 'It\'s been a while! Here\'s 15% off your next order', preview: 'Win back inactive customers with a personal touch and discount.', icon: <Heart className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '9', name: 'Restock Reminder', category: 'reengagement', subject: 'Time for a restock? Your hair is probably due for some TLC', preview: 'Timely reminder based on typical hair replacement cycles.', icon: <Heart className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '10', name: 'VIP Exclusive', category: 'reengagement', subject: 'You\'re a VIP — here\'s early access to our next drop', preview: 'Reward loyal customers with exclusive early access and perks.', icon: <Heart className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '11', name: 'Cart Reminder', category: 'abandoned', subject: 'You left something gorgeous in your cart!', preview: 'Gentle first reminder with product image and easy checkout link.', sequence: 1, icon: <ShoppingBag className="h-5 w-5" />, color: 'text-purple-500 bg-purple-50' },
  { id: '12', name: 'Last Chance Cart', category: 'abandoned', subject: 'Last chance! Your cart is about to expire', preview: 'Urgency-driven follow-up with scarcity and optional discount.', sequence: 2, icon: <ShoppingBag className="h-5 w-5" />, color: 'text-purple-500 bg-purple-50' },
];

const categoryLabels = {
  all: 'All Templates',
  welcome: 'Welcome Series',
  promo: 'Promotions',
  reengagement: 'Re-engagement',
  abandoned: 'Abandoned Cart',
};

type Category = keyof typeof categoryLabels;

export default function EmailTemplates() {
  const [category, setCategory] = useState<Category>('all');

  const filtered = category === 'all' ? emailTemplates : emailTemplates.filter((t) => t.category === category);

  return (
    <DashboardLayout title="Email Templates" description="Professional email campaigns ready to customize">
      <Link href="/dashboard/marketing" className="mb-6 inline-flex items-center gap-1 text-sm text-orange-500 font-medium hover:gap-2 transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Marketing
      </Link>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-gray-500">{filtered.length} templates</p>

      {/* Template List */}
      <div className="space-y-4">
        {filtered.map((t) => (
          <div key={t.id} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.color}`}>
                {t.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  {t.sequence && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      Step {t.sequence}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">Subject:</span> {t.subject}
                </p>
                <p className="text-sm text-gray-400">{t.preview}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </button>
                <button className="flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600 transition-colors">
                  <Copy className="h-3.5 w-3.5" /> Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

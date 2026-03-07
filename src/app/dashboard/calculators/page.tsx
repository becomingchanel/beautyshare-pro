'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { DollarSign, TrendingUp, Tag, ArrowRight, Calculator, Sparkles } from 'lucide-react';

const calculators = [
  {
    id: 'launch',
    title: 'Launch Cost Calculator',
    description: 'Calculate your total startup costs including inventory, website, packaging, and marketing. See your break-even timeline.',
    icon: DollarSign,
    gradient: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-50',
    href: '/dashboard/calculators/launch',
    tag: 'Most Popular',
  },
  {
    id: 'profit',
    title: 'Profit Calculator',
    description: 'Analyze profit margins per unit, monthly revenue, and ROI. Understand your business profitability at a glance.',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    bgGlow: 'bg-purple-50',
    href: '/dashboard/calculators/profit',
    tag: 'Essential',
  },
  {
    id: 'retail',
    title: 'Retail Price Calculator',
    description: 'Determine optimal retail prices based on wholesale cost, target margins, and competitor pricing analysis.',
    icon: Tag,
    gradient: 'from-orange-500 to-pink-500',
    bgGlow: 'bg-orange-50',
    href: '/dashboard/calculators/retail',
    tag: 'Strategic',
  },
];

export default function CalculatorsPage() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Calculator className="h-6 w-6" />
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              Free with membership
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Business Calculators</h1>
          <p className="text-white/80 max-w-xl">
            Professional tools to help you price, cost, and scale your beauty business. Make data-driven decisions with real-time calculations.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 right-20 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Calculator Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const IconComponent = calc.icon;
          return (
            <Link key={calc.id} href={calc.href}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border border-gray-100 hover:border-pink-200">
                <div className="p-8 h-full flex flex-col">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`bg-gradient-to-br ${calc.gradient} rounded-xl p-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
                      {calc.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {calc.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {calc.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-pink-500 group-hover:gap-3 transition-all">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 to-orange-50 p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 flex-shrink-0">
            <Sparkles className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How to use these calculators</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <p className="text-sm text-gray-600">Enter your business costs and pricing information</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <p className="text-sm text-gray-600">Results update in real-time as you adjust values</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <p className="text-sm text-gray-600">Save your calculations for future reference</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <p className="text-sm text-gray-600">Use insights to make data-driven decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

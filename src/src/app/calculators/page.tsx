'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import {
  Rocket,
  TrendingUp,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

const calculators = [
  {
    title: 'Launch Calculator',
    description: 'Calculate your total startup costs and first-month investment to launch your hair business.',
    href: '/calculators/launch',
    icon: Rocket,
    color: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Profit Calculator',
    description: 'See your real profit per order after wholesale costs, shipping, and platform fees.',
    href: '/calculators/profit',
    icon: TrendingUp,
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Retail Price Calculator',
    description: 'Find the optimal retail price for each product based on your target margins.',
    href: '/calculators/retail-price',
    icon: DollarSign,
    color: 'bg-brand-50 text-brand-700',
  },
];

export default function CalculatorsPage() {
  return (
    <DashboardLayout
      userName="Member"
      tierLabel="Launch"
      pageTitle="Pricing Calculators"
      pageDescription="Tools to help you price profitably and plan your launch"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href}>
            <Card hover className="h-full group cursor-pointer">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${calc.color} mb-4`}>
                <calc.icon className="h-6 w-6" />
              </div>
              <CardTitle>{calc.title}</CardTitle>
              <CardDescription>{calc.description}</CardDescription>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                Open calculator
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}

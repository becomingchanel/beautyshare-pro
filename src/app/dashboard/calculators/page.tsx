'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, TrendingUp, Tag, ArrowRight } from 'lucide-react';

const calculators = [
  {
    id: 'launch',
    title: 'Launch Cost Calculator',
    description: 'Calculate your startup costs including inventory, website, packaging, and marketing. Determine break-even point.',
    icon: DollarSign,
    color: 'from-orange-500 to-red-500',
    href: '/dashboard/calculators/launch',
  },
  {
    id: 'profit',
    title: 'Profit Calculator',
    description: 'Analyze your profit margins per unit, monthly revenue, and ROI. See your business profitability at a glance.',
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-500',
    href: '/dashboard/calculators/profit',
  },
  {
    id: 'retail',
    title: 'Retail Price Calculator',
    description: 'Determine optimal retail prices based on wholesale cost, target margin, and competitor pricing.',
    icon: Tag,
    color: 'from-purple-500 to-pink-500',
    href: '/dashboard/calculators/retail',
  },
];

export default function CalculatorsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Business Calculators</h1>
        <p className="text-gray-600 mt-2">Professional tools to help you price, cost, and scale your beauty business</p>
      </div>

      {/* Calculator Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const IconComponent = calc.icon;
          return (
            <Link key={calc.id} href={calc.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${calc.color} rounded-lg p-4 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {calc.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {calc.description}
                  </p>

                  {/* Button */}
                  <Button
                    variant="ghost"
                    className="justify-between w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  >
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Info Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to use these calculators</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
              <span>Enter your business costs and pricing information</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
              <span>Results update in real-time as you adjust values</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
              <span>Save your calculations for future reference and comparison</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
              <span>Use insights to make data-driven business decisions</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

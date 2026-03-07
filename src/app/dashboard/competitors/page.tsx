'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface Competitor {
  id: string;
  name: string;
  initial: string;
  color: string;
  priceRange: string;
  productCount: number;
  socialFollowers: number;
  strengths: string[];
  weaknesses: string[];
  yourPrice: number;
  theirPrice: number;
  lastChecked: string;
}

interface PriceAlert {
  id: string;
  brand: string;
  message: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}

const competitors: Competitor[] = [
  {
    id: '1',
    name: 'LuxeLocks Beauty',
    initial: 'L',
    color: '#FF6B6B',
    priceRange: '$25-$89',
    productCount: 142,
    socialFollowers: 87300,
    strengths: ['Strong branding', 'Fast shipping', 'Premium quality'],
    weaknesses: ['High prices', 'Limited colors', 'Slow support'],
    yourPrice: 45,
    theirPrice: 65,
    lastChecked: '2 hours ago',
  },
  {
    id: '2',
    name: 'HairFlow Pro',
    initial: 'H',
    color: '#4ECDC4',
    priceRange: '$18-$72',
    productCount: 156,
    socialFollowers: 92100,
    strengths: ['Great reviews', 'Wide selection', 'Fast delivery'],
    weaknesses: ['Inconsistent quality', 'Poor packaging'],
    yourPrice: 45,
    theirPrice: 48,
    lastChecked: '4 hours ago',
  },
  {
    id: '3',
    name: 'BeautyVault',
    initial: 'B',
    color: '#FFD93D',
    priceRange: '$20-$95',
    productCount: 198,
    socialFollowers: 125400,
    strengths: ['Largest catalog', 'Celebrity partnerships', 'Brand recognition'],
    weaknesses: ['Higher prices', 'Generic packaging'],
    yourPrice: 45,
    theirPrice: 75,
    lastChecked: '1 hour ago',
  },
  {
    id: '4',
    name: 'StyleStrands Co',
    initial: 'S',
    color: '#6BCB77',
    priceRange: '$22-$68',
    productCount: 89,
    socialFollowers: 45200,
    strengths: ['Eco-friendly', 'Personalization', 'Customer service'],
    weaknesses: ['Limited products', 'Longer delivery'],
    yourPrice: 45,
    theirPrice: 52,
    lastChecked: '3 hours ago',
  },
  {
    id: '5',
    name: 'GlamWire Extensions',
    initial: 'G',
    color: '#9D84B7',
    priceRange: '$35-$110',
    productCount: 76,
    socialFollowers: 38900,
    strengths: ['Premium positioning', 'Exclusive designs', 'VIP program'],
    weaknesses: ['Very high prices', 'Minimal selection'],
    yourPrice: 45,
    theirPrice: 95,
    lastChecked: '5 hours ago',
  },
  {
    id: '6',
    name: 'TrendHair Studio',
    initial: 'T',
    color: '#FF8B94',
    priceRange: '$15-$60',
    productCount: 112,
    socialFollowers: 56700,
    strengths: ['Budget-friendly', 'Trendy styles', 'Social presence'],
    weaknesses: ['Quality inconsistent', 'Limited warranty'],
    yourPrice: 45,
    theirPrice: 38,
    lastChecked: '2 hours ago',
  },
];

const priceAlerts: PriceAlert[] = [
  {
    id: '1',
    brand: 'LuxeLocks Beauty',
    message: 'Dropped prices 15% on premium extensions bundle',
    timestamp: '2 hours ago',
    severity: 'high',
  },
  {
    id: '2',
    brand: 'HairFlow Pro',
    message: 'New flash sale: 20% off all products',
    timestamp: '4 hours ago',
    severity: 'high',
  },
  {
    id: '3',
    brand: 'StyleStrands Co',
    message: 'Free shipping threshold lowered to $35',
    timestamp: '6 hours ago',
    severity: 'medium',
  },
  {
    id: '4',
    brand: 'BeautyVault',
    message: 'Launched subscription service at $9.99/mo',
    timestamp: '8 hours ago',
    severity: 'medium',
  },
  {
    id: '5',
    brand: 'TrendHair Studio',
    message: 'Restocked limited edition colors',
    timestamp: '12 hours ago',
    severity: 'low',
  },
];

const marketShare = [
  { brand: 'BeautyVault', share: 28, color: '#FFD93D' },
  { brand: 'HairFlow Pro', share: 24, color: '#4ECDC4' },
  { brand: 'LuxeLocks Beauty', share: 18, color: '#FF6B6B' },
  { brand: 'StyleStrands Co', share: 14, color: '#6BCB77' },
  { brand: 'GlamWire Extensions', share: 10, color: '#9D84B7' },
  { brand: 'TrendHair Studio', share: 6, color: '#FF8B94' },
];

export default function CompetitorMonitor() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompetitors = competitors.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Competitor Monitor</h1>
          <p className="text-slate-600">Track competitive intelligence and market positioning</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            label="Competitors Tracked"
            value="8"
            subtext="2 new"
          />
          <MetricCard
            label="Price Advantage"
            value="12%"
            subtext="vs avg"
          />
          <MetricCard
            label="Market Position"
            value="#3"
            subtext="was #2"
          />
          <MetricCard
            label="Price Alerts"
            value="5"
            subtext="this week"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            placeholder="Search competitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80"
          />
        </div>

        {/* Competitors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCompetitors.map((competitor) => {
            const priceAdvantage = competitor.yourPrice < competitor.theirPrice;
            const priceDiff = Math.abs(competitor.yourPrice - competitor.theirPrice);

            return (
              <Card key={competitor.id} className="p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: competitor.color }}
                    >
                      {competitor.initial}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{competitor.name}</h3>
                      <p className="text-sm text-slate-500">Last checked: {competitor.lastChecked}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Price Range</p>
                    <p className="text-sm font-semibold text-slate-900">{competitor.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Products</p>
                    <p className="text-sm font-semibold text-slate-900">{competitor.productCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Followers</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {(competitor.socialFollowers / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Price Comparison</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(competitor.yourPrice / competitor.theirPrice) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={priceAdvantage ? 'text-green-600 font-semibold' : 'text-slate-600'}>
                      You: ${competitor.yourPrice}
                    </span>
                    <span className={!priceAdvantage ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                      Them: ${competitor.theirPrice}
                    </span>
                  </div>
                  {priceAdvantage && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      You're ${priceDiff} cheaper ✓
                    </p>
                  )}
                  {!priceAdvantage && (
                    <p className="text-xs text-red-600 font-semibold mt-1">
                      They're ${priceDiff} cheaper
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {competitor.strengths.map((strength) => (
                      <Badge key={strength} variant="success">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Weaknesses</p>
                  <div className="flex flex-wrap gap-2">
                    {competitor.weaknesses.map((weakness) => (
                      <Badge key={weakness} variant="warning">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Market Position Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Market Share Estimates</h2>
          <div className="space-y-4">
            {marketShare.map((item) => (
              <div key={item.brand}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">{item.brand}</span>
                  <span className="text-sm font-bold text-slate-700">{item.share}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: `${item.share}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Price Alert Feed */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Price Alert Feed</h2>
          <div className="space-y-3">
            {priceAlerts.map((alert) => {
              const severityColors = {
                high: 'bg-red-50 border-red-200 text-red-700',
                medium: 'bg-orange-50 border-orange-200 text-orange-700',
                low: 'bg-blue-50 border-blue-200 text-blue-700',
              };

              return (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-lg ${severityColors[alert.severity]}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{alert.brand}</p>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs font-semibold opacity-70 whitespace-nowrap ml-4">
                      {alert.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

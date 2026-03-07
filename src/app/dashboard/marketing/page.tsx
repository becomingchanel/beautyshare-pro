'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Download, Upload, Search, Grid3x3 } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Social Media Templates',
  'Email Templates',
  'Product Photos',
  'Brand Assets',
  'Educational Content',
  'Promotional Materials',
];

const DEMO_ASSETS = [
  { id: 1, name: 'Summer Collection Banner', category: 'Social Media Templates', type: 'PNG', size: '2.4MB', date: '2024-02-28', gradient: 'from-pink-400 to-rose-500' },
  { id: 2, name: 'Email Newsletter Template', category: 'Email Templates', type: 'HTML', size: '156KB', date: '2024-02-27', gradient: 'from-blue-400 to-indigo-500' },
  { id: 3, name: 'Product Photography Pack', category: 'Product Photos', type: 'ZIP', size: '45.2MB', date: '2024-02-26', gradient: 'from-amber-400 to-orange-500' },
  { id: 4, name: 'Brand Logo Suite', category: 'Brand Assets', type: 'PSD', size: '8.7MB', date: '2024-02-25', gradient: 'from-purple-400 to-pink-500' },
  { id: 5, name: 'Educational Video - Hair Care 101', category: 'Educational Content', type: 'MP4', size: '156MB', date: '2024-02-24', gradient: 'from-green-400 to-emerald-500' },
  { id: 6, name: 'Valentine\'s Day Promo Design', category: 'Promotional Materials', type: 'PNG', size: '3.1MB', date: '2024-02-23', gradient: 'from-red-400 to-pink-500' },
  { id: 7, name: 'Instagram Story Templates', category: 'Social Media Templates', type: 'PSD', size: '5.2MB', date: '2024-02-22', gradient: 'from-pink-400 to-fuchsia-500' },
  { id: 8, name: 'Weekly Digest Email', category: 'Email Templates', type: 'HTML', size: '198KB', date: '2024-02-21', gradient: 'from-cyan-400 to-blue-500' },
  { id: 9, name: 'Professional Headshots', category: 'Product Photos', type: 'ZIP', size: '67.5MB', date: '2024-02-20', gradient: 'from-slate-400 to-gray-500' },
  { id: 10, name: 'Brand Color Palette', category: 'Brand Assets', type: 'PDF', size: '512KB', date: '2024-02-19', gradient: 'from-indigo-400 to-purple-500' },
  { id: 11, name: 'Tutorial: Nail Art Basics', category: 'Educational Content', type: 'MP4', size: '89MB', date: '2024-02-18', gradient: 'from-lime-400 to-green-500' },
  { id: 12, name: 'Spring Launch Campaign Kit', category: 'Promotional Materials', type: 'ZIP', size: '12.8MB', date: '2024-02-17', gradient: 'from-teal-400 to-cyan-500' },
];

const FEATURED_COLLECTION = {
  name: 'Spring Launch Kit',
  description: 'Complete package with social media templates, email designs, and promotional materials',
  assets: 5,
  items: ['Spring Collection Banner', 'Email Newsletter Template', 'Product Photography Pack', 'Instagram Story Templates', 'Professional Headshots'],
};

export default function MarketingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = DEMO_ASSETS.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
        <p className="text-gray-600 mt-2">Access ready-to-use marketing materials and assets for your business</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total Assets" value="48" />
        <MetricCard label="Categories" value="6" />
        <MetricCard label="Downloads This Month" value="124" />
        <MetricCard label="New This Week" value="3" />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search assets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Collection Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{FEATURED_COLLECTION.name}</h3>
            <p className="text-gray-600 mt-2">{FEATURED_COLLECTION.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FEATURED_COLLECTION.items.map((item, idx) => (
                <Badge key={idx}>{item}</Badge>
              ))}
            </div>
          </div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            View Collection
          </button>
        </div>
      </Card>

      {/* Asset Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All Assets {filteredAssets.length > 0 && `(${filteredAssets.length})`}
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className={`h-40 bg-gradient-to-br ${asset.gradient} flex items-center justify-center`}>
                <Grid3x3 className="h-12 w-12 text-white opacity-50" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{asset.name}</h3>

                <div className="flex items-center justify-between">
                  <Badge>{asset.category}</Badge>
                  <span className="text-xs text-gray-500 font-medium">{asset.type}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{asset.size}</span>
                  <span>{asset.date}</span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload CTA Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 border-2 border-dashed">
        <div className="flex items-center justify-between py-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Share Your Assets</h3>
            <p className="text-gray-600 mt-2">Upload your own marketing materials and templates to share with the community</p>
          </div>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Asset
          </button>
        </div>
      </Card>
    </div>
  );
}

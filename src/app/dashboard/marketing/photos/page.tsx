'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ArrowLeft, Download, ZoomIn, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type PhotoCategory = 'all' | 'bundles' | 'closures' | 'frontals' | 'lifestyle' | 'flatlay';

interface Photo {
  id: string;
  name: string;
  category: Exclude<PhotoCategory, 'all'>;
  resolution: string;
  size: string;
  gradient: string;
  label: string;
}

const photos: Photo[] = [
  { id: '1', name: 'Brazilian Body Wave 18" - Front', category: 'bundles', resolution: '2400x2400', size: '3.2 MB', gradient: 'from-amber-200 to-orange-300', label: 'BBW' },
  { id: '2', name: 'Brazilian Body Wave 18" - Detail', category: 'bundles', resolution: '2400x2400', size: '2.8 MB', gradient: 'from-amber-300 to-orange-400', label: 'BBW' },
  { id: '3', name: 'Peruvian Straight 20" - Front', category: 'bundles', resolution: '2400x2400', size: '3.1 MB', gradient: 'from-stone-200 to-stone-400', label: 'PS' },
  { id: '4', name: 'Peruvian Straight 20" - Texture', category: 'bundles', resolution: '2400x2400', size: '2.5 MB', gradient: 'from-stone-300 to-stone-500', label: 'PS' },
  { id: '5', name: 'Malaysian Deep Wave 16" - Front', category: 'bundles', resolution: '2400x2400', size: '3.0 MB', gradient: 'from-purple-200 to-purple-400', label: 'MDW' },
  { id: '6', name: 'Cambodian Curly 22" - Front', category: 'bundles', resolution: '2400x2400', size: '3.4 MB', gradient: 'from-rose-200 to-rose-400', label: 'CC' },
  { id: '7', name: '13x4 HD Lace Frontal - Front', category: 'frontals', resolution: '2400x2400', size: '2.9 MB', gradient: 'from-pink-200 to-pink-400', label: 'LF' },
  { id: '8', name: '13x4 HD Lace Frontal - Detail', category: 'frontals', resolution: '2400x2400', size: '2.6 MB', gradient: 'from-pink-300 to-fuchsia-400', label: 'LF' },
  { id: '9', name: '5x5 Lace Closure - Front', category: 'closures', resolution: '2400x2400', size: '2.4 MB', gradient: 'from-violet-200 to-violet-400', label: 'LC' },
  { id: '10', name: '5x5 Lace Closure - Installed', category: 'closures', resolution: '2400x2400', size: '3.3 MB', gradient: 'from-violet-300 to-indigo-400', label: 'LC' },
  { id: '11', name: 'Luxury Bundle Set - Lifestyle', category: 'lifestyle', resolution: '3000x2000', size: '4.1 MB', gradient: 'from-amber-100 to-orange-200', label: 'LF' },
  { id: '12', name: 'Client Install - Body Wave', category: 'lifestyle', resolution: '3000x2000', size: '3.8 MB', gradient: 'from-orange-100 to-pink-200', label: 'CI' },
  { id: '13', name: 'Styled Look - Curly', category: 'lifestyle', resolution: '3000x2000', size: '3.5 MB', gradient: 'from-pink-100 to-rose-200', label: 'SL' },
  { id: '14', name: 'Bundle Trio Flat Lay', category: 'flatlay', resolution: '3000x3000', size: '4.5 MB', gradient: 'from-gray-100 to-gray-300', label: 'FL' },
  { id: '15', name: 'Product Grid - All Textures', category: 'flatlay', resolution: '3000x3000', size: '4.8 MB', gradient: 'from-stone-100 to-amber-200', label: 'FL' },
  { id: '16', name: 'Packaging & Branding Flat Lay', category: 'flatlay', resolution: '3000x3000', size: '3.9 MB', gradient: 'from-orange-50 to-orange-200', label: 'FL' },
];

const categoryLabels: Record<PhotoCategory, string> = {
  all: 'All Photos',
  bundles: 'Hair Bundles',
  closures: 'Closures',
  frontals: 'Frontals',
  lifestyle: 'Lifestyle Shots',
  flatlay: 'Flat Lays',
};

export default function ProductPhotos() {
  const [category, setCategory] = useState<PhotoCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = category === 'all' ? photos : photos.filter((p) => p.category === category);

  return (
    <DashboardLayout title="Product Photography" description="Professional photos ready to use on your store and social media">
      <Link href="/dashboard/marketing" className="mb-6 inline-flex items-center gap-1 text-sm text-orange-500 font-medium hover:gap-2 transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Marketing
      </Link>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryLabels) as PhotoCategory[]).map((cat) => (
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
        <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">{filtered.length} photos</p>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className={`relative h-44 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white/40">{p.label}</span>
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-lg bg-white p-2 text-gray-900 hover:bg-gray-100">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg bg-orange-500 p-2 text-white hover:bg-orange-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-medium text-gray-900 truncate">{p.name}</h4>
                <p className="text-xs text-gray-400">{p.resolution} &middot; {p.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0`}>
                <span className="text-sm font-bold text-white/50">{p.label}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">{p.name}</h4>
                <p className="text-xs text-gray-400">{p.resolution} &middot; {p.size} &middot; {p.category}</p>
              </div>
              <button className="flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600 transition-colors shrink-0">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

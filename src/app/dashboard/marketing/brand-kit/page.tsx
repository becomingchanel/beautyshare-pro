'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ArrowLeft, Download, FileImage, FileText, Palette, Type, Image } from 'lucide-react';
import Link from 'next/link';

interface BrandAsset {
  id: string;
  name: string;
  description: string;
  type: 'logo' | 'banner' | 'guideline' | 'font' | 'graphic';
  format: string;
  size: string;
  icon: React.ReactNode;
  color: string;
}

const assets: BrandAsset[] = [
  { id: '1', name: 'BSP Logo — Full Color', description: 'Primary logo for light backgrounds, horizontal layout', type: 'logo', format: 'PNG + SVG', size: '1.2 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '2', name: 'BSP Logo — White', description: 'Logo for dark backgrounds, horizontal layout', type: 'logo', format: 'PNG + SVG', size: '1.1 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '3', name: 'BSP Icon — Favicon', description: 'Square icon for favicons, app icons, and social profiles', type: 'logo', format: 'PNG + ICO', size: '0.5 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-orange-500 bg-orange-50' },
  { id: '4', name: 'Store Banner — Default', description: 'Standard hero banner for Shopify stores (1920x600)', type: 'banner', format: 'PNG + PSD', size: '4.8 MB', icon: <Image className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '5', name: 'Store Banner — Sale Event', description: 'Sale banner template with customizable discount text', type: 'banner', format: 'PNG + PSD', size: '5.1 MB', icon: <Image className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '6', name: 'Social Media Banner Pack', description: 'Cover images for Instagram, Facebook, Twitter, YouTube', type: 'banner', format: 'PNG + PSD', size: '8.2 MB', icon: <Image className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '7', name: 'Email Header Template', description: 'Branded email header with your store name and logo', type: 'banner', format: 'PNG + HTML', size: '1.5 MB', icon: <Image className="h-5 w-5" />, color: 'text-pink-500 bg-pink-50' },
  { id: '8', name: 'Brand Guidelines PDF', description: 'Complete brand book with colors, typography, logo usage rules', type: 'guideline', format: 'PDF', size: '12.3 MB', icon: <FileText className="h-5 w-5" />, color: 'text-lavender-500 bg-lavender-50' },
  { id: '9', name: 'Color Palette Swatches', description: 'Primary, secondary, and accent colors with HEX, RGB, CMYK values', type: 'guideline', format: 'PDF + ASE', size: '0.8 MB', icon: <Palette className="h-5 w-5" />, color: 'text-lavender-500 bg-lavender-50' },
  { id: '10', name: 'Typography Guide', description: 'Font pairings, sizes, and usage guidelines for your store', type: 'font', format: 'PDF + OTF', size: '3.4 MB', icon: <Type className="h-5 w-5" />, color: 'text-gold-300 bg-gold-50' },
  { id: '11', name: 'Packaging Label Template', description: 'Product label and hang tag templates with your branding', type: 'graphic', format: 'AI + PDF', size: '6.7 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '12', name: 'Business Card Template', description: 'Double-sided business card with your store info', type: 'graphic', format: 'PDF + PSD', size: '2.1 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '13', name: 'Thank You Card Template', description: 'Insert card for order packaging with QR code placeholder', type: 'graphic', format: 'PDF + PSD', size: '1.8 MB', icon: <FileImage className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
  { id: '14', name: 'Invoice Template', description: 'Professional branded invoice for wholesale orders', type: 'graphic', format: 'PDF + DOCX', size: '0.9 MB', icon: <FileText className="h-5 w-5" />, color: 'text-amber-500 bg-amber-50' },
];

const groupedAssets = {
  'Logos & Icons': assets.filter((a) => a.type === 'logo'),
  'Banners & Headers': assets.filter((a) => a.type === 'banner'),
  'Brand Guidelines': assets.filter((a) => a.type === 'guideline' || a.type === 'font'),
  'Print & Packaging': assets.filter((a) => a.type === 'graphic'),
};

export default function BrandKit() {
  return (
    <DashboardLayout title="Brand Asset Kit" description="Everything you need to maintain a consistent, professional brand">
      <Link href="/dashboard/marketing" className="mb-6 inline-flex items-center gap-1 text-sm text-orange-500 font-medium hover:gap-2 transition-all">
        <ArrowLeft className="h-4 w-4" /> Back to Marketing
      </Link>

      {/* Quick download all */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Download Complete Brand Kit</h3>
            <p className="mt-1 text-sm text-white/80">Get all {assets.length} brand assets in one ZIP file</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-500 hover:bg-orange-50 transition-colors">
            <Download className="h-4 w-4" /> Download All (42 MB)
          </button>
        </div>
      </div>

      {/* Asset Groups */}
      <div className="space-y-8">
        {Object.entries(groupedAssets).map(([groupName, groupAssets]) => (
          <div key={groupName}>
            <h3 className="mb-4 text-lg font-bold text-gray-900">{groupName}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {groupAssets.map((asset) => (
                <div key={asset.id} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${asset.color}`}>
                    {asset.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                    <p className="mt-1 text-sm text-gray-500">{asset.description}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs text-gray-400">{asset.format}</span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-400">{asset.size}</span>
                    </div>
                  </div>
                  <button className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

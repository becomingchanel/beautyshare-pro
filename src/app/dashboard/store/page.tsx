'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Globe,
  Palette,
  Search,
  Upload,
  ExternalLink,
  Check,
  AlertCircle,
  Settings,
  Eye,
} from 'lucide-react';
import { useState } from 'react';

export default function StoreSettings() {
  const [activeTab, setActiveTab] = useState<'brand' | 'domain' | 'seo'>('brand');

  const tabs = [
    { id: 'brand' as const, label: 'Brand & Design', icon: <Palette className="h-4 w-4" /> },
    { id: 'domain' as const, label: 'Domain Settings', icon: <Globe className="h-4 w-4" /> },
    { id: 'seo' as const, label: 'SEO & Visibility', icon: <Search className="h-4 w-4" /> },
  ];

  return (
    <DashboardLayout title="My Store" description="Manage your storefront settings and customization">
      {/* Store Status Banner */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-green-50 border border-green-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">Store is Live</p>
            <p className="text-xs text-green-700">glowuphair.myshopify.com</p>
          </div>
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 transition-colors">
          <ExternalLink className="h-3.5 w-3.5" /> Visit Store
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Brand & Design */}
      {activeTab === 'brand' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Brand Identity</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Name</label>
                <input type="text" defaultValue="Glow Up Hair Co." className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
                <input type="text" defaultValue="Luxury hair for the modern queen" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Logo</h3>
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-2xl font-bold text-white shadow-lg">
                GU
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-3">Upload your logo in PNG, JPG, or SVG format. Recommended size: 512x512px.</p>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Upload className="h-4 w-4" /> Upload New Logo
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Colors</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                <input type="color" defaultValue="#FA6A27" className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                <div><p className="text-sm font-medium">Primary</p><p className="text-xs text-gray-400">#FA6A27</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                <input type="color" defaultValue="#D61465" className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                <div><p className="text-sm font-medium">Secondary</p><p className="text-xs text-gray-400">#D61465</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                <input type="color" defaultValue="#DCBDEF" className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                <div><p className="text-sm font-medium">Accent</p><p className="text-xs text-gray-400">#DCBDEF</p></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-colors">
              Save Changes
            </button>
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" /> Preview Store
            </button>
          </div>
        </div>
      )}

      {/* Domain Settings */}
      {activeTab === 'domain' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Shopify Domain</h3>
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500"><Check className="h-4 w-4 text-white" /></div>
              <div>
                <p className="text-sm font-medium text-gray-900">glowuphair.myshopify.com</p>
                <p className="text-xs text-gray-500">Connected and active</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Domain</h3>
            <p className="text-sm text-gray-500 mb-4">Connect your own domain name for a more professional look</p>
            <div className="flex gap-3">
              <input type="text" placeholder="www.yourdomain.com" className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              <button className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-colors">
                Connect Domain
              </button>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">DNS Configuration Required</p>
                <p className="text-xs text-amber-700 mt-1">After connecting, you'll need to update your domain's DNS settings. We'll provide step-by-step instructions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Search Engine Optimization</h3>
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Page Title</label>
                <input type="text" defaultValue="Glow Up Hair Co. — Premium Virgin Hair Extensions" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                <p className="mt-1 text-xs text-gray-400">Recommended: 50-60 characters</p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea defaultValue="Shop premium virgin hair bundles, closures, and frontals. Brazilian, Peruvian, and Malaysian textures available. Free shipping on orders over $150." rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                <p className="mt-1 text-xs text-gray-400">Recommended: 150-160 characters</p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Keywords</label>
                <input type="text" defaultValue="virgin hair, hair bundles, lace closure, frontal, brazilian hair" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Google Preview</h3>
            <p className="text-sm text-gray-500 mb-4">This is how your store appears in search results</p>
            <div className="rounded-xl border border-gray-200 p-4 bg-white max-w-lg">
              <p className="text-sm text-green-700">www.glowuphair.com</p>
              <p className="text-lg text-blue-600 font-medium hover:underline cursor-pointer">Glow Up Hair Co. — Premium Virgin Hair Extensions</p>
              <p className="text-sm text-gray-600">Shop premium virgin hair bundles, closures, and frontals. Brazilian, Peruvian, and Malaysian textures available. Free shipping on orders over $150.</p>
            </div>
          </div>

          <button className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-colors">
            Save SEO Settings
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

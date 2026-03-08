'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Pencil,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  ShoppingCart,
  RefreshCw,
  Star,
} from 'lucide-react';

/* ── Saved Audiences ─────────────────────────────────────────── */
const savedAudiences = [
  { id: '1', name: 'Hair Extension Buyers', type: 'Preset', reach: '2.4M - 3.1M', campaigns: 3, avgRoas: '4.2x' },
  { id: '2', name: 'Luxury Beauty Shoppers', type: 'Preset', reach: '890K - 1.2M', campaigns: 2, avgRoas: '3.8x' },
  { id: '3', name: 'Cart Abandoners — Last 14 Days', type: 'Retarget', reach: '1,240', campaigns: 1, avgRoas: '5.1x' },
  { id: '4', name: 'Lookalike — VIP Customers 1%', type: 'Lookalike', reach: '1.5M', campaigns: 2, avgRoas: '3.5x' },
  { id: '5', name: 'Custom: ATL Salon Owners', type: 'Custom', reach: '45K', campaigns: 0, avgRoas: '—' },
];

/* ── Pre-built Audiences ─────────────────────────────────────── */
const prebuiltAudiences = [
  {
    name: 'Hair Extension Buyers',
    description: 'Women 25-54 interested in hair extensions, wigs, beauty supply stores, and hair care',
    reach: '2.4M - 3.1M',
    demographics: 'Female, 25-54, US',
    interests: ['Hair extensions', 'Wigs', 'Beauty supply', 'Hair care'],
  },
  {
    name: 'Natural Hair Community',
    description: 'Women 18-44 interested in natural hair, protective styles, box braids, and crochet hair',
    reach: '1.8M - 2.5M',
    demographics: 'Female, 18-44, US',
    interests: ['Natural hair', 'Protective styles', 'Box braids', 'Hair tutorials'],
  },
  {
    name: 'Luxury Beauty Shoppers',
    description: 'High-income women 25-54 interested in premium beauty, luxury goods, and online shopping',
    reach: '890K - 1.2M',
    demographics: 'Female, 25-54, US, High income',
    interests: ['Luxury beauty', 'Premium products', 'Online shopping', 'Self-care'],
  },
  {
    name: 'Salon Owners & Stylists',
    description: 'Professionals 25-55 in hair styling, salon management, and cosmetology',
    reach: '340K - 520K',
    demographics: 'All, 25-55, US',
    interests: ['Cosmetology', 'Salon owner', 'Hairstylist', 'Salon management'],
  },
  {
    name: 'Competitor Audiences',
    description: 'People who follow or engage with competing hair extension and wig brands',
    reach: '1.2M - 1.8M',
    demographics: 'Female, 18-55, US',
    interests: ['Competitor brands', 'Hair brands', 'Beauty influencers'],
  },
  {
    name: 'Lookalike from VIP Customers',
    description: '1-3% lookalike audience based on your top-spending Diamond & Gold tier customers',
    reach: '1.5M - 2.0M',
    demographics: 'Modeled from your customer data',
    interests: ['Auto-generated from purchase behavior'],
  },
  {
    name: 'Cart Abandoners',
    description: 'Visitors who added products to cart but didn\'t complete purchase in the last 30 days',
    reach: '1.2K - 3.5K',
    demographics: 'Site visitors',
    interests: ['Retargeting pixel data'],
  },
  {
    name: 'Past Buyers — Reorder Window',
    description: 'Customers approaching their predicted reorder date based on purchase history',
    reach: '450 - 800',
    demographics: 'Existing customers',
    interests: ['Predicted reorder timing'],
  },
];

/* ── Interest Options ────────────────────────────────────────── */
const interestCategories = {
  'Hair & Beauty': ['Hair extensions', 'Wigs', 'Lace front wigs', 'Natural hair', 'Hair care', 'Beauty supply', 'Salon services', 'HD lace', 'Protective styles'],
  'Fashion': ['Fashion', 'Accessories', 'Luxury goods', 'Online shopping'],
  'Lifestyle': ['Self-care', 'Beauty tutorials', 'Hair tutorials', 'Instagram shopping'],
  'Professionals': ['Cosmetology', 'Salon owner', 'Hairstylist', 'Hair styling'],
};

const typeBadgeColors: Record<string, string> = {
  Preset: 'bg-blue-100 text-blue-700',
  Custom: 'bg-orange-100 text-orange-700',
  Lookalike: 'bg-purple-100 text-purple-700',
  Retarget: 'bg-green-100 text-green-700',
};

export default function AudienceBuilder() {
  const [showPrebuilts, setShowPrebuilts] = useState(true);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customName, setCustomName] = useState('');
  const [ageMin, setAgeMin] = useState(25);
  const [ageMax, setAgeMax] = useState(54);
  const [gender, setGender] = useState('Female');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Audience Builder</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create, save, and manage targeting audiences for your campaigns.
          </p>
        </div>
        <button
          onClick={() => setShowCustomBuilder(true)}
          className="inline-flex items-center gap-2 rounded-xl brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="h-4 w-4" />
          Create Custom Audience
        </button>
      </div>

      {/* Saved Audiences Table */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Your Audiences</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 font-semibold text-gray-500">Name</th>
              <th className="text-left px-3 py-3 font-semibold text-gray-500">Type</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500">Est. Reach</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500">Campaigns</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500">Avg ROAS</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {savedAudiences.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">{a.name}</td>
                <td className="px-3 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadgeColors[a.type]}`}>
                    {a.type}
                  </span>
                </td>
                <td className="px-3 py-4 text-right text-gray-600">{a.reach}</td>
                <td className="px-3 py-4 text-right text-gray-600">{a.campaigns}</td>
                <td className="px-3 py-4 text-right">
                  <span className={a.avgRoas !== '—' ? 'font-bold text-green-600' : 'text-gray-400'}>
                    {a.avgRoas}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100"><Pencil className="h-3.5 w-3.5 text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100"><Copy className="h-3.5 w-3.5 text-gray-400" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pre-built Audiences */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <button
          onClick={() => setShowPrebuilts(!showPrebuilts)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-lavender-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Hair Industry Pre-Built Audiences
            </h2>
            <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange">
              {prebuiltAudiences.length} available
            </span>
          </div>
          {showPrebuilts ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {showPrebuilts && (
          <div className="px-6 pb-6 grid md:grid-cols-2 gap-3">
            {prebuiltAudiences.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-gray-200 p-4 hover:border-orange/30 transition-colors"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-1">{a.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{a.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.interests.slice(0, 3).map((int) => (
                    <span
                      key={int}
                      className="rounded-full bg-lavender-50 px-2 py-0.5 text-[10px] text-lavender-700"
                    >
                      {int}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Reach: <span className="font-semibold text-gray-600">{a.reach}</span>
                  </span>
                  <button className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange hover:bg-orange-100 transition-colors">
                    Save to My Audiences
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Download, title: 'Sync Shopify Customers', desc: 'Import customer emails for custom audiences' },
          { icon: Star, title: 'Sync VIP List', desc: 'Create lookalike from Diamond/Gold customers' },
          { icon: ShoppingCart, title: 'Sync Cart Abandoners', desc: 'Retarget visitors who didn\'t purchase' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange/30 transition-all cursor-pointer"
            >
              <Icon className="h-6 w-6 text-orange mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-xs text-gray-500">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Custom Audience Builder Modal/Section */}
      {showCustomBuilder && (
        <div className="rounded-2xl border-2 border-orange bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Create Custom Audience</h2>
            <button
              onClick={() => setShowCustomBuilder(false)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Audience Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. ATL Salon Owners 25-45"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
                />
              </div>

              {/* Demographics */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age Range: {ageMin} - {ageMax}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min={18}
                    max={65}
                    value={ageMin}
                    onChange={(e) => setAgeMin(Number(e.target.value))}
                    className="flex-1 accent-orange"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="range"
                    min={18}
                    max={65}
                    value={ageMax}
                    onChange={(e) => setAgeMax(Number(e.target.value))}
                    className="flex-1 accent-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <div className="flex gap-2">
                  {['All', 'Female', 'Male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 rounded-xl border-2 py-2 text-xs font-semibold transition-all ${
                        gender === g
                          ? 'border-orange bg-orange-50/30 text-orange'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="United States"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange outline-none"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Interests</label>
              <div className="space-y-4">
                {Object.entries(interestCategories).map(([category, interests]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {interests.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-orange text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-orange-50 p-4">
                <p className="text-xs font-semibold text-gray-700 mb-1">Estimated Reach</p>
                <p className="text-lg font-extrabold text-orange">
                  {selectedInterests.length > 0 ? '1.2M - 2.4M' : 'Select interests to estimate'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowCustomBuilder(false)}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button className="rounded-xl brand-gradient-pink px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20">
              Save Audience
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

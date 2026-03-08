'use client';

import { useState } from 'react';
import {
  Palette,
  ImageIcon,
  Layers,
  Smartphone,
  Monitor,
  Download,
  Bookmark,
  Sparkles,
  Type,
  Plus,
} from 'lucide-react';

/* ── Template Categories ─────────────────────────────────────── */
const templates = [
  {
    id: 't1',
    name: 'Product Showcase',
    category: 'Product',
    description: 'Hero shot of a single product with bold text overlay',
    platforms: ['IG Feed', 'FB Feed'],
    colors: 'from-pink-200 to-orange-200',
  },
  {
    id: 't2',
    name: 'Bundle Deal',
    category: 'Sales',
    description: 'Multiple products displayed with combined price and savings',
    platforms: ['IG Feed', 'FB Feed'],
    colors: 'from-orange-200 to-gold-200',
  },
  {
    id: 't3',
    name: 'Before & After',
    category: 'Transformation',
    description: 'Side-by-side transformation layout showing results',
    platforms: ['IG Feed', 'IG Story'],
    colors: 'from-lavender-200 to-pink-200',
  },
  {
    id: 't4',
    name: 'Customer Testimonial',
    category: 'Social Proof',
    description: 'Customer quote with photo — builds trust and social proof',
    platforms: ['IG Feed', 'FB Feed'],
    colors: 'from-gold-100 to-cream-200',
  },
  {
    id: 't5',
    name: 'Flash Sale / Promo',
    category: 'Sales',
    description: 'Bold discount and countdown with urgency messaging',
    platforms: ['IG Story', 'IG Feed', 'TikTok'],
    colors: 'from-red-200 to-orange-200',
  },
  {
    id: 't6',
    name: 'New Arrival',
    category: 'Launch',
    description: 'Collection launch announcement with clean modern layout',
    platforms: ['IG Feed', 'FB Feed', 'IG Story'],
    colors: 'from-lavender-100 to-lavender-300',
  },
  {
    id: 't7',
    name: 'Carousel — Product Line',
    category: 'Product',
    description: 'Multi-slide product showcase for carousels',
    platforms: ['IG Carousel', 'FB Carousel'],
    colors: 'from-orange-100 to-pink-100',
  },
  {
    id: 't8',
    name: 'Story/Reel — Quick Promo',
    category: 'Video',
    description: 'Vertical format optimized for stories and reels',
    platforms: ['IG Story', 'TikTok'],
    colors: 'from-pink-300 to-lavender-300',
  },
];

const categories = ['All', 'Product', 'Sales', 'Transformation', 'Social Proof', 'Launch', 'Video'];

export default function CreativeStudio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [headline, setHeadline] = useState('Your Dream Hair Awaits');
  const [bodyText, setBodyText] = useState('100% Virgin Human Hair — Starting at $185');
  const [ctaText, setCtaText] = useState('Shop Now');

  const filtered = selectedCategory === 'All'
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  const activeTemplate = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-extrabold text-gray-900">Creative Studio</h1>
          <Palette className="h-5 w-5 text-lavender-500" />
        </div>
        <p className="text-sm text-gray-500">
          Choose a template and customize it for your hair brand.
        </p>
      </div>

      {selectedTemplate ? (
        /* ═══ EDITOR VIEW ═══ */
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Canvas Preview */}
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  ← Back to templates
                </button>
                <span className="text-xs font-semibold text-gray-500">
                  Editing: {activeTemplate?.name}
                </span>
              </div>

              {/* Mockup */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                {/* Product image placeholder */}
                <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-cream-200 to-cream-400 mb-6 shadow-xl" />
                {/* Headline */}
                <h2 className="text-2xl font-extrabold text-white mb-2">{headline}</h2>
                {/* Body */}
                <p className="text-sm text-gray-300 mb-6">{bodyText}</p>
                {/* CTA */}
                <span className="inline-flex rounded-xl brand-gradient-pink px-6 py-2.5 text-sm font-bold text-white shadow-lg">
                  {ctaText}
                </span>
                {/* Brand watermark */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-60">
                  <div className="h-5 w-5 rounded-full brand-gradient" />
                  <span className="text-[10px] text-white font-semibold">BeautyShare</span>
                </div>
              </div>

              {/* Format Toggle */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                  <Monitor className="h-3.5 w-3.5" /> Feed
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-100 transition-colors">
                  <Smartphone className="h-3.5 w-3.5" /> Story
                </button>
              </div>
            </div>
          </div>

          {/* Editor Controls */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon className="h-4 w-4 text-gray-400" /> Product Image
                </label>
                <div className="flex gap-3">
                  <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-cream-400" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-orange/30">
                      Upload Image
                    </button>
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-orange/30">
                      Select from Catalog
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Type className="h-4 w-4 text-gray-400" /> Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Type className="h-4 w-4 text-gray-400" /> Body Text
                </label>
                <input
                  type="text"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  CTA Button
                </label>
                <div className="flex gap-2">
                  {['Shop Now', 'Order Today', 'Get Yours', 'Limited Time'].map((cta) => (
                    <button
                      key={cta}
                      onClick={() => setCtaText(cta)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        ctaText === cta
                          ? 'bg-orange text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cta}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Colors</label>
                <div className="flex gap-2">
                  {['#FA6A27', '#D61465', '#DCBDEF', '#E2AD37', '#000000', '#FFFFFF'].map((color) => (
                    <button
                      key={color}
                      className="h-8 w-8 rounded-lg border-2 border-gray-200 hover:border-orange transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  Price/Discount Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15% OFF or $185"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-xl brand-gradient-pink py-3 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl transition-all">
                <Download className="h-4 w-4" />
                Download PNG
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-orange px-5 py-3 text-sm font-semibold text-orange hover:bg-orange-50 transition-colors">
                <Bookmark className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ═══ TEMPLATE GRID ═══ */
        <>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all text-left"
              >
                {/* Thumbnail */}
                <div className={`h-40 bg-gradient-to-br ${t.colors} flex items-center justify-center`}>
                  <div className="h-16 w-16 rounded-xl bg-white/30 flex items-center justify-center">
                    <Palette className="h-8 w-8 text-white/60" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{t.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {t.platforms.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

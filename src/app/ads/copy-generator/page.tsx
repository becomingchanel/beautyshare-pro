'use client';

import { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  RefreshCw,
  Hash,
  Clock,
} from 'lucide-react';
import AILoadingState from '@/components/ads/AILoadingState';

/* ── Products ────────────────────────────────────────────────── */
const catalogProducts = [
  'Body Wave Bundle 18"',
  'Body Wave Bundle 20"',
  'Straight Bundle 22"',
  'Deep Wave Bundle 20"',
  'HD Lace Frontal 13x4',
  '5x5 HD Lace Closure',
  'Curly Full Lace Wig 22"',
  'Water Wave Bundle 18"',
  'Custom Product...',
];

const tones = ['Luxury', 'Relatable', 'Urgent-FOMO', 'Educational', 'Playful'];
const platforms = ['Instagram', 'Facebook', 'TikTok', 'Google'];
const adTypes = ['Feed Post', 'Story/Reel', 'Carousel', 'Search Ad'];

const sellingPointSuggestions = [
  '100% virgin human hair',
  'Lasts 2+ years',
  'Zero shedding & tangling',
  'Instant volume & length',
  'Single-donor raw hair',
  'HD invisible lace',
  'Free shipping over $150',
  'Custom coloring safe',
];

/* ── Mock Generated Copy ─────────────────────────────────────── */
const mockResults = {
  headlines: [
    'Your Dream Hair Is One Click Away',
    'Virgin Hair That Lasts — Starting at $185',
    'The Bundle Your Stylist Uses (But Won\'t Tell You About)',
  ],
  primaryTexts: [
    'Stop settling for hair that tangles after one wash. Our 100% virgin body wave bundles are made from single-donor hair that stays silky smooth for 2+ years. Your confidence deserves the upgrade.',
    'Every boss woman deserves hair that moves like it grew from her scalp. Our body wave bundles blend seamlessly with any texture. Free shipping on orders over $150.',
    'Finally — bundles you can color, curl, and straighten without worrying. Premium virgin human hair, ethically sourced, and built to last. Shop the collection today.',
  ],
  hooks: [
    'Stop scrolling if you want hair that actually lasts...',
    'POV: You just installed bundles that look like they grew from your scalp...',
    'What if I told you your next install could last 2 years?',
  ],
  hashtags: [
    '#HairExtensions', '#VirginHair', '#BodyWaveHair', '#BundleDeals',
    '#HairGoals', '#NaturalHair', '#LaceWig', '#HairTransformation',
    '#ProtectiveStyles', '#HairBoss', '#BeautyBrand', '#WigLife',
    '#HairInspo', '#BundlesForSale', '#QualityHair',
  ],
  ctas: ['Shop Now', 'Get Your Bundles', 'Order Today', 'Tap to Shop'],
};

/* ── History ─────────────────────────────────────────────────── */
const history = [
  { product: 'Body Wave Bundle 18"', tone: 'Luxury', date: 'Mar 5, 2026', saved: true },
  { product: 'HD Lace Frontal 13x4', tone: 'Relatable', date: 'Mar 3, 2026', saved: false },
  { product: 'Curly Full Lace Wig', tone: 'Urgent-FOMO', date: 'Feb 28, 2026', saved: true },
];

export default function AICopyGenerator() {
  const [product, setProduct] = useState('');
  const [sellingPoint, setSellingPoint] = useState('');
  const [tone, setTone] = useState('Luxury');
  const [platform, setPlatform] = useState('Instagram');
  const [adType, setAdType] = useState('Feed Post');
  const [promo, setPromo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockResults);
      setIsGenerating(false);
    }, 2500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-extrabold text-gray-900">AI Ad Copy Generator</h1>
          <Sparkles className="h-5 w-5 text-lavender-500" />
        </div>
        <p className="text-sm text-gray-500">
          Generate high-converting ad copy specifically for your hair products.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ═══ INPUT SECTION ═══ */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
            {/* Product */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
              >
                <option value="">Select a product...</option>
                {catalogProducts.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Key Selling Point */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Key Selling Point
              </label>
              <input
                type="text"
                value={sellingPoint}
                onChange={(e) => setSellingPoint(e.target.value)}
                placeholder="What makes this product special?"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {sellingPointSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSellingPoint(s)}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-500 hover:bg-orange-50 hover:text-orange transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      tone === t
                        ? 'bg-orange text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <div className="flex gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex-1 rounded-xl border-2 py-2 text-xs font-semibold transition-all ${
                      platform === p
                        ? 'border-orange bg-orange-50/30 text-orange'
                        : 'border-gray-200 text-gray-500 hover:border-orange/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Ad Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Type</label>
              <div className="flex gap-2">
                {adTypes.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAdType(a)}
                    className={`flex-1 rounded-xl border-2 py-2 text-xs font-semibold transition-all ${
                      adType === a
                        ? 'border-orange bg-orange-50/30 text-orange'
                        : 'border-gray-200 text-gray-500 hover:border-orange/30'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Promo / Offer <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="e.g. 15% off first order, Buy 3 get 1 free"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !product}
              className="w-full rounded-xl brand-gradient-pink py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Ad Copy
                </span>
              )}
            </button>

            {isGenerating && <AILoadingState />}
          </div>
        </div>

        {/* ═══ OUTPUT SECTION ═══ */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Headlines */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Headlines</h3>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-1 text-xs text-orange font-semibold hover:underline"
                  >
                    <RefreshCw className="h-3 w-3" /> Regenerate
                  </button>
                </div>
                <div className="space-y-2">
                  {results.headlines.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-gray-900">{h}</span>
                      <button
                        onClick={() => handleCopy(h, `h-${i}`)}
                        className="text-gray-400 hover:text-orange transition-colors"
                      >
                        {copiedIndex === `h-${i}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Text */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Ad Body Copy</h3>
                <div className="space-y-3">
                  {results.primaryTexts.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-gray-50 px-4 py-3"
                    >
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{t}</p>
                      <button
                        onClick={() => handleCopy(t, `p-${i}`)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange transition-colors"
                      >
                        {copiedIndex === `p-${i}` ? (
                          <><Check className="h-3 w-3 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="h-3 w-3" /> Copy</>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hooks */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Video / Story Hooks</h3>
                <div className="space-y-2">
                  {results.hooks.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                    >
                      <span className="text-sm italic text-gray-700">&ldquo;{h}&rdquo;</span>
                      <button
                        onClick={() => handleCopy(h, `hk-${i}`)}
                        className="text-gray-400 hover:text-orange transition-colors"
                      >
                        {copiedIndex === `hk-${i}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-900">Hashtag Suggestions</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.hashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleCopy(tag, tag)}
                      className="rounded-full bg-lavender-50 px-3 py-1 text-xs font-medium text-lavender-700 hover:bg-lavender-100 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">CTA Options</h3>
                <div className="flex flex-wrap gap-2">
                  {results.ctas.map((cta) => (
                    <span
                      key={cta}
                      className="inline-flex rounded-lg brand-gradient-pink px-5 py-2 text-xs font-bold text-white"
                    >
                      {cta}
                    </span>
                  ))}
                </div>
              </div>

              {/* Save */}
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-orange text-orange px-4 py-3 text-sm font-semibold hover:bg-orange-50 transition-colors">
                <Bookmark className="h-4 w-4" />
                Save to Library
              </button>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-12 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-lavender-100 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-lavender-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Ad Copy</h3>
              <p className="text-sm text-gray-500 max-w-[280px]">
                Select your product, tone, and platform, then click Generate to see AI-crafted ad
                copy designed for the hair industry.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Generation History</h2>
        </div>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">{h.product}</span>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                  {h.tone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{h.date}</span>
                {h.saved && (
                  <Bookmark className="h-3.5 w-3.5 text-orange fill-orange" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

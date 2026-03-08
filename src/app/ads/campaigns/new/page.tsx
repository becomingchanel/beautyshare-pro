'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Eye,
  RefreshCw,
  Sparkles,
  Heart,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Rocket,
  Copy,
  Zap,
} from 'lucide-react';
import WizardSteps from '@/components/ads/WizardSteps';
import AILoadingState from '@/components/ads/AILoadingState';

/* ── Wizard Steps Config ─────────────────────────────────────── */
const steps = [
  { name: 'Goal' },
  { name: 'Products' },
  { name: 'Audience' },
  { name: 'Creative' },
  { name: 'Budget & Launch' },
];

/* ── Goal Options ────────────────────────────────────────────── */
const goals = [
  {
    id: 'sales',
    label: 'Drive Sales',
    description: 'Get customers to buy from your store',
    icon: ShoppingCart,
    recommended: true,
  },
  {
    id: 'awareness',
    label: 'Build Awareness',
    description: 'Get your brand in front of new people',
    icon: Eye,
    recommended: false,
  },
  {
    id: 'retarget',
    label: 'Retarget Visitors',
    description: 'Bring back people who visited but didn\'t buy',
    icon: RefreshCw,
    recommended: false,
  },
  {
    id: 'collection',
    label: 'Promote Collection',
    description: 'Push a specific product line or new arrivals',
    icon: Sparkles,
    recommended: false,
  },
  {
    id: 'winback',
    label: 'VIP Winback',
    description: 'Re-engage past customers who haven\'t ordered recently',
    icon: Heart,
    recommended: false,
  },
];

/* ── Mock Products ───────────────────────────────────────────── */
const products = [
  { id: 'p1', name: 'Body Wave Bundle 18"', sku: 'BW-18', price: '$185.00', margin: '60%', category: 'Bundles', texture: 'Body Wave' },
  { id: 'p2', name: 'Body Wave Bundle 20"', sku: 'BW-20', price: '$210.00', margin: '58%', category: 'Bundles', texture: 'Body Wave' },
  { id: 'p3', name: 'Straight Bundle 22"', sku: 'ST-22', price: '$230.00', margin: '55%', category: 'Bundles', texture: 'Straight' },
  { id: 'p4', name: 'Deep Wave Bundle 20"', sku: 'DW-20', price: '$220.00', margin: '57%', category: 'Bundles', texture: 'Deep Wave' },
  { id: 'p5', name: 'HD Lace Frontal 13x4', sku: 'HDF-134', price: '$165.00', margin: '62%', category: 'Frontals', texture: 'Body Wave' },
  { id: 'p6', name: '5x5 HD Lace Closure', sku: 'HDC-55', price: '$120.00', margin: '65%', category: 'Closures', texture: 'Straight' },
  { id: 'p7', name: 'Curly Full Lace Wig 22"', sku: 'FLW-C22', price: '$380.00', margin: '52%', category: 'Wigs', texture: 'Curly' },
  { id: 'p8', name: 'Water Wave Bundle 18"', sku: 'WW-18', price: '$195.00', margin: '59%', category: 'Bundles', texture: 'Water Wave' },
];

/* ── Pre-built Audiences ─────────────────────────────────────── */
const audiences = [
  {
    id: 'a1',
    name: 'Hair Extension Buyers',
    description: 'Women 25-54 interested in hair extensions, wigs, and beauty',
    reach: '2.4M - 3.1M',
    recommended: ['sales', 'collection'],
  },
  {
    id: 'a2',
    name: 'Natural Hair Community',
    description: 'Women 18-44 interested in natural hair and protective styles',
    reach: '1.8M - 2.5M',
    recommended: ['awareness', 'collection'],
  },
  {
    id: 'a3',
    name: 'Luxury Beauty Shoppers',
    description: 'High-income women 25-54 interested in premium beauty products',
    reach: '890K - 1.2M',
    recommended: ['sales'],
  },
  {
    id: 'a4',
    name: 'Salon Owners & Stylists',
    description: 'Professionals 25-55 in hair styling and salon management',
    reach: '340K - 520K',
    recommended: ['sales', 'awareness'],
  },
  {
    id: 'a5',
    name: 'Competitor Audiences',
    description: 'People who follow or engage with competing hair brands',
    reach: '1.2M - 1.8M',
    recommended: ['awareness', 'retarget'],
  },
  {
    id: 'a6',
    name: 'Lookalike from VIP Customers',
    description: '1-3% lookalike audience based on your top-spending customers',
    reach: '1.5M - 2.0M',
    recommended: ['sales'],
  },
  {
    id: 'a7',
    name: 'Cart Abandoners',
    description: 'Visitors who added products to cart but didn\'t complete purchase',
    reach: '1.2K - 3.5K',
    recommended: ['retarget'],
  },
  {
    id: 'a8',
    name: 'Past Buyers — Reorder Window',
    description: 'Customers approaching their predicted reorder date',
    reach: '450 - 800',
    recommended: ['winback'],
  },
];

/* ── Tone Options ────────────────────────────────────────────── */
const tones = ['Luxury', 'Relatable', 'Urgent-FOMO', 'Educational', 'Playful'];

/* ── Generated Copy Mock ─────────────────────────────────────── */
const mockGeneratedCopy = {
  headlines: [
    'Your Dream Hair Is One Click Away',
    'Virgin Hair That Lasts — Starting at $185',
    'The Bundles Your Stylist Won\'t Tell You About',
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
  ctas: ['Shop Now', 'Get Your Bundles', 'Order Today', 'Tap to Shop'],
};

/* ── Campaign Builder Wizard ─────────────────────────────────── */
export default function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedTone, setSelectedTone] = useState('Luxury');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState<typeof mockGeneratedCopy | null>(null);
  const [selectedHeadline, setSelectedHeadline] = useState(0);
  const [selectedPrimaryText, setSelectedPrimaryText] = useState(0);
  const [selectedHook, setSelectedHook] = useState(0);
  const [platform, setPlatform] = useState('meta');
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState(50);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [textureFilter, setTextureFilter] = useState('All');

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCopy(mockGeneratedCopy);
      setIsGenerating(false);
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedGoal;
      case 1: return selectedProducts.length > 0;
      case 2: return !!selectedAudience;
      case 3: return generatedCopy !== null;
      case 4: return true;
      default: return false;
    }
  };

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (textureFilter !== 'All' && p.texture !== textureFilter) return false;
    return true;
  });

  /* projected results calculation */
  const estimatedCPC = 1.35;
  const estimatedCTR = 0.02;
  const estimatedConvRate = 0.025;
  const dailyBudget = budgetType === 'daily' ? budgetAmount : budgetAmount / 30;
  const monthlyBudget = budgetType === 'daily' ? budgetAmount * 30 : budgetAmount;
  const estimatedClicks = Math.round(monthlyBudget / estimatedCPC);
  const estimatedConversions = Math.round(estimatedClicks * estimatedConvRate);
  const avgOrderValue = 251;
  const estimatedRevenue = estimatedConversions * avgOrderValue;
  const estimatedROAS = monthlyBudget > 0 ? (estimatedRevenue / monthlyBudget).toFixed(1) : '0';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/ads/campaigns"
          className="flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 hover:border-orange/30 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Create Campaign</h1>
          <p className="text-sm text-gray-500">
            Launch your next profitable ad campaign in minutes.
          </p>
        </div>
      </div>

      {/* Wizard Steps */}
      <WizardSteps steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8">

        {/* ═══ STEP 0: Choose Goal ═══ */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">What&apos;s your campaign goal?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose the objective that best matches what you want to achieve.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? 'border-orange bg-orange-50/30 shadow-md shadow-orange/10'
                        : 'border-gray-200 hover:border-orange/30'
                    }`}
                  >
                    {goal.recommended && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                        Recommended
                      </span>
                    )}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isSelected ? 'bg-orange text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{goal.label}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{goal.description}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <Check className="h-5 w-5 text-orange" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 1: Select Products ═══ */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Select products to feature</h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose which products you want to advertise in this campaign.
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option>All</option>
                <option>Bundles</option>
                <option>Closures</option>
                <option>Frontals</option>
                <option>Wigs</option>
              </select>
              <select
                value={textureFilter}
                onChange={(e) => setTextureFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option>All</option>
                <option>Straight</option>
                <option>Body Wave</option>
                <option>Deep Wave</option>
                <option>Curly</option>
                <option>Water Wave</option>
              </select>
              <button
                onClick={() => setSelectedProducts(products.slice(0, 3).map((p) => p.id))}
                className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange hover:bg-orange-100 transition-colors"
              >
                <Zap className="inline h-3 w-3 mr-1" />
                Select Bestsellers
              </button>
              <span className="ml-auto text-xs text-gray-400">
                {selectedProducts.length} selected
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {filteredProducts.map((p) => {
                const isSelected = selectedProducts.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? 'border-orange bg-orange-50/30'
                        : 'border-gray-200 hover:border-orange/30'
                    }`}
                  >
                    <div className="h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-cream-200 to-cream-300" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">SKU: {p.sku}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-semibold text-gray-700">{p.price}</span>
                        <span className="text-xs text-green-600">{p.margin} margin</span>
                      </div>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-md border-2 flex items-center justify-center ${
                        isSelected ? 'border-orange bg-orange' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 2: Build Audience ═══ */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose your target audience</h2>
            <p className="text-sm text-gray-500 mb-6">
              Select a pre-built hair industry audience or create your own.
            </p>
            <div className="space-y-3">
              {audiences.map((a) => {
                const isSelected = selectedAudience === a.id;
                const isRecommended = a.recommended.includes(selectedGoal);
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAudience(a.id)}
                    className={`relative w-full flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? 'border-orange bg-orange-50/30 shadow-md shadow-orange/10'
                        : 'border-gray-200 hover:border-orange/30'
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        Best for your goal
                      </span>
                    )}
                    <div
                      className={`h-5 w-5 shrink-0 mt-0.5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-orange bg-orange' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">{a.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Est. Reach: <span className="font-semibold text-gray-600">{a.reach}</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 3: Generate Creative ═══ */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Generate ad creative</h2>
            <p className="text-sm text-gray-500 mb-6">
              Let AI craft compelling ad copy for your hair products.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTone(t)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                          selectedTone === t
                            ? 'bg-orange text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Selling Point
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% virgin human hair, lasts 2+ years"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['100% virgin hair', 'Zero shedding', 'Lasts 2+ years', 'Instant volume'].map(
                      (s) => (
                        <span
                          key={s}
                          className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] text-gray-500 cursor-pointer hover:bg-orange-50 hover:text-orange transition-colors"
                        >
                          {s}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Promo / Offer (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15% off first order, Free shipping over $150"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full rounded-xl brand-gradient-pink py-3 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* Output Side */}
              <div className="space-y-5">
                {generatedCopy ? (
                  <>
                    {/* Headlines */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Headlines</h3>
                      <div className="space-y-2">
                        {generatedCopy.headlines.map((h, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedHeadline(i)}
                            className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition-all ${
                              selectedHeadline === i
                                ? 'border-orange bg-orange-50/30'
                                : 'border-gray-200 hover:border-orange/30'
                            }`}
                          >
                            <span className="flex-1">{h}</span>
                            <Copy className="h-3.5 w-3.5 shrink-0 text-gray-400 hover:text-orange" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Primary Text */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Ad Body Copy</h3>
                      <div className="space-y-2">
                        {generatedCopy.primaryTexts.map((t, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedPrimaryText(i)}
                            className={`w-full flex items-start gap-3 rounded-xl border-2 p-3 text-left text-xs leading-relaxed transition-all ${
                              selectedPrimaryText === i
                                ? 'border-orange bg-orange-50/30'
                                : 'border-gray-200 hover:border-orange/30'
                            }`}
                          >
                            <span className="flex-1">{t}</span>
                            <Copy className="h-3.5 w-3.5 shrink-0 text-gray-400 mt-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hooks */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Video/Story Hooks
                      </h3>
                      <div className="space-y-2">
                        {generatedCopy.hooks.map((h, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedHook(i)}
                            className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm italic transition-all ${
                              selectedHook === i
                                ? 'border-orange bg-orange-50/30'
                                : 'border-gray-200 hover:border-orange/30'
                            }`}
                          >
                            <span className="flex-1">&ldquo;{h}&rdquo;</span>
                            <Copy className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <Sparkles className="h-12 w-12 text-lavender-300 mb-4" />
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      AI-powered ad copy
                    </h3>
                    <p className="text-xs text-gray-500 max-w-[200px]">
                      Set your tone and selling point, then click Generate to see AI-crafted ad copy.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 4: Budget & Launch ═══ */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Set budget &amp; launch</h2>
            <p className="text-sm text-gray-500 mb-6">
              Choose your platform, set your budget, and review before launching.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
                  <div className="flex gap-2">
                    {['meta', 'google', 'tiktok'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                          platform === p
                            ? 'border-orange bg-orange-50/30 text-orange'
                            : 'border-gray-200 text-gray-500 hover:border-orange/30'
                        }`}
                      >
                        {p === 'meta' ? 'Meta' : p === 'google' ? 'Google' : 'TikTok'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBudgetType('daily')}
                      className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition-all ${
                        budgetType === 'daily'
                          ? 'border-orange bg-orange-50/30 text-orange'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      Daily Budget
                    </button>
                    <button
                      onClick={() => setBudgetType('lifetime')}
                      className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition-all ${
                        budgetType === 'lifetime'
                          ? 'border-orange bg-orange-50/30 text-orange'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      Lifetime Budget
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {budgetType === 'daily' ? 'Daily' : 'Lifetime'} Budget: ${budgetAmount}
                  </label>
                  <input
                    type="range"
                    min={budgetType === 'daily' ? 5 : 50}
                    max={budgetType === 'daily' ? 500 : 10000}
                    step={budgetType === 'daily' ? 5 : 50}
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(Number(e.target.value))}
                    className="w-full accent-orange"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>${budgetType === 'daily' ? '5' : '50'}</span>
                    <span>${budgetType === 'daily' ? '500' : '10,000'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Projected Results */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    Projected Results (30 days)
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Budget</span>
                      <span className="font-bold text-gray-900">${monthlyBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Clicks</span>
                      <span className="font-semibold text-gray-700">{estimatedClicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Conversions</span>
                      <span className="font-semibold text-gray-700">{estimatedConversions}</span>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Revenue</span>
                      <span className="font-bold text-green-600">
                        ${estimatedRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. ROAS</span>
                      <span className="font-extrabold text-green-600">{estimatedROAS}x</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-orange-50 p-4 text-xs text-orange-700">
                  <p className="font-semibold mb-1">Break-even point:</p>
                  <p>
                    At your AOV of ${avgOrderValue} and 60% margins, you need{' '}
                    <span className="font-bold">
                      {Math.ceil(monthlyBudget / (avgOrderValue * 0.6))} orders
                    </span>{' '}
                    to break even on this ad spend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:border-orange/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-xl brand-gradient-pink px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 rounded-xl brand-gradient-pink px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Rocket className="h-4 w-4" />
            Launch Campaign
          </button>
        )}
      </div>
    </div>
  );
}

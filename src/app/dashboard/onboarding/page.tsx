'use client';

import {
  Play,
  User,
  Compass,
  Palette,
  ShoppingBag,
  Zap,
  Rocket,
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Image,
  Star,
  Crown,
  Globe,
  Wrench,
  Lock,
  Eye,
  ShoppingCart,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Store,
  Layout,
  Camera,
  Gift,
  Heart,
  Award,
  Phone,
  Instagram,
  Users,
  MessageSquare,
  BarChart3,
  Briefcase,
  Target,
  Gem,
  BookOpen,
  Headphones,
} from 'lucide-react';
import { useState } from 'react';

/* ────────── Types ────────── */
interface StepConfig {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface WebsiteTemplate {
  id: string;
  name: string;
  price: number;
  gradient: string;
  thumbnail: string;
  tag?: string;
}

interface ModelPack {
  id: string;
  name: string;
  description: string;
  price: number;
  imageCount: number;
  videoCount: number;
  gradient: string;
  vibe: string;
  preview: string[];
}

interface Product {
  id: string;
  name: string;
  wholesalePrice: number;
  suggestedRetail: number;
  category: string;
}

/* ────────── Step Config — Lovable Circular Icons ────────── */
const steps: StepConfig[] = [
  { id: 1, title: 'Welcome', icon: <Play className="h-5 w-5" /> },
  { id: 2, title: 'Business Profile', icon: <User className="h-5 w-5" /> },
  { id: 3, title: 'Choose Your Path', icon: <Compass className="h-5 w-5" /> },
  { id: 4, title: 'Brand Your Store', icon: <Palette className="h-5 w-5" /> },
  { id: 5, title: 'Select Products', icon: <ShoppingBag className="h-5 w-5" /> },
  { id: 6, title: 'Power-Ups', icon: <Zap className="h-5 w-5" /> },
  { id: 7, title: 'Launch', icon: <Rocket className="h-5 w-5" /> },
];

/* ────────── Template Data ────────── */
const websiteTemplates: WebsiteTemplate[] = [
  { id: 'luxe-mane', name: 'Luxe Mane', price: 299, gradient: 'from-amber-500 to-orange-600', thumbnail: '💎', tag: 'Best Seller' },
  { id: 'glow-up', name: 'Glow Up', price: 249, gradient: 'from-pink-500 to-rose-500', thumbnail: '✨' },
  { id: 'silk-studio', name: 'Silk Studio', price: 279, gradient: 'from-purple-500 to-indigo-600', thumbnail: '🎀' },
  { id: 'crown-collection', name: 'Crown Collection', price: 349, gradient: 'from-yellow-500 to-amber-600', thumbnail: '👑', tag: 'Premium' },
  { id: 'natural-beauty', name: 'Natural Beauty', price: 249, gradient: 'from-emerald-500 to-teal-600', thumbnail: '🌿' },
];

/* ────────── Model Pack Data ────────── */
const modelPacks: ModelPack[] = [
  { id: 'luxury-glam', name: 'Luxury Glam', description: 'Studio-shot editorial style — red carpet, evening looks, high-fashion poses.', price: 79, imageCount: 25, videoCount: 5, gradient: 'from-amber-400 via-rose-400 to-purple-500', vibe: 'Glamorous', preview: ['🌟', '💃', '✨', '👠'] },
  { id: 'natural-beauty-pack', name: 'Natural Beauty', description: 'Soft, natural lighting with minimal makeup. Everyday looks that feel real.', price: 69, imageCount: 30, videoCount: 4, gradient: 'from-green-400 to-emerald-500', vibe: 'Natural', preview: ['🌿', '🌸', '☀️', '🍃'] },
  { id: 'street-style', name: 'Street Style', description: 'Urban, trendy vibes with city backdrops. Bold outfits and confident energy.', price: 69, imageCount: 20, videoCount: 6, gradient: 'from-gray-700 to-gray-900', vibe: 'Edgy', preview: ['🏙️', '🖤', '🔥', '💫'] },
  { id: 'soft-glam', name: 'Soft Glam', description: 'Romantic, feminine aesthetic with pastel tones. Bridal and special occasions.', price: 89, imageCount: 25, videoCount: 5, gradient: 'from-pink-300 via-rose-300 to-purple-300', vibe: 'Romantic', preview: ['🌷', '💕', '🦋', '💐'] },
  { id: 'boss-chic', name: 'Boss Chic', description: 'Professional, empowered look — blazers, offices, power poses.', price: 79, imageCount: 20, videoCount: 4, gradient: 'from-indigo-500 to-blue-600', vibe: 'Professional', preview: ['💼', '👩‍💼', '🏢', '⚡'] },
  { id: 'ultimate-bundle', name: 'Ultimate Bundle', description: 'ALL 5 packs at a massive discount. 120+ photos, 24 videos.', price: 249, imageCount: 120, videoCount: 24, gradient: 'from-pink-500 via-rose-500 to-purple-600', vibe: 'Everything', preview: ['👑', '🔥', '💎', '🚀'] },
];

/* ────────── Product Data ────────── */
const products: Product[] = [
  { id: 'bbw-14', name: 'Brazilian Body Wave 14"', wholesalePrice: 65, suggestedRetail: 120, category: 'Bundles' },
  { id: 'bbw-18', name: 'Brazilian Body Wave 18"', wholesalePrice: 80, suggestedRetail: 150, category: 'Bundles' },
  { id: 'bbw-22', name: 'Brazilian Body Wave 22"', wholesalePrice: 95, suggestedRetail: 180, category: 'Bundles' },
  { id: 'ps-16', name: 'Peruvian Straight 16"', wholesalePrice: 70, suggestedRetail: 130, category: 'Bundles' },
  { id: 'ps-20', name: 'Peruvian Straight 20"', wholesalePrice: 85, suggestedRetail: 160, category: 'Bundles' },
  { id: 'ps-24', name: 'Peruvian Straight 24"', wholesalePrice: 100, suggestedRetail: 190, category: 'Bundles' },
  { id: 'lf-13x4', name: '13x4 HD Lace Frontal', wholesalePrice: 110, suggestedRetail: 220, category: 'Closures & Frontals' },
  { id: 'lf-13x6', name: '13x6 HD Lace Frontal', wholesalePrice: 130, suggestedRetail: 250, category: 'Closures & Frontals' },
  { id: 'lc-4x4', name: '4x4 Lace Closure', wholesalePrice: 55, suggestedRetail: 100, category: 'Closures & Frontals' },
  { id: 'lc-5x5', name: '5x5 Lace Closure', wholesalePrice: 65, suggestedRetail: 120, category: 'Closures & Frontals' },
  { id: 'wig-bw', name: 'Body Wave Wig 20"', wholesalePrice: 180, suggestedRetail: 350, category: 'Wigs' },
  { id: 'wig-st', name: 'Straight Wig 22"', wholesalePrice: 170, suggestedRetail: 320, category: 'Wigs' },
  { id: 'wig-dw', name: 'Deep Wave Wig 24"', wholesalePrice: 200, suggestedRetail: 380, category: 'Wigs' },
  { id: 'acc-bonding', name: 'Bonding Glue Kit', wholesalePrice: 12, suggestedRetail: 28, category: 'Accessories' },
  { id: 'acc-edge', name: 'Edge Control Set', wholesalePrice: 8, suggestedRetail: 22, category: 'Accessories' },
  { id: 'acc-silk', name: 'Silk Pillowcase', wholesalePrice: 15, suggestedRetail: 35, category: 'Accessories' },
];

const productCategories = ['All', 'Bundles', 'Closures & Frontals', 'Wigs', 'Accessories'];

/* ────────── Membership features for Welcome step ────────── */
const membershipFeatures = [
  { icon: <Store className="h-5 w-5" />, title: 'Your own branded Shopify store', desc: 'Fully customized with your brand' },
  { icon: <ShoppingBag className="h-5 w-5" />, title: 'Access to our wholesale hair catalog', desc: 'Premium quality at wholesale prices' },
  { icon: <Palette className="h-5 w-5" />, title: 'Custom branding & theme setup', desc: 'Professional look from day one' },
  { icon: <BarChart3 className="h-5 w-5" />, title: 'Revenue dashboard & analytics', desc: 'Track your sales and growth' },
  { icon: <BookOpen className="h-5 w-5" />, title: 'Marketing tools & templates', desc: 'Everything you need to promote' },
  { icon: <Headphones className="h-5 w-5" />, title: 'Community & ongoing support', desc: 'Never build alone' },
];

/* ────────── Goal options for Business Profile ────────── */
const goalOptions = [
  { id: 'build-brand', label: 'Build my brand', icon: <Crown className="h-5 w-5" /> },
  { id: 'passive-income', label: 'Generate passive income', icon: <DollarSign className="h-5 w-5" /> },
  { id: 'replace-job', label: 'Replace my 9-5', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'add-business', label: 'Add to existing business', icon: <TrendingUp className="h-5 w-5" /> },
  { id: 'learn-industry', label: 'Learn the hair industry', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'financial-freedom', label: 'Financial freedom', icon: <Gem className="h-5 w-5" /> },
];

/* ────────── Component ────────── */
export default function OnboardingWizard() {
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [formData, setFormData] = useState({
    // Step 2 — Business Profile
    businessName: '',
    phone: '',
    instagram: '',
    tiktok: '',
    website: '',
    targetAudience: '',
    journeyStage: '' as '' | 'just-starting' | 'side-hustle' | 'full-time' | 'scaling',
    goals: [] as string[],
    additionalNotes: '',
    // Step 3 — Choose Path
    path: '' as '' | 'premium-template' | 'connect-existing' | 'we-build',
    selectedTemplate: '',
    // Step 4 — Brand
    logoUrl: '',
    primaryColor: '#E91E8C',
    secondaryColor: '#9333EA',
    accentColor: '#F59E0B',
    storeName: '',
    tagline: '',
    fontStyle: 'modern' as 'modern' | 'elegant' | 'bold' | 'playful',
    // Step 5 — Products
    selectedProducts: [] as string[],
    markupPercent: 80,
    // Step 6 — Power-Ups
    selectedPacks: [] as string[],
  });

  const updateField = (field: string, value: string | boolean | string[] | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    const goals = formData.goals.includes(goal)
      ? formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal];
    updateField('goals', goals);
  };

  const toggleProduct = (id: string) => {
    const selected = formData.selectedProducts.includes(id)
      ? formData.selectedProducts.filter((p) => p !== id)
      : [...formData.selectedProducts, id];
    updateField('selectedProducts', selected);
  };

  const togglePack = (id: string) => {
    const selected = formData.selectedPacks.includes(id)
      ? formData.selectedPacks.filter((p) => p !== id)
      : [...formData.selectedPacks, id];
    updateField('selectedPacks', selected);
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const totalPackCost = modelPacks
    .filter((p) => formData.selectedPacks.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const templateCost = websiteTemplates.find((t) => t.id === formData.selectedTemplate)?.price || 0;
  const pathCost = formData.path === 'premium-template' ? templateCost : 0;

  /* ── Launch readiness checklist ── */
  const checklist = [
    { id: 'profile', label: 'Business profile completed', done: !!formData.businessName },
    { id: 'path', label: 'Path chosen', done: !!formData.path },
    { id: 'brand', label: 'Brand configured', done: !!formData.storeName },
    { id: 'products', label: 'Products selected', done: formData.selectedProducts.length > 0 },
  ];
  const readyCount = checklist.filter((c) => c.done).length;

  /* ── Progress percentage ── */
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F4' }}>
      {/* ═══════════════ GRADIENT HEADER ═══════════════ */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(135deg, #D61465 0%, #E91E8C 40%, #F97316 100%)',
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">BeautySharePro</h1>
              <p className="text-sm text-white/70 mt-0.5">Member Onboarding</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/60">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Auto-saved
              </span>
              <div className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ PROGRESS BAR ═══════════════ */}
      <div className="h-1.5 w-full bg-gray-200">
        <div
          className="h-1.5 transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #D61465, #E91E8C, #F97316)',
          }}
        />
      </div>

      {/* ═══════════════ STEP INDICATORS ═══════════════ */}
      <div className="mx-auto max-w-4xl px-6 pt-6 pb-2">
        <div className="flex items-start justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isComplete = step.id < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex flex-col items-center relative" style={{ flex: isLast ? '0 0 auto' : '1 1 0' }}>
                {/* Connector line */}
                {!isLast && (
                  <div
                    className="absolute top-5 left-1/2 h-0.5"
                    style={{
                      width: '100%',
                      backgroundColor: isComplete ? '#D61465' : '#E5E7EB',
                    }}
                  />
                )}

                {/* Circle */}
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #D61465, #F97316)'
                      : isComplete
                      ? 'linear-gradient(135deg, #D61465, #E91E8C)'
                      : '#F3F4F6',
                    color: isActive || isComplete ? '#fff' : '#9CA3AF',
                    boxShadow: isActive ? '0 4px 12px rgba(214, 20, 101, 0.3)' : 'none',
                  }}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : step.icon}
                </button>

                {/* Label */}
                <span
                  className="mt-2 text-[11px] font-medium text-center leading-tight max-w-[72px]"
                  style={{
                    color: isActive ? '#D61465' : isComplete ? '#6B7280' : '#9CA3AF',
                  }}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════ STEP CONTENT ═══════════════ */}
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm" style={{ borderColor: '#EDE5DB' }}>

          {/* ═══ STEP 1: WELCOME ═══ */}
          {currentStep === 1 && (
            <div className="text-center max-w-2xl mx-auto py-4">
              {/* Large Play Icon */}
              <div
                className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #D61465, #F97316)',
                  boxShadow: '0 8px 24px rgba(214, 20, 101, 0.25)',
                }}
              >
                <Play className="h-10 w-10 text-white ml-1" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to BeautySharePro!</h2>
              <p className="text-gray-500 text-base mb-8 max-w-lg mx-auto">
                Watch our quick intro to learn how we help you launch and grow your own branded hair business.
              </p>

              {/* Video Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 aspect-video flex items-center justify-center mb-8 relative group cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #D61465, #F97316)' }}
                  >
                    <Play className="h-7 w-7 text-white ml-1" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm font-semibold">Your Welcome Video</p>
                    <p className="text-gray-400 text-xs mt-0.5">Learn about your membership benefits and next steps</p>
                    <p className="text-gray-400 text-xs mt-1">Duration: ~3 minutes</p>
                  </div>
                </div>
              </div>

              {/* Membership Features — 2 columns, 3 rows */}
              <div className="text-left mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Here&apos;s what&apos;s included in your membership:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {membershipFeatures.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3 rounded-xl border p-4"
                      style={{ borderColor: '#EDE5DB', backgroundColor: '#FFFDFB' }}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(214,20,101,0.1), rgba(249,115,22,0.1))',
                          color: '#D61465',
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="rounded-xl px-10 py-4 text-base font-bold text-white transition-all shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #D61465, #E91E8C)',
                  boxShadow: '0 4px 16px rgba(214, 20, 101, 0.25)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  I&apos;ve Watched — Let&apos;s Go!
                </span>
              </button>
            </div>
          )}

          {/* ═══ STEP 2: BUSINESS PROFILE ═══ */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Tell us about your business</h3>
              <p className="text-sm text-gray-500 mb-6">This helps us personalize your experience and set up your store</p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-3xl">
                {/* Business Name */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Business Name *</label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      placeholder="e.g. Glow Up Hair Co."
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      style={{ }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Instagram Handle</label>
                  <div className="relative">
                    <Instagram className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => updateField('instagram', e.target.value)}
                      placeholder="@yourbusiness"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* TikTok */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">TikTok Handle</label>
                  <div className="relative">
                    <Play className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.tiktok}
                      onChange={(e) => updateField('tiktok', e.target.value)}
                      placeholder="@yourbusiness"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="www.yourbusiness.com"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Target Audience */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Target Audience</label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => updateField('targetAudience', e.target.value)}
                      placeholder="e.g. Women 25-45 who want luxury virgin hair at affordable prices..."
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-colors"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                {/* Journey Stage — plain rounded rect buttons */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Where are you in your business journey?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {([
                      { id: 'just-starting', label: 'Just Starting' },
                      { id: 'side-hustle', label: 'Side Hustle' },
                      { id: 'full-time', label: 'Full-Time' },
                      { id: 'scaling', label: 'Scaling' },
                    ] as const).map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => updateField('journeyStage', stage.id)}
                        className="rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-all"
                        style={{
                          borderColor: formData.journeyStage === stage.id ? '#D61465' : '#E5E7EB',
                          backgroundColor: formData.journeyStage === stage.id ? 'rgba(214,20,101,0.05)' : 'transparent',
                          color: formData.journeyStage === stage.id ? '#D61465' : '#6B7280',
                        }}
                      >
                        {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goals — Checkbox-style Cards in 3×2 grid */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">What are your goals? (Select all that apply)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {goalOptions.map((goal) => {
                      const isSelected = formData.goals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className="flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all"
                          style={{
                            borderColor: isSelected ? '#D61465' : '#E5E7EB',
                            backgroundColor: isSelected ? 'rgba(214,20,101,0.05)' : 'transparent',
                          }}
                        >
                          {/* Checkbox circle */}
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 transition-colors"
                            style={{
                              backgroundColor: isSelected ? '#D61465' : 'transparent',
                              border: isSelected ? 'none' : '2px solid #D1D5DB',
                            }}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <span style={{ color: isSelected ? '#D61465' : '#9CA3AF' }}>{goal.icon}</span>
                            <span
                              className="text-sm font-medium truncate"
                              style={{ color: isSelected ? '#D61465' : '#374151' }}
                            >
                              {goal.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Anything else textarea */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Anything else we should know?</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => updateField('additionalNotes', e.target.value)}
                    placeholder="Tell us about your vision, timeline, or any questions..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors"
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 3: CHOOSE YOUR PATH ═══ */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Choose your path</h3>
              <p className="text-sm text-gray-500 mb-6">How would you like to set up your online store?</p>

              <div className="grid gap-5 md:grid-cols-3 mb-8">
                {([
                  {
                    id: 'premium-template',
                    icon: <Layout className="h-7 w-7" />,
                    title: 'Premium Template',
                    desc: 'Choose from our professionally designed templates',
                    price: 'Starting at $249',
                    gradient: 'linear-gradient(135deg, #D61465, #E91E8C)',
                    badge: 'Most Popular',
                  },
                  {
                    id: 'connect-existing',
                    icon: <Globe className="h-7 w-7" />,
                    title: 'Connect Existing Store',
                    desc: 'Already have a Shopify store? Connect it here',
                    price: 'Included',
                    gradient: 'linear-gradient(135deg, #10B981, #14B8A6)',
                    badge: '',
                  },
                  {
                    id: 'we-build',
                    icon: <Wrench className="h-7 w-7" />,
                    title: 'We Build It For You',
                    desc: 'Our team will set up a custom store for you',
                    price: 'Included',
                    gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                    badge: '',
                  },
                ] as const).map((p) => {
                  const isSelected = formData.path === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => updateField('path', p.id)}
                      className="relative rounded-2xl border-2 p-6 text-left transition-all"
                      style={{
                        borderColor: isSelected ? '#D61465' : '#E5E7EB',
                        boxShadow: isSelected ? '0 0 0 3px rgba(214,20,101,0.1)' : 'none',
                      }}
                    >
                      {p.badge && (
                        <div
                          className="absolute -top-3 left-4 rounded-full px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
                          style={{ backgroundColor: '#D61465' }}
                        >
                          {p.badge}
                        </div>
                      )}
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl text-white mb-4"
                        style={{ background: p.gradient }}
                      >
                        {p.icon}
                      </div>
                      <h4 className="text-base font-bold text-gray-900">{p.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{p.desc}</p>
                      <p className="mt-3 text-sm font-bold" style={{ color: p.id === 'premium-template' ? '#D61465' : '#10B981' }}>{p.price}</p>
                      {isSelected && (
                        <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: '#D61465' }}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Template Gallery */}
              {formData.path === 'premium-template' && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Choose Your Template</h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {websiteTemplates.map((t) => {
                      const isSelected = formData.selectedTemplate === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => updateField('selectedTemplate', t.id)}
                          className="group relative rounded-xl border-2 overflow-hidden text-left transition-all"
                          style={{
                            borderColor: isSelected ? '#D61465' : '#E5E7EB',
                            boxShadow: isSelected ? '0 0 0 3px rgba(214,20,101,0.1)' : 'none',
                          }}
                        >
                          {t.tag && (
                            <div className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: '#D61465' }}>{t.tag}</div>
                          )}
                          <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                            <span className="text-4xl">{t.thumbnail}</span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-gray-900">{t.name}</h5>
                              <span className="text-sm font-bold" style={{ color: '#D61465' }}>${t.price}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(214,20,101,0.1)' }}>
                              <div className="rounded-full p-2" style={{ backgroundColor: '#D61465' }}><Check className="h-5 w-5 text-white" /></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {formData.path === 'connect-existing' && (
                <div className="max-w-md">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Shopify Store URL</label>
                  <div className="flex">
                    <input type="text" placeholder="your-store" className="flex-1 rounded-l-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{}} onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }} />
                    <span className="flex items-center rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">.myshopify.com</span>
                  </div>
                  <button className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition-colors">
                    <Store className="h-5 w-5" /> Connect Store
                  </button>
                </div>
              )}

              {formData.path === 'we-build' && (
                <div className="rounded-xl bg-purple-50 border border-purple-100 p-5 max-w-md">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-purple-900">We&apos;ll handle everything!</h4>
                      <p className="mt-1 text-sm text-purple-700">Our team will build your store with your brand settings. We&apos;ll install your products and launch it for you within 48 hours.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ STEP 4: BRAND YOUR STORE ═══ */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Brand your store</h3>
              <p className="text-sm text-gray-500 mb-6">Your brand identity will be applied across your entire store</p>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Name *</label>
                    <input type="text" value={formData.storeName} onChange={(e) => updateField('storeName', e.target.value)} placeholder="Your Store Name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors" onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
                    <input type="text" value={formData.tagline} onChange={(e) => updateField('tagline', e.target.value)} placeholder="e.g. Luxury hair for the modern queen" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors" onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.1)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Upload Logo</label>
                    <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50/30 transition-colors">
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-gray-400" />
                        <p className="mt-2 text-xs text-gray-500">PNG, JPG or SVG (max 2MB)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Brand Colors</label>
                    <div className="flex gap-4">
                      {[
                        { key: 'primaryColor', label: 'Primary' },
                        { key: 'secondaryColor', label: 'Secondary' },
                        { key: 'accentColor', label: 'Accent' },
                      ].map((c) => (
                        <div key={c.key} className="flex flex-col items-center gap-1">
                          <input type="color" value={(formData as any)[c.key]} onChange={(e) => updateField(c.key, e.target.value)} className="h-12 w-12 cursor-pointer rounded-xl border border-gray-200" />
                          <span className="text-[10px] text-gray-500">{c.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Font Style</label>
                    <div className="grid grid-cols-4 gap-2">
                      {([
                        { id: 'modern', label: 'Modern', sample: 'Aa' },
                        { id: 'elegant', label: 'Elegant', sample: 'Aa' },
                        { id: 'bold', label: 'Bold', sample: 'Aa' },
                        { id: 'playful', label: 'Playful', sample: 'Aa' },
                      ] as const).map((f) => (
                        <button key={f.id} onClick={() => updateField('fontStyle', f.id)}
                          className="rounded-xl border-2 p-3 text-center transition-all"
                          style={{
                            borderColor: formData.fontStyle === f.id ? '#D61465' : '#E5E7EB',
                            backgroundColor: formData.fontStyle === f.id ? 'rgba(214,20,101,0.05)' : 'transparent',
                          }}
                        >
                          <p className="text-lg font-bold text-gray-900">{f.sample}</p>
                          <p className="text-[10px] font-medium text-gray-500">{f.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Live Preview */}
                <div>
                  <div className="sticky top-4 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2.5">
                      <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><div className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
                      <span className="text-xs text-gray-400 ml-2">{formData.storeName ? formData.storeName.toLowerCase().replace(/\s+/g, '') : 'yourstore'}.myshopify.com</span>
                    </div>
                    <div className="p-4" style={{ backgroundColor: formData.primaryColor + '12' }}>
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: formData.primaryColor }}>
                        <span className="text-white text-sm font-bold">{formData.storeName || 'Your Store'}</span>
                        <div className="flex gap-4 text-white/70 text-xs"><span>Shop</span><span>About</span><span>Contact</span></div>
                      </div>
                    </div>
                    <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${formData.primaryColor}22, ${formData.secondaryColor}22)` }}>
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-white text-2xl font-bold" style={{ background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})` }}>
                        {formData.storeName ? formData.storeName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <h4 className="text-xl font-bold" style={{ color: formData.primaryColor }}>{formData.storeName || 'Your Store Name'}</h4>
                      <p className="text-sm text-gray-500 mt-1">{formData.tagline || 'Your tagline here'}</p>
                      <button className="mt-4 rounded-lg px-6 py-2 text-sm font-bold text-white" style={{ backgroundColor: formData.primaryColor }}>Shop Now</button>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
                          <div className="h-16 bg-gray-100" />
                          <div className="p-2">
                            <div className="h-2 w-16 bg-gray-200 rounded" />
                            <div className="h-2 w-10 mt-1 rounded" style={{ backgroundColor: formData.primaryColor + '40' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 5: SELECT PRODUCTS ═══ */}
          {currentStep === 5 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Select your products</h3>
              <p className="text-sm text-gray-500 mb-2">Choose which hair products you want to sell in your store</p>

              <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all"
                    style={{
                      backgroundColor: activeCategory === cat ? '#D61465' : '#F3F4F6',
                      color: activeCategory === cat ? '#fff' : '#6B7280',
                    }}
                  >
                    {cat}
                  </button>
                ))}
                <div className="ml-auto text-sm text-gray-500 flex items-center">{formData.selectedProducts.length} selected</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p) => {
                  const selected = formData.selectedProducts.includes(p.id);
                  const markup = formData.markupPercent;
                  const yourPrice = Math.round(p.wholesalePrice * (1 + markup / 100));
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      className="flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all"
                      style={{
                        borderColor: selected ? '#D61465' : '#E5E7EB',
                        backgroundColor: selected ? 'rgba(214,20,101,0.03)' : '#fff',
                      }}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold flex-shrink-0"
                        style={{
                          backgroundColor: selected ? '#D61465' : '#F3F4F6',
                          color: selected ? '#fff' : '#6B7280',
                        }}
                      >
                        {selected ? <Check className="h-5 w-5" /> : p.category.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.category}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-gray-400">Cost: ${p.wholesalePrice}</span>
                          <span className="text-xs font-medium" style={{ color: '#D61465' }}>Sell: ${yourPrice}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Your Markup: {formData.markupPercent}%</label>
                  <span className="text-xs text-gray-500">Avg profit per product: ${Math.round(products.filter(p => formData.selectedProducts.includes(p.id)).reduce((sum, p) => sum + p.wholesalePrice * formData.markupPercent / 100, 0) / Math.max(1, formData.selectedProducts.length))}</span>
                </div>
                <input type="range" min="30" max="200" value={formData.markupPercent} onChange={(e) => updateField('markupPercent', parseInt(e.target.value))} className="w-full" style={{ accentColor: '#D61465' }} />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>30%</span><span>100%</span><span>200%</span></div>
              </div>

              {formData.selectedProducts.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">{formData.selectedProducts.length} products selected</p>
                  <button onClick={() => updateField('selectedProducts', products.map(p => p.id))} className="text-sm font-medium hover:opacity-80" style={{ color: '#D61465' }}>Select All</button>
                </div>
              )}
            </div>
          )}

          {/* ═══ STEP 6: POWER-UPS ═══ */}
          {currentStep === 6 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Power-Ups</h3>
              <p className="text-sm text-gray-500 mb-2">Professional model photos and videos to use on your website and marketing materials</p>
              <p className="text-sm text-gray-400 mb-6">These are optional — skip if you have your own content</p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {modelPacks.map((pack) => {
                  const isSelected = formData.selectedPacks.includes(pack.id);
                  const isBundle = pack.id === 'ultimate-bundle';
                  return (
                    <button
                      key={pack.id}
                      onClick={() => togglePack(pack.id)}
                      className={`group relative rounded-xl border-2 overflow-hidden text-left transition-all ${isBundle ? 'md:col-span-2 lg:col-span-3' : ''}`}
                      style={{
                        borderColor: isSelected ? '#D61465' : '#E5E7EB',
                        boxShadow: isSelected ? '0 0 0 3px rgba(214,20,101,0.1)' : 'none',
                      }}
                    >
                      <div className={`flex ${isBundle ? 'h-28' : 'h-24'} items-center justify-center bg-gradient-to-br ${pack.gradient} relative`}>
                        <div className="flex gap-3 text-2xl">
                          {pack.preview.map((emoji, i) => <span key={i} className="drop-shadow-lg">{emoji}</span>)}
                        </div>
                        {isBundle && <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold" style={{ color: '#D61465' }}>SAVE $137</div>}
                        <span className="absolute top-2 left-2 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white">{pack.vibe}</span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-gray-900">{pack.name}</h4>
                          <span className="text-sm font-bold" style={{ color: '#D61465' }}>${pack.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{pack.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Image className="h-3 w-3" /> {pack.imageCount} photos</span>
                          <span className="flex items-center gap-1"><Play className="h-3 w-3" /> {pack.videoCount} videos</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 rounded-full p-1" style={{ backgroundColor: '#D61465' }}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {formData.selectedPacks.length > 0 && (
                <div className="mt-5 flex items-center justify-between rounded-xl border p-4" style={{ backgroundColor: 'rgba(214,20,101,0.03)', borderColor: 'rgba(214,20,101,0.2)' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#D61465' }}>{formData.selectedPacks.length} pack{formData.selectedPacks.length > 1 ? 's' : ''} selected</p>
                    <p className="text-xs text-gray-500">Available in your Marketing Hub after purchase</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: '#D61465' }}>${totalPackCost}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">One-time</p>
                  </div>
                </div>
              )}

              <button onClick={() => setCurrentStep(7)} className="mt-4 text-sm text-gray-400 hover:text-gray-600">
                Skip — I have my own content &rarr;
              </button>
            </div>
          )}

          {/* ═══ STEP 7: LAUNCH ═══ */}
          {currentStep === 7 && (
            <div>
              <div className="text-center mb-8">
                <div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #D61465, #F97316)',
                    boxShadow: '0 8px 24px rgba(214, 20, 101, 0.25)',
                  }}
                >
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Launch!</h3>
                <p className="text-sm text-gray-500">{readyCount} of {checklist.length} items ready</p>
              </div>

              <div className="mb-8 max-w-lg mx-auto">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1.5">
                  <span>Launch readiness</span>
                  <span>{Math.round((readyCount / checklist.length) * 100)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${(readyCount / checklist.length) * 100}%`,
                      background: 'linear-gradient(90deg, #D61465, #F97316)',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(214,20,101,0.1)' }}><User className="h-5 w-5" style={{ color: '#D61465' }} /></div>
                    <h4 className="font-bold text-gray-900 text-sm">Business Profile</h4>
                  </div>
                  <p className="text-sm text-gray-600">{formData.businessName || 'Not set'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formData.journeyStage ? formData.journeyStage.replace('-', ' ') : 'Stage not selected'}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100"><Compass className="h-5 w-5 text-purple-600" /></div>
                    <h4 className="font-bold text-gray-900 text-sm">Your Path</h4>
                  </div>
                  <p className="text-sm text-gray-600">{formData.path ? formData.path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not chosen'}</p>
                  {formData.selectedTemplate && <p className="text-xs text-gray-400 mt-0.5">{websiteTemplates.find(t => t.id === formData.selectedTemplate)?.name}</p>}
                </div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(214,20,101,0.1)' }}><Palette className="h-5 w-5" style={{ color: '#D61465' }} /></div>
                    <h4 className="font-bold text-gray-900 text-sm">Brand Identity</h4>
                  </div>
                  <p className="text-sm text-gray-600">{formData.storeName || 'Not configured'}</p>
                  <div className="flex gap-1 mt-1.5">
                    {[formData.primaryColor, formData.secondaryColor, formData.accentColor].map((c, i) => (
                      <div key={i} className="h-5 w-5 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100"><ShoppingBag className="h-5 w-5 text-emerald-600" /></div>
                    <h4 className="font-bold text-gray-900 text-sm">Products</h4>
                  </div>
                  <p className="text-sm text-gray-600">{formData.selectedProducts.length} products selected</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formData.markupPercent}% markup</p>
                </div>
              </div>

              <div className="max-w-lg mx-auto rounded-xl border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gray-50 px-5 py-3"><h4 className="text-sm font-bold text-gray-900">Order Summary</h4></div>
                <div className="divide-y divide-gray-50 px-5">
                  <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">BSP Membership</span><span className="font-medium">$149/mo</span></div>
                  <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Setup Fee</span><span className="font-medium">$99</span></div>
                  {pathCost > 0 && <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Premium Template</span><span className="font-medium">${pathCost}</span></div>}
                  {totalPackCost > 0 && <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Power-Up Packs</span><span className="font-medium">${totalPackCost}</span></div>}
                </div>
                <div className="px-5 py-3 flex justify-between" style={{ background: 'linear-gradient(90deg, rgba(214,20,101,0.05), rgba(249,115,22,0.05))' }}>
                  <span className="text-sm font-bold text-gray-900">Due today</span>
                  <span className="text-sm font-bold" style={{ color: '#D61465' }}>${99 + 149 + pathCost + totalPackCost}</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  disabled={readyCount < checklist.length}
                  className="rounded-xl px-10 py-4 text-base font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{
                    background: 'linear-gradient(135deg, #D61465, #E91E8C)',
                    boxShadow: readyCount >= checklist.length ? '0 4px 16px rgba(214, 20, 101, 0.25)' : 'none',
                  }}
                >
                  <span className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Launch My Store</span>
                </button>
                {readyCount < checklist.length && (
                  <p className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1"><AlertCircle className="h-3 w-3" /> Complete all steps to enable launch</p>
                )}
              </div>
            </div>
          )}

          {/* ── Bottom Navigation — Lovable Style ── */}
          <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {currentStep < totalSteps && (
              <button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="flex items-center gap-1 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #D61465, #E91E8C)',
                  boxShadow: '0 4px 12px rgba(214, 20, 101, 0.2)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

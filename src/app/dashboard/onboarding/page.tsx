'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  User,
  Store,
  Palette,
  ShoppingBag,
  Rocket,
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Layout,
  Image,
  Play,
  Lock,
  Eye,
  Globe,
  Shield,
  CreditCard,
  Star,
  ShoppingCart,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Circle,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';

/* ────────── Types ────────── */
interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  gradient: string;
  features: string[];
  popular?: boolean;
  isExisting?: boolean;
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
  image: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
}

/* ────────── Step Config ────────── */
const steps: StepConfig[] = [
  { id: 1, title: 'Business Profile', description: 'Tell us about you', icon: <User className="h-5 w-5" /> },
  { id: 2, title: 'Connect Store', description: 'Link or create Shopify', icon: <Store className="h-5 w-5" /> },
  { id: 3, title: 'Choose Template', description: 'Pick your website design', icon: <Layout className="h-5 w-5" /> },
  { id: 4, title: 'Brand Your Store', description: 'Logo, colors & style', icon: <Palette className="h-5 w-5" /> },
  { id: 5, title: 'Model Content', description: 'Photos & videos', icon: <Image className="h-5 w-5" /> },
  { id: 6, title: 'Select Products', description: 'Build your catalog', icon: <ShoppingBag className="h-5 w-5" /> },
  { id: 7, title: 'Set Pricing', description: 'Your profit margins', icon: <DollarSign className="h-5 w-5" /> },
  { id: 8, title: 'Launch!', description: 'Review & go live', icon: <Rocket className="h-5 w-5" /> },
];

/* ────────── Template Data ────────── */
const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'luxe-original',
    name: 'Luxe Collection',
    description: 'Our signature 19-page luxury hair site with full e-commerce, lookbook, and about pages. The one you\'ve already seen.',
    price: 0,
    thumbnail: '💎',
    gradient: 'from-orange-500 to-pink-500',
    features: ['19 pages', 'Full e-commerce', 'Lookbook gallery', 'About & Contact pages', 'Blog ready'],
    popular: true,
    isExisting: true,
  },
  {
    id: 'minimal-chic',
    name: 'Minimal Chic',
    description: 'Clean, modern single-page layout that puts your products front and center. Perfect for getting started fast.',
    price: 49,
    thumbnail: '✨',
    gradient: 'from-gray-800 to-gray-900',
    features: ['Single page', 'Quick setup', 'Product showcase', 'Mobile optimized', 'Fast loading'],
  },
  {
    id: 'glam-empire',
    name: 'Glam Empire',
    description: 'Bold, high-impact design with full-width hero videos, animated product grids, and VIP membership section.',
    price: 149,
    thumbnail: '👑',
    gradient: 'from-purple-600 to-pink-500',
    features: ['12 pages', 'Video heroes', 'VIP section', 'Animated grids', 'Loyalty program'],
  },
  {
    id: 'boss-babe',
    name: 'Boss Babe',
    description: 'Warm, approachable design focused on storytelling and building trust. Great for personal brand-led businesses.',
    price: 99,
    thumbnail: '💅',
    gradient: 'from-rose-400 to-amber-400',
    features: ['8 pages', 'Story-first layout', 'Testimonials', 'Instagram feed', 'Newsletter signup'],
  },
];

/* ────────── Model Pack Data ────────── */
const modelPacks: ModelPack[] = [
  {
    id: 'luxury-glam',
    name: 'Luxury Glam',
    description: 'Studio-shot editorial style — think red carpet, evening looks, and high-fashion poses.',
    price: 79,
    imageCount: 25,
    videoCount: 5,
    gradient: 'from-amber-400 via-rose-400 to-purple-500',
    vibe: 'Glamorous',
    preview: ['🌟', '💃', '✨', '👠'],
  },
  {
    id: 'natural-beauty',
    name: 'Natural Beauty',
    description: 'Soft, natural lighting with minimal makeup. Everyday looks that feel real and relatable.',
    price: 69,
    imageCount: 30,
    videoCount: 4,
    gradient: 'from-green-400 to-emerald-500',
    vibe: 'Natural',
    preview: ['🌿', '🌸', '☀️', '🍃'],
  },
  {
    id: 'street-style',
    name: 'Street Style',
    description: 'Urban, trendy vibes with city backdrops. Bold outfits and confident energy.',
    price: 69,
    imageCount: 20,
    videoCount: 6,
    gradient: 'from-gray-700 to-gray-900',
    vibe: 'Edgy',
    preview: ['🏙️', '🖤', '🔥', '💫'],
  },
  {
    id: 'soft-glam',
    name: 'Soft Glam',
    description: 'Romantic, feminine aesthetic with pastel tones. Perfect for brands targeting bridal and special occasions.',
    price: 89,
    imageCount: 25,
    videoCount: 5,
    gradient: 'from-pink-300 via-rose-300 to-purple-300',
    vibe: 'Romantic',
    preview: ['🌷', '💕', '🦋', '💐'],
  },
  {
    id: 'boss-chic',
    name: 'Boss Chic',
    description: 'Professional, empowered look — blazers, offices, and power poses. Great for business-focused brands.',
    price: 79,
    imageCount: 20,
    videoCount: 4,
    gradient: 'from-indigo-500 to-blue-600',
    vibe: 'Professional',
    preview: ['💼', '👩‍💼', '🏢', '⚡'],
  },
  {
    id: 'ultimate-bundle',
    name: 'Ultimate Bundle',
    description: 'Get ALL 5 packs at a massive discount. 120+ photos, 24 videos — everything you need.',
    price: 249,
    imageCount: 120,
    videoCount: 24,
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
    vibe: 'Everything',
    preview: ['👑', '🔥', '💎', '🚀'],
  },
];

/* ────────── Product Data ────────── */
const products: Product[] = [
  { id: 'bbw-14', name: 'Brazilian Body Wave 14"', wholesalePrice: 65, suggestedRetail: 120, category: 'Bundles', image: '🔵' },
  { id: 'bbw-18', name: 'Brazilian Body Wave 18"', wholesalePrice: 80, suggestedRetail: 150, category: 'Bundles', image: '🔵' },
  { id: 'bbw-22', name: 'Brazilian Body Wave 22"', wholesalePrice: 95, suggestedRetail: 180, category: 'Bundles', image: '🔵' },
  { id: 'ps-16', name: 'Peruvian Straight 16"', wholesalePrice: 70, suggestedRetail: 130, category: 'Bundles', image: '🟣' },
  { id: 'ps-20', name: 'Peruvian Straight 20"', wholesalePrice: 85, suggestedRetail: 160, category: 'Bundles', image: '🟣' },
  { id: 'ps-24', name: 'Peruvian Straight 24"', wholesalePrice: 100, suggestedRetail: 190, category: 'Bundles', image: '🟣' },
  { id: 'mdw-16', name: 'Malaysian Deep Wave 16"', wholesalePrice: 75, suggestedRetail: 140, category: 'Bundles', image: '🟢' },
  { id: 'mdw-20', name: 'Malaysian Deep Wave 20"', wholesalePrice: 90, suggestedRetail: 170, category: 'Bundles', image: '🟢' },
  { id: 'cc-18', name: 'Cambodian Curly 18"', wholesalePrice: 85, suggestedRetail: 160, category: 'Bundles', image: '🟠' },
  { id: 'cc-22', name: 'Cambodian Curly 22"', wholesalePrice: 100, suggestedRetail: 190, category: 'Bundles', image: '🟠' },
  { id: 'lf-13x4', name: '13x4 HD Lace Frontal', wholesalePrice: 110, suggestedRetail: 220, category: 'Frontals', image: '🔶' },
  { id: 'lf-13x6', name: '13x6 HD Lace Frontal', wholesalePrice: 130, suggestedRetail: 250, category: 'Frontals', image: '🔶' },
  { id: 'lc-4x4', name: '4x4 Lace Closure', wholesalePrice: 55, suggestedRetail: 100, category: 'Closures', image: '🔷' },
  { id: 'lc-5x5', name: '5x5 Lace Closure', wholesalePrice: 65, suggestedRetail: 120, category: 'Closures', image: '🔷' },
  { id: 'lc-6x6', name: '6x6 Lace Closure', wholesalePrice: 75, suggestedRetail: 140, category: 'Closures', image: '🔷' },
];

/* ────────── Component ────────── */
export default function OnboardingWizard() {
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 — Profile
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    instagram: '',
    tiktok: '',
    targetAudience: '',
    businessGoal: '',
    // Step 2 — Store
    shopifyDomain: '',
    shopifyConnected: false,
    storeOption: '' as '' | 'connect' | 'create',
    // Step 3 — Template
    selectedTemplate: '',
    // Step 4 — Brand
    logoUrl: '',
    primaryColor: '#FA6A27',
    secondaryColor: '#D61465',
    accentColor: '#DCBDEF',
    storeName: '',
    tagline: '',
    fontStyle: 'modern' as 'modern' | 'elegant' | 'bold' | 'playful',
    // Step 5 — Model packs
    selectedPacks: [] as string[],
    // Step 6 — Products
    selectedProducts: [] as string[],
    // Step 7 — Pricing
    pricingStrategy: 'suggested' as 'suggested' | 'custom' | 'premium',
    customMarkup: 80,
  });

  const updateField = (field: string, value: string | boolean | string[] | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const totalPackCost = modelPacks
    .filter((p) => formData.selectedPacks.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const templateCost = websiteTemplates.find((t) => t.id === formData.selectedTemplate)?.price || 0;

  const estimatedProfit = () => {
    const selectedProds = products.filter((p) => formData.selectedProducts.includes(p.id));
    if (selectedProds.length === 0) return 0;
    return selectedProds.reduce((sum, p) => {
      if (formData.pricingStrategy === 'suggested') return sum + (p.suggestedRetail - p.wholesalePrice);
      if (formData.pricingStrategy === 'premium') return sum + (p.wholesalePrice * 1.5);
      return sum + (p.wholesalePrice * formData.customMarkup / 100);
    }, 0);
  };

  /* ── Checklist for Launch ── */
  const checklist: ChecklistItem[] = [
    { id: 'profile', label: 'Business profile completed', description: formData.businessName || 'Not set', completed: !!formData.businessName && !!formData.ownerName, icon: <User className="h-4 w-4" /> },
    { id: 'store', label: 'Store connected or created', description: formData.storeOption === 'connect' ? `${formData.shopifyDomain}.myshopify.com` : formData.storeOption === 'create' ? 'New store will be created' : 'Not set', completed: !!formData.storeOption, icon: <Store className="h-4 w-4" /> },
    { id: 'template', label: 'Website template selected', description: websiteTemplates.find((t) => t.id === formData.selectedTemplate)?.name || 'Not selected', completed: !!formData.selectedTemplate, icon: <Layout className="h-4 w-4" /> },
    { id: 'brand', label: 'Brand identity configured', description: formData.storeName || 'Not set', completed: !!formData.storeName && !!formData.logoUrl || !!formData.storeName, icon: <Palette className="h-4 w-4" /> },
    { id: 'products', label: 'Products selected', description: `${formData.selectedProducts.length} products`, completed: formData.selectedProducts.length > 0, icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'pricing', label: 'Pricing strategy set', description: formData.pricingStrategy === 'suggested' ? 'Suggested retail' : formData.pricingStrategy === 'premium' ? 'Premium (150%)' : `Custom (${formData.customMarkup}%)`, completed: true, icon: <DollarSign className="h-4 w-4" /> },
  ];

  const readyToLaunch = checklist.filter((c) => c.completed).length;
  const totalChecklist = checklist.length;

  return (
    <DashboardLayout title="Welcome to BeautyShare Pro!" description="Let's get your hair business set up and selling">
      {/* ── Progress Bar ── */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className="flex flex-col items-center group"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className={`mt-2 text-[11px] font-medium whitespace-nowrap ${
                  step.id < currentStep ? 'text-green-600' : step.id === currentStep ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`mx-1.5 h-0.5 w-10 transition-colors ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">

        {/* ═══ STEP 1: BUSINESS PROFILE ═══ */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Tell us about your business</h3>
            <p className="text-sm text-gray-500 mb-6">This helps us personalize your experience and set up your store</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Business Name *</label>
                <input type="text" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} placeholder="e.g. Glow Up Hair Co." className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name *</label>
                <input type="text" value={formData.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} placeholder="e.g. Jasmine Williams" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address *</label>
                <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@yourbusiness.com" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Instagram Handle</label>
                <input type="text" value={formData.instagram} onChange={(e) => updateField('instagram', e.target.value)} placeholder="@yourbusiness" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">TikTok Handle</label>
                <input type="text" value={formData.tiktok} onChange={(e) => updateField('tiktok', e.target.value)} placeholder="@yourbusiness" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Who is your target audience?</label>
                <textarea value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} placeholder="e.g. Women 25-45 who want luxury virgin hair at affordable prices..." rows={2} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">What&apos;s your #1 goal with BSP?</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {['Launch my brand', 'Replace my 9-5', 'Scale existing biz', 'Side income'].map((goal) => (
                    <button key={goal} onClick={() => updateField('businessGoal', goal)}
                      className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${formData.businessGoal === goal ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 2: CONNECT STORE ═══ */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Set up your Shopify store</h3>
            <p className="text-sm text-gray-500 mb-6">Every BSP member gets a Shopify store — connect yours or we&apos;ll create one</p>
            <div className="grid gap-4 max-w-2xl md:grid-cols-2">
              <button
                onClick={() => updateField('storeOption', 'connect')}
                className={`rounded-xl border-2 p-6 text-left transition-all ${formData.storeOption === 'connect' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Connect existing store</h4>
                <p className="mt-1 text-sm text-gray-500">I already have a Shopify store I want to use</p>
              </button>
              <button
                onClick={() => updateField('storeOption', 'create')}
                className={`rounded-xl border-2 p-6 text-left transition-all ${formData.storeOption === 'create' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Create a new store</h4>
                <p className="mt-1 text-sm text-gray-500">Set one up for me — included with my membership</p>
              </button>
            </div>
            {formData.storeOption === 'connect' && (
              <div className="mt-6 max-w-lg animate-in fade-in">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Shopify Store URL</label>
                <div className="flex">
                  <input type="text" value={formData.shopifyDomain} onChange={(e) => updateField('shopifyDomain', e.target.value)} placeholder="your-store" className="flex-1 rounded-l-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                  <span className="flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">.myshopify.com</span>
                </div>
                <button className="mt-4 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors">
                  <Store className="h-5 w-5" /> Connect Store
                </button>
              </div>
            )}
            {formData.storeOption === 'create' && (
              <div className="mt-6 rounded-xl bg-purple-50 border border-purple-100 p-5 max-w-lg animate-in fade-in">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-purple-900">We&apos;ll handle everything!</h4>
                    <p className="mt-1 text-sm text-purple-700">Your Shopify store will be created automatically with your brand settings. Your template and products will be installed after you complete setup.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 3: CHOOSE TEMPLATE ═══ */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Choose your website template</h3>
            <p className="text-sm text-gray-500 mb-6">Pick a design that matches your vibe — we&apos;ll customize it with your brand</p>
            <div className="grid gap-5 md:grid-cols-2">
              {websiteTemplates.map((t) => {
                const isSelected = formData.selectedTemplate === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateField('selectedTemplate', t.id)}
                    className={`group relative rounded-xl border-2 p-0 text-left overflow-hidden transition-all ${isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    {t.popular && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                        <Star className="h-3 w-3" /> Popular
                      </div>
                    )}
                    {t.isExisting && (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                        Included Free
                      </div>
                    )}
                    <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                      <span className="text-5xl">{t.thumbnail}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-gray-900">{t.name}</h4>
                        <span className={`text-sm font-bold ${t.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {t.price === 0 ? 'FREE' : `$${t.price}`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{t.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.features.map((f) => (
                          <span key={f} className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">{f}</span>
                        ))}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-orange-500/10">
                        <div className="rounded-full bg-orange-500 p-2">
                          <Check className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-center text-sm text-gray-500">
              All templates are fully customizable with your logo, colors, and content
            </div>
          </div>
        )}

        {/* ═══ STEP 4: BRAND YOUR STORE ═══ */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Make it yours</h3>
            <p className="text-sm text-gray-500 mb-6">Your brand identity will be applied to your template, products, and marketing materials</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-3xl">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Name *</label>
                <input type="text" value={formData.storeName} onChange={(e) => updateField('storeName', e.target.value)} placeholder="Your Store Name" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
                <input type="text" value={formData.tagline} onChange={(e) => updateField('tagline', e.target.value)} placeholder="e.g. Luxury hair for the modern queen" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Upload Logo</label>
                <div className="flex h-36 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG or SVG (max 2MB)</p>
                    <p className="mt-1 text-[11px] text-gray-400">Recommended: 512x512px</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand Colors</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="color" value={formData.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                    <div><p className="text-sm font-medium">Primary</p><p className="text-xs text-gray-400">{formData.primaryColor}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={formData.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                    <div><p className="text-sm font-medium">Secondary</p><p className="text-xs text-gray-400">{formData.secondaryColor}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={formData.accentColor} onChange={(e) => updateField('accentColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                    <div><p className="text-sm font-medium">Accent</p><p className="text-xs text-gray-400">{formData.accentColor}</p></div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Font Style</label>
                <div className="grid grid-cols-4 gap-3">
                  {([
                    { id: 'modern', label: 'Modern', font: 'Inter', sample: 'Aa' },
                    { id: 'elegant', label: 'Elegant', font: 'Playfair Display', sample: 'Aa' },
                    { id: 'bold', label: 'Bold', font: 'Montserrat', sample: 'Aa' },
                    { id: 'playful', label: 'Playful', font: 'Poppins', sample: 'Aa' },
                  ] as const).map((f) => (
                    <button key={f.id} onClick={() => updateField('fontStyle', f.id)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${formData.fontStyle === f.id ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{f.sample}</p>
                      <p className="text-xs font-medium text-gray-600">{f.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Live Preview Banner */}
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2">
                <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><div className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
                <span className="text-xs text-gray-400 ml-2">{formData.storeName ? formData.storeName.toLowerCase().replace(/\s+/g, '') : 'yourstore'}.myshopify.com</span>
              </div>
              <div className="p-6 text-center" style={{background: `linear-gradient(135deg, ${formData.primaryColor}22, ${formData.secondaryColor}22)`}}>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl text-white text-xl font-bold" style={{background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})`}}>
                  {formData.storeName ? formData.storeName.charAt(0).toUpperCase() : '?'}
                </div>
                <h4 className="text-lg font-bold" style={{color: formData.primaryColor}}>{formData.storeName || 'Your Store Name'}</h4>
                <p className="text-sm text-gray-500">{formData.tagline || 'Your tagline here'}</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 5: MODEL CONTENT PACKS ═══ */}
        {currentStep === 5 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Model Photo & Video Packs</h3>
            <p className="text-sm text-gray-500 mb-2">Professional photos and videos to use on your website, social media, and marketing materials</p>
            <p className="text-sm text-gray-400 mb-6">Select the packs that match your brand&apos;s vibe — skip if you have your own content</p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modelPacks.map((pack) => {
                const isSelected = formData.selectedPacks.includes(pack.id);
                const isBundle = pack.id === 'ultimate-bundle';
                return (
                  <button
                    key={pack.id}
                    onClick={() => togglePack(pack.id)}
                    className={`group relative rounded-xl border-2 overflow-hidden text-left transition-all ${
                      isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100 hover:border-gray-200'
                    } ${isBundle ? 'md:col-span-2 lg:col-span-3' : ''}`}
                  >
                    <div className={`flex ${isBundle ? 'h-32' : 'h-28'} items-center justify-center bg-gradient-to-br ${pack.gradient} relative`}>
                      <div className="flex gap-3 text-3xl">
                        {pack.preview.map((emoji, i) => (
                          <span key={i} className="drop-shadow-lg">{emoji}</span>
                        ))}
                      </div>
                      {isBundle && (
                        <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-600">
                          SAVE $137
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white">{pack.vibe}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-bold text-gray-900">{pack.name}</h4>
                        <span className="text-sm font-bold text-gray-900">${pack.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{pack.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Image className="h-3 w-3" /> {pack.imageCount} photos</span>
                        <span className="flex items-center gap-1"><Play className="h-3 w-3" /> {pack.videoCount} videos</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 rounded-full bg-orange-500 p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {formData.selectedPacks.length > 0 && (
              <div className="mt-5 flex items-center justify-between rounded-xl bg-orange-50 border border-orange-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-orange-900">{formData.selectedPacks.length} pack{formData.selectedPacks.length > 1 ? 's' : ''} selected</p>
                  <p className="text-xs text-orange-700">Content will be available in your Marketing Hub after purchase</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-900">${totalPackCost}</p>
                  <p className="text-[10px] text-orange-600 uppercase tracking-wider">One-time purchase</p>
                </div>
              </div>
            )}

            <button onClick={() => setCurrentStep(6)} className="mt-4 text-sm text-gray-400 hover:text-gray-600">
              Skip — I have my own photos &rarr;
            </button>
          </div>
        )}

        {/* ═══ STEP 6: SELECT PRODUCTS ═══ */}
        {currentStep === 6 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Build your product catalog</h3>
            <p className="text-sm text-gray-500 mb-2">Choose which hair products you want to sell in your store</p>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                {['All', 'Bundles', 'Frontals', 'Closures'].map((cat) => (
                  <span key={cat} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200">{cat}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500">{formData.selectedProducts.length} selected</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const selected = formData.selectedProducts.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      selected ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg flex-shrink-0 ${selected ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
                      {selected ? <Check className="h-5 w-5" /> : <span>{p.image}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-gray-400">Wholesale: ${p.wholesalePrice}</span>
                        <span className="text-xs font-medium text-green-600">Retail: ${p.suggestedRetail}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {formData.selectedProducts.length > 0 && (
              <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-green-900">{formData.selectedProducts.length} products in your catalog</p>
                  <button onClick={() => updateField('selectedProducts', products.map(p => p.id))} className="text-xs font-medium text-green-700 hover:text-green-900">Select All</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 7: SET PRICING ═══ */}
        {currentStep === 7 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Set your pricing strategy</h3>
            <p className="text-sm text-gray-500 mb-6">Choose how you want to markup your products — you keep 100% of the profit above wholesale</p>
            <div className="grid gap-4 max-w-2xl md:grid-cols-3 mb-6">
              {([
                { id: 'suggested', label: 'Suggested Retail', desc: 'Our recommended prices that are proven to sell well', icon: <Star className="h-5 w-5" /> },
                { id: 'premium', label: 'Premium (150%)', desc: 'Higher markup for luxury-positioned brands', icon: <Crown className="h-5 w-5" /> },
                { id: 'custom', label: 'Custom Markup', desc: 'Set your own markup percentage', icon: <DollarSign className="h-5 w-5" /> },
              ] as const).map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateField('pricingStrategy', s.id)}
                  className={`rounded-xl border-2 p-5 text-left transition-all ${formData.pricingStrategy === s.id ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${formData.pricingStrategy === s.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{s.icon}</div>
                  <h4 className="text-sm font-bold text-gray-900">{s.label}</h4>
                  <p className="mt-1 text-xs text-gray-500">{s.desc}</p>
                </button>
              ))}
            </div>

            {formData.pricingStrategy === 'custom' && (
              <div className="mb-6 max-w-sm">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Markup Percentage: {formData.customMarkup}%</label>
                <input type="range" min="30" max="200" value={formData.customMarkup} onChange={(e) => updateField('customMarkup', parseInt(e.target.value))} className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>30%</span><span>100%</span><span>200%</span></div>
              </div>
            )}

            {/* Pricing Preview */}
            {formData.selectedProducts.length > 0 && (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">Pricing Preview</h4>
                  <span className="text-xs text-gray-500">Showing {Math.min(5, formData.selectedProducts.length)} of {formData.selectedProducts.length} products</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {products.filter((p) => formData.selectedProducts.includes(p.id)).slice(0, 5).map((p) => {
                    const retail = formData.pricingStrategy === 'suggested'
                      ? p.suggestedRetail
                      : formData.pricingStrategy === 'premium'
                      ? Math.round(p.wholesalePrice * 2.5)
                      : Math.round(p.wholesalePrice * (1 + formData.customMarkup / 100));
                    const profit = retail - p.wholesalePrice;
                    return (
                      <div key={p.id} className="flex items-center justify-between px-5 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-400">Wholesale: ${p.wholesalePrice}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">${retail}</p>
                          <p className="text-xs font-medium text-green-600">+${profit} profit</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-green-50 px-5 py-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-green-900">Estimated profit per unit (avg)</p>
                  <p className="text-sm font-bold text-green-700">${Math.round(estimatedProfit() / Math.max(1, formData.selectedProducts.length))}/product</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 8: LAUNCH ═══ */}
        {currentStep === 8 && (
          <div>
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg shadow-orange-200">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Launch Checklist</h3>
              <p className="text-sm text-gray-500">{readyToLaunch} of {totalChecklist} items ready — complete everything to go live</p>
            </div>

            {/* Progress */}
            <div className="mb-6 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1.5">
                <span>Launch readiness</span>
                <span>{Math.round((readyToLaunch / totalChecklist) * 100)}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100">
                <div className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all" style={{width: `${(readyToLaunch / totalChecklist) * 100}%`}} />
              </div>
            </div>

            {/* Checklist */}
            <div className="max-w-lg mx-auto space-y-3 mb-8">
              {checklist.map((item) => (
                <div key={item.id} className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${item.completed ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${item.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {item.completed ? <Check className="h-4 w-4" /> : item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.completed ? 'text-green-900' : 'text-gray-900'}`}>{item.label}</p>
                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                  </div>
                  {!item.completed && (
                    <button onClick={() => {
                      const stepMap: Record<string, number> = { profile: 1, store: 2, template: 3, brand: 4, products: 6, pricing: 7 };
                      setCurrentStep(stepMap[item.id] || 1);
                    }} className="text-xs font-medium text-orange-500 hover:text-orange-700 flex-shrink-0">Fix</button>
                  )}
                </div>
              ))}
            </div>

            {/* Cost Summary */}
            <div className="max-w-lg mx-auto rounded-xl border border-gray-200 overflow-hidden mb-8">
              <div className="bg-gray-50 px-5 py-3">
                <h4 className="text-sm font-bold text-gray-900">Order Summary</h4>
              </div>
              <div className="divide-y divide-gray-50 px-5">
                <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">BSP Membership (monthly)</span><span className="font-medium">$149/mo</span></div>
                <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Setup Fee (one-time)</span><span className="font-medium">$99</span></div>
                {templateCost > 0 && (
                  <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Website Template</span><span className="font-medium">${templateCost}</span></div>
                )}
                {totalPackCost > 0 && (
                  <div className="flex justify-between py-3 text-sm"><span className="text-gray-600">Model Content Packs</span><span className="font-medium">${totalPackCost}</span></div>
                )}
              </div>
              <div className="bg-gray-50 px-5 py-3 flex justify-between">
                <span className="text-sm font-bold text-gray-900">Due today</span>
                <span className="text-sm font-bold text-gray-900">${99 + 149 + templateCost + totalPackCost}</span>
              </div>
            </div>

            {/* Launch Button */}
            <div className="text-center">
              <button
                disabled={readyToLaunch < totalChecklist}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-4 text-base font-bold text-white hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" /> Launch My Store
                </span>
              </button>
              {readyToLaunch < totalChecklist && (
                <p className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1"><AlertCircle className="h-3 w-3" /> Complete all checklist items to enable launch</p>
              )}
            </div>
          </div>
        )}

        {/* ── Bottom Navigation ── */}
        <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Step {currentStep} of {totalSteps}</span>
            {currentStep < totalSteps && (
              <button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="flex items-center gap-1 rounded-lg bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Crown icon used in pricing step
function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" /><path d="M3 20h18" />
    </svg>
  );
}

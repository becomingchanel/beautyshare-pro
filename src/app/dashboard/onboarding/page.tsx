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
} from 'lucide-react';
import { useState } from 'react';

interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: StepConfig[] = [
  { id: 1, title: 'Business Profile', description: 'Tell us about your hair business', icon: <User className="h-5 w-5" /> },
  { id: 2, title: 'Connect Store', description: 'Link your Shopify store', icon: <Store className="h-5 w-5" /> },
  { id: 3, title: 'Brand Your Store', description: 'Customize your look and feel', icon: <Palette className="h-5 w-5" /> },
  { id: 4, title: 'Select Products', description: 'Choose your starting inventory', icon: <ShoppingBag className="h-5 w-5" /> },
  { id: 5, title: 'Launch!', description: 'Review and go live', icon: <Rocket className="h-5 w-5" /> },
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    instagram: '',
    targetAudience: '',
    shopifyDomain: '',
    shopifyConnected: false,
    logoUrl: '',
    primaryColor: '#FA6A27',
    secondaryColor: '#D61465',
    storeName: '',
    tagline: '',
    selectedProducts: [] as string[],
  });

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const products = [
    { id: 'bbw-18', name: 'Brazilian Body Wave 18"', price: '$89.99', category: 'Bundles' },
    { id: 'ps-20', name: 'Peruvian Straight 20"', price: '$95.00', category: 'Bundles' },
    { id: 'mdw-16', name: 'Malaysian Deep Wave 16"', price: '$85.00', category: 'Bundles' },
    { id: 'cc-22', name: 'Cambodian Curly 22"', price: '$110.00', category: 'Bundles' },
    { id: 'lf-13x4', name: '13x4 HD Lace Frontal', price: '$120.00', category: 'Closures' },
    { id: 'lc-5x5', name: '5x5 Lace Closure', price: '$65.00', category: 'Closures' },
  ];

  const toggleProduct = (id: string) => {
    const selected = formData.selectedProducts.includes(id)
      ? formData.selectedProducts.filter((p) => p !== id)
      : [...formData.selectedProducts, id];
    updateField('selectedProducts', selected);
  };

  return (
    <DashboardLayout title="Welcome to BeautyShare Pro!" description="Let's get your hair business set up">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                <span className={`mt-2 text-xs font-medium ${step.id === currentStep ? 'text-orange-500' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-0.5 w-16 transition-colors ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {/* Step 1: Business Profile */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Tell us about your business</h3>
            <p className="text-sm text-gray-500 mb-6">This helps us personalize your experience</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-2xl">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Business Name</label>
                <input type="text" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} placeholder="e.g. Glow Up Hair Co." className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" value={formData.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} placeholder="e.g. Jasmine Williams" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Instagram Handle</label>
                <input type="text" value={formData.instagram} onChange={(e) => updateField('instagram', e.target.value)} placeholder="@yourbusiness" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Who is your target audience?</label>
                <textarea value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} placeholder="e.g. Women 25-45 who want luxury virgin hair at affordable prices..." rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Connect Store */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Connect your Shopify store</h3>
            <p className="text-sm text-gray-500 mb-6">We'll sync your products and orders automatically</p>
            <div className="max-w-lg">
              <div className="mb-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Shopify Store URL</label>
                <div className="flex">
                  <input type="text" value={formData.shopifyDomain} onChange={(e) => updateField('shopifyDomain', e.target.value)} placeholder="your-store" className="flex-1 rounded-l-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                  <span className="flex items-center rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">.myshopify.com</span>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors">
                <Store className="h-5 w-5" /> Connect Shopify Store
              </button>
              <div className="mt-6 rounded-xl bg-blue-50 p-4">
                <h4 className="text-sm font-semibold text-blue-900">Don't have a Shopify store yet?</h4>
                <p className="mt-1 text-sm text-blue-700">No worries! We'll create one for you as part of your BSP membership. Just continue to the next step.</p>
                <button onClick={() => setCurrentStep(3)} className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">Skip this step &rarr;</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Brand Your Store */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Make it yours</h3>
            <p className="text-sm text-gray-500 mb-6">Customize your store's brand identity</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Store Name</label>
                <input type="text" value={formData.storeName} onChange={(e) => updateField('storeName', e.target.value)} placeholder="Your Store Name" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Tagline</label>
                <input type="text" value={formData.tagline} onChange={(e) => updateField('tagline', e.target.value)} placeholder="e.g. Luxury hair for the modern queen" className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Upload Logo</label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-2 text-xs text-gray-500">PNG, JPG or SVG (max 2MB)</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand Colors</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="color" value={formData.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                    <div><p className="text-sm font-medium">Primary Color</p><p className="text-xs text-gray-400">{formData.primaryColor}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={formData.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200" />
                    <div><p className="text-sm font-medium">Secondary Color</p><p className="text-xs text-gray-400">{formData.secondaryColor}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Select Products */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Choose your starting products</h3>
            <p className="text-sm text-gray-500 mb-6">Select which hair products you want to list in your store ({formData.selectedProducts.length} selected)</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const selected = formData.selectedProducts.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      selected ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${selected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {selected ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category} &middot; Wholesale {p.price}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Launch */}
        {currentStep === 5 && (
          <div className="text-center max-w-md mx-auto">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're ready to launch!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your store is set up with {formData.selectedProducts.length} products. Click the button below to publish your store and start selling.
            </p>
            <div className="mb-8 rounded-xl bg-gray-50 p-4 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Business</span><span className="font-medium">{formData.businessName || 'Not set'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Store</span><span className="font-medium">{formData.storeName || 'Not set'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Products</span><span className="font-medium">{formData.selectedProducts.length} selected</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Primary Color</span><span className="flex items-center gap-2 font-medium"><span className="h-4 w-4 rounded-full border" style={{background: formData.primaryColor}} />{formData.primaryColor}</span></div>
            </div>
            <button className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-sm font-bold text-white hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-200">
              Launch My Store
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {currentStep < 5 && (
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="flex items-center gap-1 rounded-lg bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

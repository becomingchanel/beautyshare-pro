'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    storeName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Integrate Supabase Auth + Stripe checkout
      await new Promise((r) => setTimeout(r, 1000));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-brand-900 p-12 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">BeautyShare Pro</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white leading-tight">
            Everything you need to launch a profitable hair brand.
          </h2>
          <div className="mt-8 space-y-4">
            {[
              'Premium hair at wholesale prices',
              'Connected Shopify store with your brand',
              'We handle fulfillment — you focus on sales',
              'Pricing tools to maximize your profits',
              'Marketing copilot (coming soon)',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-amber-400" />
                <span className="text-sm text-brand-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-brand-500">
          &copy; {new Date().getFullYear()} BeautyShare Pro
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-cream-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-brand-900">BeautyShare Pro</span>
          </div>

          <h1 className="text-2xl font-bold text-brand-900">Start your hair business</h1>
          <p className="mt-1 text-sm text-brand-500">$149/month + $99 one-time setup fee</p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <Input label="Full Name" placeholder="Your name" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required />
            <Input label="Phone" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
            <Input label="Hair Brand Name" placeholder="My Hair Co." value={formData.storeName} onChange={(e) => updateField('storeName', e.target.value)} hint="This will be your store name — you can change it later" required />
            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={formData.password} onChange={(e) => updateField('password', e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-brand-400 hover:text-brand-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account & Continue to Payment
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

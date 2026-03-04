'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Integrate with Supabase Auth
      // const { createClient } = await import('@/lib/supabase/client');
      // const supabase = createClient();
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;

      await new Promise((r) => setTimeout(r, 1000));

      // Demo: redirect based on email
      if (email.includes('admin')) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-brand-900 p-12 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">BeautyShare Pro</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white leading-tight">
            Your hair business, powered by a platform that works while you sleep.
          </h2>
          <p className="mt-4 text-brand-300 leading-relaxed">
            Connected stores, automated fulfillment, real-time analytics, and AI-powered
            marketing — all in one place.
          </p>
        </div>

        <p className="text-sm text-brand-500">
          &copy; {new Date().getFullYear()} BeautyShare Pro
        </p>
      </div>

      {/* Right: Login form */}
      <div className="flex flex-1 items-center justify-center bg-cream-50 px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-brand-900">BeautyShare Pro</span>
          </div>

          <h1 className="text-2xl font-bold text-brand-900">Welcome back</h1>
          <p className="mt-1 text-sm text-brand-500">
            Sign in to your BeautyShare Pro account
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-brand-400 hover:text-brand-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-brand-600">
                <input type="checkbox" className="h-4 w-4 rounded border-brand-300" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-brand-600 hover:text-brand-700">
              Start your hair business
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

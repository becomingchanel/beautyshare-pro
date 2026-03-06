'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Crown, Mail, Lock, User, Briefcase } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(email, password, fullName, businessName);

    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return;
    }

    // Redirect to email confirmation page
    router.push('/auth/confirm');
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — Brand panel */}
      <div className="hidden w-1/2 items-center justify-center brand-gradient lg:flex">
        <div className="max-w-md px-8 text-center text-white">
          <Crown className="mx-auto mb-6 h-16 w-16" />
          <h1 className="font-display text-4xl font-bold">Launch Your Hair Empire</h1>
          <p className="mt-4 text-lg text-white/80">
            $149/month gets you wholesale hair, a branded store, and automated fulfillment.
          </p>
          <div className="mt-8 rounded-xl bg-white/10 p-6 text-left backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">What&apos;s included</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                Premium hair at wholesale pricing
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                Your own branded Shopify store
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                Automated order fulfillment
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                Business tools &amp; calculators
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right — Signup form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-orange">
              <Crown className="h-8 w-8" />
              <span className="font-display text-xl font-bold">BeautyShare Pro</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-1 text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-orange hover:text-orange-dark">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              placeholder="Chanel Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User className="h-4 w-4" />}
              required
            />

            <Input
              label="Business name"
              type="text"
              placeholder="Luxe Locks NYC"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              icon={<Briefcase className="h-4 w-4" />}
              required
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@yourbrand.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            After email verification, you&apos;ll be redirected to set up your subscription.
          </p>
        </div>
      </div>
    </div>
  );
}

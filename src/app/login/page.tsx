'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Crown, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const profile = useAuthStore((s) => s.profile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
      return;
    }

    // Redirect based on role — admin → /dashboard/admin, subscriber → /dashboard
    // The profile may not be loaded yet, so redirect to /dashboard and let middleware handle it
    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — Brand panel */}
      <div className="hidden w-1/2 items-center justify-center brand-gradient-pink lg:flex">
        <div className="max-w-md px-8 text-center text-white">
          <Crown className="mx-auto mb-6 h-16 w-16" />
          <h1 className="font-display text-4xl font-bold">Welcome Back</h1>
          <p className="mt-4 text-lg text-white/80">
            Sign in to manage your hair business empire.
          </p>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-orange">
              <Crown className="h-8 w-8" />
              <span className="font-display text-xl font-bold">BeautyShare Pro</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-1 text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-orange hover:text-orange-dark">
                Start your free trial
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="chanel@beautyshare.pro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
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
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

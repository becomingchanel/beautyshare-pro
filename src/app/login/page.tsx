'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Crown, Mail, Lock, Sparkles } from 'lucide-react';

function LoginForm() {
  const router                         = useRouter();
  const searchParams                   = useSearchParams();
  const { signIn, user, initialized }  = useAuthStore((s) => s);

  type View = 'magic' | 'sent' | 'password' | 'verifying' | 'tokenError';
  const [view,     setView]    = useState<View>('magic');
  const [email,    setEmail]   = useState('');
  const [password, setPassword]= useState('');
  const [loading,  setLoading] = useState(false);
  const [error,    setError]   = useState('');
  const [lastEmail,setLastEmail]= useState('');

  // Already logged in → go to dashboard
  useEffect(() => {
    if (initialized && user) router.replace('/members/dashboard');
  }, [initialized, user, router]);

  // Handle ?token= from magic link email
  useEffect(() => {
    const token   = searchParams.get('token');
    const expired = searchParams.get('expired');
    if (expired) { setError('Your session expired. Please log in again.'); return; }
    if (token)   { verifyToken(token); }
  }, [searchParams]);

  async function verifyToken(token: string) {
    setView('verifying');
    try {
      const res  = await fetch(`/api/auth/verify-token?token=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (!res.ok || !data.redirectUrl) { setView('tokenError'); return; }
      if (data.profile) {
        sessionStorage.setItem('bsp_member', JSON.stringify(data.profile));
      }
      window.location.href = data.redirectUrl; // Supabase action link → sets real session
    } catch {
      setView('tokenError');
    }
  }

  async function sendMagicLink(overrideEmail?: string) {
    const target = overrideEmail ?? email;
    if (!target?.includes('@')) { setError('Please enter a valid email address.'); return; }
    setLoading(true);
    setError('');
    setLastEmail(target);
    try {
      const res  = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target }),
      });
      const data = await res.json();
      if (res.status === 404 || data.error === 'not_member') {
        setError("No BSP membership found for that email. Check your email or join at beautysharepro.com.");
      } else if (!res.ok) {
        setError('Something went wrong. Please try again.');
      } else {
        setView('sent');
      }
    } catch {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  }

  async function handlePasswordLogin() {
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    setError('');
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError === 'Invalid login credentials'
        ? 'Incorrect email or password. Try a magic link instead.'
        : signInError);
      setLoading(false);
    } else {
      router.replace('/members/dashboard');
    }
  }

  // ─── VERIFYING / TOKEN ERROR ─────────────────────────────
  if (view === 'verifying') return (
    <FullPageCenter>
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange/20 border-t-orange" />
        <p className="text-sm text-gray-500">Verifying your link…</p>
      </div>
    </FullPageCenter>
  );

  if (view === 'tokenError') return (
    <FullPageCenter>
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-10 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Link expired</h2>
        <p className="text-sm text-gray-500 mb-6">This login link has expired or already been used. Magic links are single-use and expire after 15 minutes.</p>
        <Button className="w-full" onClick={() => setView('magic')}>Get a new link →</Button>
      </div>
    </FullPageCenter>
  );

  // ─── LINK SENT ───────────────────────────────────────────
  if (view === 'sent') return (
    <FullPageCenter>
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-10 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">📬</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Check your inbox!</h2>
        <p className="text-sm text-gray-500 mb-3">We sent a secure login link to:</p>
        <div className="mb-4 rounded-lg bg-orange-50 border border-orange/20 px-4 py-3 text-sm font-semibold text-orange break-all">{lastEmail}</div>
        <p className="text-xs text-gray-400 mb-6">Click the link to access your dashboard. It expires in 15 minutes. Don't see it? Check your spam folder.</p>
        <button className="w-full rounded-lg border border-black/10 py-2.5 text-sm text-gray-500 hover:border-orange/40 hover:text-orange transition-colors mb-2" onClick={() => setView('magic')}>← Use a different email</button>
        <button className="w-full rounded-lg border border-black/10 py-2.5 text-sm text-gray-500 hover:border-orange/40 hover:text-orange transition-colors" onClick={() => sendMagicLink(lastEmail)}>Resend link</button>
      </div>
    </FullPageCenter>
  );

  // ─── MAIN LOGIN ──────────────────────────────────────────
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden w-1/2 items-center justify-center brand-gradient-pink lg:flex">
        <div className="max-w-md px-8 text-center text-white">
          <Crown className="mx-auto mb-6 h-16 w-16" />
          <h1 className="font-display text-4xl font-bold">Welcome Back, Boss.</h1>
          <p className="mt-4 text-lg text-white/80">Access your member dashboard, profit calculators, and weekly webinars.</p>
          <div className="mt-8 space-y-3 text-left">
            {['Profit & Stylist Calculator', 'Weekly Wednesday Webinars', 'Training Library', 'BSP AI Assistant 24/7'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/90 text-sm">
                <Sparkles className="h-4 w-4 text-white/60 shrink-0" />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-orange">
              <Crown className="h-8 w-8" />
              <span className="font-display text-xl font-bold">BeautyShare Pro</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {view === 'password' ? 'Sign in with password' : 'Sign in to your account'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/signup" className="font-medium text-orange hover:text-orange-dark">Join BSP today</Link>
            </p>
          </div>

          {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          {view === 'magic' && (
            <>
              <div className="mb-1 rounded-xl bg-orange-50 border border-orange/20 px-4 py-3 flex items-start gap-3 mb-5">
                <Sparkles className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                <p className="text-sm text-orange-900/80">Enter your email and we'll send a secure login link — no password needed.</p>
              </div>
              <Input
                label="Member Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && sendMagicLink()}
              />
              <Button className="w-full mt-4" size="lg" loading={loading} onClick={() => sendMagicLink()}>
                Send My Login Link →
              </Button>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/8" /></div>
                <div className="relative flex justify-center text-xs text-gray-400"><span className="bg-white px-3">or</span></div>
              </div>
              <button className="w-full rounded-lg border border-black/10 py-2.5 text-sm text-gray-500 hover:border-orange/40 hover:text-orange transition-colors" onClick={() => setView('password')}>
                Sign in with password instead
              </button>
            </>
          )}

          {view === 'password' && (
            <>
              <button className="mb-5 flex items-center gap-1 text-sm text-gray-400 hover:text-orange transition-colors" onClick={() => { setView('magic'); setError(''); }}>
                ← Back to magic link
              </button>
              <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="h-4 w-4" />} />
              <div className="mt-4">
                <Input label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock className="h-4 w-4" />}
                  onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handlePasswordLogin()} />
              </div>
              <Button className="w-full mt-5" size="lg" loading={loading} onClick={handlePasswordLogin}>Sign In →</Button>
              <p className="mt-4 text-center text-sm text-gray-500">
                Forgot your password?{' '}
                <button className="text-orange hover:underline" onClick={() => { setView('magic'); setError(''); }}>Get a magic link</button>
              </p>
            </>
          )}

          <p className="mt-8 text-center text-xs text-gray-400">
            Questions? <a href="mailto:hello@beautysharepro.com" className="text-orange hover:underline">hello@beautysharepro.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function FullPageCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      {children}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginForm />
    </Suspense>
  );
}

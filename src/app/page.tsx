import Link from 'next/link';
import { Crown, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-100">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-brand-900">
            BeautyShare Pro
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700 mb-6">
          <Crown className="h-4 w-4" />
          The Hair Business Platform
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-brand-950 md:text-6xl">
          Launch & Scale Your{' '}
          <span className="text-brand-600">Hair Brand</span>{' '}
          Without The Risk
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-500 leading-relaxed">
          Get premium hair extensions at wholesale prices, a connected Shopify store,
          automated fulfillment, and the tools to build a real brand — all for one monthly fee.
          No inventory risk. No guesswork.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-brand-700 transition-all hover:shadow-xl"
          >
            Start Your Hair Business
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-300 bg-white px-8 py-3.5 text-base font-medium text-brand-700 hover:bg-brand-50 transition-colors"
          >
            Try Our Pricing Calculator
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'No Inventory Risk',
              desc: 'We stock, store, and ship the hair. You focus on selling and building your brand.',
            },
            {
              title: 'Your Brand, Your Prices',
              desc: 'Set your own retail prices, use your own branding. Customers see YOUR store, not ours.',
            },
            {
              title: 'Connected Everything',
              desc: 'Your Shopify store syncs orders to our warehouse automatically. Upload tracking in one click.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <CheckCircle className="h-8 w-8 text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-brand-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-brand-950">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-brand-500">
          Everything you need to launch and grow your hair business.
        </p>

        <div className="mt-10 rounded-2xl border border-brand-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-medium text-brand-500 uppercase tracking-wide">
            Launch Plan
          </div>
          <div className="mt-2 flex items-end justify-center gap-1">
            <span className="text-5xl font-bold text-brand-900">$149</span>
            <span className="mb-1 text-brand-500">/month</span>
          </div>
          <p className="mt-1 text-sm text-brand-400">+ $99 one-time setup fee</p>
          <div className="mt-6 space-y-3 text-left max-w-sm mx-auto">
            {[
              'Premium hair at wholesale prices',
              'Connected Shopify store',
              'Automated order fulfillment',
              'Tracking upload in one click',
              'Pricing calculators',
              'Your brand, your customers',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                <span className="text-sm text-brand-700">{feature}</span>
              </div>
            ))}
          </div>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-base font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-100 bg-white px-6 py-8 text-center text-sm text-brand-400">
        &copy; {new Date().getFullYear()} BeautyShare Pro. All rights reserved.
      </footer>
    </div>
  );
}

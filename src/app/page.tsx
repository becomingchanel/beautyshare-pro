import Link from 'next/link';

/* ================================================================
   BeautyShare Pro — High-Converting SaaS Landing Page
   Brand Colors: #FA6A27 (orange), #D61465 (pink), #DCBDEF (lavender),
                 #E2AD37 (gold), #000000, #FFFFFF
   ================================================================ */

/* ── tiny SVG icons (no extra deps) ────────────────────────────── */
const Icon = {
  check: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  ),
  arrow: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  store: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  ),
  box: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  chart: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  sparkle: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  shield: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  users: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5 fill-gold" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"/>
    </svg>
  ),
  chevron: (
    <svg className="h-5 w-5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  play: (
    <svg className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-full brand-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="brand-gradient-text">beauty</span>
              <span className="text-gray-900">share</span>
              <span className="text-pink font-extrabold text-sm align-super ml-0.5">PRO</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-orange transition-colors">How It Works</a>
            <a href="#features" className="hover:text-orange transition-colors">Features</a>
            <a href="#pricing" className="hover:text-orange transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-orange transition-colors">FAQ</a>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-semibold text-gray-700 hover:text-orange transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange/20"
            >
              Get Started
              {Icon.arrow}
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 brand-gradient opacity-[0.07]" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-lavender/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-sm font-semibold text-orange mb-8">
              <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
              Now Accepting New Members
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Launch Your{' '}
              <span className="brand-gradient-text">Hair Empire</span>
              <br className="hidden sm:block" />
              <span className="text-pink">Without The Risk</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">
              Get premium hair extensions at wholesale prices, your own branded Shopify store,
              and automated fulfillment — all for one monthly fee.{' '}
              <strong className="text-gray-700">No inventory. No guesswork. No limits.</strong>
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl hover:shadow-orange/30 transition-all hover:-translate-y-0.5"
              >
                Become A BeautyShare Boss
                <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-orange/40 hover:text-orange transition-all"
              >
                See How Much You Can Earn
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-14 text-center">
              {[
                { value: '200+', label: 'Active Bosses' },
                { value: '$2.4M', label: 'Revenue Generated' },
                { value: '15K+', label: 'Orders Fulfilled' },
                { value: '4.9/5', label: 'Boss Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-extrabold brand-gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROBLEM → SOLUTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Starting a hair business is <span className="text-pink">hard</span>.
              <br />We make it <span className="brand-gradient-text">easy</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="rounded-2xl bg-white border border-gray-200 p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600 mb-6">
                The Old Way
              </div>
              <ul className="space-y-4">
                {[
                  'Buy $5K+ in inventory upfront (and pray it sells)',
                  'Store boxes of hair in your apartment',
                  'Ship every order yourself — trips to the post office daily',
                  'Build a website from scratch with zero tech skills',
                  'Figure out pricing, marketing, and fulfillment alone',
                  'Risk losing everything if it doesn\'t work out',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <svg className="h-5 w-5 shrink-0 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The BeautyShare Way */}
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-lavender-50 border-2 border-orange/20 p-8 relative">
              <div className="absolute -top-3 -right-3 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                BETTER WAY
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange mb-6">
                The BeautyShare Way
              </div>
              <ul className="space-y-4">
                {[
                  'Zero inventory — we stock, store, and ship for you',
                  'Your own branded Shopify store set up in days',
                  'Orders auto-sync to our warehouse for fulfillment',
                  'Premium hair at wholesale prices (50-70% margins)',
                  'Pricing calculators, analytics, and business tools built in',
                  'Start for just $149/month — cancel anytime',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-orange mt-0.5">{Icon.check}</span>
                    <span className="text-sm leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Three steps to your <span className="brand-gradient-text">dream business</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Join & Get Your Store',
                desc: 'Sign up, pick your brand name, and we\'ll build your custom Shopify store with our premium hair catalog already loaded.',
                color: 'from-lavender to-lavender-dark',
                bg: 'bg-lavender-50',
              },
              {
                step: '02',
                title: 'Set Prices & Sell',
                desc: 'Use our profit calculators to set your retail prices. Share your store link, run your marketing, and start making sales.',
                color: 'from-orange to-gold',
                bg: 'bg-orange-50',
              },
              {
                step: '03',
                title: 'We Ship, You Profit',
                desc: 'When a customer orders, we pick, pack, and ship it with YOUR branding. You collect the retail price, keep the profit.',
                color: 'from-pink to-pink-dark',
                bg: 'bg-pink-50',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${item.bg} mb-6`}>
                  <span className={`text-2xl font-extrabold brand-gradient-text`}>{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Arrow connector on desktop */}
          <div className="hidden md:flex justify-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange/20 hover:shadow-xl transition-all"
            >
              Start Your Journey Today
              {Icon.arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHAT'S INCLUDED / FEATURES
          ═══════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 md:py-28 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-3">Everything You Need</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              What does a <span className="brand-gradient-text">BeautyShare Boss</span> get?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Icon.store,
                title: 'Your Branded Store',
                desc: 'A custom Shopify store with your logo, colors, and domain. Your customers see YOUR brand, not ours.',
              },
              {
                icon: Icon.box,
                title: 'Zero Inventory Risk',
                desc: 'We stock 100+ premium hair SKUs in our warehouse. You sell it, we ship it — in your branded packaging.',
              },
              {
                icon: Icon.chart,
                title: 'Business Intelligence',
                desc: 'Dashboard with real-time sales, profit tracking, customer analytics, and churn prediction tools.',
              },
              {
                icon: Icon.sparkle,
                title: 'AI Marketing Copilot',
                desc: 'Coming soon: AI-powered social captions, email sequences, and ad copy tailored to the hair industry.',
              },
              {
                icon: Icon.shield,
                title: 'Premium Hair Quality',
                desc: '100% virgin human hair — Brazilian, Peruvian, Malaysian. Body wave, deep wave, straight, and more.',
              },
              {
                icon: Icon.users,
                title: 'Boss Community',
                desc: 'Join 200+ hair entrepreneurs sharing tips, strategies, and wins. You\'re never building alone.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-orange/30 transition-all duration-300"
              >
                <div className="text-orange mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EARNINGS BREAKDOWN / ROI
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-pink uppercase tracking-widest mb-3">The Math Doesn&apos;t Lie</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              See what <span className="brand-gradient-text">Bosses are earning</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                level: 'Side Hustle',
                orders: '10-15',
                monthly: '$800 — $1,500',
                desc: 'Selling to friends, family, and social followers on the side',
                tag: 'Part-Time',
                tagColor: 'bg-lavender text-lavender-700',
              },
              {
                level: 'Growing Brand',
                orders: '30-50',
                monthly: '$3,000 — $5,000',
                desc: 'Running ads, building an email list, repeat customers',
                tag: 'Most Popular',
                tagColor: 'bg-orange text-white',
              },
              {
                level: 'Full-Time Boss',
                orders: '80-120',
                monthly: '$8,000 — $15,000+',
                desc: 'Multiple marketing channels, loyal clientele, brand partnerships',
                tag: 'Top Earners',
                tagColor: 'bg-pink text-white',
              },
            ].map((tier) => (
              <div
                key={tier.level}
                className={`rounded-2xl border p-8 text-center relative ${
                  tier.level === 'Growing Brand'
                    ? 'border-orange/30 bg-gradient-to-b from-orange-50 to-white shadow-xl shadow-orange/10 scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${tier.tagColor} mb-4`}>
                  {tier.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{tier.level}</h3>
                <div className="mt-4 text-3xl md:text-4xl font-extrabold brand-gradient-text">
                  {tier.monthly}
                </div>
                <p className="text-sm text-gray-400 mt-1">/month profit</p>
                <p className="text-sm text-gray-500 mt-1">{tier.orders} orders/month</p>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8 max-w-lg mx-auto">
            Based on average margins of $80-120 profit per order. Individual results vary based on
            pricing strategy, product mix, and marketing effort.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lavender-50 to-orange-50">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-3">Boss Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Hear from our <span className="text-pink">Bosses</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Jasmine T.',
                location: 'Atlanta, GA',
                quote: 'I went from selling hair out of my trunk to running a real online business. BeautyShare handled everything I was struggling with — inventory, shipping, even my website. I just focus on my clients now.',
                revenue: '$4,200/mo',
                initials: 'JT',
              },
              {
                name: 'Keisha R.',
                location: 'Houston, TX',
                quote: 'The profit calculator alone was worth it. I realized I was undercharging by $40 per bundle! Within 2 months my margins went from 25% to 55% and I\'m actually making money now.',
                revenue: '$6,800/mo',
                initials: 'KR',
              },
              {
                name: 'Diamond L.',
                location: 'Brooklyn, NY',
                quote: 'I was skeptical about the $149/month but the ROI is crazy. I made that back on my second order. Now I\'m doing $10K months and I never touch a single piece of hair. It just ships.',
                revenue: '$10,500/mo',
                initials: 'DL',
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold">{Icon.star}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full brand-gradient-pink flex items-center justify-center text-white text-sm font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold brand-gradient-text">{t.revenue}</div>
                    <div className="text-xs text-gray-400">avg. monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-3">Simple Pricing</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              One plan. <span className="brand-gradient-text">Everything included.</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              No hidden fees. No tiered nonsense. Every Boss gets the full platform.
            </p>
          </div>

          <div className="mx-auto max-w-lg">
            <div className="rounded-3xl border-2 border-orange/30 bg-gradient-to-b from-orange-50/50 to-white p-10 shadow-xl shadow-orange/10 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full brand-gradient-pink px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                MOST POPULAR
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-2">BeautyShare Boss Plan</h3>

              <div className="mt-6 flex items-end justify-center gap-1">
                <span className="text-6xl font-extrabold text-gray-900">$149</span>
                <span className="mb-2 text-gray-400 font-medium">/month</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">+ $99 one-time setup fee</p>

              <div className="mt-8 space-y-3 text-left">
                {[
                  'Premium virgin hair at wholesale prices',
                  'Custom branded Shopify store',
                  'Automated order fulfillment & shipping',
                  'One-click tracking upload',
                  'Profit & pricing calculators',
                  'Real-time sales dashboard & analytics',
                  'Customer CRM & reorder predictions',
                  'Access to Boss Community & support',
                  'AI Marketing Copilot (coming soon)',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="text-orange">{Icon.check}</span>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/signup"
                className="mt-10 w-full inline-flex items-center justify-center gap-2 rounded-full brand-gradient-pink py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                Become A BeautyShare Boss
                {Icon.arrow}
              </Link>

              <p className="text-xs text-gray-400 mt-4">Cancel anytime. No long-term contracts.</p>
            </div>
          </div>

          {/* ROI callout */}
          <div className="mt-12 mx-auto max-w-2xl rounded-2xl bg-gray-900 p-8 text-center text-white">
            <p className="text-sm font-semibold text-orange uppercase tracking-wide mb-2">Quick Math</p>
            <p className="text-2xl md:text-3xl font-bold">
              Sell just <span className="text-orange">2 bundles</span> and your monthly fee is covered.
            </p>
            <p className="text-gray-400 mt-2">
              Average profit per bundle: $80+. Your subscription pays for itself with your first few sales.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 md:py-28 bg-gray-50">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
              Frequently Asked <span className="brand-gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Do I need any experience to start?',
                a: 'Absolutely not! Most of our Bosses started with zero experience in the hair industry. We provide the products, the store, the tools, and the community support. You just need the drive to build your brand.',
              },
              {
                q: 'How much can I realistically make?',
                a: 'It depends on your effort. Our Bosses average $80-120 profit per order. Selling 10 orders/month = $800-1,200. Selling 50 orders/month = $4,000-6,000. Some top Bosses clear $10K+ monthly. We give you the tools to track every dollar.',
              },
              {
                q: 'What kind of hair do you carry?',
                a: '100% virgin human hair — Brazilian, Peruvian, Malaysian, and Indian origins. Textures include straight, body wave, deep wave, loose wave, curly, and kinky curly. Lengths from 10" to 30". Plus closures, frontals, and custom wigs.',
              },
              {
                q: 'Do customers know the hair comes from you?',
                a: 'No! That\'s the whole point. We ship in YOUR branded packaging with YOUR return label. Your customers think it comes directly from your business. White-label fulfillment is our specialty.',
              },
              {
                q: 'What if I want to cancel?',
                a: 'Cancel anytime — no long-term contracts, no cancellation fees. We believe in earning your business every month. Your store stays active through the end of your billing period.',
              },
              {
                q: 'How fast do orders ship?',
                a: 'Orders are processed within 1-2 business days and shipped via USPS Priority or UPS Ground. Most domestic orders arrive in 3-5 business days. You get tracking uploaded automatically.',
              },
              {
                q: 'Can I sell at my own prices?',
                a: 'Yes! You set your own retail prices. We only require a minimum advertised price (MAP) to protect brand value. Most Bosses price at 50-70% above wholesale, giving them healthy margins.',
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-gray-900 hover:text-orange transition-colors [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">
                    {Icon.chevron}
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed -mt-2">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute inset-0 brand-gradient opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to become a{' '}
            <span className="brand-gradient-text">BeautyShare Boss</span>?
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
            Join 200+ women who turned their hair business dreams into reality.
            No inventory risk. No tech headaches. Just profit.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full brand-gradient-pink px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-orange/30 hover:-translate-y-1 transition-all"
            >
              Get Started Now — $149/mo
              <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            $99 setup fee &middot; Cancel anytime &middot; No contracts
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 border-t border-gray-800 px-5 md:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full brand-gradient flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-lg font-bold">
                <span className="text-orange">beauty</span>
                <span className="text-white">share</span>
                <span className="text-pink font-extrabold text-xs align-super ml-0.5">PRO</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <Link href="/login" className="hover:text-white transition-colors">Boss Login</Link>
            </div>

            {/* Social placeholder */}
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-orange transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="hover:text-orange transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9.02a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.19 8.19 0 004.78 1.53V6.8a4.84 4.84 0 01-1.02-.11z"/></svg>
              </a>
              <a href="#" className="hover:text-orange transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BeautyShare Pro. All rights reserved. &middot;
            <a href="#" className="hover:text-gray-300 ml-1">Privacy Policy</a> &middot;
            <a href="#" className="hover:text-gray-300 ml-1">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ================================================================
   BeautyShare Pro — Full SaaS Landing Page
   Bright, inviting design with cursive/serif + sans-serif contrast
   Brand Colors: #FA6A27 (orange), #D61465 (pink), #DCBDEF (lavender),
                 #E2AD37 (gold), #000000, #FFFFFF
   ================================================================ */

/* ── Cursive accent helper ──────────────────────────────────────── */
const Cursive = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={className}
    style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
  >
    {children}
  </span>
);

/* ── Hero images for animated carousel ──────────────────────────── */
const heroImages = [
  { src: '/images/hero-model.png', alt: 'Premium hair extensions model' },
  { src: '/images/model-curly-1.png', alt: 'Curly hair extensions' },
  { src: '/images/model-straight-1.png', alt: 'Straight hair extensions' },
  { src: '/images/model-curly-2.png', alt: 'Curly hair extensions style 2' },
  { src: '/images/model-straight-2.png', alt: 'Straight hair extensions style 2' },
];

/* ── SVG Icons ──────────────────────────────────────────────────── */
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
  x: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
  shield: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

/* ── Feature icons (for "Your Business, Your Way" section) ────── */
const FeatureIcons = {
  inventory: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  store: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  ),
  academy: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  price: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  support: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  launch: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
};

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="BeautyShare Pro" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-black/60">
            <a href="#how-it-works" className="hover:text-orange transition-colors">How It Works</a>
            <a href="#why" className="hover:text-orange transition-colors">Why BSP</a>
            <a href="#hair" className="hover:text-orange transition-colors">Our Hair</a>
            <a href="#compare" className="hover:text-orange transition-colors">Compare</a>
            <a href="#pricing" className="hover:text-orange transition-colors">Plans</a>
            <Link href="/websites" className="hover:text-orange transition-colors">Store Designs</Link>
            <a href="#faq" className="hover:text-orange transition-colors">FAQ</a>
            <Link href="/education" className="font-semibold hover:text-orange transition-colors">Education</Link>
            <Link href="/webinar" className="text-orange font-bold hover:text-orange/80 transition-colors">Free Webinar</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-semibold text-black hover:text-orange transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="hidden sm:inline-flex items-center gap-2 rounded-full brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange/20">
              Get Started
            </Link>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-black/5 shadow-xl">
            <div className="flex flex-col px-6 py-4 gap-4 text-base font-medium text-black/70">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">How It Works</a>
              <a href="#why" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">Why BSP</a>
              <a href="#hair" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">Our Hair</a>
              <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">Compare</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">Plans</a>
              <Link href="/websites" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">Store Designs</Link>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange transition-colors py-1">FAQ</a>
              <Link href="/education" onClick={() => setMobileMenuOpen(false)} className="font-semibold hover:text-orange transition-colors py-1">Education</Link>
              <Link href="/webinar" onClick={() => setMobileMenuOpen(false)} className="text-orange font-bold py-1">Free Webinar</Link>
              <div className="flex gap-3 pt-2 border-t border-black/10">
                <Link href="/login" className="flex-1 text-center py-3 rounded-full border-2 border-black/10 font-semibold text-sm hover:border-orange/40 transition-colors">Log In</Link>
                <Link href="/signup" className="flex-1 text-center py-3 rounded-full brand-gradient-pink text-white font-semibold text-sm shadow-lg shadow-orange/20">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO — Animated model carousel + text with cursive accent
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lavender/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange/20 px-4 py-1.5 text-sm font-semibold text-orange mb-8">
                <span className="h-2 w-2 rounded-full bg-orange animate-pulse" />
                Now Accepting New Members
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.1]">
                Launch Your{' '}
                <span className="brand-gradient-text">Hair Empire,</span>
                <br />
                <Cursive className="text-pink">Without The Risk</Cursive>
              </h1>
              <p className="mt-6 max-w-xl text-lg md:text-xl text-black/60 leading-relaxed md:mx-0 mx-auto">
                Get premium hair extensions at wholesale prices
                and automated fulfillment — all for one monthly fee.{' '}
                <strong className="text-black">No inventory. No guesswork. No limits.</strong>
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:justify-start sm:justify-center">
                <Link href="/signup" className="group inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl hover:shadow-orange/30 transition-all hover:-translate-y-0.5">
                  Become A BeautyShare Boss
                  <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
                </Link>
                <Link href="#compare" className="inline-flex items-center gap-2 rounded-full border-2 border-black/10 bg-white px-8 py-4 text-base font-semibold text-black hover:border-orange/40 hover:text-orange transition-all">
                  See How We Compare
                </Link>
              </div>
            </div>

            {/* Animated hero image carousel */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-[320px] md:w-[420px] lg:w-[480px] h-[420px] md:h-[540px] lg:h-[600px]">
                {heroImages.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${
                      i === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                {/* Carousel dots */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === currentImage ? 'w-8 bg-orange' : 'w-2.5 bg-black/20'
                      }`}
                      aria-label={`View model ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-14 text-center">
            {[
              { value: '500+', label: 'Happy Entrepreneurs' },
              { value: '$2.4M', label: 'Revenue Generated' },
              { value: '15K+', label: 'Orders Fulfilled' },
              { value: '4.9/5', label: 'Boss Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-extrabold brand-gradient-text">{stat.value}</div>
                <div className="text-xs md:text-sm text-black/40 mt-1 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          YOUR BUSINESS, YOUR WAY — feature grid (Lovable-inspired)
          ═══════════════════════════════════════════════════════════ */}
      <section id="why" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Why Beauty Share Pro</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              Your Business,{' '}
              <Cursive className="text-pink">Your Way</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              We built the ultimate platform for aspiring hair entrepreneurs. Everything you need — nothing you don&apos;t.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FeatureIcons.inventory, title: 'Zero Inventory Risk', desc: 'We stock, store, and ship every order. You never touch a single product.' },
              { icon: FeatureIcons.store, title: 'Semi-Custom Shopify Store', desc: 'Choose from professionally designed hair store templates, customize with drag-and-drop, and launch your brand. Available as a separate one-time purchase.' },
              { icon: FeatureIcons.academy, title: 'Hair Launch Academy', desc: '24/7 access to digital training — marketing, sales, social media, and more.' },
              { icon: FeatureIcons.price, title: 'You Set The Prices', desc: 'Buy at wholesale, sell at your markup. Your profit margins, your rules.' },
              { icon: FeatureIcons.support, title: 'Dedicated Support', desc: 'Our team is always available to help you grow and troubleshoot.' },
              { icon: FeatureIcons.launch, title: 'Launch in Days, Not Months', desc: 'Everything is set up for you. Start taking orders within days of joining.' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl hover:bg-orange-50/40 transition-colors">
                <div className="shrink-0 h-12 w-12 rounded-full bg-orange-50 border border-orange/20 flex items-center justify-center text-orange">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-black mb-1">{f.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HAIR SHOWCASE — product textures + model shots (light bg)
          ═══════════════════════════════════════════════════════════ */}
      <section id="hair" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Premium Collection</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              Hair That <Cursive className="text-pink">Sells Itself</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              100% virgin human hair — Brazilian, Peruvian, Malaysian. Every texture your customers want, ready to ship under your brand.
            </p>
          </div>

          {/* Hair texture product shots */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-14">
            {[
              { src: '/images/hair-wavy.png', label: 'Natural Wave' },
              { src: '/images/hair-curly.png', label: 'Deep Curly' },
              { src: '/images/hair-deep-curly.png', label: 'Kinky Curly' },
            ].map((hair) => (
              <div key={hair.label} className="text-center group">
                <div className="rounded-2xl overflow-hidden bg-white border border-black/5 group-hover:border-orange/30 transition-all p-4 mb-3 shadow-sm">
                  <img src={hair.src} alt={hair.label} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-sm font-semibold text-black">{hair.label}</p>
              </div>
            ))}
          </div>

          {/* Model grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { src: '/images/model-curly-1.png', alt: 'Curly hair extensions' },
              { src: '/images/model-straight-1.png', alt: 'Straight hair extensions' },
              { src: '/images/model-curly-2.png', alt: 'Curly hair extensions style 2' },
              { src: '/images/model-straight-2.png', alt: 'Straight hair extensions style 2' },
            ].map((m) => (
              <div key={m.alt} className="rounded-2xl overflow-hidden bg-white border border-black/5 group hover:border-orange/30 transition-all shadow-sm">
                <img src={m.src} alt={m.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-black/50 text-sm mb-5">Straight &middot; Body Wave &middot; Deep Wave &middot; Loose Wave &middot; Curly &middot; Kinky Curly &middot; 10&quot; to 30&quot;</p>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border-2 border-orange/40 px-6 py-3 text-sm font-bold text-orange hover:bg-orange hover:text-white transition-all">
              Start Selling Premium Hair Today {Icon.arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BSP vs. GOING SOLO — Lovable-inspired 2-column comparison
          ═══════════════════════════════════════════════════════════ */}
      <section id="compare" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              BSP vs. <Cursive className="text-pink">Going Solo</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-lg mx-auto text-lg">
              See why hundreds of entrepreneurs choose Beauty Share Pro over starting from scratch.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-5 px-5 w-1/3"></th>
                  <th className="py-5 px-5 text-center rounded-t-2xl" style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))' }}>
                    <div className="text-white/80 text-xs font-bold uppercase tracking-widest">Beauty Share Pro</div>
                    <div className="text-white text-lg mt-1" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>The Easy Way</div>
                  </th>
                  <th className="py-5 px-5 text-center rounded-t-2xl bg-black/[0.03]">
                    <div className="text-black/40 text-xs font-bold uppercase tracking-widest">On Your Own</div>
                    <div className="text-black/60 text-lg mt-1" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>The Hard Way</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Upfront Inventory Cost', bs: 'None — $0', solo: '$5,000 – $20,000+' },
                  { feature: 'Product Sourcing', bs: 'Done for you', solo: 'Research & negotiate yourself' },
                  { feature: 'Branded Website', bs: 'Available — separate purchase', solo: '$500 – $3,000 to build' },
                  { feature: 'Order Fulfillment', bs: 'We ship every order', solo: 'Pack & ship yourself' },
                  { feature: 'Warehousing & Storage', bs: 'Included', solo: 'Rent storage space' },
                  { feature: 'Custom Packaging', bs: 'Available on select plans', solo: 'Source & manage yourself' },
                  { feature: 'Training & Education', bs: '24/7 Academy access', solo: 'Figure it out alone' },
                  { feature: 'Time to Launch', bs: 'Days', solo: 'Weeks to months' },
                  { feature: 'Financial Risk', bs: 'Minimal', solo: 'High' },
                ].map((row, i) => (
                  <tr key={row.feature} className={`border-b border-black/5 ${i % 2 === 0 ? '' : 'bg-black/[0.01]'}`}>
                    <td className="py-4 px-5 font-medium text-black">{row.feature}</td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                        <span className="text-green-500">{Icon.check}</span>
                        {row.bs}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center bg-black/[0.02]">
                      <span className="inline-flex items-center gap-2 text-black/50">
                        <span className="text-red-400">{Icon.x}</span>
                        {row.solo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl transition-all hover:-translate-y-0.5">
              Get Started {Icon.arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps + banners
          ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* How to Join banner */}
          <div className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-sm">
            <img src="/images/banner-howtojoin.png" alt="How to join BeautyShare Pro" className="w-full h-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
            {[
              { step: '01', title: 'Join & Get Set Up', desc: 'Sign up, get instant access to our premium hair catalog at wholesale prices, profit calculators, and the Hair Launch Academy.' },
              { step: '02', title: 'Set Prices & Sell', desc: 'Use our profit calculators to set your retail prices. Share your store link, run your marketing, and start making sales.' },
              { step: '03', title: 'We Ship, You Profit', desc: 'When a customer orders, we pick, pack, and ship it with YOUR branding. You collect the retail price, keep the profit.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-50 border border-orange/20 mb-6">
                  <span className="text-2xl font-extrabold brand-gradient-text">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Getting Started Banner */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg shadow-orange/10">
            <img src="/images/banner-getting-started.png" alt="Getting started with BeautyShare Pro membership" className="w-full h-auto" />
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange/20 hover:shadow-xl transition-all">
              Start Your Journey Today {Icon.arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EARNINGS BREAKDOWN
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-pink uppercase tracking-widest mb-4">The Math Doesn&apos;t Lie</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              See What <Cursive className="brand-gradient-text">Bosses Are Earning</Cursive>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { level: 'Side Hustle', orders: '10-15', monthly: '$800 — $1,500', desc: 'Selling to friends, family, and social followers on the side', tag: 'Part-Time', tagColor: 'bg-lavender/30 text-black' },
              { level: 'Growing Brand', orders: '30-50', monthly: '$3,000 — $5,000', desc: 'Running ads, building an email list, repeat customers', tag: 'Most Popular', tagColor: 'bg-orange text-white' },
              { level: 'Full-Time Boss', orders: '80-120', monthly: '$8,000 — $15,000+', desc: 'Multiple marketing channels, loyal clientele, brand partnerships', tag: 'Top Earners', tagColor: 'bg-pink text-white' },
            ].map((tier) => (
              <div key={tier.level} className={`rounded-2xl border p-8 text-center relative ${tier.level === 'Growing Brand' ? 'border-orange/30 bg-orange-50/30 shadow-xl shadow-orange/10 scale-105' : 'border-black/10 bg-white'}`}>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${tier.tagColor} mb-4`}>{tier.tag}</span>
                <h3 className="text-xl font-bold text-black">{tier.level}</h3>
                <div className="mt-4 text-3xl md:text-4xl font-extrabold brand-gradient-text">{tier.monthly}</div>
                <p className="text-sm text-black/40 mt-1">/month profit</p>
                <p className="text-sm text-black/60 mt-1">{tier.orders} orders/month</p>
                <p className="text-sm text-black/60 mt-4 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-black/40 mt-8 max-w-lg mx-auto">
            Based on average margins of $80-120 profit per order. Individual results vary based on pricing strategy, product mix, and marketing effort.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS / REVIEWS
          ═══════════════════════════════════════════════════════════ */}
      <section id="reviews" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Boss Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              Hear From Our <Cursive className="text-pink">Bosses</Cursive>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Jasmine T.', location: 'Atlanta, GA', quote: 'I went from selling hair out of my trunk to running a real online business. BeautyShare handled everything I was struggling with — inventory, shipping, even my website. I just focus on my clients now.', revenue: '$4,200/mo', image: '/images/model-curly-1.png' },
              { name: 'Keisha R.', location: 'Houston, TX', quote: 'The profit calculator alone was worth it. I realized I was undercharging by $40 per bundle! Within 2 months my margins went from 25% to 55% and I\'m actually making money now.', revenue: '$6,800/mo', image: '/images/model-straight-2.png' },
              { name: 'Diamond L.', location: 'Brooklyn, NY', quote: 'I was skeptical about the $149/month but the ROI is crazy. I made that back on my second order. Now I\'m doing $10K months and I never touch a single piece of hair. It just ships.', revenue: '$10,500/mo', image: '/images/model-curly-2.png' },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (<span key={i} className="text-gold">{Icon.star}</span>))}
                </div>
                <p className="text-sm text-black/70 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-black/5 pt-4">
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover border-2 border-orange/20" />
                    <div>
                      <div className="text-sm font-semibold text-black">{t.name}</div>
                      <div className="text-xs text-black/40">{t.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold brand-gradient-text">{t.revenue}</div>
                    <div className="text-xs text-black/40">avg. monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING — clean, no images
          ═══════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Simple Pricing</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              One Plan. <Cursive className="brand-gradient-text">Everything Included.</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-lg mx-auto text-lg">No hidden fees. No tiered nonsense. Every Boss gets the full platform.</p>
          </div>

          <div className="mx-auto max-w-lg">
            <div className="rounded-3xl border-2 border-orange/30 bg-white p-10 shadow-xl shadow-orange/10 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full brand-gradient-pink px-4 py-1.5 text-xs font-bold text-white shadow-lg">MOST POPULAR</div>
              <h3 className="text-xl font-bold text-black mt-2">BeautyShare Boss Plan</h3>
              <div className="mt-6 flex items-end justify-center gap-1">
                <span className="text-6xl font-extrabold text-black">$149</span>
                <span className="mb-2 text-black/40 font-medium">/month</span>
              </div>
              <p className="text-sm text-black/40 mt-1">+ $99 one-time setup fee</p>
              <div className="mt-8 space-y-3 text-left">
                {['Premium virgin hair at wholesale prices','Automated order fulfillment & shipping','One-click tracking upload','Profit & pricing calculators','Real-time sales dashboard & analytics','Customer CRM & reorder predictions','Access to Hair Launch Academy','Access to Boss Community & support','AI Marketing Copilot (coming soon)'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="text-orange">{Icon.check}</span>
                    <span className="text-sm text-black font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" className="mt-10 w-full inline-flex items-center justify-center gap-2 rounded-full brand-gradient-pink py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl transition-all hover:-translate-y-0.5">
                Become A BeautyShare Boss {Icon.arrow}
              </Link>
              <p className="text-xs text-black/40 mt-4">Cancel anytime. No long-term contracts.</p>
            </div>
          </div>

          {/* Store designs upsell */}
          <div className="mt-12 mx-auto max-w-2xl rounded-2xl border-2 border-orange/20 bg-orange-50/30 p-8 text-center">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-2">Need A Website?</p>
            <h3 className="text-xl md:text-2xl font-extrabold text-black mb-3">
              Semi-Custom Shopify Stores — <Cursive className="text-pink">Built For Hair</Cursive>
            </h3>
            <p className="text-black/60 mb-6 max-w-md mx-auto">
              Choose from professionally designed hair business templates, customize with Shopify&apos;s drag-and-drop editor, and launch in days. Available as a separate one-time purchase.
            </p>
            <Link href="/websites" className="inline-flex items-center gap-2 rounded-full border-2 border-orange px-6 py-3 text-sm font-bold text-orange hover:bg-orange hover:text-white transition-all">
              Browse Store Designs {Icon.arrow}
            </Link>
          </div>

          {/* ROI callout */}
          <div className="mt-10 mx-auto max-w-2xl rounded-2xl bg-black p-8 text-center text-white">
            <p className="text-sm font-semibold text-orange uppercase tracking-wide mb-2">Quick Math</p>
            <p className="text-2xl md:text-3xl font-bold">
              Sell just <span className="text-orange">2 bundles</span> and your monthly fee is covered.
            </p>
            <p className="text-white/60 mt-2">Average profit per bundle: $80+. Your subscription pays for itself with your first few sales.</p>
          </div>

          {/* Money-back guarantee */}
          <div className="mt-8 mx-auto max-w-md text-center">
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <span className="text-green-500">{Icon.shield}</span>
              <span className="text-sm font-semibold text-green-700">14-Day Money-Back Guarantee — Try risk-free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Got Questions?</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              Frequently Asked <Cursive className="brand-gradient-text">Questions</Cursive>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Do I need any experience to start?', a: 'Absolutely not! Most of our Bosses started with zero experience in the hair industry. We provide the products, the store, the tools, and the community support. You just need the drive to build your brand.' },
              { q: 'How much can I realistically make?', a: 'It depends on your effort. Our Bosses average $80-120 profit per order. Selling 10 orders/month = $800-1,200. Selling 50 orders/month = $4,000-6,000. Some top Bosses clear $10K+ monthly. We give you the tools to track every dollar.' },
              { q: 'What kind of hair do you carry?', a: '100% virgin human hair — Brazilian, Peruvian, Malaysian, and Indian origins. Textures include straight, body wave, deep wave, loose wave, curly, and kinky curly. Lengths from 10" to 30". Plus closures, frontals, and custom wigs.' },
              { q: 'Do customers know the hair comes from you?', a: 'No! That\'s the whole point. We ship in YOUR branded packaging with YOUR return label. Your customers think it comes directly from your business. White-label fulfillment is our specialty.' },
              { q: 'What if I want to cancel?', a: 'Cancel anytime — no long-term contracts, no cancellation fees. We believe in earning your business every month. Your store stays active through the end of your billing period.' },
              { q: 'How fast do orders ship?', a: 'Orders are processed within 1-2 business days and shipped via USPS Priority or UPS Ground. Most domestic orders arrive in 3-5 business days. You get tracking uploaded automatically.' },
              { q: 'Can I sell at my own prices?', a: 'Yes! You set your own retail prices. We only require a minimum advertised price (MAP) to protect brand value. Most Bosses price at 50-70% above wholesale, giving them healthy margins.' },
              { q: 'Is there a contract or commitment?', a: 'No contracts whatsoever. Pay month-to-month. If it\'s not for you, cancel in one click. We believe in earning your business every single month.' },
              { q: 'What makes this different from AliExpress dropshipping?', a: 'Quality and speed. Our hair is premium 100% virgin human hair stored in US-based warehouses. Orders ship in 1-2 days, not 2-4 weeks. Plus we offer semi-custom Shopify stores designed for hair businesses — not generic templates with 3-week shipping times.' },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-black/5 overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-black hover:text-orange transition-colors [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">{Icon.chevron}</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-black/60 leading-relaxed -mt-2">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA — branded start banner
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative">
          <img src="/images/startbanner.png" alt="Start your hair business today with BeautyShare Pro" className="w-full h-auto min-h-[300px] object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-5">
            <Link href="/signup" className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-pink shadow-2xl hover:-translate-y-1 transition-all">
              Get Started Now — $149/mo
              <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
            </Link>
            <p className="mt-4 text-sm text-white/80 font-medium">$99 setup fee &middot; Cancel anytime &middot; No contracts</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-black px-5 md:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <img src="/images/logo.png" alt="BeautyShare Pro" className="h-9 w-auto brightness-0 invert" />
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#why" className="hover:text-white transition-colors">Why BSP</a>
              <a href="#hair" className="hover:text-white transition-colors">Our Hair</a>
              <a href="#compare" className="hover:text-white transition-colors">Compare</a>
              <a href="#pricing" className="hover:text-white transition-colors">Plans</a>
              <Link href="/websites" className="hover:text-white transition-colors">Store Designs</Link>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <Link href="/education" className="hover:text-white transition-colors font-semibold">Education</Link>
              <Link href="/webinar" className="text-orange hover:text-white transition-colors font-semibold">Free Webinar</Link>
              <Link href="/login" className="hover:text-white transition-colors">Boss Login</Link>
            </div>
            <div className="flex gap-4 text-white/40">
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
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} BeautyShare Pro. All rights reserved. &middot;
            <a href="#" className="hover:text-white ml-1">Privacy Policy</a> &middot;
            <a href="#" className="hover:text-white ml-1">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

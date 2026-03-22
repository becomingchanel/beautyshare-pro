'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ================================================================
   MANE edit — Theme Preview / Showcase Page
   /websites/mane-edit
   ================================================================ */

const Cursive = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={className} style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{children}</span>
);

const Icon = {
  check: (<svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>),
  arrow: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>),
  back: (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>),
  palette: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>),
  image: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>),
  film: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" /></svg>),
  logo: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>),
  swatch: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>),
  type: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>),
  device: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>),
  sparkle: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>),
};

/* Page sections data */
const pages = [
  { id: 'home', label: 'Home', desc: 'Cinematic video hero, product grid, texture guide, testimonials, newsletter signup, and Instagram feed' },
  { id: 'shop', label: 'Shop', desc: 'Full product collection page with grid layout, filtering, and quick-view product cards' },
  { id: 'product', label: 'Product Detail', desc: 'Individual product page with image gallery, variant selector, reviews, and FAQ section' },
  { id: 'education', label: 'Education', desc: 'Hair care education hub with guides on raw hair maintenance, styling tips, and texture matching' },
  { id: 'about', label: 'About', desc: 'Brand story page with your mission, values, and founder story to build trust with customers' },
];

const sections = [
  { title: 'Cinematic Video Hero', desc: 'Full-screen video background with warm gradient overlay, serif headline, and dual CTA buttons. Sets an elevated, editorial tone immediately.', color: '#351D14' },
  { title: 'Trust Feature Strip', desc: 'Four-column bar highlighting key selling points — 100% Raw Hair, Ethically Sourced, Custom Bundles, and Expert Support.', color: '#7B98B5' },
  { title: 'Why Raw Hair Education', desc: 'Dark-background section with three info cards explaining raw hair benefits. Uses the deep brown palette with blue accents.', color: '#351D14' },
  { title: 'Curated Product Grid', desc: 'Three-column product cards with hover zoom, badges, pricing, and star ratings. Clean layout lets the hair photography shine.', color: '#FAFAF8' },
  { title: 'Match Your Texture Guide', desc: 'Interactive texture-matching section with wavy, wavy/curly, and curly bundles. Overlay labels and blend descriptions help customers choose.', color: '#483327' },
  { title: 'Editorial Video Banner', desc: 'Mid-page video banner with italic serif heading and call-to-action. Creates a visual break and reinforces the premium feel.', color: '#351D14' },
  { title: 'What Sets Us Apart', desc: 'Two-column layout with brand promise list — Ethically Sourced, True-to-Texture, Curated Selection, and Zero Processing guarantee.', color: '#F5F4F0' },
  { title: 'Customer Testimonials', desc: 'Three-column review cards with star ratings, customer quotes, and verified badges. Social proof that builds buyer confidence.', color: '#FFFFFF' },
  { title: 'Newsletter & Instagram', desc: 'Email signup with gradient background, plus a 5-column Instagram/UGC grid showcasing real customer photos and community content.', color: '#CCC6B8' },
];

const customizations = [
  { icon: 'image', title: 'Keep the Photos & Videos', desc: 'All the professional hair photography and hero videos shown in the demo are included with your theme. Use them as-is or swap in your own.' },
  { icon: 'logo', title: 'Upload Your Own Logo', desc: 'Replace the MANE edit logo with your own brand logo in seconds through the Shopify theme editor. Supports PNG, SVG, and JPEG.' },
  { icon: 'swatch', title: 'Change All Colors', desc: 'Every color in the theme — backgrounds, buttons, text, accents — is customizable through the Shopify settings panel. Match your brand perfectly.' },
  { icon: 'type', title: 'Edit All Text & Copy', desc: 'Headlines, descriptions, product names, button text — every word is editable. Write your own brand story and product descriptions.' },
  { icon: 'palette', title: 'Rearrange Sections', desc: 'Drag and drop sections in any order using Shopify\u2019s visual editor. Remove sections you don\u2019t need or duplicate ones you love.' },
  { icon: 'device', title: 'Mobile-Perfect Responsive', desc: 'The theme automatically adapts to phones, tablets, and desktops. Your customers get a beautiful experience on every device.' },
];

export default function ManeEditPreviewPage() {
  const [activeSection, setActiveSection] = useState(0);

  const iconMap: Record<string, React.ReactNode> = {
    image: Icon.image,
    logo: Icon.logo,
    swatch: Icon.swatch,
    type: Icon.type,
    palette: Icon.palette,
    device: Icon.device,
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="BeautyShare Pro" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <Link href="/#how-it-works" className="hover:text-orange transition-colors">How It Works</Link>
            <Link href="/#hair" className="hover:text-orange transition-colors">Our Hair</Link>
            <Link href="/#pricing" className="hover:text-orange transition-colors">Plans</Link>
            <Link href="/websites" className="text-orange font-semibold">Store Designs</Link>
            <Link href="/#faq" className="hover:text-orange transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-semibold text-black hover:text-orange transition-colors">Log In</Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange/20">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #351D14 0%, #483327 50%, #5E7A96 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(123,152,181,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,188,206,0.2) 0%, transparent 50%)' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/websites" className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm font-medium mb-8">
            {Icon.back} Back to All Themes
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-[#A8BCCE] mb-6">
                <span className="h-2 w-2 rounded-full bg-[#7B98B5] animate-pulse" />
                Shopify Theme
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                MANE <span style={{ fontWeight: 300, fontStyle: 'italic' }}>edit</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4">
                Warm earth tones meet muted blue accents for a refined, natural hair brand experience. An editorial yet approachable Shopify theme built for raw and textured hair businesses.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-2">
                  {['#351D14', '#7B98B5', '#FAFAF8', '#483327', '#CCC6B8'].map((c) => (
                    <span key={c} className="h-6 w-6 rounded-full border-2 border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-white/40 text-sm">|</span>
                <span className="text-white/60 text-sm">Cormorant Garamond + Work Sans</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-[#351D14] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#7B98B5' }}>
                  Get This Theme
                  <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
                </Link>
                <a href="#pages" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:border-white/60 transition-all">
                  Explore Pages
                </a>
              </div>
              <p className="mt-4 text-white/40 text-xs">Members only — sign up or log in to purchase</p>
            </div>

            {/* Browser mockup */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#e8e8e8] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-black/40 font-mono">yourbrand.myshopify.com</div>
              </div>
              <div className="bg-[#351D14] p-8 md:p-12 min-h-[380px] flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#7B98B5]/60">Your Raw Hair Destination</p>
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-[#FAFAF8]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Your Hair, <em style={{ fontWeight: 300 }}>Elevated</em>
                </h3>
                <p className="text-sm text-[#FAFAF8]/50 max-w-sm mb-6">Ethically sourced raw hair extensions and bundles, curated for natural beauty.</p>
                <div className="flex gap-3">
                  <span className="inline-block px-5 py-2.5 text-xs font-bold rounded text-[#351D14]" style={{ backgroundColor: '#7B98B5' }}>Shop the Edit</span>
                  <span className="inline-block px-5 py-2.5 text-xs font-bold rounded border border-white/30 text-white/70">Learn More</span>
                </div>
                <div className="mt-8 grid grid-cols-4 gap-3">
                  {['100% Raw Hair', 'Ethically Sourced', 'Custom Bundles', 'Expert Support'].map((t) => (
                    <div key={t} className="text-center py-2 border-t border-white/10">
                      <p className="text-[10px] text-[#FAFAF8]/40">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGES INCLUDED */}
      <section id="pages" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">5 Complete Pages</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              Every Page Your Store <Cursive className="text-pink">Needs</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              A complete Shopify store with Home, Shop, Product Detail, Education, and About pages — all professionally designed and ready to customize.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-8">
            {pages.map((page, i) => (
              <button key={page.id} onClick={() => setActiveSection(i)} className={`rounded-xl px-4 py-4 text-left transition-all border-2 ${activeSection === i ? 'border-[#7B98B5] bg-white shadow-lg' : 'border-transparent bg-white/60 hover:bg-white hover:shadow'}`}>
                <div className={`text-sm font-bold mb-1 ${activeSection === i ? 'text-[#351D14]' : 'text-black/50'}`}>{page.label}</div>
                <div className="text-xs text-black/40 leading-relaxed">{page.desc}</div>
              </button>
            ))}
          </div>

          {/* Active page preview mockup */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-black/5">
            <div className="bg-[#e8e8e8] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-black/40 font-mono">yourbrand.myshopify.com/{pages[activeSection].id === 'home' ? '' : pages[activeSection].id}</div>
            </div>
            <div className="p-6 md:p-10 min-h-[400px] bg-gradient-to-b from-[#FAFAF8] to-white">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#7B98B5]/10 px-4 py-1.5 text-sm font-semibold text-[#7B98B5] mb-4">{Icon.sparkle} {pages[activeSection].label} Page</span>
                <h3 className="text-2xl font-bold text-[#351D14]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{pages[activeSection].label}</h3>
                <p className="mt-2 text-sm text-[#75604B] max-w-lg mx-auto">{pages[activeSection].desc}</p>
              </div>
              {/* Simulated page content blocks */}
              <div className="space-y-4 max-w-3xl mx-auto">
                {[1,2,3].map(i => (
                  <div key={i} className="rounded-xl overflow-hidden border border-[#351D14]/5">
                    <div className={`h-32 ${i === 1 ? 'bg-[#351D14]' : i === 2 ? 'bg-[#FAFAF8]' : 'bg-[#F5F4F0]'} flex items-center justify-center`}>
                      <div className="text-center px-8">
                        <div className={`h-3 w-32 rounded-full mx-auto mb-3 ${i === 1 ? 'bg-[#7B98B5]/40' : 'bg-[#351D14]/10'}`} />
                        <div className={`h-2 w-48 rounded-full mx-auto mb-2 ${i === 1 ? 'bg-white/20' : 'bg-[#351D14]/5'}`} />
                        <div className={`h-2 w-40 rounded-full mx-auto ${i === 1 ? 'bg-white/15' : 'bg-[#351D14]/5'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION-BY-SECTION TOUR */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#7B98B5] uppercase tracking-widest mb-4">Section by Section</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              9+ Customizable <Cursive className="brand-gradient-text">Sections</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              Drag, drop, rearrange, or remove. Every section is built on Shopify Online Store 2.0.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="h-3" style={{ backgroundColor: s.color === '#FAFAF8' || s.color === '#F5F4F0' || s.color === '#FFFFFF' ? '#7B98B5' : s.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#7B98B5' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h4 className="text-lg font-bold text-[#351D14]">{s.title}</h4>
                  </div>
                  <p className="text-sm text-black/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION FEATURES */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Make It Yours</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              Fully <Cursive className="text-pink">Customizable</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              This is your store. Change everything — or keep it exactly as-is. No coding needed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {customizations.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl mb-5 text-[#7B98B5]" style={{ backgroundColor: 'rgba(123,152,181,0.1)' }}>
                  {iconMap[c.icon]}
                </div>
                <h4 className="text-lg font-bold text-[#351D14] mb-3">{c.title}</h4>
                <p className="text-sm text-black/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THEME SPECS */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Platform', value: 'Shopify 2.0' },
              { label: 'Pages', value: '5 Complete' },
              { label: 'Sections', value: '12+ Sections' },
              { label: 'Fonts', value: 'Cormorant + Work Sans' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extrabold text-[#351D14] mb-1">{s.value}</p>
                <p className="text-sm text-black/40 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #351D14 0%, #483327 100%)' }}>
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Ready to Launch with <span style={{ color: '#7B98B5' }}>MANE edit</span>?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Sign up for BeautyShare Pro to unlock this theme and start building your premium hair brand today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-bold text-[#351D14] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#7B98B5' }}>
              Sign Up & Get This Theme
              <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white hover:border-white/60 transition-all">
              Log In to Purchase
            </Link>
          </div>
          <p className="mt-6 text-white/30 text-sm">Members-only access — join to unlock all store themes</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 text-center">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/websites" className="text-white/60 hover:text-white text-sm font-medium transition-colors">← Back to All Store Designs</Link>
          <p className="mt-4 text-white/30 text-xs">© 2026 BeautyShare Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

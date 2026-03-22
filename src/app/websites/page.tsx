'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ================================================================
   BeautyShare Pro Ã¢ÂÂ Semi-Custom Shopify Store Designs
   /websites showcase page
   Brand Colors: #FA6A27 (orange), hsl(var(--primary)) (pink), #DCBDEF (lavender),
                 hsl(var(--highlight)) (gold), hsl(var(--foreground)), hsl(var(--background))
   ================================================================ */

/* Ã¢ÂÂÃ¢ÂÂ Cursive accent helper Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */
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

/* Ã¢ÂÂÃ¢ÂÂ SVG Icons Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */
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
  palette: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  cursor: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
    </svg>
  ),
  bolt: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  device: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  cart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  sparkle: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

/* Ã¢ÂÂÃ¢ÂÂ Theme data Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */
const themes = [
  {
    id: 'mane-edit',
    name: 'MANE edit',
    tagline: 'Warm / Elevated Natural',
    description:
      'Warm earth tones meet muted blue accents for a refined, natural hair brand experience. Cormorant Garamond serif headlines with Work Sans body text create an editorial yet approachable feel \u2014 perfect for raw and textured hair.',
    colors: { bg: '#351D14', accent: '#7B98B5', text: '#FAFAF8' },
    fonts: 'Cormorant Garamond + Work Sans',
    features: [
      'Cinematic video hero with warm gradient overlay',
      'Elegant serif/sans-serif typographic pairing',
      'Muted blue accent buttons and eyebrow text',
      'Warm earth-tone palette with cream backgrounds',
    ],
    bestFor: 'Raw hair brands, textured hair, natural hair extensions, curated hair boutiques',
    gradient: 'from-[#351D14] to-[#483327]',
    accentColor: '#7B98B5',
    previewBg: 'bg-[#351D14]',
    previewText: 'text-[#FAFAF8]',
    previewAccent: 'text-[#7B98B5]',
  },
  {
    id: 'vibe-hair-co',
    name: 'Vibe Hair Co',
    tagline: 'Bold / Street Style',
    description:
      'Vibrant pink and purple energy for bold entrepreneurs who want their brand to pop. Oversized Bebas Neue headings with Poppins body text deliver that street-chic confidence.',
    colors: { bg: 'hsl(var(--background))', accent: 'hsl(var(--primary))', text: 'hsl(var(--foreground))' },
    fonts: 'Bebas Neue + Poppins',
    features: [
      'Bold uppercase display headings',
      'Vibrant pink-to-purple gradient accents',
      'High-contrast cards with rounded corners',
      'Energetic hover animations',
    ],
    bestFor: 'Young audiences, social-media-first brands, trend-driven styles',
    gradient: 'from-[hsl(var(--primary))] to-[#DCBDEF]',
    accentColor: 'hsl(var(--primary))',
    previewBg: 'bg-white',
    previewText: 'text-[hsl(var(--foreground))]',
    previewAccent: 'text-[hsl(var(--primary))]',
  },
  {
    id: 'blossom-beauty',
    name: 'Blossom Beauty',
    tagline: 'Soft / Feminine',
    description:
      'Warm blush tones and rose gold accents for a soft, inviting brand feel. Playfair Display italic headlines paired with Lato create an effortlessly pretty and trustworthy store.',
    colors: { bg: 'hsl(var(--background))', accent: 'hsl(var(--primary))', text: 'hsl(var(--foreground))' },
    fonts: 'Playfair Display + Lato',
    features: [
      'Warm blush/rose background tones',
      'Elegant rose gold accent details',
      'Italic serif headings for a personal touch',
      'Subtle rounded elements throughout',
    ],
    bestFor: 'Bridal hair, natural hair, everyday glam, beauty salon brands',
    gradient: 'from-[hsl(var(--primary))] to-[hsl(var(--background))]',
    accentColor: 'hsl(var(--primary))',
    previewBg: 'bg-[hsl(var(--background))]',
    previewText: 'text-[hsl(var(--foreground))]',
    previewAccent: 'text-[hsl(var(--primary))]',
  },
  {
    id: 'pure-strand',
    name: 'Pure Strand',
    tagline: 'Clean / Minimalist',
    description:
      'Crisp white space with refined black typography and a gold accent. Inter\'s clean lines throughout create a modern, editorial feel that lets your product photography shine.',
    colors: { bg: 'hsl(var(--background))', accent: 'hsl(var(--highlight))', text: 'hsl(var(--foreground))' },
    fonts: 'Inter (all weights)',
    features: [
      'Maximum white space for editorial feel',
      'Sharp black typography with gold details',
      'Grid-based layouts for product focus',
      'Minimal UI Ã¢ÂÂ the hair is the hero',
    ],
    bestFor: 'Product-focused brands, wholesale storefronts, clean aesthetics',
    gradient: 'from-[hsl(var(--foreground))] to-[hsl(var(--foreground))]',
    accentColor: 'hsl(var(--highlight))',
    previewBg: 'bg-white',
    previewText: 'text-[hsl(var(--foreground))]',
    previewAccent: 'text-[hsl(var(--highlight))]',
  },
];

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function WebsitesPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          NAVIGATION (matches main site)
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
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
            <span className="text-orange font-semibold">Store Designs</span>
            <Link href="/#faq" className="hover:text-orange transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-semibold text-black hover:text-orange transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full brand-gradient-pink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          HERO
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lavender/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 border border-pink/20 px-4 py-1.5 text-sm font-semibold text-pink mb-8">
            <span className="h-2 w-2 rounded-full bg-pink animate-pulse" />
            Semi-Custom Shopify Stores
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.1] max-w-4xl mx-auto">
            Your Brand.{' '}
            <Cursive className="text-pink">Your Design.</Cursive>
            <br />
            <span className="brand-gradient-text">Ready to Sell.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-black/60 leading-relaxed">
            Choose from 4 professionally designed Shopify hair store themes.
            Upload to Shopify, customize with drag-and-drop, and launch your branded store in days Ã¢ÂÂ no coding required.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#themes" className="group inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl hover:shadow-orange/30 transition-all hover:-translate-y-0.5">
              Browse Themes
              <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
            </a>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border-2 border-black/10 bg-white px-8 py-4 text-base font-semibold text-black hover:border-pink/40 hover:text-pink transition-all">
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          HOW IT WORKS Ã¢ÂÂ 3-step process
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section id="how" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Simple Process</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              From Theme to{' '}
              <Cursive className="text-pink">Live Store</Cursive>
              {' '}in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Pick Your Design', desc: 'Browse our collection of 4 professionally designed hair business themes. Each one is fully coded and ready for Shopify.', icon: Icon.palette },
              { step: '02', title: 'Customize with Drag & Drop', desc: 'Upload the theme to Shopify and use the built-in theme editor to change colors, text, images, and layout Ã¢ÂÂ zero coding needed.', icon: Icon.cursor },
              { step: '03', title: 'Launch & Start Selling', desc: 'Connect your products, set your prices, and go live. Your professional store is ready to take orders from day one.', icon: Icon.bolt },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-50 border border-orange/20 mb-6 text-orange">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-orange mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          THEME SHOWCASE Ã¢ÂÂ 4 themes
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section id="themes" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-pink uppercase tracking-widest mb-4">Theme Collection</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              4 Designs. <Cursive className="brand-gradient-text">Endless Possibilities.</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              Each theme is a complete Shopify Online Store 2.0 theme Ã¢ÂÂ fully coded with 12+ customizable sections.
            </p>
          </div>

          <div className="space-y-20">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  index % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Theme preview card */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                  onClick={() => setActiveTheme(activeTheme === theme.id ? null : theme.id)}
                >
                  {/* Simulated browser chrome */}
                  <div className="bg-[#e8e8e8] px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-black/40 font-mono">
                      yourstore.myshopify.com
                    </div>
                  </div>

                  {/* Theme preview area */}
                  <div className={`${theme.previewBg} p-8 md:p-12 min-h-[340px] flex flex-col justify-center transition-all duration-500 group-hover:scale-[1.01]`}>
                    {/* Simulated hero section */}
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-50" style={{ color: theme.colors.accent }}>
                        {theme.tagline}
                      </p>
                      <h3
                        className={`text-3xl md:text-4xl font-extrabold mb-3 ${theme.previewText}`}
                        style={theme.id === 'mane-edit' ? { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, letterSpacing: '0.02em' } : theme.id === 'blossom-beauty' ? { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' } : theme.id === 'vibe-hair-co' ? { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' } : {}}
                      >
                        {theme.name}
                      </h3>
                      <p className={`text-sm opacity-60 max-w-sm ${theme.previewText}`}>
                        Premium hair extensions Ã¢ÂÂ discover your perfect look with our curated collection.
                      </p>
                    </div>
                    {/* Simulated CTA button */}
                    <div>
                      <span
                        className="inline-block px-6 py-3 text-sm font-bold rounded-full"
                        style={{
                          backgroundColor: theme.colors.accent,
                          color: theme.id === 'mane-edit' ? '#351D14' : 'hsl(var(--background))',
                          borderRadius: theme.id === 'pure-strand' ? '0' : theme.id === 'blossom-beauty' ? '9999px' : '9999px',
                        }}
                      >
                        Shop Now
                      </span>
                    </div>
                    {/* Color swatches */}
                    <div className="mt-8 flex items-center gap-3">
                      <span className="text-xs opacity-40" style={{ color: theme.colors.text }}>Colors:</span>
                      {Object.values(theme.colors).map((c, i) => (
                        <span key={i} className="h-5 w-5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Theme info */}
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white mb-6"
                    style={{ background: `linear-gradient(135deg, ${theme.accentColor}, ${theme.accentColor}dd)` }}
                  >
                    {theme.tagline}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                    {theme.name}
                  </h3>
                  <p className="text-black/60 leading-relaxed mb-6 text-lg">
                    {theme.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-3">What&apos;s Included</p>
                    <div className="space-y-2.5">
                      {theme.features.map((f) => (
                        <div key={f} className="flex items-center gap-3">
                          <span className="text-green-500">{Icon.check}</span>
                          <span className="text-sm text-black/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8 text-sm text-black/50">
                    <span><strong className="text-black">Fonts:</strong> {theme.fonts}</span>
                  </div>

                  <div className="bg-black/[0.03] rounded-xl p-4 mb-8">
                    <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Best For</p>
                    <p className="text-sm text-black/60">{theme.bestFor}</p>
                  </div>

                  <Link
                    href={`/websites/${theme.id}`}
                    className="group inline-flex items-center gap-2 rounded-full brand-gradient-pink px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  >
                    Get This Theme
                    <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          WHAT'S IN EVERY THEME
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Every Theme Includes</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
              Built for <Cursive className="text-pink">Hair Entrepreneurs</Cursive>
            </h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">
              Each theme is a complete Shopify Online Store 2.0 theme with everything you need to sell hair online.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Icon.palette, title: '12+ Customizable Sections', desc: 'Hero banners, featured collections, testimonials, newsletter signups, rich text, image galleries, and more Ã¢ÂÂ all drag-and-drop.' },
              { icon: Icon.cursor, title: 'Shopify Drag & Drop Ready', desc: 'Built on Online Store 2.0 architecture. Customize every section in Shopify\'s visual editor without touching code.' },
              { icon: Icon.device, title: 'Mobile-First Responsive', desc: 'Every theme looks stunning on phones, tablets, and desktops. Your customers shop from everywhere.' },
              { icon: Icon.cart, title: 'Full Shopping Experience', desc: 'Product pages, collection pages, cart, and all the pages you need for a complete online store.' },
              { icon: Icon.sparkle, title: 'On-Brand Typography', desc: 'Each theme ships with a curated Google Fonts pairing. Serif meets sans-serif for a premium feel.' },
              { icon: Icon.bolt, title: 'Performance Optimized', desc: 'Clean, lightweight code that loads fast. No bloat, no unnecessary scripts Ã¢ÂÂ just what you need.' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-6 rounded-2xl hover:bg-white transition-colors">
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

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          FAQ
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Store Design FAQ</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black">
              Common <Cursive className="brand-gradient-text">Questions</Cursive>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Do I need to know how to code?', a: 'Not at all! Each theme is a complete Shopify theme that you upload to your store. Then you use Shopify\'s built-in drag-and-drop theme editor to customize everything Ã¢ÂÂ colors, text, images, layout. It\'s completely visual, no coding required.' },
              { q: 'How do I install the theme?', a: 'Download the .zip file, go to your Shopify admin Ã¢ÂÂ Online Store Ã¢ÂÂ Themes Ã¢ÂÂ Add Theme Ã¢ÂÂ Upload ZIP file. That\'s it! Shopify will install it automatically and you can start customizing right away.' },
              { q: 'Can I change the colors and fonts?', a: 'Yes! Every theme has a settings panel in the Shopify theme editor where you can change all colors, font sizes, and styling. The font pairings are loaded via Google Fonts, so they\'re free and look great.' },
              { q: 'Is the store theme included in the membership?', a: 'The store themes are a separate one-time purchase, not included in the $149/month membership. This gives you full ownership of your website design Ã¢ÂÂ it\'s yours to keep forever, even if you cancel the membership.' },
              { q: 'What Shopify plan do I need?', a: 'Any Shopify plan works Ã¢ÂÂ including Shopify Basic ($39/mo). All themes use Shopify Online Store 2.0, which is supported on every Shopify plan.' },
              { q: 'Can I switch themes later?', a: 'Absolutely. If you purchase multiple themes, you can switch between them at any time from your Shopify admin. Your products and content stay the same.' },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl bg-[#FFF8F3] border border-black/5 overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-black hover:text-orange transition-colors [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">
                    <svg className="h-5 w-5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-black/60 leading-relaxed -mt-2">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          FINAL CTA
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <section className="py-20 md:py-28 bg-black">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to Launch Your{' '}
            <Cursive className="text-orange">Hair Store?</Cursive>
          </h2>
          <p className="mt-6 text-white/60 max-w-lg mx-auto text-lg leading-relaxed">
            Pick a theme, customize it in minutes, and start selling premium hair under your own brand. It&apos;s that simple.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#themes" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black hover:-translate-y-0.5 transition-all shadow-xl">
              Choose Your Theme
              <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span>
            </a>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold text-white hover:border-white/40 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
          FOOTER (matches main site)
          Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <footer className="bg-black px-5 md:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <img src="/images/logo.png" alt="BeautyShare Pro" className="h-9 w-auto brightness-0 invert" />
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/#hair" className="hover:text-white transition-colors">Our Hair</Link>
              <Link href="/#pricing" className="hover:text-white transition-colors">Plans</Link>
              <span className="text-white">Store Designs</span>
              <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
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

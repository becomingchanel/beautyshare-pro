'use client';

import Link from 'next/link';
import { useState } from 'react';

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
const pages = [
  { id: 'home', label: 'Home', desc: 'Cinematic video hero, product grid, texture guide, testimonials, newsletter signup, and Instagram feed' },
  { id: 'shop', label: 'Shop', desc: 'Full product collection page with grid layout, filtering, and quick-view product cards' },
  { id: 'product', label: 'Product Detail', desc: 'Individual product page with image gallery, variant selector, reviews, and FAQ section' },
  { id: 'education', label: 'Education', desc: 'Hair care education hub with guides on raw hair maintenance, styling tips, and texture matching' },
  { id: 'about', label: 'About', desc: 'Brand story page with your mission, values, and founder story to build trust with customers' },
];

const sections = [
  { title: 'Cinematic Video Hero', desc: 'Full-screen video background with warm gradient overlay, serif headline, and dual CTA buttons.', color: '#351D14' },
  { title: 'Trust Feature Strip', desc: 'Four-column bar highlighting key selling points \u2014 Raw Hair, Ethically Sourced, Custom Bundles, Expert Support.', color: '#7B98B5' },
  { title: 'Why Raw Hair Education', desc: 'Dark-background section with three info cards explaining raw hair benefits with blue accents.', color: '#351D14' },
  { title: 'Curated Product Grid', desc: 'Three-column product cards with hover zoom, badges, pricing, and star ratings.', color: '#FAFAF8' },
  { title: 'Match Your Texture Guide', desc: 'Interactive texture-matching section with wavy, wavy/curly, and curly bundles.', color: '#483327' },
  { title: 'Editorial Video Banner', desc: 'Mid-page video banner with italic serif heading and call-to-action.', color: '#351D14' },
  { title: 'What Sets Us Apart', desc: 'Two-column layout with brand promise list and quality guarantees.', color: '#F5F4F0' },
  { title: 'Customer Testimonials', desc: 'Three-column review cards with star ratings, customer quotes, and verified badges.', color: '#FFFFFF' },
  { title: 'Newsletter & Instagram', desc: 'Email signup with gradient background, plus a 5-column Instagram/UGC grid.', color: '#CCC6B8' },
];

const customizations = [
  { icon: 'image', title: 'Keep the Photos & Videos', desc: 'All the professional hair photography and hero videos shown in the demo are included with your theme. Use them as-is or swap in your own.' },
  { icon: 'logo', title: 'Upload Your Own Logo', desc: 'Replace the MANE edit logo with your own brand logo in seconds through the Shopify theme editor. Supports PNG, SVG, and JPEG.' },
  { icon: 'swatch', title: 'Change All Colors', desc: 'Every color in the theme is customizable through the Shopify settings panel. Match your brand perfectly.' },
  { icon: 'type', title: 'Edit All Text & Copy', desc: 'Headlines, descriptions, product names, button text \u2014 every word is editable. Write your own brand story.' },
  { icon: 'palette', title: 'Rearrange Sections', desc: 'Drag and drop sections in any order using Shopify\u2019s visual editor. Remove or duplicate sections freely.' },
  { icon: 'device', title: 'Mobile-Perfect Responsive', desc: 'The theme automatically adapts to phones, tablets, and desktops. Beautiful on every device.' },
];
const MiniCard = ({ name, price, badge, bg }: { name: string; price: string; badge: string; bg: string }) => (
  <div style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.04)' }}>
    <div style={{ aspectRatio: '3/4', background: bg, position: 'relative' }}>
      <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#7B98B5', color: '#fff', fontSize: '4.5px', fontWeight: 600, padding: '2px 5px', borderRadius: '1px', letterSpacing: '.06em', textTransform: 'uppercase' as const }}>{badge}</span>
    </div>
    <div style={{ padding: '6px 8px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#351D14', marginBottom: '2px' }}>{name}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#351D14' }}>{price} <span style={{ fontSize: '6px', fontWeight: 400, color: '#75604B' }}>&amp; up</span></div>
      <div style={{ fontSize: '5px', color: '#7B98B5', marginTop: '2px' }}>\u2605\u2605\u2605\u2605\u2605</div>
    </div>
  </div>
);

const PreviewHeader = ({ activePage }: { activePage: string }) => (
  <>
    <div style={{ background: '#351D14', color: 'rgba(255,255,255,.85)', textAlign: 'center' as const, padding: '5px 8px', fontSize: '6px', letterSpacing: '.12em', textTransform: 'uppercase' as const }}>
      Free Shipping on Orders $350+ \u25c6 Raw Hair Only \u25c6 Ships in 24hrs
    </div>
    <div style={{ background: 'rgba(250,250,248,.95)', borderBottom: '1px solid rgba(0,0,0,.04)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#351D14' }}>MANE <em style={{ fontWeight: 300 }}>edit</em></span>
      <div style={{ display: 'flex', gap: '12px', fontSize: '6.5px', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#75604B' }}>
        {['home', 'shop', 'education', 'about'].map(p => (
          <span key={p} style={activePage === p ? { color: '#351D14', borderBottom: '1px solid #7B98B5', paddingBottom: '2px' } : {}}>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '6.5px', color: '#75604B' }}>Cart (0)</span>
        <span style={{ fontSize: '6px', padding: '3px 10px', background: '#7B98B5', color: '#fff', borderRadius: '2px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const }}>Shop Now</span>
      </div>
    </div>
  </>
);

const PreviewFooter = () => (
  <div style={{ background: '#351D14', padding: '14px 16px', color: 'rgba(255,255,255,.5)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '11px', fontWeight: 500, color: '#fff', marginBottom: '3px' }}>MANE <em style={{ fontWeight: 300 }}>edit</em></div>
        <div style={{ fontSize: '5px', maxWidth: '120px', lineHeight: 1.6 }}>Editorially curated raw hair extensions. Single-donor, unprocessed.</div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['Shop', 'Learn', 'Connect'].map(h => (
          <div key={h}>
            <div style={{ fontSize: '5px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.35)', marginBottom: '4px' }}>{h}</div>
            <div style={{ fontSize: '5px', lineHeight: 2, color: 'rgba(255,255,255,.5)' }}>All Textures<br />Raw Wavy<br />Raw Curly</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ textAlign: 'center' as const, marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,.08)', fontSize: '5px', color: 'rgba(255,255,255,.3)' }}>\u00a9 2026 MANE edit. All rights reserved. Powered by BeautyShare Pro</div>
  </div>
);
const HomePreview = () => (
  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', lineHeight: 1.5, color: '#483327', background: '#FAFAF8' }}>
    <PreviewHeader activePage="home" />
    <div style={{ background: 'linear-gradient(135deg, rgba(53,29,20,.75), rgba(72,51,39,.55), rgba(123,152,181,.2))', padding: '44px 24px', minHeight: '180px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
      <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.6)', marginBottom: '6px' }}>100% Raw Hair Extensions</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.15 }}>Your Hair, <em style={{ fontWeight: 300, color: '#A8BCCE' }}>Elevated</em></div>
      <div style={{ fontSize: '7px', color: 'rgba(255,255,255,.65)', maxWidth: '260px', marginBottom: '14px', lineHeight: 1.7 }}>Editorially curated raw hair extensions. Single-donor, unprocessed, and crafted to last years.</div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <span style={{ padding: '5px 14px', fontSize: '5.5px', fontWeight: 600, background: '#7B98B5', color: '#fff', borderRadius: '2px', letterSpacing: '.08em', textTransform: 'uppercase' as const }}>Shop the Edit</span>
        <span style={{ padding: '5px 14px', fontSize: '5.5px', fontWeight: 600, border: '1px solid rgba(255,255,255,.4)', color: 'rgba(255,255,255,.7)', borderRadius: '2px', letterSpacing: '.08em', textTransform: 'uppercase' as const }}>Learn About Raw Hair</span>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
      {['Raw & Unprocessed', 'Ships in 24 Hours', 'Lasts 3\u20135 Years', 'Cuticle Aligned'].map((t, i) => (
        <div key={i} style={{ textAlign: 'center' as const, padding: '8px 4px', borderRight: i < 3 ? '1px solid rgba(0,0,0,.06)' : 'none' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '7px', fontWeight: 500, color: '#351D14' }}>{t}</div>
          <div style={{ fontSize: '5px', color: '#75604B' }}>Quality guaranteed</div>
        </div>
      ))}
    </div>
    <div style={{ background: '#351D14', padding: '20px 16px' }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '12px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#A8BCCE', marginBottom: '4px' }}>The Raw Difference</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: '#fff' }}>Why <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Raw Hair</em>?</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {[{ n: '01', t: 'Zero Processing' }, { n: '02', t: 'Single Donor' }, { n: '03', t: '3\u20135 Year Lifespan' }].map(c => (
          <div key={c.n} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '4px', padding: '10px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', fontWeight: 300, color: '#A8BCCE', marginBottom: '4px' }}>{c.n}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{c.t}</div>
            <div style={{ fontSize: '5.5px', color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>Premium quality raw hair that stands the test of time.</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: '20px 16px' }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '12px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>The Edit</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: '#351D14' }}>Curated <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Raw Textures</em></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <MiniCard name="Raw Wavy Bundle" price="$165" badge="Best Seller" bg="linear-gradient(135deg, #D1D1CC, #CCC6B8)" />
        <MiniCard name="Raw Wavy / Curly" price="$175" badge="Sells Out Fast" bg="linear-gradient(135deg, #CCC6B8, #DACDBE)" />
        <MiniCard name="Raw Curly Bundle" price="$185" badge="Limited Batch" bg="linear-gradient(135deg, #DACDBE, #D1D1CC)" />
      </div>
    </div>
    <div style={{ padding: '16px', background: '#fff' }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '10px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Find Your Texture</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14' }}>Match Your <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Natural Pattern</em></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        {[{ name: 'Raw Wavy', pattern: 'Loose S-wave' }, { name: 'Raw Wavy / Curly', pattern: 'Defined S-pattern' }, { name: 'Raw Curly', pattern: '3B\u20133C curl' }].map((t, i) => (
          <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.06)' }}>
            <div style={{ aspectRatio: '1', background: ['#D1D1CC', '#CCC6B8', '#DACDBE'][i], position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', padding: '8px', background: 'linear-gradient(transparent, rgba(53,29,20,.65))' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: '5px', color: 'rgba(255,255,255,.7)' }}>{t.pattern}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: '16px', background: '#FAFAF8' }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '10px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Real Reviews</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14' }}>What Our Clients <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Say</em></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        {[{ q: '\u201cNothing compares. Month 8 and still brand new.\u201d', a: 'Jasmine R.' }, { q: '\u201cBlends so seamlessly with my natural 3C hair.\u201d', a: 'Diamond T.' }, { q: '\u201cThird time ordering. Handles everything.\u201d', a: 'Mia K.' }].map((r, i) => (
          <div key={i} style={{ background: '#F5F4F0', borderRadius: '4px', padding: '8px' }}>
            <div style={{ color: '#7B98B5', fontSize: '6px', marginBottom: '4px' }}>\u2605\u2605\u2605\u2605\u2605</div>
            <div style={{ fontSize: '5.5px', color: '#483327', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '4px' }}>{r.q}</div>
            <div style={{ fontSize: '5px', fontWeight: 600, color: '#351D14' }}>{r.a}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ background: 'linear-gradient(135deg, #D1D1CC, #DACDBE)', padding: '16px', textAlign: 'center' as const }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14', marginBottom: '4px' }}>Join the <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Edit</em></div>
      <div style={{ fontSize: '6px', color: '#75604B', marginBottom: '8px' }}>Get early access to new drops and exclusive offers.</div>
      <div style={{ display: 'flex', maxWidth: '200px', margin: '0 auto', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
        <div style={{ flex: 1, padding: '5px 8px', background: '#fff', fontSize: '6px', color: 'rgba(0,0,0,.3)' }}>Enter your email</div>
        <div style={{ padding: '5px 10px', background: '#7B98B5', color: '#fff', fontSize: '5.5px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const }}>Subscribe</div>
      </div>
    </div>
    <div style={{ padding: '12px 16px', background: '#F5F4F0' }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '8px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '3px' }}>As Seen On</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '11px', color: '#351D14' }}>The <em style={{ fontWeight: 600, fontStyle: 'italic' }}>#MANEedit</em> Community</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '3px' }}>
        {['#D1D1CC', '#CCC6B8', '#DACDBE', '#D1D1CC', '#CCC6B8'].map((c, i) => (
          <div key={i} style={{ aspectRatio: '1', background: c, borderRadius: '2px' }} />
        ))}
      </div>
    </div>
    <PreviewFooter />
  </div>
);
const ShopPreview = () => (
  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', lineHeight: 1.5, color: '#483327', background: '#FAFAF8' }}>
    <PreviewHeader activePage="shop" />
    <div style={{ background: 'linear-gradient(135deg, #D1D1CC, #DACDBE)', textAlign: 'center' as const, padding: '28px 16px 22px' }}>
      <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>The Collection</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', fontWeight: 400, color: '#351D14', marginBottom: '4px' }}>Raw Hair Extensions</div>
      <div style={{ fontSize: '6.5px', color: '#75604B' }}>Editorially curated, single-donor, unprocessed raw hair</div>
    </div>
    <div style={{ padding: '20px 16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <MiniCard name="Raw Wavy Bundle" price="$165" badge="Best Seller" bg="linear-gradient(135deg, #D1D1CC, #CCC6B8)" />
        <MiniCard name="Raw Wavy / Curly" price="$175" badge="Sells Out Fast" bg="linear-gradient(135deg, #CCC6B8, #DACDBE)" />
        <MiniCard name="Raw Curly Bundle" price="$185" badge="Limited Batch" bg="linear-gradient(135deg, #DACDBE, #D1D1CC)" />
      </div>
    </div>
    <div style={{ padding: '16px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' as const }}>
        {['100% Raw', 'Single Donor', '3\u20135 Year Lifespan', '24hr Shipping'].map((t, i) => (
          <div key={i} style={{ padding: '8px 4px' }}>
            <div style={{ fontSize: '8px', color: '#7B98B5', marginBottom: '3px' }}>\u25c7</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '7px', fontWeight: 500, color: '#351D14', marginBottom: '2px' }}>{t}</div>
            <div style={{ fontSize: '5px', color: '#75604B' }}>Guaranteed</div>
          </div>
        ))}
      </div>
    </div>
    <PreviewFooter />
  </div>
);
const ProductPreview = () => (
  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', lineHeight: 1.5, color: '#483327', background: '#FAFAF8' }}>
    <PreviewHeader activePage="shop" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px' }}>
      <div><div style={{ aspectRatio: '3/4', background: 'linear-gradient(135deg, #D1D1CC, #CCC6B8)', borderRadius: '4px' }} /></div>
      <div style={{ paddingTop: '4px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Raw Hair</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', fontWeight: 400, color: '#351D14', marginBottom: '4px', lineHeight: 1.2 }}>Raw Wavy Bundle</div>
        <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#75604B', marginBottom: '6px' }}>\u201cEffortless movement, timeless glamour.\u201d</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <span style={{ color: '#7B98B5', fontSize: '6px' }}>\u2605\u2605\u2605\u2605\u2605</span>
          <span style={{ fontSize: '5.5px', color: '#75604B' }}>189 verified reviews</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 6px', background: 'rgba(123,152,181,.06)', borderRadius: '2px', marginBottom: '5px', fontSize: '5.5px' }}>
          <div style={{ display: 'flex' }}>
            {['J', 'M', 'D'].map((l, i) => (
              <span key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#7B98B5', border: '1px solid #fff', marginLeft: i > 0 ? '-4px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4px', color: '#fff', fontWeight: 600 }}>{l}</span>
            ))}
          </div>
          <span style={{ color: '#75604B' }}><strong style={{ color: '#351D14' }}>47 people</strong> purchased recently</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', fontWeight: 600, color: '#351D14', marginBottom: '4px' }}>$165</div>
        <div style={{ fontSize: '5px', color: '#75604B', marginBottom: '8px' }}>or 4 payments of $41.25 with afterpay</div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: '#483327', marginBottom: '4px' }}>Select Length</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '3px' }}>
            {['14\u2033', '16\u2033', '18\u2033', '20\u2033', '22\u2033', '24\u2033', '26\u2033', '28\u2033'].map((l, i) => (
              <span key={l} style={{ padding: '3px 7px', border: i === 0 ? '1px solid #7B98B5' : '1px solid rgba(0,0,0,.12)', borderRadius: '2px', fontSize: '5.5px', fontWeight: 500, background: i === 0 ? '#7B98B5' : '#fff', color: i === 0 ? '#fff' : '#483327' }}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#7B98B5', color: '#fff', textAlign: 'center' as const, padding: '7px', borderRadius: '2px', fontSize: '6px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>Add to Cart \u2014 $495</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          {['Free Shipping', 'Secure Checkout', '7-Day Returns', 'Authentic Raw'].map(b => (
            <div key={b} style={{ textAlign: 'center' as const, padding: '4px 2px' }}>
              <div style={{ fontSize: '8px', color: '#7B98B5', marginBottom: '2px' }}>\u25c7</div>
              <div style={{ fontSize: '4.5px', fontWeight: 600, color: '#483327', letterSpacing: '.04em', textTransform: 'uppercase' as const }}>{b}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
            {['Details', 'Shipping', 'Care'].map((t, i) => (
              <div key={t} style={{ flex: 1, padding: '5px 4px', textAlign: 'center' as const, fontSize: '5.5px', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: i === 0 ? '#351D14' : '#75604B', borderBottom: i === 0 ? '1.5px solid #7B98B5' : 'none' }}>{t}</div>
            ))}
          </div>
          <div style={{ padding: '8px 0', fontSize: '6px', color: '#75604B', lineHeight: 1.7 }}>Every MANE edit bundle is sourced from a single donor with cuticles intact and aligned. Weight: 100g+ per bundle.</div>
        </div>
        <div style={{ marginTop: '8px', borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '9px', fontWeight: 500, color: '#351D14' }}>Customer Reviews</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', fontWeight: 600, color: '#351D14' }}>4.9</span>
              <div><div style={{ color: '#7B98B5', fontSize: '6px' }}>\u2605\u2605\u2605\u2605\u2605</div><div style={{ fontSize: '5px', color: '#75604B' }}>189 reviews</div></div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2px' }}>
            {[{ s: '5 \u2605', w: '88%' }, { s: '4 \u2605', w: '9%' }, { s: '3 \u2605', w: '2%' }].map(r => (
              <div key={r.s} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '5px', color: '#75604B' }}>
                <span style={{ width: '18px', textAlign: 'right' as const }}>{r.s}</span>
                <div style={{ flex: 1, height: '3px', background: 'rgba(0,0,0,.06)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '100%', width: r.w, background: '#7B98B5', borderRadius: '2px' }} /></div>
                <span style={{ width: '16px' }}>{r.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <PreviewFooter />
  </div>
);
const EducationPreview = () => (
  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', lineHeight: 1.5, color: '#483327', background: '#FAFAF8' }}>
    <PreviewHeader activePage="education" />
    <div style={{ background: 'linear-gradient(135deg, #D1D1CC, #DACDBE)', textAlign: 'center' as const, padding: '28px 16px 22px' }}>
      <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Hair Education</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 400, color: '#351D14', marginBottom: '4px' }}>Understanding <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Raw Hair Textures</em></div>
      <div style={{ fontSize: '6.5px', color: '#75604B' }}>Knowledge is the foundation of a great hair investment.</div>
    </div>
    <div style={{ background: '#fff', padding: '16px' }}>
      <div style={{ maxWidth: '360px', margin: '0 auto 16px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Our Three Signature Textures</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14', marginBottom: '10px' }}>Each Texture Is <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Unique &amp; Beautiful</em></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[{ name: 'Raw Wavy', desc: 'Flowing wave pattern with natural movement' }, { name: 'Raw Wavy / Curly', desc: 'Defined S-pattern with gorgeous dimension' }, { name: 'Raw Curly', desc: 'Lush 3B\u20133C curl pattern' }].map((t, i) => (
            <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.06)', background: '#fff' }}>
              <div style={{ aspectRatio: '3/4', background: ['#D1D1CC', '#CCC6B8', '#DACDBE'][i] }} />
              <div style={{ padding: '6px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '7.5px', fontWeight: 600, color: '#351D14', marginBottom: '2px' }}>{t.name}</div>
                <div style={{ fontSize: '5px', color: '#75604B', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: '360px', margin: '0 auto 16px' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>The Basics</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14', marginBottom: '8px' }}>Raw vs. Virgin: <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Know the Difference</em></div>
        <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.08)', fontSize: '5.5px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr' }}>
            {['Feature', 'Raw Hair', 'Virgin Hair'].map(h => (
              <div key={h} style={{ background: '#351D14', color: '#fff', padding: '5px 8px', fontWeight: 600, fontSize: '5px', letterSpacing: '.06em', textTransform: 'uppercase' as const }}>{h}</div>
            ))}
          </div>
          {[{ f: 'Processing', r: 'Zero', v: 'Steam-processed' }, { f: 'Donors', r: 'Single donor', v: 'Multiple donors' }, { f: 'Lifespan', r: '3\u20135 years', v: '6\u201312 months' }, { f: 'Price', r: '$165\u2013$285+', v: '$60\u2013$150' }].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr' }}>
              <div style={{ padding: '5px 8px', borderBottom: '1px solid rgba(0,0,0,.04)', background: '#fff' }}>{row.f}</div>
              <div style={{ padding: '5px 8px', borderBottom: '1px solid rgba(0,0,0,.04)', background: 'rgba(123,152,181,.08)', color: '#5E7A96', fontWeight: 500 }}>{row.r}</div>
              <div style={{ padding: '5px 8px', borderBottom: '1px solid rgba(0,0,0,.04)', background: '#fff' }}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: '360px', margin: '0 auto' }}>
        <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Longevity Guide</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#351D14', marginBottom: '8px' }}>Making Your Hair <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Last 3+ Years</em></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(123,152,181,.08)', border: '1px solid rgba(123,152,181,.15)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#351D14', marginBottom: '6px' }}>Weekly Routine</div>
            {['\u2713 Co-wash sulfate-free', '\u2713 Deep condition biweekly', '\u2713 Detangle wet', '\u2713 Seal with argan oil'].map(item => (
              <div key={item} style={{ fontSize: '5.5px', padding: '2px 0', color: '#483327' }}>{item}</div>
            ))}
          </div>
          <div style={{ padding: '10px', borderRadius: '4px', background: 'rgba(117,96,75,.05)', border: '1px solid rgba(117,96,75,.1)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '8px', fontWeight: 600, color: '#351D14', marginBottom: '6px' }}>Common Mistakes</div>
            {['\u2717 Sulfate shampoo', '\u2717 Sleeping on cotton', '\u2717 Brushing curly dry', '\u2717 Heavy silicones'].map(item => (
              <div key={item} style={{ fontSize: '5.5px', padding: '2px 0', color: '#483327' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <PreviewFooter />
  </div>
);

const AboutPreview = () => (
  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '10px', lineHeight: 1.5, color: '#483327', background: '#FAFAF8' }}>
    <PreviewHeader activePage="about" />
    <div style={{ background: 'linear-gradient(135deg, #D1D1CC, #F5F4F0)', textAlign: 'center' as const, padding: '32px 16px 26px' }}>
      <div style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: '#7B98B5', marginBottom: '4px' }}>Our Story</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', fontWeight: 400, color: '#351D14', marginBottom: '4px' }}>About <em style={{ fontWeight: 600, fontStyle: 'italic' }}>MANE edit</em></div>
      <div style={{ fontSize: '6.5px', color: '#75604B' }}>Curated hair. Uncompromising quality.</div>
    </div>
    <div style={{ maxWidth: '320px', margin: '0 auto', padding: '20px 24px 24px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', fontWeight: 400, color: '#351D14', marginBottom: '10px' }}>The Edit <em style={{ fontWeight: 600, fontStyle: 'italic' }}>Philosophy</em></div>
      <div style={{ fontSize: '6.5px', color: '#75604B', lineHeight: 1.8, marginBottom: '8px' }}>MANE edit was born from a simple conviction: great hair shouldn\u2019t require compromise. In an industry flooded with steam-processed bundles marketed as \u201craw,\u201d we set out to curate something different.</div>
      <div style={{ fontSize: '6.5px', color: '#75604B', lineHeight: 1.8, marginBottom: '8px' }}>Every texture in our edit is sourced directly from individual donors, with cuticles fully intact and completely unprocessed. No chemical baths. No steam treatments. No shortcuts.</div>
      <div style={{ fontSize: '6.5px', color: '#75604B', lineHeight: 1.8, marginBottom: '14px' }}>We believe in educated buyers. That\u2019s why we invest in transparency \u2014 showing you exactly what makes raw hair different.</div>
      <div style={{ textAlign: 'center' as const }}>
        <span style={{ padding: '5px 14px', fontSize: '5.5px', fontWeight: 600, background: '#7B98B5', color: '#fff', borderRadius: '2px', letterSpacing: '.08em', textTransform: 'uppercase' as const }}>Shop the Collection \u2192</span>
      </div>
    </div>
    <PreviewFooter />
  </div>
);

const pagePreviewMap: Record<string, React.ReactNode> = {
  home: <HomePreview />,
  shop: <ShopPreview />,
  product: <ProductPreview />,
  education: <EducationPreview />,
  about: <AboutPreview />,
};
export default function ManeEditPreviewPage() {
  const [activeSection, setActiveSection] = useState(0);
  const iconMap: Record<string, React.ReactNode> = { image: Icon.image, logo: Icon.logo, swatch: Icon.swatch, type: Icon.type, palette: Icon.palette, device: Icon.device };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" className="flex items-center"><img src="/images/logo.png" alt="BeautyShare Pro" className="h-10 md:h-12 w-auto" /></Link>
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

      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #351D14 0%, #483327 50%, #5E7A96 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(123,152,181,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,188,206,0.2) 0%, transparent 50%)' }} />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/websites" className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm font-medium mb-8">{Icon.back} Back to All Themes</Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-[#A8BCCE] mb-6"><span className="h-2 w-2 rounded-full bg-[#7B98B5] animate-pulse" /> Shopify Theme</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>MANE <span style={{ fontWeight: 300, fontStyle: 'italic' }}>edit</span></h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4">Warm earth tones meet muted blue accents for a refined, natural hair brand experience. An editorial yet approachable Shopify theme built for raw and textured hair businesses.</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-2">{['#351D14', '#7B98B5', '#FAFAF8', '#483327', '#CCC6B8'].map((c) => (<span key={c} className="h-6 w-6 rounded-full border-2 border-white/20" style={{ backgroundColor: c }} />))}</div>
                <span className="text-white/40 text-sm">|</span>
                <span className="text-white/60 text-sm">Cormorant Garamond + Work Sans</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-[#351D14] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#7B98B5' }}>Get This Theme <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span></Link>
                <a href="#pages" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:border-white/60 transition-all">Explore Pages</a>
              </div>
              <p className="mt-4 text-white/40 text-xs">Members only \u2014 sign up or log in to purchase</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#e8e8e8] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
                <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-black/40 font-mono">yourbrand.myshopify.com</div>
              </div>
              <div className="relative overflow-hidden" style={{ maxHeight: '420px' }}><HomePreview /></div>
            </div>
          </div>
        </div>
      </section>
      <section id="pages" className="py-20 md:py-28 bg-[#FFF8F3]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">5 Complete Pages</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">Every Page Your Store <Cursive className="text-pink">Needs</Cursive></h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">A complete Shopify store with Home, Shop, Product Detail, Education, and About pages \u2014 all professionally designed and ready to customize.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-3 mb-8">
            {pages.map((page, i) => (
              <button key={page.id} onClick={() => setActiveSection(i)} className={`rounded-xl px-4 py-4 text-left transition-all border-2 ${activeSection === i ? 'border-[#7B98B5] bg-white shadow-lg' : 'border-transparent bg-white/60 hover:bg-white hover:shadow'}`}>
                <div className={`text-sm font-bold mb-1 ${activeSection === i ? 'text-[#351D14]' : 'text-black/50'}`}>{page.label}</div>
                <div className="text-xs text-black/40 leading-relaxed">{page.desc}</div>
              </button>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-black/5">
            <div className="bg-[#e8e8e8] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></div>
              <div className="flex-1 ml-4 bg-white rounded-md px-3 py-1 text-xs text-black/40 font-mono">yourbrand.myshopify.com/{pages[activeSection].id === 'home' ? '' : pages[activeSection].id}</div>
            </div>
            <div className="relative overflow-hidden" style={{ maxHeight: '600px' }}>{pagePreviewMap[pages[activeSection].id]}</div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#7B98B5] uppercase tracking-widest mb-4">Section by Section</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">9+ Customizable <Cursive className="brand-gradient-text">Sections</Cursive></h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">Drag, drop, rearrange, or remove. Every section is built on Shopify Online Store 2.0.</p>
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

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-widest mb-4">Make It Yours</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">Fully <Cursive className="text-pink">Customizable</Cursive></h2>
            <p className="mt-4 text-black/60 max-w-xl mx-auto text-lg">This is your store. Change everything \u2014 or keep it exactly as-is. No coding needed.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {customizations.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl mb-5 text-[#7B98B5]" style={{ backgroundColor: 'rgba(123,152,181,0.1)' }}>{iconMap[c.icon]}</div>
                <h4 className="text-lg font-bold text-[#351D14] mb-3">{c.title}</h4>
                <p className="text-sm text-black/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ label: 'Platform', value: 'Shopify 2.0' }, { label: 'Pages', value: '5 Complete' }, { label: 'Sections', value: '12+ Sections' }, { label: 'Fonts', value: 'Cormorant + Work Sans' }].map((s) => (
              <div key={s.label}><p className="text-2xl md:text-3xl font-extrabold text-[#351D14] mb-1">{s.value}</p><p className="text-sm text-black/40 font-medium">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #351D14 0%, #483327 100%)' }}>
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">Ready to Launch with <span style={{ color: '#7B98B5' }}>MANE edit</span>?</h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">Sign up for BeautyShare Pro to unlock this theme and start building your premium hair brand today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="group inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-bold text-[#351D14] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#7B98B5' }}>Sign Up & Get This Theme <span className="group-hover:translate-x-1 transition-transform">{Icon.arrow}</span></Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 text-lg font-semibold text-white hover:border-white/60 transition-all">Log In to Purchase</Link>
          </div>
          <p className="mt-6 text-white/30 text-sm">Members-only access \u2014 join to unlock all store themes</p>
        </div>
      </section>

      <footer className="bg-black py-12 text-center">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link href="/websites" className="text-white/60 hover:text-white text-sm font-medium transition-colors">\u2190 Back to All Store Designs</Link>
          <p className="mt-4 text-white/30 text-xs">\u00a9 2026 BeautyShare Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
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

// app/pricing-guide/page.tsx
// Drop this file into your Next.js app at: app/pricing-guide/page.tsx
// Then place BSP_Raw_Hair_Pricing_Playbook.pdf in your /public folder.
//
// Uses your existing Cormorant Garamond (display) + Outfit (body) fonts
// already loaded by your site — the `font-display` utility class is
// defined in your global CSS.
//
// Brand palette:
//   #FA6A27 orange  ·  #D61465 magenta  ·  #DCBDEF lavender
//   #E2AD37 gold    ·  #FFFFFF white    ·  #000000 black

"use client";

import { useState } from "react";
import Link from "next/link";

// Top nav — mirrors the main site header so users can jump back to the
// homepage or other key pages. Homepage anchors route to "/#anchor".
const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why BSP", href: "/#why" },
  { label: "Our Hair", href: "/#hair" },
  { label: "Compare", href: "/#compare" },
  { label: "Plans", href: "/#pricing" },
  { label: "Store Designs", href: "/websites" },
  { label: "Education", href: "/education" },
  { label: "Free Webinar", href: "/webinar" },
];

function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo lives in /public/images/logo.png */}
          <img src="/images/logo.png" alt="BeautyShare Pro" className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7 text-sm text-white/80 font-sans">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-[#FA6A27] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-white/80 hover:text-white font-sans"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#FA6A27] to-[#D61465] text-white text-sm font-bold uppercase tracking-wide font-sans hover:scale-[1.03] transition-transform"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black">
          <ul className="px-6 py-4 space-y-4 font-sans">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/80 hover:text-[#FA6A27]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/10 flex gap-3">
              <Link href="/login" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 rounded-md border border-white/20 text-white text-sm font-bold">
                Log In
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 text-center py-2.5 rounded-md bg-gradient-to-r from-[#FA6A27] to-[#D61465] text-white text-sm font-bold uppercase">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default function PricingGuidePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ firstName: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/pricing-guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "pricing-guide-landing" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setTimeout(() => {
        window.location.href = "/BSP_Raw_Hair_Pricing_Playbook.pdf";
      }, 800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <TopNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Diagonal orange accent (top-right) */}
        <div
          className="absolute top-0 right-0 w-[55%] h-[380px] bg-[#FA6A27]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
        />
        {/* Magenta stripe */}
        <div className="absolute top-[520px] left-0 w-32 h-1 bg-[#D61465]" />
        {/* Gold dot */}
        <div className="absolute top-[505px] left-10 w-3 h-3 rounded-full bg-[#E2AD37]" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: headline */}
          <div>
            <div className="inline-block mb-6">
              <span className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase">
                Free Download · 8 Pages
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl leading-[0.95] mb-8 font-bold">
              <span className="text-[#FA6A27] block">The Raw Hair</span>
              <span className="text-white block">Pricing</span>
              <span className="text-[#D61465] block">Playbook</span>
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-lg">
              What top raw hair brands <em className="font-display">actually</em> charge
              &mdash; and what you pay as a BSP member. See the full profit spread before
              you spend a dollar.
            </p>

            <ul className="space-y-3 mb-8 max-w-lg">
              {[
                "Verified prices from D'Hair, Yummy, 7 Strands, Haute ATL & HSC LA",
                "Raw SEA Wavy & Cambodian Wavy · 16\" through 28\"",
                "Profit-per-bundle breakdown at every length",
                "Real earnings model: $1,742/mo from just 20 bundles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#FA6A27] to-[#D61465]" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: cover preview + lead-capture form */}
          <div className="space-y-8">
            {/* PDF cover with arrow callout */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#DCBDEF] rounded-lg -z-10" />
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#E2AD37] rounded-lg -z-10" />
              <img
                src="/images/pricing-guide-cover.png"
                alt="The Raw Hair Pricing Playbook — free 8-page guide"
                className="w-full h-auto rounded-md shadow-2xl ring-1 ring-white/10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FA6A27] text-white text-[10px] tracking-[0.2em] font-sans font-bold uppercase px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Free · 8 Pages
              </div>

              {/* Handwritten-style arrow callout pointing at the cover */}
              <div className="hidden md:block absolute -top-6 -right-10 rotate-[8deg] pointer-events-none">
                <div className="flex items-start gap-2">
                  <span className="font-display italic text-[#E2AD37] text-2xl whitespace-nowrap drop-shadow">
                    Your free playbook →
                  </span>
                </div>
                <svg className="w-24 h-20 -mt-2 ml-6" viewBox="0 0 120 100" fill="none">
                  <path
                    d="M10 10 Q 50 30 40 70 T 100 90"
                    stroke="#E2AD37"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M90 78 L 104 92 L 88 96"
                    stroke="#E2AD37"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

          <div className="bg-white rounded-lg p-8 md:p-10 shadow-2xl relative">
            {/* Decorative corner accent */}
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#DCBDEF] rounded-lg -z-10" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[#E2AD37] rounded-lg -z-10" />

            {status !== "success" ? (
              <>
                <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase mb-2">
                  Get Instant Access
                </p>
                <h2 className="font-display text-4xl text-black mb-3 font-bold">
                  Send me the playbook
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Drop your info and we&apos;ll email the playbook plus a bonus invite to
                  our weekly webinar.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FA6A27] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FA6A27] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    pattern="[0-9\s\-\(\)\+]{7,}"
                    placeholder="Phone number (for SMS playbook + bonus invite)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FA6A27] focus:outline-none transition-colors"
                    title="Please enter a valid phone number"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-md bg-gradient-to-r from-[#FA6A27] to-[#D61465] text-white font-bold text-lg tracking-wide uppercase hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 shadow-lg shadow-[#FA6A27]/20"
                  >
                    {status === "loading" ? "Sending…" : "Send Me The Playbook"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    We respect your inbox. Unsubscribe anytime.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FA6A27] to-[#D61465] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl text-black mb-2 font-bold">
                  Check your email!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your playbook is downloading now. We also sent a copy to your inbox.
                </p>
                <a
                  href="/BSP_Raw_Hair_Pricing_Playbook.pdf"
                  className="text-[#FA6A27] font-bold hover:underline"
                >
                  Click here if it didn&apos;t start automatically
                </a>
              </div>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#FA6A27] py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FA6A27] via-[#FA6A27] to-[#D61465]" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { stat: "$0", label: "Inventory Required" },
            { stat: "$96", label: "Max Profit Per Bundle" },
            { stat: "$20K+", label: "Avg Member Earns/yr" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="font-display text-6xl font-bold text-white mb-2">{stat}</div>
              <div className="text-white/90 uppercase text-sm tracking-[0.15em] font-bold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT RETAILERS ARE CHARGING */}
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D61465]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FA6A27]/10 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase mb-3">
              Real Retail Prices · Screenshotted Live
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              This is what your customers are{" "}
              <span className="text-[#D61465]">already paying</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Direct screenshots from competitor sites. The playbook breaks down
              exactly how much of this you keep when you sell the same quality
              through BSP.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Competitor 1 — Hair So Chic LA */}
            <a
              href="https://hairsochicla.com/products/jet-black-cambodian-wavy-pre-dyed"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 transform hover:-translate-y-1 transition-transform"
            >
              <img
                src="/images/competitor-hairsochic.png"
                alt="Hair So Chic LA — Jet Black Cambodian Wavy $245 per bundle"
                className="w-full h-auto block"
              />
            </a>

            {/* Competitor 2 — Yummy Extensions */}
            <a
              href="https://yummyextensions.com/products/raw-sea-wavy-opulence"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 transform hover:-translate-y-1 transition-transform"
            >
              <img
                src="/images/competitor-yummy.png"
                alt="Yummy Extensions Raw SEA Wavy Opulence — $260 per bundle"
                className="w-full h-auto block"
              />
            </a>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block bg-[#DCBDEF]/10 border border-[#DCBDEF]/30 rounded-lg px-8 py-5">
              <p className="text-white text-lg">
                Your BSP wholesale on a 20" Raw SEA Wavy bundle is{" "}
                <span className="font-display font-bold text-[#FA6A27] text-2xl">
                  $164
                </span>{" "}
                — that&apos;s up to{" "}
                <span className="font-display font-bold text-[#E2AD37] text-2xl">
                  $96 profit
                </span>{" "}
                per bundle at market price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW CARDS */}
      <section className="py-24 bg-[#FFF7F0] text-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase mb-3">
              What&apos;s Inside
            </p>
            <h2 className="font-display text-5xl font-bold mb-4">A peek inside the playbook</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every length. Every competitor. Every dollar of margin waiting for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Price comparison charts",
                body: "Visual breakdowns of BSP wholesale vs. five top retail brands across all lengths.",
                color: "#FA6A27",
              },
              {
                num: "02",
                title: "Verified price tables",
                body: "No estimates. Every price pulled directly from live competitor product pages.",
                color: "#D61465",
              },
              {
                num: "03",
                title: "Realistic earnings model",
                body: "A 20-bundle month that pencils out to $1,742 in your pocket — no inventory risk.",
                color: "#E2AD37",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white p-8 rounded-lg shadow-sm border-t-4 hover:-translate-y-1 transition-transform"
                style={{ borderTopColor: card.color }}
              >
                <div
                  className="font-display text-4xl font-bold mb-3"
                  style={{ color: card.color }}
                >
                  {card.num}
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDARY CTA */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#FA6A27] uppercase mb-3">
            Still Comparing?
          </p>
          <h2 className="font-display text-5xl font-bold mb-4">
            Watch the <em className="text-[#D61465]">free</em> webinar.
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Every Tuesday at 8pm EST, founder Chanel walks you through how BSP works and
            answers questions live.
          </p>
          <Link
            href="/webinar"
            className="inline-block px-10 py-4 rounded-md bg-[#D61465] text-white font-bold uppercase tracking-wide hover:scale-[1.03] transition-transform shadow-xl shadow-[#D61465]/20"
          >
            Reserve My Seat →
          </Link>
        </div>
      </section>

      {/* MINI FOOTER */}
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 font-sans">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="BeautyShare Pro" className="h-6 w-auto" />
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/webinar" className="hover:text-white">Webinar</Link>
            <Link href="/education" className="hover:text-white">Education</Link>
            <Link href="/signup" className="hover:text-white">Join</Link>
          </div>
          <p>© {new Date().getFullYear()} BeautyShare Pro</p>
        </div>
      </footer>
    </main>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  cream: "#F5F0EB", warmWhite: "#FAFAF8", sand: "#E8E0D6",
  taupe: "#C4B5A5", warmGray: "#9A8F84", charcoal: "#3D3630",
  deep: "#1A1714", gold: "#C9A96E", rose: "#B8847C",
  beige: "#EDE7E0",
};

const pages = [
  { id: "home", label: "Home", desc: "Full homepage with hero, trust bar, shop-by-texture grid, featured product spotlight, video section, bestsellers, how-it-works, reviews, UGC gallery, and email signup." },
  { id: "product", label: "Product Detail", desc: "Full product page with image gallery, breadcrumb navigation, length variant selector, quantity controls, add-to-cart, trust badges, specs table, and accordion FAQ." },
];

const features = [
  { title: "2 Complete Pages", desc: "Home and Product Detail — fully designed and interactive with Shopify Liquid integration." },
  { title: "Hair Extension Focused", desc: "Purpose-built for hair vendors with texture grids, length variant selectors, bundle deals, and product spotlights." },
  { title: "Conversion Optimized", desc: "Trust bars, star ratings, quick-add buttons, compare-at pricing, review cards, and prominent CTAs throughout." },
  { title: "Warm Neutral Design", desc: "Cormorant Garamond + Outfit typography with a refined cream, charcoal, and gold accent palette." },
  { title: "Mobile Responsive", desc: "Every section adapts beautifully to any screen size with optimized layouts and touch-friendly interactions." },
  { title: "Shopify Ready", desc: "Full Liquid theme with customizable sections, variant selectors, cart integration, and CSV product import." },
];

const colorTokens = [
  { name: "Deep Black", hex: "#1A1714", text: "white" },
  { name: "Charcoal", hex: "#3D3630", text: "white" },
  { name: "Warm Gray", hex: "#9A8F84", text: "white" },
  { name: "Accent Gold", hex: "#C9A96E", text: "#1A1714" },
  { name: "Accent Rose", hex: "#B8847C", text: "white" },
  { name: "Sand", hex: "#E8E0D6", text: "#1A1714" },
  { name: "Cream", hex: "#F5F0EB", text: "#1A1714" },
];

export default function LuxeShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.warmWhite, fontFamily: "'Outfit', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.deep, color: "rgba(255,255,255,.85)", textAlign: "center", padding: "10px 20px", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const }}>
        BeautyShare Pro — Store Design Preview
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.warmGray, fontSize: ".82rem", fontWeight: 500 }}>
            ← Back to Templates
          </Link>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: C.deep }}>
            Luxe <em style={{ fontStyle: "italic", fontWeight: 300, color: C.gold }}>Hair Co.</em>
          </div>
          <a href="#" style={{ padding: "10px 28px", background: C.deep, color: C.cream, borderRadius: 4, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Use This Template
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.charcoal} 50%, ${C.warmGray} 100%)`, padding: "80px 24px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.gold, marginBottom: 16 }}>
            Premium Shopify Template
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
            Luxe <em style={{ fontWeight: 300, color: C.gold }}>Hair Co.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".95rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            A warm, elevated Shopify theme crafted for premium hair extension brands. Neutral tones meet gold accents for a luxurious yet approachable storefront.
          </p>
        </div>
      </section>

      {/* Page Tabs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid rgba(0,0,0,.08)`, marginTop: 40 }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              style={{
                flex: 1,
                padding: "16px 12px",
                background: "none",
                border: "none",
                borderBottom: activePage === p.id ? `2px solid ${C.gold}` : "2px solid transparent",
                fontFamily: "'Outfit', sans-serif",
                fontSize: ".78rem",
                fontWeight: activePage === p.id ? 600 : 500,
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                color: activePage === p.id ? C.deep : C.warmGray,
                cursor: "pointer",
                transition: "all .2s ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active Page Description */}
        <div style={{ padding: "20px 0 12px", fontSize: ".85rem", color: C.warmGray, lineHeight: 1.7 }}>
          {pages.find((p) => p.id === activePage)?.desc}
        </div>

        {/* Iframe Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          border: `1px solid rgba(0,0,0,.08)`,
          boxShadow: "0 8px 32px rgba(26,23,20,.1)",
          marginBottom: 60,
          background: "#fff",
        }}>
          {/* Browser Chrome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: C.cream,
            borderBottom: "1px solid rgba(0,0,0,.06)",
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <div style={{
              flex: 1,
              background: "#fff",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: ".72rem",
              color: C.warmGray,
              fontFamily: "monospace",
            }}>
              luxehairco.com/{activePage === "home" ? "" : activePage}
            </div>
          </div>
          <iframe
            key={activePage}
            src={`/luxe-wrapper.html?page=${activePage}`}
            style={{
              width: "100%",
              height: 700,
              border: "none",
              display: "block",
            }}
            title={`Luxe Hair Co. - ${activePage} page preview`}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.gold, marginBottom: 12 }}>
            Template Features
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: C.deep }}>
            Everything You <em style={{ fontWeight: 600 }}>Need</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 8,
              padding: 28,
              border: "1px solid rgba(0,0,0,.04)",
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: C.deep, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: ".82rem", color: C.warmGray, lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.gold, marginBottom: 12 }}>
            Design System
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: C.deep }}>
            Color <em style={{ fontWeight: 600 }}>Palette</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          {colorTokens.map((c, i) => (
            <div key={i} style={{ textAlign: "center" as const }}>
              <div style={{
                width: 72, height: 72, borderRadius: 8, background: c.hex,
                border: c.hex === "#F5F0EB" ? "1px solid rgba(0,0,0,.1)" : "none",
                marginBottom: 8,
              }} />
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: C.deep }}>{c.name}</div>
              <div style={{ fontSize: ".68rem", color: C.warmGray }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.gold, marginBottom: 16 }}>Display Font</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.4rem", fontWeight: 400, color: C.deep, marginBottom: 8 }}>
              Cormorant Garamond
            </div>
            <p style={{ fontSize: ".82rem", color: C.warmGray, lineHeight: 1.7 }}>
              Used for headings, product names, prices, and editorial moments. Weights 300–700 with italic variants.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.gold, marginBottom: 16 }}>Body Font</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 400, color: C.deep, marginBottom: 8 }}>
              Outfit
            </div>
            <p style={{ fontSize: ".82rem", color: C.warmGray, lineHeight: 1.7 }}>
              Used for body text, navigation, buttons, and UI elements. Clean and modern with excellent readability at all sizes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: C.deep, padding: "64px 24px", textAlign: "center" as const }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 16 }}>
          Ready to Launch Your <em style={{ fontWeight: 600, color: C.gold }}>Hair Brand</em>?
        </h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Get the Luxe Hair Co. template and start selling with a store that matches the quality of your hair.
        </p>
        <a href="#" style={{ display: "inline-block", padding: "14px 36px", background: C.gold, color: C.deep, borderRadius: 4, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Use This Template
        </a>
      </div>
    </div>
  );
}

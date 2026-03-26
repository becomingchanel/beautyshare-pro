"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  wine: "#400106", tan: "#D9B991", brown: "#402814",
  forest: "#0D0C00", burgundy: "#260101", bg: "#FAF6F1",
  text: "#1A1714",
};

const pages = [
  { id: "home", label: "Home", desc: "Full homepage with cinematic hero, scrolling trust bar, shop-by-texture grid, featured product spotlight, why-choose-us pillars, client testimonials, UGC gallery, and newsletter signup." },
  { id: "shop", label: "Shop", desc: "Collection page with gradient hero banner, 3-column product grid with badges, pricing, and quick-add buttons." },
  { id: "product", label: "Product Detail", desc: "Full product page with sticky image, length variant selector, quantity controls, add-to-cart, trust badges, specs table, and customer reviews." },
  { id: "about", label: "About", desc: "Brand story page with mission section, team image, and core values grid showcasing ethical sourcing and quality standards." },
  { id: "haircare", label: "Hair Care", desc: "Complete hair care guide with wash routine steps, daily maintenance tips, coloring advice, and FAQ accordion." },
  { id: "contact", label: "Contact", desc: "Two-column contact page with form (name, email, subject, message) and info cards with business hours." },
  { id: "faq", label: "FAQ", desc: "Help center with 9 accordion FAQ items covering shipping, returns, hair care, bundle recommendations, and more." },
];

const features = [
  { title: "7 Complete Pages", desc: "Home, Shop, Product Detail, About, Hair Care, Contact, and FAQ — fully designed with rich content and interactive elements." },
  { title: "Raw Hair Focused", desc: "Built specifically for raw hair vendors with texture grids, length variant selectors, bundle recommendations, and care guides." },
  { title: "Conversion Optimized", desc: "Trust bars, star ratings, review cards, urgency badges, sticky product images, and prominent CTAs throughout every page." },
  { title: "Cinematic Design", desc: "Playfair Display + DM Sans typography with a deep wine, warm tan, and forest palette that feels luxurious and editorial." },
  { title: "Mobile Responsive", desc: "Every section adapts beautifully to any screen size with optimized grid layouts and touch-friendly interactions." },
  { title: "Shopify Ready", desc: "Full Liquid theme with customizable sections, variant selectors, cart integration, and complete schema settings." },
];

const colorTokens = [
  { name: "Wine", hex: "#400106", text: "white" },
  { name: "Burgundy", hex: "#260101", text: "white" },
  { name: "Brown", hex: "#402814", text: "white" },
  { name: "Forest", hex: "#0D0C00", text: "white" },
  { name: "Tan", hex: "#D9B991", text: "#1A1714" },
  { name: "Background", hex: "#FAF6F1", text: "#1A1714" },
];

export default function NoirCrownShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.forest, color: "rgba(255,255,255,.85)", textAlign: "center", padding: "10px 20px", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const }}>
        BeautyShare Pro — Store Design Preview
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,246,241,.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.brown, fontSize: ".82rem", fontWeight: 500 }}>
            ← Back to Templates
          </Link>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.wine }}>
            Noir <span style={{ fontStyle: "italic", color: C.tan, fontWeight: 400 }}>Crown</span>
          </div>
          <a href="#" style={{ padding: "10px 28px", background: C.wine, color: C.tan, borderRadius: 100, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Use This Template
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.wine} 0%, ${C.forest} 50%, ${C.burgundy} 100%)`, padding: "80px 24px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.tan, marginBottom: 16 }}>
            Premium Shopify Template
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
            Noir <em style={{ fontWeight: 400, color: C.tan }}>Crown</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".95rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            A cinematic Shopify theme built for premium raw hair brands. Deep wine tones, warm tan accents, and editorial typography create an unforgettable storefront.
          </p>
        </div>
      </section>

      {/* Page Tabs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid rgba(0,0,0,.08)`, marginTop: 40, overflowX: "auto" as const }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              style={{
                flex: 1,
                padding: "16px 12px",
                background: "none",
                border: "none",
                borderBottom: activePage === p.id ? `2px solid ${C.wine}` : "2px solid transparent",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".72rem",
                fontWeight: activePage === p.id ? 600 : 500,
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                color: activePage === p.id ? C.wine : C.brown,
                cursor: "pointer",
                transition: "all .2s ease",
                whiteSpace: "nowrap" as const,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active Page Description */}
        <div style={{ padding: "20px 0 12px", fontSize: ".85rem", color: C.brown, lineHeight: 1.7 }}>
          {pages.find((p) => p.id === activePage)?.desc}
        </div>

        {/* Iframe Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          border: `1px solid rgba(0,0,0,.08)`,
          boxShadow: "0 8px 32px rgba(64,1,6,.1)",
          marginBottom: 60,
          background: "#fff",
        }}>
          {/* Browser Chrome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: C.bg,
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
              color: C.brown,
              fontFamily: "monospace",
            }}>
              noircrown.com/{activePage === "home" ? "" : activePage}
            </div>
          </div>
          <iframe
            key={activePage}
            src={`/noir-crown-wrapper.html?page=${activePage}`}
            style={{
              width: "100%",
              height: 700,
              border: "none",
              display: "block",
            }}
            title={`Noir Crown - ${activePage} page preview`}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.wine, marginBottom: 12 }}>
            Template Features
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: C.text }}>
            Everything You <em style={{ fontWeight: 400, color: C.wine }}>Need</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              padding: 28,
              border: "1px solid rgba(0,0,0,.04)",
              boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: C.text, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: ".82rem", color: C.brown, lineHeight: 1.7, opacity: 0.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.wine, marginBottom: 12 }}>
            Design System
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: C.text }}>
            Color <em style={{ fontWeight: 400, color: C.wine }}>Palette</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          {colorTokens.map((c, i) => (
            <div key={i} style={{ textAlign: "center" as const }}>
              <div style={{
                width: 72, height: 72, borderRadius: 12, background: c.hex,
                border: c.hex === "#FAF6F1" ? "1px solid rgba(0,0,0,.1)" : "none",
                marginBottom: 8,
              }} />
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: C.text }}>{c.name}</div>
              <div style={{ fontSize: ".68rem", color: C.brown, opacity: 0.6 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.wine, marginBottom: 16 }}>Display Font</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.4rem", fontWeight: 600, color: C.text, marginBottom: 8 }}>
              Playfair Display
            </div>
            <p style={{ fontSize: ".82rem", color: C.brown, lineHeight: 1.7, opacity: 0.7 }}>
              Used for headings, product names, prices, and editorial moments. Weights 400–700 with italic variants.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.wine, marginBottom: 16 }}>Body Font</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "2rem", fontWeight: 400, color: C.text, marginBottom: 8 }}>
              DM Sans
            </div>
            <p style={{ fontSize: ".82rem", color: C.brown, lineHeight: 1.7, opacity: 0.7 }}>
              Used for body text, navigation, buttons, and UI elements. Clean and modern with excellent readability at all sizes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: `linear-gradient(135deg, ${C.wine}, ${C.forest})`, padding: "64px 24px", textAlign: "center" as const }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: "#fff", marginBottom: 16 }}>
          Ready to Claim Your <em style={{ fontWeight: 400, color: C.tan }}>Crown</em>?
        </h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Get the Noir Crown template and launch a store that matches the quality of your hair.
        </p>
        <a href="#" style={{ display: "inline-block", padding: "14px 36px", background: C.tan, color: C.forest, borderRadius: 100, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Use This Template
        </a>
      </div>
    </div>
  );
}

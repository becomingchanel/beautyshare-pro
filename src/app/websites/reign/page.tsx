"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  wine: "#510815", wineDark: "#391212", wineLight: "#7C2835",
  lilac: "#B6A1CA", lilacLight: "#D4C8E2", lilacDark: "#8E6FB0",
  cream: "#EDD8C2", creamLight: "#F5EDE3", creamDark: "#D4BFA6",
  bg: "#FAF7F4", text: "#1a1a1a", textLight: "#666", white: "#fff",
};

const pages = [
  { id: "home", label: "Home", desc: "Full homepage with cinematic hero, marquee bar, bento product grid, editorial split, brand pillars, lookbook strip, and newsletter signup." },
  { id: "shop", label: "Shop", desc: "Collection page with wine hero banner, filter buttons, and a 3-column product grid with all bundles and closures." },
  { id: "product", label: "Product Detail", desc: "Split-layout product page with model imagery, variant selector, quantity controls, trust badges, gallery, specs, reviews, and FAQ." },
  { id: "guide", label: "Hair Care", desc: "Complete hair care guide with wash routine steps, daily maintenance tips, coloring guide, FAQ accordion, and shop CTA." },
  { id: "lookbook", label: "Lookbook", desc: "Masonry gallery of styled editorial looks featuring the REIGN collection in various textures." },
  { id: "about", label: "About", desc: "Brand story with hero overlay, mission statement with side-by-side imagery, and values grid." },
  { id: "contact", label: "Contact", desc: "Two-column layout with functional contact form, business info cards, and hours section." },
];

const features = [
  { title: "7 Complete Pages", desc: "Home, Shop, Product Detail, Hair Care Guide, Lookbook, About, and Contact \u2014 all fully designed and interactive." },
  { title: "Raw Hair Focused", desc: "Built specifically for raw hair vendors with texture guides, care education, single-donor messaging, and lifespan trust badges." },
  { title: "Conversion Optimized", desc: "Hero CTAs, trust bars, product badges, newsletter capture, and sticky navigation designed to drive sales." },
  { title: "Cinematic Design", desc: "Full-viewport hero with gradient overlay, editorial split sections, and masonry lookbook gallery." },
  { title: "Mobile Responsive", desc: "Every section adapts beautifully from desktop to mobile with optimized layouts and touch interactions." },
  { title: "Shopify Ready", desc: "Clean Liquid-ready HTML with section schemas, customizable colors, fonts, images, and copy from the theme editor." },
];

const colorTokens = [
  { name: "Wine", hex: "#510815", text: "white" },
  { name: "Wine Dark", hex: "#391212", text: "white" },
  { name: "Lilac", hex: "#B6A1CA", text: "#391212" },
  { name: "Lilac Light", hex: "#D4C8E2", text: "#391212" },
  { name: "Lilac Dark", hex: "#8E6FB0", text: "white" },
  { name: "Cream", hex: "#EDD8C2", text: "#391212" },
  { name: "Cream Light", hex: "#F5EDE3", text: "#391212" },
  { name: "Background", hex: "#FAF7F4", text: "#391212" },
];

export default function ReignShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Jost', -apple-system, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: C.wineDark, color: "rgba(237,216,194,.85)", textAlign: "center", padding: "10px 20px", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const }}>
        BeautyShare Pro \u2014 Store Design Preview
      </div>

      {/* Sticky Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,247,244,.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.textLight, fontSize: ".82rem", fontWeight: 500 }}>
            \u2190 Back to Templates
          </Link>
          <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.wine, letterSpacing: "6px", textTransform: "uppercase" as const }}>
            REIGN
          </div>
          <a href="#" style={{ padding: "10px 28px", background: C.lilac, color: C.wineDark, borderRadius: 0, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Use This Template
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.wineDark} 0%, ${C.wine} 40%, ${C.lilacDark} 100%)`, padding: "80px 24px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.lilacLight, marginBottom: 16 }}>
            Premium Shopify Template
          </div>
          <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 700, color: C.cream, marginBottom: 16, lineHeight: 1.2, letterSpacing: "4px" }}>
            REIGN
          </h1>
          <p style={{ color: "rgba(237,216,194,.7)", fontSize: ".95rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            A premium Shopify theme for raw hair vendors. Wine, lilac &amp; cream palette with Miami glamour aesthetic. 7 pages including a high-converting hair care guide.
          </p>
        </div>
      </section>

      {/* Page Tabs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(0,0,0,.08)", marginTop: 40, overflowX: "auto" as const }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              style={{
                flex: 1,
                padding: "16px 12px",
                background: "none",
                border: "none",
                borderBottom: activePage === p.id ? `2px solid ${C.lilac}` : "2px solid transparent",
                fontFamily: "'Jost', sans-serif",
                fontSize: ".75rem",
                fontWeight: activePage === p.id ? 600 : 400,
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                color: activePage === p.id ? C.wine : C.textLight,
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
        <div style={{ padding: "20px 0 12px", fontSize: ".85rem", color: C.textLight, lineHeight: 1.7 }}>
          {pages.find((p) => p.id === activePage)?.desc}
        </div>

        {/* Iframe Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.08)",
          boxShadow: "0 8px 32px rgba(81,8,21,.1)",
          marginBottom: 60,
          background: "#fff",
        }}>
          {/* Browser Chrome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: C.creamLight,
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
              color: C.textLight,
              fontFamily: "monospace",
            }}>
              reignhair.com/{activePage === "home" ? "" : activePage}
            </div>
          </div>
          <iframe
            key={activePage}
            src={`/reign-wrapper.html?page=${activePage}`}
            style={{
              width: "100%",
              height: 700,
              border: "none",
              display: "block",
            }}
            title={`REIGN - ${activePage} page preview`}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.lilacDark, marginBottom: 12 }}>
            Template Features
          </div>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: C.wine }}>
            Everything You <em style={{ fontWeight: 400, fontStyle: "italic" }}>Need</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 0,
              padding: 28,
              border: "1px solid rgba(0,0,0,.04)",
            }}>
              <h3 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: C.wine, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: ".82rem", color: C.textLight, lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.lilacDark, marginBottom: 12 }}>
            Design System
          </div>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: C.wine }}>
            Color <em style={{ fontWeight: 400, fontStyle: "italic" }}>Palette</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          {colorTokens.map((c, i) => (
            <div key={i} style={{ textAlign: "center" as const }}>
              <div style={{
                width: 72, height: 72, borderRadius: 0, background: c.hex,
                border: c.hex === "#FAF7F4" || c.hex === "#F5EDE3" ? "1px solid rgba(0,0,0,.1)" : "none",
                marginBottom: 8,
              }} />
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: C.wine }}>{c.name}</div>
              <div style={{ fontSize: ".68rem", color: C.textLight }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 0, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.lilacDark, marginBottom: 16 }}>Display Font</div>
            <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "2.4rem", fontWeight: 600, color: C.wine, marginBottom: 8 }}>
              Bodoni Moda
            </div>
            <p style={{ fontSize: ".82rem", color: C.textLight, lineHeight: 1.7 }}>
              Used for headings, product names, prices, and editorial moments. Weights 400\u2013800 with italic variants for elegant emphasis.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 0, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.lilacDark, marginBottom: 16 }}>Body Font</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "2rem", fontWeight: 400, color: C.wine, marginBottom: 8 }}>
              Jost
            </div>
            <p style={{ fontSize: ".82rem", color: C.textLight, lineHeight: 1.7 }}>
              Used for body text, navigation, buttons, and UI elements. Clean geometric sans-serif with excellent readability at all sizes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: C.wineDark, padding: "64px 24px", textAlign: "center" as const }}>
        <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 600, color: C.cream, marginBottom: 16 }}>
          Ready to Wear Your <em style={{ fontWeight: 400, fontStyle: "italic", color: C.lilacLight }}>Crown</em>?
        </h2>
        <p style={{ color: "rgba(237,216,194,.6)", fontSize: ".88rem", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Get the REIGN template and launch a store that matches the quality of your hair.
        </p>
        <a href="#" style={{ display: "inline-block", padding: "14px 36px", background: C.lilac, color: C.wineDark, borderRadius: 0, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Use This Template
        </a>
      </div>
    </div>
  );
}

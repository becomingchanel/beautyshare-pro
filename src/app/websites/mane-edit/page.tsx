 "use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  deep: "#351D14", dark: "#483327", warm: "#75604B",
  blue: "#7B98B5", blueLight: "#A8BCCE", blueDark: "#5E7A96",
  smoke: "#D1D1CC", sand: "#DACDBE", bg: "#FAFAF8",
  offWhite: "#F5F4F0", white: "#FFFFFF",
};

const pages = [
  { id: "home", label: "Home", desc: "Full homepage with hero, product grid, texture guide, testimonials, trust bar, newsletter and UGC community sections." },
  { id: "shop", label: "Shop", desc: "Collection page with all three raw hair textures displayed in a clean product grid with badges and pricing." },
  { id: "product", label: "Product Detail", desc: "Full product page with gallery, variant selector, reviews, FAQ, trust badges, and sticky add-to-cart bar." },
  { id: "education", label: "Education", desc: "Hair education hub with texture comparisons, raw vs virgin breakdown, and care guides." },
  { id: "about", label: "About", desc: "Brand story page sharing the MANE edit philosophy and commitment to quality." },
];

const features = [
  { title: "5 Complete Pages", desc: "Home, Shop, Product Detail, Education, and About — fully designed and interactive." },
  { title: "Raw Hair Focused", desc: "Purpose-built for raw hair vendors with texture guides, comparison tables, and care education." },
  { title: "Conversion Optimized", desc: "Social proof bars, urgency indicators, trust badges, Afterpay/Klarna messaging, and sticky add-to-cart." },
  { title: "Editorial Design", desc: "Cormorant Garamond + Work Sans typography with a refined cream, brown, and muted blue palette." },
  { title: "Mobile Responsive", desc: "Every section adapts beautifully to any screen size with optimized touch interactions." },
  { title: "Shopify Ready", desc: "Clean semantic HTML structure designed for easy Shopify theme integration." },
];

const colorTokens = [
  { name: "Deep Brown", hex: "#351D14", text: "white" },
  { name: "Dark Brown", hex: "#483327", text: "white" },
  { name: "Warm Brown", hex: "#75604B", text: "white" },
  { name: "Muted Blue", hex: "#7B98B5", text: "white" },
  { name: "Light Blue", hex: "#A8BCCE", text: "#351D14" },
  { name: "Sand", hex: "#DACDBE", text: "#351D14" },
  { name: "Cream", hex: "#FAFAF8", text: "#351D14" },
];

export default function ManeEditShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Work Sans', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.deep, color: "rgba(255,255,255,.85)", textAlign: "center", padding: "10px 20px", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const }}>
        BeautyShare Pro — Store Design Preview
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.warm, fontSize: ".82rem", fontWeight: 500 }}>
            ← Back to Templates
          </Link>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 500, color: C.deep }}>
            MANE <span style={{ fontStyle: "italic", fontWeight: 300 }}>edit</span>
          </div>
          <a href="#" style={{ padding: "10px 28px", background: C.blue, color: "#fff", borderRadius: 4, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Use This Template
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.dark} 40%, ${C.blue} 100%)`, padding: "80px 24px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.blueLight, marginBottom: 16 }}>
            Premium Shopify Template
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
            MANE <em style={{ fontWeight: 300 }}>edit</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".95rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            A refined Shopify theme crafted exclusively for raw hair vendors. Editorial design meets conversion-focused functionality.
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
                borderBottom: activePage === p.id ? `2px solid ${C.blue}` : "2px solid transparent",
                fontFamily: "'Work Sans', sans-serif",
                fontSize: ".78rem",
                fontWeight: activePage === p.id ? 600 : 500,
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                color: activePage === p.id ? C.deep : C.warm,
                cursor: "pointer",
                transition: "all .2s ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active Page Description */}
        <div style={{ padding: "20px 0 12px", fontSize: ".85rem", color: C.warm, lineHeight: 1.7 }}>
          {pages.find((p) => p.id === activePage)?.desc}
        </div>

        {/* Iframe Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          border: `1px solid rgba(0,0,0,.08)`,
          boxShadow: "0 8px 32px rgba(53,29,20,.1)",
          marginBottom: 60,
          background: "#fff",
        }}>
          {/* Browser Chrome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: C.offWhite,
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
              color: C.warm,
              fontFamily: "monospace",
            }}>
              maneedit.com/{activePage === "home" ? "" : activePage}
            </div>
          </div>
          <iframe
            key={activePage}
            src={`/mane-edit-wrapper.html?page=${activePage}`}
            style={{
              width: "100%",
              height: 700,
              border: "none",
              display: "block",
            }}
            title={`MANE edit - ${activePage} page preview`}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 12 }}>
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
              <p style={{ fontSize: ".82rem", color: C.warm, lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 12 }}>
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
                border: c.hex === "#FAFAF8" ? "1px solid rgba(0,0,0,.1)" : "none",
                marginBottom: 8,
              }} />
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: C.deep }}>{c.name}</div>
              <div style={{ fontSize: ".68rem", color: C.warm }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 16 }}>Display Font</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.4rem", fontWeight: 400, color: C.deep, marginBottom: 8 }}>
              Cormorant Garamond
            </div>
            <p style={{ fontSize: ".82rem", color: C.warm, lineHeight: 1.7 }}>
              Used for headings, product names, prices, and editorial moments. Weights 300–700 with italic variants.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 32, border: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 16 }}>Body Font</div>
            <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "2rem", fontWeight: 400, color: C.deep, marginBottom: 8 }}>
              Work Sans
            </div>
            <p style={{ fontSize: ".82rem", color: C.warm, lineHeight: 1.7 }}>
              Used for body text, navigation, buttons, and UI elements. Clean and modern with excellent readability.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: C.deep, padding: "64px 24px", textAlign: "center" as const }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 16 }}>
          Ready to Launch Your <em style={{ fontWeight: 600, color: C.blueLight }}>Hair Brand</em>?
        </h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Get the MANE edit template and start selling with a store that matches the quality of your hair.
        </p>
        <a href="#" style={{ display: "inline-block", padding: "14px 36px", background: C.blue, color: "#fff", borderRadius: 4, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Use This Template
        </a>
      </div>
    </div>
  );
}

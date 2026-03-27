"use client";
import { useState } from "react";
import Link from "next/link";

const C = {
  mauveDark: "#7C4A4A", mauve: "#A6686A", rose: "#C08387",
  blush: "#E6BABB", linen: "#F5EDE8", mushroom: "#C4B5A5",
  truffle: "#8A7B72", copper: "#B87D5E", white: "#FFFAF8",
};

const pages = [
  { id: "home", label: "Home", desc: "Full homepage with asymmetric arch hero, scrolling trust marquee, texture carousel, bestseller cards, editorial split, video section, polaroid testimonials, and newsletter signup." },
  { id: "shop", label: "Shop", desc: "Collection page with mauve gradient hero, filter pills, and 3-column product grid with rounded cards and pill CTAs." },
  { id: "product", label: "Product", desc: "Full product page with arch gallery, variant pill selector, quantity controls, add-to-cart, trust badges, and specs." },
  { id: "about", label: "About", desc: "Brand story page with hero, mission section with arch image, and values grid." },
  { id: "haircare", label: "Hair Care", desc: "Complete hair care guide with 5 wash steps, maintenance tips, coloring guide, and FAQ accordion." },
  { id: "contact", label: "Contact", desc: "Two-column contact page with rounded form card, info cards with icons, and business hours." },
  { id: "faq", label: "FAQ", desc: "Help center with 8 accordion FAQ items and CTA banner." },
];

const features = [
  { title: "7 Complete Pages", desc: "Home, Shop, Product, About, Hair Care, Contact, and FAQ — fully designed with Shopify Liquid integration." },
  { title: "Feminine Aesthetic", desc: "Soft pink & mauve palette with arch shapes, rounded cards, polaroid testimonials, and frosted glass effects." },
  { title: "Conversion Focused", desc: "Trust marquee, floating badges, star ratings, pill CTAs, variant selectors, and prominent add-to-cart." },
  { title: "Unique Design Language", desc: "Arch-framed images, pill-shaped buttons, polaroid cards, and wave SVG footer — unlike any other template." },
  { title: "Mobile Responsive", desc: "Every section adapts beautifully with optimized touch interactions and stacked layouts." },
  { title: "Shopify Ready", desc: "Full Liquid theme with customizable sections, product forms, newsletter signup, and contact forms." },
];

const colorTokens = [
  { name: "Mauve Dark", hex: "#7C4A4A", text: "white" },
  { name: "Mauve", hex: "#A6686A", text: "white" },
  { name: "Rose", hex: "#C08387", text: "white" },
  { name: "Blush", hex: "#E6BABB", text: "#7C4A4A" },
  { name: "Linen", hex: "#F5EDE8", text: "#7C4A4A" },
  { name: "Mushroom", hex: "#C4B5A5", text: "#7C4A4A" },
  { name: "Copper", hex: "#B87D5E", text: "white" },
];

export default function RoseShowcase() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.linen, fontFamily: "'Nunito Sans', -apple-system, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: C.mauveDark, color: "rgba(255,255,255,.85)", textAlign: "center", padding: "10px 20px", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const }}>
        BeautyShare Pro — Store Design Preview
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,237,232,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(124,74,74,.06)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: C.truffle, fontSize: ".82rem", fontWeight: 500 }}>
            ← Back to Templates
          </Link>
          <div style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: C.mauveDark }}>
            ROS<span style={{ fontStyle: "italic", fontWeight: 300, color: C.rose }}>É</span>
          </div>
          <a href="#" style={{ padding: "10px 28px", background: C.mauveDark, color: C.blush, borderRadius: 999, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Use This Template
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.mauveDark} 0%, ${C.mauve} 50%, ${C.rose} 100%)`, padding: "80px 24px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.blush, marginBottom: 16 }}>
            Premium Shopify Template
          </div>
          <h1 style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
            ROS<em style={{ fontWeight: 300, color: C.blush }}>É</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".95rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            A soft, feminine Shopify theme with arch shapes, pill buttons, and a warm pink & mauve palette — crafted for premium hair extension brands.
          </p>
        </div>
      </section>

      {/* Page Tabs */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid rgba(124,74,74,.08)`, marginTop: 40, overflowX: "auto" as const }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              style={{
                flex: "0 0 auto",
                padding: "14px 20px",
                background: activePage === p.id ? C.blush : "none",
                border: "none",
                borderRadius: activePage === p.id ? "999px 999px 0 0" : 0,
                borderBottom: activePage === p.id ? `2px solid ${C.rose}` : "2px solid transparent",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: ".75rem",
                fontWeight: activePage === p.id ? 700 : 500,
                letterSpacing: ".08em",
                textTransform: "uppercase" as const,
                color: activePage === p.id ? C.mauveDark : C.truffle,
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
        <div style={{ padding: "20px 0 12px", fontSize: ".85rem", color: C.truffle, lineHeight: 1.7 }}>
          {pages.find((p) => p.id === activePage)?.desc}
        </div>

        {/* Iframe Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid rgba(124,74,74,.08)`,
          boxShadow: "0 8px 32px rgba(124,74,74,.1)",
          marginBottom: 60,
          background: "#fff",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: C.linen,
            borderBottom: "1px solid rgba(124,74,74,.06)",
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <div style={{
              flex: 1,
              background: "#fff",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: ".72rem",
              color: C.truffle,
              fontFamily: "monospace",
            }}>
              rosehair.com/{activePage === "home" ? "" : activePage}
            </div>
          </div>
          <iframe
            key={activePage}
            src={`/rose-wrapper.html?page=${activePage}`}
            style={{
              width: "100%",
              height: 700,
              border: "none",
              display: "block",
            }}
            title={`Rosé - ${activePage} page preview`}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.rose, marginBottom: 12 }}>
            Template Features
          </div>
          <h2 style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: C.mauveDark }}>
            Everything You <em style={{ fontWeight: 600 }}>Need</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 20,
              padding: 28,
              border: "1px solid rgba(124,74,74,.04)",
            }}>
              <h3 style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "1.15rem", fontWeight: 600, color: C.mauveDark, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: ".82rem", color: C.truffle, lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: C.rose, marginBottom: 12 }}>
            Design System
          </div>
          <h2 style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: C.mauveDark }}>
            Color <em style={{ fontWeight: 600 }}>Palette</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          {colorTokens.map((c, i) => (
            <div key={i} style={{ textAlign: "center" as const }}>
              <div style={{
                width: 72, height: 72, borderRadius: 16, background: c.hex,
                border: c.hex === "#F5EDE8" ? "1px solid rgba(124,74,74,.1)" : "none",
                marginBottom: 8,
              }} />
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: C.mauveDark }}>{c.name}</div>
              <div style={{ fontSize: ".68rem", color: C.truffle }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid rgba(124,74,74,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.rose, marginBottom: 16 }}>Display Font</div>
            <div style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "2.4rem", fontWeight: 400, color: C.mauveDark, marginBottom: 8 }}>
              Cormorant Infant
            </div>
            <p style={{ fontSize: ".82rem", color: C.truffle, lineHeight: 1.7 }}>
              Used for headings, product names, prices, and editorial moments. Elegant and feminine with beautiful italic variants.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid rgba(124,74,74,.04)" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.rose, marginBottom: 16 }}>Body Font</div>
            <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "2rem", fontWeight: 400, color: C.mauveDark, marginBottom: 8 }}>
              Nunito Sans
            </div>
            <p style={{ fontSize: ".82rem", color: C.truffle, lineHeight: 1.7 }}>
              Used for body text, navigation, buttons, and UI elements. Soft, rounded letterforms for a friendly, approachable feel.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: `linear-gradient(135deg, ${C.mauveDark}, ${C.mauve})`, padding: "64px 24px", textAlign: "center" as const }}>
        <h2 style={{ fontFamily: "'Cormorant Infant', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 16 }}>
          Ready to Launch Your <em style={{ fontWeight: 600, color: C.blush }}>Hair Brand</em>?
        </h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".88rem", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
          Get the Rosé template and start selling with a store as beautiful as your hair.
        </p>
        <a href="#" style={{ display: "inline-block", padding: "14px 36px", background: C.blush, color: C.mauveDark, borderRadius: 999, fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          Use This Template
        </a>
      </div>
    </div>
  );
}

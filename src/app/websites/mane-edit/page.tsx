"use client";
import { useState } from "react";
import Link from "next/link";

/* ── MANE edit color tokens ── */
const C = {
  deep: "#351D14",
  dark: "#483327",
  warm: "#75604B",
  blue: "#7B98B5",
  blueLight: "#A8BCCE",
  blueDark: "#5E7A96",
  bg: "#FAFAF8",
  white: "#FFFFFF",
  offWhite: "#F5F4F0",
  smoke: "#D1D1CC",
  sand: "#DACDBE",
};

/* ── Shared mini-preview pieces ── */
function PreviewHeader() {
  return (
    <div style={{ background: "rgba(250,250,248,.95)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 500, color: C.deep }}>MANE <em style={{ fontWeight: 300 }}>edit</em></span>
      <div style={{ display: "flex", gap: 10 }}>
        {["Shop","Education","About"].map(n => (
          <span key={n} style={{ fontSize: 5.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase" as const, color: C.warm }}>{n}</span>
        ))}
      </div>
      <div style={{ fontSize: 5, background: C.blue, color: "#fff", padding: "2px 6px", borderRadius: 2, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" as const }}>Book</div>
    </div>
  );
}

function PreviewFooter() {
  return (
    <div style={{ background: C.deep, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "Georgia,serif", fontSize: 8, color: "rgba(255,255,255,.7)" }}>MANE <em>edit</em></span>
      <div style={{ display: "flex", gap: 8 }}>
        {["About","Shipping","Contact"].map(n => (
          <span key={n} style={{ fontSize: 4.5, color: "rgba(255,255,255,.45)", letterSpacing: ".05em" }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function MiniCard({ label, hasBadge }: { label: string; hasBadge?: boolean }) {
  return (
    <div style={{ background: "#fff", borderRadius: 3, overflow: "hidden", border: "1px solid rgba(0,0,0,.04)" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: "linear-gradient(135deg, " + C.smoke + ", " + C.sand + ")" }}>
        {hasBadge && <div style={{ position: "absolute", top: 4, left: 4, background: C.blue, color: "#fff", fontSize: 3.5, fontWeight: 600, padding: "1px 4px", borderRadius: 1, letterSpacing: ".08em", textTransform: "uppercase" as const }}>New</div>}
      </div>
      <div style={{ padding: "5px 6px" }}>
        <div style={{ fontSize: 5, fontFamily: "Georgia,serif", color: C.deep, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 4.5, color: C.warm }}>$185.00</div>
      </div>
    </div>
  );
}


/* ── Page Previews ── */
function HomePreview() {
  return (
    <div style={{ background: C.bg, fontSize: 0, lineHeight: 1, overflow: "hidden" }}>
      {/* Announcement bar */}
      <div style={{ background: C.deep, color: "rgba(255,255,255,.8)", textAlign: "center" as const, padding: "4px 10px", fontSize: 4.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const }}>Free shipping on orders over $150</div>
      <PreviewHeader />
      {/* Hero */}
      <div style={{ position: "relative", height: 140, background: "linear-gradient(135deg, rgba(53,29,20,.55) 0%, rgba(72,51,39,.4) 40%, rgba(123,152,181,.2) 100%)", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, " + C.deep + " 0%, " + C.dark + " 50%, " + C.blueDark + " 100%)", opacity: 0.85 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 18px", maxWidth: 200 }}>
          <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.6)", marginBottom: 4 }}>Premium Hair Extensions</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#fff", lineHeight: 1.15, marginBottom: 6 }}>Your Hair, <em style={{ color: C.blueLight }}>Elevated</em></div>
          <div style={{ fontSize: 4.5, color: "rgba(255,255,255,.65)", lineHeight: 1.5, marginBottom: 8 }}>Ethically sourced raw hair for every texture</div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: C.blue, color: "#fff", fontSize: 4, fontWeight: 600, padding: "3px 10px", borderRadius: 2, letterSpacing: ".1em", textTransform: "uppercase" as const }}>Shop Now</div>
            <div style={{ background: "transparent", color: "#fff", fontSize: 4, fontWeight: 500, padding: "3px 10px", borderRadius: 2, border: "1px solid rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase" as const }}>Our Story</div>
          </div>
        </div>
      </div>
      {/* Feature strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
        {["100% Raw Hair","Custom Color Match","Free Consultation","60-Day Guarantee"].map((t, i) => (
          <div key={i} style={{ textAlign: "center" as const, padding: "8px 4px", borderRight: i < 3 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 5.5, color: C.deep, marginBottom: 1 }}>{t}</div>
            <div style={{ fontSize: 3.5, color: C.warm }}>Premium quality</div>
          </div>
        ))}
      </div>
      {/* Product Grid */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 8 }}>
          <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>Curated Collection</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: C.deep }}>Best Sellers</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          <MiniCard label="Raw Straight Bundle" hasBadge />
          <MiniCard label="Deep Wave Bundle" />
          <MiniCard label="Kinky Curly Bundle" />
        </div>
      </div>
      {/* Texture Guide teaser */}
      <div style={{ background: C.offWhite, padding: "10px 14px", textAlign: "center" as const }}>
        <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>Find Your Match</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: C.deep, marginBottom: 5 }}>Texture Guide</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {["Straight","Wavy","Curly","Coily"].map(t => (
            <div key={t} style={{ textAlign: "center" as const }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg," + C.smoke + "," + C.sand + ")", margin: "0 auto 3px" }} />
              <div style={{ fontSize: 4, color: C.dark }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
      <PreviewFooter />
    </div>
  );
}


function ShopPreview() {
  return (
    <div style={{ background: C.bg, fontSize: 0, lineHeight: 1, overflow: "hidden" }}>
      <div style={{ background: C.deep, color: "rgba(255,255,255,.8)", textAlign: "center" as const, padding: "4px 10px", fontSize: 4.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const }}>Free shipping on orders over $150</div>
      <PreviewHeader />
      {/* Collection Hero */}
      <div style={{ background: C.offWhite, padding: "14px 18px", textAlign: "center" as const }}>
        <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>The Collection</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: C.deep, marginBottom: 4 }}>Raw Hair Extensions</div>
        <div style={{ fontSize: 4.5, color: C.warm, maxWidth: 200, margin: "0 auto" }}>Ethically sourced, single-donor bundles in every texture</div>
      </div>
      {/* Filter bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["All","Straight","Wavy","Curly","Closures"].map(f => (
            <div key={f} style={{ fontSize: 4.5, color: f === "All" ? C.deep : C.warm, fontWeight: f === "All" ? 600 : 400, padding: "2px 5px", borderBottom: f === "All" ? "1px solid " + C.blue : "none" }}>{f}</div>
          ))}
        </div>
        <div style={{ fontSize: 4, color: C.warm }}>Sort by: Featured</div>
      </div>
      {/* Product grid 3x3 */}
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {["Raw Straight Bundle","Deep Wave Bundle","Kinky Curly Bundle","Body Wave Bundle","Loose Wave Bundle","Raw Curly Bundle","5x5 HD Closure","Frontal 13x4","Water Wave Bundle"].map((name, i) => (
            <MiniCard key={i} label={name} hasBadge={i === 0 || i === 3} />
          ))}
        </div>
      </div>
      <PreviewFooter />
    </div>
  );
}

function ProductPreview() {
  return (
    <div style={{ background: C.bg, fontSize: 0, lineHeight: 1, overflow: "hidden" }}>
      <div style={{ background: C.deep, color: "rgba(255,255,255,.8)", textAlign: "center" as const, padding: "4px 10px", fontSize: 4.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const }}>Free shipping on orders over $150</div>
      <PreviewHeader />
      {/* Product layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "12px 14px" }}>
        {/* Gallery */}
        <div>
          <div style={{ aspectRatio: "1/1", background: "linear-gradient(135deg," + C.smoke + "," + C.sand + ")", borderRadius: 4, marginBottom: 6 }} />
          <div style={{ display: "flex", gap: 4 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 28, height: 28, background: "linear-gradient(135deg," + C.smoke + "," + C.sand + ")", borderRadius: 2, border: i === 0 ? "1.5px solid " + C.blue : "1px solid rgba(0,0,0,.06)" }} />
            ))}
          </div>
        </div>
        {/* Product info */}
        <div>
          <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>Best Seller</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: C.deep, lineHeight: 1.2, marginBottom: 3 }}>Raw Straight Bundle</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
            <div style={{ fontSize: 5, color: "#D4A03C" }}>{String.fromCharCode(9733,9733,9733,9733,9733)}</div>
            <span style={{ fontSize: 4, color: C.warm }}>4.9 (127 reviews)</span>
          </div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: C.deep, marginBottom: 6 }}>$185.00</div>
          {/* Length selector */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 4.5, fontWeight: 600, color: C.dark, marginBottom: 3 }}>Length</div>
            <div style={{ display: "flex", gap: 3 }}>
              {['14"','16"','18"','20"','22"','24"'].map((l, i) => (
                <div key={l} style={{ fontSize: 4, padding: "2px 5px", borderRadius: 2, border: i === 2 ? "1.5px solid " + C.blue : "1px solid rgba(0,0,0,.12)", color: i === 2 ? C.blue : C.dark, fontWeight: i === 2 ? 600 : 400 }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ background: C.blue, color: "#fff", textAlign: "center" as const, padding: "5px 0", borderRadius: 3, fontSize: 5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, marginBottom: 5 }}>Add to Cart</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
            {["100% Raw Hair","Custom Color","Free Shipping"].map(f => (
              <div key={f} style={{ textAlign: "center" as const, padding: "4px 2px", background: C.offWhite, borderRadius: 2 }}>
                <div style={{ fontSize: 3.5, color: C.dark, fontWeight: 500 }}>{f}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PreviewFooter />
    </div>
  );
}


function EducationPreview() {
  return (
    <div style={{ background: C.bg, fontSize: 0, lineHeight: 1, overflow: "hidden" }}>
      <div style={{ background: C.deep, color: "rgba(255,255,255,.8)", textAlign: "center" as const, padding: "4px 10px", fontSize: 4.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const }}>Free shipping on orders over $150</div>
      <PreviewHeader />
      {/* Education Hero */}
      <div style={{ background: C.offWhite, padding: "14px 18px", textAlign: "center" as const }}>
        <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>Hair Education</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: C.deep, marginBottom: 4 }}>Know Your Hair</div>
        <div style={{ fontSize: 4.5, color: C.warm }}>Expert guides to help you choose, install, and maintain your extensions</div>
      </div>
      {/* Texture Cards */}
      <div style={{ padding: "10px 14px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 8 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: C.deep }}>Texture Library</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
          {[
            { name: "Straight", desc: "Sleek, smooth, versatile" },
            { name: "Body Wave", desc: "Natural bounce, soft S-pattern" },
            { name: "Deep Wave", desc: "Defined waves, full volume" },
            { name: "Kinky Curly", desc: "Tight coils, natural look" },
          ].map((t) => (
            <div key={t.name} style={{ background: "#fff", borderRadius: 3, overflow: "hidden", border: "1px solid rgba(0,0,0,.04)" }}>
              <div style={{ height: 36, background: "linear-gradient(135deg," + C.smoke + "," + C.sand + ")" }} />
              <div style={{ padding: "5px 5px" }}>
                <div style={{ fontSize: 5, fontFamily: "Georgia,serif", color: C.deep, marginBottom: 1 }}>{t.name}</div>
                <div style={{ fontSize: 3.5, color: C.warm, lineHeight: 1.3 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comparison table hint */}
      <div style={{ padding: "0 14px 10px" }}>
        <div style={{ background: "#fff", borderRadius: 3, border: "1px solid rgba(0,0,0,.06)", overflow: "hidden" }}>
          <div style={{ background: C.deep, color: "#fff", padding: "4px 8px", fontSize: 5, fontFamily: "Georgia,serif" }}>Hair Type Comparison</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", fontSize: 3.5, color: C.dark }}>
            {["Feature","Straight","Body Wave","Curly"].map((h, i) => (
              <div key={h} style={{ padding: "3px 5px", fontWeight: 600, borderBottom: "1px solid rgba(0,0,0,.06)", background: i === 0 ? C.offWhite : "transparent" }}>{h}</div>
            ))}
            {["Texture","Silky smooth","Soft S-wave","Tight coils"].map((v, i) => (
              <div key={i} style={{ padding: "3px 5px", borderBottom: "1px solid rgba(0,0,0,.04)", background: i === 0 ? C.offWhite : "transparent" }}>{v}</div>
            ))}
            {["Maintenance","Low","Medium","High"].map((v, i) => (
              <div key={i} style={{ padding: "3px 5px", background: i === 0 ? C.offWhite : "transparent" }}>{v}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Care Guide CTA */}
      <div style={{ background: C.deep, padding: "10px 14px", textAlign: "center" as const }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 8, color: "#fff", marginBottom: 3 }}>Care Guide</div>
        <div style={{ fontSize: 4, color: "rgba(255,255,255,.6)", marginBottom: 5 }}>Step-by-step maintenance for long-lasting hair</div>
        <div style={{ display: "inline-block", background: C.blue, color: "#fff", fontSize: 4, fontWeight: 600, padding: "3px 10px", borderRadius: 2, letterSpacing: ".08em", textTransform: "uppercase" as const }}>Read the Guide</div>
      </div>
      <PreviewFooter />
    </div>
  );
}

function AboutPreview() {
  return (
    <div style={{ background: C.bg, fontSize: 0, lineHeight: 1, overflow: "hidden" }}>
      <div style={{ background: C.deep, color: "rgba(255,255,255,.8)", textAlign: "center" as const, padding: "4px 10px", fontSize: 4.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const }}>Free shipping on orders over $150</div>
      <PreviewHeader />
      {/* About Hero */}
      <div style={{ position: "relative", height: 90, background: "linear-gradient(135deg," + C.deep + "," + C.dark + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const, position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.6)", marginBottom: 3 }}>Our Story</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#fff", lineHeight: 1.15 }}>The Art of <em style={{ color: C.blueLight }}>Raw Hair</em></div>
        </div>
      </div>
      {/* Philosophy */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 4, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: C.blue, marginBottom: 3 }}>Our Philosophy</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: C.deep, lineHeight: 1.2, marginBottom: 5 }}>Beauty Without Compromise</div>
            <div style={{ fontSize: 4.5, color: C.warm, lineHeight: 1.5 }}>We believe luxury hair should be ethically sourced and accessible to every woman who wants to feel confident.</div>
          </div>
          <div style={{ aspectRatio: "4/3", background: "linear-gradient(135deg," + C.smoke + "," + C.sand + ")", borderRadius: 4 }} />
        </div>
      </div>
      {/* Values */}
      <div style={{ background: C.offWhite, padding: "10px 14px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 8 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: C.deep }}>Our Values</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {[
            { title: "Ethically Sourced", desc: "Single-donor, fair-trade partnerships" },
            { title: "Quality First", desc: "Triple-inspected raw hair only" },
            { title: "Community", desc: "Education and empowerment" },
          ].map(v => (
            <div key={v.title} style={{ textAlign: "center" as const, padding: "6px 4px" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.blue, margin: "0 auto 4px", opacity: 0.15 }} />
              <div style={{ fontSize: 5, fontFamily: "Georgia,serif", color: C.deep, marginBottom: 2 }}>{v.title}</div>
              <div style={{ fontSize: 3.5, color: C.warm, lineHeight: 1.3 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <PreviewFooter />
    </div>
  );
}


/* ── Preview map ── */
const previewMap: Record<string, () => React.JSX.Element> = {
  home: HomePreview,
  shop: ShopPreview,
  product: ProductPreview,
  education: EducationPreview,
  about: AboutPreview,
};

/* ── Page data ── */
const pages = [
  { id: "home", label: "Home", desc: "Hero video, feature strip, product grid, texture guide, testimonials, and newsletter signup" },
  { id: "shop", label: "Shop", desc: "Collection hero, filter bar, and responsive product grid with badges and quick-add" },
  { id: "product", label: "Product Detail", desc: "Image gallery, variant selectors, reviews, FAQ accordion, and trust badges" },
  { id: "education", label: "Education", desc: "Texture library cards, comparison table, and step-by-step care guides" },
  { id: "about", label: "About", desc: "Brand story hero, philosophy section, values grid, and team showcase" },
];

const features = [
  { icon: "palette", title: "Custom Color System", desc: "Deep brown, muted blue, cream, and warm neutrals - a sophisticated palette that conveys luxury and trust." },
  { icon: "type", title: "Editorial Typography", desc: "Cormorant Garamond headlines paired with Work Sans body text for a refined, magazine-quality feel." },
  { icon: "layout", title: "5 Complete Pages", desc: "Home, Shop, Product Detail, Education, and About - everything needed for a full Shopify storefront." },
  { icon: "smartphone", title: "Mobile-First Design", desc: "Fully responsive layouts optimized for every screen size, from mobile to ultra-wide desktop." },
  { icon: "zap", title: "Shopify OS 2.0", desc: "Built on Online Store 2.0 architecture with customizable sections, metafields, and dynamic sources." },
  { icon: "image", title: "Rich Media Support", desc: "Hero video backgrounds, product image galleries with zoom, and Instagram UGC integration." },
];

const colorTokens = [
  { name: "Deep Brown", hex: "#351D14", light: false },
  { name: "Muted Blue", hex: "#7B98B5", light: false },
  { name: "Cream", hex: "#FAFAF8", light: true },
  { name: "Warm Brown", hex: "#483327", light: false },
  { name: "Light Blue", hex: "#A8BCCE", light: false },
  { name: "Sand", hex: "#DACDBE", light: true },
];


/* ── Icon helper (simple SVG icons) ── */
function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    palette: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.02-.23-.27-.38-.62-.38-1.02 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.48-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
    type: "M5 4v3h5.5v12h3V7H19V4H5z",
    layout: "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z",
    smartphone: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",
    zap: "M13 2L3 14h8l-1 8 10-12h-8l1-8z",
    image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name] || icons.layout} fill="none" stroke="currentColor" />
    </svg>
  );
}


/* ── Main Page Component ── */
export default function ManeEditShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const Preview = previewMap[pages[activeTab].id];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/websites" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.6)", fontSize: 14, textDecoration: "none" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Themes
          </Link>
          <Link href="/login" style={{ background: C.blue, color: "#fff", padding: "10px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Get This Theme
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" as const }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(123,152,181,.12)", color: C.blue, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, marginBottom: 24 }}>Shopify Theme</div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
            MANE <em style={{ fontWeight: 300 }}>edit</em>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.55)", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            A premium Shopify theme designed for raw hair extension brands. Editorial typography, sophisticated color palette, and conversion-optimized layouts.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
            <Link href="/login" style={{ background: C.blue, color: "#fff", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Get This Theme
            </Link>
            <a href="#preview" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
              View Pages
            </a>
          </div>
        </div>
      </section>

      {/* Hero Browser Mockup */}
      <section style={{ maxWidth: 1000, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ background: "#1a1a1a", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "rgba(255,255,255,.35)", textAlign: "center" as const }}>mane-edit.myshopify.com</div>
          </div>
          <div style={{ maxHeight: 480, overflow: "hidden" }}>
            <HomePreview />
          </div>
        </div>
      </section>


      {/* Page Tabs Section */}
      <section id="preview" style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 12 }}>Template Pages</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", maxWidth: 480, margin: "0 auto" }}>Five fully designed pages covering every aspect of a hair extension storefront</p>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" as const }}>
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(i)}
              style={{
                background: activeTab === i ? C.blue : "rgba(255,255,255,.06)",
                color: activeTab === i ? "#fff" : "rgba(255,255,255,.5)",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: activeTab === i ? 600 : 400,
                cursor: "pointer",
                transition: "all .2s ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {/* Preview + Description */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
          <div style={{ background: "#1a1a1a", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 5, padding: "5px 12px", fontSize: 11, color: "rgba(255,255,255,.3)", textAlign: "center" as const }}>
                mane-edit.myshopify.com/{pages[activeTab].id === "home" ? "" : pages[activeTab].id}
              </div>
            </div>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              <Preview />
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 8 }}>{pages[activeTab].label}</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 24 }}>{pages[activeTab].desc}</p>
            <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase" as const, marginBottom: 12 }}>Key Sections</div>
              {pages[activeTab].id === "home" && ["Hero Video Background","Feature Strip (4-up)","Best Sellers Grid","Texture Guide","Editorial Banner","Testimonials","Newsletter Signup"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{s}</span>
                </div>
              ))}
              {pages[activeTab].id === "shop" && ["Collection Hero","Filter Bar","Product Grid (3-col)","Quick-Add Buttons","Pagination"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{s}</span>
                </div>
              ))}
              {pages[activeTab].id === "product" && ["Image Gallery + Thumbnails","Variant Selectors","Star Reviews","Add to Cart","Trust Badges","FAQ Accordion"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{s}</span>
                </div>
              ))}
              {pages[activeTab].id === "education" && ["Texture Library Cards","Hair Type Comparison Table","Step-by-Step Care Guide","Video Tutorials"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{s}</span>
                </div>
              ))}
              {pages[activeTab].id === "about" && ["Brand Story Hero","Philosophy Section","Values Grid (3-up)","Team Showcase","Instagram Feed"].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.blue }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 12 }}>Theme Features</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)" }}>Everything you need to launch a premium hair extension store</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(123,152,181,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, marginBottom: 16 }}>
                <FeatureIcon name={f.icon} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      <section style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 12 }}>Color Palette</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)" }}>A sophisticated palette inspired by natural hair tones and luxury beauty</p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
          {colorTokens.map((c) => (
            <div key={c.hex} style={{ textAlign: "center" as const }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, background: c.hex, border: c.light ? "1px solid rgba(255,255,255,.15)" : "none", marginBottom: 8 }} />
              <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section style={{ maxWidth: 800, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 12 }}>Typography</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 28, color: "#fff", marginBottom: 8 }}>Cormorant Garamond</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 12 }}>Display & Headlines</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm</div>
          </div>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 8 }}>Work Sans</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginBottom: 12 }}>Body & UI Elements</div>
            <div style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center" as const, padding: "60px 24px 100px" }}>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "#fff", marginBottom: 16 }}>Ready to Launch Your Store?</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", maxWidth: 480, margin: "0 auto 32px" }}>Join BeautyShare Pro to access MANE edit and our full library of premium beauty templates.</p>
        <Link href="/login" style={{ display: "inline-block", background: C.blue, color: "#fff", padding: "16px 40px", borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
          Get Started
        </Link>
      </section>
    </div>
  );
}

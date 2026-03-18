'use client';

import Link from 'next/link';

const products = [
  {
    title: 'Raw Hair Business Blueprint',
    subtitle: 'FREE GUIDE',
    description: 'The exact 30-day launch framework used by 1,200+ BSP members. 7 parts, 40+ action items, week-by-week roadmap.',
    price: 'Free',
    priceNote: 'No credit card required',
    href: '/products/blueprint',
    badge: 'FREE DOWNLOAD',
    badgeColor: 'bg-[#E2AD37]',
    accent: '#E2AD37',
    features: ['30-day launch roadmap', '$1K warm market DM script', '5 most profitable niches', 'Revenue stacking strategy'],
  },
  {
    title: 'First $1K Fast Track',
    subtitle: '7-DAY ACTION WORKBOOK',
    description: 'Every single action mapped out from Day 1 to first sale. DM scripts, pricing formula, content calendar, and first sale checklist.',
    price: '$97',
    priceNote: 'One-time · Instant PDF delivery',
    href: '/products/fast-track',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-[#FA6A27]',
    accent: '#FA6A27',
    features: ['7-day launch action plan', '20 warm market DM scripts', 'Pricing formula guide', 'First sale checklist'],
  },
  {
    title: 'BSP Marketing Playbook',
    subtitle: 'COMPLETE MARKETING SYSTEM',
    description: 'Five modules covering Instagram, TikTok, paid ads, email, repeat buyers, and referrals. Everything to drive consistent customers.',
    price: '$197',
    priceNote: 'One-time · Lifetime access',
    href: '/products/playbook',
    badge: 'BEST VALUE',
    badgeColor: 'bg-[#D61465]',
    accent: '#D61465',
    features: ['Instagram + TikTok growth engine', '$5/day paid ads starter kit', 'Email list builder + sequences', 'Repeat buyer & referral system'],
  },
  {
    title: 'Stylist Accelerator Pack',
    subtitle: 'INSTALL + HAIR PACKAGES',
    description: 'Start offering Install + Hair extension packages to your clients. Package pricing blueprint, booking scripts, and profit calculator.',
    price: '$97',
    priceNote: 'One-time · Instant access',
    href: '/products/stylist',
    badge: 'FOR STYLISTS',
    badgeColor: 'bg-[#9B6FBF]',
    accent: '#9B6FBF',
    features: ['Package pricing blueprint', 'Client booking scripts', 'BSP ordering workflow', 'Interactive profit calculator'],
  },
];

export default function EducationPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap');
        .edu-page { font-family: 'Lato', sans-serif; color: #1A0A00; background: #F9F6F2; }
        .edu-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .edu-nav { background: #0A0A0A; padding: 14px 0; border-bottom: 1px solid #1a1a1a; }
        .edu-nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .edu-nav-logo { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 19px; color: #fff; }
        .edu-nav-logo span { color: #FA6A27; }
        .edu-nav-links { display: flex; gap: 24px; align-items: center; }
        .edu-nav-links a { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
        .edu-nav-links a:hover { color: #FA6A27; }
        .edu-nav-links a.active { color: #fff; }
        .edu-hero { background: #0A0A0A; padding: 80px 0 60px; text-align: center; position: relative; overflow: hidden; }
        .edu-hero::before { content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(220,189,239,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 50% at 20% 30%, rgba(249,115,22,0.05) 0%, transparent 60%);
          pointer-events: none; }
        .edu-hero-inner { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; padding: 0 24px; }
        .edu-eyebrow { display: inline-block; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 6px;
          background: rgba(249,115,22,0.15); color: #FA6A27; border: 1px solid rgba(249,115,22,0.25); margin-bottom: 20px; }
        .edu-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(32px, 5vw, 52px);
          color: #fff; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 16px; }
        .edu-title .or { color: #FA6A27; }
        .edu-title .pk { color: #D61465; }
        .edu-sub { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.6); max-width: 540px; margin: 0 auto; }
        .edu-grid { max-width: 1100px; margin: 0 auto; padding: 60px 24px 80px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .edu-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #E8E0D8;
          transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; }
        .edu-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .edu-card-stripe { height: 4px; }
        .edu-card-badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px;
          border-radius: 4px; color: #fff; margin-bottom: 12px; }
        .edu-card-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }
        .edu-card-subtitle { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .edu-card-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px;
          color: #1A0A00; line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.5px; }
        .edu-card-desc { font-size: 14px; line-height: 1.6; color: #5A3020; margin-bottom: 20px; }
        .edu-card-features { list-style: none; margin-bottom: 24px; flex: 1; }
        .edu-card-features li { display: flex; align-items: flex-start; gap: 8px; font-size: 13px;
          color: #1A0A00; margin-bottom: 8px; line-height: 1.4; }
        .edu-card-features li::before { content: '✓'; font-weight: 700; flex-shrink: 0; }
        .edu-card-price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px; }
        .edu-card-price { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 32px; line-height: 1; }
        .edu-card-price-note { font-size: 12px; color: #888; }
        .edu-card-btn { display: block; width: 100%; padding: 14px; font-family: 'Montserrat', sans-serif;
          font-weight: 800; font-size: 14px; border: none; border-radius: 8px; cursor: pointer;
          color: #fff; text-align: center; text-decoration: none; letter-spacing: 0.3px;
          transition: transform 0.2s, box-shadow 0.2s; }
        .edu-card-btn:hover { transform: translateY(-1px); }
        .edu-bottom-cta { background: #0A0A0A; padding: 60px 0; text-align: center; }
        .edu-bottom-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(24px, 4vw, 36px);
          color: #fff; letter-spacing: -0.8px; margin-bottom: 12px; }
        .edu-bottom-sub { font-size: 16px; color: rgba(255,255,255,0.55); margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .edu-bottom-btn { display: inline-block; background: linear-gradient(135deg, #FA6A27, #D61465);
          color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px;
          padding: 16px 40px; border-radius: 8px; text-decoration: none;
          box-shadow: 0 6px 24px rgba(249,115,22,0.3); transition: transform 0.2s; }
        .edu-bottom-btn:hover { transform: translateY(-2px); }
        .edu-footer { background: #0A0A0A; padding: 28px 0; text-align: center; border-top: 1px solid #111; }
        .edu-footer-logo { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 17px; color: #fff; margin-bottom: 6px; }
        .edu-footer-logo span { color: #FA6A27; }
        .edu-footer-copy { font-size: 12px; color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr; }
          .edu-nav-links { display: none; }
        }
      `}} />

      <div className="edu-page">
        {/* Nav */}
        <nav className="edu-nav">
          <div className="edu-nav-inner">
            <div>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div className="edu-nav-logo">Beauty<span>Share</span> Pro</div>
              </Link>
            </div>
            <div className="edu-nav-links">
              <Link href="/">Home</Link>
              <Link href="/webinar">Free Webinar</Link>
              <Link href="/education" className="active">Education</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup" style={{
                background: 'linear-gradient(135deg, #FA6A27, #D61465)',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: 700,
              }}>Join BSP →</Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="edu-hero">
          <div className="edu-hero-inner">
            <div className="edu-eyebrow">Education & Resources</div>
            <h1 className="edu-title">
              Learn. Launch. <span className="or">Scale.</span>
            </h1>
            <p className="edu-sub">
              Whether you&apos;re just starting or already selling — these resources give you the exact playbooks, scripts, and systems to grow your raw hair business.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <div className="edu-grid">
          {products.map((p, i) => (
            <div key={i} className="edu-card">
              <div className="edu-card-stripe" style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}88)` }} />
              <div className="edu-card-body">
                <span className="edu-card-badge" style={{ background: p.accent }}>{p.badge}</span>
                <div className="edu-card-subtitle" style={{ color: p.accent }}>{p.subtitle}</div>
                <h3 className="edu-card-title">{p.title}</h3>
                <p className="edu-card-desc">{p.description}</p>
                <ul className="edu-card-features">
                  {p.features.map((f, j) => (
                    <li key={j} style={{ '--check-color': p.accent } as React.CSSProperties}>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="edu-card-price-row">
                  <span className="edu-card-price" style={{ color: p.accent }}>{p.price}</span>
                  <span className="edu-card-price-note">{p.priceNote}</span>
                </div>
                <Link href={p.href} className="edu-card-btn" style={{
                  background: p.accent,
                  boxShadow: `0 4px 18px ${p.accent}44`,
                }}>
                  {p.price === 'Free' ? 'Get Your Free Copy →' : `Get Instant Access — ${p.price} →`}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="edu-bottom-cta">
          <div style={{ padding: '0 24px' }}>
            <h2 className="edu-bottom-title">Not sure where to start?</h2>
            <p className="edu-bottom-sub">
              Join our free webinar — Chanel walks you through the entire BeautyShare Pro model and how to launch in 30 days.
            </p>
            <Link href="/webinar" className="edu-bottom-btn">
              Register for the Free Webinar →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="edu-footer">
          <div className="edu-footer-logo">Beauty<span>Share</span> Pro</div>
          <div className="edu-footer-copy">© 2026 BeautyShare Pro. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

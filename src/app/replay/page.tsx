'use client';

import Link from 'next/link';

export default function ReplayPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap');
        .replay-page { font-family: 'Lato', sans-serif; color: #1A0A00; background: #0A0A0A; }
        .replay-page * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Nav */
        .rp-nav { background: #0A0A0A; padding: 14px 0; border-bottom: 1px solid #1a1a1a; }
        .rp-nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .rp-nav-logo { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 19px; color: #fff; text-decoration: none; }
        .rp-nav-logo span { color: #FA6A27; }
        .rp-nav-links { display: flex; gap: 20px; align-items: center; }
        .rp-nav-links a { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .rp-nav-links a:hover { color: #FA6A27; }

        /* Urgency bar */
        .rp-urgency { background: linear-gradient(90deg, #FA6A27, #D61465); padding: 12px 0; text-align: center; }
        .rp-urgency-text { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; color: #fff; }
        .rp-urgency-text .timer { background: rgba(0,0,0,0.25); padding: 2px 8px; border-radius: 4px; margin: 0 4px; font-variant-numeric: tabular-nums; }

        /* Hero */
        .rp-hero { padding: 48px 0 0; text-align: center; position: relative; }
        .rp-hero::before { content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(249,115,22,0.08) 0%, transparent 70%);
          pointer-events: none; }
        .rp-hero-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
        .rp-badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 6px;
          background: rgba(249,115,22,0.15); color: #FA6A27; border: 1px solid rgba(249,115,22,0.25); margin-bottom: 20px; }
        .rp-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(28px, 4.5vw, 44px);
          color: #fff; line-height: 1.1; letter-spacing: -1.2px; margin-bottom: 12px; }
        .rp-title .or { color: #FA6A27; }
        .rp-sub { font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.55); margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; }

        /* Video */
        .rp-video-wrap { max-width: 860px; margin: 0 auto 0; padding: 0 24px; }
        .rp-video { position: relative; width: 100%; padding-top: 56.25%; background: #111; border-radius: 16px;
          overflow: hidden; border: 2px solid rgba(249,115,22,0.2);
          box-shadow: 0 24px 80px rgba(249,115,22,0.12), 0 0 0 1px rgba(255,255,255,0.04); }
        .rp-video iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .rp-video-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #111, #1a1a1a); cursor: pointer; }
        .rp-play-btn { width: 80px; height: 80px; border-radius: 50%; background: #FA6A27;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(249,115,22,0.4); transition: transform 0.2s; }
        .rp-play-btn:hover { transform: scale(1.08); }
        .rp-play-btn svg { width: 32px; height: 32px; fill: #fff; margin-left: 4px; }

        /* Gradient divider */
        .rp-divider { height: 3px; background: linear-gradient(90deg, #FA6A27, #D61465, #9B6FBF); margin-top: 60px; }

        /* Offers section */
        .rp-offers { background: #F9F6F2; padding: 72px 0; }
        .rp-offers-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .rp-offers-eyebrow { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; color: #FA6A27; text-align: center; margin-bottom: 12px; }
        .rp-offers-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(26px, 4vw, 38px);
          color: #1A0A00; text-align: center; letter-spacing: -0.8px; margin-bottom: 12px; }
        .rp-offers-sub { font-size: 16px; color: #5A3020; text-align: center; max-width: 560px; margin: 0 auto 48px; line-height: 1.6; }

        .rp-offer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .rp-offer-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #E8E0D8;
          transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; }
        .rp-offer-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.08); }
        .rp-offer-stripe { height: 4px; }
        .rp-offer-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .rp-offer-badge { display: inline-block; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 10px;
          border-radius: 4px; color: #fff; margin-bottom: 12px; width: fit-content; }
        .rp-offer-title { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 18px;
          color: #1A0A00; margin-bottom: 8px; line-height: 1.25; }
        .rp-offer-desc { font-size: 13px; color: #5A3020; line-height: 1.6; margin-bottom: 20px; flex: 1; }
        .rp-offer-price { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 28px; margin-bottom: 4px; }
        .rp-offer-note { font-size: 11px; color: #888; margin-bottom: 16px; }
        .rp-offer-btn { display: block; width: 100%; padding: 13px; font-family: 'Montserrat', sans-serif;
          font-weight: 800; font-size: 13px; border: none; border-radius: 8px; cursor: pointer;
          color: #fff; text-align: center; text-decoration: none; transition: transform 0.2s; }
        .rp-offer-btn:hover { transform: translateY(-1px); }

        /* Bottom CTA */
        .rp-bottom { background: linear-gradient(135deg, #FA6A27, #D61465); padding: 60px 0; text-align: center; }
        .rp-bottom-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(24px, 4vw, 36px);
          color: #fff; letter-spacing: -0.5px; margin-bottom: 12px; }
        .rp-bottom-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 28px; }
        .rp-bottom-btn { display: inline-block; background: #0A0A0A; color: #fff;
          font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px;
          padding: 16px 40px; border-radius: 8px; text-decoration: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3); transition: transform 0.2s; }
        .rp-bottom-btn:hover { transform: translateY(-2px); }

        /* Footer */
        .rp-footer { background: #0A0A0A; padding: 28px 0; text-align: center; border-top: 1px solid #111; }
        .rp-footer-logo { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 17px; color: #fff; margin-bottom: 6px; }
        .rp-footer-logo span { color: #FA6A27; }
        .rp-footer-copy { font-size: 12px; color: rgba(255,255,255,0.3); }

        @media (max-width: 768px) {
          .rp-offer-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
          .rp-nav-links { display: none; }
        }
      `}} />

      <div className="replay-page">
        {/* Nav */}
        <nav className="rp-nav">
          <div className="rp-nav-inner">
            <Link href="/" className="rp-nav-logo">Beauty<span>Share</span> Pro</Link>
            <div className="rp-nav-links">
              <Link href="/education">Education</Link>
              <Link href="/webinar">Register Live</Link>
              <Link href="/signup" style={{
                background: 'linear-gradient(135deg, #FA6A27, #D61465)',
                color: '#fff', padding: '8px 20px', borderRadius: '6px',
              }}>Join BSP →</Link>
            </div>
          </div>
        </nav>

        {/* Urgency Bar */}
        <div className="rp-urgency">
          <div className="rp-urgency-text">
            This replay expires soon — watch now before it&apos;s removed
          </div>
        </div>

        {/* Hero + Video */}
        <section className="rp-hero">
          <div className="rp-hero-inner">
            <div className="rp-badge">Webinar Replay</div>
            <h1 className="rp-title">
              Launch Your <span className="or">Hair Business</span> in 30 Days — No Inventory
            </h1>
            <p className="rp-sub">
              Watch Chanel walk through the exact BeautyShare Pro model — how she built a six-figure raw hair brand with zero inventory, and how you can do the same this month.
            </p>
          </div>
        </section>

        <div className="rp-video-wrap">
          <div className="rp-video">
            {/* Replace YOUR_VIDEO_ID with actual YouTube video ID */}
            <div className="rp-video-placeholder" onClick={(e) => {
              const wrap = e.currentTarget.parentElement;
              if (wrap) {
                wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
              }
            }}>
              <div className="rp-play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="rp-divider" />

        {/* Offers */}
        <section className="rp-offers">
          <div className="rp-offers-inner">
            <div className="rp-offers-eyebrow">Webinar-Only Pricing</div>
            <h2 className="rp-offers-title">Ready to launch? Pick your path.</h2>
            <p className="rp-offers-sub">
              These resources are only available at this price for replay viewers. They&apos;re built to get you results if you apply all of the steps.
            </p>

            <div className="rp-offer-grid">
              {/* Free Blueprint */}
              <div className="rp-offer-card">
                <div className="rp-offer-stripe" style={{ background: '#E2AD37' }} />
                <div className="rp-offer-body">
                  <div className="rp-offer-badge" style={{ background: '#E2AD37' }}>FREE</div>
                  <h3 className="rp-offer-title">Raw Hair Business Blueprint</h3>
                  <p className="rp-offer-desc">The 30-day launch framework with 40+ action items. Start here if you&apos;re brand new.</p>
                  <div className="rp-offer-price" style={{ color: '#E2AD37' }}>Free</div>
                  <div className="rp-offer-note">No credit card required</div>
                  <Link href="/products/blueprint" className="rp-offer-btn" style={{ background: '#E2AD37' }}>
                    Download Free →
                  </Link>
                </div>
              </div>

              {/* Fast Track */}
              <div className="rp-offer-card">
                <div className="rp-offer-stripe" style={{ background: 'linear-gradient(90deg, #FA6A27, #D61465)' }} />
                <div className="rp-offer-body">
                  <div className="rp-offer-badge" style={{ background: '#FA6A27' }}>MOST POPULAR</div>
                  <h3 className="rp-offer-title">First $1K Fast Track</h3>
                  <p className="rp-offer-desc">Your 7-day action plan with DM scripts, pricing formula, and first sale checklist.</p>
                  <div className="rp-offer-price" style={{ color: '#FA6A27' }}>$67 <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>$97</span></div>
                  <div className="rp-offer-note">Webinar replay price · normally $97</div>
                  <Link href="/products/fast-track" className="rp-offer-btn" style={{ background: '#FA6A27', boxShadow: '0 4px 18px rgba(249,115,22,0.35)' }}>
                    Get Instant Access — $67 →
                  </Link>
                </div>
              </div>

              {/* Marketing Playbook */}
              <div className="rp-offer-card">
                <div className="rp-offer-stripe" style={{ background: 'linear-gradient(90deg, #D61465, #9B6FBF)' }} />
                <div className="rp-offer-body">
                  <div className="rp-offer-badge" style={{ background: '#D61465' }}>BEST VALUE</div>
                  <h3 className="rp-offer-title">BSP Marketing Playbook</h3>
                  <p className="rp-offer-desc">Complete marketing system — Instagram, ads, email, referrals. Everything to scale.</p>
                  <div className="rp-offer-price" style={{ color: '#D61465' }}>$147 <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>$197</span></div>
                  <div className="rp-offer-note">Webinar replay price · normally $197</div>
                  <Link href="/products/playbook" className="rp-offer-btn" style={{ background: '#D61465', boxShadow: '0 4px 18px rgba(214,20,101,0.3)' }}>
                    Get the Full System — $147 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rp-bottom">
          <div style={{ padding: '0 24px' }}>
            <h2 className="rp-bottom-title">Ready to join BeautyShare Pro?</h2>
            <p className="rp-bottom-sub">Get wholesale pricing, automated fulfillment, and your own branded store.</p>
            <Link href="/signup" className="rp-bottom-btn">Become a BSP Member →</Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="rp-footer">
          <div className="rp-footer-logo">Beauty<span>Share</span> Pro</div>
          <div className="rp-footer-copy">© 2026 BeautyShare Pro. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

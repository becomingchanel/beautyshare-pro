'use client';

import { useEffect } from 'react';

export default function MarketingPlaybookPage() {
  useEffect(() => {
    // Execute inline scripts after component mounts
    const container = document.getElementById('page-root');
    if (!container) return;
    const scriptEl = container.querySelector('script[data-dynamic]');
    if (scriptEl) {
      const s = document.createElement('script');
      s.textContent = scriptEl.textContent;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div id="page-root">
      <style dangerouslySetInnerHTML={{ __html: `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --or:#FA6A27;--or-d:#E05A18;--or-l:#FFF3EC;--or-m:#FFE4D0;
  --pk:#D61465;--pk-l:#FCE8F2;--pk-m:#F4C0D5;
  --lv:#DCBDEF;--lv-d:#9B6FBF;--lv-l:#F5EDFB;
  --gd:#E2AD37;--gd-l:#FEF9E7;
  --black:#0A0A0A;--dark:#111;--white:#fff;--off:#F9F6F2;
  --text:#1A0A00;--text-med:#5A3020;--text-lt:#888;--border:#E8E0D8;
  --green:#1E6B3C;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}
.container{max-width:900px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:680px;margin:0 auto;padding:0 24px;}

.nav{background:var(--black);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:18px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-tag{font-size:11px;color:rgba(255,255,255,0.4);font-family:var(--fh);font-weight:600;letter-spacing:.5px;}
.progress-accent{height:4px;background:linear-gradient(90deg,var(--pk),var(--lv-d),var(--gd));}

/* HERO */
.hero{background:var(--black);padding:60px 0 0;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 55% 60% at 50% 40%,rgba(214,20,101,0.1) 0%,transparent 65%);
  pointer-events:none;}
.hero-inner{position:relative;z-index:1;text-align:center;padding:0 24px;}
.hero-kicker{display:inline-flex;align-items:center;gap:8px;
  background:rgba(214,20,101,0.15);border:1px solid rgba(214,20,101,0.35);
  border-radius:100px;padding:6px 18px;margin-bottom:22px;
  font-family:var(--fh);font-weight:700;font-size:10px;color:var(--pk);
  letter-spacing:2px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(30px,5vw,56px);
  color:white;letter-spacing:-1.5px;line-height:1.05;margin-bottom:16px;}
.hero-title .pk{color:var(--pk);}
.hero-sub{font-size:17px;color:rgba(255,255,255,0.6);line-height:1.7;
  max-width:560px;margin:0 auto 40px;}
.hero-badges{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;margin-bottom:48px;}
.hbadge{display:flex;align-items:center;gap:7px;
  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
  border-radius:8px;padding:8px 16px;
  font-family:var(--fh);font-weight:700;font-size:11px;color:rgba(255,255,255,0.7);}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);
  border-top:1px solid rgba(255,255,255,0.07);margin-top:0;}
.hstat{padding:24px 12px;text-align:center;border-right:1px solid rgba(255,255,255,0.07);}
.hstat:last-child{border-right:none;}
.hstat-num{font-family:var(--fh);font-weight:900;font-size:24px;display:block;line-height:1;}
.hstat-lbl{font-size:11px;color:rgba(255,255,255,0.4);margin-top:5px;}

/* SECTIONS */
.modules-intro{padding:64px 0 0;text-align:center;}
.section-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;color:var(--pk);margin-bottom:12px;display:block;}
.section-title{font-family:var(--fh);font-weight:900;font-size:clamp(24px,3.5vw,38px);
  color:var(--text);letter-spacing:-.8px;line-height:1.15;margin-bottom:12px;}
.section-sub{font-size:15px;color:var(--text-med);line-height:1.7;max-width:560px;margin:0 auto 56px;}

/* MODULE CARDS */
.module{margin-bottom:28px;background:white;border-radius:20px;overflow:hidden;
  box-shadow:0 4px 24px rgba(0,0,0,0.06);border:1px solid var(--border);}
.module-header{display:flex;align-items:stretch;}
.mod-accent{width:6px;flex-shrink:0;}
.mod-accent-pk{background:linear-gradient(180deg,var(--pk),var(--lv-d));}
.mod-accent-or{background:linear-gradient(180deg,var(--or),var(--pk));}
.mod-accent-lv{background:linear-gradient(180deg,var(--lv-d),var(--gd));}
.mod-accent-gd{background:linear-gradient(180deg,var(--gd),var(--or));}
.mod-accent-all{background:linear-gradient(180deg,var(--pk),var(--or),var(--lv-d),var(--gd));}
.mod-top{padding:28px 32px 24px;border-bottom:1px solid var(--border);flex:1;}
.mod-num-label{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
.mod-title{font-family:var(--fh);font-weight:900;font-size:22px;
  color:var(--text);line-height:1.2;margin-bottom:8px;}
.mod-desc{font-size:14px;color:var(--text-med);line-height:1.65;}
.mod-body{padding:24px 32px;}
.mod-items{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.mod-item{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:var(--text);line-height:1.45;}
.mod-check{font-weight:900;font-size:13px;flex-shrink:0;margin-top:2px;}
.mod-check-pk{color:var(--pk);}
.mod-check-or{color:var(--or);}
.mod-check-lv{color:var(--lv-d);}
.mod-check-gd{color:#8A6800;}

/* TEMPLATES */
.templates-section{background:var(--black);padding:64px 0;margin-top:64px;position:relative;overflow:hidden;}
.templates-section::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 50% 80% at 50% 50%,rgba(249,115,22,0.06) 0%,transparent 65%);
  pointer-events:none;}
.templates-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;}
.tpl-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
  border-radius:12px;padding:20px;transition:border-color .2s,background .2s;}
.tpl-card:hover{background:rgba(255,255,255,0.08);border-color:rgba(249,115,22,0.3);}
.tpl-icon{font-size:22px;margin-bottom:10px;}
.tpl-title{font-family:var(--fh);font-weight:800;font-size:13px;color:white;margin-bottom:5px;}
.tpl-desc{font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;}

/* TIMELINE */
.timeline-section{padding:64px 0;}
.timeline{margin-top:40px;position:relative;}
.timeline::before{content:'';position:absolute;left:28px;top:0;bottom:0;
  width:2px;background:linear-gradient(180deg,var(--pk),var(--or),var(--lv-d),var(--gd));border-radius:2px;}
.tl-item{display:flex;gap:24px;margin-bottom:32px;position:relative;}
.tl-dot{width:56px;height:56px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-family:var(--fh);font-weight:900;font-size:12px;color:white;position:relative;z-index:1;}
.tl-dot-pk{background:var(--pk);}
.tl-dot-or{background:var(--or);}
.tl-dot-lv{background:var(--lv-d);}
.tl-dot-gd{background:var(--gd);}
.tl-content{background:white;border-radius:14px;padding:20px 24px;flex:1;
  border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,0.04);}
.tl-week{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--text-lt);margin-bottom:5px;}
.tl-title{font-family:var(--fh);font-weight:800;font-size:16px;color:var(--text);margin-bottom:6px;}
.tl-desc{font-size:13.5px;color:var(--text-med);line-height:1.6;}

/* BOTTOM CTA */
.bottom-cta{background:var(--black);padding:72px 0;text-align:center;position:relative;overflow:hidden;}
.bottom-cta::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 40% 60% at 50% 50%,rgba(214,20,101,0.12) 0%,transparent 65%);}
.bottom-cta-inner{position:relative;z-index:1;}
.bottom-cta-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,4vw,42px);
  color:white;letter-spacing:-.8px;line-height:1.1;margin-bottom:14px;}
.bottom-cta-sub{font-size:16px;color:rgba(255,255,255,0.55);margin-bottom:36px;
  line-height:1.65;max-width:500px;margin-left:auto;margin-right:auto;}
.cta-btn{display:inline-block;padding:18px 48px;font-family:var(--fh);font-weight:800;font-size:16px;
  background:var(--pk);color:white;border:none;border-radius:10px;cursor:pointer;
  box-shadow:0 4px 24px rgba(214,20,101,.4);transition:all .2s;letter-spacing:.3px;text-decoration:none;}
.cta-btn:hover{filter:brightness(.9);transform:translateY(-2px);}
.cta-note{font-size:12px;color:rgba(255,255,255,0.35);margin-top:16px;}

.footer{background:var(--dark);padding:24px;text-align:center;border-top:1px solid #1a1a1a;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;margin-bottom:6px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.3);}

@media(max-width:680px){
  .hero-stats{grid-template-columns:1fr 1fr;}
  .hstat{border-right:none;border-bottom:1px solid rgba(255,255,255,0.07);}
  .mod-items{grid-template-columns:1fr;}
  .templates-grid{grid-template-columns:1fr 1fr;}
  .mod-top,.mod-body{padding-left:20px;padding-right:20px;}
  .timeline::before{left:22px;}
  .tl-dot{width:44px;height:44px;font-size:11px;}
}
@media(max-width:480px){
  .templates-grid{grid-template-columns:1fr;}
  .hero-badges{flex-direction:column;align-items:center;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<nav class="nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <span class="nav-tag">BSP Marketing Playbook</span>
</nav>
<div class="progress-accent"></div>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-kicker">Your complete marketing system</div>
    <h1 class="hero-title">Stop guessing.<br><span class="pk">Start getting customers.</span></h1>
    <p class="hero-sub">Five modules. Every strategy built specifically for the raw hair dropship model. Instagram, TikTok, paid ads, email, and referrals — all in one system.</p>
    <div class="hero-badges">
      <div class="hbadge">📱 Instagram + TikTok Organic</div>
      <div class="hbadge">💸 First Paid Ad at $5/day</div>
      <div class="hbadge">📧 Email List from Zero</div>
      <div class="hbadge">🔁 Repeat Buyer System</div>
      <div class="hbadge">⭐ Referral Engine</div>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hstat"><span class="hstat-num" style="color:var(--pk);">5</span><div class="hstat-lbl">Complete modules</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--or);">30+</span><div class="hstat-lbl">Plug-in templates</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--lv);">$5/day</span><div class="hstat-lbl">Minimum ad budget</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--gd);">Lifetime</span><div class="hstat-lbl">Access, no expiry</div></div>
  </div>
</section>

<section class="modules-intro">
  <div class="container">
    <span class="section-eyebrow">The 5 modules</span>
    <h2 class="section-title">Everything you need to drive consistent customers to your BSP store</h2>
    <p class="section-sub">Each module builds on the last. By the end, you have a full marketing machine running — not just one tactic.</p>
  </div>
</section>

<section style="padding:8px 0 64px;">
  <div class="container">

    <div class="module">
      <div class="module-header">
        <div class="mod-accent mod-accent-pk"></div>
        <div class="mod-top">
          <div class="mod-num-label" style="color:var(--pk);">Module 1</div>
          <div class="mod-title">Instagram + TikTok Organic System</div>
          <div class="mod-desc">The exact content framework that builds an audience of raw hair buyers — without running ads or dancing on camera. Three posts a week. One system. Consistent growth.</div>
        </div>
      </div>
      <div class="mod-body">
        <div class="mod-items">
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>The 3-post weekly formula (education, social proof, offer)</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>30 caption templates — copy, paste, post</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>Hashtag strategy for raw hair + local reach</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>90-day content calendar — every post planned out</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>The hook formula that stops the scroll</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>TikTok vs. Instagram — what to post where and when</div>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-header">
        <div class="mod-accent mod-accent-or"></div>
        <div class="mod-top">
          <div class="mod-num-label" style="color:var(--or);">Module 2</div>
          <div class="mod-title">First Paid Ad — $5/Day Blueprint</div>
          <div class="mod-desc">You don't need a big budget to run profitable ads. This module walks you through your very first Meta ad — audience targeting, creative, copy, and when to scale.</div>
        </div>
      </div>
      <div class="mod-body">
        <div class="mod-items">
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>Step-by-step Meta ad setup for complete beginners</div>
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>Exact audience targeting for raw hair buyers</div>
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>6 proven ad copy templates — swipe and use</div>
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>The scaling decision framework (when to increase budget)</div>
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>Creative that converts — images and videos that actually work</div>
          <div class="mod-item"><span class="mod-check mod-check-or">✓</span>How to read your ad results without being a data analyst</div>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-header">
        <div class="mod-accent mod-accent-lv"></div>
        <div class="mod-top">
          <div class="mod-num-label" style="color:var(--lv-d);">Module 3</div>
          <div class="mod-title">Email List from Zero to 500</div>
          <div class="mod-desc">Social media followers don't belong to you. Your email list does. This module shows you how to build a list of 500 warm buyers — and the exact emails to send them every month.</div>
        </div>
      </div>
      <div class="mod-body">
        <div class="mod-items">
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>3 lead magnet ideas proven to convert for hair sellers</div>
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>5-email welcome sequence — swipe copy included</div>
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>Monthly newsletter template — fill in, hit send</div>
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>GHL setup walkthrough — automated from day one</div>
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>Abandoned cart email sequence — recover lost sales</div>
          <div class="mod-item"><span class="mod-check mod-check-lv">✓</span>The 3-email flash sale formula that drives reorders</div>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-header">
        <div class="mod-accent mod-accent-gd"></div>
        <div class="mod-top">
          <div class="mod-num-label" style="color:#8A6800;">Module 4</div>
          <div class="mod-title">Repeat Buyer System</div>
          <div class="mod-desc">Getting a new customer costs 5x more than keeping an existing one. This module installs a post-purchase system that turns first-time buyers into customers who reorder every 8 weeks.</div>
        </div>
      </div>
      <div class="mod-body">
        <div class="mod-items">
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>Post-purchase sequence that generates reviews + reorders</div>
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>The 8-week reorder prompt (timing + exact message)</div>
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>VIP customer segment — how to identify and treat them</div>
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>Review request sequence — get photo reviews automatically</div>
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>"Win back" sequence for customers gone 90+ days</div>
          <div class="mod-item"><span class="mod-check mod-check-gd">✓</span>Birthday + milestone automation — stay top of mind</div>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="module-header">
        <div class="mod-accent mod-accent-all"></div>
        <div class="mod-top">
          <div class="mod-num-label" style="color:var(--pk);">Module 5</div>
          <div class="mod-title">Referral Engine — Customers Who Sell for You</div>
          <div class="mod-desc">Your happiest customers know other people who want raw hair. This module builds a simple referral system that turns every satisfied buyer into a brand ambassador.</div>
        </div>
      </div>
      <div class="mod-body">
        <div class="mod-items">
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>Simple referral program setup — no complex software needed</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>The ask — exactly when and how to request referrals</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>Referral incentive structure that doesn't eat your margins</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>Stylist partnership script — turning stylists into referral partners</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>UGC strategy — free social proof at scale</div>
          <div class="mod-item"><span class="mod-check mod-check-pk">✓</span>Ambassador program — for your top 10% of customers</div>
        </div>
      </div>
    </div>

  </div>
</section>

<section class="templates-section">
  <div class="container">
    <span class="section-eyebrow" style="color:var(--or);">30+ plug-in templates</span>
    <h2 class="section-title" style="color:white;">Nothing to write from scratch. Ever.</h2>
    <p class="section-sub" style="color:rgba(255,255,255,0.55);">Every template is built for the raw hair dropship model. Customize with your name and store link — done.</p>
    <div class="templates-grid">
      <div class="tpl-card"><div class="tpl-icon">📝</div><div class="tpl-title">30 Instagram/TikTok Captions</div><div class="tpl-desc">Education, social proof, and offer posts — ready to copy and post.</div></div>
      <div class="tpl-card"><div class="tpl-icon">📣</div><div class="tpl-title">6 Meta Ad Copy Templates</div><div class="tpl-desc">Tested headlines, body copy, and CTAs for raw hair buyers.</div></div>
      <div class="tpl-card"><div class="tpl-icon">💌</div><div class="tpl-title">5-Email Welcome Sequence</div><div class="tpl-desc">Turn new subscribers into buyers in the first 7 days.</div></div>
      <div class="tpl-card"><div class="tpl-icon">🔁</div><div class="tpl-title">Reorder Prompt Messages</div><div class="tpl-desc">SMS and email versions of the 8-week reorder sequence.</div></div>
      <div class="tpl-card"><div class="tpl-icon">⭐</div><div class="tpl-title">Review Request Sequence</div><div class="tpl-desc">3-message sequence that generates photo reviews automatically.</div></div>
      <div class="tpl-card"><div class="tpl-icon">📅</div><div class="tpl-title">90-Day Content Calendar</div><div class="tpl-desc">Every post planned. Topics, formats, and posting times.</div></div>
      <div class="tpl-card"><div class="tpl-icon">🤝</div><div class="tpl-title">Stylist Partnership Script</div><div class="tpl-desc">How to approach stylists as referral partners — word for word.</div></div>
      <div class="tpl-card"><div class="tpl-icon">🎉</div><div class="tpl-title">Flash Sale Email (3-Part)</div><div class="tpl-desc">The announcement, reminder, and last-chance sequence.</div></div>
      <div class="tpl-card"><div class="tpl-icon">🧲</div><div class="tpl-title">Lead Magnet Templates</div><div class="tpl-desc">3 ready-to-deploy lead magnets to grow your email list fast.</div></div>
    </div>
  </div>
</section>

<section class="timeline-section">
  <div class="container--narrow">
    <span class="section-eyebrow">Your 90-day roadmap</span>
    <h2 class="section-title">What you'll have built in 90 days</h2>
    <p class="section-sub">Follow this order. Each phase adds a new layer to your marketing system.</p>
    <div class="timeline">
      <div class="tl-item">
        <div class="tl-dot tl-dot-pk">1–2</div>
        <div class="tl-content">
          <div class="tl-week">Weeks 1–2</div>
          <div class="tl-title">Content foundation live</div>
          <div class="tl-desc">Your 3-post-per-week formula is running. 90-day calendar is mapped. First 6 posts are published.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot tl-dot-or">3–4</div>
        <div class="tl-content">
          <div class="tl-week">Weeks 3–4</div>
          <div class="tl-title">First paid ad running</div>
          <div class="tl-desc">Your $5/day Meta ad is live. Audience is set. Creative is tested. You know what's working.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot tl-dot-lv">5–6</div>
        <div class="tl-content">
          <div class="tl-week">Weeks 5–6</div>
          <div class="tl-title">Email list growing</div>
          <div class="tl-desc">Lead magnet is live. Welcome sequence is running. List is building passively from your content and ads.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot tl-dot-gd">7–8</div>
        <div class="tl-content">
          <div class="tl-week">Weeks 7–8</div>
          <div class="tl-title">Repeat buyer system installed</div>
          <div class="tl-desc">Post-purchase sequence is live. Reorder prompts are scheduled. Reviews are coming in automatically.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot tl-dot-pk">9–12</div>
        <div class="tl-content">
          <div class="tl-week">Weeks 9–12</div>
          <div class="tl-title">Referral engine activated</div>
          <div class="tl-desc">Referral program is live. Stylist partners approached. Your marketing system is now running on four channels — simultaneously and mostly automatically.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bottom-cta">
  <div class="container bottom-cta-inner">
    <h2 class="bottom-cta-title">Your marketing system is waiting.<br>Let's turn it on.</h2>
    <p class="bottom-cta-sub" style="margin-bottom:36px;">Everything in this playbook is built for BeautyShare Pro sellers. No generic tactics. No figuring it out yourself.</p>
    <a href="#" class="cta-btn">Get Instant Access to the Playbook →</a>
    <div class="cta-note">🔒 Lifetime access · Instant delivery · 14-day money-back guarantee</div>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">Beauty<span>Share</span> Pro</div>
  <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
</footer>

` }} />
    </div>
  );
}

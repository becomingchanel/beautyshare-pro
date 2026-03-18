'use client';

import { useEffect } from 'react';

export default function UpgradePage() {
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
  --pk:#D61465;--pk-l:#FCE8F2;
  --lv:#DCBDEF;--lv-d:#9B6FBF;--lv-l:#F5EDFB;
  --gd:#E2AD37;--gd-l:#FEF9E7;
  --black:#0A0A0A;--white:#fff;--off:#F9F6F2;
  --text:#1A0A00;--text-med:#5A3020;--text-lt:#888;--border:#E8E0D8;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}
.container{max-width:860px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:640px;margin:0 auto;padding:0 24px;}

.nav{background:var(--black);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:18px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-step{font-size:12px;color:rgba(255,255,255,0.4);}

.progress-bar{background:var(--black);padding:12px 0;}
.progress-inner{max-width:860px;margin:0 auto;padding:0 24px;display:flex;align-items:center;}
.ps-dot{width:24px;height:24px;border-radius:50%;font-family:var(--fh);font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center;}
.ps-dot.done{background:var(--or);color:white;}
.ps-dot.active{background:white;color:var(--black);}
.ps-dot.pending{background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.4);}
.ps-label{font-family:var(--fh);font-weight:600;font-size:11px;margin:0 8px;}
.ps-label.done{color:var(--or);}
.ps-label.active{color:white;}
.ps-label.pending{color:rgba(255,255,255,0.4);}
.ps-line{flex:1;height:1px;background:rgba(255,255,255,0.15);}
.progress-accent{height:4px;background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d));}

/* HERO */
.hero{background:var(--black);padding:52px 0 44px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 50% 70% at 50% 50%,rgba(214,20,101,0.07) 0%,transparent 65%);
  pointer-events:none;}
.hero-inner{max-width:860px;margin:0 auto;padding:0 24px;text-align:center;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;
  background:rgba(214,20,101,0.15);border:1px solid rgba(214,20,101,0.3);
  border-radius:100px;padding:5px 16px;margin-bottom:18px;
  font-family:var(--fh);font-weight:700;font-size:10px;color:var(--pk);
  letter-spacing:1.5px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,4.5vw,46px);
  color:white;letter-spacing:-1.2px;line-height:1.1;margin-bottom:14px;}
.hero-title .pk{color:var(--pk);}
.hero-title .or{color:var(--or);}
.hero-sub{font-size:16px;color:rgba(255,255,255,0.65);line-height:1.65;
  max-width:560px;margin:0 auto;}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);
  border-top:1px solid rgba(255,255,255,0.07);margin-top:44px;max-width:860px;margin-left:auto;margin-right:auto;}
.hstat{padding:22px 12px;text-align:center;border-right:1px solid rgba(255,255,255,0.07);}
.hstat:last-child{border-right:none;}
.hstat-num{font-family:var(--fh);font-weight:900;font-size:22px;display:block;line-height:1;}
.hstat-lbl{font-size:11px;color:rgba(255,255,255,0.45);margin-top:4px;}

/* MAIN OFFER CARD */
.offer-section{padding:52px 0 44px;}
.offer-card{background:white;border-radius:16px;overflow:hidden;
  box-shadow:0 8px 40px rgba(0,0,0,0.08);border:1px solid var(--border);}
.oc-stripe{height:5px;background:linear-gradient(90deg,var(--pk),var(--lv-d),var(--gd));}
.oc-header{display:grid;grid-template-columns:1fr auto;gap:24px;
  align-items:start;padding:28px 32px;border-bottom:1px solid var(--border);}
.oc-badge{display:inline-block;background:var(--pk-l);border:1px solid rgba(214,20,101,0.2);
  color:var(--pk);font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:1.5px;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-bottom:10px;}
.oc-title{font-family:var(--fh);font-weight:900;font-size:24px;color:var(--text);
  line-height:1.2;margin-bottom:8px;}
.oc-sub{font-size:14px;color:var(--text-med);line-height:1.6;}
.oc-price-box{background:var(--or-l);border:1px solid rgba(249,115,22,.2);
  border-radius:12px;padding:18px 22px;text-align:center;min-width:170px;}
.oc-price{font-family:var(--fh);font-weight:900;font-size:40px;color:var(--or);line-height:1;}
.oc-price-old{font-size:14px;color:var(--text-lt);text-decoration:line-through;margin-top:4px;}
.oc-price-note{font-size:11px;color:var(--text-lt);margin-top:4px;}
.oc-save{font-family:var(--fh);font-weight:700;font-size:12px;color:#1E6B3C;
  background:rgba(30,107,60,.1);border:1px solid rgba(30,107,60,.2);
  padding:2px 8px;border-radius:4px;margin-top:8px;display:inline-block;}

/* MODULES */
.modules{padding:24px 32px;border-bottom:1px solid var(--border);}
.modules-title{font-family:var(--fh);font-weight:700;font-size:11px;
  color:var(--text-lt);letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;}
.mod-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.mod-card{border-radius:10px;padding:16px 18px;border:1px solid var(--border);}
.mod-or{background:var(--or-l);border-color:rgba(249,115,22,.2);}
.mod-pk{background:var(--pk-l);border-color:rgba(214,20,101,.15);}
.mod-lv{background:var(--lv-l);border-color:rgba(155,111,191,.2);}
.mod-gd{background:var(--gd-l);border-color:rgba(226,173,55,.25);}
.mod-num{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:1.5px;
  text-transform:uppercase;margin-bottom:5px;}
.mod-num-or{color:var(--or);}
.mod-num-pk{color:var(--pk);}
.mod-num-lv{color:var(--lv-d);}
.mod-num-gd{color:#8A6800;}
.mod-title{font-family:var(--fh);font-weight:800;font-size:14px;color:var(--text);
  margin-bottom:6px;line-height:1.3;}
.mod-desc{font-size:12.5px;color:var(--text-med);line-height:1.55;}

/* CTA */
.oc-cta{padding:24px 32px;}
.cta-btn{width:100%;padding:18px;font-family:var(--fh);font-weight:800;font-size:17px;
  background:var(--pk);color:white;border:none;border-radius:10px;cursor:pointer;
  box-shadow:0 4px 20px rgba(214,20,101,.3);transition:all .2s;letter-spacing:.3px;
  margin-bottom:10px;}
.cta-btn:hover{filter:brightness(.92);transform:translateY(-1px);}
.skip-link{text-align:center;font-size:13px;color:var(--text-lt);cursor:pointer;
  text-decoration:underline;margin-top:8px;}
.guarantee{display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:12px;color:var(--text-lt);margin-top:12px;}

/* VIDEO SECTION */
.video-section{background:var(--black);padding:48px 0 52px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);}
.video-eyebrow{display:inline-block;font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--pk);margin-bottom:10px;}
.video-title{font-family:var(--fh);font-weight:900;font-size:clamp(20px,3vw,28px);
  color:white;letter-spacing:-.6px;margin-bottom:24px;}
.video-wrapper{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;
  border-radius:14px;border:2px solid rgba(214,20,101,.3);
  box-shadow:0 8px 48px rgba(214,20,101,.18);}
.video-wrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;}
.video-caption{margin-top:16px;font-size:13px;color:rgba(255,255,255,.45);font-style:italic;}

/* CONTEXT */
.context-section{padding:48px 0;background:var(--pk-l);}
.context-inner{max-width:860px;margin:0 auto;padding:0 24px;}
.ctx-title{font-family:var(--fh);font-weight:900;font-size:22px;color:var(--text);
  margin-bottom:12px;}
.ctx-body{font-size:15px;color:var(--text-med);line-height:1.75;margin-bottom:16px;}
.ctx-highlight{background:white;border-left:4px solid var(--pk);padding:14px 18px;
  border-radius:0 8px 8px 0;font-size:15px;color:var(--text);line-height:1.65;}
.ctx-highlight b{color:var(--pk);}

.footer{background:var(--black);padding:24px;text-align:center;border-top:1px solid #111;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;margin-bottom:6px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.3);}

@media(max-width:680px){
  .hero-stats{grid-template-columns:1fr 1fr;}
  .hstat{border-right:none;border-bottom:1px solid rgba(255,255,255,0.07);}
  .oc-header{grid-template-columns:1fr;}
  .mod-grid{grid-template-columns:1fr;}
  .modules,.oc-cta,.oc-header{padding-left:20px;padding-right:20px;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<nav class="nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <span class="nav-step">Step 3 of 3 — Final Upgrade</span>
</nav>

<div class="progress-bar">
  <div class="progress-inner">
    <div class="ps-dot done">✓</div>
    <span class="ps-label done">Registered</span>
    <div class="ps-line"></div>
    <div class="ps-dot done">✓</div>
    <span class="ps-label done">Launch upgrades</span>
    <div class="ps-line"></div>
    <div class="ps-dot active">3</div>
    <span class="ps-label active">Marketing system</span>
  </div>
</div>
<div class="progress-accent"></div>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-eyebrow">One final upgrade — the marketing system</div>
    <h1 class="hero-title">
      Your store will be live.<br>
      <span class="pk">Now — how do you get customers?</span>
    </h1>
    <p class="hero-sub">
      The webinar teaches you how to launch. The Fast Track gives you your first 7 days.
      This playbook gives you the complete marketing system that drives customers to your BSP storefront for months and years.
    </p>
  </div>
  <div class="hero-stats">
    <div class="hstat"><span class="hstat-num" style="color:var(--pk);">5</span><div class="hstat-lbl">Complete modules</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--or);">30+</span><div class="hstat-lbl">Plug-in templates</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--lv);">$5/day</span><div class="hstat-lbl">Minimum ad budget</div></div>
    <div class="hstat"><span class="hstat-num" style="color:var(--gd);">Lifetime</span><div class="hstat-lbl">Access, no expiry</div></div>
  </div>
</section>

<!-- VIDEO SECTION -->
<section class="video-section">
  <div class="container--narrow">
    <div class="video-eyebrow">Watch this first</div>
    <h2 class="video-title">Before you decide — watch this quick message</h2>
    <div class="video-wrapper">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_HERE"
        title="Before you decide — watch this quick message"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <p class="video-caption">🔊 Turn sound on — then scroll down to complete your order.</p>
  </div>
</section>

<!-- MAIN OFFER -->
<section class="offer-section">
  <div class="container">
    <div class="offer-card">
      <div class="oc-stripe"></div>
      <div class="oc-header">
        <div>
          <div class="oc-badge">Complete Marketing System · BSP Members Only</div>
          <div class="oc-title">BSP Marketing Playbook</div>
          <div class="oc-sub">The complete marketing system built specifically for BeautyShare Pro sellers — Instagram + TikTok organic, your first paid ad at $5/day, building your email list, turning buyers into repeat clients, and a referral system that grows your brand on autopilot. Every strategy is built for the raw hair dropship model.</div>
        </div>
        <div class="oc-price-box">
          <div class="oc-price">$197</div>
          <div class="oc-price-old">$497 value</div>
          <div class="oc-price-note">One-time · Lifetime access</div>
          <div class="oc-save">Save $300</div>
        </div>
      </div>

      <div class="modules">
        <div class="modules-title">5 complete modules — everything to drive customers to your BSP store</div>
        <div class="mod-grid">
          <div class="mod-card mod-pk">
            <div class="mod-num mod-num-pk">Module 1</div>
            <div class="mod-title">Instagram + TikTok Organic System</div>
            <div class="mod-desc">The 3-post weekly formula, 30 caption templates, hashtag strategy, 90-day content calendar, and the hook formula that stops the scroll.</div>
          </div>
          <div class="mod-card mod-or">
            <div class="mod-num mod-num-or">Module 2</div>
            <div class="mod-title">First Paid Ad — $5/Day Blueprint</div>
            <div class="mod-desc">Step-by-step Meta ad setup for beginners, exact audience targeting for raw hair buyers, 6 proven ad copy templates, and the scaling decision framework.</div>
          </div>
          <div class="mod-card mod-lv">
            <div class="mod-num mod-num-lv">Module 3</div>
            <div class="mod-title">Email List From Zero to 500</div>
            <div class="mod-desc">3 lead magnet ideas for hair sellers, 5-email welcome sequence, monthly newsletter template, and how to set it all up for free with Klaviyo or Flodesk.</div>
          </div>
          <div class="mod-card mod-gd">
            <div class="mod-num mod-num-gd">Modules 4 + 5</div>
            <div class="mod-title">Repeat Buyers + Referral System</div>
            <div class="mod-desc">The post-purchase sequence that generates reviews and reorders, the 8-week reorder prompt, and a simple referral system that turns customers into brand ambassadors.</div>
          </div>
        </div>
      </div>

      <div class="oc-cta">
        <button class="cta-btn" onclick="addPlaybook()">
          Yes — Add the Marketing Playbook for $197 →
        </button>
        <div class="skip-link" onclick="skipPlaybook()">No thanks — I'll figure out marketing on my own. Skip to my confirmation.</div>
        <div class="guarantee">🔒 Lifetime access · Instant delivery · 14-day money-back guarantee</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTEXT SECTION -->
<section class="context-section">
  <div class="context-inner">
    <div class="ctx-title">Why this is the right time to get this</div>
    <p class="ctx-body">Most people who join BSP launch their store and then realize they don't have a consistent system for getting customers. They post a few times, send a few DMs, and then plateau. The Marketing Playbook is the system that eliminates that plateau before it happens.</p>
    <div class="ctx-highlight">
      <b>The sequence that works:</b> The webinar gives you the big picture. The Fast Track gets you your first sale in 7 days. The Marketing Playbook turns that first sale into a consistent $3,000–$5,000/month. These three things are designed to work together in that exact order.
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">Beauty<span>Share</span> Pro</div>
  <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `// Read what was selected on the previous page
const params = new URLSearchParams(window.location.search);

function addPlaybook() {
  // TODO: Process payment for $197 + any previous selections
  // Then redirect to final confirmation page
  window.location.href = '/confirmation?playbook=1&' + params.toString();
}

function skipPlaybook() {
  window.location.href = '/confirmation?' + params.toString();
}` }} />
    </div>
  );
}

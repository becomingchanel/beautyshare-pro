'use client';

import { useEffect } from 'react';

export default function ThankYouPlaybook() {
  useEffect(() => {
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
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
html{scroll-behavior:smooth;}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}
.container{max-width:1040px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:700px;margin:0 auto;padding:0 24px;}

/* ── NAV ── */
.nav{background:var(--black);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:18px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-confirm{font-size:11px;color:rgba(255,255,255,.4);font-family:var(--fh);font-weight:600;letter-spacing:.3px;}

/* ── PROGRESS ── */
.progress-bar{background:var(--black);padding:14px 0;border-top:1px solid rgba(255,255,255,.06);}
.progress-inner{max-width:1040px;margin:0 auto;padding:0 24px;display:flex;align-items:center;}
.ps-dot{width:28px;height:28px;border-radius:50%;font-family:var(--fh);font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ps-dot.done{background:var(--or);color:white;box-shadow:0 0 0 3px rgba(250,106,39,.2);}
.ps-dot.complete{background:var(--lv-d);color:white;box-shadow:0 0 0 3px rgba(155,111,191,.2);}
.ps-label{font-family:var(--fh);font-weight:700;font-size:11px;margin:0 10px;white-space:nowrap;}
.ps-label.done{color:var(--or);}
.ps-label.complete{color:var(--lv-d);}
.ps-line{flex:1;height:2px;border-radius:1px;}
.ps-line.done{background:var(--or);}
.ps-line.complete{background:var(--lv-d);}
.progress-accent{height:4px;background:linear-gradient(90deg,var(--lv-d),var(--gd),var(--or));}

/* ── HERO ── */
.hero{background:var(--black);padding:56px 0 48px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(155,111,191,.10) 0%,transparent 65%);
  pointer-events:none;}
.hero-inner{position:relative;z-index:1;}
.hero-confetti{font-size:48px;margin-bottom:16px;display:block;animation:pop .6s cubic-bezier(.36,.07,.19,.97) both;}
@keyframes pop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
.hero-badge{display:inline-flex;align-items:center;gap:8px;
  background:rgba(155,111,191,.2);border:1px solid rgba(155,111,191,.4);
  border-radius:100px;padding:6px 18px;margin-bottom:20px;
  font-family:var(--fh);font-weight:700;font-size:10px;color:var(--lv);
  letter-spacing:2px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,4.5vw,48px);
  color:white;letter-spacing:-1.2px;line-height:1.1;margin-bottom:14px;}
.hero-title .lv{color:var(--lv);}
.hero-title .or{color:var(--or);}
.hero-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.7;
  max-width:540px;margin:0 auto 28px;}
.hero-confirm{display:inline-flex;align-items:center;gap:10px;
  background:rgba(155,111,191,.15);border:1px solid rgba(155,111,191,.3);
  border-radius:8px;padding:10px 20px;
  font-family:var(--fh);font-weight:700;font-size:13px;color:var(--lv);}

/* ── ACCESS CARD ── */
.access-section{padding:48px 0;}
.access-card{background:white;border-radius:20px;overflow:hidden;
  border:1px solid var(--border);box-shadow:0 8px 48px rgba(0,0,0,.10);}
.ac-stripe{height:5px;background:linear-gradient(90deg,var(--lv-d),var(--gd),var(--or));}
.ac-body{padding:40px 44px;}
.ac-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--lv-d);margin-bottom:10px;}
.ac-title{font-family:var(--fh);font-weight:900;font-size:26px;color:var(--text);
  margin-bottom:8px;line-height:1.2;}
.ac-sub{font-size:15px;color:var(--text-med);line-height:1.7;margin-bottom:32px;}

/* ── TEMPLATE GRID ── */
.template-counts{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
.tc-stat{text-align:center;background:var(--off);border-radius:12px;padding:18px 12px;border:1px solid var(--border);}
.tc-stat-num{font-family:var(--fh);font-weight:900;font-size:28px;line-height:1;margin-bottom:4px;}
.tc-stat-lbl{font-size:11px;color:var(--text-lt);line-height:1.4;}

/* ── ACCESS BUTTON ── */
.access-btn-wrap{text-align:center;margin-bottom:24px;}
.access-btn{display:inline-flex;align-items:center;gap:12px;
  background:linear-gradient(135deg,var(--lv-d),var(--pk));
  color:white;font-family:var(--fh);font-weight:800;font-size:17px;
  padding:20px 48px;border-radius:12px;text-decoration:none;
  box-shadow:0 6px 32px rgba(155,111,191,.45);
  transition:all .2s;letter-spacing:.2px;}
.access-btn:hover{filter:brightness(.9);transform:translateY(-2px);box-shadow:0 10px 40px rgba(155,111,191,.5);}
.access-btn-arrow{font-size:20px;transition:transform .2s;}
.access-btn:hover .access-btn-arrow{transform:translateX(5px);}
.access-note{font-size:12px;color:var(--text-lt);text-align:center;margin-top:10px;}

/* ── WHAT'S INSIDE PREVIEW ── */
.tabs-preview{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px;}
.tp-item{background:var(--off);border-radius:10px;padding:14px 12px;border:1px solid var(--border);text-align:center;transition:all .2s;cursor:default;}
.tp-item:hover{border-color:var(--lv-d);transform:translateY(-2px);box-shadow:0 4px 16px rgba(155,111,191,.12);}
.tp-icon{font-size:22px;margin-bottom:6px;}
.tp-label{font-family:var(--fh);font-weight:700;font-size:11px;color:var(--text);margin-bottom:2px;}
.tp-count{font-size:10px;color:var(--text-lt);}

/* ── DIVIDER ── */
.ac-divider{height:1px;background:var(--border);margin:28px 0;}

/* ── EMAIL DELIVERY NOTICE ── */
.email-notice{background:var(--lv-l);border:1px solid rgba(155,111,191,.2);
  border-radius:12px;padding:18px 22px;display:flex;align-items:flex-start;gap:14px;}
.en-icon{font-size:24px;flex-shrink:0;margin-top:2px;}
.en-title{font-family:var(--fh);font-weight:800;font-size:14px;color:var(--lv-d);margin-bottom:4px;}
.en-text{font-size:13.5px;color:var(--text-med);line-height:1.65;}
.en-text strong{color:var(--lv-d);}

/* ── NEXT STEPS ── */
.next-section{padding:0 0 56px;}
.next-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:32px;}
.next-card{background:white;border-radius:14px;padding:24px;border:1px solid var(--border);
  box-shadow:0 2px 12px rgba(0,0,0,.05);}
.nc-step{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-family:var(--fh);font-weight:900;font-size:14px;color:white;margin-bottom:14px;}
.nc-step-1{background:var(--lv-d);}
.nc-step-2{background:var(--or);}
.nc-step-3{background:var(--pk);}
.nc-title{font-family:var(--fh);font-weight:800;font-size:15px;color:var(--text);margin-bottom:6px;line-height:1.3;}
.nc-desc{font-size:13.5px;color:var(--text-med);line-height:1.65;}
.nc-link{display:inline-flex;align-items:center;gap:6px;margin-top:12px;
  font-family:var(--fh);font-weight:700;font-size:12px;color:var(--lv-d);text-decoration:none;}
.nc-link:hover{color:var(--pk);}

/* ── SECTION LABELS ── */
.eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2.5px;text-transform:uppercase;color:var(--lv-d);display:block;margin-bottom:10px;}
.section-title{font-family:var(--fh);font-weight:900;font-size:clamp(22px,3vw,32px);
  color:var(--text);letter-spacing:-.5px;line-height:1.15;margin-bottom:10px;}
.section-sub{font-size:15px;color:var(--text-med);line-height:1.75;}

/* ── ALSO AVAILABLE ── */
.also-section{background:var(--black);padding:52px 0;position:relative;overflow:hidden;}
.also-section::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 50% 70% at 50% 50%,rgba(250,106,39,.06) 0%,transparent 65%);
  pointer-events:none;}
.also-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;}
.also-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
  border-radius:14px;padding:22px;transition:border-color .2s;}
.also-card:hover{border-color:rgba(250,106,39,.3);}
.also-tag{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:1.5px;
  text-transform:uppercase;margin-bottom:8px;}
.also-title{font-family:var(--fh);font-weight:800;font-size:15px;color:white;margin-bottom:6px;line-height:1.3;}
.also-desc{font-size:13px;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:14px;}
.also-price{font-family:var(--fh);font-weight:900;font-size:22px;color:var(--or);margin-bottom:12px;}
.also-btn{display:inline-flex;align-items:center;gap:6px;background:var(--or);color:white;
  font-family:var(--fh);font-weight:700;font-size:12px;padding:9px 18px;border-radius:7px;
  text-decoration:none;transition:all .18s;}
.also-btn:hover{background:var(--or-d);}

/* ── FOOTER ── */
.footer{background:var(--dark);padding:28px;text-align:center;border-top:1px solid #1a1a1a;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;margin-bottom:6px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.25);}

@media(max-width:740px){
  .template-counts,.tabs-preview{grid-template-columns:1fr 1fr;}
  .next-grid,.also-grid{grid-template-columns:1fr;}
  .ac-body{padding:28px 22px;}
}
@media(max-width:480px){
  .template-counts{grid-template-columns:1fr 1fr;}
  .tabs-preview{grid-template-columns:1fr 1fr;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<!-- NAV -->
<nav class="nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <span class="nav-confirm">Order Confirmed ✓</span>
</nav>

<!-- PROGRESS BAR -->
<div class="progress-bar">
  <div class="progress-inner">
    <div class="ps-dot done">✓</div>
    <span class="ps-label done">Payment</span>
    <div class="ps-line done"></div>
    <div class="ps-dot done">✓</div>
    <span class="ps-label done">Processing</span>
    <div class="ps-line complete"></div>
    <div class="ps-dot complete">✓</div>
    <span class="ps-label complete">Access granted</span>
  </div>
</div>
<div class="progress-accent"></div>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="container--narrow">
      <span class="hero-confetti">🎉</span>
      <div class="hero-badge">BSP Marketing Playbook · Purchase Confirmed</div>
      <h1 class="hero-title">
        Your playbook is ready.<br>
        <span class="lv">Your templates are waiting.</span>
      </h1>
      <p class="hero-sub">
        Everything you need to start marketing your BSP store is now unlocked — 30+ templates, 5 email sequences, 90 days of content, and more. All in one place. Right now.
      </p>
      <div class="hero-confirm">
        <span>✓</span> Receipt sent to your inbox — check it now
      </div>
    </div>
  </div>
</section>

<!-- ACCESS CARD -->
<section class="access-section">
  <div class="container--narrow">
    <div class="access-card">
      <div class="ac-stripe"></div>
      <div class="ac-body">

        <div class="ac-eyebrow">Your member resource · Instant access</div>
        <div class="ac-title">BSP Template Hub — All 30+ Templates</div>
        <div class="ac-sub">Every caption, email, ad, script, and calendar from the Marketing Playbook — organized by module, copyable in one click, and ready to use today. Nothing to write from scratch.</div>

        <!-- WHAT'S INSIDE PREVIEW -->
        <div class="tabs-preview">
          <div class="tp-item">
            <div class="tp-icon">📱</div>
            <div class="tp-label">Captions</div>
            <div class="tp-count">30 templates</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">📣</div>
            <div class="tp-label">Ad Copy</div>
            <div class="tp-count">6 templates</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">💌</div>
            <div class="tp-label">Welcome Emails</div>
            <div class="tp-count">5-email sequence</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">🔁</div>
            <div class="tp-label">Reorder Prompts</div>
            <div class="tp-count">SMS + email</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">⭐</div>
            <div class="tp-label">Review Requests</div>
            <div class="tp-count">3-message sequence</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">📅</div>
            <div class="tp-label">90-Day Calendar</div>
            <div class="tp-count">Every post planned</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">🎉</div>
            <div class="tp-label">Flash Sale Emails</div>
            <div class="tp-count">3-part sequence</div>
          </div>
          <div class="tp-item">
            <div class="tp-icon">🧲</div>
            <div class="tp-label">Lead Magnets</div>
            <div class="tp-count">3 ready-to-build</div>
          </div>
        </div>

        <!-- STATS -->
        <div class="template-counts">
          <div class="tc-stat">
            <div class="tc-stat-num" style="color:var(--lv-d);">30</div>
            <div class="tc-stat-lbl">Caption templates</div>
          </div>
          <div class="tc-stat">
            <div class="tc-stat-num" style="color:var(--or);">6</div>
            <div class="tc-stat-lbl">Ad copy sets</div>
          </div>
          <div class="tc-stat">
            <div class="tc-stat-num" style="color:var(--pk);">5</div>
            <div class="tc-stat-lbl">Welcome emails</div>
          </div>
          <div class="tc-stat">
            <div class="tc-stat-num" style="color:var(--gd);">90</div>
            <div class="tc-stat-lbl">Days of content</div>
          </div>
        </div>

        <!-- BIG ACCESS BUTTON -->
        <div class="access-btn-wrap">
          <a href="/templates" class="access-btn">
            Open My Template Hub <span class="access-btn-arrow">→</span>
          </a>
          <div class="access-note">🔒 Your access is permanent · Bookmark this link</div>
        </div>

        <div class="ac-divider"></div>

        <!-- EMAIL NOTICE -->
        <div class="email-notice">
          <span class="en-icon">📧</span>
          <div>
            <div class="en-title">Your access link was also emailed to you</div>
            <div class="en-text">We sent your receipt and a <strong>permanent link to the Template Hub</strong> to the email you used at checkout. Bookmark this page <em>and</em> save that email so you always have access — even if you clear your browser history.</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- NEXT STEPS -->
<section class="next-section">
  <div class="container--narrow">
    <span class="eyebrow">Where to start</span>
    <h2 class="section-title">Your first 3 moves inside the Template Hub</h2>
    <p class="section-sub">Don't open the hub and get overwhelmed. Follow this order and you'll have real marketing running within 48 hours.</p>
    <div class="next-grid">
      <div class="next-card">
        <div class="nc-step nc-step-1">1</div>
        <div class="nc-title">Go to the 📅 90-Day Calendar tab first</div>
        <div class="nc-desc">Download the PDF calendar. Pick your start date. Identify your first 3 posts. This gives you a complete content plan before you write a single word.</div>
        <a href="/templates#tab-calendar" class="nc-link">Go to Calendar →</a>
      </div>
      <div class="next-card">
        <div class="nc-step nc-step-2">2</div>
        <div class="nc-title">Copy Caption #1 from the 📱 Captions tab</div>
        <div class="nc-desc">It's the "Raw vs. Processed Hair" education post. Copy it, swap in your brand name, post it today. Your first piece of real marketing content — done in 5 minutes.</div>
        <a href="/templates#tab-captions" class="nc-link">Go to Captions →</a>
      </div>
      <div class="next-card">
        <div class="nc-step nc-step-3">3</div>
        <div class="nc-title">Set up the 💌 5-Email Welcome Sequence</div>
        <div class="nc-desc">Copy all 5 emails into your email platform. Fill in your brand details. Turn it on. From this point forward, every new subscriber gets a full 7-day nurture sequence automatically.</div>
        <a href="/templates#tab-emails" class="nc-link">Go to Emails →</a>
      </div>
    </div>
  </div>
</section>

<!-- ALSO AVAILABLE -->
<section class="also-section">
  <div class="container">
    <div style="position:relative;z-index:1;">
      <span class="eyebrow" style="color:var(--or);">While you're here</span>
      <h2 class="section-title" style="color:white;">Complete your BSP Education library</h2>
      <p class="section-sub" style="color:rgba(255,255,255,.55);">These work alongside the Marketing Playbook — not instead of it.</p>
      <div class="also-grid">

        <div class="also-card">
          <div class="also-tag" style="color:var(--or);">Foundation</div>
          <div class="also-title">Raw Hair Business Blueprint</div>
          <div class="also-desc">The 30-day launch framework. Brand, niche, pricing, and your first sale — mapped action by action. Free for webinar attendees.</div>
          <div class="also-price">Free</div>
          <a href="/education/blueprint" class="also-btn">Download Free →</a>
        </div>

        <div class="also-card">
          <div class="also-tag" style="color:var(--pk);">First Sales</div>
          <div class="also-title">First $1K Fast Track</div>
          <div class="also-desc">The 7-day action workbook with 20 DM scripts and a daily plan that gets you to your first $1,000 in sales this week.</div>
          <div class="also-price">$97</div>
          <a href="/education/first-1k-fast-track" class="also-btn">Get the Fast Track →</a>
        </div>

        <div class="also-card">
          <div class="also-tag" style="color:var(--lv);">For Stylists</div>
          <div class="also-title">Stylist Accelerator Pack</div>
          <div class="also-desc">For licensed hairstylists. Pricing calculator, client introduction scripts, and the full BSP ordering workflow — install to fulfilled.</div>
          <div class="also-price">$147</div>
          <a href="/education/stylist-accelerator" class="also-btn">Get the Pack →</a>
        </div>

      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">Beauty<span>Share</span> Pro</div>
  <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `// Smooth scroll for anchor links
document.querySelectorAll('a[href*="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const hash = a.getAttribute('href');
    if(hash.startsWith('/') && hash.includes('#')) return; // external page links, let them go
  });
});

// Auto-scroll to access card after a brief moment for dramatic effect
window.addEventListener('load', () => {
  setTimeout(() => {
    const card = document.querySelector('.access-section');
    if(card) card.scrollIntoView({behavior:'smooth', block:'start'});
  }, 800);
});` }} />
    </div>
  );
}

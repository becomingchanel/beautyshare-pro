'use client';

import { useEffect } from 'react';

export default function ThankYouPage() {
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
.container{max-width:1040px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:700px;margin:0 auto;padding:0 24px;}

/* NAV */
.nav{background:var(--black);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:18px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-step{font-size:12px;color:rgba(255,255,255,0.4);}

/* PROGRESS */
.progress{background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d));height:4px;}
.progress-bar{height:4px;background:var(--black);padding:10px 0;}
.progress-inner{max-width:1040px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:0;}
.ps{display:flex;align-items:center;gap:0;}
.ps-dot{width:28px;height:28px;border-radius:50%;font-family:var(--fh);font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ps-dot.done{background:var(--or);color:white;box-shadow:0 0 0 3px rgba(249,115,22,.25);}
.ps-dot.active{background:white;color:var(--black);box-shadow:0 0 0 3px rgba(255,255,255,.2);}
.ps-dot.pending{background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.35);}
.ps-label{font-family:var(--fh);font-weight:700;font-size:12px;margin:0 10px;white-space:nowrap;}
.ps-label.done{color:var(--or);}
.ps-label.active{color:white;}
.ps-label.pending{color:rgba(255,255,255,0.35);}
.ps-line{flex:1;height:2px;background:rgba(255,255,255,0.12);border-radius:1px;}

/* HERO */
.hero{background:var(--black);padding:48px 0 40px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(249,115,22,0.08) 0%,transparent 65%);
  pointer-events:none;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;
  background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);
  border-radius:100px;padding:5px 16px;margin-bottom:18px;
  font-family:var(--fh);font-weight:700;font-size:10px;color:var(--or);
  letter-spacing:1.5px;text-transform:uppercase;}
.hero-tag::before{content:'';width:6px;height:6px;background:var(--or);border-radius:50%;
  animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,4.5vw,48px);
  color:white;letter-spacing:-1.2px;line-height:1.1;margin-bottom:14px;}
.hero-title .or{color:var(--or);}
.hero-sub{font-size:17px;color:rgba(255,255,255,0.65);line-height:1.65;
  max-width:580px;margin:0 auto 0;}
.hero-confirm{display:inline-flex;align-items:center;gap:10px;
  background:rgba(30,107,60,0.2);border:1px solid rgba(30,107,60,0.4);
  border-radius:8px;padding:10px 20px;margin-top:24px;
  font-family:var(--fh);font-weight:700;font-size:13px;color:#4ADE80;}
.hero-confirm-icon{font-size:16px;}

/* OFFER SECTION */
.offers-section{padding:56px 0 48px;}
.offers-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--or);
  display:block;text-align:center;margin-bottom:10px;}
.offers-title{font-family:var(--fh);font-weight:900;font-size:clamp(22px,3.5vw,34px);
  color:var(--text);letter-spacing:-.8px;line-height:1.15;
  text-align:center;margin-bottom:10px;}
.offers-sub{font-size:15px;color:var(--text-med);text-align:center;
  line-height:1.65;max-width:580px;margin:0 auto 44px;}

/* TWO BUMP CARDS */
.bump-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:20px;}

.bump-card{border-radius:16px;overflow:hidden;
  border:2.5px dashed var(--border);background:white;
  transition:border-color .2s,box-shadow .2s;}
.bump-card.selected{border-color:var(--or);box-shadow:0 0 0 4px rgba(249,115,22,.12);}
.bump-card.pk.selected{border-color:var(--lv-d);box-shadow:0 0 0 4px rgba(155,111,191,.12);}

.bc-top{height:5px;}
.bc-top-or{background:linear-gradient(90deg,var(--or),var(--pk));}
.bc-top-lv{background:linear-gradient(90deg,var(--lv-d),var(--gd));}

.bc-header{padding:18px 22px 14px;border-bottom:1px solid var(--border);}
.bc-add-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:pointer;}
.bc-checkbox{width:22px;height:22px;border-radius:5px;border:2px solid var(--border);
  background:white;display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:900;flex-shrink:0;transition:all .15s;}
.bc-checkbox.checked-or{background:var(--or);border-color:var(--or);color:white;}
.bc-checkbox.checked-lv{background:var(--lv-d);border-color:var(--lv-d);color:white;}
.bc-add-text{font-family:var(--fh);font-weight:800;font-size:14px;color:var(--text);line-height:1.3;}
.bc-add-price{font-family:var(--fh);font-weight:900;font-size:13px;color:var(--text-lt);}

.bc-title{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--text);
  margin-bottom:6px;line-height:1.3;}
.bc-desc{font-size:13px;color:var(--text-med);line-height:1.55;margin-bottom:14px;}
.bc-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;}
.bc-price-or{font-family:var(--fh);font-weight:900;font-size:32px;color:var(--or);}
.bc-price-lv{font-family:var(--fh);font-weight:900;font-size:32px;color:var(--lv-d);}
.bc-price-old{font-size:15px;color:var(--text-lt);text-decoration:line-through;}
.bc-price-save{font-family:var(--fh);font-weight:700;font-size:12px;
  color:var(--green);background:rgba(30,107,60,.1);border:1px solid rgba(30,107,60,.2);
  padding:2px 8px;border-radius:4px;}

.bc-body{padding:16px 22px 20px;}
.bc-items-title{font-family:var(--fh);font-weight:700;font-size:11px;
  color:var(--text-lt);letter-spacing:.5px;text-transform:uppercase;margin-bottom:10px;}
.bc-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;
  font-size:13px;color:var(--text);line-height:1.4;}
.bc-check-or{color:var(--or);font-weight:900;font-size:13px;flex-shrink:0;margin-top:1px;}
.bc-check-lv{color:var(--lv-d);font-weight:900;font-size:13px;flex-shrink:0;margin-top:1px;}
.bc-tag{display:inline-block;font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:3px;margin-top:8px;}
.bc-tag-or{background:var(--or-l);color:var(--or);border:1px solid rgba(249,115,22,.2);}
.bc-tag-lv{background:var(--lv-l);color:var(--lv-d);border:1px solid rgba(155,111,191,.2);}

/* TOTAL ROW */
.total-row{background:white;border-radius:12px;padding:18px 22px;
  border:1px solid var(--border);margin-bottom:20px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;}
.tr-label{font-family:var(--fh);font-weight:700;font-size:14px;color:var(--text);}
.tr-breakdown{font-size:12px;color:var(--text-lt);margin-top:3px;}
.tr-total{font-family:var(--fh);font-weight:900;font-size:30px;color:var(--or);}
.tr-note{font-size:11px;color:var(--text-lt);text-align:right;margin-top:2px;}

/* CTA BUTTONS */
.cta-btn{width:100%;padding:18px;font-family:var(--fh);font-weight:800;font-size:17px;
  border:none;border-radius:10px;cursor:pointer;transition:all .2s;
  letter-spacing:.3px;margin-bottom:10px;}
.cta-or{background:var(--or);color:white;box-shadow:0 4px 20px rgba(249,115,22,.35);}
.cta-or:hover{background:var(--or-d);transform:translateY(-1px);}
.skip-link{text-align:center;font-size:13px;color:var(--text-lt);cursor:pointer;
  text-decoration:underline;margin-top:6px;}
.skip-link:hover{color:var(--text);}
.guarantee{display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:12px;color:var(--text-lt);margin-top:14px;}

/* WHAT THEY GET BELOW */
.why-section{padding:48px 0;background:white;}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:40px;}
.why-card{border-radius:12px;padding:24px;border:1px solid var(--border);}
.why-card-or{background:var(--or-l);border-color:rgba(249,115,22,.2);}
.why-card-lv{background:var(--lv-l);border-color:rgba(155,111,191,.2);}
.why-num{font-family:var(--fh);font-weight:900;font-size:11px;
  letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
.why-num-or{color:var(--or);}
.why-num-lv{color:var(--lv-d);}
.why-title{font-family:var(--fh);font-weight:800;font-size:16px;
  color:var(--text);margin-bottom:10px;line-height:1.3;}
.why-desc{font-size:13.5px;color:var(--text-med);line-height:1.65;}

/* VIDEO SECTION */
.video-section{background:var(--black);padding:48px 0 52px;text-align:center;}
.video-eyebrow{display:inline-block;font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:10px;}
.video-title{font-family:var(--fh);font-weight:900;font-size:clamp(20px,3vw,30px);
  color:white;letter-spacing:-.6px;margin-bottom:24px;}
.video-wrapper{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;
  border-radius:14px;border:2px solid rgba(249,115,22,.3);
  box-shadow:0 8px 48px rgba(249,115,22,.2);}
.video-wrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;}
.video-caption{margin-top:16px;font-size:13px;color:rgba(255,255,255,.5);font-style:italic;}

/* FOOTER */
.footer{background:var(--black);padding:24px;text-align:center;border-top:1px solid #111;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;margin-bottom:6px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.3);}

@media(max-width:680px){
  .bump-grid{grid-template-columns:1fr;}
  .why-grid{grid-template-columns:1fr;}
  .total-row{flex-direction:column;align-items:flex-start;gap:8px;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<nav class="nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <span class="nav-step">Step 2 of 3 — Upgrade Your Launch</span>
</nav>

<!-- PROGRESS BAR -->
<div class="progress-bar" style="background:var(--black);padding:16px 0;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);">
  <div class="progress-inner">
    <div class="ps-dot done">✓</div>
    <span class="ps-label done">Registered</span>
    <div class="ps-line"></div>
    <div class="ps-dot active">2</div>
    <span class="ps-label active">Upgrade your launch</span>
    <div class="ps-line"></div>
    <div class="ps-dot pending">3</div>
    <span class="ps-label pending">Confirmation</span>
  </div>
</div>
<div class="progress"></div>

<!-- HERO -->
<section class="hero">
  <div>
    <div class="hero-tag">You're registered for the free webinar</div>
    <h1 class="hero-title">
      Check your inbox for the webinar link.<br>
      Before you go — <span class="or">one quick thing.</span>
    </h1>
    <p class="hero-sub">
      These two resources are only available at this price right here, right now.
      They're built to get you results the same week you watch the webinar.
    </p>
    <div class="hero-confirm">
      <span class="hero-confirm-icon">✓</span>
      Confirmation email sent to your inbox — check it now
    </div>
  </div>
</section>

<!-- VIDEO SECTION -->
<section class="video-section">
  <div class="container--narrow">
    <div class="video-eyebrow">Watch this before you scroll</div>
    <h2 class="video-title">A quick message for you →</h2>
    <div class="video-wrapper">
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_HERE"
        title="A quick message for you"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <p class="video-caption">🔊 Turn sound on — this is important for what's below.</p>
  </div>
</section>

<!-- ORDER BUMPS -->
<section class="offers-section">
  <div class="container">
    <span class="offers-eyebrow">One-time offer · Only available on this page</span>
    <h2 class="offers-title">Add These to Your Webinar — Start Strong from Day 1</h2>
    <p class="offers-sub">
      Select one or both to add to your order. Skip and they're gone — these aren't listed anywhere else on the site at these prices.
    </p>

    <div class="bump-grid">

      <!-- CARD 1: FIRST $1K FAST TRACK -->
      <div class="bump-card" id="card-fast" onclick="toggleCard('fast')">
        <div class="bc-top bc-top-or"></div>
        <div class="bc-header">
          <div class="bc-add-row">
            <div class="bc-checkbox checked-or" id="check-fast">✓</div>
            <div>
              <div class="bc-add-text">YES — Add this to my order</div>
              <div class="bc-add-price">+ $67 one-time</div>
            </div>
          </div>
          <div class="bc-title">First $1K Fast Track Workbook</div>
          <div class="bc-price-row">
            <span class="bc-price-or">$67</span>
            <span class="bc-price-old">$147</span>
            <span class="bc-price-save">Save $80</span>
          </div>
          <div class="bc-desc">Your 7-day action plan, 20 DM scripts, pricing guide, 7-day content calendar, and first sale checklist. Everything mapped out so you start making sales the same week you watch the webinar.</div>
          <div class="bc-tag bc-tag-or">Perfect for: New BSP Members</div>
        </div>
        <div class="bc-body">
          <div class="bc-items-title">What's included</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>7-day launch action plan (fillable PDF)</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>20 warm market DM scripts + follow-ups</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>Pricing formula — how to set your first prices</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>7-day content calendar with caption starters</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>First sale checklist — 10 actions in 72 hours</div>
          <div class="bc-item"><span class="bc-check-or">✓</span>Instant PDF delivery to your inbox</div>
        </div>
      </div>

      <!-- CARD 2: STYLIST ACCELERATOR PACK -->
      <div class="bump-card pk" id="card-stylist" onclick="toggleCard('stylist')">
        <div class="bc-top bc-top-lv"></div>
        <div class="bc-header">
          <div class="bc-add-row">
            <div class="bc-checkbox" id="check-stylist"></div>
            <div>
              <div class="bc-add-text">YES — Add this to my order</div>
              <div class="bc-add-price">+ $97 one-time</div>
            </div>
          </div>
          <div class="bc-title">Stylist Accelerator Pack</div>
          <div class="bc-price-row">
            <span class="bc-price-lv">$97</span>
            <span class="bc-price-old">$247</span>
            <span class="bc-price-save">Save $150</span>
          </div>
          <div class="bc-desc">For hairstylists who want to add Install + Raw Hair packages to their service menu. Real pricing with BSP costs, client scripts, social media strategy, and the complete BSP ordering workflow — from booking to fulfilled install.</div>
          <div class="bc-tag bc-tag-lv">Perfect for: Hairstylists</div>
        </div>
        <div class="bc-body">
          <div class="bc-items-title">What's included</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>Interactive profit calculator (Quick Weave, Sew-in, K-tip, Braids)</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>Client introduction scripts — in-chair, text, DM</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>Real BSP pricing with 20" bundle package examples</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>30-day social media content plan for stylists</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>New client acquisition + $5/day ad blueprint</div>
          <div class="bc-item"><span class="bc-check-lv">✓</span>Step-by-step BSP ordering workflow</div>
        </div>
      </div>

    </div>

    <!-- ORDER TOTAL -->
    <div class="total-row">
      <div>
        <div class="tr-label">Order total</div>
        <div class="tr-breakdown" id="breakdown-text">First $1K Fast Track — $67</div>
      </div>
      <div style="text-align:right;">
        <div class="tr-total" id="total-price">$67</div>
        <div class="tr-note">Charged once · Instant delivery</div>
      </div>
    </div>

    <!-- CTA -->
    <button class="cta-btn cta-or" id="main-cta" onclick="handleCTA()">
      Add to My Order &amp; Continue →
    </button>
    <div class="skip-link" onclick="skipAll()">No thanks — I'll skip these upgrades and continue to confirmation</div>
    <div class="guarantee">🔒 14-day money-back guarantee &nbsp;·&nbsp; Instant PDF delivery &nbsp;·&nbsp; Secure checkout</div>

  </div>
</section>

<!-- WHY SECTION -->
<section class="why-section">
  <div class="container">
    <span class="offers-eyebrow" style="display:block;text-align:center;margin-bottom:10px;">Why these two products · Why right now</span>
    <h2 class="offers-title" style="text-align:center;margin-bottom:40px;">You're about to watch a 75-minute webinar.<br>These make it immediately actionable.</h2>
    <div class="why-grid">
      <div class="why-card why-card-or">
        <div class="why-num why-num-or">First $1K Fast Track · $67</div>
        <div class="why-title">The webinar gives you the framework. This workbook gives you the daily actions.</div>
        <div class="why-desc">Most people watch a great webinar and feel motivated for 24 hours, then don't know what to do on Day 1. The Fast Track eliminates that gap. You walk away from the webinar and open your workbook. Day 1 is mapped out. Day 2 is mapped out. All the way to your first sale. No gap between inspiration and execution.</div>
      </div>
      <div class="why-card why-card-lv">
        <div class="why-num why-num-lv">Stylist Accelerator Pack · $97</div>
        <div class="why-title">If you're a hairstylist, this pack turns your existing clients into $400–$800 package clients.</div>
        <div class="why-desc">You already have the chair. You already have clients who trust you. This pack gives you the exact scripts to introduce package deals, the real BSP pricing so you know your margins, and the ordering workflow so every install runs smoothly. The Stylist Pack pays for itself on your very first package client — before you even attend the webinar.</div>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">Beauty<span>Share</span> Pro</div>
  <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `const prices = { fast: 67, stylist: 97 };
let selected = { fast: true, stylist: false };

function toggleCard(id) {
  selected[id] = !selected[id];
  const card = document.getElementById('card-' + id);
  const check = document.getElementById('check-' + id);
  const isLv = id === 'stylist';
  if (selected[id]) {
    card.classList.add('selected');
    check.classList.add(isLv ? 'checked-lv' : 'checked-or');
    check.textContent = '✓';
  } else {
    card.classList.remove('selected');
    check.classList.remove(isLv ? 'checked-lv' : 'checked-or');
    check.textContent = '';
  }
  updateTotal();
}

function updateTotal() {
  const total = Object.entries(selected).reduce((sum, [k, v]) => v ? sum + prices[k] : sum, 0);
  const parts = [];
  if (selected.fast)    parts.push('First $1K Fast Track — $67');
  if (selected.stylist) parts.push('Stylist Accelerator Pack — $97');
  
  document.getElementById('total-price').textContent = total > 0 ? '$' + total : '$0';
  document.getElementById('breakdown-text').textContent = parts.length > 0 ? parts.join(' + ') : 'Nothing selected';
  document.getElementById('main-cta').textContent = total > 0
    ? \`Add to My Order ($\${total}) & Continue →\`
    : 'Continue Without Upgrades →';
}

function handleCTA() {
  const total = Object.entries(selected).reduce((sum, [k, v]) => v ? sum + prices[k] : sum, 0);
  const params = new URLSearchParams();
  if (selected.fast)    params.set('fast', '1');
  if (selected.stylist) params.set('stylist', '1');
  params.set('total', total);
  // Goes to Marketing Playbook upsell regardless of what they chose
  window.location.href = '/upgrade?step=2&' + params.toString();
}

function skipAll() {
  window.location.href = '/upgrade?step=2&skip=1';
}

// Initialize — fast track pre-selected
document.getElementById('card-fast').classList.add('selected');
updateTotal();` }} />
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export default function UpsellsPage() {
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
  --lv:#DCBDEF;--lv-d:#9B6FBF;--lv-l:#F5EDFB;--lv-m:#EDD9F7;
  --gd:#E2AD37;--gd-l:#FEF9E7;--gd-m:#FAE8A0;
  --black:#0A0A0A;--dark:#111;--white:#fff;--off:#F9F6F2;
  --text:#1A0A00;--text-med:#5A3020;--text-lt:#888;
  --border:#E8E0D8;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}
.container{max-width:1100px;margin:0 auto;padding:0 24px;}
.container--mid{max-width:820px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:680px;margin:0 auto;padding:0 24px;}

/* ── NAV ── */
.nav{background:var(--black);padding:14px 0;border-bottom:1px solid #1a1a1a;}
.nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;padding:0 24px;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:19px;color:var(--white);}
.nav-logo span{color:var(--or);}
.nav-sub{font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;}

/* ── PROGRESS BAR ── */
.progress-bar{background:var(--black);padding:10px 0;text-align:center;border-bottom:1px solid #222;}
.progress-steps{display:flex;justify-content:center;align-items:center;gap:0;}
.ps{display:flex;align-items:center;gap:0;}
.ps-step{padding:6px 18px;font-family:var(--fh);font-weight:600;font-size:12px;
  color:rgba(255,255,255,0.4);position:relative;}
.ps-step.done{color:var(--or);}
.ps-step.active{color:var(--white);background:rgba(249,115,22,0.12);border-radius:4px;}
.ps-arrow{color:rgba(255,255,255,0.2);font-size:14px;padding:0 4px;}

/* ── PAGE HERO ── */
.page-hero{padding:60px 0 0;background:var(--black);position:relative;overflow:hidden;}
.page-hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 70% at 80% 50%,rgba(220,189,239,0.07) 0%,transparent 60%),
             radial-gradient(ellipse 40% 50% at 20% 30%,rgba(249,115,22,0.06) 0%,transparent 60%);
  pointer-events:none;}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;}
.hero-eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:16px;}
.eyebrow-badge{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;padding:4px 12px;border-radius:4px;}
.eb-or{background:rgba(249,115,22,0.2);color:var(--or);border:1px solid rgba(249,115,22,0.3);}
.eb-pk{background:rgba(214,20,101,0.2);color:var(--pk);border:1px solid rgba(214,20,101,0.3);}
.eb-lv{background:rgba(220,189,239,0.2);color:var(--lv-d);border:1px solid rgba(220,189,239,0.4);}
.eb-gd{background:rgba(226,173,55,0.2);color:var(--gd);border:1px solid rgba(226,173,55,0.3);}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(28px,4.5vw,46px);
  color:var(--white);line-height:1.08;letter-spacing:-1.2px;margin-bottom:16px;}
.hero-title .or{color:var(--or);}
.hero-title .pk{color:var(--pk);}
.hero-title .lv{color:var(--lv);}
.hero-title .gd{color:var(--gd);}
.hero-sub{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.65);margin-bottom:28px;}
.hero-meta{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:32px;}
.hero-meta-item{display:flex;align-items:center;gap:8px;font-family:var(--fh);
  font-weight:600;font-size:13px;color:rgba(255,255,255,0.8);}
.hmi-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.hmi-or{background:var(--or);}
.hmi-pk{background:var(--pk);}
.hmi-lv{background:var(--lv-d);}
.hmi-gd{background:var(--gd);}
.hero-bottom{padding:40px 0 0;}
.hero-stat-bar{display:flex;gap:0;border-top:1px solid rgba(255,255,255,0.07);}
.hstat{flex:1;text-align:center;padding:28px 12px;
  border-right:1px solid rgba(255,255,255,0.07);}
.hstat:last-child{border-right:none;}
.hstat-num{font-family:var(--fh);font-weight:900;font-size:26px;display:block;line-height:1;}
.hstat-label{font-size:12px;color:rgba(255,255,255,0.45);margin-top:4px;}

/* ── OFFER CARD ── */
.offer-card{background:var(--white);border-radius:16px;
  box-shadow:0 24px 64px rgba(0,0,0,0.4);overflow:hidden;
  position:sticky;top:80px;}
.oc-stripe{height:5px;}
.oc-stripe-or{background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d),var(--gd));}
.oc-header{padding:20px 24px;border-bottom:1px solid var(--border);}
.oc-label{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;margin-bottom:6px;}
.oc-label-or{color:var(--or);}
.oc-label-pk{color:var(--pk);}
.oc-label-lv{color:var(--lv-d);}
.oc-title{font-family:var(--fh);font-weight:900;font-size:17px;color:var(--text);line-height:1.3;}
.oc-body{padding:22px 24px;}
.oc-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;}
.oc-price{font-family:var(--fh);font-weight:900;font-size:38px;line-height:1;}
.oc-price-or{color:var(--or);}
.oc-price-pk{color:var(--pk);}
.oc-price-lv{color:var(--lv-d);}
.oc-price-old{font-size:16px;color:var(--text-lt);text-decoration:line-through;}
.oc-price-note{font-size:12px;color:var(--text-lt);}
.oc-includes{margin-bottom:18px;}
.oc-includes-title{font-family:var(--fh);font-weight:700;font-size:11px;
  color:var(--text-med);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:10px;}
.oc-item{display:flex;align-items:flex-start;gap:9px;margin-bottom:8px;
  font-size:13px;color:var(--text);line-height:1.4;}
.oc-check{font-size:13px;flex-shrink:0;margin-top:1px;}
.oc-check-or{color:var(--or);}
.oc-check-pk{color:var(--pk);}
.oc-check-lv{color:var(--lv-d);}
.oc-btn{width:100%;padding:16px;font-family:var(--fh);font-weight:800;font-size:15px;
  border:none;border-radius:8px;cursor:pointer;letter-spacing:0.3px;
  transition:all 0.2s;margin-bottom:10px;}
.oc-btn-or{background:var(--or);color:var(--white);box-shadow:0 4px 18px rgba(249,115,22,0.35);}
.oc-btn-or:hover{background:var(--or-d);transform:translateY(-1px);}
.oc-btn-pk{background:var(--pk);color:var(--white);box-shadow:0 4px 18px rgba(214,20,101,0.3);}
.oc-btn-pk:hover{filter:brightness(0.9);transform:translateY(-1px);}
.oc-btn-lv{background:var(--lv-d);color:var(--white);box-shadow:0 4px 18px rgba(155,111,191,0.3);}
.oc-btn-lv:hover{filter:brightness(0.9);transform:translateY(-1px);}
.oc-guarantee{font-size:12px;color:var(--text-lt);text-align:center;line-height:1.5;}

/* ── SECTIONS ── */
.section{padding:72px 0;}
.section--white{background:var(--white);}
.section--off{background:var(--off);}
.section--dark{background:var(--black);}
.section--or{background:var(--or-l);}
.section--pk{background:var(--pk-l);}
.section--lv{background:var(--lv-l);}
.section--gd{background:var(--gd-l);}

/* Color accent bar on sections */
.section-accent{height:3px;width:100%;}
.sa-or{background:linear-gradient(90deg,var(--or),var(--pk));}
.sa-pk{background:linear-gradient(90deg,var(--pk),var(--lv-d));}
.sa-lv{background:linear-gradient(90deg,var(--lv-d),var(--gd));}

.sec-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;margin-bottom:10px;display:block;}
.sec-title{font-family:var(--fh);font-weight:900;font-size:clamp(22px,3.5vw,34px);
  letter-spacing:-0.8px;line-height:1.15;margin-bottom:12px;}
.sec-sub{font-size:16px;line-height:1.65;color:var(--text-med);max-width:560px;margin-bottom:44px;}

/* ── WHAT'S INSIDE CARDS ── */
.inside-grid{display:grid;gap:16px;}
.inside-card{border-radius:12px;overflow:hidden;display:flex;
  border:1px solid var(--border);page-break-inside:avoid;}
.ic-accent{width:5px;flex-shrink:0;}
.ic-body{padding:20px 22px;flex:1;}
.ic-num{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;
  text-transform:uppercase;margin-bottom:6px;}
.ic-title{font-family:var(--fh);font-weight:800;font-size:15px;color:var(--text);
  margin-bottom:8px;line-height:1.3;}
.ic-desc{font-size:13.5px;line-height:1.6;color:var(--text-med);margin-bottom:12px;}
.ic-chips{display:flex;flex-wrap:wrap;gap:7px;}
.chip{font-size:12px;padding:3px 10px;border-radius:4px;border:1px solid;}
.chip-or{background:var(--or-l);color:var(--or);border-color:rgba(249,115,22,0.25);}
.chip-pk{background:var(--pk-l);color:var(--pk);border-color:rgba(214,20,101,0.2);}
.chip-lv{background:var(--lv-l);color:var(--lv-d);border-color:rgba(155,111,191,0.25);}
.chip-gd{background:var(--gd-l);color:#8A6800;border-color:rgba(226,173,55,0.3);}

/* ── VALUE STACK ── */
.value-table{width:100%;border-collapse:collapse;margin-top:28px;}
.value-table tr{border-bottom:1px solid rgba(255,255,255,0.06);}
.value-table td{padding:14px 0;vertical-align:middle;font-size:14px;}
.vt-item{color:rgba(255,255,255,0.8);font-weight:500;font-family:var(--fh);}
.vt-val{text-align:right;font-family:var(--fh);font-weight:800;font-size:15px;white-space:nowrap;}
.vt-or{color:var(--or);}
.vt-pk{color:var(--pk);}
.vt-lv{color:var(--lv);}
.value-total-row{display:flex;justify-content:space-between;align-items:center;
  padding:14px 0;border-top:1px solid rgba(255,255,255,0.12);margin-top:6px;}
.vtl{font-family:var(--fh);font-weight:700;font-size:16px;color:rgba(255,255,255,0.6);}
.vtp{font-family:var(--fh);font-weight:900;font-size:24px;color:rgba(255,255,255,0.35);
  text-decoration:line-through;}
.your-price{display:flex;justify-content:space-between;align-items:center;
  padding:16px 22px;border-radius:10px;margin-top:12px;}
.yp-or{background:var(--or);}
.yp-pk{background:var(--pk);}
.yp-lv{background:var(--lv-d);}
.yp-label{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--white);}
.yp-note{font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px;}
.yp-price{font-family:var(--fh);font-weight:900;font-size:30px;color:var(--white);}

/* ── TESTIMONIALS ── */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
.testi-card{border-radius:12px;padding:24px;border:1px solid var(--border);}
.tc-stars{font-size:14px;letter-spacing:2px;margin-bottom:12px;}
.tc-or .tc-stars{color:var(--gd);}
.tc-quote{font-size:14px;line-height:1.65;font-style:italic;color:var(--text);margin-bottom:18px;}
.tc-name{font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);}
.tc-detail{font-size:12px;color:var(--text-lt);margin-top:2px;}
.tc-result{font-family:var(--fh);font-weight:800;font-size:13px;margin-top:3px;}
.tc-result-or{color:var(--or);}
.tc-result-pk{color:var(--pk);}
.tc-result-lv{color:var(--lv-d);}

/* ── FINAL CTA ── */
.final-cta{padding:72px 0;text-align:center;position:relative;overflow:hidden;}
.fca-or{background:linear-gradient(135deg,var(--or),#f55c1a);}
.fca-pk{background:linear-gradient(135deg,var(--pk),#c0105a);}
.fca-lv{background:linear-gradient(135deg,var(--lv-d),#7A4A9F);}
.fca-multi{background:linear-gradient(135deg,var(--or),var(--pk),var(--lv-d));}
.final-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,4vw,44px);
  color:var(--white);letter-spacing:-1px;line-height:1.1;margin-bottom:14px;}
.final-sub{font-size:17px;color:rgba(255,255,255,0.85);line-height:1.6;
  margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;}
.final-btn{display:inline-block;background:var(--black);color:var(--white);
  font-family:var(--fh);font-weight:800;font-size:16px;padding:18px 44px;
  border-radius:8px;text-decoration:none;cursor:pointer;border:none;
  box-shadow:0 8px 32px rgba(0,0,0,0.3);transition:transform 0.2s;}
.final-btn:hover{transform:translateY(-2px);}
.final-note{font-size:13px;color:rgba(255,255,255,0.6);margin-top:14px;}

/* ── FAQ ── */
.faq-list{margin-top:36px;}
.faq-item{border-bottom:1px solid var(--border);}
.faq-q{width:100%;padding:18px 0;display:flex;justify-content:space-between;
  align-items:center;background:none;border:none;cursor:pointer;
  font-family:var(--fh);font-weight:700;font-size:14px;color:var(--text);
  text-align:left;gap:16px;}
.faq-icon{font-size:18px;transition:transform 0.2s;flex-shrink:0;}
.faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s;
  font-size:13.5px;line-height:1.7;color:var(--text-med);}
.faq-item.open .faq-a{max-height:200px;padding-bottom:16px;}
.faq-item.open .faq-icon{transform:rotate(45deg);}

/* ── DIVIDERS ── */
.color-divider{height:4px;width:100%;}
.cd-or-pk{background:linear-gradient(90deg,var(--or),var(--pk));}
.cd-pk-lv{background:linear-gradient(90deg,var(--pk),var(--lv-d));}
.cd-lv-gd{background:linear-gradient(90deg,var(--lv-d),var(--gd));}
.cd-full{background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d),var(--gd));}

/* ── FOOTER ── */
.footer{background:var(--black);padding:28px 0;text-align:center;border-top:1px solid #111;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--white);margin-bottom:8px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:12px;color:rgba(255,255,255,0.3);}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr;}
  .offer-card{position:static;}
  .testi-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:640px){
  .testi-grid{grid-template-columns:1fr;}
  .hero-stat-bar{display:grid;grid-template-columns:1fr 1fr;}
  .hstat{border-right:none;border-bottom:1px solid rgba(255,255,255,0.07);}
}

/* ── PAGE SWITCHER (tabs for this demo) ── */
.page-section{display:none;}
.page-section.visible{display:block;}
.page-nav{background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d));
  padding:12px 0;}
.page-nav-inner{display:flex;justify-content:center;gap:4px;max-width:1100px;margin:0 auto;padding:0 24px;}
.pn-btn{padding:9px 20px;font-family:var(--fh);font-weight:700;font-size:13px;
  background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.75);
  border:none;border-radius:6px;cursor:pointer;transition:all 0.2s;}
.pn-btn.active{background:var(--white);color:var(--black);}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <div>
      <div class="nav-logo">Beauty<span>Share</span> Pro</div>
      <div class="nav-sub">Special Member Upgrade — Order Add-On</div>
    </div>
    <a href="https://beautyshare-pro.vercel.app/" style="font-family:var(--fh);font-weight:600;font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;">← Back to main site</a>
  </div>
</nav>

<!-- PROGRESS -->
<div class="progress-bar">
  <div class="progress-steps">
    <div class="ps-step done">✓ Account created</div>
    <div class="ps-arrow">›</div>
    <div class="ps-step active">Upgrade your launch</div>
    <div class="ps-arrow">›</div>
    <div class="ps-step">Get started</div>
  </div>
</div>

<!-- PAGE NAV (for viewing all three on one page) -->
<div class="page-nav">
  <div class="page-nav-inner">
    <button class="pn-btn active" onclick="showPage('fast')">First $1K Fast Track — $67</button>
    <button class="pn-btn" onclick="showPage('playbook')">BSP Marketing Playbook — $197</button>
    <button class="pn-btn" onclick="showPage('stylist')">Stylist Accelerator Pack — $97</button>
  </div>
</div>

<!-- ══════════════════════════════════════════════════
     PAGE 1: FIRST $1K FAST TRACK — $67 ORDER BUMP
     ══════════════════════════════════════════════════ -->
<div class="page-section visible" id="page-fast">

  <div class="color-divider cd-or-pk"></div>

  <section style="background:var(--black);padding:60px 0 0;">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="hero-eyebrow">
            <div class="eyebrow-badge eb-or">Order Add-On · $67 One-Time</div>
            <div class="eyebrow-badge eb-gd">Most Popular</div>
          </div>
          <h1 class="hero-title">Your First <span class="or">$1,000</span><br>in 7 Days.<br><span style="font-size:0.72em;color:rgba(255,255,255,0.8);">The fast track playbook.</span></h1>
          <p class="hero-sub">You just joined BeautyShare Pro. This workbook gives you your exact Day 1 through Day 7 action plan — who to DM, what to say, how to price your first 3 products, and a 7-day posting plan — so you start generating sales this week, not next month.</p>
          <div class="hero-meta">
            <div class="hero-meta-item"><div class="hmi-dot hmi-or"></div>Fillable PDF workbook</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-pk"></div>Done-for-you DM scripts</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-lv"></div>7-day posting plan</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-gd"></div>Instant digital delivery</div>
          </div>
          <div class="hero-bottom">
            <div class="hero-stat-bar">
              <div class="hstat"><span class="hstat-num" style="color:var(--or);">7</span><div class="hstat-label">Days to first sale</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--pk);">20</span><div class="hstat-label">Warm DMs to send</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--lv);">$500+</span><div class="hstat-label">First week potential</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--gd);">$67</span><div class="hstat-label">One-time, yours forever</div></div>
            </div>
          </div>
        </div>

        <div>
          <div class="offer-card">
            <div class="oc-stripe oc-stripe-or"></div>
            <div class="oc-header">
              <div class="oc-label oc-label-or">Add to my order — Special Launch Price</div>
              <div class="oc-title">First $1K Fast Track Workbook</div>
            </div>
            <div class="oc-body">
              <div class="oc-price-row">
                <span class="oc-price oc-price-or">$67</span>
                <span class="oc-price-old">$147</span>
                <span class="oc-price-note">one-time · instant delivery</span>
              </div>
              <div class="oc-includes">
                <div class="oc-includes-title">What's inside</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>7-day launch action plan (fillable PDF)</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>20 warm market DM scripts (personalized templates)</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>Pricing guide — how to set your first 3 product prices</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>7-day content calendar with caption starters</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>First sale checklist (10 actions, Day 1–3)</div>
                <div class="oc-item"><span class="oc-check oc-check-or">✓</span>Follow-up sequence for warm leads who don't buy immediately</div>
              </div>
              <button class="oc-btn oc-btn-or">Yes — Add the Fast Track for $67 →</button>
              <div class="oc-guarantee">🔒 Instant PDF delivery to your inbox · 14-day money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-or-pk" style="margin-top:-1px;"></div>

  <!-- WHAT'S INSIDE -->
  <section class="section section--white">
    <div class="container--mid">
      <span class="sec-eyebrow" style="color:var(--or);">What's inside</span>
      <h2 class="sec-title" style="color:var(--text);">Everything mapped out. Day by day.</h2>
      <p class="sec-sub">Every action item in this workbook is calibrated to your first 7 days as a BSP member. No filler, no generic tips — just the exact moves that generate your first sale.</p>
      <div class="inside-grid">
        <div class="inside-card" style="background:var(--or-l);">
          <div class="ic-accent" style="background:var(--or);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--or);">Days 1–2 · Foundation</div>
            <div class="ic-title">Set up, price, and prep your storefront in 2 hours</div>
            <div class="ic-desc">Exact steps to complete your BSP seller profile, select your first 3 products, set competitive pricing using the workbook's margin guide, and write your first product descriptions using fill-in-the-blank prompts.</div>
            <div class="ic-chips">
              <span class="chip chip-or">Profile setup checklist</span>
              <span class="chip chip-or">Pricing formula</span>
              <span class="chip chip-or">Product description prompts</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--pk-l);">
          <div class="ic-accent" style="background:var(--pk);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--pk);">Days 3–4 · Warm Market Activation</div>
            <div class="ic-title">20 DM scripts that generate your first sales — tonight</div>
            <div class="ic-desc">20 personalized DM templates for different relationship types — close friends, acquaintances, former clients, hair-interested followers. Each script is ready to copy, personalize with a name and product, and send. Follow-up scripts included for non-responders.</div>
            <div class="ic-chips">
              <span class="chip chip-pk">DM templates × 20</span>
              <span class="chip chip-pk">Follow-up scripts</span>
              <span class="chip chip-pk">Who to target guide</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--lv-l);">
          <div class="ic-accent" style="background:var(--lv-d);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--lv-d);">Days 5–7 · Content &amp; Close</div>
            <div class="ic-title">7-day post plan + caption starters for Instagram and TikTok</div>
            <div class="ic-desc">A mapped-out content calendar for your first week — which type of post goes on which day, a caption starter for each post, and the soft CTA structure that drives traffic to your storefront without feeling salesy.</div>
            <div class="ic-chips">
              <span class="chip chip-lv">7-day calendar</span>
              <span class="chip chip-lv">Caption starters × 7</span>
              <span class="chip chip-lv">CTA templates</span>
              <span class="chip chip-lv">Hashtag guide</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--gd-l);">
          <div class="ic-accent" style="background:var(--gd);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:#8A6800;">Bonus · First Sale Checklist</div>
            <div class="ic-title">10 actions in 72 hours — from zero to first paid order</div>
            <div class="ic-desc">A sequential checklist of the 10 actions that generate your first sale within 72 hours of joining BSP. Designed as a printable daily tracker — check each box as you go, and you'll have your first order by Day 3.</div>
            <div class="ic-chips">
              <span class="chip chip-gd">Printable checklist</span>
              <span class="chip chip-gd">72-hour timeline</span>
              <span class="chip chip-gd">First sale celebration prompt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-pk-lv"></div>

  <!-- VALUE STACK -->
  <section class="section section--dark">
    <div class="container--narrow">
      <span class="sec-eyebrow" style="color:var(--or);">The value</span>
      <h2 class="sec-title" style="color:var(--white);">What this replaces if you built it yourself</h2>
      <table class="value-table">
        <tr><td class="vt-item">Social media copywriter: 7 caption templates</td><td class="vt-val vt-or">$150–$200</td></tr>
        <tr><td class="vt-item">Sales copywriter: 20 DM scripts</td><td class="vt-val vt-pk">$200–$350</td></tr>
        <tr><td class="vt-item">Business consultant: 7-day launch action plan</td><td class="vt-val vt-lv">$300–$500</td></tr>
        <tr><td class="vt-item">Your time figuring this out alone</td><td class="vt-val" style="color:var(--gd);">Priceless</td></tr>
      </table>
      <div class="value-total-row">
        <span class="vtl">Total if built separately</span>
        <span class="vtp">$650–$1,050+</span>
      </div>
      <div class="your-price yp-or">
        <div><div class="yp-label">Your price today</div><div class="yp-note">One-time · Instant delivery · Yours forever</div></div>
        <div class="yp-price">$67</div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-full"></div>

  <section class="final-cta fca-or">
    <div class="container--narrow">
      <h2 class="final-title">Your first sale is 7 days away.<br>Start with the right plan.</h2>
      <p class="final-sub">Don't spend your first week figuring out what to do. This workbook maps every action so you start generating revenue from Day 1.</p>
      <button class="final-btn">Add First $1K Fast Track — $67 →</button>
      <div class="final-note">🔒 Instant PDF delivery · 14-day money-back guarantee</div>
    </div>
  </section>

</div><!-- /page-fast -->

<!-- ══════════════════════════════════════════════════
     PAGE 2: BSP MARKETING PLAYBOOK — $197
     ══════════════════════════════════════════════════ -->
<div class="page-section" id="page-playbook">

  <div class="color-divider cd-pk-lv"></div>

  <section style="background:var(--black);padding:60px 0 0;">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="hero-eyebrow">
            <div class="eyebrow-badge eb-pk">Post-Checkout Upsell · $197 One-Time</div>
          </div>
          <h1 class="hero-title">The BSP <span class="pk">Marketing</span><br>Playbook.</h1>
          <p class="hero-sub">The complete marketing system for BeautyShare Pro sellers — Instagram growth, TikTok content strategy, your first Facebook ad, building a customer email list, and turning one-time buyers into repeat clients. Everything built specifically around the BSP dropship model.</p>
          <div class="hero-meta">
            <div class="hero-meta-item"><div class="hmi-dot hmi-pk"></div>Instagram + TikTok organic strategy</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-or"></div>First Facebook/Instagram ad blueprint</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-lv"></div>Email list building from zero</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-gd"></div>Repeat buyer + referral system</div>
          </div>
          <div class="hero-bottom">
            <div class="hero-stat-bar">
              <div class="hstat"><span class="hstat-num" style="color:var(--pk);">5</span><div class="hstat-label">Marketing modules</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--or);">30+</span><div class="hstat-label">Plug-and-play templates</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--lv);">$5/day</span><div class="hstat-label">Minimum ad budget needed</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--gd);">Lifetime</span><div class="hstat-label">Access, no expiry</div></div>
            </div>
          </div>
        </div>

        <div>
          <div class="offer-card">
            <div class="oc-stripe" style="background:linear-gradient(90deg,var(--pk),var(--lv-d));"></div>
            <div class="oc-header">
              <div class="oc-label oc-label-pk">Complete Marketing System</div>
              <div class="oc-title">BSP Marketing Playbook — All 5 Modules</div>
            </div>
            <div class="oc-body">
              <div class="oc-price-row">
                <span class="oc-price oc-price-pk">$197</span>
                <span class="oc-price-old">$497</span>
                <span class="oc-price-note">one-time · lifetime access</span>
              </div>
              <div class="oc-includes">
                <div class="oc-includes-title">5 complete modules</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>Module 1: Instagram + TikTok organic growth system</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>Module 2: Your first paid ad — $5/day to your first 100 customers</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>Module 3: Building your email list from zero to 500</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>Module 4: Turning one-time buyers into repeat clients</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>Module 5: Referral + word-of-mouth marketing system</div>
                <div class="oc-item"><span class="oc-check oc-check-pk">✓</span>30+ plug-and-play templates, scripts, and swipe files</div>
              </div>
              <button class="oc-btn oc-btn-pk">Get the Marketing Playbook — $197 →</button>
              <div class="oc-guarantee">🔒 Instant delivery · Lifetime access · 14-day money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-pk-lv" style="margin-top:-1px;"></div>

  <!-- MODULES -->
  <section class="section section--white">
    <div class="container--mid">
      <span class="sec-eyebrow" style="color:var(--pk);">5 complete modules</span>
      <h2 class="sec-title">Everything you need to market your BSP store</h2>
      <p class="sec-sub">Each module is built specifically for BeautyShare Pro sellers — not generic marketing advice. Every strategy, template, and script is designed for the raw hair dropship model.</p>
      <div class="inside-grid">
        <div class="inside-card" style="background:var(--pk-l);">
          <div class="ic-accent" style="background:var(--pk);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--pk);">Module 1</div>
            <div class="ic-title">Instagram + TikTok Organic Growth System</div>
            <div class="ic-desc">The 3-post weekly formula (education + transformation + story), 30 plug-and-play caption templates, a complete hashtag strategy for the hair niche, and the exact posting schedule that drives profile-to-storefront conversions. Includes a 90-day content calendar template.</div>
            <div class="ic-chips">
              <span class="chip chip-pk">30 caption templates</span>
              <span class="chip chip-pk">90-day calendar</span>
              <span class="chip chip-pk">Hashtag strategy</span>
              <span class="chip chip-pk">Hook formula</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--or-l);">
          <div class="ic-accent" style="background:var(--or);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--or);">Module 2</div>
            <div class="ic-title">Your First Paid Ad — $5/Day to Your First 100 Customers</div>
            <div class="ic-desc">Step-by-step Facebook and Instagram ad setup for complete beginners. The exact audience targeting for raw hair buyers (demographics, interests, and lookalikes). Two proven ad creative formulas — testimonial and transformation. How to read your results and know when to scale.</div>
            <div class="ic-chips">
              <span class="chip chip-or">Ad setup walkthrough</span>
              <span class="chip chip-or">Audience targeting guide</span>
              <span class="chip chip-or">Ad copy templates × 6</span>
              <span class="chip chip-or">Scaling decision framework</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--lv-l);">
          <div class="ic-accent" style="background:var(--lv-d);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--lv-d);">Module 3</div>
            <div class="ic-title">Building Your Email List From Zero to 500</div>
            <div class="ic-desc">Three lead magnet ideas for hair sellers (texture quiz, care guide, discount code), how to set up your opt-in without a website, the 5-email welcome sequence that converts subscribers to buyers, and a monthly newsletter template that drives repeat orders.</div>
            <div class="ic-chips">
              <span class="chip chip-lv">Lead magnet templates</span>
              <span class="chip chip-lv">Welcome sequence × 5 emails</span>
              <span class="chip chip-lv">Newsletter template</span>
            </div>
          </div>
        </div>
        <div class="inside-card" style="background:var(--gd-l);">
          <div class="ic-accent" style="background:var(--gd);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:#8A6800;">Module 4 + 5</div>
            <div class="ic-title">Repeat Buyers + Word-of-Mouth Referral System</div>
            <div class="ic-desc">Module 4 covers the post-purchase sequence that generates 5-star reviews and repeat orders — the thank-you message, the check-in at 2 weeks, and the reorder prompt at 8 weeks. Module 5 builds your referral engine: a friend-referral script, a simple affiliate setup, and how to activate your existing customers as brand ambassadors.</div>
            <div class="ic-chips">
              <span class="chip chip-gd">Post-purchase sequence</span>
              <span class="chip chip-gd">Review request template</span>
              <span class="chip chip-gd">Referral scripts</span>
              <span class="chip chip-gd">Ambassador program outline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-lv-gd"></div>

  <section class="section section--dark">
    <div class="container--narrow">
      <span class="sec-eyebrow" style="color:var(--pk);">The value</span>
      <h2 class="sec-title" style="color:var(--white);">What hiring this out would cost you</h2>
      <table class="value-table">
        <tr><td class="vt-item">Social media strategist: content system + calendar</td><td class="vt-val vt-pk">$500–$1,000</td></tr>
        <tr><td class="vt-item">Facebook ads consultant: setup + creative strategy</td><td class="vt-val vt-or">$500–$1,500</td></tr>
        <tr><td class="vt-item">Email marketing specialist: list building + sequences</td><td class="vt-val vt-lv">$300–$600</td></tr>
        <tr><td class="vt-item">30+ copy templates: captions, ads, emails, scripts</td><td class="vt-val" style="color:var(--gd);">$400–$800</td></tr>
      </table>
      <div class="value-total-row">
        <span class="vtl">Total if outsourced</span>
        <span class="vtp">$1,700–$3,900+</span>
      </div>
      <div class="your-price yp-pk">
        <div><div class="yp-label">Your price today</div><div class="yp-note">One-time · Lifetime access · No recurring fee</div></div>
        <div class="yp-price">$197</div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-full"></div>

  <section class="final-cta fca-pk">
    <div class="container--narrow">
      <h2 class="final-title">A great product doesn't sell itself.<br>This playbook does.</h2>
      <p class="final-sub">Your BSP storefront is live. Now you need customers. This playbook is the complete system for getting them — organically, through ads, and through your existing network.</p>
      <button class="final-btn">Get the Marketing Playbook — $197 →</button>
      <div class="final-note">🔒 Lifetime access · Instant delivery · 14-day money-back guarantee</div>
    </div>
  </section>

</div><!-- /page-playbook -->

<!-- ══════════════════════════════════════════════════
     PAGE 3: STYLIST ACCELERATOR PACK — $97
     ══════════════════════════════════════════════════ -->
<div class="page-section" id="page-stylist">

  <div class="color-divider cd-lv-gd"></div>

  <section style="background:var(--black);padding:60px 0 0;">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="hero-eyebrow">
            <div class="eyebrow-badge eb-lv">Stylists Only · $97 One-Time</div>
            <div class="eyebrow-badge eb-gd">Highest AOV Upsell</div>
          </div>
          <h1 class="hero-title">Add <span class="lv">$400–$800</span><br>to Every Install.<br><span style="font-size:0.72em;color:rgba(255,255,255,0.8);">Without spending more money.</span></h1>
          <p class="hero-sub">You already have the chair. You already have the clients. This pack shows you exactly how to introduce Install + Raw Hair package deals that increase your average ticket by $400–$800 per appointment — using BSP to source and fulfill the hair automatically.</p>
          <div class="hero-meta">
            <div class="hero-meta-item"><div class="hmi-dot hmi-lv"></div>Package pricing calculator (interactive)</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-or"></div>Client introduction scripts + DMs</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-pk"></div>Social media marketing strategy</div>
            <div class="hero-meta-item"><div class="hmi-dot hmi-gd"></div>New client acquisition playbook</div>
          </div>
          <div class="hero-bottom">
            <div class="hero-stat-bar">
              <div class="hstat"><span class="hstat-num" style="color:var(--lv);">$400+</span><div class="hstat-label">Added per package client</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--or);">4 services</span><div class="hstat-label">Quick weave, sew-in, k-tip, braids</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--pk);">$0</span><div class="hstat-label">Extra inventory cost to you</div></div>
              <div class="hstat"><span class="hstat-num" style="color:var(--gd);">$97</span><div class="hstat-label">One-time investment</div></div>
            </div>
          </div>
        </div>

        <div>
          <div class="offer-card">
            <div class="oc-stripe" style="background:linear-gradient(90deg,var(--lv-d),var(--gd));"></div>
            <div class="oc-header">
              <div class="oc-label oc-label-lv">For Hairstylists · Complete Package System</div>
              <div class="oc-title">Stylist Accelerator Pack — Install + Hair Packages</div>
            </div>
            <div class="oc-body">
              <div class="oc-price-row">
                <span class="oc-price oc-price-lv">$97</span>
                <span class="oc-price-old">$247</span>
                <span class="oc-price-note">one-time · instant delivery</span>
              </div>
              <div class="oc-includes">
                <div class="oc-includes-title">What's included</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>Interactive profit calculator (Quick Weave, Sew-in, K-tip, Braids)</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>Client introduction scripts — text, DM, and in-chair conversation</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>Package pricing guide + recommended markup structure</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>Social media content strategy (Instagram + TikTok for stylists)</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>New client acquisition playbook for package deals</div>
                <div class="oc-item"><span class="oc-check oc-check-lv">✓</span>Step-by-step BSP ordering workflow (how to order + fulfill per client)</div>
              </div>
              <button class="oc-btn oc-btn-lv">Get the Stylist Accelerator Pack — $97 →</button>
              <div class="oc-guarantee">🔒 Instant delivery · 14-day money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-lv-gd" style="margin-top:-1px;"></div>

  <!-- WHAT'S INSIDE -->
  <section class="section section--white">
    <div class="container--mid">
      <span class="sec-eyebrow" style="color:var(--lv-d);">What's inside</span>
      <h2 class="sec-title">Four service types. One complete system.</h2>
      <p class="sec-sub">Everything is built around the services you already offer — Quick Weave, Sew-in, K-tip, and Braids + Extensions. You add the hair through BSP. We built the system for how to price, introduce, and sell it.</p>
      <div class="inside-grid">

        <div class="inside-card" style="background:var(--lv-l);">
          <div class="ic-accent" style="background:var(--lv-d);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--lv-d);">Module 1 · The Calculator</div>
            <div class="ic-title">Interactive profit calculator for all 4 service types</div>
            <div class="ic-desc">An interactive digital calculator (included in your delivery) that lets you plug in your BSP wholesale cost, your markup price, and your install fee — and instantly see your total package price, net profit per client, hair margin percentage, and your monthly earning potential at 4, 10, and 20 package clients per month. Covers Quick Weave, Sew-in, K-tip, and Braids + Extensions.</div>
            <div class="ic-chips">
              <span class="chip chip-lv">Quick weave calculator</span>
              <span class="chip chip-lv">Sew-in calculator</span>
              <span class="chip chip-lv">K-tip calculator</span>
              <span class="chip chip-lv">Braids + extensions</span>
              <span class="chip chip-lv">Monthly earnings projector</span>
            </div>
          </div>
        </div>

        <div class="inside-card" style="background:var(--or-l);">
          <div class="ic-accent" style="background:var(--or);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--or);">Module 2 · Client Introduction</div>
            <div class="ic-title">Scripts for introducing your new package offering to existing clients</div>
            <div class="ic-desc">Three formats: an in-chair conversation script (what to say during their next appointment), a text message template (for clients you already have contact with), and a DM script for social media followers. All three are designed to present the package as an upgrade — premium quality hair plus your expertise — not a sales pitch.</div>
            <div class="ic-chips">
              <span class="chip chip-or">In-chair script</span>
              <span class="chip chip-or">Text template</span>
              <span class="chip chip-or">DM template</span>
              <span class="chip chip-or">Follow-up script</span>
              <span class="chip chip-or">Objection responses</span>
            </div>
          </div>
        </div>

        <div class="inside-card" style="background:var(--pk-l);">
          <div class="ic-accent" style="background:var(--pk);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:var(--pk);">Module 3 · Social Media Strategy for Stylists</div>
            <div class="ic-title">How to market Install + Hair packages on Instagram and TikTok</div>
            <div class="ic-desc">A complete social media playbook for stylists introducing hair packages: before-and-after post strategy, client testimonial video scripts, "why I switched to raw hair" storytelling framework, pricing reveal post templates, and a 30-day content calendar specifically for stylists launching a new service offering. Includes caption templates for each post type.</div>
            <div class="ic-chips">
              <span class="chip chip-pk">Before/after strategy</span>
              <span class="chip chip-pk">30-day calendar</span>
              <span class="chip chip-pk">Caption templates × 20</span>
              <span class="chip chip-pk">Reel script templates</span>
            </div>
          </div>
        </div>

        <div class="inside-card" style="background:var(--gd-l);">
          <div class="ic-accent" style="background:var(--gd);"></div>
          <div class="ic-body">
            <div class="ic-num" style="color:#8A6800;">Module 4 · New Client Acquisition + BSP Workflow</div>
            <div class="ic-title">How to attract new clients specifically for your package offering + how to order through BSP</div>
            <div class="ic-desc">Part 1: New client acquisition — how to position your package on booking platforms (Vagaro, Square, StyleSeat), what to put in your booking page bio, and how to run a simple $5/day Instagram ad targeting women in your city searching for installs. Part 2: The step-by-step BSP ordering workflow — how to take the client's order, place it through your BSP account, have it shipped to your salon or directly to the client, and collect the full package price at booking.</div>
            <div class="ic-chips">
              <span class="chip chip-gd">Booking platform copy</span>
              <span class="chip chip-gd">$5/day ad blueprint</span>
              <span class="chip chip-gd">BSP order workflow</span>
              <span class="chip chip-gd">Client payment guide</span>
              <span class="chip chip-gd">Fulfillment timeline</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <div class="color-divider" style="background:linear-gradient(90deg,var(--lv-d),var(--or),var(--pk));"></div>

  <section class="section section--dark">
    <div class="container--narrow">
      <span class="sec-eyebrow" style="color:var(--lv);">The math</span>
      <h2 class="sec-title" style="color:var(--white);">What this pack costs vs. what it earns you</h2>
      <table class="value-table">
        <tr><td class="vt-item">Your investment in this pack</td><td class="vt-val vt-lv">$97 once</td></tr>
        <tr><td class="vt-item">Added profit per package client (avg.)</td><td class="vt-val vt-or">$400–$600</td></tr>
        <tr><td class="vt-item">Break-even: clients needed to cover pack cost</td><td class="vt-val vt-pk">Less than 1</td></tr>
        <tr><td class="vt-item">Added monthly income at 10 package clients</td><td class="vt-val" style="color:var(--gd);">$4,000–$6,000</td></tr>
      </table>
      <div class="your-price yp-lv" style="margin-top:20px;">
        <div><div class="yp-label">Your investment today</div><div class="yp-note">One-time · Covers itself on your first package client</div></div>
        <div class="yp-price">$97</div>
      </div>
    </div>
  </section>

  <div class="color-divider cd-full"></div>

  <section class="final-cta fca-multi">
    <div class="container--narrow">
      <h2 class="final-title">You already have the chair.<br>Now add the revenue.</h2>
      <p class="final-sub">Your existing clients are already spending money on hair. This pack shows you how to capture that spend — and keep the margin — through your BSP storefront.</p>
      <button class="final-btn">Get the Stylist Accelerator Pack — $97 →</button>
      <div class="final-note">🔒 Instant delivery · Covers itself on your very first package client</div>
    </div>
  </section>

</div><!-- /page-stylist -->

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-logo">Beauty<span>Share</span> Pro</div>
    <div class="footer-copy">© 2026 BeautyShare Pro. All rights reserved. &nbsp;·&nbsp; <a href="https://beautyshare-pro.vercel.app/" style="color:rgba(255,255,255,0.3);">Main Site</a></div>
  </div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `function showPage(id) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.pn-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('visible');
  event.target.classList.add('active');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});` }} />
    </div>
  );
}

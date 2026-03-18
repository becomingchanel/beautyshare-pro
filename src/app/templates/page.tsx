'use client';

import { useEffect } from 'react';

export default function TemplateHub() {
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
  --black:#0A0A0A;--dark:#111827;--white:#fff;--off:#F9F6F2;
  --text:#1A0A00;--text-med:#5A3020;--text-lt:#888;--border:#E8E0D8;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
html{scroll-behavior:smooth;}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}

/* ── TOP BAR ── */
.topbar{background:var(--black);padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:56px;}
.tb-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;text-decoration:none;}
.tb-logo span{color:var(--or);}
.tb-tag{font-family:var(--fh);font-weight:600;font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.5px;}
.tb-badge{background:var(--lv-d);color:white;font-family:var(--fh);font-weight:700;font-size:10px;padding:4px 12px;border-radius:20px;letter-spacing:.5px;}

/* ── HERO ── */
.hero{background:var(--black);padding:44px 0 0;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 80% at 50% 50%,rgba(155,111,191,.08) 0%,transparent 65%);pointer-events:none;}
.hero-inner{max-width:1100px;margin:0 auto;padding:0 28px;text-align:center;position:relative;z-index:1;padding-bottom:0;}
.hero-kicker{display:inline-flex;align-items:center;gap:8px;background:rgba(155,111,191,.15);border:1px solid rgba(155,111,191,.3);border-radius:100px;padding:5px 16px;margin-bottom:18px;font-family:var(--fh);font-weight:700;font-size:10px;color:var(--lv);letter-spacing:2px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(28px,4vw,48px);color:white;letter-spacing:-1.2px;line-height:1.08;margin-bottom:12px;}
.hero-title .lv{color:var(--lv);}
.hero-sub{font-size:15px;color:rgba(255,255,255,.55);line-height:1.75;max-width:560px;margin:0 auto 32px;}
.hero-stats{display:flex;align-items:center;justify-content:center;gap:32px;margin-bottom:0;flex-wrap:wrap;}
.hs{text-align:center;}
.hs-num{font-family:var(--fh);font-weight:900;font-size:28px;color:var(--or);line-height:1;}
.hs-lbl{font-size:11px;color:rgba(255,255,255,.4);margin-top:3px;}

/* ── TAB NAV ── */
.tab-nav-wrap{background:var(--black);border-bottom:1px solid rgba(255,255,255,.08);position:sticky;top:0;z-index:100;}
.tab-nav{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;gap:0;overflow-x:auto;scrollbar-width:none;}
.tab-nav::-webkit-scrollbar{display:none;}
.tab-btn{flex-shrink:0;padding:14px 18px;font-family:var(--fh);font-weight:700;font-size:11px;color:rgba(255,255,255,.4);background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;transition:all .18s;letter-spacing:.3px;white-space:nowrap;display:flex;align-items:center;gap:7px;}
.tab-btn:hover{color:rgba(255,255,255,.8);}
.tab-btn.active{color:white;border-bottom-color:var(--or);}
.tab-btn .tab-count{background:rgba(255,255,255,.1);border-radius:10px;padding:1px 7px;font-size:10px;font-weight:700;}
.tab-btn.active .tab-count{background:var(--or);color:white;}

/* ── MAIN CONTENT AREA ── */
.content-area{max-width:1100px;margin:0 auto;padding:40px 28px 80px;}
.tab-panel{display:none;}
.tab-panel.active{display:block;}

/* ── SECTION HEADER ── */
.panel-header{margin-bottom:32px;}
.panel-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--lv-d);display:block;margin-bottom:8px;}
.panel-title{font-family:var(--fh);font-weight:900;font-size:clamp(22px,3vw,32px);color:var(--text);letter-spacing:-.5px;line-height:1.15;margin-bottom:8px;}
.panel-sub{font-size:15px;color:var(--text-med);line-height:1.7;max-width:700px;}
.panel-actions{display:flex;gap:12px;margin-top:18px;flex-wrap:wrap;}
.btn-gdoc{display:inline-flex;align-items:center;gap:8px;background:white;border:1.5px solid var(--border);color:var(--text);font-family:var(--fh);font-weight:700;font-size:12px;padding:9px 18px;border-radius:7px;text-decoration:none;transition:all .18s;}
.btn-gdoc:hover{border-color:var(--or);color:var(--or);}
.btn-gdoc .gdoc-icon{font-size:15px;}
.btn-canva{display:inline-flex;align-items:center;gap:8px;background:#7257FF;color:white;font-family:var(--fh);font-weight:700;font-size:12px;padding:9px 18px;border-radius:7px;text-decoration:none;transition:all .18s;}
.btn-canva:hover{filter:brightness(.9);}
.btn-pdf{display:inline-flex;align-items:center;gap:8px;background:var(--pk);color:white;font-family:var(--fh);font-weight:700;font-size:12px;padding:9px 18px;border-radius:7px;text-decoration:none;transition:all .18s;}
.btn-pdf:hover{filter:brightness(.9);}

/* ── TEMPLATE CARDS ── */
.templates-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.templates-grid.single{grid-template-columns:1fr;}
.templates-grid.triple{grid-template-columns:1fr 1fr 1fr;}

.tmpl-card{background:white;border-radius:14px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);overflow:hidden;transition:box-shadow .2s;}
.tmpl-card:hover{box-shadow:0 6px 28px rgba(0,0,0,.09);}
.tc-stripe{height:4px;}
.tc-stripe-or{background:linear-gradient(90deg,var(--or),var(--pk));}
.tc-stripe-pk{background:linear-gradient(90deg,var(--pk),var(--lv-d));}
.tc-stripe-lv{background:linear-gradient(90deg,var(--lv-d),var(--gd));}
.tc-stripe-gd{background:linear-gradient(90deg,var(--gd),var(--or));}
.tc-header{padding:18px 22px 14px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.tc-header-left{}
.tc-num{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-lt);margin-bottom:4px;}
.tc-title{font-family:var(--fh);font-weight:800;font-size:15px;color:var(--text);line-height:1.3;}
.tc-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;}
.tc-tag{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:.5px;text-transform:uppercase;padding:2px 8px;border-radius:4px;}
.tc-tag-or{background:var(--or-l);color:var(--or);}
.tc-tag-pk{background:var(--pk-l);color:var(--pk);}
.tc-tag-lv{background:var(--lv-l);color:var(--lv-d);}
.tc-tag-gd{background:var(--gd-l);color:#8A6800;}
.tc-copy-btn{flex-shrink:0;background:var(--off);border:1px solid var(--border);border-radius:6px;padding:6px 12px;font-family:var(--fh);font-weight:700;font-size:11px;color:var(--text-lt);cursor:pointer;transition:all .18s;white-space:nowrap;}
.tc-copy-btn:hover{background:var(--or);border-color:var(--or);color:white;}
.tc-copy-btn.copied{background:var(--lv-d);border-color:var(--lv-d);color:white;}
.tc-body{padding:18px 22px;}
.tc-content{font-size:13.5px;color:var(--text-med);line-height:1.75;white-space:pre-wrap;font-family:var(--fb);}
.tc-content .placeholder{background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;}
.tc-hook{font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:6px;}
.tc-tip{background:var(--lv-l);border-left:3px solid var(--lv-d);border-radius:0 6px 6px 0;padding:10px 14px;margin-top:14px;font-size:12.5px;color:var(--text-med);line-height:1.6;}
.tc-tip strong{color:var(--lv-d);font-family:var(--fh);}

/* ── EMAIL PREVIEW ── */
.email-preview{background:white;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-top:0;}
.ep-toolbar{background:var(--off);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;gap:8px;}
.ep-dot{width:10px;height:10px;border-radius:50%;}
.ep-fields{padding:14px 20px;border-bottom:1px solid var(--border);}
.ep-field{display:flex;align-items:center;gap:10px;padding:5px 0;font-size:13px;color:var(--text-lt);}
.ep-field-label{font-family:var(--fh);font-weight:700;font-size:11px;color:var(--text-lt);min-width:60px;}
.ep-field-val{color:var(--text);font-size:13px;}
.ep-field-val .placeholder{background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;}
.ep-body-area{padding:20px;}
.ep-subject-line{font-family:var(--fh);font-weight:800;font-size:18px;color:var(--text);margin-bottom:16px;line-height:1.3;}
.ep-divider{height:1px;background:var(--border);margin:14px 0;}
.ep-body{font-size:14px;color:var(--text-med);line-height:1.85;white-space:pre-wrap;}
.ep-body .placeholder{background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;}
.ep-sig{margin-top:20px;padding-top:16px;border-top:1px solid var(--border);font-size:13px;color:var(--text-lt);}

/* ── SMS CARD ── */
.sms-preview{display:flex;flex-direction:column;gap:12px;}
.sms-bubble-wrap{display:flex;justify-content:flex-end;}
.sms-bubble{background:var(--or);color:white;border-radius:18px 18px 4px 18px;padding:12px 16px;max-width:85%;font-size:14px;line-height:1.6;}
.sms-bubble .placeholder{background:rgba(255,255,255,.3);color:white;border-radius:3px;padding:0 4px;font-weight:700;}
.sms-time{text-align:right;font-size:11px;color:var(--text-lt);margin-top:4px;}

/* ── CALENDAR GRID ── */
.calendar-month{margin-bottom:40px;}
.cal-month-title{font-family:var(--fh);font-weight:900;font-size:18px;color:var(--text);margin-bottom:16px;display:flex;align-items:center;gap:10px;}
.cal-month-badge{background:var(--or-l);color:var(--or);font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:4px;}
.cal-week-header{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:6px;}
.cal-day-label{text-align:center;font-family:var(--fh);font-weight:700;font-size:10px;color:var(--text-lt);letter-spacing:.5px;text-transform:uppercase;padding:6px 0;}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
.cal-day{background:white;border:1px solid var(--border);border-radius:8px;padding:8px;min-height:80px;position:relative;}
.cal-day.empty{background:transparent;border:none;}
.cal-day.post-day{border-color:var(--or-m);}
.cal-day.post-day::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:8px 8px 0 0;}
.cal-day.post-or::before{background:var(--or);}
.cal-day.post-pk::before{background:var(--pk);}
.cal-day.post-lv::before{background:var(--lv-d);}
.cal-day.post-gd::before{background:var(--gd);}
.cal-day-num{font-family:var(--fh);font-weight:800;font-size:12px;color:var(--text-lt);margin-bottom:4px;}
.cal-day.post-day .cal-day-num{color:var(--text);}
.cal-post-type{font-family:var(--fh);font-weight:700;font-size:9px;letter-spacing:.5px;text-transform:uppercase;margin-bottom:3px;}
.post-or-text{color:var(--or);}
.post-pk-text{color:var(--pk);}
.post-lv-text{color:var(--lv-d);}
.post-gd-text{color:#8A6800;}
.cal-post-topic{font-size:10px;color:var(--text-med);line-height:1.4;}

/* ── AD TEMPLATE ── */
.ad-preview{background:white;border:1px solid var(--border);border-radius:12px;overflow:hidden;}
.ad-header{background:var(--or-l);padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}
.ad-platform{font-family:var(--fh);font-weight:700;font-size:11px;color:var(--or);letter-spacing:1px;text-transform:uppercase;}
.ad-body{padding:18px;}
.ad-section{margin-bottom:16px;}
.ad-section:last-child{margin-bottom:0;}
.ad-section-label{font-family:var(--fh);font-weight:700;font-size:10px;color:var(--text-lt);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.ad-section-content{font-size:13.5px;color:var(--text-med);line-height:1.7;}
.ad-section-content .placeholder{background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;}

/* ── LEAD MAGNET CARD ── */
.lm-card-tmpl{background:white;border-radius:14px;border:1px solid var(--border);overflow:hidden;}
.lmt-header{padding:20px 24px 16px;border-bottom:1px solid var(--border);}
.lmt-title{font-family:var(--fh);font-weight:800;font-size:16px;color:var(--text);margin-bottom:6px;}
.lmt-desc{font-size:13.5px;color:var(--text-med);line-height:1.65;}
.lmt-body{padding:16px 24px;}
.lmt-section-title{font-family:var(--fh);font-weight:700;font-size:11px;color:var(--text-lt);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;margin-top:14px;}
.lmt-section-title:first-child{margin-top:0;}
.lmt-item{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:var(--text-med);margin-bottom:8px;line-height:1.5;}
.lmt-check{color:var(--or);font-weight:900;font-size:12px;flex-shrink:0;margin-top:2px;}
.lmt-canva-note{background:rgba(114,87,255,.08);border:1px solid rgba(114,87,255,.2);border-radius:8px;padding:12px 16px;margin-top:14px;font-size:12.5px;color:#4A3AB5;display:flex;align-items:center;gap:8px;}

/* ── PROGRESS / STEP INDICATOR ── */
.step-indicator{display:flex;align-items:center;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:4px;}
.step{display:flex;align-items:center;gap:0;flex-shrink:0;}
.step-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:12px;flex-shrink:0;}
.step-dot.active{background:var(--or);color:white;}
.step-dot.done{background:var(--lv-d);color:white;}
.step-dot.pending{background:var(--border);color:var(--text-lt);}
.step-label{font-family:var(--fh);font-weight:600;font-size:11px;color:var(--text-lt);margin:0 10px;}
.step-label.active{color:var(--or);}
.step-label.done{color:var(--lv-d);}
.step-line{width:32px;height:2px;background:var(--border);flex-shrink:0;}
.step-line.done{background:var(--lv-d);}

/* ── TOAST ── */
#copy-toast{position:fixed;bottom:28px;right:28px;background:var(--lv-d);color:white;font-family:var(--fh);font-weight:700;font-size:13px;padding:12px 20px;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.2);z-index:9999;transform:translateY(80px);opacity:0;transition:all .3s ease;}
#copy-toast.show{transform:translateY(0);opacity:1;}

/* ── RESPONSIVE ── */
@media(max-width:720px){
  .templates-grid,.templates-grid.triple{grid-template-columns:1fr;}
  .topbar .tb-badge{display:none;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<div id="copy-toast">✓ Copied to clipboard!</div>

<!-- TOP BAR -->
<div class="topbar">
  <a href="https://www.BeautySharePro.com" class="tb-logo">Beauty<span>Share</span> Pro</a>
  <span class="tb-tag">Marketing Playbook</span>
  <span class="tb-badge">30+ Templates</span>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-kicker">BSP Marketing Playbook · Member Resource</div>
    <h1 class="hero-title">Your Complete <span class="lv">Template Library</span></h1>
    <p class="hero-sub">Every template, script, email, and calendar from the Marketing Playbook — organized, copyable, and ready to use. Nothing to write from scratch.</p>
    <div class="hero-stats">
      <div class="hs"><div class="hs-num">30</div><div class="hs-lbl">Caption templates</div></div>
      <div class="hs"><div class="hs-num">6</div><div class="hs-lbl">Ad copy sets</div></div>
      <div class="hs"><div class="hs-num">5</div><div class="hs-lbl">Welcome emails</div></div>
      <div class="hs"><div class="hs-num">90</div><div class="hs-lbl">Day calendar</div></div>
    </div>
  </div>
</section>

<!-- TAB NAV -->
<div class="tab-nav-wrap">
  <div class="tab-nav">
    <button class="tab-btn active" onclick="switchTab('captions',this)">📱 Captions <span class="tab-count">30</span></button>
    <button class="tab-btn" onclick="switchTab('ads',this)">📣 Ad Copy <span class="tab-count">6</span></button>
    <button class="tab-btn" onclick="switchTab('emails',this)">💌 Welcome Emails <span class="tab-count">5</span></button>
    <button class="tab-btn" onclick="switchTab('reorder',this)">🔁 Reorder <span class="tab-count">4</span></button>
    <button class="tab-btn" onclick="switchTab('reviews',this)">⭐ Reviews <span class="tab-count">3</span></button>
    <button class="tab-btn" onclick="switchTab('calendar',this)">📅 90-Day Calendar</button>
    <button class="tab-btn" onclick="switchTab('flash',this)">🎉 Flash Sale <span class="tab-count">3</span></button>
    <button class="tab-btn" onclick="switchTab('leadmagnets',this)">🧲 Lead Magnets <span class="tab-count">3</span></button>
  </div>
</div>

<div class="content-area">

<!-- ════════════════════════════════════════
     TAB 1: 30 INSTAGRAM/TIKTOK CAPTIONS
════════════════════════════════════════ -->
<div class="tab-panel active" id="tab-captions">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 1 · Instagram + TikTok</span>
    <h2 class="panel-title">30 Caption Templates</h2>
    <p class="panel-sub">10 Education posts, 10 Social Proof posts, and 10 Offer posts — one of each per week following the 3-post weekly formula. Replace every <span style="background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;">[BRACKET]</span> with your details.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc — Copy All 30</a>
    </div>
  </div>

  <!-- EDUCATION CAPTIONS -->
  <h3 style="font-family:var(--fh);font-weight:800;font-size:16px;color:var(--or);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--or-m);">📚 Education Captions (Post Type 1 of 3)</h3>
  <div class="templates-grid" style="margin-bottom:32px;">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #1 · Education</div>
          <div class="tc-title">Raw vs. Processed Hair Explainer</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap1" class="tc-content">Let's talk about why raw hair is worth every penny 👇

<span class="placeholder">[RAW HAIR]</span> = cut directly from one donor, never chemically treated. It holds curl patterns, takes color beautifully, and can last <span class="placeholder">[2-5 YEARS]</span> with proper care.

<span class="placeholder">[PROCESSED HAIR]</span> = stripped, coated in silicone to look shiny in the store. Wash it once and it tangles, mats, and dies.

Your hair should last longer than your relationship with your ex 💅

I sell 100% raw hair through <span class="placeholder">[YOUR BRAND NAME]</span> — no shortcuts, no coatings, no lies.

Shop link in bio 🔗

#rawhair #hairextensions #rawbundles #haireducation #naturalhair #<span class="placeholder">[YOURCITY]</span>hair</div>
        <div class="tc-tip"><strong>Pro tip:</strong> Add a Reel showing the "wet test" — wet hair curls up if it's truly raw, stays straight if it's processed. This post gets massive saves.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #2 · Education</div>
          <div class="tc-title">How to Tell If Your Hair Is Raw</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap2" class="tc-content">How to tell if your hair is ACTUALLY raw (save this) 📌

✅ Raw hair signs:
• Smells neutral — no chemicals
• Wets evenly and dries without frizz
• Holds a curl when wet, relaxes as it dries
• Tangles minimally even after weeks of wear
• Each strand is slightly different (it's human hair — not uniform)

❌ Processed hair signs:
• Strong chemical or "fresh" smell
• Gets frizzy or sticky when wet
• Goes limp after first wash
• Sheds excessively at the weft

At <span class="placeholder">[YOUR BRAND NAME]</span> we source only 100% raw — and I'll show you the difference in person if you're local 📍<span class="placeholder">[YOUR CITY]</span>

#rawhaircheck #hairknowledge #hairtips #rawbundles #hairextensions</div>
        <div class="tc-tip"><strong>Pro tip:</strong> This is a high-save post. Use it as a Carousel with each point on its own slide.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #3 · Education</div>
          <div class="tc-title">Why Raw Hair Costs More</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap3" class="tc-content">Why is raw hair more expensive? Let me break it down 🧵

Raw hair is collected from a SINGLE donor. One person. Their hair hasn't been chemically altered, bleached, or treated.

To get enough for a full bundle from one person = rare = expensive.

Processed hair? Collected from multiple people, stripped of cuticles, treated with chemicals, coated in silicone to fake the shine.

You pay once for raw hair and wear it for years.
You buy processed hair every 3-6 months.

Do the math 🧮

<span class="placeholder">[YOUR BRAND NAME]</span> sources 100% raw — so you're buying once and INVESTING.

Link in bio 🔗

#rawhair #hairinvestment #rawbundles #haireducation #<span class="placeholder">[YOURNICHE]</span></div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #4 · Education</div>
          <div class="tc-title">How to Care for Raw Hair</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap4',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap4" class="tc-content">Raw hair care 101 — the 5 rules that keep your bundles lasting years 📌

1️⃣ Wash with SULFATE-FREE shampoo only. Sulfates strip the cuticle.
2️⃣ Deep condition every 2 weeks. Raw hair still needs moisture.
3️⃣ Detangle DRY first, then wet — start from ends, work up.
4️⃣ Wrap at night. Always. Silk or satin only.
5️⃣ Limit heat. When you do use heat, use a protectant spray every time.

Do this and your <span class="placeholder">[YOUR BRAND NAME]</span> hair will outlast anything you've ever bought 💪

Questions? Drop them below 👇 I answer every one.

#rawhaircare #hairtips #bundlecare #rawbundles #hairroutine</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #5 · Education</div>
          <div class="tc-title">Texture Guide</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap5',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap5" class="tc-content">Confused about raw hair textures? Here's your guide 👇

🌊 RAW STRAIGHT — Sleek and smooth straight from the weft. Will curl with heat. Perfect if you love versatility.

🌀 RAW BODY WAVE — Loose, flowing S-pattern. The most popular texture. Works with almost every face shape.

💫 RAW DEEP WAVE — Tighter curl pattern. More volume. Gorgeous when moisturized.

🌿 RAW CURLY — Defined curl that matches natural hair textures beautifully.

Not sure which is right for you? DM me "<span class="placeholder">[KEYWORD]</span>" and I'll help you choose based on your lifestyle.

#rawhair #hairtextures #rawbundles #<span class="placeholder">[YOURTEXTURE]</span> #hairstyles</div>
        <div class="tc-tip"><strong>Pro tip:</strong> Use this as a pinned post or a Highlight cover. High utility = high saves.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Captions #6–10 · Education</div>
          <div class="tc-title">5 More Education Topics</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Instagram</span><span class="tc-tag tc-tag-gd">TikTok</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap6to10',this)">Copy All</button>
      </div>
      <div class="tc-body">
        <div id="cap6to10" class="tc-content">CAPTION #6 TOPIC: "How many bundles do I need?"
Hook: The bundle question everyone asks but nobody answers correctly 🧵
Content: Break down by length (14"=2 bundles, 18"=2-3, 22"+= 3+) with closure recommendation.

---

CAPTION #7 TOPIC: "What's a closure vs. a frontal?"
Hook: Closure vs. frontal — what's the actual difference? (most people guess wrong)
Content: Closure = 4x4 or 5x5, covers middle/top. Frontal = 13x4 or 13x6, hairline ear to ear. Use visuals.

---

CAPTION #8 TOPIC: "Can you color raw hair?"
Hook: Yes, you can color raw hair — but here's what nobody tells you first 🎨
Content: Raw hair takes color beautifully. Always do a strand test. Go lighter by 2 shades max without bleaching.

---

CAPTION #9 TOPIC: "How to spot a fake raw hair vendor"
Hook: 5 signs the "raw hair" vendor you're eyeing is lying to you 🚩
Content: Red flags: no origin story, suspiciously low prices, no wet test videos, can't tell you single donor vs. mixed.

---

CAPTION #10 TOPIC: "Why raw hair sheds (and how to fix it)"
Hook: Raw hair shedding? Before you blame the vendor — read this first
Content: Normal shedding = 50-100 hairs/day. Excess shedding = unsealed wefts. Solution: seal with clear glue or nail polish.</div>
      </div>
    </div>

  </div>

  <!-- SOCIAL PROOF CAPTIONS -->
  <h3 style="font-family:var(--fh);font-weight:800;font-size:16px;color:var(--pk);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--pk-m);">💬 Social Proof Captions (Post Type 2 of 3)</h3>
  <div class="templates-grid" style="margin-bottom:32px;">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #11 · Social Proof</div>
          <div class="tc-title">Customer Result Post</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Testimonial</span><span class="tc-tag tc-tag-or">Before/After</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap11',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap11" class="tc-content">She said it better than I ever could 💅

"<span class="placeholder">[CUSTOMER QUOTE — use their exact words]</span>"

— <span class="placeholder">[FIRST NAME]</span>, <span class="placeholder">[CITY, STATE]</span>

This is what <span class="placeholder">[YOUR BRAND NAME]</span> is about. Real hair. Real results. Real women.

If you're ready for your own story → link in bio 🔗

#<span class="placeholder">[YOURBRAND]</span>results #rawhair #customerreview #hairgoals #rawbundles</div>
        <div class="tc-tip"><strong>Pro tip:</strong> Screenshot the DM or text from your customer (with permission) and post it as the image. Authentic screenshots convert better than designed graphics.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #12 · Social Proof</div>
          <div class="tc-title">Reorder Post</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Loyalty</span><span class="tc-tag tc-tag-or">Social Proof</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap12',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap12" class="tc-content">When they reorder, that's the review that matters most ✨

<span class="placeholder">[CUSTOMER NAME]</span> just placed her <span class="placeholder">[2ND/3RD/4TH]</span> order with <span class="placeholder">[YOUR BRAND NAME]</span>.

She originally bought <span class="placeholder">[PRODUCT + LENGTH]</span> in <span class="placeholder">[MONTH]</span>.

The fact that she came back without any convincing? That's the product doing the work.

New orders open 🔗 Link in bio.

#repeatcustomer #rawhair #loyaltypays #<span class="placeholder">[YOURBRAND]</span> #rawbundles</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Captions #13–20 · Social Proof</div>
          <div class="tc-title">8 More Proof Templates</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Templates</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap13to20',this)">Copy All</button>
      </div>
      <div class="tc-body">
        <div id="cap13to20" class="tc-content">CAPTION #13: Stylist Partnership Post
"I don't just sell hair — I'm the supplier for stylists across [CITY]. DM me '[KEYWORD]' if you want wholesale pricing for your clients."

---

CAPTION #14: Behind the Brand
"Why I started [BRAND NAME]: [YOUR PERSONAL 2-3 SENTENCE STORY]. This business is personal. The hair is personal. That's why quality is non-negotiable."

---

CAPTION #15: Unboxing Reaction Post
Caption for a video of customer unboxing: "The unboxing reaction I live for 🎁 [CUSTOMER NAME] ordered [PRODUCT] and this was her reaction. Your turn → link in bio"

---

CAPTION #16: Transformation Tuesday
"Transformation Tuesday hits different when it's OUR hair 🙌 [BEFORE/AFTER DESCRIPTION]. Installed by [STYLIST TAG if applicable]. Hair by [YOUR BRAND]."

---

CAPTION #17: Long-Wear Post
"[CUSTOMER NAME] has been wearing her [BRAND NAME] bundles for [TIMEFRAME]. This is what raw hair looks like after [X] months of wear. Still going strong."

---

CAPTION #18: DM Conversation Screenshot
"This conversation actually made my day ☀️ [Post screenshot of customer saying something great]. This is why I do this."

---

CAPTION #19: Numbers Post (Milestones)
"[X] orders shipped. [X] women served. [X] cities reached. [YOUR BRAND NAME] is just getting started 🙏"

---

CAPTION #20: Community Post
"Something that nobody tells you when you start wearing raw hair — it changes how you walk into a room 💫 Drop a ❤️ if you know the feeling."</div>
      </div>
    </div>
  </div>

  <!-- OFFER CAPTIONS -->
  <h3 style="font-family:var(--fh);font-weight:800;font-size:16px;color:var(--lv-d);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--lv-m,#E8D5F5);">🛒 Offer Captions (Post Type 3 of 3)</h3>
  <div class="templates-grid">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #21 · Offer</div>
          <div class="tc-title">Product Showcase</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">Offer</span><span class="tc-tag tc-tag-or">Product</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap21',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap21" class="tc-content">Introducing <span class="placeholder">[PRODUCT NAME]</span> — now available at <span class="placeholder">[YOUR BRAND NAME]</span> 🖤

✨ <span class="placeholder">[TEXTURE]</span> texture
📏 Available in <span class="placeholder">[LENGTHS]</span>
💧 100% raw — wet test approved
🚢 Ships in <span class="placeholder">[X DAYS]</span>

Starting at <span class="placeholder">$[PRICE]</span> → link in bio

Limited stock — we don't overstock on purpose. Raw hair is sourced, not manufactured.

DM me "<span class="placeholder">[KEYWORD]</span>" if you want to lock in your order first.

#<span class="placeholder">[YOURBRAND]</span> #rawhair #<span class="placeholder">[TEXTURE]</span>bundles #rawbundles #hairgoals</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Caption #22 · Offer</div>
          <div class="tc-title">Bundle Deal Announcement</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">Offer</span><span class="tc-tag tc-tag-gd">Urgency</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap22',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div id="cap22" class="tc-content">This bundle deal won't last long — just being honest 🤍

<span class="placeholder">[X]</span> bundles + closure for <span class="placeholder">$[PRICE]</span>
(Normally <span class="placeholder">$[REGULAR PRICE]</span>)

What's included:
📦 <span class="placeholder">[X]</span> bundles — <span class="placeholder">[TEXTURE]</span>, <span class="placeholder">[LENGTHS]</span>
📦 <span class="placeholder">[CLOSURE TYPE]</span> closure

Ships in <span class="placeholder">[X BUSINESS DAYS]</span>.

This pricing is only available for the next <span class="placeholder">[X DAYS / X HOURS]</span>.

DM me now or click the link in bio 🔗

#bundledeal #rawhair #rawbundles #hairdeals #<span class="placeholder">[YOURBRAND]</span></div>
        <div class="tc-tip"><strong>Pro tip:</strong> Use Stories to count down the deadline with a countdown sticker. Stories urgency converts DMs into orders faster than any other tactic.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Captions #23–30 · Offer</div>
          <div class="tc-title">8 More Offer Templates</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">Templates</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('cap23to30',this)">Copy All</button>
      </div>
      <div class="tc-body">
        <div id="cap23to30" class="tc-content">CAPTION #23: DM Keyword Offer
"DM me '[KEYWORD]' right now and I'll send you our current bundle menu + pricing. 🤍 No commitment. Just info."

---

CAPTION #24: Link in Bio CTA
"If you've been watching my page and wondering if the hair is worth it — it is. Link in bio. Take the first step."

---

CAPTION #25: Soft Launch / First Customer Offer
"To celebrate [MILESTONE/MONTH], I'm doing something special for the next [X] customers — [OFFER DETAILS]. This is a one-time thing. Link in bio or DM me '[KEYWORD]'."

---

CAPTION #26: Stylist Wholesale Offer
"Attention stylists: I offer wholesale pricing on raw hair bundles for licensed stylists with an active clientele. DM me 'WHOLESALE' to get the details."

---

CAPTION #27: FAQ Post with Offer
"Most asked question: 'Is the hair worth the price?' Let me answer that — and show you exactly what's available this week."

---

CAPTION #28: Comparison Post + Offer
"You could buy [CHEAPER OPTION] every 3 months for the next 2 years. Or you could invest in [BRAND NAME] once. The math doesn't lie."

---

CAPTION #29: Stock Alert
"⚠️ Low stock alert: [TEXTURE] [LENGTH] bundles — we have [X] sets left. First come first served. Link in bio."

---

CAPTION #30: Story-to-DM
"Drop a 💜 in the comments if you're ready to upgrade your hair. I'll DM you personally with our current availability."</div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 2: 6 META AD COPY TEMPLATES
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-ads">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 2 · Paid Ads</span>
    <h2 class="panel-title">6 Meta Ad Copy Templates</h2>
    <p class="panel-sub">Each template includes Primary Text, Headline, and CTA. Test 2 at a time. Replace all <span style="background:var(--or-m);color:var(--or-d);border-radius:3px;padding:0 4px;font-weight:700;font-size:12px;">[BRACKETS]</span> before publishing.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc</a>
    </div>
  </div>
  <div class="templates-grid">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Ad #1</div>
          <div class="tc-title">Problem/Solution — "Tired of" Hook</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Awareness</span><span class="tc-tag tc-tag-gd">Cold Audience</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('ad1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="ad-preview">
          <div class="ad-header"><span style="font-size:14px;">📣</span><span class="ad-platform">Meta Ad · Problem/Solution</span></div>
          <div class="ad-body">
            <div class="ad-section">
              <div class="ad-section-label">Primary Text</div>
              <div id="ad1" class="ad-section-content">Tired of buying hair that tangles after the first wash? 😤

There's a reason raw hair is different — and most vendors won't explain it.

Raw hair is collected from ONE donor. Never chemically treated. Never stripped. It holds its texture, takes color beautifully, and lasts years — not months.

At <span class="placeholder">[YOUR BRAND NAME]</span> we source 100% verified raw hair. No shortcuts. No coatings.

Your next install should be the last one you have to replace for a long, long time.</div>
            </div>
            <div class="ep-divider"></div>
            <div class="ad-section">
              <div class="ad-section-label">Headline</div>
              <div class="ad-section-content"><strong>Raw Hair That Actually Lasts — <span class="placeholder">[BRAND NAME]</span></strong></div>
            </div>
            <div class="ad-section">
              <div class="ad-section-label">CTA Button</div>
              <div class="ad-section-content">Shop Now</div>
            </div>
            <div class="ad-section">
              <div class="ad-section-label">Audience Targeting</div>
              <div class="ad-section-content">Women 22–45 · Interests: Hair extensions, Natural hair care, Hair salons · Location: <span class="placeholder">[YOUR TARGET AREA]</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Ad #2</div>
          <div class="tc-title">Social Proof — Testimonial Hook</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Warm Audience</span><span class="tc-tag tc-tag-or">Conversion</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('ad2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="ad-preview">
          <div class="ad-header"><span style="font-size:14px;">📣</span><span class="ad-platform">Meta Ad · Social Proof</span></div>
          <div class="ad-body">
            <div class="ad-section">
              <div class="ad-section-label">Primary Text</div>
              <div id="ad2" class="ad-section-content">"<span class="placeholder">[REAL CUSTOMER QUOTE — keep it short, max 2 sentences]</span>"

— <span class="placeholder">[FIRST NAME, CITY]</span>

This is what raw hair feels like when it's the real thing. <span class="placeholder">[YOUR BRAND NAME]</span> ships 100% raw bundles directly to your door — or to your stylist.

Hundreds of women in <span class="placeholder">[YOUR AREA/NATIONWIDE]</span> have made the switch.

Ready to join them?</div>
            </div>
            <div class="ep-divider"></div>
            <div class="ad-section">
              <div class="ad-section-label">Headline</div>
              <div class="ad-section-content"><strong>"<span class="placeholder">[SHORTENED QUOTE]</span>" — Shop <span class="placeholder">[BRAND]</span></strong></div>
            </div>
            <div class="ad-section"><div class="ad-section-label">CTA Button</div><div class="ad-section-content">Shop Now</div></div>
            <div class="ad-section"><div class="ad-section-label">Creative Type</div><div class="ad-section-content">Screenshot of the real DM/review + product photo combination</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Ad #3</div>
          <div class="tc-title">Price Anchoring — Value Hook</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Objection Handling</span><span class="tc-tag tc-tag-gd">Cold Audience</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('ad3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="ad-preview">
          <div class="ad-header"><span style="font-size:14px;">📣</span><span class="ad-platform">Meta Ad · Price Anchoring</span></div>
          <div class="ad-body">
            <div class="ad-section">
              <div class="ad-section-label">Primary Text</div>
              <div id="ad3" class="ad-section-content">Most women spend $<span class="placeholder">[X]</span>–$<span class="placeholder">[X]</span>/year replacing hair that doesn't last.

Raw hair from <span class="placeholder">[YOUR BRAND NAME]</span> starts at $<span class="placeholder">[PRICE]</span> — and lasts <span class="placeholder">[2–5 years]</span> with proper care.

Buy it once. Actually love it.

Free shipping on orders over $<span class="placeholder">[AMOUNT]</span>. Ships in <span class="placeholder">[X]</span> business days.</div>
            </div>
            <div class="ep-divider"></div>
            <div class="ad-section"><div class="ad-section-label">Headline</div><div class="ad-section-content"><strong>Stop Replacing Your Hair Every 3 Months</strong></div></div>
            <div class="ad-section"><div class="ad-section-label">CTA Button</div><div class="ad-section-content">Shop Now</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Ads #4–6</div>
          <div class="tc-title">3 More Ad Templates</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">Templates</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('ad4to6',this)">Copy All</button>
      </div>
      <div class="tc-body">
        <div id="ad4to6" class="tc-content">AD #4 — CURIOSITY HOOK (Cold Audience)
Primary Text: Most people don't know there are 3 types of "raw hair" — and only one of them is actually raw. Here's how to tell the difference before you spend your money. [YOUR BRAND NAME] only sources Type 1. We'll explain why in the link below.
Headline: The Raw Hair Test Most Vendors Fail
CTA: Learn More

---

AD #5 — LOCAL STYLIST TARGETING
Primary Text: Attention [CITY] hairstylists — if you're still ordering from a vendor who ships you a different product every time, I want to talk to you. [YOUR BRAND NAME] offers wholesale raw hair with consistent quality, single-donor sourcing, and fast shipping. DM me "WHOLESALE" or click below.
Headline: Wholesale Raw Hair for [CITY] Stylists
CTA: Send Message
Target: Women 25-50, Interests: Cosmetology, Hairstylist, Beauty salon

---

AD #6 — RETARGETING (Warm Audience — visited site but didn't buy)
Primary Text: You visited [YOUR BRAND NAME] recently. Still thinking about it? Here's what you should know: [SPECIFIC PRODUCT] is almost sold out in [POPULAR LENGTH]. We don't restock until [TIMEFRAME]. If you were waiting for a sign — this is it.
Headline: Still Thinking About It? Stock Is Limited.
CTA: Shop Now
Target: Website visitors from last 30 days (Custom Audience)</div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 3: 5-EMAIL WELCOME SEQUENCE
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-emails">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 3 · Email List</span>
    <h2 class="panel-title">5-Email Welcome Sequence</h2>
    <p class="panel-sub">Send Email 1 immediately on signup. Emails 2–5 are spaced 1–2 days apart. Set this up once in your email platform and it runs automatically forever.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc — Copy All 5 Emails</a>
    </div>
  </div>

  <div class="step-indicator">
    <div class="step"><div class="step-dot active">1</div><span class="step-label active">Instant</span></div>
    <div class="step-line"></div>
    <div class="step"><div class="step-dot pending">2</div><span class="step-label">Day 1</span></div>
    <div class="step-line"></div>
    <div class="step"><div class="step-dot pending">3</div><span class="step-label">Day 3</span></div>
    <div class="step-line"></div>
    <div class="step"><div class="step-dot pending">4</div><span class="step-label">Day 5</span></div>
    <div class="step-line"></div>
    <div class="step"><div class="step-dot pending">5</div><span class="step-label">Day 7</span></div>
  </div>

  <div class="templates-grid single">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Email 1 · Immediate Send</div>
          <div class="tc-title">Welcome + Brand Story</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Warmth</span><span class="tc-tag tc-tag-pk">Trust Building</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('email1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">From:</span><span class="ep-field-val"><span class="placeholder">[YOUR NAME]</span> · <span class="placeholder">[YOUR BRAND NAME]</span></span></div>
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">Welcome to <span class="placeholder">[BRAND NAME]</span> — here's what to expect 🖤</span></div>
          </div>
          <div class="ep-body-area">
            <div class="ep-subject-line">Welcome to <span class="placeholder">[BRAND NAME]</span> — here's what to expect 🖤</div>
            <div id="email1" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

You made it. Welcome to the <span class="placeholder">[BRAND NAME]</span> family — and I mean that genuinely.

I'm <span class="placeholder">[YOUR NAME]</span>, the founder. I started this brand because <span class="placeholder">[YOUR PERSONAL 2-3 SENTENCE ORIGIN STORY — why you care about raw hair, why you started this business, what problem you experienced personally]</span>.

That experience is why quality is non-negotiable here. Every bundle we sell is 100% raw — sourced from a single donor, never chemically treated, and tested before it reaches you.

Here's what being on this list means:

✦ You'll hear about new drops before anyone else
✦ You'll get exclusive pricing that isn't available on the site
✦ You'll get my honest hair advice — not just product pitches

No spam. No nonsense. If I'm emailing you, it's worth opening.

Your first discount is coming in the next email — watch for it.

Talk soon,

<span class="placeholder">[YOUR NAME]</span>
Founder, <span class="placeholder">[BRAND NAME]</span>
<span class="placeholder">[SOCIAL HANDLE]</span></div>
            <div class="ep-sig"><span class="placeholder">[BRAND NAME]</span> · <span class="placeholder">[WEBSITE URL]</span> · Unsubscribe</div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Email 2 · Day 1 After Signup</div>
          <div class="tc-title">Education + Soft Offer</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Education</span><span class="tc-tag tc-tag-lv">Soft Pitch</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('email2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">The raw hair truth nobody tells you (+ a discount)</span></div>
          </div>
          <div class="ep-body-area">
            <div id="email2" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

Before you spend another dollar on hair, I want to make sure you know what you're actually buying.

Here's the honest breakdown:

PROCESSED hair = collected from multiple sources, stripped of cuticles, coated in silicone. Looks great in the store, tangles and mats after a few washes.

RAW hair = collected from ONE donor, cuticles intact, zero chemical treatment. Takes color, holds texture, lasts years.

At <span class="placeholder">[BRAND NAME]</span>, we only sell raw. And we can prove it — every bundle has a wet test guarantee.

As a thank-you for joining our list, here's <span class="placeholder">[X]</span>% off your first order:

🏷️ Code: <span class="placeholder">[DISCOUNT CODE]</span>
⏰ Expires: <span class="placeholder">[DATE — 7 days from now]</span>

→ Shop now: <span class="placeholder">[LINK]</span>

Any questions? Just reply to this email. I read everything.

<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Email 3 · Day 3</div>
          <div class="tc-title">Social Proof + FAQ</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Social Proof</span><span class="tc-tag tc-tag-or">Objection Handling</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('email3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">Real customers. Real results. (+ your top questions answered)</span></div>
          </div>
          <div class="ep-body-area">
            <div id="email3" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

A few messages from women who've ordered from <span class="placeholder">[BRAND NAME]</span>:

💬 "<span class="placeholder">[CUSTOMER QUOTE 1]</span>" — <span class="placeholder">[Name, City]</span>

💬 "<span class="placeholder">[CUSTOMER QUOTE 2]</span>" — <span class="placeholder">[Name, City]</span>

💬 "<span class="placeholder">[CUSTOMER QUOTE 3]</span>" — <span class="placeholder">[Name, City]</span>

Now, the questions I get most:

Q: How long does shipping take?
A: <span class="placeholder">[X BUSINESS DAYS]</span>. We ship from <span class="placeholder">[LOCATION]</span>.

Q: Do you offer bundles + closure sets?
A: Yes — our most popular sets are <span class="placeholder">[PRODUCT NAMES + LINKS]</span>.

Q: Can I return if I'm not happy?
A: <span class="placeholder">[YOUR RETURN POLICY IN 1-2 SENTENCES]</span>.

Q: How do I know it's actually raw?
A: We do a wet test on every shipment. <span class="placeholder">[OPTIONAL: link to video or explain]</span>.

Still have your discount code? → Code: <span class="placeholder">[CODE]</span>

Expires <span class="placeholder">[DATE]</span> — 4 days left.

<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Email 4 · Day 5</div>
          <div class="tc-title">The Best Seller</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">Product Feature</span><span class="tc-tag tc-tag-gd">Conversion</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('email4',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">Our most ordered item (and why everyone comes back for it)</span></div>
          </div>
          <div class="ep-body-area">
            <div id="email4" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

If you've been on the fence, I want to make it easy.

Our most-ordered item right now is the <span class="placeholder">[PRODUCT NAME + TEXTURE + LENGTH]</span>. Here's why:

✦ <span class="placeholder">[REASON 1 — e.g., works with most install types]</span>
✦ <span class="placeholder">[REASON 2 — e.g., holds color beautifully]</span>
✦ <span class="placeholder">[REASON 3 — e.g., most versatile for daily styling]</span>

Price: <span class="placeholder">$[PRICE PER BUNDLE]</span> — or get our <span class="placeholder">[X BUNDLE SET]</span> for <span class="placeholder">$[SET PRICE]</span>.

→ Order here: <span class="placeholder">[PRODUCT LINK]</span>

Don't forget your discount: <span class="placeholder">[CODE]</span>
2 days left before it expires.

<span class="placeholder">[YOUR NAME]</span>
<span class="placeholder">[BRAND NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-gd"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Email 5 · Day 7</div>
          <div class="tc-title">Last Chance + Personal Note</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-gd">Urgency</span><span class="tc-tag tc-tag-pk">Personal</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('email5',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">Last day for your welcome discount (+ a personal note)</span></div>
          </div>
          <div class="ep-body-area">
            <div id="email5" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

Today's the last day your welcome discount is valid.

Code: <span class="placeholder">[CODE]</span> — expires tonight at midnight.

→ Shop: <span class="placeholder">[LINK]</span>

I also just wanted to say — whether you order today or not, I'm glad you're here. This list isn't a sales funnel. It's a community of women who care about investing in themselves.

If you're not ready right now, that's okay. I'll keep sharing free hair education, honest advice, and early access to drops.

But if you've been thinking about it — don't let a discount code expire just because life got busy. You can grab it in 5 minutes.

Any questions before you decide? Just reply. I'll get back to you personally.

With love,
<span class="placeholder">[YOUR NAME]</span>
<span class="placeholder">[BRAND NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 4: REORDER PROMPTS
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-reorder">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 4 · Repeat Buyers</span>
    <h2 class="panel-title">Reorder Prompt Messages</h2>
    <p class="panel-sub">The 8-week reorder sequence. Set these up in your email/SMS platform to trigger automatically 8 weeks after a customer's last order. SMS gets 98% open rates — use it first.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc</a>
    </div>
  </div>
  <div class="templates-grid">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Reorder #1 · SMS · Week 6 Check-in</div>
          <div class="tc-title">Soft Check-In (No Sell)</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">SMS</span><span class="tc-tag tc-tag-gd">Week 6</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('reorder1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="sms-preview">
          <div class="sms-bubble-wrap">
            <div>
              <div class="sms-bubble" id="reorder1">Hey <span class="placeholder">[FIRST NAME]</span> 👋 It's <span class="placeholder">[YOUR NAME]</span> from <span class="placeholder">[BRAND NAME]</span>! Just checking in — how are you loving your hair? Would love to hear how it's holding up 🤍</div>
              <div class="sms-time">Delivered · Week 6 after purchase</div>
            </div>
          </div>
        </div>
        <div class="tc-tip"><strong>Why no sell yet:</strong> Week 6 is too early for most textures. This message builds goodwill and often generates unsolicited reviews. Replies become testimonials.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Reorder #2 · SMS · Week 8</div>
          <div class="tc-title">The Reorder Prompt</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">SMS</span><span class="tc-tag tc-tag-pk">Week 8</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('reorder2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="sms-preview">
          <div class="sms-bubble-wrap">
            <div>
              <div class="sms-bubble" id="reorder2">Hey <span class="placeholder">[FIRST NAME]</span>! It's been about 2 months — time to start thinking about your next install? 💅 I have <span class="placeholder">[PRODUCT]</span> available right now and a little something special for returning customers: <span class="placeholder">[OFFER/DISCOUNT]</span>. Reply "YES" if you want the details! <span class="placeholder">[BRAND NAME]</span></div>
              <div class="sms-time">Delivered · Week 8 after purchase</div>
            </div>
          </div>
        </div>
        <div class="tc-tip"><strong>Key:</strong> "Reply YES" creates a low-friction entry point. When they reply, move to a real conversation in your DMs or continue via SMS.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Reorder #3 · Email · Week 8</div>
          <div class="tc-title">Reorder Email (Longer Version)</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Email</span><span class="tc-tag tc-tag-lv">Week 8</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('reorder3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">It's been 8 weeks — ready for your next install, <span class="placeholder">[FIRST NAME]</span>?</span></div>
          </div>
          <div class="ep-body-area">
            <div id="reorder3" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

It's been about 8 weeks since your last order from <span class="placeholder">[BRAND NAME]</span> — which means you're probably starting to think about your next install.

Your returning customer discount is active right now:

🏷️ Code: <span class="placeholder">[LOYALTY CODE]</span> — <span class="placeholder">[X%]</span> off your next order
⏰ Valid through: <span class="placeholder">[DATE]</span>

What's available right now:
→ <span class="placeholder">[PRODUCT 1 + LINK]</span>
→ <span class="placeholder">[PRODUCT 2 + LINK]</span>
→ <span class="placeholder">[PRODUCT 3 + LINK]</span>

If you want the same thing you ordered last time, just reply to this email and I'll make it easy for you.

Talk soon,
<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Reorder #4 · SMS · Week 10 (Win-Back)</div>
          <div class="tc-title">No Response Win-Back</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">SMS</span><span class="tc-tag tc-tag-gd">Week 10</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('reorder4',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="sms-preview">
          <div class="sms-bubble-wrap">
            <div>
              <div class="sms-bubble" id="reorder4">Hey <span class="placeholder">[FIRST NAME]</span>, last message from me on this — I don't want to be annoying! 😄 Just wanted to let you know we just got <span class="placeholder">[NEW PRODUCT OR RESTOCK]</span> in. If you ever want to order, you still have your loyalty discount: <span class="placeholder">[CODE]</span>. I'm here whenever you're ready 🖤 — <span class="placeholder">[YOUR NAME]</span></div>
              <div class="sms-time">Delivered · Week 10 (if no response to #2 or #3)</div>
            </div>
          </div>
        </div>
        <div class="tc-tip"><strong>Tone matters here:</strong> The "last message from me" line actually increases response rates because it creates FOMO and shows respect for their inbox.</div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 5: REVIEW REQUEST SEQUENCE
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-reviews">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 4 · Repeat Buyers</span>
    <h2 class="panel-title">Review Request Sequence</h2>
    <p class="panel-sub">3 messages that generate photo reviews on autopilot. Trigger Message 1 automatically 7 days after delivery confirmation in your email platform.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc</a>
    </div>
  </div>
  <div class="templates-grid">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Review #1 · SMS · Day 7 After Delivery</div>
          <div class="tc-title">First Impression Ask</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">SMS</span><span class="tc-tag tc-tag-gd">Day 7</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('review1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="sms-preview">
          <div class="sms-bubble-wrap">
            <div>
              <div class="sms-bubble" id="review1">Hey <span class="placeholder">[FIRST NAME]</span>! 🤍 Your <span class="placeholder">[BRAND NAME]</span> order should have arrived by now — how are you loving it?! If you have a second, would you mind dropping a quick review? Even just a few words helps so much. Here's the link: <span class="placeholder">[REVIEW LINK]</span> 🙏</div>
              <div class="sms-time">Delivered · Day 7 after delivery</div>
            </div>
          </div>
        </div>
        <div class="tc-tip"><strong>Best practice:</strong> Link directly to your Google review page, your Shopify review widget, or your Facebook page — wherever reviews are most visible for new buyers.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Review #2 · Email · Day 14</div>
          <div class="tc-title">Photo Review Request</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Email</span><span class="tc-tag tc-tag-lv">Day 14</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('review2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">Can I feature you? 📸 (takes 2 minutes)</span></div>
          </div>
          <div class="ep-body-area">
            <div id="review2" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

Two weeks in — how's the hair treating you?

I have a small ask: would you be willing to send me a photo of your install? Even a quick selfie works. I'd love to feature you on our Instagram and tag you.

If you're in, just reply to this email with your photo + your IG handle (if you have one) and I'll take care of the rest.

No photo? No worries — a quick written review means just as much:
→ Leave a review here: <span class="placeholder">[REVIEW LINK]</span>

Either way, thank you for trusting <span class="placeholder">[BRAND NAME]</span> with your hair. It genuinely means a lot.

<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
        <div class="tc-tip"><strong>Why this works:</strong> "Can I feature you?" is one of the highest-converting subject lines for review emails because it flips the dynamic — it's not asking for a favor, it's offering one.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Review #3 · SMS · Day 21</div>
          <div class="tc-title">Final Gentle Nudge</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-lv">SMS</span><span class="tc-tag tc-tag-gd">Day 21</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('review3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="sms-preview">
          <div class="sms-bubble-wrap">
            <div>
              <div class="sms-bubble" id="review3">Hi <span class="placeholder">[FIRST NAME]</span>! Quick one — 3 weeks in with your <span class="placeholder">[BRAND NAME]</span> hair 🎉 If you love it, a 5-star review would mean the world to a small brand like ours: <span class="placeholder">[REVIEW LINK]</span> Thanks so much! 🖤 — <span class="placeholder">[YOUR NAME]</span></div>
              <div class="sms-time">Delivered · Day 21 (only if no review yet)</div>
            </div>
          </div>
        </div>
        <div class="tc-tip"><strong>Automation tip:</strong> In your email platform, add a condition so this message only sends if the customer hasn't clicked the review link from Message #1 or #2.</div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 6: 90-DAY CONTENT CALENDAR
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-calendar">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 1 · Instagram + TikTok</span>
    <h2 class="panel-title">90-Day Content Calendar</h2>
    <p class="panel-sub">The 3-post-per-week formula — Education (E), Social Proof (SP), and Offer (O) — mapped across 90 days. Download the PDF or open in Canva to customize with your brand colors.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Full Google Doc Version</a>
      <a href="https://canva.com/design/YOUR_CANVA_ID/view" target="_blank" class="btn-canva">🎨 Open in Canva — Customize</a>
      <a href="#" class="btn-pdf">📥 Download PDF Calendar</a>
    </div>
  </div>

  <!-- MONTH 1 -->
  <div class="calendar-month">
    <div class="cal-month-title">Month 1 — Foundation <span class="cal-month-badge">Days 1–30</span></div>
    <div class="cal-week-header">
      <div class="cal-day-label">Mon</div><div class="cal-day-label">Tue</div><div class="cal-day-label">Wed</div>
      <div class="cal-day-label">Thu</div><div class="cal-day-label">Fri</div><div class="cal-day-label">Sat</div><div class="cal-day-label">Sun</div>
    </div>
    <div class="cal-grid">
      <div class="cal-day post-day post-or"><div class="cal-day-num">1</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Raw vs. Processed Hair</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">4</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Your brand origin story</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">6</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Product launch / intro</div></div>
      <div class="cal-day empty"></div>

      <div class="cal-day post-day post-or"><div class="cal-day-num">8</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">How to tell if hair is raw</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">11</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">First customer review</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">13</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">DM keyword offer</div></div>
      <div class="cal-day empty"></div>

      <div class="cal-day post-day post-or"><div class="cal-day-num">15</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Texture guide carousel</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">18</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Reorder customer post</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">20</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Bundle deal announcement</div></div>
      <div class="cal-day empty"></div>

      <div class="cal-day post-day post-or"><div class="cal-day-num">22</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Raw hair care 101</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">25</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Before/After transformation</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">27</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Stylist wholesale intro</div></div>
      <div class="cal-day empty"></div>

      <div class="cal-day post-day post-or"><div class="cal-day-num">29</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Bundles vs. ready-to-wear</div></div>
      <div class="cal-day empty"></div>
    </div>
  </div>

  <!-- MONTH 2 -->
  <div class="calendar-month">
    <div class="cal-month-title">Month 2 — Build <span class="cal-month-badge">Days 31–60</span></div>
    <div class="cal-week-header">
      <div class="cal-day-label">Mon</div><div class="cal-day-label">Tue</div><div class="cal-day-label">Wed</div>
      <div class="cal-day-label">Thu</div><div class="cal-day-label">Fri</div><div class="cal-day-label">Sat</div><div class="cal-day-label">Sun</div>
    </div>
    <div class="cal-grid">
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">32</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Unboxing reaction video</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">35</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Limited stock alert</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">37</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Why raw hair costs more</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">39</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">DM conversation screenshot</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">42</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">New product showcase</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">44</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Closure vs. frontal guide</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">46</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Long-wear 60-day review</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">49</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Referral program launch</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-gd"><div class="cal-day-num">51</div><div class="cal-post-type post-gd-text">🎉 FLASH</div><div class="cal-post-topic">Flash sale — 48hrs only</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">53</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Milestone post — X orders</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">56</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Bundle + closure deal</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">58</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">How to color raw hair</div></div>
    </div>
  </div>

  <!-- MONTH 3 -->
  <div class="calendar-month">
    <div class="cal-month-title">Month 3 — Scale <span class="cal-month-badge">Days 61–90</span></div>
    <div class="cal-week-header">
      <div class="cal-day-label">Mon</div><div class="cal-day-label">Tue</div><div class="cal-day-label">Wed</div>
      <div class="cal-day-label">Thu</div><div class="cal-day-label">Fri</div><div class="cal-day-label">Sat</div><div class="cal-day-label">Sun</div>
    </div>
    <div class="cal-grid">
      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">63</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Stylist partner feature</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">65</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">New drop announcement</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">67</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Shedding — normal vs. not</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">70</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">UGC repost (tagged photo)</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">72</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Restock alert</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">74</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Spot a fake vendor — 5 signs</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">77</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">90-day wear update</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-gd"><div class="cal-day-num">79</div><div class="cal-post-type post-gd-text">🎉 FLASH</div><div class="cal-post-topic">Flash sale month 3</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">81</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Bundle count by length</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">84</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">Ambassador spotlight</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-lv"><div class="cal-day-num">86</div><div class="cal-post-type post-lv-text">🛒 OFFER</div><div class="cal-post-topic">Month 3 celebration offer</div></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-or"><div class="cal-day-num">88</div><div class="cal-post-type post-or-text">📚 EDU</div><div class="cal-post-topic">Raw hair Q&amp;A recap</div></div>

      <div class="cal-day empty"></div>
      <div class="cal-day empty"></div>
      <div class="cal-day post-day post-pk"><div class="cal-day-num">90</div><div class="cal-post-type post-pk-text">💬 PROOF</div><div class="cal-post-topic">90-day brand recap + thank you</div></div>
    </div>
  </div>

  <div style="background:var(--lv-l);border:1px solid rgba(155,111,191,.2);border-radius:12px;padding:20px 24px;margin-top:12px;">
    <div style="font-family:var(--fh);font-weight:700;font-size:11px;color:var(--lv-d);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">🎨 Want to print or customize this calendar?</div>
    <div style="font-size:14px;color:var(--text-med);line-height:1.65;">Open the Canva template to fill in your specific post topics, change the colors to match your brand, and print a monthly version to keep at your desk. The Google Doc version has every post topic listed with caption starter ideas.</div>
  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 7: FLASH SALE EMAILS
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-flash">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 3 · Email Marketing</span>
    <h2 class="panel-title">Flash Sale Email — 3-Part Sequence</h2>
    <p class="panel-sub">Run this sequence any time you want to drive a revenue spike. Announcement → Reminder → Last Chance. Space them 24 hours apart during a 48–72 hour sale window.</p>
    <div class="panel-actions">
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Open Google Doc</a>
    </div>
  </div>
  <div class="templates-grid single">

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-gd"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Flash Sale Email 1 · Announcement</div>
          <div class="tc-title">The Launch Email — Send at Start of Sale</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-gd">Excitement</span><span class="tc-tag tc-tag-or">Urgency</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('flash1',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">🔥 Flash Sale — <span class="placeholder">[X%]</span> off everything. <span class="placeholder">[X HOURS]</span> only.</span></div>
          </div>
          <div class="ep-body-area">
            <div id="flash1" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

You're getting early access because you're on our list — so here it is before anyone else sees it.

For the next <span class="placeholder">[X HOURS / UNTIL DATE]</span>:

🏷️ <span class="placeholder">[X%]</span> off everything at <span class="placeholder">[BRAND NAME]</span>
Code: <span class="placeholder">[FLASH SALE CODE]</span>
→ Shop now: <span class="placeholder">[LINK]</span>

This isn't a "sale" where we inflated prices first. This is <span class="placeholder">[X%]</span> off our actual everyday prices — the ones you see on the site right now.

Our best sellers during flash sales:
✦ <span class="placeholder">[PRODUCT 1]</span> — <span class="placeholder">$[SALE PRICE]</span> (was <span class="placeholder">$[ORIGINAL]</span>)
✦ <span class="placeholder">[PRODUCT 2]</span> — <span class="placeholder">$[SALE PRICE]</span> (was <span class="placeholder">$[ORIGINAL]</span>)
✦ <span class="placeholder">[PRODUCT 3]</span> — <span class="placeholder">$[SALE PRICE]</span> (was <span class="placeholder">$[ORIGINAL]</span>)

Sale ends <span class="placeholder">[DATE + TIME + TIMEZONE]</span>.

Go now → <span class="placeholder">[LINK]</span>

<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Flash Sale Email 2 · Midpoint Reminder</div>
          <div class="tc-title">The Middle Email — Send Halfway Through</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-or">Social Proof</span><span class="tc-tag tc-tag-pk">Urgency</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('flash2',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val"><span class="placeholder">[X HOURS]</span> left — <span class="placeholder">[POPULAR PRODUCT]</span> is almost gone</span></div>
          </div>
          <div class="ep-body-area">
            <div id="flash2" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

Halfway through the flash sale — and I want to give you a quick update.

<span class="placeholder">[YOUR MOST POPULAR PRODUCT + LENGTH]</span> is down to <span class="placeholder">[X]</span> sets. If that's on your list, now is the time.

What people have been grabbing most:
🔥 <span class="placeholder">[PRODUCT 1]</span> — <span class="placeholder">[X]</span> sold in the last <span class="placeholder">[X]</span> hours
🔥 <span class="placeholder">[PRODUCT 2]</span> — <span class="placeholder">[X]</span> orders so far

You still have until <span class="placeholder">[END TIME]</span> to lock in your order.

Code: <span class="placeholder">[FLASH SALE CODE]</span>
→ Shop: <span class="placeholder">[LINK]</span>

<span class="placeholder">[YOUR NAME]</span></div>
          </div>
        </div>
        <div class="tc-tip"><strong>Key move:</strong> Mention actual numbers (even if estimated) — "47 orders in 12 hours" creates FOMO more effectively than any copywriting technique.</div>
      </div>
    </div>

    <div class="tmpl-card">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="tc-header">
        <div class="tc-header-left">
          <div class="tc-num">Flash Sale Email 3 · Last Chance</div>
          <div class="tc-title">The Closer — Send 2–4 Hours Before End</div>
          <div class="tc-meta"><span class="tc-tag tc-tag-pk">Last Chance</span><span class="tc-tag tc-tag-gd">High Urgency</span></div>
        </div>
        <button class="tc-copy-btn" onclick="copyTemplate('flash3',this)">Copy</button>
      </div>
      <div class="tc-body">
        <div class="email-preview">
          <div class="ep-toolbar"><div class="ep-dot" style="background:#FF5F56;"></div><div class="ep-dot" style="background:#FFBD2E;"></div><div class="ep-dot" style="background:#27C93F;"></div></div>
          <div class="ep-fields">
            <div class="ep-field"><span class="ep-field-label">Subject:</span><span class="ep-field-val">⏰ Last chance — sale ends in <span class="placeholder">[X HOURS]</span></span></div>
          </div>
          <div class="ep-body-area">
            <div id="flash3" class="ep-body">Hey <span class="placeholder">[FIRST NAME]</span>,

This is the last email.

The flash sale ends at <span class="placeholder">[TIME + TIMEZONE]</span> tonight — and then pricing goes back to normal.

I know you've been thinking about it. Here's your sign.

Code: <span class="placeholder">[FLASH SALE CODE]</span>
→ <span class="placeholder">[LINK]</span>

What's still available (as of this email):
✦ <span class="placeholder">[PRODUCT 1]</span> — <span class="placeholder">[X]</span> left
✦ <span class="placeholder">[PRODUCT 2]</span> — <span class="placeholder">[X]</span> left
✦ <span class="placeholder">[PRODUCT 3]</span> — in stock

After tonight, next opportunity won't be for at least <span class="placeholder">[X WEEKS/MONTHS]</span>.

Go now → <span class="placeholder">[LINK]</span>

<span class="placeholder">[YOUR NAME]</span>

P.S. — Questions? Reply to this email. I'll answer within the hour.</div>
          </div>
        </div>
        <div class="tc-tip"><strong>Subject line tip:</strong> "Last chance" emails typically generate 2–3x the revenue of the announcement email. Send it. Even if you feel like you're being too pushy — you're not. Your list opted in to hear from you.</div>
      </div>
    </div>

  </div>
</div>


<!-- ════════════════════════════════════════
     TAB 8: LEAD MAGNET TEMPLATES
════════════════════════════════════════ -->
<div class="tab-panel" id="tab-leadmagnets">
  <div class="panel-header">
    <span class="panel-eyebrow">Module 3 · Email List Growth</span>
    <h2 class="panel-title">3 Lead Magnet Templates</h2>
    <p class="panel-sub">Each lead magnet is designed to collect email addresses by giving something genuinely valuable. Choose 1 to start. Build it in Canva and connect your opt-in form to your website or landing page.</p>
    <div class="panel-actions">
      <a href="https://canva.com" target="_blank" class="btn-canva">🎨 Build in Canva</a>
      <a href="https://docs.google.com/document/d/YOUR_DOC_ID" target="_blank" class="btn-gdoc"><span class="gdoc-icon">📄</span> Google Doc — Full Content</a>
    </div>
  </div>
  <div class="templates-grid" style="gap:24px;">

    <div class="lm-card-tmpl">
      <div class="tc-stripe tc-stripe-or"></div>
      <div class="lmt-header">
        <div style="font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:8px;">Lead Magnet #1 · Most Universal</div>
        <div class="lmt-title">The Raw Hair Buyer's Guide — "Don't Buy a Bundle Until You Read This"</div>
        <div class="lmt-desc">A 1-page PDF guide that educates buyers on exactly what to look for in raw hair — and naturally positions your brand as the trustworthy option. High perceived value, easy to create.</div>
      </div>
      <div class="lmt-body">
        <div class="lmt-section-title">What's in the guide (you write this):</div>
        <div class="lmt-item"><span class="lmt-check">✓</span>The 5 questions to ask any raw hair vendor before buying</div>
        <div class="lmt-item"><span class="lmt-check">✓</span>The wet test — how to verify raw hair at home</div>
        <div class="lmt-item"><span class="lmt-check">✓</span>Red flags that mean the hair isn't actually raw</div>
        <div class="lmt-item"><span class="lmt-check">✓</span>How to calculate how many bundles you need by length</div>
        <div class="lmt-item"><span class="lmt-check">✓</span>A short brand note from you — why [BRAND NAME] meets every standard</div>
        <div class="lmt-section-title">Opt-in page headline:</div>
        <div class="lmt-item"><span class="lmt-check">→</span>"Download our free Raw Hair Buyer's Guide before you spend another dollar on hair"</div>
        <div class="lmt-section-title">Setup steps:</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Create a landing page with a name + email opt-in form</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Tag new subscribers: lead-magnet-buyers-guide</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Automation: Send Email 1 of your Welcome Sequence immediately on signup</div>
        <div class="lmt-canva-note">🎨 <strong>Build this in Canva:</strong> Use an A4 or Letter document. Keep it 1–2 pages. Brand colors: #FA6A27 and #D61465. Include your logo and website URL at the bottom.</div>
      </div>
    </div>

    <div class="lm-card-tmpl">
      <div class="tc-stripe tc-stripe-pk"></div>
      <div class="lmt-header">
        <div style="font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--pk);margin-bottom:8px;">Lead Magnet #2 · Interactive</div>
        <div class="lmt-title">The Hair Match Quiz — "What Raw Hair Texture Is Right for You?"</div>
        <div class="lmt-desc">A 5-question quiz (built in Typeform, Interact, or your website platform) that recommends a texture based on the buyer's lifestyle. Quiz results are emailed — building your list automatically while delivering a personalized experience.</div>
      </div>
      <div class="lmt-body">
        <div class="lmt-section-title">Quiz questions:</div>
        <div class="lmt-item"><span class="lmt-check">Q1</span>How often do you use heat on your hair? (Daily / A few times a week / Rarely / Never)</div>
        <div class="lmt-item"><span class="lmt-check">Q2</span>What's your go-to style? (Straight/Sleek / Natural waves / Big curls / Protective styles)</div>
        <div class="lmt-item"><span class="lmt-check">Q3</span>How much time do you spend on your hair daily? (&lt;5 min / 5–15 min / 15–30 min / 30+ min)</div>
        <div class="lmt-item"><span class="lmt-check">Q4</span>What matters most to you in hair extensions? (Longevity / Versatility / Natural look / Volume)</div>
        <div class="lmt-item"><span class="lmt-check">Q5</span>What's your budget for a full set? (Under $200 / $200–$400 / $400–$600 / $600+)</div>
        <div class="lmt-section-title">Result outcomes + product match:</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Mostly A's → Raw Straight — link to your straight bundles</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Mostly B's → Raw Body Wave — link to body wave</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Mostly C's → Raw Deep Wave — link to deep wave</div>
        <div class="lmt-item"><span class="lmt-check">→</span>Mostly D's → Raw Curly — link to curly textures</div>
        <div class="lmt-canva-note">🎨 <strong>Canva tip:</strong> Design a results card for each outcome (4 Canva pages). Email the matching card + product links when quiz completes. Your email platform or quiz tool handles the logic automatically.</div>
      </div>
    </div>

    <div class="lm-card-tmpl" style="grid-column:1/-1;">
      <div class="tc-stripe tc-stripe-lv"></div>
      <div class="lmt-header">
        <div style="font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--lv-d);margin-bottom:8px;">Lead Magnet #3 · Discount-Based</div>
        <div class="lmt-title">The Welcome Discount — "Get [X]% Off Your First Order"</div>
        <div class="lmt-desc">The simplest and most direct lead magnet. No content to create — just a discount code delivered via email in exchange for signing up. Best for driving immediate conversions from warm traffic (people already on your page or watching your content).</div>
      </div>
      <div class="lmt-body" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <div>
          <div class="lmt-section-title">Opt-in page copy:</div>
          <div class="lmt-item"><span class="lmt-check">Headline:</span>"Join the [BRAND NAME] list and get [X]% off your first order"</div>
          <div class="lmt-item"><span class="lmt-check">Subheadline:</span>"Plus: early access to new drops, exclusive pricing, and free hair care tips from [YOUR NAME]"</div>
          <div class="lmt-item"><span class="lmt-check">Button text:</span>"Send me my discount →"</div>
          <div class="lmt-item"><span class="lmt-check">Disclaimer:</span>"We respect your inbox. No spam, ever. Unsubscribe any time."</div>
        </div>
        <div>
          <div class="lmt-section-title">Automation setup:</div>
          <div class="lmt-item"><span class="lmt-check">1.</span>Form submission → Tag subscriber: welcome-discount</div>
          <div class="lmt-item"><span class="lmt-check">2.</span>Immediately → Send Email 1 (Welcome + discount code)</div>
          <div class="lmt-item"><span class="lmt-check">3.</span>Day 1 → Send Email 2 (Education post + code reminder)</div>
          <div class="lmt-item"><span class="lmt-check">4.</span>Day 3 → Send Email 3 (Social proof + FAQ)</div>
          <div class="lmt-item"><span class="lmt-check">5.</span>Day 5 → Send Email 4 (Best seller feature)</div>
          <div class="lmt-item"><span class="lmt-check">6.</span>Day 7 → Send Email 5 (Last chance for discount)</div>
          <div class="lmt-canva-note">🎨 <strong>Optional:</strong> Create a branded "discount card" in Canva (business card size) to include as an image in Email 1. Makes the discount feel like a real gift, not just a code.</div>
        </div>
      </div>
    </div>

  </div>
</div>

</div><!-- end content-area -->


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `// ── TAB SWITCHING ──
function switchTab(id, btn){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({top:document.querySelector('.tab-nav-wrap').offsetTop-8,behavior:'smooth'});
}

// ── COPY TO CLIPBOARD ──
function copyTemplate(id, btn){
  const el=document.getElementById(id);
  if(!el)return;
  // Get text, strip HTML tags
  const text=el.innerText||el.textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const orig=btn.textContent;
    btn.textContent='✓ Copied!';
    btn.classList.add('copied');
    showToast();
    setTimeout(()=>{btn.textContent=orig;btn.classList.remove('copied');},2500);
  }).catch(()=>{
    // Fallback
    const ta=document.createElement('textarea');
    ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent='✓ Copied!';btn.classList.add('copied');showToast();
    setTimeout(()=>{btn.textContent='Copy';btn.classList.remove('copied');},2500);
  });
}

function showToast(){
  const t=document.getElementById('copy-toast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}` }} />
    </div>
  );
}

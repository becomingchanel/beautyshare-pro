'use client';

import { useEffect } from 'react';

export default function ProductFastTrack() {
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
  --green:#1E6B3C;--green-l:#E6F4ED;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}

/* VIDEO SECTION */
.prod-video{padding:64px 0;background:var(--black);border-top:1px solid rgba(255,255,255,.06);}
.pv-inner{max-width:820px;margin:0 auto;padding:0 28px;}
.pv-ey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--or);display:block;margin-bottom:12px;text-align:center;}
.pv-title{font-family:var(--fh);font-weight:900;font-size:clamp(20px,3vw,30px);color:white;letter-spacing:-.4px;margin-bottom:8px;text-align:center;}
.pv-sub{font-size:13px;color:rgba(255,255,255,.38);text-align:center;margin-bottom:28px;}
.pv-frame{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:14px;border:2px solid rgba(255,255,255,.08);box-shadow:0 8px 48px rgba(0,0,0,.5);}
.pv-frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;}
.pv-ph{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.03);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}
.pv-play{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;color:white;box-shadow:0 8px 32px rgba(0,0,0,.4);}
.pv-ph-lbl{font-family:var(--fh);font-weight:600;font-size:12px;color:rgba(255,255,255,.28);text-align:center;padding:0 32px;}

html{scroll-behavior:smooth;}
body{font-family:var(--fb);color:var(--text);background:var(--white);-webkit-font-smoothing:antialiased;}
.container{max-width:1060px;margin:0 auto;padding:0 28px;}
.container--narrow{max-width:740px;margin:0 auto;padding:0 28px;}
.site-nav{background:var(--black);padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:200;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:17px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-links{display:flex;align-items:center;gap:28px;}
.nav-link{font-family:var(--fh);font-weight:600;font-size:12px;color:rgba(255,255,255,.55);text-decoration:none;letter-spacing:.5px;text-transform:uppercase;transition:color .15s;}
.nav-link:hover{color:white;} .nav-link.active{color:var(--or);}
.nav-cta{background:var(--pk);color:white;font-family:var(--fh);font-weight:700;font-size:12px;padding:8px 18px;border-radius:6px;text-decoration:none;transition:all .18s;}
.nav-cta:hover{filter:brightness(.88);}
.webinar-banner{background:linear-gradient(90deg,var(--or),var(--pk));padding:11px 28px;text-align:center;}
.wb-inner{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;}
.wb-tag{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);border-radius:100px;padding:2px 10px;font-family:var(--fh);font-weight:700;font-size:9px;color:white;letter-spacing:1.5px;text-transform:uppercase;}
.wb-text{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.wb-text s{opacity:.55;font-weight:400;} .wb-text strong{color:#FFE066;}
.wb-btn{background:white;color:var(--pk);font-family:var(--fh);font-weight:800;font-size:11px;padding:6px 14px;border-radius:5px;text-decoration:none;white-space:nowrap;transition:all .18s;}
.wb-btn:hover{background:#FFE066;color:var(--dark);}
.breadcrumb{background:var(--off);border-bottom:1px solid var(--border);padding:10px 28px;}
.bc-inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12px;}
.bc-link{color:var(--text-lt);text-decoration:none;font-family:var(--fh);font-weight:600;}
.bc-link:hover{color:var(--pk);} .bc-sep{color:var(--border);} .bc-current{color:var(--text);font-family:var(--fh);font-weight:600;}

/* HERO */
.hero{background:var(--black);padding:64px 0 0;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 25% 50%,rgba(214,20,101,.10) 0%,transparent 60%),radial-gradient(ellipse 35% 50% at 85% 20%,rgba(250,106,39,.07) 0%,transparent 60%);pointer-events:none;}
.hero-grid{display:grid;grid-template-columns:1fr 420px;gap:60px;align-items:end;}
.hero-left{padding-bottom:56px;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(214,20,101,.15);border:1px solid rgba(214,20,101,.3);border-radius:100px;padding:5px 16px;margin-bottom:22px;font-family:var(--fh);font-weight:700;font-size:10px;color:var(--pk);letter-spacing:2px;text-transform:uppercase;}
.hero-eyebrow::before{content:'';width:6px;height:6px;background:var(--pk);border-radius:50%;animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(30px,4vw,52px);color:white;letter-spacing:-1.2px;line-height:1.08;margin-bottom:18px;}
.hero-title .pk{color:var(--pk);}
.hero-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.75;margin-bottom:28px;max-width:480px;}
.day-track{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:32px;}
.day-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 4px;text-align:center;}
.day-box.active{background:rgba(214,20,101,.2);border-color:rgba(214,20,101,.5);}
.day-box.win{background:var(--pk);border-color:var(--pk);}
.day-num{font-family:var(--fh);font-weight:900;font-size:15px;color:rgba(255,255,255,.35);line-height:1;}
.day-box.active .day-num,.day-box.win .day-num{color:white;}
.day-lbl{font-size:9px;color:rgba(255,255,255,.25);margin-top:3px;text-transform:uppercase;letter-spacing:.5px;}
.day-box.active .day-lbl{color:rgba(255,255,255,.65);} .day-box.win .day-lbl{color:white;}
.hero-price-row{display:flex;align-items:baseline;gap:12px;margin-bottom:8px;}
.hero-price{font-family:var(--fh);font-weight:900;font-size:48px;color:var(--pk);line-height:1;}
.hero-price-note{font-size:13px;color:rgba(255,255,255,.4);}
.hero-cta{display:inline-flex;align-items:center;gap:10px;background:var(--pk);color:white;font-family:var(--fh);font-weight:800;font-size:16px;padding:18px 38px;border-radius:10px;text-decoration:none;box-shadow:0 6px 28px rgba(214,20,101,.45);transition:all .2s;}
.hero-cta:hover{filter:brightness(.88);transform:translateY(-2px);}
.hero-trust{display:flex;align-items:center;gap:6px;margin-top:14px;font-size:12px;color:rgba(255,255,255,.35);}
.hero-right{align-self:flex-end;}
.hero-card-main{background:white;border-radius:16px 16px 0 0;padding:32px;box-shadow:0 -8px 40px rgba(0,0,0,.3);}
.hcm-label{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--pk);margin-bottom:14px;}
.hcm-title{font-family:var(--fh);font-weight:900;font-size:19px;color:var(--text);margin-bottom:18px;line-height:1.3;}
.hcm-items{list-style:none;}
.hcm-item{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:13.5px;color:var(--text-med);line-height:1.4;}
.hcm-item:last-child{border-bottom:none;}
.hcm-check{color:var(--pk);font-weight:900;font-size:13px;flex-shrink:0;margin-top:2px;}

/* STATS */
.stats-strip{background:var(--pk);padding:20px 0;}
.stats-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;}
.stat{padding:8px 36px;text-align:center;border-right:1px solid rgba(255,255,255,.25);}
.stat:last-child{border-right:none;}
.stat-num{font-family:var(--fh);font-weight:900;font-size:24px;color:white;line-height:1;}
.stat-lbl{font-size:11px;color:rgba(255,255,255,.75);margin-top:3px;}

/* SECTIONS */
.section{padding:80px 0;} .section-dark{background:var(--dark);padding:80px 0;} .section-off{background:var(--off);padding:80px 0;}
.eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--pk);display:block;margin-bottom:12px;}
.section-title{font-family:var(--fh);font-weight:900;font-size:clamp(26px,3.5vw,40px);color:var(--text);letter-spacing:-.6px;line-height:1.15;margin-bottom:14px;}
.section-title-white{color:white;} .section-sub{font-size:16px;color:var(--text-med);line-height:1.75;max-width:600px;} .section-sub-white{color:rgba(255,255,255,.6);}

/* TIMELINE */
.timeline{margin-top:52px;position:relative;}
.timeline::before{content:'';position:absolute;left:27px;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--pk),var(--or));border-radius:2px;}
.tl-item{display:flex;gap:24px;margin-bottom:24px;}
.tl-dot{width:54px;height:54px;border-radius:50%;flex-shrink:0;background:var(--pk);display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:900;font-size:13px;color:white;position:relative;z-index:1;box-shadow:0 4px 16px rgba(214,20,101,.35);}
.tl-dot.or{background:var(--or);box-shadow:0 4px 16px rgba(250,106,39,.35);}
.tl-dot.win{background:linear-gradient(135deg,var(--pk),var(--or));}
.tl-content{background:white;border-radius:14px;padding:20px 24px;flex:1;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);}
.tl-day{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--text-lt);margin-bottom:4px;}
.tl-title{font-family:var(--fh);font-weight:800;font-size:16px;color:var(--text);margin-bottom:6px;}
.tl-desc{font-size:13.5px;color:var(--text-med);line-height:1.65;}
.tl-badge{display:inline-block;background:var(--pk-l);color:var(--pk);font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-top:8px;}

/* INCLUDES */
.includes-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:44px;}
.include-card{background:white;border-radius:14px;padding:22px 24px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);display:flex;gap:14px;align-items:flex-start;transition:box-shadow .2s,transform .2s;}
.include-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.09);transform:translateY(-2px);}
.ic-icon{font-size:28px;flex-shrink:0;}
.ic-title{font-family:var(--fh);font-weight:800;font-size:14px;color:var(--text);margin-bottom:5px;line-height:1.3;}
.ic-desc{font-size:13px;color:var(--text-med);line-height:1.55;}

/* FOR */
.for-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px;}
.for-card{border-radius:16px;padding:28px;}
.for-yes{background:var(--green-l);border:1.5px solid rgba(30,107,60,.2);}
.for-no{background:var(--pk-l);border:1.5px solid rgba(214,20,101,.12);}
.for-label{font-family:var(--fh);font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px;}
.for-yes .for-label{color:var(--green);} .for-no .for-label{color:var(--pk);}
.for-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-med);margin-bottom:12px;line-height:1.5;}
.for-item:last-child{margin-bottom:0;}

/* TESTI */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
.testi-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;transition:border-color .2s;}
.testi-card:hover{border-color:rgba(214,20,101,.3);}
.testi-stars{color:var(--pk);font-size:14px;margin-bottom:12px;letter-spacing:2px;}
.testi-quote{font-size:14px;color:rgba(255,255,255,.7);line-height:1.72;margin-bottom:18px;font-style:italic;}
.testi-author{display:flex;align-items:center;gap:10px;}
.testi-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--pk),var(--or));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:13px;color:white;flex-shrink:0;}
.testi-name{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.testi-loc{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;}

/* FAQ */
.faq-list{margin-top:48px;}
.faq-item{border-bottom:1px solid var(--border);}
.faq-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:20px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;font-family:var(--fh);font-weight:700;font-size:15px;color:var(--text);line-height:1.4;transition:color .15s;}
.faq-q:hover{color:var(--pk);}
.faq-icon{font-size:20px;color:var(--pk);flex-shrink:0;transition:transform .25s;line-height:1;}
.faq-item.open .faq-icon{transform:rotate(45deg);}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.faq-a-inner{padding-bottom:20px;font-size:14.5px;color:var(--text-med);line-height:1.8;}
.faq-item.open .faq-a{max-height:400px;}

/* PRICING */
.pricing-section{padding:80px 0;background:var(--off);}
.pricing-box{background:white;border-radius:20px;border:2px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.12);overflow:hidden;max-width:600px;margin:0 auto;}
.pb-top-stripe{height:5px;background:linear-gradient(90deg,var(--pk),var(--or),var(--lv-d));}
.pb-body{padding:40px;}
.pb-eyebrow{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--pk);margin-bottom:8px;}
.pb-title{font-family:var(--fh);font-weight:900;font-size:26px;color:var(--text);margin-bottom:6px;line-height:1.2;}
.pb-subtitle{font-size:14px;color:var(--text-lt);margin-bottom:28px;line-height:1.6;}
.pb-price-block{background:var(--pk-l);border-radius:12px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;}
.pb-price{font-family:var(--fh);font-weight:900;font-size:56px;color:var(--pk);line-height:1;}
.pb-price-right{text-align:right;}
.pb-price-old{font-size:15px;color:var(--text-lt);text-decoration:line-through;font-family:var(--fh);font-weight:600;}
.pb-price-note{font-size:12px;color:var(--text-lt);margin-top:3px;}
.pb-save-badge{display:inline-flex;align-items:center;background:var(--green-l);border:1px solid rgba(30,107,60,.2);color:var(--green);font-family:var(--fh);font-weight:700;font-size:12px;padding:4px 12px;border-radius:20px;margin-top:6px;}
.pb-includes{list-style:none;margin-bottom:28px;}
.pb-include{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text-med);line-height:1.4;}
.pb-include:last-child{border-bottom:none;}
.pb-include-icon{color:var(--green);font-weight:900;font-size:14px;flex-shrink:0;margin-top:1px;}
.pb-btn{display:block;width:100%;padding:20px;text-align:center;background:var(--pk);color:white;font-family:var(--fh);font-weight:800;font-size:17px;border:none;border-radius:10px;cursor:pointer;text-decoration:none;box-shadow:0 6px 24px rgba(214,20,101,.35);transition:all .2s;margin-bottom:14px;}
.pb-btn:hover{filter:brightness(.88);transform:translateY(-2px);}
.pb-trust-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:18px;}
.pb-trust-item{font-size:12px;color:var(--text-lt);}
.webinar-cta{background:linear-gradient(135deg,var(--or),var(--pk));border-radius:16px;padding:32px;margin-top:20px;text-align:center;max-width:600px;margin-left:auto;margin-right:auto;margin-top:20px;}
.wc-label{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:8px;}
.wc-text{font-family:var(--fh);font-weight:800;font-size:18px;color:white;margin-bottom:6px;line-height:1.3;}
.wc-sub{font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;}
.wc-btn{display:inline-flex;align-items:center;gap:8px;background:white;color:var(--pk);font-family:var(--fh);font-weight:800;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;transition:all .18s;}
.wc-btn:hover{background:#FFE066;color:var(--dark);}
.footer{background:var(--black);padding:40px 28px;}
.footer-inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;}
.footer-logo span{color:var(--or);}
.footer-links{display:flex;gap:20px;flex-wrap:wrap;}
.footer-link{font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;}
.footer-link:hover{color:rgba(255,255,255,.7);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.2);width:100%;}

@media(max-width:860px){.hero-grid{grid-template-columns:1fr;}.hero-right{display:none;}.for-grid,.includes-grid{grid-template-columns:1fr;}.testi-grid{grid-template-columns:1fr 1fr;}.stat{padding:8px 20px;}}
@media(max-width:560px){.testi-grid{grid-template-columns:1fr;}.nav-links{display:none;}.pb-body{padding:28px 22px;}.pb-price-block{flex-direction:column;gap:12px;text-align:center;}.pb-price-right{text-align:center;}.timeline::before{left:21px;}.tl-dot{width:42px;height:42px;font-size:11px;}}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `
<nav class="site-nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <div class="nav-links">
    <a href="#" class="nav-link">Home</a><a href="#" class="nav-link">About BSP</a>
    <a href="#" class="nav-link active">Education</a><a href="#" class="nav-link">Contact</a>
  </div>
  <a href="#pricing" class="nav-cta">Get This Now →</a>
</nav>
<div class="webinar-banner">
  <div class="wb-inner">
    <span class="wb-tag">🎓 Webinar Special</span>
    <span class="wb-text">Attending our free webinar? Get this for <strong>$67</strong> — normally <s>$97</s></span>
    <a href="#" class="wb-btn">Register Free →</a>
  </div>
</div>
<div class="breadcrumb"><div class="bc-inner"><a href="#" class="bc-link">Home</a><span class="bc-sep">/</span><a href="#" class="bc-link">Education</a><span class="bc-sep">/</span><span class="bc-current">First $1K Fast Track</span></div></div>

<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-left">
        <div class="hero-eyebrow">7-day action workbook</div>
        <h1 class="hero-title">Make Your First <span class="pk">$1,000</span> in 7 Days — or Know Exactly Why Not.</h1>
        <p class="hero-sub">Every single action mapped out from Day 1 to first sale. No gap between motivation and execution. No more "I don't know what to do today."</p>
        <div class="day-track">
          <div class="day-box active"><div class="day-num">1</div><div class="day-lbl">Setup</div></div>
          <div class="day-box active"><div class="day-num">2</div><div class="day-lbl">Reach</div></div>
          <div class="day-box active"><div class="day-num">3</div><div class="day-lbl">DMs</div></div>
          <div class="day-box active"><div class="day-num">4</div><div class="day-lbl">Post</div></div>
          <div class="day-box active"><div class="day-num">5</div><div class="day-lbl">Follow</div></div>
          <div class="day-box active"><div class="day-num">6</div><div class="day-lbl">Close</div></div>
          <div class="day-box win"><div class="day-num">💰</div><div class="day-lbl">Sale</div></div>
        </div>
        <div class="hero-price-row"><div class="hero-price">$97</div><div class="hero-price-note">One-time · Instant PDF delivery</div></div>
        <a href="#pricing" class="hero-cta">Get Instant Access — $97 →</a>
        <div class="hero-trust">🔒 Secure checkout &nbsp;·&nbsp; Instant delivery &nbsp;·&nbsp; 14-day money-back guarantee</div>
      </div>
      <div class="hero-right">
        <div class="hero-card-main">
          <div class="hcm-label">First $1K Fast Track · What's Inside</div>
          <div class="hcm-title">Your complete 7-day workbook</div>
          <ul class="hcm-items">
            <li class="hcm-item"><span class="hcm-check">✓</span>7-day launch action plan (fillable PDF)</li>
            <li class="hcm-item"><span class="hcm-check">✓</span>20 warm market DM scripts + follow-ups</li>
            <li class="hcm-item"><span class="hcm-check">✓</span>Pricing formula — how to set your first prices</li>
            <li class="hcm-item"><span class="hcm-check">✓</span>7-day content calendar with caption starters</li>
            <li class="hcm-item"><span class="hcm-check">✓</span>First sale checklist — 10 actions in 72 hours</li>
            <li class="hcm-item"><span class="hcm-check">✓</span>Instant PDF delivery to your inbox</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="stats-strip"><div class="stats-inner">
  <div class="stat"><div class="stat-num">7</div><div class="stat-lbl">Days to first sale</div></div>
  <div class="stat"><div class="stat-num">20</div><div class="stat-lbl">DM scripts included</div></div>
  <div class="stat"><div class="stat-num">10</div><div class="stat-lbl">Actions in 72 hrs</div></div>
  <div class="stat"><div class="stat-num">$97</div><div class="stat-lbl">One-time · No subscription</div></div>
</div></div>

<!-- PRODUCT VIDEO SECTION -->
<section class="prod-video">
  <div class="pv-inner">
    <span class="pv-ey">Watch This First</span>
    <h2 class="pv-title">See exactly what the Fast Track covers</h2>
    <p class="pv-sub">To activate: replace the placeholder below with your YouTube embed iframe</p>
    <div class="pv-frame">
      <!--
        ACTIVATE: Delete the pv-ph div and replace with:
        <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="See exactly what the Fast Track covers" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      -->
      <div class="pv-ph">
        <div class="pv-play" style="background:#D61465;">▶</div>
        <div class="pv-ph-lbl">Add your YouTube video ID here — see the comment in the source code</div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container--narrow">
    <span class="eyebrow">Day by day</span>
    <h2 class="section-title">What you do every single day for 7 days</h2>
    <p class="section-sub">No vague advice. No "post consistently." Exact actions, in exact order, on exact days. Everything is written — you execute.</p>
    <div class="timeline">
      <div class="tl-item"><div class="tl-dot">D1</div><div class="tl-content"><div class="tl-day">Day 1</div><div class="tl-title">Lock in your setup + build your warm market list</div><div class="tl-desc">Confirm your store is ready to accept orders. Write your warm market list — the 50 people who already know, like, and trust you. These are your first buyers.</div></div></div>
      <div class="tl-item"><div class="tl-dot">D2</div><div class="tl-content"><div class="tl-day">Day 2</div><div class="tl-title">Make your first 10 announcements</div><div class="tl-desc">Send the warm market DM script to your first 10 contacts. Post your store announcement on social. The scripts are written — copy, personalize, and send.</div></div></div>
      <div class="tl-item"><div class="tl-dot">D3</div><div class="tl-content"><div class="tl-day">Day 3</div><div class="tl-title">Follow up + expand your reach</div><div class="tl-desc">Follow up with anyone who opened but didn't respond. Send to the next 10 contacts. Post Day 2 content from your content calendar.</div></div></div>
      <div class="tl-item"><div class="tl-dot">D4</div><div class="tl-content"><div class="tl-day">Day 4</div><div class="tl-title">Post social proof + handle objections</div><div class="tl-desc">Post your first social proof content. Use the objection scripts for anyone who says "I'll think about it." This is where most sales are actually won.</div></div></div>
      <div class="tl-item"><div class="tl-dot">D5</div><div class="tl-content"><div class="tl-day">Day 5</div><div class="tl-title">Reach cold contacts + expand your network</div><div class="tl-desc">Send outreach to the second ring — people who don't know you as well. Use the cold DM script and post Day 4 content.</div></div></div>
      <div class="tl-item"><div class="tl-dot or">D6</div><div class="tl-content"><div class="tl-day">Day 6</div><div class="tl-title">Create urgency + close open conversations</div><div class="tl-desc">Go back to everyone who expressed interest. Use the urgency close script. This is the day most Fast Track members get their first order.</div><div class="tl-badge">Most first sales happen Day 6</div></div></div>
      <div class="tl-item"><div class="tl-dot win">💰</div><div class="tl-content"><div class="tl-day">Day 7</div><div class="tl-title">Count, review, and plan Week 2</div><div class="tl-desc">Count your sales. Identify what worked. Set up Week 2. If you haven't sold yet — the Fast Track shows you exactly what to diagnose and fix.</div><div class="tl-badge">Your first $1K checkpoint</div></div></div>
    </div>
  </div>
</section>

<section class="section-off">
  <div class="container">
    <span class="eyebrow">What's included</span>
    <h2 class="section-title">Six tools in one workbook</h2>
    <p class="section-sub">Every tool built specifically for your BSP launch — all written for the raw hair dropship context.</p>
    <div class="includes-grid">
      <div class="include-card"><div class="ic-icon">📋</div><div><div class="ic-title">7-Day Launch Action Plan (Fillable PDF)</div><div class="ic-desc">Day-by-day workbook with 3–5 specific actions per day. No guessing. No winging it. Fill in and execute.</div></div></div>
      <div class="include-card"><div class="ic-icon">💬</div><div><div class="ic-title">20 Warm Market DM Scripts + Follow-Ups</div><div class="ic-desc">Opening messages, follow-ups, objection handlers, and close scripts — all written for BSP. Personalize and send.</div></div></div>
      <div class="include-card"><div class="ic-icon">💰</div><div><div class="ic-title">Pricing Formula</div><div class="ic-desc">Set your first prices using real BSP product costs. Bundle pricing, compete on value (not price), profit-per-order calculator.</div></div></div>
      <div class="include-card"><div class="ic-icon">📅</div><div><div class="ic-title">7-Day Content Calendar with Caption Starters</div><div class="ic-desc">What to post each day — exact topic and a caption starter. Post from your phone in under 10 minutes per day.</div></div></div>
      <div class="include-card"><div class="ic-icon">✅</div><div><div class="ic-title">First Sale Checklist — 10 Actions in 72 Hours</div><div class="ic-desc">If you're on Day 3 and haven't sold yet — this diagnostic checklist shows you the exact 10 things to check and fix.</div></div></div>
      <div class="include-card"><div class="ic-icon">📬</div><div><div class="ic-title">Instant PDF Delivery</div><div class="ic-desc">In your inbox the moment you purchase. Start Day 1 today — even if it's 11pm.</div></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <span class="eyebrow">Is this for you?</span>
    <h2 class="section-title">Who the Fast Track is built for</h2>
    <div class="for-grid">
      <div class="for-card for-yes">
        <div class="for-label">✅ This is for you if...</div>
        <div class="for-item"><span>✅</span>You're a BSP member who hasn't made your first sale yet</div>
        <div class="for-item"><span>✅</span>You know what BSP is but don't know what to actually do today</div>
        <div class="for-item"><span>✅</span>You want a workbook you fill in — not a video you watch and forget</div>
        <div class="for-item"><span>✅</span>You're ready to spend 1–2 hours per day for 7 days to get your first sale</div>
        <div class="for-item"><span>✅</span>You want your first sale this week — not "someday"</div>
      </div>
      <div class="for-card for-no">
        <div class="for-label">❌ Not for you if...</div>
        <div class="for-item"><span>❌</span>You're already consistently making BSP sales</div>
        <div class="for-item"><span>❌</span>You want a long-term marketing system (see the Marketing Playbook)</div>
        <div class="for-item"><span>❌</span>You're not willing to actually send the DMs and post the content</div>
        <div class="for-item"><span>❌</span>You want passive income that requires no execution from you</div>
      </div>
    </div>
  </div>
</section>

<section class="section-dark">
  <div class="container">
    <span class="eyebrow">Real results</span>
    <h2 class="section-title section-title-white">BSP members who used the Fast Track</h2>
    <p class="section-sub section-sub-white">Placeholder testimonials — replace with actual customer results when you collect them.</p>
    <div class="testi-grid">
      <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-quote">I followed it exactly. Day 6 I sent the urgency script and got two orders the same night. Made $340 in one evening from people I already knew.</div><div class="testi-author"><div class="testi-avatar">JW</div><div><div class="testi-name">Jasmine W.</div><div class="testi-loc">BSP Member · Memphis, TN</div></div></div></div>
      <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-quote">The DM scripts made outreach feel natural. I was scared to reach out to people but the scripts removed that fear. Had 3 sales by Day 5.</div><div class="testi-author"><div class="testi-avatar">RM</div><div><div class="testi-name">Reneé M.</div><div class="testi-loc">BSP Member · Charlotte, NC</div></div></div></div>
      <div class="testi-card"><div class="testi-stars">★★★★★</div><div class="testi-quote">I was stuck for 3 weeks. Within 7 days of following the workbook I had my first sale. The pricing formula alone changed everything for me.</div><div class="testi-author"><div class="testi-avatar">AP</div><div><div class="testi-name">Alicia P.</div><div class="testi-loc">BSP Member · Miami, FL</div></div></div></div>
    </div>
  </div>
</section>

<section class="pricing-section" id="pricing">
  <div class="container--narrow">
    <div style="text-align:center;margin-bottom:40px;">
      <span class="eyebrow" style="display:block;">Get your copy</span>
      <h2 class="section-title">Start Day 1 today.</h2>
      <p class="section-sub" style="margin:0 auto;">Delivered instantly to your inbox. Start the 7-day plan the moment you finish checkout.</p>
    </div>
    <div class="pricing-box">
      <div class="pb-top-stripe"></div>
      <div class="pb-body">
        <div class="pb-eyebrow">First $1K Fast Track</div>
        <div class="pb-title">The 7-Day Launch Workbook</div>
        <div class="pb-subtitle">Everything you need to make your first BSP sale within 7 days.</div>
        <div class="pb-price-block">
          <div class="pb-price">$97</div>
          <div class="pb-price-right">
            <div class="pb-price-old">$197 value</div>
            <div class="pb-price-note">One-time · Instant PDF delivery</div>
            <div class="pb-save-badge">✓ Instant access · No subscription</div>
          </div>
        </div>
        <ul class="pb-includes">
          <li class="pb-include"><span class="pb-include-icon">✓</span>7-day launch action plan (fillable PDF)</li>
          <li class="pb-include"><span class="pb-include-icon">✓</span>20 warm market DM scripts + follow-ups</li>
          <li class="pb-include"><span class="pb-include-icon">✓</span>BSP pricing formula</li>
          <li class="pb-include"><span class="pb-include-icon">✓</span>7-day social media content calendar with caption starters</li>
          <li class="pb-include"><span class="pb-include-icon">✓</span>First sale checklist — 10 actions in 72 hours</li>
          <li class="pb-include"><span class="pb-include-icon">✓</span>Instant PDF delivery</li>
        </ul>
        <a href="#" class="pb-btn">Get Instant Access — $97 →</a>
        <div class="pb-trust-row">
          <span class="pb-trust-item">🔒 Secure checkout</span>
          <span class="pb-trust-item">📧 Instant delivery</span>
          <span class="pb-trust-item">↩️ 14-day guarantee</span>
        </div>
      </div>
    </div>
    <div class="webinar-cta">
      <div class="wc-label">🎓 Better deal available</div>
      <div class="wc-text">Attend the free webinar — get this for $67 instead of $97</div>
      <div class="wc-sub">Register for our free webinar and unlock webinar-only pricing on every BSP Education product.</div>
      <a href="#" class="wc-btn">Register for the Free Webinar →</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container--narrow">
    <span class="eyebrow">Questions</span>
    <h2 class="section-title">Frequently asked</h2>
    <div class="faq-list">
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">Do I need a BSP store set up before buying this? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Yes — the Fast Track assumes you have an active BSP store. Day 1 starts with confirming your store is ready to accept orders. If you haven't joined BSP yet, check out the Raw Hair Business Blueprint first.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">What if I don't make a sale in 7 days? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">The Fast Track includes a diagnostic section specifically for this — it walks you through what to check and adjust. Most people who don't sell in 7 days have one of three fixable problems, and the workbook covers all of them. You're also protected by our 14-day money-back guarantee.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">How much time does this require each day? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Plan for 1–2 hours per day. Days 2, 3, and 6 take the most time. Days 1, 4, and 5 are closer to 45 minutes. The actions are specific so you won't waste time deciding what to do.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">Can I get this cheaper by attending the webinar? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Yes — webinar attendees get the Fast Track for $67 instead of $97. Register for our free webinar using the link in the banner at the top of the page to unlock that pricing.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">What's your refund policy? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">14-day money-back guarantee. Go through the workbook, execute the steps, and if you genuinely feel it wasn't worth it — email us within 14 days for a full refund. No questions asked.</div></div></div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">Beauty<span>Share</span> Pro</div>
    <div class="footer-links"><a href="#" class="footer-link">Privacy Policy</a><a href="#" class="footer-link">Terms of Service</a><a href="#" class="footer-link">Refund Policy</a><a href="#" class="footer-link">Contact</a></div>
    <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
  </div>
</footer>

` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `function toggleFaq(btn){const item=btn.closest('.faq-item');const isOpen=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(el=>el.classList.remove('open'));if(!isOpen)item.classList.add('open');}` }} />
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export default function ProductBlueprint() {
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
  --green:#E2AD37;--green-l:#FEF9E7;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
html{scroll-behavior:smooth;}
body{font-family:var(--fb);color:var(--text);background:var(--white);-webkit-font-smoothing:antialiased;}
.container{max-width:1060px;margin:0 auto;padding:0 28px;}
.container--narrow{max-width:740px;margin:0 auto;padding:0 28px;}

/* NAV */
.site-nav{background:var(--black);padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:200;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:17px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-links{display:flex;align-items:center;gap:28px;}
.nav-link{font-family:var(--fh);font-weight:600;font-size:12px;color:rgba(255,255,255,.55);text-decoration:none;letter-spacing:.5px;text-transform:uppercase;transition:color .15s;}
.nav-link:hover{color:white;} .nav-link.active{color:var(--or);}
.nav-cta{background:var(--or);color:white;font-family:var(--fh);font-weight:700;font-size:12px;padding:8px 18px;border-radius:6px;text-decoration:none;}
.nav-cta:hover{background:var(--or-d);}

/* FREE BANNER */
.free-banner{background:linear-gradient(90deg,var(--or),var(--pk));padding:11px 28px;text-align:center;}
.fb-inner{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;}
.fb-tag{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);border-radius:100px;padding:2px 10px;font-family:var(--fh);font-weight:700;font-size:9px;color:white;letter-spacing:1.5px;text-transform:uppercase;}
.fb-text{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.fb-text strong{color:#FFE066;}
.fb-btn{background:white;color:var(--or-d);font-family:var(--fh);font-weight:800;font-size:11px;padding:6px 14px;border-radius:5px;text-decoration:none;white-space:nowrap;transition:all .18s;}
.fb-btn:hover{background:#FFE066;color:var(--dark);}

/* BREADCRUMB */
.breadcrumb{background:var(--off);border-bottom:1px solid var(--border);padding:10px 28px;}
.bc-inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12px;}
.bc-link{color:var(--text-lt);text-decoration:none;font-family:var(--fh);font-weight:600;}
.bc-link:hover{color:var(--or);} .bc-sep{color:var(--border);} .bc-current{color:var(--text);font-family:var(--fh);font-weight:600;}

/* HERO */
.hero{background:var(--black);padding:64px 0 0;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 20% 50%,rgba(250,106,39,.09) 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 90% 20%,rgba(250,106,39,.06) 0%,transparent 60%);pointer-events:none;}
.hero-grid{display:grid;grid-template-columns:1fr 340px;gap:60px;align-items:center;padding-bottom:56px;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(250,106,39,.15);border:1px solid rgba(250,106,39,.3);border-radius:100px;padding:5px 16px;margin-bottom:20px;font-family:var(--fh);font-weight:700;font-size:10px;color:var(--or);letter-spacing:2px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(28px,4vw,50px);color:white;letter-spacing:-1.2px;line-height:1.08;margin-bottom:16px;}
.hero-title .or{color:var(--or);}
.hero-sub{font-size:16px;color:rgba(255,255,255,.6);line-height:1.75;margin-bottom:24px;max-width:480px;}
.hero-author{display:flex;align-items:center;gap:12px;margin-bottom:28px;padding:12px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;max-width:400px;}
.hero-author-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--or),var(--pk));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:900;font-size:15px;color:white;flex-shrink:0;}
.hero-author-name{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.hero-author-title{font-size:11px;color:rgba(255,255,255,.45);margin-top:2px;}
.hero-feats{display:flex;flex-direction:column;gap:9px;margin-bottom:32px;}
.hf{display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(255,255,255,.75);}
.hf-dot{width:20px;height:20px;border-radius:50%;background:var(--or);display:flex;align-items:center;justify-content:center;font-size:10px;color:white;font-weight:900;flex-shrink:0;}
.hero-dl-btn{display:inline-flex;align-items:center;gap:10px;background:var(--or);color:white;font-family:var(--fh);font-weight:800;font-size:16px;padding:18px 36px;border-radius:10px;border:none;cursor:pointer;box-shadow:0 6px 28px rgba(250,106,39,.4);transition:all .2s;}
.hero-dl-btn:hover{background:var(--or-d);transform:translateY(-2px);}
.hero-trust{font-size:12px;color:rgba(255,255,255,.35);margin-top:12px;}

/* PDF MOCKUP */
.pdf-mockup-wrap{position:relative;}
.pdf-free-badge{position:absolute;top:-14px;right:-14px;z-index:10;width:66px;height:66px;background:var(--or);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(250,106,39,.4);border:2px solid rgba(255,255,255,.2);}
.pdf-free-badge .f1{font-family:var(--fh);font-weight:900;font-size:14px;color:white;line-height:1;}
.pdf-free-badge .f2{font-size:8px;color:rgba(255,255,255,.8);letter-spacing:.5px;}
.pdf-cover{background:linear-gradient(150deg,#1C0A02 0%,#2E1408 50%,#1A0A00 100%);border-radius:3px 12px 12px 3px;padding:32px 24px;aspect-ratio:8.5/11;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;box-shadow:-6px 12px 36px rgba(0,0,0,.7),2px 0 0 rgba(250,106,39,.15);border:1px solid rgba(250,106,39,.15);}
.pdf-cover::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--or),var(--pk));}
.pdf-cover::after{content:'';position:absolute;top:0;left:0;bottom:0;width:10px;background:linear-gradient(90deg,rgba(0,0,0,.45),transparent);}
.pdf-spine-shadow{position:absolute;left:10px;top:0;bottom:0;width:1px;background:rgba(250,106,39,.1);}
.pdf-tag{font-family:var(--fh);font-weight:700;font-size:7px;letter-spacing:3px;text-transform:uppercase;color:rgba(250,106,39,.6);margin-bottom:12px;}
.pdf-title{font-family:var(--fh);font-weight:900;font-size:24px;color:white;line-height:1.1;letter-spacing:-.3px;margin-bottom:6px;}
.pdf-title .or{color:var(--or);}
.pdf-tagline{font-size:9.5px;color:rgba(255,255,255,.45);line-height:1.55;margin-bottom:0;}
.pdf-divider{width:36px;height:2px;background:var(--or);margin:14px 0;}
.pdf-parts{display:flex;flex-direction:column;gap:4px;}
.pdf-part{font-size:9px;color:rgba(255,255,255,.38);font-family:var(--fh);font-weight:600;display:flex;align-items:center;gap:5px;}
.pdf-part::before{content:'';width:3px;height:3px;border-radius:50%;background:rgba(250,106,39,.6);flex-shrink:0;}
.pdf-footer{display:flex;align-items:center;justify-content:space-between;margin-top:14px;}
.pdf-brand{font-family:var(--fh);font-weight:800;font-size:10px;color:rgba(255,255,255,.5);}
.pdf-brand span{color:var(--or);}
.pdf-handle{font-size:8px;color:rgba(255,255,255,.25);}

/* STATS */
.stats-strip{background:var(--or);padding:20px 0;}
.stats-inner{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;}
.stat{padding:8px 36px;text-align:center;border-right:1px solid rgba(255,255,255,.25);}
.stat:last-child{border-right:none;}
.stat-num{font-family:var(--fh);font-weight:900;font-size:24px;color:white;line-height:1;}
.stat-lbl{font-size:11px;color:rgba(255,255,255,.75);margin-top:3px;}

/* VIDEO */
.video-section{padding:72px 0;background:var(--black);border-top:1px solid rgba(255,255,255,.06);}
.vs-inner{max-width:820px;margin:0 auto;padding:0 28px;}
.vs-ey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--or);display:block;margin-bottom:12px;text-align:center;}
.vs-title{font-family:var(--fh);font-weight:900;font-size:clamp(20px,3vw,30px);color:white;letter-spacing:-.4px;margin-bottom:8px;text-align:center;}
.vs-sub{font-size:13px;color:rgba(255,255,255,.38);text-align:center;margin-bottom:28px;}
.vs-frame{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:14px;border:2px solid rgba(250,106,39,.2);box-shadow:0 8px 48px rgba(0,0,0,.5);}
.vs-frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;}
.vs-ph{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.03);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}
.vs-play{width:72px;height:72px;border-radius:50%;background:var(--or);display:flex;align-items:center;justify-content:center;font-size:26px;color:white;box-shadow:0 8px 32px rgba(250,106,39,.5);}
.vs-ph-lbl{font-family:var(--fh);font-weight:600;font-size:12px;color:rgba(255,255,255,.3);text-align:center;padding:0 32px;}

/* LEAD MAGNET */
.lm-section{background:var(--off);padding:80px 0;}
.lm-card{background:white;border-radius:20px;border:2px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.10);overflow:hidden;max-width:680px;margin:0 auto;}
.lm-stripe{height:5px;background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d));}
.lm-body{display:grid;grid-template-columns:190px 1fr;}
.lm-left{background:linear-gradient(150deg,#1C0A02,#2E1408);padding:28px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;}
.lm-left::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--or),var(--pk));}
.lm-mini-title{font-family:var(--fh);font-weight:900;font-size:13px;color:white;line-height:1.2;margin-bottom:5px;}
.lm-mini-title .or{color:var(--or);}
.lm-mini-sub{font-size:8.5px;color:rgba(255,255,255,.4);line-height:1.5;margin-bottom:12px;}
.lm-mini-items{display:flex;flex-direction:column;gap:3px;width:100%;text-align:left;}
.lm-mini-item{font-size:8px;color:rgba(255,255,255,.38);font-family:var(--fh);display:flex;align-items:center;gap:4px;}
.lm-mini-item::before{content:'';width:3px;height:3px;background:rgba(250,106,39,.7);border-radius:50%;flex-shrink:0;}
.lm-free-chip{margin-top:14px;background:var(--or);color:white;font-family:var(--fh);font-weight:800;font-size:11px;padding:4px 14px;border-radius:20px;display:inline-block;}
.lm-right{padding:32px 36px;}
.lm-right-ey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:8px;}
.lm-right-title{font-family:var(--fh);font-weight:900;font-size:22px;color:var(--text);margin-bottom:6px;line-height:1.3;}
.lm-right-sub{font-size:14px;color:var(--text-med);line-height:1.65;margin-bottom:22px;}
.lm-form{display:flex;flex-direction:column;gap:11px;}
.lm-input{width:100%;padding:13px 16px;border:1.5px solid var(--border);border-radius:8px;font-family:var(--fh);font-weight:600;font-size:14px;color:var(--text);background:var(--off);transition:border-color .15s,background .15s;outline:none;}
.lm-input:focus{border-color:var(--pk);background:white;}
.lm-submit{width:100%;padding:15px;background:var(--or);color:white;font-family:var(--fh);font-weight:800;font-size:15px;border:none;border-radius:8px;cursor:pointer;box-shadow:0 4px 20px rgba(250,106,39,.35);transition:all .2s;}
.lm-submit:hover{background:var(--or-d);transform:translateY(-1px);}
.lm-note{font-size:11px;color:var(--text-lt);text-align:center;margin-top:6px;}
.lm-success{display:none;text-align:center;padding:20px 0;}
.lm-success-icon{font-size:48px;margin-bottom:10px;}
.lm-success-title{font-family:var(--fh);font-weight:800;font-size:18px;color:var(--or);margin-bottom:6px;}
.lm-success-text{font-size:14px;color:var(--text-med);line-height:1.6;}
.lm-dl-link{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:var(--pk);color:white;font-family:var(--fh);font-weight:700;font-size:13px;padding:10px 20px;border-radius:7px;text-decoration:none;}
.lm-dl-link:hover{background:#B00F54;}

/* SECTIONS */
.section{padding:80px 0;} .section-dark{background:var(--dark);padding:80px 0;} .section-off{background:var(--off);padding:80px 0;}
.ey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--or);display:block;margin-bottom:12px;}
.h2{font-family:var(--fh);font-weight:900;font-size:clamp(26px,3.5vw,40px);color:var(--text);letter-spacing:-.6px;line-height:1.15;margin-bottom:14px;}
.h2-w{color:white;} .sub{font-size:16px;color:var(--text-med);line-height:1.75;max-width:600px;} .sub-w{color:rgba(255,255,255,.6);}

/* PARTS GRID */
.parts-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:48px;}
.part-card{background:white;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 2px 16px rgba(0,0,0,.05);transition:box-shadow .2s,transform .2s;}
.part-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.10);transform:translateY(-2px);}
.pc-stripe{height:4px;background:linear-gradient(90deg,var(--or),var(--pk));}
.pc-body{padding:24px 26px;}
.pc-part{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:8px;}
.pc-title{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--text);margin-bottom:10px;line-height:1.3;}
.pc-desc{font-size:13.5px;color:var(--text-med);line-height:1.65;margin-bottom:14px;}
.pc-items{list-style:none;}
.pc-item{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--text);line-height:1.4;margin-bottom:5px;}
.pc-check{color:var(--or);font-weight:900;font-size:12px;flex-shrink:0;margin-top:2px;}

/* ROADMAP */
.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px;}
.rm-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px 18px;transition:border-color .2s;}
.rm-card:hover{border-color:rgba(250,106,39,.4);}
.rm-week{font-family:var(--fh);font-weight:900;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:8px;}
.rm-title{font-family:var(--fh);font-weight:800;font-size:15px;color:white;margin-bottom:10px;}
.rm-item{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.5;margin-bottom:5px;}
.rm-item::before{content:'·';color:var(--or);font-size:16px;line-height:1.2;flex-shrink:0;}

/* MARKET STATS */
.mstats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
.ms-card{background:white;border-radius:14px;padding:28px 24px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);text-align:center;}
.ms-num{font-family:var(--fh);font-weight:900;font-size:36px;color:var(--or);line-height:1;margin-bottom:6px;}
.ms-lbl{font-size:13px;color:var(--text-med);line-height:1.5;}

/* FOR */
.for-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px;}
.for-card{border-radius:16px;padding:28px;}
.for-yes{background:var(--lv-l);border:1.5px solid rgba(155,111,191,.2);}
.for-no{background:var(--or-l);border:1.5px solid rgba(250,106,39,.15);}
.for-lbl{font-family:var(--fh);font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px;}
.for-yes .for-lbl{color:var(--lv-d);} .for-no .for-lbl{color:var(--or);}
.for-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-med);margin-bottom:12px;line-height:1.5;}
.for-item:last-child{margin-bottom:0;}

/* TESTI */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
.testi-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;transition:border-color .2s;}
.testi-card:hover{border-color:rgba(250,106,39,.3);}
.t-stars{color:var(--or);font-size:14px;margin-bottom:12px;letter-spacing:2px;}
.t-quote{font-size:14px;color:rgba(255,255,255,.7);line-height:1.72;margin-bottom:18px;font-style:italic;}
.t-auth{display:flex;align-items:center;gap:10px;}
.t-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--or),var(--pk));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:13px;color:white;flex-shrink:0;}
.t-name{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.t-loc{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;}

/* FAQ */
.faq-list{margin-top:48px;}
.faq-item{border-bottom:1px solid var(--border);}
.faq-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:20px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;font-family:var(--fh);font-weight:700;font-size:15px;color:var(--text);line-height:1.4;transition:color .15s;}
.faq-q:hover{color:var(--or);}
.faq-icon{font-size:20px;color:var(--or);flex-shrink:0;transition:transform .25s;}
.faq-item.open .faq-icon{transform:rotate(45deg);}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.faq-a-inner{padding-bottom:20px;font-size:14.5px;color:var(--text-med);line-height:1.8;}
.faq-item.open .faq-a{max-height:400px;}

/* UPGRADE BOX */
.upgrade-section{padding:80px 0;background:var(--off);}
.upgrade-box{background:white;border-radius:20px;border:2px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.12);overflow:hidden;max-width:600px;margin:0 auto;}
.ub-stripe{height:5px;background:linear-gradient(90deg,var(--or),var(--pk),var(--lv-d));}
.ub-body{padding:40px;}
.ub-ey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--or);margin-bottom:8px;}
.ub-title{font-family:var(--fh);font-weight:900;font-size:24px;color:var(--text);margin-bottom:6px;line-height:1.2;}
.ub-sub{font-size:14px;color:var(--text-lt);margin-bottom:28px;line-height:1.6;}
.ub-price-block{background:var(--or-l);border-radius:12px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;}
.ub-price{font-family:var(--fh);font-weight:900;font-size:52px;color:var(--or);line-height:1;}
.ub-price-right{text-align:right;}
.ub-old{font-size:14px;color:var(--text-lt);text-decoration:line-through;}
.ub-note{font-size:12px;color:var(--text-lt);margin-top:3px;}
.ub-save{display:inline-flex;background:var(--gd-l);border:1px solid rgba(226,173,55,.25);color:#8A6800;font-family:var(--fh);font-weight:700;font-size:12px;padding:4px 12px;border-radius:20px;margin-top:6px;}
.ub-incs{list-style:none;margin-bottom:28px;}
.ub-inc{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text-med);line-height:1.4;}
.ub-inc:last-child{border-bottom:none;}
.ub-ico{color:var(--or);font-weight:900;font-size:14px;flex-shrink:0;margin-top:1px;}
.ub-btn{display:block;width:100%;padding:20px;text-align:center;background:var(--or);color:white;font-family:var(--fh);font-weight:800;font-size:17px;border:none;border-radius:10px;cursor:pointer;text-decoration:none;box-shadow:0 6px 24px rgba(250,106,39,.35);transition:all .2s;margin-bottom:14px;}
.ub-btn:hover{background:var(--or-d);transform:translateY(-2px);}
.ub-trust{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:18px;}
.ub-ti{font-size:12px;color:var(--text-lt);}
.webinar-cta{background:linear-gradient(135deg,var(--pk),var(--lv-d));border-radius:16px;padding:32px;margin-top:20px;text-align:center;max-width:600px;margin-left:auto;margin-right:auto;}
.wc-lbl{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:8px;}
.wc-h{font-family:var(--fh);font-weight:800;font-size:18px;color:white;margin-bottom:6px;line-height:1.3;}
.wc-s{font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;}
.wc-btn{display:inline-flex;align-items:center;gap:8px;background:white;color:var(--pk);font-family:var(--fh);font-weight:800;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;}
.wc-btn:hover{background:#FFE066;color:var(--dark);}

/* FOOTER */
.footer{background:var(--black);padding:40px 28px;border-top:1px solid rgba(255,255,255,.06);}
.footer-inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;}
.footer-logo span{color:var(--or);}
.footer-links{display:flex;gap:20px;flex-wrap:wrap;}
.footer-link{font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;}
.footer-link:hover{color:rgba(255,255,255,.7);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.2);width:100%;}

@media(max-width:860px){.hero-grid{grid-template-columns:1fr;}.pdf-mockup-wrap{max-width:260px;margin:0 auto;}.parts-grid,.for-grid{grid-template-columns:1fr;}.testi-grid{grid-template-columns:1fr 1fr;}.roadmap{grid-template-columns:1fr 1fr;}.mstats{grid-template-columns:1fr 1fr;}.lm-body{grid-template-columns:1fr;}.lm-left{display:none;}.stat{padding:8px 18px;}}
@media(max-width:560px){.testi-grid,.roadmap,.mstats{grid-template-columns:1fr;}.nav-links{display:none;}.ub-body{padding:28px 22px;}.ub-price-block{flex-direction:column;gap:12px;text-align:center;}.ub-price-right{text-align:center;}}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<nav class="site-nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <div class="nav-links">
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">About BSP</a>
    <a href="#" class="nav-link active">Education</a>
    <a href="#" class="nav-link">Contact</a>
  </div>
  <a href="#download" class="nav-cta">Download Free →</a>
</nav>

<div class="free-banner">
  <div class="fb-inner">
    <span class="fb-tag">🎁 Free Resource</span>
    <span class="fb-text">This is a <strong>completely free</strong> download — no credit card, no catch</span>
    <a href="#download" class="fb-btn">Get Your Free Copy →</a>
  </div>
</div>

<div class="breadcrumb">
  <div class="bc-inner">
    <a href="#" class="bc-link">Home</a><span class="bc-sep">/</span>
    <a href="#" class="bc-link">Education</a><span class="bc-sep">/</span>
    <span class="bc-current">Raw Hair Business Blueprint</span>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="hero-eyebrow">Free guide · No credit card required</div>
        <h1 class="hero-title">The Raw Hair Business Blueprint — <span class="or">Launch in 30 Days.</span> No Inventory.</h1>
        <p class="hero-sub">The exact 30-day launch framework used by 1,200+ BSP members to build a real, operating raw hair brand — without inventory, without guessing, and without wasting money on things that don't work.</p>
        <div class="hero-author">
          <div class="hero-author-av">CD</div>
          <div>
            <div class="hero-author-name">Chanel</div>
            <div class="hero-author-title">Founder, BeautyShare Pro & Aavya Hair · @BecomingChanelD on YouTube</div>
          </div>
        </div>
        <div class="hero-feats">
          <div class="hf"><div class="hf-dot">✓</div>7 parts + 30-day checklist with 40+ action items</div>
          <div class="hf"><div class="hf-dot">✓</div>Week-by-week roadmap with daily tasks for every day</div>
          <div class="hf"><div class="hf-dot">✓</div>The $1K warm market DM script — copy and send today</div>
          <div class="hf"><div class="hf-dot">✓</div>Revenue stacking strategy for months 1 through 6</div>
          <div class="hf"><div class="hf-dot">✓</div>5 most profitable raw hair niches ranked by ease</div>
        </div>
        <button class="hero-dl-btn" onclick="document.getElementById('download').scrollIntoView({behavior:'smooth'})">⬇ Download Free — Enter Your Email →</button>
        <div class="hero-trust">📧 Instant PDF delivery · No credit card · No spam · Unsubscribe anytime</div>
      </div>
      <!-- PDF MOCKUP -->
      <div class="pdf-mockup-wrap">
        <div class="pdf-free-badge"><span class="f1">FREE</span><span class="f2">DOWNLOAD</span></div>
        <div class="pdf-cover">
          <div class="pdf-spine-shadow"></div>
          <div>
            <div class="pdf-tag">F R E E &nbsp; R E S O U R C E &nbsp;·&nbsp; B E A U T Y S H A R E P R O</div>
            <div class="pdf-title">THE <span class="or">RAW HAIR</span><br>BUSINESS<br>BLUEPRINT</div>
            <div class="pdf-divider"></div>
            <div class="pdf-tagline">How to Launch in 30 Days With No Inventory — Your step-by-step system for building a profitable raw hair brand using automation, smart sourcing, and BeautyShare Pro.</div>
          </div>
          <div>
            <div class="pdf-parts">
              <div class="pdf-part">The Raw Hair Opportunity — Why 2026 Is Your Year</div>
              <div class="pdf-part">Your Brand Foundation — Name, Niche & Identity</div>
              <div class="pdf-part">The BeautyShare Pro Advantage — Your Unfair Edge</div>
              <div class="pdf-part">Your 30-Day Launch Roadmap</div>
              <div class="pdf-part">Your First $1,000 This Month</div>
              <div class="pdf-part">Revenue Streams & Income Stacking</div>
              <div class="pdf-part">BONUS: 30-Day Checklist + Daily Action Plan</div>
            </div>
            <div class="pdf-footer">
              <div class="pdf-brand">Beauty<span>Share</span> Pro</div>
              <div class="pdf-handle">@BecomingChanelD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats-strip">
  <div class="stats-inner">
    <div class="stat"><div class="stat-num">$10B+</div><div class="stat-lbl">Global hair extension market</div></div>
    <div class="stat"><div class="stat-num">340%</div><div class="stat-lbl">Rise in "raw hair" searches since 2021</div></div>
    <div class="stat"><div class="stat-num">30 Days</div><div class="stat-lbl">To a real operating hair business</div></div>
    <div class="stat"><div class="stat-num">$0</div><div class="stat-lbl">Inventory required to launch</div></div>
  </div>
</div>

<!-- VIDEO -->
<section class="video-section">
  <div class="vs-inner">
    <span class="vs-ey">Watch This First</span>
    <h2 class="vs-title">A message from Chanel</h2>
    <p class="vs-sub">To add your video: replace the placeholder below with your YouTube embed iframe</p>
    <div class="vs-frame">
      <!--
        ACTIVATE VIDEO: Delete the vs-ph div below and replace with:
        <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
          title="Raw Hair Business Blueprint" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      -->
      <div class="vs-ph">
        <div class="vs-play">▶</div>
        <div class="vs-ph-lbl">Add your YouTube video ID here — see the comment in the source code</div>
      </div>
    </div>
  </div>
</section>

<!-- LEAD MAGNET / DOWNLOAD -->
<section class="lm-section" id="download">
  <div class="container--narrow" style="text-align:center;margin-bottom:40px;">
    <span class="ey" style="display:block;">Free download</span>
    <h2 class="h2">Get Your Free Copy Now</h2>
    <p class="sub" style="margin:0 auto;">Enter your name and email — we'll send your Blueprint instantly. No spam, no credit card, no catch.</p>
  </div>
  <div class="lm-card">
    <div class="lm-stripe"></div>
    <div class="lm-body">
      <div class="lm-left">
        <div class="lm-mini-title">THE <span class="or">RAW HAIR</span> BUSINESS BLUEPRINT</div>
        <div class="lm-mini-sub">How to Launch in 30 Days With No Inventory</div>
        <div class="lm-mini-items">
          <div class="lm-mini-item">30-Day Launch Roadmap</div>
          <div class="lm-mini-item">$1K Warm Market DM Script</div>
          <div class="lm-mini-item">5 Profitable Niches Ranked</div>
          <div class="lm-mini-item">Revenue Stacking Strategy</div>
          <div class="lm-mini-item">40+ Item Checklist</div>
        </div>
        <div class="lm-free-chip">100% FREE</div>
      </div>
      <div class="lm-right">
        <div class="lm-right-ey">Instant PDF delivery</div>
        <div class="lm-right-title">Download the Blueprint Free</div>
        <div class="lm-right-sub">Join 1,200+ BSP members who launched their raw hair brand in 30 days using this exact framework.</div>
        <div class="lm-form" id="lm-form">
          <input class="lm-input" type="text" id="lm-name" placeholder="Your first name" required/>
          <input class="lm-input" type="email" id="lm-email" placeholder="Your best email address" required/>
          <button class="lm-submit" onclick="handleDownload()">⬇ Send Me the Free Blueprint →</button>
          <div class="lm-note">🔒 No spam. Unsubscribe anytime. We'll also notify you about free webinars and new resources.</div>
        </div>
        <div class="lm-success" id="lm-success">
          <div class="lm-success-icon">🎉</div>
          <div class="lm-success-title">You're in! Check your inbox.</div>
          <div class="lm-success-text">Your Raw Hair Business Blueprint is on its way. Check your email — and your spam folder if you don't see it within 2 minutes.</div>
          <a href="#" class="lm-dl-link" id="lm-dl-link">⬇ Direct Download Link</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHAT'S INSIDE -->
<section class="section">
  <div class="container">
    <span class="ey">What's inside</span>
    <h2 class="h2">7 parts. The complete launch framework.</h2>
    <p class="sub">Work through each part in order. Don't skip. By Part 7 you have a real, operating hair business with your first sales underway.</p>
    <div class="parts-grid">
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Part 1</div><div class="pc-title">The Raw Hair Opportunity — Why 2026 Is Your Year</div><div class="pc-desc">The global hair extension market is worth $10B+ and raw hair is the fastest-growing segment. Understand the 3 shifts that created this window — and why it won't stay open forever.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>Why the consumer is educated now and ready to pay premium prices</li><li class="pc-item"><span class="pc-check">✓</span>Why the old vendor model is broken — and what replaced it</li><li class="pc-item"><span class="pc-check">✓</span>The infrastructure shift that collapsed the barrier to entry</li></ul></div></div>
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Part 2</div><div class="pc-title">Your Brand Foundation — Name, Niche & Identity</div><div class="pc-desc">Before you sell a single bundle, you need a brand. The 5 most profitable raw hair niches ranked, the 6 rules for naming your brand, and how to build a full visual identity in one afternoon.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>5 niches: Raw Straight, Raw Curly, Stylist B2B, Wigs, Protective Styles</li><li class="pc-item"><span class="pc-check">✓</span>Brand naming rules + trademark check process</li><li class="pc-item"><span class="pc-check">✓</span>Logo, color palette, brand font, and tone of voice — all in Canva</li></ul></div></div>
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Part 3</div><div class="pc-title">The BeautyShare Pro Advantage — Your Unfair Edge</div><div class="pc-desc">Side-by-side comparison of the old vendor list model vs. BeautyShare Pro across every dimension — plus an honest breakdown of what BSP actually does and doesn't do for you.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>Zero inventory + automated fulfillment explained clearly</li><li class="pc-item"><span class="pc-check">✓</span>Vendor list vs. BSP — 7-dimension comparison table</li><li class="pc-item"><span class="pc-check">✓</span>Why BSP can launch you in 48–72 hours vs. weeks the old way</li></ul></div></div>
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Part 4</div><div class="pc-title">Your 30-Day Launch Roadmap</div><div class="pc-desc">Four weeks. Four phases. One operating hair brand at the end. Week-by-week, action-by-action — with 12 specific tasks covering every step from business registration to your first paid ad.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>Week 1: Foundation — register, setup BSP, lock in brand identity</li><li class="pc-item"><span class="pc-check">✓</span>Week 2: Build — storefront, listings, social presence, payments</li><li class="pc-item"><span class="pc-check">✓</span>Week 3: Launch — first 3 sales, daily content, email list</li><li class="pc-item"><span class="pc-check">✓</span>Week 4: Scale — first paid ad, analyze, plan Month 2</li></ul></div></div>
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Part 5</div><div class="pc-title">Your First $1,000 — Getting There This Month</div><div class="pc-desc">Five channels, ranked by revenue potential. $900–$2,900 in first-month potential with zero ad spend — plus the exact warm market DM script that generates your first sales from people who already know you.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>Channel breakdown: Network DMs, Instagram, Facebook Groups, TikTok, Stylist Outreach</li><li class="pc-item"><span class="pc-check">✓</span>The $1,000 warm market DM script — copy, personalize, send</li><li class="pc-item"><span class="pc-check">✓</span>Time required vs. revenue potential for each channel</li></ul></div></div>
      <div class="part-card"><div class="pc-stripe"></div><div class="pc-body"><div class="pc-part">Parts 6 + Bonus</div><div class="pc-title">Revenue Stacking + Full 30-Day Checklist</div><div class="pc-desc">Every way to make money from your hair brand — from raw bundle sales to digital products to BSP referrals — ranked by ease of implementation. Plus the complete printable accountability checklist.</div><ul class="pc-items"><li class="pc-item"><span class="pc-check">✓</span>6 revenue streams: $2K–$9K/month potential each</li><li class="pc-item"><span class="pc-check">✓</span>Month-by-month income stacking roadmap (months 1–6)</li><li class="pc-item"><span class="pc-check">✓</span>40+ item printable checklist — your accountability system</li></ul></div></div>
    </div>
  </div>
</section>

<!-- 30-DAY ROADMAP VISUAL -->
<section class="section-dark">
  <div class="container">
    <span class="ey">The 30-day sequence</span>
    <h2 class="h2 h2-w">Four weeks. One operating hair brand.</h2>
    <p class="sub sub-w">Do not skip phases. Execute one action at a time. You will have a real business by Day 30.</p>
    <div class="roadmap">
      <div class="rm-card"><div class="rm-week">Week 1</div><div class="rm-title">Foundation</div><div class="rm-item">Register your business (LLC or sole prop)</div><div class="rm-item">Set up BeautyShare Pro profile</div><div class="rm-item">Choose niche + product line (3–5 products)</div><div class="rm-item">Build brand identity in Canva</div></div>
      <div class="rm-card"><div class="rm-week">Week 2</div><div class="rm-title">Build</div><div class="rm-item">Launch your storefront (Shopify + BSP)</div><div class="rm-item">Write product descriptions that sell transformations</div><div class="rm-item">Set up Instagram and/or TikTok</div><div class="rm-item">Post first 3 pieces of content</div></div>
      <div class="rm-card"><div class="rm-week">Week 3</div><div class="rm-title">Launch</div><div class="rm-item">Send warm market DM to 20 people</div><div class="rm-item">Make your first 3 sales</div><div class="rm-item">Post daily content (min. 1/day)</div><div class="rm-item">Start your email list</div></div>
      <div class="rm-card"><div class="rm-week">Week 4</div><div class="rm-title">Scale</div><div class="rm-item">Analyze what worked — double down</div><div class="rm-item">Launch first paid ad at $5–$10/day</div><div class="rm-item">Reach out to 3 local stylists</div><div class="rm-item">Set Month 2 revenue goal in writing</div></div>
    </div>
  </div>
</section>

<!-- MARKET STATS -->
<section class="section">
  <div class="container">
    <span class="ey">The opportunity</span>
    <h2 class="h2">The raw hair window is open right now</h2>
    <p class="sub">The entrepreneurs who move in 2026 will own their market by 2028. Consumers are educated and ready to pay premium prices for raw hair brands they trust.</p>
    <div class="mstats">
      <div class="ms-card"><div class="ms-num">$10B+</div><div class="ms-lbl">Global hair extension market — raw hair is the fastest-growing segment within it</div></div>
      <div class="ms-card"><div class="ms-num">340%</div><div class="ms-lbl">Increase in "raw hair" searches since 2021 — buyers know what they want</div></div>
      <div class="ms-card"><div class="ms-num">48–72hrs</div><div class="ms-lbl">Time to launch a BSP store vs. weeks or months the old vendor list way</div></div>
    </div>
  </div>
</section>

<!-- WHO FOR -->
<section class="section-off">
  <div class="container">
    <span class="ey">Is this for you?</span>
    <h2 class="h2">Who the Blueprint is written for</h2>
    <div class="for-grid">
      <div class="for-card for-yes">
        <div class="for-lbl">✅ This is for you if...</div>
        <div class="for-item"><span>✅</span>You want to launch a raw hair brand but don't know where to begin</div>
        <div class="for-item"><span>✅</span>You've Googled it, watched the videos, and still feel like you're missing the system</div>
        <div class="for-item"><span>✅</span>You want a complete 30-day roadmap — not another collection of tips</div>
        <div class="for-item"><span>✅</span>You want to launch without inventory, upfront capital, or an established supplier relationship</div>
        <div class="for-item"><span>✅</span>You're ready to put in focused work for 30 days to build something real</div>
      </div>
      <div class="for-card for-no">
        <div class="for-lbl">❌ Not for you if...</div>
        <div class="for-item"><span>❌</span>You're looking for a passive income system that requires no execution</div>
        <div class="for-item"><span>❌</span>You've been successfully running a hair business for 2+ years already</div>
        <div class="for-item"><span>❌</span>You want advanced marketing strategy (see the BSP Marketing Playbook)</div>
        <div class="for-item"><span>❌</span>You're not willing to take action on the plan within 30 days of downloading it</div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section-dark">
  <div class="container">
    <span class="ey">What members say</span>
    <h2 class="h2 h2-w">Real results from real BSP members</h2>
    <p class="sub sub-w">Replace these placeholder testimonials with your actual customer reviews as you collect them.</p>
    <div class="testi-grid">
      <div class="testi-card"><div class="t-stars">★★★★★</div><div class="t-quote">I had no idea where to start. I followed the 30-day roadmap week by week and made my first sale on Day 18. The warm market DM script made my first outreach feel natural instead of awkward.</div><div class="t-auth"><div class="t-av">TM</div><div><div class="t-name">Tamara M.</div><div class="t-loc">BSP Member · Houston, TX</div></div></div></div>
      <div class="testi-card"><div class="t-stars">★★★★★</div><div class="t-quote">I downloaded this expecting a flimsy lead gen PDF. It's an actual business framework. I built my entire brand identity in Part 2 in one afternoon. My store was live within 5 days of reading it.</div><div class="t-auth"><div class="t-av">KJ</div><div><div class="t-name">Keisha J.</div><div class="t-loc">BSP Member · Atlanta, GA</div></div></div></div>
      <div class="testi-card"><div class="t-stars">★★★★★</div><div class="t-quote">The revenue stacking section in Part 6 changed how I think about the business. I was only thinking about bundle sales. Now I'm in month 4 building wholesale accounts with local stylists.</div><div class="t-auth"><div class="t-av">DS</div><div><div class="t-name">Danielle S.</div><div class="t-loc">BSP Member · Dallas, TX</div></div></div></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container--narrow">
    <span class="ey">Questions</span>
    <h2 class="h2">Frequently asked</h2>
    <div class="faq-list">
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">Is this really free — no strings? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Yes — completely free. No credit card, no trial, no hidden fee. Enter your name and email and the PDF is delivered to your inbox instantly. We ask for your email so we can send you the file and keep you in the loop on free webinars and new BSP Education resources.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">Do I need to be a BSP member to use this? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">No. The Blueprint is designed for people who are considering BeautyShare Pro or have recently joined. Part 3 explains exactly what BSP is and how it works. You can read the entire Blueprint before deciding whether to join.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">How is this different from the paid education products? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">The Blueprint is the foundation framework — the 30-day roadmap, market context, brand setup, and first-sale strategy. The paid products go deeper: the First $1K Fast Track is a daily fillable workbook with 20 DM scripts for your first 7 days; the Marketing Playbook is a 5-module long-term marketing system; the Stylist Pack is for licensed hairstylists adding BSP packages. The Blueprint is where everyone starts.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">How long does it take to read through the Blueprint? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Most people read through it in 45–60 minutes. The real time investment is executing it — which the 30-day roadmap structures for you day by day. Set aside 1–2 hours the first day to read and complete the Week 1 action items.</div></div></div>
      <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">Will I be added to an email list? <span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">Yes — by downloading the Blueprint you'll be added to the BSP Education email list. We send free webinar notifications, new resource drops, and hair business strategy content from Chanel. You can unsubscribe at any time with one click.</div></div></div>
    </div>
  </div>
</section>

<!-- PAID UPGRADE -->
<section class="upgrade-section" id="pricing">
  <div class="container--narrow">
    <div style="text-align:center;margin-bottom:40px;">
      <span class="ey" style="display:block;">Ready to go further?</span>
      <h2 class="h2">The Blueprint gives you the foundation. The Fast Track gets your first sale in 7 days.</h2>
      <p class="sub" style="margin:0 auto;">Once you've read the Blueprint and launched your store, the First $1K Fast Track gives you the daily workbook, 20 DM scripts, and exact day-by-day actions to make your first sale this week.</p>
    </div>
    <div class="upgrade-box">
      <div class="ub-stripe"></div>
      <div class="ub-body">
        <div class="ub-ey">Recommended next step</div>
        <div class="ub-title">First $1K Fast Track Workbook</div>
        <div class="ub-sub">The 7-day action workbook that turns the Blueprint into your first $1,000 in real sales.</div>
        <div class="ub-price-block">
          <div class="ub-price">$97</div>
          <div class="ub-price-right">
            <div class="ub-old">$197 value</div>
            <div class="ub-note">One-time · Instant PDF delivery</div>
            <div class="ub-save">✓ Webinar attendees pay only $67</div>
          </div>
        </div>
        <ul class="ub-incs">
          <li class="ub-inc"><span class="ub-ico">✓</span>7-day launch action plan (fillable PDF)</li>
          <li class="ub-inc"><span class="ub-ico">✓</span>20 warm market DM scripts + follow-ups</li>
          <li class="ub-inc"><span class="ub-ico">✓</span>Pricing formula + 7-day content calendar</li>
          <li class="ub-inc"><span class="ub-ico">✓</span>First sale checklist — 10 actions in 72 hours</li>
        </ul>
        <a href="/education/first-1k-fast-track" class="ub-btn">Get the Fast Track — $97 →</a>
        <div class="ub-trust">
          <span class="ub-ti">🔒 Secure checkout</span>
          <span class="ub-ti">📧 Instant delivery</span>
          <span class="ub-ti">↩️ 14-day guarantee</span>
        </div>
      </div>
    </div>
    <div class="webinar-cta">
      <div class="wc-lbl">🎓 Get it cheaper at the webinar</div>
      <div class="wc-h">Attend the free webinar — get the Fast Track for $67 instead of $97</div>
      <div class="wc-s">Register for our free live masterclass and unlock webinar-only pricing on all BSP Education products.</div>
      <a href="#" class="wc-btn">Register for the Free Webinar →</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-logo">Beauty<span>Share</span> Pro</div>
    <div class="footer-links">
      <a href="#" class="footer-link">Privacy Policy</a>
      <a href="#" class="footer-link">Terms of Service</a>
      <a href="#" class="footer-link">Contact</a>
    </div>
    <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved. Blueprint created by Chanel — Founder of BeautyShare Pro, Aavya Hair, and Solvé. Follow @BecomingChanelD on YouTube.</div>
  </div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `function toggleFaq(btn){
  const item=btn.closest('.faq-item');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el=>el.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

function handleDownload(){
  const name=document.getElementById('lm-name').value.trim();
  const email=document.getElementById('lm-email').value.trim();
  if(!name){alert('Please enter your first name.');return;}
  if(!email||!email.includes('@')){alert('Please enter a valid email address.');return;}

  // ── CONNECT TO GHL ──
  // Uncomment and replace YOUR_GHL_WEBHOOK_URL with your GoHighLevel webhook URL:
  // fetch('YOUR_GHL_WEBHOOK_URL', {
  //   method: 'POST',
  //   headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify({firstName: name, email: email, source: 'blueprint-download'})
  // });

  document.getElementById('lm-form').style.display='none';
  const success=document.getElementById('lm-success');
  success.style.display='block';

  // ── DIRECT DOWNLOAD ──
  // Replace this href with the actual URL where your PDF is hosted (e.g. your CDN or GHL hosted file)
  document.getElementById('lm-dl-link').href='/mnt/user-data/uploads/BSB-Raw_Hair_Business_Blueprint.pdf';
}` }} />
    </div>
  );
}

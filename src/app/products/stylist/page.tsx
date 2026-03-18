'use client';

import { useEffect } from 'react';

export default function ProductStylist() {
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
  --or:#FA6A27;--or-d:#E05A18;--or-l:#FFF3EC;
  --pk:#D61465;--pk-l:#FCE8F2;
  --lv:#DCBDEF;--lv-d:#9B6FBF;--lv-l:#F5EDFB;
  --gd:#E2AD37;--gd-l:#FEF9E7;
  --black:#0A0A0A;--dark:#111;--white:#fff;--off:#F9F6F2;
  --text:#1A0A00;--text-med:#5A3020;--text-lt:#888;--border:#E8E0D8;
  --green:#1E6B3C;
  --fh:'Montserrat',sans-serif;--fb:'Lato',sans-serif;
}
body{font-family:var(--fb);color:var(--text);background:var(--off);-webkit-font-smoothing:antialiased;}
.container{max-width:960px;margin:0 auto;padding:0 24px;}
.container--narrow{max-width:680px;margin:0 auto;padding:0 24px;}

.nav{background:var(--black);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--fh);font-weight:800;font-size:18px;color:white;text-decoration:none;}
.nav-logo span{color:var(--or);}
.nav-tag{font-size:11px;color:rgba(255,255,255,0.4);font-family:var(--fh);font-weight:600;letter-spacing:.5px;}
.progress-accent{height:4px;background:linear-gradient(90deg,var(--lv-d),var(--gd),var(--or));}

/* HERO */
.hero{background:var(--black);padding:52px 0 44px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 55% 65% at 50% 40%,rgba(155,111,191,0.1) 0%,transparent 65%);
  pointer-events:none;}
.hero-inner{position:relative;z-index:1;padding:0 24px;}
.hero-kicker{display:inline-flex;align-items:center;
  background:rgba(155,111,191,0.15);border:1px solid rgba(155,111,191,0.35);
  border-radius:100px;padding:6px 18px;margin-bottom:20px;
  font-family:var(--fh);font-weight:700;font-size:10px;color:var(--lv);
  letter-spacing:2px;text-transform:uppercase;}
.hero-title{font-family:var(--fh);font-weight:900;font-size:clamp(28px,5vw,52px);
  color:white;letter-spacing:-1.2px;line-height:1.08;margin-bottom:14px;}
.hero-title .gd{color:var(--gd);}
.hero-sub{font-size:16px;color:rgba(255,255,255,0.6);line-height:1.7;max-width:540px;margin:0 auto;}

/* PRESETS */
.presets-wrap{padding:40px 0 0;}
.presets-title{font-family:var(--fh);font-weight:900;font-size:20px;color:var(--text);margin-bottom:6px;}
.presets-sub{font-size:14px;color:var(--text-lt);margin-bottom:24px;}
.presets-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:40px;}
.preset-card{background:white;border-radius:12px;padding:18px;cursor:pointer;
  border:2px solid var(--border);transition:all .2s;text-align:center;}
.preset-card:hover{border-color:var(--lv-d);box-shadow:0 4px 16px rgba(155,111,191,.15);}
.preset-card.active{border-color:var(--lv-d);box-shadow:0 0 0 4px rgba(155,111,191,.12);}
.preset-icon{font-size:26px;margin-bottom:8px;}
.preset-name{font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:4px;}
.preset-detail{font-size:11px;color:var(--text-lt);line-height:1.4;}

/* CALC LAYOUT */
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;padding-bottom:64px;}

/* TABS */
.tab-bar{display:grid;grid-template-columns:repeat(4,1fr);
  background:white;border-radius:12px;overflow:hidden;border:1px solid var(--border);
  margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
.tab{padding:12px 6px;text-align:center;cursor:pointer;transition:all .18s;
  font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:.3px;
  color:var(--text-lt);border-right:1px solid var(--border);}
.tab:last-child{border-right:none;}
.tab:hover:not(.active-lv):not(.active-or):not(.active-gd):not(.active-pk){background:var(--off);}
.tab.active-lv{background:var(--lv-d);color:white;}
.tab.active-or{background:var(--or);color:white;}
.tab.active-gd{background:var(--gd);color:white;}
.tab.active-pk{background:var(--pk);color:white;}
.tab-icon{font-size:15px;display:block;margin-bottom:3px;}

/* INPUT PANEL */
.input-panel{background:white;border-radius:16px;overflow:hidden;
  border:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.06);}
.panel-header{padding:20px 24px 16px;border-bottom:1px solid var(--border);}
.panel-title{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--text);}
.panel-sub{font-size:13px;color:var(--text-lt);margin-top:4px;}
.panel-body{padding:20px 24px;}
.input-group-label{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;margin-top:4px;}
.field{margin-bottom:16px;}
.field:last-child{margin-bottom:0;}
.field-label{font-family:var(--fh);font-weight:700;font-size:11px;
  letter-spacing:.4px;text-transform:uppercase;color:var(--text-med);
  display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;}
.field-hint{font-weight:400;font-size:10px;color:var(--text-lt);text-transform:none;letter-spacing:0;}
.input-wrap{position:relative;}
.input-prefix{position:absolute;left:12px;top:50%;transform:translateY(-50%);
  font-family:var(--fh);font-weight:700;font-size:15px;color:var(--text-lt);pointer-events:none;}
.input-suffix{position:absolute;right:12px;top:50%;transform:translateY(-50%);
  font-family:var(--fh);font-weight:700;font-size:13px;color:var(--text-lt);pointer-events:none;}
input[type="number"]{width:100%;padding:11px 12px 11px 28px;
  border:1.5px solid var(--border);border-radius:8px;
  font-family:var(--fh);font-weight:700;font-size:16px;color:var(--text);
  background:var(--off);transition:border-color .15s,background .15s;outline:none;
  -moz-appearance:textfield;}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button{-webkit-appearance:none;}
input[type="number"]:focus{border-color:var(--lv-d);background:white;}
input.no-prefix{padding-left:12px;}
input.has-suffix{padding-right:44px;}
.bsp-subgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.bsp-block{background:var(--lv-l);border:1px solid rgba(155,111,191,.2);border-radius:10px;padding:12px 14px;}
.bsp-block-label{font-size:11px;color:var(--lv-d);font-family:var(--fh);font-weight:700;margin-bottom:6px;}
.bsp-block input{font-size:14px;padding:8px 8px 8px 24px;}

/* RESULTS */
.results-panel{background:var(--black);border-radius:16px;overflow:hidden;
  border:1px solid rgba(255,255,255,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.2);
  position:sticky;top:24px;}
.results-header{padding:20px 24px 16px;border-bottom:1px solid rgba(255,255,255,0.08);}
.results-title{font-family:var(--fh);font-weight:800;font-size:16px;color:white;}
.results-sub{font-size:12px;color:rgba(255,255,255,0.4);margin-top:3px;}
.results-body{padding:20px 24px;}
.profit-main{text-align:center;padding:20px 0 24px;border-bottom:1px solid rgba(255,255,255,0.07);}
.profit-label{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;}
.profit-amount{font-family:var(--fh);font-weight:900;font-size:52px;
  line-height:1;letter-spacing:-2px;transition:color .3s;}
.profit-amount.pos{color:#4ADE80;}
.profit-amount.neg{color:#FF6B6B;}
.profit-amount.zer{color:rgba(255,255,255,0.3);}
.profit-per{font-size:13px;color:rgba(255,255,255,0.4);margin-top:6px;}
.breakdown{margin-top:18px;}
.br-row{display:flex;justify-content:space-between;align-items:center;
  padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
.br-row:last-child{border-bottom:none;}
.br-label{font-size:13px;color:rgba(255,255,255,0.5);}
.br-val{font-family:var(--fh);font-weight:700;font-size:13px;}
.br-val.inc{color:#4ADE80;}
.br-val.cst{color:#FF9B71;}
.br-val.neu{color:rgba(255,255,255,0.75);}
.br-divider{border-top:1px solid rgba(255,255,255,0.12);padding-top:13px;margin-top:4px;}
.br-divider .br-label{color:white;font-family:var(--fh);font-weight:700;font-size:13px;}
.margin-meter{margin-top:16px;}
.mm-top{display:flex;justify-content:space-between;margin-bottom:6px;}
.mm-title{font-size:10px;color:rgba(255,255,255,0.4);font-family:var(--fh);font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
.mm-pct{font-family:var(--fh);font-weight:900;font-size:14px;}
.mm-bar{height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;}
.mm-fill{height:100%;border-radius:4px;transition:width .35s ease,background .35s ease;}
.monthly-proj{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
  border-radius:10px;padding:16px;margin-top:16px;}
.mp-hdr{font-family:var(--fh);font-weight:700;font-size:10px;
  letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:12px;}
.mp-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.mp-row:last-child{margin-bottom:0;}
.mp-lbl{font-size:12px;color:rgba(255,255,255,0.45);}
.mp-val{font-family:var(--fh);font-weight:800;font-size:14px;}

/* TIP */
.tip-box{background:var(--lv-l);border:1px solid rgba(155,111,191,0.25);
  border-radius:12px;padding:16px 18px;margin-top:18px;}
.tip-title{font-family:var(--fh);font-weight:700;font-size:11px;
  color:var(--lv-d);letter-spacing:1px;text-transform:uppercase;margin-bottom:7px;}
.tip-text{font-size:13px;color:var(--text-med);line-height:1.6;}

/* BOTTOM CTA */
.bottom-cta{background:var(--black);padding:64px 0;text-align:center;position:relative;overflow:hidden;}
.bottom-cta::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 40% 60% at 50% 50%,rgba(155,111,191,0.1) 0%,transparent 65%);}
.bci{position:relative;z-index:1;}
.bc-title{font-family:var(--fh);font-weight:900;font-size:clamp(24px,4vw,38px);
  color:white;letter-spacing:-.8px;line-height:1.1;margin-bottom:14px;}
.bc-sub{font-size:16px;color:rgba(255,255,255,0.55);line-height:1.65;
  max-width:480px;margin:0 auto 36px;}
.cta-btn{display:inline-block;padding:18px 48px;font-family:var(--fh);font-weight:800;font-size:16px;
  background:linear-gradient(135deg,var(--lv-d),var(--pk));color:white;border:none;
  border-radius:10px;cursor:pointer;box-shadow:0 4px 24px rgba(155,111,191,.4);
  transition:all .2s;letter-spacing:.3px;text-decoration:none;}
.cta-btn:hover{filter:brightness(.9);transform:translateY(-2px);}
.cta-note{font-size:12px;color:rgba(255,255,255,0.35);margin-top:16px;}
.footer{background:var(--dark);padding:24px;text-align:center;border-top:1px solid #1a1a1a;}
.footer-logo{font-family:var(--fh);font-weight:800;font-size:16px;color:white;margin-bottom:6px;}
.footer-logo span{color:var(--or);}
.footer-copy{font-size:11px;color:rgba(255,255,255,.3);}

@media(max-width:760px){
  .calc-grid{grid-template-columns:1fr;}
  .results-panel{position:static;}
  .presets-grid{grid-template-columns:1fr 1fr;}
  .bsp-subgrid{grid-template-columns:1fr;}
}
@media(max-width:480px){
  .tab{font-size:9px;padding:10px 4px;}
  .presets-grid{grid-template-columns:1fr 1fr;}
}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `

<style>
.site-nav{background:var(--black);padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:200;}
.snav-logo{font-family:var(--fh);font-weight:800;font-size:17px;color:white;text-decoration:none;}
.snav-logo span{color:var(--or);}
.snav-links{display:flex;align-items:center;gap:28px;}
.snav-link{font-family:var(--fh);font-weight:600;font-size:12px;color:rgba(255,255,255,.55);text-decoration:none;letter-spacing:.5px;text-transform:uppercase;transition:color .15s;}
.snav-link:hover{color:white;} .snav-link.active{color:var(--or);}
.snav-cta{background:var(--lv-d);color:white;font-family:var(--fh);font-weight:700;font-size:12px;padding:8px 18px;border-radius:6px;text-decoration:none;transition:all .18s;}
.snav-cta:hover{filter:brightness(.88);}
.wb-banner{background:linear-gradient(90deg,var(--lv-d),var(--gd));padding:11px 28px;text-align:center;}
.wb-inner2{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;}
.wb-tag2{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);border-radius:100px;padding:2px 10px;font-family:var(--fh);font-weight:700;font-size:9px;color:white;letter-spacing:1.5px;text-transform:uppercase;}
.wb-text2{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.wb-text2 s{opacity:.55;font-weight:400;} .wb-text2 strong{color:#FFE066;}
.wb-btn2{background:white;color:var(--lv-d);font-family:var(--fh);font-weight:800;font-size:11px;padding:6px 14px;border-radius:5px;text-decoration:none;white-space:nowrap;}
.wb-btn2:hover{background:#FFE066;color:#333;}
.breadcrumb2{background:var(--off);border-bottom:1px solid var(--border);padding:10px 28px;}
.bc2-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12px;}
.bc2-link{color:var(--text-lt);text-decoration:none;font-family:var(--fh);font-weight:600;}
.bc2-link:hover{color:var(--lv-d);} .bc2-sep{color:var(--border);} .bc2-current{color:var(--text);font-family:var(--fh);font-weight:600;}
/* STYLIST WHAT'S INCLUDED */
.sap-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:44px;max-width:960px;margin-left:auto;margin-right:auto;padding:0 28px;}
.sap-card{background:white;border-radius:14px;padding:22px 24px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);display:flex;gap:14px;align-items:flex-start;}
.sap-icon{font-size:28px;flex-shrink:0;}
.sap-title{font-family:var(--fh);font-weight:800;font-size:14px;color:var(--text);margin-bottom:5px;line-height:1.3;}
.sap-desc{font-size:13px;color:var(--text-med);line-height:1.55;}
/* FOR */
.sap-for-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px;max-width:960px;margin-left:auto;margin-right:auto;padding:0 28px;}
.sap-for{border-radius:16px;padding:28px;}
.sap-for-yes{background:var(--green-l,#E6F4ED);border:1.5px solid rgba(30,107,60,.2);}
.sap-for-no{background:var(--lv-l);border:1.5px solid rgba(155,111,191,.2);}
.sap-for-lbl{font-family:var(--fh);font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px;}
.sap-for-yes .sap-for-lbl{color:#1E6B3C;} .sap-for-no .sap-for-lbl{color:var(--lv-d);}
.sap-for-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-med);margin-bottom:12px;line-height:1.5;}
.sap-for-item:last-child{margin-bottom:0;}
/* TESTI */
.sap-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;max-width:960px;margin-left:auto;margin-right:auto;padding:0 28px;}
.sap-tc{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;}
.sap-stars{color:var(--gd);font-size:14px;margin-bottom:12px;letter-spacing:2px;}
.sap-quote{font-size:14px;color:rgba(255,255,255,.7);line-height:1.72;margin-bottom:18px;font-style:italic;}
.sap-auth{display:flex;align-items:center;gap:10px;}
.sap-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--lv-d),var(--gd));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:13px;color:white;flex-shrink:0;}
.sap-name{font-family:var(--fh);font-weight:700;font-size:13px;color:white;}
.sap-loc{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;}
/* FAQ */
.sap-faq{margin-top:48px;max-width:740px;margin-left:auto;margin-right:auto;padding:0 28px;}
.sap-faq-item{border-bottom:1px solid var(--border);}
.sap-faq-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:20px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;font-family:var(--fh);font-weight:700;font-size:15px;color:var(--text);line-height:1.4;transition:color .15s;}
.sap-faq-q:hover{color:var(--lv-d);}
.sap-faq-icon{font-size:20px;color:var(--lv-d);flex-shrink:0;transition:transform .25s;}
.sap-faq-item.open .sap-faq-icon{transform:rotate(45deg);}
.sap-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.sap-faq-a-inner{padding-bottom:20px;font-size:14.5px;color:var(--text-med);line-height:1.8;}
.sap-faq-item.open .sap-faq-a{max-height:400px;}
/* PRICING */
.sap-pricing{padding:80px 0;background:var(--off);}
.sap-pbox{background:white;border-radius:20px;border:2px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.12);overflow:hidden;max-width:600px;margin:0 auto;}
.sap-pstripe{height:5px;background:linear-gradient(90deg,var(--lv-d),var(--gd),var(--or));}
.sap-pbody{padding:40px;}
.sap-pey{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--lv-d);margin-bottom:8px;}
.sap-ptitle{font-family:var(--fh);font-weight:900;font-size:26px;color:var(--text);margin-bottom:6px;line-height:1.2;}
.sap-psub{font-size:14px;color:var(--text-lt);margin-bottom:28px;line-height:1.6;}
.sap-pblock{background:var(--lv-l);border-radius:12px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;}
.sap-pp{font-family:var(--fh);font-weight:900;font-size:56px;color:var(--lv-d);line-height:1;}
.sap-pright{text-align:right;}
.sap-pold{font-size:15px;color:var(--text-lt);text-decoration:line-through;font-family:var(--fh);font-weight:600;}
.sap-pnote{font-size:12px;color:var(--text-lt);margin-top:3px;}
.sap-psave{display:inline-flex;background:rgba(30,107,60,.1);border:1px solid rgba(30,107,60,.2);color:#1E6B3C;font-family:var(--fh);font-weight:700;font-size:12px;padding:4px 12px;border-radius:20px;margin-top:6px;}
.sap-pincs{list-style:none;margin-bottom:28px;}
.sap-pinc{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text-med);line-height:1.4;}
.sap-pinc:last-child{border-bottom:none;}
.sap-pico{color:var(--lv-d);font-weight:900;font-size:14px;flex-shrink:0;margin-top:1px;}
.sap-pbtn{display:block;width:100%;padding:20px;text-align:center;background:var(--lv-d);color:white;font-family:var(--fh);font-weight:800;font-size:17px;border:none;border-radius:10px;cursor:pointer;text-decoration:none;box-shadow:0 6px 24px rgba(155,111,191,.4);transition:all .2s;margin-bottom:14px;}
.sap-pbtn:hover{filter:brightness(.88);transform:translateY(-2px);}
.sap-ptrust{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:18px;}
.sap-pti{font-size:12px;color:var(--text-lt);}
.sap-wcbox{background:linear-gradient(135deg,var(--lv-d),var(--gd));border-radius:16px;padding:32px;margin:20px auto 0;max-width:600px;text-align:center;}
.sap-wclbl{font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:8px;}
.sap-wch{font-family:var(--fh);font-weight:800;font-size:18px;color:white;margin-bottom:6px;line-height:1.3;}
.sap-wcb{font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;}
.sap-wclink{display:inline-flex;align-items:center;background:white;color:var(--lv-d);font-family:var(--fh);font-weight:800;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;transition:all .18s;}
.sap-wclink:hover{background:#FFE066;color:#333;}
@media(max-width:760px){.sap-grid,.sap-for-grid,.sap-testi-grid{grid-template-columns:1fr;}.snav-links{display:none;}.sap-pbody{padding:28px 22px;}.sap-pblock{flex-direction:column;gap:12px;text-align:center;}.sap-pright{text-align:center;}}
</style>
<nav class="site-nav">
  <a href="https://www.BeautySharePro.com" class="snav-logo">Beauty<span>Share</span> Pro</a>
  <div class="snav-links">
    <a href="#" class="snav-link">Home</a><a href="#" class="snav-link">About BSP</a>
    <a href="#" class="snav-link active">Education</a><a href="#" class="snav-link">Contact</a>
  </div>
  <a href="#pricing" class="snav-cta">Get This Now →</a>
</nav>
<div class="wb-banner">
  <div class="wb-inner2">
    <span class="wb-tag2">🎓 Webinar Special</span>
    <span class="wb-text2">Attending our free webinar? Get this for <strong>$97</strong> — normally <s>$147</s></span>
    <a href="#" class="wb-btn2">Register Free →</a>
  </div>
</div>
<div class="breadcrumb2"><div class="bc2-inner"><a href="#" class="bc2-link">Home</a><span class="bc2-sep">/</span><a href="#" class="bc2-link">Education</a><span class="bc2-sep">/</span><span class="bc2-current">Stylist Accelerator Pack</span></div></div>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-kicker">For Licensed Hairstylists</div>
    <h1 class="hero-title">See exactly what you'll<br><span class="gd">make per install.</span></h1>
    <p class="hero-sub">Enter your real numbers. Know your real profit. Set your prices with confidence — not guesswork.</p>
  </div>
</section>


<!-- STATIC PRICING PREVIEW -->
<section style="padding:56px 0;background:var(--off);">
  <div style="max-width:960px;margin:0 auto;padding:0 28px;">
    <span style="font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--lv-d);display:block;margin-bottom:12px;">Real BSP profit examples</span>
    <h2 style="font-family:var(--fh);font-weight:900;font-size:clamp(24px,3.5vw,36px);color:var(--text);letter-spacing:-.6px;line-height:1.15;margin-bottom:12px;">What you actually make per service type</h2>
    <p style="font-size:15px;color:var(--text-med);line-height:1.75;max-width:620px;margin-bottom:40px;">Based on real BSP product costs. The Pack includes a live interactive profit calculator so you can enter your own numbers and see your exact margins.</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
      <div style="background:white;border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);text-align:center;"><div style="font-size:26px;margin-bottom:8px;">⚡</div><div style="font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:12px;">Quick Weave</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Labor</span><span style="font-family:var(--fh);font-weight:700;">$150</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Hair markup</span><span style="font-family:var(--fh);font-weight:700;">$95</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">BSP cost</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$85</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;"><span style="color:var(--text-lt);">Ship+supplies</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$20</span></div><div style="background:var(--lv-l);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:11px;color:var(--lv-d);font-family:var(--fh);font-weight:700;">Net profit</span><span style="font-family:var(--fh);font-weight:900;font-size:18px;color:var(--lv-d);">$225</span></div></div>
      <div style="background:white;border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);text-align:center;"><div style="font-size:26px;margin-bottom:8px;">🪡</div><div style="font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:12px;">Sew-In</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Labor</span><span style="font-family:var(--fh);font-weight:700;">$200</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Hair markup</span><span style="font-family:var(--fh);font-weight:700;">$140</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">BSP cost</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$120</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;"><span style="color:var(--text-lt);">Ship+supplies</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$27</span></div><div style="background:var(--lv-l);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:11px;color:var(--lv-d);font-family:var(--fh);font-weight:700;">Net profit</span><span style="font-family:var(--fh);font-weight:900;font-size:18px;color:var(--lv-d);">$313</span></div></div>
      <div style="background:white;border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);text-align:center;"><div style="font-size:26px;margin-bottom:8px;">✨</div><div style="font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:12px;">K-Tip / I-Tip</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Labor</span><span style="font-family:var(--fh);font-weight:700;">$350</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Hair markup</span><span style="font-family:var(--fh);font-weight:700;">$160</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">BSP cost</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$160</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;"><span style="color:var(--text-lt);">Ship+supplies</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$43</span></div><div style="background:var(--lv-l);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:11px;color:var(--lv-d);font-family:var(--fh);font-weight:700;">Net profit</span><span style="font-family:var(--fh);font-weight:900;font-size:18px;color:var(--lv-d);">$487</span></div></div>
      <div style="background:white;border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(0,0,0,.05);text-align:center;"><div style="font-size:26px;margin-bottom:8px;">🧶</div><div style="font-family:var(--fh);font-weight:800;font-size:13px;color:var(--text);margin-bottom:12px;">Braids w/ Hair</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Labor</span><span style="font-family:var(--fh);font-weight:700;">$180</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">Hair markup</span><span style="font-family:var(--fh);font-weight:700;">$65</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:var(--text-lt);">BSP cost</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$55</span></div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:12px;"><span style="color:var(--text-lt);">Ship+supplies</span><span style="font-family:var(--fh);font-weight:700;color:var(--or);">−$15</span></div><div style="background:var(--lv-l);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:11px;color:var(--lv-d);font-family:var(--fh);font-weight:700;">Net profit</span><span style="font-family:var(--fh);font-weight:900;font-size:18px;color:var(--lv-d);">$240</span></div></div>
    </div>
    <p style="font-size:12px;color:var(--text-lt);margin-top:14px;text-align:center;">*Example calculations using typical BSP product costs. Your margins will vary. The Pack includes a live calculator to enter your own numbers.</p>
  </div>
</section>

<section class="sap-pricing" id="pricing">
  <div style="max-width:740px;margin:0 auto;padding:0 28px;">
    <div style="text-align:center;margin-bottom:40px;">
      <span style="font-family:var(--fh);font-weight:700;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--lv-d);display:block;margin-bottom:12px;">Get instant access</span>
      <h2 style="font-family:var(--fh);font-weight:900;font-size:clamp(26px,3.5vw,38px);color:var(--text);letter-spacing:-.6px;line-height:1.15;margin-bottom:14px;">Pays for itself on your very first package client.</h2>
      <p style="font-size:16px;color:var(--text-med);line-height:1.75;max-width:520px;margin:0 auto;">One client. One package. $147 more than covered — before you even finish reading this page.</p>
    </div>
    <div class="sap-pbox">
      <div class="sap-pstripe"></div>
      <div class="sap-pbody">
        <div class="sap-pey">Stylist Accelerator Pack</div>
        <div class="sap-ptitle">For Hairstylists Adding BSP Packages</div>
        <div class="sap-psub">Scripts, pricing, calculator, content plan, and ordering workflow — all in one pack.</div>
        <div class="sap-pblock">
          <div class="sap-pp">$147</div>
          <div class="sap-pright">
            <div class="sap-pold">$247 value</div>
            <div class="sap-pnote">One-time · Instant delivery</div>
            <div class="sap-psave">✓ Save $100 today</div>
          </div>
        </div>
        <ul class="sap-pincs">
          <li class="sap-pinc"><span class="sap-pico">✓</span>Interactive profit calculator (all 4 service types)</li>
          <li class="sap-pinc"><span class="sap-pico">✓</span>Client introduction scripts — in-chair, text, DM</li>
          <li class="sap-pinc"><span class="sap-pico">✓</span>Real BSP pricing with 20" bundle examples</li>
          <li class="sap-pinc"><span class="sap-pico">✓</span>30-day stylist social media content plan</li>
          <li class="sap-pinc"><span class="sap-pico">✓</span>New client acquisition + $5/day ad blueprint</li>
          <li class="sap-pinc"><span class="sap-pico">✓</span>Step-by-step BSP ordering workflow</li>
        </ul>
        <a href="#" class="sap-pbtn">Get Instant Access — $147 →</a>
        <div class="sap-ptrust">
          <span class="sap-pti">🔒 Secure checkout</span>
          <span class="sap-pti">📧 Instant delivery</span>
          <span class="sap-pti">↩️ 14-day guarantee</span>
        </div>
      </div>
    </div>
    <div class="sap-wcbox">
      <div class="sap-wclbl">🎓 Better deal available</div>
      <div class="sap-wch">Attend the free webinar — get this for $97 instead of $147</div>
      <div class="sap-wcb">Register for our free webinar and unlock webinar-only pricing on every BSP Education product.</div>
      <a href="#" class="sap-wclink">Register for the Free Webinar →</a>
    </div>
  </div>
</section>

<footer style="background:var(--black);padding:40px 28px;border-top:1px solid rgba(255,255,255,.06);">
  <div style="max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
    <div style="font-family:var(--fh);font-weight:800;font-size:16px;color:white;">Beauty<span style="color:var(--or);">Share</span> Pro</div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      <a href="#" style="font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;">Privacy Policy</a>
      <a href="#" style="font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;">Terms</a>
      <a href="#" style="font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;">Refund Policy</a>
      <a href="#" style="font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;font-family:var(--fh);font-weight:600;">Contact</a>
    </div>
    <div style="font-size:11px;color:rgba(255,255,255,.2);width:100%;">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
  </div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `function toggleSapFaq(btn){const item=btn.closest(".sap-faq-item");const isOpen=item.classList.contains("open");document.querySelectorAll(".sap-faq-item.open").forEach(el=>el.classList.remove("open"));if(!isOpen)item.classList.add("open");}` }} />
    </div>
  );
}

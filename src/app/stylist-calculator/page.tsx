'use client';

import { useEffect } from 'react';

export default function StylistCalculatorPage() {
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

<nav class="nav">
  <a href="https://www.BeautySharePro.com" class="nav-logo">Beauty<span>Share</span> Pro</a>
  <span class="nav-tag">Stylist Profit Calculator</span>
</nav>
<div class="progress-accent"></div>

<section class="hero">
  <div class="hero-inner">
    <div class="hero-kicker">Stylist Accelerator Pack — Included Tool</div>
    <h1 class="hero-title">See exactly what you'll<br><span class="gd">make per install.</span></h1>
    <p class="hero-sub">Enter your real numbers. Know your real profit. Set your prices with confidence — not guesswork.</p>
  </div>
</section>

<section class="presets-wrap">
  <div class="container">
    <div class="presets-title">Pick your service type to get started</div>
    <div class="presets-sub">Pre-fills the calculator with real BSP pricing examples — adjust to match your market.</div>
    <div class="presets-grid">
      <div class="preset-card active" id="preset-quickweave" onclick="loadPreset('quickweave')">
        <div class="preset-icon">⚡</div>
        <div class="preset-name">Quick Weave</div>
        <div class="preset-detail">2–3 bundles<br>1–2 hrs install</div>
      </div>
      <div class="preset-card" id="preset-sewin" onclick="loadPreset('sewin')">
        <div class="preset-icon">🪡</div>
        <div class="preset-name">Sew-In</div>
        <div class="preset-detail">2–4 bundles<br>2–4 hrs install</div>
      </div>
      <div class="preset-card" id="preset-ktip" onclick="loadPreset('ktip')">
        <div class="preset-icon">✨</div>
        <div class="preset-name">K-Tip / I-Tip</div>
        <div class="preset-detail">Full head install<br>premium service</div>
      </div>
      <div class="preset-card" id="preset-braids" onclick="loadPreset('braids')">
        <div class="preset-icon">🧶</div>
        <div class="preset-name">Braids w/ Hair</div>
        <div class="preset-detail">Knotless, box braids<br>bulk hair included</div>
      </div>
    </div>

    <div class="calc-grid">
      <!-- INPUTS -->
      <div>
        <div class="tab-bar">
          <div class="tab active-lv" id="tab-quickweave" onclick="switchTab('quickweave')"><span class="tab-icon">⚡</span>Quick Weave</div>
          <div class="tab" id="tab-sewin" onclick="switchTab('sewin')"><span class="tab-icon">🪡</span>Sew-In</div>
          <div class="tab" id="tab-ktip" onclick="switchTab('ktip')"><span class="tab-icon">✨</span>K-Tip</div>
          <div class="tab" id="tab-braids" onclick="switchTab('braids')"><span class="tab-icon">🧶</span>Braids</div>
        </div>

        <div class="input-panel">
          <div class="panel-header">
            <div class="panel-title" id="panel-title">Quick Weave Package</div>
            <div class="panel-sub">All results update instantly as you type</div>
          </div>
          <div class="panel-body">

            <div class="input-group-label" style="color:var(--lv-d);">💰 What You Charge the Client</div>
            <div class="field">
              <div class="field-label">Install / labor fee <span class="field-hint">Your service charge</span></div>
              <div class="input-wrap">
                <span class="input-prefix">$</span>
                <input type="number" id="i-labor" value="150" min="0" oninput="calc()"/>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Hair charge to client <span class="field-hint">What client pays for hair</span></div>
              <div class="input-wrap">
                <span class="input-prefix">$</span>
                <input type="number" id="i-hair-charge" value="180" min="0" oninput="calc()"/>
              </div>
            </div>

            <div class="input-group-label" style="color:var(--lv-d);margin-top:8px;">📦 Your BSP Cost</div>
            <div class="bsp-subgrid">
              <div class="bsp-block">
                <div class="bsp-block-label">Hair cost from BSP</div>
                <div class="input-wrap">
                  <span class="input-prefix">$</span>
                  <input type="number" id="i-hair-cost" value="85" min="0" oninput="calc()" class="bsp-block"/>
                </div>
              </div>
              <div class="bsp-block">
                <div class="bsp-block-label">Shipping / handling</div>
                <div class="input-wrap">
                  <span class="input-prefix">$</span>
                  <input type="number" id="i-shipping" value="12" min="0" oninput="calc()" class="bsp-block"/>
                </div>
              </div>
            </div>

            <div class="input-group-label" style="color:var(--text-lt);margin-top:4px;">🧴 Other Costs (Optional)</div>
            <div class="field">
              <div class="field-label">Supplies per install <span class="field-hint">Net, thread, clips, etc.</span></div>
              <div class="input-wrap">
                <span class="input-prefix">$</span>
                <input type="number" id="i-supplies" value="8" min="0" oninput="calc()"/>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Hours for this service <span class="field-hint">For hourly rate calc</span></div>
              <div class="input-wrap">
                <input type="number" id="i-hours" value="2" min="0.5" step="0.5" oninput="calc()" class="no-prefix has-suffix"/>
                <span class="input-suffix">hrs</span>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Clients per week <span class="field-hint">For monthly projection</span></div>
              <div class="input-wrap">
                <input type="number" id="i-clients" value="4" min="1" oninput="calc()" class="no-prefix has-suffix"/>
                <span class="input-suffix">clients</span>
              </div>
            </div>

          </div>
        </div>

        <div class="tip-box">
          <div class="tip-title">💡 Pricing Tip</div>
          <div class="tip-text" id="tip-text">For Quick Weaves, most BSP stylists charge $150–$220 for labor and mark up the hair 60–80% above their BSP cost. This keeps you competitive while building real profit per client.</div>
        </div>
      </div>

      <!-- RESULTS -->
      <div>
        <div class="results-panel">
          <div class="results-header">
            <div class="results-title">Your Profit Breakdown</div>
            <div class="results-sub">Live — updates as you type</div>
          </div>
          <div class="results-body">

            <div class="profit-main">
              <div class="profit-label">Net Profit Per Install</div>
              <div class="profit-amount pos" id="profit-display">$225</div>
              <div class="profit-per" id="hourly-display">= $112.50 / hr effective rate</div>
            </div>

            <div class="breakdown">
              <div class="br-row"><span class="br-label">Labor charge</span><span class="br-val inc" id="b-labor">+$150</span></div>
              <div class="br-row"><span class="br-label">Hair markup earned</span><span class="br-val inc" id="b-hairmarkup">+$95</span></div>
              <div class="br-row"><span class="br-label">BSP hair cost</span><span class="br-val cst" id="b-haircost">−$85</span></div>
              <div class="br-row"><span class="br-label">Shipping</span><span class="br-val cst" id="b-shipping">−$12</span></div>
              <div class="br-row"><span class="br-label">Supplies</span><span class="br-val cst" id="b-supplies">−$8</span></div>
              <div class="br-row br-divider"><span class="br-label">Total income</span><span class="br-val neu" id="b-income">$330</span></div>
              <div class="br-row"><span class="br-label">Total costs</span><span class="br-val cst" id="b-costs">−$105</span></div>
              <div class="br-row" style="padding-top:10px;">
                <span class="br-label" style="color:white;font-family:var(--fh);font-weight:800;font-size:14px;">Net profit</span>
                <span class="br-val inc" id="b-profit" style="font-size:18px;">$225</span>
              </div>
            </div>

            <div class="margin-meter">
              <div class="mm-top">
                <span class="mm-title">Profit margin</span>
                <span class="mm-pct" id="margin-pct" style="color:#4ADE80;">68%</span>
              </div>
              <div class="mm-bar"><div class="mm-fill" id="margin-fill" style="width:68%;background:#4ADE80;"></div></div>
            </div>

            <div class="monthly-proj">
              <div class="mp-hdr">Monthly Projection</div>
              <div class="mp-row"><span class="mp-lbl">Installs / month</span><span class="mp-val" id="mp-installs" style="color:rgba(255,255,255,.7);">16</span></div>
              <div class="mp-row"><span class="mp-lbl">Monthly revenue</span><span class="mp-val" id="mp-revenue" style="color:var(--lv);">$5,280</span></div>
              <div class="mp-row"><span class="mp-lbl">Monthly profit</span><span class="mp-val" id="mp-profit" style="color:#4ADE80;">$3,600</span></div>
              <div class="mp-row"><span class="mp-lbl">Effective hourly rate</span><span class="mp-val" id="mp-hourly" style="color:var(--gd);">$112.50/hr</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bottom-cta">
  <div class="container bci">
    <h2 class="bc-title">Ready to add BSP packages<br>to your service menu?</h2>
    <p class="bc-sub">The Stylist Accelerator Pack gives you the scripts, real BSP pricing, and step-by-step ordering workflow to start this week.</p>
    <a href="#" class="cta-btn">Get the Stylist Accelerator Pack →</a>
    <div class="cta-note">🔒 One-time · Instant delivery · 14-day money-back guarantee</div>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">Beauty<span>Share</span> Pro</div>
  <div class="footer-copy">© 2026 BeautyShare Pro · www.BeautySharePro.com · All rights reserved.</div>
</footer>


` }} />
      <script data-dynamic dangerouslySetInnerHTML={{ __html: `const PRESETS = {
  quickweave:{labor:150,hairCharge:180,hairCost:85,shipping:12,supplies:8,hours:2,clients:4,
    title:'Quick Weave Package',
    tip:'For Quick Weaves, most BSP stylists charge $150–$220 for labor and mark up the hair 60–80% above their BSP cost. This keeps you competitive while building real profit per client.'},
  sewin:{labor:200,hairCharge:260,hairCost:120,shipping:15,supplies:12,hours:3.5,clients:3,
    title:'Sew-In Package',
    tip:'Sew-ins command premium prices. With 20" BSP bundles, your cost is typically $110–$140 for a full sew-in. Charging $250–$300 for hair gives you strong margins while staying competitive.'},
  ktip:{labor:350,hairCharge:320,hairCost:160,shipping:18,supplies:25,hours:4,clients:2,
    title:'K-Tip / I-Tip Install',
    tip:'K-Tip is your highest-ticket service. Clients expect to pay $600–$900+ total. Your BSP raw hair gives you excellent margins here — set your hair price at 1.8–2x your BSP cost.'},
  braids:{labor:180,hairCharge:120,hairCost:55,shipping:10,supplies:5,hours:5,clients:3,
    title:'Braids with Hair Package',
    tip:'Braids with bulk hair is a volume play. Your BSP bulk hair cost is low, giving you room to compete on price while still earning strong margins. Focus on speed and volume.'}
};
const TAB_COLORS={quickweave:'active-lv',sewin:'active-or',ktip:'active-gd',braids:'active-pk'};
let currentTab='quickweave';

function switchTab(type){
  ['quickweave','sewin','ktip','braids'].forEach(t=>{
    document.getElementById('tab-'+t).className='tab'+(t===type?' '+TAB_COLORS[t]:'');
  });
  currentTab=type;
  loadPreset(type);
}

function loadPreset(type){
  const p=PRESETS[type];
  document.getElementById('i-labor').value=p.labor;
  document.getElementById('i-hair-charge').value=p.hairCharge;
  document.getElementById('i-hair-cost').value=p.hairCost;
  document.getElementById('i-shipping').value=p.shipping;
  document.getElementById('i-supplies').value=p.supplies;
  document.getElementById('i-hours').value=p.hours;
  document.getElementById('i-clients').value=p.clients;
  document.getElementById('panel-title').textContent=p.title;
  document.getElementById('tip-text').textContent=p.tip;
  ['quickweave','sewin','ktip','braids'].forEach(t=>{
    document.getElementById('preset-'+t).classList.toggle('active',t===type);
  });
  if(currentTab!==type){
    currentTab=type;
    ['quickweave','sewin','ktip','braids'].forEach(t=>{
      document.getElementById('tab-'+t).className='tab'+(t===type?' '+TAB_COLORS[t]:'');
    });
  }
  calc();
}

function fmt(n){return '$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});}

function calc(){
  const labor      =parseFloat(document.getElementById('i-labor').value)||0;
  const hairCharge =parseFloat(document.getElementById('i-hair-charge').value)||0;
  const hairCost   =parseFloat(document.getElementById('i-hair-cost').value)||0;
  const shipping   =parseFloat(document.getElementById('i-shipping').value)||0;
  const supplies   =parseFloat(document.getElementById('i-supplies').value)||0;
  const hours      =parseFloat(document.getElementById('i-hours').value)||1;
  const clients    =parseFloat(document.getElementById('i-clients').value)||1;

  const hairMarkup  =hairCharge-hairCost;
  const totalIncome =labor+hairCharge;
  const totalCosts  =hairCost+shipping+supplies;
  const netProfit   =labor+hairMarkup-shipping-supplies;
  const hourlyRate  =hours>0?netProfit/hours:0;
  const margin      =totalIncome>0?(netProfit/totalIncome)*100:0;
  const monthly     =clients*4;
  const mRevenue    =totalIncome*monthly;
  const mProfit     =netProfit*monthly;

  // Profit display
  const profitEl=document.getElementById('profit-display');
  profitEl.textContent=fmt(netProfit);
  profitEl.className='profit-amount '+(netProfit>0?'pos':netProfit<0?'neg':'zer');
  document.getElementById('hourly-display').textContent='= '+fmt(hourlyRate)+' / hr effective rate';

  // Breakdown
  document.getElementById('b-labor').textContent='+'+fmt(labor);
  document.getElementById('b-hairmarkup').textContent=(hairMarkup>=0?'+':'−')+fmt(hairMarkup);
  document.getElementById('b-hairmarkup').className='br-val '+(hairMarkup>=0?'inc':'cst');
  document.getElementById('b-haircost').textContent='−'+fmt(hairCost);
  document.getElementById('b-shipping').textContent='−'+fmt(shipping);
  document.getElementById('b-supplies').textContent='−'+fmt(supplies);
  document.getElementById('b-income').textContent=fmt(totalIncome);
  document.getElementById('b-costs').textContent='−'+fmt(totalCosts);
  document.getElementById('b-profit').textContent=fmt(netProfit);
  document.getElementById('b-profit').style.color=netProfit>=0?'#4ADE80':'#FF6B6B';

  // Margin
  const clamp=Math.max(0,Math.min(100,margin));
  const mColor=margin>=50?'#4ADE80':margin>=25?'#E2AD37':'#FF6B6B';
  document.getElementById('margin-pct').textContent=Math.round(margin)+'%';
  document.getElementById('margin-pct').style.color=mColor;
  document.getElementById('margin-fill').style.width=clamp+'%';
  document.getElementById('margin-fill').style.background=mColor;

  // Monthly
  document.getElementById('mp-installs').textContent=monthly;
  document.getElementById('mp-revenue').textContent=fmt(mRevenue);
  document.getElementById('mp-profit').textContent=fmt(mProfit);
  document.getElementById('mp-hourly').textContent=fmt(hourlyRate)+'/hr';
}

calc();` }} />
    </div>
  );
}

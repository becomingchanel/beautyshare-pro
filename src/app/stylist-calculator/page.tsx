'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    setService: (id: string) => void;
    calculate: () => void;
  }
}

export default function StylistCalculator() {
  useEffect(() => {
    // Set meta tags
    document.title = 'Stylist Package Profit Calculator — BeautyShare Pro';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Calculate exactly how much you can make adding Install + Raw Hair packages to your service menu through BeautyShare Pro.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Calculate exactly how much you can make adding Install + Raw Hair packages to your service menu through BeautyShare Pro.';
      document.head.appendChild(meta);
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --or: #FA6A27; --or-d: #E05A18; --or-l: #FFF3EC; --or-m: #FFE4D0;
          --pk: #D61465; --pk-l: #FCE8F2;
          --lv: #DCBDEF; --lv-d: #9B6FBF; --lv-l: #F5EDFB;
          --gd: #E2AD37; --gd-l: #FEF9E7;
          --black: #0A0A0A; --dark: #111; --white: #fff; --off: #F9F6F2;
          --text: #1A0A00; --text-med: #5A3020; --text-lt: #888;
          --border: #E8E0D8;
          --fh: 'Montserrat', sans-serif; --fb: 'Lato', sans-serif;
        }
        body { font-family: var(--fb); background: var(--off); color: var(--text); -webkit-font-smoothing: antialiased; }
        .nav { background: var(--black); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: var(--fh); font-weight: 800; font-size: 18px; color: white; text-decoration: none; }
        .nav-logo span { color: var(--or); }
        .nav-tag { font-size: 12px; color: rgba(255,255,255,0.4); }
        .hero { background: var(--black); padding: 56px 24px 0; text-align: center; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(220,189,239,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 60%); pointer-events: none; }
        .hero-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(249,115,22,0.15); border: 1px solid rgba(249,115,22,0.3); border-radius: 100px; padding: 5px 16px; font-family: var(--fh); font-weight: 700; font-size: 10px; color: var(--or); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; background: var(--or); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        .hero-title { font-family: var(--fh); font-weight: 900; font-size: clamp(28px, 5vw, 52px); color: white; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; }
        .hero-title .or { color: var(--or); }
        .hero-title .lv { color: var(--lv); }
        .hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.65; margin-bottom: 0; max-width: 560px; margin: 0 auto; }
        .stat-bar { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(255,255,255,0.07); margin-top: 48px; }
        .stat { padding: 24px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.07); }
        .stat:last-child { border-right: none; }
        .stat-num { font-family: var(--fh); font-weight: 900; font-size: 24px; display: block; line-height: 1; }
        .stat-lbl { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 4px; }
        .calc-wrap { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
        .calc-card { background: white; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
        .cc-stripe { height: 5px; background: linear-gradient(90deg, var(--or), var(--pk), var(--lv-d), var(--gd)); }
        .cc-header { padding: 28px 32px 0; }
        .cc-header-title { font-family: var(--fh); font-weight: 900; font-size: 20px; color: var(--text); margin-bottom: 6px; }
        .cc-header-sub { font-size: 14px; color: var(--text-med); }
        .service-tabs { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; padding: 24px 32px; border-bottom: 1px solid var(--border); }
        .tab-btn { padding: 14px 10px; font-family: var(--fh); font-weight: 700; font-size: 13px; border: 1.5px solid var(--border); background: var(--off); color: var(--text-med); border-radius: 10px; cursor: pointer; text-align: center; line-height: 1.35; transition: all .15s; }
        .tab-btn:hover { border-color: var(--or); background: var(--or-l); color: var(--or); }
        .tab-btn.active { border-color: var(--or); background: var(--or-l); color: var(--or); }
        .tab-icon { font-size: 22px; display: block; margin-bottom: 5px; }
        .inputs-section { padding: 24px 32px; border-bottom: 1px solid var(--border); }
        .inputs-title { font-family: var(--fh); font-weight: 700; font-size: 11px; color: var(--text-lt); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .inputs-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
        .input-group { display: flex; flex-direction: column; gap: 7px; }
        .input-label { font-family: var(--fh); font-weight: 600; font-size: 12px; color: var(--text-med); }
        .input-wrap { position: relative; }
        .input-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text-lt); pointer-events: none; }
        .input-wrap input { width: 100%; padding: 11px 12px 11px 26px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 15px; color: var(--text); background: var(--off); transition: border-color .2s, box-shadow .2s; font-family: var(--fb); }
        .input-wrap input:focus { outline: none; border-color: var(--or); box-shadow: 0 0 0 3px rgba(249,115,22,.1); background: white; }
        .no-prefix input { padding-left: 12px; }
        .results-section { padding: 24px 32px; border-bottom: 1px solid var(--border); }
        .results-title { font-family: var(--fh); font-weight: 700; font-size: 11px; color: var(--text-lt); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 18px; }
        .metric { padding: 16px 12px; border-radius: 10px; text-align: center; border: 1px solid var(--border); }
        .m-or { background: var(--or-l); border-color: rgba(249,115,22,.25); }
        .m-pk { background: var(--pk-l); border-color: rgba(214,20,101,.2); }
        .m-lv { background: var(--lv-l); border-color: rgba(155,111,191,.25); }
        .m-gd { background: var(--gd-l); border-color: rgba(226,173,55,.3); }
        .metric-lbl { font-size: 11px; color: var(--text-med); margin-bottom: 5px; font-family: var(--fh); font-weight: 600; }
        .metric-val { font-family: var(--fh); font-weight: 900; font-size: 22px; line-height: 1; }
        .metric-unit { font-size: 10px; color: var(--text-lt); margin-top: 3px; }
        .val-or { color: var(--or); }
        .val-pk { color: var(--pk); }
        .val-lv { color: var(--lv-d); }
        .val-gd { color: #8A6800; }
        .breakdown { background: var(--off); border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
        .bd-head { background: var(--black); padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; }
        .bd-head-label { font-family: var(--fh); font-weight: 700; font-size: 13px; color: white; }
        .bd-head-note { font-size: 11px; color: rgba(255,255,255,.5); }
        .bd-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 0.5px solid var(--border); font-size: 13px; }
        .bd-row:last-child { border-bottom: none; background: var(--or-l); }
        .bd-label { color: var(--text-med); }
        .bd-val { font-family: var(--fh); font-weight: 700; }
        .bd-pos { color: #1E6B3C; }
        .bd-neg { color: #C0392B; }
        .bd-total { color: var(--or); font-size: 16px; }
        .monthly-section { padding: 24px 32px; border-bottom: 1px solid var(--border); }
        .monthly-title { font-family: var(--fh); font-weight: 700; font-size: 11px; color: var(--text-lt); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .monthly-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        .monthly-card { padding: 18px 14px; border-radius: 10px; text-align: center; border: 1px solid var(--border); background: white; }
        .mc-clients { font-size: 12px; color: var(--text-lt); margin-bottom: 6px; font-family: var(--fh); font-weight: 600; }
        .mc-earn { font-family: var(--fh); font-weight: 900; font-size: 24px; }
        .mc-label { font-size: 11px; color: var(--text-lt); margin-top: 4px; }
        .mc-4 { background: var(--or-l); border-color: rgba(249,115,22,.2); }
        .mc-4 .mc-earn { color: var(--or); }
        .mc-10 { background: var(--pk-l); border-color: rgba(214,20,101,.2); }
        .mc-10 .mc-earn { color: var(--pk); }
        .mc-20 { background: var(--lv-l); border-color: rgba(155,111,191,.2); }
        .mc-20 .mc-earn { color: var(--lv-d); }
        .bsp-tip { padding: 20px 32px 28px; }
        .tip-inner { background: var(--pk-l); border: 1px solid rgba(214,20,101,.2); border-left: 4px solid var(--pk); border-radius: 10px; padding: 16px 20px; }
        .tip-title { font-family: var(--fh); font-weight: 800; font-size: 13px; color: var(--pk); margin-bottom: 6px; }
        .tip-text { font-size: 14px; color: var(--text); line-height: 1.65; }
        .how-it-works { background: white; padding: 64px 24px; }
        .section-eyebrow { font-family: var(--fh); font-weight: 700; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; display: block; text-align: center; margin-bottom: 10px; }
        .section-title { font-family: var(--fh); font-weight: 900; font-size: clamp(22px,3.5vw,34px); color: var(--text); letter-spacing: -.8px; line-height: 1.15; text-align: center; margin-bottom: 12px; }
        .section-sub { font-size: 15px; color: var(--text-med); line-height: 1.65; text-align: center; max-width: 560px; margin: 0 auto 44px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 860px; margin: 0 auto; }
        .step-card { border-radius: 12px; padding: 26px 22px; border: 1px solid var(--border); }
        .step-num { font-family: var(--fh); font-weight: 900; font-size: 36px; line-height: 1; margin-bottom: 12px; }
        .step-title { font-family: var(--fh); font-weight: 800; font-size: 15px; color: var(--text); margin-bottom: 8px; }
        .step-desc { font-size: 13.5px; color: var(--text-med); line-height: 1.6; }
        .cta-section { background: linear-gradient(135deg, var(--or), var(--pk)); padding: 64px 24px; text-align: center; }
        .cta-title { font-family: var(--fh); font-weight: 900; font-size: clamp(24px,4vw,40px); color: white; letter-spacing: -1px; line-height: 1.1; margin-bottom: 12px; }
        .cta-sub { font-size: 16px; color: rgba(255,255,255,.85); line-height: 1.6; margin-bottom: 28px; max-width: 480px; margin-left: auto; margin-right: auto; }
        .cta-btn { display: inline-block; background: var(--black); color: white; font-family: var(--fh); font-weight: 800; font-size: 15px; padding: 16px 40px; border-radius: 8px; text-decoration: none; transition: transform .2s; }
        .cta-btn:hover { transform: translateY(-2px); }
        .footer { background: var(--black); padding: 24px; text-align: center; }
        .footer-logo { font-family: var(--fh); font-weight: 800; font-size: 16px; color: white; margin-bottom: 6px; }
        .footer-logo span { color: var(--or); }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,.3); }
        @media(max-width:700px){
          .metrics-grid{grid-template-columns:repeat(2,1fr);}
          .inputs-grid{grid-template-columns:1fr;}
          .service-tabs{grid-template-columns:repeat(2,1fr);}
          .steps-grid{grid-template-columns:1fr;}
          .stat-bar{grid-template-columns:repeat(2,1fr);}
          .stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.07);}
          .monthly-grid{grid-template-columns:1fr;}
          .cc-header,.inputs-section,.results-section,.monthly-section,.bsp-tip{padding-left:20px;padding-right:20px;}
          .service-tabs{padding:20px;}
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Beauty<span>Share</span> Pro</a>
        <span className="nav-tag">Stylist Accelerator Pack · Member Resource</span>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Interactive Profit Calculator</div>
          <h1 className="hero-title">
            Add <span className="or">$400–$800</span><br />
            to Every Install<br />
            <span style={{fontSize:'0.72em', color:'rgba(255,255,255,0.8)'}}>with <span className="lv">raw hair packages</span> through BSP.</span>
          </h1>
          <p className="hero-sub">
            Enter your numbers below and see exactly how much you make per client — and per month — by adding Install + Raw Hair packages to your service menu.
          </p>
        </div>
        <div className="stat-bar" style={{maxWidth:'860px',margin:'48px auto 0'}}>
          <div className="stat"><span className="stat-num" style={{color:'var(--or)'}}>4 Services</span><div className="stat-lbl">Quick weave, sew-in, k-tip, braids</div></div>
          <div className="stat"><span className="stat-num" style={{color:'var(--pk)'}}>$0</span><div className="stat-lbl">Inventory needed upfront</div></div>
          <div className="stat"><span className="stat-num" style={{color:'var(--lv)'}}>$400+</span><div className="stat-lbl">Added profit per package</div></div>
          <div className="stat"><span className="stat-num" style={{color:'var(--gd)'}}>Auto</span><div className="stat-lbl">BSP fulfills every order</div></div>
        </div>
      </section>

      {/* CALCULATOR */}
      <div className="calc-wrap">
        <div className="calc-card">
          <div className="cc-stripe"></div>
          <div className="cc-header">
            <div className="cc-header-title">Stylist Package Profit Calculator</div>
            <div className="cc-header-sub">Select your service type, enter your numbers, and see your profit in real time.</div>
          </div>

          {/* Service Tabs */}
          <div className="service-tabs">
            <button className="tab-btn active" id="tab-qw" onClick={() => window.setService('qw')}>
              <span className="tab-icon">✂</span>Quick Weave
            </button>
            <button className="tab-btn" id="tab-si" onClick={() => window.setService('si')}>
              <span className="tab-icon">🪢</span>Sew-in
            </button>
            <button className="tab-btn" id="tab-kt" onClick={() => window.setService('kt')}>
              <span className="tab-icon">💎</span>K-tip
            </button>
            <button className="tab-btn" id="tab-br" onClick={() => window.setService('br')}>
              <span className="tab-icon">🔗</span>Braids + Extensions
            </button>
          </div>

          {/* Inputs */}
          <div className="inputs-section">
            <div className="inputs-title">Your Numbers</div>
            <div className="inputs-grid">
              <div className="input-group">
                <label className="input-label">Your install service price (what you charge)</label>
                <div className="input-wrap">
                  <span className="input-prefix">$</span>
                  <input type="number" id="install" defaultValue="150" min="0" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">BSP wholesale cost per bundle/piece</label>
                <div className="input-wrap">
                  <span className="input-prefix">$</span>
                  <input type="number" id="cost" defaultValue="65" min="0" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Your hair markup price (what you charge client)</label>
                <div className="input-wrap">
                  <span className="input-prefix">$</span>
                  <input type="number" id="markup" defaultValue="160" min="0" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Number of bundles / pieces per install</label>
                <div className="input-wrap no-prefix">
                  <input type="number" id="bundles" defaultValue="3" min="1" max="12" />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="results-section">
            <div className="results-title">Per Client — Live Results</div>
            <div className="metrics-grid">
              <div className="metric m-or">
                <div className="metric-lbl">Total package price</div>
                <div className="metric-val val-or" id="r-total">$630</div>
                <div className="metric-unit">you charge client</div>
              </div>
              <div className="metric m-pk">
                <div className="metric-lbl">Your hair profit</div>
                <div className="metric-val val-pk" id="r-hairprofit">$285</div>
                <div className="metric-unit">after BSP cost</div>
              </div>
              <div className="metric m-lv">
                <div className="metric-lbl">Total you keep</div>
                <div className="metric-val val-lv" id="r-net">$435</div>
                <div className="metric-unit">install + hair margin</div>
              </div>
              <div className="metric m-gd">
                <div className="metric-lbl">Hair margin</div>
                <div className="metric-val val-gd" id="r-margin">146%</div>
                <div className="metric-unit">return on BSP cost</div>
              </div>
            </div>

            <div className="breakdown">
              <div className="bd-head">
                <span className="bd-head-label" id="bd-service">Quick weave package — full breakdown</span>
                <span className="bd-head-note">per client</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Install service price</span>
                <span className="bd-val bd-pos" id="bd-install">+$150</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">Hair charge to client (<span id="bd-b1">3</span> × <span id="bd-markup">$160</span>)</span>
                <span className="bd-val bd-pos" id="bd-haircharge">+$480</span>
              </div>
              <div className="bd-row">
                <span className="bd-label">BSP wholesale cost (<span id="bd-b2">3</span> × <span id="bd-cost">$65</span>)</span>
                <span className="bd-val bd-neg" id="bd-bspcost">-$195</span>
              </div>
              <div className="bd-row">
                <span className="bd-label" style={{fontWeight:700}}>Net profit per client</span>
                <span className="bd-val bd-total" id="bd-net">$435</span>
              </div>
            </div>
          </div>

          {/* Monthly */}
          <div className="monthly-section">
            <div className="monthly-title">Monthly Earning Potential</div>
            <div className="monthly-grid">
              <div className="monthly-card mc-4">
                <div className="mc-clients">4 package clients / month</div>
                <div className="mc-earn" id="m-4">$1,740</div>
                <div className="mc-label">side income</div>
              </div>
              <div className="monthly-card mc-10">
                <div className="mc-clients">10 package clients / month</div>
                <div className="mc-earn" id="m-10">$4,350</div>
                <div className="mc-label">part-time income</div>
              </div>
              <div className="monthly-card mc-20">
                <div className="mc-clients">20 package clients / month</div>
                <div className="mc-earn" id="m-20">$8,700</div>
                <div className="mc-label">full-time income</div>
              </div>
            </div>
          </div>

          {/* BSP tip */}
          <div className="bsp-tip">
            <div className="tip-inner">
              <div className="tip-title">How BeautyShare Pro handles fulfillment</div>
              <div className="tip-text">When a client books a package, you place the order through your BSP account. The raw hair ships white-label directly to your salon or to the client — no inventory, no upfront stock. You collect the full package price at booking and keep the difference.</div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <span className="section-eyebrow" style={{color:'var(--or)'}}>The workflow</span>
        <h2 className="section-title">From booking to install — how it works</h2>
        <p className="section-sub">BeautyShare Pro makes offering hair packages completely seamless. Here's the full process from client to completed install.</p>
        <div className="steps-grid">
          <div className="step-card" style={{background:'var(--or-l)',borderColor:'rgba(249,115,22,.2)'}}>
            <div className="step-num" style={{color:'var(--or)'}}>01</div>
            <div className="step-title">Client books a package appointment</div>
            <div className="step-desc">Client selects your Install + Hair package from your booking page, menu, or by DM. Collect a deposit or full payment at booking. You tell them their texture and length selection during the consultation.</div>
          </div>
          <div className="step-card" style={{background:'var(--pk-l)',borderColor:'rgba(214,20,101,.2)'}}>
            <div className="step-num" style={{color:'var(--pk)'}}>02</div>
            <div className="step-title">You order through your BSP account</div>
            <div className="step-desc">Log into your BeautyShare Pro account and place the order for the exact texture, length, and quantity. The hair ships white-label directly to your salon address — no branding from BSP, just your order ready for the appointment.</div>
          </div>
          <div className="step-card" style={{background:'var(--lv-l)',borderColor:'rgba(155,111,191,.25)'}}>
            <div className="step-num" style={{color:'var(--lv-d)'}}>03</div>
            <div className="step-title">Install, collect, and keep the margin</div>
            <div className="step-desc">Hair arrives 1–3 days before the appointment. You do the install as normal. You charged the client your full package price — you pay BSP your wholesale cost. The difference is your profit. No inventory sitting around, no upfront cash tied up.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to add hair packages<br />to your service menu?</h2>
        <p className="cta-sub">Join BeautyShare Pro and get access to wholesale raw hair with white-label fulfillment — no inventory required.</p>
        <a href="/signup" className="cta-btn">Start Your BeautyShare Pro Account →</a>
      </section>

      <footer className="footer">
        <div className="footer-logo">Beauty<span>Share</span> Pro</div>
        <div className="footer-copy">© 2026 BeautyShare Pro. All rights reserved. Member resource — not for redistribution.</div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        const SERVICES = {
          qw: { label: 'Quick weave',          install: 150, cost: 65,  markup: 160, bundles: 3 },
          si: { label: 'Sew-in',               install: 200, cost: 75,  markup: 185, bundles: 3 },
          kt: { label: 'K-tip extensions',     install: 350, cost: 55,  markup: 140, bundles: 4 },
          br: { label: 'Braids + extensions',  install: 180, cost: 45,  markup: 110, bundles: 2 },
        };
        let active = 'qw';

        window.setService = function(id) {
          active = id;
          Object.keys(SERVICES).forEach(k => {
            const btn = document.getElementById('tab-' + k);
            if (btn) btn.className = 'tab-btn' + (k === id ? ' active' : '');
          });
          const s = SERVICES[id];
          document.getElementById('install').value  = s.install;
          document.getElementById('cost').value     = s.cost;
          document.getElementById('markup').value   = s.markup;
          document.getElementById('bundles').value  = s.bundles;
          calc();
        };

        function fmt(n) { return '$' + Math.round(n).toLocaleString(); }

        function calc() {
          const install = parseFloat(document.getElementById('install').value) || 0;
          const cost    = parseFloat(document.getElementById('cost').value)    || 0;
          const markup  = parseFloat(document.getElementById('markup').value)  || 0;
          const bundles = parseInt(document.getElementById('bundles').value)   || 1;

          const hairCharge  = markup * bundles;
          const bspCost     = cost * bundles;
          const hairProfit  = hairCharge - bspCost;
          const totalPrice  = install + hairCharge;
          const net         = install + hairProfit;
          const marginPct   = cost > 0 ? Math.round((hairProfit / bspCost) * 100) : 0;
          const lbl         = SERVICES[active] ? SERVICES[active].label : 'Package';

          document.getElementById('r-total').textContent      = fmt(totalPrice);
          document.getElementById('r-hairprofit').textContent = fmt(hairProfit);
          document.getElementById('r-net').textContent        = fmt(net);
          document.getElementById('r-margin').textContent     = marginPct + '%';
          document.getElementById('bd-service').textContent   = lbl + ' package — full breakdown';
          document.getElementById('bd-install').textContent   = '+' + fmt(install);
          document.getElementById('bd-b1').textContent        = bundles;
          document.getElementById('bd-b2').textContent        = bundles;
          document.getElementById('bd-markup').textContent    = '$' + markup;
          document.getElementById('bd-cost').textContent      = '$' + cost;
          document.getElementById('bd-haircharge').textContent = '+' + fmt(hairCharge);
          document.getElementById('bd-bspcost').textContent   = '-' + fmt(bspCost);
          document.getElementById('bd-net').textContent       = fmt(net);
          document.getElementById('m-4').textContent          = fmt(net * 4);
          document.getElementById('m-10').textContent         = fmt(net * 10);
          document.getElementById('m-20').textContent         = fmt(net * 20);
        }

        // Wire up inputs
        ['install','cost','markup','bundles'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.addEventListener('input', calc);
        });
        calc();
      `}} />
    </>
  );
}

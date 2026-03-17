'use client';

export default function FastTrackPage() {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Mini Nav */
    .mini-nav {
      background-color: #0A0A0A;
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(250, 106, 39, 0.2);
    }

    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .logo {
      font-family: 'Outfit', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.5px;
    }

    .member-tag {
      background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
      color: #fff;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
      padding: 80px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(250, 106, 39, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 700px;
      margin: 0 auto;
    }

    .badge {
      display: inline-block;
      background: rgba(250, 106, 39, 0.15);
      border: 1px solid #FA6A27;
      color: #FA6A27;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 8vw, 64px);
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 16px;
      letter-spacing: -1px;
    }

    .hero-subtitle {
      font-size: 18px;
      color: #ccc;
      line-height: 1.6;
      margin-bottom: 32px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .price-section {
      margin-bottom: 32px;
    }

    .price-main {
      font-family: 'Outfit', sans-serif;
      font-size: 48px;
      font-weight: 700;
      color: #FA6A27;
      margin-bottom: 8px;
    }

    .price-subtext {
      font-size: 16px;
      color: #999;
    }

    .price-crossed {
      text-decoration: line-through;
      color: #666;
      margin-left: 8px;
    }

    .cta-button {
      background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
      color: #fff;
      border: none;
      padding: 18px 48px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      font-family: 'Outfit', sans-serif;
      letter-spacing: 0.5px;
      display: inline-block;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(250, 106, 39, 0.3);
    }

    /* What's Inside */
    .whats-inside {
      padding: 80px 20px;
      background: #fff;
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(32px, 6vw, 48px);
      font-weight: 700;
      color: #0A0A0A;
      text-align: center;
      margin-bottom: 60px;
      letter-spacing: -0.5px;
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .module-card {
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-left: 4px solid #FA6A27;
      padding: 32px;
      border-radius: 8px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .module-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }

    .module-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #0A0A0A;
      margin-bottom: 12px;
    }

    .module-card p {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    /* Value Stack */
    .value-stack {
      background: #f8f8f8;
      padding: 60px 20px;
      margin: 80px 0;
      border-radius: 12px;
    }

    .value-stack h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 28px;
      font-weight: 600;
      color: #0A0A0A;
      margin-bottom: 32px;
      text-align: center;
    }

    .value-items {
      max-width: 500px;
      margin: 0 auto 32px;
    }

    .value-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
      font-size: 15px;
      color: #666;
    }

    .value-item:last-child {
      border-bottom: 2px solid #FA6A27;
      padding-bottom: 12px;
      margin-bottom: 12px;
      font-weight: 600;
      color: #0A0A0A;
    }

    .value-total {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #0A0A0A;
      margin-bottom: 20px;
    }

    .value-yours {
      text-align: center;
      font-size: 28px;
      color: #FA6A27;
      font-weight: 700;
    }

    /* Guarantee */
    .guarantee {
      background: linear-gradient(135deg, rgba(250, 106, 39, 0.05) 0%, rgba(214, 20, 101, 0.05) 100%);
      border: 1px solid rgba(250, 106, 39, 0.2);
      border-radius: 12px;
      padding: 40px;
      margin: 80px 0;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    .guarantee h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #0A0A0A;
      margin-bottom: 12px;
    }

    .guarantee p {
      font-size: 15px;
      color: #666;
      line-height: 1.6;
    }

    /* FAQ */
    .faq {
      padding: 80px 20px;
      background: #fff;
    }

    .faq-container {
      max-width: 700px;
      margin: 0 auto;
    }

    .faq-item {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
    }

    .faq-question {
      background: #f8f8f8;
      padding: 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #0A0A0A;
      transition: background 0.3s ease;
    }

    .faq-question:hover {
      background: #f0f0f0;
    }

    .faq-toggle {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FA6A27;
      font-weight: bold;
      transition: transform 0.3s ease;
    }

    .faq-item.active .faq-toggle {
      transform: rotate(180deg);
    }

    .faq-answer {
      padding: 20px;
      display: none;
      background: #fff;
      font-size: 15px;
      color: #666;
      line-height: 1.6;
      border-top: 1px solid #e0e0e0;
    }

    .faq-item.active .faq-answer {
      display: block;
    }

    /* Final CTA */
    .final-cta {
      background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
      padding: 80px 20px;
      text-align: center;
    }

    .final-cta h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 6vw, 52px);
      font-weight: 700;
      color: #fff;
      margin-bottom: 24px;
      letter-spacing: -0.5px;
    }

    .final-cta p {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 32px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button-white {
      background: #fff;
      color: #FA6A27;
      border: none;
      padding: 18px 48px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      font-family: 'Outfit', sans-serif;
      letter-spacing: 0.5px;
      display: inline-block;
    }

    .cta-button-white:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    /* Footer */
    .footer {
      background: #0A0A0A;
      color: #999;
      padding: 40px 20px;
      text-align: center;
      font-size: 14px;
    }

    .footer a {
      color: #FA6A27;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer a:hover {
      color: #D61465;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero {
        padding: 60px 20px;
      }

      .price-main {
        font-size: 36px;
      }

      .modules-grid {
        grid-template-columns: 1fr;
      }

      .module-card {
        padding: 24px;
      }

      .guarantee {
        padding: 30px 20px;
      }

      .final-cta {
        padding: 60px 20px;
      }

      .faq-question {
        font-size: 15px;
        padding: 16px;
      }
    }
  `;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "Who is this for?",
      answer: "This is perfect for beauty sellers ready to launch their BSP store. If you have your first 3 products ready and want to make your first $1K within 7 days, this is your roadmap."
    },
    {
      question: "Do I need prior sales experience?",
      answer: "Not at all. The Fast Track is designed for complete beginners. Every step is broken down with templates and scripts you can use immediately."
    },
    {
      question: "What if I don't follow the 7-day timeline?",
      answer: "The framework is flexible. While it's optimized for 7 days, you can work through it at your own pace. The tools and scripts remain valuable regardless of your timeline."
    },
    {
      question: "What's included exactly?",
      answer: "You get the complete store launch checklist, 20 DM scripts (4 templates + variations), a 7-day content calendar with caption starters, your 10-action first sale checklist, the 1.55x pricing formula, and exclusive access to the Fast Track community."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Mini Nav */}
      <nav className="mini-nav">
        <div className="nav-content">
          <div className="logo">BeautyShare Pro</div>
          <div className="member-tag">Member Offer</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">BSP Member Exclusive</div>
          <h1>Make Your First $1K in 7 Days</h1>
          <p className="hero-subtitle">
            Your complete launch action plan â DM scripts, pricing guide, content calendar, and first sale checklist.
          </p>
          <div className="price-section">
            <div className="price-main">
              $67 one-time
              <span className="price-crossed">$650 value</span>
            </div>
          </div>
          <button className="cta-button">Get the Fast Track â $67</button>
        </div>
      </section>

      {/* What's Inside */}
      <section className="whats-inside">
        <div className="container">
          <h2 className="section-title">What's Inside</h2>
          <div className="modules-grid">
            <div className="module-card">
              <h3>Days 1-2 â Get Your Store Live in 2 Hours</h3>
              <p>Complete your profile, select your 3 hero products, and set your pricing using the proven 1.55x margin formula.</p>
            </div>
            <div className="module-card">
              <h3>Days 3-4 â 20 Warm Market DM Scripts</h3>
              <p>4 script templates (close friend, acquaintance, someone who asked, cold warm follower) plus follow-up variations to seal the deal.</p>
            </div>
            <div className="module-card">
              <h3>Days 5-7 â 7-Day Content Calendar</h3>
              <p>Daily post types, caption starters, and soft CTAs designed specifically for beauty sellers to build urgency without being pushy.</p>
            </div>
            <div className="module-card">
              <h3>First Sale Checklist â 10 Actions in 72 Hours</h3>
              <p>10 specific actions from profile setup to first order celebration. Follow this and your first sale is nearly guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="whats-inside">
        <div className="container">
          <div className="value-stack">
            <h2>Here's What You're Getting</h2>
            <div className="value-items">
              <div className="value-item">
                <span>Launch Coaching</span>
                <span>$200</span>
              </div>
              <div className="value-item">
                <span>DM Templates & Scripts</span>
                <span>$150</span>
              </div>
              <div className="value-item">
                <span>Content Calendar</span>
                <span>$150</span>
              </div>
              <div className="value-item">
                <span>Pricing Guide & Formula</span>
                <span>$150</span>
              </div>
              <div className="value-item">
                <span style={{ fontWeight: 'bold' }}>Total Value</span>
                <span style={{ fontWeight: 'bold' }}>$650</span>
              </div>
            </div>
            <div className="value-yours">
              Yours for just $67
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="whats-inside">
        <div className="container">
          <div className="guarantee">
            <h3>Our Guarantee</h3>
            <p>
              If you follow every step and don't make a sale in 14 days, DM @BecomingChanelD for a full refund. We stand behind our system.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to Make Your First $1K?</h2>
          <p>Stop waiting. Start selling. Get the Fast Track today and launch your store in 7 days.</p>
          <button className="cta-button-white">Get the Fast Track â $67</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 BeautyShare Pro. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
        </div>
      </footer>
    </>
  );
}

import React from 'react';

'use client';

import React from 'react';

export default function MarketingPlaybookPage() {
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
      border-bottom: 1px solid rgba(214, 20, 101, 0.2);
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

    .premium-tag {
      background: linear-gradient(135deg, #D61465 0%, #DCBDEF 100%);
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
      background: radial-gradient(circle, rgba(214, 20, 101, 0.1) 0%, transparent 70%);
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
      background: rgba(214, 20, 101, 0.15);
      border: 1px solid #D61465;
      color: #D61465;
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
      color: #D61465;
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
      background: linear-gradient(135deg, #D61465 0%, #DCBDEF 100%);
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
      box-shadow: 0 10px 30px rgba(214, 20, 101, 0.3);
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
      border-left: 4px solid #D61465;
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
      background: linear-gradient(135deg, rgba(214, 20, 101, 0.05) 0%, rgba(220, 189, 239, 0.05) 100%);
      padding: 60px 20px;
      margin: 80px 0;
      border-radius: 12px;
      border: 1px solid rgba(214, 20, 101, 0.1);
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
      border-bottom: 1px solid rgba(214, 20, 101, 0.2);
      font-size: 15px;
      color: #666;
    }

    .value-item:last-child {
      border-bottom: 2px solid #D61465;
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
      color: #D61465;
      font-weight: 700;
    }

    /* Guarantee */
    .guarantee {
      background: linear-gradient(135deg, rgba(214, 20, 101, 0.05) 0%, rgba(220, 189, 239, 0.05) 100%);
      border: 1px solid rgba(214, 20, 101, 0.2);
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
      color: #D61465;
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
      background: linear-gradient(135deg, #D61465 0%, #DCBDEF 100%);
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
      color: #D61465;
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
      color: #D61465;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer a:hover {
      color: #DCBDEF;
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
      question: "How long does it take to see results?",
      answer: "Most users report their first sale within 7-14 days of implementing the Instagram Growth Engine and DM strategy. Email and referral systems build long-term momentum over weeks and months."
    },
    {
      question: "Do I need existing followers or a big audience?",
      answer: "No. This playbook is designed for sellers starting from zero. The Instagram Growth Engine works with organic growth strategies and the paid ads component lets you reach new audiences with just $5/day."
    },
    {
      question: "Can I use this if I'm already making sales?",
      answer: "Absolutely. This is built to scale. If you're already selling, these systems will help you reach more people, build repeat buyers, and create predictable revenue streams through referrals and email."
    },
    {
      question: "What if my followers don't engage?",
      answer: "The playbook includes specific content pillars and Reels formulas proven to work for hair brands. If your current content isn't converting, these strategies will show you exactly what to post and why."
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
          <div className="premium-tag">Premium Add-On</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">Complete Marketing System</div>
          <h1>Go from Zero to Consistent Sales</h1>
          <p className="hero-subtitle">
            The full marketing system â Instagram growth, paid ads, email, repeat buyers, and referrals.
          </p>
          <div className="price-section">
            <div className="price-main">
              $197 one-time
              <span className="price-crossed">$1,050 value</span>
            </div>
          </div>
          <button className="cta-button">Get the Marketing Playbook â $197</button>
        </div>
      </section>

      {/* What's Inside */}
      <section className="whats-inside">
        <div className="container">
          <h2 className="section-title">What's Inside</h2>
          <div className="modules-grid">
            <div className="module-card">
              <h3>Instagram Growth Engine</h3>
              <p>Proven hashtag strategy, content pillars, and Reels formula specifically designed for hair brands to attract your ideal customer.</p>
            </div>
            <div className="module-card">
              <h3>Paid Ads Starter Kit</h3>
              <p>Learn how to run profitable $5/day Meta ads, target your ideal audience, and scale what works with done-for-you ad copy templates.</p>
            </div>
            <div className="module-card">
              <h3>Email List Builder</h3>
              <p>Lead magnet templates designed to convert, plus a complete 5-email welcome sequence that educates and sells simultaneously.</p>
            </div>
            <div className="module-card">
              <h3>Repeat Buyer System</h3>
              <p>Build customer loyalty with proven loyalty program structures, automated reorder reminders, and VIP tier systems that drive lifetime value.</p>
            </div>
            <div className="module-card">
              <h3>Referral Machine</h3>
              <p>Tap into word-of-mouth growth with referral cards, DM scripts, and ambassador program templates that turn buyers into promoters.</p>
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
                <span>Instagram Growth Strategy</span>
                <span>$250</span>
              </div>
              <div className="value-item">
                <span>Paid Ads Training & Templates</span>
                <span>$200</span>
              </div>
              <div className="value-item">
                <span>Email Marketing System</span>
                <span>$200</span>
              </div>
              <div className="value-item">
                <span>Repeat Buyer Framework</span>
                <span>$200</span>
              </div>
              <div className="value-item">
                <span>Referral Program Template</span>
                <span>$200</span>
              </div>
              <div className="value-item">
                <span style={{ fontWeight: 'bold' }}>Total Value</span>
                <span style={{ fontWeight: 'bold' }}>$1,050</span>
              </div>
            </div>
            <div className="value-yours">
              Yours for just $197
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
              If you implement this system for 30 days and don't see measurable progress in your sales and customer engagement, DM @BecomingChanelD for a full refund. No questions asked.
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
          <h2>Ready to Go from Zero to Consistent Sales?</h2>
          <p>Stop guessing. Start systematizing. Get the Marketing Playbook today and build your sales engine.</p>
          <button className="cta-button-white">Get the Marketing Playbook â $197</button>
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

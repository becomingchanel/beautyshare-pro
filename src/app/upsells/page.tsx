'use client';

import { useState } from 'react';

export default function UpsellsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background-color: #f9f7f4;
      color: #0a0a0a;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Tab Navigation */
    .tab-nav {
      display: flex;
      gap: 12px;
      margin: 40px 0;
      border-bottom: 2px solid #e2e2e2;
      overflow-x: auto;
      padding-bottom: 0;
      position: sticky;
      top: 0;
      background: linear-gradient(to bottom, #f9f7f4, rgba(249, 247, 244, 0.95));
      z-index: 10;
    }

    .tab-button {
      padding: 16px 24px;
      border: none;
      background: transparent;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      white-space: nowrap;
      color: #666;
    }

    .tab-button.active {
      border-bottom-color: #fa6a27;
      color: #0a0a0a;
    }

    .tab-button:hover {
      color: #fa6a27;
    }

    /* Hero Section */
    .hero {
      text-align: center;
      padding: 60px 20px 40px;
      margin-bottom: 40px;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(250, 106, 39, 0.08) 0%, rgba(214, 20, 101, 0.08) 100%);
    }

    .hero-badge {
      display: inline-block;
      padding: 8px 16px;
      background: #fa6a27;
      color: white;
      border-radius: 24px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }

    .hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .hero .tagline {
      font-size: 18px;
      color: #666;
      max-width: 600px;
      margin: 0 auto 24px;
      line-height: 1.6;
    }

    .price-badge {
      display: inline-block;
      padding: 16px 32px;
      background: #0a0a0a;
      color: white;
      border-radius: 8px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 700;
      margin-top: 16px;
    }

    /* Content Sections */
    .section {
      margin-bottom: 60px;
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 32px;
      text-align: center;
    }

    /* Module Cards */
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .module-card {
      background: white;
      padding: 32px;
      border-radius: 12px;
      border-left: 4px solid;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .module-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .module-card.accent-orange {
      border-left-color: #fa6a27;
    }

    .module-card.accent-pink {
      border-left-color: #d61465;
    }

    .module-card.accent-lavender {
      border-left-color: #dcbdef;
    }

    .module-number {
      font-size: 14px;
      font-weight: 700;
      color: #fa6a27;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .module-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .module-card p {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    /* Value Stack */
    .value-stack {
      background: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .value-stack h3 {
      font-size: 16px;
      font-weight: 600;
      color: #666;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value-comparison {
      display: flex;
      justify-content: center;
      gap: 40px;
      align-items: center;
      flex-wrap: wrap;
    }

    .value-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .value-original {
      font-family: 'Cormorant Garamond', serif;
      font-size: 32px;
      font-weight: 700;
      color: #999;
      text-decoration: line-through;
      margin-bottom: 8px;
    }

    .value-label {
      font-size: 12px;
      color: #999;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value-arrow {
      font-size: 28px;
      color: #fa6a27;
      font-weight: 700;
    }

    .value-your-price {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .value-your-price-amount {
      font-family: 'Cormorant Garamond', serif;
      font-size: 48px;
      font-weight: 700;
      color: #fa6a27;
      margin-bottom: 8px;
    }

    .value-your-price-label {
      font-size: 12px;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* FAQ Section */
    .faq-section {
      margin-bottom: 60px;
    }

    .faq-items {
      display: grid;
      gap: 16px;
    }

    .faq-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .faq-question {
      width: 100%;
      padding: 24px;
      background: white;
      border: none;
      text-align: left;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s ease;
    }

    .faq-question:hover {
      background: #f5f5f5;
    }

    .faq-question.active {
      background: #fa6a27;
      color: white;
    }

    .faq-icon {
      font-size: 20px;
      transition: transform 0.3s ease;
    }

    .faq-question.active .faq-icon {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding: 0 24px;
      background: #fafafa;
    }

    .faq-question.active + .faq-answer {
      max-height: 300px;
      padding: 24px;
    }

    .faq-answer p {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, rgba(250, 106, 39, 0.1) 0%, rgba(214, 20, 101, 0.1) 100%);
      border-radius: 12px;
      margin-bottom: 60px;
    }

    .cta-button {
      display: inline-block;
      padding: 18px 48px;
      background: #fa6a27;
      color: white;
      text-decoration: none;
      border: none;
      border-radius: 8px;
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: none;
    }

    .cta-button:hover {
      background: #d61465;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(250, 106, 39, 0.3);
    }

    /* Footer */
    .footer {
      background: #0a0a0a;
      color: white;
      padding: 40px;
      text-align: center;
      border-top: 1px solid #222;
    }

    .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .footer-text {
      font-size: 14px;
      color: #999;
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 36px;
      }

      .section-title {
        font-size: 28px;
      }

      .modules-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .value-comparison {
        gap: 20px;
      }

      .value-original {
        font-size: 24px;
      }

      .value-your-price-amount {
        font-size: 36px;
      }

      .tab-nav {
        gap: 8px;
      }

      .tab-button {
        padding: 12px 16px;
        font-size: 14px;
      }

      .price-badge {
        font-size: 28px;
        padding: 12px 24px;
      }

      .module-card {
        padding: 24px;
      }

      .value-stack {
        padding: 24px;
      }

      .cta-button {
        padding: 16px 32px;
        font-size: 16px;
      }
    }
  `;

  const products = [
    {
      id: 0,
      name: 'First $1K Fast Track',
      price: 67,
      badge: 'ORDER BUMP',
      tagline: 'Your 7-Day Launch Action Plan, DM Scripts, Pricing Guide & First Sale Checklist',
      accentColor: '#fa6a27',
      modules: [
        {
          number: 'Module 1',
          title: 'Days 1-2: BSP Setup & Storefront',
          description: 'Get your store live in 2 hours, pricing formula (wholesale × 1.55)'
        },
        {
          number: 'Module 2',
          title: 'Days 3-4: 20 Warm Market DM Scripts',
          description: '4 script templates for close friends, acquaintances, someone who asked about your hair, cold warm followers. Plus follow-up scripts.'
        },
        {
          number: 'Module 3',
          title: 'Days 5-7: Content Calendar + Captions',
          description: '7-day posting schedule with hooks and CTAs'
        },
        {
          number: 'Module 4',
          title: 'First Sale Checklist',
          description: '10 actions in 72 hours to get your first paid order'
        }
      ],
      valueOriginal: '$650+',
      valueYourPrice: '$67',
      faqs: [
        {
          q: 'How long does it take to complete the Fast Track?',
          a: 'The entire program is designed to be completed in 7 days. Each module is structured with daily action items that take 30-60 minutes to complete.'
        },
        {
          q: 'Will I get my first sale with this?',
          a: 'The Fast Track is optimized to get your first paid order within 72 hours of launch. Success depends on executing the checklist and DM scripts with your warm market.'
        },
        {
          q: 'What if I\'ve already launched my store?',
          a: 'The DM Scripts and Content Calendar are still valuable even if you\'ve launched. You can implement them immediately to start getting sales.'
        }
      ]
    },
    {
      id: 1,
      name: 'BSP Marketing Playbook',
      price: 197,
      badge: 'POST-CHECKOUT UPSELL',
      tagline: 'The complete marketing system to go from 0 to consistent sales',
      accentColor: '#d61465',
      modules: [
        {
          number: 'Module 1',
          title: 'Instagram Growth Engine',
          description: 'Hashtag strategy, content pillars, Reels formula'
        },
        {
          number: 'Module 2',
          title: 'Paid Ads Starter Kit',
          description: '$5/day Meta ads, audience targeting for hair, ad copy templates'
        },
        {
          number: 'Module 3',
          title: 'Email List Builder',
          description: 'Lead magnet templates, 5-email welcome sequence, monthly newsletter template'
        },
        {
          number: 'Module 4',
          title: 'Repeat Buyer System',
          description: 'Loyalty program setup, reorder reminders, VIP tier structure'
        },
        {
          number: 'Module 5',
          title: 'Referral Machine',
          description: 'Referral card templates, DM scripts, ambassador program framework'
        }
      ],
      valueOriginal: '$1,050+',
      valueYourPrice: '$197',
      faqs: [
        {
          q: 'Can I start paid ads with a small budget?',
          a: 'Absolutely! The Paid Ads Starter Kit is specifically designed for $5/day budgets. We show you exact targeting, ad copy, and optimization strategies for maximum ROI on minimal spend.'
        },
        {
          q: 'How long before I see results from these strategies?',
          a: 'Instagram organic growth takes 4-8 weeks to compound. Paid ads can generate leads within 48 hours. Email sequences typically see 20-30% open rates and 5-10% conversion rates within the first week.'
        },
        {
          q: 'What if I don\'t have an email list yet?',
          a: 'The Email List Builder module starts you from zero. It includes lead magnet templates, landing pages, and a complete 5-email welcome sequence to build your list from scratch.'
        },
        {
          q: 'Is this specific to hair extensions?',
          a: 'Yes! Every template, script, and strategy is customized for hair extension sellers. We cover pricing psychology, quality objections, and loyalty tactics specific to the beauty industry.'
        }
      ]
    },
    {
      id: 2,
      name: 'Stylist Accelerator Pack',
      price: 97,
      badge: 'ORDER BUMP',
      tagline: 'Start offering Install + Hair extension packages to your clients through BeautyShare Pro',
      accentColor: '#dcbdef',
      modules: [
        {
          number: 'Module 1',
          title: 'Package Pricing Blueprint',
          description: 'How to price Quick Weave, Sew-in, K-tip, Braids + raw hair bundles for $400-$800 profit per client'
        },
        {
          number: 'Module 2',
          title: 'Client Booking Scripts',
          description: 'DM scripts, email templates, booking page bio copy for Vagaro/Square/StyleSeat'
        },
        {
          number: 'Module 3',
          title: 'BSP Ordering Workflow',
          description: 'Step-by-step from client booking to white-label delivery to your salon'
        },
        {
          number: 'Module 4',
          title: 'Interactive Profit Calculator',
          description: 'Link to /stylist-calculator for real-time pricing and profit projections'
        }
      ],
      valueOriginal: '$500+',
      valueYourPrice: '$97',
      faqs: [
        {
          q: 'How much can I profit per install?',
          a: 'With our pricing blueprint, stylists are making $400-$800 profit per client. This depends on the service (Quick Weave vs. Sew-in) and hair quality. Use our Profit Calculator to see exact numbers for your pricing.'
        },
        {
          q: 'Do I need my own salon to use this?',
          a: 'No! Whether you work from home, rent a chair, or own a salon, the Stylist Accelerator applies. We show you how to structure packages and billing regardless of your setup.'
        },
        {
          q: 'What if my clients book through Vagaro/Square/StyleSeat?',
          a: 'We provide copy-and-paste bio text and DM scripts for all three platforms. You\'ll learn exactly what to say to upsell install packages and position BeautyShare Pro as your supplier.'
        },
        {
          q: 'Is the Profit Calculator included?',
          a: 'Yes! You\'ll get lifetime access to our interactive Profit Calculator at /stylist-calculator. Update your pricing anytime and see real-time profit projections.'
        }
      ]
    }
  ];

  const product = products[activeTab];

  const toggleFaq = (index: number) => {
    const faqButton = document.querySelector(`[data-faq="${index}"]`);
    if (faqButton) {
      faqButton.classList.toggle('active');
    }
  };

  const getCardAccent = (productId: number) => {
    if (productId === 0) return 'accent-orange';
    if (productId === 1) return 'accent-pink';
    return 'accent-lavender';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="container">
        {/* Tab Navigation */}
        <nav className="tab-nav">
          {products.map((p, idx) => (
            <button
              key={idx}
              className={`tab-button ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {p.name}
            </button>
          ))}
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">{product.badge}</div>
          <h1>{product.name}</h1>
          <p className="tagline">{product.tagline}</p>
          <div className="price-badge">${product.price}</div>
        </section>

        {/* What's Inside Section */}
        <section className="section">
          <h2 className="section-title">What's Inside</h2>
          <div className="modules-grid">
            {product.modules.map((module, idx) => (
              <div key={idx} className={`module-card ${getCardAccent(product.id)}`}>
                <div className="module-number">{module.number}</div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Value Stack Section */}
        <section className="value-stack">
          <h3>Compare Your Value</h3>
          <div className="value-comparison">
            <div className="value-item">
              <div className="value-original">{product.valueOriginal}</div>
              <div className="value-label">Real Market Value</div>
            </div>
            <div className="value-arrow">→</div>
            <div className="value-your-price">
              <div className="value-your-price-amount">{product.valueYourPrice}</div>
              <div className="value-your-price-label">Your Price Today</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-items">
            {product.faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  data-faq={idx}
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">⌄</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <button className="cta-button" onClick={() => alert(`Added "${product.name}" to cart!`)}>
            {activeTab === 0 && 'Add to My Order — $67'}
            {activeTab === 1 && 'Get the Marketing Playbook — $197'}
            {activeTab === 2 && 'Get the Stylist Pack — $97'}
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">BeautyShare Pro</div>
        <p className="footer-text">
          Empowering beauty entrepreneurs to scale their business through education, community, and proven systems.
        </p>
      </footer>
    </>
  );
}

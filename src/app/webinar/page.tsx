'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  businessStage: string;
}

interface FormState {
  data: FormData;
  submitted: boolean;
  loading: boolean;
  error: string;
}

export default function WebinarPage() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [formState, setFormState] = useState<FormState>({
    data: {
      firstName: '',
      email: '',
      phone: '',
      businessStage: 'Just Starting',
    },
    submitted: false,
    loading: false,
    error: '',
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculate countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Next Thursday at 7 PM CST
      let target = new Date(now);
      const daysUntilThursday = (4 - now.getDay() + 7) % 7 || 7;
      target.setDate(target.getDate() + daysUntilThursday);
      target.setHours(19, 0, 0, 0); // 7 PM

      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true, error: '' }));

    try {
      // TODO: Connect to GHL webhook
      // For now, simulate submission with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      setFormState(prev => ({
        ...prev,
        submitted: true,
        loading: false,
      }));

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          submitted: false,
          data: {
            firstName: '',
            email: '',
            phone: '',
            businessStage: 'Just Starting',
          },
        }));
      }, 3000);
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: 'Something went wrong. Please try again.',
      }));
    }
  };

  const faqs = [
    {
      question: 'What do I need to join the webinar?',
      answer: 'Just a computer or phone with internet connection and a willingness to learn! You\'ll receive a Zoom link via email after registration.',
    },
    {
      question: 'Will this webinar teach me how to sell hair?',
      answer: 'Yes! We\'ll cover the complete BSP wholesale model, pricing strategies for 50-70% margins, and a 7-day launch playbook to get your first sale.',
    },
    {
      question: 'Is this for complete beginners?',
      answer: 'Absolutely! Whether you\'re just starting or looking to scale an existing brand, this masterclass has valuable insights. We cover everything from the basics to advanced scaling tactics.',
    },
    {
      question: 'What if I can\'t make it live?',
      answer: 'Everyone who registers gets a replay link sent via email within 24 hours of the live event, so you won\'t miss out!',
    },
    {
      question: 'Will I have to buy anything?',
      answer: 'No! This is a completely free live masterclass. No hidden costs, no upsells during the webinar.',
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Outfit', sans-serif;
          color: #0A0A0A;
          line-height: 1.6;
        }

        .nav {
          background: #0A0A0A;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #FA6A27;
          letter-spacing: -0.5px;
        }

        .nav-badge {
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .hero {
          background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 50%, rgba(250, 106, 39, 0.1) 100%);
          padding: 4rem 2rem;
          text-align: center;
          color: white;
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
          background: radial-gradient(circle, rgba(250, 106, 39, 0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(214, 20, 101, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(250, 106, 39, 0.2);
          border: 1px solid #FA6A27;
          color: #FA6A27;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, white 0%, #E2AD37 50%, #FA6A27 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #ddd;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .countdown-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .countdown-number {
          font-family: 'Outfit', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .countdown-label {
          font-size: 0.875rem;
          color: #999;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .registration-section {
          background: white;
          padding: 3rem 2rem;
          max-width: 500px;
          margin: -100px auto 0;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 10;
        }

        .form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #0A0A0A;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          font-family: 'Outfit', sans-serif;
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #0A0A0A;
          font-size: 0.95rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #FA6A27;
          box-shadow: 0 0 0 3px rgba(250, 106, 39, 0.1);
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .form-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(250, 106, 39, 0.3);
        }

        .form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background: #f0f9f7;
          border: 2px solid #4CAF50;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          color: #2E7D32;
          font-weight: 600;
          margin-top: 1rem;
        }

        .error-message {
          background: #fef2f2;
          border: 2px solid #ef4444;
          border-radius: 8px;
          padding: 1rem;
          color: #991b1b;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .benefits-section {
          padding: 4rem 2rem;
          background: #f8f8f8;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: #0A0A0A;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .benefit-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          text-align: center;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(250, 106, 39, 0.2);
        }

        .benefit-number {
          font-family: 'Outfit', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .benefit-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #0A0A0A;
        }

        .benefit-text {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .host-section {
          padding: 4rem 2rem;
          background: white;
        }

        .host-container {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .host-avatar {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          color: white;
          font-weight: 700;
        }

        .host-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0A0A0A;
          margin-bottom: 0.5rem;
        }

        .host-title {
          color: #FA6A27;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .host-bio {
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.8;
          font-size: 1rem;
        }

        .host-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #FA6A27;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #999;
          margin-top: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .host-socials {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .social-link {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 700;
        }

        .social-link:hover {
          transform: scale(1.1) translateY(-3px);
        }

        .proof-section {
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #FA6A27 0%, #D61465 100%);
          color: white;
          text-align: center;
        }

        .proof-text {
          font-size: 1.5rem;
          font-weight: 600;
          max-width: 600px;
          margin: 0 auto;
        }

        .proof-number {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 2rem;
        }

        .faq-section {
          padding: 4rem 2rem;
          background: #f8f8f8;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          margin-bottom: 1rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #0A0A0A;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(250, 106, 39, 0.05);
        }

        .faq-toggle {
          font-size: 1.5rem;
          color: #FA6A27;
          transition: transform 0.3s ease;
          line-height: 1;
        }

        .faq-toggle.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          color: #666;
          line-height: 1.8;
          border-top: 1px solid #e0e0e0;
        }

        .final-cta {
          background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
          padding: 4rem 2rem;
          text-align: center;
          color: white;
        }

        .final-cta .section-title {
          color: white;
          margin-bottom: 2rem;
        }

        .footer {
          background: #0A0A0A;
          color: #999;
          text-align: center;
          padding: 2rem;
          font-size: 0.9rem;
          border-top: 1px solid #222;
        }

        @media (max-width: 768px) {
          .nav {
            padding: 1rem;
            gap: 1rem;
          }

          .nav-logo {
            font-size: 1.25rem;
          }

          .nav-badge {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }

          .hero {
            padding: 2rem 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .countdown-container {
            gap: 1rem;
          }

          .countdown-number {
            font-size: 2rem;
          }

          .registration-section {
            margin: -50px 1rem 0;
            padding: 2rem 1.5rem;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .host-stats {
            gap: 1.5rem;
          }

          .proof-text {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .countdown-container {
            gap: 0.75rem;
          }

          .countdown-number {
            font-size: 1.5rem;
          }

          .countdown-label {
            font-size: 0.75rem;
          }

          .form-submit {
            font-size: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .host-avatar {
            width: 100px;
            height: 100px;
            font-size: 2rem;
          }

          .host-name {
            font-size: 1.5rem;
          }

          .host-stats {
            gap: 1rem;
            padding: 0 1rem;
          }

          .proof-text {
            font-size: 1.1rem;
          }
        }
      `}} />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">BeautyShare Pro</div>
        <div className="nav-badge">Free Masterclass</div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Free Live Masterclass</div>
          <h1 className="hero-title">Launch Your Hair Business in 30 Days — No Inventory Required</h1>
          <p className="hero-subtitle">
            Join Chanel D (@BecomingChanelD) to learn the BeautyShare Pro wholesale model and launch your first sales in just one week.
          </p>

          {/* Countdown Timer */}
          <div className="countdown-container">
            <div className="countdown-item">
              <div className="countdown-number">{countdown.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{countdown.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="registration-section">
        {formState.submitted ? (
          <div className="success-message">
            ✓ Thank you, {formState.data.firstName}! Check your email for the webinar details and Zoom link. See you Thursday at 7 PM CST!
          </div>
        ) : (
          <>
            <h2 className="form-title">Save Your Seat</h2>
            <p className="form-subtitle">Next Thursday at 7 PM CST — 100% Free</p>

            {formState.error && <div className="error-message">{formState.error}</div>}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="firstName"
                  value={formState.data.firstName}
                  onChange={handleFormChange}
                  placeholder="Your first name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={formState.data.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (Optional)</label>
                <input
                  type="tel"
                  className="form-input"
                  name="phone"
                  value={formState.data.phone}
                  onChange={handleFormChange}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Where are you in your hair business?</label>
                <select
                  className="form-select"
                  name="businessStage"
                  value={formState.data.businessStage}
                  onChange={handleFormChange}
                >
                  <option>Just Starting</option>
                  <option>Have a Brand</option>
                  <option>Stylist Adding Hair</option>
                </select>
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={formState.loading}
              >
                {formState.loading ? 'Saving your seat...' : 'Save My Seat →'}
              </button>
            </form>
          </>
        )}
      </section>

      {/* What You'll Learn Section */}
      <section className="benefits-section">
        <h2 className="section-title">What You'll Learn</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-number">1</div>
            <h3 className="benefit-title">The BSP Model</h3>
            <p className="benefit-text">
              How the BeautyShare Pro wholesale + fulfillment model works and why it's the fastest path to launch without inventory risk.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-number">2</div>
            <h3 className="benefit-title">Pricing for Profits</h3>
            <p className="benefit-text">
              Master the formula to price raw hair for 50-70% margins and maximize your earnings on every sale.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-number">3</div>
            <h3 className="benefit-title">7-Day Launch Playbook</h3>
            <p className="benefit-text">
              Get the step-by-step playbook to go from zero to your first sale in just seven days with real customer strategies.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-number">4</div>
            <h3 className="benefit-title">AI Ads Engine</h3>
            <p className="benefit-text">
              Learn how to use our AI Ads Engine to scale your hair business and reach thousands of qualified buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="host-section">
        <div className="host-container">
          <div className="host-avatar">CD</div>
          <h2 className="host-name">Chanel D</h2>
          <p className="host-title">@BecomingChanelD — Hair Business Educator</p>
          <p className="host-bio">
            Chanel D has built a global audience of over 150K followers across YouTube, TikTok, and Instagram by teaching aspiring entrepreneurs how to launch profitable hair businesses. She's the host of BeautyShare Pro's most popular masterclass series.
          </p>

          <div className="host-stats">
            <div className="stat">
              <div className="stat-number">78K</div>
              <div className="stat-label">YouTube</div>
            </div>
            <div className="stat">
              <div className="stat-number">30K</div>
              <div className="stat-label">TikTok</div>
            </div>
            <div className="stat">
              <div className="stat-number">50K</div>
              <div className="stat-label">Instagram</div>
            </div>
          </div>

          <div className="host-socials">
            <a href="https://youtube.com" className="social-link" title="YouTube">
              ▶
            </a>
            <a href="https://tiktok.com" className="social-link" title="TikTok">
              ♪
            </a>
            <a href="https://instagram.com" className="social-link" title="Instagram">
              📷
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="proof-section">
        <div className="proof-text">
          <span className="proof-number">10,000+</span> entrepreneurs have watched Chanel's hair business content and launched their brands.
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">Common Questions</h2>

          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className={`faq-toggle ${expandedFaq === index ? 'open' : ''}`}>
                  ▼
                </span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <h2 className="section-title">Ready to Launch Your Hair Business?</h2>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Your first name"
                value={formState.data.firstName}
                onChange={(e) =>
                  setFormState(prev => ({
                    ...prev,
                    data: { ...prev.data, firstName: e.target.value },
                  }))
                }
                required
                style={{ marginBottom: '1rem' }}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formState.data.email}
                onChange={(e) =>
                  setFormState(prev => ({
                    ...prev,
                    data: { ...prev.data, email: e.target.value },
                  }))
                }
                required
                style={{ marginBottom: '1rem' }}
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={formState.loading}
            >
              {formState.loading ? 'Saving your seat...' : 'Save My Seat →'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2026 BeautyShare Pro. All rights reserved. | Free Webinar with Chanel D
      </footer>
    </>
  );
}

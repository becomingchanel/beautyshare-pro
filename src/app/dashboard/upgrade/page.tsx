'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function UpgradePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      popular: false,
      current: false,
      description: 'Perfect for getting started',
      features: [
        { text: '50 orders/month', included: true },
        { text: '1 product store', included: true },
        { text: 'Basic calculators', included: true },
        { text: 'Email support', included: true },
        { text: '3 product stores', included: false },
        { text: 'Partner program', included: false },
        { text: 'Advanced analytics', included: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 149,
      popular: true,
      current: true,
      description: 'Most popular for established businesses',
      features: [
        { text: 'Unlimited orders', included: true },
        { text: '3 product stores', included: true },
        { text: 'All calculators', included: true },
        { text: 'Priority support', included: true },
        { text: 'Partner program access', included: true },
        { text: 'Content creation tools', included: true },
        { text: 'Sales forecasting', included: true },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      popular: false,
      current: false,
      description: 'For large-scale operations',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'White-label solution', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom SLA', included: true },
      ],
    },
  ];

  const comparisonFeatures = [
    { category: 'Orders & Stores', items: [
      { name: 'Monthly Orders', starter: '50', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Product Stores', starter: '1', pro: '3', enterprise: 'Unlimited' },
      { name: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
    ]},
    { category: 'Features', items: [
      { name: 'Basic Calculators', starter: '✓', pro: '✓', enterprise: '✓' },
      { name: 'All Calculators', starter: '✗', pro: '✓', enterprise: '✓' },
      { name: 'Content Tools', starter: '✗', pro: '✓', enterprise: '✓' },
      { name: 'Forecasting', starter: '✗', pro: '✓', enterprise: '✓' },
      { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced' },
      { name: 'White-label', starter: '✗', pro: '✗', enterprise: '✓' },
    ]},
    { category: 'Support & Integration', items: [
      { name: 'Email Support', starter: '✓', pro: '✓', enterprise: '✓' },
      { name: 'Priority Support', starter: '✗', pro: '✓', enterprise: '✓' },
      { name: 'API Access', starter: '✗', pro: '✗', enterprise: '✓' },
      { name: 'Custom Integrations', starter: '✗', pro: '✗', enterprise: '✓' },
      { name: 'Dedicated Manager', starter: '✗', pro: '✗', enterprise: '✓' },
    ]},
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade at any time?',
      answer: 'Yes! You can change your plan at any time. If you upgrade mid-month, we\'ll prorate the charges. If you downgrade, the change takes effect at the start of your next billing cycle.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is safe. We keep your data for 30 days after cancellation, giving you time to export it if needed. After 30 days, it will be permanently deleted.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Pay annually and save 20% on any plan. Plus, you\'ll get access to early beta features and priority support.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 14-day free trial of the Pro plan for new users. No credit card required to start. Try out all the features risk-free!',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and ACH transfers for Enterprise plans.',
    },
  ];

  const testimonials = [
    {
      name: 'Maya Patel',
      business: 'Maya\'s Hair Extensions',
      quote: 'BeautyShare Pro has completely transformed how I run my business. The calculators alone saved me hours every week!',
      rating: 5,
    },
    {
      name: 'Jasmine Williams',
      business: 'Jasmine\'s Beauty Supply',
      quote: 'The partner program opened up amazing collaboration opportunities. I\'ve grown my business 3x since joining.',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      business: 'Priya\'s Salon & Studio',
      quote: 'Unlimited orders means I can focus on growing without worrying about hitting a limit. Best investment for my business!',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Unlock Your Full Potential
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan to scale your hair business and reach new heights
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative ${
              plan.popular
                ? 'md:scale-105 md:z-10'
                : ''
            }`}
          >
            <Card
              className={`p-8 flex flex-col h-full transition-all ${
                plan.popular
                  ? 'border-2 border-pink-500 bg-gradient-to-br from-pink-50 to-white'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <Badge className="w-fit mb-4 bg-pink-500 text-white">MOST POPULAR</Badge>
              )}
              {plan.current && (
                <Badge className="w-fit mb-4 bg-purple-500 text-white">CURRENT PLAN</Badge>
              )}

              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{plan.description}</p>

              <div className="my-6">
                <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-6 ${
                  plan.current
                    ? 'bg-gray-200 text-gray-700 cursor-default'
                    : plan.popular
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.current ? 'Current Plan' : plan.popular ? 'Upgrade Now' : 'Get Started'}
              </button>

              {plan.id === 'pro' && (
                <p className="text-xs text-gray-600 text-center mb-6">+ $99 one-time setup fee</p>
              )}

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className={`text-lg mt-0.5 ${
                      feature.included ? '✓' : '✗'
                    }`} style={{ color: feature.included ? '#ec4899' : '#d1d5db' }}>
                    </span>
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Detailed Plan Comparison</h2>
          <p className="text-gray-600 mt-2">See exactly what you get with each plan</p>
        </div>

        {comparisonFeatures.map((category, catIdx) => (
          <Card key={catIdx} className="overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{category.category}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 bg-gray-50 w-48">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-pink-50">Pro</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="border-b border-gray-100">
                      <td className="py-4 px-6 text-gray-900 font-medium">{item.name}</td>
                      <td className="py-4 px-6 text-center text-gray-700">{item.starter}</td>
                      <td className="py-4 px-6 text-center text-gray-700 bg-pink-50 font-semibold text-pink-600">
                        {item.pro}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-700">{item.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="space-y-8 max-w-3xl mx-auto w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Have questions? We have answers</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <Card
              key={idx}
              className="p-6 cursor-pointer transition-all hover:shadow-md"
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <span className={`text-pink-500 text-2xl flex-shrink-0 transition-transform ${
                  expandedFaq === idx ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </div>
              {expandedFaq === idx && (
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials / Social Proof */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Loved by Hair Entrepreneurs</h2>
          <p className="text-gray-600 mt-2">Join thousands of beauty business owners who trust BeautyShare Pro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.business}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-12 text-center text-white space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">Ready to grow your business?</h2>
        <p className="text-white/90">Upgrade to Pro today and unlock unlimited potential. No commitment, cancel anytime.</p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  DollarSign,
  ArrowLeft,
  TrendingUp,
  Calculator,
  Target,
  ShoppingBag,
  Users,
  Percent,
  Clock,
  Bookmark,
  ThumbsUp,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const articles = [
  {
    id: 'pricing-fundamentals',
    title: 'Hair Product Pricing Fundamentals',
    readTime: '9 min read',
    category: 'Fundamentals',
    icon: <DollarSign className="h-5 w-5" />,
    content: [
      {
        heading: 'Understanding Your True Cost',
        text: 'Before setting any price, you need to know your true cost per unit. This includes: product cost (wholesale price per bundle/unit), shipping and import fees, packaging materials, labeling and branding costs, platform fees (Shopify, Stripe, etc.), and a portion of your operating expenses (storage, insurance, tools).',
      },
      {
        heading: 'The Markup Formula',
        text: 'Retail Price = Cost × Markup Multiplier. For hair products, the standard markup is 2.5x to 4x your cost. If a bundle costs you $30, your retail price should be $75–$120. Premium bundles with custom packaging can command 4x–5x markups.',
      },
      {
        heading: 'Keystone Pricing',
        text: 'The simplest approach is keystone pricing: doubling your cost. While this works for accessories (clips, bonnets, etc.), most hair entrepreneurs need higher margins on bundles and closures to cover marketing and customer acquisition costs. Aim for at least 3x on your core products.',
      },
      {
        heading: 'Pricing Tiers',
        text: 'Create 3 pricing tiers: Entry (affordable, good quality — attracts new customers), Standard (your bread and butter — highest volume), and Premium (best quality, custom packaging — highest margin). This captures customers at every price point.',
      },
    ],
  },
  {
    id: 'competitive-pricing',
    title: 'Competitive Pricing Without a Race to the Bottom',
    readTime: '7 min read',
    category: 'Strategy',
    icon: <Target className="h-5 w-5" />,
    content: [
      {
        heading: 'Know Your Market Position',
        text: 'Research 10 competitors in your niche and categorize them: budget (under $60/bundle), mid-range ($60–$120/bundle), and premium ($120+/bundle). Decide where you want to compete and price accordingly.',
      },
      {
        heading: 'Compete on Value, Not Price',
        text: 'The biggest mistake new hair entrepreneurs make is trying to be the cheapest. Instead, add value: better packaging, a branded hair care guide, a custom satin bag, a personalized thank-you card. These cost $2–5 extra but justify $20–40 higher prices.',
      },
      {
        heading: 'Price Anchoring',
        text: 'Always show your premium option first. When customers see a $200 bundle set, a $120 option feels like a great deal. Use bundle deals and sets to increase average order value while making customers feel they are getting more for less.',
      },
      {
        heading: 'When to Match Competitors',
        text: 'Only match a competitor price if they are selling a genuinely similar product to the same audience AND you can still maintain at least a 2x margin. Otherwise, differentiate with better branding, customer experience, and after-purchase support.',
      },
    ],
  },
  {
    id: 'wholesale-pricing',
    title: 'Setting Wholesale Prices for Resellers',
    readTime: '6 min read',
    category: 'Wholesale',
    icon: <ShoppingBag className="h-5 w-5" />,
    content: [
      {
        heading: 'The Wholesale Formula',
        text: 'Wholesale Price = Retail Price × 0.5 (50% off retail). This means you need at least a 2x markup on your cost to break even at wholesale. Ideally, your cost-to-retail ratio supports a profitable wholesale channel.',
      },
      {
        heading: 'Minimum Order Requirements',
        text: 'Set minimum order quantities (MOQ) for wholesale: $500 minimum for first orders, $300 minimum for reorders. This filters out non-serious buyers and ensures each wholesale transaction is worth your time.',
      },
      {
        heading: 'Tiered Wholesale Pricing',
        text: 'Reward volume: 10–24 units at 40% off retail, 25–49 units at 45% off retail, 50+ units at 50% off retail. This encourages larger orders and builds loyalty with your best wholesale customers.',
      },
      {
        heading: 'Protecting Your Retail Price',
        text: 'Include a Minimum Advertised Price (MAP) policy in your wholesale agreement. This prevents resellers from undercutting your retail price and protects your brand value.',
      },
    ],
  },
  {
    id: 'bundle-deals',
    title: 'Creating Profitable Bundle Deals',
    readTime: '5 min read',
    category: 'Sales',
    icon: <ShoppingBag className="h-5 w-5" />,
    content: [
      {
        heading: 'Why Bundles Work',
        text: 'Bundle deals increase your average order value by 35–50%. Customers perceive bundles as a better value, and you move more inventory per transaction. This is the single most effective pricing strategy for hair businesses.',
      },
      {
        heading: 'Bundle Structure',
        text: 'The Sweet Spot Bundle: 3 bundles + closure at 15–20% less than buying separately. The Full Sew-In Bundle: 3–4 bundles + closure + frontal at 20–25% off. The Starter Kit: 2 bundles + closure + care kit at 10–15% off. Each tier serves a different customer need.',
      },
      {
        heading: 'Pricing the Discount',
        text: 'Never discount more than 25% on bundles. Calculate your bundle price to ensure at least a 2x margin on the entire set. The perceived savings should feel significant to the customer while keeping you profitable.',
      },
    ],
  },
  {
    id: 'seasonal-pricing',
    title: 'Seasonal Pricing & Promotional Strategy',
    readTime: '6 min read',
    category: 'Calendar',
    icon: <BarChart3 className="h-5 w-5" />,
    content: [
      {
        heading: 'Hair Industry Seasons',
        text: 'Peak seasons: Valentine\u2019s Day (February), Prom/Graduation (April\u2013June), Back to School (August), Holiday Season (November\u2013December). Slow seasons: January, July. Plan your pricing strategy around these natural demand cycles.',
      },
      {
        heading: 'Peak Season Strategy',
        text: 'During peak demand, resist the urge to discount heavily. Instead: introduce limited-edition bundles at premium prices, offer bundle-only deals (higher AOV), run early-bird specials 2 weeks before the season peaks, and use urgency ("only 20 sets available").',
      },
      {
        heading: 'Slow Season Strategy',
        text: 'Use slow seasons to: clear older inventory with flash sales (up to 30% off), introduce new textures or lengths at introductory pricing, run "buy now, install later" promotions, and focus on customer retention with loyalty rewards.',
      },
    ],
  },
  {
    id: 'price-increases',
    title: 'When & How to Raise Your Prices',
    readTime: '5 min read',
    category: 'Growth',
    icon: <TrendingUp className="h-5 w-5" />,
    content: [
      {
        heading: 'Signs It Is Time to Raise Prices',
        text: 'Your costs have increased by 10% or more. You are consistently selling out within days. Your margins have dropped below 2x. You have added value (better packaging, shipping upgrades, loyalty program). Your brand reputation has grown significantly.',
      },
      {
        heading: 'How to Raise Prices Gracefully',
        text: 'Announce the increase 2–4 weeks in advance. Explain the why — customers respect transparency (e.g., "We have upgraded to 100% virgin hair from a new premium source"). Offer existing customers a grace period or a last-chance deal at the old price.',
      },
      {
        heading: 'How Much to Increase',
        text: 'Increase by 10–15% at a time, no more than twice per year. A $100 bundle going to $110–$115 is acceptable. A jump from $100 to $140 will lose customers. Small, justifiable increases build a sustainable business over time.',
      },
    ],
  },
];

export default function PricingGuidance() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  };

  const activeContent = articles.find((a) => a.id === activeArticle);

  return (
    <DashboardLayout title="Pricing Guidance" description="Master profitable pricing strategies for your hair business">
      <Link
        href="/dashboard/resources"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
        style={{ color: 'hsl(var(--accent))' }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Resources
      </Link>

      {/* Header Card */}
      <div
        className="mb-8 rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <DollarSign className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Pricing Guidance</h2>
            <p className="text-sm text-white/80 mt-0.5">{articles.length} guides to profitable pricing</p>
          </div>
        </div>
      </div>

      {/* Quick Tip Card */}
      <div className="mb-8 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(var(--muted))' }}>
            <Calculator className="h-5 w-5" style={{ color: 'hsl(var(--accent))' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Quick Pricing Formula</p>
            <p className="text-xs text-muted-foreground mt-1">
              Retail Price = (Product Cost + Shipping + Packaging) × 3. For a bundle costing $35 total, price at $105. Adjust up for premium positioning, down for entry-level.
            </p>
          </div>
        </div>
      </div>

      {activeArticle && activeContent ? (
        <div>
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
            style={{ color: 'hsl(var(--accent))' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </button>

          <div className="rounded-2xl bg-white p-8 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--accent))' }}>
                  {activeContent.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--primary))' }}>{activeContent.category}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span className="text-xs text-muted-foreground/70">{activeContent.readTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleBookmark(activeContent.id)}
                className="rounded-lg p-2 transition-colors"
                style={{ backgroundColor: bookmarked.includes(activeContent.id) ? 'hsl(var(--muted))' : 'hsl(var(--background))', color: bookmarked.includes(activeContent.id) ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))' }}
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-8">{activeContent.title}</h1>

            <div className="space-y-6">
              {activeContent.content.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-foreground mb-2">{section.heading}</h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid hsl(var(--border))' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground/70" />
                  <span className="text-sm text-muted-foreground">Was this helpful?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: 'hsl(var(--accent))' }}>
                    Yes, thanks!
                  </button>
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 bg-muted hover:bg-gray-200 transition-colors">
                    Needs more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => setActiveArticle(article.id)}
              className="group rounded-2xl bg-white p-5 shadow-sm text-left transition-all hover:shadow-md"
              style={{ border: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--primary))' }}>
                  {article.icon}
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--primary))' }}>
                  {article.category}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground group-hover:text-gray-700">{article.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                  <span className="text-xs text-muted-foreground/70">{article.readTime}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                  Read →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

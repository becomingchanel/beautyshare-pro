'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Rocket,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Store,
  Users,
  Megaphone,
  CreditCard,
  Package,
  Shield,
  Clock,
  Bookmark,
  ThumbsUp,
  Zap,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const articles = [
  {
    id: 'first-30-days',
    title: 'Your First 30 Days: A Step-by-Step Launch Plan',
    readTime: '12 min read',
    category: 'Launch Plan',
    icon: <Rocket className="h-5 w-5" />,
    content: [
      {
        heading: 'Week 1: Foundation',
        text: 'Register your business (LLC recommended — costs $50–$150 depending on your state). Choose your business name and check trademark availability at USPTO.gov. Open a separate business bank account. Set up your business email (e.g., hello@yourbrand.com).',
      },
      {
        heading: 'Week 2: Product & Supplier',
        text: 'Order samples from 3–5 vendors. Test quality using the inspection checklist (see Vendor Insights). Select your launch product line: start with 3–5 SKUs (e.g., Body Wave 14", 18", 22" + a closure). Place your first bulk order — start small (10–20 units).',
      },
      {
        heading: 'Week 3: Branding & Store',
        text: 'Design your logo and brand assets (Canva is free and powerful). Set up your Shopify/WooCommerce store. Write product descriptions that sell (focus on benefits, not features). Photograph your products (natural lighting + clean background works great).',
      },
      {
        heading: 'Week 4: Launch & Market',
        text: 'Soft launch to friends, family, and your inner circle. Collect your first reviews (offer a 10% discount for honest feedback). Post your first 5 Instagram/TikTok posts. Run a small launch promotion (free shipping on orders over $X). Send your first email blast.',
      },
    ],
  },
  {
    id: 'business-structure',
    title: 'LLC vs Sole Proprietorship for Hair Businesses',
    readTime: '7 min read',
    category: 'Legal',
    icon: <Shield className="h-5 w-5" />,
    content: [
      {
        heading: 'Why Structure Matters',
        text: 'Your business structure affects your taxes, personal liability, and ability to grow. Making the right choice early saves headaches later.',
      },
      {
        heading: 'Sole Proprietorship',
        text: 'Pros: Free to set up, simplest tax filing, no separate entity required. Cons: Personal liability (your personal assets are at risk if someone sues), harder to get business credit, looks less professional to vendors and wholesale customers.',
      },
      {
        heading: 'LLC (Recommended)',
        text: 'Pros: Personal asset protection, business credit building, professional credibility with vendors, flexible tax options (can elect S-corp taxation to save on self-employment tax). Cons: Filing fees ($50–$500), annual state fees, slightly more paperwork.',
      },
      {
        heading: 'When to Upgrade',
        text: 'Start as a sole proprietorship if you are testing the market. Upgrade to an LLC once you hit $1,000/month in sales or before placing your first wholesale order. The liability protection alone is worth it.',
      },
    ],
  },
  {
    id: 'first-customers',
    title: 'Getting Your First 100 Customers',
    readTime: '10 min read',
    category: 'Growth',
    icon: <Users className="h-5 w-5" />,
    content: [
      {
        heading: 'The First 100 Are the Hardest',
        text: 'Your first 100 customers set the foundation for everything. They become your reviewers, your word-of-mouth marketers, and your product feedback loop. Here is how to get them.',
      },
      {
        heading: 'Customers 1–10: Your Inner Circle',
        text: 'Start with people who already trust you. Friends, family, coworkers, church members, gym friends. Offer a "friends & family" discount (20% off). Ask every single one for a review and a referral.',
      },
      {
        heading: 'Customers 11–50: Local Marketing',
        text: 'Partner with 2–3 local hairstylists (offer them wholesale pricing or a commission). Attend local events, pop-ups, and markets. Join local Facebook groups and offer genuine value (not spam). Create a referral program: "Give $10, Get $10" for every friend referred.',
      },
      {
        heading: 'Customers 51–100: Social Media Acceleration',
        text: 'Post client transformations (with permission) — these go viral. Create educational content ("how to maintain your bundles"). Collaborate with micro-influencers (1K–10K followers) for product reviews. Run a small Instagram or TikTok ad campaign ($5–10/day targeted locally).',
      },
    ],
  },
  {
    id: 'store-setup',
    title: 'Setting Up Your Online Store (The Right Way)',
    readTime: '8 min read',
    category: 'Tech',
    icon: <Store className="h-5 w-5" />,
    content: [
      {
        heading: 'Platform Choice',
        text: 'Shopify ($39/month) is the gold standard for hair businesses. It handles payments, shipping labels, inventory tracking, and has thousands of hair-specific themes and apps. WooCommerce is free but requires more technical knowledge.',
      },
      {
        heading: 'Must-Have Store Pages',
        text: 'Homepage with hero image, featured products, and social proof. Product pages with multiple photos, detailed descriptions, and reviews. About page with your story (customers buy from people they connect with). FAQ page addressing shipping, returns, and hair care. Contact page with multiple ways to reach you.',
      },
      {
        heading: 'Product Photography Tips',
        text: 'Use natural lighting (near a window, no direct sunlight). White or marble background. Show the hair from multiple angles: straight, waved, curled. Include a length comparison photo. Add lifestyle shots of the hair installed. Use consistent editing across all photos.',
      },
      {
        heading: 'Essential Apps/Plugins',
        text: 'Reviews app (Loox or Judge.me), email marketing (Klaviyo), SMS marketing (Postscript), upselling (Bold or ReConvert), and analytics (Google Analytics 4). These are the tools that turn a store into a business.',
      },
    ],
  },
  {
    id: 'startup-costs',
    title: 'Realistic Startup Costs for a Hair Business',
    readTime: '6 min read',
    category: 'Finance',
    icon: <CreditCard className="h-5 w-5" />,
    content: [
      {
        heading: 'The Real Numbers',
        text: 'Social media makes it look like you can start with $0. The reality is that a quality hair business requires some investment. Here is an honest breakdown.',
      },
      {
        heading: 'Budget Launch ($500–$1,000)',
        text: 'Inventory: $300–$600 (5–10 bundles). Shopify: $39/month. Domain name: $12/year. Logo (DIY with Canva): Free. Packaging (basic bags): $30–$50. Business registration: $50–$150. Total: approximately $500–$900.',
      },
      {
        heading: 'Standard Launch ($1,500–$3,000)',
        text: 'Everything in Budget plus: More inventory variety (15–25 units, $800–$1,500). Professional logo: $100–$300. Custom packaging (boxes, tissue, stickers): $200–$400. Product photography: $100–$200. Initial ad budget: $200–$300.',
      },
      {
        heading: 'Premium Launch ($3,000–$5,000)',
        text: 'Everything in Standard plus: Premium inventory (30–50 units): $1,500–$2,500. Custom website design: $500–$1,000. Brand photoshoot: $300–$500. Influencer collaborations: $300–$500. Larger ad budget: $500.',
      },
    ],
  },
  {
    id: 'branding-basics',
    title: 'Branding Your Hair Business on a Budget',
    readTime: '7 min read',
    category: 'Branding',
    icon: <Lightbulb className="h-5 w-5" />,
    content: [
      {
        heading: 'Brand Is More Than a Logo',
        text: 'Your brand is the feeling customers get when they interact with your business. It includes your visual identity, your voice, your customer experience, and the story you tell. A strong brand justifies premium pricing.',
      },
      {
        heading: 'Define Your Brand Personality',
        text: 'Are you luxury and exclusive? Fun and trendy? Natural and earthy? Pick 3–5 brand adjectives and make every decision through that lens. If your brand is "luxe, bold, confident" then your packaging, social media, and customer service should all reflect that.',
      },
      {
        heading: 'DIY Visual Identity',
        text: 'Canva (free): Design your logo, business cards, social media templates, and packaging labels. Choose 2–3 brand colors and stick to them everywhere. Select 2 fonts: one for headings (bold/decorative), one for body text (clean/readable). Create templates so every post looks cohesive.',
      },
      {
        heading: 'Your Brand Story',
        text: 'Why did you start? What problem are you solving? Who are you serving? Write a 2–3 sentence brand story and use it on your About page, your Instagram bio, and your packaging. People remember stories, not product specs.',
      },
    ],
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management for Beginners',
    readTime: '6 min read',
    category: 'Operations',
    icon: <Package className="h-5 w-5" />,
    content: [
      {
        heading: 'Start Lean',
        text: 'The number one mistake new hair entrepreneurs make is ordering too much inventory. Start with 10–20 units of your top sellers. You can always reorder, but you cannot un-buy dead stock.',
      },
      {
        heading: 'The 80/20 Rule',
        text: '80% of your revenue will come from 20% of your products. Track what sells and double down. If Body Wave 18" is your best seller, always keep it in stock. If a texture sits for 60+ days, discontinue or clearance it.',
      },
      {
        heading: 'Reorder Point Formula',
        text: 'Reorder Point = (Average Daily Sales × Lead Time in Days) + Safety Stock. If you sell 2 bundles/day and your vendor takes 14 days to ship, your reorder point is 28 + 7 (safety) = 35 bundles. Reorder when stock hits 35.',
      },
      {
        heading: 'Storage Best Practices',
        text: 'Store hair in a cool, dry place away from direct sunlight. Keep bundles in satin or silk bags. Use clear bins labeled by texture and length. First in, first out — sell older inventory before newer stock.',
      },
    ],
  },
  {
    id: 'shipping-fulfillment',
    title: 'Shipping & Fulfillment Made Simple',
    readTime: '5 min read',
    category: 'Logistics',
    icon: <Globe className="h-5 w-5" />,
    content: [
      {
        heading: 'Shipping Options',
        text: 'USPS Priority Mail is the best value for hair shipments (free boxes, tracking included, 2–3 day delivery). For a premium experience, offer UPS or FedEx overnight. Always include tracking — no exceptions.',
      },
      {
        heading: 'Free Shipping Strategy',
        text: 'Offer free shipping on orders over a threshold (e.g., $100). This increases your average order value. Bake shipping costs into your product price: if shipping costs $8, add $3–$5 to each product price and offer "free" shipping.',
      },
      {
        heading: 'Packaging That Wows',
        text: 'Your package is the first physical touchpoint with your customer. Include: branded box or mailer, satin hair bag, hair care instruction card, a personalized thank-you note, and a small freebie (silk scrunchie, edge brush, or stickers). This costs $3–$5 extra but drives repeat purchases and social media unboxing posts.',
      },
    ],
  },
  {
    id: 'common-mistakes',
    title: '7 Costly Mistakes New Hair Entrepreneurs Make',
    readTime: '6 min read',
    category: 'Avoid These',
    icon: <Zap className="h-5 w-5" />,
    content: [
      {
        heading: 'Learn From Others',
        text: 'Every successful hair entrepreneur has made mistakes. Here are the most expensive ones so you can skip them entirely.',
      },
      {
        heading: 'The 7 Mistakes',
        text: '1. Ordering too much inventory before validating demand. 2. Pricing too low to compete (destroys margins and brand perception). 3. Not testing vendor samples before bulk ordering. 4. Skipping business registration (opens you to personal liability). 5. Copying competitor branding instead of building your own identity. 6. Ignoring email marketing (email drives 3x more revenue than social media per dollar spent). 7. Trying to sell every texture and length instead of specializing.',
      },
      {
        heading: 'The Fix',
        text: 'Start small, test everything, and specialize. Your first 6 months should be about learning what your specific customers want, not trying to be everything to everyone. Focus on 3–5 hero products, master your marketing, and expand from a position of strength.',
      },
    ],
  },
  {
    id: 'first-month-revenue',
    title: 'How to Hit $5K in Your First Month',
    readTime: '8 min read',
    category: 'Revenue',
    icon: <Megaphone className="h-5 w-5" />,
    content: [
      {
        heading: 'The Math',
        text: 'To hit $5,000 in month one at an average order value of $150, you need about 34 orders — just over 1 order per day. That is very achievable with the right strategy.',
      },
      {
        heading: 'The Pre-Launch (Week Before Launch)',
        text: 'Build a waitlist of at least 50 people via Instagram stories and DMs. Tease your products with "coming soon" content. Create a launch-day offer (free shipping, gift with purchase, or 15% off). Send personal DMs to your warmest contacts.',
      },
      {
        heading: 'Launch Week',
        text: 'Go live on Instagram showing your products. Post transformation videos daily. Email your entire list. Run a flash sale (48 hours, launch pricing only). Personally follow up with everyone who showed interest pre-launch.',
      },
      {
        heading: 'Week 2–4: Sustain Momentum',
        text: 'Ask every customer for a review and referral. Launch your referral program. Start a TikTok content series. Reach out to 5 local stylists per week. Run retargeting ads to website visitors ($5/day). The key is consistent daily action, not one big effort.',
      },
    ],
  },
];

export default function LaunchTips() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  };

  const activeContent = articles.find((a) => a.id === activeArticle);

  return (
    <DashboardLayout title="Launch Tips" description="Everything you need to launch your hair business successfully">
      <Link
        href="/dashboard/resources"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
        style={{ color: '#FA6A27' }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Resources
      </Link>

      {/* Header Card */}
      <div
        className="mb-8 rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #9B6FCF, #DCBDEF)' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Rocket className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Launch Tips</h2>
            <p className="text-sm text-white/80 mt-0.5">{articles.length} guides from idea to first sale</p>
          </div>
        </div>
      </div>

      {/* Launch Checklist Quick View */}
      <div className="mb-8 rounded-xl bg-white p-5 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
        <p className="text-sm font-bold text-gray-900 mb-3">Quick Launch Checklist</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {['Register your LLC', 'Order vendor samples', 'Set up Shopify store', 'Design your brand', 'Stock initial inventory', 'Launch on social media'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: '#FA6A27' }} />
              <span className="text-xs text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {activeArticle && activeContent ? (
        <div>
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
            style={{ color: '#FA6A27' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </button>

          <div className="rounded-2xl bg-white p-8 shadow-sm" style={{ border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F5F0FA', color: '#9B6FCF' }}>
                  {activeContent.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9B6FCF' }}>{activeContent.category}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{activeContent.readTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleBookmark(activeContent.id)}
                className="rounded-lg p-2 transition-colors"
                style={{ backgroundColor: bookmarked.includes(activeContent.id) ? '#F5F0FA' : '#F9FAFB', color: bookmarked.includes(activeContent.id) ? '#9B6FCF' : '#9CA3AF' }}
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">{activeContent.title}</h1>

            <div className="space-y-6">
              {activeContent.content.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{section.heading}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Was this helpful?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#9B6FCF' }}>
                    Yes, thanks!
                  </button>
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
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
              style={{ border: '1px solid #E5E7EB' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F5F0FA', color: '#9B6FCF' }}>
                  {article.icon}
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#F5F0FA', color: '#9B6FCF' }}>
                  {article.category}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-gray-700">{article.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#9B6FCF' }}>
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

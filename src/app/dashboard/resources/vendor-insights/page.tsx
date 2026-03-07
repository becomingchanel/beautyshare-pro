'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Globe,
  ShieldCheck,
  MessageSquare,
  Star,
  Search,
  DollarSign,
  FileText,
  Users,
  Clock,
  Bookmark,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const articles = [
  {
    id: 'evaluate-vendors',
    title: 'How to Evaluate Hair Vendors Like a Pro',
    readTime: '8 min read',
    category: 'Getting Started',
    icon: <Search className="h-5 w-5" />,
    content: [
      {
        heading: 'The Vendor Evaluation Framework',
        text: 'Not all hair vendors are created equal. Use this 5-point framework to evaluate any potential supplier before placing your first order.',
      },
      {
        heading: '1. Product Quality Assessment',
        text: 'Request sample bundles in at least 3 different textures. Test for shedding by running your fingers through the hair 10 times. Quality hair should lose minimal strands. Check for consistent color from root to tip and test curl pattern retention after washing.',
      },
      {
        heading: '2. Communication & Responsiveness',
        text: 'Send an inquiry and measure response time. Reliable vendors respond within 24 hours. Ask detailed questions about their sourcing process — trustworthy vendors are transparent about where their hair comes from (Indian temple hair, Brazilian donors, etc.).',
      },
      {
        heading: '3. MOQ & Pricing Structure',
        text: 'Compare minimum order quantities across 5+ vendors. A good starting MOQ for new businesses is 5–10 bundles. Watch out for vendors who require 50+ pieces on your first order — that is a red flag for new entrepreneurs.',
      },
      {
        heading: '4. Shipping & Packaging',
        text: 'Ask about shipping methods, tracking, and customs handling. The best vendors offer DHL/FedEx with full tracking. Request photos of their packaging — professional packaging reflects a professional operation.',
      },
      {
        heading: '5. Return & Exchange Policy',
        text: 'Always verify the return policy before ordering. Quality vendors stand behind their product and offer exchanges for defective items within 7–14 days of delivery.',
      },
    ],
  },
  {
    id: 'red-flags',
    title: '10 Red Flags When Choosing a Hair Vendor',
    readTime: '6 min read',
    category: 'Must Know',
    icon: <AlertTriangle className="h-5 w-5" />,
    content: [
      {
        heading: 'Protect Your Investment',
        text: 'Spotting bad vendors early saves you thousands. Here are the warning signs every hair entrepreneur needs to know.',
      },
      {
        heading: 'The Red Flags',
        text: '1. No physical address or business registration. 2. Stock photos only — no real product images. 3. Prices that seem too good to be true (below $15/bundle for "virgin" hair). 4. No sample policy. 5. Pressure to buy immediately ("limited stock" tactics). 6. No return or exchange policy. 7. Only accepts wire transfer or Western Union. 8. Inconsistent product descriptions across platforms. 9. No reviews or only 5-star reviews with generic text. 10. Refuses video calls or factory tours.',
      },
      {
        heading: 'What To Do Instead',
        text: 'Start with vendors who have verifiable reviews, accept secure payments (PayPal, credit card), offer samples, and are willing to video call. Your first order should always be a small test order.',
      },
    ],
  },
  {
    id: 'negotiate-pricing',
    title: 'Negotiating Better Pricing with Your Vendor',
    readTime: '7 min read',
    category: 'Advanced',
    icon: <DollarSign className="h-5 w-5" />,
    content: [
      {
        heading: 'The Art of Vendor Negotiation',
        text: 'Once you have found a reliable vendor, negotiating better terms can significantly improve your margins. Here is how to approach it professionally.',
      },
      {
        heading: 'Build the Relationship First',
        text: 'Place 3–5 consistent orders before negotiating price. Vendors reward loyalty. Show them you are a serious, repeat buyer by maintaining consistent order volumes and paying on time.',
      },
      {
        heading: 'Volume-Based Pricing Tiers',
        text: 'Ask for tiered pricing: 10–25 units, 25–50 units, and 50+ units. Most vendors offer 10–20% discounts at higher volumes. Calculate whether the volume discount outweighs the inventory carrying cost.',
      },
      {
        heading: 'Negotiate Beyond Price',
        text: 'If the vendor cannot lower the per-unit cost, negotiate on shipping (free shipping over a certain amount), payment terms (Net 30 instead of prepay), free samples for new textures, or custom packaging at no extra charge.',
      },
    ],
  },
  {
    id: 'vendor-relationship',
    title: 'Building Long-Term Vendor Relationships',
    readTime: '5 min read',
    category: 'Growth',
    icon: <Users className="h-5 w-5" />,
    content: [
      {
        heading: 'Why Relationships Matter',
        text: 'The hair industry runs on relationships. Vendors who trust you will prioritize your orders, give you first access to new products, and offer better terms over time.',
      },
      {
        heading: 'Communication Best Practices',
        text: 'Set a regular check-in schedule (monthly or bi-weekly). Share your sales data and growth plans — vendors appreciate transparency and will invest more in your success when they see the potential.',
      },
      {
        heading: 'Be a Good Partner',
        text: 'Pay on time, every time. Provide constructive feedback on product quality. Share customer testimonials — your vendor wants to know their product is being well-received. Refer other businesses to them when appropriate.',
      },
    ],
  },
  {
    id: 'domestic-vs-international',
    title: 'Domestic vs. International Vendors: Pros & Cons',
    readTime: '6 min read',
    category: 'Strategy',
    icon: <Globe className="h-5 w-5" />,
    content: [
      {
        heading: 'Understanding Your Options',
        text: 'Both domestic and international vendors have their place in a healthy supply chain. Understanding the tradeoffs helps you make smarter decisions.',
      },
      {
        heading: 'Domestic Vendors',
        text: 'Pros: Faster shipping (2–5 days), easier communication, no customs/duties, simpler returns. Cons: Higher per-unit costs (20–40% markup), limited selection, most are middlemen sourcing internationally anyway.',
      },
      {
        heading: 'International Vendors',
        text: 'Pros: Lower per-unit costs, direct factory access, wider product range, customization options. Cons: Longer shipping times (7–21 days), language barriers, customs complexity, harder to resolve disputes.',
      },
      {
        heading: 'The Hybrid Approach',
        text: 'Many successful hair entrepreneurs use a hybrid strategy: domestic vendors for quick-turnaround orders and restocks, international vendors for bulk orders and exclusive products. This balances speed with margin optimization.',
      },
    ],
  },
  {
    id: 'quality-control',
    title: 'Quality Control Checklist for Every Shipment',
    readTime: '4 min read',
    category: 'Operations',
    icon: <ShieldCheck className="h-5 w-5" />,
    content: [
      {
        heading: 'Never Skip QC',
        text: 'Every shipment needs to be inspected before you sell to customers. One bad batch can destroy your reputation. Use this checklist for every delivery.',
      },
      {
        heading: 'Visual Inspection',
        text: 'Check for: consistent color throughout the bundle, no gray or discolored strands, proper weft stitching (no loose threads), correct length (measure at least 3 bundles per batch), matching texture to your order specifications.',
      },
      {
        heading: 'Physical Tests',
        text: 'Shedding test: Run fingers through 10 times — minimal shedding is acceptable. Tangle test: Finger-comb wet hair — quality hair detangles easily. Burn test: A small strand should smell like burned protein, not plastic. Bleach test: Apply lightener to a strand — real virgin hair lifts evenly.',
      },
      {
        heading: 'Documentation',
        text: 'Photograph every shipment during inspection. Document any defects with photos and notes. Keep a log of quality scores per vendor per shipment. This data helps you make informed reordering decisions.',
      },
    ],
  },
  {
    id: 'vendor-contracts',
    title: 'Understanding Vendor Contracts & Terms',
    readTime: '7 min read',
    category: 'Legal',
    icon: <FileText className="h-5 w-5" />,
    content: [
      {
        heading: 'Protect Your Business',
        text: 'As your orders grow, having a written agreement with your vendor becomes essential. Here is what to look for and what to include.',
      },
      {
        heading: 'Key Contract Terms',
        text: 'Payment terms (Net 15, Net 30, prepay), quality standards and acceptance criteria, delivery timelines and penalties for delays, return/exchange policies, exclusivity clauses (if applicable), minimum order commitments, and price lock periods.',
      },
      {
        heading: 'When to Get It in Writing',
        text: 'If you are ordering more than $2,000 per month from a single vendor, you need a written agreement. Even a simple email confirmation of terms is better than nothing. For orders over $5,000, invest in a proper vendor agreement.',
      },
    ],
  },
  {
    id: 'vendor-directory',
    title: 'How to Use Trade Shows to Find Vendors',
    readTime: '5 min read',
    category: 'Sourcing',
    icon: <MessageSquare className="h-5 w-5" />,
    content: [
      {
        heading: 'Trade Shows Are Gold Mines',
        text: 'Trade shows let you see and touch products in person, meet vendors face-to-face, and compare dozens of suppliers in one place. They are the fastest way to build a quality vendor network.',
      },
      {
        heading: 'Top Hair Industry Events',
        text: 'Bronner Bros International Beauty Show (Atlanta), International Beauty Show (New York/Las Vegas), Canton Fair (Guangzhou, China), ISSE Long Beach, and Beauty Africa Conference. Mark these on your calendar and plan to attend at least one per year.',
      },
      {
        heading: 'Trade Show Strategy',
        text: 'Before the show: research exhibitors and make a target list. At the show: collect samples, business cards, and pricing sheets from at least 10 vendors. After the show: follow up within 48 hours, order test samples within 2 weeks, and narrow down to your top 3.',
      },
    ],
  },
];

export default function VendorInsights() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  };

  const activeContent = articles.find((a) => a.id === activeArticle);

  return (
    <DashboardLayout title="Vendor Insights" description="Find, evaluate, and build relationships with quality hair vendors">
      {/* Back Navigation */}
      <Link
        href="/dashboard/resources"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
        style={{ color: '#D4713B' }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Resources
      </Link>

      {/* Header Card */}
      <div
        className="mb-8 rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #D4713B, #E2AD37)' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Truck className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Vendor Insights</h2>
            <p className="text-sm text-white/80 mt-0.5">{articles.length} expert guides to vendor success</p>
          </div>
        </div>
      </div>

      {activeArticle && activeContent ? (
        /* Article Detail View */
        <div>
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
            style={{ color: '#D4713B' }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </button>

          <div className="rounded-2xl bg-white p-8 shadow-sm" style={{ border: '1px solid #EDE5DB' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#FFF5EC', color: '#D4713B' }}>
                  {activeContent.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#D4713B' }}>{activeContent.category}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{activeContent.readTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleBookmark(activeContent.id)}
                className="rounded-lg p-2 transition-colors"
                style={{ backgroundColor: bookmarked.includes(activeContent.id) ? '#FFF5EC' : '#F9FAFB', color: bookmarked.includes(activeContent.id) ? '#D4713B' : '#9CA3AF' }}
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

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid #EDE5DB' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Was this helpful?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#D4713B' }}>
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
        /* Article List View */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <button
              key={article.id}
              onClick={() => setActiveArticle(article.id)}
              className="group rounded-2xl bg-white p-5 shadow-sm text-left transition-all hover:shadow-md"
              style={{ border: '1px solid #EDE5DB' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#FFF5EC', color: '#D4713B' }}>
                  {article.icon}
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#FFF5EC', color: '#D4713B' }}>
                  {article.category}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-gray-700">{article.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <span className="text-xs font-semibold transition-colors" style={{ color: '#D4713B' }}>
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

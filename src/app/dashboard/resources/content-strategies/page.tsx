'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Megaphone,
  ArrowLeft,
  Instagram,
  Video,
  Mail,
  Camera,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Bookmark,
  ThumbsUp,
  Hash,
  Heart,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const articles = [
  {
    id: 'instagram-strategy',
    title: 'Instagram Strategy for Hair Entrepreneurs',
    readTime: '10 min read',
    category: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    content: [
      {
        heading: 'Your Instagram Is Your Storefront',
        text: 'For 80% of hair businesses, Instagram is the primary sales driver. Your profile should be optimized as a shop, not a personal page. Switch to a business account, add your Shopify link, and use your bio to tell customers exactly what you sell and why they should buy from you.',
      },
      {
        heading: 'Content Pillars (The 4-Category System)',
        text: 'Post consistently across 4 categories: 1) Product showcases (40%) — show your hair from every angle, installed, styled. 2) Education (25%) — hair care tips, wig maintenance, styling tutorials. 3) Social proof (20%) — customer reviews, testimonials, before/after transformations. 4) Behind the scenes (15%) — packing orders, quality checks, your story.',
      },
      {
        heading: 'Posting Schedule',
        text: 'Feed posts: 4–5x per week. Stories: daily (at minimum). Reels: 3–4x per week (Reels get 2x the reach of static posts). Lives: 1–2x per week (great for Q&A and new product launches). The algorithm rewards consistency — pick a schedule you can maintain for 90 days.',
      },
      {
        heading: 'Hashtag Strategy',
        text: 'Use 20–25 hashtags per post across 3 tiers: Broad (500K+ posts): #hairstyles, #wiglife, #bundledeals. Niche (50K–500K): #virginhairbundles, #bodywave, #hdlacefrontal. Micro (under 50K): #[yourcity]hair, #[yourbrand]hair. Rotate hashtag sets every 2 weeks to reach new audiences.',
      },
    ],
  },
  {
    id: 'tiktok-viral',
    title: 'Going Viral on TikTok (Hair Edition)',
    readTime: '8 min read',
    category: 'TikTok',
    icon: <Video className="h-5 w-5" />,
    content: [
      {
        heading: 'Why TikTok Matters',
        text: 'TikTok is the fastest way to reach new customers in 2025. One viral video can generate more sales than a month of Instagram posts. The hair niche is massive on TikTok — and the platform favors small creators.',
      },
      {
        heading: 'Content That Goes Viral',
        text: 'Transformation videos (before/after install): These consistently get 100K+ views. "Get Ready With Me" using your products. Packing order videos with ASMR elements (tissue paper sounds, stamping logos). "Which texture should you get?" comparison videos. Reaction to customer transformations. "Day in the life of a hair business owner".',
      },
      {
        heading: 'The Hook',
        text: 'Your first 1–2 seconds determine if someone watches. Start with a bold statement: "Stop buying cheap hair. Here is why." Use text overlays for the hook, not just audio. Show the most dramatic moment first (the finished hairstyle, not the packaging).',
      },
      {
        heading: 'Posting Strategy',
        text: 'Post 1–2x daily for the first 60 days. Best times: 7 AM, 12 PM, and 7 PM in your target audience timezone. Use trending sounds but add your own twist. Reply to every comment in the first hour — this signals engagement to the algorithm.',
      },
    ],
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing That Actually Converts',
    readTime: '9 min read',
    category: 'Email',
    icon: <Mail className="h-5 w-5" />,
    content: [
      {
        heading: 'Email Is Your Most Profitable Channel',
        text: 'Email marketing generates $36 for every $1 spent. It is the only channel you truly own — algorithm changes cannot take your email list away. Every hair business should prioritize list building from day one.',
      },
      {
        heading: 'Building Your List',
        text: 'Pop-up on your website: "Get 10% off your first order" (this alone builds lists fast). Instagram bio link to a landing page. Exit-intent pop-up: "Wait! Here is 15% off before you go." Every order should include a card encouraging email signup for exclusive deals.',
      },
      {
        heading: 'Essential Email Flows',
        text: 'Welcome Series (3 emails over 5 days): Deliver the discount, share your story, showcase best sellers. Abandoned Cart (3 emails over 3 days): Remind, add urgency, offer a small incentive. Post-Purchase (3 emails over 14 days): Delivery updates, hair care instructions, request a review. Win-Back (2 emails after 60 days): "We miss you" + exclusive offer.',
      },
      {
        heading: 'Campaign Emails',
        text: 'Send 2–3 campaigns per week: new product announcements, flash sales, educational content, customer spotlights. Subject lines matter — use curiosity, urgency, or personalization. Keep emails visual and mobile-friendly (80% of opens are on phones).',
      },
    ],
  },
  {
    id: 'ugc-strategy',
    title: 'User-Generated Content: Your Secret Weapon',
    readTime: '6 min read',
    category: 'UGC',
    icon: <Users className="h-5 w-5" />,
    content: [
      {
        heading: 'Why UGC Converts 4x Better',
        text: 'User-generated content (photos and videos from real customers) converts 4x better than branded content. It is authentic, relatable, and builds trust. Your customers are your best content creators.',
      },
      {
        heading: 'How to Get UGC',
        text: 'Include a card in every order: "Share your install and tag us for a chance to be featured!" Offer a 15% discount on next purchase for video testimonials. Create a branded hashtag and actively engage with posts. DM customers who post about their hair (even without tagging you) and ask permission to share.',
      },
      {
        heading: 'Maximizing UGC',
        text: 'Repost to your stories daily (with credit). Create "Customer Spotlight" feed posts weekly. Use UGC in your ads — they outperform studio content. Build a "Wall of Love" highlight reel on your profile. Feature reviews and photos on your product pages.',
      },
      {
        heading: 'UGC Creator Partnerships',
        text: 'For more polished UGC, partner with micro-creators (1K–10K followers). Offer them free product in exchange for 3–5 pieces of content. This is cheaper than traditional influencer deals and produces more authentic-looking content.',
      },
    ],
  },
  {
    id: 'content-calendar',
    title: 'The 30-Day Hair Business Content Calendar',
    readTime: '7 min read',
    category: 'Planning',
    icon: <Calendar className="h-5 w-5" />,
    content: [
      {
        heading: 'Why You Need a Calendar',
        text: 'Winging it on social media leads to inconsistency — and inconsistency kills growth. A content calendar removes the daily "what should I post?" stress and ensures you are hitting all your content pillars.',
      },
      {
        heading: 'Week 1 Theme: Product Focus',
        text: 'Monday: New product showcase (Reel). Tuesday: "How to style" tutorial (Reel). Wednesday: Product detail close-ups (Carousel). Thursday: Customer transformation (Reel). Friday: "Flash Friday" sale post. Weekend: Behind-the-scenes story content.',
      },
      {
        heading: 'Week 2 Theme: Education',
        text: 'Monday: Hair care tip (Carousel). Tuesday: "Texture Guide" comparison (Reel). Wednesday: FAQ answers (Stories). Thursday: "Wig vs. Sew-In" discussion (Reel). Friday: Client Q&A highlight. Weekend: Pack orders + BTS.',
      },
      {
        heading: 'Week 3 & 4: Social Proof + Engagement',
        text: 'Mix customer spotlights, reviews, polls, giveaways, and live sessions. The goal is to cycle through all 4 content pillars twice per month. Batch create content on one day per week — 2–3 hours of filming produces a full week of content.',
      },
    ],
  },
  {
    id: 'product-photography',
    title: 'DIY Product Photography for Hair',
    readTime: '6 min read',
    category: 'Visual',
    icon: <Camera className="h-5 w-5" />,
    content: [
      {
        heading: 'You Do Not Need a Studio',
        text: 'A smartphone with good lighting produces professional-quality hair photos. The iPhone 13+ or Samsung S22+ cameras are more than sufficient. What matters most is lighting and consistency.',
      },
      {
        heading: 'Lighting Setup',
        text: 'Natural light: Shoot near a large window between 10 AM and 2 PM. Avoid direct sunlight (causes harsh shadows). Use a white foam board as a reflector on the opposite side of the window. For evening shoots, a ring light ($25–$50) works great.',
      },
      {
        heading: 'Shot List for Every Product',
        text: 'Full bundle laid flat on white background. Close-up of hair texture. Hand holding the bundle (shows scale). Hair in different styles (straight, curled, waved). Weft/lace close-up for quality detail. Lifestyle shot (on mannequin head or model). Packaging/unboxing shot.',
      },
      {
        heading: 'Editing Tips',
        text: 'Use Lightroom Mobile (free) for consistent editing. Create one preset and apply it to all photos for brand consistency. Increase brightness slightly, add a touch of warmth, and sharpen the texture detail. Never over-edit — customers want to see the real color and texture.',
      },
    ],
  },
  {
    id: 'influencer-collabs',
    title: 'Influencer Collaborations on a Budget',
    readTime: '7 min read',
    category: 'Partnerships',
    icon: <Heart className="h-5 w-5" />,
    content: [
      {
        heading: 'Micro-Influencers Are Your Best ROI',
        text: 'Forget the big influencers charging $5,000 per post. Micro-influencers (1K–25K followers) have higher engagement rates, more trust with their audience, and are affordable — often accepting free product in exchange for content.',
      },
      {
        heading: 'Finding the Right Influencers',
        text: 'Search your niche hashtags and look for creators with high engagement (3%+ engagement rate). Check their comments — real engagement has thoughtful comments, not just emojis. Look for influencers whose audience matches your target customer demographic.',
      },
      {
        heading: 'The Outreach Template',
        text: 'Keep it short and genuine: "Hey [Name], I love your content — especially [specific post]. I run [brand name] and I think your audience would love our [specific product]. Would you be open to a collaboration? I would love to send you [product] in exchange for [deliverables]. Let me know!" Personalization is key.',
      },
      {
        heading: 'Measuring ROI',
        text: 'Give each influencer a unique discount code (their name or handle). Track: how many times the code is used, revenue generated, new followers gained, and content produced. Calculate cost per acquisition. A good collab pays for itself within 30 days.',
      },
    ],
  },
];

export default function ContentStrategies() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  };

  const activeContent = articles.find((a) => a.id === activeArticle);

  return (
    <DashboardLayout title="Content Strategies" description="Social media playbooks and marketing strategies for hair entrepreneurs">
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
        style={{ background: 'linear-gradient(135deg, hsl(var(--highlight)), hsl(var(--accent)))' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Megaphone className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Content Strategies</h2>
            <p className="text-sm text-white/80 mt-0.5">{articles.length} proven playbooks for hair marketing</p>
          </div>
        </div>
      </div>

      {/* Platform Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(135deg, #E1306C, #F77737)' }}>
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Instagram</p>
              <p className="text-xs text-muted-foreground">Best for hair showcases</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">TikTok</p>
              <p className="text-xs text-muted-foreground">Best for viral reach</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" style={{ border: '1px solid hsl(var(--border))' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: 'hsl(var(--accent))' }}>
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Email</p>
              <p className="text-xs text-muted-foreground">Best for conversions</p>
            </div>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--highlight))' }}>
                  {activeContent.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--highlight))' }}>{activeContent.category}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span className="text-xs text-muted-foreground/70">{activeContent.readTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleBookmark(activeContent.id)}
                className="rounded-lg p-2 transition-colors"
                style={{ backgroundColor: bookmarked.includes(activeContent.id) ? 'hsl(var(--muted))' : 'hsl(var(--background))', color: bookmarked.includes(activeContent.id) ? 'hsl(var(--highlight))' : 'hsl(var(--muted-foreground))' }}
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
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: 'hsl(var(--highlight))' }}>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--highlight))' }}>
                  {article.icon}
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--highlight))' }}>
                  {article.category}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-foreground group-hover:text-gray-700">{article.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                  <span className="text-xs text-muted-foreground/70">{article.readTime}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'hsl(var(--highlight))' }}>
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

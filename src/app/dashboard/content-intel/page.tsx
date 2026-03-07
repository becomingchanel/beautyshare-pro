'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';

interface TrendingTopic {
  id: string;
  name: string;
  trend: 'up' | 'down';
  engagementPotential: 'High' | 'Medium' | 'Low';
  contentType: 'Reel' | 'Post' | 'Story' | 'Blog';
  sampleCaption: string;
}

interface CompetitorPost {
  id: string;
  competitor: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
}

interface AIContentIdea {
  id: string;
  hook: string;
  platform: 'Instagram' | 'TikTok' | 'Facebook' | 'YouTube';
  estimatedReach: string;
  confidenceScore: number;
}

const TRENDING_TOPICS: TrendingTopic[] = [
  { id: '1', name: 'Balayage Summer 2025', trend: 'up', engagementPotential: 'High', contentType: 'Reel', sampleCaption: 'Golden summer balayage transformations - swipe to see the magic ✨' },
  { id: '2', name: 'Bond Repair Treatments', trend: 'up', engagementPotential: 'High', contentType: 'Post', sampleCaption: 'Healthy hair journey: How bond repair saved my damaged lengths 💪' },
  { id: '3', name: 'Curtain Bangs Trend', trend: 'up', engagementPotential: 'High', contentType: 'Reel', sampleCaption: 'Soft curtain bangs tutorial - the cut everyone is asking for 💇‍♀️' },
  { id: '4', name: 'DIY Scalp Treatments', trend: 'down', engagementPotential: 'Medium', contentType: 'Story', sampleCaption: 'Quiz: What\'s your scalp type? Let\'s find the perfect treatment' },
  { id: '5', name: 'Silk Hair Accessories', trend: 'up', engagementPotential: 'High', contentType: 'Post', sampleCaption: 'Why silk scrunchies are the secret to healthy hair growth 🧵' },
  { id: '6', name: 'Heatless Waves Tutorial', trend: 'up', engagementPotential: 'Medium', contentType: 'Reel', sampleCaption: 'Wake up to perfect waves - no heat damage, pure results' },
  { id: '7', name: 'Color Correction Stories', trend: 'up', engagementPotential: 'High', contentType: 'Reel', sampleCaption: 'Before & after color correction transformations that will amaze you 🎨' },
  { id: '8', name: 'Sustainable Beauty Practices', trend: 'up', engagementPotential: 'Medium', contentType: 'Blog', sampleCaption: 'Building an eco-friendly salon: A guide to sustainable beauty' },
];

const COMPETITOR_POSTS: CompetitorPost[] = [
  { id: '1', competitor: 'StyleUp Hair Co', content: 'New rose gold balayage technique tutorial', likes: 2840, comments: 156, shares: 89, engagement: 4.2 },
  { id: '2', competitor: 'Glow Beauty Studio', content: 'Client transformation: Curly hair revival story', likes: 5120, comments: 312, shares: 201, engagement: 7.8 },
  { id: '3', competitor: 'Luxe Hair Salon', content: 'Behind the scenes: A day in our salon', likes: 1890, comments: 98, shares: 45, engagement: 2.1 },
  { id: '4', competitor: 'Premier Styles', content: 'Bond repair demo - breaking myths', likes: 3450, comments: 234, shares: 128, engagement: 5.3 },
  { id: '5', competitor: 'Radiant Tresses', content: 'Summer hair care tips for colored hair', likes: 2100, comments: 145, shares: 67, engagement: 3.1 },
];

const AI_IDEAS: AIContentIdea[] = [
  { id: '1', hook: 'I used to fry my hair with heat tools every day. Here\'s what changed everything...', platform: 'TikTok', estimatedReach: '45K-120K', confidenceScore: 92 },
  { id: '2', hook: 'These 5 products are worth the investment if you color your hair', platform: 'Instagram', estimatedReach: '15K-35K', confidenceScore: 88 },
  { id: '3', hook: 'POV: You finally understand your hair type', platform: 'TikTok', estimatedReach: '60K-150K', confidenceScore: 95 },
  { id: '4', hook: 'The haircut that suits EVERY face shape (yes, really)', platform: 'Instagram', estimatedReach: '20K-50K', confidenceScore: 85 },
];

const CONTENT_PERFORMANCE = [
  { type: 'Reels', engagement: 8.4 },
  { type: 'Posts', engagement: 4.2 },
  { type: 'Stories', engagement: 3.1 },
  { type: 'Carousels', engagement: 6.7 },
];

export default function ContentIntel() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? '📈' : '📉';
  };

  const getEngagementColor = (potential: string) => {
    switch (potential) {
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-700';
      case 'TikTok': return 'bg-black text-white';
      case 'Facebook': return 'bg-blue-100 text-blue-700';
      case 'YouTube': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const maxEngagement = Math.max(...CONTENT_PERFORMANCE.map(c => c.engagement));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Intelligence</h1>
          <p className="text-gray-600">AI-powered insights, trends, and content recommendations for hair entrepreneurs</p>
        </div>

        {/* KPI MetricCards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Trending Topics" value="12" subtext="active this week" />
          <MetricCard label="Content Score" value="87/100" subtext="overall quality" />
          <MetricCard label="Engagement Rate" value="4.2%" subtext="average across posts" />
          <MetricCard label="Best Posting Time" value="6 PM" subtext="highest reach" />
        </div>

        {/* Trending Topics Grid */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRENDING_TOPICS.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex-1">{topic.name}</h3>
                    <span className="text-2xl ml-2">{getTrendIcon(topic.trend)}</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex gap-2">
                      <Badge className={getEngagementColor(topic.engagementPotential)}>
                        {topic.engagementPotential}
                      </Badge>
                      <Badge className="bg-indigo-100 text-indigo-700">
                        {topic.contentType}
                      </Badge>
                    </div>
                  </div>
                  {selectedTopic === topic.id && (
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <p className="text-sm text-gray-700 italic">"{topic.sampleCaption}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Content Performance Scorecard */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Performance by Type</h2>
            <div className="space-y-4">
              {CONTENT_PERFORMANCE.map(item => (
                <div key={item.type}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{item.type}</span>
                    <span className="text-sm font-bold text-pink-600">{item.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${(item.engagement / maxEngagement) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competitor Content Feed */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitor Content Feed</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {COMPETITOR_POSTS.map(post => (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-300 transition">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-sm flex-1">{post.competitor}</h3>
                      <span className="text-xs font-semibold text-pink-600">{post.engagement}% engagement</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>❤️ {post.likes} likes</span>
                      <span>💬 {post.comments} comments</span>
                      <span>↗️ {post.shares} shares</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* AI Suggestions Section */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Content Suggestions</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {AI_IDEAS.map(idea => (
                  <div key={idea.id} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3 italic">"{idea.hook}"</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getPlatformColor(idea.platform)}>
                          {idea.platform}
                        </Badge>
                        <span className="text-xs font-bold text-purple-600">
                          {idea.confidenceScore}% confident
                        </span>
                      </div>
                      <div className="text-xs text-gray-700">
                        <span>📊 Estimated reach: {idea.estimatedReach}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

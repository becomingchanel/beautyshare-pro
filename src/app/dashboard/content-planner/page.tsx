'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface ContentItem {
  id: string;
  dayOfWeek: number; // 0-6 (Mon-Sun)
  platform: 'Instagram' | 'TikTok' | 'Facebook' | 'YouTube';
  contentType: 'Tutorial' | 'Transformation' | 'Product Reveal' | 'Behind the Scenes' | 'Tip' | 'Story';
  time: string;
  status: 'Scheduled' | 'Draft' | 'Published';
  captionPreview: string;
}

interface ContentIdea {
  id: string;
  title: string;
  category: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEMO_CONTENT: ContentItem[] = [
  { id: '1', dayOfWeek: 0, platform: 'Instagram', contentType: 'Tutorial', time: '9:00 AM', status: 'Published', captionPreview: 'Easy 5-minute beach waves tutorial - no heat damage...' },
  { id: '2', dayOfWeek: 0, platform: 'TikTok', contentType: 'Transformation', time: '6:00 PM', status: 'Scheduled', captionPreview: 'POV: You finally found your perfect hair color...' },
  { id: '3', dayOfWeek: 1, platform: 'Instagram', contentType: 'Product Reveal', time: '10:00 AM', status: 'Draft', captionPreview: 'Unveiling our NEW bond repair collection ✨...' },
  { id: '4', dayOfWeek: 1, platform: 'YouTube', contentType: 'Behind the Scenes', time: '2:00 PM', status: 'Scheduled', captionPreview: 'Day in my life: Running a 7-figure hair business...' },
  { id: '5', dayOfWeek: 2, platform: 'TikTok', contentType: 'Tip', time: '6:00 PM', status: 'Scheduled', captionPreview: 'The ONE product that changed my hair journey...' },
  { id: '6', dayOfWeek: 2, platform: 'Instagram', contentType: 'Transformation', time: '10:00 AM', status: 'Published', captionPreview: 'Balayage transformation - before and after 🎨...' },
  { id: '7', dayOfWeek: 3, platform: 'Facebook', contentType: 'Tip', time: '7:00 PM', status: 'Scheduled', captionPreview: 'Hair care routine for colored hair - expert tips...' },
  { id: '8', dayOfWeek: 3, platform: 'Instagram', contentType: 'Behind the Scenes', time: '11:00 AM', status: 'Draft', captionPreview: 'Meet our new styling team member! 👋...' },
  { id: '9', dayOfWeek: 4, platform: 'TikTok', contentType: 'Tutorial', time: '5:00 PM', status: 'Scheduled', captionPreview: 'Heatless waves overnight - wake up perfected...' },
  { id: '10', dayOfWeek: 4, platform: 'Instagram', contentType: 'Product Reveal', time: '9:00 AM', status: 'Scheduled', captionPreview: 'Limited edition summer collection - just dropped...' },
  { id: '11', dayOfWeek: 5, platform: 'Instagram', contentType: 'Transformation', time: '10:00 AM', status: 'Draft', captionPreview: 'Color correction journey - from brassy to beautiful...' },
  { id: '12', dayOfWeek: 5, platform: 'YouTube', contentType: 'Behind the Scenes', time: '3:00 PM', status: 'Scheduled', captionPreview: 'Salon renovation vlog - the new look is here...' },
  { id: '13', dayOfWeek: 6, platform: 'TikTok', contentType: 'Tip', time: '6:00 PM', status: 'Scheduled', captionPreview: 'Sunday self-care: Hair mask and relaxation...' },
  { id: '14', dayOfWeek: 6, platform: 'Instagram', contentType: 'Story', time: '12:00 PM', status: 'Draft', captionPreview: 'Weekly Q&A - ask me your hair questions...' },
  { id: '15', dayOfWeek: 0, platform: 'Instagram', contentType: 'Tip', time: '3:00 PM', status: 'Scheduled', captionPreview: 'Healthy hair routine - the ultimate guide...' },
  { id: '16', dayOfWeek: 2, platform: 'Facebook', contentType: 'Tutorial', time: '8:00 PM', status: 'Scheduled', captionPreview: 'Curly hair styling guide for beginners...' },
  { id: '17', dayOfWeek: 4, platform: 'TikTok', contentType: 'Transformation', time: '7:00 PM', status: 'Published', captionPreview: 'Curly to sleek transformation - the process...' },
  { id: '18', dayOfWeek: 1, platform: 'Instagram', contentType: 'Behind the Scenes', time: '1:00 PM', status: 'Draft', captionPreview: 'Client consultation day - real conversations...' },
  { id: '19', dayOfWeek: 3, platform: 'YouTube', contentType: 'Tutorial', time: '4:00 PM', status: 'Scheduled', captionPreview: 'Advanced coloring techniques masterclass...' },
  { id: '20', dayOfWeek: 5, platform: 'Instagram', contentType: 'Product Reveal', time: '11:00 AM', status: 'Draft', captionPreview: 'Launching our first sustainable product line...' },
];

const CONTENT_IDEAS: ContentIdea[] = [
  { id: '1', title: 'Healthy hair transformation 90-day challenge', category: 'Challenge' },
  { id: '2', title: 'Common hair myths debunked with science', category: 'Educational' },
  { id: '3', title: 'Salon supplies that actually matter', category: 'Product Review' },
  { id: '4', title: 'From box dye to balayage - hair recovery story', category: 'Story' },
  { id: '5', title: 'Quick fixes for damaged ends - emergency tips', category: 'Tips' },
  { id: '6', title: 'Hair growth hacks entrepreneurs use', category: 'Tips' },
];

export default function ContentPlanner() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday
  const [newContent, setNewContent] = useState({ platform: 'Instagram' as const, contentType: 'Tutorial' as const, time: '', caption: '' });

  const postsThisWeek = DEMO_CONTENT.length;
  const engagementRate = '4.2%';
  const bestDay = 'Wednesday';
  const contentMixScore = 'Good';

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-700';
      case 'TikTok': return 'bg-black text-white';
      case 'Facebook': return 'bg-blue-100 text-blue-700';
      case 'YouTube': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'Tutorial': return '🎓';
      case 'Transformation': return '✨';
      case 'Product Reveal': return '🎁';
      case 'Behind the Scenes': return '🎬';
      case 'Tip': return '💡';
      case 'Story': return '📖';
      default: return '📱';
    }
  };

  const todayContent = DEMO_CONTENT.filter(c => c.dayOfWeek === selectedDay).sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Day Planner</h1>
          <p className="text-gray-600">Organize, schedule, and optimize your social media content calendar</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Posts This Week" value={`${Math.min(postsThisWeek, 7)}/7`} subtext="scheduled & published" />
          <MetricCard label="Engagement Rate" value={engagementRate} subtext="across all platforms" />
          <MetricCard label="Best Day" value={bestDay} subtext="highest reach" />
          <MetricCard label="Content Mix" value={contentMixScore} subtext="well balanced" />
        </div>

        {/* Weekly Calendar View */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {DAYS.map((day, index) => {
                const dayContent = DEMO_CONTENT.filter(c => c.dayOfWeek === index);
                const isToday = index === selectedDay;
                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(index)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      isToday
                        ? 'border-4 border-pink-500 bg-pink-50'
                        : 'bg-white border border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <h3 className={`font-bold text-sm mb-3 ${isToday ? 'text-pink-700' : 'text-gray-900'}`}>
                      {day}
                    </h3>
                    <div className="space-y-2">
                      {dayContent.slice(0, 3).map(content => (
                        <div key={content.id} className="text-xs">
                          <Badge className={getPlatformColor(content.platform)}>
                            {content.platform.split('').slice(0, 2).join('')}
                          </Badge>
                          <div className="text-gray-600 mt-1 text-xs">{content.time}</div>
                        </div>
                      ))}
                      {dayContent.length > 3 && (
                        <div className="text-xs text-gray-500 font-semibold">+{dayContent.length - 3} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Today's Content Queue */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {DAYS[selectedDay]}'s Content Queue
                </h2>
                {todayContent.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {todayContent.map(content => (
                      <div key={content.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-300 transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{getContentTypeIcon(content.contentType)}</span>
                            <div>
                              <h3 className="font-bold text-gray-900">{content.contentType}</h3>
                              <p className="text-sm text-gray-600">{content.time}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(content.status)}>
                            {content.status}
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <Badge className={getPlatformColor(content.platform)}>
                            {content.platform}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 italic">"{content.captionPreview}"</p>
                        <button className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition">
                          ✏️ Edit
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">No content scheduled for {DAYS[selectedDay]}</p>
                    <p className="text-sm">Use the form below to add content</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Content Ideas Bank */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Ideas Bank</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {CONTENT_IDEAS.map(idea => (
                  <div key={idea.id} className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{idea.title}</h3>
                    <Badge className="bg-purple-100 text-purple-700 text-xs">
                      {idea.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Schedule Form */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Schedule Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select
                value={newContent.platform}
                onChange={(e) => setNewContent({ ...newContent, platform: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="YouTube">YouTube</option>
              </select>

              <select
                value={newContent.contentType}
                onChange={(e) => setNewContent({ ...newContent, contentType: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Tutorial">Tutorial</option>
                <option value="Transformation">Transformation</option>
                <option value="Product Reveal">Product Reveal</option>
                <option value="Behind the Scenes">Behind the Scenes</option>
                <option value="Tip">Tip</option>
                <option value="Story">Story</option>
              </select>

              <Input
                type="time"
                value={newContent.time}
                onChange={(e) => setNewContent({ ...newContent, time: e.target.value })}
                placeholder="Time"
              />

              <textarea
                value={newContent.caption}
                onChange={(e) => setNewContent({ ...newContent, caption: e.target.value })}
                placeholder="Caption preview..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 col-span-1 md:col-span-1"
                rows={1}
              />

              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Schedule
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

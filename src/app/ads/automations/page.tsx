'use client';

import { useState } from 'react';
import {
  Zap,
  Pause,
  TrendingUp,
  ShoppingCart,
  Calendar,
  Bell,
  FileText,
  Clock,
  ArrowRight,
  Check,
  X,
} from 'lucide-react';

/* ── Automation Rules ────────────────────────────────────────── */
interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  icon: React.ReactNode;
  enabled: boolean;
  thresholdLabel?: string;
  thresholdValue?: string;
}

const initialRules: AutomationRule[] = [
  {
    id: 'auto-pause',
    name: 'Auto-Pause Underperformers',
    description: 'Automatically pause campaigns with poor click-through rates',
    trigger: 'CTR drops below threshold for 3+ days',
    action: 'Pause campaign and notify you',
    icon: <Pause className="h-5 w-5" />,
    enabled: true,
    thresholdLabel: 'Min CTR',
    thresholdValue: '0.5%',
  },
  {
    id: 'auto-scale',
    name: 'Auto-Scale Winners',
    description: 'Increase budget on campaigns exceeding ROAS targets',
    trigger: 'ROAS exceeds threshold for 5+ days',
    action: 'Increase daily budget by 20% (max 2 increases)',
    icon: <TrendingUp className="h-5 w-5" />,
    enabled: true,
    thresholdLabel: 'Min ROAS',
    thresholdValue: '3.0x',
  },
  {
    id: 'auto-retarget',
    name: 'Auto-Retarget Cart Abandoners',
    description: 'Automatically add cart abandoners to retargeting audience',
    trigger: 'Customer abandons cart for 2+ hours',
    action: 'Add to retarget audience, create retarget campaign',
    icon: <ShoppingCart className="h-5 w-5" />,
    enabled: false,
  },
  {
    id: 'seasonal',
    name: 'Seasonal Campaign Reminders',
    description: 'Get reminders to launch seasonal campaigns 2 weeks before each holiday',
    trigger: '2 weeks before seasonal dates',
    action: 'Send reminder with pre-built campaign template',
    icon: <Calendar className="h-5 w-5" />,
    enabled: true,
  },
  {
    id: 'budget-alert',
    name: 'Budget Alert',
    description: 'Get notified when campaigns approach their budget limit',
    trigger: 'Campaign reaches 80% of total budget',
    action: 'Send notification alert',
    icon: <Bell className="h-5 w-5" />,
    enabled: true,
    thresholdLabel: 'Alert at',
    thresholdValue: '80%',
  },
  {
    id: 'weekly-report',
    name: 'Weekly Performance Report',
    description: 'Automatically generate and send a weekly ad performance summary',
    trigger: 'Every Monday at 9:00 AM',
    action: 'Generate and email performance report',
    icon: <FileText className="h-5 w-5" />,
    enabled: true,
  },
];

/* ── Seasonal Templates ──────────────────────────────────────── */
const seasonalTemplates = [
  { season: "Valentine's Day", date: 'Feb 14', hook: 'Gift her the hair she deserves', products: 'Bundles, Wigs', emoji: '\u{1F495}' },
  { season: 'Spring Drop', date: 'Mar-Apr', hook: 'New season, new look', products: 'All collections', emoji: '\u{1F338}' },
  { season: 'Summer', date: 'Jun-Aug', hook: 'Beach wave season is here', products: 'Body Wave, Water Wave', emoji: '\u{2600}\u{FE0F}' },
  { season: 'Back to School', date: 'Aug-Sep', hook: 'New semester glow-up', products: 'Straight, Closures', emoji: '\u{1F4DA}' },
  { season: 'Black Friday', date: 'Nov', hook: 'Biggest sale of the year', products: 'All products', emoji: '\u{1F3F7}\u{FE0F}' },
  { season: 'Holiday Glam', date: 'Dec', hook: 'Party-ready hair', products: 'Deep Wave, Wigs', emoji: '\u{2728}' },
  { season: 'New Year', date: 'Jan', hook: 'New year, new hair, new you', products: 'All products', emoji: '\u{1F386}' },
];

/* ── Automation Log ──────────────────────────────────────────── */
const automationLog = [
  { action: 'Auto-paused "Summer Collection TikTok"', reason: 'CTR at 0.4% for 4 days', time: '2 hours ago', type: 'pause' },
  { action: 'Budget alert for "HD Lace Frontal"', reason: 'Reached 82% of daily budget', time: '5 hours ago', type: 'alert' },
  { action: 'Scaled "Body Wave Bundle" budget +20%', reason: 'ROAS at 4.8x for 6 days', time: '1 day ago', type: 'scale' },
  { action: 'Added 8 users to Cart Abandoner audience', reason: 'Daily batch processing', time: '1 day ago', type: 'retarget' },
  { action: 'Weekly report generated', reason: 'Scheduled Monday 9 AM report', time: '3 days ago', type: 'report' },
  { action: 'Seasonal reminder: Spring Drop', reason: '2 weeks until campaign window', time: '5 days ago', type: 'seasonal' },
];

export default function Automations() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-extrabold text-gray-900">Ad Automations</h1>
          <Zap className="h-5 w-5 text-gold" />
        </div>
        <p className="text-sm text-gray-500">
          Set rules to automatically manage your campaigns and save time.
        </p>
      </div>

      {/* Automation Rules */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`rounded-2xl border bg-white p-6 transition-all ${
              rule.enabled ? 'border-gray-200' : 'border-gray-100 opacity-60'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  rule.enabled
                    ? 'bg-orange-50 text-orange'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {rule.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{rule.name}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      rule.enabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {rule.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{rule.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="font-semibold text-gray-600">Trigger:</span>
                    {rule.trigger}
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-300" />
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="font-semibold text-gray-600">Action:</span>
                    {rule.action}
                  </div>
                </div>
                {rule.thresholdLabel && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-gray-500">{rule.thresholdLabel}:</span>
                    <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange">
                      {rule.thresholdValue}
                    </span>
                  </div>
                )}
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggleRule(rule.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  rule.enabled ? 'bg-orange' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    rule.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Campaign Templates */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-lavender-500" />
          <h2 className="text-lg font-bold text-gray-900">Seasonal Campaign Templates</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Pre-built campaign templates for key hair industry seasons. Auto-reminders activate 2 weeks before each date.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {seasonalTemplates.map((t) => (
            <div
              key={t.season}
              className="rounded-xl border border-gray-200 p-4 hover:border-orange/30 transition-colors"
            >
              <div className="text-2xl mb-2">{t.emoji}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">{t.season}</h3>
              <p className="text-[10px] text-gray-400 mb-2">{t.date}</p>
              <p className="text-xs text-gray-600 italic mb-2">&ldquo;{t.hook}&rdquo;</p>
              <p className="text-[10px] text-gray-400">
                Best for: <span className="text-gray-600">{t.products}</span>
              </p>
              <button className="mt-3 w-full rounded-lg bg-orange-50 py-1.5 text-[10px] font-semibold text-orange hover:bg-orange-100 transition-colors">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Log */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Automation Log</h2>
        </div>
        <div className="space-y-2">
          {automationLog.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  entry.type === 'pause'
                    ? 'bg-yellow-100 text-yellow-600'
                    : entry.type === 'scale'
                      ? 'bg-green-100 text-green-600'
                      : entry.type === 'alert'
                        ? 'bg-red-100 text-red-500'
                        : entry.type === 'retarget'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-500'
                }`}
              >
                {entry.type === 'pause' ? <Pause className="h-3.5 w-3.5" /> :
                 entry.type === 'scale' ? <TrendingUp className="h-3.5 w-3.5" /> :
                 entry.type === 'alert' ? <Bell className="h-3.5 w-3.5" /> :
                 entry.type === 'retarget' ? <ShoppingCart className="h-3.5 w-3.5" /> :
                 entry.type === 'report' ? <FileText className="h-3.5 w-3.5" /> :
                 <Calendar className="h-3.5 w-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                <p className="text-xs text-gray-400">{entry.reason}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  Palette,
  Users,
  Bookmark,
  Calculator,
  Zap,
  ChevronLeft,
  Rocket,
} from 'lucide-react';

const navItems = [
  { label: 'Ad Dashboard', href: '/ads', icon: LayoutDashboard },
  { label: 'Campaigns', href: '/ads/campaigns', icon: Megaphone },
  { label: 'AI Copy Generator', href: '/ads/copy-generator', icon: Sparkles },
  { label: 'Creative Studio', href: '/ads/creative-studio', icon: Palette },
  { label: 'Audiences', href: '/ads/audiences', icon: Users },
  { label: 'Swipe Library', href: '/ads/swipe-library', icon: Bookmark },
  { label: 'Budget Calculator', href: '/ads/budget-calculator', icon: Calculator },
  { label: 'Automations', href: '/ads/automations', icon: Zap },
];

export default function AdsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-950 text-white flex flex-col z-40">
      {/* Header */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl brand-gradient-pink flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">AI Ads Engine</h2>
            <span className="inline-flex items-center rounded-full bg-orange/20 px-2 py-0.5 text-[10px] font-semibold text-orange tracking-wide uppercase">
              New
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/ads' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-orange/15 text-orange'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
              {item.label === 'AI Copy Generator' && (
                <Sparkles className="ml-auto h-3.5 w-3.5 text-lavender-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="rounded-xl bg-gradient-to-br from-orange/10 to-pink/10 p-3">
          <p className="text-xs font-semibold text-white mb-1">Need help with ads?</p>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Our AI guides you through every step of creating profitable campaigns.
          </p>
        </div>
      </div>
    </aside>
  );
}

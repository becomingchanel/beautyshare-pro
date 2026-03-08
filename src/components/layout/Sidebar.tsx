'use client';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Calculator,
  Settings,
  BarChart3,
  ChevronDown,
  LogOut,
  Sparkles,
  TrendingUp,
  Handshake,
  UserCheck,
  Eye,
  Target,
  ListTodo,
  Brain,
  Calendar,
  BookOpen,
  ArrowUpCircle,
  DollarSign,
  Percent,
  Tag,
  Bookmark,
  Rocket,
  Megaphone,
} from 'lucide-react';
import { useState } from 'react';

interface NavChild {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  children?: NavChild[];
  adminOnly?: boolean;
}

const mainNav: NavItem[] = [
  { label: 'Get Started', href: '/dashboard/onboarding', icon: <Sparkles className="h-5 w-5" />, badge: 'New' },
  { label: 'Resources', href: '/dashboard/resources', icon: <BookOpen className="h-5 w-5" />, badge: 'Free' },
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Orders', href: '/dashboard/orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Forecasting', href: '/dashboard/forecasting', icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'AI Ads Engine', href: '/ads', icon: <Megaphone className="h-5 w-5" />, badge: 'New' },
  {
    label: 'Calculators',
    href: '/dashboard/calculators',
    icon: <Calculator className="h-5 w-5" />,
    children: [
      { label: 'Launch Calculator', href: '/dashboard/calculators/launch', icon: <Rocket className="h-4 w-4" /> },
      { label: 'Profit Calculator', href: '/dashboard/calculators/profit', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Discount & Ads', href: '/dashboard/calculators/discount', icon: <Percent className="h-4 w-4" /> },
      { label: 'BeautyShare Pricing', href: '/dashboard/calculators/beautyshare', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Saved Projections', href: '/dashboard/calculators/saved', icon: <Bookmark className="h-4 w-4" /> },
    ],
  },
  { label: 'Customers', href: '/dashboard/customers', icon: <Users className="h-5 w-5" /> },
  { label: 'Partners', href: '/dashboard/partners', icon: <Handshake className="h-5 w-5" />, adminOnly: true },
  { label: 'Resellers', href: '/dashboard/resellers', icon: <UserCheck className="h-5 w-5" />, adminOnly: true },
  { label: 'Competitor Monitor', href: '/dashboard/competitors', icon: <Eye className="h-5 w-5" />, adminOnly: true },
  { label: 'Conversion Detector', href: '/dashboard/conversions', icon: <Target className="h-5 w-5" />, adminOnly: true },
  { label: 'CEO Task Planner', href: '/dashboard/ceo-planner', icon: <ListTodo className="h-5 w-5" />, adminOnly: true },
  { label: 'Content Intelligence', href: '/dashboard/content-intel', icon: <Brain className="h-5 w-5" />, adminOnly: true },
  { label: 'Content Day Planner', href: '/dashboard/content-planner', icon: <Calendar className="h-5 w-5" />, adminOnly: true },
  { label: 'Content Library', href: '/dashboard/marketing', icon: <BookOpen className="h-5 w-5" />, adminOnly: true },
  { label: 'Reports', href: '/dashboard/reports', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  { label: 'Upgrade', href: '/dashboard/upgrade', icon: <ArrowUpCircle className="h-5 w-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Calculators']);
  const isAdmin = profile?.role === 'admin';
  const visibleNav = mainNav.filter((item) => !item.adminOnly || isAdmin);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const checkActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-white">
            beautyshare
          </span>
          <span
            className="text-xs font-bold tracking-widest text-white/80 ml-0.5"
            style={{ writingMode: 'vertical-rl', lineHeight: 1, marginTop: '2px' }}
          >
            PRO
          </span>
        </Link>
      </div>

      {/* Business Name Selector */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors bg-white/10 hover:bg-white/20 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 text-white text-[10px] font-bold">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'B'}
            </div>
            <span className="truncate font-medium">{profile?.full_name || 'My Business'}</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 ml-2 text-white/60" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 sidebar-scroll">
        <ul className="space-y-1">
          {visibleNav.map((item) => {
            const active = checkActive(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedSections.includes(item.label);
            const anyChildActive = hasChildren && item.children!.some((c) => checkActive(c.href));
            const isHighlighted = active || anyChildActive;

            return (
              <li key={item.label}>
                {/* Parent Item */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all',
                      isHighlighted
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'ml-auto h-3.5 w-3.5 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all',
                      isHighlighted
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                          backgroundColor: item.badge === 'New' ? 'rgba(255,255,255,0.25)' : 'hsl(var(--accent))',
                          color: '#fff',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="mt-0.5 ml-4 space-y-0.5 pl-3 border-l border-white/20">
                    {item.children!.map((child) => {
                      const childActive = checkActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-all',
                            childActive
                              ? 'bg-white/20 text-white'
                              : 'text-white/60 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          {child.icon}
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User Area */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white flex-shrink-0">
            {profile?.full_name?.charAt(0)?.toUpperCase() || profile?.email?.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">
              {profile?.role === 'admin' ? 'Super Admin' : 'Subscriber'}
            </p>
            <p className="truncate text-[10px] text-white/60">
              {profile?.email || 'user@email.com'}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex-shrink-0 rounded p-1 text-white/50 hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

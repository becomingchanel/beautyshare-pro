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
  Crown,
  Sparkles,
  GraduationCap,
  MessageCircle,
  TrendingUp,
  Truck,
  Handshake,
  UserCheck,
  Eye,
  Target,
  ListTodo,
  Brain,
  Calendar,
  BookOpen,
  Shield,
  ArrowUpCircle,
  DollarSign,
  Percent,
  Tag,
  Bookmark,
  Rocket,
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
}

const mainNav: NavItem[] = [
  { label: 'Get Started', href: '/dashboard/onboarding', icon: <Sparkles className="h-5 w-5" />, badge: 'New' },
  { label: 'Community', href: '/dashboard/community', icon: <MessageCircle className="h-5 w-5" />, badge: 'Free' },
  { label: 'Academy', href: '/dashboard/academy', icon: <GraduationCap className="h-5 w-5" /> },
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Orders', href: '/dashboard/orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Supplier Orders', href: '/dashboard/supplier-orders', icon: <Truck className="h-5 w-5" /> },
  { label: 'Forecasting', href: '/dashboard/forecasting', icon: <TrendingUp className="h-5 w-5" /> },
  {
    label: 'Calculators',
    href: '/dashboard/calculators',
    icon: <Calculator className="h-5 w-5" />,
    children: [
      { label: 'Launch Calculator', href: '/dashboard/calculators/launch', icon: <Rocket className="h-4 w-4" /> },
      { label: 'Inventory Calculator', href: '/dashboard/calculators/inventory', icon: <Package className="h-4 w-4" /> },
      { label: 'Profit Calculator', href: '/dashboard/calculators/profit', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Discount & Ads', href: '/dashboard/calculators/discount', icon: <Percent className="h-4 w-4" /> },
      { label: 'Wholesale Pricing', href: '/dashboard/calculators/wholesale', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'BeautyShare Pricing', href: '/dashboard/calculators/beautyshare', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Retail Price', href: '/dashboard/calculators/retail', icon: <Tag className="h-4 w-4" /> },
      { label: 'Saved Projections', href: '/dashboard/calculators/saved', icon: <Bookmark className="h-4 w-4" /> },
    ],
  },
  { label: 'Customers', href: '/dashboard/customers', icon: <Users className="h-5 w-5" /> },
  { label: 'Partners', href: '/dashboard/partners', icon: <Handshake className="h-5 w-5" /> },
  { label: 'Resellers', href: '/dashboard/resellers', icon: <UserCheck className="h-5 w-5" /> },
  { label: 'Competitor Monitor', href: '/dashboard/competitors', icon: <Eye className="h-5 w-5" /> },
  { label: 'Conversion Detector', href: '/dashboard/conversions', icon: <Target className="h-5 w-5" /> },
  { label: 'CEO Task Planner', href: '/dashboard/ceo-planner', icon: <ListTodo className="h-5 w-5" /> },
  { label: 'Content Intelligence', href: '/dashboard/content-intel', icon: <Brain className="h-5 w-5" /> },
  { label: 'Content Day Planner', href: '/dashboard/content-planner', icon: <Calendar className="h-5 w-5" /> },
  {
    label: 'Content Library',
    href: '/dashboard/marketing',
    icon: <BookOpen className="h-5 w-5" />,
  },
  { label: 'Reports', href: '/dashboard/reports', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Compliance', href: '/dashboard/compliance', icon: <Shield className="h-5 w-5" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  { label: 'Upgrade', href: '/dashboard/upgrade', icon: <ArrowUpCircle className="h-5 w-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Calculators']);

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
    <aside className="flex h-screen w-60 flex-col flex-shrink-0" style={{ backgroundColor: '#1A0F08' }}>
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(135deg, #E2AD37, #D4713B)' }}>
            <Crown className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <span className="block font-display text-sm font-bold tracking-wider" style={{ color: '#E8D5B5' }}>
              HAIR LAUNCH
            </span>
          </div>
        </Link>
      </div>

      {/* Business Name Selector */}
      <div className="mx-4 mb-4">
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors" style={{ backgroundColor: '#231510', border: '1px solid #3D2A1A', color: '#E8D5B5' }}>
          <span className="truncate font-medium">{profile?.full_name || 'My Business'}</span>
          <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 ml-2" style={{ color: '#8B7355' }} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 sidebar-scroll">
        <div className="space-y-0.5">
          {mainNav.map((item) => {
            const active = checkActive(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedSections.includes(item.label);
            const anyChildActive = hasChildren && item.children!.some((c) => checkActive(c.href));

            return (
              <div key={item.label}>
                {/* Parent Item */}
                {hasChildren ? (
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors',
                      anyChildActive
                        ? 'text-white'
                        : 'hover:text-[#E8D5B5]'
                    )}
                    style={{
                      color: anyChildActive ? '#fff' : '#B8A594',
                      backgroundColor: anyChildActive ? '#D4713B' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!anyChildActive) {
                        e.currentTarget.style.backgroundColor = '#2D1B0E';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!anyChildActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ color: anyChildActive ? '#fff' : '#8B7355' }}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    <ChevronDown
                      className={cn('ml-auto h-3.5 w-3.5 transition-transform', isExpanded && 'rotate-180')}
                      style={{ color: anyChildActive ? '#fff' : '#8B7355' }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors'
                    )}
                    style={{
                      color: active ? '#fff' : '#B8A594',
                      backgroundColor: active ? '#D4713B' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = '#2D1B0E';
                        e.currentTarget.style.color = '#E8D5B5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#B8A594';
                      }
                    }}
                  >
                    <span style={{ color: active ? '#fff' : '#8B7355' }}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}

                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="mt-0.5 ml-4 space-y-0.5 pl-3" style={{ borderLeft: '1px solid #2D1B0E' }}>
                    {item.children!.map((child) => {
                      const childActive = checkActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors"
                          style={{
                            color: childActive ? '#fff' : '#9B8574',
                            backgroundColor: childActive ? '#D4713B' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!childActive) {
                              e.currentTarget.style.backgroundColor = '#2D1B0E';
                              e.currentTarget.style.color = '#D4C4B0';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!childActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#9B8574';
                            }
                          }}
                        >
                          <span style={{ color: childActive ? '#fff' : '#6B5A48' }}>{child.icon}</span>
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom User Area */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid #2D1B0E' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: '#D4713B' }}
          >
            {profile?.full_name?.charAt(0)?.toUpperCase() || profile?.email?.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium" style={{ color: '#E8D5B5' }}>
              {profile?.role === 'admin' ? 'Super Admin' : 'Subscriber'}
            </p>
            <p className="truncate text-[10px]" style={{ color: '#8B7355' }}>
              {profile?.email || 'user@email.com'}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex-shrink-0 rounded p-1 transition-colors"
            style={{ color: '#6B5A48' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#D4C4B0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B5A48'; }}
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

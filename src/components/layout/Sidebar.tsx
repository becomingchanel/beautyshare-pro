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
  Store,
  Settings,
  CreditCard,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Crown,
  Megaphone,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: 'Command Center', href: '/dashboard/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Orders', href: '/dashboard/orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Inventory', href: '/dashboard/inventory', icon: <Package className="h-5 w-5" /> },
  { label: 'Marketing', href: '/dashboard/marketing', icon: <Megaphone className="h-5 w-5" /> },
  { label: 'Subscribers', href: '/dashboard/subscribers', icon: <Users className="h-5 w-5" /> },
  { label: 'Reports', href: '/dashboard/reports', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
];

const subscriberNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'My Orders', href: '/dashboard/orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Marketing', href: '/dashboard/marketing', icon: <Megaphone className="h-5 w-5" /> },
  { label: 'Calculators', href: '/dashboard/calculators', icon: <Calculator className="h-5 w-5" /> },
  { label: 'My Store', href: '/dashboard/store', icon: <Store className="h-5 w-5" /> },
  { label: 'Onboarding', href: '/dashboard/onboarding', icon: <Sparkles className="h-5 w-5" /> },
  { label: 'Billing', href: '/dashboard/settings/billing', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);

  const isAdmin = profile?.role === 'admin';
  const navItems = isAdmin ? adminNav : subscriberNav;

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-200',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Crown className="h-7 w-7 text-orange" />
            <span className="font-display text-lg font-bold text-gray-900">BSP</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <Crown className="h-7 w-7 text-orange" />
          </Link>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              isAdmin
                ? 'bg-orange-50 text-orange-700'
                : 'bg-lavender-100 text-lavender-700',
            )}
          >
            {isAdmin ? 'Admin' : 'Subscriber'}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-50 text-orange'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                collapsed && 'justify-center px-2',
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={() => signOut()}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900',
            collapsed && 'justify-center px-2',
          )}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}

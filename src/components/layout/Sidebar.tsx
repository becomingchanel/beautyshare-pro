'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Calculator,
  BarChart3,
  Store,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  adminOnly?: boolean;
  subscriberOnly?: boolean;
}

const adminNavItems: SidebarItem[] = [
  { label: 'Command Center', href: '/admin', icon: LayoutDashboard },
  { label: 'All Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Inventory', href: '/admin/inventory', icon: Package },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Stores', href: '/admin/stores', icon: Store },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const subscriberNavItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'My Store', href: '/dashboard/store', icon: Store },
  { label: 'Calculators', href: '/calculators', icon: Calculator },
  { label: 'AI Copilot', href: '/dashboard/copilot', icon: Sparkles, badge: 'Soon' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  isAdmin?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  tierLabel?: string;
}

export function Sidebar({
  isAdmin = false,
  collapsed = false,
  onToggle,
  userName = 'Member',
  tierLabel = 'Launch',
}: SidebarProps) {
  const pathname = usePathname();
  const navItems = isAdmin ? adminNavItems : subscriberNavItems;

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-brand-900 text-cream-200 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo / Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-brand-800 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600">
          <Crown className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-white truncate">
              BeautyShare Pro
            </h1>
            <p className="text-[11px] text-brand-400 truncate">
              {isAdmin ? 'Admin Panel' : `${tierLabel} Plan`}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' &&
              item.href !== '/dashboard' &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-300 hover:bg-brand-800 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-accent-light' : '')} />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-medium text-brand-300">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-brand-800 p-3">
        <div
          className={cn(
            'flex items-center gap-3',
            collapsed && 'justify-center'
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {userName}
              </p>
              <button className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors">
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 shadow-sm hover:bg-brand-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}

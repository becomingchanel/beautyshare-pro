'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { Bell, Search } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
  userName?: string;
  tierLabel?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export function DashboardLayout({
  children,
  isAdmin = false,
  userName = 'Member',
  tierLabel = 'Launch',
  pageTitle,
  pageDescription,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-cream-100">
      <Sidebar
        isAdmin={isAdmin}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName={userName}
        tierLabel={tierLabel}
      />

      {/* Main content area */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-brand-100 bg-white/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            {pageTitle && (
              <div>
                <h2 className="text-lg font-semibold text-brand-900">
                  {pageTitle}
                </h2>
                {pageDescription && (
                  <p className="text-sm text-brand-500">{pageDescription}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-brand-200 bg-cream-50 pl-9 pr-3 text-sm text-brand-700 placeholder:text-brand-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-brand-200 bg-white text-brand-600 hover:bg-brand-50 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

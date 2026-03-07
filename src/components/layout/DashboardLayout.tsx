'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { Sidebar } from './Sidebar';
import { Spinner } from '@/components/ui/Spinner';
import { Bell, Search, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const { profile, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Main area offset by sidebar width */}
      <div className="ml-64 flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div>
            {title && <h1 className="text-lg font-bold text-foreground">{title}</h1>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <div className="flex items-center gap-3">
            {/* Admin View Toggle */}
            {isAdmin && (
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Admin View</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            )}

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="h-9 w-56 rounded-lg border border-input bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

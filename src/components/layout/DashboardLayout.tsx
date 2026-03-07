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
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: '#FFFDFB' }}>
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#FAF7F4' }}>
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b bg-white px-6" style={{ borderColor: '#F0E6DD' }}>
          <div>
            {title && <h1 className="text-lg font-bold text-gray-900">{title}</h1>}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
          <div className="flex items-center gap-3">
            {/* Admin View Toggle */}
            {isAdmin && (
              <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors" style={{ borderColor: '#F0E6DD', color: '#6B5A48' }}>
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#D61465' }} />
                <span>Admin View</span>
                <ChevronDown className="h-3 w-3" style={{ color: '#B8A594' }} />
              </button>
            )}

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="h-9 w-56 rounded-lg border bg-gray-50 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none transition-colors"
                style={{ borderColor: '#F0E6DD' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#D61465'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(214,20,101,0.08)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#F0E6DD'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: '#D61465' }} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

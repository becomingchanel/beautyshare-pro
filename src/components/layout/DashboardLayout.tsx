'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { Sidebar } from './Sidebar';
import { Spinner } from '@/components/ui/Spinner';
import { Bell, Search } from 'lucide-react';
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
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                {profile?.full_name?.charAt(0)?.toUpperCase() || profile?.email?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <span className="hidden text-sm font-medium text-gray-700 md:block">
                {profile?.full_name || profile?.email || 'User'}
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

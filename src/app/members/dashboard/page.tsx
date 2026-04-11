'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';

export default function MembersDashboard() {
  const router                              = useRouter();
  const { user, profile, initialized }     = useAuthStore((s) => s);
  const [ready, setReady]                  = useState(false);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (profile && !['bsp_member', 'subscriber', 'admin'].includes(profile.role)) {
      router.replace('/signup');
      return;
    }

    // Inject member data into sessionStorage so the dashboard HTML can read it
    const firstName = profile?.full_name?.split(' ')[0]
      ?? user.user_metadata?.full_name?.split(' ')[0]
      ?? 'Boss';

    const memberData = {
      firstName,
      fullName:     profile?.full_name     ?? '',
      email:        user.email             ?? '',
      businessName: profile?.business_name ?? '',
      avatarUrl:    profile?.avatar_url    ?? null,
      memberSince:  (profile as any)?.member_since ?? null,
      role:         profile?.role          ?? 'bsp_member',
    };

    try {
      sessionStorage.setItem('bsp_member', JSON.stringify(memberData));
    } catch {}

    setReady(true);
  }, [user, profile, initialized, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0A09] flex-col gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[rgba(220,189,239,0.15)] border-t-[#FA6A27]" />
        <p className="text-sm text-[#7A6E68]">Loading your dashboard…</p>
      </div>
    );
  }

  return (
    <iframe
      src="/bsp-dashboard.html"
      className="block h-screen w-full border-none bg-[#0C0A09]"
      title="BSP Member Dashboard"
      onLoad={(e) => {
        // Also set sessionStorage inside the iframe once it loads
        try {
          const stored = sessionStorage.getItem('bsp_member');
          if (stored) {
            (e.target as HTMLIFrameElement).contentWindow?.sessionStorage.setItem('bsp_member', stored);
          }
        } catch {}
      }}
    />
  );
}

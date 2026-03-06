'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';

/**
 * Redirect to /login if user is not authenticated.
 * Returns { user, profile, subscription, loading }.
 */
export function useRequireAuth() {
  const router = useRouter();
  const { user, profile, subscription, loading, initialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    if (initialized && !loading && !user) {
      router.replace('/login');
    }
  }, [initialized, loading, user, router]);

  return { user, profile, subscription, loading: loading || !initialized };
}

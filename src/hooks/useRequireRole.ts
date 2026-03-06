'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from './useRequireAuth';
import type { UserRole } from '@/lib/types';

/**
 * Requires user to be authenticated AND have one of the allowed roles.
 * Redirects to /not-authorized if role doesn't match.
 */
export function useRequireRole(allowedRoles: UserRole[]) {
  const router = useRouter();
  const auth = useRequireAuth();

  useEffect(() => {
    if (!auth.loading && auth.profile && !allowedRoles.includes(auth.profile.role)) {
      router.replace('/not-authorized');
    }
  }, [auth.loading, auth.profile, allowedRoles, router]);

  return auth;
}

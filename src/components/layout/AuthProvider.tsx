'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  return <>{children}</>;
}

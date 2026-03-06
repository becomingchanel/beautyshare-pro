'use client';

import { useAuthStore } from '@/lib/store/auth';

export function useAuth() {
  return useAuthStore();
}

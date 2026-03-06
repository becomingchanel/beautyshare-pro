'use client';

import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Subscription } from '@/lib/types';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  loading: boolean;
  initialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, businessName: string) => Promise<{ error: string | null; userId: string | null }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  subscription: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      set({ user });
      await get().fetchProfile(user.id);
    }

    set({ loading: false, initialized: true });

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = session?.user ?? null;
      set({ user: newUser });
      if (newUser) {
        await get().fetchProfile(newUser.id);
      } else {
        set({ profile: null, subscription: null });
      }
    });
  },

  fetchProfile: async (userId: string) => {
    const supabase = createClient();

    const [profileResult, subResult] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('subscriptions').select('*').eq('profile_id', userId).single(),
    ]);

    set({
      profile: profileResult.data as Profile | null,
      subscription: subResult.data as Subscription | null,
    });
  },

  signIn: async (email, password) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  },

  signUp: async (email, password, fullName, businessName) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, business_name: businessName },
      },
    });
    if (error) return { error: error.message, userId: null };

    // Create profile row
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
        business_name: businessName,
        role: 'free_member',
      });
    }

    return { error: null, userId: data.user?.id ?? null };
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null, subscription: null });
  },

  setUser: (user) => set({ user }),
}));

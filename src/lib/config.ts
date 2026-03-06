// Centralized environment variable access with runtime validation

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/** Server-only config — do NOT import in client components */
export const serverConfig = {
  stripe: {
    secretKey: () => requireEnv('STRIPE_SECRET_KEY'),
    webhookSecret: () => requireEnv('STRIPE_WEBHOOK_SECRET'),
  },
  supabase: {
    serviceRoleKey: () => requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  },
};

/** Client-safe config — uses NEXT_PUBLIC_ vars */
export const publicConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  },
};

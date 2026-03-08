import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  // Use NEXT_PUBLIC_APP_URL so redirects work even if Supabase sends
  // the user to an unexpected origin (e.g. localhost vs Vercel)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a subscription — if not, redirect to checkout
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('profile_id', user.id)
          .single();

        if (!sub) {
          // No subscription yet — redirect to Stripe checkout
          return NextResponse.redirect(`${baseUrl}/api/stripe/checkout`);
        }
      }

      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  // Auth code exchange failed
  return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`);
}

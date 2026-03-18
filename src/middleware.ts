import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse, supabase } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Public routes — no auth needed
  const publicRoutes = ['/', '/login', '/signup', '/websites', '/auth', '/api/stripe/webhook', '/webinar', '/upsells', '/stylist-calculator', '/fast-track', '/marketing-playbook', '/thank-you', '/upgrade'];
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (isPublic) {
    return supabaseResponse;
  }

  // Protected routes — redirect to login if not authenticated
  if (!user && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If logged-in user visits /login, redirect to dashboard
  if (user && pathname === '/login') {
    // Check role to decide where to send them
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const url = request.nextUrl.clone();
    url.pathname = profile?.role === 'admin' ? '/dashboard/admin' : '/dashboard';
    return NextResponse.redirect(url);
  }

  // Admin-only routes
  if (user && pathname.startsWith('/dashboard/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/not-authorized';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

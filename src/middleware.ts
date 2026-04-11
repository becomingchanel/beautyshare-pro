import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse, supabase } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Public routes — no auth needed
  const publicRoutes = [
    '/', '/login', '/signup', '/websites', '/auth',
    '/api/stripe/webhook', '/api/ghl/onboard',
    '/webinar', '/upsells', '/stylist-calculator',
    '/fast-track', '/marketing-playbook', '/thank-you',
    '/upgrade', '/products', '/education', '/replay',
  ];
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (isPublic) return supabaseResponse;

  // Protect /dashboard/* and /members/*
  const isProtected = pathname.startsWith('/dashboard') ||
                      pathname.startsWith('/members') ||
                      pathname.startsWith('/templates');

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Logged-in user visits /login → send to right dashboard
  if (user && pathname === '/login') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const url = request.nextUrl.clone();
    if (profile?.role === 'admin') {
      url.pathname = '/dashboard/admin';
    } else if (profile?.role === 'bsp_member' || profile?.role === 'subscriber') {
      url.pathname = '/members/dashboard';
    } else {
      url.pathname = '/dashboard';
    }
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

  // BSP member routes — must be bsp_member, subscriber, or admin
  if (user && pathname.startsWith('/members')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['bsp_member', 'subscriber', 'admin'].includes(profile.role)) {
      const url = request.nextUrl.clone();
      url.pathname = '/signup';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

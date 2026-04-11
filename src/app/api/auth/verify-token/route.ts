// src/app/api/auth/verify-token/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://beautyshare-pro.vercel.app';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'missing_token' }, { status: 400 });
    }

    const supabase = createAdminClient() as any;

    const { data: record } = await supabase
      .from('bsp_magic_tokens')
      .select('*, profiles!inner(id, full_name, email, business_name, role, avatar_url, member_since, ghl_contact_id)')
      .eq('token', token)
      .eq('used', false)
      .single();

    if (!record) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: 'expired_token' }, { status: 401 });
    }

    const profile = record.profiles;
    if (!profile || !['bsp_member', 'subscriber', 'admin'].includes(profile.role)) {
      return NextResponse.json({ error: 'not_member' }, { status: 403 });
    }

    await supabase
      .from('bsp_magic_tokens')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('token', token);

    const adminClient = createAdminClient();
    const { data: linkData } = await adminClient.auth.admin.generateLink({
      type: 'magiclink',
      email: profile.email,
      options: { redirectTo: `${BASE_URL}/members/dashboard` },
    });

    return NextResponse.json({
      success:     true,
      redirectUrl: linkData?.properties?.action_link ?? `${BASE_URL}/members/dashboard`,
      profile: {
        id:           profile.id,
        firstName:    (profile.full_name as string)?.split(' ')[0] ?? 'Boss',
        fullName:     profile.full_name,
        email:        profile.email,
        businessName: profile.business_name,
        role:         profile.role,
        avatarUrl:    profile.avatar_url ?? null,
        memberSince:  profile.member_since ?? null,
      },
    });
  } catch (err) {
    console.error('[verify-token]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

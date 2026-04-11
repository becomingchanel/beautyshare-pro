// src/app/api/auth/magic-link/route.ts
// POST { email } → validates BSP member, generates token, fires GHL workflow

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

const BASE_URL              = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://beautyshare-pro.vercel.app';
const GHL_API_KEY           = process.env.GHL_API_KEY;
const GHL_MAGIC_WORKFLOW_ID = process.env.GHL_MAGIC_LINK_WORKFLOW_ID;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email?.includes('@')) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const supabase   = createAdminClient();

    // 1. Verify this is an active BSP member
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, ghl_contact_id')
      .eq('email', normalized)
      .in('role', ['bsp_member', 'subscriber', 'admin'])
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'not_member' }, { status: 404 });
    }

    // 2. Generate secure single-use token (15 min expiry)
    const token     = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await supabase
      .from('bsp_magic_tokens' as any)
      .upsert({
        user_id:    profile.id,
        email:      normalized,
        token,
        expires_at: expiresAt.toISOString(),
        used:       false,
      }, { onConflict: 'user_id' });

    const loginUrl = `${BASE_URL}/login?token=${token}`;
    const firstName = profile.full_name?.split(' ')[0] ?? 'Boss';

    // 3. Fire GHL workflow OR log in dev
    if (profile.ghl_contact_id && GHL_API_KEY && GHL_MAGIC_WORKFLOW_ID) {
      await fireGHLMagicLink({ contactId: profile.ghl_contact_id, firstName, loginUrl });
    } else {
      console.log(`[dev] Magic link for ${normalized}: ${loginUrl}`);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[magic-link]', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

async function fireGHLMagicLink({ contactId, firstName, loginUrl }: {
  contactId: string; firstName: string; loginUrl: string;
}) {
  const headers = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };

  // Update custom fields on the GHL contact
  await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      customFields: [
        { key: 'bsp_dashboard_link', field_value: loginUrl },
        { key: 'bsp_first_name',     field_value: firstName },
      ],
    }),
  });

  // Enroll in magic link email workflow
  await fetch('https://services.leadconnectorhq.com/contacts/workflows/', {
    method: 'POST',
    headers,
    body: JSON.stringify({ workflowId: GHL_MAGIC_WORKFLOW_ID, contactId }),
  });
}

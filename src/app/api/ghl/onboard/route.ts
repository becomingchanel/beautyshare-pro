// src/app/api/ghl/onboard/route.ts
// POST from GHL when a member pays → creates Supabase account, fires welcome email

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

const BASE_URL             = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://beautyshare-pro.vercel.app';
const GHL_API_KEY          = process.env.GHL_API_KEY;
const GHL_WEBHOOK_SECRET   = process.env.GHL_WEBHOOK_SECRET;
const GHL_WELCOME_WORKFLOW = process.env.GHL_WELCOME_WORKFLOW_ID;

export async function POST(req: Request) {
  try {
    // Optional webhook signature check
    const sig = req.headers.get('x-ghl-signature');
    if (GHL_WEBHOOK_SECRET && sig !== GHL_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      email,
      full_name,
      first_name,
      last_name,
      business_name,
      id: ghlContactId,
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'missing_email' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const fullName   = (full_name ?? `${first_name ?? ''} ${last_name ?? ''}`.trim()) || 'Boss';
    const supabase   = createAdminClient();

    // 1. Check if Supabase auth user already exists
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existing = users?.find(u => u.email === normalized);
    let userId: string;

    if (existing) {
      userId = existing.id;
      await supabase
        .from('profiles')
        .update({ role: 'bsp_member', ghl_contact_id: ghlContactId })
        .eq('id', userId);
    } else {
      // 2. Create new Supabase auth user (no password — magic link only)
      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email:         normalized,
        email_confirm: true,
        user_metadata: { full_name: fullName, business_name: business_name ?? '' },
      });

      if (createErr || !newUser?.user) {
        throw new Error(`Create user failed: ${createErr?.message}`);
      }

      userId = newUser.user.id;

      // 3. Insert profile row
      await supabase.from('profiles').upsert({
        id:             userId,
        email:          normalized,
        full_name:      fullName,
        business_name:  business_name ?? '',
        role:           'bsp_member',
        ghl_contact_id: ghlContactId,
        member_since:   new Date().toISOString(),
      }, { onConflict: 'id' });
    }

    // 4. Generate welcome magic token (30 min for first login)
    const welcomeToken = crypto.randomBytes(32).toString('hex');
    await supabase.from('bsp_magic_tokens').upsert({
      user_id:    userId,
      email:      normalized,
      token:      welcomeToken,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      used:       false,
    }, { onConflict: 'user_id' });

    const dashboardUrl = `${BASE_URL}/login?token=${welcomeToken}`;
    const firstName    = fullName.split(' ')[0];

    // 5. Update GHL contact fields + fire welcome workflow
    if (GHL_API_KEY && ghlContactId) {
      const headers = {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      };

      await fetch(`https://services.leadconnectorhq.com/contacts/${ghlContactId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          customFields: [
            { key: 'bsp_dashboard_link', field_value: dashboardUrl },
            { key: 'bsp_first_name',     field_value: firstName },
          ],
        }),
      });

      if (GHL_WELCOME_WORKFLOW) {
        await fetch('https://services.leadconnectorhq.com/contacts/workflows/', {
          method: 'POST',
          headers,
          body: JSON.stringify({ workflowId: GHL_WELCOME_WORKFLOW, contactId: ghlContactId }),
        });
      }
    }

    console.log(`[onboard] ✓ ${normalized} → ${dashboardUrl}`);
    return NextResponse.json({ success: true, userId, dashboardUrl });

  } catch (err) {
    console.error('[ghl-onboard]', err);
    return NextResponse.json({ error: 'server_error', message: String(err) }, { status: 500 });
  }
}

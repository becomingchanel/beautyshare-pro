// Supabase Edge Function: run-migration
// Deploy with: supabase functions deploy run-migration
// Invoke once: POST https://fybpgshwbzfxvtzrvwgv.supabase.co/functions/v1/run-migration
// with Authorization: Bearer <service_role_key>
// DELETE THIS FUNCTION after successful run

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return new Response('Unauthorized', { status: 401 });

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const results: string[] = [];
  const errors: string[] = [];

  // Run each DDL statement
  const ddlStatements = [
    ['Add ghl_contact_id',  `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ghl_contact_id TEXT`],
    ['Add member_since',    `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS member_since TIMESTAMPTZ DEFAULT NOW()`],
    ['Add discord_joined',  `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS discord_joined BOOLEAN DEFAULT FALSE`],
    ['Create bsp_magic_tokens', `
      CREATE TABLE IF NOT EXISTS bsp_magic_tokens (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used BOOLEAN NOT NULL DEFAULT FALSE,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id)
      )
    `],
    ['Token index',      `CREATE INDEX IF NOT EXISTS idx_bsp_magic_tokens_token ON bsp_magic_tokens(token)`],
    ['User ID index',    `CREATE INDEX IF NOT EXISTS idx_bsp_magic_tokens_user_id ON bsp_magic_tokens(user_id)`],
    ['Enable RLS',       `ALTER TABLE bsp_magic_tokens ENABLE ROW LEVEL SECURITY`],
  ];

  for (const [label, sql] of ddlStatements) {
    const { error } = await supabaseAdmin.rpc('exec_ddl', { statement: sql.trim() })
      .catch(() => ({ error: { message: 'rpc not available' } }));
    
    if (error) {
      errors.push(`${label}: ${error.message}`);
    } else {
      results.push(`✓ ${label}`);
    }
  }

  return new Response(JSON.stringify({ results, errors }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
});

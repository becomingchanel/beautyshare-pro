-- ================================================================
-- BSP Auth Migration  — run in Supabase SQL Editor
-- ================================================================

-- 1. Add BSP-specific columns to existing profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS ghl_contact_id TEXT,
  ADD COLUMN IF NOT EXISTS member_since   TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS discord_joined BOOLEAN DEFAULT FALSE;

-- 2. Add 'bsp_member' to role options (profiles.role is TEXT so just document it)
-- Existing roles: 'admin' | 'subscriber' | 'free_member'
-- New role:       'bsp_member'  (active paying BSP member)

-- 3. Magic link tokens table
CREATE TABLE IF NOT EXISTS bsp_magic_tokens (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  token       TEXT UNIQUE NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN NOT NULL DEFAULT FALSE,
  used_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_bsp_magic_tokens_token   ON bsp_magic_tokens(token);
CREATE INDEX IF NOT EXISTS idx_bsp_magic_tokens_user_id ON bsp_magic_tokens(user_id);

ALTER TABLE bsp_magic_tokens ENABLE ROW LEVEL SECURITY;
-- No client-side access — API routes use service role key only

-- 4. Update middleware to recognise bsp_member as a protected role
-- (handled in src/middleware.ts — see PR)

-- Verify:
-- SELECT column_name FROM information_schema.columns WHERE table_name='profiles';
-- SELECT * FROM bsp_magic_tokens LIMIT 1;

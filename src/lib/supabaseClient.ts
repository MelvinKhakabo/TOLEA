import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigured = Boolean(url && anonKey)

if (!supabaseConfigured) {
  // Never throw at import time — that would blank the whole site. The forms
  // show an error instead (see src/lib/api/leads.ts).
  console.error(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, then restart `npm run dev`.',
  )
}

// Only the public anon key ever lives in frontend code. Privileged work
// (verifying orgs, reviewing leads) happens in the Supabase dashboard.
export const supabase: SupabaseClient = createClient(
  url || 'http://localhost:54321',
  anonKey || 'missing-anon-key',
)
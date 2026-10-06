import { supabase, supabaseConfigured } from '../supabaseClient'

export type OpportunityMode = 'Online' | 'In-person' | 'Hybrid'

export interface Opportunity {
  id: string
  title: string
  location: string | null
  mode: OpportunityMode
  is_paid: boolean
  skills: string[]
  description: string | null
  created_at: string
  // Null if the organisation isn't verified (RLS hides unverified orgs).
  organization: { name: string; tier: string; verified: boolean } | null
}

// Public read: only published opportunities are visible to the anon key
// (see supabase/schema.sql).
export async function getOpportunities(): Promise<Opportunity[]> {
  if (!supabaseConfigured) throw new Error('not-configured')
  const { data, error } = await supabase
    .from('opportunities')
    .select(
      'id, title, location, mode, is_paid, skills, description, created_at, organization:organizations(name, tier, verified)',
    )
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getOpportunities failed:', error)
    throw new Error('load-failed')
  }
  return (data ?? []) as unknown as Opportunity[]
}
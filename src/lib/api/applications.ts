import { supabase, supabaseConfigured } from '../supabaseClient'

export type ApplicationStatus =
  | 'submitted'
  | 'needs_guardian_consent'
  | 'reviewing'
  | 'accepted'
  | 'declined'
  | 'withdrawn'

export class ProfileIncompleteError extends Error {}
export class ApplyError extends Error {}

/** opportunity_id → status, for the signed-in volunteer (RLS limits rows to their own). */
export async function getMyApplications(): Promise<Record<string, ApplicationStatus>> {
  if (!supabaseConfigured) return {}
  const { data, error } = await supabase.from('applications').select('opportunity_id, status')
  if (error) {
    console.error('getMyApplications failed:', error)
    return {}
  }
  const out: Record<string, ApplicationStatus> = {}
  for (const row of data ?? []) out[row.opportunity_id as string] = row.status as ApplicationStatus
  return out
}

/** Create an application. The database decides the status (see supabase/auth.sql). */
export async function applyToOpportunity(opportunityId: string): Promise<ApplicationStatus> {
  const { data, error } = await supabase
    .from('applications')
    .insert({ opportunity_id: opportunityId })
    .select('status')
    .single()
  if (error) {
    if (error.code === '23505') return 'submitted' // already applied
    const msg = error.message ?? ''
    if (msg.includes('Complete your profile')) throw new ProfileIncompleteError(msg)
    if (msg.includes('at least 15')) throw new ApplyError('You must be at least 15 to apply.')
    console.error('applyToOpportunity failed:', error)
    throw new ApplyError('We couldn’t submit your application. Please try again.')
  }
  return data.status as ApplicationStatus
}
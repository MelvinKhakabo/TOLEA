import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase, supabaseConfigured } from '../supabaseClient'
import { AuthContext, type AuthState, type Profile } from './context'

/** Turn Supabase's technical errors into something a volunteer can act on. */
function friendly(err: { message?: string } | null | undefined): Error {
  const m = (err?.message ?? '').toLowerCase()
  if (m.includes('invalid login')) return new Error('That email and password don’t match. Please try again.')
  if (m.includes('email not confirmed')) return new Error('Please confirm your email first — check your inbox for the link.')
  if (m.includes('already registered') || m.includes('already been registered'))
    return new Error('An account with this email already exists. Try logging in instead.')
  if (m.includes('password') && m.includes('characters')) return new Error('Your password needs at least 8 characters.')
  if (m.includes('rate limit') || m.includes('too many'))
    return new Error('Too many attempts right now. Please wait a few minutes and try again.')
  if (m.includes('failed to fetch') || m.includes('network'))
    return new Error('We couldn’t reach the server. Check your connection and try again.')
  return new Error('Something went wrong. Please try again.')
}

function requireConfigured() {
  if (!supabaseConfigured) throw new Error('Accounts are not connected yet. Please try again later.')
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [sessionLoading, setSessionLoading] = useState(supabaseConfigured)
  const [fetched, setFetched] = useState<{ uid: string; profile: Profile | null } | null>(null)
  const [profileVersion, setProfileVersion] = useState(0)

  useEffect(() => {
    if (!supabaseConfigured) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setSessionLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user.id

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    supabase
      .from('profiles')
      .select('id, full_name, date_of_birth, track')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error('profile load failed:', error)
        if (!cancelled) setFetched({ uid: userId, profile: (data as Profile | null) ?? null })
      })
    return () => {
      cancelled = true
    }
  }, [userId, profileVersion])

  const user = session?.user ?? null
  const profile = userId && fetched?.uid === userId ? fetched.profile : null
  const profileLoading = Boolean(userId) && fetched?.uid !== userId
  const profileIncomplete = Boolean(user) && !profileLoading && (!profile?.date_of_birth || !profile?.track || !profile?.full_name)

  const signUp = useCallback<AuthState['signUp']>(async ({ email, password, fullName, dateOfBirth, track }) => {
    requireConfigured()
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim(), date_of_birth: dateOfBirth, track },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })
    if (error) throw friendly(error)
    return { needsConfirmation: !data.session }
  }, [])

  const signIn = useCallback<AuthState['signIn']>(async (email, password) => {
    requireConfigured()
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) throw friendly(error)
  }, [])

  const signInWithGoogle = useCallback<AuthState['signInWithGoogle']>(async () => {
    requireConfigured()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/complete-profile` },
    })
    if (error) throw friendly(error)
  }, [])

  const signOut = useCallback<AuthState['signOut']>(async () => {
    await supabase.auth.signOut()
  }, [])

  const sendPasswordReset = useCallback<AuthState['sendPasswordReset']>(async (email) => {
    requireConfigured()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw friendly(error)
  }, [])

  const updatePassword = useCallback<AuthState['updatePassword']>(async (password) => {
    requireConfigured()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw friendly(error)
  }, [])

  const saveProfile = useCallback<AuthState['saveProfile']>(
    async ({ fullName, dateOfBirth, track }) => {
      if (!userId) throw new Error('Please log in first.')
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, full_name: fullName.trim(), date_of_birth: dateOfBirth, track })
      if (error) {
        console.error('saveProfile failed:', error)
        throw new Error('We couldn’t save your details. Please try again.')
      }
      setProfileVersion((v) => v + 1)
    },
    [userId],
  )

  const value = useMemo<AuthState>(
    () => ({
      user,
      profile,
      loading: sessionLoading || profileLoading,
      profileIncomplete,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      sendPasswordReset,
      updatePassword,
      saveProfile,
    }),
    [user, profile, sessionLoading, profileLoading, profileIncomplete, signUp, signIn, signInWithGoogle, signOut, sendPasswordReset, updatePassword, saveProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
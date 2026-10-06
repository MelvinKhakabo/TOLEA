import { createContext, useContext } from 'react'
import type { User } from '@supabase/supabase-js'
import type { Track } from '../age'

export interface Profile {
  id: string
  full_name: string
  date_of_birth: string | null
  track: Track | null
}

export interface SignUpInput {
  email: string
  password: string
  fullName: string
  dateOfBirth: string
  track: Track
}

export interface AuthState {
  user: User | null
  profile: Profile | null
  /** True while the session (or the profile for a signed-in user) is still loading. */
  loading: boolean
  /** True when signed in but name / date of birth / track are still missing (e.g. Google signups). */
  profileIncomplete: boolean
  signUp: (input: SignUpInput) => Promise<{ needsConfirmation: boolean }>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  saveProfile: (input: { fullName: string; dateOfBirth: string; track: Track }) => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
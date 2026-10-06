import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AgeTrackFields from '../components/AgeTrackFields'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ErrorNote from '../components/ErrorNote'
import FormField from '../components/FormField'
import { ageFromDob, dobBounds, resolveTrack } from '../lib/age'
import { useAuth } from '../lib/auth/context'
import { inputClass } from '../lib/formStyles'

// Shown after Google sign-in (Google doesn't give us a date of birth or track),
// and to anyone whose profile is missing details.
export default function CompleteProfile() {
  const { user, profile, loading, profileIncomplete, saveProfile } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState<string | null>(null)
  const [dob, setDob] = useState('')
  const [track, setTrack] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (loading) {
    return (
      <AuthCard eyebrow="one last step" title="One moment…">
        <p className="text-[13px] text-umber-soft">Loading your account…</p>
      </AuthCard>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  if (!profileIncomplete) return <Navigate to="/opportunities" replace />

  const nameValue = fullName ?? profile?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? ''

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const age = ageFromDob(dob)
    if (age === null || dob > dobBounds().max) {
      setError('Please enter a valid date of birth. Tolea is open from age 15.')
      return
    }
    const resolved = resolveTrack(age, track)
    if (!resolved) {
      setError('Please choose your track.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await saveProfile({ fullName: nameValue, dateOfBirth: dob, track: resolved })
      navigate('/opportunities', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard eyebrow="one last step" title="Finish your profile" subtitle="We need a few details so we can match you to the right placements.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full name" required>
          <input required className={inputClass} value={nameValue} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Wanjiru" autoComplete="name" />
        </FormField>
        <AgeTrackFields dob={dob} track={track} onDob={setDob} onTrack={setTrack} />
        <ErrorNote message={error} />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full disabled:opacity-60">
          {submitting ? 'Saving…' : 'Save and continue'}
        </Button>
      </form>
    </AuthCard>
  )
}
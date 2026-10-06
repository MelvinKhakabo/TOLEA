import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AgeTrackFields from '../components/AgeTrackFields'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ErrorNote from '../components/ErrorNote'
import FormField from '../components/FormField'
import GoogleButton from '../components/GoogleButton'
import Honeypot from '../components/Honeypot'
import { ageFromDob, dobBounds, resolveTrack } from '../lib/age'
import { useAuth } from '../lib/auth/context'
import { inputClass } from '../lib/formStyles'

export default function Signup() {
  const { user, loading, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [track, setTrack] = useState('')
  const [password, setPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [hp, setHp] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)

  if (!loading && user && !checkEmail) return <Navigate to="/opportunities" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (hp) {
      setCheckEmail(true) // bot — pretend it worked, send nothing
      return
    }
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
    if (password.length < 8) {
      setError('Your password needs at least 8 characters.')
      return
    }
    if (!consent) {
      setError('Please tick the box to let us store your details.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const { needsConfirmation } = await signUp({ email, password, fullName, dateOfBirth: dob, track: resolved })
      if (needsConfirmation) setCheckEmail(true)
      else navigate('/opportunities')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function google() {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.')
    }
  }

  if (checkEmail) {
    return (
      <AuthCard eyebrow="almost there" title="Check your email" footer={<Link to="/login" className="text-indigo font-medium">Back to log in</Link>}>
        <p className="text-[13px] text-umber-soft leading-[1.6]">
          We’ve sent a confirmation link to <strong className="text-umber">{email}</strong>. Click it to
          activate your account, then log in and start applying.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="join tolea"
      title="Create your free account"
      subtitle="Apply to verified placements and track your skills. It takes a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-indigo font-medium">
            Log in
          </Link>
        </>
      }
    >
      <GoogleButton onClick={google} label="Sign up with Google" />
      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-line" />
        <span className="font-mono text-[10px] text-taupe uppercase">or with email</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-4">
        <Honeypot value={hp} onChange={setHp} />
        <FormField label="Full name" required>
          <input required className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Wanjiru" autoComplete="name" />
        </FormField>
        <FormField label="Email" required>
          <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" autoComplete="email" />
        </FormField>
        <AgeTrackFields dob={dob} track={track} onDob={setDob} onTrack={setTrack} />
        <FormField label="Password" required hint="At least 8 characters.">
          <input required type="password" minLength={8} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </FormField>

        <label className="flex items-start gap-2.5 text-[12px] text-umber-soft leading-[1.5] cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#2B6E4F]" />
          <span>I agree that Tolea may store my details to match me with placements and process my applications.</span>
        </label>

        <ErrorNote message={error} />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full disabled:opacity-60">
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthCard>
  )
}
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ErrorNote from '../components/ErrorNote'
import FormField from '../components/FormField'
import GoogleButton from '../components/GoogleButton'
import { useAuth } from '../lib/auth/context'
import { inputClass } from '../lib/formStyles'

export default function Login() {
  const { user, loading, signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/opportunities'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loading && user) return <Navigate to={from} replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
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

  return (
    <AuthCard
      eyebrow="welcome back"
      title="Log in to Tolea"
      subtitle="Pick up where you left off and apply to open placements."
      footer={
        <>
          New to Tolea?{' '}
          <Link to="/signup" className="text-indigo font-medium">
            Create a free account
          </Link>
        </>
      }
    >
      <GoogleButton onClick={google} />
      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-line" />
        <span className="font-mono text-[10px] text-taupe uppercase">or with email</span>
        <div className="h-px flex-1 bg-line" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" required>
          <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" autoComplete="email" />
        </FormField>
        <FormField label="Password" required>
          <input required type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </FormField>
        <div className="text-right -mt-2">
          <Link to="/forgot-password" className="text-[12px] text-indigo font-medium">
            Forgot password?
          </Link>
        </div>
        <ErrorNote message={error} />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full disabled:opacity-60">
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthCard>
  )
}
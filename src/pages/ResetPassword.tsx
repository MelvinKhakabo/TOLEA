import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ErrorNote from '../components/ErrorNote'
import FormField from '../components/FormField'
import { useAuth } from '../lib/auth/context'
import { inputClass } from '../lib/formStyles'

export default function ResetPassword() {
  const { user, loading, updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Your password needs at least 8 characters.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await updatePassword(password)
      navigate('/opportunities', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AuthCard eyebrow="reset password" title="One moment…">
        <p className="text-[13px] text-umber-soft">Checking your link…</p>
      </AuthCard>
    )
  }

  if (!user) {
    return (
      <AuthCard
        eyebrow="reset password"
        title="This link has expired"
        footer={<Link to="/forgot-password" className="text-indigo font-medium">Request a new link</Link>}
      >
        <p className="text-[13px] text-umber-soft leading-[1.6]">Reset links only work once and for a short time.</p>
      </AuthCard>
    )
  }

  return (
    <AuthCard eyebrow="reset password" title="Choose a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="New password" required hint="At least 8 characters.">
          <input required type="password" minLength={8} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </FormField>
        <ErrorNote message={error} />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full disabled:opacity-60">
          {submitting ? 'Saving…' : 'Save new password'}
        </Button>
      </form>
    </AuthCard>
  )
}
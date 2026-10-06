import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ErrorNote from '../components/ErrorNote'
import FormField from '../components/FormField'
import { useAuth } from '../lib/auth/context'
import { inputClass } from '../lib/formStyles'

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const footer = (
    <>
      Remembered it?{' '}
      <Link to="/login" className="text-indigo font-medium">
        Back to log in
      </Link>
    </>
  )

  if (sent) {
    return (
      <AuthCard eyebrow="forgot password" title="Check your inbox" footer={footer}>
        <p className="text-[13px] text-umber-soft leading-[1.6]">
          If an account exists for <span className="font-medium text-umber">{email.trim()}</span>, we've sent a link to
          reset your password. It only works once and for a short time.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="forgot password"
      title="Reset your password"
      subtitle="Enter the email you signed up with and we'll send you a link to choose a new password."
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" required>
          <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" autoComplete="email" />
        </FormField>
        <ErrorNote message={error} />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
    </AuthCard>
  )
}

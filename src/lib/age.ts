export const MIN_AGE = 15
export const TRACKS = ['Kenyan', 'International', 'Minor'] as const
export type Track = (typeof TRACKS)[number]

/** Whole years between a YYYY-MM-DD date of birth and today. */
export function ageFromDob(dob: string, today = new Date()): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null
  const [y, m, d] = dob.split('-').map(Number)
  if (!y || !m || !d) return null
  let age = today.getFullYear() - y
  const monthNow = today.getMonth() + 1
  if (monthNow < m || (monthNow === m && today.getDate() < d)) age--
  return age >= 0 && age < 120 ? age : null
}

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

/** Earliest / latest dates the date picker should allow (latest = exactly 15 today). */
export function dobBounds(today = new Date()) {
  const latest = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate())
  return { min: '1920-01-01', max: iso(latest) }
}

/**
 * Under 18 → always the Minor track (guardian co-sign required).
 * 18+ → Kenyan or International, never Minor.
 * Returns '' when the person still needs to choose.
 */
export function resolveTrack(age: number | null, chosen: string): Track | '' {
  if (age !== null && age < 18) return 'Minor'
  if (chosen === 'Kenyan' || chosen === 'International') return chosen
  return ''
}
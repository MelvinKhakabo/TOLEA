import { ageFromDob, dobBounds, resolveTrack } from '../lib/age'
import { inputClass } from '../lib/formStyles'
import FormField from './FormField'

/**
 * Date of birth → age is worked out for the person (never typed, so it can't
 * be wrong or go out of date) → track. Under 18 locks the track to Minor;
 * adults choose Kenyan or International.
 */
export default function AgeTrackFields({
  dob,
  track,
  onDob,
  onTrack,
}: {
  dob: string
  track: string
  onDob: (v: string) => void
  onTrack: (v: string) => void
}) {
  const bounds = dobBounds()
  const age = ageFromDob(dob)
  const tooYoung = dob !== '' && dob > bounds.max
  const isMinor = age !== null && age < 18 && !tooYoung
  const resolved = resolveTrack(tooYoung ? null : age, track)

  return (
    <>
      <div className="grid grid-cols-[1fr_88px] gap-3">
        <FormField label="Date of birth" required>
          <input
            required
            type="date"
            className={inputClass}
            value={dob}
            min={bounds.min}
            onChange={(e) => onDob(e.target.value)}
          />
        </FormField>
        <FormField label="Age">
          <div className={`${inputClass} bg-taupe/10 text-center`} aria-live="polite">
            {age !== null && !tooYoung ? age : '—'}
          </div>
        </FormField>
      </div>

      {tooYoung && (
        <p role="alert" className="text-[12.5px] text-umber bg-marigold-soft border border-marigold rounded-md px-3.5 py-2.5">
          Tolea placements are open from age 15. Come back when you’re 15 — we’d love to have you then.
        </p>
      )}

      <FormField label="Your track" required>
        <select
          required
          disabled={isMinor}
          className={inputClass}
          value={isMinor ? 'Minor' : resolved}
          onChange={(e) => onTrack(e.target.value)}
        >
          <option value="" disabled>
            Select your track
          </option>
          <option value="Kenyan">Kenyan — based in Kenya (free)</option>
          <option value="International">International — travelling to Kenya (paid placement)</option>
          <option value="Minor" disabled={!isMinor}>
            Minor — under 18 (guardian co-sign)
          </option>
        </select>
      </FormField>

      {isMinor && (
        <p className="text-[12px] text-umber-soft leading-[1.55] bg-indigo-soft/50 border border-indigo rounded-md px-3.5 py-2.5">
          Because you’re under 18, you’ll join on the <strong>Minor track</strong>. A parent or guardian
          will need to co-sign before any placement starts — we’ll guide you through it.
        </p>
      )}
    </>
  )
}
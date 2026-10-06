import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBanner from '../components/CtaBanner'
import { getOpportunities, type Opportunity } from '../lib/api/opportunities'

// Same dark-green hero treatment used on Home/About/Donate.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)'

// Listings seeded for demo purposes start with this marker in the description;
// the page strips it and shows a "Sample" tag instead.
const SAMPLE_MARKER = '[Sample] '

// Card accent bars cycle through the site palette.
const BARS = ['bg-forest', 'bg-indigo', 'bg-marigold', 'bg-lime']

const selectClass =
  'rounded-md border border-line bg-white px-3 py-2.5 text-[12.5px] text-umber focus:outline-none focus:border-indigo cursor-pointer'

function ModeTag({ mode }: { mode: Opportunity['mode'] }) {
  const bg = mode === 'Online' ? 'bg-indigo' : mode === 'Hybrid' ? 'bg-forest' : 'bg-forest'
  return <span className={`font-mono text-[9.5px] uppercase px-2 py-1 rounded text-white ${bg}`}>{mode}</span>
}

function OpportunityCard({ o, index }: { o: Opportunity; index: number }) {
  const [open, setOpen] = useState(false)
  const isSample = o.description?.startsWith(SAMPLE_MARKER) ?? false
  const description = (o.description ?? '').replace(SAMPLE_MARKER, '')
  const long = description.length > 150

  return (
    <article className="rounded-[10px] overflow-hidden bg-white border border-line flex flex-col transition-transform hover:-translate-y-0.5">
      <div className={`h-1.5 ${BARS[index % BARS.length]}`} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-mono text-[10px] text-taupe truncate">{o.organization?.name ?? 'Partner organisation'}</span>
            {o.organization?.verified && (
              <span title="Verified organisation" className="shrink-0 w-3.5 h-3.5 rounded-full bg-forest text-white text-[8px] flex items-center justify-center">
                ✓
              </span>
            )}
          </div>
          <ModeTag mode={o.mode} />
        </div>

        <h3 className="font-sans font-bold text-[14.5px] leading-snug mb-2">{o.title}</h3>

        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {o.location && <span className="text-[11.5px] text-umber-soft">{o.location}</span>}
          <span
            className={`font-mono text-[9.5px] uppercase px-2 py-0.5 rounded ${
              o.is_paid ? 'bg-marigold text-umber' : 'bg-taupe/15 text-taupe'
            }`}
          >
            {o.is_paid ? 'Paid stipend' : 'Unpaid'}
          </span>
          {isSample && (
            <span className="font-mono text-[9.5px] uppercase px-2 py-0.5 rounded bg-lime text-umber">Sample</span>
          )}
        </div>

        {description && (
          <div className="mb-3">
            <p className={`text-[12px] text-umber-soft leading-[1.6] m-0 ${open ? '' : 'line-clamp-3'}`}>{description}</p>
            {long && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="text-[11.5px] text-indigo font-medium mt-1 cursor-pointer"
              >
                {open ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {o.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {o.skills.map((s) => (
              <span key={s} className="text-[10.5px] px-2 py-0.5 rounded-full bg-taupe/10 text-umber-soft">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-1">
          <Link
            to="/signup"
            className="inline-block bg-marigold text-umber font-sans font-semibold text-[13px] px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Sign up to apply
          </Link>
        </div>
      </div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-[10px] overflow-hidden bg-white border border-line animate-pulse">
      <div className="h-1.5 bg-taupe/20" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/2 rounded bg-taupe/15" />
        <div className="h-4 w-4/5 rounded bg-taupe/20" />
        <div className="h-3 w-full rounded bg-taupe/10" />
        <div className="h-3 w-3/4 rounded bg-taupe/10" />
        <div className="h-9 w-32 rounded bg-taupe/15 mt-4" />
      </div>
    </div>
  )
}

export default function Opportunities() {
  const [items, setItems] = useState<Opportunity[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const [q, setQ] = useState('')
  const [mode, setMode] = useState('all')
  const [pay, setPay] = useState('all')
  const [location, setLocation] = useState('all')
  const [skill, setSkill] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getOpportunities()
      .then((data) => !cancelled && setItems(data))
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [attempt])

  const locations = useMemo(
    () => Array.from(new Set((items ?? []).map((o) => o.location).filter((l): l is string => !!l))).sort(),
    [items],
  )

  const topSkills = useMemo(() => {
    const counts = new Map<string, number>()
    for (const o of items ?? []) for (const s of o.skills) counts.set(s, (counts.get(s) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([s]) => s)
  }, [items])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return (items ?? []).filter((o) => {
      if (mode !== 'all' && o.mode !== mode) return false
      if (pay === 'paid' && !o.is_paid) return false
      if (pay === 'unpaid' && o.is_paid) return false
      if (location !== 'all' && o.location !== location) return false
      if (skill && !o.skills.includes(skill)) return false
      if (needle) {
        const hay = [o.title, o.organization?.name ?? '', o.location ?? '', o.description ?? '', ...o.skills]
          .join(' ')
          .toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [items, q, mode, pay, location, skill])

  const filtersActive = q !== '' || mode !== 'all' || pay !== 'all' || location !== 'all' || skill !== null
  function resetFilters() {
    setQ('')
    setMode('all')
    setPay('all')
    setLocation('all')
    setSkill(null)
  }

  return (
    <div>
      {/* Hero — floating dark-green panel, same treatment as Home/About/Donate */}
      <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
        <div
          className="relative overflow-hidden rounded-[28px] px-6 sm:px-9 lg:px-16 py-20 md:py-28"
          style={{ background: DARK_GRADIENT }}
        >
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="font-mono text-[11px] mb-3 lowercase tracking-wide" style={{ color: '#C3D82E' }}>
              opportunities
            </div>
            <h1 className="font-display font-bold text-[34px] leading-[1.15] mb-4 text-white">
              Verified placements, ready when you are
            </h1>
            <p className="text-[13.5px] leading-[1.65] max-w-xl mx-auto mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Browse every open role below. Each host is checked before its listing goes live — create
              a free account when you're ready to apply.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <Link
                to="/signup"
                className="inline-block bg-marigold text-umber font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Create your free account
              </Link>
              <Link
                to="/how-we-work"
                className="inline-flex items-center border-2 border-white/70 text-white font-medium text-[13.5px] px-5 py-2.5 rounded-md hover:bg-white/10 transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 sm:px-9 lg:px-16 pt-6 pb-2">
        <div className="max-w-6xl mx-auto rounded-[12px] border-2 border-indigo bg-indigo-soft/40 p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search roles, organisations or skills"
              aria-label="Search opportunities"
              className="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] text-umber placeholder:text-taupe focus:outline-none focus:border-indigo"
            />
            <div className="grid grid-cols-3 gap-3 md:flex">
              <select value={mode} onChange={(e) => setMode(e.target.value)} className={selectClass} aria-label="Mode">
                <option value="all">Any mode</option>
                <option value="In-person">In-person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <select value={pay} onChange={(e) => setPay(e.target.value)} className={selectClass} aria-label="Pay">
                <option value="all">Paid or unpaid</option>
                <option value="paid">Paid stipend</option>
                <option value="unpaid">Unpaid</option>
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Location">
                <option value="all">Any location</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {topSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
              <span className="font-mono text-[10px] text-taupe uppercase mr-1">skills</span>
              {topSkills.map((s) => {
                const on = skill === s
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSkill(on ? null : s)}
                    aria-pressed={on}
                    className={`text-[11.5px] px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                      on ? 'bg-indigo text-white border-indigo' : 'bg-white text-umber-soft border-line hover:border-indigo'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 sm:px-9 lg:px-16 pt-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {items && !error && (
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] text-taupe m-0">
                {filtered.length} of {items.length} {items.length === 1 ? 'opportunity' : 'opportunities'}
              </p>
              {filtersActive && (
                <button type="button" onClick={resetFilters} className="text-[12px] text-indigo font-medium cursor-pointer">
                  Clear filters
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="rounded-[12px] border-2 border-marigold bg-marigold-soft p-8 text-center max-w-lg mx-auto">
              <h2 className="font-display font-bold text-base mb-2">We couldn't load opportunities</h2>
              <p className="text-[12.5px] text-umber-soft leading-[1.6] mb-4">
                Check your connection and try again. If it keeps happening, let us know.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setItems(null)
                    setError(false)
                    setAttempt((n) => n + 1)
                  }}
                  className="bg-marigold text-umber font-sans font-semibold text-[13px] px-4 py-2.5 rounded-md cursor-pointer"
                >
                  Try again
                </button>
                <Link to="/contact" className="text-indigo text-[13px] font-medium self-center">
                  Contact us
                </Link>
              </div>
            </div>
          )}

          {!error && items === null && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!error && items && items.length === 0 && (
            <div className="rounded-[12px] border-2 border-forest bg-forest-soft/50 p-10 text-center max-w-lg mx-auto">
              <h2 className="font-display font-bold text-base mb-2">New placements are on the way</h2>
              <p className="text-[12.5px] text-umber-soft leading-[1.6] mb-4">
                We only list hosts once they're verified, so the first roles are being finalised. Create an
                account and we'll let you know when they open.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-marigold text-umber font-sans font-semibold text-[13px] px-4 py-2.5 rounded-md"
              >
                Create your free account
              </Link>
            </div>
          )}

          {!error && items && items.length > 0 && filtered.length === 0 && (
            <div className="rounded-[12px] border border-line bg-white p-10 text-center max-w-lg mx-auto">
              <h2 className="font-display font-bold text-base mb-2">No matches</h2>
              <p className="text-[12.5px] text-umber-soft mb-4">Try removing a filter or searching for something broader.</p>
              <button type="button" onClick={resetFilters} className="text-indigo text-[13px] font-medium cursor-pointer">
                Clear filters
              </button>
            </div>
          )}

          {!error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((o, i) => (
                <OpportunityCard key={o.id} o={o} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CtaBanner
        eyebrow="not seeing the right fit?"
        headline="Tell us what you want to grow into"
        buttonLabel="Create your free account"
        to="/signup"
        secondaryLinkLabel="Contact us"
        secondaryHref="/contact"
      />
    </div>
  )
}
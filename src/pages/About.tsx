import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SDGS } from '../lib/sdgs'

// Same saturated palette used across Volunteer/HowWeWork/Organizations — one
// accent style map so the mission/vision cards and team tiles read as part of
// the same vibrant system instead of isolated pastel blocks.
type Accent = 'forest' | 'indigo' | 'marigold' | 'lime'

const accentStyles: Record<
  Accent,
  { tile: string; fg: string; border: string; soft: string; eyebrow: string }
> = {
  forest: { tile: 'bg-forest', fg: 'text-white', border: 'border-forest', soft: 'bg-forest-soft', eyebrow: 'text-lime' },
  indigo: { tile: 'bg-indigo', fg: 'text-white', border: 'border-indigo', soft: 'bg-indigo-soft', eyebrow: 'text-lime' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber', border: 'border-marigold', soft: 'bg-marigold-soft', eyebrow: 'text-umber' },
  lime: { tile: 'bg-lime', fg: 'text-umber', border: 'border-lime', soft: 'bg-lime/15', eyebrow: 'text-forest' },
}

const team: { name: string; role: string; accent: Accent }[] = [
  { name: 'Co-founder name', role: 'Co-founder & CEO', accent: 'forest' },
  { name: 'Co-founder name', role: 'Co-founder & CTO', accent: 'indigo' },
  { name: 'Team member', role: 'Head of Partnerships', accent: 'marigold' },
  { name: 'Team member', role: 'Operations', accent: 'lime' },
]

export default function About() {
  const [openSdg, setOpenSdg] = useState<number | null>(null)

  return (
    <div className="bg-ivory">
      {/* Our story */}
      <section className="px-6 sm:px-9 lg:px-16 pt-12 pb-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-[11px] text-forest lowercase mb-3">our story</p>
            <h1 className="font-display text-4xl font-bold leading-tight mb-5">
              Built for the first opportunity that never came easily.
            </h1>
            <p className="text-sm text-umber/70 leading-relaxed max-w-xl">
              Tolea started with a simple observation: Kenyan graduates were finding
              volunteer and internship work through scattered WhatsApp groups and word
              of mouth, with no way to know whether a placement was legitimate, fair, or
              actually going to build a real skill. We set out to build the trusted,
              structured alternative.
            </p>
          </div>
          <div className="rounded-lg aspect-video bg-gradient-to-br from-marigold/30 via-forest/20 to-taupe/30 flex items-end p-3">
            <span className="font-mono text-xs text-umber/60">photo/video: our story</span>
          </div>
        </div>
      </section>

      {/* Mission / Vision — solid saturated panels instead of pale tints, so
          they hold their own the way the hero and CSR panels do elsewhere */}
      <section className="bg-taupe/10 px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="rounded-lg p-7 bg-indigo">
            <p className="font-mono text-[11px] text-lime lowercase mb-3">our vision</p>
            <p className="text-sm text-white/85 leading-relaxed">
              A Kenya where no young person's potential goes to waste for lack of a
              first opportunity, where every placement, local or international, is
              safe, fair, and accountable on both sides.
            </p>
          </div>
          <div className="rounded-lg p-7 bg-forest">
            <p className="font-mono text-[11px] text-lime lowercase mb-3">our mission</p>
            <p className="text-sm text-white/85 leading-relaxed">
              To connect Kenya's young people with verified volunteering and internship
              opportunities that genuinely build employable skills, tracked, evidenced,
              and recognised, while holding individuals and host organisations
              accountable to each other.
            </p>
          </div>
        </div>
      </section>

      {/* SDG alignment — each card tinted with its own official UN goal color */}
      <section className="px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] text-forest lowercase mb-2">our sdg alignment</p>
          <h2 className="font-display text-xl font-bold mb-6">
            Working toward the UN Sustainable Development Goals
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SDGS.map((sdg) => {
              const isOpen = openSdg === sdg.number
              return (
                <button
                  key={sdg.number}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenSdg(isOpen ? null : sdg.number)}
                  className="text-left rounded-lg p-5 flex gap-3 items-start transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    backgroundColor: `${sdg.color}1F`, // ~12% tint of the goal color
                    border: `1px solid ${sdg.color}55`,
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-md flex items-center justify-center font-display font-extrabold text-sm text-white shrink-0"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </span>
                  <span>
                    <span className="block font-medium text-sm mb-1 text-umber">{sdg.name}</span>
                    {!sdg.blurb ? null : isOpen ? (
                      <span className="block text-xs text-umber/70 leading-relaxed">{sdg.blurb}</span>
                    ) : (
                      <span className="block text-xs font-mono" style={{ color: sdg.color }}>
                        tap for more
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet the team — full-bleed tinted band; each card gets its own
          accent border + tinted frame around the photo, cycling through the
          same palette used everywhere else on the page */}
      <section className="bg-taupe/10 px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-lg font-bold mb-6">Meet the team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member) => {
              const a = accentStyles[member.accent]
              return (
                <div
                  key={member.role}
                  className={`text-center rounded-lg p-4 border-2 ${a.border} ${a.soft} transition-transform hover:-translate-y-0.5`}
                >
                  <div className={`aspect-square rounded-lg mb-3 ${a.tile} flex items-end justify-center p-2`}>
                    <span className={`font-mono text-[10px] lowercase ${a.fg} opacity-70`}>photo</span>
                  </div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="font-mono text-xs text-taupe">{member.role}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA — bright/contrasting card, visually separated from the dark footer below it */}
      <section className="px-6 sm:px-9 lg:px-16 pt-10 pb-16 bg-ivory">
        <div className="max-w-6xl mx-auto bg-marigold rounded-xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <p className="text-sm max-w-md text-umber font-medium">Want to be part of building this?</p>
          <Link
            to="/careers"
            className="bg-umber text-ivory font-medium text-sm px-5 py-3 rounded-md hover:opacity-90 transition-opacity shrink-0"
          >
            See open roles
          </Link>
        </div>
      </section>
    </div>
  )
}
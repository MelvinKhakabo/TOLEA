import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SDGS } from '../constants/sdgs'

const team = [
  { name: 'Co-founder name', role: 'Co-founder & CEO' },
  { name: 'Co-founder name', role: 'Co-founder & CTO' },
  { name: 'Team member', role: 'Head of Partnerships' },
  { name: 'Team member', role: 'Operations' },
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
            <p className="text-sm text-ink/70 leading-relaxed max-w-xl">
              Tolea started with a simple observation: Kenyan graduates were finding
              volunteer and internship work through scattered WhatsApp groups and word
              of mouth, with no way to know whether a placement was legitimate, fair, or
              actually going to build a real skill. We set out to build the trusted,
              structured alternative.
            </p>
          </div>
          <div className="rounded-lg aspect-video bg-gradient-to-br from-marigold/30 via-forest/20 to-taupe/30 flex items-end p-3">
            <span className="font-mono text-xs text-ink/60">photo/video: our story</span>
          </div>
        </div>
      </section>

      {/* Mission / Vision — full-bleed tinted band */}
      <section className="bg-taupe/10 px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="rounded-lg border border-taupe/30 bg-white p-7">
            <p className="font-mono text-[11px] text-indigo lowercase mb-3">our vision</p>
            <p className="text-sm text-ink/70 leading-relaxed">
              A Kenya where no young person's potential goes to waste for lack of a
              first opportunity, where every placement, local or international, is
              safe, fair, and accountable on both sides.
            </p>
          </div>
          <div className="rounded-lg border border-taupe/30 bg-white p-7">
            <p className="font-mono text-[11px] text-forest lowercase mb-3">our mission</p>
            <p className="text-sm text-ink/70 leading-relaxed">
              To connect Kenya's young people with verified volunteering and internship
              opportunities that genuinely build employable skills, tracked, evidenced,
              and recognised, while holding individuals and host organisations
              accountable to each other.
            </p>
          </div>
        </div>
      </section>

      {/* SDG alignment */}
      <section className="px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] text-forest lowercase mb-2">our sdg alignment</p>
          <h2 className="font-display text-xl font-bold mb-6">
            Working toward the UN Sustainable Development Goals
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SDGS.map((sdg) => {
              const isOpen = openSdg === sdg.id
              return (
                <button
                  key={sdg.id}
                  onClick={() => setOpenSdg(isOpen ? null : sdg.id)}
                  className="text-left rounded-lg border border-taupe/30 bg-white p-5 flex gap-3 items-start hover:border-taupe/60 hover:shadow-sm transition-all"
                >
                  <span
                    className="w-9 h-9 rounded-md flex items-center justify-center font-display font-extrabold text-sm text-white shrink-0"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </span>
                  <span>
                    <span className="block font-medium text-sm mb-1">{sdg.shortName}</span>
                    {isOpen ? (
                      <span className="block text-xs text-ink/70 leading-relaxed">{sdg.detail}</span>
                    ) : (
                      <span className="block text-xs text-taupe font-mono">tap for more</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet the team — full-bleed tinted band */}
      <section className="bg-taupe/10 px-6 sm:px-9 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-lg font-bold mb-6">Meet the team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="aspect-square rounded-lg bg-taupe/20 mb-3" />
                <p className="font-medium text-sm">{member.name}</p>
                <p className="font-mono text-xs text-taupe">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink text-ivory px-6 sm:px-9 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm max-w-md">Want to be part of building this?</p>
          <Link
            to="/careers"
            className="bg-marigold text-ink font-medium text-sm px-5 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            See open roles
          </Link>
        </div>
      </section>
    </div>
  )
}
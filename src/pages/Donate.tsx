import { SDGS } from '../lib/sdgs';

const DONATE_EMAIL = 'tolea.community@gmail.com';

// Same dark-green hero treatment used on Home/Organizations — a floating
// rounded panel, full width minus the px-4 inset, not a flat ivory block.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)';

// Same saturated palette used across the rest of the site — one accent style
// map so the impact cards and transparency panel read as part of the same
// vibrant system rather than isolated pastel blocks.
type Accent = 'forest' | 'indigo' | 'marigold';

const accentStyles: Record<Accent, { tile: string; fg: string }> = {
  forest: { tile: 'bg-forest', fg: 'text-white' },
  indigo: { tile: 'bg-indigo', fg: 'text-white' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber' },
};

// Sponsors free placements leads, since it's the biggest consumer of
// donations, then the two costs that keep the pipeline trustworthy.
const impact: { title: string; body: string; accent: Accent; icon: React.ReactNode }[] = [
  {
    title: 'Sponsors free placements',
    body: 'Every Kenyan volunteer places for free. Donations extend that beyond what international program fees alone can subsidise.',
    accent: 'marigold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
  {
    title: 'Covers documentation costs',
    body: 'ID copies, Certificates of Good Conduct, and transport to verification appointments — real costs that keep some applicants from starting at all.',
    accent: 'forest',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
        <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
      </svg>
    ),
  },
  {
    title: 'Funds host verification',
    body: 'Site visits, safeguarding checks, and re-verification for host organisations — the work that keeps every placement trustworthy.',
    accent: 'indigo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
];

const sdgGoals = SDGS.filter((s) => [1, 8, 10].includes(s.number));

export default function Donate() {
  return (
    <div>
      {/* Hero — same floating dark-green panel as Home/Organizations,
          centered content, full width minus the px-4 inset */}
      <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
        <div
          className="relative overflow-hidden rounded-[28px] flex items-center justify-center text-center px-6 py-28 md:py-36"
          style={{ background: DARK_GRADIENT }}
        >
          <div className="max-w-2xl relative z-10">
            <div className="font-mono text-[11px] mb-4 lowercase tracking-wide" style={{ color: '#C3D82E' }}>
              support the mission
            </div>
            <h1 className="font-display font-bold text-white text-[32px] md:text-[46px] leading-[1.15] mb-5">
              Help keep the door open for the next volunteer
            </h1>
            <p className="text-sm md:text-base leading-[1.65] mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Tolea is free for every Kenyan volunteer, by design. Donations — alongside the fees
              international volunteers pay — are what make that possible at scale.
            </p>
            <a
              href={`mailto:${DONATE_EMAIL}?subject=Donation%20enquiry`}
              className="inline-block font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md cursor-pointer"
              style={{ background: '#E8A331', color: '#241A12' }}
            >
              Get in touch to donate
            </a>
            <p className="text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We're not yet set up for online payments — email us and we'll sort out the details directly.
            </p>
          </div>
        </div>
      </div>

      {/* Where it goes — impact cards led by the biggest consumer of
          donations, centered under a shared heading */}
      <div className="bg-taupe/10 px-9 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">where it goes</div>
          <h2 className="font-display font-bold text-xl max-w-xl mx-auto mb-8">
            What your donation actually funds
          </h2>
          <div className="flex gap-3.5 flex-col md:flex-row">
            {impact.map((i) => {
              const a = accentStyles[i.accent];
              return (
                <div key={i.title} className={`flex-1 rounded-[10px] p-5 text-left ${a.tile} ${a.fg}`}>
                  <div className={`w-[38px] h-[38px] rounded-lg flex items-center justify-center mb-3 bg-white/25 ${a.fg}`}>
                    {i.icon}
                  </div>
                  <h3 className="font-sans font-bold text-[13.5px] mb-1.5">{i.title}</h3>
                  <p className={`text-[11.5px] m-0 leading-[1.55] ${a.fg === 'text-white' ? 'text-white/80' : 'text-umber/70'}`}>
                    {i.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why it matters + transparency — side by side, each given real room
          to breathe: the SDG tie-in on the left, the transparency panel on
          the right, both taller and more generously spaced than before */}
      <div className="px-9 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          <div>
            <div className="font-mono text-[11px] text-forest mb-3 lowercase">why it matters</div>
            <h2 className="font-display font-bold text-2xl mb-8 leading-[1.25]">
              Every donation lines up with the outcomes we're working toward
            </h2>
            <div className="flex flex-col gap-3.5">
              {sdgGoals.map((sdg) => (
                <div
                  key={sdg.number}
                  className="flex items-start gap-4 rounded-[10px] p-4"
                  style={{ backgroundColor: `${sdg.color}14`, border: `1px solid ${sdg.color}45` }}
                >
                  <div
                    className="w-11 h-11 rounded-md flex items-center justify-center font-display font-extrabold text-base text-white shrink-0"
                    style={{ background: sdg.color }}
                  >
                    {sdg.number}
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm mb-1" style={{ color: sdg.color }}>
                      {sdg.name}
                    </div>
                    <p className="text-[12.5px] text-umber-soft m-0 leading-[1.6]">{sdg.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency note — solid indigo panel, matching the CSR/mission
              panels elsewhere so it holds its own rather than reading as a
              pale afterthought */}
          <div className="rounded-[14px] px-8 py-9 bg-indigo flex flex-col justify-center">
            <h3 className="font-display font-bold text-xl mb-3 text-white">Transparency, always</h3>
            <p className="text-sm leading-[1.7] m-0 text-white/80">
              We're a small team building this in the open. Ask us anything about where a donation
              goes — we'd rather you know exactly what it funds than take it on faith.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA — a single donate action (mailto), not a link to the
          volunteer flow: CtaBanner's primary button only routes internally,
          so this mirrors its look with a plain mailto button instead */}
      <div className="px-9 py-16 text-center" style={{ background: '#F1EAD9' }}>
        <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
          ready to help?
        </div>
        <h2
          className="font-display font-bold text-2xl md:text-3xl max-w-2xl mx-auto mb-7"
          style={{ color: '#241A12' }}
        >
          Every Contribution Keeps a Door Open
        </h2>
        <a
          href={`mailto:${DONATE_EMAIL}?subject=Donation%20enquiry`}
          className="inline-block font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md cursor-pointer"
          style={{ background: '#E8A331', color: '#241A12' }}
        >
          Get in touch to donate
        </a>
      </div>
    </div>
  );
}
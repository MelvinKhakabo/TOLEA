import type { ReactNode } from 'react';
import CtaBanner from '../components/CtaBanner';

const CAREERS_EMAIL = 'tolea.community@gmail.com';

// Same saturated palette used across the rest of the site — one accent style
// map so the values diagram and open-role cards read as part of the same
// vibrant system rather than isolated pastel blocks.
type Accent = 'forest' | 'indigo' | 'marigold';

const accentStyles: Record<Accent, { tile: string; fg: string; border: string }> = {
  forest: { tile: 'bg-forest', fg: 'text-white', border: 'border-forest' },
  indigo: { tile: 'bg-indigo', fg: 'text-white', border: 'border-indigo' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber', border: 'border-marigold' },
};

const values: { title: string; body: string; accent: Accent; icon: ReactNode }[] = [
  {
    title: 'Build in the open',
    body: 'We share what we\'re working on, including what isn\'t working yet.',
    accent: 'forest',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Verification is non-negotiable',
    body: 'Every shortcut we\'re tempted to take is a volunteer or host we\'d be failing.',
    accent: 'indigo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    title: 'Small team, real ownership',
    body: 'Early hires shape how this platform actually works, not just how it looks.',
    accent: 'marigold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <circle cx="18" cy="9" r="2.3" />
        <path d="M15.5 20c.2-2.3 1.8-3.8 4-3.8" />
      </svg>
    ),
  },
];

const openRoles: { title: string; type: string; body: string; accent: Accent }[] = [
  {
    title: 'Volunteer Programs Coordinator',
    type: 'Full-time · Nairobi',
    body: 'Own the volunteer journey end to end — application screening, matching conversations, and weekly check-ins.',
    accent: 'forest',
  },
  {
    title: 'Partnerships Lead (Host Organisations)',
    type: 'Full-time · Nairobi',
    body: 'Source and verify host organisations, run site visits, and manage the partnership tiers.',
    accent: 'indigo',
  },
  {
    title: 'Frontend Engineer',
    type: 'Contract · Remote (Kenya)',
    body: 'Help build out the platform — from the volunteer/host matching flow to the verification dashboard.',
    accent: 'marigold',
  },
];

// Same dark-green hero treatment used on Home/Organizations/Donate.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)';

// Three value nodes arranged in a triangle, connected by thin lines, sitting
// on the same dark-green patch as the site's hero sections. Each label is
// anchored OUTSIDE its vertex (above the apex, below-left and below-right of
// the base corners) so the text never crosses the triangle's edges — and
// never collides with the "how we work" caption above it.
function ValuesTriangle({ items }: { items: typeof values }) {
  // Vertex anchor points, as % of the inner diagram box. The bottom vertices
  // sit at 65% (not lower) so there's real room left in the box for their
  // labels — the earlier version placed them at 82%, leaving too little
  // space below and letting the "open roles" section paint over the text.
  const vertices = [
    { top: '22%', left: '50%' }, // apex
    { top: '65%', left: '16%' }, // bottom-left
    { top: '65%', left: '84%' }, // bottom-right
  ];

  // Label placement for each vertex: grows AWAY from the triangle's
  // interior, never toward the opposite edge.
  const labelStyles = [
    { top: 'calc(22% - 46px)', left: '50%', transform: 'translate(-50%, -100%)', textAlign: 'center' as const },
    { top: 'calc(65% + 40px)', left: 'calc(16% - 12px)', transform: 'translate(-100%, 0)', textAlign: 'right' as const },
    { top: 'calc(65% + 40px)', left: 'calc(84% + 12px)', transform: 'translate(0, 0)', textAlign: 'left' as const },
  ];

  return (
    <div className="rounded-[28px] px-6 pt-10 pb-8" style={{ background: DARK_GRADIENT }}>
      <div className="font-mono text-[10.5px] mb-14 lowercase text-center" style={{ color: '#C3D82E' }}>
        how we work
      </div>
      <div className="relative w-full max-w-[380px] mx-auto" style={{ height: 460 }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <polygon
            points="50,22 16,65 84,65"
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.2}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {items.map((v, i) => {
          const a = accentStyles[v.accent];
          return (
            <div key={v.title}>
              <div
                className={`absolute w-14 h-14 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/40 ${a.tile} ${a.fg}`}
                style={{ ...vertices[i], transform: 'translate(-50%, -50%)' }}
              >
                {v.icon}
              </div>
              <div className="absolute w-[140px]" style={labelStyles[i]}>
                <div className="font-sans font-bold text-[12.5px] leading-[1.3] mb-1 text-white">{v.title}</div>
                <p className="text-[10.5px] leading-[1.45] m-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {v.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Careers() {
  return (
    <div>
      {/* Hero + values diagram, side by side — fills the empty right half
          instead of stacking the values as a separate left-aligned band */}
      <div className="px-9 pt-[52px] pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">join the team</div>
            <h1 className="font-display font-bold text-[32px] leading-[1.15] mb-4">
              Help us build the trusted way into volunteering
            </h1>
            <p className="text-[13.5px] text-[#4a4038] leading-[1.65]">
              Tolea is a small team working on a real gap — verified, structured volunteer and
              internship access for Kenyan youth. If that's a problem you want to work on, we'd
              like to hear from you.
            </p>
          </div>
          <ValuesTriangle items={values} />
        </div>
      </div>

      {/* Open roles — square cards, left to right, instead of long stacked bars */}
      <div className="bg-taupe/10 px-9 pt-14 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">open roles</div>
            <h2 className="font-display font-bold text-xl">Where we need help right now</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {openRoles.map((r) => {
              const a = accentStyles[r.accent];
              return (
                <div key={r.title} className={`border-2 ${a.border} rounded-[10px] p-5 bg-white flex flex-col`}>
                  <span className={`font-mono text-[9.5px] uppercase px-2 py-1 rounded self-start mb-3 ${a.tile} ${a.fg}`}>
                    {r.type}
                  </span>
                  <h3 className="font-sans font-bold text-[14px] mb-2">{r.title}</h3>
                  <p className="text-[12px] text-umber-soft mb-4 leading-[1.55] flex-1">{r.body}</p>
                  <a
                    href={`mailto:${CAREERS_EMAIL}?subject=Application:%20${encodeURIComponent(r.title)}`}
                    className="text-indigo text-[12.5px] font-medium cursor-pointer"
                  >
                    Apply for this role →
                  </a>
                </div>
              );
            })}
          </div>

          <div className="pt-8 text-center">
            <p className="text-[12px] text-taupe">
              Don't see a fit but think you should be here anyway?{' '}
              <a href={`mailto:${CAREERS_EMAIL}?subject=General%20interest`} className="text-indigo underline cursor-pointer">
                Reach out
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <CtaBanner
        eyebrow="not quite ready to apply?"
        headline="See How Tolea Actually Works"
        buttonLabel="Learn how it works"
        to="/how-we-work"
      />
    </div>
  );
}
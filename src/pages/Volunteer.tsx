import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';

const pathway = [
  {
    step: '01',
    title: 'Every host is checked',
    body: 'Cross-checked against current registration before a listing ever goes live.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    step: '02',
    title: '3 options, picked for you',
    body: 'Tell us your skills and goals, and we surface your best fits automatically.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="4" y="5" width="16" height="4" rx="1" />
        <rect x="4" y="11" width="16" height="4" rx="1" />
        <path d="M8 19h8" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Evidence, not just experience',
    body: 'Every placement adds tracked, verifiable skills to your profile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },
];

// Drop each volunteer's photo path/URL in `image` (e.g. an import from
// src/assets, or a string path into your public/ folder). Leave it undefined
// and the card falls back to the placeholder gradient — nothing else to change.
const volunteers = [
  {
    name: 'Patricia N.',
    role: 'Community Health Intern',
    org: 'Nairobi Community Health Trust',
    image: undefined as string | undefined, // e.g. '/volunteers/patricia.jpg'
    quote:
      "Volunteering here didn't feel like free labour. There were real expectations, and real support when things got hard.",
  },
  {
    name: 'Brian K.',
    role: 'Software Volunteer',
    org: 'Kibera Youth Tech Hub',
    image: undefined as string | undefined,
    quote:
      'I found my placement in a week, and it was the first time volunteering felt like it was actually building toward something.',
  },
  {
    name: 'Sofia R.',
    role: 'Education Volunteer',
    org: 'Diani Coastal Learning Center',
    image: undefined as string | undefined,
    quote:
      'Coming from abroad, I was nervous about legitimacy. The verification process and check-ins made it feel safe the whole way through.',
  },
  {
    name: 'Derek O.',
    role: 'Policy Research Intern',
    org: 'Nairobi Governance Lab',
    image: undefined as string | undefined,
    quote:
      'The skills journal was the difference. I could point to exactly what I did, not just say I "volunteered somewhere."',
  },
];

const tracks = [
  {
    name: 'Kenyan volunteers',
    price: 'Free, always',
    audience: 'Recent graduates, students, and career-changers based in Kenya.',
    body: 'Full vetting, matching, and placement support at no cost — this is the core Tolea experience, free for every Kenyan volunteer.',
    accent: 'forest',
    included: [
      'Verified placements only',
      'A guided, Tolea-style interview before matching',
      'Document verification (ID plus references)',
      'Structured onboarding with a named supervisor',
      'Weekly wellbeing check-ins during your placement',
      'No platform or placement fees, ever',
    ],
  },
  {
    name: 'International volunteers',
    price: 'Paid placement',
    audience: 'Volunteers travelling to Kenya from abroad for a structured placement.',
    body: 'Everything in the Kenyan track, plus the logistics and support layer international travel needs — the placement fee covers vetting, training, and in-country support.',
    accent: 'marigold',
    included: [
      'Everything in the Kenyan track',
      'Visa and travel documentation guidance',
      'Travel insurance coordination',
      'Accommodation and logistics support',
      'A dedicated pre-arrival briefing',
      'A named in-country contact for the full placement',
    ],
  },
  {
    name: 'Minors',
    price: 'Guardian co-sign required',
    audience: "Volunteers under 18 joining with a parent or guardian's consent.",
    body: 'A guardian-consent track layered on top of the standard vetting, with extra safeguarding steps built in before and during the placement.',
    accent: 'indigo',
    included: [
      'Guardian consent and a co-signed agreement',
      'An additional safeguarding review',
      'Closer, more frequent check-ins',
      'Age-appropriate placement matching',
      'Guardian included in all major placement communications',
    ],
  },
] as const;

const accentStyles: Record<string, { border: string; soft: string; tag: string; check: string }> = {
  forest: {
    border: 'border-forest',
    soft: 'bg-forest-soft/50',
    tag: 'bg-forest text-white',
    check: 'text-forest',
  },
  marigold: {
    border: 'border-marigold',
    soft: 'bg-marigold-soft/60',
    tag: 'bg-marigold text-white',
    check: 'text-marigold',
  },
  indigo: {
    border: 'border-indigo',
    soft: 'bg-indigo/10',
    tag: 'bg-indigo text-white',
    check: 'text-indigo',
  },
};

function ImagePlaceholder({
  caption,
  className = '',
}: {
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(232,163,49,0.30), transparent 55%), radial-gradient(circle at 75% 70%, rgba(43,110,79,0.26), transparent 55%), linear-gradient(135deg, #e9ded0, #cfc3ad)',
      }}
    >
      {caption && (
        <span className="absolute bottom-2.5 left-3 font-mono text-[9.5px] text-[#5a4f3d]">
          {caption}
        </span>
      )}
    </div>
  );
}

function FadeLine() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />;
}

function PathwayNode({ step }: { step: string }) {
  return (
    <div className="w-16 h-16 rounded-full bg-white text-forest font-display font-bold text-lg flex items-center justify-center shadow-sm shrink-0">
      {step}
    </div>
  );
}

function PathwayIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="w-11 h-11 rounded-xl bg-white/15 text-lime flex items-center justify-center mx-auto mb-3">
      {icon}
    </div>
  );
}

function PathwayConnector() {
  return (
    <div className="flex items-center flex-1 px-2">
      <div className="h-px flex-1 bg-white/30" />
      <span className="text-white/70 mx-1.5 text-sm leading-none">→</span>
      <div className="h-px flex-1 bg-white/30" />
    </div>
  );
}

/** Crimson-Education-style card: placement label, photo with a quote revealed
 *  on hover (desktop) or tap (touch), then name/role in a "filled-in form" style. */
function VolunteerCard({ v }: { v: (typeof volunteers)[number] }) {
  const [active, setActive] = useState(false);

  return (
    <div className="border-2 border-forest rounded-[10px] bg-white overflow-hidden flex flex-col h-full">
      <div className="pt-4 pb-2.5 px-3 text-center flex flex-col justify-center min-h-[76px] bg-forest-soft">
        <div className="font-sans text-[12px] text-forest/70">Placed at</div>
        <div className="font-display font-bold text-[15px] text-forest leading-tight">
          {v.org}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        className="group relative block w-full aspect-[4/3] cursor-pointer"
        aria-label={`Read ${v.name}'s testimonial`}
      >
        {v.image ? (
          <img src={v.image} alt={v.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder caption="photo" className="absolute inset-0" />
        )}
        <div
          className={`absolute inset-0 flex items-center justify-center p-4 text-center transition-opacity duration-200 ${
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{ background: 'rgba(15,42,30,0.86)' }}
        >
          <p className="text-white text-[12px] leading-[1.55] italic">"{v.quote}"</p>
        </div>
      </button>

      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-baseline gap-2 border-b border-dashed border-line pb-1">
          <span className="font-mono text-[9.5px] text-taupe uppercase shrink-0">Name</span>
          <span className="text-[12.5px] text-umber">{v.name}</span>
        </div>
        <div className="flex items-baseline gap-2 border-b border-dashed border-line pb-1">
          <span className="font-mono text-[9.5px] text-taupe uppercase shrink-0">Role</span>
          <span className="text-[12.5px] text-umber">{v.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Volunteer() {
  return (
    <div>
      {/* Hero */}
      <div className="flex gap-9 items-center px-9 pt-[52px] flex-col md:flex-row">
        <div className="flex-[1.1] w-full">
          <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">
            why volunteer with tolea
          </div>
          <h1 className="font-display font-bold text-[34px] leading-[1.15] mb-4">
            Your first opportunity, taken seriously.
          </h1>
          <p className="text-[13.5px] text-[#4a4038] leading-[1.65] mb-5 max-w-[420px]">
            No more sourcing leads from WhatsApp groups and word of mouth. Every listing here is
            verified, every placement is tracked, and every match is built around what you
            actually want to grow into.
          </p>
          <Link to="/signup">
            <Button variant="primary">Join the Tolea community</Button>
          </Link>
          <div className="text-[11.5px] text-taupe mt-2.5">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo cursor-pointer">
              Log in
            </Link>
          </div>
        </div>
        <ImagePlaceholder
          caption="photography: volunteer at work"
          className="flex-1 w-full h-[300px] rounded-[10px]"
        />
      </div>

      <div className="px-9 mt-12">
        <FadeLine />
      </div>

      {/* Pathway — connected flow diagram, framed in the hero's forest-green panel */}
      <div className="px-9 pt-12 pb-12">
        <div className="max-w-5xl mx-auto rounded-[14px] bg-forest px-10 py-16">
          <div className="text-center pb-10">
            <div className="font-mono text-[10.5px] text-lime mb-3 lowercase">the journey</div>
            <h2 className="font-display font-bold text-2xl text-lime">Our Volunteers Pathway</h2>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden md:block pb-5">
            <div className="flex items-center">
              {pathway.map((p, i) => (
                <div key={p.step} className="flex items-center flex-1 last:flex-none">
                  <PathwayNode step={p.step} />
                  {i < pathway.length - 1 && <PathwayConnector />}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-8 text-center">
            {pathway.map((p) => (
              <div key={p.step}>
                <PathwayIcon icon={p.icon} />
                <h3 className="font-display font-bold text-base mb-1.5 text-lime">{p.title}</h3>
                <p className="text-[12px] text-white/70 m-0">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="md:hidden flex flex-col items-center">
            {pathway.map((p, i) => (
              <div key={p.step} className="flex flex-col items-center">
                <PathwayNode step={p.step} />
                <div className="text-center mt-3 mb-1 max-w-[280px]">
                  <PathwayIcon icon={p.icon} />
                  <h3 className="font-display font-bold text-base mb-1.5 text-lime">{p.title}</h3>
                  <p className="text-[12px] text-white/70 m-0">{p.body}</p>
                </div>
                {i < pathway.length - 1 && <div className="h-8 w-px bg-white/30 my-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real volunteers — Crimson-style "got in" cards, tap/hover photo for their testimonial */}
      <div className="bg-taupe/10 border-y border-line px-9 py-14">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">real volunteers</div>
          <h2 className="font-display font-bold text-2xl">
            They got placed. <span className="text-forest">You can too.</span>
          </h2>
          <p className="text-[12.5px] text-umber-soft mt-2">
            Tap or hover a photo to read their story.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {volunteers.map((v) => (
            <VolunteerCard key={v.name} v={v} />
          ))}
        </div>
      </div>

      {/* Tracks — Kenyan / International / Minor */}
      <div className="px-9 pt-12 pb-1">
        <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">choose your track</div>
        <h2 className="font-display font-bold text-xl">
          Volunteering looks different depending on where you're joining from
        </h2>
      </div>
      <div className="flex gap-3.5 px-9 pt-3.5 pb-16 flex-col md:flex-row items-stretch">
        {tracks.map((t) => {
          const a = accentStyles[t.accent];
          return (
            <div
              key={t.name}
              className={`flex-1 border-2 ${a.border} ${a.soft} rounded-[10px] flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5`}
            >
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-sans font-bold text-base mb-2">{t.name}</h3>
                <div
                  className={`inline-block w-fit font-mono text-[10.5px] font-semibold mb-3 px-2.5 py-1 rounded-full ${a.tag}`}
                >
                  {t.price.toUpperCase()}
                </div>
                <p className="text-xs text-taupe mb-4 italic">{t.audience}</p>
                <p className="text-xs text-umber-soft leading-[1.6] mb-5">{t.body}</p>

                <div className="font-mono text-[9.5px] text-taupe uppercase mb-3">
                  what's included
                </div>
                <ul className="space-y-2.5 mt-auto">
                  {t.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-umber-soft leading-[1.5]"
                    >
                      <span className={`${a.check} font-bold mt-0.5`}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <CtaBanner
        eyebrow="ready when you are"
        headline="Start Your Volunteer Journey Today"
        buttonLabel="Join the Tolea community"
        to="/signup"
      />
    </div>
  );
}
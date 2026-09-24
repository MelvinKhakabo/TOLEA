import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';
import { SDGS } from '../lib/sdgs';

const stats = ['50+ companies partnered', '100+ volunteers placed', '95% satisfaction rate'];

const steps = [
  {
    num: '01',
    title: 'Tell us your goals',
    body: 'A 5-minute questionnaire on your skills, time, and what you want to build.',
  },
  {
    num: '02',
    title: 'Get matched',
    body: 'We surface your 3 best-fit, verified opportunities.',
  },
  {
    num: '03',
    title: 'Apply and grow',
    body: 'Apply, get placed, and watch your skills journal fill up.',
  },
];

const wayCards = [
  {
    title: 'Always-on support',
    body: 'Local mentors and experienced leaders are reachable any time during your placement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: 'Reviewed placements',
    body: "Every host is checked before you're matched, and reviewed again at the midpoint.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    title: 'Fair-work standards',
    body: 'Capped hours, clear expectations, and a policy we hold every host to.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
        <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
      </svg>
    ),
  },
  {
    title: 'Two-way accountability',
    body: 'Feedback flows both ways, and issues are resolved by our team, not left to chance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
        <path d="M20 16H7M7 16l3-3M7 16l3 3" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: 'How many hours will I be expected to work each week?',
    a: 'Placeholder: answer to be pulled from the working-hours policy.',
  },
  {
    q: 'Is there any compensation for unpaid placements?',
    a: 'Placeholder: answer to be pulled from the fair-compensation policy.',
  },
  {
    q: "What happens if a placement isn't a good fit?",
    a: 'Placeholder: answer to be pulled from the cancellation/termination policy.',
  },
  {
    q: 'Is accommodation or travel support provided?',
    a: 'Placeholder: answer to be pulled from the placement standards policy.',
  },
  {
    q: 'How do I report an issue with my placement?',
    a: 'Placeholder: answer to be pulled from the support & accountability policy.',
  },
];

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden py-10"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <style>{`
        @keyframes tolea-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex w-max gap-14" style={{ animation: 'tolea-marquee 24s linear infinite' }}>
        {doubled.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-4 font-display font-bold text-xl md:text-2xl whitespace-nowrap"
            style={{ color: 'rgba(36,26,18,0.75)' }}
          >
            {text}
            <span style={{ color: '#E8A331' }} className="text-base">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const BAND = '#EFEAE1'; // same tint About uses for its alternating sections

export default function Home() {
  return (
    <div>
      {/* Hero — full-bleed, dark overlay, centered (unchanged) */}
      <div
        className="relative flex items-center justify-center text-center px-6 py-28 md:py-36"
        style={{
          background:
            'linear-gradient(rgba(36,26,18,0.6), rgba(36,26,18,0.72)), radial-gradient(circle at 30% 30%, rgba(232,163,49,0.35), transparent 55%), radial-gradient(circle at 75% 70%, rgba(43,110,79,0.3), transparent 55%), linear-gradient(135deg, #e9ded0, #cfc3ad)',
        }}
      >
        <div className="max-w-2xl">
          <div className="font-mono text-[11px] mb-4 lowercase tracking-wide" style={{ color: '#E8A331' }}>
            free for kenyan volunteers, always
          </div>
          <h1 className="font-display font-bold text-white text-[32px] md:text-[46px] leading-[1.15] mb-5">
            Build real skills. Find your people. Move your future forward.
          </h1>
          <p className="text-sm md:text-base leading-[1.65] mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Tolea matches you with verified organisations across Kenya, and tracks every skill you
            build along the way.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/volunteer">
              <Button variant="primary">Find your opportunity</Button>
            </Link>
            <Link to="/organizations">
              <button
                className="font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md"
                style={{ background: '#fff', color: '#241A12' }}
              >
                For organisations
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div style={{ background: BAND }}>
        <Marquee items={stats} />
        <div className="flex items-center gap-3.5 pb-8 px-9">
          <span className="font-mono text-[10.5px]" style={{ color: '#8C8073' }}>
            aligned with the un sdgs
          </span>
          <div className="flex gap-1.5">
            {SDGS.map((sdg) => (
              <div
                key={sdg.number}
                className="w-[24px] h-[24px] rounded-[5px] flex items-center justify-center font-display font-extrabold text-[9.5px] text-white"
                style={{ background: sdg.color }}
              >
                {sdg.number}
              </div>
            ))}
          </div>
          <Link to="/about" className="text-[11.5px]" style={{ color: '#8C8073' }}>
            Learn more →
          </Link>
        </div>
      </div>

      {/* How it works — ivory band, full width, left-aligned */}
      <div className="px-9 py-14">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            the process
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">
            From goals to a verified placement, in three steps
          </h2>
        </div>
        <div className="flex gap-8 flex-col md:flex-row mb-10">
          {steps.map((s) => (
            <div key={s.num} className="flex-1">
              <div className="font-mono text-[11px] mb-2" style={{ color: '#233A5E' }}>
                {s.num}
              </div>
              <h3 className="font-display font-bold text-lg mb-1.5">{s.title}</h3>
              <p className="text-[12.5px] m-0" style={{ color: '#5a5347' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-xl bg-marigold-soft rounded-[10px] px-6.5 py-5.5 text-sm leading-[1.6]">
          "I found my placement in a week, and it was the first time volunteering felt like it was
          actually building toward something."
          <div className="font-mono text-[10.5px] mt-2.5" style={{ color: '#5a5347' }}>
            Early Tolea volunteer, Nairobi
          </div>
        </div>
      </div>

      {/* The Tolea way — tinted band, full width, left-aligned */}
      <div style={{ background: BAND }} className="px-9 py-14">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            the tolea way
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">
            Safety and support built into every placement
          </h2>
        </div>
        <div className="flex gap-3.5 flex-col md:flex-row">
          {wayCards.map((c) => (
            <div key={c.title} className="flex-1 border border-line rounded-[10px] p-4 bg-white">
              <div className="w-[34px] h-[34px] rounded-lg bg-forest-soft text-forest flex items-center justify-center mb-3">
                {c.icon}
              </div>
              <h3 className="font-sans font-bold text-[13.5px] mb-1.5">{c.title}</h3>
              <p className="text-[11.5px] text-umber-soft m-0 leading-[1.55]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ — ivory band, full width, left-aligned */}
      <div className="py-14 px-9">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            faqs
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">Common questions</h2>
        </div>
        <div className="max-w-2xl" style={{ borderTop: '1px solid rgba(36,26,18,0.1)' }}>
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group py-5"
              style={{ borderBottom: '1px solid rgba(36,26,18,0.1)' }}
            >
              <summary className="font-sans font-semibold text-[13.5px] flex justify-between items-center cursor-pointer list-none">
                <span>{f.q}</span>
                <span className="font-mono text-base group-open:hidden" style={{ color: '#8C8073' }}>
                  +
                </span>
                <span className="font-mono text-base hidden group-open:inline" style={{ color: '#8C8073' }}>
                  −
                </span>
              </summary>
              <div className="text-xs mt-3 leading-[1.6]" style={{ color: '#5a5347' }}>
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <CtaBanner
        eyebrow="hosting talent?"
        headline="List a role and reach graduates ready to build real skills"
        buttonLabel="Register your organisation"
        to="/organizations"
      />
    </div>
  );
}
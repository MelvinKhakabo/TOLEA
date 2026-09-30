import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';

type Audience = 'volunteer' | 'organisation';

// Five saturated brand colors cycled across every step/card on this page —
// no more pastel-on-pastel. accentStyles below maps each key to a solid
// icon-tile background, a readable foreground, and a matching border/tint
// for card treatments elsewhere on the page.
type Accent = 'forest' | 'indigo' | 'marigold' | 'lime' | 'umber';

const accentStyles: Record<
  Accent,
  { tile: string; fg: string; border: string; soft: string; dot: string }
> = {
  forest: { tile: 'bg-forest', fg: 'text-white', border: 'border-forest', soft: 'bg-forest-soft', dot: '#2B6E4F' },
  indigo: { tile: 'bg-indigo', fg: 'text-white', border: 'border-indigo', soft: 'bg-indigo-soft', dot: '#233A5E' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber', border: 'border-marigold', soft: 'bg-marigold-soft', dot: '#E8A331' },
  lime: { tile: 'bg-lime', fg: 'text-umber', border: 'border-lime', soft: 'bg-lime/15', dot: '#C3D82E' },
  umber: { tile: 'bg-umber', fg: 'text-lime', border: 'border-umber', soft: 'bg-umber/5', dot: '#241A12' },
};

const volunteerSteps = [
  {
    num: '01',
    title: 'Apply & get checked',
    body: 'Apply on the platform, and we confirm your track — Kenyan, International, or Minor (15–17, guardian co-signed) — then verify your ID and references before you\'re introduced to any host.',
    accent: 'forest' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 6h16M4 12h10M4 18h13" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'A real matching conversation',
    body: 'A 20–30 minute chat about your motivation, skills, and availability, then a shortlist of 1–3 verified hosts — followed by a placement offer, signed agreement, and any program fee.',
    accent: 'indigo' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Prepare properly',
    body: 'Logistics sorted (Special Pass and insurance for International), a welcome package with your Tolea journal, training on the host and on conduct, then a handover meeting with your supervisor.',
    accent: 'marigold' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Supported the whole way',
    body: 'A first-week check to catch early mismatches, then weekly mini reports and wellbeing check-ins, plus monthly community events with other volunteers.',
    accent: 'lime' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'A proper close-out',
    body: 'Feedback from both sides, a send-off ceremony and goodbye package, a completion certificate, and alumni status — or, if it wasn\'t the right fit, re-placement first, refunds where the track allows it.',
    accent: 'umber' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
];

const orgSteps = [
  {
    num: '01',
    title: 'Register your organisation',
    body: 'Tell us who you are, your registration status, and the roles you need filled. Charities go through PBO Act checks; companies need a BRS search, CR12, and KRA PIN.',
    accent: 'indigo' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
        <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Get verified',
    body: 'For Verified+, an in-person site visit checks physical safety, supervision capacity, and working conditions before you ever go live — with annual re-verification after that.',
    accent: 'marigold' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Agreement, then live',
    body: 'A signed agreement covers fees, data sharing, and liability — payment clears before Verified+/Sponsor listings go live — then we match you to volunteers whose skills actually fit.',
    accent: 'forest' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Onboard with safeguards',
    body: 'A named supervisor and safeguarding focal person, holding a Certificate of Good Conduct, agreed before day one — plus a clear path for reporting any incident to us, fast.',
    accent: 'umber' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
        <path d="M20 16H7M7 16l3-3M7 16l3 3" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Stay accountable',
    body: 'Weekly check-ins and end-of-placement feedback flow through us on both sides. Breaches move to offboarding; a host who cancels mid-placement triggers our re-placement/refund policy.',
    accent: 'lime' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
];

const included = [
  { label: 'Document verification', caption: 'ID, references, and a Certificate of Good Conduct, checked before matching', accent: 'indigo' as Accent },
  { label: 'A real matching conversation', caption: 'A 20–30 minute call, not a form into the void', accent: 'lime' as Accent },
  { label: 'Weekly check-ins', caption: 'Mini reports with a wellbeing check, reviewed by a real person', accent: 'marigold' as Accent },
  { label: 'Confidential complaints channel', caption: 'Raise a concern anytime — hosts aren\'t told without your consent', accent: 'indigo' as Accent },
  { label: 'Safeguarding', caption: 'Named supervisors, a Certificate of Good Conduct, a clear incident pathway', accent: 'lime' as Accent },
  { label: 'Community events', caption: 'Monthly meetups with other volunteers', accent: 'marigold' as Accent },
];

const eligibility = [
  {
    title: 'Time & duration',
    body: 'Placements are flexible in length — from a school-break stint to an ongoing role.',
    accent: 'indigo' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: 'Age requirements',
    body: 'Open from age 15+. Under-18s join on the Minor track, with a parent or guardian co-signing every step.',
    accent: 'marigold' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
      </svg>
    ),
  },
  {
    title: 'Three tracks',
    body: 'Kenyan (free), International (paid, needs a Kenya Special Pass — not a tourist visa), and Minor (15–17, guardian co-signed).',
    accent: 'forest' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: 'Is there any compensation for unpaid placements?',
    a: 'The Kenyan track is free to join — no fees either way. International volunteers pay a program fee, which is part of what keeps local access free. Compensation itself isn\'t part of the current model.',
  },
  {
    q: "What happens if a placement isn't a good fit?",
    a: 'We prioritise re-placement first, on either side — whether it\'s you or the host who wants out. International volunteers are also covered by a refund schedule if re-placement isn\'t accepted; the Kenyan and Minor tracks aren\'t paid, so there\'s no fee to refund.',
  },
  {
    q: 'What does organisation verification actually check?',
    a: 'Registration status (PBO Act checks for charities; a BRS search, CR12, and KRA PIN for companies), and — for Verified+ — an in-person site visit covering physical safety, supervision capacity, and working conditions, repeated annually.',
  },
  {
    q: 'How do I report an issue with my placement?',
    a: 'Through a confidential channel that reaches us directly — hosts aren\'t told you\'ve raised something unless there\'s a safety risk. Safeguarding concerns and emergencies get an immediate response; general complaints are handled within a few working days.',
  },
  {
    q: 'What documents do I need to apply?',
    a: 'Kenyan volunteers (18+): a national ID and a Certificate of Good Conduct. Minors (15–17): a birth certificate or passport, a guardian\'s ID, and signed parental consent. International volunteers: a passport and police clearance from their home country.',
  },
];

function ImagePlaceholder({ caption, className = '' }: { caption?: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(232,163,49,0.28), transparent 55%), radial-gradient(circle at 75% 70%, rgba(43,110,79,0.24), transparent 55%), linear-gradient(135deg, #e9ded0, #cfc3ad)',
      }}
    >
      {caption && (
        <span className="absolute bottom-2.5 left-3 font-mono text-[9.5px] text-[#5a4f3d]">{caption}</span>
      )}
    </div>
  );
}

// Same rotating-highlight mechanic as Home's FAQ section, with content tuned
// to this page's process/safeguarding focus instead of Home's general pitch.
const highlightSlides = [
  {
    type: 'testimonial' as const,
    quote: 'The weekly check-ins meant someone always knew how I was doing, not just a form to fill in.',
    name: 'Patricia, Community Health Intern',
  },
  {
    type: 'stat' as const,
    value: '100%',
    label: 'of hosts are document-verified before a listing goes live',
  },
  {
    type: 'trust' as const,
    line: 'Verified+ hosts get an in-person site visit — covering safety, supervision, and working conditions — before any volunteer is placed.',
  },
  {
    type: 'testimonial' as const,
    quote: 'Knowing there was a confidential way to raise a concern made it easy to trust the process from day one.',
    name: 'Derek, Policy Research Intern',
  },
];

function RotatingHighlight() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % highlightSlides.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const slide = highlightSlides[index];
  const slideAccents: Accent[] = ['forest', 'marigold', 'indigo', 'lime'];
  const a = accentStyles[slideAccents[index % slideAccents.length]];

  return (
    <div
      className={`rounded-[10px] p-7 flex flex-col justify-center border-2 ${a.border} transition-colors duration-500`}
      style={{ background: a.dot + '14', minHeight: '220px' }}
    >
      <style>{`
        @keyframes tolea-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div key={index} style={{ animation: 'tolea-fade 0.6s ease' }}>
        {slide.type === 'testimonial' && (
          <div className="flex gap-4 items-start">
            <ImagePlaceholder caption="photo" className="w-12 h-12 rounded-full shrink-0" />
            <div>
              <p className="text-sm leading-[1.6] m-0 text-umber">"{slide.quote}"</p>
              <div className="font-mono text-[10.5px] mt-2.5" style={{ color: a.dot }}>
                {slide.name}
              </div>
            </div>
          </div>
        )}
        {slide.type === 'stat' && (
          <div>
            <div className="font-display font-extrabold text-4xl mb-2" style={{ color: a.dot }}>
              {slide.value}
            </div>
            <p className="text-sm m-0 text-umber-soft">{slide.label}</p>
          </div>
        )}
        {slide.type === 'trust' && (
          <p className="text-sm leading-[1.6] m-0 text-umber">{slide.line}</p>
        )}
      </div>
      <div className="flex gap-1.5 mt-6">
        {highlightSlides.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? '18px' : '6px',
              background: i === index ? a.dot : 'rgba(36,26,18,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** A gentle, doodle-style float so the step icons feel hand-drawn and alive
 *  rather than static clip-art. Pure CSS, no library. */
function FloatingIcon({
  children,
  accent,
  delay = 0,
}: {
  children: ReactNode;
  accent: Accent;
  delay?: number;
}) {
  const a = accentStyles[accent];
  return (
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${a.tile} ${a.fg}`}
      style={{ animation: `tolea-float 3.6s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </div>
  );
}

function DownArrow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-8 mx-auto ml-7">
      <path d="M12 3v15M6 13l6 6l6-6" strokeDasharray="3 4" />
    </svg>
  );
}

function StepFlow({ steps }: { steps: typeof volunteerSteps }) {
  return (
    <div className="max-w-2xl mx-auto">
      {steps.map((s, i) => {
        const a = accentStyles[s.accent];
        return (
          <div key={s.num}>
            <div className={`flex gap-5 items-start rounded-[14px] border-2 ${a.border} p-4`} style={{ background: a.dot + '0d' }}>
              <FloatingIcon accent={s.accent} delay={i * 0.3}>
                {s.icon}
              </FloatingIcon>
              <div className="pt-1">
                <div className="font-mono text-[10.5px] mb-1 font-semibold" style={{ color: a.dot }}>
                  Step {s.num}
                </div>
                <h3 className="font-display font-bold text-base mb-1.5">{s.title}</h3>
                <p className="text-[12.5px] text-umber-soft leading-[1.6] m-0">{s.body}</p>
              </div>
            </div>
            {i < steps.length - 1 && <DownArrow color={a.dot} />}
          </div>
        );
      })}
    </div>
  );
}

export default function HowWeWork() {
  const [audience, setAudience] = useState<Audience>('volunteer');

  return (
    <div>
      <style>{`
        @keyframes tolea-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
        }
      `}</style>

      {/* Hero */}
      <div className="flex gap-9 items-center px-9 pt-[52px] flex-col md:flex-row">
        <div className="flex-[1.1] w-full">
          <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">the process</div>
          <h1 className="font-display font-bold text-[34px] leading-[1.15] mb-4">
            From first message to placement — the whole journey, mapped out.
          </h1>
          <p className="text-[13.5px] text-[#4a4038] leading-[1.65] mb-5 max-w-[420px]">
            No fine print to dig through. Here's exactly what happens at every step, whether
            you're volunteering with us or hosting a volunteer.
          </p>
          <div className="flex gap-2.5">
            <Link to="/volunteer">
              <Button variant="primary">I'm volunteering</Button>
            </Link>
            <Link to="/organizations">
              <Button variant="secondary">I'm hosting</Button>
            </Link>
          </div>
        </div>
        <ImagePlaceholder caption="photography: volunteer + host, working together" className="flex-1 w-full h-[280px] rounded-[10px]" />
      </div>

      {/* Audience toggle + step flow */}
      <div className="px-9 pt-16 pb-4">
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border-2 border-forest bg-white p-1">
            {(
              [
                ['volunteer', "I'm a volunteer"],
                ['organisation', "I'm an organisation"],
              ] as [Audience, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setAudience(value)}
                className="px-5 py-2.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer"
                style={
                  audience === value
                    ? { background: '#2B6E4F', color: '#C3D82E' }
                    : { background: 'transparent', color: '#8C8073' }
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <StepFlow steps={audience === 'volunteer' ? volunteerSteps : orgSteps} />
      </div>

      {/* What's included — full-bleed forest-green strip, matching the hero panel
          treatment elsewhere on the site, horizontal scroll like a quick-look carousel */}
      <div className="mt-16 py-14 px-9" style={{ background: '#2B6E4F' }}>
        <h2 className="font-display font-bold text-xl text-center mb-8" style={{ color: '#fff' }}>
          What's included, at a glance
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 max-w-6xl mx-auto snap-x snap-mandatory">
          {included.map((item) => {
            const a = accentStyles[item.accent];
            return (
              <div
                key={item.label}
                className="shrink-0 w-[190px] snap-start rounded-[10px] p-4 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <div className={`h-1 -mx-4 -mt-4 mb-3 ${a.tile}`} />
                <ImagePlaceholder className="aspect-[4/3] rounded-md mb-3" />
                <h4 className="font-sans font-bold text-[12.5px] mb-1" style={{ color: '#fff' }}>
                  {item.label}
                </h4>
                <p className="text-[11px] leading-[1.5] m-0" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {item.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timing & Eligibility */}
      <div className="px-9 pt-16 pb-1 text-center">
        <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">timing &amp; eligibility</div>
        <h2 className="font-display font-bold text-xl">Who this is for, and when</h2>
      </div>
      <div className="flex gap-4 px-9 pt-8 pb-4 flex-col md:flex-row max-w-4xl mx-auto">
        {eligibility.map((e) => {
          const a = accentStyles[e.accent];
          return (
            <div
              key={e.title}
              className={`flex-1 border-2 ${a.border} ${a.soft} rounded-[10px] p-5 text-center transition-transform hover:-translate-y-0.5`}
            >
              <div className={`w-11 h-11 rounded-lg ${a.tile} ${a.fg} flex items-center justify-center mx-auto mb-3`}>
                {e.icon}
              </div>
              <h3 className="font-sans font-bold text-[13.5px] mb-1.5">{e.title}</h3>
              <p className="text-[11.5px] text-umber-soft m-0 leading-[1.55]">{e.body}</p>
            </div>
          );
        })}
      </div>

      {/* Safety & Support — framed in a solid indigo panel to match the vibrant
          forest panel on the Volunteer page's pathway section */}
      <div className="px-9 pt-16 pb-2">
        <div className="max-w-5xl mx-auto rounded-[14px] bg-indigo px-8 py-10 flex gap-9 items-center flex-col md:flex-row-reverse">
          <ImagePlaceholder caption="photography: check-in / supervisor meeting" className="flex-1 w-full h-[240px] rounded-[10px]" />
          <div className="flex-1">
            <div className="font-mono text-[10.5px] text-lime mb-3 lowercase">safety &amp; support</div>
            <h2 className="font-display font-bold text-xl mb-3 text-white">
              Every placement has a named person accountable for it
            </h2>
            <p className="text-[13px] text-white/70 leading-[1.65] max-w-md">
              Safeguarding-checked supervisors, weekly check-ins, and a team on both ends who
              actually respond — not a form you submit into the void.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-9 pt-16 pb-1">
        <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">faqs</div>
        <h2 className="font-display font-bold text-xl">Common questions</h2>
      </div>
      <div className="px-9 pt-2.5 pb-4 flex flex-col lg:flex-row gap-10">
        <div className="max-w-2xl w-full">
          {faqs.map((f) => (
            <details key={f.q} className="border-t border-line py-4 group last:border-b">
              <summary className="font-sans font-semibold text-[13.5px] flex justify-between items-center cursor-pointer list-none">
                <span>{f.q}</span>
                <span className="font-mono text-taupe text-[15px] group-open:hidden">+</span>
                <span className="font-mono text-taupe text-[15px] hidden group-open:inline">−</span>
              </summary>
              <div className="text-xs text-umber-soft mt-2.5 leading-[1.6] max-w-[600px]">{f.a}</div>
            </details>
          ))}
        </div>
        <div className="flex-1">
          <RotatingHighlight />
        </div>
      </div>

      <CtaBanner
        eyebrow="ready to start?"
        headline="Your Journey Starts With One Step"
        buttonLabel="Find your opportunity"
        to="/volunteer"
        secondaryButtonLabel="Register your organisation"
        secondaryButtonTo="/organizations/register"
      />
    </div>
  );
}
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';

const pathway = [
  {
    step: '01',
    title: 'Every host is checked',
    body: 'Cross-checked against current registration before a listing ever goes live.',
  },
  {
    step: '02',
    title: '3 options, picked for you',
    body: 'Tell us your skills and goals, and we surface your best fits automatically.',
  },
  {
    step: '03',
    title: 'Evidence, not just experience',
    body: 'Every placement adds tracked, verifiable skills to your profile.',
  },
];

const reviews = [
  {
    quote:
      "Volunteering here didn't feel like free labour. There were real expectations, and real support when things got hard.",
    name: 'Patricia, Kenya',
  },
  {
    quote:
      'I found my placement in a week, and it was the first time volunteering felt like it was actually building toward something.',
    name: 'Brian, Nairobi',
  },
  {
    quote:
      'Coming from abroad, I was nervous about legitimacy. The verification process and check-ins made it feel safe the whole way through.',
    name: 'Sofia, International volunteer',
  },
];

const tracks = [
  {
    name: 'Kenyan volunteers',
    price: 'Free, always',
    audience: 'Recent graduates, students, and career-changers based in Kenya.',
    body: 'Full vetting, matching, and placement support at no cost — this is the core Tolea experience, free for every Kenyan volunteer.',
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
    included: [
      'Guardian consent and a co-signed agreement',
      'An additional safeguarding review',
      'Closer, more frequent check-ins',
      'Age-appropriate placement matching',
      'Guardian included in all major placement communications',
    ],
  },
];

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
    <div className="w-14 h-14 rounded-full bg-forest text-white font-display font-bold text-base flex items-center justify-center shadow-sm shrink-0">
      {step}
    </div>
  );
}

function PathwayConnector() {
  return (
    <div className="flex items-center flex-1 px-2">
      <div className="h-px flex-1 bg-line" />
      <span className="text-taupe mx-1.5 text-sm leading-none">→</span>
      <div className="h-px flex-1 bg-line" />
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

      {/* Pathway — connected flow diagram */}
      <div className="px-9 pt-12 pb-8 text-center">
        <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">the journey</div>
        <h2 className="font-display font-bold text-xl">Our Volunteers Pathway</h2>
      </div>

      {/* Desktop: horizontal flow */}
      <div className="hidden md:block px-9 pb-3 max-w-4xl mx-auto">
        <div className="flex items-center">
          {pathway.map((p, i) => (
            <div key={p.step} className="flex items-center flex-1 last:flex-none">
              <PathwayNode step={p.step} />
              {i < pathway.length - 1 && <PathwayConnector />}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-6 px-9 pb-12 max-w-4xl mx-auto text-center">
        {pathway.map((p) => (
          <div key={p.step}>
            <h3 className="font-display font-bold text-base mb-1.5">{p.title}</h3>
            <p className="text-[12px] text-umber-soft m-0">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="md:hidden flex flex-col items-center px-9 pb-12">
        {pathway.map((p, i) => (
          <div key={p.step} className="flex flex-col items-center">
            <PathwayNode step={p.step} />
            <div className="text-center mt-3 mb-1 max-w-[280px]">
              <h3 className="font-display font-bold text-base mb-1.5">{p.title}</h3>
              <p className="text-[12px] text-umber-soft m-0">{p.body}</p>
            </div>
            {i < pathway.length - 1 && <div className="h-8 w-px bg-line my-2" />}
          </div>
        ))}
      </div>

      {/* Reviews — full-bleed, one photo slot each */}
      <div className="bg-white border-y border-line">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
          {reviews.map((r) => (
            <div key={r.name} className="p-9 flex flex-col items-center text-center">
              <ImagePlaceholder caption="photo" className="w-24 h-24 rounded-full mb-5" />
              <p className="text-sm leading-[1.6] mb-3">"{r.quote}"</p>
              <div className="font-mono text-[10.5px] text-umber-soft">{r.name}</div>
            </div>
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
        {tracks.map((t) => (
          <div key={t.name} className="flex-1 border border-line rounded-[10px] p-6 bg-white flex flex-col">
            <h3 className="font-sans font-bold text-base mb-1">{t.name}</h3>
            <div className="font-mono text-[10.5px] text-marigold font-semibold mb-3">
              {t.price}
            </div>
            <p className="text-xs text-taupe mb-4 italic">{t.audience}</p>
            <p className="text-xs text-umber-soft leading-[1.6] mb-5">{t.body}</p>

            <div className="font-mono text-[9.5px] text-taupe uppercase mb-3">what's included</div>
            <ul className="space-y-2.5 mt-auto">
              {t.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-umber-soft leading-[1.5]">
                  <span className="text-forest font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
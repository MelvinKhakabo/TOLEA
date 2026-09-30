import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SDGS } from '../lib/sdgs';

const stats = ['50+ companies partnered', '100+ volunteers placed', '95% satisfaction rate'];

const steps = [
  {
    num: '01',
    title: 'Tell us your goals',
    body: "A 5-minute questionnaire on your skills, time, and what you want to build — not a generic sign-up form.",
  },
  {
    num: '02',
    title: 'Get matched',
    body: "We surface your 3 best-fit, verified opportunities, cross-checked against the host's verification status.",
  },
  {
    num: '03',
    title: 'Apply and grow',
    body: 'Apply, get placed, and watch your skills journal fill up from day one.',
  },
];

// Placeholder quotes — swap in real volunteer photos/names as they come in.
const testimonials = [
  {
    quote: "I found my placement in a week, and it was the first time volunteering felt like it was actually building toward something.",
    name: 'Brian',
    role: 'Software Volunteer, Nairobi',
  },
  {
    quote: 'The check-ins genuinely felt like someone had my back, not just a formality.',
    name: 'Patricia',
    role: 'Community Health Intern',
  },
  {
    quote: 'Coming from abroad, the verification process made it feel safe the whole way through.',
    name: 'Sofia',
    role: 'International Volunteer',
  },
  {
    quote: 'The skills journal was the difference — I could point to exactly what I did, not just say I "volunteered somewhere."',
    name: 'Derek',
    role: 'Policy Research Intern',
  },
  {
    quote: "Knowing there was a confidential way to raise a concern made it easy to trust the process from day one.",
    name: 'Amina',
    role: 'Education Volunteer',
  },
];

const wayCards = [
  {
    tag: 'support',
    title: 'Always-on support',
    body: 'Local mentors and experienced leaders are reachable any time during your placement.',
  },
  {
    tag: 'verification',
    title: 'Reviewed placements',
    body: "Every host is checked before you're matched, and reviewed again at the midpoint.",
  },
  {
    tag: 'fair work',
    title: 'Fair-work standards',
    body: 'Capped hours, clear expectations, and a policy we hold every host to.',
  },
  {
    tag: 'accountability',
    title: 'Two-way accountability',
    body: 'Feedback flows both ways, and issues are resolved by our team, not left to chance.',
  },
];

// Placeholder roster — swap in real partner names/logos when available.
const partners = [
  'Partner Organisation',
  'Partner Organisation',
  'Partner Organisation',
  'Partner Organisation',
  'Partner Organisation',
  'Partner Organisation',
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

// Shared gradient — used on the hero and now the Partners slab, so the two
// "bookend" dark cards read as the same family instead of flat vs. rich.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)';

function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
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
            style={{ color: dark ? 'rgba(255,255,255,0.92)' : 'rgba(36,26,18,0.75)' }}
          >
            {text}
            <span style={{ color: '#C3D82E' }} className="text-base">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}


/** Left column of "How it works" — vertically stacked step cards connected
 *  by a dotted timeline, sized to sit level with the testimonial card. */
/** Left column of "How it works" — numbered circle nodes on a dashed
 *  timeline, generously spaced, cards holding just the content. */
function StepTimeline() {
  return (
    <div className="flex flex-col h-full">
      {steps.map((s, i) => (
        <div key={s.num}>
          <div className="flex gap-5 items-start">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[13px] shrink-0"
              style={{ background: '#2B6E4F', color: '#fff' }}
            >
              {s.num}
            </span>
            <div className="flex-1 rounded-2xl p-6" style={{ background: '#E4EEE7' }}>
              <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-[12.5px] m-0 leading-[1.6]" style={{ color: '#5a5347' }}>
                {s.body}
              </p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="w-9 flex justify-center">
              <div className="h-12" style={{ borderLeft: '2px dashed rgba(43,110,79,0.35)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Right column of "How it works" — a dark-green card cycling through
 *  volunteer testimonials, round photo frame + quote + dot pagination. */
function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <div className="rounded-2xl p-7 flex flex-col h-full" style={{ background: '#2B6E4F' }}>
      <style>{`
        @keyframes tolea-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div key={index} className="flex-1 flex flex-col justify-between" style={{ animation: 'tolea-fade 0.5s ease' }}>
        <div>
          <ImagePlaceholder caption="photo" className="w-16 h-16 rounded-full mb-5" />
          <p className="text-sm leading-[1.65] m-0" style={{ color: '#fff' }}>
            "{t.quote}"
          </p>
        </div>
        <div className="mt-6">
          <div className="font-sans font-semibold text-[13px]" style={{ color: '#fff' }}>
            {t.name}
          </div>
          <div className="font-mono text-[10.5px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {t.role}
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-5">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{ width: i === index ? '18px' : '6px', background: i === index ? '#C3D82E' : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
    </div>
  );
}

const highlightSlides = [
  {
    type: 'testimonial' as const,
    quote: 'The check-ins genuinely felt like someone had my back, not just a formality.',
    name: 'Brian, Nairobi',
  },
  {
    type: 'stat' as const,
    value: '95%',
    label: 'of volunteers rate their placement as a good fit',
  },
  {
    type: 'trust' as const,
    line: 'Every host organisation is re-verified at the midpoint of each placement.',
  },
  {
    type: 'testimonial' as const,
    quote: 'Coming from abroad, the verification process made it feel safe the whole way through.',
    name: 'Sofia, International volunteer',
  },
];

/** FAQ sidebar panel — recolored to the same dark-green family as the
 *  testimonial carousel, instead of the flat light-peach it had before. */
function RotatingHighlight() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % highlightSlides.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const slide = highlightSlides[index];

  return (
    <div className="rounded-2xl p-7 flex flex-col justify-center h-full" style={{ background: '#2B6E4F', minHeight: '220px' }}>
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
              <p className="text-sm leading-[1.6] m-0" style={{ color: '#fff' }}>
                "{slide.quote}"
              </p>
              <div className="font-mono text-[10.5px] mt-2.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {slide.name}
              </div>
            </div>
          </div>
        )}
        {slide.type === 'stat' && (
          <div>
            <div className="font-display font-extrabold text-4xl mb-2" style={{ color: '#C3D82E' }}>
              {slide.value}
            </div>
            <p className="text-sm m-0" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {slide.label}
            </p>
          </div>
        )}
        {slide.type === 'trust' && (
          <p className="text-sm leading-[1.6] m-0" style={{ color: '#fff' }}>
            {slide.line}
          </p>
        )}
      </div>
      <div className="flex gap-1.5 mt-6">
        {highlightSlides.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? '18px' : '6px',
              background: i === index ? '#C3D82E' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

const BAND = '#EFEAE1'; // same tint About uses for its alternating sections

export default function Home() {
  return (
    <div>
      {/* Hero — inset rounded card on the ivory page, not edge-to-edge */}
      <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
        <div
          className="relative overflow-hidden rounded-[28px] flex items-center justify-center text-center px-6 py-28 md:py-36"
          style={{ background: DARK_GRADIENT }}
        >
          <div className="max-w-2xl relative z-10">
            <div className="font-mono text-[11px] mb-4 lowercase tracking-wide" style={{ color: '#C3D82E' }}>
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
      </div>

      {/* Stats band — full-bleed dark, bookends the hero, lime for numbers/accents */}
      <div data-nav-theme="dark" className="py-6" style={{ background: '#1d4433' }}>
        <Marquee items={stats} dark />
        <div className="flex items-center gap-3.5 px-9 flex-wrap">
          <span className="font-mono text-[10.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
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
          <Link to="/about" className="text-[11.5px] font-medium" style={{ color: '#C3D82E' }}>
            Learn more →
          </Link>
        </div>
      </div>

      {/* How it works — left: step timeline, right: testimonial carousel, same height */}
      <div data-nav-theme="light" className="px-9 py-14">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            the process
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">
            From goals to a verified placement, in three steps
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="flex-[1.2]">
            <StepTimeline />
          </div>
          <div className="flex-1">
            <TestimonialCarousel />
          </div>
        </div>
      </div>

      {/* The Tolea way — uniform dark cards, lime tag + heading */}
      <div data-nav-theme="light" style={{ background: BAND }} className="px-9 py-14">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            the tolea way
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">
            Safety and support built into every placement
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wayCards.map((c) => (
            <div key={c.title} className="rounded-2xl p-6 flex flex-col" style={{ background: '#1d4433' }}>
              <span
                className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[9.5px] font-mono uppercase mb-5"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#C3D82E' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C3D82E' }} />
                {c.tag}
              </span>
              <h3 className="font-display font-bold text-base mb-2" style={{ color: '#C3D82E' }}>
                {c.title}
              </h3>
              <p className="text-[12.5px] leading-[1.6] m-0" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners — same rich gradient as the hero, not a flat fill */}
      <div data-nav-theme="dark" className="px-4 pb-4">
        <div className="rounded-[28px] px-9 py-14" style={{ background: DARK_GRADIENT }}>
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#C3D82E' }}>
              our partners
            </div>
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: '#fff' }}>
              Trusted by organisations across Kenya
            </h2>
            <p className="text-[12.5px] leading-[1.6] m-0" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Tolea partners with verified host organisations across Nairobi and beyond — real
              names and logos go here as more organisations come on board.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {partners.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-8 py-6 rounded-xl min-w-[160px]"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ — ivory band, full width, left-aligned, with the dark rotating panel beside it */}
      <div data-nav-theme="light" className="py-14 px-9">
        <div className="mb-8">
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
            faqs
          </div>
          <h2 className="font-display font-bold text-2xl max-w-xl">Common questions</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="max-w-2xl w-full" style={{ borderTop: '1px solid rgba(36,26,18,0.1)' }}>
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
          <div className="flex-1">
            <RotatingHighlight />
          </div>
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
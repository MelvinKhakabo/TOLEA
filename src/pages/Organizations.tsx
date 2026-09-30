import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';
import { SDGS } from '../lib/sdgs';

// TODO: swap in the 5 real hero photos here (imports from src/assets, or paths
// into public/). Until then each slide falls back to a tinted gradient so the
// slideshow mechanics can be reviewed without real images yet.
const heroSlides: (string | null)[] = [null, null, null, null, null];

const ORG_INQUIRY_EMAIL = 'tolea.community@gmail.com';

// Same saturated palette used on Volunteer/HowWeWork — one accent style map,
// reused for perk cards, the CSR panel, and the partnership tiers, so the
// whole page reads as one vibrant system rather than isolated pastel blocks.
type Accent = 'forest' | 'indigo' | 'marigold' | 'lime';

const accentStyles: Record<
  Accent,
  { tile: string; fg: string; border: string; soft: string; tag: string; check: string }
> = {
  forest: { tile: 'bg-forest', fg: 'text-white', border: 'border-forest', soft: 'bg-forest-soft', tag: 'bg-forest text-white', check: 'text-forest' },
  indigo: { tile: 'bg-indigo', fg: 'text-white', border: 'border-indigo', soft: 'bg-indigo-soft', tag: 'bg-indigo text-white', check: 'text-indigo' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber', border: 'border-marigold', soft: 'bg-marigold-soft', tag: 'bg-marigold text-white', check: 'text-marigold' },
  lime: { tile: 'bg-lime', fg: 'text-umber', border: 'border-lime', soft: 'bg-lime/15', tag: 'bg-lime text-umber', check: 'text-lime' },
};

const perks = [
  {
    title: 'Verified pipeline',
    body: 'Every volunteer is document-checked and interviewed before they ever reach your listing.',
    accent: 'indigo' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2l4-4" />
      </svg>
    ),
  },
  {
    title: 'CSR reporting, made simple',
    body: 'Placements map directly to SDG outcomes, so your impact reporting writes itself.',
    accent: 'forest' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },
  {
    title: 'No hiring overhead',
    body: 'We handle matching, onboarding, and check-ins — you focus on the work itself.',
    accent: 'marigold' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
        <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
      </svg>
    ),
  },
  {
    title: 'Accountable both ways',
    body: 'Feedback and issues are resolved by our team, with clear expectations set upfront.',
    accent: 'lime' as Accent,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
        <path d="M20 16H7M7 16l3-3M7 16l3 3" />
      </svg>
    ),
  },
];

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    audience: 'Registered charities and community-based organisations (CBOs).',
    body: 'The standard track for any verified nonprofit — full access to Kenyan volunteers at no cost.',
    accent: 'forest' as Accent,
    included: [
      'PBO Act registration check',
      'Standard listing on Tolea',
      'Access to Kenyan volunteers (free track)',
      'Standard onboarding support',
    ],
    featured: false,
  },
  {
    name: 'Verified+',
    price: 'Paid',
    audience: 'Organisations wanting a stronger trust signal with prospective volunteers.',
    body: 'Everything in Basic, plus an in-person site visit, giving your listing a verified badge volunteers can see.',
    accent: 'indigo' as Accent,
    included: [
      'Everything in Basic',
      'On-site verification visit',
      '"Verified" badge on your listing',
      'Priority placement in search results',
      'Access to international volunteers',
    ],
    featured: true,
  },
  {
    name: 'Sponsor',
    price: 'Paid',
    audience: 'Organisations or companies wanting to fund access for local volunteers.',
    body: 'Everything in Verified+, plus your sponsorship directly subsidises free placements for Kenyan volunteers.',
    accent: 'marigold' as Accent,
    included: [
      'Everything in Verified+',
      'Sponsor placements for local volunteers',
      'Named recognition in impact reporting',
      'A dedicated account contact',
    ],
    featured: false,
  },
];

const csrGoals = SDGS.filter((s) => [8, 10, 17].includes(s.number));

// Rotating photo slideshow behind the hero copy — each slide fades in/out on
// an interval; falls back to a tinted gradient until real photos are wired in.
function HeroSlideshow({ slides }: { slides: (string | null)[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === active ? 1 : 0,
            background: slide
              ? `url(${slide}) center/cover no-repeat`
              : 'radial-gradient(circle at 20% 30%, rgba(195,216,46,0.22), transparent 50%), radial-gradient(circle at 80% 75%, rgba(232,163,49,0.2), transparent 55%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)',
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(rgba(35,58,94,0.45), rgba(36,26,18,0.6))' }}
      />
    </div>
  );
}

export default function Organizations() {
  return (
    <div>
      {/* Hero — same footprint as Home's hero: full-width inset panel (no
          max-width cap), rounded-[28px], with the photo slideshow as the
          background layer instead of Home's flat DARK_GRADIENT */}
      <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
        <div className="relative overflow-hidden rounded-[28px] flex items-center justify-center text-center px-6 py-28 md:py-36">
          <HeroSlideshow slides={heroSlides} />
          <div className="relative max-w-2xl">
            <div className="font-mono text-[11px] mb-4 lowercase tracking-wide text-lime">
              for organisations
            </div>
            <h1 className="font-display font-bold text-white text-[32px] md:text-[46px] leading-[1.15] mb-5">
              Every organisation has a gap talent could close. We find the person to close it.
            </h1>
            <div className="flex flex-col items-center gap-2.5">
              <Link to="/organizations/register">
                <Button variant="primary">Register your organisation</Button>
              </Link>
              <div className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Need more information?{' '}
                <a href={`mailto:${ORG_INQUIRY_EMAIL}`} className="underline cursor-pointer" style={{ color: '#fff' }}>
                  Make an Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bring in verified talent — the pitch that used to live in the hero */}
      <div className="px-9 pt-16 pb-2 text-center max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-2xl mb-4">
          Bring in verified talent, without the hiring overhead.
        </h2>
        <p className="text-[13.5px] leading-[1.7]" style={{ color: '#5a5347' }}>
          Tolea sources, matches, and holds volunteers accountable, handling verification,
          onboarding, and check-ins, so the gap gets filled without the risk, and without the
          hiring overhead.
        </p>
      </div>

      {/* Why partner with Tolea */}
      <div className="px-9 pt-[52px] pb-1">
        <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">why partner with us</div>
        <h2 className="font-display font-bold text-xl max-w-xl">
          Everything you need to host, none of the overhead
        </h2>
      </div>
      <div className="flex gap-3.5 px-9 pt-3.5 pb-[30px] flex-col md:flex-row">
        {perks.map((p) => {
          const a = accentStyles[p.accent];
          return (
            <div
              key={p.title}
              className={`flex-1 rounded-[10px] p-4 border-2 ${a.border} ${a.soft} transition-transform hover:-translate-y-0.5`}
            >
              <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-3 ${a.tile} ${a.fg}`}>
                {p.icon}
              </div>
              <h3 className="font-sans font-bold text-[13.5px] mb-1.5" style={{ color: '#241A12' }}>
                {p.title}
              </h3>
              <p className="text-[11.5px] m-0 leading-[1.55]" style={{ color: '#5a5347' }}>
                {p.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* CSR / SDG impact callout — solid indigo panel instead of a pale tint,
          so it holds its own next to the colored perk cards above it */}
      <div className="mx-9 mb-[30px] rounded-[10px] px-6.5 py-6 bg-indigo flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
        <div className="max-w-lg">
          <div className="font-mono text-[10.5px] text-lime mb-2 lowercase">csr &amp; impact</div>
          <h3 className="font-display font-bold text-lg mb-2 text-white">
            Your placements already count toward your CSR goals
          </h3>
          <p className="text-[12.5px] leading-[1.6] m-0 text-white/70">
            Every Tolea placement is tagged against the UN Sustainable Development Goals, so your
            impact reporting comes pre-built — no extra work on your end.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {csrGoals.map((sdg) => (
            <div key={sdg.number} className="text-center">
              <div
                className="w-11 h-11 rounded-md flex items-center justify-center font-display font-extrabold text-sm text-white mb-1.5 mx-auto shadow-sm"
                style={{ background: sdg.color }}
              >
                {sdg.number}
              </div>
              <div className="font-mono text-[9px] text-white/70 max-w-[70px]">{sdg.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership tiers */}
      <div className="px-9 pt-9 pb-1">
        <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">partnership tiers</div>
        <h2 className="font-display font-bold text-xl">Choose the level of support you need</h2>
      </div>
      <div className="flex gap-3.5 px-9 pt-3.5 pb-16 flex-col md:flex-row items-stretch">
        {tiers.map((t) => {
          const a = accentStyles[t.accent];
          return (
            <div
              key={t.name}
              className={`flex-1 rounded-[10px] p-6 flex flex-col border-2 ${a.border} ${a.soft} transition-transform hover:-translate-y-0.5`}
              style={t.featured ? { boxShadow: '0 8px 24px rgba(35,58,94,0.18)' } : undefined}
            >
              {t.featured && (
                <div className={`inline-block w-fit font-mono text-[9.5px] uppercase mb-2 px-2 py-0.5 rounded-full ${a.tag}`}>
                  Most chosen
                </div>
              )}
              <h3 className="font-sans font-bold text-base mb-1">{t.name}</h3>
              <div
                className={`inline-block w-fit font-mono text-[10.5px] font-semibold mb-3 px-2.5 py-1 rounded-full ${a.tag}`}
              >
                {t.price.toUpperCase()}
              </div>
              <p className="text-xs text-taupe mb-4 italic">{t.audience}</p>
              <p className="text-xs text-umber-soft leading-[1.6] mb-5">{t.body}</p>

              <div className="font-mono text-[9.5px] text-taupe uppercase mb-3">what's included</div>
              <ul className="space-y-2.5 mt-auto">
                {t.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-umber-soft leading-[1.5]">
                    <span className={`${a.check} font-bold mt-0.5`}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <CtaBanner
        eyebrow="ready to host?"
        headline="List Your Organisation Today"
        buttonLabel="Register your organisation"
        to="/organizations/register"
        secondaryLinkLabel="Make an Enquiry"
        secondaryHref={`mailto:${ORG_INQUIRY_EMAIL}`}
      />
    </div>
  );
}
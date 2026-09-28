import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';
import { SDGS } from '../constants/sdgs';

// TODO: swap in the 5 real hero photos here (imports from src/assets, or paths
// into public/). Until then each slide falls back to a tinted gradient so the
// slideshow mechanics can be reviewed without real images yet.
const heroSlides: (string | null)[] = [null, null, null, null, null];

const ORG_INQUIRY_EMAIL = 'tolea.community@gmail.com';

function HeroSlideshow({ slides }: { slides: (string | null)[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === index ? 1 : 0,
            backgroundImage: src
              ? `url(${src})`
              : 'radial-gradient(circle at 30% 30%, rgba(35,58,94,0.35), transparent 55%), radial-gradient(circle at 75% 70%, rgba(43,110,79,0.28), transparent 55%), linear-gradient(135deg, #e9ded0, #cfc3ad)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      {/* dark overlay so white hero text stays readable over any photo */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(rgba(35,58,94,0.55), rgba(36,26,18,0.72))' }}
      />
    </div>
  );
}

const perks = [
  {
    title: 'Verified pipeline',
    body: 'Every volunteer is document-checked and interviewed before they ever reach your listing.',
    bg: '#E5E9F0',
    accent: '#233A5E',
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
    bg: '#E4EEE7',
    accent: '#2B6E4F',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />
      </svg>
    ),
  },
  {
    title: 'No hiring overhead',
    body: 'We handle matching, onboarding, and check-ins — you focus on the work itself.',
    bg: '#FBEBD1',
    accent: '#8a5e13',
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
    bg: '#FBF6EC',
    accent: '#241A12',
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

export default function Organizations() {
  return (
    <div>
      {/* Hero — full-bleed photo slideshow, centered text, indigo accent per the Organizations track */}
      <div className="relative flex items-center justify-center text-center px-6 py-28 md:py-36 overflow-hidden">
        <HeroSlideshow slides={heroSlides} />
        <div className="relative max-w-2xl">
          <div className="font-mono text-[11px] mb-4 lowercase tracking-wide" style={{ color: '#A9C2E8' }}>
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
        {perks.map((p) => (
          <div
            key={p.title}
            className="flex-1 rounded-[10px] p-4"
            style={{ background: p.bg, border: '1px solid rgba(36,26,18,0.08)' }}
          >
            <div
              className="w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-3"
              style={{ background: 'rgba(255,255,255,0.7)', color: p.accent }}
            >
              {p.icon}
            </div>
            <h3 className="font-sans font-bold text-[13.5px] mb-1.5" style={{ color: '#241A12' }}>
              {p.title}
            </h3>
            <p className="text-[11.5px] m-0 leading-[1.55]" style={{ color: '#5a5347' }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* CSR / SDG impact callout */}
      <div className="mx-9 mb-[30px] rounded-[10px] px-6.5 py-6 bg-indigo-soft flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
        <div className="max-w-lg">
          <div className="font-mono text-[10.5px] text-indigo mb-2 lowercase">csr &amp; impact</div>
          <h3 className="font-display font-bold text-lg mb-2">
            Your placements already count toward your CSR goals
          </h3>
          <p className="text-[12.5px] leading-[1.6] m-0" style={{ color: '#4a4038' }}>
            Every Tolea placement is tagged against the UN Sustainable Development Goals, so your
            impact reporting comes pre-built — no extra work on your end.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {csrGoals.map((sdg) => (
            <div key={sdg.number} className="text-center">
              <div
                className="w-11 h-11 rounded-md flex items-center justify-center font-display font-extrabold text-sm text-white mb-1.5 mx-auto"
                style={{ background: sdg.color }}
              >
                {sdg.number}
              </div>
              <div className="font-mono text-[9px] text-indigo max-w-[70px]">{sdg.shortName}</div>
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
        {tiers.map((t) => (
          <div
            key={t.name}
            className="flex-1 rounded-[10px] p-6 bg-white flex flex-col"
            style={{
              border: t.featured ? '1.5px solid #233A5E' : '1px solid #E3DACB',
              boxShadow: t.featured ? '0 4px 18px rgba(35,58,94,0.12)' : 'none',
            }}
          >
            {t.featured && (
              <div className="font-mono text-[9.5px] text-indigo uppercase mb-2">Most chosen</div>
            )}
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
                  <span className="text-indigo font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
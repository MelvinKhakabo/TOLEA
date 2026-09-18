import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/Button';
import FootCta from '../components/FootCta';
import { SDGS } from '../lib/sdgs';

const stats = [
  { num: '50+', label: 'companies partnered' },
  { num: '100+', label: 'volunteers placed' },
  { num: '95%', label: 'satisfaction rate' },
];

const steps = [
  {
    num: '01',
    title: 'Tell us your goals',
    body: 'A 5-minute questionnaire on your skills, time, and what you want to build.',
    cap: 'photo: interview panel',
  },
  {
    num: '02',
    title: 'Get matched',
    body: 'We surface your 3 best-fit, verified opportunities.',
    cap: 'photo: phone with match notification',
  },
  {
    num: '03',
    title: 'Apply and grow',
    body: 'Apply, get placed, and watch your skills journal fill up.',
    cap: 'photo: volunteer at work',
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

export default function Home() {
  return (
    <div className="bg-ivory">
      <Nav />

      {/* Hero */}
      <div className="flex gap-9 items-center px-9 pt-[52px] flex-col md:flex-row">
        <div className="flex-[1.1] w-full">
          <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">
            free for kenyan volunteers, always
          </div>
          <h1 className="font-display font-bold text-[34px] leading-[1.15] -tracking-[0.01em] mb-4">
            Build real skills.
            <br />
            Find your people.
            <br />
            Move your future forward.
          </h1>
          <p className="text-[13.5px] text-[#4a4038] leading-[1.65] mb-5 max-w-[420px]">
            Tolea matches you with verified organisations across Kenya, and tracks every skill you
            build along the way.
          </p>
          <div className="flex gap-2.5">
            <Link to="/volunteer">
              <Button variant="primary">Find your opportunity</Button>
            </Link>
            <Link to="/organizations">
              <Button variant="secondary">For organisations</Button>
            </Link>
          </div>
        </div>
        <div className="imgph flex-1 h-[270px] w-full" data-cap="photography: volunteers, warm daylight" />
      </div>

      {/* Stats */}
      <div className="flex border-t border-b border-line px-9 py-6 mt-10">
        {stats.map((s) => (
          <div key={s.label} className="flex-1">
            <div className="font-display font-extrabold text-[26px] text-forest">{s.num}</div>
            <div className="font-mono text-[10px] text-taupe mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SDG strip */}
      <div className="flex items-center gap-3.5 px-9 py-4.5 border-t border-line">
        <span className="font-mono text-[10.5px] text-taupe">aligned with the un sdgs</span>
        <div className="flex gap-1.5">
          {SDGS.map((sdg) => (
            <div
              key={sdg.number}
              className="w-[26px] h-[26px] rounded-[5px] flex items-center justify-center font-display font-extrabold text-[10.5px] text-white"
              style={{ background: sdg.color }}
            >
              {sdg.number}
            </div>
          ))}
        </div>
        <Link to="/about" className="text-[11.5px] text-taupe cursor-pointer">
          Learn more →
        </Link>
      </div>

      {/* How it works */}
      <div className="flex gap-4 px-9 pt-[30px] pb-[30px] flex-col md:flex-row">
        {steps.map((s) => (
          <div key={s.num} className="flex-1">
            <div className="imgph h-[110px] mb-3" data-cap={s.cap} />
            <div className="font-mono text-[11px] text-indigo mb-2">{s.num}</div>
            <h2 className="font-display font-bold text-lg mb-1.5">{s.title}</h2>
            <p className="text-[12.5px] text-umber-soft m-0">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mx-9 mb-[30px] bg-marigold-soft rounded-[10px] px-6.5 py-5.5 text-sm leading-[1.6]">
        "I found my placement in a week, and it was the first time volunteering felt like it was
        actually building toward something."
        <div className="font-mono text-[10.5px] text-umber-soft mt-2.5">
          Early Tolea volunteer, Nairobi
        </div>
      </div>

      {/* The Tolea way */}
      <div className="px-9 pt-9 pb-1">
        <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">the tolea way</div>
        <h2 className="font-display font-bold text-xl">
          Safety and support built into every placement
        </h2>
      </div>
      <div className="flex gap-3.5 px-9 pt-3.5 pb-[30px] flex-col md:flex-row">
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

      {/* FAQ */}
      <div className="px-9 pt-9 pb-1">
        <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">faqs</div>
        <h2 className="font-display font-bold text-xl">Common questions</h2>
      </div>
      <div className="px-9 pt-2.5 pb-[34px]">
        {faqs.map((f) => (
          <details key={f.q} className="border-t border-line py-4 group last:border-b">
            <summary className="font-sans font-semibold text-[13.5px] flex justify-between items-center cursor-pointer list-none">
              <span>{f.q}</span>
              <span className="font-mono text-taupe text-[15px] group-open:hidden">+</span>
              <span className="font-mono text-taupe text-[15px] hidden group-open:inline">−</span>
            </summary>
            <div className="text-xs text-umber-soft mt-2.5 leading-[1.6] max-w-[600px]">{f.a}</div>
            <div className="font-mono text-[9.5px] text-taupe mt-1.5">
              auto-populated from policy doc
            </div>
          </details>
        ))}
      </div>

      <FootCta
        message="Hosting talent? List a role and reach graduates ready to build real skills with your organisation."
        buttonLabel="Register your organisation"
      />
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';

type Mode = 'Online' | 'In-person';
type Accent = 'forest' | 'indigo' | 'marigold';

const accentStyles: Record<Accent, { bar: string; tag: string; fg: string }> = {
  forest: { bar: 'bg-forest', tag: 'bg-forest', fg: 'text-white' },
  indigo: { bar: 'bg-indigo', tag: 'bg-indigo', fg: 'text-white' },
  marigold: { bar: 'bg-marigold', tag: 'bg-marigold', fg: 'text-umber' },
};

const upcomingEvents: {
  title: string;
  date: string;
  mode: Mode;
  body: string;
  accent: Accent;
  caption: string;
}[] = [
  {
    title: 'Monthly Community Meetup',
    date: 'First Saturday of the month',
    mode: 'In-person',
    body: 'Active volunteers gather to swap stories, get support, and meet the wider Tolea community.',
    accent: 'forest',
    caption: 'photo: monthly meetup',
  },
  {
    title: 'New Volunteer Orientation',
    date: 'Every intake',
    mode: 'Online',
    body: 'A live walkthrough of how matching, verification, and check-ins work before your placement starts.',
    accent: 'indigo',
    caption: 'photo: orientation session',
  },
  {
    title: 'Host Organisation Info Session',
    date: 'Quarterly',
    mode: 'Online',
    body: "For organisations considering listing with Tolea — what verification checks, what it costs, and how matching works.",
    accent: 'marigold',
    caption: 'photo: host info session',
  },
];

const pastEvents: { title: string; date: string; mode: Mode; caption: string; accent: Accent }[] = [
  { title: 'Volunteer Orientation Day', date: 'Aug 2026', mode: 'In-person', caption: 'photo: orientation day, Nairobi', accent: 'forest' },
  { title: 'Community Meetup #3', date: 'Jul 2026', mode: 'In-person', caption: 'photo: monthly meetup', accent: 'indigo' },
  { title: 'Host Org Info Session', date: 'Jun 2026', mode: 'Online', caption: 'photo: host info session', accent: 'marigold' },
  { title: 'Skills Journal Workshop', date: 'May 2026', mode: 'In-person', caption: 'photo: skills workshop', accent: 'forest' },
  { title: 'Community Meetup #2', date: 'Apr 2026', mode: 'In-person', caption: 'photo: monthly meetup', accent: 'indigo' },
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

function ModeTag({ mode }: { mode: Mode }) {
  const isOnline = mode === 'Online';
  return (
    <span
      className={`font-mono text-[9.5px] uppercase px-2 py-1 rounded text-white ${
        isOnline ? 'bg-indigo' : 'bg-forest'
      }`}
    >
      {mode}
    </span>
  );
}

// One card shape shared by upcoming and past events — image on top, an
// accent bar, date/mode, title and body, with either a "Get notified"
// button (upcoming) or a muted "Completed" pill (past) at the bottom.
function EventCard({
  title,
  date,
  mode,
  body,
  accent,
  caption,
  completed = false,
}: {
  title: string;
  date: string;
  mode: Mode;
  body?: string;
  accent: Accent;
  caption: string;
  completed?: boolean;
}) {
  const a = accentStyles[accent];
  return (
    <div
      className={`rounded-[10px] overflow-hidden bg-white border border-line flex flex-col transition-transform ${
        completed ? 'opacity-70' : 'hover:-translate-y-0.5'
      }`}
    >
      <div className={`h-1.5 ${completed ? 'bg-taupe/40' : a.bar}`} />
      <ImagePlaceholder caption={caption} className="aspect-[16/10]" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="font-mono text-[10px] text-taupe">{date}</div>
          <ModeTag mode={mode} />
        </div>
        <h3 className="font-sans font-bold text-[13.5px] mb-1.5">{title}</h3>
        {body && <p className="text-[12px] text-umber-soft m-0 leading-[1.55] mb-4 flex-1">{body}</p>}
        <div className="mt-auto pt-1">
          {completed ? (
            <span className="font-mono text-[9.5px] uppercase px-2.5 py-1.5 rounded bg-taupe/15 text-taupe">
              Completed
            </span>
          ) : (
            <Link to="/contact">
              <Button variant="primary" className="w-full sm:w-auto">
                Get notified
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [showPast, setShowPast] = useState(false);

  return (
    <div>
      {/* Hero — intro text with a community photo alongside it, same
          two-column treatment as the About page's "our story" section */}
      <div className="px-6 sm:px-9 lg:px-16 pt-12 pb-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">community</div>
            <h1 className="font-display font-bold text-[32px] leading-[1.15] mb-4">
              Where the Tolea community shows up
            </h1>
            <p className="text-[13.5px] text-[#4a4038] leading-[1.65]">
              From orientation sessions to monthly meetups, this is where volunteers and hosts
              connect beyond a single placement.
            </p>
          </div>
          <ImagePlaceholder caption="photo: community hangout, Nairobi" className="rounded-lg aspect-video" />
        </div>
      </div>

      {/* Upcoming events — square cards with an image, led with what's next */}
      <div className="px-9 pt-8 pb-1">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">upcoming</div>
          <h2 className="font-display font-bold text-xl">What's coming up</h2>
        </div>
      </div>
      <div className="px-9 pt-3.5 pb-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {upcomingEvents.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>

      {/* Past events — hidden behind a toggle, same card system, muted */}
      <div className="px-9 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowPast((v) => !v)}
              className="flex items-center gap-2 font-sans font-semibold text-[12.5px] px-4 py-2.5 rounded-full border border-line bg-white cursor-pointer text-umber hover:bg-taupe/5 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-3.5 h-3.5 transition-transform ${showPast ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6l6-6" />
              </svg>
              {showPast ? 'Hide' : 'Show'} past events ({pastEvents.length})
            </button>
          </div>
          {showPast && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {pastEvents.map((e) => (
                <EventCard key={e.title} {...e} completed />
              ))}
            </div>
          )}
        </div>
      </div>

      <CtaBanner
        eyebrow="don't miss the next one"
        headline="Join the Tolea Community"
        buttonLabel="Find your opportunity"
        to="/volunteer"
        secondaryLinkLabel="Contact us"
        secondaryHref="/contact"
      />
    </div>
  );
}
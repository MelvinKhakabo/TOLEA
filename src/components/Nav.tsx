import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const primaryLinks = [
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'How We Work', to: '/how-we-work' },
];

// "About" is both a link (clicking the label goes to /about) and a dropdown
// trigger for the rest of the secondary pages — same pattern IVHQ uses.
const aboutTrigger = { label: 'About', to: '/about' };
const aboutMenuLinks = [
  { label: 'Donate', to: '/donate' },
  { label: 'Careers', to: '/careers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];
const aboutGroupLabels = [aboutTrigger.label, ...aboutMenuLinks.map((l) => l.label)];

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M6 9l6 6l6-6" />
    </svg>
  );
}

function AboutDropdown({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isGroupActive = active ? aboutGroupLabels.includes(active) : false;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 cursor-pointer ${
          isGroupActive ? 'text-marigold font-semibold' : ''
        }`}
      >
        {aboutTrigger.label}
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-md border border-line bg-white shadow-md py-1.5 z-20 text-left">
          <Link
            to={aboutTrigger.to}
            onClick={() => setOpen(false)}
            className={`block px-3.5 py-2 text-[12px] hover:bg-taupe/10 ${
              active === aboutTrigger.label ? 'text-marigold font-semibold' : 'text-umber'
            }`}
          >
            About Tolea
          </Link>
          <div className="h-px bg-line my-1" />
          {aboutMenuLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-3.5 py-2 text-[12px] hover:bg-taupe/10 ${
                active === l.label ? 'text-marigold font-semibold' : 'text-umber'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav({ active }: { active?: string }) {
  return (
    <div className="flex items-center justify-between px-9 py-5 border-b border-line">
      <Link to="/" className="font-display font-bold text-lg text-umber">
        tolea<span className="text-marigold">.</span>
      </Link>

      <div className="hidden md:flex gap-6 text-[13px] font-medium">
        {primaryLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={l.label === active ? 'text-marigold font-bold' : 'text-umber'}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:block pl-4 border-l border-line text-[11px] text-taupe">
          <AboutDropdown active={active} />
        </div>
        <div className="flex items-center gap-2 pl-4 border-l border-line">
          <Link to="/login" className="flex items-center gap-1.5 font-semibold text-[12.5px] text-indigo">
            <span className="w-[18px] h-[18px] rounded-full bg-indigo-soft inline-flex items-center justify-center font-mono text-[8px] text-indigo">
              i
            </span>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
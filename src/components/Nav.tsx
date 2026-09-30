import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const primaryLinks = [
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'How We Work', to: '/how-we-work' },
];

const aboutTrigger = { label: 'About', to: '/about' };
const aboutMenuLinks = [
  { label: 'Donate', to: '/donate' },
  { label: 'Careers', to: '/careers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];
const aboutGroupLabels = [aboutTrigger.label, ...aboutMenuLinks.map((l) => l.label)];

// Roughly the floating pill's own height — sections are "current" once
// they've scrolled up past this line.
const PROBE_OFFSET = 72;

type NavTheme = 'dark' | 'light';

const THEMES: Record<NavTheme, { pill: string; border: string; text: string; textMuted: string }> = {
  dark: {
    pill: 'rgba(36,26,18,0.55)',
    border: 'rgba(255,255,255,0.14)',
    text: '#FBF6EC',
    textMuted: 'rgba(251,246,236,0.68)',
  },
  light: {
    pill: 'rgba(251,246,236,0.72)',
    border: 'rgba(36,26,18,0.08)',
    text: '#241A12',
    textMuted: '#8C8073',
  },
};

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M6 9l6 6l6-6" />
    </svg>
  );
}

function AboutDropdown({ active, theme }: { active?: string; theme: (typeof THEMES)['dark'] }) {
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
        className="flex items-center gap-1 cursor-pointer transition-colors"
        style={{ color: isGroupActive ? '#E8A331' : theme.text, fontWeight: isGroupActive ? 700 : 500 }}
      >
        {aboutTrigger.label}
        <ChevronDown />
      </button>

      {/* The dropdown panel itself always stays a solid white card, regardless
          of the nav's current theme — same as UKAS's flyout menus. */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-md shadow-lg py-1.5 z-20 text-left bg-white"
          style={{ border: '1px solid #E3DACB' }}
        >
          <Link
            to={aboutTrigger.to}
            onClick={() => setOpen(false)}
            className="block px-3.5 py-2 text-[12px] hover:bg-taupe/10"
            style={{
              color: active === aboutTrigger.label ? '#E8A331' : '#241A12',
              fontWeight: active === aboutTrigger.label ? 700 : 400,
            }}
          >
            About Tolea
          </Link>
          <div className="h-px bg-line my-1" />
          {aboutMenuLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-3.5 py-2 text-[12px] hover:bg-taupe/10"
              style={{ color: active === l.label ? '#E8A331' : '#241A12', fontWeight: active === l.label ? 700 : 400 }}
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
  const location = useLocation();
  const [theme, setTheme] = useState<NavTheme>('light');

  useEffect(() => {
    let sections: HTMLElement[] = [];
    let ticking = false;

    function refreshSections() {
      sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));
    }

    function update() {
      ticking = false;
      if (sections.length === 0) return;
      let current = sections[0];
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= PROBE_OFFSET) {
          current = el;
        } else {
          break;
        }
      }
      const next = (current.dataset.navTheme as NavTheme) || 'light';
      setTheme((prev) => (prev === next ? prev : next));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    // Re-scan on every route change — each page tags its own sections, and
    // the DOM for the new page is already committed by the time this runs.
    refreshSections();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  const t = THEMES[theme];

  return (
    <div className="fixed top-4 left-4 right-4 z-30 flex justify-center pointer-events-none">
      <div
        className="w-full max-w-6xl flex items-center justify-between gap-6 px-5 py-3 rounded-full backdrop-blur-md transition-colors duration-300 pointer-events-auto"
        style={{ background: t.pill, border: `1px solid ${t.border}` }}
      >
        <Link to="/" className="font-display font-bold text-lg shrink-0" style={{ color: t.text }}>
          tolea<span style={{ color: '#E8A331' }}>.</span>
        </Link>

        <div className="hidden md:flex gap-6 text-[13px] font-medium">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ color: l.label === active ? '#E8A331' : t.text, fontWeight: l.label === active ? 700 : 500 }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block pl-4 text-[13px]" style={{ borderLeft: `1px solid ${t.border}`, color: t.textMuted }}>
            <AboutDropdown active={active} theme={t} />
          </div>
          <div className="flex items-center gap-2 pl-4" style={{ borderLeft: `1px solid ${t.border}` }}>
            <Link to="/login" className="flex items-center gap-1.5 font-semibold text-[12.5px]" style={{ color: t.text }}>
              <span
                className="w-[18px] h-[18px] rounded-full inline-flex items-center justify-center font-mono text-[8px]"
                style={{ background: 'rgba(255,255,255,0.22)', color: t.text }}
              >
                i
              </span>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

const primaryLinks = [
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'How We Work', to: '/how-we-work' },
];

const secondaryLinks = [
  { label: 'About', to: '/about' },
  { label: 'Donate', to: '/donate' },
  { label: 'Careers', to: '/careers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];

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
        <div className="hidden lg:flex gap-4 text-[11px] text-taupe pl-4 border-l border-line">
          {secondaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={l.label === active ? 'text-marigold font-semibold' : ''}
            >
              {l.label}
            </Link>
          ))}
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
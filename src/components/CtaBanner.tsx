import { Link } from 'react-router-dom';
import Button from './Button';

export default function CtaBanner({
  eyebrow,
  headline,
  buttonLabel,
  to,
  secondaryButtonLabel,
  secondaryButtonTo,
  secondaryText = 'Need more information?',
  secondaryLinkLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  headline: string;
  buttonLabel: string;
  to: string;
  /** Optional second real BUTTON next to the primary one, e.g. two equal
   *  paths ("Find your opportunity" / "Register your organisation") — pass
   *  both props to show it. Takes priority over the plain-text secondary
   *  link below if both are somehow passed. */
  secondaryButtonLabel?: string;
  secondaryButtonTo?: string;
  /** Optional plain-text line under the primary button instead, e.g.
   *  "Need more information? Make an Enquiry" — same treatment as the
   *  Organizations hero's login/enquiry line. Pass secondaryLinkLabel +
   *  secondaryHref to show it; omit both and nothing changes for pages
   *  that don't pass them. secondaryText overrides the lead-in wording. */
  secondaryText?: string;
  secondaryLinkLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div data-nav-theme="light" className="px-4 pb-4">
      <div className="rounded-[28px] px-9 py-16 text-center" style={{ background: '#C3D82E' }}>
        {eyebrow && (
          <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#1d4433' }}>
            {eyebrow}
          </div>
        )}
        <h2
          className="font-display font-bold text-2xl md:text-3xl max-w-2xl mx-auto mb-7"
          style={{ color: '#1d3323' }}
        >
          {headline}
        </h2>
        <div className="flex flex-col items-center gap-2.5">
          {secondaryButtonLabel && secondaryButtonTo ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to={to}>
                <Button variant="primary">{buttonLabel}</Button>
              </Link>
              <Link to={secondaryButtonTo}>
                <button
                  className="font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md cursor-pointer bg-white"
                  style={{ color: '#241A12', border: '1px solid rgba(36,26,18,0.15)' }}
                >
                  {secondaryButtonLabel}
                </button>
              </Link>
            </div>
          ) : (
            <Link to={to}>
              <Button variant="primary">{buttonLabel}</Button>
            </Link>
          )}
          {!secondaryButtonLabel && secondaryLinkLabel && secondaryHref && (
            <div className="text-[11.5px]" style={{ color: 'rgba(29,68,51,0.75)' }}>
              {secondaryText}{' '}
              {secondaryHref.startsWith('mailto:') || secondaryHref.startsWith('http') ? (
                <a href={secondaryHref} className="underline cursor-pointer" style={{ color: '#1d3323' }}>
                  {secondaryLinkLabel}
                </a>
              ) : (
                <Link to={secondaryHref} className="underline cursor-pointer" style={{ color: '#1d3323' }}>
                  {secondaryLinkLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
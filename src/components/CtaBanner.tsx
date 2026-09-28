import { Link } from 'react-router-dom';
import Button from './Button';

export default function CtaBanner({
  eyebrow,
  headline,
  buttonLabel,
  to,
  secondaryText = 'Need more information?',
  secondaryLinkLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  headline: string;
  buttonLabel: string;
  to: string;
  /** Optional plain-text line under the primary button, e.g.
   *  "Need more information? Make an Enquiry" — same treatment as the
   *  Organizations hero's login/enquiry line. Pass secondaryLinkLabel +
   *  secondaryHref to show it; omit both and nothing changes for pages
   *  that don't pass them. secondaryText overrides the lead-in wording. */
  secondaryText?: string;
  secondaryLinkLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="px-9 py-16 text-center" style={{ background: '#F1EAD9' }}>
      {eyebrow && (
        <div className="font-mono text-[10.5px] mb-3 lowercase" style={{ color: '#2B6E4F' }}>
          {eyebrow}
        </div>
      )}
      <h2
        className="font-display font-bold text-2xl md:text-3xl max-w-2xl mx-auto mb-7"
        style={{ color: '#241A12' }}
      >
        {headline}
      </h2>
      <div className="flex flex-col items-center gap-2.5">
        <Link to={to}>
          <Button variant="primary">{buttonLabel}</Button>
        </Link>
        {secondaryLinkLabel && secondaryHref && (
          <div className="text-[11.5px]" style={{ color: 'rgba(36,26,18,0.65)' }}>
            {secondaryText}{' '}
            <a href={secondaryHref} className="underline cursor-pointer" style={{ color: '#241A12' }}>
              {secondaryLinkLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import Button from './Button';

export default function CtaBanner({
  eyebrow,
  headline,
  buttonLabel,
  to,
}: {
  eyebrow?: string;
  headline: string;
  buttonLabel: string;
  to: string;
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
      <Link to={to}>
        <Button variant="primary">{buttonLabel}</Button>
      </Link>
    </div>
  );
}
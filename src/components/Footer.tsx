import { FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="px-9 py-10" style={{ background: '#241A12', color: '#FBF6EC' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-5xl mx-auto">
        <div>
          <div className="font-display font-bold text-lg mb-1.5">
            tolea<span style={{ color: '#E8A331' }}>.</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(251,246,236,0.7)' }}>
            Verified opportunities. Real skills. Real accountability.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:tolea.community@gmail.com"
            className="flex items-center gap-2.5 text-xs"
            style={{ color: 'rgba(251,246,236,0.7)' }}
          >
            <FiMail className="w-4 h-4" style={{ color: '#E8A331' }} />
            Email us
          </a>
          <div className="flex items-center gap-2.5 text-xs" style={{ color: 'rgba(251,246,236,0.7)' }}>
            <FiMapPin className="w-4 h-4" style={{ color: '#E8A331' }} />
            Nairobi, Kenya
          </div>
        </div>
      </div>
      <div className="text-center text-[10.5px] font-mono mt-8" style={{ color: 'rgba(251,246,236,0.45)' }}>
        © {new Date().getFullYear()} Tolea. All rights reserved.
      </div>
    </footer>
  );
}
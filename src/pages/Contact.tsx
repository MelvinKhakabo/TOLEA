import { useState, type FormEvent, type ReactNode } from 'react';

const CONTACT_EMAIL = 'tolea.community@gmail.com';

// Same saturated palette used across Volunteer/HowWeWork/Organizations/About —
// one accent style map so the contact points and form card read as part of
// the same vibrant system.
type Accent = 'forest' | 'indigo' | 'marigold' | 'lime';

const accentStyles: Record<Accent, { tile: string; fg: string; border: string }> = {
  forest: { tile: 'bg-forest', fg: 'text-white', border: 'border-forest' },
  indigo: { tile: 'bg-indigo', fg: 'text-white', border: 'border-indigo' },
  marigold: { tile: 'bg-marigold', fg: 'text-umber', border: 'border-marigold' },
  lime: { tile: 'bg-lime', fg: 'text-umber', border: 'border-lime' },
};

// Same dark-green treatment used on Home/About/Donate — here it is the
// backdrop the ivory contact card floats on.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)'

const topics = [
  'General question',
  'I want to volunteer',
  'I want to host volunteers',
  'Press / media',
  'Something else',
];

interface ContactForm {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const emptyForm: ContactForm = { name: '', email: '', topic: '', message: '' };

const inputClass =
  'w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] text-umber placeholder:text-taupe focus:outline-none focus:border-indigo transition-colors';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium text-umber mb-1.5">
        {label}
        {required && <span className="text-marigold ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

const contactPoints: {
  label: string;
  value: string;
  href?: string;
  accent: Accent;
  icon: ReactNode;
}[] = [
  {
    label: 'Email',
    value: 'Email us',
    href: `mailto:${CONTACT_EMAIL}`,
    accent: 'forest',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6l9-6" />
      </svg>
    ),
  },
  {
    label: 'Based in',
    value: 'Nairobi, Kenya',
    accent: 'indigo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: replace with a real submit once the backend exists, e.g.
    // await supabase.from('contact_messages').insert(form)
    console.log('contact form submitted', form);
    setSubmitted(true);
  }

  return (
    <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
      {/* Green floating panel — the ivory card below pops out of it */}
      <div
        className="relative overflow-hidden rounded-[28px] px-4 sm:px-9 lg:px-16 pt-24 pb-16 md:pt-28 md:pb-20"
        style={{ background: DARK_GRADIENT }}
      >
        <div className="relative z-10 max-w-5xl mx-auto rounded-[22px] bg-ivory shadow-2xl ring-1 ring-white/10 p-6 sm:p-10 md:p-12 grid md:grid-cols-[1fr_1.3fr] gap-12">
          {/* Left: intro + direct contact points */}
          <div>
            <div className="font-mono text-[10.5px] text-forest mb-3 lowercase">get in touch</div>
            <h1 className="font-display font-bold text-2xl leading-[1.2] mb-4">
              Questions, ideas, or just want to say hi?
            </h1>
            <p className="text-[13px] text-umber-soft leading-[1.65] mb-8 max-w-sm">
              Whether you're thinking about volunteering, considering hosting, or just curious
              about what we're building — reach out directly or use the form.
            </p>
            <div className="space-y-4">
              {contactPoints.map((c) => {
                const a = accentStyles[c.accent];
                return (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.tile} ${a.fg}`}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[9.5px] text-taupe uppercase">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-[13px] text-umber underline cursor-pointer">
                          {c.value}
                        </a>
                      ) : (
                        <div className="text-[13px] text-umber">{c.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: form — solid saturated panel when submitted, a bordered
              card the rest of the time, matching the treatment elsewhere */}
          <div>
            {submitted ? (
              <div className="rounded-[10px] p-8 text-center bg-forest">
                <div className="w-11 h-11 rounded-full bg-white text-forest flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  ✓
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-white">Message sent</h3>
                <p className="text-[13px] text-white/80 leading-[1.6]">
                  Thanks for reaching out — we'll get back to you as soon as we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 border-2 border-indigo rounded-[10px] p-6 bg-indigo-soft/40">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your name" required>
                    <input
                      required
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Wanjiru"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane@email.com"
                    />
                  </Field>
                </div>
                <Field label="What's this about?" required>
                  <select
                    required
                    className={inputClass}
                    value={form.topic}
                    onChange={(e) => update('topic', e.target.value)}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" required>
                  <textarea
                    required
                    rows={5}
                    className={inputClass}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell us a bit about what you need."
                  />
                </Field>
                <button
                  type="submit"
                  className="font-sans font-semibold text-[13.5px] px-5 py-3 rounded-md cursor-pointer bg-marigold text-umber w-full sm:w-auto"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
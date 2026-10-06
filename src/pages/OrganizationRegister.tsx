import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Honeypot from '../components/Honeypot';
import { submitOrganizationInquiry, submitOrganizationLead } from '../lib/api/leads';

/**
 * Two entry points into one page:
 *  - "register" — the detailed intake form. Organisations don't get a self-serve
 *    account; this is a lead form we review and follow up on directly.
 *  - "inquire" — a short contact form for anyone who'd rather just reach us
 *    directly instead of filling in the full registration details.
 *
 * Both submit to Supabase through src/lib/api/leads.ts (tables
 * `organization_leads` / `organization_inquiries`, insert-only for the public).
 */

type Mode = 'register' | 'inquire';

const registrationStatusOptions = [
  'Registered charity / NGO (PBO)',
  'Registered community-based organisation (CBO)',
  'Registered company',
  'Not yet registered',
  'Other',
];

interface RegisterForm {
  orgName: string;
  registrationStatus: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  openRoles: string;
  positions: string;
  skillsRequired: string;
  otherInfo: string;
}

const emptyRegisterForm: RegisterForm = {
  orgName: '',
  registrationStatus: '',
  orgEmail: '',
  orgPhone: '',
  contactName: '',
  contactRole: '',
  contactPhone: '',
  contactEmail: '',
  openRoles: '',
  positions: '',
  skillsRequired: '',
  otherInfo: '',
};

interface InquiryForm {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
}

const emptyInquiryForm: InquiryForm = {
  orgName: '',
  contactName: '',
  email: '',
  phone: '',
  message: '',
};

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

const inputClass =
  'w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] text-umber placeholder:text-taupe focus:outline-none focus:border-indigo transition-colors';

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-md border border-line bg-white p-1 mb-8">
      {(
        [
          ['register', 'Register your organisation'],
          ['inquire', 'Make an inquiry'],
        ] as [Mode, string][]
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className="px-4 py-2 rounded text-[12.5px] font-medium transition-colors"
          style={
            mode === value
              ? { background: '#233A5E', color: '#fff' }
              : { background: 'transparent', color: '#8C8073' }
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SuccessNote({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded-[10px] p-8 text-center bg-indigo-soft max-w-xl mx-auto">
      <div className="w-11 h-11 rounded-full bg-indigo text-white flex items-center justify-center mx-auto mb-4 font-display font-bold">
        ✓
      </div>
      <h3 className="font-display font-bold text-lg mb-2">{heading}</h3>
      <p className="text-[13px] text-umber-soft leading-[1.6] mb-5">{body}</p>
      <Link to="/organizations" className="text-indigo text-[12.5px] font-medium cursor-pointer">
        ← Back to Organisations
      </Link>
    </div>
  );
}

export default function OrganizationRegister() {
  const [mode, setMode] = useState<Mode>('register');

  const [registerForm, setRegisterForm] = useState<RegisterForm>(emptyRegisterForm);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);

  const [inquiryForm, setInquiryForm] = useState<InquiryForm>(emptyInquiryForm);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hp, setHp] = useState('');

  function updateRegister<K extends keyof RegisterForm>(key: K, value: RegisterForm[K]) {
    setRegisterForm((f) => ({ ...f, [key]: value }));
  }

  function updateInquiry<K extends keyof InquiryForm>(key: K, value: InquiryForm[K]) {
    setInquiryForm((f) => ({ ...f, [key]: value }));
  }

  async function send(action: () => Promise<void>, onDone: () => void) {
    if (hp) {
      // Honeypot tripped — a bot. Pretend it worked, send nothing.
      onDone();
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await action();
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    void send(() => submitOrganizationLead(registerForm), () => setRegisterSubmitted(true));
  }

  function handleInquirySubmit(e: FormEvent) {
    e.preventDefault();
    void send(() => submitOrganizationInquiry(inquiryForm), () => setInquirySubmitted(true));
  }

  return (
    <div className="px-6 sm:px-9 lg:px-16 pt-32 pb-14">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="font-mono text-[10.5px] text-indigo mb-3 lowercase">for organisations</div>
        <h1 className="font-display font-bold text-2xl mb-3">
          Tell us about your organisation
        </h1>
        <p className="text-[13px] text-umber-soft leading-[1.6] max-w-lg mx-auto">
          Organisations don't self-serve sign up — every listing is reviewed and set up by our
          team directly. Fill in the details below and we'll be in touch, or use the quick
          inquiry form if you'd rather just reach us first.
        </p>
      </div>

      <div className="flex justify-center">
        <ModeToggle
          mode={mode}
          onChange={(m) => {
            setMode(m);
            setRegisterSubmitted(false);
            setInquirySubmitted(false);
            setError('');
          }}
        />
      </div>

      {mode === 'register' &&
        (registerSubmitted ? (
          <SuccessNote
            heading="Registration received"
            body="Thanks — our team will review your organisation's details and reach out within a few business days to get you set up."
          />
        ) : (
          <form onSubmit={handleRegisterSubmit} className="relative max-w-2xl mx-auto space-y-8">
            <Honeypot value={hp} onChange={setHp} />
            <div className="space-y-4">
              <h2 className="font-display font-bold text-sm text-indigo">Organisation details</h2>
              <Field label="Organisation name" required>
                <input
                  required
                  className={inputClass}
                  value={registerForm.orgName}
                  onChange={(e) => updateRegister('orgName', e.target.value)}
                  placeholder="e.g. Kibera Youth Tech Hub"
                />
              </Field>
              <Field label="Registration status" required>
                <select
                  required
                  className={inputClass}
                  value={registerForm.registrationStatus}
                  onChange={(e) => updateRegister('registrationStatus', e.target.value)}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {registrationStatusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Organisation email" required>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={registerForm.orgEmail}
                    onChange={(e) => updateRegister('orgEmail', e.target.value)}
                    placeholder="info@organisation.org"
                  />
                </Field>
                <Field label="Organisation phone" required>
                  <input
                    required
                    type="tel"
                    className={inputClass}
                    value={registerForm.orgPhone}
                    onChange={(e) => updateRegister('orgPhone', e.target.value)}
                    placeholder="+254 7xx xxx xxx"
                  />
                </Field>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-line">
              <h2 className="font-display font-bold text-sm text-indigo pt-4">Contact person</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" required>
                  <input
                    required
                    className={inputClass}
                    value={registerForm.contactName}
                    onChange={(e) => updateRegister('contactName', e.target.value)}
                    placeholder="Jane Wanjiru"
                  />
                </Field>
                <Field label="Role / title" required>
                  <input
                    required
                    className={inputClass}
                    value={registerForm.contactRole}
                    onChange={(e) => updateRegister('contactRole', e.target.value)}
                    placeholder="Programs Manager"
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Direct phone" required>
                  <input
                    required
                    type="tel"
                    className={inputClass}
                    value={registerForm.contactPhone}
                    onChange={(e) => updateRegister('contactPhone', e.target.value)}
                    placeholder="+254 7xx xxx xxx"
                  />
                </Field>
                <Field label="Direct email" required>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={registerForm.contactEmail}
                    onChange={(e) => updateRegister('contactEmail', e.target.value)}
                    placeholder="jane@organisation.org"
                  />
                </Field>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-line">
              <h2 className="font-display font-bold text-sm text-indigo pt-4">
                Volunteering needs
              </h2>
              <Field label="Number of open roles" required>
                <input
                  required
                  type="number"
                  min={1}
                  className={inputClass}
                  value={registerForm.openRoles}
                  onChange={(e) => updateRegister('openRoles', e.target.value)}
                  placeholder="e.g. 3"
                />
              </Field>
              <Field label="Volunteer position(s) / roles needed" required>
                <textarea
                  required
                  rows={3}
                  className={inputClass}
                  value={registerForm.positions}
                  onChange={(e) => updateRegister('positions', e.target.value)}
                  placeholder="e.g. Social Media Assistant, Data Entry Volunteer, Community Outreach Coordinator"
                />
              </Field>
              <Field label="Skills required" required>
                <textarea
                  required
                  rows={3}
                  className={inputClass}
                  value={registerForm.skillsRequired}
                  onChange={(e) => updateRegister('skillsRequired', e.target.value)}
                  placeholder="e.g. Basic graphic design, spoken Swahili and English, comfortable with spreadsheets"
                />
              </Field>
              <Field label="Anything else we should know">
                <textarea
                  rows={3}
                  className={inputClass}
                  value={registerForm.otherInfo}
                  onChange={(e) => updateRegister('otherInfo', e.target.value)}
                  placeholder="Working hours, location, accommodation provided, timeline, etc."
                />
              </Field>
            </div>

            {error && (
              <p role="alert" className="text-[12.5px] text-umber bg-marigold-soft border border-marigold rounded-md px-3.5 py-2.5">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" disabled={submitting} className="w-full sm:w-auto disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Submit registration'}
            </Button>
          </form>
        ))}

      {mode === 'inquire' &&
        (inquirySubmitted ? (
          <SuccessNote
            heading="Message sent"
            body="Thanks for reaching out — someone from our team will get back to you shortly."
          />
        ) : (
          <form onSubmit={handleInquirySubmit} className="relative max-w-xl mx-auto space-y-4">
            <Honeypot value={hp} onChange={setHp} />
            <Field label="Organisation name" required>
              <input
                required
                className={inputClass}
                value={inquiryForm.orgName}
                onChange={(e) => updateInquiry('orgName', e.target.value)}
                placeholder="e.g. Kibera Youth Tech Hub"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" required>
                <input
                  required
                  className={inputClass}
                  value={inquiryForm.contactName}
                  onChange={(e) => updateInquiry('contactName', e.target.value)}
                  placeholder="Jane Wanjiru"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  className={inputClass}
                  value={inquiryForm.phone}
                  onChange={(e) => updateInquiry('phone', e.target.value)}
                  placeholder="+254 7xx xxx xxx"
                />
              </Field>
            </div>
            <Field label="Email" required>
              <input
                required
                type="email"
                className={inputClass}
                value={inquiryForm.email}
                onChange={(e) => updateInquiry('email', e.target.value)}
                placeholder="jane@organisation.org"
              />
            </Field>
            <Field label="Message" required>
              <textarea
                required
                rows={4}
                className={inputClass}
                value={inquiryForm.message}
                onChange={(e) => updateInquiry('message', e.target.value)}
                placeholder="Tell us a bit about your organisation and what you're looking for."
              />
            </Field>
            {error && (
              <p role="alert" className="text-[12.5px] text-umber bg-marigold-soft border border-marigold rounded-md px-3.5 py-2.5">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" disabled={submitting} className="w-full sm:w-auto disabled:opacity-60">
              {submitting ? 'Sending…' : 'Send inquiry'}
            </Button>
          </form>
        ))}
    </div>
  );
}
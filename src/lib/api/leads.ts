import { supabase, supabaseConfigured } from '../supabaseClient'

// The three public form tables are INSERT-only for the anon key (see
// supabase/schema.sql). Never chain `.select()` onto these inserts — the anon
// role is not allowed to read rows back, so it would fail.

export class SubmitError extends Error {}

const clean = (v: string) => {
  const t = v.trim()
  return t === '' ? null : t
}

async function insert(table: string, row: Record<string, unknown>) {
  if (!supabaseConfigured) {
    throw new SubmitError('This form is not connected yet. Please email us directly.')
  }
  const { error } = await supabase.from(table).insert(row)
  if (error) {
    console.error(`insert into ${table} failed:`, error)
    throw new SubmitError('Something went wrong sending your message. Please try again, or email us directly.')
  }
}

export interface ContactInput {
  name: string
  email: string
  topic: string
  message: string
}

export function submitContactMessage(f: ContactInput) {
  return insert('contact_messages', {
    name: f.name.trim(),
    email: f.email.trim(),
    topic: f.topic,
    message: f.message.trim(),
  })
}

export interface OrganizationLeadInput {
  orgName: string
  registrationStatus: string
  orgEmail: string
  orgPhone: string
  contactName: string
  contactRole: string
  contactPhone: string
  contactEmail: string
  openRoles: string
  positions: string
  skillsRequired: string
  otherInfo: string
}

export function submitOrganizationLead(f: OrganizationLeadInput) {
  return insert('organization_leads', {
    org_name: f.orgName.trim(),
    registration_status: f.registrationStatus,
    org_email: f.orgEmail.trim(),
    org_phone: clean(f.orgPhone),
    contact_name: f.contactName.trim(),
    contact_role: clean(f.contactRole),
    contact_phone: clean(f.contactPhone),
    contact_email: f.contactEmail.trim(),
    open_roles: clean(f.openRoles),
    positions: clean(f.positions),
    skills_required: clean(f.skillsRequired),
    other_info: clean(f.otherInfo),
  })
}

export interface OrganizationInquiryInput {
  orgName: string
  contactName: string
  email: string
  phone: string
  message: string
}

export function submitOrganizationInquiry(f: OrganizationInquiryInput) {
  return insert('organization_inquiries', {
    org_name: clean(f.orgName),
    contact_name: f.contactName.trim(),
    contact_email: f.email.trim(),
    contact_phone: clean(f.phone),
    message: clean(f.message),
  })
}
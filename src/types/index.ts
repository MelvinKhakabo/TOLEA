export type UserRole = 'volunteer' | 'host_org' | 'admin'
export type PboStatus = 'pending' | 'verified' | 'rejected'
export type OpportunityStatus = 'draft' | 'open' | 'closed'
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'completed'
export type EventMode = 'online' | 'in_person'
export type PaymentStatus = 'not_applicable' | 'unpaid' | 'pending' | 'paid'

export interface Volunteer {
  id: string
  full_name: string
  email: string
  phone?: string
  bio?: string
  skills: string[]
  nationality?: string
  is_foreign: boolean
  payment_status: PaymentStatus
  created_at: string
}

export interface HostOrganization {
  id: string
  org_name: string
  registration_number?: string
  pbo_status: PboStatus
  sector?: string
  website?: string
  payment_status: PaymentStatus
  created_at: string
}

export interface Sdg {
  id: number
  number: number
  name: string
  color: string
}

export interface Opportunity {
  id: string
  org_id: string
  title: string
  description?: string
  category: string
  location?: string
  is_remote: boolean
  status: OpportunityStatus
  created_at: string
}

export interface ToleaEvent {
  id: string
  title: string
  description?: string
  mode: EventMode
  location?: string
  starts_at: string
  ends_at?: string
  cover_image_url?: string
}
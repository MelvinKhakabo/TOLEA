import type { Sdg } from '../types'

export interface SdgWithDetail extends Sdg {
  shortName: string
  detail: string
}

export const SDGS: SdgWithDetail[] = [
  {
    id: 1, number: 1, name: 'No Poverty', shortName: 'No Poverty', color: '#E5243B',
    detail: 'Pathways into paid work reduce economic precarity for underemployed youth.',
  },
  {
    id: 4, number: 4, name: 'Quality Education', shortName: 'Quality Education', color: '#C5192D',
    detail: 'Skills-building placements extend learning beyond the classroom.',
  },
  {
    id: 8, number: 8, name: 'Decent Work and Economic Growth', shortName: 'Decent Work & Growth', color: '#A21942',
    detail: 'Fair-work standards and structured placements build real employability.',
  },
  {
    id: 10, number: 10, name: 'Reduced Inequalities', shortName: 'Reduced Inequalities', color: '#DD1367',
    detail: 'Free access for local volunteers, subsidised by international placement fees.',
  },
  {
    id: 17, number: 17, name: 'Partnerships for the Goals', shortName: 'Partnerships', color: '#19486A',
    detail: 'Connecting individuals, host organisations, and communities toward shared goals.',
  },
]
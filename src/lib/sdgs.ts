export interface Sdg {
  number: number;
  name: string;
  color: string;
  blurb?: string;
}

export const SDGS: Sdg[] = [
  { number: 1, name: 'No Poverty', color: '#E5243B', blurb: "Pathways into paid work reduce economic precarity for underemployed youth." },
  { number: 4, name: 'Quality Education', color: '#C5192D', blurb: 'Skills-building placements extend learning beyond the classroom.' },
  { number: 8, name: 'Decent Work & Growth', color: '#A21942', blurb: 'Fair-work standards and structured placements build real employability.' },
  { number: 10, name: 'Reduced Inequalities', color: '#DD1367', blurb: 'Free access for local volunteers, subsidised by international placement fees.' },
  { number: 17, name: 'Partnerships', color: '#19486A', blurb: 'Connecting individuals, host organisations, and communities toward shared goals.' },
];

import { PortfolioItem, ServiceItem } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Advanced Robotic Surgery',
    category: 'Surgical Procedures',
    description: 'Specialized minimally invasive robotic-assisted procedures for cardiac health.',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Global Health Summit 2023',
    category: 'Conferences',
    description: 'Keynote presentation on the future of predictive cardiology.',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'Heart Research Publication',
    category: 'Academic',
    description: 'Lead author on "Next-Gen Valve Restoration" in the New England Journal of Medicine.',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    title: 'Medical Mission - Southeast Asia',
    category: 'Philanthropy',
    description: 'Voluntary mission providing critical care to underserved rural communities.',
    imageUrl: 'https://picsum.photos/800/600?random=4'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    icon: 'fa-heart-pulse',
    title: 'Cardiology Specialist',
    description: 'Comprehensive heart health assessments using state-of-the-art diagnostic technology.'
  },
  {
    icon: 'fa-user-doctor',
    title: 'Personalized Care',
    description: 'Bespoke treatment plans tailored to individual lifestyle and genetic factors.'
  },
  {
    icon: 'fa-microscope',
    title: 'Clinical Research',
    description: 'Leading pioneering studies in cardiovascular genetics and preventive medicine.'
  }
];

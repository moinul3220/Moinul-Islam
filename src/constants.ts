import { Skill, Education, PortfolioItem } from './types';

export const SKILLS: Skill[] = [
  { name: 'Adobe Premiere Pro', category: 'Video Editing', level: 85 },
  { name: 'After Effects', category: 'Video Editing', level: 70 },
  { name: 'Photoshop', category: 'Graphic Design', level: 90 },
  { name: 'Illustrator', category: 'Graphic Design', level: 80 },
  { name: 'CapCut', category: 'Video Editing', level: 90 },
  { name: 'Color Grading', category: 'Video Editing', level: 75 },
  { name: 'Social Media Post Design', category: 'Graphic Design', level: 85 },
  { name: 'Logo Design', category: 'Graphic Design', level: 75 },
  { name: 'Typography', category: 'Graphic Design', level: 80 },
  { name: 'UI/UX Principles', category: 'Graphic Design', level: 65 },
];

export const EDUCATION: Education[] = [
  {
    institution: 'As-Sunnah Skill Development Institute',
    degree: 'Professional Course in Video Editing & Graphic Design',
    duration: '2023 - Present',
    description: 'Focused on industry-standard tools and creative principles.',
  },
  {
    institution: 'Local Education Board',
    degree: 'Secondary School Certificate (SSC)',
    duration: '2019 - 2021',
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Modern Event Highlight',
    category: 'Video',
    description: 'A dynamic highlight video for a local community event.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Brand Identity Concept',
    category: 'Design',
    description: 'Logo and social media kit for a start-up business.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Typography Exploration',
    category: 'Practice',
    description: 'Experimental typography poster design.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
  },
];

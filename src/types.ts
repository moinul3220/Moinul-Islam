export interface Skill {
  name: string;
  category: 'Video Editing' | 'Graphic Design' | 'Tools' | 'Soft Skills';
  level: number; // 0-100
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Video' | 'Design' | 'Practice';
  imageUrl: string;
  description: string;
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

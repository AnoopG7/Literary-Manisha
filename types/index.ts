// ===== Work Types =====
export type WorkCategory = 'poem' | 'story' | 'essay' | 'other';
export type Language = 'hindi' | 'english' | 'bilingual';
export type WorkStatus = 'draft' | 'published';

export interface Work {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: WorkCategory;
  tags: string[];
  language: Language;
  status: WorkStatus;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

// ===== Book Types =====
export interface Book {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  genre: string;
  publicationYear: number;
  language: Language;
  featured: boolean;
  createdAt: string;
}

// ===== Award Types =====
export interface Award {
  _id: string;
  title: string;
  issuingBody: string;
  year: number;
  description: string;
  image?: string;
  createdAt: string;
}

// ===== Navigation =====
export interface NavItem {
  label: string;
  href: string;
}

// ===== Site Config =====
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  tagline: string;
  url: string;
  author: {
    name: string;
    bio: string;
    image: string;
    email: string;
    social: {
      instagram?: string;
      youtube?: string;
      facebook?: string;
      linkedin?: string;
    };
  };
}

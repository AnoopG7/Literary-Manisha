import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Manisha',
  title: 'Manisha — Poet, Storyteller, Author',
  description:
    'Explore the literary world of Manisha — poetry, stories, and published books in Hindi and English. A journey through words that touch the soul.',
  tagline: 'Poet. Storyteller. Author.',
  url: 'https://sabdasparsh.vercel.app',
  author: {
    name: 'Manisha',
    bio: 'A passionate writer weaving words in Hindi and English, exploring the depths of human emotions through poetry, stories, and prose.',
    image: 'https://pdvr1jvuireizurd.public.blob.vercel-storage.com/uploads/author_image',
    email: 'manishachavda614@gmail.com',
    social: {
      instagram: 'https://www.instagram.com/_manisha__24?',
      youtube: 'https://www.youtube.com/@Sabdasparsh',
      facebook: 'https://www.facebook.com/share/171fKApe3N/',
      linkedin: 'https://www.linkedin.com/in/manisha-chavda-55774535b/',
    },
  },
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'Books', href: '/books' },
  { label: 'Awards', href: '/awards' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'poem', label: 'Poetry' },
  { value: 'story', label: 'Stories' },
  { value: 'essay', label: 'Essays' },
] as const;

export const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी' },
  { value: 'bilingual', label: 'Bilingual' },
] as const;

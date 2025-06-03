import type { SiteConfig, AnimationConfig, NavigationItem } from '../types';

// Central configuration for the entire application
export const SITE_CONFIG: SiteConfig = {
  name: 'Hector Norza',
  title: 'Product Manager & Community Builder',
  description: 'Product Manager & Community Builder specializing in Azure AI, Developer Experience, and Responsible AI',
  url: 'https://hectornorza.com',
  email: 'hnorza@proton.me',
  phone: '+1 (555) 123-4567',
  location: 'Redmond, WA',
  tagline: 'Passionate about building tools that bring people together through responsible AI and community-driven development.',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/norza/',
  twitter: 'https://x.com/hectorOnCloud',
  substack: 'https://hectornorza.substack.com',
  medium: 'https://medium.com/@hectornorza',
} as const;

export const NAVIGATION: readonly NavigationItem[] = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Resume', href: '#resume', id: 'resume' },
  { name: 'Contact', href: '#contact', id: 'contact' },
  { name: 'Blog', href: '#blog', id: 'blog' },
] as const;

export const ANIMATION_CONFIGS: AnimationConfig = {
  pageTransition: { duration: 0.3 },
  sectionFadeIn: { duration: 0.7 },
  cardHover: { scale: 1.02, duration: 0.2 },
  buttonHover: { scale: 1.02, y: -2 },
  buttonTap: { scale: 0.98 },
} as const;

export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f0f9ff',
    500: '#06b6d4',
    600: '#0891b2',
  }
} as const;

// Blog configuration
export const BLOG_CONFIG = {
  postsPerPage: 6,
  excerptLength: 150,
  dateFormat: 'MMMM d, yyyy',
} as const;

// Performance settings
export const PERFORMANCE_CONFIG = {
  lazyLoadOffset: '100px',
  debounceDelay: 300,
  animationReducedMotion: 0.01,
} as const;
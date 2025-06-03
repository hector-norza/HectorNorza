// Enhanced blog types with better structure
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  published: boolean;
  featured?: boolean;
  author?: string;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  slug: string;
  color?: string;
}

// Enhanced theme configuration
export interface ThemeConfig {
  isDarkMode: boolean;
  isHighContrast: boolean;
  toggleDarkMode: () => void;
  toggleHighContrast?: () => void;
  systemPreference?: 'light' | 'dark';
}

// Error handling types
export interface AppError {
  code: string;
  message: string;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

// Enhanced navigation with analytics
export interface NavigationItem {
  name: string;
  href: string;
  id: string;
  external?: boolean;
  trackingCategory?: string;
}

// Site configuration type
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  tagline: string;
}

// Animation configuration type
export interface AnimationConfig {
  pageTransition: { duration: number };
  sectionFadeIn: { duration: number };
  cardHover: { scale: number; duration: number };
  buttonHover: { scale: number; y: number };
  buttonTap: { scale: number };
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}
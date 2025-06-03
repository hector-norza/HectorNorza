# Build a Modern Portfolio Website from Scratch

## 🎯 Overview

This comprehensive guide will teach you how to build a modern, performant portfolio website similar to this one. You'll learn to create a React-based portfolio with TypeScript, Tailwind CSS, blog functionality, and advanced optimizations.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend Framework**: React 19 with Vite
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Routing**: Hash-based routing (SPA)
- **Icons**: Heroicons
- **Blog Engine**: Custom Markdown parser
- **Analytics**: Google Analytics 4
- **Performance**: Code splitting, lazy loading
- **Deployment**: GitHub Pages/Vercel

### Key Features
- 🎨 Dark/Light theme with system preference detection
- 📱 Fully responsive design
- ⚡ Optimized performance with lazy loading
- 📝 Blog system with Markdown support
- 🔍 SEO optimized
- 📊 Analytics integration
- ♿ Accessibility compliant
- 🚀 Modern build pipeline

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Basic knowledge of React and TypeScript
- Understanding of CSS/Tailwind
- Text editor (VS Code recommended)
- Git for version control

## 🚀 Step-by-Step Build Guide

### Phase 1: Project Setup (30 minutes)

#### 1.1 Initialize Project

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install

# Install additional dependencies
npm install framer-motion react-router-dom @heroicons/react marked react-markdown react-syntax-highlighter gtag
npm install -D tailwindcss postcss autoprefixer @types/node prettier eslint-plugin-react-hooks
```

#### 1.2 Configure Tailwind CSS

```bash
# Initialize Tailwind
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
          'primary-dark': '#f9fafb',
          'secondary-dark': '#d1d5db',
        },
        background: {
          light: '#ffffff',
          dark: '#111827',
        }
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
      }
    },
  },
  plugins: [],
}
```

#### 1.3 Configure Vite

Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
  },
});
```

### Phase 2: Core Structure (45 minutes)

#### 2.1 Create Folder Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── blog/           # Blog-specific components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── content/            # Static content
│   └── blog/           # Blog posts
└── assets/             # Static assets
```

#### 2.2 Set up Theme Context

Create `src/contexts/ThemeContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### 2.3 Create Base Styles

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark transition-colors duration-300;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200;
  }
}
```

### Phase 3: Core Components (60 minutes)

#### 3.1 Create Navigation Component

Create `src/components/Navbar.tsx`:
```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Resume', href: '#resume' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary-500">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-500"
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
```

#### 3.2 Create Hero Section

Create `src/components/Hero.tsx`:
```typescript
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="text-gray-900 dark:text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Name
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Full Stack Developer & UI/UX Enthusiast creating beautiful digital experiences
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce text-gray-400 hover:text-primary-500 transition-colors"
            >
              <ChevronDownIcon className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Phase 4: Blog System (90 minutes)

#### 4.1 Create Markdown Parser

Create `src/utils/markdown-blog.ts`:
```typescript
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  content: string;
  excerpt: string;
}

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  [key: string]: any;
}

export function parseFrontmatter(content: string): { frontmatter: FrontMatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: FrontMatter = {};

  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      
      if (key.trim() === 'tags') {
        frontmatter[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
      } else {
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return { frontmatter, content: markdownContent };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function markdownToBlogPost(filename: string, content: string): BlogPost {
  const { frontmatter, content: markdownContent } = parseFrontmatter(content);
  const slug = filename.replace('.md', '');
  
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    tags: frontmatter.tags || [],
    readingTime: calculateReadingTime(markdownContent),
    content: marked(markdownContent),
    excerpt: frontmatter.description || markdownContent.substring(0, 150) + '...'
  };
}

// Mock function - replace with actual file reading in production
export async function getBlogPostFiles(): Promise<BlogPost[]> {
  // In a real application, you would fetch from your blog content directory
  const mockPosts = [
    {
      filename: 'welcome-to-my-blog.md',
      content: `---
title: Welcome to My Blog
description: My first blog post about web development
date: 2024-01-15
author: Your Name
tags: [web-development, react, typescript]
---

# Welcome to My Blog

This is my first blog post where I'll be sharing insights about web development, React, and modern JavaScript frameworks.

## What You Can Expect

- Technical tutorials
- Best practices
- Industry insights
- Project showcases`
    }
  ];

  return mockPosts.map(post => markdownToBlogPost(post.filename, post.content));
}
```

#### 4.2 Create Blog Components

Create `src/components/blog/BlogList.tsx`:
```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, getBlogPostFiles } from '../../utils/markdown-blog';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getBlogPostFiles();
        setPosts(blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-xl transition-shadow duration-300"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {post.readingTime} min read
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-500 transition-colors">
                <a href={`#blog/${post.slug}`}>{post.title}</a>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <TagIcon className="h-4 w-4 text-gray-400" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4">
                <a
                  href={`#blog/${post.slug}`}
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No blog posts found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
```

### Phase 5: Performance Optimization (45 minutes)

#### 5.1 Implement Lazy Loading

Update `src/App.tsx`:
```typescript
import { lazy, Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load components
const Blog = lazy(() => import('./components/Blog'));
const About = lazy(() => import('./components/About'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));

// Import immediately needed components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function AppContent() {
  const [currentView, setCurrentView] = useState('portfolio');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentView(hash === '#blog' ? 'blog' : 'portfolio');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {currentView === 'blog' ? (
          <Suspense fallback={<LoadingSpinner />}>
            <Blog key="blog" />
          </Suspense>
        ) : (
          <main key="portfolio">
            <Hero />
            <Suspense fallback={<LoadingSpinner />}>
              <About />
              <Resume />
              <Contact />
            </Suspense>
          </main>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
```

#### 5.2 Create Loading Component

Create `src/components/LoadingSpinner.tsx`:
```typescript
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-96">
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
```

### Phase 6: Analytics & SEO (30 minutes)

#### 6.1 Set up Analytics

Create `src/utils/analytics.ts`:
```typescript
import { gtag } from 'gtag';

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined') {
    gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

#### 6.2 Add SEO Meta Tags

Update `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Your Name - Full Stack Developer Portfolio</title>
  <meta name="description" content="Full Stack Developer specializing in React, TypeScript, and modern web technologies. Explore my projects and blog posts." />
  <meta name="keywords" content="Full Stack Developer, React, TypeScript, Web Development, Portfolio" />
  <meta name="author" content="Your Name" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="Your Name - Full Stack Developer Portfolio" />
  <meta property="og:description" content="Full Stack Developer specializing in React, TypeScript, and modern web technologies." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Name - Full Stack Developer Portfolio" />
  <meta name="twitter:description" content="Full Stack Developer specializing in React, TypeScript, and modern web technologies." />
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### Phase 7: Deployment (30 minutes)

#### 7.1 Build Configuration

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 7.2 GitHub Pages Deployment

```bash
# Install gh-pages
npm install -D gh-pages

# Deploy to GitHub Pages
npm run deploy
```

#### 7.3 Vercel Deployment

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 🎨 Customization Guide

### Colors and Branding
1. Update the color palette in `tailwind.config.js`
2. Replace logo and branding in components
3. Update favicon and meta images

### Content
1. Replace placeholder text with your information
2. Add your projects to the Resume section
3. Create blog posts in markdown format
4. Update contact information

### Features
1. Add more sections (Projects, Testimonials, etc.)
2. Integrate with CMS for dynamic content
3. Add contact form backend
4. Implement search functionality

## 🚀 Advanced Optimizations

### Performance
- Implement image optimization
- Add service worker for caching
- Use CDN for assets
- Optimize bundle size

### SEO
- Generate sitemap
- Add structured data
- Implement RSS feed
- Create blog post meta tags

### Analytics
- Set up conversion tracking
- Add heatmap analysis
- Implement A/B testing
- Monitor Core Web Vitals

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🤝 Contributing

Feel free to contribute to this guide by:
1. Reporting issues
2. Suggesting improvements
3. Adding new sections
4. Sharing your implementations

---

**Time to Complete**: 4-6 hours for basic implementation
**Skill Level**: Intermediate to Advanced
**Maintenance**: Regular updates for dependencies and content

Happy building! 🚀

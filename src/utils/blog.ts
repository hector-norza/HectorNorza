import type { BlogPost } from '../types';

// Mock blog data for now (replace with actual blog posts later)
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-azure-ai',
    title: 'Getting Started with Azure AI: A Product Manager\'s Guide',
    excerpt: 'Learn how to leverage Azure AI services for product development and create responsible AI solutions that scale.',
    content: `# Getting Started with Azure AI

As a Product Manager working with Azure AI, I've learned that the key to successful AI implementation lies not just in the technology, but in understanding how to integrate it thoughtfully into your product strategy.

## Key Areas to Focus On

1. **Responsible AI Principles**
2. **User Experience Design**
3. **Scalability Considerations**
4. **Performance Monitoring**

Let's dive into each of these areas...`,
    publishedAt: '2024-01-15',
    category: 'Azure AI',
    tags: ['azure', 'ai', 'product-management', 'responsible-ai'],
    readingTime: 8,
    published: true,
    featured: true,
    author: 'Hector Norza',
    imageUrl: '/blog/azure-ai-guide.jpg',
    seoTitle: 'Azure AI Guide for Product Managers | Hector Norza',
    seoDescription: 'Complete guide to implementing Azure AI services in your products with responsible AI practices.',
  },
  {
    id: '2',
    slug: 'building-developer-communities',
    title: 'Building Thriving Developer Communities',
    excerpt: 'Strategies for creating and nurturing developer communities that drive product adoption and innovation.',
    content: `# Building Thriving Developer Communities

Community building is both an art and a science. Here's what I've learned from building developer communities at scale.

## The Foundation

Every successful developer community starts with:
- Clear value proposition
- Authentic engagement
- Consistent support
- Growth opportunities

## Engagement Strategies

1. **Regular Events**
2. **Educational Content**
3. **Recognition Programs**
4. **Feedback Loops**

Let me share some specific examples...`,
    publishedAt: '2024-01-10',
    category: 'Community',
    tags: ['community', 'developer-experience', 'engagement'],
    readingTime: 6,
    published: true,
    featured: false,
    author: 'Hector Norza',
    imageUrl: '/blog/developer-communities.jpg',
  },
  {
    id: '3',
    slug: 'product-management-best-practices',
    title: 'Product Management Best Practices for AI Products',
    excerpt: 'Essential practices for managing AI-powered products, from ideation to deployment and beyond.',
    content: `# Product Management Best Practices for AI Products

Managing AI products requires a unique blend of traditional product management skills and AI-specific considerations.

## Key Principles

1. **Data-Driven Decisions**
2. **Iterative Development**
3. **User-Centric Design**
4. **Ethical Considerations**

## Implementation Framework

Here's the framework I use for AI product management...`,
    publishedAt: '2024-01-05',
    category: 'Product Management',
    tags: ['product-management', 'ai', 'best-practices'],
    readingTime: 10,
    published: true,
    featured: true,
    author: 'Hector Norza',
  },
];

// Re-export BlogPost type for convenience
export type { BlogPost } from '../types';

// Utility functions with correct names matching imports
export const getAllPosts = (): BlogPost[] => {
  return MOCK_BLOG_POSTS.filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Add alias for getAllBlogPosts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return Promise.resolve(getAllPosts());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return MOCK_BLOG_POSTS.find(post => post.slug === slug && post.published);
};

// Add alias for getBlogPost
export const getBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
  return Promise.resolve(getPostBySlug(slug));
};

export const getFeaturedPosts = (): BlogPost[] => {
  return MOCK_BLOG_POSTS.filter(post => post.published && post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return MOCK_BLOG_POSTS.filter(post => 
    post.published && post.category.toLowerCase() === category.toLowerCase()
  );
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return MOCK_BLOG_POSTS.filter(post => 
    post.published && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_BLOG_POSTS.filter(post => 
    post.published && (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

// Calculate reading time based on content
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Parse markdown-like content (basic implementation)
export const parseContent = (content: string): string => {
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
};

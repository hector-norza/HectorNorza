import type { BlogPost } from '../types';
import { getBlogPostFiles, markdownToBlogPost, markdownToHtml } from './markdown-blog';

// Cache for parsed blog posts
let cachedPosts: BlogPost[] | null = null;

// Load and parse all blog posts from markdown files
const loadBlogPosts = async (): Promise<BlogPost[]> => {
  if (cachedPosts) {
    return cachedPosts;
  }

  try {
    const files = await getBlogPostFiles();
    const posts: BlogPost[] = [];

    for (const { filename, content } of files) {
      const post = markdownToBlogPost(filename, content);
      if (post) {
        // Convert markdown content to HTML
        post.content = markdownToHtml(post.content);
        posts.push(post);
      }
    }

    cachedPosts = posts;
    return posts;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading blog posts:', error);
    }
    return [];
  }
};

// Clear cache function (useful for development)
export const clearBlogCache = (): void => {
  cachedPosts = null;
};

// Main blog functions
export const getAllPosts = async (): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Alias for getAllBlogPosts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return getAllPosts();
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug && post.published);
};

// Alias for getBlogPost
export const getBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
  return getPostBySlug(slug);
};

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter(post => post.published && post.featured);
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter(post => 
    post.published && post.category.toLowerCase() === category.toLowerCase()
  );
};

export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter(post => 
    post.published && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const searchPosts = async (query: string): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.published && (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

// Utility functions
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Legacy parseContent function for backward compatibility
export const parseContent = (content: string): string => {
  // Since content is already converted to HTML by markdownToHtml, just return it
  return content;
};

// Get all unique categories
export const getAllCategories = async (): Promise<string[]> => {
  const posts = await loadBlogPosts();
  const categories = posts
    .filter(post => post.published)
    .map(post => post.category);
  return [...new Set(categories)].sort();
};

// Get all unique tags
export const getAllTags = async (): Promise<string[]> => {
  const posts = await loadBlogPosts();
  const allTags = posts
    .filter(post => post.published)
    .flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
};

// Get related posts (same category or tags)
export const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  const currentPost = posts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];

  const relatedPosts = posts
    .filter(post => 
      post.published && 
      post.slug !== currentSlug &&
      (
        post.category === currentPost.category ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
    )
    .sort((a, b) => {
      // Score based on category match and common tags
      const aScore = (a.category === currentPost.category ? 2 : 0) + 
                    a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bScore = (b.category === currentPost.category ? 2 : 0) + 
                    b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);

  return relatedPosts;
};

// Get posts with pagination
export const getPostsWithPagination = async (page: number = 1, pageSize: number = 10): Promise<{
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}> => {
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const posts = allPosts.slice(startIndex, startIndex + pageSize);

  return {
    posts,
    totalPages,
    currentPage: page,
    totalPosts,
  };
};

// Re-export types for convenience
export type { BlogPost } from '../types';
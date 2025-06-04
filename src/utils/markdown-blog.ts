import type { BlogPost } from '../types';
import { calculateReadingTime } from './blog';

// Simple frontmatter parser (security-focused alternative to gray-matter)
interface FrontmatterResult {
  data: Record<string, string | number | boolean | string[]>;
  content: string;
}

export const parseFrontmatter = (fileContent: string): FrontmatterResult => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const [, frontmatterStr, content] = match;
  const data: Record<string, string | number | boolean | string[]> = {};

  // Parse YAML frontmatter line by line (simple but secure)
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent
        .split(',')
        .map(item => item.trim().replace(/['"]/g, ''))
        .filter(item => item.length > 0);
    }
    // Parse booleans
    else if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    }
    // Parse numbers
    else if (!isNaN(Number(value))) {
      data[key] = Number(value);
    }
    // String values
    else {
      data[key] = value;
    }
  });

  return { data, content: content.trim() };
};

// Convert markdown file to BlogPost
export const markdownToBlogPost = (filename: string, fileContent: string): BlogPost | null => {
  const { data, content } = parseFrontmatter(fileContent);

  // Validate required fields
  if (!data.title || !data.excerpt || !data.publishedAt || !data.category) {
    if (import.meta.env.DEV) {
      console.warn(`Blog post ${filename} missing required frontmatter fields`);
    }
    return null;
  }

  // Generate slug from filename
  const slug = filename.replace(/\.md$/, '');

  // Calculate reading time
  const readingTime = typeof data.readingTime === 'number' ? data.readingTime : calculateReadingTime(content);

  return {
    id: slug,
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    content,
    publishedAt: String(data.publishedAt),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime,
    published: data.published === true,
    featured: data.featured === true,
    author: data.author ? String(data.author) : 'Hector Norza',
    imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
  };
};

// Basic markdown to HTML converter
export const markdownToHtml = (markdown: string): string => {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-10">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 mt-12">$1</h1>')
    
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
    
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-6"><code class="text-sm text-gray-800 dark:text-gray-200">$2</code></pre>')
    .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm">$1</code>')
    
    // Lists
    .replace(/^\* (.*)$/gim, '<li class="text-gray-700 dark:text-gray-300 mb-2">$1</li>')
    .replace(/^(\d+)\. (.*)$/gim, '<li class="text-gray-700 dark:text-gray-300 mb-2">$2</li>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="rounded-lg shadow-lg mb-6 max-w-full h-auto" />')
    
    // Blockquotes
    .replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-6 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">$1</blockquote>')
    
    // Paragraphs (convert double line breaks to paragraphs)
    .replace(/\n\n/gim, '</p><p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">')
    
    // Wrap in paragraph tags
    .replace(/^(.+)$/gim, '<p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">$1</p>')
    
    // Clean up empty paragraphs and fix list formatting
    .replace(/<p[^>]*><\/p>/gim, '')
    .replace(/<p[^>]*>(<li.*<\/li>)<\/p>/gim, '$1')
    .replace(/(<li.*<\/li>)/gim, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
    .replace(/<\/ul>\s*<ul[^>]*>/gim, '');
};

// Load blog post files using Vite's dynamic import with glob
export const getBlogPostFiles = async (): Promise<{ filename: string; content: string }[]> => {
  try {
    // Use Vite's dynamic import with eager loading for blog posts
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });
    
    const files: { filename: string; content: string }[] = [];
    
    for (const [path, content] of Object.entries(modules)) {
      const filename = path.split('/').pop() || '';
      files.push({
        filename,
        content: content as string
      });
    }
    
    return files;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading blog post files:', error);
    }
    return [];
  }
};

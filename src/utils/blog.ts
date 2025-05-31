import { marked } from 'marked';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { BlogPost, BlogPostMeta } from '../types/blog';

// Configure marked for better security and formatting
marked.setOptions({
  gfm: true,
  breaks: true,
});

export class BlogService {
  // Get all blog post filenames
  private static async getBlogFiles(): Promise<string[]> {
    // This is a simple approach - in production you might want to use a build-time process
    // For now, we'll maintain a list of known blog posts
    return [
      'my-first-blog-post.md',
      // Add your blog post files here when you create them
      // Example: 'my-first-blog-post.md',
    ];
  }

  // Load and parse a markdown file
  private static async loadMarkdownFile(filename: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`/blog/${filename}`);
      if (!response.ok) {
        console.warn(`Failed to load blog post: ${filename}`);
        return null;
      }
      
      const markdownContent = await response.text();
      const { data: frontmatter, content } = matter(markdownContent);
      
      // Calculate reading time
      const readTime = this.calculateReadingTime(content);
      
      return {
        slug: frontmatter.slug || filename.replace('.md', ''),
        title: frontmatter.title || 'Untitled',
        excerpt: frontmatter.excerpt || '',
        content: await marked(content),
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        readTime: frontmatter.readTime || readTime,
        tags: frontmatter.tags || [],
        category: frontmatter.category || 'Uncategorized',
        author: frontmatter.author || 'Héctor Norzagaray',
        published: frontmatter.published !== false // Default to true unless explicitly false
      };
    } catch (error) {
      console.error(`Error loading blog post ${filename}:`, error);
      return null;
    }
  }

  // Get all published blog posts
  static async getAllPosts(): Promise<BlogPostMeta[]> {
    const filenames = await this.getBlogFiles();
    const posts = await Promise.all(
      filenames.map(filename => this.loadMarkdownFile(filename))
    );
    
    return posts
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        readTime: post.readTime,
        tags: post.tags,
        category: post.category,
        author: post.author,
        published: post.published
      }));
  }

  // Get a specific blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const filenames = await this.getBlogFiles();
    
    for (const filename of filenames) {
      const post = await this.loadMarkdownFile(filename);
      if (post && post.slug === slug && post.published) {
        return post;
      }
    }
    
    return null;
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get posts by tag
  static async getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get unique categories
  static async getCategories(): Promise<string[]> {
    const posts = await this.getAllPosts();
    const categories = [...new Set(posts.map(post => post.category))];
    return categories.sort();
  }

  // Get unique tags
  static async getTags(): Promise<string[]> {
    const posts = await this.getAllPosts();
    const tags = [...new Set(posts.flatMap(post => post.tags))];
    return tags.sort();
  }

  // Calculate reading time (roughly 200 words per minute)
  static calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Format date for display
  static formatDate(dateString: string): string {
    return format(new Date(dateString), 'MMMM d, yyyy');
  }

  // Render markdown to HTML
  static renderMarkdown(content: string): string {
    return content; // For now, return content as-is since we're using sample data
  }
}

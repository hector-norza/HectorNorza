import { marked } from 'marked';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
  htmlContent: string;
}

// Configure marked options once
marked.setOptions({
  breaks: true,
  gfm: true,
  // Remove headerIds - not supported in current version
});

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const blogFiles = [
    'my-first-blog-post.md',
    // removed 'building-community-driven-products.md', -file doiesnt exist
    // Removed 'future-of-responsible-ai.md' - file doesn't exist
  ];

  const posts = await Promise.all(
    blogFiles.map(async (filename) => {
      try {
        const response = await fetch(`/blog/${filename}`);
        if (!response.ok) {
          console.error(`Failed to fetch ${filename}: ${response.status}`);
          return null;
        }
        const content = await response.text();
        return await parseMarkdownPost(content, filename);
      } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
      }
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function parseMarkdownPost(
  content: string,
  filename: string
): Promise<BlogPost | null> {
  try {
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      console.error(`No frontmatter found in ${filename}`);
      return null;
    }

    const [, frontmatterText, markdownContent] = frontmatterMatch;
    const frontmatter: Record<string, string | string[]> = {};

    // Parse YAML-like frontmatter
    frontmatterText.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const trimmedKey = key.trim();
        const value = valueParts
          .join(':')
          .trim()
          .replace(/^["']|["']$/g, '');

        if (trimmedKey === 'tags') {
          if (value.startsWith('[') && value.endsWith(']')) {
            frontmatter[trimmedKey] = value
              .replace(/^\[|\]$/g, '')
              .split(',')
              .map((tag) => tag.trim().replace(/^["']|["']$/g, ''));
          } else {
            frontmatter[trimmedKey] = value.split(',').map((tag) => tag.trim());
          }
        } else {
          frontmatter[trimmedKey] = value;
        }
      }
    });

    // Parse markdown to HTML - handle both sync and async returns
    const htmlContentResult = marked.parse(markdownContent.trim());
    const htmlContent =
      typeof htmlContentResult === 'string'
        ? htmlContentResult
        : await htmlContentResult;

    return {
      id: (frontmatter.slug as string) || filename.replace('.md', ''),
      title: (frontmatter.title as string) || 'Untitled',
      excerpt: (frontmatter.excerpt as string) || '',
      date: (frontmatter.date as string) || '',
      slug: (frontmatter.slug as string) || filename.replace('.md', ''),
      category: (frontmatter.category as string) || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      author: (frontmatter.author as string) || '',
      readTime: (frontmatter.readTime as string) || '',
      content: markdownContent.trim(),
      htmlContent: htmlContent,
    };
  } catch (error) {
    console.error(`Error parsing ${filename}:`, error);
    return null;
  }
}

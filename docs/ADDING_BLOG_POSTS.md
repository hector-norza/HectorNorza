# Adding New Blog Entries

Your blog system is now fully functional and reads from markdown files. Here's how to add new blog entries:

## Quick Steps

1. **Create a new markdown file** in `public/blog/`
2. **Add the filename** to the `getBlogFiles()` array in `src/utils/blog.ts`
3. **Build and deploy** your changes

## Detailed Guide

### 1. Create Your Markdown File

Create a new `.md` file in the `public/blog/` directory. The filename should be descriptive and URL-friendly (use hyphens instead of spaces).

**Example:** `public/blog/my-new-blog-post.md`

### 2. Use the Correct Frontmatter Format

Every blog post must start with YAML frontmatter (the content between the `---` lines):

```markdown
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
excerpt: "A brief description that appears in the blog listing and search results"
date: "2024-12-19"
category: "Product Management"
tags: ["tag1", "tag2", "tag3"]
author: "Héctor Norzagaray"
readTime: "8 min read"
published: true
---

# Your Blog Post Title

Your markdown content goes here...
```

**Required Fields:**
- `title`: The title of your blog post
- `slug`: URL-friendly identifier (must be unique)
- `excerpt`: Brief description for listings
- `date`: Publication date (YYYY-MM-DD format)
- `category`: Post category
- `tags`: Array of relevant tags
- `author`: Author name
- `published`: Set to `true` to make it visible, `false` to hide

**Optional Fields:**
- `readTime`: Will be auto-calculated if not provided

### 3. Update the Blog Service

Add your new markdown filename to the `getBlogFiles()` method in `src/utils/blog.ts`:

```typescript
private static async getBlogFiles(): Promise<string[]> {
  return [
    'your-new-blog-post.md',  // Add your new file here
    'mastering-stakeholder-alignment.md',
    'community-driven-product-development.md',
    'psychology-to-product-management-transition.md',
    'building-responsible-ai-product-perspective.md'
  ];
}
```

**Important:** Add new files at the top of the array for reverse chronological order.

### 4. Markdown Content Guidelines

Your blog system supports standard markdown:

```markdown
# Main Heading
## Section Heading
### Subsection

**Bold text**
*Italic text*
[Link text](https://example.com)

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Another item

> Blockquote

`inline code`

```code
code block
```
```

### 5. Categories and Tags

**Current Categories:**
- Technology
- Product Management
- Career
- Leadership

**Popular Tags:**
- product strategy
- artificial intelligence
- career transition
- stakeholder management
- leadership
- technology
- ethics

Feel free to create new categories and tags as needed.

### 6. Build and Test

After adding your blog post:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/blog` to see your new post.

### 7. SEO Considerations

- Use descriptive titles (50-60 characters)
- Write compelling excerpts (150-160 characters)
- Choose relevant tags and categories
- Use proper heading hierarchy (H1 → H2 → H3)
- Include internal and external links where appropriate

## Blog Post Ideas

Here are some topic ideas that would fit well with your portfolio:

**Product Management:**
- "The Art of Saying No: Product Prioritization Strategies"
- "From User Story to Feature: A PM's Journey"
- "Building Products Users Actually Want"
- "Cross-functional Team Leadership for PMs"

**Technology & AI:**
- "AI Product Development Best Practices"
- "Ethical Considerations in AI Product Design"
- "The Future of Human-AI Collaboration"

**Career & Leadership:**
- "Essential Skills for Modern Product Managers"
- "Building Your Product Management Toolkit"
- "Lessons Learned from Product Failures"
- "Transitioning into Product Management"

## Future Improvements

Consider these enhancements for the future:

1. **Auto-discovery**: Automatically detect new markdown files
2. **Rich media**: Support for images and videos
3. **Comments**: Add a comment system
4. **Newsletter**: Email subscription for new posts
5. **Related posts**: Show similar content
6. **Search**: Full-text search functionality
7. **RSS feed**: For blog subscribers

## Troubleshooting

**Post not showing up?**
- Check that the filename is added to `getBlogFiles()`
- Verify `published: true` in frontmatter
- Ensure the date format is correct (YYYY-MM-DD)
- Check for YAML syntax errors in frontmatter

**Build errors?**
- Validate YAML frontmatter syntax
- Check for special characters in the slug
- Ensure markdown is properly formatted

**Need help?**
The blog system is designed to be simple and maintainable. If you run into issues, check the browser console for error messages or review the existing blog posts as examples.

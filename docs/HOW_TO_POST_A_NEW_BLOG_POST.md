# How to Post a New Blog Post

This guide walks you through creating a new blog post with proper asset organization and following best practices.

## Quick Start

1. **Run the blog creation script** (recommended)
2. **Organize your assets**
3. **Write your content**
4. **Preview and publish**

---

## Method 1: Using the Automated Script (Recommended)

### Step 1: Create the Blog Post Structure

Run the blog creation script from the project root:

```bash
npm run create-blog-post
```

Or manually:

```bash
node scripts/create-blog-post.js
```

The script will:
- Prompt you for the blog post title
- Generate a URL-safe filename
- Create the markdown file with frontmatter template
- Create the complete assets folder structure
- Generate placeholder README files

### Step 2: The Script Creates This Structure

```
src/content/blog/
├── your-blog-post-title.md
└── assets/
    └── your-blog-post-title/
        ├── README.md
        ├── images/
        ├── screenshots/
        ├── diagrams/
        └── files/
```

---

## Method 2: Manual Creation

### Step 1: Create the Blog Post File

Create a new markdown file in `src/content/blog/`:

```bash
touch src/content/blog/your-post-title.md
```

### Step 2: Create the Assets Folder Structure

```bash
# Navigate to the assets directory
cd src/content/blog/assets

# Create the folder structure
mkdir -p "your-post-title"/{images,screenshots,diagrams,files}

# Create README for the assets folder
touch "your-post-title/README.md"
```

### Step 3: Add Frontmatter Template

Copy this template to your new markdown file:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A compelling excerpt that summarizes your post in 1-2 sentences."
publishedAt: "2025-06-03"
category: "Technology"
tags: ["React", "TypeScript", "Web Development"]
author: "Hector Norza"
featured: false
published: true
seoTitle: "Your Blog Post Title | Hector Norza"
seoDescription: "SEO-optimized description under 160 characters."
imageUrl: "/blog/your-post-featured-image.jpg"
---

# Your Blog Post Title

Your content starts here...
```

---

## Step 3: Organize Your Assets

### Asset Types and Guidelines

#### 📸 Images (`/images/`)
- **Purpose**: General illustrations, photos, graphics
- **Naming**: `descriptive-name.png/jpg/webp`
- **Size**: Max width 1200px
- **Format**: WebP preferred, PNG/JPG acceptable

**Examples:**
- `hero-banner.webp`
- `comparison-chart.png`
- `feature-showcase.jpg`

#### 📱 Screenshots (`/screenshots/`)
- **Purpose**: UI screenshots, code editor views, terminal output
- **Naming**: `interface-element-description.png`
- **Size**: Actual size or max 1200px width
- **Format**: PNG preferred (for UI clarity)

**Examples:**
- `vscode-setup.png`
- `azure-portal-dashboard.png`
- `mobile-responsive-view.png`

#### 📊 Diagrams (`/diagrams/`)
- **Purpose**: Architecture diagrams, flowcharts, technical illustrations
- **Naming**: `diagram-type-description.svg/png`
- **Size**: Vector (SVG) preferred
- **Format**: SVG for scalability, PNG if necessary

**Examples:**
- `system-architecture.svg`
- `data-flow-diagram.png`
- `component-hierarchy.svg`

#### 📁 Files (`/files/`)
- **Purpose**: Code samples, configuration files, downloads
- **Naming**: `descriptive-filename.ext`
- **Types**: `.ts`, `.js`, `.json`, `.yml`, `.txt`, `.zip`

**Examples:**
- `setup-config.json`
- `example-component.tsx`
- `deployment-script.sh`

### Asset Organization Best Practices

1. **Use descriptive filenames**
   ```
   ✅ azure-ai-configuration-example.ts
   ❌ config.ts
   ```

2. **Optimize for web**
   ```bash
   # Resize large images
   # Convert to WebP when possible
   # Compress without losing quality
   ```

3. **Keep assets focused**
   - Only include assets used in the post
   - Remove unused placeholder files
   - Group related assets logically

---

## Step 4: Reference Assets in Your Blog Post

### Image References

Use relative paths from the blog post file:

```markdown
![Alt text for accessibility](./assets/your-post-title/images/your-image.png)

<!-- For screenshots -->
![Azure Portal Dashboard](./assets/your-post-title/screenshots/azure-portal.png)

<!-- For diagrams -->
![System Architecture](./assets/your-post-title/diagrams/architecture.svg)
```

### Code File References

Link to downloadable code files:

```markdown
You can download the complete configuration file [here](./assets/your-post-title/files/config-example.ts).

## Configuration Example

```typescript
// See the complete file at: ./assets/your-post-title/files/config-example.ts
export const config = {
  // ... configuration here
};
\```
```

### Inline Code with File Context

```markdown
Here's the main component structure:

```tsx
// File: ./assets/your-post-title/files/main-component.tsx
import React from 'react';

export function MainComponent() {
  return <div>Hello World</div>;
}
\```
```

---

## Step 5: Content Writing Best Practices

### Frontmatter Guidelines

- **title**: Clear, descriptive, SEO-friendly
- **excerpt**: 1-2 sentences, under 160 characters
- **publishedAt**: Use YYYY-MM-DD format
- **category**: Choose from existing categories or create new
- **tags**: 3-5 relevant tags
- **featured**: Set to `true` for homepage display
- **published**: Set to `false` for drafts
- **seoTitle**: Include your name and key terms
- **seoDescription**: Under 160 characters, compelling

### Content Structure

```markdown
# Main Title (H1)

Brief introduction paragraph.

## Section 1 (H2)

Content with examples and images.

![Descriptive alt text](./assets/post-name/images/example.png)

### Subsection (H3)

More detailed content.

## Code Examples

```typescript
// Clear, commented code examples
const example = "with context";
\```

## Conclusion

Summary and next steps.
```

### Writing Tips

1. **Start with an outline**
2. **Use clear headings** (H2, H3 hierarchy)
3. **Include code examples** with syntax highlighting
4. **Add alt text** to all images
5. **Break up long paragraphs**
6. **Use bullet points** and numbered lists
7. **Link to external resources**

---

## Step 6: Preview and Test

### Local Development

```bash
# Start the development server
npm run dev

# Navigate to your blog post
# http://localhost:5173/blog (then find your post)
```

### Check Your Post

- [ ] All images load correctly
- [ ] Code blocks render properly
- [ ] Links work (internal and external)
- [ ] Mobile responsiveness
- [ ] Dark mode compatibility
- [ ] Accessibility (alt texts, headings)

### Validation Checklist

- [ ] Frontmatter is complete and accurate
- [ ] Assets are properly organized
- [ ] All referenced files exist
- [ ] Images are optimized for web
- [ ] No broken links
- [ ] SEO metadata is set
- [ ] Published status is correct

---

## Step 7: Publish

### Final Steps

1. **Set `published: true`** in frontmatter
2. **Update RSS feed**:
   ```bash
   npm run generate-rss
   ```
3. **Generate sitemap**:
   ```bash
   npm run generate-sitemap
   ```
4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new blog post: Your Post Title"
   git push
   ```

### Automatic Updates

The following are automatically updated when you add a new post:
- ✅ Blog listing page
- ✅ RSS feed (after running script)
- ✅ Sitemap (after running script)
- ✅ Category filtering
- ✅ Tag system

---

## Troubleshooting

### Common Issues

**Images not loading:**
- Check file paths are correct (relative to blog post)
- Verify image files exist in the assets folder
- Check file extensions match exactly

**Frontmatter errors:**
- Validate YAML syntax
- Check for required fields
- Ensure dates are in YYYY-MM-DD format

**Build errors:**
- Run `npm run build` to check for issues
- Check TypeScript errors
- Validate markdown syntax

### Getting Help

1. Check existing blog posts for examples
2. Review the assets README files
3. Test locally before publishing
4. Use browser dev tools to debug asset loading

---

## Example: Complete Workflow

Here's a complete example of creating a new blog post:

```bash
# 1. Create the structure
npm run create-blog-post
# Enter title: "Building a React Component Library"

# 2. Add your assets
cp ~/my-images/component-diagram.png src/content/blog/assets/building-react-component-library/diagrams/
cp ~/my-code/component-example.tsx src/content/blog/assets/building-react-component-library/files/

# 3. Write your content
code src/content/blog/building-react-component-library.md

# 4. Preview
npm run dev

# 5. Publish
# Update frontmatter: published: true
npm run generate-rss
npm run generate-sitemap
git add .
git commit -m "Add blog post: Building a React Component Library"
git push
```

---

## Asset Maintenance

### Regular Cleanup

- Remove unused placeholder files
- Optimize large images
- Update broken external links
- Archive old, outdated assets

### Performance Tips

- Use WebP format for images
- Compress images before uploading
- Use SVG for simple graphics
- Consider lazy loading for large posts

---

That's it! Your new blog post is now live and properly organized. The asset structure makes it easy to maintain and update your content over time.

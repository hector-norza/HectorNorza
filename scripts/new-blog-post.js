#!/usr/bin/env node

/**
 * Blog Post Generator Script
 * 
 * Usage: node scripts/new-blog-post.js "My Blog Post Title"
 * 
 * This script creates a new blog post template with proper frontmatter
 * and updates the blog service to include the new post.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .trim();
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function createBlogPostTemplate(title, slug) {
  return `---
title: "${title}"
slug: "${slug}"
excerpt: "Brief description of your blog post - update this with your actual excerpt"
date: "${getCurrentDate()}"
category: "Product Management"
tags: ["product management", "strategy"]
author: "Héctor Norzagaray"
readTime: "5 min read"
published: true
---

# ${title}

Start writing your blog post here...

## Section Heading

Your content goes here.

### Subsection

More detailed content.

## Key Takeaways

- Point 1
- Point 2
- Point 3

## Conclusion

Wrap up your thoughts here.

---

*What are your thoughts on this topic? I'd love to hear from you.*
`;
}

function updateBlogService(filename) {
  const blogServicePath = path.join(__dirname, '../src/utils/blog.ts');
  let content = fs.readFileSync(blogServicePath, 'utf8');
  
  // Find the return array in getBlogFiles method and add the new file at the top
  const returnArrayRegex = /(return \[\s*)/;
  const replacement = `$1'${filename}',\n      `;
  
  content = content.replace(returnArrayRegex, replacement);
  fs.writeFileSync(blogServicePath, content);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node scripts/new-blog-post.js "Your Blog Post Title"');
    console.log('Example: node scripts/new-blog-post.js "Building Better Products"');
    process.exit(1);
  }
  
  const title = args.join(' ');
  const slug = slugify(title);
  const filename = `${slug}.md`;
  const filePath = path.join(__dirname, '../public/blog', filename);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`Error: Blog post "${filename}" already exists!`);
    process.exit(1);
  }
  
  // Create the blog post file
  const template = createBlogPostTemplate(title, slug);
  fs.writeFileSync(filePath, template);
  
  // Update the blog service
  updateBlogService(filename);
  
  console.log(`✅ Blog post created successfully!`);
  console.log(`📄 File: public/blog/${filename}`);
  console.log(`🔗 URL: /blog/${slug}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit the blog post content in public/blog/${filename}`);
  console.log(`2. Update the excerpt, category, and tags`);
  console.log(`3. Run 'npm run build' to test`);
  console.log(`4. Run 'npm run preview' to preview locally`);
}

main();

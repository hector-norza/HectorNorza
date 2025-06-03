#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const createBlogPost = async () => {
  console.log('🚀 Create New Blog Post\n');
  
  try {
    // Get post details
    const title = await question('Post title: ');
    const excerpt = await question('Post excerpt (1-2 sentences): ');
    const category = await question('Category (e.g., Azure AI, Product Management, React Development): ');
    const tagsInput = await question('Tags (comma-separated): ');
    const featured = await question('Featured post? (y/n): ');
    const imageUrl = await question('Image URL (optional, press enter to skip): ');
    
    // Process inputs
    const slug = slugify(title);
    const tags = tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
    const publishedAt = formatDate(new Date());
    const isFeatured = featured.toLowerCase() === 'y' || featured.toLowerCase() === 'yes';
    
    // SEO fields
    const seoTitle = `${title} | Hector Norza`;
    const seoDescription = excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt;
    
    // Create frontmatter
    const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
publishedAt: "${publishedAt}"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
author: "Hector Norza"
featured: ${isFeatured}
published: true${imageUrl ? `\nimageUrl: "${imageUrl}"` : ''}
seoTitle: "${seoTitle}"
seoDescription: "${seoDescription}"
---`;

    // Create initial content template
    const content = `
# ${title}

${excerpt}

## Introduction

Write your introduction here...

## Main Content

### Section 1

Your content here...

### Section 2

More content...

## Code Examples

\`\`\`typescript
// Your code examples here
interface Example {
  property: string;
}
\`\`\`

## Key Takeaways

- Important point 1
- Important point 2
- Important point 3

## Conclusion

Wrap up your thoughts here...

---

**Questions or feedback?** Feel free to reach out on [LinkedIn](https://linkedin.com/in/hectornorza) or [Twitter](https://twitter.com/hectornorza).
`;

    // Create the complete file content
    const fileContent = frontmatter + content;
    
    // Create the file
    const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');
    const filename = `${slug}.md`;
    const filepath = path.join(contentDir, filename);
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`\n❌ A post with slug "${slug}" already exists!`);
      process.exit(1);
    }
    
    // Write the file
    fs.writeFileSync(filepath, fileContent, 'utf8');
    
    console.log(`\n✅ Blog post created successfully!`);
    console.log(`📄 File: ${filepath}`);
    console.log(`🔗 URL: /blog/${slug}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit the content in: ${filename}`);
    console.log(`2. Add images to: /public/blog/`);
    console.log(`3. Test locally: npm run dev`);
    console.log(`4. Deploy: npm run deploy`);
    
  } catch (error) {
    console.error('\n❌ Error creating blog post:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
};

// Run the script
createBlogPost();

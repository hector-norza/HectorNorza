#!/usr/bin/env node

/**
 * RSS Feed Generator Script
 * 
 * Generates an RSS feed from blog posts for subscription services
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import for gray-matter since it's an ES module
async function importGrayMatter() {
  try {
    const { default: matter } = await import('gray-matter');
    return matter;
  } catch (error) {
    console.error('Error importing gray-matter:', error);
    process.exit(1);
  }
}

// Site configuration
const SITE_CONFIG = {
  title: "Héctor Norzagaray's Blog",
  description: "Insights on product management, community building, and technology for good",
  url: "https://hectornorza.com",
  author: "Héctor Norzagaray",
  email: "hector@hectornorza.com",
  language: "en-us"
};

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatRSSDate(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

function getBlogFiles() {
  const blogDir = path.join(__dirname, '../public/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(blogDir, file));
}

function parseBlogPost(filePath, matter) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Extract filename for slug fallback
    const filename = path.basename(filePath, '.md');
    
    return {
      title: frontmatter.title || 'Untitled',
      slug: frontmatter.slug || filename,
      excerpt: frontmatter.excerpt || '',
      content: markdownContent,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      category: frontmatter.category || 'Blog',
      tags: frontmatter.tags || [],
      author: frontmatter.author || SITE_CONFIG.author,
      published: frontmatter.published !== false
    };
  } catch (error) {
    console.error(`Error parsing blog post ${filePath}:`, error);
    return null;
  }
}

function generateRSSFeed(posts) {
  const now = new Date().toUTCString();
  const latestPost = posts.length > 0 ? posts[0] : null;
  const lastBuildDate = latestPost ? formatRSSDate(latestPost.date) : now;
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <link>${SITE_CONFIG.url}</link>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${SITE_CONFIG.language}</language>
    <managingEditor>${SITE_CONFIG.email} (${SITE_CONFIG.author})</managingEditor>
    <webMaster>${SITE_CONFIG.email} (${SITE_CONFIG.author})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${lastBuildDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_CONFIG.url}/favicon-32x32.png</url>
      <title>${escapeXml(SITE_CONFIG.title)}</title>
      <link>${SITE_CONFIG.url}</link>
      <width>32</width>
      <height>32</height>
    </image>
`;

  posts.forEach(post => {
    const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
    const pubDate = formatRSSDate(post.date);
    
    // Create a clean excerpt for description
    const description = post.excerpt || post.content.substring(0, 200) + '...';
    
    rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(description)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${SITE_CONFIG.email} (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>`;
    
    // Add tags as additional categories
    post.tags.forEach(tag => {
      rss += `
      <category>${escapeXml(tag)}</category>`;
    });
    
    rss += `
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
}

async function main() {
  try {
    console.log('🔄 Generating RSS feed...');
    
    // Import gray-matter dynamically
    const matter = await importGrayMatter();
    
    // Get all blog post files
    const blogFiles = getBlogFiles();
    
    if (blogFiles.length === 0) {
      console.log('📝 No blog posts found. Creating empty RSS feed.');
    }
    
    // Parse blog posts
    const posts = blogFiles
      .map(file => parseBlogPost(file, matter))
      .filter(post => post !== null && post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Generate RSS feed
    const rssContent = generateRSSFeed(posts);
    
    // Write RSS file to public directory
    const rssPath = path.join(__dirname, '../public/rss.xml');
    fs.writeFileSync(rssPath, rssContent);
    
    console.log(`✅ RSS feed generated successfully!`);
    console.log(`📄 File: public/rss.xml`);
    console.log(`🔗 URL: ${SITE_CONFIG.url}/rss.xml`);
    console.log(`📊 Posts included: ${posts.length}`);
    
    if (posts.length > 0) {
      console.log(`📅 Latest post: "${posts[0].title}" (${posts[0].date})`);
    }
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

main();

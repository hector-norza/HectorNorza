// Script to generate sitemap.xml for SEO
import fs from 'fs';
import path from 'path';

const domain = 'https://www.hectornorza.com';
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/#about', priority: '0.8', changefreq: 'monthly' },
  { url: '/#resume', priority: '0.8', changefreq: 'monthly' },
  { url: '/#contact', priority: '0.7', changefreq: 'monthly' },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${domain}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('✅ Sitemap generated successfully at:', sitemapPath);
};

generateSitemap();

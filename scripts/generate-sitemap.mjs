import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const POSTS_DIR = join(dirname(__dirname), '_posts');

function getPublishedPosts() {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.html'));
    return files
      .map(file => {
        const fullPath = join(POSTS_DIR, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug: file.replace('.html', ''),
          lastModified: data.lastModified || fs.statSync(fullPath).mtime,
        };
      })
      .filter(Boolean);
  } catch (e) {
    console.error('Error reading posts:', e);
    return [];
  }
}

async function generateSitemap() {
  const publicDir = join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    const pages = (await globby([
      'pages/**/*.{js,jsx}',
      '!pages/_*.{js,jsx}',
      '!pages/api',
      '!pages/404.js',
    ])).filter(page => !page.includes('[') && !page.includes(']'));

    const posts = getPublishedPosts();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace('pages', '')
      .replace(/\.jsx?$/, '')
      .replace(/\/index/g, '');
    return `  <url>
    <loc>https://www.zigouplex.space${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${path === '' ? 'weekly' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : '0.9'}</priority>
  </url>`;
  })
  .join('\n')}
${posts
  .map((post) => {
    return `  <url>
    <loc>https://www.zigouplex.space/blog/${post.slug}</loc>
    <lastmod>${new Date(post.lastModified).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    const sitemapPath = join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ Sitemap generated successfully at:', sitemapPath);

    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.zigouplex.space/sitemap.xml`;

    fs.writeFileSync(join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated successfully');

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

console.log('🔄 Starting sitemap generation...');
generateSitemap().catch(err => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
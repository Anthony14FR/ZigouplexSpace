import fs from 'fs';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.html'));
  } catch (e) {
    console.error('Error reading posts directory:', e);
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const realSlug = slug.replace(/\.html$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.html`);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Extraire les métadonnées
    const metaMatch = content.match(/<div class="article-meta hidden">([\s\S]*?)<\/div>/);
    const metadata = {};
    
    if (metaMatch) {
      const authorMatch = metaMatch[1].match(/name="author" content="([^"]+)"/);
      const dateMatch = metaMatch[1].match(/name="date" content="([^"]+)"/);
      const bannerMatch = metaMatch[1].match(/name="banner" content="([^"]+)"/);
      const subtitleMatch = metaMatch[1].match(/name="subtitle" content="([^"]+)"/);

      if (authorMatch) metadata.author = authorMatch[1];
      if (dateMatch) metadata.date = dateMatch[1];
      if (bannerMatch) metadata.banner = bannerMatch[1];
      if (subtitleMatch) metadata.subtitle = subtitleMatch[1];
    }

    // Extraire et supprimer les métadonnées du contenu
    content = content.replace(/<div class="article-meta hidden">[\s\S]*?<\/div>/, '');

    // Extraire le titre et le résumé
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    const excerptMatch = content.match(/<p[^>]*>(.*?)<\/p>/);

    // Ajouter les classes de style uniformes pour le contenu
    content = content
      .replace(/<h1[^>]*>.*?<\/h1>/, '') // Supprime le h1 du contenu car on l'utilise dans l'en-tête
      .replace(
        /<h2/g, 
        '<h2 class="text-3xl font-semibold mb-6 mt-10"'
      )
      .replace(
        /<h3/g, 
        '<h3 class="text-2xl font-medium mb-4 mt-8"'
      )
      .replace(
        /<p>/g, 
        '<p class="mb-6 leading-relaxed">'
      )
      .replace(
        /<blockquote>/g, 
        '<blockquote class="my-8 p-6 bg-gray-50 border-l-4 border-blue-500 rounded-r italic text-white-700">'
      )
      .replace(
        /<ul>/g, 
        '<ul class="list-disc pl-6 my-6 space-y-2">'
      )
      .replace(
        /<ol>/g, 
        '<ol class="list-decimal pl-6 my-6 space-y-2">'
      )
      .replace(
        /<figure>/g,
        '<figure class="my-8">'
      )
      .replace(
        /<img([^>]+)>/g,
        (match, attributes) => {
          if (!attributes.includes('class="')) {
            return `<img${attributes} class="rounded-lg shadow-md max-w-full h-auto mx-auto mt-4 mb-4" style="max-width: 10vw;" />`;
          }
          return match;
        }
      );

      if (new Date(metadata.date) > new Date()) {
        return;
      }  

    const wrappedContent = `
    <div class="article-header mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">
        ${titleMatch ? titleMatch[1] : 'Sans titre'}
      </h1>
      
      ${metadata.subtitle ? `
        <p class="text-xl text-gray-400 mb-8">
          ${metadata.subtitle}
        </p>
      ` : ''}
      
      <img 
        src="${metadata.banner}"
        alt="Bannière de ${titleMatch ? titleMatch[1] : 'l\'article'}"
        style="width: 500px; height: 250px; object-fit: cover; margin: 0 auto; display: block;"
        class="rounded-lg mb-6"
      />
  
      <div class="text-base text-gray-400 mb-10">
        Par ${metadata.author}&nbspLe&nbsp${new Date(metadata.date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  
    <div class="text-left">
      ${content}
    </div>
  `;

    return {
      slug: realSlug,
      title: titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : realSlug,
      subtitle: metadata.subtitle,
      excerpt: excerptMatch ? excerptMatch[1].replace(/<[^>]+>/g, '').slice(0, 500) : '',
      date: metadata.date,
      author: metadata.author,
      banner: metadata.banner,
      content: wrappedContent
    };
  } catch (e) {
    console.error(`Error reading post ${slug}:`, e);
    return null;
  }
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter(Boolean)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
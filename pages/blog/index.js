import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/api';
import Navigation from '../../components/Navigation';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

export default function Blog({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = "Blog | Zigouplex Space";
  const description = "Découvrir les derniers articles de Blog de Zigouplex Space";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.zigouplex.space/#website",
        "url": "https://www.zigouplex.space",
        "name": "Zigouplex",
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zigouplex.space/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Blog",
        "@id": "https://www.zigouplex.space/blog/#blog",
        "name": "Blog de Zigouplex",
        "description": "Leader dans le développement de lanceurs spatiaux innovants.",
        "publisher": { "@id": "https://www.zigouplex.space/#organization" },
        "author": { "@id": "https://www.zigouplex.space/#person" },
        "inLanguage": "fr-FR"
      },
      {
        "@type": "ItemList",
        "@id": "https://www.zigouplex.space/blog/#latestposts",
        "name": "Derniers articles",
        "numberOfItems": posts.length,
        "itemListElement": posts.map((post, index) => ({
          "@type": "BlogPosting",
          "position": index + 1,
          "url": `https://www.zigouplex.space/blog/${post.slug}`,
          "name": post.title,
          "description": post.excerpt || "Aucun résumé disponible.",
          "datePublished": post.date,
          "dateModified": post.date,
          "image": {
            "@type": "ImageObject",
            "url": post.banner,
            "width": 800,
            "height": 450
          },
          "author": { "@id": "https://www.zigouplex.space/#person" },
          "publisher": { "@id": "https://www.zigouplex.space/#organization" },
          "inLanguage": "fr-FR"
        }))
      },
      {
        "@type": "Organization",
        "@id": "https://www.zigouplex.space/#organization",
        "name": "Zigouplex",
        "url": "https://www.zigouplex.space",
        "logo": "https://www.zigouplex.space/images/zigouplex.webp",
        "sameAs": [
          "https://github.com/zigouplex",
          "https://twitter.com/zigouplex"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://www.zigouplex.space/#person",
        "name": "Zigouplex",
        "jobTitle": "Aerospace Engineer",
        "worksFor": {
          "@type": "Organization",
          "@id": "https://www.zigouplex.space/#organization",
          "name": "Zigouplex Space"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://www.zigouplex.space/images/zigouplex.webp",
          "width": 400,
          "height": 400
        },
        "sameAs": [
          "https://github.com/zigouplex",
          "https://twitter.com/zigouplex"
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://www.zigouplex.space/blog" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zigouplex.space/blog" />
        <meta property="og:title" content="Blog | Zigouplex Space" />
        <meta property="og:description" content="Leader dans le développement de lanceurs spatiaux innovants" />
        <meta property="og:image" content="https://www.zigouplex.space/images/zigouplex.webp" />
        <meta property="og:image:width" content="400" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.zigouplex.space/blog" />
        <meta name="twitter:title" content="Blog | Zigouplex Space" />
        <meta name="twitter:description" content="Leader dans le développement de lanceurs spatiaux innovants" />
        <meta name="twitter:image" content="https://www.zigouplex.space/images/zigouplex.webp" />
      </Head>


      <div className="min-h-screen pt-24">
        <header className="shadow-sm">
          <Navigation />
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white-700 mb-8 text-center">Découvrir les derniers articles de Blog</h1>
          <p className="text-lg text-white-500 mb-8 text-center">Vous trouverez ici les dernières actualités et informations sur les projets de Zigouplex Space.</p>
          
          {currentPosts.length > 0 ? (
            <div className="space-y-10">
              {currentPosts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-8">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <time 
                      dateTime={post.date}
                      className="text-sm text-white-300"
                    >
                      {format(parseISO(post.date), 'dd MMMM yyyy', { locale: fr })}
                    </time>
                    <h2 className="mt-2 text-2xl font-semibold text-white-700 group-hover:text-blue-600">
                      {post.title}
                    </h2>
                    <br></br>
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={post.banner}
                        alt={`Image pour l'article ${post.title}`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    {post.excerpt && (
                      <p className="mt-3 text-lg text-white-300">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-white-400">Aucun article disponible pour le moment.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="join flex justify-center mt-12">
              <button 
                className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : 'btn-active'}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => paginate(idx + 1)}
                  className={`join-item btn ${currentPage === idx + 1 ? 'btn-active' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
              
              <button 
                className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-active'}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </main>

        <div className="bg-blue-600 text-white text-center py-8">
          <p className="text-lg font-semibold">Connaissez-vous vraiment le développeur fictif le plus connu d'internet ?</p>
          <p className="text-base md:text-sm opacity-90">
            Découvrez qui il est, ce qu'il fait et comment il peut vous aider (ou pas) dans votre quotidien.
          </p>          
          <Link href="/"
            className="btn btn-white mt-4">
            Découvrir Zigouplex Space →
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
    'banner'
  ]);

  return {
    props: { posts },
    revalidate: 60,
  };
}
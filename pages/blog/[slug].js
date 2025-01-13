import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
import Navigation from '../../components/Navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

export default function Post({ post, recentPosts, sliceDescription }) {
  if (!post) return null;

  const title = `${post.title}`;
  const description = post.excerpt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.zigouplex.space/#website",
        "url": "https://www.zigouplex.space",
        "name": "Zigouplex Space",
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zigouplex.space/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `https://www.zigouplex.space/blog/${post.slug}#webpage`,
        "url": `https://www.zigouplex.space/blog/${post.slug}`,
        "name": title,
        "description": description,
        "isPartOf": { "@id": "https://www.zigouplex.space/#website" },
        "about": { "@id": "https://www.zigouplex.space/#person" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://www.zigouplex.space/#primaryimage",
          "url": post.banner,
          "width": 1200,
          "height": 630
        },
        "breadcrumb": { "@id": "https://www.zigouplex.space/#breadcrumb" },
        "inLanguage": "fr-FR"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zigouplex.space/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zigouplex.space/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.zigouplex.space/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": `https://www.zigouplex.space/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={sliceDescription(description)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={`https://www.zigouplex.space/blog/${post.slug}`} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.zigouplex.space/blog/${post.slug}`} />
      <meta property="og:title" content={`${post.title} | Zigouplex`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.banner} />
      <meta property="og:image:width" content="1200" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://www.zigouplex.space/blog/${post.slug}`} />
      <meta name="twitter:title" content={`${post.title} | Zigouplex`} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={post.banner} />
      </Head>
      

      <div className="min-h-screen pt-24">
        <header className="shadow-sm">
          <Navigation />
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <time 
              dateTime={new Date(post.date).toISOString()}
              className="text-sm text-white-200"
            >
              {format(new Date(post.date), 'dd MMMM yyyy', { locale: fr })}
            </time>
          </div>            
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {recentPosts.length > 0 && (
            <section className="mt-16 border-t pt-12">
              <h2 className="text-2xl font-bold text-white-200 mb-8">
                Articles récents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentPosts.map((recentPost) => (
                  <article 
                    key={recentPost.slug} 
                    className="card shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <figure className="relative w-full h-48">
                      <img
                        src={recentPost.banner}
                        alt={`Image pour ${recentPost.title}`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </figure>
                    <div className="card-body">
                      <time className="text-sm text-white-200">
                        {format(new Date(recentPost.date), 'dd MMMM yyyy', { locale: fr })}
                      </time>
                      <h3 className="card-title text-lg">
                        {recentPost.title}
                      </h3>
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Afficher l'article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="bg-blue-600 text-white text-center py-8">
        <p className="text-lg font-semibold">Connaissez-vous vraiment Zigouplex Space ?</p>
          <p className="text-base md:text-sm opacity-90">
            Découvrez qui nous sommes, ce que nous faisons et comment nous pouvons vous aider dans votre quotidien.
            <br></br>Mais attention, nous ne sommes pas responsables des dégâts causés par nos fusées.
            Pourtant, nous avons une assurance.
          </p>            
          <Link href="/"
            className="btn btn-white mt-4">
            En savoir plus sur Zigouplex Space →
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const sliceDescription = (description) => {
    if (description.length > 150) {
      return `${description.slice(0, 150)}...`;
    }
    return description;
  };

  const recentPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'banner'
  ])
    .filter(p => p.slug !== params.slug)
    .slice(0, 3);

  return {
    props: { 
      post,
      recentPosts
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}
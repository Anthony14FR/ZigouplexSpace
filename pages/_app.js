import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Language" content="fr" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="language" content="French" />
        <link rel="alternate" href="https://www.zigouplex.space" hrefLang="fr-FR" />
        <link rel="alternate" href="https://www.zigouplex.space" hrefLang="x-default" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
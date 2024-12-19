import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <html lang="fr" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
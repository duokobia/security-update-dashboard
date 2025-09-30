import Head from 'next/head';
import Header from '@/components/marketing/Header';
import Main from '@/components/marketing/Main';
import Footer from '@/components/marketing/Footer';

export default function LoginPage() {
  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr_auto] p-0 font-sans'>
      <Head>
        <title>Marketing Page</title>
        <meta name='description' content='Security update marketing page.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

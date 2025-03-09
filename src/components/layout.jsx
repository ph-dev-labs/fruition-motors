'use client'
import Head from 'next/head';
import Footer from './footer';
import Navbar from './navbar';



const Layout = ({ children, title = 'Fruition Motors - Find Your Dream Car' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find and buy your dream car on Fruition Motors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
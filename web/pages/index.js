import React from 'react';
import Navbar from '../src/components/organisms/Navbar';
import Head from 'next/head';

export async function getServerSideProps(foo) {
  console.log(foo.query.a);
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { f: 1 } };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </div>
  );
}
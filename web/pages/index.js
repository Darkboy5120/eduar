import React from 'react';
import Navbar from '../src/components/organisms/Navbar';
import Head from 'next/head';
import { Provider } from 'react-redux';
import globalStore from '../src/assets/store/reducers/globalStore';

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
    <Provider store={globalStore}>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
      </div>
    </Provider>
  );
}
import React from 'react';
import Navbar from '../src/components/organisms/Navbar';
import Head from 'next/head';
import { Provider } from 'react-redux';
import globalStore from '../src/assets/store/reducers/globalStore';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

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
      <AlertProvider template={AlertTemplate} {...options}>
        <div>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
        </div>
        </AlertProvider>
    </Provider>
  );
}
import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import globalStore from '../src/assets/store/reducers/globalStore';
import Navbar from '../src/components/organisms/Navbar';
import MyAr from '../src/components/pages/MyAr';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

export async function getServerSideProps(params) {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { p: params.query.p ?? '' } };
}

const getPage = (page) => {
  let pageContent;
  switch (page) {
    case 'welcome':
      pageContent = <div />;
      break;
    case 'myar':
      pageContent = <MyAr />;
      break;
    default:
      pageContent = <div />;
  }
  return pageContent;
};

export default function Home({ p }) {
  return (
    <Provider store={globalStore}>
      <AlertProvider template={AlertTemplate} {...options}>
        <div>
          <Head>
            <title>Eduar</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          {getPage(p)}
        </div>
      </AlertProvider>
    </Provider>
  );
}

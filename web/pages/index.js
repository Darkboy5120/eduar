import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Provider, useSelector } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useRouter } from 'next/router';
import globalStore from '../src/assets/store/reducers/globalStore';
import Navbar from '../src/components/organisms/Navbar';
import MyAr from '../src/components/pages/MyAr';
import Home from '../src/components/pages/Home';
import Loading from '../src/components/pages/Loading';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

export async function getServerSideProps(context) {
  return { props: context.query };
}

function PageContent({ params }) {
  const globalState = useSelector(globalStore.getState);
  const restrictedScreens = ['myar'];
  const [toDefaultScreen, setToDefaultScreen] = useState(false);
  const router = useRouter();

  if (restrictedScreens.includes(params.p) && globalState.signed === false) {
    router.push('/?p=welcome');
    return <Loading />;
  } if (restrictedScreens.includes(params.p) && globalState.signed === null) {
    return <Loading />;
  } if (toDefaultScreen && globalState.signed !== null) {
    router.push('/?p=home');
  }

  let pageContent;
  switch (params.p) {
    case 'welcome':
      pageContent = <div />;
      break;
    case 'myar':
      pageContent = <MyAr />;
      break;
    case 'home':
      pageContent = <Home />;
      break;
    default:
      if (!toDefaultScreen) {
        setToDefaultScreen(true);
      }
      pageContent = <Loading />;
  }
  return pageContent;
}

export default function App(params) {
  return (
    <Provider store={globalStore}>
      <AlertProvider template={AlertTemplate} {...options}>
        <div>
          <Head>
            <title>Eduar</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <PageContent params={params} />
        </div>
      </AlertProvider>
    </Provider>
  );
}

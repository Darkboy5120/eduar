import React, { useState } from 'react';
import Head from 'next/head';
import { Provider, useSelector } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useRouter } from 'next/router';
import globalStore from '../src/assets/store/reducers/globalStore';
import Navbar from '../src/components/organisms/Navbar';
import MyAr from '../src/components/pages/MyAr';
import Home from '../src/components/pages/Home';
import NewAr from '../src/components/pages/NewAr';
import SeeAr from '../src/components/pages/SeeAr';
import Loading from '../src/components/pages/Loading';
import MyFavorite from '../src/components/pages/MyFavorite';
import SearchAr from '../src/components/pages/SearchAr';
import MyProfile from '../src/components/pages/MyProfile';
import Welcome from '../src/components/pages/Welcome';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

export async function getServerSideProps(context) {
  return { props: context.query };
}

const putDefaultScreen = (toDefaultScreen, setToDefaultScreen) => {
  if (!toDefaultScreen) {
    setToDefaultScreen(true);
  }
};

// eslint-disable-next-line arrow-body-style
const visitorTryToAccessPrivatePage = (restrictedScreens, params, globalState) => {
  return restrictedScreens.includes(params.p) && globalState.signed === false;
};

// eslint-disable-next-line arrow-body-style
const someoneTryToAccessUndefinedPage = (toDefaultScreen, globalState) => {
  return toDefaultScreen && globalState.signed !== null;
};

function PageContent({ params }) {
  const globalState = useSelector(globalStore.getState);
  const restrictedScreens = ['myar', 'newar', 'myfavorite', 'myprofile'];
  const [toDefaultScreen, setToDefaultScreen] = useState(false);
  const router = useRouter();

  if (globalState.signed === null) {
    return <Loading />;
  } if (visitorTryToAccessPrivatePage(restrictedScreens, params, globalState)) {
    router.push('/?p=welcome');
    return <Loading />;
  } if (someoneTryToAccessUndefinedPage(toDefaultScreen, globalState)) {
    router.push('/?p=home');
  }

  let pageContent;
  switch (params.p) {
    case 'welcome':
      pageContent = <Welcome />;
      break;
    case 'myar':
      pageContent = <MyAr />;
      break;
    case 'home':
      pageContent = <Home />;
      break;
    case 'newar':
      pageContent = <NewAr />;
      break;
    case 'myprofile':
      pageContent = <MyProfile params={params} />;
      break;
    case 'searchar':
      pageContent = <SearchAr params={params} />;
      break;
    case 'seear':
      pageContent = <SeeAr params={params} />;
      break;
    case 'myfavorite':
      pageContent = <MyFavorite params={params} />;
      break;
    default:
      putDefaultScreen(toDefaultScreen, setToDefaultScreen);
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
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Navbar />
          <PageContent params={params} />
        </div>
      </AlertProvider>
    </Provider>
  );
}

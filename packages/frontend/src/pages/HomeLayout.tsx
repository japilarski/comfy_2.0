import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Loading, Navbar } from '../components';

export const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state == 'loading';

  return (
    <>
      {/*<Header />*/}
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

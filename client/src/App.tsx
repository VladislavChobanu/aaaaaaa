import React, { useState } from 'react';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Root from './components/Root';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import { checkTokenThunk } from './redux/thunkActions/authThunkActions';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHook';
import LoaderProvider from './components/HOCs/LoaderProvider';
import FavoritesPage from './components/pages/FavoritesPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.group.isLoading)

  useState(() => {
    void dispatch(checkTokenThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoaderProvider isLoading={status===true}> <Root /></LoaderProvider> ,
      errorElement: (
        <>
          <h1>Ошибка</h1>
          <Link to="/">На главную</Link>
        </>
      ),
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/signin', element: <SignInPage /> },
        { path: '/signup', element: <SignUpPage /> },
        {path: '/favorite', element:<FavoritesPage />}
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

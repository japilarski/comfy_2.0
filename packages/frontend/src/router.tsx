import { createBrowserRouter } from 'react-router-dom';

import { ErrorElement } from './components';
import * as page from './pages';
import { store } from './store';
import { queryClient } from './queryClient';

// LOADERS
import { loader as landingLoader } from './pages/Landing';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { loader as productsLoader } from './pages/Products';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as ordersLoader } from './pages/Orders';

// ACTIONS
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <page.HomeLayout />,
    errorElement: <page.Error />,
    children: [
      {
        index: true,
        element: <page.Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <page.Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <page.SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: 'checkout',
        element: <page.Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <page.Orders />,
        loader: ordersLoader(store, queryClient),
      },
      { path: 'cart', element: <page.Cart /> },
      { path: 'about', element: <page.About /> },
    ],
  },
  {
    path: '/login',
    element: <page.Login />,
    errorElement: <page.Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <page.Register />,
    errorElement: <page.Error />,
    action: registerAction,
  },
]);

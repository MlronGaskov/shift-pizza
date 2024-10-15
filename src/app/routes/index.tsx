import { 
  createBrowserRouter,
} from 'react-router-dom';

import { CatalogRoute } from './catalog';
import { CartRoute } from './cart';
import { OrdersRoute } from './orders/orders';
import { OrderInfoRoute } from './orders/order-info';
import { ProfileRoute } from './profile';
import { PaymentRoute } from './payment';
import { LoginRoute } from './auth/login';
import { useAuthTokenInterface } from '../../hooks/useAuthToken';
import { useCartInterface } from '../../hooks/useCart';

export const createRouter = (authorization: useAuthTokenInterface, cart: useCartInterface) =>
  createBrowserRouter([
    {
      path: '/',
      element: (
        <CatalogRoute authorization={authorization} cart={cart}>
        </CatalogRoute>
      ),
    },
    {
      path: '/cart',
      element: (
        <CartRoute authorization={authorization} cart={cart}>
        </CartRoute>
      ),
    },
    {
      path: '/orders',
      element: (
        <OrdersRoute authorization={authorization}>
        </OrdersRoute>
      ),
    },
    {
      path: '/orders/*',
      element: (
        <OrderInfoRoute authorization={authorization}>
        </OrderInfoRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProfileRoute authorization={authorization}>
        </ProfileRoute>
      ),
    },
    {
      path: '/payment',
      element: (
        <PaymentRoute authorization={authorization} cart={cart}>
        </PaymentRoute>
      ),
    },
    {
      path: '/auth/login',
      element: (
        <LoginRoute authorization={authorization}>
        </LoginRoute>
      ),
    },
  ]);

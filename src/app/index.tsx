import { 
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createRouter } from './routes';
import useAuthToken from '../hooks/useAuthToken';
import { useAuthTokenInterface } from '../hooks/useAuthToken'
import useCart, { useCartInterface } from '../hooks/useCart';


const AppRouter: React.FC<{authorization: useAuthTokenInterface, cart: useCartInterface}> = ({authorization, cart}) => {
  const router = createRouter(authorization, cart);
  return <RouterProvider router={router}/>;
};

function App() {
  const authorization = useAuthToken();
  const cart = useCart();

  return (
    <QueryClientProvider client={new QueryClient({})}>
      <AppRouter authorization={authorization} cart={cart}/>
    </QueryClientProvider>
  );
}

export default App;

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';

import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';
import Toastcontainer from './components/common/toast/ToastContainer';
const routeList = [
   {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
   },
   {
      path: '/books',
      element: <Books />,
   },
   {
      path: '/signUp',
      element: <SignUp />,
   },
   {
      path: '/reset',
      element: <ResetPassword />,
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/book/:bookId',
      element: <BookDetail />,
   },
   {
      path: '/cart',
      element: <Cart />,
   },
   {
      path: '/order',
      element: <Order />,
   },
   {
      path: '/orderList',
      element: <OrderList />,
   },
];

const newRouteList = routeList.map((item) => {
   return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
   };
});
const router = createBrowserRouter(newRouteList);

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BookStoreThemeProvider>
            <RouterProvider router={router} />
            <Toastcontainer />
         </BookStoreThemeProvider>
      </QueryClientProvider>
   );
}

export default App;

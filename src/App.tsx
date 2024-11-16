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

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <Layout>
            <Home />
         </Layout>
      ),
      errorElement: <Error />,
   },
   {
      path: '/books',
      element: (
         <Layout>
            <Books />
         </Layout>
      ),
   },
   {
      path: '/signUp',
      element: (
         <Layout>
            <SignUp />
         </Layout>
      ),
   },
   {
      path: '/reset',
      element: (
         <Layout>
            <ResetPassword />
         </Layout>
      ),
   },
   {
      path: '/login',
      element: (
         <Layout>
            <Login />
         </Layout>
      ),
   },
   {
      path: '/book/:bookId',
      element: (
         <Layout>
            <BookDetail />
         </Layout>
      ),
   },
]);

function App() {
   return (
      <BookStoreThemeProvider>
         <RouterProvider router={router} />
      </BookStoreThemeProvider>
   );
}

export default App;

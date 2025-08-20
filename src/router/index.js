import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Login from '../pages/login';
import Index from '../pages/index';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        element: <Index />,
        index: true
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

export default router;

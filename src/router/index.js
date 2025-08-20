import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Login from '../pages/login';
import Index from '../pages/index';
import RouteGuard from '../components/routeGuard';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <RouteGuard>
        <Layout />
      </RouteGuard>
    ),

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

import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import RouteGuard from '../components/routeGuard';
import Record from '../pages/record';
import Table from '../pages/table';

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
        element: <Dashboard />,
        index: true
      },
      {
        path: 'settings',
        children: [
          { path: 'table', element: <Table /> },
          { path: 'record/:id?', element: <Record /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

export default router;

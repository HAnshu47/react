import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Record from '../pages/record';
import Table from '../pages/table';
import { WithRouteGuard } from '../components/routeGuard';
const HocComponent = WithRouteGuard(Layout);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <HocComponent />,
    /**
     * 不能直接使用WithRouteGuard(<Layout />) 会报错
     * 高阶组件 HOC 要传递组件本身，而不是直接传 JSX。
     * createBrowserRouter 里的 element 要的是 JSX，所以需要 <WithRouteGuard><Layout /></WithRouteGuard> 的形式。
     */
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

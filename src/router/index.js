import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/layout';
import Month from '../pages/month';
import Year from '../pages/years';
import Record from '../pages/record';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    
    children: [
      {
        path: '',
        element: <Month />,
        index: true

      },
      {
        path: 'years',
        element: <Year />
      }
    ]
  },
  {
    path: '/record',
    element: <Record />
  }
]);

export default router;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const RouteGuard = ({ children }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children; // 渲染受保护的组件
// };

// export default RouteGuard;



import React from 'react';
import { Navigate } from 'react-router-dom';


export function WithRouteGuard(WrappedComponent) {
  return function RouteGuard(props) {
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />; // 渲染受保护的组件
  };
}

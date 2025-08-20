import { Outlet } from 'react-router-dom';
import React from 'react';

import '../../App.scss';

export default function Index() {
  return (
    <div className="app">
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}

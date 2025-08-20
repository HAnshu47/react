import { configureStore } from '@reduxjs/toolkit';
// 导入billList模块

import auth from './modules/auth';

const store = configureStore({
  reducer: {
    auth: auth
  }
});

export default store;

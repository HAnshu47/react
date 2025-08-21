import { configureStore } from '@reduxjs/toolkit';
// 导入billList模块

import auth from './modules/auth';
import docs from './modules/docs';

const store = configureStore({
  reducer: {
    auth: auth,
    docs
  }
});

export default store;

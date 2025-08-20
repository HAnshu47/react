import { configureStore } from '@reduxjs/toolkit';
// 导入billList模块

import billList from './modules/billLIst';

const store = configureStore({
  reducer: {
    billList: billList
  }
});

export default store;

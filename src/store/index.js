import fetchMenu from './modules/takeaway';
import { configureStore } from '@reduxjs/toolkit';
// 导入takeaway模块

const store = configureStore({
  reducer: {
    menu: fetchMenu,
    activeIndex: 0
  }
});

export default store;

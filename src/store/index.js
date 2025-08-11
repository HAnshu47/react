import fetchMenu from './modules/takeaway';
import { configureStore } from '@reduxjs/toolkit';
// 导入takeaway模块

const store = configureStore({
  reducer: {
    menu: fetchMenu //第一层的 state.menu 对应 整个 takeaway slice 的 state。 这里挂谁，state后边就是谁，state.跟随的是takeaway.js中initialState定义的数据
  }
});

export default store;

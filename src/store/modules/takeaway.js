import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState: {},
  reducers: {}
});

// 封装获取菜单的异步函数
const {} = takeawaySlice.actions;

export {};
const reducer = takeawaySlice.reducer;
export default reducer;

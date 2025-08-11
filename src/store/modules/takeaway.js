import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const store = createSlice({
  name: 'takeaway',
  initialState: { 
    menu: []
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    }
  }
});

// 封装获取菜单的异步函数
const { setMenu } = store.actions;
const fetchMenu = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway');
    dispatch(setMenu(res.data));
  };
};

export { fetchMenu };
const reducer = store.reducer;
export default reducer;

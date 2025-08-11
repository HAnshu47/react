import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState: {
    menu: [],
    activeIndex: 0
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setActiveIndex(state, action) {
      state.activeIndex = action.payload; //制作active选中
    }
  }
});

// 封装获取菜单的异步函数
const { setMenu, setActiveIndex } = takeawaySlice.actions;
const fetchMenu = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway');
    dispatch(setMenu(res.data));
  };
};

export { fetchMenu, setActiveIndex };
const reducer = takeawaySlice.reducer;
export default reducer;

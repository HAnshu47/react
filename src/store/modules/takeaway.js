import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState: {
    menu: [],
    activeIndex: 0,
    cardList: [],
    visible: false
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setActiveIndex(state, action) {
      state.activeIndex = action.payload; //制作active选中
    },
    addCard(state, action) {
      const item = state.cardList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
        state.menu.map((item) => {
          item.foods.map((food) => {
            if (food.id === action.payload.id) {
              food.count++;
            }
          });
        });
      } else {
        state.cardList.push({ ...action.payload, count: 1 });
        state.menu.map((item) => {
          item.foods.map((food) => {
            if (food.id === action.payload.id) {
              food.count = 1;
            }
          });
        });
      }
    },
    minusCard(state, action) {
      const item = state.cardList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count--;
        state.menu.map((item) => {
          item.foods.map((food) => {
            if (food.id === action.payload.id) {
              food.count--;
            }
          });
        });
      } else {
        state.menu.map((item) => {
          item.foods.map((food) => {
            if (food.id === action.payload.id) {
              food.count--;
            }
          });
        });
      }
    },
    showVisible(state, action) {
      state.visible = !state.visible;
      console.log(state.visible, ' =====');
    }
  }
});

// 封装获取菜单的异步函数
const { setMenu, setActiveIndex, addCard, minusCard, showVisible } =
  takeawaySlice.actions;
const fetchMenu = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway');
    dispatch(setMenu(res.data));
  };
};

export { fetchMenu, setActiveIndex, addCard, minusCard, showVisible };
const reducer = takeawaySlice.reducer;
export default reducer;

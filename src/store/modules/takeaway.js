import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState: {
    menu: [],
    activeIndex: 0,
    carList: [],
    visible: false
  },
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setActiveIndex(state, action) {
      state.activeIndex = action.payload; //制作active选中
    },
    addCar(state, action) {
      const item = state.carList.find((item) => item.id === action.payload.id);
      let addedItemCount = 0;

      if (item) {
        item.count++;
        addedItemCount = 1;
      } else {
        const newItem = { ...action.payload, count: 1 };
        state.carList.push(newItem);
        addedItemCount = 1;
      }

      // 更新菜单中对应食物的count
      state.menu.forEach((category) => {
        category.foods.forEach((food) => {
          if (food.id === action.payload.id) {
            food.count = (food.count || 0) + addedItemCount;
          }
        });
      });
    },
    minusCar(state, action) {
      const item = state.carList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count--;
        // 如果数量减少到0，则从购物车中移除该商品
        if (item.count === 0) {
          const index = state.carList.findIndex(
            (i) => i.id === action.payload.id
          );
          if (index !== -1) {
            state.carList.splice(index, 1);
          }
        }

        // 更新菜单中对应食物的count
        state.menu.forEach((category) => {
          category.foods.forEach((food) => {
            if (food.id === action.payload.id) {
              food.count--;
            }
          });
        });
      }
    },
    showVisible(state, action) {
      state.visible = !state.visible;
    },
    clearCartList(state) {
      state.carList = [];
      state.visible = false;
    }
  }
});

// 封装获取菜单的异步函数
const {
  setMenu,
  setActiveIndex,
  addCar,
  minusCar,
  showVisible,
  clearCartList
} = takeawaySlice.actions;
const fetchMenu = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway');
    dispatch(setMenu(res.data));
  };
};

export {
  fetchMenu,
  setActiveIndex,
  addCar,
  minusCar,
  showVisible,
  clearCartList
};
const reducer = takeawaySlice.reducer;
export default reducer;

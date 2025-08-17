import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const billListSlice = createSlice({
  name: 'billList',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    }
  }
});

// 封装获取菜单的异步函数
const { setBillList } = billListSlice.actions;
const getBillList = () => async (dispatch) => {
 const res = await axios.get('http://localhost:3089/ka');
  dispatch(setBillList(res.data));
};

export { setBillList, getBillList };
const reducer = billListSlice.reducer;
export default reducer;

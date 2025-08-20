import { createSlice } from '@reduxjs/toolkit';
import http from '../../request/axios';

const billListSlice = createSlice({
  name: 'billList',
  initialState: {
  },
  reducers: {
    // setBillList(state, action) {
    //   state.billList = action.payload;
    // },
  }
});

// 封装获取菜单的异步函数
const { setBillList } = billListSlice.actions;
// const getBillList = () => async (dispatch) => {
//   const res = await http.get('/ka');
//   dispatch(setBillList(res));
// };
// const addBill = (payload) => async (dispatch) => {
//   await http.post('/ka', payload);
// };
export { setBillList };
const reducer = billListSlice.reducer;
export default reducer;

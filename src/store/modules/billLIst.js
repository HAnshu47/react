import { createSlice } from '@reduxjs/toolkit';
import { getYearListColums, getAllMonthListColumn } from '../../utils/format';
import http from '../../request/axios';

const billListSlice = createSlice({
  name: 'billList',
  initialState: {
    billList: [],
    columnLists: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    setColumnLists(state, action) {
      state.columnLists = getYearListColums(action.payload);
    },
    changeColumnLists(state, action) {
      state.columnLists[1] = getAllMonthListColumn(action.payload);
    }
  }
});

// 封装获取菜单的异步函数
const { setBillList, setColumnLists, changeColumnLists } =
  billListSlice.actions;
const getBillList = () => async (dispatch) => {
  const res = await http.get('/ka');
  dispatch(setBillList(res));
};
const addBill = (payload) => async (dispatch) => {
  await http.post('/ka', payload);
};
export { setBillList, getBillList, setColumnLists, changeColumnLists, addBill };
const reducer = billListSlice.reducer;
export default reducer;

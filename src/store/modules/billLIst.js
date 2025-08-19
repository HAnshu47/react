import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getYearListColums, getAllMonthListColumn } from '../../utils/format';

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
const { setBillList, setColumnLists,changeColumnLists } = billListSlice.actions;
const getBillList = () => async (dispatch) => {
  const res = await axios.get('http://localhost:3089/ka');
  dispatch(setBillList(res.data));
};

export { setBillList, getBillList, setColumnLists,changeColumnLists };
const reducer = billListSlice.reducer;
export default reducer;

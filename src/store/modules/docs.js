import { createSlice } from '@reduxjs/toolkit';
import http from '../../request/axios';

const docsSlice = createSlice({
  name: 'docs',
  initialState: {
    docsList: [],
    docsPage: {},
    channelList: []
  },
  reducers: {
    setDocsList(state, action) {
      //  state.docsList = action.payload;
      const { results, page, per_page, total_count } = action.payload;
      state.docsList = results;
      state.docsPage = { page, per_page, total_count };
    },
    setChannelList(state, action) {
      state.channelList = action.payload?.channels;
    }
  }
});

// 封装获取菜单的异步函数
const { setDocsList ,setChannelList} = docsSlice.actions;
const getDocsList = (payload) => async (dispatch) => {
  const res = await http.get('/mp/articles', { params: payload });
  dispatch(setDocsList(res.data));
  return res.data;
};
const getChannelList = () => async (dispatch) => {
  const res = await http.get('/channels');
  dispatch(setChannelList(res.data));
  return res.data;
};

export { getDocsList,getChannelList };
const reducer = docsSlice.reducer;
export default reducer;

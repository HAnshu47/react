import { createSlice } from '@reduxjs/toolkit';
import http from '../../request/axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: ''
  },
  reducers: {
    getToken(state, action) {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem('token', token);
    }
  }
});

// 封装获取菜单的异步函数
const { setBillList, getToken } = authSlice.actions;
const postAuth = (payload) => async (dispatch) => {
  const res = await http.post('/authorizations', payload);
  dispatch(getToken(res.data));
  return res.data;
};

export { setBillList, postAuth, getToken };
const reducer = authSlice.reducer;
export default reducer;

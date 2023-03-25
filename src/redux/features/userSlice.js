import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeUser: {},
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.activeUser.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

// console.log('userSlice', userSlice.state.activeUser);
export default userSlice.reducer;

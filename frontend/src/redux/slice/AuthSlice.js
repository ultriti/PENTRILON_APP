import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  User: null,
};

const AuthSlice = createSlice({
  name: 'userDetailUlcart',
  initialState,
  reducers: {
    setUser(state, action) {
      state.User = action.payload;
    },
    removeUser(state, action) {
      state.User = state.User.filter(item => item.id !== action.payload);
    },
  },
});

export const { setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;

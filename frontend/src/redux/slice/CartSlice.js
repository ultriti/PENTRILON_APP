import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items.pop(action.payload)
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeAllApps(state) {
      state.items = []
      state.items.length = 0; // Clears the array completely
    },
  },
});

export const { addToCart, removeFromCart, removeAllApps } = cartSlice.actions;
export default cartSlice.reducer;


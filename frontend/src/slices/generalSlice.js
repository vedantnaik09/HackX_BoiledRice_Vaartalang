import { createSlice } from '@reduxjs/toolkit';

// Retrieve user state from localStorage or set to undefined if not found
const storedUser = localStorage.getItem('user');
const initialState = {
  index: 0,
  user: storedUser ? JSON.parse(storedUser) : undefined,
};

export const generalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.index += 1;
    },
    decrement: (state) => {
      state.index -= 1;
    },
    incrementByAmount: (state, action) => {
      state.index += action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Save user state to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setIndex, setUser } = generalSlice.actions;

export default generalSlice.reducer;

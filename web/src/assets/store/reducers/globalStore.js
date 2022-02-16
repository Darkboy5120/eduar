import { createSlice } from '@reduxjs/toolkit'
const userIntialState = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
};

export const counterSlice = createSlice({
  name: 'globalStore',
  initialState: {
    user: userIntialState,
  },
  reducers: {
    signIn: (state, data) => {
      state.user = data;
    },
    signOut: (state) => {
      state.user = userIntialState;
    },
  },
})

export const { signIn, signOut } = counterSlice.actions

export default counterSlice.reducer;

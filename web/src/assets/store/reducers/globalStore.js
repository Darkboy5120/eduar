import { createSlice, configureStore } from '@reduxjs/toolkit'
const userIntialState = {
  id: null,
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
};

const counterSlice = createSlice({
  name: 'globalStore',
  initialState: {
    user: userIntialState,
  },
  reducers: {
    signIn: (state, data) => {
      state.email = data.payload.email;
    },
    signOut: (state) => {
      state.user = userIntialState;
    },
  },
})

const globalStore = configureStore({
  reducer: counterSlice.reducer,
});

export const { signIn, signOut } = counterSlice.actions

export default globalStore;

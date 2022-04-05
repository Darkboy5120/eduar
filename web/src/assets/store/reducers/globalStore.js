import { createSlice, configureStore } from '@reduxjs/toolkit';

const userInitialState = {
  auth: null,
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
  appDetails: null,
};

export const globalSlice = createSlice({
  name: 'globalStore',
  initialState: {
    user: userInitialState,
    signed: null,
  },
  reducers: {
    signIn: (state, data) => {
      state.user = data.payload.user;
      state.signed = data.payload.signed;
    },
    signOut: (state) => {
      state.user = userInitialState;
      state.signed = false;
    },
    setAppDetails: (state, data) => {
      state.appDetails = data.payload;
    },
    clearAppDetails: (state) => {
      state.appDetails = null;
    },
  },
});

const globalStore = configureStore({
  reducer: globalSlice.reducer,
});

export const {
  signIn, signOut, setAppDetails, clearAppDetails,
} = globalSlice.actions;

export default globalStore;

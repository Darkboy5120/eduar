import { createSlice, configureStore } from '@reduxjs/toolkit';

const userInitialState = {
  auth: null,
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
  photo: null,
};

export const globalSlice = createSlice({
  name: 'globalStore',
  initialState: {
    user: userInitialState,
    signed: null,
    appDetails: null,
    profile: null,
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
    setProfile: (state, data) => {
      state.profile = data.payload;
    },
    updateFullname: (state, data) => {
      state.user.firstname = data.payload.firstname;
      state.user.lastname = data.payload.lastname;
    },
  },
});

const globalStore = configureStore({
  reducer: globalSlice.reducer,
});

export const {
  signIn, signOut, setAppDetails, clearAppDetails, setProfile, updateFullname,
} = globalSlice.actions;

export default globalStore;

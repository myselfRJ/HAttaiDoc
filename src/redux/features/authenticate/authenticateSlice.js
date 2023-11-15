import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

let initialState = {
  auth: {
    access: null,
    refresh: null,
    lastLogin: null,
  },
};

const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    accessupdate: (state, action) => {
      state.access = action.payload;
    },
    tokenupdate: (state, action) => {
      state.auth = action.payload;
    },
    tokenrevoke: state => {
      state = initialState;
    },
    updateauthenticate: (state, action) => {
      state.auth.access = action.payload.access_token;
      state.auth.refresh = action.payload.refresh_token;
    },
  },
});
export const getAccessToken = state => state?.access;
export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;

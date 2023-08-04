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
      console.log(action);
      state.access = action.payload;
      console.log(state, 'state');
    },
    tokenupdate: (state, action) => {
      console.log(action);
      state.auth = action.payload;
      console.log(state, 'state');
    },
    tokenrevoke: state => {
      console.log('1');
      state = initialState;
    },
    updateauthenticate: (state, action) => {
      console.log('payload', action.payload);

      state.auth.access = action.payload.access_token;
      state.auth.refresh = action.payload.refresh_token;
      console.log('state', state);
    },
  },
});
export const getAccessToken = state => state?.access;
export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;

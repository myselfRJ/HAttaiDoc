import {createSlice} from '@reduxjs/toolkit';

const Signature = createSlice({
  name: 'sign',
  initialState: {
    sign: '',
  },
  reducers: {
    addSign: (state, action) => {
      state.sign = action.payload;
    },
  },
});

export const {addSign} = Signature.actions;

export const signatureReducer = Signature.reducer;
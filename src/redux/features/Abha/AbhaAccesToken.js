import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  auth: {
    access: null,
    txnid: null,
    aadharNo: null,
  },
};

const AbhaAccessSlice = createSlice({
  name: 'AbhaReducer',
  initialState,
  reducers: {
    updateAbhaAccess: (state, action) => {
      state.auth.access = action.payload;
    },
    UpdatetxnId: (state, action) => {
      state.auth.txnid = action.payload;
    },
    addAadhar: (state, action) => {
      state.auth.aadharNo = action.payload;
    },
  },
});

export const {updateAbhaAccess, UpdatetxnId, addAadhar} =
  AbhaAccessSlice.actions;
export const AbhaReducer = AbhaAccessSlice.reducer;
